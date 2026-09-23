"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Reveal } from "./Reveal";

const PARAGRAPHS = [
  "Ich habe mit Grafikdesign angefangen und wollte das eigentlich in Lima studieren. Das Leben hatte andere Pläne: 2020 kam ich nach Deutschland, musste das Abitur noch einmal machen und bin mit einem eigenen Software-Business gescheitert, das ich allein aufbauen wollte. 2023 habe ich mich in Videografie, Marketing und Design weitergebildet, und genau dort habe ich das gefunden, was mich wirklich gepackt hat: Websites.",
  "Von da an ging es Schritt für Schritt weiter. Websites führten mich zu SEO, SEO zu digitalem Marketing, Marketing zu Content-Erstellung, und Content zu Automatisierung. Anfang 2025 kam KI dazu, und plötzlich ließ sich alles, was ich schon konnte, um ein Vielfaches schneller umsetzen.",
  "Heute baue ich meine eigene Personal Brand auf und eine Agentur, mit der ich drei Dinge anbiete: Websites und Apps, Automatisierungen und mit KI erstellten Content.",
];

// Begriffe, die als eigene Akzente hervorgehoben werden (fett, sofort sichtbar,
// mit einer Unterstreichung, die beim Scrollen einzeichnet).
const HIGHLIGHTS = ["Websites", "SEO", "KI", "Agentur"];

function cleanWord(raw: string) {
  return raw.replace(/[.,:;!?]+$/, "");
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const ctx = gsap.context(() => {
      const section = containerRef.current;
      if (!section) return;

      const imageBox = section.querySelector<HTMLElement>("[data-story-image]");
      const image = section.querySelector<HTMLElement>("[data-story-image] img");
      const paragraphEls = section.querySelectorAll<HTMLElement>("[data-story-text] p");

      if (imageBox && image) {
        gsap.fromTo(imageBox, { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: imageBox, start: "top 85%" } });
        gsap.fromTo(
          image,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: imageBox, start: "top bottom", end: "bottom top", scrub: 0.6 },
          }
        );
      }

      paragraphEls.forEach((p) => {
        const split = SplitText.create(p, { type: "words", wordsClass: "story-word" });

        split.words.forEach((wordEl) => {
          const clean = cleanWord(wordEl.textContent ?? "");
          if (HIGHLIGHTS.includes(clean)) {
            wordEl.classList.add("story-highlight");
            const line = document.createElement("span");
            line.className = "story-highlight-line";
            wordEl.appendChild(line);
            gsap.fromTo(
              line,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: { trigger: wordEl, start: "top 88%", end: "top 55%", scrub: 0.3 },
              }
            );
          } else {
            gsap.set(wordEl, { color: "rgba(10,10,10,0.2)" });
            gsap.to(wordEl, {
              color: "rgba(10,10,10,1)",
              ease: "none",
              scrollTrigger: { trigger: wordEl, start: "top 92%", end: "top 65%", scrub: 0.3 },
            });
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="border-t border-black/10">
      <section className="px-6 lg:px-10 py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-2">
              <span className="outline-text font-display text-[3rem] sm:text-[4rem] leading-none">00</span>
              <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-black/45">Persönlich</p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display leading-[0.85] mb-12 lg:mb-16" style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}>
              Über mich
            </h2>
          </Reveal>

          <div
            data-story-image
            className="relative w-full overflow-hidden rounded-2xl bg-black mb-14 lg:mb-20"
            style={{ aspectRatio: "16 / 9" }}
          >
            <Image
              src="/mauricio/hero/retrato-2000.webp"
              alt="Mauricio Jaramillo"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="grid lg:grid-cols-[200px_1fr] gap-10 lg:gap-16">
            <div />
            <div className="max-w-2xl">
              <div data-story-text className="flex flex-col gap-6">
                {PARAGRAPHS.map((p, i) => (
                  <p key={i} className="text-lg sm:text-xl leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              <Reveal delay={0.1} className="mt-10">
                <a
                  href="#categorias"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-black text-white px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] hover:bg-black/85 transition-colors"
                >
                  Das ist, was ich bisher gemacht habe
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover:translate-y-0.5">
                    <path d="M12 5v14m0 0-6-6m6 6 6-6" />
                  </svg>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
