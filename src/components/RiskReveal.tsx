"use client";

import { useEffect, useRef, useState } from "react";

function BlurWords({ text, progress }: { text: string; progress: number }) {
  const words = text.split(" ");
  return (
    <span style={{ display: "block" }}>
      {words.map((word, i) => {
        const threshold = i / words.length;
        const wordProgress = Math.max(0, Math.min(1, (progress - threshold) / (1 / words.length)));
        const blur = (1 - wordProgress) * 10;
        const opacity = 0.06 + wordProgress * 0.94;
        const clean = word.replace(/[.,]/g, "").toLowerCase();
        const isGold = clean === "null" || clean === "risiko";
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              filter: `blur(${blur.toFixed(2)}px)`,
              opacity,
              color: isGold ? "#D9A441" : undefined,
              transition: "filter 0.1s ease, opacity 0.1s ease",
              marginRight: "0.28em",
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}

const GALLERY = ["/servicios-app.jpg", "/servicios-automation.jpg", "/servicios-genai.jpg"];

function GalleryColumn({ order, marginTop, shift }: { order: number[]; marginTop: string; shift: string }) {
  return (
    <div className="flex flex-col gap-3 md:gap-5" style={{ marginTop, transform: `translateX(${shift})` }}>
      {order.map((imgIdx, i) => (
        <div key={i} className="overflow-hidden rounded-xl" style={{ aspectRatio: i === 1 ? "4/3" : "4/5" }}>
          <img
            src={GALLERY[imgIdx]}
            alt=""
            className="h-full w-full object-cover"
            style={{ opacity: i === 0 ? 1 : i === 1 ? 0.5 : 0.22 }}
          />
        </div>
      ))}
    </div>
  );
}

export default function RiskReveal({ eyebrow, text }: { eyebrow: string; text: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const gone = -rect.top;
      setProgress(Math.max(0, Math.min(1, gone / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={wrapperRef} className="relative bg-kw-dark" style={{ minHeight: "240vh" }}>
      {/* Image gallery scrolling behind, like a window */}
      <div className="relative z-0 grid grid-cols-3 gap-3 px-4 md:gap-5 md:px-8 lg:px-14">
        <GalleryColumn order={[0, 1, 2]} marginTop="6rem" shift="-5%" />
        <GalleryColumn order={[1, 2, 0]} marginTop="1rem" shift="0%" />
        <GalleryColumn order={[2, 0, 1]} marginTop="12rem" shift="5%" />
      </div>

      {/* Sticky centered text + vignette */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, #1D1616 0%, rgba(29,22,22,0.82) 20%, rgba(29,22,22,0.82) 80%, #1D1616 100%)" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "radial-gradient(55% 50% at 50% 50%, rgba(110,44,52,0.3) 0%, transparent 72%)" }}
          />
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-kw-gold">{eyebrow}</p>
            <div className="font-bold tracking-tight text-kw-cream" style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.4rem)", lineHeight: 1.15 }}>
              <BlurWords text={text} progress={progress} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
