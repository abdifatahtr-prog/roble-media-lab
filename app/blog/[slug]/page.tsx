import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTA } from "@/components/cta";
import { ArrowRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { getPost, getPostSlugs, getRelatedPosts } from "@/lib/blog";
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
        openGraph: { title: post.title, description: post.description, type: "article", publishedTime: post.date, url: `${site.url}/blog/${slug}` }
      }
    : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name }
  };

  return (
    <>
      <PageHero
        eyebrow={`${post.pillarLabel} · ${post.readTime} · ${post.dateLabel}`}
        title={post.title}
        variant="article"
      >
        <p>{post.description}</p>
      </PageHero>
      <article className="content-section">
        <div className="shell narrow prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      {related.length > 0 && (
        <section className="content-section section-compact related-posts">
          <div className="shell">
            <h2 className="related-posts-heading">Keep reading</h2>
            <div className="plain-grid">
              {related.map((item) => (
                <article className="plain-card" key={item.slug}>
                  <span className="eyebrow">{item.pillarLabel} · {item.readTime}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link className="text-link" href={`/blog/${item.slug}`}>
                    Read article <ArrowRight />
                  </Link>
                </article>
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
