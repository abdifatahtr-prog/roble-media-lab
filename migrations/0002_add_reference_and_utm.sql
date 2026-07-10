-- Adds a human-readable reference and UTM attribution to enquiries.

ALTER TABLE enquiries ADD COLUMN reference TEXT;
ALTER TABLE enquiries ADD COLUMN utm_source TEXT;
ALTER TABLE enquiries ADD COLUMN utm_medium TEXT;
ALTER TABLE enquiries ADD COLUMN utm_campaign TEXT;
ALTER TABLE enquiries ADD COLUMN utm_term TEXT;
ALTER TABLE enquiries ADD COLUMN utm_content TEXT;

-- References are unique; NULLs (pre-existing rows) remain allowed and distinct in SQLite.
CREATE UNIQUE INDEX IF NOT EXISTS idx_enquiries_reference ON enquiries (reference);
