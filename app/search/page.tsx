import type { Metadata } from "next";
import { SearchClient, type SearchItem } from "@/components/search-client";
import { services } from "@/content/site";
import { getAllPosts } from "@/lib/blog";

// noindex: a search UI is a thin page with no standalone value, and letting
// Google index it risks it ranking in place of the real content pages.
export const metadata: Metadata = {
  title: "Search",
  description: "Search Roble Media Lab services and insights.",
  robots: { index: false, follow: true }
};

// Server component: build the search index at build time (services from the
// site config, insights from the MDX posts), then hand it to the client UI.
export default function SearchPage() {
  const index: SearchItem[] = [
    ...services.map((s) => ({ title: s.title, description: s.short, href: `/services/${s.slug}`, type: "Service" })),
    ...getAllPosts().map((p) => ({ title: p.title, description: p.description, href: `/blog/${p.slug}`, type: "Insight" }))
  ];
  return <SearchClient index={index} />;
}
