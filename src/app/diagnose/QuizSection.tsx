"use client";

import { useState } from "react";
import Quiz from "./Quiz";

export default function QuizSection() {
  const [mode, setMode] = useState<"quick" | "detailed" | null>(null);

  if (mode) {
    return <Quiz mode={mode} onExit={() => setMode(null)} />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-kw-gold/25 bg-kw-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-kw-gold">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.36-6.36-2.12 2.12M8.76 15.24l-2.12 2.12m0-10.72 2.12 2.12m8.48 8.48 2.12 2.12" /></svg>
          Kostenloser KI-Check
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Wie KI-bereit ist Ihr Unternehmen?</h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-kw-cream/55 sm:text-lg">
          Finden Sie heraus, ob KI Ihnen wirklich hilft, und wie Sie am besten starten.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <button
          onClick={() => setMode("quick")}
          className="group flex flex-col rounded-[26px] border border-white/10 bg-white/[0.03] p-7 text-left shadow-[0_2px_16px_rgba(0,0,0,0.35),0_28px_54px_-26px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-kw-gold/30 hover:bg-white/[0.05]"
        >
          <div className="mb-5 flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-kw-cream/8 text-kw-gold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-kw-cream/40">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              ~2 Min
            </span>
          </div>
          <h3 className="mb-2 text-xl font-bold">Schnell-Check</h3>
          <p className="mb-6 flex-1 text-sm leading-relaxed text-kw-cream/55">
            Schnelle Übersicht für Eilige. 7 Fragen, ein erster KI-Readiness-Score.
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-kw-cream/70 group-hover:text-kw-gold">
            Jetzt starten
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </span>
        </button>

        <button
          onClick={() => setMode("detailed")}
          className="group relative flex flex-col rounded-[26px] border border-kw-gold/25 bg-kw-wine/[0.1] p-7 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_2px_16px_rgba(0,0,0,0.35),0_28px_54px_-26px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-kw-gold/50 hover:bg-kw-wine/[0.14]"
        >
          <span className="absolute -top-3 right-6 rounded-full bg-kw-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-kw-dark">
            Empfohlen
          </span>
          <div className="mb-5 flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-kw-gold/15 text-kw-gold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.36-6.36-2.12 2.12M8.76 15.24l-2.12 2.12m0-10.72 2.12 2.12m8.48 8.48 2.12 2.12" /></svg>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-kw-cream/40">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              ~5-10 Min
            </span>
          </div>
          <h3 className="mb-2 text-xl font-bold">Detaillierte Analyse</h3>
          <p className="mb-6 flex-1 text-sm leading-relaxed text-kw-cream/55">
            Tiefgehende Analyse mit persönlichen Empfehlungen. Beschreiben Sie Ihr konkretes Problem.
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-kw-gold">
            Analyse starten
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </span>
        </button>
      </div>
      <p className="mt-6 text-center text-xs text-kw-cream/35">100% kostenlos, keine versteckten Kosten</p>
    </div>
  );
}
