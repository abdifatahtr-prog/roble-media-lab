import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight, CheckIcon } from "@/components/icons";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contact", description: "Talk to Roble Media Lab about AI and business automation, a new website, SEO and content, or WhatsApp. Book a free discovery call or send us a message.", alternates: { canonical: "/contact" } };

const trustBadges = [
  "30-minute video call",
  "No obligation",
  "Practical advice tailored to your business",
  "Response within one business day"
];

const nextSteps = [
  "We review your enquiry.",
  "We’ll reply within one business day.",
  "If we’re a good fit, we’ll invite you to a discovery call.",
  "You’ll receive a clear proposal with no pressure."
];

export default function ContactPage() {
  return (
    <>
      <section className="page-hero contact-hero">
        <div className="shell page-hero-inner">
          <Reveal><span className="eyebrow">Contact</span></Reveal>
          <Reveal delay={0.06}><h1>Let’s talk about your business.</h1></Reveal>
          <Reveal delay={0.12}>
            <p className="page-lead">Whether you’re exploring AI and automation, need a website that pulls its weight, or want your content to be found, we’ll help you identify the next practical step for your business.</p>
          </Reveal>
          <Reveal delay={0.18} className="contact-hero-cta">
            <Link className="button" href={site.bookingPath}>Book a Free Discovery Call <ArrowUpRight /></Link>
          </Reveal>
          <Reveal delay={0.24}>
            <ul className="trust-badges" aria-label="What to expect from a discovery call">
              {trustBadges.map((badge) => (
                <li key={badge}><CheckIcon /> <span>{badge}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <div className="shell or-divider" role="separator" aria-label="or"><span>OR</span></div>

      <section className="content-section contact-body">
        <div className="shell contact-grid">
          <Reveal className="contact-form-col">
            <span className="eyebrow">Prefer email?</span>
            <h2>Send us your project details.</h2>
            <p className="contact-lead">Complete the short form below and we’ll get back to you within one business day.</p>
            <div className="plain-card contact-form-card">
              <ContactForm />
            </div>
            <p className="contact-alt">
              Prefer to talk sooner? <Link href={site.bookingPath}>Book a free discovery call</Link> or write to <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="next-steps-wrap">
            <aside className="next-steps-card">
              <span className="eyebrow eyebrow-light">The process</span>
              <h3>What happens next?</h3>
              <ol className="next-steps-list">
                {nextSteps.map((step, index) => (
                  <li key={step}>
                    <span className="next-steps-num">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
