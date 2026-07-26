import type { WorkHistoryItem } from "@/data/site";

export function WorkTable({ items }: { items: WorkHistoryItem[] }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-1 top-1 left-28 w-px bg-hairline"
      />
      <ol className="flex flex-col gap-10">
        {items.map((item) => (
          <li
            key={`${item.org}-${item.timeframe}`}
            className="relative flex gap-6"
          >
            <p className="label-mono w-28 shrink-0 pt-0.5 text-right opacity-60">
              {item.timeframe}
            </p>
            <span
              aria-hidden
              className="absolute left-28 top-1.5 h-2 w-2 -translate-x-1/2 bg-rust"
            />
            <div className="flex-1 pl-6">
              <p>
                <span>{item.org}</span>
                <span className="opacity-60"> / {item.role}</span>
              </p>
              <p className="mt-2 leading-[1.6] opacity-80">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
