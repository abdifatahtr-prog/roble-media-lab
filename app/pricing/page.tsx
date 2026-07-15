import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/cta";
import { ArrowRight, ArrowUpRight, CheckIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { ksh, priceFactors, servicePricing, site, websitePackages } from "@/content/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "What our work costs, published up front. Website packages from KES 60,000, automation from KES 135,000, SEO from KES 45,000 a month. Built for small and growing businesses in Kenya.",
  alternates: { canonical: "/pricing" }
};

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="What this costs.">
        <p>
          Most agencies here will not tell you until you are on a call with them. We would rather you
          knew now, so you can decide whether we are worth your time before you spend any of it.
        </p>
      </PageHero>

      <section className="content-section section-compact">
        <div className="shell">
          <div className="price-intro narrow">
            <h2>Why we publish our prices</h2>
            <p>
              You cannot judge whether we are worth it if you cannot see the number. Every price here is
              a real starting point, not a teaser to get you on a call. What you actually pay depends on
              what you actually need, and we will tell you what moves it before you commit to anything.
            </p>
            <p className="price-who">
              <strong>These are built for small and growing businesses.</strong> A two-person shop, a
              team of twenty. If you are a corporation with a procurement process and a six-month
              discovery phase, we are honestly not the right fit, and we would rather say so now.
            </p>
          </div>
        </div>
      </section>

      {/* Websites: the one service productised into tiers. */}
      <section className="content-section section-compact">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow"><i /> Business websites</span>
              <h2>Three ways to start.</h2>
            </div>
            <p>
              Scope here is predictable enough to promise, so these are packages rather than guesses.
              Most businesses want Growth.
            </p>
          </div>

          <div className="price-grid">
            {websitePackages.map((pkg) => (
              <article className={`price-card${pkg.featured ? " is-featured" : ""}`} key={pkg.name}>
                <div className="price-card-head">
                  <h3>{pkg.name}</h3>
                  {pkg.featured && <span className="price-tag">Most chosen</span>}
                </div>
                <p className="price-amount">
                  <span className="price-from">From</span> KES {ksh(pkg.from)}
                </p>
                <p className="price-who-line">{pkg.who}</p>
                <ul className="price-list">
                  {pkg.includes.map((item) => (
                    <li key={item}>
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                  {pkg.excludes?.map((item) => (
                    <li className="is-out" key={item}>
                      <span className="price-dash" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link className={`button${pkg.featured ? "" : " button-quiet"}`} href={site.bookingPath}>
                  Talk it through <ArrowUpRight />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Everything else: quoted, not packaged. */}
      <section className="content-section section-compact">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow"><i /> Everything else</span>
              <h2>Quoted, not packaged.</h2>
            </div>
            <p>
              These vary too much between businesses to put in a box. A starting price and an honest
              note on what moves it is the most useful thing we can give you here.
            </p>
          </div>

          <div className="price-rows">
            {servicePricing.map((service) => (
              <article className="price-row" key={service.slug}>
                <div className="price-row-head">
                  <h3>{service.title}</h3>
                  <p className="price-row-from">{service.from}</p>
                </div>
                <p className="price-row-note">{service.note}</p>
                <Link className="text-link" href={`/services/${service.slug}`}>
                  What this involves <ArrowRight />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section section-compact">
        <div className="shell price-honest">
          <div className="price-honest-col">
            <h2>What changes the price</h2>
            <ul className="price-factors">
              {priceFactors.map((factor) => (
                <li key={factor}>{factor}</li>
              ))}
            </ul>
          </div>
          <div className="price-honest-col">
            <h2>What we will not do</h2>
            <p>
              We will not quote you a number we cannot hit, and we will not promise you a 5x return.
              Nobody can honestly predict that, and anyone who puts a figure like that on a website is
              guessing. We would rather tell you what we are going to build and let it earn its keep.
            </p>
            <h3>If the number does not fit, say so</h3>
            <p>
              We would rather scope something smaller that actually works than lose a good conversation
              over a price. Everything here is a starting point, including the starting point. Tell us
              your budget and we will tell you honestly what it buys, or whether it buys anything at all.
            </p>
            {/* Not VAT-registered (confirmed 2026-07-15; threshold is KES 5m turnover).
                The price shown is the price billed, which is a real ~14% advantage over
                VAT-registered agencies for clients who cannot reclaim it. Revisit this
                line the moment turnover approaches the threshold. */}
            <p className="price-terms">
              <strong>How it works:</strong> half to start, half when it goes live. M-Pesa or bank
              transfer. The price we quote is the price you pay: no VAT gets added on top.
            </p>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
