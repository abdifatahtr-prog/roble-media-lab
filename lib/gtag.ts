import { sendGAEvent } from "@next/third-parties/google";
import { readConsent } from "@/lib/consent";

// GA4 events via the official @next/third-parties helper. sendGAEvent pushes to the
// dataLayer initialised by the <GoogleAnalytics /> component in the root layout, so
// it is safe to call and no-ops on the server.

type GaParams = Record<string, unknown>;

export function trackEvent(name: string, params: GaParams = {}): void {
  if (typeof window === "undefined") return;
  // Without consent there is no GA script and no dataLayer, so sendGAEvent would
  // only log its "GA has not been initialized" warning into the console of every
  // visitor who declined. Checking here also means every current and future call
  // site inherits the gate for free rather than having to remember it.
  if (readConsent() !== "granted") return;
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

/**
 * TEMPORARY diagnostic: reports the Turnstile widget lifecycle so we can see, from
 * a real first-time device, the exact error code and how long the widget takes to
 * produce a token. First-time visitors report a red "Verification failed" that
 * self-heals after ~8s; returning devices never see it. The console is unreadable
 * on a phone, so the signal goes to GA4 instead (see DebugView / the turnstile_diag
 * event). Remove this and the onDiag wiring once the root cause is confirmed.
 *
 * `ts_event`: verified | error | expired | timeout. `ts_code`: Cloudflare error
 * code (error only). `ts_ms`: ms from widget render to this event.
 */
export function trackTurnstile(
  event: "verified" | "error" | "expired" | "timeout",
  data: { code?: string; ms?: number } = {}
): void {
  trackEvent("turnstile_diag", {
    ts_event: event,
    ...(data.code ? { ts_code: data.code } : {}),
    ...(typeof data.ms === "number" ? { ts_ms: data.ms } : {})
  });
}
