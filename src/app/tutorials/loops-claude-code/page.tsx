"use client";

import { useState } from "react";

const PROMPT_ZIEL_MESSBAR = `Ich will einen /loop aufsetzen aber mein Ziel ist vage und ich weiß nicht ob Claude merkt wann er fertig ist. Mein Ziel ist: \u00ABschreib hier dein Ziel, z.B.: prüfen ob meine Landing Page gut ist\u00BB. Schreib es als messbares Ziel um: mit einer konkreten Zahl oder Liste, die Claude in jedem Durchlauf zählen und prüfen kann. Gib mir 2 Versionen (eine strenger, eine lockerer), erkläre in einer Zeile wie Claude weiß dass er fertig ist, und sag mir ob ich eher einen /loop im dynamischen Modus oder den Befehl /goal für dieses Ziel nehmen sollte.`;

const PROMPT_LOOP_MD = `Schau dir dieses Projekt an und schreib eine Datei .claude/loop.md mit meiner Wartungsroutine für den Befehl /loop. Nimm nur Prüfungen die hier Sinn ergeben: Tests ausführen falls vorhanden, Lint- oder Typfehler prüfen, neue TODOs suchen, und mich nur informieren wenn etwas meine Aufmerksamkeit braucht. Halt es kurz und auf Deutsch, und erkläre mir in 2 Sätzen wie /loop diese Datei nutzt wenn ich ihn ohne Argumente ausführe.`;

const PROMPT_EIGENE_LOOPS = `Ich will mit /loop anfangen, weiß aber nicht welche Loops für mich passen. Stell mir 5 kurze Fragen zu meiner Arbeit (womit ich mich beschäftige, was ich täglich manuell prüfe, was ich vergesse zu checken, welche Tools ich verbunden hab, welches Projekt gerade offen ist). Mit meinen Antworten schlag mir 5 konkrete Loops vor: für jeden die genaue /loop-Zeile zum Kopieren, ob festes Intervall oder dynamischer Modus (ohne Zeit) besser passt und warum, und markier ob einer besser als /schedule aufgesetzt wäre weil er laufen muss wenn mein Computer aus ist.`;
import {
  ChevronRight,
  Copy,
  Repeat,
  Zap,
  Timer,
  Sparkles,
  Target,
  FileText,
  Hand,
  ShieldAlert,
  Cloud,
  Lightbulb,
  Compass,
  User,
  Bot,
  Quote,
  ExternalLink,
  Gauge,
  Eye,
  Monitor,
  CalendarClock,
  Layers,
  Hourglass,
  MessageCircle,
  Terminal,
  Network,
} from "lucide-react";

function CopyButton({ text, label = "Kopieren" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className="inline-flex shrink-0 items-center gap-2 rounded-md border border-[#DFDFDC] bg-white px-3 py-1.5 text-xs font-medium text-[#37352F] transition-colors hover:bg-[#F1F1EE]"
    >
      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
      {copied ? "Kopiert!" : label}
    </button>
  );
}

