import type { Metadata } from "next";
import { SearchClient } from "@/components/search-client";
import { buildSearchIndex } from "@/lib/search-index";

// noindex: a search UI is a thin page with no standalone value, and letting
// Google index it risks it ranking in place of the real content pages.
export const metadata: Metadata = {
  title: "Search",
  description: "Search Roble Media Lab services and insights.",
  robots: { index: false, follow: true }
};

// The header palette is the primary way into search now, but this page stays:
// it is the no-JS fallback the header link points at, and a real URL people can
// bookmark or land on from outside.
export default function SearchPage() {
  return <SearchClient index={buildSearchIndex()} />;
}
