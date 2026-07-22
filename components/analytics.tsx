"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { site } from "@/content/site";
import { CONSENT_EVENT, dropAnalyticsCookies, readConsent } from "@/lib/consent";

// Cloudflare Web Analytics, privacy-first, cookieless, no consent banner required.
// Renders nothing until NEXT_PUBLIC_CF_BEACON_TOKEN is set, so it is safe by default.
export function Analytics() {
  if (!site.cfBeaconToken) return null;
  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="afterInteractive"
      data-cf-beacon={JSON.stringify({ token: site.cfBeaconToken })}
    />
  );
}

/**
 * Google Analytics, mounted only after the visitor has said yes.
 *
 * This is the whole consent mechanism on the tag side: no gtag script, no
 * dataLayer, no `_ga` cookie until `readConsent()` returns "granted". It starts
 * false on every render, including the server one, so the markup is identical for
 * everybody and there is no hydration mismatch; the effect then reads the cookie
 * and mounts GA a tick later for visitors who already agreed.
 *
 * It listens for CONSENT_EVENT so accepting in the banner starts measurement in
 * the same page view rather than the next one. Withdrawing does the reverse only
 * partially — React unmounts the <Script>, but gtag is already resident in the
 * page — so components/consent-settings.tsx reloads after a withdrawal to clear
 * it out for real.
 */
export function GoogleAnalyticsGated() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const sync = () => {
      const ok = readConsent() === "granted";
      setGranted(ok);
      // Sweep on every load without consent, not only at the moment someone
      // declines: see the note on dropAnalyticsCookies. This also cleans up after
      // a consent cookie that expired while the two-year `_ga` cookies did not.
      if (!ok) dropAnalyticsCookies();
    };
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (!granted) return null;
  return <GoogleAnalytics gaId={site.gaId} />;
}
