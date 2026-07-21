import { PostCover } from "roble-media-lab-v2";

// The article-page cover. Takes a full Post; `html` and `toc` are part of the type
// but not read by this component, so they carry a minimal realistic value.
const post = {
  slug: "how-we-built-this-site",
  title: "We built this website with the same tools we sell",
  description:
    "How Roble Media Lab rebuilt its own website with practical AI. What we used, what broke first, and the one shortcut we refused to take.",
  date: "2026-07-08",
  dateLabel: "8 July 2026",
  updated: null,
  updatedLabel: null,
  readTime: "5 min read",
  wordCount: 1019,
  pillar: "websites" as const,
  pillarLabel: "Business Websites",
  cover: null,
  coverAlt: null,
  html: "<p>We rebuilt this site with the same stack we recommend to clients.</p>",
  toc: [
    { id: "what-we-used", text: "What we used" },
    { id: "what-broke", text: "What broke first" }
  ]
};

export const Default = () => (
  <div style={{ padding: 24, maxWidth: 760 }}>
    <PostCover post={post} />
  </div>
);
