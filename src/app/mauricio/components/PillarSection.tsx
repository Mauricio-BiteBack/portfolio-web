import type { Pillar, Project } from "../data";
import { BrowserProjectCard } from "./BrowserProjectCard";
import { Reveal } from "./Reveal";

export function PillarSection({ pillar, projects }: { pillar: Pillar; projects: Project[] }) {
  return (
    <section id={pillar.key} className="scroll-mt-20 border-t border-black/10 px-6 lg:px-10 py-24 lg:py-36">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 lg:mb-20">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-2">
              <span className="outline-text font-display text-[3rem] sm:text-[4rem] leading-none">
                {pillar.index}
              </span>
              <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-black/45">
                {pillar.subtitle}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display leading-[0.85] mb-6" style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}>
              {pillar.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-black/60 max-w-xl">{pillar.intro}</p>
          </Reveal>
        </div>

        {projects.length > 0 && (
          <div>
            <Reveal className="mb-10">
              <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-black/40">Projekte</p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-20 lg:gap-y-24">
              {projects.map((p, i) => (
                <BrowserProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
