import type { PillarId } from "@/lib/blog";

export const site = {
  name: "Roble Media Lab",
  // The single source of truth for the tagline. Consumed by the homepage hero
  // eyebrow and by the Organization schema's `slogan`. Anywhere the tagline
  // appears off-site (email signature, business card, the reverse logo SVG)
  // must be updated by hand to match this string.
  tagline: "Practical AI, automation & websites",
  description:
    "Roble Media Lab helps growing businesses automate repeat workflows with practical AI, build fast business websites, and earn attention through useful content.",
  email: "hello@roblemedialab.co.ke",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://roblemedialab.co.ke",
  bookingUrl: "https://roblemedialab.zohobookings.com/#/4939818000000045045",
  bookingPath: "/book",
  // WhatsApp number in international format, digits only (no +, spaces, or dashes).
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "254707773916",
  // Kept deliberately short. WhatsApp's whole advantage is that it costs the visitor
  // nothing to start; a form-shaped prefilled message hands that friction straight
  // back. Business name, site, service and detail get collected conversationally
  // once the chat is open. Use whatsappHref() rather than reading this directly.
  whatsappMessage: "Hi Roble Media Lab! I'd like to improve my business with AI and automation.",
  // Cloudflare Web Analytics beacon token. Get it from the Cloudflare dashboard
  // (Analytics & Logs → Web Analytics). Empty = analytics disabled.
  cfBeaconToken: process.env.NEXT_PUBLIC_CF_BEACON_TOKEN ?? "",
  // GA4 measurement ID. Loaded only after the visitor accepts analytics cookies
  // (see components/analytics.tsx), so this being set does not by itself mean
  // anything is measured.
  gaId: "G-DVFVKQNP4P"
} as const;

/**
 * The click-to-chat link. Pass a service title to open the chat already on-topic
 * (used by the CTA panel on service pages); omit it for the generic opener.
 * Returns "" when no number is configured, so callers can render nothing.
 */
