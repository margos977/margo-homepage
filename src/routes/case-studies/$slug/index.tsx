import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { caseStudies } from "@/data/site";
import type { CaseSnapshot, CaseSnapshotBeat, CaseStudy } from "@/data/site";
import { NotFound } from "@/components/not-found";
import { CaseFigure } from "@/components/case-figure";
import { CaseVideo } from "@/components/case-video";
import { PipelineDiagram } from "@/components/pipeline-diagram";
import { CaseTags } from "@/components/case-tags";

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
        {caseStudy.snapshot?.layout !== "editorial" && (
          <p className="label-mono opacity-60">/ Snapshot</p>
        )}
        <p className="label-mono ml-auto opacity-60">
          {caseStudy.timeframe} · {caseStudy.org}
        </p>
      </div>

      <h1 className="mt-2 text-4xl leading-tight">{caseStudy.title}</h1>

      {caseStudy.tags && (
        <div className="mt-3">
          <CaseTags tags={caseStudy.tags} />
        </div>
      )}

      {caseStudy.snapshot ? (
        caseStudy.snapshot.layout === "editorial" ? (
          <EditorialSnapshotBody caseStudy={caseStudy} snapshot={caseStudy.snapshot} />
        ) : (
          <SnapshotBody caseStudy={caseStudy} snapshot={caseStudy.snapshot} />
        )
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
      <p className="mx-auto mt-4 max-w-2xl text-xl leading-snug">{caseStudy.outcome}</p>

      <dl className="mx-auto mt-8 flex max-w-2xl flex-col">
        {snapshot.facts.map((fact) => (
          <div key={fact.label} className="flex gap-6 py-3">
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
    <div className="mx-auto max-w-2xl">
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
      {beat.secondaryFigureSrc && (
        <div className="mt-8">
          <CaseFigure
            src={beat.secondaryFigureSrc}
            alt={beat.label}
            caption={beat.secondaryFigureCaption}
          />
        </div>
      )}
    </div>
  );
}

function EditorialSnapshotBody({
  caseStudy,
  snapshot,
}: {
  caseStudy: CaseStudy;
  snapshot: CaseSnapshot;
}) {
  let figureCounter = 0;
  const heroFigIndex = snapshot.heroSrc ? ++figureCounter : undefined;
  const beatFigIndices = snapshot.beats.map((beat) => ({
    figIndex: beat.figureSrc || beat.videoSrc ? ++figureCounter : undefined,
    secondaryFigIndex: beat.secondaryFigureSrc ? ++figureCounter : undefined,
    extraFigIndices: beat.extraFigures?.map(() => ++figureCounter),
  }));

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
        <div className="flex flex-col justify-start">
          <p className="max-w-2xl text-xl leading-snug">{caseStudy.outcome}</p>
          <dl className="mt-8 flex flex-col">
            {snapshot.facts.map((fact) => (
              <div key={fact.label} className="flex gap-6 py-3">
                <dt className="label-mono w-28 shrink-0 opacity-60">
                  {fact.label}
                </dt>
                <dd className="text-[15px] leading-[1.5]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        {snapshot.heroSrc && (
          <div className="mx-auto w-[70%]">
            <CaseFigure
              src={snapshot.heroSrc}
              alt={caseStudy.title}
              caption={snapshot.heroCaption}
              index={heroFigIndex}
              showFigureLabel
            />
          </div>
        )}
      </div>

      {snapshot.stats && (
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 border-y border-hairline py-8 sm:grid-cols-3">
            {snapshot.stats.map((stat) => (
              <div key={stat.label} className={stat.pending ? "opacity-50" : undefined}>
                <p className="text-5xl leading-none">{stat.value}</p>
                <p className="label-mono mt-3 opacity-60">{stat.label}</p>
              </div>
            ))}
          </div>
          {snapshot.statsCaption && (
            <p className="label-mono mt-4 opacity-60">{snapshot.statsCaption}</p>
          )}
        </div>
      )}

      <div className="mt-16 flex flex-col gap-16">
        {snapshot.beats.map((beat, i) => (
          <EditorialSnapshotBeat
            key={beat.label}
            beat={beat}
            index={i}
            figIndex={beatFigIndices[i].figIndex}
            secondaryFigIndex={beatFigIndices[i].secondaryFigIndex}
            extraFigIndices={beatFigIndices[i].extraFigIndices}
          />
        ))}
      </div>

      {caseStudy.content ? (
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
      ) : (
        <div className="mt-16 flex items-center justify-between gap-4 border border-hairline p-6 opacity-50">
          <div>
            <p className="label-mono opacity-60">/ The Long Version</p>
            <p className="mt-2 text-lg leading-tight">Read the full case study</p>
          </div>
          <span className="label-mono shrink-0 border border-hairline px-2 py-1">
            Coming soon
          </span>
        </div>
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

function EditorialSnapshotBeat({
  beat,
  index,
  figIndex,
  secondaryFigIndex,
  extraFigIndices,
}: {
  beat: CaseSnapshotBeat;
  index: number;
  figIndex?: number;
  secondaryFigIndex?: number;
  extraFigIndices?: number[];
}) {
  const imageFirst = beat.imageFirst ?? index % 2 === 0;

  const textBlock = (
    <div className="flex flex-col justify-start">
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

  if (beat.videoSrc) {
    return (
      <div>
        {textBlock}
        <div className="mx-auto mt-8 w-[70%]">
          <CaseVideo
            src={beat.videoSrc}
            poster={beat.videoPoster}
            caption={beat.videoCaption}
            index={figIndex}
            showFigureLabel
          />
        </div>
      </div>
    );
  }

  if (!beat.figureSrc) {
    return <div>{textBlock}</div>;
  }

  if (beat.extraFigures && beat.extraFigures.length > 0) {
    return (
      <div>
        {textBlock}
        <div className="mt-8 flex flex-col gap-8">
          <div className="mx-auto w-[70%]">
            <CaseFigure
              src={beat.figureSrc}
              alt={beat.label}
              caption={beat.figureCaption}
              index={figIndex}
              showFigureLabel
            />
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {beat.extraFigures.map((fig, i) => (
              <CaseFigure
                key={fig.src}
                src={fig.src}
                alt={beat.label}
                caption={fig.caption}
                index={extraFigIndices?.[i]}
                showFigureLabel
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (beat.secondaryFigureSrc) {
    return (
      <div>
        {textBlock}
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <CaseFigure
            src={beat.figureSrc}
            alt={beat.label}
            caption={beat.figureCaption}
            index={figIndex}
            showFigureLabel
          />
          <CaseFigure
            src={beat.secondaryFigureSrc}
            alt={beat.label}
            caption={beat.secondaryFigureCaption}
            index={secondaryFigIndex}
            showFigureLabel
          />
        </div>
      </div>
    );
  }

  if (beat.standalone) {
    return (
      <div>
        {textBlock}
        <div className="mx-auto mt-8 w-[70%]">
          <CaseFigure
            src={beat.figureSrc}
            alt={beat.label}
            caption={beat.figureCaption}
            index={figIndex}
            showFigureLabel
          />
        </div>
      </div>
    );
  }

  const figureBlock = (
    <div>
      {beat.figureHeading && (
        <p className="label-mono mb-3 opacity-60">{beat.figureHeading}</p>
      )}
      <CaseFigure
        src={beat.figureSrc}
        alt={beat.label}
        caption={beat.figureCaption}
        index={figIndex}
        showFigureLabel
      />
    </div>
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
          {figureBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {figureBlock}
        </>
      )}
    </div>
  );
}
