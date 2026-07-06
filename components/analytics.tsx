import Script from "next/script";
import { site } from "@/content/site";

// Cloudflare Web Analytics — privacy-first, cookieless, no consent banner required.
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
