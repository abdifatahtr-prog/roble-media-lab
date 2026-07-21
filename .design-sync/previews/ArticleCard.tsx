import { ArticleCard } from "roble-media-lab-v2";

// Real posts from content/blog-data.json. `cover: null` is the common case on this
// site -- it's what triggers the branded generated CoverArt rather than a photo.
const whatsapp = {
  slug: "whatsapp-is-your-front-desk",
  title: "WhatsApp is your front desk. Most businesses run it like a personal phone.",
  description:
    "A practical guide to organising and automating WhatsApp for a small business. What the free Business app can do, when you've outgrown it, and how to automate without annoying your customers.",
  date: "2026-07-17",
  dateLabel: "17 July 2026",
  updated: null,
  updatedLabel: null,
  readTime: "9 min read",
  wordCount: 1785,
  pillar: "automation" as const,
  pillarLabel: "Automation",
  cover: null,
  coverAlt: null
};

const website = {
  slug: "what-a-business-website-is-for",
  title: "What a business website is actually for",
  description:
    "A website is a system that answers questions and starts conversations, not an online brochure. A practical framework for what it should actually do.",
  date: "2026-07-17",
  dateLabel: "17 July 2026",
  updated: null,
  updatedLabel: null,
  readTime: "13 min read",
  wordCount: 2569,
  pillar: "websites" as const,
  pillarLabel: "Business Websites",
  cover: null,
  coverAlt: null
};

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: 32, maxWidth: 420 }}>{children}</div>
);

export const Default = () => (
  <Frame>
    <ArticleCard post={whatsapp} />
  </Frame>
);

// titleAs="h2" is the listing page; the default h3 is the "Keep reading" rail.
export const ListingHeading = () => (
  <Frame>
    <ArticleCard post={website} titleAs="h2" />
  </Frame>
);
