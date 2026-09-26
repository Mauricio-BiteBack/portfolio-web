"use client";

import { motion } from "motion/react";

function Dot() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mt-[3px] shrink-0">
      <path d="M5 12l5 5l10 -10" />
    </svg>
  );
}

export default function ProsConsCards({
  otherTitle,
  otherPoints,
  usTitle,
  usPoints,
  stack = false,
}: {
  otherTitle: string;
  otherPoints: string[];
  usTitle: string;
  usPoints: string[];
  stack?: boolean;
}) {
  return (
    <div className={stack ? "flex h-full flex-col gap-4" : "grid gap-4 md:grid-cols-2"}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="group rounded-[24px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_2px_16px_rgba(0,0,0,0.35),0_24px_48px_-24px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 md:p-7"
      >
        <div className="mb-3 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-kw-cream/35">Ehrlich gesagt</div>
        <h3 className="mb-4 text-xl font-bold tracking-tight text-kw-cream">{otherTitle}</h3>
        <ul className="m-0 flex flex-col gap-3 p-0">
          {otherPoints.map((p, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[0.92rem] leading-snug text-kw-cream/55">
              <Dot />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="group rounded-[24px] border border-kw-gold/25 bg-kw-wine/[0.1] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_2px_10px_rgba(0,0,0,0.35),0_24px_48px_-24px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-kw-gold/45 md:p-7"
      >
        <div className="mb-3 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-kw-gold">Der Unterschied</div>
        <h3 className="mb-4 text-xl font-bold tracking-tight text-kw-cream">{usTitle}</h3>
        <ul className="m-0 flex flex-col gap-3 p-0">
          {usPoints.map((p, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[0.92rem] leading-snug text-kw-cream/85">
              <span className="text-kw-gold">
                <Dot />
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
