import type { Post } from "@/lib/blog";
import { site } from "@/content/site";

/**
 * Featured image slot at the top of every article.
 *
 * A post that declares `cover` frontmatter renders that image. Every other post
 * gets the branded auto-cover: the same ink gradient, grid lines, and ring motif
 * the site already uses (hero, CTA panel), labelled with the post's pillar. That
 * keeps the "every article has a professional cover" rule true for all future
 * posts with zero per-article work, and it stays honest — no stock photos
 * pretending to be our office. The auto-cover is aria-hidden: it repeats the
 * pillar label already announced in the header, so it is decoration to AT.
 */
export function PostCover({ post }: { post: Post }) {
  if (post.cover) {
    return (
      <figure className="post-cover-figure">
        <img src={post.cover} alt={post.coverAlt ?? ""} loading="eager" />
      </figure>
    );
  }
  return (
    <div className="post-cover" aria-hidden="true">
      <span className="eyebrow eyebrow-light">{post.pillarLabel}</span>
      <b>{site.name} · Insights</b>
    </div>
  );
}
