import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { caseStudies } from "@/data/site";
import type {
  AtAGlanceItem,
  ContentBlock,
  CaseStudySection as CaseStudySectionData,
} from "@/data/site";
import { NotFound } from "@/components/not-found";
import { CaseFigure } from "@/components/case-figure";
import { PipelineDiagram } from "@/components/pipeline-diagram";

export const Route = createFileRoute("/case-studies/$slug/full")({
  loader: ({ params }) => {
    const caseStudy = caseStudies.find((cs) => cs.slug === params.slug);
    if (!caseStudy || caseStudy.hidden || !caseStudy.content) throw notFound();
    return caseStudy;
  },
  component: CaseStudyFull,
  notFoundComponent: () => (
    <NotFound message="That case study doesn't exist." />
  ),
});

function CaseStudyFull() {
  const caseStudy = Route.useLoaderData();
  const content = caseStudy.content;
  if (!content) return null;

  const sectionPlans = buildSectionPlans(content.sections);

  return (
    <article className="w-full">
      <Link
        to="/case-studies/$slug"
        params={{ slug: caseStudy.slug }}
        className="label-mono opacity-60 transition-opacity hover:opacity-100"
      >
        ← / BACK TO SNAPSHOT
      </Link>

      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="label-mono opacity-60">/ Full Case Study</p>
        <p className="label-mono opacity-60">
          {caseStudy.timeframe} · {caseStudy.org}
        </p>
      </div>

      <h1 className="mt-2 text-4xl leading-tight">{caseStudy.title}</h1>
      <p className="mt-4 max-w-xl text-xl leading-snug">{content.headline}</p>

      {content.intro && (
        <div className="mt-8 flex flex-col gap-4">
          {content.intro.map((paragraph) => (
            <p key={paragraph} className="leading-[1.6]">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {content.contextNote && (
        <div className="mt-8 border border-hairline p-6">
          <p className="label-mono mb-3 opacity-60">Context Note</p>
          <p className="leading-[1.6] opacity-80">{content.contextNote}</p>
        </div>
      )}

      {content.atAGlance && <AtAGlance items={content.atAGlance} />}

      {content.heroFigure?.srcs?.[0] && (
        <div className="mt-8">
          <CaseFigure
            src={content.heroFigure.srcs[0]}
            alt={content.heroFigure.label}
            caption={content.heroFigure.caption}
          />
        </div>
      )}

      <div className="mt-16 flex flex-col gap-16">
        {sectionPlans.map((plan) => (
          <CaseStudySection key={plan.heading} plan={plan} />
        ))}
      </div>

      <Link
        to="/case-studies/$slug"
        params={{ slug: caseStudy.slug }}
        className="label-mono mt-16 inline-block opacity-60 transition-opacity hover:opacity-100"
      >
        ← / BACK TO SNAPSHOT
      </Link>
    </article>
  );
}

function AtAGlance({ items }: { items: AtAGlanceItem[] }) {
  return (
    <dl className="mt-8 flex flex-col border-t border-hairline">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-2 border-b border-hairline py-4 sm:flex-row sm:gap-6"
        >
          <dt className="label-mono w-40 shrink-0 pt-0.5 opacity-60">
            {item.label}
          </dt>
          <dd>
            <p className="leading-[1.6]">{item.text}</p>
            {item.items && (
              <ul className="mt-2 flex flex-col gap-1 pl-4">
                {item.items.map((li) => (
                  <li key={li} className="list-disc leading-[1.6] opacity-80">
                    {li}
                  </li>
                ))}
              </ul>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

type FigureBlock = ContentBlock & { kind: "figure" };

/**
 * A text block paired with the single-image figure directly following it
 * (rendered side by side), or any other block rendered on its own.
 * figureIndex is the running figure number across the whole document,
 * precomputed here (pure, one pass) rather than mutated during render.
 */
type PlanUnit =
  | { kind: "solo"; block: ContentBlock; figureIndex?: number }
  | { kind: "pair"; text: ContentBlock; figure: FigureBlock; figureIndex: number };

type SectionPlan = { heading: string; units: PlanUnit[] };

function buildSectionPlans(sections: CaseStudySectionData[]): SectionPlan[] {
  let counter = 0;

  return sections.map((section) => {
    const blocks = section.blocks;
    const units: PlanUnit[] = [];
    let i = 0;

    while (i < blocks.length) {
      const block = blocks[i];
      const next = blocks[i + 1];
      const isTextBlock =
        block.kind === "p" || block.kind === "lead" || block.kind === "labeledP";

      if (
        isTextBlock &&
        next &&
        next.kind === "figure" &&
        next.srcs &&
        next.srcs.length === 1
      ) {
        counter += 1;
        units.push({ kind: "pair", text: block, figure: next, figureIndex: counter });
        i += 2;
        continue;
      }

      if (block.kind === "figure" && block.srcs && block.srcs.length === 1) {
        counter += 1;
        units.push({ kind: "solo", block, figureIndex: counter });
        i += 1;
        continue;
      }

      if (block.kind === "figure" && block.srcs && block.srcs.length > 1) {
        const startIndex = counter + 1;
        counter += block.srcs.length;
        units.push({ kind: "solo", block, figureIndex: startIndex });
        i += 1;
        continue;
      }

      units.push({ kind: "solo", block });
      i += 1;
    }

    return { heading: section.heading, units };
  });
}

function CaseStudySection({ plan }: { plan: SectionPlan }) {
  return (
    <section>
      <h2 className="border-b border-hairline pb-3 text-2xl leading-snug">
        {plan.heading}
      </h2>
      <div className="mt-6 flex flex-col gap-8">
        {plan.units.map((unit, i) =>
          unit.kind === "pair" ? (
            <PairedUnit
              key={i}
              text={unit.text}
              figure={unit.figure}
              figureIndex={unit.figureIndex}
            />
          ) : (
            <Block key={i} block={unit.block} figureIndex={unit.figureIndex} />
          ),
        )}
      </div>
    </section>
  );
}

function PairedUnit({
  text,
  figure,
  figureIndex,
}: {
  text: ContentBlock;
  figure: FigureBlock;
  figureIndex: number;
}) {
  const imageFirst = figureIndex % 2 === 0;
  const textEl = <Block block={text} />;
  const figureEl = (
    <CaseFigure
      src={figure.srcs![0]}
      alt={figure.label}
      caption={figure.caption}
      index={figureIndex}
    />
  );

  return (
    <div
      className={
        imageFirst
          ? "grid grid-cols-1 gap-8 md:grid-cols-[3fr_2fr] md:gap-12"
          : "grid grid-cols-1 gap-8 md:grid-cols-[2fr_3fr] md:gap-12"
      }
    >
      {imageFirst ? (
        <>
          {figureEl}
          {textEl}
        </>
      ) : (
        <>
          {textEl}
          {figureEl}
        </>
      )}
    </div>
  );
}

function Block({
  block,
  figureIndex,
}: {
  block: ContentBlock;
  figureIndex?: number;
}) {
  switch (block.kind) {
    case "p":
      return <p className="leading-[1.6]">{block.text}</p>;
    case "lead":
      return <p className="text-xl font-medium leading-snug">{block.text}</p>;
    case "labeledP":
      return (
        <p className="leading-[1.6]">
          <span className="font-medium">{block.lead}</span> {block.text}
        </p>
      );
    case "subheading":
      return <h3 className="text-lg font-medium">{block.text}</h3>;
    case "list":
      return (
        <ul className="flex flex-col gap-3 pl-5">
          {block.items.map((item) => (
            <li key={item.text} className="list-disc leading-[1.6]">
              {item.lead && <span className="font-medium">{item.lead} </span>}
              {item.text}
            </li>
          ))}
        </ul>
      );
    case "figure":
      return <FullFigure block={block} startIndex={figureIndex} />;
    case "pipelineDiagram":
      return <PipelineDiagram />;
  }
}

function FullFigure({
  block,
  startIndex,
}: {
  block: FigureBlock;
  startIndex?: number;
}) {
  const { label, caption, srcs, layout = "grid" } = block;

  if (!srcs || srcs.length === 0) {
    return (
      <div className="flex min-h-48 items-center justify-center border border-dashed border-hairline p-6">
        <span className="label-mono text-center opacity-40">
          [ IMAGE PLACEHOLDER: {label.toUpperCase()} ]
        </span>
      </div>
    );
  }

  if (srcs.length === 1) {
    return (
      <CaseFigure src={srcs[0]} alt={label} caption={caption} index={startIndex} />
    );
  }

  return (
    <figure>
      <div
        className={
          layout === "stack"
            ? "flex flex-col gap-3"
            : "grid grid-cols-1 gap-3 sm:grid-cols-2"
        }
      >
        {srcs.map((src, i) => (
          <CaseFigure
            key={src}
            src={src}
            alt={label}
            index={startIndex !== undefined ? startIndex + i : undefined}
          />
        ))}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm leading-[1.6] opacity-70">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
