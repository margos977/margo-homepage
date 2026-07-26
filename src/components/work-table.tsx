import type { WorkHistoryItem } from "@/data/site";

export function WorkTable({ items }: { items: WorkHistoryItem[] }) {
  return (
    <div>
      {items.map((item) => (
        <div
          key={`${item.org}-${item.timeframe}`}
          className="flex flex-col gap-2 border-b border-hairline py-7 last:border-b-0"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p>
              <span>{item.org}</span>
              <span className="opacity-60"> / {item.role}</span>
            </p>
            <p className="label-mono shrink-0 opacity-60">{item.timeframe}</p>
          </div>
          <p className="leading-[1.6] opacity-80">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
