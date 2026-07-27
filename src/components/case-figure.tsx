import { useEffect, useState } from "react";

export function CaseFigure({
  src,
  alt,
  caption,
  index,
  bleed = false,
  showFigureLabel = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  index?: number;
  bleed?: boolean;
  /** Show "FIG. N" as persistent text above the caption instead of only on hover. */
  showFigureLabel?: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <figure className={bleed ? "" : "w-full"}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full cursor-zoom-in text-left"
        >
          <img src={src} alt={alt} className="block w-full" />
          <span className="label-mono absolute bottom-2 right-2 border border-hairline bg-bg px-2 py-1 opacity-0 transition-opacity group-hover:opacity-100">
            {typeof index === "number" ? `FIG. ${index}` : "ZOOM"}
          </span>
        </button>
        {showFigureLabel ? (
          caption && (
            <figcaption className="mt-3 flex gap-3 text-sm leading-[1.6] opacity-70">
              {typeof index === "number" && (
                <span className="label-mono shrink-0 opacity-70">
                  FIG. {String(index).padStart(2, "0")}
                </span>
              )}
              <span>{caption}</span>
            </figcaption>
          )
        ) : (
          caption && (
            <figcaption className="mt-3 text-center text-sm leading-[1.6] opacity-70">
              {caption}
            </figcaption>
          )
        )}
      </figure>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-ink/90 p-6"
        >
          <img
            src={src}
            alt={alt}
            className="max-h-full max-w-full object-contain"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="label-mono absolute right-6 top-6 border border-hairline bg-bg px-3 py-2 text-ink"
          >
            CLOSE (ESC)
          </button>
        </div>
      )}
    </>
  );
}
