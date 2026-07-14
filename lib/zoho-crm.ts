import { serverEnv } from "@/lib/env";
import { log } from "@/lib/log";
import type { EnquiryRecord } from "@/lib/db";

// Pushes a new enquiry into Zoho CRM as a Lead using Zoho's Web-to-Lead endpoint.
// This deliberately avoids the OAuth REST API: there are no access tokens to refresh,
// only three public form values copied from Zoho's generated web form. Like every
// other outbound step in the contact pipeline it NEVER throws and returns a boolean,
// so a Zoho outage or missing config can never fail the enquiry (already stored + emailed).
//
// Setup (one-time, in Zoho CRM → Setup → Developer Space → Webforms → Leads):
//   1. Build a Leads web form. Turn OFF captcha. Save + "Publish" to get the HTML.
//   2. From the generated <form>, copy three values into the Worker's env:
//        ZOHO_WEBTOLEAD_URL  = the form's action= URL (region-specific, e.g. .com / .eu)
//        ZOHO_WEBTOLEAD_ID   = the hidden field named "xnQsjsdp"
//        ZOHO_WEBTOLEAD_KEY  = the hidden field named "xmIwtLD"
//   When any of the three is absent, this step is skipped and logged.

// base64("Leads") — the actionType Zoho expects for a Leads web form.
const ACTION_TYPE_LEADS = "TGVhZHM=";

interface ZohoResult {
  ok: boolean;
  skipped?: boolean;
}

// Zoho Leads require a non-empty Last Name and Company. Split the full name into
// first/last on the first space; fall back so Last Name is always populated.
function splitName(fullName: string): { first: string; last: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { first: "", last: parts[0] };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

// Everything that has no dedicated standard field goes into Description, so this
// works against a default Zoho org without depending on custom field API names.
function buildDescription(record: EnquiryRecord): string {
  const lines = [
    `Reference: ${record.reference}`,
    record.selectedService ? `Service of interest: ${record.selectedService}` : null,
    "",
    record.message,
    ""
  ];
  const utm = [
    record.utmSource ? `source=${record.utmSource}` : null,
    record.utmMedium ? `medium=${record.utmMedium}` : null,
    record.utmCampaign ? `campaign=${record.utmCampaign}` : null,
    record.utmTerm ? `term=${record.utmTerm}` : null,
    record.utmContent ? `content=${record.utmContent}` : null
  ].filter(Boolean);
  if (utm.length) lines.push(`UTM: ${utm.join(" ")}`);
  if (record.referrer) lines.push(`Referrer: ${record.referrer}`);
  return lines.filter((line) => line !== null).join("\n");
}

export async function pushLeadToZoho(record: EnquiryRecord): Promise<ZohoResult> {
  const url = serverEnv("ZOHO_WEBTOLEAD_URL");
  const formId = serverEnv("ZOHO_WEBTOLEAD_ID");
  const formKey = serverEnv("ZOHO_WEBTOLEAD_KEY");

  if (!url || !formId || !formKey) {
    log.info("zoho_skipped", { ref: record.reference, reason: "unconfigured" });
    return { ok: false, skipped: true };
  }

  const { first, last } = splitName(record.name);

  const body = new URLSearchParams({
    xnQsjsdp: formId,
    xmIwtLD: formKey,
    actionType: ACTION_TYPE_LEADS,
    // returnURL is required by Web-to-Lead; we never follow the redirect (see below),
    // so its value is cosmetic. Point it at our own thank-you page for tidiness.
    returnURL: "https://roblemedialab.co.ke/thank-you",
    "Last Name": last,
    Email: record.email,
    // Zoho Leads require Company; individuals rarely provide one.
    Company: record.company || "Individual enquiry",
    // "Website" must exist as a Lead Source picklist value in Zoho (Setup → Modules and
    // Fields → Leads → Lead Source). If it does not, Zoho simply leaves the field blank;
    // the lead is still created.
    "Lead Source": "Website",
    Description: buildDescription(record),
    // Zoho embeds its own hidden honeypot ("aG9uZXlwb3Q" = base64 "honeypot"). Send it
    // empty, exactly as a real browser submit does, so our post isn't flagged as a bot.
    aG9uZXlwb3Q: ""
  });
  if (first) body.set("First Name", first);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // Present the post as coming from our registered form location, matching the
        // "Form Location URL" configured on the Zoho web form.
        Referer: "https://roblemedialab.co.ke/contact"
      },
      body,
      // Web-to-Lead answers with a 302 to returnURL on success. Do NOT follow it:
      // our own site sits behind Cloudflare bot management and would 403 an automated
      // fetch, turning a successful lead into a false failure. Treat any non-error
      // status (2xx/3xx) as success.
      redirect: "manual"
    });

    const ok = res.status < 400;
    if (ok) log.info("zoho_lead_created", { ref: record.reference, status: res.status });
    else log.error("zoho_http_error", { ref: record.reference, status: res.status });
    return { ok };
  } catch (error) {
    log.error("zoho_request_threw", { ref: record.reference, reason: (error as Error)?.message });
    return { ok: false };
  }
}
