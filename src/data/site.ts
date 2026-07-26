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
  | {
      kind: "figure";
      label: string;
      caption?: string;
      srcs?: string[];
      layout?: "grid" | "stack";
    };

export type AtAGlanceItem = { label: string; text: string; items?: string[] };

export type CaseStudySection = {
  heading: string;
  blocks: ContentBlock[];
};

export type CaseStudyContent = {
  headline: string;
  intro?: string[];
  contextNote?: string;
  atAGlance?: AtAGlanceItem[];
  heroFigure?: { label: string; caption?: string; srcs?: string[] };
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
  /** Hidden from the case-studies list and unreachable by direct URL while true. */
  hidden?: boolean;
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
          text: "A content system in three parts: a registry of content types and the structural primitives that arrange them, the platform-wide behavioral rules every agent inherits, and a generator that turns a product spec into a reviewable output spec engineering can build from.",
        },
        {
          label: "How I Proved It",
          text: "A blind run: a fresh model, no history, given only the system and a new agent's PRD, produced a conforming output spec and surfaced edge cases that were brought into the platform rules.",
        },
      ],
      heroFigure: {
        label: "Layer Matrix",
        caption:
          "The Missing Layer, owned by content architecture.",
        srcs: ["/images/case-studies/layer-matrix.png"],
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
              lead: "The system turns the PRD into an output spec engineering builds from.",
              text: "It reads a simplified PRD against the registry and the rules, then produces a designer-reviewable output spec: the sections, the content types, the edge cases, and the calls it couldn't make from the inputs alone, flagged for a human. Engineering then builds from that. The structure, fallbacks, and uncertainty rules are settled in design before anyone writes rendering code, instead of improvised in the prompt.",
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
    outcome:
      "18% upgrades against a 10% goal; map delivery cut from 22 days to 5 across 208 marinas.",
    role: "Product Design Manager",
    timeframe: "2022–2023",
    content: {
      headline:
        "An interactive digital marina map that replaced the daily paper binder, and became Dockwa's most successful feature.",
      sections: [
        {
          heading: "At a glance",
          blocks: [
            {
              kind: "lead",
              text: "208 marinas, 260+ maps published, 18% upgrades against a 10% goal, map delivery cut from 22 days to 5.",
            },
            {
              kind: "p",
              text: "Dockwa is a marina management platform, finding efficiencies for marina operators and improving the experience for boaters on the water. Marina Map layered Dockwa's existing reservation data onto a live, interactive picture of the marina, so dockmasters could stop running operations off a hand-edited binder.",
            },
            {
              kind: "labeledP",
              lead: "Team.",
              text: "I led design as Product Design Manager, working with a second product designer, a PM, four engineers and a tech lead, and an external agency. Stakeholders ran up to the CEO, GTM leadership, and the VPs of Product and Engineering.",
            },
            {
              kind: "figure",
              label: "Active Paper Marina Map",
              srcs: ["/images/case-studies/marina-map-whiteboard.png"],
            },
          ],
        },
        {
          heading: "Problem",
          blocks: [
            {
              kind: "lead",
              text: "Marinas were running daily operations off a paper binder, by hand, with no history and no way to maximize occupancy.",
            },
            {
              kind: "p",
              text: "Marinas use a marina map to see which slips are open and manage the day to day. The industry standard is physical: a large in-office whiteboard, or more often a binder with the map printed for each day of the year, filled in and edited by hand every morning. It's slow, it's error-prone, and it makes true occupancy maximization impossible.",
            },
          ],
        },
        {
          heading: "Goals",
          blocks: [
            {
              kind: "lead",
              text: "Move marinas off paper, and prove the feature was worth paying for.",
            },
            {
              kind: "p",
              text: "Three things we wanted to move: increase nights booked in Dockwa, the company's North Star (customers were managing some reservations by hand instead of importing them). Drive upgrades and purchases, since this was a paid add-on. And cut the time dockmasters spent maintaining the map, which averaged around two hours a day.",
            },
          ],
        },
        {
          heading: "Discovery",
          blocks: [
            {
              kind: "lead",
              text: "Ten marinas, chosen for complexity, told us what the map actually had to do.",
            },
            {
              kind: "p",
              text: "We deliberately screened for range and difficulty: small to large (from under 50 slips to over 200), across New England, Florida, and California, marinas holding both long-term contracts and transient reservations, and multiple storage types (slips, dry stack, moorings). Ten interviews later, the pattern was clear:",
            },
            {
              kind: "p",
              text: "Every marina had its own dense system of detail and color coding: boat type, daily arrivals and departures, unpaid balances. Boat length and depth, slip size, and power pedestal locations were universal. Dockmasters were spending an hour before and after every shift correcting the map and copying reservations over from the digital system by hand. Because edits erased the old state, there was no history of changes or cancellations. And the person holding the binder kept becoming the bottleneck for the whole operation. What marinas wanted from the map, in order: maximize dock usage first, improve operations and service second.",
            },
          ],
        },
        {
          heading: "Solution",
          blocks: [
            {
              kind: "lead",
              text: "An interactive picture of the marina, with Dockwa's live reservation data layered on top.",
            },
            {
              kind: "p",
              text: "Layering the existing reservation and assignment data onto a new view turned out to be quick. The hard part (the real design problem) was automating map creation and teaching the reservation data where to sit on the map. Working with engineering and my PM, and after two Crazy 8 sessions with the pod, three pieces emerged:",
            },
            {
              kind: "labeledP",
              lead: "Map creation.",
              text: "In-house designers built standardized marina maps in Figma from the customer's existing map and Google satellite imagery, using a component library of stylized dock elements and auto-layout, then exported them as SVGs.",
            },
            {
              kind: "labeledP",
              lead: "Annotation.",
              text: "A CSM imported the SVG into a new Settings page and dragged the marina's defined slips onto the image in the right spots.",
            },
            {
              kind: "labeledP",
              lead: "Customer-facing map view.",
              text: "Once the CSM published, the customer got a new interactive map inside their Assignments tool.",
            },
            {
              kind: "figure",
              label: "Annotation: Yellow-Box Placeholders Becoming Slips",
              srcs: ["/images/case-studies/marina-map-annotation.webp"],
            },
            {
              kind: "figure",
              label: "Customer-Facing List View vs. New Map View",
              srcs: [
                "/images/case-studies/marina-map-list-view.webp",
                "/images/case-studies/marina-map-new-map-view.webp",
              ],
            },
          ],
        },
        {
          heading: "Iterations",
          blocks: [
            {
              kind: "lead",
              text: "Real usage broke the annotation step, so I automated it.",
            },
            {
              kind: "p",
              text: "For the MVP we stripped it back, cutting self-service to ship. Two things surfaced fast. Marinas wouldn't adopt the map without their own color coding, so we added up to eight custom codes that applied automatically to each slip. And annotation time climbed from four days to sixteen as requests and marina sizes grew: the more slips, the longer it took.",
            },
            {
              kind: "p",
              text: "That's the piece I'm proudest of. Instead of having CSMs create and place every slip by hand, I used Figma auto-layout to drop a bright yellow box everywhere a slip should go during map creation. On upload, the tool recognized each yellow box and swapped it for a real boat slip, so the CSM only had to match each slip to its name, not build and position it. Annotation time dropped sharply.",
            },
            {
              kind: "p",
              text: "Beyond docks, marinas kept asking for other layouts (dry stack, parking-lot storage, mooring fields), which we kept iterating on.",
            },
          ],
        },
        {
          heading: "Results",
          blocks: [
            {
              kind: "lead",
              text: "As of November 2023, Marina Map was the most successful feature at Dockwa.",
            },
            {
              kind: "p",
              text: "We rolled it out to 208 marinas with over 260 maps published, and it beat every target we set.",
            },
            {
              kind: "p",
              text: "Upgrades and purchases came in over 18% against a 10% goal: paying customers who upgraded their tier or bought Dockwa because of Marina Map. On time savings, more than 55 marinas dropped their physical maps entirely, saving those users over ten hours a week. Nights booked rose too; we couldn't tie the increase directly to the map, but Dockwa saw a marked lift as marinas moved onto the feature.",
            },
            {
              kind: "p",
              text: "And the process itself got dramatically faster. Over eight months I cut the “in design” phase of map creation from 22 days to 5 (a 77% reduction) through the annotation automation, streamlined data collection from marinas, and the Figma component system, which got the tool into customers' hands far sooner.",
            },
          ],
        },
        {
          heading: "What's next",
          blocks: [
            {
              kind: "p",
              text: "Self-service map creation is the next step, putting map building fully in the customer's hands, editable end to end, with Dockwa's other tools integrated into the map view. It's designed; it's waiting on resourcing.",
            },
            {
              kind: "figure",
              label: "Self-Service Map Builder",
              caption:
                "The self-service flow: set location, add docks, configure slips, then place power and fuel, all without a CSM.",
              layout: "stack",
              srcs: [
                "/images/case-studies/marina-map-selfservice-location.webp",
                "/images/case-studies/marina-map-selfservice-docks.webp",
                "/images/case-studies/marina-map-selfservice-dockbuilder.webp",
                "/images/case-studies/marina-map-selfservice-power.webp",
                "/images/case-studies/marina-map-selfservice-fuel.webp",
              ],
            },
          ],
        },
      ],
    },
  },
  {
    slug: "design-practice-from-zero",
    title: "Design Practice from Zero",
    org: "Vendr",
    outcome: "Built the design practice from zero through a $60M raise.",
    role: "Lead Product Designer",
    timeframe: "2020–2022",
    content: null,
    hidden: true,
  },
  {
    slug: "databebe",
    title: "databébé",
    org: "Independent",
    outcome: "Live B2C data-sync product, built solo, full stack.",
    role: "Founder",
    timeframe: "2026–PRESENT",
    content: null,
    hidden: true,
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
    description:
      "Live B2C data-sync product, designed and built solo, full stack.",
  },
  {
    org: "Margo Louise LLC",
    role: "Principal",
    timeframe: "2024–PRESENT",
    description:
      "Product design and AI output systems for early-stage and AI-native SaaS teams. I design their products and build the systems that keep what their AI generates consistent and trustworthy across every surface.",
  },
  {
    org: "Agent.ai",
    role: "Lead Product Designer, Agentic AI",
    timeframe: "2025–2026",
    description:
      "AI output system: governs what generated content contains and how it's structured, so the same content maps to the same structure on every agent, with consistent handling of low confidence, stale data, and errors across 24 agents.",
  },
  {
    org: "The Wanderlust Group",
    role: "Product Design Manager",
    timeframe: "2022–2023",
    description:
      "Led design on Marina Map, which drove 18% upgrades against a 10% goal and cut map delivery from 22 days to 5, a 77% reduction.",
  },
  {
    org: "Vendr",
    role: "Lead Product Designer",
    timeframe: "2020–2022",
    description:
      "First designer at a B2B procurement platform. Built the design practice from zero during a $60M raise.",
  },
  {
    org: "HubSpot",
    role: "Product Designer",
    timeframe: "2015–2018",
    description: "Core product design across the Developer, CRM, Social, and Import teams.",
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
