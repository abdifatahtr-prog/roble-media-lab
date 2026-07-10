// UTM capture. Attribution params often arrive on a landing page, then are lost as
// the visitor navigates to /contact. So we persist them in sessionStorage on first
// sight and read them back at submission time. Values are length-capped as a light
// guard against oversized/garbage input.

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content"
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type Utms = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = "rml_utms";
const MAX_LEN = 200;

function readFromUrl(): Utms {
  const params = new URLSearchParams(window.location.search);
  const found: Utms = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value.slice(0, MAX_LEN);
  }
  return found;
}

/** Called site-wide on navigation: if the current URL carries UTMs, remember them. */
export function persistUtmsFromUrl(): void {
  if (typeof window === "undefined") return;
  const fromUrl = readFromUrl();
  if (Object.keys(fromUrl).length === 0) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
  } catch {
    // sessionStorage unavailable (private mode / blocked) — non-fatal.
  }
}

/** Best available UTMs at submit time: current URL wins, else the persisted set. */
export function getUtms(): Utms {
  if (typeof window === "undefined") return {};
  const fromUrl = readFromUrl();
  if (Object.keys(fromUrl).length > 0) return fromUrl;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Utms) : {};
  } catch {
    return {};
  }
}
