"use client";

import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, writeConsent, type ConsentChoice } from "@/lib/consent";

/**
 * The "change your mind" control on /cookies.
 *
 * Consent that cannot be withdrawn as easily as it was given is not consent, so
 * this lives on a linked-from-the-footer page rather than behind a re-opened
 * banner, and it states the current answer back before offering to change it.
 *
 * Withdrawing reloads the page. lib/consent.ts deletes the `_ga` cookies and the
 * gate in components/analytics.tsx unmounts the script tag, but the gtag runtime
 * that the browser already parsed stays in memory and would keep queueing hits
 * until navigation. A reload is the only honest way to make "off" mean off.
 */
export function ConsentSettings() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setChoice(readConsent());
      setReady(true);
    };
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  function choose(next: ConsentChoice) {
    const withdrawing = readConsent() === "granted" && next === "denied";
    writeConsent(next);
    if (withdrawing) window.location.reload();
  }

  // Nothing is rendered until the cookie has been read, because the honest answer
  // before that is "we do not know yet" and a wrong default here is the one thing
  // this box must never say.
  if (!ready) return null;

  return (
    <div className="consent-settings">
      <p className="eyebrow"><i />Your choice</p>
      <p className="consent-settings-state">
        {choice === "granted"
          ? "Analytics cookies are on for this browser."
          : choice === "denied"
            ? "Analytics cookies are off for this browser."
            : "You have not answered yet, so analytics cookies are off."}
      </p>
      <div className="consent-actions">
        <button
          type="button"
          className="button button-small"
          onClick={() => choose("granted")}
          disabled={choice === "granted"}
        >
          Turn analytics on
        </button>
        <button
          type="button"
          className="button button-small button-quiet"
          onClick={() => choose("denied")}
          disabled={choice === "denied"}
        >
          Turn analytics off
        </button>
      </div>
      <p className="consent-settings-note">
        The setting is stored per browser and per device, so a choice made on your phone does not
        follow you to your laptop. Clearing your browser data resets it and we will ask again.
      </p>
    </div>
  );
}
