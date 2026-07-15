import type { Metadata } from "next";
import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Case Studies", description: "Future Roble Media Lab client success stories, published only when real work and permission are available.", alternates: { canonical: "/case-studies" } };
export default function CaseStudiesPage(){return <><PageHero eyebrow="Case studies" title="Proof should be real."><p>We will publish client stories here when projects are complete and clients have approved the details. Until then, we would rather leave this space honest than fill it with invented results.</p></PageHero><section className="content-section"><div className="shell narrow prose"><h2>What future stories will show</h2><p>Each case study will explain the original problem, constraints, decisions, implementation, and measured result. Where something did not work as expected, we will say so and explain what changed.</p></div></section><CTA/></>}
