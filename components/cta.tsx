import Link from "next/link";
import { site } from "@/content/site";
import { ArrowRight, ArrowUpRight } from "./icons";

export function CTA() {
  return (
    <section className="section section-compact">
      <div className="shell">
        <div className="cta-panel">
          <span className="eyebrow eyebrow-light">A sensible first step</span>
          <h2>Let’s find the work worth improving.</h2>
          <p>Bring us a repetitive workflow, a content bottleneck, or an AI idea. We’ll help you make the next step clear.</p>
          <div className="button-row">
            <Link className="button button-light" href={site.bookingPath}>Book a discovery call <ArrowUpRight /></Link>
            <Link className="text-link text-link-light" href="/contact">Send an enquiry <ArrowRight /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
