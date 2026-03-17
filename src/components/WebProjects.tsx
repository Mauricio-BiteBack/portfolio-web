"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  url: string;
}

const initialProjects: Project[] = [
  {
    id: "yoestudiosalud",
    category: "Medizin-Onlineshop",
    title: "YoEstudioSalud",
    description:
      "E-Commerce-Website für medizinische Instrumente für Studierende. Mehrsprachig aufgebaut und für einen großen Produktkatalog optimiert.",
    image: "/images/projects/websites/yoestudiosalud.png",
    url: "https://yoestudiosalud.es",
  },
  {
    id: "demetersroots",
    category: "Website für vegane Produkte",
    title: "Demeters roots",
    description:
      "Corporate Website für ein Londoner Unternehmen für vegane Produkte. Mit individuell entwickeltem Formular für Großbestellungen.",
    image: "/images/projects/websites/demetersroots.png",
    url: "https://www.demetersroots.com",
  },
  {
    id: "albertopla",
    category: "Website für Fotojournalist",
    title: "AlbertoPla",
    description:
      "Website für einen Fotografen mit Fokus auf soziale Reportagen weltweit. Präsentiert Projekte, Geschichten und internationale Arbeiten.",
    image: "/images/projects/websites/albertopla.png",
    url: "https://albertopla.com",
  },
  {
    id: "germanya",
    category: "E-Commerce für Naturkosmetik",
    title: "Germanya Naturkosmetik",
    description:
      "Shopify-Onlineshop für eine Haarpflegemarke mit Fokus auf Lockenpflege. Optimiert für SEO, automatisierte Bestellungen und E-Mail-Marketing.",
    image: "/images/projects/websites/germanya.png",
    url: "https://www.germany-a.com",
  },
];

const moreProjects: Project[] = [
  {
    id: "amanirent",
    category: "Website für Ferienvermietung",
    title: "Amanirent",
    description:
      "WordPress-Website für ein Unternehmen, das Ferienwohnungen in Valencia verwaltet. Klare Präsentation der Services und der angebotenen Immobilien.",
    image: "/images/projects/websites/amanirent.png",
    url: "https://amanirent.es",
  },
  {
    id: "neurodiatermia",
    category: "Website für Physiotherapie-Methode",
    title: "Neurodiatermia",
    description:
      "Website für eine Physiotherapiepraxis zur Vorstellung der Methode Neurodiatermia. Mit Blog, Podcast und Informationen für Fachpublikum.",
    image: "/images/projects/websites/neurodiatermia.png",
    url: "https://neurodiatermia.com",
  },
  {
    id: "whistler",
    category: "Tourismus-Website für Kanada",
    title: "Whistler Ski Experience",
    description:
      "Corporate Website zur Präsentation von Hotels, Winteraktivitäten und Reiseangeboten. Fokus auf Erlebnisse rund um den Skitourismus.",
    image: "/images/projects/websites/whistler.png",
    url: "https://new.whistlerskiexperience.com",
  },
  {
    id: "barbaradeluxe",
    category: "Booking-Website für Kosmetikstudio",
    title: "BarbaraDeluxe",
    description:
      "Individuell erstellte Website mit integriertem Termin- und Bezahlsystem. Kunden können Behandlungen direkt online buchen und bezahlen.",
    image: "/images/projects/websites/barbaradeluxe.png",
    url: "https://barbaradeluxe.de",
  },
  {
    id: "eilandelectronics",
    category: "Website für Sicherheits- und Elektroinstallationen",
    title: "Eiland Electronics",
    description:
      "Corporate Website für ein Unternehmen für Kameras-, Alarm- und Elektroniksysteme. Klare Präsentation der Leistungen und einfache Kontaktanfragen.",
    image: "/images/projects/websites/eilandelectronics.png",
    url: "https://eilandelectronics.com",
  },
  {
    id: "ibacon",
    category: "Internationale Corporate Website",
    title: "IBACON",
    description:
      "Corporate Website für ein Unternehmen für biologische und chemische Studien. Präsentation von Forschung, Dienstleistungen und internationalen Standorten.",
    image: "/images/projects/websites/ibacon.png",
    url: "https://new.ibacon.com",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ height: "420px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top: screenshot normal */}
      <div className="relative w-full overflow-hidden flex-shrink-0" style={{ height: "200px" }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* External link badge on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5"
            >
              <span>Öffnen</span>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom: blurred screenshot + overlay + text */}
      <div className="relative flex-1 flex flex-col justify-start">
        {/* Blurred background */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={project.image}
            alt=""
            fill
            className="object-cover object-top"
            style={{ filter: "blur(22px)", transform: "scale(1.15)" }}
            sizes="(max-width: 768px) 100vw, 50vw"
            aria-hidden="true"
          />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Text */}
        <div className="relative z-10 p-6 md:p-8">
          <p className="text-neutral-400 text-sm mb-2">{project.category}</p>
          <h3 className="text-white font-bold text-2xl mb-3">{project.title}</h3>
          <p className="text-neutral-300 text-sm leading-relaxed">{project.description}</p>
        </div>
      </div>
    </motion.a>
  );
}

export default function WebProjects() {
  const [showMore, setShowMore] = useState(false);

  const allVisible = showMore
    ? [...initialProjects, ...moreProjects]
    : initialProjects;

  return (
    <section className="bg-black py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        {/* Header */}
        <div className="mb-14">
          <h2 className="text-white font-bold text-3xl md:text-4xl mb-2">
            Webdesign & Entwicklung
          </h2>
          <p className="text-neutral-400">
            Ausgewählte Websites aus realen Kundenprojekten.
          </p>
        </div>

        {/* Grid — more gap between cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {allVisible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Mehr / Weniger anzeigen */}
        <div className="flex justify-center mt-16">
          <motion.button
            onClick={() => setShowMore(!showMore)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-3.5 rounded-full text-base transition-colors duration-200"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {showMore ? "Weniger anzeigen" : "Mehr anzeigen"}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
