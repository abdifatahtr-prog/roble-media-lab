import Link from "next/link";
import { site, whatsappHref } from "@/content/site";
import { ArrowUpRight, WhatsAppIcon } from "./icons";

/**
 * The closing CTA panel, rendered on nearly every page, so this is where the
 * funnel's entry point is really decided.
 *
 * WhatsApp takes the primary slot (the existing light button treatment, unchanged)
 * because it is the lowest-friction way for an SME to start a conversation. Booking
 * a call is a real commitment and belongs one step further in, so it moves to the
 * secondary slot. The enquiry form keeps its own line, framed by purpose rather
 * than as "prefer email?".
 *
 * `service` lets service pages open the chat already on-topic.
 */
export function CTA({ service }: { service?: string }) {
  const href = whatsappHref(service);
  return (
    <section className="section section-compact">
      <div className="shell">
        <div className="cta-panel">
          <span className="eyebrow eyebrow-light">A sensible first step</span>
          <h2>Ready to improve your workflow?</h2>
          <p>Bring us a repetitive workflow, an AI idea, a website that should be working harder, or a content challenge. We’ll help you identify practical opportunities to save time and grow your business.</p>
          <div className="cta-actions">
            {href && (
              <a
                className="button button-light"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-service={service}
              >
                <WhatsAppIcon width={16} height={16} /> Chat on WhatsApp
              </a>
            )}
            <Link className="button button-on-dark" href={site.bookingPath}>
              Book a Free Discovery Call <ArrowUpRight />
            </Link>
            <p className="cta-alt">Have a project in mind? <Link href="/contact">Send an enquiry.</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
}
