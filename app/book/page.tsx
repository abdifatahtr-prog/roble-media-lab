import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ArrowUpRight, CheckIcon } from "@/components/icons";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a call",
  description: "Book a 30-minute discovery call with Roble Media Lab to talk through content systems, automation, or practical AI."
};

const expectations = [
  "30 focused minutes over a Zoho Meeting audio call",
  "We talk through the workflow, content challenge, or AI idea on your mind",
  "Honest guidance on whether and how we can help, no pressure, no jargon"
];

export default function BookPage() {
  return (
    <>
      <PageHero eyebrow="Book a call" title="Find a time that works for you.">
        <p>Pick a slot for a 30-minute discovery call. We will talk through the workflow, content challenge, or AI idea on your mind and whether there is a sensible way to help.</p>
      </PageHero>
      <section className="content-section">
        <div className="shell">
          <div className="plain-card booking-launch">
            <span className="eyebrow">Your discovery call</span>
            <h2>A 30-minute conversation.</h2>
            <ul className="booking-points">
              {expectations.map((point) => (
                <li key={point}><CheckIcon /> <span>{point}</span></li>
              ))}
            </ul>
            <div className="button-row">
              <a className="button" href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                Choose a time <ArrowUpRight />
              </a>
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
            <p className="booking-note">
              Opens our Zoho scheduling page in a new tab, where you can confirm in a couple of clicks. You&apos;ll receive an email confirmation and a calendar invite. Prefer email? Write to <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
