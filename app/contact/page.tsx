import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight, CheckIcon, WhatsAppIcon } from "@/components/icons";
import { site, whatsappHref } from "@/content/site";

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
          {/* Three ways in, each labelled by when to use it, rather than one CTA
              shouting over the page's own enquiry form. */}
          <Reveal delay={0.18} className="contact-hero-cta">
            <p className="contact-chooser">
              <strong>Need a quick answer?</strong> WhatsApp is fastest.
              <strong>Ready to talk it through?</strong> Book a call.
              <strong>Have a project with real detail?</strong> Use the enquiry form below.
            </p>
            <span className="button-row">
              {whatsappHref() && (
                <a className="button" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon width={16} height={16} /> Chat on WhatsApp
                </a>
              )}
              <Link className="button button-quiet" href={site.bookingPath}>Book a Free Discovery Call <ArrowUpRight /></Link>
            </span>
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

      <div className="shell or-divider"><span>OR</span></div>

      <section className="content-section contact-body">
        <div className="shell contact-grid">
          <Reveal className="contact-form-col">
            <span className="eyebrow">Have a project in mind?</span>
            <h2>Send us your project details.</h2>
            <p className="contact-lead">Complete the enquiry form and we’ll review your requirements properly before getting back to you. This is the one to use if your project has real detail to it. We reply within one business day.</p>
            <div className="plain-card contact-form-card">
              <ContactForm />
            </div>
            <p className="contact-alt">
              Prefer to talk sooner? <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>, <Link href={site.bookingPath}>book a free discovery call</Link>, or write to <a href={`mailto:${site.email}`}>{site.email}</a>.
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
