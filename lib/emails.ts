import { site } from "@/content/site";
import type { EnquiryRecord } from "@/lib/db";

// Brand-consistent transactional emails. Kept as inline-styled, table-based HTML so
// they render reliably across email clients (Gmail, Outlook, Apple Mail, mobile).

// Keep in sync with the tokens in app/globals.css. Email clients can't read CSS
// variables, so these are duplicated by necessity: change them in both places.
const BRAND = {
  ink: "#0b1020",
  teal: "#0d7c71", // text-on-light accent; the old #0f8f83 was 3.98:1 on white (AA needs 4.5)
  slate: "#536171",
  slateSoft: "#637080", // muted meta text; the old #8a97a6 was 2.98:1 on white
  line: "#dbe3e7",
  cloud: "#f6faf9",
  white: "#ffffff"
};

const LOGO = `${site.url}/logo.png`;

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

function formatTimestamp(iso: string): string {
  try {
    const formatted = new Intl.DateTimeFormat("en-KE", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Africa/Nairobi"
    }).format(new Date(iso));
    return `${formatted} (EAT)`;
  } catch {
    return iso;
  }
}

// Shared shell: header bar with logo, a white content card, and a muted footer.
function layout(previewText: string, inner: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
</head>
<body style="margin:0;padding:0;background:${BRAND.cloud};">
<span style="display:none;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${escapeHtml(previewText)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.cloud};">
  <tr><td align="center" style="padding:28px 16px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;">
      <tr><td style="padding:0 4px 18px;">
        <a href="${site.url}" style="text-decoration:none;color:${BRAND.ink};font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:17px;font-weight:700;">
          <img src="${LOGO}" width="34" height="34" alt="Roble Media Lab" style="vertical-align:middle;border-radius:8px;margin-right:10px;">
          <span style="vertical-align:middle;">Roble Media Lab</span>
        </a>
      </td></tr>
      <tr><td style="background:${BRAND.white};border:1px solid ${BRAND.line};border-radius:16px;padding:32px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${BRAND.ink};">
        ${inner}
      </td></tr>
      <tr><td style="padding:20px 4px 0;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${BRAND.slate};font-size:12px;line-height:1.6;">
        Roble Media Lab · Nairobi, Kenya · <a href="${site.url}" style="color:${BRAND.teal};text-decoration:none;">${site.url.replace(/^https?:\/\//, "")}</a>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function detailRow(label: string, valueHtml: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};color:${BRAND.slate};font-size:13px;width:150px;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};color:${BRAND.ink};font-size:14px;vertical-align:top;">${valueHtml}</td>
  </tr>`;
}

interface UtmEntry {
  label: string;
  value: string;
}

function utmEntries(record: EnquiryRecord): UtmEntry[] {
  return [
    { label: "Source", value: record.utmSource },
    { label: "Medium", value: record.utmMedium },
    { label: "Campaign", value: record.utmCampaign },
    { label: "Term", value: record.utmTerm },
    { label: "Content", value: record.utmContent }
  ].filter((entry): entry is UtmEntry => Boolean(entry.value));
}

/** Internal notification to the Roble Media Lab team. */
export function renderNotificationEmail(record: EnquiryRecord): RenderedEmail {
  const service = record.selectedService || "Not specified";
  const subject = `New enquiry ${record.reference} from ${record.name}${record.selectedService ? ` · ${record.selectedService}` : ""}`;
  const utms = utmEntries(record);

  const rows = [
    detailRow("Reference", `<strong>${escapeHtml(record.reference)}</strong>`),
    detailRow("Received", escapeHtml(formatTimestamp(record.createdAt))),
    detailRow("Name", escapeHtml(record.name)),
    detailRow(
      "Email",
      `<a href="mailto:${escapeHtml(record.email)}" style="color:${BRAND.teal};text-decoration:none;">${escapeHtml(record.email)}</a>`
    ),
    record.company ? detailRow("Company", escapeHtml(record.company)) : "",
    detailRow("Service", escapeHtml(service)),
    record.referrer ? detailRow("Referrer", escapeHtml(record.referrer)) : ""
  ].join("");

  const utmBlock =
    utms.length > 0
      ? `<p style="margin:24px 0 8px;color:${BRAND.slate};font-size:13px;font-weight:600;">Campaign attribution</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${utms
      .map((u) => detailRow(u.label, escapeHtml(u.value)))
      .join("")}</table>`
      : "";

  const inner = `
    <p style="margin:0 0 4px;color:${BRAND.teal};font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">New enquiry</p>
    <h1 style="margin:0 0 22px;font-size:22px;line-height:1.25;color:${BRAND.ink};">${escapeHtml(record.name)} got in touch</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>
    <p style="margin:24px 0 8px;color:${BRAND.slate};font-size:13px;font-weight:600;">Message</p>
    <div style="background:${BRAND.cloud};border:1px solid ${BRAND.line};border-radius:12px;padding:16px;color:${BRAND.ink};font-size:15px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(record.message)}</div>
    ${utmBlock}
    <p style="margin:24px 0 0;">
      <a href="mailto:${escapeHtml(record.email)}" style="display:inline-block;background:${BRAND.ink};color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 22px;border-radius:999px;">Reply to ${escapeHtml(record.name)}</a>
    </p>
    ${record.userAgent ? `<p style="margin:22px 0 0;color:${BRAND.slateSoft};font-size:11px;line-height:1.5;">Device: ${escapeHtml(record.userAgent)}</p>` : ""}
  `;

  const text = [
    `New enquiry from ${record.name}`,
    ``,
    `Reference: ${record.reference}`,
    `Received: ${formatTimestamp(record.createdAt)}`,
    `Name: ${record.name}`,
    `Email: ${record.email}`,
    record.company ? `Company: ${record.company}` : null,
    `Service: ${service}`,
    record.referrer ? `Referrer: ${record.referrer}` : null,
    ...(utms.length > 0
      ? ["", "Campaign attribution:", ...utms.map((u) => `  ${u.label}: ${u.value}`)]
      : []),
    ``,
    `Message:`,
    record.message,
    ``,
    record.userAgent ? `Device: ${record.userAgent}` : null
  ]
    .filter((line) => line !== null)
    .join("\n");

  return { subject, html: layout(`New enquiry from ${record.name}`, inner), text };
}

/** Warm confirmation to the person who submitted the form. */
export function renderConfirmationEmail(record: EnquiryRecord): RenderedEmail {
  const subject = "We've received your enquiry";
  const firstName = record.name.split(/\s+/)[0] || record.name;

  const inner = `
    <p style="margin:0 0 4px;color:${BRAND.teal};font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Enquiry received</p>
    <h1 style="margin:0 0 18px;font-size:24px;line-height:1.25;color:${BRAND.ink};">Thanks, ${escapeHtml(firstName)} — we've got it.</h1>
    <p style="margin:0 0 16px;color:${BRAND.slate};font-size:15px;line-height:1.7;">
      Thank you for reaching out to Roble Media Lab. Your enquiry has landed with us and a real person will read it properly.
    </p>
    <p style="margin:0 0 16px;color:${BRAND.slate};font-size:15px;line-height:1.7;">
      We'll reply <strong style="color:${BRAND.ink};">within one business day</strong>. If it looks like we're a good fit, we'll invite you to a free 30-minute discovery call to talk through the next practical step for your business.
    </p>
    <p style="margin:0 0 20px;color:${BRAND.slate};font-size:15px;line-height:1.7;">
      There's nothing more you need to do right now.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr><td style="background:${BRAND.cloud};border:1px solid ${BRAND.line};border-radius:12px;padding:12px 18px;color:${BRAND.slate};font-size:13px;">
        Your reference: <strong style="color:${BRAND.ink};letter-spacing:.02em;">${escapeHtml(record.reference)}</strong>
      </td></tr>
    </table>
    <p style="margin:0 0 8px;">
      <a href="${site.url}" style="display:inline-block;background:${BRAND.ink};color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 24px;border-radius:999px;">Visit our website</a>
    </p>
    <p style="margin:26px 0 0;color:${BRAND.slate};font-size:14px;line-height:1.7;">
      Warm regards,<br>The Roble Media Lab team
    </p>
  `;

  const text = [
    `Thanks, ${firstName} — we've got it.`,
    ``,
    `Thank you for reaching out to Roble Media Lab. Your enquiry has landed with us and a real person will read it properly.`,
    ``,
    `We'll reply within one business day. If it looks like we're a good fit, we'll invite you to a free 30-minute discovery call to talk through the next practical step for your business.`,
    ``,
    `There's nothing more you need to do right now.`,
    ``,
    `Your reference: ${record.reference}`,
    ``,
    `Visit our website: ${site.url}`,
    ``,
    `Warm regards,`,
    `The Roble Media Lab team`
  ].join("\n");

  return { subject, html: layout("We've received your enquiry", inner), text };
}
