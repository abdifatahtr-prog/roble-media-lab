import Link from "next/link";
import { site, whatsappHref } from "@/content/site";
import { ArrowUpRight, WhatsAppIcon } from "./icons";

/**
 * The closing CTA, rendered on nearly every page (and the home page) — the funnel's
 * real entry point, so there is one definition of it.
 *
 * "Centered statement": a full-bleed ink section with a single focal point. A
 * positioning signal-line (AI · Automation · Websites, with a live pulse) sits above
 * a large headline; WhatsApp takes the one prominent primary slot because it is the
 * lowest-friction way for an SME to start; booking is a real commitment and takes the
 * subordinate ghost secondary; the enquiry form keeps its own quiet line. The trust
 * facts are all true (free 30-minute call, founder-led, published pricing) — never
 * fabricated proof.
 *
 * `service` lets service pages open the chat already on-topic. Styles: .site-cta* in
 * app/globals.css.
 */
export function CTA({ service }: { service?: string }) {
  const href = whatsappHref(service);
  return (
    <section className="site-cta" aria-labelledby="cta-heading">
      <div className="site-cta-glow" aria-hidden="true" />
      <div className="site-cta-grid" aria-hidden="true" />
      <div className="shell site-cta-inner">
        <div className="site-cta-line">
          <span>AI</span><i aria-hidden="true" /><span>Automation</span><i aria-hidden="true" /><span>Websites</span>
        </div>
        <span className="eyebrow eyebrow-light">A sensible first step</span>
        <h2 id="cta-heading">Ready to improve your workflow?</h2>
        <p>Bring us a repetitive workflow, an AI idea, a website that should be working harder, or a content challenge. We&rsquo;ll help you identify practical opportunities to save time and grow your business.</p>
        <div className="site-cta-actions">
          {href && (
            <a className="button button-light" href={href} target="_blank" rel="noopener noreferrer" data-service={service}>
              <WhatsAppIcon width={16} height={16} /> Chat on WhatsApp
            </a>
          )}
          <Link className="button button-on-dark" href={site.bookingPath}>
            Book a Free Discovery Call <ArrowUpRight />
          </Link>
        </div>
        <p className="site-cta-alt">Have a project in mind? <Link href="/contact">Send an enquiry.</Link></p>
        <ul className="site-cta-facts">
          <li>Free 30-minute call</li>
          <li>No obligation</li>
          <li>Talk to a person, not a bot</li>
          <li>We publish our prices</li>
        </ul>
      </div>
    </section>
  );
}
