"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, writeConsent } from "@/lib/consent";

/**
 * The cookie notice: a bar pinned to the bottom of the viewport, not a modal.
 *
 * Nothing behind it is blocked. There is no backdrop, no scroll lock and no focus
 * trap, so the page can be read, scrolled and clicked with the bar still up, and
 * someone who never answers is never stopped. It shows only while the choice is
 * unanswered, which for most people is one page view every six months.
 *
 * Reject All and Accept All are rendered at identical size (`flex: 1 1 0` on both,
 * so the wider label cannot win) and in matching weight. That is partly the design
 * call and partly the rule: a greyed-out reject beside a bright accept is the
 * pattern regulators single out as a dark pattern, and it is a bad trade anyway,
 * since a reluctant yes produces the same analytics number as a real one but costs
 * the trust this site is built on.
 *
 * "Manage Preferences" expands in place rather than linking away, so nobody has to
 * leave the page they came for to say no to one category. There is only one
 * optional category today (analytics), so the panel looks sparse. That is honest:
 * a longer list would mean we started collecting more.
 *
 * Rendered near the top of <body> so keyboard users reach it on the first Tab
 * instead of after the entire page. It is fixed-positioned, so DOM order changes
 * nothing visually.
 */
export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const sync = () => setOpen(readConsent() === null);
    sync();
    // Re-opens if the choice is cleared elsewhere (the settings panel on /cookies).
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  // The WhatsApp button is fixed to the bottom-right, which this bar runs straight
  // under. CSS hides it while the bar is up rather than reflowing it, since the bar
  // is transient and the button returns the moment the choice is made.
  useEffect(() => {
    if (open) document.body.dataset.consent = "open";
    else delete document.body.dataset.consent;
    return () => {
      delete document.body.dataset.consent;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="consent" role="region" aria-label="Cookie notice">
      <div className="shell consent-inner">
        <div className="consent-copy">
          <h2>Cookies</h2>
          <p>We use cookies to improve your experience and to understand how our website is used.</p>
          <p>Essential cookies are always enabled. Analytics cookies help us improve the site.</p>
          <p>
            See our <Link href="/cookies">Cookie Policy</Link> for more information.
          </p>
        </div>

        <div className="consent-controls">
          <div className="consent-actions">
            <button type="button" className="button button-small button-quiet" onClick={() => writeConsent("denied")}>
              Reject All
            </button>
            <button type="button" className="button button-small" onClick={() => writeConsent("granted")}>
              Accept All
            </button>
          </div>
          <button
            type="button"
            className="consent-manage"
            aria-expanded={showPrefs}
            aria-controls="consent-prefs"
            onClick={() => setShowPrefs((shown) => !shown)}
          >
            Manage Preferences
          </button>
        </div>
      </div>

      {showPrefs && (
        <div className="shell consent-prefs" id="consent-prefs">
          <div className="consent-pref">
            <div>
              <span className="consent-pref-name">Essential</span>
              <span className="consent-pref-desc">
                Security checks and remembering this choice. The site cannot work without them.
              </span>
            </div>
            <span className="consent-pref-fixed">Always on</span>
          </div>
          <div className="consent-pref">
            <label htmlFor="consent-analytics">
              <span className="consent-pref-name">Analytics</span>
              <span className="consent-pref-desc">
                Google Analytics, so we can see which pages help and which ones do not.
              </span>
            </label>
            <input
              id="consent-analytics"
              className="consent-switch"
              type="checkbox"
              role="switch"
              checked={analytics}
              onChange={(event) => setAnalytics(event.target.checked)}
            />
          </div>
          <button
            type="button"
            className="button button-small consent-save"
            onClick={() => writeConsent(analytics ? "granted" : "denied")}
          >
            Save preferences
          </button>
        </div>
      )}
    </div>
  );
}
