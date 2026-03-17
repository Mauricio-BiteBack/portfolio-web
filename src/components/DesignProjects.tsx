"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface DesignProject {
  id: string;
  title: string;
  image: string;
  bg: string;
  zoom?: boolean; // first two images should be zoomed in
}

const projects: DesignProject[] = [
  {
    id: "bienenglueck",
    title: "Bienenglück",
    image: "/images/projects/design/bienenglueck.png",
    bg: "#f5f0e8",
    zoom: true,
  },
  {
    id: "flowmate",
    title: "Flowmate",
    image: "/images/projects/design/flowmate.jpg",
    bg: "#d8ecec",
    zoom: true,
  },
  {
    id: "bundeswehr",
    title: "Bundeswehr",
    image: "/images/projects/design/bundeswehr.jpg",
    bg: "#1a1a1a",
    zoom: false,
  },
];

function DesignCard({
  project,
  onClick,
}: {
  project: DesignProject;
  onClick: (p: DesignProject) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ aspectRatio: "3/4", backgroundColor: project.bg }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className={`transition-transform duration-500 ${
          project.zoom ? "object-cover" : "object-cover"
        }`}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          transform: hovered
            ? `scale(${project.zoom ? 1.08 : 1.05})`
            : `scale(${project.zoom ? 1.0 : 1.0})`,
        }}
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* Same hover overlay as ContentProjects */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 flex items-end p-5"
          >
            <span className="text-white font-semibold text-lg drop-shadow-md">
              {project.title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DesignModal({
  project,
  onClose,
}: {
  project: DesignProject;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden max-w-lg w-full"
        style={{ backgroundColor: project.bg }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button inside the modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          aria-label="Schließen"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 512px"
          />
        </div>
        <div className="p-5 bg-black/20">
          <h3
            className="font-bold text-xl"
            style={{
              color: project.bg === "#1a1a1a" ? "#fff" : "#111",
            }}
          >
            {project.title}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function DesignProjects() {
  const [selected, setSelected] = useState<DesignProject | null>(null);

  return (
    <section className="bg-black py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-white font-bold text-3xl md:text-4xl mb-2">
            Design & Markenauftritt
          </h2>
          <p className="text-neutral-400">
            Visuelle Ideen, die Marken Form geben.
          </p>
        </div>

        {/* 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <DesignCard key={project.id} project={project} onClick={setSelected} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <DesignModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
