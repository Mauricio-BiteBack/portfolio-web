"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function CaseCard({
  href,
  service,
  client,
  title,
  metric,
  metricLabel,
  metricNote,
  imageSrc,
  className = "",
  minHeight = "26rem",
}: {
  href: string;
  service: string;
  client: string;
  title: string;
  metric: string;
  metricLabel: string;
  metricNote?: string;
  imageSrc: string;
  className?: string;
  minHeight?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className={`h-full ${className}`}
    >
      <Link
        href={href}
        className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.4),0_36px_70px_-30px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-1 hover:border-kw-gold/30"
        style={{ minHeight }}
      >
        <div className="absolute inset-0 z-0">
          <img src={imageSrc} alt="" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
        </div>
        <div
          className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to top, rgba(29,22,22,0.96) 0%, rgba(29,22,22,0.72) 45%, rgba(29,22,22,0.18) 100%)" }}
        />
        <div className="relative z-20 flex flex-1 flex-col justify-end p-6 sm:p-7">
          <span className="mb-4 inline-flex w-fit items-center rounded-full border border-kw-gold/25 bg-kw-gold/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-kw-gold backdrop-blur-md">
            {service}
          </span>
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-kw-cream/45">{client}</p>
          <h3 className="mb-5 text-lg font-bold leading-snug text-kw-cream sm:text-xl">{title}</h3>
          <div className="mb-5">
            <span className="text-4xl font-extrabold tracking-tight text-kw-gold">{metric}</span>
            <span className="ml-2 text-xs uppercase tracking-wide text-kw-cream/40">{metricLabel}</span>
            {metricNote && <span className="ml-2 text-[0.68rem] text-kw-cream/30">({metricNote})</span>}
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-kw-cream/80 transition-colors group-hover:text-kw-gold">
            Case lesen
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
