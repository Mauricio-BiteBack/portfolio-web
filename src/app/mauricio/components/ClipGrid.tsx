"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";

export function ClipGrid({ clips }: { clips: { src: string; caption?: string }[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Algunos navegadores pausan el video al salir del viewport y no lo
    // retoman solos — se fuerza el resume acá.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && video.paused) video.play().catch(() => {});
        });
      },
      { threshold: 0.1 }
    );

    const videos = container.querySelectorAll("video");
    videos.forEach((v) => observer.observe(v));

    return () => observer.disconnect();
  }, [clips]);

  return (
    <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-3 gap-5 lg:gap-6">
      {clips.map((clip, i) => (
        <Reveal key={clip.src} delay={(i % 3) * 0.06}>
          <div className="rounded-2xl overflow-hidden border border-black/10 bg-black shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]">
            <video
              src={clip.src}
              loop
              muted
              playsInline
              className="w-full block"
              style={{ aspectRatio: "9 / 16", objectFit: "cover" }}
            />
          </div>
          {clip.caption && <p className="mt-2.5 text-[12px] font-medium text-black/45 leading-snug">{clip.caption}</p>}
        </Reveal>
      ))}
    </div>
  );
}
