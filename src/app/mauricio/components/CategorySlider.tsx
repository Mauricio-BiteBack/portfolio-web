"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pillars } from "../data";

/* Traduce la distancia entre una tarjeta y el índice activo continuo a sus
   valores visuales: 0 → centrada, 1 → 64vh de offset, 2+ → 122vh.
   Todo interpolado, así el movimiento es fluido y no un salto discreto. */
function cardStateForDistance(dist: number) {
  const dir = dist === 0 ? 0 : Math.sign(dist);
  const absDist = Math.abs(dist);

  let yVh: number;
  let scale: number;
  let opacity: number;

  if (absDist <= 1) {
    yVh = gsap.utils.interpolate(0, 64, absDist);
    scale = gsap.utils.interpolate(1, 0.92, absDist);
    opacity = gsap.utils.interpolate(1, 0, absDist);
  } else if (absDist <= 2) {
    const t = absDist - 1;
    yVh = gsap.utils.interpolate(64, 122, t);
    scale = gsap.utils.interpolate(0.92, 0.86, t);
    opacity = 0;
  } else {
    yVh = 122;
    scale = 0.86;
    opacity = 0;
  }

  return {
    yVh: yVh * dir,
    scale,
    opacity,
    visible: absDist < 2.15,
    active: absDist < 0.5,
  };
}

const NUM_CARDS = pillars.length;

export function CategorySlider() {
  // El track alto empuja el scroll; el wrapper sticky adentro se queda
  // clavado en pantalla mientras tanto — es CSS puro (position: sticky),
  // no el pin de GSAP, para no pelear con React al desmontar la página
  // durante una navegación client-side (evita el error de removeChild).
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context((self) => {
      const section = self.selector as (sel: string) => HTMLElement[];
      const cards = section("[data-slider-card]");
      const dots = section("[data-slider-dot]");
      const videos = section("[data-slider-video]") as unknown as HTMLVideoElement[];

      // Los navegadores a veces ignoran el atributo autoplay si el video
      // todavía no está "visible" en el momento del mount (la tarjeta arranca
      // fuera de posición hasta que GSAP la centra) — se fuerza .play() acá.
      videos.forEach((v) => v.play().catch(() => {}));

      function render(rawIndex: number) {
        cards.forEach((card, i) => {
          const dist = i - rawIndex;
          const state = cardStateForDistance(dist);

          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            y: `${state.yVh}vh`,
            scale: state.scale,
            opacity: state.opacity,
            pointerEvents: state.active ? "auto" : "none",
            visibility: state.visible ? "visible" : "hidden",
            zIndex: 100 - Math.round(Math.abs(dist) * 10),
          });

          if (state.active && videos[i]?.paused) videos[i].play().catch(() => {});
        });

        const activeDot = Math.round(gsap.utils.clamp(0, NUM_CARDS - 1, rawIndex));
        dots.forEach((dot, i) => dot.classList.toggle("is-active", i === activeDot));
      }

      render(0);

      ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self2) => render(self2.progress * (NUM_CARDS - 1)),
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={trackRef}
      id="categorias"
      className="relative border-t border-black/10 scroll-mt-20"
      style={{ height: `calc(${NUM_CARDS - 1} * 90vh + 100vh)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute right-5 lg:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {pillars.map((p) => (
            <span
              key={p.key}
              data-slider-dot
              className="block h-[7px] w-[7px] rounded-full bg-black/15 transition-all duration-300 [&.is-active]:bg-black [&.is-active]:scale-[1.4]"
            />
          ))}
        </div>

        {pillars.map((pillar) => (
          <article
            key={pillar.key}
            data-slider-card
            className="absolute top-1/2 left-1/2 w-[92vw] max-w-[1180px] rounded-3xl border border-black/10 bg-white p-7 sm:p-10 lg:p-14 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.18)] grid grid-cols-1 lg:grid-cols-[0.95fr_1.1fr] gap-8 lg:gap-14 items-center will-change-transform"
          >
            <div className="flex flex-col gap-7">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-baseline gap-3.5">
                  <span className="font-display text-[15px] tracking-[0.1em] text-black/35">
                    {pillar.index}
                  </span>
                  <h2 className="font-display leading-none" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}>
                    {pillar.title}
                  </h2>
                </div>
                <Link
                  href={`/mauricio/categorias/${pillar.key}`}
                  className="text-[13px] font-semibold uppercase tracking-[0.08em] border border-black/70 rounded-full px-5 py-2.5 whitespace-nowrap hover:bg-black hover:text-white transition-colors"
                >
                  Alle Arbeiten ansehen →
                </Link>
              </div>

              <div>
                <p className="text-black/65 leading-relaxed max-w-[46ch]">{pillar.intro}</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-black/5" style={{ aspectRatio: "4 / 3" }}>
              <video
                data-slider-video
                src={pillar.video}
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
