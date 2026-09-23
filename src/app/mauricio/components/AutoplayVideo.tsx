"use client";

import { useEffect, useRef } from "react";

export function AutoplayVideo({ src, className }: { src: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = containerRef.current?.querySelector("video");
    if (!video) return;

    // Algunos navegadores pausan el video al salir del viewport y no lo
    // retoman solos — se fuerza el resume acá.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && video.paused) video.play().catch(() => {});
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, [src]);

  return (
    <div ref={containerRef}>
      <video src={src} loop muted playsInline className={className} />
    </div>
  );
}
