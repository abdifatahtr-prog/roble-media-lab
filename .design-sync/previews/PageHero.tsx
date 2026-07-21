import { PageHero } from "roble-media-lab-v2";

// Copy is taken from the live services and blog pages so the card shows the real
// editorial voice, not lorem filler.

export const Page = () => (
  <PageHero eyebrow="What we do" title="Practical AI, automation and websites">
    We work with SMEs across Kenya and East Africa to find the repetitive work worth
    automating, then build the system that handles it.
  </PageHero>
);

export const Article = () => (
  <PageHero
    eyebrow="Automation"
    variant="article"
    title="WhatsApp is your front desk. Most businesses run it like a personal phone."
  >
    A practical guide to organising and automating WhatsApp for a small business.
  </PageHero>
);
