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
  | { kind: "lead"; text: string }
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
      "One content system governing what 24 live agents show, how they mark uncertainty, and how they handle thin data",
    role: "Lead Product Designer, Agentic AI",
    timeframe: "2025–2026",
    content: {
      headline:
        "Governing what two dozen AI agents say, not just how they look",
      intro: [
        "When Agent.ai grew to 24 live premium agents, the interface stayed relatively consistent because every team pulled from the same design system. But the content inside those components drifted. One agent showed confidence as a percentage, another as a badge, a third left uncertainty off the output entirely. The visual layer had a clear owner. The layer underneath (what an output contains, how it marks a guess, what it does when data is thin) had none, so it fell to whichever engineer was shipping that agent's prompt.",
      ],
      contextNote:
        'Visuals throughout use a fictional fintech surface, "Aria," as a faithful reconstruction. The original Agent.ai artifacts became HubSpot IP after the 2026 acquisition. The system itself governed 24 live premium agents and was validated by blind test.',
      atAGlance: [
        {
          label: "Role",
          text: "Lead Product Designer at Agent.ai. I scoped, built, and validated the content system across the platform.",
        },
        {
          label: "Scope",
          text: "24 live premium agents.",
        },
        {
          label: "The Problem",
          text: "Visual consistency was high, but output content drifted across every agent. No one owned the layer that governs it, so engineers were making product decisions in code while trying to ship.",
        },
        {
          label: "What I Built",
          text: "A content system in three parts: a registry of content types and the structural primitives that present them, platform-wide behavioral rules every agent inherits, and a generator that turns a product spec into a reviewable output spec engineering can build from.",
        },
        {
          label: "How I Proved It",
          text: "A blind run: a fresh model, no history, given only the system and a new agent's PRD, produced a conforming output spec and surfaced edge cases that were brought into the platform rules.",
        },
      ],
      heroFigure: {
        label: "Layer Matrix",
        caption:
          "The three layers of an AI output: visual, content, and reasoning. The middle one had no owner. That's the work.",
      },
      sections: [
        {
          heading: "Problem",
          blocks: [
            {
              kind: "lead",
              text: "Teams were losing weeks to inconsistent outputs, and because no one owned the content layer, engineers were solving design problems in code while shipping prompts.",
            },
            {
              kind: "p",
              text: "The engineers were doing real work building multi-agent flows, but the specs they got stopped at business goals and mockups. When a payload came back with a missing field, an odd array length, or an ambiguous label, they had to decide on the spot how to render it: what to show, how to mark it, whether to hide the section or flag it. It wasn't a prompt problem or a styling problem. The platform had no content architecture, so edge cases got answered ad hoc in the backend instead of on purpose in design.",
            },
            {
              kind: "figure",
              label: "Agent Output Drift",
              caption:
                "Same data, three agents (prose, invented markup, a dense table), then the same three under one system.",
            },
          ],
        },
        {
          heading: "Design decisions: building the missing layer",
          blocks: [
            {
              kind: "lead",
              text: "Prompt engineering and design tokens each governed a layer; neither governed what the output contained, so I built the layer between them: a content system in three parts.",
            },
            {
              kind: "labeledP",
              lead: "A central registry of content types.",
              text: "The shared dictionary every agent draws from. Its main job is to settle how each kind of content is presented: a given kind of content maps to a specified type and the structural primitive that presents it, the same way every time, so a confidence score isn't a percentage on one agent and a badge on another, and the model can't invent a new shape or reach for the wrong one. Each type also defines its required pieces, its optional metadata, and what it falls back to when data is missing: if a primary metric isn't there, the output falls back to a less precise value rather than shipping an empty string.",
            },
            {
              kind: "figure",
              label: "Inference Marker",
              caption:
                "Facts stay plain; only the model's own judgment is marked as inferred.",
            },
            {
              kind: "labeledP",
              lead: "Behavioral rules every agent inherits.",
              text: "Uncertainty handling, null states, and copy limits live in one platform-wide rule set instead of being re-specified per agent. Every output marks inference the same way, every empty state explains itself the same way, every predictive figure carries its confidence the same way. A new agent starts compliant instead of starting from scratch.",
            },
            {
              kind: "figure",
              label: "Null-States Triptych",
              caption: "One missing field, three correct behaviors: omit, explain, or flag.",
            },
            {
              kind: "labeledP",
              lead: "A generator that turns a spec into a reviewable output spec.",
              text: "It reads a simplified PRD against the registry and the rules, then produces a designer-reviewable output spec: the sections, the content types, the edge cases, and the calls it couldn't make from the inputs alone, flagged for a human. Engineering builds from that: structure, fallbacks, and uncertainty rules are settled in design before anyone writes rendering code, instead of improvised in the prompt.",
            },
            {
              kind: "figure",
              label: "Pipeline Diagram",
              caption:
                "A product spec compiles against the system into a reviewable output spec engineering builds from.",
            },
          ],
        },
        {
          heading: "What didn't work",
          blocks: [
            {
              kind: "lead",
              text: "The first versions didn't stop drift, and each failure taught the rule that fixed it.",
            },
            {
              kind: "labeledP",
              lead: "The taxonomy was too granular.",
              text: "I'd made separate types for a person, a contact, and a user profile (nearly the same structure three times), and the redundancy confused the model during generation more than it helped. I consolidated them into a single Person type with optional flags and wrote a rule against duplicate types.",
            },
            {
              kind: "labeledP",
              lead: "The input specs were too long.",
              text: "I'd assumed more background would produce a better output spec, but the extra prose added noise and pushed the model to invent structures that weren't there. Stripping the input to essentials (goals, inputs, and edge-case boundaries) produced cleaner specs. The system reasons better from goals than from prescriptions, so the input got simpler, not richer.",
            },
            {
              kind: "labeledP",
              lead: "The validation was too soft.",
              text: "I was reviewing the pilot runs myself, and because I already knew what each output should look like, I kept reading right past edge cases that were only half-defined. It wasn't until I handed the system to a model with no context that those gaps actually showed up.",
            },
            {
              kind: "figure",
              label: "Spec Before/After",
              caption:
                "The over-done early spec vs. the stripped-down version that produced cleaner output.",
            },
          ],
        },
        {
          heading: "Validation: proving it holds without me",
          blocks: [
            {
              kind: "lead",
              text: "The real test isn't whether the system works when I run it: it's whether it holds when someone else does, without me in the loop.",
            },
            {
              kind: "p",
              text: "I ran a blind test: a fresh model, no prior context, given only the core system and a minimal PRD for a new agent. It produced a production-ready output spec that mapped every content type, applied the null rules, and marked uncertainty correctly. Better than the pass itself: the blind run surfaced edge cases my own audit had missed, which I brought back into the global rules. The system compounds: every spec it generates makes the next one better.",
            },
            {
              kind: "figure",
              label: "Blind-Run Comparison",
              caption:
                "A fresh model, given only the system and a new spec, produced a conforming output spec with no steering.",
            },
          ],
        },
        {
          heading: "What's next: self-serve governance",
          blocks: [
            {
              kind: "lead",
              text: "Content systems usually die when their builder leaves, so I packaged this one to outlast me.",
            },
            {
              kind: "p",
              text: "Teams can maintain their own agent content specs from the registry, the inherited rules, and the generator, without me in the loop. That kit is now the core of my consulting practice, where I help product organizations build the same output governance for their own AI features. Since it runs on documented types, inherited rules, and the generator rather than my personal review, teams keep shipping consistent specs long after the engagement ends.",
            },
            {
              kind: "figure",
              label: "Self-Serve Toolkit",
              caption:
                "Teams generate and maintain their own specs from the kit. No dependency on me.",
            },
            {
              kind: "subheading",
              text: "The V2 vision: from documented specs to enforcement",
            },
            {
              kind: "labeledP",
              lead: "V1, shipped.",
              text: "A human-reviewed output spec that engineering still translates into schemas and components by hand.",
            },
            {
              kind: "labeledP",
              lead: "V2, designed but not yet built.",
              text: "The output spec becomes the source of truth. Edit a brief and it propagates: the system prompt re-compiles with version control, the API validates payloads against generated typed schemas, and validated data maps into the frontend components. No per-feature parsers. It's the move from documenting the right output to enforcing it, where an output that doesn't match the spec can't render. The design is fully specified; building the compiler is the next phase.",
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
