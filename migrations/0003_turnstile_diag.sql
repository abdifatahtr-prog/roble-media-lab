-- TEMPORARY diagnostic table for the Turnstile widget lifecycle.
-- First-time visitors report a red "Verification failed" that self-heals after
-- ~8s; returning devices never see it. This records the widget's events (with
-- Cloudflare's error code and ms-since-render) so the real production error code
-- can be read directly via wrangler, without depending on GA4.
-- Drop this table once the root cause is confirmed and the diagnostic is removed.

CREATE TABLE IF NOT EXISTS turnstile_diag (
  id         TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  event      TEXT NOT NULL,   -- verified | error | expired | timeout
  code       TEXT,            -- Cloudflare error code (error events only)
  ms         INTEGER,         -- ms from widget render to this event
  user_agent TEXT,
  country    TEXT,            -- CF-IPCountry, to confirm real-device traffic
  referrer   TEXT
);

CREATE INDEX IF NOT EXISTS idx_turnstile_diag_created_at ON turnstile_diag (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_turnstile_diag_event ON turnstile_diag (event);
