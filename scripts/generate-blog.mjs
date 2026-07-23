// Build-time blog compiler. Reads content/blog/*.mdx, parses frontmatter, and
// converts each Markdown body to HTML, then writes content/blog-data.json.
//
// Why: the site runs on Cloudflare Workers, which has no filesystem and cannot
// run a Markdown/MDX compiler at request time. So we do all of that here, at
// build time (plain Node), and ship the result as bundled data. The app then
// imports that JSON and renders pure HTML — no runtime fs, no runtime MDX.
//
// Runs automatically via the "prebuild" and "predev" npm scripts.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { marked } from "marked";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BLOG_DIR = path.join(ROOT, "content", "blog");
const OUT_FILE = path.join(ROOT, "content", "blog-data.json");

// Keep in sync with PILLARS in lib/blog.ts. These mirror the four services so a
// post's pillar maps to the service it should link back to.
const PILLARS = {
  ai: "AI for SMEs",
  automation: "Automation",
  websites: "Business Websites",
  "seo-content": "SEO & Content",
  operations: "Business Operations",
  "case-studies": "Case Studies"
};

marked.setOptions({ gfm: true, breaks: false });

// Always measured, never declared. A hand-typed `readTime` in frontmatter drifts
// away from the post the moment it is edited, and three of the five posts were
// advertising 4-6 min on bodies of 134-182 words (about one minute each). A
// reader who is promised six minutes and gets one concludes the site is padded,
// which is an expensive impression for an agency that sells content strategy.
function countWords(body) {
  return body.trim().split(/\s+/).filter(Boolean).length;
}

