"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface Phase {
  tag: string;
  dur: string;
  title: string;
  desc: string;
}

export default function PhaseScroll({
  heading,
  headingAccent,
  subheading,
  phases,
}: {
  heading: string;
  headingAccent?: string;
  subheading?: string;
  phases: Phase[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-step-idx"));
            setActiveIdx(idx);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
    );
    itemRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [phases.length]);

  const railFillPct = phases.length > 1 ? (activeIdx / (phases.length - 1)) * 100 : 0;

  const scrollTo = useCallback((i: number) => {
    itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <div>
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {heading} {headingAccent && <span className="text-kw-gold">{headingAccent}</span>}
        </h2>
        {subheading && <p className="mt-4 max-w-xl text-base leading-relaxed text-kw-cream/55 sm:text-lg">{subheading}</p>}
      </div>

      <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
        {/* LEFT: rail + dots (desktop only) */}
        <div className="relative hidden lg:block">
          <div className="sticky top-32">
            <div className="absolute left-5 top-5 bottom-5 w-px bg-kw-cream/10">
              <div className="absolute left-0 top-0 w-full bg-kw-gold transition-all duration-500 ease-out" style={{ height: `${railFillPct}%` }} />
            </div>
            <div className="flex flex-col gap-12">
              {phases.map((step, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`relative flex items-center gap-4 text-left transition-all duration-300 hover:scale-[1.03] ${i <= activeIdx ? "opacity-100" : "opacity-30"}`}
                >
                  <div
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs font-bold transition-all duration-300 ${
                      i === activeIdx
                        ? "border-kw-gold bg-kw-gold text-kw-dark shadow-[0_0_20px_-2px_rgba(217,164,65,0.6)]"
                        : i < activeIdx
                        ? "border-kw-gold bg-kw-dark text-kw-gold"
                        : "border-kw-cream/20 bg-kw-dark text-kw-cream/30"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${i === activeIdx ? "text-kw-gold" : "text-kw-cream/40"}`}>
                    {step.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: content panels */}
        <div className="flex flex-col gap-5">
          {phases.map((step, i) => (
            <div
              key={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-step-idx={i}
              className={`relative overflow-hidden rounded-[26px] border p-7 backdrop-blur-xl transition-all duration-500 sm:p-9 ${
                i === activeIdx
                  ? "border-kw-gold/30 bg-white/[0.04] shadow-[0_2px_20px_rgba(0,0,0,0.35),0_30px_60px_-30px_rgba(0,0,0,0.6)] opacity-100"
                  : "border-white/8 bg-white/[0.015] opacity-45"
              }`}
            >
              {/* Mobile dot */}
              <div className="mb-5 flex items-center gap-3 lg:hidden">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 font-mono text-xs font-bold ${
                    i === activeIdx ? "border-kw-gold bg-kw-gold text-kw-dark" : "border-kw-cream/20 text-kw-cream/40"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-kw-gold">{step.tag}</span>
              </div>

              <div className="relative">
                <div className="mb-4 hidden items-baseline gap-4 lg:flex">
                  <span className={`text-xs font-bold uppercase tracking-[0.2em] ${i === activeIdx ? "text-kw-gold" : "text-kw-cream/30"}`}>{step.tag}</span>
                  <span className="text-xs text-kw-cream/35">{step.dur}</span>
                </div>
                <h3 className="mb-4 text-2xl font-bold tracking-tight text-kw-cream sm:text-3xl">{step.title}</h3>
                <p className="max-w-xl text-[0.95rem] leading-relaxed text-kw-cream/55 sm:text-base">{step.desc}</p>
                <span className="pointer-events-none absolute right-0 top-0 hidden select-none text-[110px] font-black leading-none text-kw-cream/[0.05] sm:block" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
