import type { Metadata } from "next";
import Image from "next/image";
import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { founder, principles } from "@/content/site";

export const metadata: Metadata = { title: "About", description: "How Roble Media Lab approaches content systems, automation, and practical AI." };

function FounderSection() {
  if (!founder.bio.length) return null;
  return (
    <section className="content-section soft-section">
      <div className="shell founder-layout">
        <div className="founder-media">
          {founder.photo ? (
            <Image src={founder.photo} width={360} height={440} alt={founder.name} className="founder-photo" />
          ) : (
            <div className="founder-photo founder-photo-placeholder" aria-hidden="true">{founder.name.charAt(0)}</div>
          )}
        </div>
        <div className="founder-copy">
          <span className="eyebrow">Who you'll work with</span>
          <h2>{founder.name}</h2>
          <p className="founder-role">{founder.role}</p>
          {founder.bio.map((para) => <p key={para}>{para}</p>)}
          {founder.credentials.length > 0 && (
            <ul className="founder-credentials">
              {founder.credentials.map((c) => <li key={c}>{c}</li>)}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return <><PageHero eyebrow="About Roble Media Lab" title="Clarity before complexity."><p>We help growing businesses make thoughtful use of content, automation, and AI, without hype, unnecessary tools, or systems nobody wants to use.</p></PageHero>
    <section className="content-section"><div className="shell narrow prose"><h2>Why we exist</h2><p>Growing businesses often know there is a better way to create content, follow up with leads, or complete repetitive work. The difficult part is turning that instinct into a clear, dependable system.</p><p>Roble Media Lab brings content thinking and workflow design together. We begin with how the business actually works, then introduce technology where it makes the work simpler, faster, or more consistent.</p><h2>What we believe</h2>{principles.map(([title,text])=><div key={title}><h3>{title}</h3><p>{text}</p></div>)}<h2>Who we serve</h2><p>Our work is designed for SMEs, startups, agencies, consultants, founders, service businesses, and growing teams. Kenya is our primary market, with East Africa as our wider focus.</p></div></section><FounderSection /><CTA /></>;
}
