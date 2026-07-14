import { NextResponse } from "next/server";
import { site } from "@/content/site";
import { buildEnquiry, saveEnquiry } from "@/lib/db";
import { renderConfirmationEmail, renderNotificationEmail } from "@/lib/emails";
import { serverEnv } from "@/lib/env";
import { log } from "@/lib/log";
import { generateReference } from "@/lib/reference";
import { sendEmail } from "@/lib/resend";
import { pushLeadToZoho } from "@/lib/zoho-crm";

// Lead form handler. Runs on the Cloudflare Worker (OpenNext). Pipeline:
//   1. Validate + honeypot   2. Verify Turnstile   3. Save to D1
//   4. Notify the team        5. Confirm to the visitor   6. Push to Zoho CRM
// Storage, email and CRM each degrade gracefully; the request only fails if the enquiry
// could not be persisted anywhere (neither saved nor emailed). Every stage is logged
// with the enquiry reference as a correlation id and no sensitive data.
export const dynamic = "force-dynamic";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  message?: string;
  referrer?: string;
  turnstileToken?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  website?: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanUtm(value: string | undefined): string | null {
  const trimmed = (value ?? "").trim();
  return trimmed ? trimmed.slice(0, 200) : null;
}

async function verifyTurnstile(
  token: string | undefined,
  ip: string | null
): Promise<{ ok: boolean; skipped?: boolean; expired?: boolean }> {
  const secret = serverEnv("TURNSTILE_SECRET_KEY");
  if (!secret) return { ok: true, skipped: true }; // not configured yet (documented setup step)
  if (!token) return { ok: false };

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body
    });
    const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };
    if (data.success) return { ok: true };
    const codes = data["error-codes"] ?? [];
    const expired = codes.includes("timeout-or-duplicate") || codes.includes("invalid-input-response");
    return { ok: false, expired };
  } catch (error) {
    log.error("turnstile_request_failed", { reason: (error as Error)?.message });
    // Fail open on a network error verifying the token, so a Cloudflare outage
    // doesn't block genuine leads. The honeypot remains as a second layer.
    return { ok: true, skipped: true };
  }
}

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    log.warn("invalid_request_body");
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot tripped: pretend everything is fine, but do nothing.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    log.warn("honeypot_triggered");
    return NextResponse.json({ ok: true });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = (data.message ?? "").trim();
  const company = (data.company ?? "").trim();
  const service = (data.service ?? "").trim();

  const utm = {
    source: cleanUtm(data.utm_source),
    medium: cleanUtm(data.utm_medium),
    campaign: cleanUtm(data.utm_campaign),
    term: cleanUtm(data.utm_term),
    content: cleanUtm(data.utm_content)
  };
  const hasUtm = Object.values(utm).some(Boolean);

  log.info("submission_received", {
    service: service || null,
    hasCompany: Boolean(company),
    hasUtm,
    utm_source: utm.source,
    utm_medium: utm.medium,
    utm_campaign: utm.campaign
  });

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Please tell us a little more about what you need.";
  if (Object.keys(errors).length > 0) {
    log.info("validation_failed", { fields: Object.keys(errors) });
    return NextResponse.json({ errors }, { status: 422 });
  }

  // Correlation id for every remaining log line and both emails.
  const reference = generateReference();

  const ip =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    null;

  const turnstile = await verifyTurnstile(data.turnstileToken, ip);
  if (!turnstile.ok) {
    log.warn("turnstile_failed", { ref: reference, expired: Boolean(turnstile.expired) });
    return NextResponse.json(
      {
        error: turnstile.expired
          ? "Your verification expired. Please tick the box again and resend."
          : "Verification failed. Please complete the check below and try again.",
        code: "turnstile"
      },
      { status: 400 }
    );
  }
  log.info("turnstile_verified", { ref: reference, skipped: Boolean(turnstile.skipped) });

  const clientReferrer = (data.referrer ?? "").trim();
  const record = buildEnquiry(
    {
      name,
      email,
      company: company || null,
      selectedService: service || null,
      message,
      userAgent: request.headers.get("user-agent"),
      referrer: clientReferrer || request.headers.get("referer") || null,
      ip,
      utmSource: utm.source,
      utmMedium: utm.medium,
      utmCampaign: utm.campaign,
      utmTerm: utm.term,
      utmContent: utm.content
    },
    reference
  );

  // 3. Persist first (best-effort). Logs its own d1_saved / d1_save_failed.
  const stored = await saveEnquiry(record);

  // 4. Notify the team.
  const notification = renderNotificationEmail(record);
  const emailed = await sendEmail({
    to: serverEnv("CONTACT_TO_EMAIL") || site.email,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
    replyTo: email
  });
  log[emailed ? "info" : "error"](emailed ? "notification_email_sent" : "notification_email_failed", {
    ref: reference
  });

  // If the enquiry reached neither the database nor our inbox, tell the visitor.
  if (!stored && !emailed) {
    log.error("enquiry_not_persisted", { ref: reference });
    return NextResponse.json(
      { error: "We couldn't process your message just now. Please email us directly." },
      { status: 503 }
    );
  }

  // 5. Confirmation to the visitor (best-effort — never affects the response).
  const confirmation = renderConfirmationEmail(record);
  const confirmed = await sendEmail({
    to: email,
    subject: confirmation.subject,
    html: confirmation.html,
    text: confirmation.text
  });
  log[confirmed ? "info" : "warn"](confirmed ? "confirmation_email_sent" : "confirmation_email_failed", {
    ref: reference
  });

  // 6. Push into Zoho CRM (best-effort — never affects the response). Skips cleanly
  // when the Web-to-Lead env vars are absent, so this is a no-op until configured.
  const crm = await pushLeadToZoho(record);

  log.info("submission_completed", { ref: reference, stored, emailed, crm: crm.ok });
  return NextResponse.json({ ok: true, reference });
}
