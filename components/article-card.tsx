import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { CoverArt, hasCoverArt } from "@/components/cover-art";
import { ArrowRight } from "@/components/icons";

/**
 * Post card for the Insights listing and the "Keep reading" rail.
 *
 * The whole card is ONE link — cover, pillar, title, excerpt, and the
 * "Read article" line (now a styled span, not a nested link) all navigate.
 * A single semantic <a> keeps keyboard behaviour honest: one Tab stop per
 * card, the global :focus-visible outline drawn around the whole card, and
 * the full card text as the link's accessible name. Hover affordances
 * (lift, shadow, art zoom, arrow nudge) live in globals.css under
 * .article-card.
 *
 * The compact cover carries each post's illustration so a reader scrolling
 * the blog can tell articles apart by artwork alone; a post without a
 * registered scene yet shows the plain branded panel. `titleAs` keeps the
 * heading level correct for the surrounding page (h2 on the listing, h3
 * under a rail's own h2).
 */
export function ArticleCard({ post, titleAs: Title = "h3" }: { post: PostMeta; titleAs?: "h2" | "h3" }) {
  const art = hasCoverArt(post.slug);
  return (
    <Link className="plain-card article-card" href={`/blog/${post.slug}`}>
      <span className={`post-cover post-cover-mini${art ? " has-art" : ""}`} aria-hidden="true">
        {art && (
          <span className="post-cover-art">
            <CoverArt slug={post.slug} />
          </span>
        )}
      </span>
      <span className="eyebrow">{post.pillarLabel} · {post.readTime}</span>
      <Title>{post.title}</Title>
      <p>{post.description}</p>
      <span className="text-link">Read article <ArrowRight /></span>
    </Link>
  );
}
