import { sendGAEvent } from "@next/third-parties/google";

// GA4 events via the official @next/third-parties helper. sendGAEvent pushes to the
// dataLayer initialised by the <GoogleAnalytics /> component in the root layout, so
// it is safe to call and no-ops on the server.

type GaParams = Record<string, unknown>;

export function trackEvent(name: string, params: GaParams = {}): void {
  if (typeof window === "undefined") return;
  sendGAEvent("event", name, params);
}

/** GA4 recommended lead event, fired after a successful contact submission. */
export function trackGenerateLead(params: { selected_service?: string; page_location?: string }): void {
  trackEvent("generate_lead", {
    form_name: "contact",
    ...params
  });
}

/**
 * Clicks on the two CTAs that are NOT the enquiry form.
 *
 * Deliberately separate event names rather than folding them into generate_lead:
 * generate_lead is a confirmed submission and is already a GA4 Key Event, whereas
 * these are intent clicks (someone can open WhatsApp and never send). Mixing them
 * would quietly corrupt the one number that currently means something.
 *
 * Mark `whatsapp_click` as a Key Event in GA4 alongside generate_lead, since
 * WhatsApp is now the primary funnel entry. Without it, promoting WhatsApp makes
 * form submissions fall and conversions look like they collapsed.
 */
export function trackCtaClick(
  name: "whatsapp_click" | "book_call_click",
  params: { link_location?: string; link_text?: string; page_path?: string; service?: string } = {}
): void {
  trackEvent(name, params);
}
