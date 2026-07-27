import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { caseStudies } from "@/data/site";
import type { CaseSnapshot, CaseSnapshotBeat, CaseStudy } from "@/data/site";
import { NotFound } from "@/components/not-found";
import { CaseFigure } from "@/components/case-figure";
import { PipelineDiagram } from "@/components/pipeline-diagram";

export const Route = createFileRoute("/case-studies/$slug/")({
  loader: ({ params }) => {
    const caseStudy = caseStudies.find((cs) => cs.slug === params.slug);
    if (!caseStudy || caseStudy.hidden) throw notFound();
    return caseStudy;
  },
  component: CaseStudySnapshot,
  notFoundComponent: () => (
    <NotFound message="That case study doesn't exist." />
  ),
});

function CaseStudySnapshot() {
  const caseStudy = Route.useLoaderData();

  return (
    <article className="w-full">
      <Link
        to="/"
        hash="case-studies"
        hashScrollIntoView={{ behavior: "smooth" }}
        className="label-mono -mx-1.5 inline-block px-1.5 leading-none opacity-60 transition-colors hover:bg-highlight hover:text-ink hover:opacity-100"
      >
        ← / CASE STUDIES
      </Link>

      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="label-mono opacity-60">/ Snapshot</p>
        <p className="label-mono opacity-60">
          {caseStudy.timeframe} · {caseStudy.org}
        </p>
      </div>

      <h1 className="mt-2 text-4xl leading-tight">{caseStudy.title}</h1>

      {caseStudy.snapshot ? (
        <SnapshotBody caseStudy={caseStudy} snapshot={caseStudy.snapshot} />
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

function SnapshotBody({
  caseStudy,
  snapshot,
}: {
  caseStudy: CaseStudy;
  snapshot: CaseSnapshot;
}) {
  return (
    <>
      <p className="mt-4 max-w-2xl text-xl leading-snug">{caseStudy.outcome}</p>

      <dl className="mt-8 flex flex-col border-t border-hairline">
        {snapshot.facts.map((fact) => (
          <div
            key={fact.label}
            className="flex gap-6 border-b border-hairline py-3"
          >
            <dt className="label-mono w-28 shrink-0 opacity-60">
              {fact.label}
            </dt>
            <dd className="text-[15px] leading-[1.5]">{fact.value}</dd>
          </div>
        ))}
      </dl>

      {snapshot.heroSrc && (
        <div className="mt-8">
          <CaseFigure
            src={snapshot.heroSrc}
            alt={caseStudy.title}
            caption={snapshot.heroCaption}
          />
        </div>
      )}

      <div className="mt-16 flex flex-col gap-16">
        {snapshot.beats.map((beat, i) => (
          <SnapshotBeat key={beat.label} beat={beat} index={i} />
        ))}
      </div>

      {caseStudy.content && (
        <Link
          to="/case-studies/$slug/full"
          params={{ slug: caseStudy.slug }}
          className="group mt-16 flex items-center justify-between gap-4 border border-hairline p-6"
        >
          <div>
            <p className="label-mono opacity-60">/ The Long Version</p>
            <p className="-mx-1.5 mt-2 inline-block px-1.5 text-lg leading-tight transition-colors group-hover:bg-highlight group-hover:text-ink">
              Read the full case study
            </p>
          </div>
          <span
            aria-hidden
            className="text-2xl transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      )}

      <Link
        to="/"
        hash="case-studies"
        hashScrollIntoView={{ behavior: "smooth" }}
        className="label-mono -mx-1.5 mt-16 inline-block px-1.5 leading-none opacity-60 transition-colors hover:bg-highlight hover:text-ink hover:opacity-100"
      >
        ← / CASE STUDIES
      </Link>
    </>
  );
}

function SnapshotBeat({
  beat,
  index,
}: {
  beat: CaseSnapshotBeat;
  index: number;
}) {
  const textBlock = (
    <div className="max-w-2xl">
      <p className="label-mono opacity-60">/ {beat.label.toUpperCase()}</p>
      <p className="mt-4 text-[17px] leading-[1.6]">{beat.text}</p>
    </div>
  );

  if (beat.custom === "pipelineDiagram") {
    return (
      <div>
        {textBlock}
        <div className="mt-8">
          <PipelineDiagram />
        </div>
      </div>
    );
  }

  if (!beat.figureSrc) {
    return <div>{textBlock}</div>;
  }

  return (
    <div>
      {textBlock}
      <div className="mt-8">
        <CaseFigure
          src={beat.figureSrc}
          alt={beat.label}
          caption={beat.figureCaption}
          index={index + 1}
        />
      </div>
    </div>
  );
}
