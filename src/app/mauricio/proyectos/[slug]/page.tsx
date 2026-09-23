import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import { Reveal } from "../../components/Reveal";
import { ProjectToc } from "../../components/ProjectToc";
import { ToolIcons } from "../../components/ToolIcons";
import { ClipGrid } from "../../components/ClipGrid";
import { AutoplayVideo } from "../../components/AutoplayVideo";
import { IaGallery } from "../../components/IaGallery";
import { projects, pillars, getProject, getAdjacentProjects } from "../../data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} | Mauricio Jaramillo`,
    description: project.tagline,
  };
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const pillar = pillars.find((p) => p.key === project.pillar)!;
  const { prev, next } = getAdjacentProjects(project.slug);
  const [hero] = project.images;
  const [firstSummary] = project.summary;
  const isIaPillar = project.pillar === "ia";
  const iaGalleryImages = project.sections.flatMap((s) => s.images ?? []);

  const tocItems = [
    { id: "overview", label: "Übersicht" },
    ...project.sections.map((s) => ({ id: slugify(s.heading), label: s.heading })),
  ];

  return (
    <>
      <Nav />

      <article className="px-6 lg:px-10 pt-28 lg:pt-36">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <Link
              href={`/mauricio/categorias/${pillar.key}`}
              className="m-underline inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-black/50 hover:text-black transition-colors mb-10"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5m0 0 6 6m-6-6 6-6" />
              </svg>
              {pillar.title}
            </Link>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 pb-14 lg:pb-20">
            <Reveal>
              <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-black/45 mb-4">
                {pillar.subtitle}
              </p>
              <h1
                className="font-display leading-[0.86] mb-5"
                style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
              >
                {project.title}
              </h1>
              <p className="text-xl leading-snug text-black/60 max-w-lg">{project.tagline}</p>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col justify-end">
              <p className="text-lg leading-relaxed text-black/70 max-w-xl mb-6">{firstSummary}</p>
              {project.tags && project.tags.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-[11px] font-semibold uppercase tracking-[0.05em] text-black/50 border border-black/15 rounded-full px-3 py-1.5"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>
        </div>

        {hero && (
          <Reveal delay={0.05} className="w-full">
            <div className="relative w-full overflow-hidden bg-black/5" style={{ aspectRatio: "16 / 9" }}>
              <Image src={hero.src} alt={hero.alt} fill sizes="100vw" priority className="object-cover" />
            </div>
          </Reveal>
        )}

        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="flex flex-wrap gap-x-10 gap-y-6 py-12 lg:py-16 border-b border-black/10">
              {project.meta.map((m) => (
                <div key={m.label}>
                  <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-black/40 mb-1.5">
                    {m.label}
                  </p>
                  <p className="text-sm font-medium">{m.value}</p>
                </div>
              ))}
              {project.tools && project.tools.length > 0 && (
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-black/40 mb-2.5">
                    Tools
                  </p>
                  <ToolIcons tools={project.tools} />
                </div>
              )}
            </div>
          </Reveal>

          {isIaPillar ? (
            <div className="py-14 lg:py-20">
              <Reveal className="flex flex-col gap-4 max-w-2xl mb-14 lg:mb-20">
                {project.summary.map((p, i) => (
                  <p key={i} className="text-xl leading-relaxed text-black/75">
                    {p}
                  </p>
                ))}
                {project.sections.flatMap((s) => s.paragraphs).map((p, i) => (
                  <p key={i} className="text-base sm:text-lg leading-relaxed text-black/60">
                    {p}
                  </p>
                ))}
              </Reveal>

              <IaGallery images={iaGalleryImages} />
            </div>
          ) : (
          <div className="grid lg:grid-cols-[200px_1fr] gap-10 lg:gap-16 py-14 lg:py-20">
            <ProjectToc items={tocItems} />

            <div className="flex flex-col gap-16 lg:gap-24 max-w-2xl">
              <section id="overview" className="scroll-mt-28">
                <Reveal className="flex flex-col gap-5">
                  {project.summary.map((p, i) => (
                    <p key={i} className="text-lg leading-relaxed text-black/75">
                      {p}
                    </p>
                  ))}
                </Reveal>

                {project.outcomes && project.outcomes.length > 0 && (
                  <Reveal delay={0.08} className="mt-10">
                    <div
                      className={`grid gap-px bg-black/10 border border-black/10 ${
                        project.outcomes.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
                      }`}
                    >
                      {project.outcomes.map((o) => (
                        <div key={o.label} className="bg-white p-6 sm:p-8">
                          <p className="font-display leading-none mb-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>
                            {o.value}
                          </p>
                          <p className="text-sm text-black/55 leading-snug">{o.label}</p>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                )}
              </section>

              {project.sections.map((section) => (
                <section key={section.heading} id={slugify(section.heading)} className="scroll-mt-28 border-t border-black/10 pt-14 lg:pt-20">
                  <Reveal>
                    <h2 className="font-display text-3xl sm:text-4xl leading-none mb-6">{section.heading}</h2>
                  </Reveal>
                  <Reveal delay={0.06} className="flex flex-col gap-5">
                    {section.paragraphs.map((p, i) => (
                      <p key={i} className="text-base sm:text-lg leading-relaxed text-black/70">
                        {p}
                      </p>
                    ))}
                  </Reveal>
                  {section.walkthrough && (
                    <Reveal delay={0.1} className="mt-10">
                      <div className="rounded-xl overflow-hidden border border-black/10 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.25)]">
                        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-black/[0.04] border-b border-black/10">
                          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
                          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
                          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
                        </div>
                        <AutoplayVideo src={section.walkthrough.src} className="w-full block bg-black/5" />
                      </div>
                    </Reveal>
                  )}
                  {section.images && section.images.length > 0 && (
                    <div className="flex flex-col gap-8 mt-10">
                      {section.images.map((img, i) => (
                        <Reveal key={img.src} delay={0.06 * i}>
                          <div
                            className="relative w-full overflow-hidden rounded-xl border border-black/10 bg-black/[0.04] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.2)]"
                            style={{ aspectRatio: "3 / 2" }}
                          >
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              sizes="(max-width: 1024px) 100vw, 672px"
                              className="object-contain"
                            />
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  )}
                </section>
              ))}

              {project.externalUrl && (
                <div className="border-t border-black/10 pt-14 lg:pt-20">
                  <Reveal>
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-4 border border-black px-7 py-4 text-sm font-semibold uppercase tracking-[0.1em] hover:bg-black hover:text-white transition-colors duration-300"
                    >
                      {project.externalLabel ?? "Website ansehen"}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      >
                        <path d="M7 17 17 7M7 7h10v10" />
                      </svg>
                    </a>
                  </Reveal>
                </div>
              )}

              {project.video && (
                <div className="border-t border-black/10 pt-14 lg:pt-20">
                  <Reveal>
                    <video src={project.video.src} poster={project.video.poster} controls playsInline className="w-full bg-black" />
                  </Reveal>
                </div>
              )}

              {project.clips && project.clips.length > 0 && (
                <div className="border-t border-black/10 pt-14 lg:pt-20">
                  <Reveal className="mb-8">
                    <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-black/45">Content</p>
                  </Reveal>
                  <ClipGrid clips={project.clips} />
                </div>
              )}

            </div>
          </div>
          )}

          <div className="border-t border-black/10 py-10 grid grid-cols-2 gap-6">
            <Link href={`/mauricio/proyectos/${prev.slug}`} className="group">
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-black/40 mb-2">Zurück</p>
              <p className="font-display text-2xl sm:text-3xl leading-none m-underline inline-block">{prev.title}</p>
            </Link>
            <Link href={`/mauricio/proyectos/${next.slug}`} className="group text-right">
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-black/40 mb-2">Weiter</p>
              <p className="font-display text-2xl sm:text-3xl leading-none m-underline inline-block">{next.title}</p>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
