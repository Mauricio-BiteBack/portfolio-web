import Link from "next/link";

const TUTORIALS = [
  {
    slug: "token-efficient",
    title: "Token Efficient — Die 8 Regeln für agentes Arbeiten mit Claude",
    description:
      "Wie Claude Code arbeitet ohne zu verschwenden: erst lesen, dann schreiben; bearbeiten statt neu schreiben; testen vor 'fertig sagen'.",
    difficulty: "Anfänger",
    tags: ["#token-optimierung", "#best-practices", "#claude-code"],
  },
  {
    slug: "stop-slop",
    title: "Stop Slop — KI-Sprachmuster aus deutschen Texten entfernen",
    description:
      "Ein Skill, der verbotene Phrasen, strukturelle Klischees und roboterhafte Rhythmen aus deinen Texten streicht. Claude lernt, wie echter Text klingt.",
    difficulty: "Anfänger",
    tags: ["#ki-text", "#claude-skill", "#deutsch"],
  },
  {
    slug: "claude-animation",
    title: "KI-Animationen mit Claude Code — in 20 Minuten",
    description:
      "Claude Code setzt deine Anweisungen live in Sekunden um. Kein Vorwissen nötig. Ich habe diese Animation in 20 Minuten gebaut, du auch.",
    difficulty: "Anfänger",
    tags: ["#animationen", "#remotion", "#kein-vorwissen"],
  },
  {
    slug: "claude-code-schneiden",
    title: "Videos bearbeiten mit KI — Editor Pro Max",
    description:
      "Verwandelt Claude Code in ein vollständiges Videostudio. Du beschreibst auf Deutsch was du willst — Claude baut es. Kein After Effects, alles lokal.",
    difficulty: "Anfänger",
    tags: ["#video-editing", "#remotion", "#open-source"],
  },
  {
    slug: "clip-videos",
    title: "Automatische Clips aus YouTube-Videos mit Mosaic API",
    description:
      "Lade ein YouTube-Video, bekomme 5 automatisch zugeschnittene Clips für TikTok. Kein Videoschnittprogramm nötig.",
    difficulty: "Anfänger",
    tags: ["#youtube", "#mosaic-api", "#social-media"],
  },
  {
    slug: "whatsapp-agentkit",
    title: "WhatsApp AgentKit — dein eigener Chatbot in 30 Minuten",
    description:
      "Baue deinen eigenen WhatsApp-Agenten mit KI in weniger als 30 Minuten. Claude Code schreibt den gesamten Code für dich.",
    difficulty: "Anfänger",
    tags: ["#whatsapp", "#chatbot", "#claude-code"],
  },
  {
    slug: "scraping-mit-claude",
    title: "ScrapeGraphAI: Web-Scraping direkt in Claude Code",
    description:
      "26.000 Stars auf GitHub, MIT-Lizenz. Das Muster ist simpel: Seite laden, bereinigen, LLM fragt was du willst, speichern. Claude hat alles eingebaut.",
    difficulty: "Fortgeschrittener",
    tags: ["#web-scraping", "#scrapegraphai", "#datenextraktion"],
  },
  {
    slug: "cowork-meistern",
    title: "Cowork meistern — Claudes Arbeitspartner auf deinem Desktop",
    description:
      "Cowork ist Claude in der Desktop-App. Er liest dein Gmail, sieht deinen Kalender, bewegt Dinge in Notion und arbeitet während du schläfst.",
    difficulty: "Fortgeschrittener",
    tags: ["#desktop-app", "#cowork", "#automation"],
  },
  {
    slug: "app-skalieren",
    title: "Deine App schafft 10 Nutzer. Und 1000? Der Scaling Cliff mit Claude überwinden",
    description:
      "Mit drei Fixes — Indexing, Caching, Async — machst du deine App bereit für tausend Nutzer, ohne selbst eine Zeile anzufassen.",
    difficulty: "Fortgeschrittener",
    tags: ["#skalierung", "#postgres", "#load-testing"],
  },
  {
    slug: "von-demo-zu-verkauf",
    title: "Von Demo zu verkaufbar: Die 10 Schichten für deine KI-App",
    description:
      "Eine App schön aussehen lassen ist leicht — sie zu verkaufen ist anders. Diese 10 Schichten trennen Spielzeug von Produkten, für die Menschen zahlen.",
    difficulty: "Fortgeschrittener",
    tags: ["#production-ready", "#security", "#deployment"],
  },
];

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#37352F]">
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-28 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:py-12">

          {/* Header */}
          <header className="mb-8 sm:mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              @kidealist
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-[#23211d] sm:text-5xl">
              Tutorials
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#5B5851] sm:text-lg sm:leading-8">
              Schritt-für-Schritt-Anleitungen für Claude Code, KI-Tools und Automatisierung — auf Deutsch, direkt anwendbar.
            </p>
          </header>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-3 gap-3 text-center sm:mb-10">
            <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-3">
              <p className="text-2xl font-bold text-[#23211d]">{TUTORIALS.length}</p>
              <p className="text-xs text-[#8B8B85]">Tutorials</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
              <p className="text-2xl font-bold text-emerald-900">
                {TUTORIALS.filter((t) => t.difficulty === "Anfänger").length}
              </p>
              <p className="text-xs text-emerald-700">Anfänger</p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
              <p className="text-2xl font-bold text-amber-900">
                {TUTORIALS.filter((t) => t.difficulty === "Fortgeschrittener").length}
              </p>
              <p className="text-xs text-amber-700">Fortgeschrittener</p>
            </div>
          </div>

          {/* Guide list */}
          <div className="overflow-hidden rounded-xl border border-[#E6E6E4]">
            {TUTORIALS.map((tutorial) => (
              <Link
                key={tutorial.slug}
                href={`/tutorials/${tutorial.slug}`}
                className="group flex items-start gap-3 border-b border-[#E6E6E4] px-4 py-4 transition-colors last:border-b-0 hover:bg-[#FAFAF8] sm:gap-4 sm:px-5"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#E6E6E4] bg-white text-[#5d5a53]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start gap-2">
                    <h3 className="text-[15px] font-semibold leading-snug text-[#2a2822] group-hover:text-[#1E1D1A]">
                      {tutorial.title}
                    </h3>
                    <span className="mt-0.5 hidden shrink-0 rounded-full border border-[#E3E1DA] bg-white px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#8B8B85] sm:inline-block">
                      tutorial
                    </span>
                    <span
                      className={`mt-0.5 hidden shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider sm:inline-block ${
                        tutorial.difficulty === "Anfänger"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-amber-200 bg-amber-50 text-amber-700"
                      }`}
                    >
                      {tutorial.difficulty}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-[#5f5b53]">
                    {tutorial.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {tutorial.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#E3E1DA] bg-white px-2 py-0.5 text-[11px] font-medium text-[#6a665f]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-2 shrink-0 text-[#B4B2AB] transition-colors group-hover:text-[#5d5a53]" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
              </Link>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
