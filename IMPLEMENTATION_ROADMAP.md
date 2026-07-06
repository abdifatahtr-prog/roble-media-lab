# Roble Media Lab — Implementation Roadmap

_Last updated: 2026-07-06_

Sequenced task plan derived from [MASTER_AUDIT.md](MASTER_AUDIT.md). Each task lists
**Priority · Difficulty · Effort · Impact · Depends on**.

Legend — Priority: P0 (do first) … P3. Difficulty/Impact: Easy/Med/Hard, Low/Med/High/Very High.

---

## 🔴 Immediate (this week) — trust + measurement

| # | Task | P | Difficulty | Effort | Impact | Depends on |
|---|---|---|---|---|---|---|
| 1 | Add analytics (Cloudflare Web Analytics or Plausible) | P0 | Easy | 1h | High | none |
| 2 | Real Founder/About section: name, photo, story, credentials | P0 | Easy | 2h | Very High | founder content |
| 3 | Dynamic `og:image` + social meta (`summary_large_image`) | P0 | Easy | 1h | Med | none |
| 4 | WhatsApp CTA (floating button + click-to-chat) | P0 | Easy | 1h | High | WhatsApp number |
| 5 | Testimonials / "trusted by" strip (real content only) | P0 | Easy | 1–2h | Very High | 2–3 testimonials |

**Status:** In progress. Machinery is config-driven; trust sections render only when
real content is supplied (nothing fabricated ships). Inputs required from owner:
WhatsApp number, founder bio + photo, testimonials, analytics token.

---

## 🟠 This week → next two weeks — conversion ladder

| # | Task | P | Difficulty | Effort | Impact | Depends on |
|---|---|---|---|---|---|---|
| 6 | Lead autoresponder + Tally→Zoho CRM webhook | P1 | Med | ½ day | Very High | Zoho CRM |
| 7 | Pricing / "How we invest together" page (tiers or "from") | P1 | Med | ½ day | High | pricing decisions |
| 8 | Lead magnet: turn 3 "coming soon" resources into gated downloads | P1 | Med | 1 day | High | content |
| 9 | Thank-you pages (form + booking) for tracking + triggers | P1 | Easy | 2h | Med | #1 |
| 10 | Sitemap fix (`/book`), `LocalBusiness` schema, `noindex` `/search` | P1 | Easy | 1h | Med (SEO) | none |

---

## 🟡 Next month — the demonstration layer (differentiator)

| # | Task | P | Difficulty | Effort | Impact | Depends on |
|---|---|---|---|---|---|---|
| 11 | AI site assistant (Claude API): answer, qualify, book | P1 | Hard | 3–5 days | Very High | #1, CRM |
| 12 | WhatsApp qualification bot (Cloud API + n8n + Claude) | P1 | Hard | 3–5 days | Very High | WhatsApp Business API |
| 13 | Industries/Solutions pages (3–4 verticals) | P2 | Med | 2 days | High (SEO) | content |
| 14 | Migrate blog to MDX (deps already installed) + 3–5 new posts | P2 | Med | 2 days | Med | none |
| 15 | First real case study (start with your own pipeline) | P1 | Med | 1 day | High | a completed project |

---

## 🟢 Next three months — systemize & scale

| # | Task | P | Difficulty | Effort | Impact | Depends on |
|---|---|---|---|---|---|---|
| 16 | Full n8n automation backbone (proposals, onboarding, reviews, reporting) | P2 | Hard | 1–2 wk | High | CRM |
| 17 | Productize the Client Delivery Framework (templates/checklists) | P2 | Med | ongoing | High (ops) | none |
| 18 | CI gate (GitHub Actions) + Sentry + consolidate CSS + prune dead deps | P3 | Med | 1 day | Med | none |
| 19 | Content engine: cadence, repurposing automation, internal-linking pass | P2 | Med | ongoing | High (SEO) | #14 |
| 20 | Booking UX upgrade: pre-call context, reminders, no-show recovery | P3 | Med | ½ day | Med | CRM |

---

## Success criteria

- **Measurement:** analytics live; conversion events tracked on form submit + booking.
- **Trust:** founder visible; ≥3 real testimonials or client logos; ≥1 case study.
- **Conversion:** ≥3 distinct CTAs (WhatsApp, lead magnet, call); pricing signal present.
- **Demonstration:** at least one live automation a visitor can experience (WhatsApp bot
  or site AI assistant).
- **Automation maturity:** lead → CRM → autoresponder pipeline operational.

---

## Working rules (from the engagement brief)

- No code merged without owner review; small, meaningful commits.
- Preserve existing functionality unless there's a clear reason to change it.
- Update this file and [MASTER_AUDIT.md](MASTER_AUDIT.md) whenever functionality changes.
- Never ship fabricated proof — trust components render only with real data.
