import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { caseStudies } from "@/data/site";
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
        to="/case-studies"
        className="label-mono opacity-60 transition-opacity hover:opacity-100"
      >
        ← / CASE STUDIES
      </Link>

      <h1 className="mt-6 text-4xl leading-tight">{caseStudy.title}</h1>
      <p className="label-mono mt-2 opacity-60">{caseStudy.org}</p>
      <p className="mt-4 max-w-xl leading-[1.6]">{caseStudy.outcome}</p>

      {!caseStudy.body && (
        <span className="label-mono mt-4 inline-block border border-hairline px-2 py-1 opacity-60">
          [DRAFT]
        </span>
      )}

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

      <div className="mt-16">
        {caseStudy.body ? (
          <p className="leading-[1.6]">{caseStudy.body}</p>
        ) : (
          <p className="label-mono opacity-60">
            Full write-up coming soon.
          </p>
        )}
      </div>
    </article>
  );
}
