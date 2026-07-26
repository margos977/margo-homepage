export const person = {
  name: "Margo Sultenfuss",
  role: "Product & Systems Designer",
};

export const about = {
  paragraphs: [
    "I notice the system that's missing and go build it. With AI those systems got bigger and way more fun. Previously at HubSpot, Vendr, Agent.ai.",
    "Off hours: planting dahlias in my little garden, online estate sales, and vampire novels.",
  ],
  firstSentence: "I notice the system that's missing and go build it.",
};

export const metadata: Array<{ label: string; value: string }> = [
  { label: "Experience", value: "11+ years in product design" },
  { label: "Education", value: "MS Strategic Design & Management, Parsons" },
  { label: "Focus", value: "AI-native systems, 0 - 1 product" },
  { label: "Tools", value: "Figma, Claude Code, Cursor, GitHub, Lovable" },
];

export type ListItem = { lead?: string; text: string };

export type ContentBlock =
  | { kind: "p"; text: string }
  | { kind: "labeledP"; lead: string; text: string }
  | { kind: "list"; items: ListItem[] }
  | { kind: "subheading"; text: string }
  | { kind: "figure"; label: string; caption: string };

export type AtAGlanceItem = { label: string; text: string; items?: string[] };

export type CaseStudySection = {
  heading: string;
  blocks: ContentBlock[];
};

