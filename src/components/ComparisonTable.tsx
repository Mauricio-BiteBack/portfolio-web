"use client";

import { motion } from "motion/react";

type Mark = "yes" | "no" | "partial" | string;

export interface ComparisonRow {
  label: string;
  desc?: string;
  kopfwerk: Mark;
  other: Mark;
}

function Check({ dim = false }: { dim?: boolean }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className={dim ? "text-kw-cream/45" : "text-kw-gold"} aria-label="Ja">
      <path d="M5 12l5 5l10 -10" />
    </svg>
  );
}
function XMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="text-kw-cream/25" aria-label="Nein">
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
function Partial() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" className="text-kw-cream/35" aria-label="Teilweise">
      <path d="M5 12h14" />
    </svg>
  );
}

function Cell({ value, accent }: { value: Mark; accent?: boolean }) {
  if (value === "yes") return <Check dim={!accent} />;
  if (value === "no") return <XMark />;
  if (value === "partial") return <Partial />;
  return <span className="text-center text-[0.72rem] leading-snug text-kw-cream/55 sm:text-[0.8rem]">{value}</span>;
}

export default function ComparisonTable({
  title,
  rows,
  ourLabel = "Kopfwerk",
  otherLabel = "Andere Agenturen",
}: {
  title?: string;
  rows: ComparisonRow[];
  ourLabel?: string;
  otherLabel?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
      className="overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03] shadow-[0_2px_16px_rgba(0,0,0,0.35),0_30px_60px_-28px_rgba(0,0,0,0.6)] backdrop-blur-xl"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_88px_88px] items-center gap-x-2 border-b border-white/8 bg-white/[0.02] px-4 py-3.5 sm:grid-cols-[1.6fr_1fr_1fr] sm:gap-x-6 sm:px-7">
        <div className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-kw-cream/35">{title ?? "Fähigkeit"}</div>
        <div className="text-center text-sm font-bold tracking-tight text-kw-gold">{ourLabel}</div>
        <div className="text-center text-sm font-bold tracking-tight text-kw-cream/45">{otherLabel}</div>
      </div>
      <ul className="m-0 list-none p-0">
        {rows.map((row, i) => (
          <li
            key={i}
            className="grid grid-cols-[minmax(0,1fr)_88px_88px] items-start gap-x-2 border-t border-white/6 px-4 py-4 transition-colors duration-200 first:border-t-0 hover:bg-white/[0.025] sm:grid-cols-[1.6fr_1fr_1fr] sm:gap-x-6 sm:px-7"
          >
            <div className="min-w-0">
              <div className="text-[0.88rem] leading-snug text-kw-cream/85 sm:text-[0.95rem]">{row.label}</div>
              {row.desc && <div className="mt-1 text-[0.76rem] leading-snug text-kw-cream/40 sm:text-[0.8rem]">{row.desc}</div>}
            </div>
            <div className="flex items-center justify-center pt-0.5">
              <Cell value={row.kopfwerk} accent />
            </div>
            <div className="flex items-center justify-center pt-0.5">
              <Cell value={row.other} />
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
