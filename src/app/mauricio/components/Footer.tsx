import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer id="contacto" className="scroll-mt-20 border-t border-black/10 px-6 lg:px-10 py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-black/45 mb-6">
            CV &amp; Kontakt
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-10">
          <Reveal delay={0.05}>
            <h2 className="font-display leading-[0.85] mb-8" style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}>
              Lass uns sprechen.
            </h2>
            <a
              href="/mauricio/cv/CV-Mauricio-Jaramillo.pdf"
              download
              className="group inline-flex items-center gap-4 border border-black px-7 py-4 text-sm font-semibold uppercase tracking-[0.1em] hover:bg-black hover:text-white transition-colors duration-300"
            >
              CV herunterladen
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              >
                <path d="M12 3v13m0 0-5-5m5 5 5-5M5 21h14" />
              </svg>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-black/45 mb-2">E-Mail</p>
                <a
                  href="mailto:mauriciojaramillo146@gmail.com"
                  className="m-underline font-display text-3xl sm:text-4xl break-all"
                >
                  mauriciojaramillo146@gmail.com
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 lg:mt-32 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13px] text-black/40 uppercase tracking-[0.1em]">
          <span>© {new Date().getFullYear()} Mauricio Jaramillo</span>
          <span>Webdesign · Social Media · Generative KI · Automatisierung</span>
        </div>
      </div>
    </footer>
  );
}
