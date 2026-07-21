import type { Metadata, Viewport } from "next";
import { Inter, Sora, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { UtmCapture } from "@/components/utm-capture";
import { ConversionTracking } from "@/components/conversion-tracking";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { founder, officialProfiles, services, site } from "@/content/site";
import { buildSearchIndex } from "@/lib/search-index";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
// The utility/label face — the "language of systems". Used with restraint for
// mono kickers, node tags, and data labels (see `--mono` in globals.css). Loaded
// site-wide now that the "Working System" language runs across every page.
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Roble Media Lab | Practical AI, Automation & Business Websites", template: "%s | Roble Media Lab" },
  description: site.description,
  // NOTE: no `alternates.canonical` here on purpose. Metadata cascades, so a
  // canonical set in the root layout is inherited by every page that does not
  // override it — which pointed the whole site (every blog post included) at the
  // homepage and told Google not to index them. Each page declares its own.
  // `types` is safe to cascade: it only advertises the RSS feed.
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  icons: { icon: "/roble-media-lab-icon.svg", apple: "/roble-media-lab-icon.svg" },
  openGraph: {
    title: "Roble Media Lab",
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_KE",
    type: "website"
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = { themeColor: "#0B1020", colorScheme: "light" };

// ProfessionalService extends LocalBusiness (better for local SEO than plain
// Organization). Deliberately region-level only, no street address, to protect the
// founder's home/physical privacy while still signalling a Kenyan local business.
//
// Entity disambiguation: the stable `@id`, the raster logo (Google wants a
// crawlable image ≥112px — the 256px PNG, not the SVG), and `sameAs` pointing
// at the official profiles all exist to tell Google that "Roble Media Lab" is
// exactly one organisation whose home is this domain — and nothing else.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  email: site.email,
  ...(site.whatsapp ? { telephone: `+${site.whatsapp}` } : {}),
  logo: { "@type": "ImageObject", url: `${site.url}/logo.png`, width: 256, height: 256 },
  image: `${site.url}/logo.png`,
  ...(officialProfiles.length > 0 ? { sameAs: officialProfiles } : {}),
  founder: { "@type": "Person", name: founder.name },
  address: { "@type": "PostalAddress", addressCountry: "KE", addressRegion: "Nairobi" },
  areaServed: ["Kenya", "East Africa"],
  slogan: site.tagline,
  description: site.description,
  // Derived from the service list so the catalogue can't drift from the site.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.intro,
        url: `${site.url}/services/${service.slug}`
      }
    }))
  }
};

// Names the site itself and ties it to the organisation above. This is the
// schema Google reads to pick the site name shown in results — one more place
// that says the name is exactly "Roble Media Lab".
const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "en"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header searchIndex={buildSearchIndex()} />
        {/* tabIndex={-1} lets the skip link move keyboard focus into the content,
            not just scroll to it, so the next Tab resumes inside main (2.4.1). */}
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
        <GoogleAnalytics gaId="G-DVFVKQNP4P" />
        <ConversionTracking />
        <UtmCapture />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
      </body>
    </html>
  );
}
