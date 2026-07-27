import { Fragment } from "react";
import type { WorkHistoryItem } from "@/data/site";

export function WorkTable({ items }: { items: WorkHistoryItem[] }) {
  return (
    <div className="grid grid-cols-[7rem_1.5rem_1fr] font-mono text-sm leading-relaxed">
      {items.map((item, i) => (
        <Fragment key={`${item.org}-${item.timeframe}`}>
          <div className="pt-px">{item.timeframe}</div>
          <div aria-hidden>●</div>
          <div className="flex flex-col sm:flex-row sm:items-baseline">
            <span className="flex items-baseline gap-2 sm:w-[22ch]">
              <span className="shrink-0">{item.org}</span>
              <span
                aria-hidden
                className="mb-[3px] hidden min-w-2 flex-1 border-b border-dotted border-hairline sm:block"
              />
            </span>
            <span className="opacity-70 sm:pl-2">{item.role}</span>
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
