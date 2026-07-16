// Blog data source. Posts are authored as Markdown files in content/blog/ and
// compiled to HTML at build time by scripts/generate-blog.mjs (run via the
// prebuild/predev npm scripts). This module imports that generated JSON — it is
// bundled into the app, so there is NO filesystem access or MDX compilation at
// runtime. That is what lets the blog work on Cloudflare Workers.

import data from "@/content/blog-data.json";

// Keep in sync with PILLARS in scripts/generate-blog.mjs, which validates post
// frontmatter against the same list.
export const PILLARS = {
  ai: "AI for SMEs",
  automation: "Automation",
  websites: "Business Websites",
  "seo-content": "SEO & Content",
  operations: "Business Operations",
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

/**
 * What to read next. Same pillar first, since that is the closest topic match
 * and the pillars are what make the blog a library rather than a pile of posts.
 * Anything still short is topped up with the most recent other posts, so a post
 * that is currently alone in its pillar still gets a full set rather than an
 * empty rail. `posts` is already sorted newest-first.
 */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const current = posts.find((p) => p.slug === slug);
  if (!current) return [];
  const others = posts.filter((p) => p.slug !== slug);
  return [
    ...others.filter((p) => p.pillar === current.pillar),
    ...others.filter((p) => p.pillar !== current.pillar)
  ].slice(0, limit);
}
