"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

const CARDS = [
  { href: "/mauricio/proyectos/germanya-web", src: "/images/projects/websites/germanya.webp", alt: "Germanya", name: "Germanya", x: "6%", y: "16%", w: "12%", rotate: -4, side: "left" },
  { href: "/mauricio/proyectos/azaro", src: "/images/projects/content/azzaro-1.webp", alt: "Azaro", name: "Azaro", x: "84%", y: "13%", w: "10%", rotate: 5, side: "right" },
  { href: "/mauricio/proyectos/caso-mic", src: "/mic-clay.webp", alt: "MIC", name: "MIC", x: "3%", y: "50%", w: "9%", rotate: 3, side: "left" },
  { href: "/mauricio/proyectos/ayori", src: "/ayori-1.webp", alt: "Ayori", name: "Ayori", x: "89%", y: "46%", w: "11%", rotate: -3, side: "right" },
  { href: "/mauricio/proyectos/alberto-pla", src: "/images/projects/websites/albertopla.webp", alt: "Alberto Pla", name: "Alberto Pla", x: "8%", y: "78%", w: "13%", rotate: 4, side: "left" },
  { href: "/mauricio/proyectos/vicinity", src: "/images/projects/content/vicinity-1.webp", alt: "Vicinity", name: "Vicinity", x: "83%", y: "80%", w: "10%", rotate: -5, side: "right" },
];

const WORDS = ["Websites", "Social Media", "Generative KI", "Automatisierung"];
const MAX_TILT = 10;

