import Link from "next/link";
import { site } from "@/content/site";
import { ArrowUpRight } from "./icons";

export function CTA() {
  return (
    <section className="section section-compact">
      <div className="shell">
        <div className="cta-panel">
          <span className="eyebrow eyebrow-light">A sensible first step</span>
          <h2>Ready to improve your workflow?</h2>
          <p>Bring us a repetitive workflow, an AI idea, or a content challenge. We’ll help you identify practical opportunities to save time and grow your business.</p>
          <div className="cta-actions">
            <Link className="button button-light" href={site.bookingPath}>Book a Free Discovery Call <ArrowUpRight /></Link>
            <p className="cta-alt">Prefer email? <Link href="/contact">Send us a message.</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
}
