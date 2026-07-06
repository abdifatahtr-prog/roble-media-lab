import type { Metadata } from "next";
import Link from "next/link";
import { JotformEmbed } from "@/components/jotform-embed";
import { PageHero } from "@/components/page-hero";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contact", description: "Talk to Roble Media Lab about content systems, automation, or practical AI." };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Tell us what could work better.">
        <p>Share the workflow, content challenge, or AI idea on your mind. We will respond honestly about whether and how we can help.</p>
      </PageHero>
      <section className="content-section">
        <div className="shell" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 32 }}>
          <div className="plain-card">
            <JotformEmbed />
          </div>
          <p style={{ textAlign: "center", color: "var(--slate)" }}>
            Prefer email? Write to <a style={{ color: "var(--teal-dark)" }} href={`mailto:${site.email}`}>{site.email}</a> or <Link style={{ color: "var(--teal-dark)" }} href={site.bookingPath}>book a 30-minute call</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
