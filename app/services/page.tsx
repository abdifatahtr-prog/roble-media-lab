import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/cta";
import { ArrowRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { services } from "@/content/site";

export const metadata: Metadata = { title: "Services", description: "AI and business automation, business websites, SEO and content strategy, and WhatsApp automation for growing businesses in Kenya and East Africa.", alternates: { canonical: "/services" } };

export default function ServicesPage() {
  return <><PageHero eyebrow="Services" title="Solve the right problem, then build the right system."><p>Four focused ways we help: automating the work that repeats, building a website that earns its keep, making your content findable, and turning WhatsApp into a dependable front door. Shaped around your business rather than a predetermined stack of tools.</p></PageHero>
    <section className="content-section"><div className="shell service-grid">{services.map((service,index)=><Link className="service-card" href={`/services/${service.slug}`} aria-label={`Explore ${service.title}`} key={service.slug}><div className="service-number">{String(index+1).padStart(2,"0")}</div><h2>{service.title}</h2><p>{service.short}</p><span className="service-cue">Explore service <ArrowRight /></span></Link>)}</div></section><CTA /></>;
}
