import { useLayoutEffect, useRef, useState } from "react";

type Rule = { id: string; label: string; text: string };

const RULES: Rule[] = [
  {
    id: "copy",
    label: "// Copy constraint",
    text: "max_words: 20 — headline truncated at word limit",
  },
  {
    id: "signal",
    label: "// Signal threshold",
    text: 'uncertainty_threshold: < 0.70 → badge: "Low Signal"',
  },
  {
    id: "null",
    label: "// Null safety",
    text: 'null_fallback: "Data unavailable"',
  },
];

type LinePath = { x1: number; y1: number; x2: number; y2: number };

export function PipelineDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ruleRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});
  const [paths, setPaths] = useState<Record<string, LinePath>>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  useLayoutEffect(() => {
    function measure() {
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const next: Record<string, LinePath> = {};
      for (const rule of RULES) {
        const ruleEl = ruleRefs.current[rule.id];
        const fieldEl = fieldRefs.current[rule.id];
        if (!ruleEl || !fieldEl) continue;
        const r = ruleEl.getBoundingClientRect();
        const f = fieldEl.getBoundingClientRect();
        next[rule.id] = {
          x1: r.right - containerRect.left,
          y1: r.top + r.height / 2 - containerRect.top,
          x2: f.left - containerRect.left,
          y2: f.top + f.height / 2 - containerRect.top,
        };
      }
      setPaths(next);
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  function clear(id: string) {
    setActiveId((current) => (current === id ? null : current));
  }

  return (
    <div ref={containerRef} className="relative border border-hairline p-6 md:p-8">
      <p className="label-mono opacity-60">/ Spec → Render Pipeline</p>

      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      >
        {RULES.map((rule) => {
          const path = paths[rule.id];
          if (!path) return null;
          const active = activeId === rule.id;
          const midX = (path.x1 + path.x2) / 2;
          return (
            <path
              key={rule.id}
              d={`M ${path.x1} ${path.y1} C ${midX} ${path.y1}, ${midX} ${path.y2}, ${path.x2} ${path.y2}`}
              fill="none"
              stroke={active ? "var(--color-highlight)" : "var(--color-hairline)"}
              strokeWidth={active ? 2 : 1}
              strokeDasharray="4 4"
              style={{ opacity: active ? 1 : activeId ? 0.15 : 0.6 }}
              className="transition-[opacity,stroke,stroke-width] duration-150"
            />
          );
        })}
      </svg>

      <div className="relative mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
        <div>
          <p className="label-mono opacity-60">
            / Spec: financial-metric-card.spec.md
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {RULES.map((rule) => (
              <button
                key={rule.id}
                type="button"
                ref={(el) => {
                  ruleRefs.current[rule.id] = el;
                }}
                onMouseEnter={() => setActiveId(rule.id)}
                onMouseLeave={() => clear(rule.id)}
                onFocus={() => setActiveId(rule.id)}
                onBlur={() => clear(rule.id)}
                className={
                  "w-full border-l-2 py-2 pl-4 text-left transition-colors " +
                  (activeId === rule.id
                    ? "border-highlight bg-highlight/10"
                    : "border-hairline")
                }
              >
                <span className="label-mono block opacity-60">{rule.label}</span>
                <span className="mt-1 block text-sm leading-[1.5]">{rule.text}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="label-mono opacity-60">/ Rendered output (React)</p>
          <div className="mt-4 border border-hairline p-5">
            <h4
              ref={(el) => {
                fieldRefs.current.copy = el;
              }}
              className={
                "text-base leading-snug transition-colors " +
                (activeId === "copy" ? "bg-highlight/20" : "")
              }
            >
              Missed Earnings Signals Q3 Analyst Targets
            </h4>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl text-rust">-3.2%</span>
              <span className="label-mono opacity-60">EPS vs. consensus</span>
            </div>

            <div className="mt-4">
              <span
                ref={(el) => {
                  fieldRefs.current.signal = el;
                }}
                className={
                  "label-mono inline-block border border-hairline px-2 py-1 transition-colors " +
                  (activeId === "signal" ? "border-highlight bg-highlight/20" : "")
                }
              >
                ⚠ Low Signal
              </span>
            </div>

            <p
              ref={(el) => {
                fieldRefs.current.null = el;
              }}
              className={
                "label-mono mt-4 border-t border-hairline pt-3 opacity-60 transition-colors " +
                (activeId === "null" ? "bg-highlight/20" : "")
              }
            >
              analyst_notes → Data unavailable
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
