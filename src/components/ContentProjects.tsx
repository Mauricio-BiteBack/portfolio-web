"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ContentProject {
  id: string;
  title: string;
  images: string[];
  cover: string;
}

const projects: ContentProject[] = [
  {
    id: "vicinity",
    title: "Vicinity",
    cover: "/images/projects/content/hf_20260315_183541_e3f27013-7f94-41ce-8267-2d045c4ea220.jpeg",
    images: [
      "/images/projects/content/hf_20260315_183541_e3f27013-7f94-41ce-8267-2d045c4ea220.jpeg",
      "/images/projects/content/hf_20260315_184138_2d40a22c-1a7a-48e0-b59a-3ce18ba835a2.jpeg",
      "/images/projects/content/hf_20260315_161716_50050ee7-325f-4473-9acc-d9fd0b9777b3.jpeg",
      "/images/projects/content/hf_20260315_153703_602b7a96-6003-4b32-87f5-4b210b68186c.jpeg",
    ],
  },
  {
    id: "newbalance",
    title: "New Balance",
    cover: "/images/projects/content/hf_20260316_134028_cac726a1-73ac-4433-9b86-5a2c49483f0d.jpeg",
    images: [
      "/images/projects/content/hf_20260316_220115_8dde56fa-069a-4155-a328-1b3032156317.png",
      "/images/projects/content/hf_20260316_134028_cac726a1-73ac-4433-9b86-5a2c49483f0d.jpeg",
      "/images/projects/content/hf_20260316_214019_fa95f0f9-da6d-4d90-ac15-267ad3e27e61.jpeg",
      "/images/projects/content/hf_20260317_141336_bcfead39-6f29-4886-af3a-afd7753b41e3.jpg",
    ],
  },
  {
    id: "azzaro",
    title: "Azzaro",
    cover: "/images/projects/content/hf_20260316_081746_995ea43c-19ed-40ad-85a2-b7f009c40c25.jpeg",
    images: [
      "/images/projects/content/hf_20260316_081746_995ea43c-19ed-40ad-85a2-b7f009c40c25.jpeg",
      "/images/projects/content/hf_20260315_190512_cea28e6d-c9c1-4c03-9305-0286d0468c71.jpeg",
      "/images/projects/content/hf_20260316_080434_96a3cdc1-3bd2-436d-8136-bf7d39607bd5.png",
      "/images/projects/content/hf_20260317_142019_d7ed135e-a366-4e00-8d59-b428f4407704.jpg",
    ],
  },
];

function ContentCard({
  project,
  onClick,
}: {
  project: ContentProject;
  onClick: (p: ContentProject) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ aspectRatio: "3/4" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={project.cover}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-500"
        style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* Hover overlay with title */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 flex items-end p-5"
          >
            <span className="text-white font-semibold text-lg">
              {project.title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Multi-image indicator */}
      {project.images.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {project.images.length} Bilder
        </div>
      )}
    </motion.div>
  );
}

function GalleryModal({
  project,
  onClose,
}: {
  project: ContentProject;
  onClose: () => void;
}) {
  const isSingle = project.images.length === 1;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close button — fixed, always visible during scroll */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[60] w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Schließen"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1L13 13M13 1L1 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Content */}
      <div className="flex justify-center py-16 px-6">
        <motion.div
          className="relative w-full max-w-md"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {isSingle ? (
            <Image
              src={project.images[0]}
              alt={project.title}
              width={600}
              height={800}
              className="w-full h-auto rounded-2xl"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          ) : (
            /* Scrollable vertical list — all images full width */
            <div className="flex flex-col gap-3">
              {project.images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`${project.title} ${i + 1}`}
                  width={600}
                  height={800}
                  className="w-full h-auto rounded-xl"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              ))}
            </div>
          )}

          {/* Project title below */}
          <p className="text-white/60 text-sm text-center mt-4">{project.title}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ContentProjects() {
  const [selected, setSelected] = useState<ContentProject | null>(null);

  return (
    <section className="bg-black py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-white font-bold text-3xl md:text-4xl mb-2">
            KI-gestützte Visuals & Content
          </h2>
          <p className="text-neutral-400">
            Cinematische Visuals, die beim Scrollen sofort auffallen und zum Handeln motivieren.
          </p>
        </div>

        {/* 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ContentCard key={project.id} project={project} onClick={setSelected} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <GalleryModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
