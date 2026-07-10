// Human-readable enquiry reference, e.g. "RML-20260710-K7QZ".
// Format: RML-<YYYYMMDD>-<4 random chars>. The date groups enquiries by day; the
// random suffix (Crockford-style alphabet, no ambiguous 0/O/1/I/L) keeps it unique
// and easy to read aloud or quote in an email. Generated once at creation and stored.

const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const SUFFIX_LENGTH = 4;

export function generateReference(date: Date = new Date()): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");

  const bytes = new Uint8Array(SUFFIX_LENGTH);
  crypto.getRandomValues(bytes);
  let suffix = "";
  for (const byte of bytes) suffix += ALPHABET[byte % ALPHABET.length];

  return `RML-${y}${m}${d}-${suffix}`;
}
