// Small, framework-safe GA4 helper. Every call is a no-op when GA4 is not loaded
// (no NEXT_PUBLIC_GA_ID, script blocked, or server render), so it never breaks the app.

type GtagParams = Record<string, unknown>;

interface GtagWindow extends Window {
  gtag?: (command: string, ...args: unknown[]) => void;
}

export function trackEvent(name: string, params: GtagParams = {}): void {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  if (typeof w.gtag !== "function") return;
  w.gtag("event", name, params);
}

/** GA4 recommended lead event, fired after a successful contact submission. */
export function trackGenerateLead(params: { selected_service?: string; page_location?: string }): void {
  trackEvent("generate_lead", {
    form_name: "contact",
    ...params
  });
}
