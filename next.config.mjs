const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" }
];

// Retired paths keep their inbound links and any accrued ranking by redirecting
// to the page that absorbed them. Services were consolidated from seven to four
// (July 2026); the blog entry is a renamed post.
const retiredRedirects = [
  ["/services/ai-consulting", "/services/ai-business-automation"],
  ["/services/ai-implementation", "/services/ai-business-automation"],
  ["/services/business-automation", "/services/ai-business-automation"],
  ["/services/ai-training", "/services/ai-business-automation"],
  ["/services/content-systems", "/services/seo-content-strategy"],
  // The launch post was reframed from a first-person founder story into the
  // company build log (July 2026); the old slug keeps its inbound links.
  ["/blog/building-this-as-a-non-coder", "/blog/how-we-built-this-site"]
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    // statusCode 301 rather than `permanent: true`, which emits a 308. Search
    // engines treat them alike, but 301 is what every SEO tool and older crawler
    // expects, and these are GET-only pages so there is no method to preserve.
    return [
      ...retiredRedirects.map(([source, destination]) => ({ source, destination, statusCode: 301 })),
      // Printed business card QR target. Deliberately a SHORT path and a TEMPORARY
      // (302) redirect: 302 keeps it out of browser/CDN permanent caches, so the
      // destination can be changed later without reprinting cards that are already
      // in people's wallets. The UTMs live here, not on the card, for the same reason.
      {
        source: "/card",
        destination: "/services?utm_source=card&utm_medium=print&utm_campaign=business_card",
        statusCode: 302
      }
    ];
  }
};

export default nextConfig;

// Enable Cloudflare bindings during local `next dev` (no-op in production build).
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
