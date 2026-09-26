"use client";

import { useMemo, useState } from "react";
import {
  QUICK_QUESTIONS,
  DETAILED_QUESTIONS,
  computeScore,
  scoreLabel,
  type QuizQuestion,
} from "./quizData";

const TALLY_URL = "https://tally.so/r/QKZeEp";

type Phase = "questions" | "lead" | "result";

export default function Quiz({ mode, onExit }: { mode: "quick" | "detailed"; onExit: () => void }) {
  const questions = mode === "quick" ? QUICK_QUESTIONS : DETAILED_QUESTIONS;
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("questions");
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [lead, setLead] = useState({ firstName: "", email: "", company: "", phone: "" });
  const [wantsReport, setWantsReport] = useState(true);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const question: QuizQuestion = questions[step];
  const pct = Math.round(((step + 1) / questions.length) * 100);
  const score = useMemo(() => computeScore(questions, answers), [questions, answers]);
  const result = useMemo(() => scoreLabel(score), [score]);

  function goNext() {
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
    } else {
      setPhase("lead");
    }
  }

  function goBack() {
    if (step > 0) {
      setStep((s) => s - 1);
    } else {
      onExit();
    }
  }

  function selectSingle(value: string) {
    setAnswers((a) => ({ ...a, [question.id]: value }));
    setTimeout(goNext, 180);
  }

  function toggleMulti(value: string) {
    setAnswers((a) => {
      const current = Array.isArray(a[question.id]) ? (a[question.id] as string[]) : [];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      return { ...a, [question.id]: next };
    });
  }

  function setText(value: string) {
    setAnswers((a) => ({ ...a, [question.id]: value }));
  }

  async function submitLead(skipEmail: boolean) {
    setSubmitting(true);
    try {
      await fetch("/api/diagnose-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          answers,
          score,
          lead: skipEmail ? null : { ...lead, wantsReport },
        }),
      });
    } catch {
      // Netzwerkfehler: die Auswertung wird trotzdem angezeigt, das Ergebnis geht nicht verloren.
    }
    setSubmitting(false);
    setSubmitted(true);
    setPhase("result");
  }

  // ─── Result ──────────────────────────────────────────────────────────────
  if (phase === "result") {
    return (
      <div className="mx-auto max-w-xl rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_2px_20px_rgba(0,0,0,0.4),0_36px_70px_-30px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-12">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-kw-gold">Euer Ergebnis</p>
        <div className="mx-auto my-6 flex h-32 w-32 items-center justify-center rounded-full border-4 border-kw-gold/30">
          <span className="text-4xl font-extrabold text-kw-gold">{score}%</span>
        </div>
        <h3 className="mb-3 text-2xl font-bold sm:text-3xl">{result.title}</h3>
        <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-kw-cream/60">{result.text}</p>
        {submitted && (
          <p className="mb-6 text-sm text-kw-cream/40">
            Danke! Wir melden uns, falls Sie eine E-Mail-Adresse hinterlassen haben.
          </p>
        )}
        <a
          href={TALLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-kw-gold px-7 py-4 text-sm font-semibold text-kw-dark transition-all duration-200 hover:scale-[1.03] hover:bg-kw-gold-light active:scale-[0.98] sm:text-base"
        >
          Kostenlose Diagnose buchen
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
        </a>
        <button onClick={onExit} className="mt-6 block w-full text-sm text-kw-cream/35 hover:text-kw-cream/60">
          Zurück zur Übersicht
        </button>
      </div>
    );
  }

  // ─── Lead capture ────────────────────────────────────────────────────────
  if (phase === "lead") {
    return (
      <div className="mx-auto max-w-xl rounded-[28px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_2px_20px_rgba(0,0,0,0.4),0_36px_70px_-30px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-10">
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-bold sm:text-3xl">Fast geschafft!</h3>
          <p className="mt-2 text-sm text-kw-cream/50">Wohin sollen wir dein Ergebnis schicken?</p>
          <p className="mt-4 inline-block rounded-full border border-kw-gold/25 bg-kw-gold/10 px-4 py-1.5 text-sm font-semibold text-kw-gold">
            Dein Score: {score}%
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            required
            placeholder="Vorname *"
            value={lead.firstName}
            onChange={(e) => setLead((l) => ({ ...l, firstName: e.target.value }))}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-kw-cream placeholder:text-kw-cream/35 transition-colors focus:border-kw-gold/50 focus:outline-none"
          />
          <input
            type="email"
            required
            placeholder="E-Mail *"
            value={lead.email}
            onChange={(e) => setLead((l) => ({ ...l, email: e.target.value }))}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-kw-cream placeholder:text-kw-cream/35 transition-colors focus:border-kw-gold/50 focus:outline-none"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Firma"
              value={lead.company}
              onChange={(e) => setLead((l) => ({ ...l, company: e.target.value }))}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-kw-cream placeholder:text-kw-cream/35 transition-colors focus:border-kw-gold/50 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Telefon"
              value={lead.phone}
              onChange={(e) => setLead((l) => ({ ...l, phone: e.target.value }))}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-kw-cream placeholder:text-kw-cream/35 transition-colors focus:border-kw-gold/50 focus:outline-none"
            />
          </div>
          <label className="mt-2 flex items-start gap-2.5 text-sm text-kw-cream/60">
            <input type="checkbox" checked={wantsReport} onChange={(e) => setWantsReport(e.target.checked)} className="mt-0.5 h-4 w-4 rounded accent-kw-gold" />
            Schickt mir die ausführliche Auswertung per E-Mail
          </label>
          <label className="flex items-start gap-2.5 text-sm text-kw-cream/60">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 rounded accent-kw-gold" />
            Ich akzeptiere die{" "}
            <a href="/datenschutz" target="_blank" className="text-kw-gold underline">
              Datenschutzerklärung
            </a>{" "}
            *
          </label>
          <button
            disabled={!lead.firstName || !lead.email || !consent || submitting}
            onClick={() => submitLead(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-kw-gold px-6 py-4 text-sm font-semibold text-kw-dark transition-all duration-200 hover:scale-[1.02] hover:bg-kw-gold-light active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            {submitting ? "Wird gesendet..." : "Ergebnis anzeigen"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </button>
          <button onClick={() => submitLead(true)} className="text-center text-xs text-kw-cream/35 hover:text-kw-cream/60">
            Erstmal nur Ergebnis zeigen (ohne E-Mail)
          </button>
        </div>
      </div>
    );
  }

  // ─── Question ────────────────────────────────────────────────────────────
  const currentAnswer = answers[question.id];
  const multiSelected = Array.isArray(currentAnswer) ? currentAnswer : [];
  const textValue = typeof currentAnswer === "string" ? currentAnswer : "";

  return (
    <div className="mx-auto max-w-2xl rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.4),0_36px_70px_-30px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-10">
      <div className="mb-6 flex items-center justify-between text-xs font-semibold text-kw-cream/40">
        <span>
          Frage {step + 1} von {questions.length} <span className="mx-1.5 text-kw-cream/20">|</span> {question.category}
        </span>
        <span className="text-kw-gold">{pct}%</span>
      </div>
      <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-kw-cream/10">
        <div className="h-full rounded-full bg-gradient-to-r from-kw-gold to-kw-gold-light transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>

      <h3 className="mb-7 text-xl font-bold leading-snug sm:text-2xl">{question.text}</h3>

      {question.type === "single" && (
        <div className="flex flex-col gap-3">
          {question.options!.map((opt) => (
            <button
              key={opt.value}
              onClick={() => selectSingle(opt.value)}
              className={`rounded-xl border px-5 py-4 text-left text-sm leading-relaxed transition-all duration-200 hover:scale-[1.012] sm:text-base ${
                currentAnswer === opt.value
                  ? "border-kw-gold/50 bg-kw-gold/10 text-kw-cream shadow-[0_0_24px_-8px_rgba(217,164,65,0.5)]"
                  : "border-white/10 bg-white/[0.02] text-kw-cream/75 hover:border-kw-gold/25 hover:bg-white/[0.05]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {question.type === "multi" && (
        <>
          <p className="-mt-4 mb-5 text-xs text-kw-cream/35">Mehrere Antworten möglich</p>
          <div className="flex flex-col gap-3">
            {question.options!.map((opt) => {
              const checked = multiSelected.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => toggleMulti(opt.value)}
                  className={`flex items-center gap-3 rounded-xl border px-5 py-4 text-left text-sm leading-relaxed transition-all duration-200 hover:scale-[1.012] sm:text-base ${
                    checked
                      ? "border-kw-gold/50 bg-kw-gold/10 text-kw-cream shadow-[0_0_24px_-8px_rgba(217,164,65,0.5)]"
                      : "border-white/10 bg-white/[0.02] text-kw-cream/75 hover:border-kw-gold/25 hover:bg-white/[0.05]"
                  }`}
                >
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${checked ? "border-kw-gold bg-kw-gold" : "border-kw-cream/25"}`}>
                    {checked && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1D1616" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    )}
                  </span>
                  {opt.label}
                </button>
              );
            })}
          </div>
          <button
            onClick={goNext}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-kw-gold px-6 py-3.5 text-sm font-semibold text-kw-dark transition-all duration-200 hover:scale-[1.03] hover:bg-kw-gold-light active:scale-[0.98]"
          >
            Weiter
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </button>
        </>
      )}

      {question.type === "text" && (
        <>
          <textarea
            value={textValue}
            onChange={(e) => setText(e.target.value)}
            placeholder={question.placeholder}
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm leading-relaxed text-kw-cream placeholder:text-kw-cream/30 transition-colors focus:border-kw-gold/50 focus:outline-none"
          />
          <button
            onClick={goNext}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-kw-gold px-6 py-3.5 text-sm font-semibold text-kw-dark transition-all duration-200 hover:scale-[1.03] hover:bg-kw-gold-light active:scale-[0.98]"
          >
            Weiter
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </button>
        </>
      )}

      <button onClick={goBack} className="mt-8 text-xs text-kw-cream/35 hover:text-kw-cream/60">
        ← Zurück
      </button>
    </div>
  );
}
