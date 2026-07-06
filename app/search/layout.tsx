import type { Metadata } from "next";

// The search page is a thin client-side utility with no unique indexable content,
// so keep it out of search results while still allowing crawling of its links.
export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true }
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
