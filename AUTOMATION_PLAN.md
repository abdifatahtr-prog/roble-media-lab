# Roble Media Lab — Automation Plan

_Last updated: 2026-07-06_

How to turn the website from a static brochure into a system that captures, qualifies,
routes, and nurtures leads automatically — while doubling as a live demonstration of the
automation services Roble Media Lab sells.

---

## Architecture

```
                    ┌────────────────────────────────────────────┐
   Website forms ──▶│                                            │
   WhatsApp     ──▶ │   n8n  (orchestration / workflow canvas)   │──▶ Slack/Email (internal alerts)
   Booking      ──▶ │                                            │──▶ Reporting digest
                    └───────────────┬───────────────┬────────────┘
                                    │               │
                            ┌───────▼──────┐  ┌──────▼───────┐
                            │  Zoho CRM    │  │  Claude API  │
                            │ (system of   │  │ (qualify,    │
                            │  record)     │  │  draft, chat)│
                            └──────────────┘  └──────────────┘
```

**Backbone: n8n.** Chosen because it is transparent (you can show clients the workflow
canvas as a deliverable), self-hostable (data sovereignty is a selling point for Kenyan
clients), affordable, and integrates with Zoho, WhatsApp, and Claude. Zoho is the system
of record (you already use Zoho Mail + Bookings). Claude API is the intelligence layer.

Alternative if you prefer no-ops: **Zoho Flow** (native to your Zoho stack) for the
simple flows, keeping n8n for anything AI-driven.

---

## Prioritised workflows

### Tier 1 — Do first (highest ROI, lowest effort)

| Workflow | Trigger | Steps | Platform |
|---|---|---|---|
| **Lead capture → CRM** | Tally form submit (webhook) | Create/update Zoho CRM lead; tag source | n8n → Zoho CRM |
| **Instant autoresponder** | New lead | Send branded acknowledgement within 60s with expectations + calendar link | n8n / Zoho Flow |
| **Internal notification** | New lead | Post to Slack/email with lead summary | n8n |
| **Booking → onboarding** | Zoho Bookings event | Confirmation, prep questions, reminders, no-show follow-up | Zoho Flow |

### Tier 2 — Demonstration layer (your differentiator)

| Workflow | Trigger | Steps | Platform |
|---|---|---|---|
| **AI lead qualification** | New lead | Claude scores fit + urgency, drafts a suggested reply, routes hot leads | n8n + Claude |
| **WhatsApp qualification bot** | Inbound WhatsApp | Structured questions → qualify → book or route to human | WhatsApp Cloud API + n8n + Claude |
| **Site AI assistant** | Website chat | Answer service questions, capture lead, offer booking | Next.js route → Claude API |

### Tier 3 — Scale & retain

| Workflow | Trigger | Steps | Platform |
|---|---|---|---|
| **AI proposal drafting** | Post-discovery | Claude turns notes → proposal draft in template | Claude + Zoho/PandaDoc |
| **Review & referral requests** | Project marked complete | Timed cadence asking for review + referral | Zoho CRM cadences |
| **Content repurposing** | New blog post | Draft social variants, queue in scheduler | n8n + Claude + Buffer/Zoho Social |
| **Weekly reporting digest** | Schedule | Pull leads/bookings/traffic → summarise → email | n8n + Claude |

---

## The self-demonstration principle

Every automation above should be **visible to prospects as proof**, not hidden ops:

- The instant autoresponder means a prospect *experiences* sub-minute response — the
  thing you sell — within a minute of contacting you.
- The WhatsApp bot lets a visitor *trigger* a real qualification flow themselves.
- A "How this site's own automation works" case study narrates your live pipeline as the
  first case study, before any client work exists.

When a prospect's own enquiry is handled by a slick automated pipeline, they conclude:
"if their site does this, they can build it for me." The website becomes the pitch.

---

## Implementation notes

- Store all API keys in Cloudflare Worker secrets / environment (never in repo).
- Add thank-you pages so form + booking completions fire measurable conversion events
  and can act as automation triggers.
- Start with Tier 1 (a day of work, immediately useful), then build one Tier 2 demo
  (WhatsApp bot is the most on-brand for the Kenyan market).
- Log every automation run; design a human-handoff/escape hatch into each flow — this is
  exactly the "keep a person responsible" principle Roble Media Lab preaches.

---

## Dependencies to provision

- [ ] Zoho CRM account + API credentials
- [ ] n8n instance (n8n Cloud or self-hosted on Cloudflare/VPS)
- [ ] WhatsApp Business (Cloud API) number + Meta app
- [ ] Anthropic (Claude) API key
- [ ] Tally webhook enabled on the contact form
- [ ] Slack workspace or notification email for internal alerts
