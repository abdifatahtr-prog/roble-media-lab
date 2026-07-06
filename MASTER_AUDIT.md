# Roble Media Lab — Master Audit

_Last updated: 2026-07-06_

A full-stack audit of the Roble Media Lab website across business, technical, UX,
SEO, conversion, automation, and security dimensions. See
[IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md) for the sequenced task plan
and [AUTOMATION_PLAN.md](AUTOMATION_PLAN.md) for the automation architecture.

---

## Executive Summary

The site is a **clean, fast, well-architected foundation** with a **credible, honest
brand voice** — but it currently functions as a *brochure*, not a *sales engine*, and
does almost nothing to *demonstrate* the AI/automation services it sells. The largest
gap is that the site talks about automation and AI while containing none. A prospect
can read claims about the expertise but cannot feel it.

The code is genuinely good for its size (~490 lines of app/component code, fully
data-driven, accessible, secure headers, sensible SEO scaffolding). The problems are
strategic and content-level, not technical debt — meaning the path forward is
**additive**, not a rebuild.

### The three highest-impact gaps
1. **No trust / proof** — no testimonials, case studies, named founder, results, or
   photos. For a Kenya-based AI agency selling trust, this is the #1 conversion killer.
2. **No live demonstration** — no chatbot, instant-response, or interactive tools.
3. **No lead intelligence or follow-up** — a Tally form and a booking iframe with no
   CRM, no autoresponder, no qualification, no analytics. Leads fall into a void.

---

## Scorecard

| Metric | Score |
|---|---|
| Overall Business Score | **58 / 100** |
| Website Quality Score | **74 / 100** |
| Automation Maturity Score | **12 / 100** |
| Technical Architecture Score | **82 / 100** |
| Conversion Score | **34 / 100** |
| Trust Score | **22 / 100** |
| Growth Potential Score | **88 / 100** |

The hard part (a fast, professional, well-engineered site) is built. The parts that
convert and prove are missing. Growth potential is high because the fixes are mostly
additive content + automation.

---

## Phase 1 — Site Map

**Existing routes (16):** `/`, `/about`, `/services`, `/services/[slug]` (7 services),
`/blog`, `/blog/[slug]` (3 articles), `/resources` (empty), `/case-studies` (empty),
`/faq`, `/contact`, `/book`, `/search`, `/privacy`, `/terms`, `/not-found`.

**Missing pages that should exist:**
- Pricing / "How we invest together"
- Industries / Solutions (verticalised, high local-SEO value)
- Portfolio / selected work & demos
- Real Founder / Team page
- Thank-you / confirmation pages (form + booking) — needed for conversion tracking and
  automation triggers
- Individual lead-magnet pages (turn the 3 "coming soon" resources into real downloads)

---

## Phase 2 — Codebase Audit

**Verdict: A− foundation.** Modern, minimal, readable.

**Stack:** Next.js 15 (App Router, React 19), TypeScript strict, Tailwind 3 (barely
used — most styling lives in a 233-line hand-written `globals.css`), Framer Motion,
deployed to Cloudflare Workers via OpenNext.

**Strengths**
- Data-driven content model (`content/site.ts` is the single source of truth).
- Accessibility: skip link, `aria-*` on nav/FAQ, `prefers-reduced-motion`, focus-visible.
- Security headers in `next.config.mjs`; `poweredByHeader:false`.
- Proper metadata, canonicals, JSON-LD (Organization/Service/FAQPage/Article), sitemap + robots as code.
- Fonts via `next/font` (no layout shift).

**Findings**
| # | Finding | Severity | Location |
|---|---|---|---|
| 1 | `@next/mdx` + `@types/mdx` declared but MDX never wired up | Low | `package.json`, `next.config.mjs:11` |
| 2 | Blog article bodies hardcoded as JSX; doesn't scale | Medium | `app/blog/[slug]/page.tsx` |
| 3 | `/book` route missing from sitemap | Low | `app/sitemap.ts` |
| 4 | No analytics of any kind — flying blind | High (business) | — |
| 5 | No `og:image`; social shares render bare | Medium | `app/layout.tsx` |
| 6 | Tailwind configured but ~unused; two styling systems | Low | — |
| 7 | No CI gate before Cloudflare auto-deploys | Medium | — |
| 8 | Many files hand-minified to one-liners; hurts maintainability | Low | several `page.tsx` |
| 9 | No tests, no error monitoring | Low–Med | — |

No security-critical code issues. No secrets in repo. Forms are third-party iframes, so
minimal server-side injection surface.

---

## Phase 3 — Business Analysis

