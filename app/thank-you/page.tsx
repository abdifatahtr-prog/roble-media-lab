import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { site } from "@/content/site";

// Post-conversion confirmation page. Kept out of search — it has no standalone value
// and should never appear in results. Its pageviews act as a conversion signal in
// analytics (every /thank-you view ≈ one completed enquiry or booking).
export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false }
};

const content = {
  enquiry: {
    eyebrow: "Message received",
    title: "Thank you — your message is in.",
    lead: "We've received your enquiry. A real person will read it and reply honestly about whether and how we can help.",
    steps: [
      ["We read it properly", "A person reviews what you sent — not an autoresponder pretending to be one."],
      ["We reply within one business day", "You'll get a straight answer about whether there's a sensible way to help."],
      ["We find a time to talk", "If it looks like a fit, we'll set up a short, no-pressure discovery call."]
    ],
    primary: { label: "Book a call now", href: site.bookingPath },
    secondaryHref: "/services",
    secondaryLabel: "Explore our services"
  },
  booking: {
    eyebrow: "Call confirmed",
    title: "You're booked. See you soon.",
    lead: "Your discovery call is confirmed and a calendar invite is on its way to your email.",
    steps: [
      ["Check your inbox", "Your confirmation and calendar invite should arrive shortly — add it to your calendar."],
      ["Have a quick think", "Jot down the workflow, content challenge, or AI idea you'd like to talk through. Rough notes are plenty."],
      ["We keep it useful", "Thirty focused minutes — no jargon, no pressure, just an honest look at what could help."]
    ],
    primary: { label: "Explore our services", href: "/services" },
    secondaryHref: "/resources",
    secondaryLabel: "Browse resources"
  }
} as const;

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const { from } = await searchParams;
  const v = from === "booking" || from === "call" ? content.booking : content.enquiry;

  return (
    <>
      <PageHero eyebrow={v.eyebrow} title={v.title}>
        <p>{v.lead}</p>
      </PageHero>
      <section className="content-section">
        <div className="shell">
          <div className="section-heading">
            <span className="eyebrow">What happens next</span>
          </div>
          <div className="plain-grid">
            {v.steps.map(([title, text], i) => (
              <div className="plain-card" key={title}>
                <div className="service-number">{String(i + 1).padStart(2, "0")}</div>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="button-row" style={{ marginTop: 40 }}>
            <Link className="button" href={v.primary.href}>{v.primary.label} <ArrowUpRight /></Link>
            <Link className="text-link" href={v.secondaryHref}>{v.secondaryLabel} <ArrowRight /></Link>
            {site.whatsapp && (
              <a
                className="text-link"
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Or message us on WhatsApp <ArrowUpRight />
              </a>
            )}
          </div>
          <p style={{ marginTop: 28, color: "var(--slate)", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <CheckIcon style={{ width: 18, color: "var(--teal-dark)" }} /> Prefer email? Write to{" "}
            <a style={{ color: "var(--teal-dark)" }} href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
