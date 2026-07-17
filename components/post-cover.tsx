import type { Post } from "@/lib/blog";
import { CoverArt, hasCoverArt } from "@/components/cover-art";
import { site } from "@/content/site";

/**
 * Featured image slot at the top of every article.
 *
 * A post that declares `cover` frontmatter renders that image. Every other
 * post gets its scene from the illustration system (components/cover-art.tsx)
 * drawn on the branded panel — same ink gradient and grid the hero and CTA
 * panel use, labelled with the post's pillar. A post with no registered scene
 * yet falls back to the plain panel, so publishing never blocks on artwork.
 * aria-hidden: the artwork restates what the header already announces, so it
 * is decoration to assistive tech.
 */
export function PostCover({ post }: { post: Post }) {
  if (post.cover) {
    return (
      <figure className="post-cover-figure">
        <img src={post.cover} alt={post.coverAlt ?? ""} loading="eager" />
      </figure>
    );
  }
  const art = hasCoverArt(post.slug);
  return (
    <div className={`post-cover${art ? " has-art" : ""}`} aria-hidden="true">
      {art && (
        <div className="post-cover-art">
          <CoverArt slug={post.slug} />
        </div>
      )}
      <span className="eyebrow eyebrow-light">{post.pillarLabel}</span>
      <b>{site.name} · Insights</b>
    </div>
  );
}
