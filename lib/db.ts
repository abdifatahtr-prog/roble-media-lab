import { getCloudflareContext } from "@opennextjs/cloudflare";
import { log } from "@/lib/log";
import { generateReference } from "@/lib/reference";

// Enquiry storage on Cloudflare D1. The binding (DB) is declared in wrangler.jsonc
// and only exists once the database is created and bound (see README / .env.example).
// Every function degrades gracefully when D1 is not yet configured, so the contact
// form keeps working (email-only) before the database is set up.

export type EnquiryStatus = "new";

export interface EnquiryInput {
  name: string;
  email: string;
  company: string | null;
  selectedService: string | null;
  message: string;
  userAgent: string | null;
  referrer: string | null;
  ip: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
}

export interface EnquiryRecord extends EnquiryInput {
  id: string;
  reference: string;
  createdAt: string;
  status: EnquiryStatus;
}

// Minimal D1 typings so we do not depend on generated Cloudflare types (which are
// gitignored and may be absent in a clean checkout).
interface D1RunResult {
  success: boolean;
}
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<D1RunResult>;
}
interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

function getDb(): D1Database | null {
  try {
    const env = getCloudflareContext().env as unknown as { DB?: D1Database };
    return env.DB ?? null;
  } catch {
    return null;
  }
}

export function buildEnquiry(input: EnquiryInput, reference?: string): EnquiryRecord {
  const createdAt = new Date();
  return {
    id: crypto.randomUUID(),
    reference: reference ?? generateReference(createdAt),
    createdAt: createdAt.toISOString(),
    status: "new",
    ...input
  };
}

/**
 * Persists an enquiry to D1. Never throws: returns true on success, false if D1 is
 * unconfigured or the insert fails, so the caller can continue to the email step.
 */
export async function saveEnquiry(record: EnquiryRecord): Promise<boolean> {
  const db = getDb();
  if (!db) {
    log.warn("d1_unconfigured", { ref: record.reference });
    return false;
  }

  try {
    const result = await db
      .prepare(
        `INSERT INTO enquiries
           (id, reference, created_at, name, email, company, selected_service, message,
            user_agent, referrer, ip, status,
            utm_source, utm_medium, utm_campaign, utm_term, utm_content)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        record.id,
        record.reference,
        record.createdAt,
        record.name,
        record.email,
        record.company,
        record.selectedService,
        record.message,
        record.userAgent,
        record.referrer,
        record.ip,
        record.status,
        record.utmSource,
        record.utmMedium,
        record.utmCampaign,
        record.utmTerm,
        record.utmContent
      )
      .run();
    const ok = result.success !== false;
    if (ok) log.info("d1_saved", { ref: record.reference });
    else log.error("d1_save_failed", { ref: record.reference, reason: "unsuccessful_result" });
    return ok;
  } catch (error) {
    log.error("d1_save_failed", { ref: record.reference, reason: (error as Error)?.message });
    return false;
  }
}

// --- TEMPORARY: Turnstile widget diagnostics --------------------------------
// Records each Turnstile lifecycle event so the real first-load error code can
// be read straight from D1 (wrangler d1 execute). Remove with the turnstile_diag
// table/route once the root cause is confirmed. Never throws.

export interface TurnstileDiagInput {
  event: string; // verified | error | expired | timeout
  code: string | null;
  ms: number | null;
  userAgent: string | null;
  country: string | null;
  referrer: string | null;
}

export async function saveTurnstileDiag(input: TurnstileDiagInput): Promise<boolean> {
  const db = getDb();
  if (!db) return false;
  try {
    const result = await db
      .prepare(
        `INSERT INTO turnstile_diag (id, created_at, event, code, ms, user_agent, country, referrer)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        crypto.randomUUID(),
        new Date().toISOString(),
        input.event,
        input.code,
        input.ms,
        input.userAgent,
        input.country,
        input.referrer
      )
      .run();
    return result.success !== false;
  } catch (error) {
    log.error("turnstile_diag_save_failed", { reason: (error as Error)?.message });
    return false;
  }
}