export function whatsappHref(topic?: string): string {
  if (!site.whatsapp) return "";
  const text = topic
    ? `Hi Roble Media Lab! I'd like to talk about ${topic} for my business.`
    : site.whatsappMessage;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

// Social profiles. Renders in the footer only for entries with a real `href`,
// and every filled entry is also emitted as `sameAs` in the Organization
// schema (app/layout.tsx) — the signal Google uses to tie the website and the
// social accounts together as ONE entity. Official profiles only: linking a
// profile here asserts to search engines that it belongs to Roble Media Lab.
// Each profile's bio should link back to https://roblemedialab.co.ke so the
// claim is reciprocal.
export type SocialId = "linkedin" | "instagram" | "x" | "facebook" | "youtube" | "tiktok";
export type Social = { id: SocialId; label: string; href: string };
export const socials: Social[] = [
  // LinkedIn is deliberately empty: the existing profile is the founder's
  // personal one, and org sameAs must only claim company-owned profiles.
  { id: "linkedin", label: "LinkedIn", href: "" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/roblemedialab" },
  { id: "x", label: "X (Twitter)", href: "https://x.com/roblemedialab" },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61591682155057" },
  { id: "youtube", label: "YouTube", href: "" },
  { id: "tiktok", label: "TikTok", href: "" }
];

/** Filled profiles only — the Organization schema's sameAs list. */
export const officialProfiles = socials.map((s) => s.href).filter(Boolean);

// Deliberately minimal: the company is the story, not the founder. /about names
// the founder in one line inside the transparency section, nothing more.
export type Founder = {
  name: string;
  role: string;
};

export const founder: Founder = {
  name: "Abdifatah Hassan",
  role: "Founder, Roble Media Lab"
};

// Trust: real content only. Leave empty until you have permission to publish.
// Fabricated proof is never shipped, these components render nothing when empty.
export type Testimonial = { quote: string; name: string; role: string; company?: string };
export const testimonials: Testimonial[] = [];

// Optional "trusted by" logos or names. Leave empty until real.
export type Client = { name: string; logo?: string };
export const clients: Client[] = [];

export type Service = {
  slug: string;
  title: string;
  // A one-word classification of the kind of work (the mono "system label" on
  // service cards). Not an index — order isn't information, so cards are tagged,
  // not numbered. Shown on the home page and the services listing.
  category: string;
  short: string;
  intro: string;
  outcomes: string[];
  process: string[];
  // Blog pillar ids (see PILLARS in lib/blog.ts) whose posts belong on this
  // service page. Drives the "related reading" block, so every service links
  // out to the articles that support it.
  pillars: PillarId[];
};

export const services: Service[] = [
  {
    slug: "ai-business-automation",
    title: "AI & Business Automation",
    category: "automation",
    short: "Find the workflows worth automating, then build ones your team will actually use.",
    intro: "We look at how work happens today, agree which workflows are worth automating, and build the ones that earn their place. Testing, documentation, and team training are part of the work rather than an afterthought. Once it is live, you can run it yourself or add optional monthly management that keeps it monitored, maintained, and improving.",
    outcomes: ["A prioritised opportunity map", "Working automations, not demos", "Documented workflows and safeguards", "A team confident enough to run it"],
    process: ["Understand the business and its constraints", "Map workflows and rank opportunities", "Build and test against real inputs", "Train the team, document, and improve"],
    pillars: ["ai", "automation", "operations"]
  },
  {
    slug: "business-websites",
    title: "Business Websites",
    category: "websites",
    short: "A fast, findable website that makes it easy to get in touch.",
    intro: "We design and build business websites that load quickly, read clearly, meet WCAG 2.2 AA accessibility, and turn interest into an enquiry. Search structure, analytics, and a contact process that actually reaches you are built in from the start, and we can keep the site looked after once it is live.",
    outcomes: ["A site that loads fast on real connections", "Clear routes to an enquiry", "Search-ready structure and content", "Accessible to WCAG 2.2 AA, so everyone can use it", "Booking, payments, or a CRM connected when you need them", "Analytics that show what visitors do"],
    process: ["Clarify the audience and the offer", "Plan the structure and the content", "Design, build, and test the site", "Measure real use and improve on evidence"],
    pillars: ["websites", "seo-content"]
  },
  {
    // Slug stays `seo-content-strategy` for URL and inbound-link stability (the
    // blog deep-links to it); the display title is the hybrid "SEO & Content
    // Systems" — "SEO" keeps the keyword clients actually search for in the h1,
    // title tag, footer, contact dropdown, and schema, while "Systems" signals
    // the consultancy positioning over generic-agency "Strategy".
    slug: "seo-content-strategy",
    title: "SEO & Content Systems",
    category: "content",
    short: "A repeatable system for creating, scheduling, and repurposing useful content, built around what people are searching for and run at a rhythm you can sustain.",
    intro: "Consistent content comes from a system, not a spreadsheet. We connect what your audience is searching for with your own expertise, then build the pillars, calendar, and templates that keep it going: AI-assisted drafting that still sounds like you, scheduling and repurposing across your blog and social channels, and reporting on what actually works. Run it yourself once it is set up, or add an optional monthly retainer where we manage it with you.",
    outcomes: ["Content pillars built around real search intent", "AI-assisted drafts that still sound like you", "A calendar and scheduling rhythm across blog and social", "One idea repurposed into many formats", "Reporting that shows what is actually working", "Templates and a workflow your team owns"],
    process: ["Research the audience, search intent, and your best material", "Map content pillars and repeatable formats", "Set up the calendar, drafting, and scheduling workflow", "Publish, repurpose, measure, and refine"],
    pillars: ["seo-content", "websites"]
  },
  {
    slug: "whatsapp-automation",
    title: "WhatsApp Automation",
    category: "messaging",
    short: "Create faster, more consistent customer conversations.",
    intro: "We help service businesses structure enquiries, qualification, updates, and follow-up through practical WhatsApp workflows.",
    outcomes: ["Faster first responses", "Consistent lead qualification", "Clearer follow-up", "Better routing to a person"],
    process: ["Map conversation paths", "Write useful responses", "Connect business tools", "Test escalation and handoff"],
    pillars: ["automation", "operations"]
  }
];

/* ---------------------------------------------------------------------------
   PRICING
   Set July 2026 from desk research into published Kenyan agency rates, anchored
   ~10% below the AGENCY tier (not the freelancer floor, which is a segment we
   have deliberately chosen not to compete in).

   Every figure is a STARTING point, never a ceiling. Nothing here is a quote.
   Re-check these against real delivery hours after the first few projects: we
   do not yet know what this work actually costs us in time.
--------------------------------------------------------------------------- */

/** Formats 95000 as "95,000". Prices are shown in KES, VAT not applicable. */
export function ksh(amount: number): string {
  return amount.toLocaleString("en-KE");
}

export type WebsitePackage = {
  name: string;
  from: number;
  who: string;
  /** Honest delivery range, shown as a quiet line under the price. */
  timeline: string;
  includes: string[];
  excludes?: string[];
  featured?: boolean;
};

/** Websites are the only service productised into fixed tiers: scope is
 *  predictable enough to promise, and buyers in this market expect three. */
export const websitePackages: WebsitePackage[] = [
  {
    name: "Starter",
    from: 60_000,
    timeline: "2 to 3 weeks",
    who: "A site that makes people trust you and makes it easy to get in touch. Nothing you do not need.",
    includes: [
      "Up to 5 pages",
      "Built mobile-first, made to load fast",
      "A contact form that actually reaches you",
      "WhatsApp click-to-chat",
      "Search structure and Search Console",
      "Analytics",
      "2 rounds of revisions"
    ],
    excludes: ["No booking system", "No blog"]
  },
  {
    name: "Growth",
    from: 95_000,
    timeline: "3 to 5 weeks",
    who: "The site most growing businesses actually need. This website is the Growth package: look around.",
    featured: true,
    includes: [
      "Everything in Starter",
      "Up to 12 pages",
      "Booking that goes straight to your calendar",
      "A blog you can publish to yourself",
      "Lead capture with an automatic reply",
      "Full search structure: schema, sitemap, canonicals",
      "Readable for everyone (WCAG 2.2 AA)",
      "Conversion tracking",
      "3 rounds of revisions",
      "Handover training and 30 days of support"
    ]
  },
  {
    name: "Scale",
    from: 185_000,
    timeline: "4 to 8 weeks",
    who: "For when the website is a system rather than a brochure, and it has to sell or book while you sleep.",
    includes: [
      "Everything in Growth",
      "Up to 25 pages",
      "Online shop or advanced booking",
      "M-Pesa integration",
      "Leads land in your CRM automatically",
      "One automation workflow included",
      "90 days of support and 2 training sessions"
    ]
  }
];

export type ServicePrice = {
  slug: string;
  title: string;
  from: string;
  note: string;
};

/** Titles come from `services`, never retyped here: hardcoding them meant renaming
 *  a service silently desynced the pricing page. Throws at build time on a bad slug
 *  rather than shipping a wrong name. */
function serviceTitle(slug: string): string {
  const match = services.find((service) => service.slug === slug);
  if (!match) throw new Error(`servicePricing references an unknown service slug: ${slug}`);
  return match.title;
}

/** The other three are quoted, not packaged: their scope genuinely varies, and a
 *  fixed tier would be a promise we could not keep. */
export const servicePricing: ServicePrice[] = [
  {
    slug: "ai-business-automation",
    from: `Build from KES ${ksh(135_000)}, optional management from KES ${ksh(20_000)}/month`,
    note: "Most first builds land between KES 135,000 and 300,000, depending on how many systems have to talk to each other. Optional monthly management keeps it running: monitoring, prompt improvements, workflow updates, maintenance, and support. Not sure it is worth it? Start with an audit at KES 25,000, and we take that off the build if you go ahead."
  },
  {
    slug: "whatsapp-automation",
    from: `From KES ${ksh(45_000)} to build, then from KES ${ksh(9_000)}/month`,
    note: "WhatsApp charges its own fee per conversation, and the AI costs a little to run. We bill both at cost, on the invoice, with no markup, and we estimate them for you before you commit to anything."
  },
  {
    slug: "seo-content-strategy",
    from: `From KES ${ksh(45_000)}/month`,
    note: "This is a monthly content system, not a burst of posts: a sustainable calendar, AI-assisted drafts that still sound like you, scheduling and repurposing across your channels, and a simple report on what is working. Fewer, better pieces rather than ten posts a month nobody reads. It takes months to compound, not weeks, and we would rather tell you that now than sell you a single month of it."
  }
].map((entry) => ({ ...entry, title: serviceTitle(entry.slug) }));

/** Optional monthly plan that keeps a finished website healthy. Shown on
 *  /pricing directly under the website packages: the natural next question
 *  after "what does a site cost?" is "who looks after it once it is live?". */
export const websiteCarePlan = {
  from: 8_000,
  benefits: [
    "Security updates",
    "Performance monitoring",
    "Regular backups",
    "Minor content edits",
    "Priority support"
  ]
};

/** Honest answer to "why is it not one number?", shown on /pricing. */
export const priceFactors = [
  "How many pages, and whether they are variations on one design or each built once.",
  "Whether you already have the words and photos, or need them written and made.",
  "What has to connect: M-Pesa, your CRM, booking, stock.",
  "How quickly you need it.",
  "Whether we hand it over and leave, or stay on afterwards."
];

export const principles = [
  ["Useful before impressive", "Technology should remove friction and support a clear business need."],
  ["Honest by default", "We do not sell AI as magic or promise outcomes we cannot control."],
  ["Built around people", "The best system is one your team understands and can keep using."],
  ["Improve with evidence", "We test, learn from real use, and refine the work deliberately."]
] as const;

export const faqs = [
  ["What kinds of businesses do you work with?", "We focus on SMEs, startups, agencies, consultants, service businesses, and growing teams, primarily in Kenya and East Africa."],
  ["Do we need to know which AI tools we want?", "No. We begin with the business problem and workflow, then recommend tools only where they are genuinely useful."],
  ["Can you automate our entire business?", "Usually, trying to automate everything at once creates more risk than value. We start with focused, repeatable workflows and expand based on evidence."],
  ["Do you guarantee SEO rankings or business results?", "No. Search rankings and commercial outcomes depend on factors no responsible provider can fully control. We commit to sound strategy, careful execution, and transparent measurement."],
  ["Do you write content or manage our social media?", "That is what our SEO & Content Systems service is for. We build the pillars, calendar, and templates, help create content with AI assistance that still sounds like you, and can schedule and repurpose it across your blog and social channels. Once it is set up you can run it yourself, or add an optional monthly retainer where we manage and report on it with you. We are not a post-ten-times-a-day social agency; we build a system that keeps useful content going."],
  ["What is the best first step?", "A 30-minute discovery call is a useful place to start. We will discuss the problem, current workflow, and whether there is a sensible way to help."],
  ["Do you offer team training?", "Yes. Training is part of how we hand over automation work rather than a separate product, because a system nobody understands does not survive contact with a busy week. It can also be run on its own, covering practical AI use, prompting, workflow design, and responsible usage."],
  ["Do you build websites, or only automate things?", "We build them. A business website is one of the four things we do, and this site is our own example of the work: fast to load, structured for search, with a contact process that actually reaches a person."]
] as const;

// Blog posts now live as .mdx files in content/blog/ and are read via lib/blog.ts.
// (Previously this file held an `articles` metadata array.)
