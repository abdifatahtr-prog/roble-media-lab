import type { PillarId } from "@/lib/blog";

export const site = {
  name: "Roble Media Lab",
  tagline: "Smarter content. Practical AI.",
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
