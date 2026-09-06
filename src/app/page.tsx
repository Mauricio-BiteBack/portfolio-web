"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/kopfwerk-logo.png"
      alt="Kopfwerk"
      width={160}
      height={48}
      className={className}
      style={{ objectFit: "contain", objectPosition: "left center", width: "auto" }}
      priority
    />
  );
}

// ─── Preloader ────────────────────────────────────────────────────────────────
function Preloader({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1200);
    const t2 = setTimeout(() => onDone(), 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1D1616]"
      style={{ opacity: fading ? 0 : 1, transition: "opacity 0.9s ease", pointerEvents: "none" }}
    >
      <div className="preloader-icon flex flex-col items-center gap-4">
        <Logo className="h-14 brightness-[10]" />
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Servicios", href: "#servicios" },
    { label: "Proceso", href: "#proceso" },
    { label: "Casos", href: "#casos" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 px-6 lg:px-12 py-5 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#1D1616]/8"
          : "bg-transparent"
      }`}
    >
      <a href="#" className="flex items-center">
        <Logo className={`h-9 transition-all duration-300 ${scrolled ? "" : "brightness-[10]"}`} />
      </a>

      <div className="hidden md:flex items-center gap-10">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={`text-sm font-medium tracking-wide transition-colors ${
              scrolled ? "text-[#1D1616]/60 hover:text-[#1D1616]" : "text-[#FAF6EE]/70 hover:text-[#FAF6EE]"
            }`}
          >
            {l.label}
          </a>
        ))}
      </div>

      <a
        href="https://tally.so/r/QKZeEp"
        target="_blank"
        rel="noopener noreferrer"
        className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
          scrolled
            ? "bg-[#6E2C34] text-[#FAF6EE] hover:bg-[#5a2229]"
            : "bg-[#FAF6EE] text-[#1D1616] hover:bg-[#EFD9A6]"
        }`}
      >
        Hablar con Kopfwerk
      </a>

      {/* Mobile toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`md:hidden flex flex-col gap-1.5 w-6 ${scrolled ? "text-[#1D1616]" : "text-[#FAF6EE]"}`}
        aria-label="Menú"
      >
        <span className="block h-px w-full bg-current" />
        <span className="block h-px w-full bg-current" />
        <span className="block h-px w-4 bg-current" />
      </button>

      {menuOpen && (
        <div className="absolute top-full inset-x-0 bg-[#FAF6EE] border-b border-[#1D1616]/8 py-6 flex flex-col gap-5 px-6 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#1D1616] font-medium text-lg"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://tally.so/r/QKZeEp"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-5 py-3 rounded-full bg-[#6E2C34] text-[#FAF6EE] font-semibold text-center"
          >
            Hablar con Kopfwerk
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#1D1616] overflow-hidden">
      {/* Subtle radial glow from center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 60%, rgba(110,44,52,0.35) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <p className="reveal visible text-[#6E2C34] text-xs font-semibold uppercase tracking-[0.22em] mb-8">
            Kopfwerk
          </p>

          {/* H1 */}
          <h1 className="reveal reveal-delay-1 visible text-[#FAF6EE] text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
            Implementamos la IA<br />
            <span className="text-[#FAF6EE]/40">que necesitas.</span>
          </h1>

          {/* Subtítulo */}
          <p className="reveal reveal-delay-2 visible text-[#FAF6EE]/55 text-lg sm:text-xl leading-relaxed mb-12 max-w-xl">
            No automatizamos para reemplazar equipos. Automatizamos para que tu equipo pueda enfocarse en lo que realmente importa.
          </p>

          {/* CTAs */}
          <div className="reveal reveal-delay-3 visible flex flex-wrap gap-4">
            <a
              href="https://tally.so/r/QKZeEp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#FAF6EE] text-[#1D1616] font-semibold text-sm hover:bg-[#EFD9A6] transition-colors"
            >
              Solicitar diagnóstico
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a
              href="#proceso"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-[#FAF6EE]/20 text-[#FAF6EE]/70 font-medium text-sm hover:border-[#FAF6EE]/40 hover:text-[#FAF6EE] transition-colors"
            >
              Conocer el proceso
            </a>
          </div>
        </div>

        {/* Leitsatz bottom */}
        <div className="mt-24 pt-8 border-t border-[#FAF6EE]/8">
          <p className="text-[#FAF6EE]/25 text-sm italic tracking-wide">
            "Alles Wichtige passiert zuerst im Kopf."
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Problem ──────────────────────────────────────────────────────────────────
function ProblemSection() {
  return (
    <section className="bg-[#FAF6EE] py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="mb-16 reveal">
          <p className="text-[#6E2C34] text-xs font-semibold uppercase tracking-[0.22em] mb-4">El problema</p>
          <h2 className="text-[#1D1616] text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            La mayoría de las empresas ya usa IA.<br />
            <span className="text-[#1D1616]/35">Casi ninguna la integró bien.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-[#1D1616]/8 rounded-2xl overflow-hidden">
          {/* Sin estructura */}
          <div className="bg-[#FAF6EE] p-10">
            <p className="text-[#1D1616]/40 text-xs font-semibold uppercase tracking-[0.2em] mb-7">Sin proceso claro</p>
            <ul className="space-y-5">
              {[
                "Herramientas compradas que nadie usa con consistencia.",
                "Automatizaciones sueltas que funcionan hasta que no funcionan.",
                "Equipos que siguen haciendo a mano lo que podría ser automático.",
                "Proyectos de IA que empezaron y quedaron a medias.",
                "Proveedores que implementaron sin entender el negocio.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-[#1D1616]/60 text-sm leading-relaxed">
                  <span className="shrink-0 mt-1 w-4 h-4 rounded-full border border-[#1D1616]/20 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-[#1D1616]/30" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Con Kopfwerk */}
          <div className="bg-[#1D1616] p-10">
            <p className="text-[#6E2C34] text-xs font-semibold uppercase tracking-[0.2em] mb-7">Con Kopfwerk</p>
            <ul className="space-y-5">
              {[
                "Auditoría primero. Construimos sobre lo que ya funciona.",
                "Sistemas que el equipo entiende y puede operar.",
                "Automatizaciones que duran porque están bien pensadas.",
                "Implementaciones que terminan y se miden. En semanas.",
                "Capacitación integrada al sistema que construimos juntos.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-[#FAF6EE]/75 text-sm leading-relaxed">
                  <span className="shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6E2C34" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
// ─── Service Expandable Card ──────────────────────────────────────────────────
function ServiceCard({
  imageSrc,
  title,
  subtitle,
  content,
}: {
  imageSrc: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const layoutId = `service-card-${title}`;

  return (
    <>
      <motion.div
        layoutId={layoutId}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer relative h-72 overflow-hidden rounded-2xl border border-[#1D1616]/10 group shadow-sm"
        whileHover="hover"
      >
        <motion.img
          layoutId={`image-${layoutId}`}
          src={imageSrc}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
          variants={{ hover: { scale: 1.05 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 p-6 w-full translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
          <motion.p layoutId={`subtitle-${layoutId}`} className="text-[#6E2C34] text-xs font-semibold uppercase tracking-[0.18em] mb-1.5">
            {subtitle}
          </motion.p>
          <motion.h3 layoutId={`title-${layoutId}`} className="text-xl font-bold tracking-tight text-[#FAF6EE]">
            {title}
          </motion.h3>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#1D1616]/70 backdrop-blur-md"
            />
            <motion.div
              layoutId={layoutId}
              className="relative w-full max-w-4xl h-[80vh] bg-[#FAF6EE] rounded-2xl overflow-hidden border border-[#1D1616]/10 z-10 flex flex-col md:flex-row shadow-xl"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center bg-[#1D1616]/10 hover:bg-[#1D1616]/20 rounded-full border border-[#1D1616]/10 text-[#1D1616] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>

              <div className="relative h-64 w-full shrink-0 overflow-hidden md:h-full md:w-1/2">
                <motion.img
                  layoutId={`image-${layoutId}`}
                  src={imageSrc}
                  alt={title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
              </div>

              <div className="p-8 w-full md:w-1/2 flex flex-col overflow-y-auto">
                <motion.p layoutId={`subtitle-${layoutId}`} className="text-[#6E2C34] text-xs font-semibold uppercase tracking-[0.18em] mb-3">
                  {subtitle}
                </motion.p>
                <motion.h3 layoutId={`title-${layoutId}`} className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1616] mb-6 pb-5 border-b border-[#1D1616]/8">
                  {title}
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: 0.2 }}
                  className="text-[#1D1616]/70 text-sm leading-relaxed grow"
                >
                  {content}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8"
                >
                  <a
                    href="https://tally.so/r/QKZeEp"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#6E2C34] text-[#FAF6EE] text-sm font-semibold hover:bg-[#5a2229] transition-colors"
                  >
                    Hablar de este servicio
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function ServicesSection() {
  const services = [
    {
      imageSrc: "/servicios-app.jpg",
      title: "Apps y Webs",
      subtitle: "Servicio 01",
      content: (
        <div className="flex flex-col gap-5">
          <p>
            Tu presencia digital es la primera impresión que da tu negocio. Diseñamos y desarrollamos webs, landing pages y dashboards que no solo se ven bien: convierten, comunican y funcionan.
          </p>
          <p>
            Trabajamos desde cero o sobre lo que ya tenés. Y no desaparecemos al entregar: el mantenimiento mensual está incluido para que tu sitio siempre esté actualizado y operando.
          </p>
          <div>
            <p className="text-[#1D1616] font-semibold mb-2">Para quién es</p>
            <p>Empresas que necesitan presencia digital profesional, una landing que capture leads, o un panel interno para gestionar su operación.</p>
          </div>
          <div>
            <p className="text-[#1D1616] font-semibold mb-2">Qué incluye</p>
            <p>Diseño, desarrollo, mantenimiento mensual e integración con las herramientas que ya usás.</p>
          </div>
        </div>
      ),
    },
    {
      imageSrc: "/servicios-automation.jpg",
      title: "Automatizaciones",
      subtitle: "Servicio 02",
      content: (
        <div className="flex flex-col gap-5">
          <p>
            El trabajo repetitivo consume tiempo valioso. Lo mapeamos, lo entendemos y lo automatizamos para que tu equipo se enfoque en lo que realmente importa.
          </p>
          <p>
            Conectamos tus herramientas existentes, construimos flujos con n8n y Make, e integramos CRMs, pipelines de datos y comunicaciones. Todo medido por impacto real.
          </p>
          <div>
            <p className="text-[#1D1616] font-semibold mb-2">Para quién es</p>
            <p>Empresas con procesos manuales que consumen horas del equipo: prospección, reportes, onboarding, facturación, atención.</p>
          </div>
          <div>
            <p className="text-[#1D1616] font-semibold mb-2">Qué incluye</p>
            <p>Auditoría de procesos, diseño del flujo, implementación y retainer mensual de mantenimiento y mejora continua.</p>
          </div>
        </div>
      ),
    },
    {
      imageSrc: "/servicios-genai.jpg",
      title: "Contenido IA",
      subtitle: "Servicio 03",
      content: (
        <div className="flex flex-col gap-5">
          <p>
            La IA generativa ya produce contenido de marca de calidad profesional. Nosotros construimos el flujo técnico para que vos puedas generar foto y video consistentes, sin depender de productoras costosas.
          </p>
          <p>
            Establecemos los parámetros de tu marca, el posicionamiento del logo y las variantes de color. El resultado: campañas visuales escalables a una fracción del costo tradicional.
          </p>
          <div>
            <p className="text-[#1D1616] font-semibold mb-2">Para quién es</p>
            <p>Marcas que necesitan contenido visual frecuente para redes y campañas, sin los tiempos y costos de una producción tradicional.</p>
          </div>
          <div>
            <p className="text-[#1D1616] font-semibold mb-2">Qué incluye</p>
            <p>Configuración del flujo IA, primeras sesiones de contenido y capacitación para que tu equipo pueda operarlo de forma independiente.</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="servicios" className="bg-[#FAF6EE] py-24 lg:py-32 border-t border-[#1D1616]/8">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="mb-16 reveal">
          <p className="text-[#6E2C34] text-xs font-semibold uppercase tracking-[0.22em] mb-4">Servicios</p>
          <h2 className="text-[#1D1616] text-4xl sm:text-5xl font-bold tracking-tight">
            Tres servicios.<br />
            <span className="text-[#1D1616]/35">Un mismo acompañamiento.</span>
          </h2>
          <p className="text-[#1D1616]/50 mt-4 text-base max-w-lg">Clic en cada servicio para ver el detalle.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <ServiceCard {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────
function ProcessSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      tag: "DIAGNÓSTICO",
      dur: "1 sesión · gratis",
      title: "Mapeamos tu operación",
      desc: "Antes de proponer nada, entendemos. Analizamos cada proceso, identificamos fricciones reales y ordenamos las oportunidades por impacto concreto.",
      tags: ["Mapa de procesos", "Diagnóstico de herramientas", "Priorización por impacto"],
    },
    {
      tag: "DISEÑO",
      dur: "3 a 5 días",
      title: "Diseñamos la solución",
      desc: "Proponemos qué construir primero, con ROI proyectado y plan de implementación claro. Sin sorpresas de alcance.",
      tags: ["Arquitectura técnica", "ROI proyectado", "Plan de implementación"],
    },
    {
      tag: "DESARROLLO",
      dur: "2 a 6 semanas",
      title: "Construimos y desplegamos",
      desc: "El mismo equipo que diagnosticó construye la solución. Apps, automatizaciones y flujos de contenido conectados a tus herramientas actuales.",
      tags: ["Apps y webs", "Automatizaciones", "Integraciones"],
    },
    {
      tag: "CAPACITACIÓN",
      dur: "Permanente",
      title: "Acompañamos y capacitamos",
      desc: "No desaparecemos al entregar. Capacitación específica sobre lo que construimos para tu equipo. Soporte continuo y optimizaciones a medida que creces.",
      tags: ["Documentación interna", "Sesiones prácticas", "Soporte continuo"],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-step-idx"));
            setActiveIdx(idx);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
    );
    itemRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const railFillPct = (activeIdx / (steps.length - 1)) * 100;

  const scrollTo = useCallback((i: number) => {
    itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <section id="proceso" className="bg-[#FAF6EE] py-24 lg:py-32 border-t border-[#1D1616]/8">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 reveal">
          <p className="text-[#6E2C34] text-xs font-semibold uppercase tracking-[0.22em] mb-4">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#6E2C34] mr-2 align-middle" />
            02 / PROCESO
          </p>
          <h2 className="text-[#1D1616] text-4xl sm:text-5xl font-bold tracking-tight">
            Cuatro pasos.<br />
            <span className="text-[#1D1616]/30">Cero fricción.</span>
          </h2>
        </div>

        {/* Grid: left rail + right content */}
        <div className="grid lg:grid-cols-[200px_1fr] gap-16">

          {/* LEFT: rail + dots */}
          <div className="hidden lg:block relative">
            <div className="sticky top-32">
              {/* Rail line */}
              <div className="absolute left-5 top-5 bottom-5 w-px bg-[#1D1616]/10">
                <div
                  className="absolute top-0 left-0 w-full bg-[#6E2C34] transition-all duration-500 ease-out"
                  style={{ height: `${railFillPct}%` }}
                />
              </div>

              {/* Dots */}
              <div className="flex flex-col gap-12">
                {steps.map((step, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    className={`relative flex items-center gap-4 text-left transition-all duration-300 ${
                      i <= activeIdx ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    <div
                      className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 ${
                        i === activeIdx
                          ? "border-[#6E2C34] bg-[#6E2C34] text-[#FAF6EE]"
                          : i < activeIdx
                          ? "border-[#6E2C34] bg-[#FAF6EE] text-[#6E2C34]"
                          : "border-[#1D1616]/20 bg-[#FAF6EE] text-[#1D1616]/30"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                        i === activeIdx ? "text-[#6E2C34]" : "text-[#1D1616]/40"
                      }`}
                    >
                      {step.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: content panels */}
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => { itemRefs.current[i] = el; }}
                data-step-idx={i}
                className={`py-16 border-b border-[#1D1616]/8 transition-opacity duration-400 last:border-0 ${
                  i === activeIdx ? "opacity-100" : "opacity-30"
                }`}
              >
                {/* Mobile dot */}
                <div className="flex items-center gap-3 mb-6 lg:hidden">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold font-mono ${
                      i === activeIdx ? "border-[#6E2C34] bg-[#6E2C34] text-[#FAF6EE]" : "border-[#1D1616]/20 text-[#1D1616]/40"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className="flex flex-wrap items-baseline gap-4 mb-5">
                  <span
                    className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                      i === activeIdx ? "text-[#6E2C34]" : "text-[#1D1616]/30"
                    }`}
                  >
                    {step.tag}
                  </span>
                  <span className="text-[#1D1616]/35 text-xs">{step.dur}</span>
                </div>

                <div className="relative">
                  <h3 className="text-[#1D1616] text-3xl sm:text-4xl font-bold tracking-tight mb-5">
                    {step.title}
                  </h3>
                  <p className="text-[#1D1616]/60 text-base leading-relaxed mb-7 max-w-xl">
                    {step.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-3 py-1.5 rounded-full border border-[#1D1616]/10 text-[#1D1616]/50 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Big watermark number */}
                  <span
                    className="absolute right-0 top-0 text-[120px] font-black leading-none text-[#1D1616]/4 select-none pointer-events-none hidden sm:block"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Differentiation ──────────────────────────────────────────────────────────
const DIFF_CARDS = [
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    title: "Equipo propio",
    desc: "No subcontratamos. Quien audita, construye y mantiene tu solución es el mismo equipo de Kopfwerk.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
    ),
    title: "Priorizado por ROI",
    desc: "Construimos primero lo que más impacto genera. Cada decisión se justifica con números, no con intuición.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    ),
    title: "Software a medida",
    desc: "Agentes, automatizaciones e integraciones hechas para tu operación. Nada de plantillas genéricas.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
    ),
    title: "Mantenimiento incluido",
    desc: "Si no tenés equipo técnico, lo mantenemos y evolucionamos por vos. La solución sigue viva y mejorando.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5"/></svg>
    ),
    title: "Capacitación real",
    desc: "Formamos a tu equipo para que use y sostenga lo construido. No formación genérica: sobre tus propios sistemas.",
  },
];

const TABLE_ROWS = [
  { bad: "Automatizan sin entender el negocio", good: "Auditamos y priorizamos por ROI antes de construir" },
  { bad: "Detectan oportunidades pero no ejecutan", good: "Diseñamos y desarrollamos, no solo consultoría" },
  { bad: "Soluciones genéricas o plantillas", good: "Software a medida para tu operación real" },
  { bad: "Te dejan solo tras la entrega", good: "Mantenimiento y soporte si no tenés equipo técnico" },
  { bad: "Cobran sin medir el impacto", good: "Cada solución priorizada y medida por ROI" },
  { bad: "Crean dependencia del proveedor", good: "Capacitamos a tu equipo para usarlo y sostenerlo" },
];

function DifferentiationSection() {
  return (
    <section className="bg-[#1D1616] py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-14 reveal">
          <p className="text-[#6E2C34] text-xs font-semibold uppercase tracking-[0.22em] mb-4">Por qué Kopfwerk</p>
          <h2 className="text-[#FAF6EE] text-4xl sm:text-5xl font-bold tracking-tight">
            No somos otra consultora<br />
            <span className="text-[#FAF6EE]/30">que solo recomienda.</span>
          </h2>
          <p className="text-[#FAF6EE]/50 mt-5 text-base max-w-xl">
            La mayoría se queda en el diagnóstico o entrega plantillas genéricas. Auditamos, construimos y mantenemos, con equipo propio y todo priorizado por ROI.
          </p>
        </div>

        {/* Compare table */}
        <div className="reveal mb-16 rounded-2xl overflow-hidden border border-[#FAF6EE]/8">
          {/* Column headers */}
          <div className="grid grid-cols-2">
            <div className="px-6 py-4 bg-[#FAF6EE]/4 text-[#FAF6EE]/40 text-xs font-semibold uppercase tracking-[0.18em]">
              Otros proveedores
            </div>
            <div className="px-6 py-4 bg-[#6E2C34]/20 text-[#6E2C34] text-xs font-semibold uppercase tracking-[0.18em]">
              Kopfwerk
            </div>
          </div>
          {/* Rows */}
          {TABLE_ROWS.map((row, i) => (
            <div key={i} className="grid grid-cols-2 border-t border-[#FAF6EE]/5">
              <div className="px-6 py-4 flex items-start gap-3 bg-[#FAF6EE]/3">
                <svg className="shrink-0 mt-0.5" width="14" height="14" fill="none" stroke="#6E2C34" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                <span className="text-[#FAF6EE]/40 text-sm">{row.bad}</span>
              </div>
              <div className="px-6 py-4 flex items-start gap-3 bg-[#6E2C34]/8">
                <svg className="shrink-0 mt-0.5" width="14" height="14" fill="none" stroke="#FAF6EE" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="text-[#FAF6EE]/80 text-sm">{row.good}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Differentiator cards with motion */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIFF_CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative rounded-2xl border border-[#FAF6EE]/8 bg-[#FAF6EE]/4 p-6 overflow-hidden cursor-default"
              style={
                {
                  "--mx": "50%",
                  "--my": "50%",
                } as React.CSSProperties
              }
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
              }}
            >
              {/* Spotlight effect */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(200px circle at var(--mx) var(--my), rgba(110,44,52,0.12), transparent 70%)",
                }}
              />
              <div className="text-[#6E2C34] mb-4">{card.icon}</div>
              <h4 className="text-[#FAF6EE] font-semibold text-base mb-2">{card.title}</h4>
              <p className="text-[#FAF6EE]/50 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Cases ────────────────────────────────────────────────────────────────────
function CasesSection() {
  const cases = [
    {
      category: "Automatizaciones",
      work: "Integración CRM Odoo con n8n para una distribuidora de TV peruana. Pipeline de prospección con Clay.com y flujo de contenido para redes sociales.",
      metric: "—",
      metricLabel: "horas por semana de trabajo manual eliminado",
      /* PLACEHOLDER — reemplazar con métrica real */
    },
    {
      category: "Contenido IA",
      work: "Campaña de contenido generado con IA para marca de ropa deportiva. Flujo técnico para colocación de logo, variantes de color y adaptación de formatos.",
      metric: "—×",
      metricLabel: "de variantes generadas por sesión de campaña",
      /* PLACEHOLDER — reemplazar con métrica real */
    },
  ];

  return (
    <section id="casos" className="bg-[#FAF6EE] py-24 lg:py-32 border-t border-[#1D1616]/8">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="mb-16 reveal">
          <p className="text-[#6E2C34] text-xs font-semibold uppercase tracking-[0.22em] mb-4">Casos de trabajo</p>
          <h2 className="text-[#1D1616] text-4xl sm:text-5xl font-bold tracking-tight">
            Lo que ya está construido.
          </h2>
          <p className="text-[#1D1616]/45 mt-4 text-base max-w-lg">
            Dos proyectos reales. Métricas en proceso de documentación.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-[#1D1616]/8 rounded-2xl overflow-hidden">
          {cases.map((c, i) => (
            <div
              key={i}
              className="reveal bg-[#FAF6EE] p-10 flex flex-col gap-8"
            >
              <span className="self-start px-3 py-1 rounded-full border border-[#6E2C34]/20 text-[#6E2C34] text-xs font-semibold">
                {c.category}
              </span>
              <p className="text-[#1D1616]/65 text-sm leading-relaxed flex-1">{c.work}</p>
              <div className="pt-8 border-t border-[#1D1616]/8">
                <p className="text-[#1D1616] text-4xl font-black">
                  {c.metric}
                  {/* PLACEHOLDER — reemplazar con métrica real */}
                </p>
                <p className="text-[#1D1616]/35 text-xs mt-1">{c.metricLabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: "¿Con qué tipo de empresas trabajan?",
      a: "PYMEs y equipos pequeños que quieren usar IA en su operación real. No necesitás tener un equipo técnico interno. Lo que sí necesitás es claridad sobre qué problema querés resolver.",
    },
    {
      q: "¿Cuánto cuesta el diagnóstico inicial?",
      a: "El diagnóstico inicial es sin costo. Es una sesión de 30 minutos donde entendemos tu operación y te decimos honestamente si podemos ayudarte y cómo.",
    },
    {
      q: "¿Qué pasa si ya tenemos herramientas instaladas?",
      a: "Empezamos desde lo que ya tenés. La mayoría de los proyectos integran o mejoran herramientas existentes antes de agregar nuevas. No te pedimos reemplazar todo.",
    },
    {
      q: "¿Cuánto tiempo lleva ver resultados?",
      a: "Depende del alcance. Un flujo de automatización simple puede estar funcionando en 2 semanas. Un sistema integrado de mayor complejidad puede tomar 4 a 8 semanas. Lo definimos juntos en el diagnóstico.",
    },
    {
      q: "¿Trabajan solo con clientes en Alemania?",
      a: "No. Trabajamos en español con clientes en cualquier país. La mayoría de los proyectos son 100% remotos.",
    },
    {
      q: "¿Qué incluye el acompañamiento después de entregar?",
      a: "Soporte continuo, documentación actualizada y nuevas automatizaciones a medida que el negocio crece. Para clientes con retainer mensual esto está incluido.",
    },
  ];

  return (
    <section id="faq" className="bg-[#FAF6EE] py-24 lg:py-32 border-t border-[#1D1616]/8">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <div className="mb-16 reveal">
          <p className="text-[#6E2C34] text-xs font-semibold uppercase tracking-[0.22em] mb-4">FAQ</p>
          <h2 className="text-[#1D1616] text-4xl sm:text-5xl font-bold tracking-tight">
            Preguntas frecuentes.
          </h2>
        </div>

        <div className="space-y-px">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-[#1D1616]/8">
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-6 text-left group"
              >
                <span className="text-[#1D1616] font-semibold text-base group-hover:text-[#6E2C34] transition-colors">
                  {faq.q}
                </span>
                <svg
                  className="shrink-0 transition-transform duration-300 text-[#1D1616]/30"
                  style={{ transform: openIdx === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14" /><path d="M5 12h14" />
                </svg>
              </button>
              <div
                className="overflow-hidden transition-all duration-350"
                style={{ maxHeight: openIdx === i ? "400px" : "0" }}
              >
                <p className="pb-6 text-[#1D1616]/55 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Final ────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="bg-[#6E2C34] py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center reveal">
        <h2 className="text-[#FAF6EE] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Recuperá claridad,<br />control y tiempo.
        </h2>
        <p className="text-[#FAF6EE]/60 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
          El primer paso es entender si podemos ayudarte. Eso no cuesta nada.
        </p>
        <a
          href="https://tally.so/r/QKZeEp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-5 rounded-full bg-[#FAF6EE] text-[#1D1616] font-bold text-base hover:bg-[#EFD9A6] transition-colors"
        >
          Solicitar diagnóstico gratuito
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
        <p className="text-[#FAF6EE]/30 text-xs mt-8">Sin compromiso. Respuesta en 24h. 100% en español.</p>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#1D1616] border-t border-[#FAF6EE]/5 py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <Logo className="h-8 brightness-[10] mb-5" />
            <p className="text-[#FAF6EE]/35 text-sm leading-relaxed max-w-xs">
              Automatización, Apps y Contenido con IA. Auditoría, desarrollo y capacitación para empresas que quieren operar mejor.
            </p>
          </div>

          <div>
            <p className="text-[#FAF6EE]/25 text-xs font-semibold uppercase tracking-[0.2em] mb-5">Navegación</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Servicios", href: "#servicios" },
                { label: "Proceso", href: "#proceso" },
                { label: "Casos", href: "#casos" },
                { label: "FAQ", href: "#faq" },
                { label: "Tutoriales", href: "/tutorials" },
              ].map((l) => (
                <a key={l.href} href={l.href} className="text-[#FAF6EE]/40 hover:text-[#FAF6EE] text-sm transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[#FAF6EE]/25 text-xs font-semibold uppercase tracking-[0.2em] mb-5">Contacto</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:mauriciojaramillo146@gmail.com"
                className="text-[#FAF6EE]/40 hover:text-[#FAF6EE] text-sm transition-colors"
              >
                mauriciojaramillo146@gmail.com
              </a>
              <div className="flex gap-4 mt-2">
                <a href="https://www.instagram.com/kidealist_/" target="_blank" rel="noopener noreferrer" className="text-[#FAF6EE]/25 hover:text-[#FAF6EE] transition-colors text-sm">Instagram</a>
                <a href="https://www.linkedin.com/in/mauricio-jaramillo-4b214a2b7" target="_blank" rel="noopener noreferrer" className="text-[#FAF6EE]/25 hover:text-[#FAF6EE] transition-colors text-sm">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#FAF6EE]/5 pt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[#FAF6EE]/20 text-xs">© 2026 Kopfwerk.</p>
          <div className="flex gap-5">
            <a href="/impressum" className="text-[#FAF6EE]/20 hover:text-[#FAF6EE]/50 text-xs transition-colors">Impressum</a>
            <a href="/datenschutz" className="text-[#FAF6EE]/20 hover:text-[#FAF6EE]/50 text-xs transition-colors">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Announcement bar ─────────────────────────────────────────────────────────
function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="relative bg-[#6E2C34] text-[#FAF6EE] text-xs font-medium text-center py-3 px-10">
      Diagnóstico inicial sin costo. Primero entendemos, después construimos.
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FAF6EE]/50 hover:text-[#FAF6EE] text-xs"
        aria-label="Cerrar"
      >
        ✕
      </button>
    </div>
  );
}

// ─── Scroll reveal ────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal:not(.visible)").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function KopfwerkHome() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const alreadyLoaded = useRef(false);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("kw-loaded")) {
      setPreloaderDone(true);
      alreadyLoaded.current = true;
    } else {
      sessionStorage?.setItem("kw-loaded", "1");
    }
  }, []);

  useScrollReveal();

  return (
    <>
      {!preloaderDone && !alreadyLoaded.current && (
        <Preloader onDone={() => setPreloaderDone(true)} />
      )}

      <div style={{ opacity: preloaderDone ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <AnnouncementBar />
        <Navbar />
        <main>
          <Hero />
          <ProblemSection />
          <ServicesSection />
          <ProcessSection />
          <DifferentiationSection />
          <CasesSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}
