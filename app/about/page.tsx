import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { founder, principles } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Roble Media Lab exists, how we think about practical AI, automation, websites, and content, and what businesses can expect when they work with us.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Roble Media Lab" title="Clarity before complexity.">
        <p>
          We help growing businesses solve real problems with practical AI, automation, websites,
          and content. No hype, no unnecessary tools, and no systems nobody wants to use.
        </p>
      </PageHero>

      <section className="content-section">
        <div className="shell narrow prose">
          <h2>Why we exist</h2>
          <p>
            Most growing businesses do not have a technology problem. They have a time problem.
            Enquiries wait too long for a reply. The same details get retyped from one system into
            another. A website looks presentable but never actually brings in work. Everyone senses
            things could run smoother, yet the day is too full to stop and fix it.
          </p>
          <p>
            Roble Media Lab exists to close that gap. We turn the friction that slows a business
            down into clear, dependable systems, built with the lightest combination of process and
            technology that will genuinely hold. Our work is designed for SMEs, startups, agencies,
            consultants, and service businesses, with Kenya as our primary market and East Africa as
            our wider focus.
          </p>

          <h2>The challenges businesses face today</h2>
          <p>
            Every week brings a new tool that promises to change everything, and a new warning that
            you are already behind. The result is predictable: subscriptions that get abandoned
            after two weeks, automation projects that quietly break, and teams stretched between
            serving customers and evaluating software they never asked for.
          </p>
          <p>
            The real challenge is rarely access to technology. It is knowing which problems are
            worth solving, in which order, and with how much tooling. That judgement is what most
            businesses are missing, and it is exactly what we bring.
          </p>

          <h2>Our philosophy</h2>
          {principles.map(([title, text]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}

          <h2>How we solve problems differently</h2>
          <p>
            We start with the problem, never the tool. Before anything gets built, we map how the
            work actually happens, agree on what a better version looks like, and choose the
            simplest system that gets there. Sometimes that means AI. Sometimes it means removing a
            step altogether. The measure of success is the same either way: does the work run
            faster, more consistently, and with less friction than before.
          </p>
          <p>
            Then we make sure the system survives contact with a busy week. Testing against real
            inputs, documentation, and team training are part of every engagement rather than an
            optional extra, because a system nobody understands gets abandoned the first time it
            misbehaves. After launch, we measure what actually changed and improve on evidence, not
            on assumptions.
          </p>

          <h2>Our commitment to transparency</h2>
          <p>
            We publish our prices, so you can judge whether we are worth a conversation before you
            spend time on one. We do not promise rankings, revenue, or returns that no honest
            provider can control. And we will never manufacture proof: every testimonial, case
            study, and result on this site is real, or the space stays empty until it is.
          </p>
          <p>
            Roble Media Lab is a founder-led company. When you work with us, you always know who is
            accountable for the outcome: {founder.name}, {founder.role}.
          </p>

          <h2>Where we are going</h2>
          <p>
            Our long-term aim is to be the partner growing businesses in Kenya and East Africa
            trust with how their work runs: the website that wins the enquiry, the systems that
            answer it quickly, and the content that keeps earning attention in between. We are
            building openly toward that, publishing what we learn along the way in our{" "}
            <Link href="/blog">insights library</Link> so you can judge our thinking before you
            ever pay for it.
          </p>
        </div>
      </section>
      <CTA />
    </>
  );
}