**Services:** AI Consulting, AI Implementation, Business Automation, WhatsApp
Automation, Content Systems, SEO & Content Strategy, AI Training — for
SMEs/startups/agencies/consultants in Kenya & East Africa.

**Strengths:** the honest voice is a genuine differentiator in an AI-hype-saturated
market; clear ICP; coherent messaging architecture.

**Weaknesses:** no proof; no pricing signal; WhatsApp automation is sold but not
demonstrated (a major missed on-brand proof point in a WhatsApp-first market);
undifferentiated service depth (every service uses the same 4-outcome/4-step template);
no named signature methodology.

---

## Phase 4 — UX & Design Audit (/10)

| Category | Score |
|---|---|
| Navigation | 8 |
| Visual hierarchy | 9 |
| Typography | 9 |
| Spacing & layout | 9 |
| Color consistency | 8 |
| Accessibility | 8 |
| Responsiveness | 8 |
| Forms | 5 |
| Booking experience | 6 |
| CTAs | 7 |
| Readability | 9 |
| **Trust signals** | **2** |
| Professional appearance | 9 |

**Average ≈ 7.3/10.** The design punches above the content. Fixing trust + forms + a
second conversion path pushes this to ~9.

---

## Phase 5 — Technical SEO Audit

**Solid:** unique titles/descriptions, template title pattern, canonicals, JSON-LD,
sitemap, semantic headings, `en_KE` locale, fast static pages.

**Gaps:** no `og:image`; no `LocalBusiness` schema (a real local-SEO miss for a Kenyan
business); thin content depth (3 posts, empty resources/case-studies); no
Industries/Solutions pages (missing high-intent local keywords); `/book` missing from
sitemap; `/search` should be `noindex`. Note: Cloudflare's managed `robots.txt` overrides
the app's `robots.ts` and **blocks AI crawlers + reserves EU-Directive rights** — this
also keeps content out of ChatGPT/Claude/Perplexity answers, an increasingly important
discovery channel. Strategic decision.

---

## Phase 6 — Conversion Audit

Roleplaying a skeptical Nairobi business owner: the site looks professional and the
honesty is refreshing, but **there is no way to know who Roble Media Lab is** — no
founder, faces, clients, or reviews — and only one high-commitment CTA ("book a call")
with no lighter step and no pricing. **Estimated current effectiveness: ~1–2%** of
qualified visitors act; the design would support 4–6% with proof + a conversion ladder
(WhatsApp / lead magnet / call).

Friction points: no proof · no pricing · single high-commitment CTA · no WhatsApp option
(in a WhatsApp-first market) · form has no reassurance/response-time promise · no live
chat/instant answer · no lead magnet.

---

## Phase 7 — Automation Audit

Nothing is automated today beyond the booking widget. See
[AUTOMATION_PLAN.md](AUTOMATION_PLAN.md) for the full architecture. Recommended backbone:
**n8n** (orchestration) + **Zoho** (system of record) + **Claude API** (intelligence).

---

## Phase 8 — Technology Stack Review

| Layer | Current | Verdict |
|---|---|---|
| Framework | Next.js 15 / React 19 | Keep |
| Styling | Tailwind (unused) + hand CSS | Consolidate |
| Hosting | Cloudflare Workers (OpenNext) | Keep |
| Email | Zoho Mail | Keep |
| Booking | Zoho Bookings (iframe) | Keep; improve UX |
| Forms | Tally | Add webhook→CRM |
| CRM | None | Add Zoho CRM |
| Analytics | None | Add (Cloudflare Web Analytics / Plausible) |
| Error monitoring | None | Add Sentry (optional) |
| CI/CD | Auto-deploy, no gate | Add GitHub Actions gate |
| CMS | TS files | Move blog to MDX |
| AI layer | None | Add Claude API |

---

## Security Assessment

- **Positive:** security headers set, no secrets committed, no server-side user input,
  Cloudflare WAF/bot management in front of the site.
- **Note:** Cloudflare bot management returns **403 to automated fetchers** — good for
  scraping defence, but be aware it can also block legitimate link-preview bots and some
  SEO tools. Verify social sharing and monitoring still work.
- **Recommend:** add a Content-Security-Policy header (currently absent), add
  Strict-Transport-Security, and add a CI security/dependency check.

---

## Overall Recommendation

Layer three things onto the strong foundation, in order: **(1) proof + measurement**,
**(2) a conversion ladder (WhatsApp / lead magnet / pricing)**, **(3) a live AI
demonstration layer**. Each is additive. Detailed sequence in
[IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md).
