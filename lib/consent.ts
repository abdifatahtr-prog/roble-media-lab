/**
 * Cookie consent, kept deliberately small.
 *
 * The site sets exactly one non-essential family of cookies: Google Analytics
 * (`_ga`, `_ga_<id>`). Everything else it stores is either strictly necessary
 * (Cloudflare bot protection, this consent choice) or sessionStorage that never
 * leaves the browser (UTM capture in lib/utm.ts).
 *
 * So the model here is a hard gate, not Google Consent Mode: the GA script is not
 * loaded at all until someone says yes, which means there is nothing to argue
 * about — before consent, no analytics cookie exists. The cost is that visitors
 * who decline are invisible to GA4 entirely, including modelled conversions.
 * Cloudflare Web Analytics still counts them, cookielessly, so the traffic
 * baseline stays honest.
 *
 * The choice itself lives in a first-party cookie rather than localStorage for
 * two reasons: it expires on its own (so we re-ask twice a year instead of
 * assuming a 2021 answer still holds), and a cookie is the one storage mechanism
 * that is unambiguously "strictly necessary" when its only job is remembering
 * that someone said no.
 */

export type ConsentChoice = "granted" | "denied";

const COOKIE_NAME = "rml_consent";
/** Six months. Long enough not to nag, short enough that the answer stays current. */
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

/**
 * Dispatched on `window` whenever the choice changes, so components already
 * mounted (the GA gate, the settings panel) can react without a page reload and
 * without a shared context provider.
 */
export const CONSENT_EVENT = "rml:consent";

/** The stored choice, or null if this visitor has not answered yet. */
export function readConsent(): ConsentChoice | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)rml_consent=(granted|denied)(?:;|$)/);
  return match ? (match[1] as ConsentChoice) : null;
}

/** Records the choice, clears analytics cookies on refusal, and notifies listeners. */
export function writeConsent(choice: ConsentChoice): void {
  if (typeof document === "undefined") return;
  // Secure is skipped on http so the cookie still works on localhost during dev.
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${choice}; Path=/; Max-Age=${MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  if (choice === "denied") dropAnalyticsCookies();
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
}

/**
 * Deletes any Google Analytics cookies already on the device.
 *
 * Withdrawing consent has to actually remove what was set, not just stop setting
 * more. A cookie can only be deleted by rewriting it with the same Domain, and GA
 * writes to the registrable domain (`.roblemedialab.co.ke`), not the host — so we
 * expire each name against every domain the browser would accept. The extra
 * attempts are no-ops rather than errors.
 *
 * Deleting once at the moment of withdrawal is NOT enough, which is why this is
 * exported and also run on load by the gate in components/analytics.tsx. gtag is
 * still resident in the page when someone clicks "turn analytics off", and it
 * rewrote `_ga_<id>` in the gap between the deletion and the reload — verified,
 * not theorised. The second sweep happens on a page where gtag was never loaded,
 * so there is nothing left to put them back.
 */
export function dropAnalyticsCookies(): void {
  if (typeof document === "undefined") return;
  const names = document.cookie
    .split(";")
    .map((pair) => pair.split("=")[0].trim())
    // _gid and _gat are legacy Universal Analytics names, harmless to include and
    // one less thing to remember if a tag manager ever reintroduces them.
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid" || name.startsWith("_gat"));
  if (names.length === 0) return;

  const parts = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; Domain=.${parts.slice(i).join(".")}`);

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Path=/; Max-Age=0${domain}`;
    }
  }
}
