import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical notes on AI, business automation, websites, and SEO for growing businesses in Kenya and East Africa.",
  alternates: { canonical: "/blog" }
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
            <article className="plain-card" key={post.slug}>
              <span className="eyebrow">{post.pillarLabel} · {post.readTime}</span>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <Link className="text-link" href={`/blog/${post.slug}`}>Read article <ArrowRight /></Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
