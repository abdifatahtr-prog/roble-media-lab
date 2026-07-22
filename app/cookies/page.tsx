import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ConsentSettings } from "@/components/consent-settings";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Every cookie this website can set, who sets it, how long it lasts, and how to turn the optional ones on or off.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/cookies" }
};

export default function Cookies() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Cookie policy">
        <p>Every cookie this website can set, what it does, and how to change your mind.</p>
      </PageHero>
      <section className="content-section">
        <div className="shell narrow prose">
          <p>Last updated: 22 July 2026</p>

          <p>
            Most of this site works with no cookies at all. The only optional ones are Google
            Analytics, and they are not loaded until you accept them. If you decline, or if you
            simply never answer, the analytics script is never added to the page, so there is
            nothing to opt out of afterwards.
          </p>

          <h2>Change your choice</h2>
          <ConsentSettings />

          <h2>Strictly necessary</h2>
          <p>
            These keep the site working and safe. They do not track you across other websites and
            cannot be turned off here, because switching them off means switching off the thing
            they support.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Set by</th>
                  <th>Purpose</th>
                  <th>Lasts</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>rml_consent</td>
                  <td>Roble Media Lab</td>
                  <td>Remembers whether you accepted or declined analytics, so we stop asking.</td>
                  <td>6 months</td>
                </tr>
                <tr>
                  <td>__cf_bm, cf_clearance</td>
                  <td>Cloudflare</td>
                  <td>
                    Tells automated traffic apart from real visitors. Cloudflare hosts the site and
                    runs the anti-spam check on the enquiry form, so these may be set on any page.
                  </td>
                  <td>30 minutes to 1 year</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Analytics, only if you accept</h2>
          <p>
            We use Google Analytics 4 to see which pages get read, which get skipped, and which
            enquiries came from where. It is how a small team decides what to write next. We do not
            run advertising cookies, we do not sell data, and there is no advertising network
            embedded in this site.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Set by</th>
                  <th>Purpose</th>
                  <th>Lasts</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>_ga</td>
                  <td>Google</td>
                  <td>Gives your browser a random ID so repeat visits are not counted as new people.</td>
                  <td>2 years</td>
                </tr>
                <tr>
                  <td>_ga_&lt;property id&gt;</td>
                  <td>Google</td>
                  <td>Keeps track of the current visit for this specific website.</td>
                  <td>2 years</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Turning analytics off on this page deletes these cookies from your browser straight
            away, as well as stopping new ones.
          </p>

          <h2>Things that are not cookies</h2>
          <p>
            If you arrive from a campaign link, the tracking parameters in that link (utm_source and
            friends) are kept in your browser&rsquo;s session storage so they are still attached if
            you fill in the enquiry form a few pages later. That is stored in your browser only, it
            is cleared when you close the tab, and it holds no personal information.
          </p>
          <p>
            We also use Cloudflare Web Analytics, which counts page views without cookies and
            without following anyone between sites. There is nothing to consent to, because there is
            nothing stored on your device.
          </p>

          <h2>Blocking cookies yourself</h2>
          <p>
            Every browser can block or delete cookies in its own settings, and that overrides
            anything chosen here. Blocking the strictly necessary ones may break the enquiry form,
            since the spam check needs them.
          </p>

          <h2>Questions</h2>
          <p>
            Email <a href={`mailto:${site.email}`}>{site.email}</a> and a person will answer. See
            also our <Link href="/privacy">privacy policy</Link> for what happens to information you
            send us directly.
          </p>
        </div>
      </section>
    </>
  );
}
