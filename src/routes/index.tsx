import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { about, caseStudies, metadata, workHistory } from "@/data/site";
import { WorkTable } from "@/components/work-table";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex flex-col">
      <Section id="about" label="About">
        <div className="flex max-w-2xl flex-col gap-4">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="leading-[1.6]">
              {paragraph}
            </p>
          ))}
        </div>

        <dl className="mt-6 flex flex-col">
          {metadata.map((row) => (
            <div key={row.label} className="flex gap-x-6 py-2.5">
              <dt className="label-mono w-40 shrink-0 opacity-60">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="case-studies" label="Case Studies" className="mt-16">
        <div>
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              to="/case-studies/$slug"
              params={{ slug: cs.slug }}
              className="group flex flex-col gap-2 border-b border-hairline py-6 last:border-b-0"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="flex items-center gap-2">
                  <FolderIcon />
                  <span className="group-hover:underline">{cs.title}</span>
                  <span className="label-mono opacity-60">{cs.org}</span>
                </p>
                <span
                  aria-hidden
                  className="translate-x-[-4px] opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100"
                >
                  →
                </span>
              </div>
              <p className="max-w-2xl leading-[1.6] opacity-80">{cs.outcome}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="work-history" label="Work History" className="mt-16">
        <WorkTable items={workHistory} />
      </Section>
    </div>
  );
}

function Section({
  id,
  label,
  className,
  children,
}: {
  id: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-10 ${className ?? ""}`}>
      <h2 className="label-mono border-b border-hairline pb-3 opacity-60">
        / {label.toUpperCase()}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
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
