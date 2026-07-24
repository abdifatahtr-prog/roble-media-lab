import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/cta";
import { ArrowRight, CheckIcon, WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { ksh, priceFactors, servicePricing, site, websiteCarePlan, websitePackages, whatsappHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "What our work costs, published up front. Website packages from KES 60,000, automation from KES 135,000, SEO from KES 45,000 a month. Built for small and growing businesses in Kenya, and for international clients billed in USD or EUR on request.",
  alternates: { canonical: "/pricing" }
};

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="What this costs.">
        <p>
          Most agencies here keep their prices behind a sales call. We publish ours, so you can decide
          whether we are worth your time before you spend any of it. Every number below is a real
          starting point, not a teaser.
        </p>
      </PageHero>

      {/* Websites: the one service productised into tiers. A short fit note sits
          in the section intro rather than a full section of its own, so mobile
          readers reach the first card with far less scrolling. */}
      <section className="content-section section-compact">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow"><i /> Business websites</span>
              <h2>Three ways to start.</h2>
            </div>
            <p>
              Scope here is predictable enough to promise, so these are packages rather than guesses.
              Built for small and growing businesses; most want Growth.
            </p>
          </div>

          <div className="price-grid">
            {websitePackages.map((pkg) => (
              <article className={`price-card${pkg.featured ? " is-featured" : ""}`} key={pkg.name}>
                <div className="price-card-head">
                  <h3>{pkg.name}</h3>
                  {pkg.featured && <span className="price-tag">Recommended</span>}
                </div>
                <p className="price-amount">
                  <span className="price-from">From</span> KES {ksh(pkg.from)}
                </p>
                <p className="price-timeline">Typically live in {pkg.timeline}</p>
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
                {/* WhatsApp leads here: someone comparing prices usually has one
                    specific question ("is this negotiable for 6 pages?"), which is a
                    chat, not a meeting. The message names the package and the price so
                    we know what they are looking at before we reply. The button keeps
                    its tier treatment (solid on Growth, quiet on the others) so the
                    card hierarchy is unchanged. */}
                <a
                  className={`button${pkg.featured ? "" : " button-quiet"}`}
                  href={whatsappHref(`the ${pkg.name} website package (from KES ${ksh(pkg.from)})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-service={`${pkg.name} package`}
                >
                  <WhatsAppIcon width={16} height={16} /> Chat on WhatsApp
                </a>
                <Link className="price-card-alt" href={site.bookingPath}>
                  Or book a free call <ArrowRight />
                </Link>
              </article>
            ))}
          </div>

          {/* Currency note: prices are set in KES for our primary market, but the
              site should read as welcoming to international clients too. Kept as a
              quiet line under the packages so it informs without competing with
              the prices themselves. */}
          <p className="price-currency-note">
            Prices are shown in Kenyan Shillings (KES). International clients are welcome, and quotes
            can also be provided in USD or EUR on request.
          </p>
        </div>
      </section>

      {/* Care plan: the natural next question after "what does a site cost?" is
          "who keeps it healthy once it is live?". One card, same visual language
          as the packages above, so it reads as part of the same offer. */}
      <section className="content-section section-compact">
        <div className="shell">
          <div className="care-plan">
            <div className="care-plan-lead">
              <span className="eyebrow"><i /> After launch</span>
              <h2>Website Care Plan</h2>
              <p className="price-amount">
                <span className="price-from">From</span> KES {ksh(websiteCarePlan.from)}
                <span className="care-plan-per">/month</span>
              </p>
              <p className="care-plan-note">
                A live website is not finished, it is running. This keeps yours secure, fast, and
                backed up, with a person to call when something needs changing.
              </p>
              <a
                className="button button-quiet"
                href={whatsappHref("the Website Care Plan (from KES 8,000/month)")}
                target="_blank"
                rel="noopener noreferrer"
                data-service="Website Care Plan"
              >
                <WhatsAppIcon width={16} height={16} /> Ask about the Care Plan
              </a>
            </div>
            <ul className="price-list care-plan-list">
              {websiteCarePlan.benefits.map((benefit) => (
                <li key={benefit}>
                  <CheckIcon />
                  {benefit}
                </li>
              ))}
            </ul>
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
              <Link className="price-row" href={`/services/${service.slug}`} key={service.slug}>
                <div className="price-row-head">
                  <h3>{service.title}</h3>
                  <p className="price-row-from">{service.from}</p>
                </div>
                <p className="price-row-note">{service.note}</p>
                <span className="text-link">
                  What this involves <ArrowRight />
                </span>
              </Link>
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
              guessing. We would rather promise exactly what we will build than promise results nobody
              can honestly guarantee.
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