export function Hero() {
  // trackRef: wrapper alto (200vh) que empuja el scroll. sectionRef: la
  // sección real, sticky (CSS puro) en vez del pin de GSAP — el pin
  // inserta un wrapper en el DOM que choca con React al desmontar el
  // Hero durante una navegación client-side (error de removeChild).
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Observer);

    const ctx = gsap.context((self) => {
      const section = self.selector as (sel: string) => Element[];

      // ── 1. Entrada: tarjetas y bloque de texto aparecen con stagger ──
      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      introTl
        .set(section(".hero-media-item"), { opacity: 0, y: 34, scale: 0.85 })
        .set(section("[data-hero-eyebrow], .hero-headline, [data-hero-desc], [data-hero-cta]"), {
          opacity: 0,
          y: 18,
        })
        .to(section(".hero-media-item"), { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.08 })
        .to(section("[data-hero-eyebrow]"), { opacity: 1, y: 0, duration: 0.6 }, "-=0.55")
        .to(section(".hero-headline"), { opacity: 1, y: 0, duration: 0.7 }, "-=0.45")
        .to(section("[data-hero-desc]"), { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
        .to(section("[data-hero-cta]"), { opacity: 1, y: 0, duration: 0.6 }, "-=0.45");

      // ── 2. Titular cíclico: slide vertical, el DOM lo controla GSAP ──
      let wordIndex = 0;
      const wordEl = wordRef.current;

      function cycleWord() {
        if (!wordEl) return;
        const next = WORDS[(wordIndex + 1) % WORDS.length];
        gsap.to(wordEl, {
          y: "-100%",
          opacity: 0,
          duration: 0.45,
          ease: "power2.in",
          onComplete: () => {
            wordEl.textContent = next;
            wordIndex = (wordIndex + 1) % WORDS.length;
            gsap.fromTo(wordEl, { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.45, ease: "power2.out" });
          },
        });
      }

      const wordInterval = setInterval(cycleWord, 2400);

      // ── 3. Salida por scroll: parallax + disolución en cascada ──
      // El timeline se normaliza a ~1 "unidad" de duración total, mapeada
      // 1:1 contra exactamente un alto de viewport de scroll (end += innerHeight),
      // así cada posición/duración se lee directamente como fracción del scroll.
      // Observer: velocidad de scroll → leve skew de profundidad en las tarjetas
      let scrollVelocity = 0;
      const observer = Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        onChangeY: (self) => {
          scrollVelocity = self.deltaY;
        },
      });

      const exitTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: () => {
            const skew = gsap.utils.clamp(-6, 6, scrollVelocity / 20);
            gsap.to(section("[data-hero-media-layer]"), {
              skewY: skew,
              duration: 0.4,
              ease: "power3.out",
              overwrite: "auto",
            });
          },
        },
      });

      section(".hero-media-item").forEach((item, i) => {
        const card = CARDS[i];
        const distance = card?.side === "left" ? -90 : 110;
        exitTl.to(item, { y: distance, opacity: 0.04, scale: 0.94, duration: 0.65 }, 0.08 + i * 0.025);
      });

      exitTl
        .to(section("[data-hero-eyebrow]"), { opacity: 0, y: -16, duration: 0.3 }, 0)
        .to(section("[data-hero-desc]"), { opacity: 0, y: -16, duration: 0.35 }, 0.08)
        .to(section(".hero-headline"), { opacity: 0, y: -12, duration: 0.35 }, 0.58)
        .to(section("[data-hero-cta]"), { opacity: 0, y: -12, duration: 0.35 }, 0.65);

      // ── 4. Tilt 3D al hover, con sombra desplazada en sentido opuesto ──
      const tiltHandlers: { el: Element; move: (e: Event) => void; leave: () => void }[] = [];

      section("[data-hero-tilt]").forEach((card) => {
        const visual = card.querySelector("[data-hero-tilt-inner]");
        const shade = card.querySelector("[data-hero-shade]");
        if (!visual) return;

        gsap.set(visual, { transformPerspective: 600, transformStyle: "preserve-3d" });

        const move = (e: Event) => {
          const evt = e as PointerEvent;
          const rect = visual.getBoundingClientRect();
          const px = (evt.clientX - rect.left) / rect.width;
          const py = (evt.clientY - rect.top) / rect.height;
          const rotateY = (px - 0.5) * MAX_TILT * 2;
          const rotateX = (0.5 - py) * MAX_TILT * 2;

          gsap.to(visual, { rotateX, rotateY, duration: 0.4, ease: "power2.out" });
          if (shade) {
            gsap.to(shade, { x: (px - 0.5) * -24, y: (py - 0.5) * -24, opacity: 0.4, duration: 0.4, ease: "power2.out" });
          }
        };

        const leave = () => {
          gsap.to(visual, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
          if (shade) gsap.to(shade, { x: 0, y: 0, opacity: 0, duration: 0.6, ease: "power3.out" });
        };

        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        tiltHandlers.push({ el: card, move, leave });
      });

      // Las imágenes cargan de forma asíncrona y pueden alterar el alto de
      // la página después del primer cálculo de ScrollTrigger; recalculamos
      // una vez que termina de cargar para que el rango de scroll sea el real.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const refreshTimeout = setTimeout(refresh, 1200);

      return () => {
        window.removeEventListener("load", refresh);
        clearTimeout(refreshTimeout);
        clearInterval(wordInterval);
        observer.kill();
        tiltHandlers.forEach(({ el, move, leave }) => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      };
    }, trackRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={trackRef} className="relative" style={{ height: "calc(100svh + 100vh)" }}>
    <section ref={sectionRef} className="home-hero sticky top-0 min-h-[100svh] flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <div className="hero-media-layer absolute inset-0 pointer-events-none" data-hero-media-layer>
        {CARDS.map((c) => (
          <div
            key={c.href}
            className="hero-media-item absolute hidden sm:block"
            data-hero-tilt
            style={{ left: c.x, top: c.y, width: c.w, willChange: "transform, opacity" }}
          >
            <Link
              href={c.href}
              className="hero-media-item-visual group block relative overflow-hidden rounded-xl border border-black/10 bg-black/5 pointer-events-auto"
              data-hero-tilt-inner
              style={{ aspectRatio: "4 / 3", boxShadow: "0 24px 48px -20px rgba(0,0,0,0.18)", transform: `rotate(${c.rotate}deg)` }}
            >
              <Image src={c.src} alt={c.alt} fill sizes="16vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
              <span
                className="hero-media-item-shade absolute pointer-events-none opacity-0"
                data-hero-shade
                style={{
                  inset: "-20%",
                  background: "radial-gradient(circle at center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 60%)",
                }}
              />
            </Link>
            <p className="mt-2.5 text-center text-[11px] font-medium tracking-[0.04em] text-black/45">{c.name}</p>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p data-hero-eyebrow className="text-[13px] font-medium uppercase tracking-[0.2em] text-black/50 mb-5">
          Mauricio Jaramillo, Portfolio für
        </p>

        <h1 className="hero-headline font-display leading-[0.86]" style={{ fontSize: "clamp(2.8rem, 8.5vw, 6.5rem)" }}>
          <span className="inline-block overflow-hidden align-top" style={{ height: "1.08em", lineHeight: "1.08em" }}>
            <span ref={wordRef} className="block whitespace-nowrap">
              {WORDS[0]}
            </span>
          </span>
        </h1>

        <p data-hero-desc className="mt-7 text-lg sm:text-xl leading-relaxed text-black/65 max-w-xl mx-auto">
          Das hier zeigt alles, was ich mache: Design, Content, KI und Systeme für echte Kunden.
        </p>

        <div data-hero-cta className="mt-9">
          <a
            href="#categorias"
            className="group inline-flex items-center gap-2.5 rounded-full bg-black text-white px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] hover:bg-black/85 transition-colors"
          >
            Zur Arbeit
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover:translate-y-0.5">
              <path d="M12 5v14m0 0-6-6m6 6 6-6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
    </div>
  );
}
