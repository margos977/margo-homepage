import { useState } from "react";
import { CaseFigure } from "@/components/case-figure";

export function ImageCarousel({ srcs, alt }: { srcs: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  function step(direction: 1 | -1) {
    setActive((i) => (i + direction + srcs.length) % srcs.length);
  }

  return (
    <div>
      <CaseFigure src={srcs[active]} alt={`${alt} ${active + 1}`} index={active + 1} />

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {srcs.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              className={
                "h-14 w-20 shrink-0 overflow-hidden border transition-opacity " +
                (i === active
                  ? "border-ink opacity-100"
                  : "border-hairline opacity-50 hover:opacity-80")
              }
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous image"
            className="label-mono border border-hairline px-2 py-1 opacity-60 transition-opacity hover:opacity-100"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next image"
            className="label-mono border border-hairline px-2 py-1 opacity-60 transition-opacity hover:opacity-100"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
