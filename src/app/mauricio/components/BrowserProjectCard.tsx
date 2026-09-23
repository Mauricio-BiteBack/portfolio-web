"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "../data";

function displayUrl(project: Project) {
  if (project.externalUrl) {
    try {
      return new URL(project.externalUrl).hostname;
    } catch {
      /* fall through */
    }
  }
  const slug = project.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "");
  return `${slug}.com`;
}

export function BrowserProjectCard({ project, index }: { project: Project; index: number }) {
  const hero = project.images[0];
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Link
      href={`/mauricio/proyectos/${project.slug}`}
      className="group block"
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      <div className="rounded-2xl overflow-hidden border border-black/10 bg-white shadow-[0_50px_90px_-45px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-black/10 bg-black/[0.025]">
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
          <span className="ml-3 text-[11px] font-medium tracking-[0.02em] text-black/35 truncate">
            {displayUrl(project)}
          </span>
        </div>
        <div className="relative w-full overflow-hidden bg-black/5" style={{ aspectRatio: "16 / 11" }}>
          {hero && (
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              style={{ objectPosition: project.heroPosition ?? "top" }}
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
          )}
          {project.cardVideo && (
            <video
              ref={videoRef}
              src={project.cardVideo}
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </div>
      </div>

      <div className="mt-6 flex items-baseline gap-3.5">
        <span className="font-display text-[15px] tracking-[0.05em] text-black/35">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display leading-none" style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)" }}>
          {project.title}
        </h3>
      </div>
      <p className="mt-2.5 italic text-black/55 leading-snug max-w-md">{project.tagline}</p>
      {project.tags && project.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <li
              key={tag}
              className="text-[11px] font-semibold uppercase tracking-[0.05em] text-black/50 border border-black/15 rounded-full px-3 py-1.5"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
