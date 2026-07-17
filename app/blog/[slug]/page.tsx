import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { PostCover } from "@/components/post-cover";
import { ReadingProgress } from "@/components/reading-progress";
import { ShareButtons } from "@/components/share-buttons";
import { getPost, getPostSlugs, getRelatedPosts, showToc } from "@/lib/blog";
import { site } from "@/content/site";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return post
    ? {
        title: post.title,
        description: post.description,
        alternates: { canonical: `/blog/${slug}` },
        openGraph: {
          title: post.title,
          description: post.description,
          type: "article",
          publishedTime: post.date,
          ...(post.updated ? { modifiedTime: post.updated } : {}),
          url: `${site.url}/blog/${slug}`,
          ...(post.cover ? { images: [{ url: `${site.url}${post.cover}` }] } : {})
        }
      }
    : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(slug);
  const toc = showToc(post) ? post.toc : [];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    wordCount: post.wordCount,
    mainEntityOfPage: `${site.url}/blog/${slug}`,
    ...(post.cover ? { image: `${site.url}${post.cover}` } : {}),
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/roble-media-lab-icon.svg` }
    }
  };

  return (
    <>
      <ReadingProgress />
      <PageHero eyebrow={post.pillarLabel} title={post.title} variant="article">
        <p className="article-meta">
          <span>By {site.name}</span>
          <span>Published {post.dateLabel}</span>
          {post.updatedLabel && <span>Updated {post.updatedLabel}</span>}
          <span>{post.readTime}</span>
        </p>
        <p>{post.description}</p>
      </PageHero>
      <article className="content-section">
        <div className="shell narrow prose">
          <PostCover post={post} />
          {toc.length > 0 && (
            <nav className="toc" aria-label="Table of contents">
              <span className="toc-label">In this article</span>
              <ol>
                {toc.map((entry) => (
                  <li key={entry.id}>
                    <a href={`#${entry.id}`}>{entry.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <ShareButtons url={`${site.url}/blog/${slug}`} title={post.title} />
        </div>
      </article>

      {related.length > 0 && (
        <section className="content-section section-compact related-posts">
          <div className="shell">
            <h2 className="related-posts-heading">Keep reading</h2>
            <div className="plain-grid">
              {related.map((item) => (
                <ArticleCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
