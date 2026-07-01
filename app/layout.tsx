import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
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
  twitter: { card: "summary", title: site.name, description: site.description },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = { themeColor: "#0B1020", colorScheme: "light" };

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  logo: `${site.url}/roble-media-lab-icon.svg`,
  areaServed: ["Kenya", "East Africa"],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </body>
    </html>
  );
}
