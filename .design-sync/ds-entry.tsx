// Design-system entry for design-sync.
//
// This repo is the website app, not a published component library, so there is no
// dist/ entry to point the converter at. This file is that entry: it names exactly
// the presentational components worth designing with, and nothing else.
//
// Deliberately excluded:
//   analytics, conversion-tracking, utm-capture, turnstile, reading-progress,
//   contact-form, search-client, whatsapp-button  -- infrastructure or
//     third-party-widget components that render nothing designable.
//   testimonials  -- `testimonials` and `clients` in content/site.ts are empty by
//     design (no fabricated proof), so the component renders an empty section.
//
// Everything here renders through the semantic classes in app/globals.css.

// MUST stay first: defines process.env before any component module reads it.
import "./shims/process-env";

export { PageHero } from "@/components/page-hero";
export { CTA } from "@/components/cta";
export { ArticleCard } from "@/components/article-card";
export { CoverArt } from "@/components/cover-art";
export { PostCover } from "@/components/post-cover";
export { FAQList } from "@/components/faq-list";
export { Header } from "@/components/header";
export { Footer } from "@/components/footer";
export { ShareButtons } from "@/components/share-buttons";
export { Reveal } from "@/components/reveal";

export {
  ArrowUpRight,
  ArrowRight,
  MenuIcon,
  CloseIcon,
  SearchIcon,
  LinkIcon,
  CheckIcon,
  LinkedInIcon,
  InstagramIcon,
  XIcon,
  FacebookIcon,
  YouTubeIcon,
  TikTokIcon,
  WhatsAppIcon
} from "@/components/icons";
