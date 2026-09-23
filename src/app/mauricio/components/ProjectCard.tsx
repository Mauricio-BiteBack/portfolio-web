"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "../data";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/mauricio/proyectos/${project.slug}`} className="group block">
        <div className="relative w-full overflow-hidden bg-black/5" style={{ aspectRatio: "4 / 5" }}>
          <Image
            src={project.images[0]?.src ?? "/mauricio/webs/placeholder.jpg"}
            alt={project.images[0]?.alt ?? project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </div>
        </div>
        <div className="pt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl leading-none mb-1.5">{project.title}</h3>
            <p className="text-sm text-black/55 leading-snug max-w-[26ch]">{project.tagline}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
