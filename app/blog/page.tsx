import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { PageHero } from "@/components/page-hero";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical notes on AI, business automation, websites, and SEO — written in Kenya, useful anywhere you're growing a business.",
  // types repeated: page-level alternates replaces the layout's object wholesale.
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/feed.xml" } }
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHero eyebrow="Insights" title="Ideas you can put to work.">
        <p>Grounded thinking about practical AI, better workflows, websites, and content for growing businesses.</p>
      </PageHero>
      <section className="content-section">
        <div className="shell plain-grid">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} titleAs="h2" />
          ))}
        </div>
      </section>
    </>
  );
}
