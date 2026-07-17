import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { CoverArt, hasCoverArt } from "@/components/cover-art";
import { ArrowRight } from "@/components/icons";

/**
 * Post card for the Insights listing and the "Keep reading" rail. The compact
 * cover carries each post's illustration so a reader scrolling the blog can
 * tell articles apart by artwork alone; a post without a registered scene yet
 * shows the plain branded panel. `titleAs` keeps the heading level correct for
 * the surrounding page (h2 on the listing, h3 under a rail's own h2).
 */
export function ArticleCard({ post, titleAs: Title = "h3" }: { post: PostMeta; titleAs?: "h2" | "h3" }) {
  const art = hasCoverArt(post.slug);
  return (
    <article className="plain-card article-card">
      <div className={`post-cover post-cover-mini${art ? " has-art" : ""}`} aria-hidden="true">
        {art && (
          <div className="post-cover-art">
            <CoverArt slug={post.slug} />
          </div>
        )}
      </div>
      <span className="eyebrow">{post.pillarLabel} · {post.readTime}</span>
      <Title>{post.title}</Title>
      <p>{post.description}</p>
      <Link className="text-link" href={`/blog/${post.slug}`}>Read article <ArrowRight /></Link>
    </article>
  );
}
