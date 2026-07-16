import type { Metadata } from "next";
import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Case Studies", description: "Future Roble Media Lab client success stories, published only when real work and permission are available.", alternates: { canonical: "/case-studies" } };
export default function CaseStudiesPage(){return <><PageHero eyebrow="Case studies" title="Proof should be real."><p>Client stories are published here once the work is complete and the client has approved every detail. That is a deliberately high bar: we would rather keep this space honest than fill it with invented results.</p></PageHero><section className="content-section"><div className="shell narrow prose"><h2>What every case study will include</h2><p>Each one will explain the original problem, constraints, decisions, implementation, and measured result. Where something did not work as expected, we will say so and explain what changed.</p></div></section><CTA/></>}
