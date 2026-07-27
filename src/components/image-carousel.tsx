import { useRef } from "react";
import { CaseFigure } from "@/components/case-figure";

export function ImageCarousel({ srcs, alt }: { srcs: string[]; alt: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {srcs.map((src, i) => (
          <div key={src} className="w-full min-w-[280px] flex-1 shrink-0 snap-start">
            <CaseFigure src={src} alt={`${alt} ${i + 1}`} index={i + 1} />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Previous image"
          className="label-mono border border-hairline px-2 py-1 opacity-60 transition-opacity hover:opacity-100"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Next image"
          className="label-mono border border-hairline px-2 py-1 opacity-60 transition-opacity hover:opacity-100"
        >
          →
        </button>
      </div>
    </div>
  );
}
