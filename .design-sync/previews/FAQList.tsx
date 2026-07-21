import { FAQList } from "roble-media-lab-v2";

// The real FAQ pairs from content/site.ts.
const items = [
  [
    "What kinds of businesses do you work with?",
    "We focus on SMEs, startups, agencies, consultants, service businesses, and growing teams, primarily in Kenya and East Africa."
  ],
  [
    "Do we need to know which AI tools we want?",
    "No. We begin with the business problem and workflow, then recommend tools only where they are genuinely useful."
  ],
  [
    "Do you guarantee SEO rankings or business results?",
    "No. Search rankings and commercial outcomes depend on factors no responsible provider can fully control. We commit to sound strategy, careful execution, and transparent measurement."
  ],
  [
    "What is the best first step?",
    "A 30-minute discovery call is a useful place to start. We will discuss the problem, current workflow, and whether there is a sensible way to help."
  ]
] as const;

export const Default = () => (
  <div style={{ padding: 32 }}>
    <FAQList items={items} />
  </div>
);

// headingLevel=3 is for pages where the FAQ sits under an existing h2 section.
export const NestedHeadings = () => (
  <div style={{ padding: 32 }}>
    <FAQList items={items.slice(0, 2)} headingLevel={3} />
  </div>
);
