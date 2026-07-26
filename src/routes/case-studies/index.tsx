import { createFileRoute, Link } from "@tanstack/react-router";
import { caseStudies } from "@/data/site";

export const Route = createFileRoute("/case-studies/")({
  component: CaseStudiesIndex,
});

function CaseStudiesIndex() {
  return (
    <div>
      <h1 className="label-mono border-b border-hairline pb-3 opacity-60">
        / CASE STUDIES
      </h1>

      <div className="mt-4 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
        {caseStudies.map((cs) => (
          <Link
            key={cs.slug}
            to="/case-studies/$slug"
            params={{ slug: cs.slug }}
            className="group flex flex-col gap-2 border border-hairline p-6"
          >
            <p className="flex items-center gap-2">
              <FolderIcon />
              <span className="group-hover:underline">{cs.title}</span>
              <span className="label-mono opacity-60">{cs.org}</span>
            </p>
            <p className="leading-[1.6] opacity-80">{cs.outcome}</p>
            <span
              aria-hidden
              className="mt-2 translate-x-[-4px] opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FolderIcon() {
  return (
    <svg
      aria-hidden
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M0.5 1.5C0.5 0.947715 0.947715 0.5 1.5 0.5H5L6.5 2.5H12.5C13.0523 2.5 13.5 2.94772 13.5 3.5V10.5C13.5 11.0523 13.0523 11.5 12.5 11.5H1.5C0.947715 11.5 0.5 11.0523 0.5 10.5V1.5Z"
        stroke="currentColor"
      />
    </svg>
  );
}
