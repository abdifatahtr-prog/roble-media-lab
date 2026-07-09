// Blog data source. Posts are authored as Markdown files in content/blog/ and
// compiled to HTML at build time by scripts/generate-blog.mjs (run via the
// prebuild/predev npm scripts). This module imports that generated JSON — it is
// bundled into the app, so there is NO filesystem access or MDX compilation at
// runtime. That is what lets the blog work on Cloudflare Workers.

import data from "@/content/blog-data.json";

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
  dateLabel: string; // human-readable, e.g. "8 July 2026" — for display
  readTime: string; // e.g. "5 min read"
  pillar: PillarId;
  pillarLabel: string;
};

export type Post = PostMeta & { html: string };

const posts = data.posts as Post[];

export function getAllPosts(): PostMeta[] {
  return posts;
}

export function getPostSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function getPost(slug: string): Post | null {
  return posts.find((p) => p.slug === slug) ?? null;
}
