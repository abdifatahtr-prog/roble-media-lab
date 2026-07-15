import type { Metadata } from "next";
import { CTA } from "@/components/cta";
import { FAQList } from "@/components/faq-list";
import { PageHero } from "@/components/page-hero";
import { faqs } from "@/content/site";

export const metadata: Metadata = { title: "Frequently Asked Questions", description: "Answers about Roble Media Lab services, process, AI implementation, and working together.", alternates: { canonical: "/faq" } };
export default function FAQPage(){const schema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))};return <><PageHero eyebrow="FAQ" title="Questions are part of good work."><p>Plain answers about how we approach AI, automation, websites, content, and working together.</p></PageHero><section className="content-section"><div className="shell narrow"><FAQList items={faqs} headingLevel={2}/></div></section><CTA/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></>}
