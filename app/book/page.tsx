import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ArrowUpRight } from "@/components/icons";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a call",
  description: "Book a 30-minute discovery call with Roble Media Lab to talk through content systems, automation, or practical AI."
};

export default function BookPage() {
  return (
    <>
      <PageHero eyebrow="Book a call" title="Find a time that works for you.">
        <p>Pick a slot for a 30-minute discovery call. We will talk through the workflow, content challenge, or AI idea on your mind and whether there is a sensible way to help.</p>
      </PageHero>
      <section className="content-section">
        <div className="shell">
          <div className="booking-embed plain-card">
            <iframe
              src={site.bookingUrl}
              title="Book a call with Roble Media Lab"
              loading="lazy"
              allow="fullscreen"
            />
          </div>
          <p className="booking-fallback">
            Trouble loading the calendar? <a href={site.bookingUrl} target="_blank" rel="noreferrer">Open the booking page in a new tab <ArrowUpRight /></a>
          </p>
        </div>
      </section>
    </>
  );
}
