import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// One .mdx file per post lives in content/blog/. Frontmatter is the single
// source of truth for post metadata; the body is authored in Markdown/MDX.
// This module reads the filesystem, so it runs only at build time on the
// server — never import it from a "use client" component.

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// Content pillars — the knowledge-library structure. `id` matches the
// `pillar` value in each post's frontmatter; `label` is shown to readers.
export const PILLARS = {
  ai: "AI for SMEs",
  "content-systems": "Content Systems",
  operations: "Business Operations",
  automation: "Automation",
  "case-studies": "Case Studies"
} as const;

export type PillarId = keyof typeof PILLARS;

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd — for schema.org + sitemap
  dateLabel: string; // human-readable, e.g. "1 July 2026" — for display
  readTime: string; // e.g. "5 min read"
  pillar: PillarId;
  pillarLabel: string;
};

export type Post = { meta: PostMeta; content: string };

function isPillar(value: unknown): value is PillarId {
  return typeof value === "string" && value in PILLARS;
}

// ~200 words/minute, rounded up, floored at 1.
function estimateReadTime(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

// YAML parses an unquoted `date: 2026-07-01` into a Date; a quoted one stays a
// string. Normalize either to an ISO yyyy-mm-dd (UTC) so authors can write it
// however feels natural.
function toISODate(value: unknown, slug: string): string {
  const d = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(d.getTime())) {
    throw new Error(`Post "${slug}" has an unparseable "date". Use yyyy-mm-dd.`);
  }
  return d.toISOString().slice(0, 10);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

function readPostFile(slug: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);

  if (!data.title || !data.description || !data.date) {
    throw new Error(`Post "${slug}" is missing required frontmatter (title, description, date).`);
  }
  if (!isPillar(data.pillar)) {
    throw new Error(`Post "${slug}" has an invalid or missing "pillar". Use one of: ${Object.keys(PILLARS).join(", ")}.`);
  }

  const date = toISODate(data.date, slug);
  return {
    meta: {
      slug,
      title: String(data.title),
      description: String(data.description),
      date,
      dateLabel: formatDate(date),
      readTime: data.readTime ? String(data.readTime) : estimateReadTime(content),
      pillar: data.pillar,
      pillarLabel: PILLARS[data.pillar]
    },
    content
  };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

// All published posts, newest first. Drafts (frontmatter `draft: true`) are excluded.
export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
      return { slug, draft: matter(raw).data.draft === true };
    })
    .filter((p) => !p.draft)
    .map((p) => readPostFile(p.slug).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  if (!fs.existsSync(path.join(BLOG_DIR, `${slug}.mdx`))) return null;
  return readPostFile(slug);
}
