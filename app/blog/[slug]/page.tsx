import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { getPost, getPostSlugs } from "@/lib/blog";
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
      <PageHero eyebrow={`${post.pillarLabel} · ${post.readTime} · ${post.dateLabel}`} title={post.title}>
        <p>{post.description}</p>
      </PageHero>
      <article className="content-section">
        <div className="shell narrow prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
      <CTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
