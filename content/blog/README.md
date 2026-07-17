# Blog — how to publish a post

One post = one `.mdx` file in this folder. The filename is the URL slug
(`where-to-start-with-ai.mdx` → `/blog/where-to-start-with-ai`). No other file
needs editing — the listing, sitemap, and site search pick it up automatically.

## Frontmatter

```yaml
---
title: Where should a small business start with AI?
description: A grounded framework for finding useful AI opportunities without buying tools first.
date: 2026-07-01          # yyyy-mm-dd
pillar: ai                # ai | automation | websites | seo-content | operations | case-studies
draft: true               # optional — hides the post from the live site
updated: 2026-08-01       # optional — shows "Updated ..." in the byline, feeds dateModified + sitemap
cover: /blog/my-image.png # optional — real featured image (file goes in public/blog/)
coverAlt: What the image shows  # pairs with cover
---
```

- **title / description / date / pillar** are required. Description doubles as the
  SEO meta description and the listing blurb, so keep it tight (~150 chars).
- **read time is measured, not declared.** There is deliberately no `readTime`
  field: it is always counted from the body at ~200 wpm. A typed-in value drifts
  the moment you edit the post, and three posts once advertised "4-6 min read" on
  about 150 words. Promising six minutes and delivering one makes the whole
  library look padded — the last impression an agency selling content wants.
- **pillar** must be one of the six ids above (defined in `scripts/generate-blog.mjs`,
  mirrored in `lib/blog.ts` — change both). They track the four services, so a post's
  pillar tells you which service page it should link back to.
- **draft: true** keeps a work-in-progress out of the listing, sitemap, and search.
- **The article chrome is automatic.** Byline ("By Roble Media Lab"), published
  date, measured read time, featured cover, reading-progress bar, share buttons,
  related articles, and the closing discovery-call CTA are all part of the
  template — never add them to a post body. (No author box: /about covers who
  we are, so articles end at Share → Keep reading → CTA.)
- **Featured image**: every post gets a branded cover automatically. Each post
  should also get its own illustration — a small SVG scene registered by slug
  in `components/cover-art.tsx` (drawing rules and palette are documented at
  the top of that file). Until a scene is registered, the post shows the plain
  branded panel, so publishing never blocks on artwork. Add `cover`/`coverAlt`
  frontmatter only when you have a real, topic-specific image — it then
  replaces the illustration and becomes the social-share (OG) image.
- **Table of contents is automatic** on posts of ~1,200+ words with at least
  three `##` sections (see `showToc` in `lib/blog.ts`). Nothing to declare.

## Body

Write in plain **Markdown**. Use `##` for section headings (the page title comes
from frontmatter — don't repeat it as an `#` heading). Links like
`[our automation service](/services/ai-business-automation)` work normally. Styling
comes from the `.prose` wrapper — just write content.

Need something Markdown can't express (e.g. a before/after image pair)? Drop in
**raw HTML** — it passes straight through. See the before/after block in
`building-this-as-a-non-coder.mdx` for an example using the `.post-beforeafter`
styles.

### Callouts

Pull a key point out of the flow with a GitHub-style alert. `NOTE`, `TIP`, and
`WARNING` are supported:

```markdown
> [!TIP]
> Map the workflow before you automate it.
```

Each one renders with a visible label, so the meaning never depends on the colour
alone. A blockquote without a `[!...]` tag stays an ordinary quote.

### Tables

Write normal Markdown tables. They're wrapped automatically so a wide table
scrolls inside its own box instead of dragging the whole page sideways on a
phone. Lists, code blocks, `---` rules, and quotes are all styled — just write.

## How it builds (why there's no runtime MDX)

Posts are compiled to HTML at build time by `scripts/generate-blog.mjs` (run
automatically via the `prebuild`/`predev` npm scripts) into `content/blog-data.json`,
which the app imports. This is deliberate: the site runs on Cloudflare Workers,
which has no filesystem and can't compile Markdown at request time. If you add or
edit a post and run `npm run dev` or `npm run build`, the data regenerates. To
regenerate by hand: `npm run blog:generate`.

## Cadence & structure

See the agreed plan: 1 quality article/week, organized into pillars as a linked
knowledge library. Article shape: recognizable problem → why it happens →
practical framework → real examples → common mistakes → action steps →
invitation to get in touch.
