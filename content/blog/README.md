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
pillar: ai                # ai | content-systems | operations | automation | case-studies
readTime: 5 min read      # optional — auto-estimated from word count if omitted
draft: true               # optional — hides the post from the live site
---
```

- **title / description / date / pillar** are required. Description doubles as the
  SEO meta description and the listing blurb, so keep it tight (~150 chars).
- **pillar** must be one of the five ids above (defined in `lib/blog.ts`).
- **draft: true** keeps a work-in-progress out of the listing, sitemap, and search.

## Body

Write in Markdown. Use `##` for section headings (the page title comes from
frontmatter — don't repeat it as an `#` heading). Internal links like
`[our automation service](/services/business-automation)` use the client router
automatically; external links open in a new tab. Styling comes from the `.prose`
wrapper — just write content.

## Cadence & structure

See the agreed plan: 1 quality article/week, organized into pillars as a linked
knowledge library. Article shape: recognizable problem → why it happens →
practical framework → real examples → common mistakes → action steps →
invitation to get in touch.
