import Link from "next/link";
import { CTA } from "@/components/cta";
import { FAQList } from "@/components/faq-list";
import { ArrowRight, ArrowUpRight, CheckIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Testimonials } from "@/components/testimonials";
import { faqs, principles, services, site } from "@/content/site";

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
        <div className="hero-grid-lines" />
        <div className="shell home-hero-grid">
          <div className="hero-copy">
            <Reveal><span className="eyebrow"><i /> Content systems & practical AI</span></Reveal>
            <Reveal delay={0.06}><h1>Make better work <em>flow.</em></h1></Reveal>
            <Reveal delay={0.12}><p className="hero-lead">We help growing businesses turn scattered content, repetitive tasks, and promising AI ideas into clear systems people can actually use.</p></Reveal>
            <Reveal delay={0.18} className="button-row">
              <Link className="button" href={site.bookingPath}>Book a discovery call <ArrowUpRight /></Link>
              <Link className="text-link" href="/services">Explore our services <ArrowRight /></Link>
            </Reveal>
          </div>
          <Reveal delay={0.18} className="system-visual">
            <div className="visual-top"><span>From friction to flow</span><span className="status"><i /> Practical by design</span></div>
            <div className="flow">
              <div className="flow-node"><span>01</span><b>Find the friction</b><small>Content, admin, leads, handoffs</small></div>
              <div className="flow-line"><i /></div>
              <div className="flow-node is-active"><span>02</span><b>Design the system</b><small>People, process, tools, safeguards</small></div>
              <div className="flow-line"><i /></div>
              <div className="flow-node"><span>03</span><b>Make it useful</b><small>Test, train, measure, improve</small></div>
            </div>
            <div className="visual-footer"><span><CheckIcon /> Clear ownership</span><span><CheckIcon /> Sensible automation</span><span><CheckIcon /> Human handoff</span></div>
          </Reveal>
        </div>
        <div className="shell trust-strip">
          <span>Built for</span><b>SMEs</b><b>Startups</b><b>Agencies</b><b>Consultants</b><b>Growing teams</b>
        </div>
      </section>

      <section className="section" id="services">
        <div className="shell">
          <Reveal className="section-heading split-heading">
            <div><span className="eyebrow">What we help improve</span><h2>Useful systems, built around the way your business works.</h2></div>
            <p>We start with the problem—not the fashionable tool. The result is focused work that is easier to understand, adopt, and improve.</p>
          </Reveal>
          <div className="service-grid">
            {services.slice(0, 6).map((service, index) => (
              <Reveal className="service-card" delay={(index % 3) * 0.05} key={service.slug}>
                <div className="service-number">{String(index + 1).padStart(2, "0")}</div>
                <h3>{service.title}</h3><p>{service.short}</p>
                <Link href={`/services/${service.slug}`} aria-label={`Learn about ${service.title}`}>Learn more <ArrowRight /></Link>
              </Reveal>
            ))}
          </div>
          <Link className="all-services-link" href="/services">View all services <ArrowRight /></Link>
        </div>
      </section>

      <section className="section dark-section">
        <div className="shell">
          <Reveal className="section-heading split-heading">
            <div><span className="eyebrow eyebrow-light">Why Roble</span><h2>Good technology should make work feel clearer.</h2></div>
            <p>We combine content thinking, workflow design, and practical AI implementation. That means fewer disconnected tactics and more attention to how the whole system works.</p>
          </Reveal>
          <div className="principle-grid">
            {principles.map(([title, text], index) => <Reveal className="principle" delay={index * 0.05} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell process-layout">
          <Reveal className="process-intro"><span className="eyebrow">How we work</span><h2>Small enough to understand. Strong enough to build on.</h2><p>We keep the process visible and collaborative, so you know what is being changed, why it matters, and what your team needs to run it.</p></Reveal>
          <div className="process-list">
            {[["Discover", "Understand the business, the people doing the work, and the friction worth solving."], ["Design", "Map a simpler workflow and choose the lightest useful combination of process and tools."], ["Build", "Create the system, test real scenarios, and protect the important human handoffs."], ["Improve", "Train the team, measure what happens, and refine the system based on actual use."]].map(([title, text], index) => (
              <Reveal className="process-step" delay={index * .05} key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="shell faq-layout">
          <Reveal><span className="eyebrow">Common questions</span><h2>Clear answers before we begin.</h2><p>Still wondering whether your problem is a fit? A short conversation is often enough to find out.</p><Link className="text-link" href="/faq">See all questions <ArrowRight /></Link></Reveal>
          <Reveal><FAQList items={faqs.slice(0, 4)} /></Reveal>
        </div>
      </section>
      <Testimonials />
      <CTA />
    </>
  );
}
