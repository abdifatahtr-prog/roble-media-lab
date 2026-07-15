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
  whatsappMessage: "Hi Roble Media Lab, I'd like to talk about",
  // Cloudflare Web Analytics beacon token. Get it from the Cloudflare dashboard
  // (Analytics & Logs → Web Analytics). Empty = analytics disabled.
  cfBeaconToken: process.env.NEXT_PUBLIC_CF_BEACON_TOKEN ?? ""
} as const;

// Social profiles. Renders in the footer only for entries with a real `href`.
// Fill in the profile URLs you actually have; leave the rest as "" and they won't show.
export type SocialId = "linkedin" | "instagram" | "x" | "facebook" | "youtube" | "tiktok";
export type Social = { id: SocialId; label: string; href: string };
export const socials: Social[] = [
  { id: "linkedin", label: "LinkedIn", href: "" },
  { id: "instagram", label: "Instagram", href: "" },
  { id: "x", label: "X (Twitter)", href: "" },
  { id: "facebook", label: "Facebook", href: "" },
  { id: "youtube", label: "YouTube", href: "" },
  { id: "tiktok", label: "TikTok", href: "" }
];

// The founder block renders on /about only when `bio` has content.
// REPLACE the placeholder copy with real details before publishing.
export type Founder = {
  name: string;
  role: string;
  photo?: string; // e.g. "/founder.jpg" placed in /public
  bio: string[];
  credentials: string[];
};

export const founder: Founder = {
  name: "Abdifatah Hassan",
  role: "Founder, Roble Media Lab",
  photo: "/founder.jpg",
  bio: [
    "I'm Abdifatah Hassan, founder of Roble Media Lab. I started the studio to help growing businesses across Kenya and East Africa put content, automation, and practical AI to work, the grounded, useful way, without the hype.",
    "My background is in business operations and compliance, including remote work with UK-based organisations where I built reporting systems, ran process audits, and kept documentation dependable. That work taught me to see a business as a set of systems, which is exactly how good automation and content workflows are built. I hold Google Professional Certificates in Data Analytics and Project Management, alongside a Bachelor of Business Management (International Business) from Mount Kenya University.",
    "I work best with SMEs, founders, and service businesses that sense something could run smoother but want a partner who is honest about what technology can and cannot do. I bring an operations mindset, real data literacy, and a bias for simple systems people will actually use, and I work fluently in English, Swahili, and Somali."
  ],
  credentials: [
    "Google Data Analytics Professional Certificate",
    "Google Project Management Professional Certificate",
    "Bachelor of Business Management (International Business), Mount Kenya University",
    "Operations & compliance experience with UK-based organisations",
    "Works in English, Swahili & Somali · Based in Nairobi, Kenya"
  ]
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
    short: "Find the workflows worth automating, then build ones your team will actually use.",
    intro: "We look at how work happens today, agree which workflows are worth automating, and build the ones that earn their place. Testing, documentation, and team training are part of the work rather than an afterthought.",
    outcomes: ["A prioritised opportunity map", "Working automations, not demos", "Documented workflows and safeguards", "A team confident enough to run it"],
    process: ["Understand the business and its constraints", "Map workflows and rank opportunities", "Build and test against real inputs", "Train the team, document, and improve"],
    pillars: ["ai", "automation", "operations"]
  },
  {
    slug: "business-websites",
    title: "Business Websites",
    short: "A fast, findable website that makes it easy to get in touch.",
    intro: "We design and build business websites that load quickly, read clearly, and turn interest into an enquiry. Search structure, analytics, and a contact process that actually reaches you are built in from the start.",
    outcomes: ["A site that loads fast on real connections", "Clear routes to an enquiry", "Search-ready structure and content", "Analytics that show what visitors do"],
    process: ["Clarify the audience and the offer", "Plan the structure and the content", "Design, build, and test the site", "Measure real use and improve on evidence"],
    pillars: ["websites", "seo-content"]
  },
  {
    slug: "seo-content-strategy",
    title: "SEO & Content Strategy",
    short: "Useful content built around what your audience is searching for, at a rhythm you can sustain.",
    intro: "We connect search intent, your own expertise, and a realistic publishing plan, then hand over the templates and workflow that keep it going. No promises of guaranteed rankings.",
    outcomes: ["Search-informed priorities", "A useful topic architecture", "Reusable templates and a clear workflow", "A measurable editorial plan"],
    process: ["Research the audience and search landscape", "Map topics to services", "Build the templates and publishing workflow", "Measure and refine"],
    pillars: ["seo-content", "websites"]
  },
  {
    slug: "whatsapp-automation",
    title: "WhatsApp Automation",
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
    who: "The site most growing businesses actually need. This website is the Growth package: look around.",
    featured: true,
    includes: [
      "Everything in Starter",
      "Up to 12 pages",
      "Booking that goes straight to your calendar",
      "A blog you can publish to yourself",
      "Lead capture with an automatic reply",
      "Full search structure: schema, sitemap, canonicals",
      "Readable for everyone (WCAG AA)",
      "Conversion tracking",
      "3 rounds of revisions",
      "Handover training and 30 days of support"
    ]
  },
  {
    name: "Scale",
    from: 185_000,
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

/** The other three are quoted, not packaged: their scope genuinely varies, and a
 *  fixed tier would be a promise we could not keep. */
export const servicePricing: ServicePrice[] = [
  {
    slug: "ai-business-automation",
    title: "AI & Business Automation",
    from: `From KES ${ksh(135_000)}`,
    note: "Most first builds land between KES 135,000 and 300,000, depending on how many systems have to talk to each other. Not sure it is worth it? Start with an audit at KES 25,000, and we take that off the build if you go ahead."
  },
  {
    slug: "whatsapp-automation",
    title: "WhatsApp Automation",
    from: `From KES ${ksh(45_000)} to build, then from KES ${ksh(9_000)}/month`,
    note: "WhatsApp charges its own fee per conversation, and the AI costs a little to run. We bill both at cost, on the invoice, with no markup, and we estimate them for you before you commit to anything."
  },
  {
    slug: "seo-content-strategy",
    title: "SEO & Content Strategy",
    from: `From KES ${ksh(45_000)}/month`,
    note: "Fewer, better pieces rather than ten posts a month nobody reads. This work takes months to show up, not weeks, and we would rather tell you that now than sell you a single month of it."
  }
];

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
  ["What is the best first step?", "A 30-minute discovery call is a useful place to start. We will discuss the problem, current workflow, and whether there is a sensible way to help."],
  ["Do you offer team training?", "Yes. Training is part of how we hand over automation work rather than a separate product, because a system nobody understands does not survive contact with a busy week. It can also be run on its own, covering practical AI use, prompting, workflow design, and responsible usage."],
  ["Do you build websites, or only automate things?", "We build them. A business website is one of the four things we do, and this site is our own example of the work: fast to load, structured for search, with a contact process that actually reaches a person."]
] as const;

// Blog posts now live as .mdx files in content/blog/ and are read via lib/blog.ts.
// (Previously this file held an `articles` metadata array.)
