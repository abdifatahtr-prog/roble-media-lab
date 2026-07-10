import { getCloudflareContext } from "@opennextjs/cloudflare";

// Reads a server-side secret/var. Checks process.env first (works in most OpenNext
// setups and plain Node), then falls back to the Cloudflare binding context, which
// is where `.dev.vars` (local) and `wrangler secret` (production) values live.
// Returns undefined when unset, so callers can degrade gracefully.
export function serverEnv(key: string): string | undefined {
  const fromProcess = process.env[key];
  if (fromProcess) return fromProcess;
  try {
    const env = getCloudflareContext().env as unknown as Record<string, string | undefined>;
    return env[key];
  } catch {
    return undefined;
  }
}
