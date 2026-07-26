export const person = {
  name: "Margo Sultenfuss",
  role: "Product & Systems Designer",
};

export const about = {
  paragraphs: [
    "I notice the system that's missing and go build it. With AI those systems got bigger and way more fun. Previously at HubSpot, Vendr, Agent.ai.",
    "Off hours: planting dahlia's online estate sales and vampire novels.",
  ],
  firstSentence: "I notice the system that's missing and go build it.",
};

export const metadata: Array<{ label: string; value: string }> = [
  { label: "Experience", value: "11+ years in product design" },
  { label: "Education", value: "MS Strategic Design & Management, Parsons" },
  { label: "Focus", value: "AI-native systems, 0 - 1 product" },
  { label: "Tools", value: "Figma, Claude Code, Cursor, GitHub, Lovable" },
];

export type CaseStudy = {
  slug: string;
  title: string;
  org: string;
  outcome: string;
  role: string;
  timeframe: string;
  /** Full case-study write-up. Fill in later — detail page shows a [DRAFT] placeholder while null. */
  body: string | null;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "generative-ui-content-schema",
    title: "Generative UI Content Schema",
    org: "Agent.ai",
    outcome:
      "Validated a shared confidence, staleness, and error contract across 30+ products",
    role: "Lead Product Designer, Agentic AI",
    timeframe: "2025–2026",
    body: null,
  },
  {
    slug: "marina-map",
    title: "Marina Map",
    org: "The Wanderlust Group",
    outcome: "Drove 18% of all 2023 upgrades; cut build time 78% (22 days to 5)",
    role: "Product Design Manager",
    timeframe: "2022–2023",
    body: null,
  },
  {
    slug: "design-practice-from-zero",
    title: "Design Practice from Zero",
    org: "Vendr",
    outcome: "Built the design practice from zero through a $60M raise",
    role: "Lead Product Designer",
    timeframe: "2020–2022",
    body: null,
  },
  {
    slug: "databebe",
    title: "Databébé",
    org: "Independent",
    outcome: "Live B2C data-sync product, built solo, full stack, zero ad spend",
    role: "Founder",
    timeframe: "2026–PRESENT",
    body: null,
  },
];

export type WorkHistoryItem = {
  org: string;
  role: string;
  timeframe: string;
  description: string;
};

export const workHistory: WorkHistoryItem[] = [
  {
    org: "Databébé",
    role: "Founder",
    timeframe: "2026–PRESENT",
    description: "B2C data-sync product, built solo, full stack, zero ad spend.",
  },
  {
    org: "Margo Louise LLC",
    role: "Principal",
    timeframe: "2024–PRESENT",
    description: "Audit-first systems design for early-stage SaaS teams.",
  },
  {
    org: "Agent.ai",
    role: "Lead Product Designer, Agentic AI",
    timeframe: "2025–2026",
    description:
      "AI Output Design System: governs how generated content behaves under low confidence, stale data, and error states across 30+ products.",
  },
  {
    org: "The Wanderlust Group",
    role: "Product Design Manager",
    timeframe: "2022–2023",
    description:
      "Marina Map drove 18% of all 2023 upgrades; cut build time 78% (22 days to 5).",
  },
  {
    org: "Vendr",
    role: "Lead Product Designer",
    timeframe: "2020–2022",
    description:
      "First designer at a B2B procurement platform; built the practice from zero during a $60M raise.",
  },
  {
    org: "HubSpot",
    role: "Product Designer",
    timeframe: "2015–2018",
    description:
      "Core work across Developer, CRM, Social, and Import teams; opted into part-time design-systems work alongside it.",
  },
];

export const findMe: Array<{ label: string; href: string }> = [
  {
    label: "margo.sultenfuss@gmail.com",
    href: "mailto:margo.sultenfuss@gmail.com",
  },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/margosultenfuss/" },
  { label: "GitHub", href: "https://github.com/margos977" },
];

export const status = "Taking clients · Boston, MA";

export const indexNav: Array<{ label: string; href: string }> = [
  { label: "About", href: "#about" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Timeline", href: "#timeline" },
];
