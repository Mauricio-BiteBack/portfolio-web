"use client";

import { motion } from "motion/react";

export interface FeaturePoint {
  title: string;
  desc: string;
}

function Check() {
  return (
    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-kw-gold/12 text-kw-gold">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12l5 5l10 -10" />
      </svg>
    </span>
  );
}

export default function FeatureSplit({
  eyebrow,
  title,
  titleAccent,
  text,
  points,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt = "",
  videoSrc,
  imageSide = "right",
}: {
  eyebrow: string;
  title: string;
  titleAccent: string;
  text: string;
  points: FeaturePoint[];
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc: string;
  imageAlt?: string;
  videoSrc?: string;
  imageSide?: "left" | "right";
}) {
  const textBlock = (
    <div>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-kw-cream/40">{eyebrow}</p>
      <h2 className="text-[clamp(1.9rem,3.6vw,2.7rem)] font-bold leading-[1.1] tracking-tight text-kw-cream">
        {title} <span className="text-kw-gold">{titleAccent}</span>
      </h2>
      <p className="mt-5 max-w-[480px] text-[1.02rem] leading-relaxed text-kw-cream/55">{text}</p>

      <ul className="m-0 mt-8 flex list-none flex-col gap-5 p-0">
        {points.map((pt, i) => (
          <li key={i} className="flex gap-3.5">
            <Check />
            <div>
              <div className="text-[0.98rem] font-medium leading-snug tracking-tight text-kw-cream">{pt.title}</div>
              <p className="mt-1 max-w-prose text-[0.92rem] leading-snug text-kw-cream/50">{pt.desc}</p>
            </div>
          </li>
        ))}
      </ul>

      {ctaLabel && ctaHref && (
        <div className="mt-9">
          <a
            href={ctaHref}
            className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-kw-gold to-kw-gold-light px-5 py-2.5 text-[0.95rem] font-medium tracking-tight text-kw-dark no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-6px_rgba(217,164,65,0.5)]"
          >
            <span>{ctaLabel}</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
              <path d="M5 12l14 0" />
              <path d="M13 18l6 -6" />
              <path d="M13 6l6 6" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );

  const imageBlock = (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[12%] rounded-full opacity-70"
        style={{ background: "radial-gradient(60% 60% at 60% 40%, rgba(217,164,65,0.12), rgba(217,164,65,0.03) 44%, transparent 72%)" }}
      />
      <div className="relative mx-auto max-w-[440px] lg:max-w-none">
        <div
          className="relative overflow-hidden rounded-[clamp(16px,1.8vw,24px)] p-px shadow-[0_40px_120px_-40px_rgba(0,0,0,0.75)]"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.1) 24%, rgba(255,255,255,0.04) 62%, rgba(255,255,255,0.14) 100%)" }}
        >
          <div className="relative overflow-hidden rounded-[clamp(15px,1.7vw,23px)] bg-kw-dark">
            <div className="relative">
              {videoSrc ? (
                <video
                  src={videoSrc}
                  poster={imageSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="block h-auto w-full"
                />
              ) : (
                <img src={imageSrc} alt={imageAlt} loading="lazy" className="block h-auto w-full" />
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ boxShadow: "inset 0 0 44px 6px rgba(14,14,14,0.85)" }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(60% 55% at 50% 45%, rgba(255,255,255,0.06), transparent 72%)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      {imageSide === "left" ? (
        <>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="order-2 lg:order-1">
            {imageBlock}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="order-1 lg:order-2">
            {textBlock}
          </motion.div>
        </>
      ) : (
        <>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
            {textBlock}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
            {imageBlock}
          </motion.div>
        </>
      )}
    </div>
  );
}
