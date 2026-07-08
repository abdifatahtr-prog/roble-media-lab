import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { mdxComponents } from "@/components/mdx-components";
import { getPost, getPostSlugs } from "@/lib/blog";
import { site } from "@/content/site";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return post ? { title: post.meta.title, description: post.meta.description } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { meta, content } = post;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name }
  };

  return (
    <>
      <PageHero eyebrow={`${meta.pillarLabel} · ${meta.readTime} · ${meta.dateLabel}`} title={meta.title}>
        <p>{meta.description}</p>
      </PageHero>
      <article className="content-section">
        <div className="shell narrow prose">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
      </article>
      <CTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
