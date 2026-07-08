import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Roble Media Lab | Practical AI & Content Systems", template: "%s | Roble Media Lab" },
  description: site.description,
  alternates: { canonical: "/" },
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
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  email: site.email,
  ...(site.whatsapp ? { telephone: `+${site.whatsapp}` } : {}),
  logo: `${site.url}/roble-media-lab-icon.svg`,
  image: `${site.url}/roble-media-lab-icon.svg`,
  address: { "@type": "PostalAddress", addressCountry: "KE", addressRegion: "Nairobi" },
  areaServed: ["Kenya", "East Africa"],
  slogan: site.tagline,
  description: site.description
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </body>
    </html>
  );
}