const SECTIONS = [
  { id: "umschwung", label: "Das Umdenken", num: "01", Icon: Repeat },
  { id: "erster-loop", label: "Dein erster Loop", num: "02", Icon: Zap },
  { id: "intervall", label: "Intervall-Modus", num: "03", Icon: Timer },
  { id: "dynamisch", label: "Dynamischer Modus", num: "04", Icon: Sparkles },
  { id: "ziel", label: "Das messbare Ziel", num: "05", Icon: Target },
  { id: "loop-md", label: "loop.md", num: "06", Icon: FileText },
  { id: "stoppen", label: "Stopp-Optionen", num: "07", Icon: Hand },
  { id: "grenzen", label: "Echte Grenzen", num: "08", Icon: ShieldAlert },
  { id: "vs-schedule", label: "/loop vs /schedule", num: "09", Icon: Cloud },
  { id: "ideen", label: "Loop-Ideen", num: "10", Icon: Lightbulb },
  { id: "faq", label: "Häufige Fragen", num: "11", Icon: Compass },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function LoopsClaudeCodePage() {
  const [activeTab, setActiveTab] = useState("umschwung");

  function handleTabClick(id: string) {
    setActiveTab(id);
    scrollTo(id);
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#37352F]">
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-5xl px-4 pb-28 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:py-12">

          {/* Breadcrumb */}
          <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#8B8B85]">
            <a className="transition-colors hover:text-[#37352F]" href="/tutorials">
              tutorials
            </a>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span className="font-medium text-[#37352F]">Loops in Claude Code</span>
          </div>

          {/* Header */}
          <header className="mb-8 sm:mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-[#23211d] sm:text-5xl">
              Loops in Claude Code: Hör auf, Prompts zu schreiben — fang an, Loops zu schreiben
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#5B5851] sm:text-lg sm:leading-8">
              Boris Cherny, der Erfinder von Claude Code, schreibt Claude keine Prompts mehr: Er hat Loops laufen, die das für ihn erledigen. Du kannst heute damit starten — mit einer einzigen Zeile:{" "}
              <strong className="text-[#37352F]">
                /loop 10m prüf ob meine Website noch läuft und sag mir Bescheid wenn was kaputt geht
              </strong>{" "}
              — und Claude wiederholt das von alleine, ohne dass du ihn nochmal fragen musst. Hier sind die drei verifizierten Modi, wie du ihn stoppst, die ehrlichen Grenzen und 12 fertige Loops zum Kopieren.
            </p>
          </header>

          {/* Overview grid */}
          <div className="mb-6 sm:mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              Auf einen Blick
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SECTIONS.map(({ id, label, num, Icon }) => (
                <div
                  key={id}
                  className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-xs text-[#8B8B85]">{num}</span>
                    <Icon className="h-4 w-4 text-[#37352F]" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold leading-5 text-[#37352F]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary card */}
          <div className="mb-8 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:mb-10 sm:p-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                das umdenken · erster loop · intervall · dynamisch · ziel · loop.md · stoppen · grenzen · vs /schedule · ideen · faq
              </p>
              <p className="text-sm font-semibold text-[#37352F]">Ein Loop ist ein Prompt, der sich selbst wiederholt</p>
              <p className="max-w-3xl text-sm leading-6 text-[#5B5851]">
                Bisher fängt alles, was Claude für dich macht, damit an, dass du tippst. Ein Loop dreht das um: Du sagst einmal, was geprüft werden soll und wie oft — oder lässt Claude selbst entscheiden — und er arbeitet, während du was anderes machst. Diese Anleitung deckt die drei offiziell dokumentierten Modi von /loop ab, wie du ihn abbrichst, die echten Grenzen die du vorher kennen solltest, und den ehrlichen Vergleich mit /schedule, dem Cloud-Bruder.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {SECTIONS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => handleTabClick(id)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E6E6E4] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#37352F] transition-colors hover:bg-[#F1F1EE]"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#E6E6E4] pt-3">
              {[
                "Alle 3 Modi verifiziert",
                "12 fertige Loops",
                "Ziel braucht Zahl oder Liste",
                "Dynamischer Modus stoppt selbst",
                "3 Wege zum Stoppen",
                "Ehrliche Grenzen: lokal, 7 Tage, 50 Tasks",
                "/loop vs /schedule",
                "Gegen offizielle Docs geprüft",
                "Auch ohne Programmierkenntnisse",
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-medium text-[#7A7A72]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Desktop tab nav */}
          <nav className="mb-8 hidden sm:mb-10 sm:grid sm:grid-cols-6">
            {SECTIONS.slice(0, 6).map(({ id, label, num }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleTabClick(id)}
                className={`rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  activeTab === id
                    ? "bg-[#EBEBEA] font-semibold text-[#1f1e1a]"
                    : "text-[#66635D] hover:bg-[#EFEFED]"
                }`}
              >
                <span className="mr-2 font-mono text-xs text-[#8B8B85]">{num}</span>
                {label}
              </button>
            ))}
          </nav>

          {/* Sections */}
          <div className="space-y-14">

            {/* 01 Das Umdenken */}
            <section id="umschwung" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                01 das umdenken
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Du schreibst jeden Prompt selbst — er nicht mehr
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>
                  Stell dir mal vor, wie du heute mit Claude arbeitest: Du überlegst dir den Auftrag, tippst ihn, wartest, schaust drüber und fängst wieder von vorne an. Du bist der Motor — wenn du nicht tippst, passiert gar nichts. Die Analogie aus dem Video trifft es gut: Heute bist du der Chef, der seinem Mitarbeiter jeden Schritt diktiert. Mit Loops bleibst du Chef, aber einer der die Routine einmal festlegt und dann vertraut, dass sie läuft.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <User className="h-4 w-4 text-[#37352F]" aria-hidden="true" />
                      <p className="text-sm font-semibold text-[#37352F]">Ohne Loops: du dikierst jeden Schritt</p>
                    </div>
                    <p className="text-sm leading-6 text-[#5B5851]">
                      Jeder Task fängt damit an, dass du tippst. Du fragst, wartest, prüfst, fragst nochmal. Claude ist brillant — aber er arbeitet nur, wenn du schreibst. Und deine Zeit ist das Limit von allem.
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <Bot className="h-4 w-4 text-[#37352F]" aria-hidden="true" />
                      <p className="text-sm font-semibold text-[#37352F]">Mit Loops: du legst die Routine fest</p>
                    </div>
                    <p className="text-sm leading-6 text-[#5B5851]">
                      Du sagst einmal, was er prüfen soll und wie oft — und Claude wiederholt es, ohne dass du ihn daran erinnern musst. Wie ein zuverlässiger Mitarbeiter: Du gibst den Auftrag und kümmerst dich um was anderes.
                    </p>
                  </div>
                </div>

                {/* Boris Cherny quote */}
                <div className="rounded-xl border border-[#E7D9C8] bg-[#FBF6EF] p-4 sm:p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Quote className="h-4 w-4 text-[#B26B2E]" aria-hidden="true" />
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B26B2E]">
                      Boris Cherny, Erfinder von Claude Code
                    </p>
                  </div>
                  <blockquote className="text-base font-semibold leading-7 text-[#37352F] sm:text-lg sm:leading-8">
                    „Ich schreibe Claude keine Prompts mehr. Ich habe Loops laufen, die Claude für mich prompten und entscheiden, was zu tun ist. Meine Aufgabe ist es, Loops zu schreiben."
                  </blockquote>
                  <p className="mt-3 text-xs leading-5 text-[#8B8B85]">
                    Eigene Übersetzung. Im englischen Original:{" "}
                    <em>
                      &quot;I don&apos;t prompt Claude anymore. I have loops running that prompt Claude and figuring out what to do. My job is to write loops.&quot;
                    </em>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-[#E7D9C8] pt-3">
                    <a
                      href="https://www.theneuron.ai/explainer-articles/claude-code-creators-boris-cherny-and-cat-wu-explain-how-to-use-agent-loops/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#E7D9C8] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#37352F] transition-colors hover:bg-[#F1F1EE]"
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      The Neuron
                    </a>
                    <a
                      href="https://www.productmarketfit.tech/p/stop-prompting-ai-and-start-building"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#E7D9C8] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#37352F] transition-colors hover:bg-[#F1F1EE]"
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      Product Market Fit
                    </a>
                  </div>
                </div>

                <p>
                  Dieser Satz fasst die ganze Anleitung zusammen: Das Ziel ist nicht, bessere Prompts zu schreiben — sondern dahin zu kommen, dass du kaum noch welche schreiben musst.
                </p>
              </div>
            </section>

            {/* 02 Dein erster Loop */}
            <section id="erster-loop" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                02 dein erster loop
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Eine Zeile — und er läuft
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>
                  Kein Setup, kein Panel, keine Datei zum Bearbeiten. Ein Loop braucht eine einzige Zeile in Claude Code — und die hat drei Teile:
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                    <code className="inline-block rounded bg-[#171717] px-2 py-0.5 font-mono text-xs text-zinc-100">
                      /loop
                    </code>
                    <p className="mt-2 text-sm font-semibold text-[#37352F]">Der Befehl</p>
                    <p className="mt-1 text-sm leading-6 text-[#5B5851]">
                      Signalisiert Claude, dass das kein normaler Prompt ist — sondern eine Aufgabe, die er selbst wiederholt.
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                    <code className="inline-block rounded bg-[#171717] px-2 py-0.5 font-mono text-xs text-zinc-100">
                      10m
                    </code>
                    <p className="mt-2 text-sm font-semibold text-[#37352F]">Das Intervall (optional)</p>
                    <p className="mt-1 text-sm leading-6 text-[#5B5851]">
                      Wie oft er wiederholt: 30s, 10m, 2h, 1d. Lässt du das weg, entscheidet Claude selbst — das ist der dynamische Modus, weiter unten.
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                    <code className="inline-block rounded bg-[#171717] px-2 py-0.5 font-mono text-xs text-zinc-100">
                      der task
                    </code>
                    <p className="mt-2 text-sm font-semibold text-[#37352F]">Was du willst, auf Deutsch</p>
                    <p className="mt-1 text-sm leading-6 text-[#5B5851]">
                      Schreib es, wie du&apos;s einer Person sagen würdest: „prüf ob meine Website noch läuft und sag mir Bescheid wenn was kaputt geht". Kein Code, keine Sondersyntax.
                    </p>
                  </div>
                </div>

                <div className="min-w-0 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                  <p className="mb-3 text-sm font-semibold text-[#37352F]">Website überwachen (der aus dem Video)</p>
                  <div className="rounded-lg bg-[#171717] p-3">
                    <code className="block overflow-x-auto whitespace-nowrap text-xs text-zinc-100 sm:text-sm">
                      /loop 10m prüf ob meine Website noch läuft und sag mir Bescheid wenn was kaputt geht
                    </code>
                  </div>
                  <div className="mt-3">
                    <CopyButton
                      text="/loop 10m prüf ob meine Website noch läuft und sag mir Bescheid wenn was kaputt geht"
                      label="Befehl kopieren"
                    />
                  </div>
                </div>

                <p>
                  Das war&apos;s. Claude bestätigt den Task und wiederholt ihn ab sofort alle 10 Minuten, solange die Session offen ist. Im Rest dieser Anleitung feinjustieren wir den Rhythmus und lernen die Grenzen kennen — aber dein erster Loop läuft schon.
                </p>
              </div>
            </section>

            {/* 03 Intervall-Modus */}
            <section id="intervall" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                03 intervall-modus
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Alle X Minuten — zuverlässig
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>
                  Der Intervall-Modus ist der direkteste: Du gibst den Takt vor, Claude hält ihn ein. Es gibt vier Einheiten:
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { unit: "s", name: "Sekunden", example: "/loop 30s …" },
                    { unit: "m", name: "Minuten", example: "/loop 10m …" },
                    { unit: "h", name: "Stunden", example: "/loop 2h …" },
                    { unit: "d", name: "Tage", example: "/loop 1d …" },
                  ].map(({ unit, name, example }) => (
                    <div key={unit} className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                      <p className="font-mono text-lg font-bold text-[#37352F]">{unit}</p>
                      <p className="mt-1 text-sm font-semibold text-[#37352F]">{name}</p>
                      <p className="mt-1 font-mono text-xs text-[#8B8B85]">{example}</p>
                    </div>
                  ))}
                </div>

                <p className="rounded-xl border border-[#E7D9C8] bg-[#FBF6EF] p-4 text-sm leading-6 text-[#5B5851]">
                  <strong className="text-[#B26B2E]">Kleingedrucktes:</strong> Zwei Details, bevor du kopierst: Sekunden werden auf die Minute gerundet (ein /loop 30s läuft jede Minute, nicht alle 30 Sekunden), und komische Intervalle werden auf den nächsten Cron-Zeitpunkt gerundet — Claude bestätigt dir den echten Zeitplan vor dem Start. Übrigens: Im Video erscheint der Befehl als „10M" in Großbuchstaben; die offizielle Schreibweise ist 10m in Kleinbuchstaben.
                </p>

                <p>Sechs fertige Intervall-Loops zum Kopieren — tausch die Details gegen deine aus:</p>

                <div className="space-y-4">
                  {[
                    {
                      title: "Website überwachen (der aus dem Video)",
                      cmd: "/loop 10m prüf ob meine Website noch läuft und sag mir Bescheid wenn was kaputt geht",
                      desc: "Der Star-Loop für Nicht-Programmierer: dein persönliches Uptime-Monitoring, kostenlos.",
                    },
                    {
                      title: "Der Deployment-Klassiker",
                      cmd: "/loop 5m prüf ob das Deployment fertig ist und sag mir ob es geklappt hat oder nicht",
                      desc: "Hör auf, den Deployment-Tab zu refreshen: Claude meldet sich, wenn ein Ergebnis vorliegt.",
                    },
                    {
                      title: "E-Mails zusammengefasst",
                      cmd: "/loop 30m schau in meinen Posteingang und fass mir kurz zusammen, welche E-Mails wirklich wichtig sind",
                      desc: "Braucht dein verbundenes E-Mail-Konto via Connector/MCP. Danach: kein Leben mehr im Posteingang.",
                    },
                    {
                      title: "Tests die sich selbst reparieren",
                      cmd: "/loop 1h führ die Tests im Projekt aus und beheb Fehler bevor du mir Bescheid gibst",
                      desc: "Nicht nur erkennen — zuerst reparieren, dann berichten. Schau die Fixes durch, bevor du blind vertraust.",
                    },
                    {
                      title: "PRs ohne Rückstand",
                      cmd: "/loop 2h schau dir die offenen PRs im Repo an und fass zusammen, welche meine Aufmerksamkeit brauchen",
                      desc: "Dein PR-Eingang, gefiltert: Du erfährst nur von dem, was dich wirklich braucht.",
                    },
                    {
                      title: "Auge auf die Konkurrenz",
                      cmd: "/loop 1d schau auf die Preisseiten meiner Konkurrenten und notier jede Änderung in konkurrenz.md",
                      desc: "Einmal täglich, ohne Drama — und der Verlauf steht in einer Datei, die du jederzeit abrufen kannst.",
                    },
                  ].map(({ title, cmd, desc }) => (
                    <div key={title} className="space-y-2">
                      <div className="min-w-0 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                        <p className="mb-3 text-sm font-semibold text-[#37352F]">{title}</p>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <code className="block overflow-x-auto whitespace-nowrap text-xs text-zinc-100 sm:text-sm">
                            {cmd}
                          </code>
                        </div>
                        <div className="mt-3">
                          <CopyButton text={cmd} label="Befehl kopieren" />
                        </div>
                      </div>
                      <p className="text-sm leading-6 text-[#5B5851]">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 04 Dynamischer Modus */}
            <section id="dynamisch" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                04 dynamischer modus
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Der Modus, der sich selbst verwaltet
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>
                  Lass das Intervall weg, und der Loop ändert seinen Charakter: Claude entscheidet selbst, wann er wieder prüft. Das ist der Modus für alles, bei dem du nicht weißt, wie lange es dauert.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      Icon: Gauge,
                      title: "Wählt seinen eigenen Rhythmus",
                      desc: "Claude entscheidet, wie lange er zwischen den Durchläufen wartet — grob zwischen einer Minute und einer Stunde — je nachdem, was er überwacht.",
                    },
                    {
                      Icon: Eye,
                      title: "Erklärt dir das Warum",
                      desc: 'Nach jedem Durchlauf zeigt er, wie lange er warten wird und warum: \u201EIch prüfe in 5 Minuten, weil der Build so lang braucht.\u201C Keine Black Box.',
                    },
                    {
                      Icon: Sparkles,
                      title: "Stoppt von selbst",
                      desc: "Wenn der Task erledigt ist — Build fertig, Scraper hat seine Ergebnisse — schließt sich der Loop selbst. Du musst nicht dran denken, ihn abzubrechen.",
                    },
                  ].map(({ Icon, title, desc }) => (
                    <div key={title} className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Icon className="h-4 w-4 text-[#37352F]" aria-hidden="true" />
                        <p className="text-sm font-semibold text-[#37352F]">{title}</p>
                      </div>
                      <p className="text-sm leading-6 text-[#5B5851]">{desc}</p>
                    </div>
                  ))}
                </div>

                <p className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 text-sm leading-6 text-[#5B5851]">
                  <strong className="text-[#37352F]">Fest oder dynamisch?</strong> Einfache Regel: Wenn deine Frage ist „wie oft?", nimm Intervall (E-Mails alle 30 Minuten). Wenn deine Frage ist „bis was passiert?", nimm dynamisch (warten bis der Build fertig ist). Der dynamische Modus stoppt außerdem selbst — also nimm ihn für alles mit einem klaren Ende.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: "Der Aufseher (der aus dem Video)",
                      cmd: "/loop prüf ob Claude das erledigt hat, was ich in der anderen Session verlangt hab, und beheb alle Fehler die du findest",
                      desc: "Ein Claude, der einen anderen Claude überwacht: der Loop, der zwei Sessions zu einem Team macht.",
                    },
                    {
                      title: "Wart auf den Build und mach weiter",
                      cmd: "/loop wart bis der Build fertig ist; wenn er fertig ist, führ die Tests aus und gib mir eine Zusammenfassung",
                      desc: "Der perfekte Anwendungsfall für den dynamischen Modus: Du weißt nicht wie lang der Build dauert, und Claude passt sein Warten selbst an.",
                    },
                    {
                      title: "Überwach bis zum Abschluss",
                      cmd: "/loop überwach den Scraper bis er 100 Ergebnisse gesammelt hat und sag mir Bescheid wenn er fertig ist",
                      desc: "Hat ein klares Ziel — also schaltet sich der Loop bei 100 Ergebnissen selbst ab.",
                    },
                  ].map(({ title, cmd, desc }) => (
                    <div key={title} className="space-y-2">
                      <div className="min-w-0 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                        <p className="mb-3 text-sm font-semibold text-[#37352F]">{title}</p>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <code className="block overflow-x-auto whitespace-nowrap text-xs text-zinc-100 sm:text-sm">
                            {cmd}
                          </code>
                        </div>
                        <div className="mt-3">
                          <CopyButton text={cmd} label="Befehl kopieren" />
                        </div>
                      </div>
                      <p className="text-sm leading-6 text-[#5B5851]">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 05 Das messbare Ziel */}
            <section id="ziel" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                05 das messbare ziel
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Was fast alle falsch machen: Gib ihm eine Zahl oder eine Liste
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>
                  Hier ist der Teil, den fast alle falsch machen — und der darüber entscheidet, ob ein Loop wirklich funktioniert oder für immer dreht oder zu früh aufhört. Der Kern: Ein Loop braucht kein Task — er braucht ein Ziel. Diesen Unterschied zu verstehen ist das Einzige, was du wirklich draufhaben musst.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#37352F]" aria-hidden="true" />
                      <p className="text-sm font-semibold text-[#37352F]">Ein Task endet wenn er abgeliefert hat</p>
                    </div>
                    <p className="text-sm leading-6 text-[#5B5851]">
                      „Mach mir eine Zusammenfassung dieser Seite." Claude macht es einmal, liefert es ab — und das war&apos;s. Egal ob gut oder halbfertig. Wenn es nicht passt, bist du wieder dran.
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4 text-[#37352F]" aria-hidden="true" />
                      <p className="text-sm font-semibold text-[#37352F]">Ein Ziel endet wenn es erreicht ist</p>
                    </div>
                    <p className="text-sm leading-6 text-[#5B5851]">
                      „…und hör nicht auf, bis jeder Datenpunkt 3 Links hat die auf echte Artikel führen." Das ist kein Task mehr, das ist ein Ziel. Der Loop prüft ob es erreicht ist — wenn nicht, korrigiert er sich selbst und versucht es nochmal.
                    </p>
                  </div>
                </div>

                <p>
                  Mach es konkret mit dem Beispiel aus dem Video. Du willst eine Zusammenfassung einer Seite zu irgendeinem Thema: das ist der Task. Was ihn zu einem echten Loop macht, ist das Ziel, das du obendrauf legst:
                </p>

                <div className="min-w-0 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                  <p className="mb-3 text-sm font-semibold text-[#37352F]">Der Loop mit messbarem Ziel (der aus dem Video)</p>
                  <div className="rounded-lg bg-[#171717] p-3">
                    <code className="block overflow-x-auto whitespace-nowrap text-xs text-zinc-100 sm:text-sm">
                      /loop erstell eine Zusammenfassung von [dein Thema] und hör nicht auf bis jeder Datenpunkt 3 Links hat, und jeder Link zu einem echten Artikel führt der den Punkt wirklich belegt
                    </code>
                  </div>
                  <div className="mt-3">
                    <CopyButton
                      text="/loop erstell eine Zusammenfassung von [dein Thema] und hör nicht auf bis jeder Datenpunkt 3 Links hat, und jeder Link zu einem echten Artikel führt der den Punkt wirklich belegt"
                    />
                  </div>
                </div>

                <p>
                  Ohne dieses Ziel passiert genau das, was KI so gefährlich macht: Sie wirft dir Links hin, die gar nicht existieren — und du merkst es zu spät. Mit dem Ziel geht der Agent jeden Link einzeln durch und prüft, ob er wirklich öffnet und sagt was du versprochen hast — weil das der Maßstab ist, den du ihm gegeben hast.
                </p>

                <div className="rounded-xl border border-[#E7D9B0] bg-[#FBF6E9] p-4 sm:p-5">
                  <p className="mb-1.5 text-sm font-semibold text-[#7A6A3A]">Was fast alle falsch machen</p>
                  <p className="text-sm leading-6 text-[#7A6A3A]">
                    Dein Ziel muss eine Zahl oder eine Liste haben. Nur so kann Claude sich selbst bewerten: zählen, mit dem Kriterium vergleichen, wissen ob er fertig ist oder noch nicht. Wenn du nur „mach es gut" oder „stell sicher dass es schön aussieht" schreibst, kann der Loop sich nicht messen — er weiß nicht wann er aufhören soll, und dreht entweder zu lange oder stoppt zu früh.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      vague: '\u201EPrüf ob der Artikel gut ist\u201C',
                      measurable: '\u201EPrüf ob der Artikel mindestens 5 Abschnitte hat und jede Behauptung eine Quelle\u201C',
                    },
                    {
                      vague: '\u201ESammel Infos über meine Konkurrenten\u201C',
                      measurable: '\u201ESammel 10 Konkurrenten in konkurrenz.md, jeden mit Preis, Plan und Link zur Seite\u201C',
                    },
                    {
                      vague: '\u201EMach den Code sauber\u201C',
                      measurable: '\u201EHör nicht auf bis die Tests mit 0 Fehlern durchlaufen und Lint sauber ist\u201C',
                    },
                  ].map(({ vague, measurable }) => (
                    <div key={vague} className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                      <p className="text-sm leading-6 text-[#9A3D2E]">
                        <span className="font-semibold">Vage:</span> {vague}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#3F7A4F]">
                        <span className="font-semibold">Messbar:</span> {measurable}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Prompt box */}
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#2f2d27]">Mach dein Ziel messbar</h3>
                      <p className="mt-1 text-sm text-[#5f5b53]">
                        Dein Loop weiß nicht wann er aufhören soll? Gib Claude das hier mit deinem Ziel in einer Zeile — er gibt es dir mit Zahl oder Liste zurück, damit der Loop sich selbst bewerten kann.
                      </p>
                    </div>
                    <CopyButton text={PROMPT_ZIEL_MESSBAR} />
                  </div>
                  <div className="rounded-lg bg-[#171717] p-3">
                    <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">
{PROMPT_ZIEL_MESSBAR}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* 06 loop.md */}
            <section id="loop-md" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                06 /loop pur
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Der Wartungs-Loop (loop.md)
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>
                  Es gibt noch einen dritten, versteckten Modus: /loop ohne alles — kein Intervall, kein Task. Claude führt eine Wartungsroutine aus — standardmäßig einen eingebauten Prompt, aber wenn dein Projekt eine Datei unter .claude/loop.md hat, nutzt er die stattdessen. Heißt: Du schreibst deine eigene Routine einmal und startest sie mit fünf Zeichen.
                </p>

                <div className="min-w-0 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                  <p className="mb-3 text-sm font-semibold text-[#37352F]">Wartungs-Modus</p>
                  <div className="rounded-lg bg-[#171717] p-3">
                    <code className="block overflow-x-auto whitespace-nowrap text-xs text-zinc-100 sm:text-sm">
                      /loop
                    </code>
                  </div>
                  <div className="mt-3">
                    <CopyButton text="/loop" label="Befehl kopieren" />
                  </div>
                </div>
                <p className="text-sm leading-6 text-[#5B5851]">
                  Führt den eingebauten Prompt aus — oder deine .claude/loop.md, wenn sie im Projekt existiert.
                </p>

                <p>Und wer schreibt diese loop.md? Claude, natürlich. Dieser Prompt erstellt sie für dich:</p>

                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#2f2d27]">Erstell deine .claude/loop.md</h3>
                      <p className="mt-1 text-sm text-[#5f5b53]">
                        Führ das in deinem Projekt aus: Claude schaut sich alles an und schreibt deine Wartungsroutine, fertig für /loop ohne Argumente.
                      </p>
                    </div>
                    <CopyButton
                      text={PROMPT_LOOP_MD}
                    />
                  </div>
                  <div className="rounded-lg bg-[#171717] p-3">
                    <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">
{PROMPT_LOOP_MD}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* 07 Stopp-Optionen */}
            <section id="stoppen" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                07 stopp-optionen
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                So stoppst du einen Loop (drei Wege)
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>
                  Ein Loop ohne Stopp-Option wäre gruselig — also hier, bevor du den ersten ernsthaft aufsetzt. Drei Wege:
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      Icon: Hand,
                      title: "Esc während er wartet",
                      desc: "Wenn der Loop gerade in der Pause zwischen zwei Durchläufen ist, bricht ein Esc ihn sofort ab. Die Handbremse.",
                    },
                    {
                      Icon: MessageCircle,
                      title: "Schreib es ihm einfach",
                      desc: 'Schreib \u201Ehör auf\u201C, \u201Ebrich den Loop ab\u201C oder \u201Eprüf das nicht mehr\u201C. Claude versteht die Anweisung und schaltet ab — kein Sonderbefehl nötig.',
                    },
                    {
                      Icon: Sparkles,
                      title: "Der dynamische stoppt selbst",
                      desc: "Wenn der Loop im dynamischen Modus läuft, musst du ihn gar nicht stoppen: Sobald der Task erledigt ist, hört er von selbst auf.",
                    },
                  ].map(({ Icon, title, desc }) => (
                    <div key={title} className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Icon className="h-4 w-4 text-[#37352F]" aria-hidden="true" />
                        <p className="text-sm font-semibold text-[#37352F]">{title}</p>
                      </div>
                      <p className="text-sm leading-6 text-[#5B5851]">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 08 Echte Grenzen */}
            <section id="grenzen" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                08 echte grenzen
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Was du wissen musst, bevor du deine Armee aufstellst
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>
                  Bevor du deine Loop-Armee aufstellst: die echten Grenzen — direkt aus den Docs, ohne Schönfärberei:
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      Icon: Monitor,
                      title: "Läuft auf DEINEM Computer, Session muss offen sein",
                      desc: "Ein Loop lebt in deiner lokalen Claude Code-Session. Terminal zu oder Computer aus bedeutet: Loop tot (die Session lässt sich mit --resume wiederherstellen, solange sie nicht abgelaufen ist). Nichts läuft in der Cloud.",
                    },
                    {
                      Icon: CalendarClock,
                      title: "Läuft nach 7 Tagen ab",
                      desc: "Wiederkehrende Loops haben ein Ablaufdatum: nach einer Woche schalten sie sich selbst ab. Wenn du ihn dauerhaft willst, erstellst du ihn neu mit einer Zeile — oder stufst ihn zu /schedule hoch.",
                    },
                    {
                      Icon: Layers,
                      title: "Maximal 50 Tasks pro Session",
                      desc: "Das Limit ist großzügig, aber es existiert: 50 geplante Tasks pro Session. In der Praxis ändern 3 oder 4 gut gewählte Loops schon deinen Arbeitsalltag.",
                    },
                    {
                      Icon: Hourglass,
                      title: "Startet nur wenn Claude frei ist",
                      desc: "Wenn Claude gerade mit was anderem beschäftigt ist wenn ein Durchlauf fällig wäre, wird dieser Durchlauf übersprungen — ohne Aufholen. Der Loop macht einfach mit dem nächsten weiter.",
                    },
                    {
                      Icon: Timer,
                      title: "Der Takt hat etwas Spielraum",
                      desc: "Das Intervall kann leicht variieren zwischen den Durchläufen. Für ein Deployment zu überwachen ist das völlig egal — nur nicht für alles, das Uhrmacher-Präzision braucht.",
                    },
                  ].map(({ Icon, title, desc }) => (
                    <div key={title} className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                      <div className="mb-2 flex items-center gap-2">
                        <Icon className="h-4 w-4 shrink-0 text-[#37352F]" aria-hidden="true" />
                        <p className="text-sm font-semibold text-[#37352F]">{title}</p>
                      </div>
                      <p className="text-sm leading-6 text-[#5B5851]">{desc}</p>
                    </div>
                  ))}
                </div>
                <p>
                  Das ist kein versteckter Fehler — das ist das Design. /loop ist dafür gemacht, aktive Arbeitssessions zu begleiten. Für alles Dauerhafte und Unbeaufsichtigte gibt es das nächste Kapitel.
                </p>
              </div>
            </section>

            {/* 09 /loop vs /schedule */}
            <section id="vs-schedule" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                09 der cloud-bruder
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                /loop vs /schedule: welcher ist deiner?
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>
                  Im Video wurde es nur angeteasert — hier kommt der ganze Vergleich: /loop hat einen Bruder, der in der Anthropic-Cloud läuft: /schedule (antwortet auch auf /routines). Der Unterschied ist kein Leistungsunterschied — es ist eine Frage des Lebensraums:
                </p>

                <div className="space-y-3">
                  {[
                    {
                      label: "Wo er läuft",
                      loop: "Auf deinem Computer, innerhalb deiner offenen Claude Code-Session.",
                      schedule: "In der Anthropic-Cloud; dein Computer kann ausgeschaltet sein.",
                    },
                    {
                      label: "Deine Dateien",
                      loop: "Voller Zugriff auf deinen Rechner und deine echten Dateien.",
                      schedule: "Arbeitet auf einer sauberen Kopie eines GitHub-Repos; berührt deinen Rechner nicht.",
                    },
                    {
                      label: "Mindest-Intervall",
                      loop: "Ab Sekunden (werden auf die Minute gerundet).",
                      schedule: "Eine Stunde.",
                    },
                    {
                      label: "Wie lang er läuft",
                      loop: "Wiederkehrende laufen nach 7 Tagen ab.",
                      schedule: "Läuft nicht ab: bleibt nach Zeitplan bis du ihn pausierst oder löschst.",
                    },
                    {
                      label: "Wer ihn nutzen kann",
                      loop: "Jede Claude Code-Session.",
                      schedule: "Pro-, Max-, Team- oder Enterprise-Plan.",
                    },
                    {
                      label: "Extras",
                      loop: "Dynamischer Modus der sich selbst verwaltet, und deine .claude/loop.md.",
                      schedule: "Zusätzliche Trigger via API oder direkt von GitHub.",
                    },
                  ].map(({ label, loop, schedule }) => (
                    <div key={label} className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                      <p className="mb-3 text-sm font-semibold text-[#37352F]">{label}</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg border border-[#E6E6E4] bg-white p-3">
                          <div className="mb-1.5 flex items-center gap-1.5">
                            <Repeat className="h-3.5 w-3.5 text-[#37352F]" aria-hidden="true" />
                            <span className="text-[11px] font-semibold uppercase tracking-wide text-[#7A7A72]">
                              /loop
                            </span>
                          </div>
                          <p className="text-sm leading-6 text-[#5B5851]">{loop}</p>
                        </div>
                        <div className="rounded-lg border border-[#E6E6E4] bg-white p-3">
                          <div className="mb-1.5 flex items-center gap-1.5">
                            <Cloud className="h-3.5 w-3.5 text-[#37352F]" aria-hidden="true" />
                            <span className="text-[11px] font-semibold uppercase tracking-wide text-[#7A7A72]">
                              /schedule
                            </span>
                          </div>
                          <p className="text-sm leading-6 text-[#5B5851]">{schedule}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 text-sm leading-6 text-[#5B5851]">
                  <strong className="text-[#37352F]">Die Kurzregel: Wenn der Task deine Arbeitssession begleitet, nimm /loop. Wenn er auch laufen muss wenn dein Computer aus ist, nimm /schedule.</strong> Den Cloud-Bruder erklärt @kidealist in einer eigenen Anleitung.
                </p>
              </div>
            </section>

            {/* 10 Loop-Ideen */}
            <section id="ideen" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                10 loop-ideen
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Loops je nachdem, wer du bist
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>
                  Im Laufe dieser Anleitung sind schon zehn der zwölf kopierbaren Loops aufgetaucht — diese zwei schließen das Dutzend. Aber erst: Verort dich, denn Loops sind nicht nur für Programmierer:
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <User className="h-4 w-4 text-[#37352F]" aria-hidden="true" />
                      <p className="text-sm font-semibold text-[#37352F]">Wenn du nicht programmierst</p>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Website alle 10 Minuten überwachen und eher als deine Besucher Bescheid bekommen.",
                        "E-Mails alle halbe Stunde zusammengefasst, nur was wirklich wichtig ist (mit verbundenem E-Mail-Konto).",
                        "Preise der Konkurrenz einmal täglich im Blick, festgehalten in einer Datei.",
                        "Branchennews alle 4 Stunden, umgewandelt in Content-Ideen.",
                      ].map((item) => (
                        <li key={item} className="flex gap-2 text-sm leading-6 text-[#5B5851]">
                          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B4B2AB]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-[#37352F]" aria-hidden="true" />
                      <p className="text-sm font-semibold text-[#37352F]">Wenn du baust</p>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Der Klassiker: Deployment alle 5 Minuten prüfen und Bescheid geben ob es geklappt hat.",
                        "Tests stündlich ausführen und automatisch reparieren.",
                        "PRs alle 2 Stunden, mit Zusammenfassung welche meine Aufmerksamkeit brauchen.",
                        "Der Aufseher: ein Loop der die Arbeit einer anderen Claude-Session prüft und Fehler korrigiert.",
                      ].map((item) => (
                        <li key={item} className="flex gap-2 text-sm leading-6 text-[#5B5851]">
                          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B4B2AB]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Kontinuierliches Code Review",
                      cmd: "/loop 1h schau dir den neuen Code seit dem letzten Durchlauf an und hinterlass deine Review-Kommentare in review.md",
                      desc: "Ein Reviewer, der nie müde wird: jede Stunde hinterlässt er seine Anmerkungen schriftlich, ohne dich zu unterbrechen.",
                    },
                    {
                      title: "Content der dir nicht entgeht",
                      cmd: "/loop 4h such nach neuen Nachrichten aus meiner Branche und füg sie mit einer kurzen Zusammenfassung zu content-ideen.md hinzu",
                      desc: "Deine Ideendatei wächst den ganzen Tag von selbst. Du kommst nur zum Ernten.",
                    },
                  ].map(({ title, cmd, desc }) => (
                    <div key={title} className="space-y-2">
                      <div className="min-w-0 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                        <p className="mb-3 text-sm font-semibold text-[#37352F]">{title}</p>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <code className="block overflow-x-auto whitespace-nowrap text-xs text-zinc-100 sm:text-sm">
                            {cmd}
                          </code>
                        </div>
                        <div className="mt-3">
                          <CopyButton text={cmd} label="Befehl kopieren" />
                        </div>
                      </div>
                      <p className="text-sm leading-6 text-[#5B5851]">{desc}</p>
                    </div>
                  ))}
                </div>

                <p>Keiner passt genau? Dafür ist der Prompt unten: Claude interviewt dich und schlägt deine eigenen vor.</p>

                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#2f2d27]">Lass Claude deine Loops vorschlagen</h3>
                      <p className="mt-1 text-sm text-[#5f5b53]">
                        Füg das in Claude Code ein und lass dich interviewen: Mit fünf Antworten baut er dir fünf maßgeschneiderte Loops, mit der genauen Zeile zum Kopieren.
                      </p>
                    </div>
                    <CopyButton
                      text={PROMPT_EIGENE_LOOPS}
                    />
                  </div>
                  <div className="rounded-lg bg-[#171717] p-3">
                    <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">
{PROMPT_EIGENE_LOOPS}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* 11 FAQ */}
            <section id="faq" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                11 häufige fragen
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Schnelle Antworten
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <div className="space-y-3">
                  {[
                    {
                      q: "Läuft der Loop weiter wenn ich den Computer ausschalte?",
                      a: "Nein. /loop läuft lokal, innerhalb deiner Claude Code-Session: Computer aus oder Terminal zu bedeutet Loop gestoppt (die Session lässt sich mit --resume wiederherstellen, solange sie nicht abgelaufen ist). Wenn du willst, dass etwas mit ausgeschaltetem Rechner läuft, ist das /schedule — der Cloud-Bruder.",
                    },
                    {
                      q: "Was passiert wenn Claude gerade beschäftigt ist wenn der Durchlauf fällig wäre?",
                      a: "Dieser Durchlauf wird übersprungen. Loops starten nur wenn Claude frei ist, und verpasste Durchläufe werden nicht nachgeholt: Wenn der um 15:00 Uhr übersprungen wurde, ist der nächste der um 15:10. Für Monitoring-Tasks spielt das fast nie eine Rolle.",
                    },
                    {
                      q: "Ich hab irgendwo /proactive gesehen. Ist das ein anderer Befehl?",
                      a: "Nein, derselbe: /proactive ist ein Alias für /loop. Welchen du auch schreibst — du bekommst genau dasselbe.",
                    },
                    {
                      q: "Wie viele Loops kann ich gleichzeitig laufen haben?",
                      a: "Bis zu 50 geplante Tasks pro Session. Fang in der Praxis mit einem oder zwei an: Das echte Limit ist nicht die Zahl — es ist wie viel Lärm du aushältst. Jeder Loop unterbricht dich wenn er was findet.",
                    },
                    {
                      q: "Stimmt es dass sie sich nach einer Woche selbst abschalten?",
                      a: "Ja: Wiederkehrende Loops laufen nach 7 Tagen ab. Das ist kein Fehler, das ist Design — /loop begleitet Arbeitssessions. Wenn ein Task länger als eine Woche ohne dich laufen soll, verdient er wahrscheinlich einen /schedule.",
                    },
                    {
                      q: "Muss ich programmieren können um /loop zu nutzen?",
                      a: 'Nein. Der Task wird auf Deutsch geschrieben, so wie du\u2019s einer Person sagen w\u00FCrdest: \u201Epr\u00FCf ob meine Website noch l\u00E4uft und sag mir Bescheid wenn was kaputt geht\u201C. Die n\u00FCtzlichsten Loops in dieser Anleitung haben keine einzige Zeile Code.',
                    },
                  ].map(({ q, a }) => (
                    <div key={q} className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                      <p className="text-sm font-semibold text-[#37352F]">{q}</p>
                      <p className="mt-1.5 text-sm leading-6 text-[#5B5851]">{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-14 space-y-6 border-t border-[#EBEBEA] pt-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                Abschluss
              </p>
              <p className="text-sm leading-relaxed text-[#5f5b53]">
                Du hast jeden Prompt selbst geschrieben — jetzt schreibst du Loops. Eine Zeile — /loop, ein Intervall wenn du willst, der Task auf Deutsch — und Claude wiederholt die Arbeit während du was anderes machst. Fang mit einem einzigen an, stopp ihn wenn er stört, und wenn ein Task laufen soll wenn dein Computer aus ist, stuf ihn zu /schedule hoch. Diese Anleitung kommt von{" "}
                <a
                  className="inline-flex items-center gap-1 font-semibold text-[#23211d] underline decoration-[#B4B2AB] underline-offset-4"
                  href="/tutorials"
                >
                  @kidealist
                </a>
                .
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#37352F]">Offizielle Quellen</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 transition-colors hover:bg-[#F1F1EE]"
                  href="https://code.claude.com/docs/en/scheduled-tasks"
                >
                  <p className="text-sm font-semibold text-[#37352F]">Geplante Tasks (Docs)</p>
                  <p className="mt-2 text-xs leading-5 text-[#5B5851]">
                    Die offizielle Quelle zu /loop: die drei Modi, Intervalle, Grenzen und die Tabelle im Vergleich zu Cloud-Routinen.
                  </p>
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 transition-colors hover:bg-[#F1F1EE]"
                  href="https://code.claude.com/docs/en/quickstart"
                >
                  <p className="text-sm font-semibold text-[#37352F]">Quickstart von Claude Code (Docs)</p>
                  <p className="mt-2 text-xs leading-5 text-[#5B5851]">
                    Die offizielle Terminal-Einrichtung Schritt für Schritt — falls du Claude Code noch nicht installiert hast.
                  </p>
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#37352F]">Anleitungen die damit zusammenhängen</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    href: "/tutorials/token-efficient",
                    Icon: Terminal,
                    title: "Token-Effizienz in Claude Code",
                    desc: "Die 8 Regeln damit Claude weniger liest und schneller liefert",
                  },
                  {
                    href: "/tutorials/stop-slop",
                    Icon: Target,
                    title: "Stop Slop",
                    desc: "Wie du Claude beibringst, weniger Fülltext zu produzieren",
                  },
                  {
                    href: "/tutorials",
                    Icon: Network,
                    title: "Alle Tutorials",
                    desc: "Alle @kidealist-Anleitungen auf einen Blick",
                  },
                  {
                    href: "/tutorials",
                    Icon: Cloud,
                    title: "Mehr Tutorials",
                    desc: "Entdecke weitere Anleitungen von @kidealist",
                  },
                ].map(({ href, Icon, title, desc }) => (
                  <a
                    key={title}
                    className="flex items-center gap-2 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 text-sm font-medium text-[#37352F] transition-colors hover:bg-[#F1F1EE]"
                    href={href}
                  >
                    <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-semibold">{title}</p>
                      <p className="text-xs text-[#8B8B85]">{desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <p className="flex flex-wrap items-center gap-2 text-xs leading-relaxed text-[#8B8B85]">
              <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Anleitung erstellt auf Basis der offiziellen Dokumentation verfügbar am 12. Juni 2026. Diese Seite ist nicht mit Anthropic verbunden. Modi, Intervalle und Grenzen von /loop können sich ändern — im Zweifel schau in die{" "}
              <a
                href="https://code.claude.com/docs/en/scheduled-tasks"
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline decoration-[#B4B2AB] underline-offset-2"
              >
                offizielle Dokumentation für geplante Tasks
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E6E6E4] bg-[#F7F7F5]/95 px-3 py-2 backdrop-blur sm:hidden">
        <div className="flex items-center gap-2">
          <a
            href="/tutorials"
            aria-label="Zurück zu Tutorials"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] text-lg shadow-sm transition-colors hover:bg-[#F0F0ED]"
          >
            <span aria-hidden="true">🏠</span>
          </a>
          <div className="flex w-full items-center gap-2 overflow-x-auto rounded-2xl border border-[#E6E6E4] bg-white p-1 shadow-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SECTIONS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleTabClick(id)}
                className={`relative flex shrink-0 items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium transition-colors duration-300 ${
                  activeTab === id
                    ? "bg-[#EBEBEA] font-semibold text-[#1f1e1a]"
                    : "text-[#6a665f] hover:bg-[#F0F0ED] hover:text-[#37352F]"
                }`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="min-w-max">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
