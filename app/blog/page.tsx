import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { articles } from "@/content/site";

export const metadata: Metadata = { title: "Insights", description: "Practical notes on AI, automation, content systems, and digital growth." };
export default function BlogPage(){return <><PageHero eyebrow="Insights" title="Ideas you can put to work."><p>Grounded thinking about practical AI, better workflows, and content systems for growing businesses.</p></PageHero><section className="content-section"><div className="shell plain-grid">{articles.map(article=><article className="plain-card" key={article.slug}><span className="eyebrow">{article.readTime}</span><h2>{article.title}</h2><p>{article.description}</p><Link className="text-link" href={`/blog/${article.slug}`}>Read article <ArrowRight/></Link></article>)}</div></section></>}
