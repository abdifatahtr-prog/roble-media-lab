export const site = {
  name: "Roble Media Lab",
  tagline: "Smarter content. Practical AI.",
  description:
    "Roble Media Lab helps growing businesses create better content systems, use practical AI tools, and automate repeat workflows.",
  email: "hello@roblemedialab.co.ke",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://roblemedialab.co.ke",
  bookingUrl: "https://roblemedialab.zohobookings.com/#/4939818000000045045",
  bookingPath: "/book",
  jotformId: "261812591563056",
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
    "I'm Abdifatah Hassan, founder of Roble Media Lab. I started the studio to help growing businesses across Kenya and East Africa put content, automation, and practical AI to work — the grounded, useful way, without the hype.",
    "My background is in business operations and compliance, including remote work with UK-based organisations where I built reporting systems, ran process audits, and kept documentation dependable. That work taught me to see a business as a set of systems — which is exactly how good automation and content workflows are built. I hold Google Professional Certificates in Data Analytics and Project Management, alongside a Bachelor of Business Management (International Business) from Mount Kenya University.",
    "I work best with SMEs, founders, and service businesses that sense something could run smoother but want a partner who is honest about what technology can and cannot do. I bring an operations mindset, real data literacy, and a bias for simple systems people will actually use — and I work fluently in English, Swahili, and Somali."
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
// Fabricated proof is never shipped — these components render nothing when empty.
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
};

export const services: Service[] = [
  {
    slug: "ai-consulting",
    title: "AI Consulting",
    short: "Find practical, responsible uses for AI in your business.",
    intro: "We examine how work happens today, identify useful AI opportunities, and turn them into a grounded implementation roadmap.",
    outcomes: ["A clear opportunity map", "Prioritised use cases", "Tool and risk guidance", "A practical next-step plan"],
    process: ["Understand your business and constraints", "Map workflows and opportunities", "Prioritise by value and feasibility", "Deliver a practical roadmap"]
  },
  {
    slug: "ai-implementation",
    title: "AI Implementation",
    short: "Move from an AI idea to a dependable working system.",
    intro: "We design and implement focused AI tools around your real workflow, with testing, documentation, and team adoption built in.",
    outcomes: ["A working implementation", "Documented workflows", "Testing and safeguards", "Team handover and training"],
    process: ["Define the use case", "Prototype the workflow", "Test with real inputs", "Launch, document, and improve"]
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    short: "Reduce repetitive admin and make handoffs more reliable.",
    intro: "We connect the everyday tools your business uses and automate repeatable work without making the system harder to manage.",
    outcomes: ["Less manual repetition", "Fewer missed handoffs", "Clearer operating processes", "Time returned to higher-value work"],
    process: ["Audit the current process", "Design the automation", "Build and test safeguards", "Train the team and monitor"]
  },
  {
    slug: "whatsapp-automation",
    title: "WhatsApp Automation",
    short: "Create faster, more consistent customer conversations.",
    intro: "We help service businesses structure enquiries, qualification, updates, and follow-up through practical WhatsApp workflows.",
    outcomes: ["Faster first responses", "Consistent lead qualification", "Clearer follow-up", "Better routing to a person"],
    process: ["Map conversation paths", "Write useful responses", "Connect business tools", "Test escalation and handoff"]
  },
  {
    slug: "content-systems",
    title: "Content Systems",
    short: "Turn scattered content work into a repeatable operating rhythm.",
    intro: "We build the strategy, templates, planning workflow, and measurement habits that help your business publish consistently.",
    outcomes: ["Clear content direction", "Reusable templates", "A manageable calendar", "A workflow your team can sustain"],
    process: ["Clarify audience and offers", "Build the content pillars", "Create templates and workflow", "Review and improve"]
  },
  {
    slug: "seo-content-strategy",
    title: "SEO & Content Strategy",
    short: "Build useful content around what your audience is searching for.",
    intro: "We connect search intent, brand expertise, and a realistic publishing plan—without promises of guaranteed rankings.",
    outcomes: ["Search-informed priorities", "A useful topic architecture", "Stronger internal linking", "A measurable editorial plan"],
    process: ["Research the audience and search landscape", "Map topics to services", "Plan useful content", "Measure and refine"]
  },
  {
    slug: "ai-training",
    title: "AI Training",
    short: "Help your team use AI confidently, safely, and usefully.",
    intro: "Hands-on training is shaped around your team’s actual tasks, tools, policies, and level of experience.",
    outcomes: ["Shared practical skills", "Safer AI habits", "Reusable prompt patterns", "Role-specific examples"],
    process: ["Assess current needs", "Design relevant exercises", "Run hands-on sessions", "Provide reference material"]
  }
];

export const principles = [
  ["Useful before impressive", "Technology should remove friction and support a clear business need."],
  ["Honest by default", "We do not sell AI as magic or promise outcomes we cannot control."],
  ["Built around people", "The best system is one your team understands and can keep using."],
  ["Improve with evidence", "We test, learn from real use, and refine the work deliberately."]
] as const;

export const faqs = [
  ["What kinds of businesses do you work with?", "We focus on SMEs, startups, agencies, consultants, service businesses, and growing teams—primarily in Kenya and East Africa."],
  ["Do we need to know which AI tools we want?", "No. We begin with the business problem and workflow, then recommend tools only where they are genuinely useful."],
  ["Can you automate our entire business?", "Usually, trying to automate everything at once creates more risk than value. We start with focused, repeatable workflows and expand based on evidence."],
  ["Do you guarantee SEO rankings or business results?", "No. Search rankings and commercial outcomes depend on factors no responsible provider can fully control. We commit to sound strategy, careful execution, and transparent measurement."],
  ["What is the best first step?", "A 30-minute discovery call is a useful place to start. We will discuss the problem, current workflow, and whether there is a sensible way to help."],
  ["Do you offer team training?", "Yes. Training can cover practical AI use, prompting, workflow design, content systems, and responsible usage tailored to your team."]
] as const;

// Blog posts now live as .mdx files in content/blog/ and are read via lib/blog.ts.
// (Previously this file held an `articles` metadata array.)