function estimateReadTime(words) {
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

// marked escapes text content; anchor ids and the table of contents need the
// plain characters back (the TOC text is re-escaped by React when rendered).
function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

// Give every h2 a stable id and collect them as the table of contents. Only
// h2s: they are the section markers, and a TOC that lists every h3 stops being
// a map and becomes a second article. Duplicate headings get -2, -3 suffixes.
function addHeadingAnchors(html) {
  const toc = [];
  const seen = new Map();
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
    const text = decodeEntities(inner.replace(/<[^>]+>/g, "")).trim();
    let id = text
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const count = (seen.get(id) ?? 0) + 1;
    seen.set(id, count);
    if (count > 1) id = `${id}-${count}`;
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

// If a post has an "## FAQ" or "## Frequently asked questions" section, pull
// its h3/answer pairs out as structured data for FAQPage schema. The section
// still renders normally in the article body; this just gives search engines
// a machine-readable copy alongside it. No match = no schema, not an error.
function extractFaqs(html, toc) {
  const heading = toc.find((t) => /^(frequently asked questions|faqs?)$/i.test(t.text.trim()));
  if (!heading) return [];
  const sectionMatch = html.match(new RegExp(`<h2 id="${heading.id}">[\\s\\S]*?</h2>([\\s\\S]*?)(?=<h2[ >]|$)`));
  if (!sectionMatch) return [];
  const faqs = [];
  const entryRegex = /<h3>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3>|$)/g;
  let m;
  while ((m = entryRegex.exec(sectionMatch[1]))) {
    const question = decodeEntities(m[1].replace(/<[^>]+>/g, "")).trim();
    const answerText = decodeEntities(m[2].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
    if (question && answerText) faqs.push({ question, answerText });
  }
  return faqs;
}

const CALLOUT_LABELS = { NOTE: "Note", TIP: "Tip", WARNING: "Warning" };

// Post-processing that Markdown itself cannot express.
function enhance(html) {
  return (
    html
      // GitHub-style alerts: `> [!TIP]` and the following lines become a callout.
      // The label is rendered as text, so the meaning never rests on colour alone.
      .replace(
        /<blockquote>\s*<p>\s*\[!(NOTE|TIP|WARNING)\]\s*([\s\S]*?)<\/p>\s*<\/blockquote>/g,
        (_, kind, body) =>
          `<div class="callout callout-${kind.toLowerCase()}">` +
          `<span class="callout-label">${CALLOUT_LABELS[kind]}</span>` +
          `<p>${body.trim()}</p></div>`
      )
      // A wide table has to scroll inside its own box; otherwise it drags the
      // whole page sideways on a phone. tabindex="0" + role="region" + a label
      // make that scroll box reachable and operable by keyboard, not just mouse
      // (WCAG 2.1.1); the global :focus-visible outline shows when it's focused.
      .replace(/<table>/g, '<div class="table-scroll" tabindex="0" role="region" aria-label="Table, scroll horizontally to see more"><table>')
      .replace(/<\/table>/g, "</table></div>")
      // GFM only emits column headers, so scope="col" is always correct and lets
      // screen readers associate each cell with its heading (accessible tables).
      .replace(/<th>/g, '<th scope="col">')
  );
}

function toISODate(value, slug) {
  const d = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(d.getTime())) throw new Error(`Post "${slug}" has an unparseable "date". Use yyyy-mm-dd.`);
  return d.toISOString().slice(0, 10);
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

function build() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.writeFileSync(OUT_FILE, JSON.stringify({ posts: [] }, null, 2));
    console.log("[generate-blog] no content/blog dir — wrote empty blog-data.json");
    return;
  }

  const posts = fs
    .readdirSync(BLOG_DIR)
    // Posts are .mdx/.md; skip docs (README) and underscore-prefixed drafts.
    .filter((f) => (f.endsWith(".mdx") || f.endsWith(".md")) && !/^README/i.test(f) && !f.startsWith("_"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);

      if (!data.title || !data.description || !data.date) {
        throw new Error(`Post "${slug}" is missing required frontmatter (title, description, date).`);
      }
      if (!(typeof data.pillar === "string" && data.pillar in PILLARS)) {
        throw new Error(`Post "${slug}" has an invalid or missing "pillar". Use one of: ${Object.keys(PILLARS).join(", ")}.`);
      }

      const date = toISODate(data.date, slug);

      // Optional frontmatter. `updated` shows a "Last updated" line and feeds
      // dateModified/sitemap; `cover`/`coverAlt` swap the auto-generated
      // branded cover for a real image living under public/.
      const updated = data.updated ? toISODate(data.updated, slug) : null;
      if (updated && updated < date) {
        throw new Error(`Post "${slug}" has an "updated" date earlier than its "date".`);
      }
      const cover = data.cover ? String(data.cover) : null;
      if (cover && !cover.startsWith("/")) {
        throw new Error(`Post "${slug}" has a "cover" that is not a root-relative path (expected e.g. /blog/${slug}.png).`);
      }
      // A real cover image must ship an explicit text alternative so an
      // informative image never silently falls back to alt="" (WCAG 1.1.1).
      // Set coverAlt to a description, or to "" on purpose if the cover is
      // decorative — but the decision has to be made, not defaulted.
      if (cover && data.coverAlt === undefined) {
        throw new Error(`Post "${slug}" sets a "cover" but no "coverAlt". Add coverAlt: "describe the image" (or coverAlt: "" if it is purely decorative).`);
      }

      const words = countWords(content);
      const { html, toc } = addHeadingAnchors(enhance(marked.parse(content)));
      const faqs = extractFaqs(html, toc);
      return {
        slug,
        draft: data.draft === true,
        title: String(data.title),
        description: String(data.description),
        date,
        dateLabel: formatDate(date),
        updated,
        updatedLabel: updated ? formatDate(updated) : null,
        readTime: estimateReadTime(words),
        wordCount: words,
        pillar: data.pillar,
        pillarLabel: PILLARS[data.pillar],
        cover,
        coverAlt: cover && data.coverAlt ? String(data.coverAlt) : null,
        toc,
        faqs,
        html
      };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  fs.writeFileSync(OUT_FILE, JSON.stringify({ posts }, null, 2));
  console.log(`[generate-blog] wrote ${posts.length} post(s) to content/blog-data.json`);
}

build();
