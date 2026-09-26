"use client";

import { motion } from "motion/react";

export default function MethodologySection({
  eyebrow,
  title,
  titleAccent,
  subheading,
  text,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt = "",
  imageSide = "right",
}: {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subheading: string;
  text: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc: string;
  imageAlt?: string;
  imageSide?: "left" | "right";
}) {
  const imageBlock = (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      className="relative overflow-hidden rounded-[20px] border border-kw-cream/10 shadow-[0_28px_60px_-22px_rgba(0,0,0,0.6),0_3px_10px_rgba(0,0,0,0.28)]"
    >
      <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-kw-dark/50 via-transparent to-transparent" />
    </motion.div>
  );

  const textBlock = (
    <div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-kw-gold"
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-kw-gold" />
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl"
      >
        {title} <em className="text-kw-gold not-italic">{titleAccent}</em>
      </motion.h2>
      <motion.h3
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-3 text-lg font-medium text-kw-cream/70"
      >
        {subheading}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-kw-cream/55"
      >
        {text}
      </motion.p>
      {ctaLabel && ctaHref && (
        <motion.a
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          href={ctaHref}
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-kw-cream/20 px-6 py-3 text-sm font-semibold text-kw-cream transition-colors hover:border-kw-gold/50 hover:text-kw-gold"
        >
          {ctaLabel}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
        </motion.a>
      )}
    </div>
  );

  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
      {imageSide === "left" ? (
        <>
          <div className="order-2 md:order-1">{imageBlock}</div>
          <div className="order-1 md:order-2">{textBlock}</div>
        </>
      ) : (
        <>
          <div>{textBlock}</div>
          <div>{imageBlock}</div>
        </>
      )}
    </div>
  );
}
