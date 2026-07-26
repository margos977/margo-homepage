import { Fragment } from "react";
import type { WorkHistoryItem } from "@/data/site";

export function WorkTable({ items }: { items: WorkHistoryItem[] }) {
  return (
    <div className="grid grid-cols-[7rem_1.5rem_1fr] font-mono text-sm leading-relaxed">
      {items.map((item, i) => (
        <Fragment key={`${item.org}-${item.timeframe}`}>
          <div className="pt-px">{item.timeframe}</div>
          <div aria-hidden>●</div>
          <div className="flex items-baseline">
            <span className="flex w-[22ch] items-baseline gap-2">
              <span className="shrink-0">{item.org}</span>
              <span
                aria-hidden
                className="mb-[3px] min-w-2 flex-1 border-b border-dotted border-hairline"
              />
            </span>
            <span className="pl-2 opacity-70">{item.role}</span>
          </div>

          <div />
          <div aria-hidden className="opacity-40">
            |
          </div>
          <div className="pb-1 opacity-70">{item.description}</div>

          {i < items.length - 1 && (
            <>
              <div />
              <div aria-hidden className="opacity-40">
                |
              </div>
              <div>&nbsp;</div>
            </>
          )}
        </Fragment>
      ))}
    </div>
  );
}
