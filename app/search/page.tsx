import { SearchClient, type SearchItem } from "@/components/search-client";
import { services } from "@/content/site";
import { getAllPosts } from "@/lib/blog";

// Server component: build the search index at build time (services from the
// site config, insights from the MDX posts), then hand it to the client UI.
export default function SearchPage() {
  const index: SearchItem[] = [
    ...services.map((s) => ({ title: s.title, description: s.short, href: `/services/${s.slug}`, type: "Service" })),
    ...getAllPosts().map((p) => ({ title: p.title, description: p.description, href: `/blog/${p.slug}`, type: "Insight" }))
  ];
  return <SearchClient index={index} />;
}
