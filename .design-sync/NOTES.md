# design-sync notes — Roble Media Lab

This repo is **not** a component library. It is the live Next.js website, and the sync
treats a hand-written entry (`.design-sync/ds-entry.tsx`) as the design-system surface.
Everything below exists because of that.

## How the pieces fit

- `ds-entry.tsx` — the DS surface. Names exactly the presentational components worth
  designing with. Adding a component to the sync means adding it here **and** to
  `cfg.componentSrcMap` (which also drives the `.d.ts` prop contracts).
- `build-ds.mjs` (`cfg.buildCmd`) — runs before the converter every time. Inlines
  `public/` assets, compiles Tailwind, self-hosts fonts, emits type declarations.
- `shims/` — stand-ins for `next/link`, `next/image`, `next/script`, `next/navigation`
  and `process.env`. Without these the bundle drags in real Next and dies in a browser.
- `previews/` — hand-authored preview cards. Owned files; the converter never edits them.

## Deliberate exclusions

- **Infrastructure components** (`analytics`, `conversion-tracking`, `utm-capture`,
  `turnstile`, `reading-progress`, `contact-form`, `search-client`, `whatsapp-button`)
  render nothing designable or wrap a third-party widget. Left out on purpose.
- **`Testimonials`** is excluded because `testimonials` and `clients` in
  `content/site.ts` are empty arrays by design — the house rule is no fabricated proof,
  so the component renders an empty section. **Re-include it once real testimonials
  exist**, not before.

## Landmines (each cost a debugging cycle)

- **`cfg.tsconfig` must contain no `/*` sequence.** design-sync's `tsconfigPathsPlugin`
  strips block comments with a naive regex *before* `JSON.parse`. A perfectly normal
  `"@/*"` alias opens a "comment", the parse throws, and the plugin returns **null
  silently** — every shim is ignored, real `next/navigation` gets bundled, and
  `usePathname()` returns null so `Header` renders blank. `tsconfig.ds.json` is therefore
  exact-match keys only; `tsconfig.dts.json` (used by tsc, not the plugin) can use
  wildcards. The `@/` alias still resolves because esbuild finds the repo-root
  `tsconfig.json` on its own.
- **`CTA` needs the forked `dts.mjs`.** The stock `isComponentName` rejects
  `/^[A-Z][A-Z0-9_]+$/` as a SCREAMING_CASE constant, silently dropping `CTA`. The fork
  (`overrides/dts.mjs`, declared in `cfg.libOverrides`) makes any name pinned in
  `componentSrcMap` win. It also repoints `findTypesRoot` at the emitted declarations.
- **Prop contracts need the tsc declaration pass.** Without it every component ships
  `[key: string]: unknown` and the design agent learns nothing about the APIs. Components
  whose props are inline destructured object types still need a `cfg.dtsPropsFor` entry —
  only a named `<Name>Props` type (as `Reveal` has) is extracted automatically.
- **`Reveal` needs the reduced-motion stub in its preview.** It starts at `opacity: 0`
  and animates on framer-motion's `whileInView`. The capture browser freezes the clock
  (`page.clock.setFixedTime`) and the intersection doesn't fire reliably across
  successive story navigations, so cells photograph blank. `MotionConfig` does **not**
  fix this — framer-motion's `useReducedMotion()` reads the media query directly, not the
  config context — so the preview stubs `window.matchMedia` at module scope. Any future
  motion component needs the same treatment.
- **`Header` and `Footer` need a wide viewport** (`cfg.overrides`, 1280px). Below the
  breakpoint `Header` collapses to the mobile hamburger and the desktop nav is invisible.
  Both are `cardMode: single` because `.site-header` is `position: fixed` and escapes a
  grid cell.
- **`CoverArt` must be previewed inside `.post-cover`.** On its own it is near-invisible
  pale line work on white; the ink panel it is drawn against comes from the wrapper.
- **Viewport/`cardMode` edits require a full `package-build.mjs`**, not
  `preview-rebuild.mjs` — the targeted loop rejects them with `[CONFIG_STALE]`.

## Known render warns (expected — not new)

- None outstanding. The final validate ran with zero warnings.
- If `[RENDER_THIN]` reappears for **`CoverArt`**, it is benign in principle: the
  component is pure SVG art with no text. Confirm the screenshot shows the ink panel
  before dismissing it.
- Cards show **"© 2024 Roble Media Lab"**. That is not a bug: `footer.tsx` uses
  `new Date().getFullYear()` and the capture browser's clock is pinned to 2024-05-15.

## Re-sync risks — what to watch

- **Fonts are fetched from Google Fonts once** and committed under `fonts/`.
  `build-ds.mjs` skips the download when they exist, so a re-sync is offline-safe, but a
  deliberate refresh needs network. Inter and Sora are **variable** fonts: many
  `@font-face` rules share one file, which is why downloads are deduped by URL. A naive
  rewrite emits rules pointing at files that were never written.
- **`dtsPropsFor` is hand-transcribed** from the emitted declarations, including the
  inlined `PostMeta`/`Post` shapes for `ArticleCard` and `PostCover`. **If those types
  change in `lib/blog.ts`, these silently go stale** — nothing cross-checks them. Re-read
  `.design-sync/.cache/types/components/*.d.ts` after any blog-type change.
- **Preview content is copied from real data** (`content/site.ts` FAQs,
  `content/blog-data.json` posts). If a post is renamed or removed, `CoverArt` and
  `ArticleCard` previews still reference the old slug — the art is generated from the
  slug so it will still render, just for a post that no longer exists.
- **The Tailwind compile is content-driven.** `ds-styles.css` only contains utilities the
  app itself uses, which is almost none. That is why `conventions.md` tells the design
  agent not to use utility classes. If the app starts using Tailwind heavily, revisit.
- The tsc declaration pass reports pre-existing type errors (a `contact-form` arity error
  and duplicate `@types/react` resolution from the `.design-sync/node_modules` symlink).
  Emit succeeds regardless, so `build-ds.mjs` ignores the exit code deliberately — but
  that also means a *real* future breakage would only show up as thin prop contracts.
  The build fails loudly if **no** declarations are emitted.
