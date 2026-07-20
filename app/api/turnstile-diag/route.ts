import { NextResponse } from "next/server";
import { saveTurnstileDiag } from "@/lib/db";

// TEMPORARY diagnostic sink for the Turnstile widget. The contact form beacons
// each widget lifecycle event here (fire-and-forget) so the real first-load
// error code is readable straight from D1 via wrangler, independent of GA4.
// Remove this route, lib/db.saveTurnstileDiag, and the client beacon once the
// root cause is confirmed.
export const dynamic = "force-dynamic";

const EVENTS = new Set(["verified", "error", "expired", "timeout"]);

export async function POST(request: Request): Promise<Response> {
  // Never let a diagnostic break anything: swallow all errors, always 204.
  try {
    const body = (await request.json().catch(() => ({}))) as {
      event?: unknown;
      code?: unknown;
      ms?: unknown;
    };

    const event = typeof body.event === "string" && EVENTS.has(body.event) ? body.event : null;
    if (!event) return new NextResponse(null, { status: 204 });

    const code = typeof body.code === "string" ? body.code.slice(0, 32) : null;
    const ms = typeof body.ms === "number" && Number.isFinite(body.ms) ? Math.round(body.ms) : null;
    const userAgent = request.headers.get("user-agent")?.slice(0, 400) ?? null;
    const country = request.headers.get("cf-ipcountry")?.slice(0, 8) ?? null;
    const referrer = request.headers.get("referer")?.slice(0, 400) ?? null;

    await saveTurnstileDiag({ event, code, ms, userAgent, country, referrer });
  } catch {
    // ignore — diagnostics must never surface an error to the visitor
  }
  return new NextResponse(null, { status: 204 });
}
