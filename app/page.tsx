import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/cta";
import { FAQList } from "@/components/faq-list";
import { ArrowRight, ArrowUpRight, WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Testimonials } from "@/components/testimonials";
import { faqs, principles, services, site, whatsappHref } from "@/content/site";
// Homepage layout styles, all namespaced under `.home-v2` (see app/home.css). The
// "Working System" design language it pioneered now lives in the global system
// (app/globals.css) and ships site-wide; this file holds only the home page's own
// bespoke sections (hero schematic, services grid, principles, process).
import "./home.css";

// `types` must be repeated here: a page-level `alternates` REPLACES the root
// layout's whole alternates object (no deep merge), which would silently drop
// the RSS autodiscovery link.
export const metadata: Metadata = { alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } } };

export default function Home() {
  return (
    <div className="home-v2">
      <section className="hv-hero">
        <div className="hv-grid" aria-hidden="true" />
        <div className="shell hv-hero-grid">
          {/* CSS .rise, not <Reveal>: the JS reveal server-renders this column at
              opacity:0, which would hold back the h1 (the LCP element) until
              framer-motion hydrates. A CSS animation paints on the first frame. */}
          <div className="hv-hero-copy">
            <div className="rise"><span className="hv-eyebrow"><i className="hv-dot" /> Practical AI · Automation · Websites</span></div>
            {/* Two lines by design: "Build better" sits above the teal payoff word
                "workflows." (the <em> is display:block, so it owns its own line),
                putting the emphasis on what we actually make. */}
            <div className="rise" style={{ "--rise-delay": ".06s" } as React.CSSProperties}><h1>Build better <em>workflows.</em></h1></div>
            <div className="rise" style={{ "--rise-delay": ".12s" } as React.CSSProperties}><p className="hv-lead">We help growing businesses put AI, automation, and their website to work as one clear system, so routine tasks take less time and more visitors become customers.</p></div>
            {/* WhatsApp leads: lowest-friction start. Booking is a bigger commitment,
                so it takes the quiet secondary slot. */}
            <div className="rise button-row" style={{ "--rise-delay": ".18s" } as React.CSSProperties}>
              {whatsappHref() && (
                <a className="button" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon width={16} height={16} /> Chat on WhatsApp
                </a>
              )}
              <Link className="button button-quiet" href={site.bookingPath}>Book a Free Discovery Call <ArrowUpRight /></Link>
              <Link className="text-link" href="/services">Explore our services <ArrowRight /></Link>
            </div>
          </div>

          {/* Signature: the friction -> flow schematic. Honest by design — it
              shows the METHOD (real stages, real inputs/outputs), never invented
              results. The travelling pulse is decoration and is aria-hidden; the
              stage labels are real text a screen reader reads in order. */}
          <div className="rise hv-sch" style={{ "--rise-delay": ".22s" } as React.CSSProperties}>
            <div className="hv-sch-bar">
              <span className="hv-mono-label">roble_system</span>
              <span className="hv-sch-status"><i aria-hidden="true" /> running</span>
            </div>
            <div className="hv-sch-body">
              <div className="hv-sch-io">
                <span className="hv-mono-label">input</span>
                <ul className="hv-sch-chips">
                  <li>Repetitive tasks</li><li>Scattered tools</li><li>Slow replies</li><li>Missed follow-ups</li>
                </ul>
              </div>
              <div className="hv-sch-flow">
                <div className="hv-sch-rail" aria-hidden="true"><span className="hv-sch-pulse" /></div>
                <div className="hv-sch-node"><b>Find the friction</b><small>content · admin · leads · handoffs</small></div>
                <div className="hv-sch-node is-active"><b>Design the system</b><small>people · process · tools · safeguards</small></div>
                <div className="hv-sch-node"><b>Make it useful</b><small>test · train · measure · improve</small></div>
              </div>
              <div className="hv-sch-io">
                <span className="hv-mono-label">output</span>
                <ul className="hv-sch-chips is-out">
                  <li>Clear ownership</li><li>Sensible automation</li><li>Human handoff</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="shell hv-trust">
          <span className="hv-trust-label">built_for</span>
          <span>SMEs</span><span>Startups</span><span>Agencies</span><span>Consultants</span><span>Growing teams</span>
        </div>
      </section>

      <section className="hv-section" id="services">
        <div className="shell">
          <Reveal className="hv-head">
            <span className="hv-kicker">What we help improve</span>
            <h2>Useful systems, built around the way your business works.</h2>
            <p>We start with the problem, not the fashionable tool. The result is focused work that is easier to understand, adopt, and improve.</p>
          </Reveal>
          <div className="hv-svc-grid">
            {services.map((service, index) => (
              <Reveal className="hv-svc-card" delay={(index % 2) * 0.06} href={`/services/${service.slug}`} key={service.slug}>
                <span className="hv-svc-cat">{service.category}</span>
                <h3>{service.title}</h3>
                <p>{service.short}</p>
                <span className="hv-svc-cue">Learn more <ArrowRight /></span>
              </Reveal>
            ))}
          </div>
          <Link className="hv-more" href="/services">View all services <ArrowRight /></Link>
        </div>
      </section>

      <section className="hv-section hv-section-dark">
        <div className="shell">
          <Reveal className="hv-head">
            <span className="hv-kicker">Why businesses choose us</span>
            <h2>Good technology should make work feel clearer.</h2>
            <p>We combine workflow design, content thinking, and practical AI implementation, so you get one system that works together instead of disconnected tactics. And we publish our prices and our thinking up front, so you can judge us before you spend a shilling.</p>
          </Reveal>
          <div className="hv-why-grid">
            {principles.map(([title, text]) => (
              <Reveal className="hv-principle" key={title}>
                <span className="hv-mono-label">{title.split(" ")[0].toLowerCase()}</span>
                <h3>{title}</h3><p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="hv-section">
        <div className="shell hv-process">
          <Reveal className="hv-process-intro">
            <span className="hv-kicker">How we work</span>
            <h2>Small enough to understand. Strong enough to build on.</h2>
            <p>We keep the process visible and collaborative, so you know what is being changed, why it matters, and what your team needs to run it.</p>
          </Reveal>
          <div className="hv-steps">
            {[["Discover", "Understand the business, the people doing the work, and the friction worth solving."], ["Design", "Map a simpler workflow and choose the lightest useful combination of process and tools."], ["Build", "Create the system, test real scenarios, and protect the important human handoffs."], ["Improve", "Train the team, measure what happens, and refine the system based on actual use."]].map(([title, text], index) => (
              <Reveal className="hv-step" delay={index * 0.05} key={title}>
                <span className="hv-step-num">{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="hv-section hv-section-soft">
        <div className="shell hv-faq">
          <Reveal className="hv-faq-intro">
            <span className="hv-kicker">Common questions</span>
            <h2>Clear answers before we begin.</h2>
            <p>Still wondering whether your problem is a fit? A short conversation is often enough to find out.</p>
            <Link className="hv-faq-cue" href="/faq">See all questions <ArrowRight /></Link>
          </Reveal>
          <Reveal><FAQList items={faqs.slice(0, 4)} /></Reveal>
        </div>
      </section>

      <Testimonials />

      {/* The closing CTA now lives in the shared component (promoted from this
          page's original inline version) so the whole site shows one CTA. */}
      <CTA />
    </div>
  );
}
