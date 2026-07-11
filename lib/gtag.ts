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
