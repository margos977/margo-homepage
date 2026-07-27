import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Rule = { id: string; label: string; text: string };

const RULES: Rule[] = [
  {
    id: "copy",
    label: "// Copy constraint",
    text: "max_words: 20 - headline truncated at word limit",
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

const STEP_MS = 2000;

type LinePath = { x1: number; y1: number; x2: number; y2: number };

export function PipelineDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ruleRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});
  const [paths, setPaths] = useState<Record<string, LinePath>>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const activeId = RULES[activeIndex].id;

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

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % RULES.length);
    }, STEP_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={containerRef} className="relative border border-hairline p-6 md:p-8">
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full">
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
              stroke="#B8680E"
              strokeWidth={active ? 2 : 1}
              strokeDasharray="4 4"
              style={{ opacity: active ? 0.6 : 0.3 }}
              className="transition-[opacity,stroke-width] duration-500"
            />
          );
        })}
      </svg>

      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
        <div>
          <p className="label-mono opacity-60">
            / Spec: financial-metric-card.spec.md
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {RULES.map((rule) => (
              <div
                key={rule.id}
                ref={(el) => {
                  ruleRefs.current[rule.id] = el;
                }}
                style={{
                  backgroundColor: "rgba(184, 104, 14, 0.08)",
                  borderColor:
                    activeId === rule.id
                      ? "rgba(184, 104, 14, 0.6)"
                      : "rgba(184, 104, 14, 0.2)",
                }}
                className="border px-4 py-3 transition-colors duration-500"
              >
                <span className="label-mono block opacity-60">{rule.label}</span>
                <span className="mt-1 block text-sm leading-[1.5]">{rule.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="label-mono opacity-60">/ Rendered output (React)</p>
          <div className="aria-mock mt-4">
            <div className="rounded-card overflow-hidden border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="rounded-chip flex h-4 w-4 items-center justify-center bg-indigo-600 text-[9px] font-bold text-white">
                    A
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">
                    Aria
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">
                  Analyst Targets
                </span>
              </div>

              <div className="p-5">
                <h4
                  ref={(el) => {
                    fieldRefs.current.copy = el;
                  }}
                  className="rounded-chip text-sm font-semibold text-slate-900 transition-colors duration-500"
                  style={{
                    backgroundColor:
                      activeId === "copy" ? "rgba(184, 104, 14, 0.12)" : "transparent",
                  }}
                >
                  Q3 Analyst Targets
                </h4>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-red-600">
                    -3.2%
                  </span>
                  <span className="text-xs text-slate-400">
                    EPS vs. consensus
                  </span>
                </div>

                <div className="mt-4">
                  <span
                    ref={(el) => {
                      fieldRefs.current.signal = el;
                    }}
                    style={{
                      boxShadow:
                        activeId === "signal"
                          ? "0 0 0 1.5px rgba(184, 104, 14, 0.6)"
                          : "none",
                    }}
                    className="rounded-pill inline-flex items-center gap-1 border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700 transition-shadow duration-500"
                  >
                    ⚠ Low Signal
                  </span>
                </div>

                <p
                  ref={(el) => {
                    fieldRefs.current.null = el;
                  }}
                  className="rounded-chip mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400 transition-colors duration-500"
                  style={{
                    backgroundColor:
                      activeId === "null" ? "rgba(184, 104, 14, 0.12)" : "transparent",
                  }}
                >
                  Analyst Note: data unavailable
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
