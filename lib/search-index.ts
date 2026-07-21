import { services } from "@/content/site";
import { getAllPosts } from "@/lib/blog";

export type SearchItem = { title: string; description: string; href: string; type: string };

// The main destinations. Without these the palette could not find "Pricing" or
// "Contact" — it only knew about services and posts, which is fine for a search
// page but useless for something people drive with the keyboard to get around.
const pages: SearchItem[] = [
  { title: "Services", description: "What we build: AI, automation, websites and content systems.", href: "/services", type: "Page" },
  { title: "Pricing", description: "What our work costs and what each package includes.", href: "/pricing", type: "Page" },
  { title: "About", description: "Who we are and how we work.", href: "/about", type: "Page" },
  { title: "Resources", description: "Practical guides and tools.", href: "/resources", type: "Page" },
  { title: "Insights", description: "Articles on AI, automation and running a business online.", href: "/blog", type: "Page" },
  { title: "Contact", description: "Start a conversation about your project.", href: "/contact", type: "Page" },
  { title: "Book a Free Discovery Call", description: "Pick a time to talk through what you need.", href: "/book", type: "Page" }
];

// One index, built at build time, shared by the header palette and the /search
// page so the two can never drift apart. It is small (services + posts, a few KB
// of JSON), which is why the header can afford to ship it with every page
// instead of fetching it on open — the palette has results on the first
// keystroke with no network round trip.
export function buildSearchIndex(): SearchItem[] {
  return [
    ...pages,
    ...services.map((s) => ({ title: s.title, description: s.short, href: `/services/${s.slug}`, type: "Service" })),
    ...getAllPosts().map((p) => ({ title: p.title, description: p.description, href: `/blog/${p.slug}`, type: "Insight" }))
  ];
}

// Title matches outrank description matches, and a title that starts with the
// query outranks one that merely contains it, so typing "auto" surfaces the
// Automation service above posts that mention automation in passing.
export function searchIndex(index: SearchItem[], query: string, limit = 8): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored: { item: SearchItem; score: number }[] = [];
  for (const item of index) {
    const title = item.title.toLowerCase();
    let score = 0;
    if (title.startsWith(q)) score = 3;
    else if (title.includes(q)) score = 2;
    else if (`${item.description} ${item.type}`.toLowerCase().includes(q)) score = 1;
    if (score) scored.push({ item, score });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.item);
}
