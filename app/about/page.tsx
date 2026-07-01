import type { Metadata } from "next";
import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { principles } from "@/content/site";

export const metadata: Metadata = { title: "About", description: "How Roble Media Lab approaches content systems, automation, and practical AI." };

export default function AboutPage() {
  return <><PageHero eyebrow="About Roble Media Lab" title="Clarity before complexity."><p>We help growing businesses make thoughtful use of content, automation, and AI—without hype, unnecessary tools, or systems nobody wants to use.</p></PageHero>
    <section className="content-section"><div className="shell narrow prose"><h2>Why we exist</h2><p>Growing businesses often know there is a better way to create content, follow up with leads, or complete repetitive work. The difficult part is turning that instinct into a clear, dependable system.</p><p>Roble Media Lab brings content thinking and workflow design together. We begin with how the business actually works, then introduce technology where it makes the work simpler, faster, or more consistent.</p><h2>What we believe</h2>{principles.map(([title,text])=><div key={title}><h3>{title}</h3><p>{text}</p></div>)}<h2>Who we serve</h2><p>Our work is designed for SMEs, startups, agencies, consultants, founders, service businesses, and growing teams. Kenya is our primary market, with East Africa as our wider focus.</p></div></section><CTA /></>;
}
