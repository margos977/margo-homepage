import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { caseStudies } from "@/data/site";
import type {
  AtAGlanceItem,
  CaseStudy,
  ContentBlock,
  CaseStudySection as CaseStudySectionData,
} from "@/data/site";
import { NotFound } from "@/components/not-found";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const caseStudy = caseStudies.find((cs) => cs.slug === params.slug);
    if (!caseStudy) throw notFound();
    return caseStudy;
  },
  component: CaseStudyDetail,
  notFoundComponent: () => (
    <NotFound message="That case study doesn't exist." />
  ),
});

function CaseStudyDetail() {
  const caseStudy = Route.useLoaderData();

  return (
    <article className="max-w-2xl">
      <Link
        to="/"
        hash="case-studies"
        hashScrollIntoView={{ behavior: "smooth" }}
        className="label-mono opacity-60 transition-opacity hover:opacity-100"
      >
        ← / CASE STUDIES
      </Link>

      <h1 className="mt-6 text-4xl leading-tight">{caseStudy.title}</h1>
      <p className="label-mono mt-2 opacity-60">{caseStudy.org}</p>

      {caseStudy.content ? (
        <CaseStudyBody caseStudy={caseStudy} />
      ) : (
        <DraftBody caseStudy={caseStudy} />
      )}
    </article>
  );
}

function DraftBody({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <>
      <p className="mt-4 max-w-xl leading-[1.6]">{caseStudy.outcome}</p>

      <span className="label-mono mt-4 inline-block border border-hairline px-2 py-1 opacity-60">
        [DRAFT]
      </span>

      <dl className="mt-8 flex flex-col border-t border-hairline">
        <div className="flex gap-6 border-b border-hairline py-3">
          <dt className="label-mono w-40 shrink-0 opacity-60">Role</dt>
          <dd>{caseStudy.role}</dd>
        </div>
        <div className="flex gap-6 py-3">
          <dt className="label-mono w-40 shrink-0 opacity-60">Timeframe</dt>
          <dd>{caseStudy.timeframe}</dd>
        </div>
      </dl>

      <p className="label-mono mt-16 opacity-60">Full write-up coming soon.</p>
    </>
  );
}

function CaseStudyBody({ caseStudy }: { caseStudy: CaseStudy }) {
  const content = caseStudy.content;
  if (!content) return null;

  return (
    <>
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

      {content.heroFigure && (
        <Figure label={content.heroFigure.label} caption={content.heroFigure.caption} />
      )}

      <div className="mt-16 flex flex-col gap-16">
        {content.sections.map((section) => (
          <CaseStudySection key={section.heading} section={section} />
        ))}
      </div>
    </>
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

function CaseStudySection({ section }: { section: CaseStudySectionData }) {
  return (
    <section>
      <h2 className="border-b border-hairline pb-3 text-2xl leading-snug">
        {section.heading}
      </h2>
      <div className="mt-6 flex flex-col gap-6">
        {section.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </section>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case "p":
      return <p className="leading-[1.6]">{block.text}</p>;
    case "lead":
      return (
        <p className="text-xl font-medium leading-snug">{block.text}</p>
      );
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
      return <Figure label={block.label} caption={block.caption} />;
  }
}

function Figure({ label, caption }: { label: string; caption?: string }) {
  return (
    <figure className="mt-2">
      <div className="flex min-h-48 items-center justify-center border border-dashed border-hairline p-6">
        <span className="label-mono text-center opacity-40">
          [ IMAGE PLACEHOLDER: {label.toUpperCase()} ]
        </span>
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm leading-[1.6] opacity-70">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