export type CaseStudyContent = {
  headline: string;
  intro: string[];
  contextNote: string;
  atAGlance: AtAGlanceItem[];
  heroFigure: { label: string; caption: string };
  sections: CaseStudySection[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  org: string;
  outcome: string;
  role: string;
  timeframe: string;
  /** Full case-study write-up. Fill in later — detail page shows a [DRAFT] placeholder while null. */
  content: CaseStudyContent | null;
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
    content: {
      headline:
        "Governing what two dozen AI agents say, not just how they look",
      intro: [
        "When Agent.ai grew to 24 live premium agents, the interface stayed visually consistent because every team pulled from the same React design system. But the content inside those components drifted completely.",
        "One agent displayed confidence as a percentage, another as a qualitative badge, and a third omitted uncertainty altogether. The visual layer had a clear owner, but the structural layer underneath (what an output contains, how it marks a guess, and how it handles thin data) had none. That decision fell to whichever engineer was shipping that agent's prompt.",
      ],
      contextNote:
        'Visuals throughout this case study use a fictional fintech surface named "Aria" as a faithful reconstruction. Original Agent.ai artifacts became HubSpot IP following our acquisition. The underlying system governed 24 live production agents and was validated through blind testing.',
      atAGlance: [
        {
          label: "Role",
          text: "Product Designer / Systems Architect at Agent.ai. Scoped, authored, and validated the platform content architecture.",
        },
        {
          label: "Scope",
          text: "24 live premium AI agents across a unified product platform.",
        },
        {
          label: "The Problem",
          text: "High visual consistency, severe output content drift. Without a content architecture layer, engineers were forced to make product design decisions in code while shipping prompts.",
        },
        {
          label: "What I Built",
          text: "A 3-part content governance system:",
          items: [
            "A Central Registry of content entities and structural primitives.",
            "Platform-Wide Behavioral Rules inherited across all agent outputs.",
            "A Spec Generator that compiles product specs into reviewable output specs.",
          ],
        },
        {
          label: "How I Proved It",
          text: "A blind validation run using an isolated model with zero context, supplied only with the core system and a bare-bones feature PRD.",
        },
      ],
      heroFigure: {
        label: "Layer Matrix",
        caption:
          "Mapping the 3 layers of an AI output: Prompt/Reasoning (Engineers) → Content Architecture (System Owner) → Visual Tokens (Design System). The middle layer had no owner: that was the work.",
      },
      sections: [
        {
          heading: "The Problem: Design Decisions Hidden in Code",
          blocks: [
            {
              kind: "p",
              text: "Engineering teams were spending weeks wrestling with inconsistent agent outputs across multi-agent workflows. But the specs they received stopped at high-level business goals and visual mockups.",
            },
            {
              kind: "p",
              text: "When a live LLM payload returned a missing field, an unexpected array length, or an ambiguous label, backend engineers had to make UI and content calls on the fly. It wasn't a prompt tuning problem or a CSS issue: the platform lacked a content architecture, forcing edge cases to be solved ad hoc in backend code rather than intentionally in design.",
            },
            {
              kind: "figure",
              label: "Agent Output Drift",
              caption:
                "Before & After: The same underlying payload rendered by three different agents (prose, invented markup, and a dense table) versus all three governed by one unified content system.",
            },
          ],
        },
        {
          heading: "Design Decisions: Building the Missing Layer",
          blocks: [
            {
              kind: "p",
              text: "Prompt engineering governs backend reasoning; design tokens govern visual styling. Neither governs structural content. I designed the architecture between them: a content system built in three parts.",
            },
            { kind: "subheading", text: "1. A Central Registry of Content Types" },
            {
              kind: "p",
              text: "The shared dictionary every agent draws from. It settles how each piece of information is structured: a given content type maps directly to a specified structural primitive, every single time.",
            },
            {
              kind: "list",
              items: [
                {
                  text: "A confidence score is never a percentage on one agent and a badge on another.",
                },
                {
                  text: "The model cannot invent new layout shapes or reach for unvetted components.",
                },
                {
                  text: "Each entity defines required fields, optional metadata, and explicit null fallbacks (for example, if a primary metric is missing, the system gracefully falls back to a qualitative summary rather than rendering an empty card).",
                },
              ],
            },
            {
              kind: "figure",
              label: "Inference Marker Primitive",
              caption:
                "Facts stay plain; only the model's generated judgment carries an explicit visual inference token.",
            },
            { kind: "subheading", text: "2. Inherited Platform Behavioral Rules" },
            {
              kind: "p",
              text: "Uncertainty handling, null states, elastic section folding, and copy length caps live in a single platform-wide rule set. Every agent inherits these rules by default:",
            },
            {
              kind: "list",
              items: [
                {
                  lead: "Inference:",
                  text: "Every output marks model-generated assumptions identically.",
                },
                {
                  lead: "Null States:",
                  text: "Every empty state explains itself or collapses cleanly without breaking DOM layout trees.",
                },
                {
                  lead: "Confidence:",
                  text: "Every predictive figure carries certainty metrics using standard thresholds.",
                },
              ],
            },
            {
              kind: "p",
              text: "A new agent starts completely compliant rather than starting from scratch.",
            },
            {
              kind: "figure",
              label: "Null-State Triptych",
              caption:
                "One missing payload field, three deterministic behaviors: omit section, explain missing context, or flag for review.",
            },
            {
              kind: "subheading",
              text: "3. A Spec Generator for Design-Engineering Handoff",
            },
            {
              kind: "p",
              text: "To bridge product intent and code execution, I designed a generator workflow. It evaluates a simplified PRD against the Central Registry and inherited rules, then compiles a designer-reviewable output spec.",
            },
            {
              kind: "p",
              text: "It maps required content entities, identifies edge cases, and flags ambiguous calls for human review. Engineering builds from this spec: structural schemas, fallbacks, and content limits are settled in design before writing rendering logic.",
            },
            {
              kind: "figure",
              label: "Pipeline Diagram",
              caption:
                "A product PRD compiles against the Content System into an output spec that engineering builds from.",
            },
          ],
        },
        {
          heading: "What Didn't Work: Iteration & Edge-Case Discovery",
          blocks: [
            {
              kind: "p",
              text: "Early iterations failed to stop agent drift, and each failure revealed a critical constraint:",
            },
            {
              kind: "list",
              items: [
                {
                  lead: "Taxonomy was too granular:",
                  text: "I initially created separate types for PersonCard, ContactCard, and UserProfile. The redundant overlapping schemas confused the model during generation. I consolidated them into a single core Person entity with optional metadata flags and established a strict rule against duplicate entities.",
                },
                {
                  lead: "Input specs were too long:",
                  text: "I originally assumed giving the generator extensive background prose would improve output quality. Instead, excess text introduced noise, causing the model to invent unnecessary structures. Stripping input specs down to essential goals, inputs, and edge-case boundaries produced significantly cleaner outputs.",
                },
                {
                  lead: "Validation was initially too soft:",
                  text: "Reviewing early pilot runs myself created a bias because I already knew what the output should look like, making it easy to miss subtle edge-case gaps. Real validation required removing human hand-holding entirely.",
                },
              ],
            },
            {
              kind: "figure",
              label: "Spec Simplification Before/After",
              caption:
                "Comparing an over-engineered 5-page input brief against the stripped-down, goal-based PRD that yielded higher schema compliance.",
            },
          ],
        },
        {
          heading: "Validation: Proving Resilience via Isolated Blind Testing",
          blocks: [
            {
              kind: "p",
              text: "A system's resilience isn't proven when its author operates it: it's proven when an isolated model executes it without human intervention.",
            },
            {
              kind: "p",
              text: "To validate the architecture, I ran a blind test: I supplied a fresh model (zero conversation history) with only the core system files and a bare-bones feature PRD for an unreleased agent.",
            },
            {
              kind: "labeledP",
              lead: "Results:",
              text: "The model correctly mapped all entities, applied global null rules, and structured uncertainty markers accurately on the first pass.",
            },
            {
              kind: "labeledP",
              lead: "Edge-Case Discovery:",
              text: "The blind run surfaced two unhandled edge cases in array truncation. Instead of patching them in code, I promoted those rules back into the global registry library, making every future agent stronger.",
            },
            {
              kind: "figure",
              label: "Blind Validation Audit Log",
              caption:
                "Side-by-side comparison of the model's generated output spec against target production standards during the blind run.",
            },
          ],
        },
        {
          heading: "What's Next: Self-Serve Governance & The V2 Vision",
          blocks: [
            {
              kind: "p",
              text: "Content systems often decay after the founding designer leaves. To ensure longevity, I packaged this system into a self-serve toolkit that enables product teams to generate, review, and maintain their own agent content briefs independently.",
            },
            {
              kind: "p",
              text: "This architecture now forms the foundation of my systems design practice, helping product organizations establish structural output governance for generative AI features.",
            },
            {
              kind: "figure",
              label: "Self-Serve Toolkit Overview",
              caption:
                "Overview of the self-serve content governance kit, showing the generator workflow and reusable entity library.",
            },
            {
              kind: "subheading",
              text: "The V2 Vision: From Documented Specs to Automated Enforcement",
            },
            {
              kind: "labeledP",
              lead: "V1 Delivered:",
              text: "A human-reviewed, structured spec that engineers translate into backend schemas and frontend components.",
            },
            {
              kind: "labeledP",
              lead: "V2 Pipeline:",
              text: "The output spec becomes the automated source of truth. Editing a feature brief automatically compiles and syncs across three layers:",
            },
            {
              kind: "list",
              items: [
                {
                  lead: "System Prompts:",
                  text: "Re-compiles system prompt instructions with git-backed version control.",
                },
                {
                  lead: "API Contracts:",
                  text: "Generates Pydantic models that validate LLM payloads at the API layer, blocking malformed data before it reaches client code.",
                },
                {
                  lead: "UI Bindings:",
                  text: "Maps validated payloads directly into React design system component props without custom JSON parsers.",
                },
              ],
            },
            {
              kind: "labeledP",
              lead: "Bottom Line:",
              text: "The goal isn't just documenting rules: it's building an architecture where an invalid AI output is structurally impossible to render.",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "marina-map",
    title: "Marina Map",
    org: "The Wanderlust Group",
    outcome: "Drove 18% of all 2023 upgrades; cut build time 78% (22 days to 5)",
    role: "Product Design Manager",
    timeframe: "2022–2023",
    content: null,
  },
  {
    slug: "design-practice-from-zero",
    title: "Design Practice from Zero",
    org: "Vendr",
    outcome: "Built the design practice from zero through a $60M raise",
    role: "Lead Product Designer",
    timeframe: "2020–2022",
    content: null,
  },
  {
    slug: "databebe",
    title: "Databébé",
    org: "Independent",
    outcome: "Live B2C data-sync product, built solo, full stack, zero ad spend",
    role: "Founder",
    timeframe: "2026–PRESENT",
    content: null,
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
