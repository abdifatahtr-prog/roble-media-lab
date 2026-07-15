import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/content/site";

// Post-conversion confirmation page. Kept out of search: it has no standalone value.
// Its pageviews act as a conversion signal in analytics (every /thank-you view ≈ one
// completed enquiry or booking).
export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false }
};

const content = {
  enquiry: {
    eyebrow: "Enquiry received",
    title: "Thank You!",
    lead: "We've received your enquiry and will respond within one business day.",
    steps: [
      ["We read it properly", "A real person reviews what you sent, not an autoresponder pretending to be one."],
      ["We reply within one business day", "You'll get a straight answer about whether there's a sensible way to help."],
      ["We find a time to talk", "If it looks like a fit, we'll invite you to a free, no-pressure discovery call."],
      ["You get a clear proposal", "A simple plan for the next practical step, with no obligation."]
    ]
  },
  booking: {
    eyebrow: "Call confirmed",
    title: "You're Booked!",
    lead: "Your discovery call is confirmed and a calendar invite is on its way to your email.",
    steps: [
      ["Check your inbox", "Your confirmation and calendar invite should arrive shortly. Add it to your calendar."],
      ["Have a quick think", "Jot down the workflow, content challenge, or AI idea you'd like to talk through."],
      ["We keep it useful", "Thirty focused minutes, no jargon, no pressure, just an honest look at what could help."]
    ]
  }
} as const;

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const { from } = await searchParams;
  const isBooking = from === "booking" || from === "call";
  const v = isBooking ? content.booking : content.enquiry;
  const posts = getAllPosts().slice(0, 3);

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
          <div className="plain-grid ty-steps">
            {v.steps.map(([title, text], i) => (
              <div className="plain-card" key={title}>
                <div className="service-number">{String(i + 1).padStart(2, "0")}</div>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            ))}
          </div>

          <p className="ty-reassure">
            <CheckIcon /> <span>No further action is needed from you right now. We&apos;ll be in touch.</span>
          </p>

          <div className="button-row ty-actions">
            <Link className="button" href="/">Back to homepage <ArrowUpRight /></Link>
            <Link className="text-link" href="/services">Explore our services <ArrowRight /></Link>
            {site.whatsapp && (
              <a
                className="text-link"
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Message us on WhatsApp <ArrowUpRight />
              </a>
            )}
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="section soft-section">
          <div className="shell">
            <div className="section-heading split-heading">
              <div>
                <span className="eyebrow">While you wait</span>
                <h2>A few ideas worth reading.</h2>
              </div>
              <p>Practical notes on AI, automation, websites, and content for growing businesses.</p>
            </div>
            <div className="plain-grid">
              {posts.map((post) => (
                <article className="plain-card" key={post.slug}>
                  <span className="eyebrow">{post.pillarLabel} · {post.readTime}</span>
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <Link className="text-link" href={`/blog/${post.slug}`}>Read article <ArrowRight /></Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
