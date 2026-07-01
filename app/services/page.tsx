import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/cta";
import { ArrowRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { services } from "@/content/site";

export const metadata: Metadata = { title: "Services", description: "Practical AI, automation, content systems, SEO strategy, and training for growing businesses." };

export default function ServicesPage() {
  return <><PageHero eyebrow="Services" title="Solve the right problem, then build the right system."><p>Focused support for content, workflows, and responsible AI adoption—shaped around your business rather than a predetermined stack of tools.</p></PageHero>
    <section className="content-section"><div className="shell service-grid">{services.map((service,index)=><article className="service-card" key={service.slug}><div className="service-number">{String(index+1).padStart(2,"0")}</div><h2>{service.title}</h2><p>{service.short}</p><Link href={`/services/${service.slug}`}>Explore service <ArrowRight /></Link></article>)}</div></section><CTA /></>;
}
