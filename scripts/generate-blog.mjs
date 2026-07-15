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

function estimateReadTime(body) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
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
      return {
        slug,
        draft: data.draft === true,
        title: String(data.title),
        description: String(data.description),
        date,
        dateLabel: formatDate(date),
        readTime: data.readTime ? String(data.readTime) : estimateReadTime(content),
        pillar: data.pillar,
        pillarLabel: PILLARS[data.pillar],
        html: marked.parse(content)
      };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  fs.writeFileSync(OUT_FILE, JSON.stringify({ posts }, null, 2));
  console.log(`[generate-blog] wrote ${posts.length} post(s) to content/blog-data.json`);
}

build();
