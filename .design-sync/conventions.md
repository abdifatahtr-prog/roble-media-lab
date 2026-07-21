# Roble Media Lab — the "Working System" design language

Practical AI, automation and websites for SMEs in Kenya and East Africa. The look is
**editorial and systems-flavoured**: a near-black ink canvas, one teal accent, a
monospace "system label" voice for eyebrows and data, and generous Sora display type.

## No wrapper, no provider

Components render standalone. There is no ThemeProvider, no context, no required root
element — import from `window.RML` and render. Tokens live in `:root` in the stylesheet,
so anything inside the page picks them up.

## Style with semantic classes and CSS variables — NOT utility classes

This is the single most important rule. The components come from a Next.js app whose CSS
is hand-written semantic classes plus CSS custom properties. **Tailwind utilities are not
available**: the shipped stylesheet was compiled against the app's own markup, so `p-4`,
`text-center`, `mx-auto`, `gap-6` and friends resolve to nothing and silently render
unstyled. Use the real class names below, `var(--token)` values, or plain inline styles.

Read `_ds/<folder>/styles.css` and its `@import` closure (it pulls in `_ds_bundle.css`,
the full compiled sheet) before styling anything — it is the authority, and it is short
enough to scan.

### Colour and type tokens

| Token | Use |
|---|---|
| `--ink` `#0b1020`, `--ink-soft` | Primary text; the dark canvas for full-bleed sections |
| `--cloud` `#f8fafc`, `--mist`, `--white` | Page and panel backgrounds |
| `--teal` | The brand accent — fills, rules, decorative marks |
| `--teal-dark` | Teal for **text/icons on light** surfaces (AA down to `--mist`) |
| `--teal-light` | Teal for **text/icons on dark** surfaces — `--teal-dark` fails contrast there |
| `--blue` | Focus rings (`:focus-visible` is already wired globally) |
| `--lime` | Sparingly: the "live" pulse dot |
| `--slate`, `--slate-soft` | Secondary and muted body text on light |
| `--line` | Hairline borders |
| `--radius` `22px`, `--shadow` | Card geometry and the standard lift shadow |
| `--font-sora` | Display: headlines only |
| `--font-inter` | Body text (the page default) |
| `--font-mono` / `--mono` | IBM Plex Mono — eyebrows, node tags, data labels |

Getting the two teals backwards is the most common way to break this system. Light
surface → `--teal-dark`. Dark surface → `--teal-light`.

### The class vocabulary

Layout — `.shell` (the centred max-1180px column, use it inside every section),
`.section`, `.section-compact`, `.section-heading`, `.content-section`, `.dark-section`,
`.soft-section`, `.narrow`, `.split-heading`.

Actions — `.button` (dark pill, the default), `.button-light` (on ink), `.button-on-dark`
(ghost on ink), `.button-quiet`, `.button-small`, `.button-row`, `.text-link` (inline
arrow link), `.all-services-link`, `.icon-link` (expands the tap target to 44px).

Labels — `.eyebrow` is the mono kicker with the leading dash that opens most sections;
`.eyebrow-light` is its on-ink counterpart.

Cards and content — `.plain-card`, `.plain-grid`, `.service-card` / `.service-grid` /
`.service-cue` / `.service-number`, `.price-card` / `.price-grid` / `.price-amount`,
`.article-card`, `.principle` / `.principle-grid`, `.callout` (+ `.callout-tip`,
`.callout-warning`, `.callout-label`), `.next-steps-card`, `.flow` / `.flow-node` /
`.flow-line`, `.prose` (long-form article body).

State — `.is-active`, `.is-open`, `.is-scrolled`, `.is-featured`, `.sr-only`.

Prefer composing a library component over rebuilding one: `CTA`, `Header`, `Footer`,
`PageHero`, `FAQList`, `ArticleCard` already encode the house layout.

## Accessibility is already paid for — don't undo it

The site targets WCAG 2.2 AA and the CSS carries that work: a global `:focus-visible`
ring, 44px minimum tap targets via `.icon-link`, `scroll-padding-top` clearing the fixed
header, and AA-checked text pairings. Don't remove focus outlines, and keep the teal
pairing rule above.

## Voice

Plain, specific, honest. No hype, no invented metrics, and **never fabricated testimonials,
client logos or results** — the real site ships those sections empty until there is
something true to put in them. Copy is British-leaning ("organising", "personalised").

## A representative build

```jsx
const { PageHero, CTA, FAQList } = window.RML;

<>
  <PageHero eyebrow="What we do" title="Practical AI, automation and websites">
    We find the repetitive work worth automating, then build the system that handles it.
  </PageHero>

  <section className="section">
    <div className="shell">
      <span className="eyebrow">How it works</span>
      <h2>Start with one workflow</h2>
      <div className="plain-grid">
        <article className="plain-card">
          <h3>Discovery</h3>
          <p style={{ color: "var(--slate)" }}>A 30-minute call to find the bottleneck.</p>
          <a className="text-link" href="/contact">Book a call</a>
        </article>
      </div>
    </div>
  </section>

  <FAQList items={[["Do you build websites?", "Yes — it is one of the four things we do."]]} />
  <CTA />
</>
```
