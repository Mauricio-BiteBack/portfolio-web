"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";

const LINKS = [
  { label: "Websites", href: "/mauricio/categorias/webs" },
  { label: "Social Media", href: "/mauricio/categorias/social" },
  { label: "Generative KI", href: "/mauricio/categorias/ia" },
  { label: "Automatisierung", href: "/mauricio/categorias/automatizacion" },
  { label: "Kontakt", href: "/mauricio#contacto" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-black z-[60] origin-left"
      />
      <nav
        className={`fixed top-0 inset-x-0 z-50 px-6 lg:px-10 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "py-4 bg-white/90 backdrop-blur-md border-b border-black/10" : "py-6 bg-transparent"
        }`}
      >
        <Link href="/mauricio" className="font-display text-2xl tracking-wide leading-none">
          Mauricio Jaramillo
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="m-underline text-[13px] font-medium uppercase tracking-[0.14em] text-black/70 hover:text-black transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 w-7 z-50"
          aria-label="Menü"
        >
          <span
            className="block h-[1.5px] w-full bg-black transition-transform duration-300"
            style={{ transform: open ? "translateY(6.5px) rotate(45deg)" : "none" }}
          />
          <span
            className="block h-[1.5px] w-full bg-black transition-opacity duration-300"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block h-[1.5px] w-full bg-black transition-transform duration-300"
            style={{ transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none" }}
          />
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 bg-white flex flex-col items-start justify-center gap-6 px-8 md:hidden"
        >
          {LINKS.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="font-display text-5xl"
            >
              {l.label}
            </motion.a>
          ))}
        </motion.div>
      )}
    </>
  );
}
