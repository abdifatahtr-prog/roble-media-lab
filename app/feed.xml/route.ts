import { getAllPosts } from "@/lib/blog";
import { site } from "@/content/site";

// RSS for the Insights library. Statically generated at build time (the post
// data is bundled JSON, so there is nothing to compute at request time) and
// advertised via the alternates.types link in app/layout.tsx.
export const dynamic = "force-static";

function esc(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function GET() {
  const posts = getAllPosts();
  const items = posts
    .map(
      (post) => `    <item>
      <title>${esc(post.title)}</title>
      <link>${site.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${site.url}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.updated ?? post.date).toUTCString()}</pubDate>
      <category>${esc(post.pillarLabel)}</category>
      <description>${esc(post.description)}</description>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} · Insights</title>
    <link>${site.url}/blog</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>${esc("Practical notes on AI, business automation, websites, and SEO for growing businesses in Kenya and East Africa.")}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" }
  });
}
