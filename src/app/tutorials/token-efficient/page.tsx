"use client";

import { useState } from "react";

const CLAUDE_MD_CONTENT = `# CLAUDE.md — Token Efficient Rules

## Work Rules
1. Think before acting — read the relevant files first, then write code.
2. Be concise in output, thorough in reasoning.
3. Edit existing files instead of rewriting them completely.
4. Don't re-read files you've already read unless they've changed.
5. Test code before saying you're done.
6. No greetings, no filler, no "Of course! Great question!".
7. Simple and direct solutions.
8. User instructions always take priority over this file.`;

const CURL_COMMAND = `curl -o CLAUDE.md https://raw.githubusercontent.com/drona23/claude-token-efficient/main/CLAUDE.md`;

const TABS = [
  { id: "das-problem", label: "Das Problem", num: "01" },
  { id: "die-regeln", label: "Die 8 Regeln", num: "02" },
  { id: "ergebnisse", label: "Ergebnisse", num: "03" },
  { id: "installation", label: "Installation", num: "04" },
  { id: "zusammenfassung", label: "Zusammenfassung", num: "05" },
];

const RULES = [
  {
    num: 1,
    title: "Erst lesen, dann schreiben",
    desc: "Bevor Claude eine Datei anfasst, liest er sie zuerst. Wie wenn du ein Rezept VOLLSTÄNDIG liest, bevor du anfängst zu kochen – so machst du keine Fehler in der Mitte.",
    code: "Think before acting — read the relevant files first, then write code.",
  },
  {
    num: 2,
    title: "Präzise aber gründlich",
    desc: "Claude gibt dir die direkte Antwort ohne Umschweife. Wie ein Arzt: Er sagt dir, was du hast und was du nehmen sollst – er erzählt dir nicht die ganze Geschichte der Medizin.",
    code: "Be concise in output, thorough in reasoning.",
  },
  {
    num: 3,
    title: "Bearbeiten, nicht neu schreiben",
    desc: "Wenn nur EINE Codezeile geändert werden muss, ändert Claude genau diese Zeile – nicht die ganze Datei. Wie einen losen Knopf annähen: nur der Knopf, nicht das ganze Hemd.",
    code: "Edit existing files instead of rewriting them completely.",
  },
  {
    num: 4,
    title: "Nicht neu lesen, was schon gelesen wurde",
    desc: "Wenn Claude eine Datei bereits gelesen hat, liest er sie nicht nochmal, es sei denn, sie hat sich geändert. Wie eine Speisekarte: Du weißt, was drauf steht – du liest sie nicht jedes Mal neu.",
    code: "Don't re-read files you've already read unless they've changed.",
  },
  {
    num: 5,
    title: "Testen bevor \u201Efertig\u201C sagen",
    desc: "Claude überprüft, dass der Code funktioniert, bevor er sagt, dass er fertig ist. Wie ein Koch, der das Gericht probiert, bevor es aus der Küche kommt.",
    code: "Test code before saying you're done.",
  },
  {
    num: 6,
    title: "Kein Fülltext und keine Begrüßungen",
    desc: 'Kein „Natürlich! Tolle Frage!" oder lange Verabschiedungen. Direkt auf den Punkt. Stell dir vor, du zahlst für jedes Wort – denn so ist es: Jedes Wort kostet Tokens.',
    code: 'No greetings, no filler, no "Of course! Great question!".',
  },
  {
    num: 7,
    title: "Einfache und direkte Lösungen",
    desc: "Claude überkonstruiert nichts. Wenn du einen Nagel brauchst, bekommst du einen Hammer – keine Nagelfabrik.",
    code: "Simple and direct solutions.",
  },
  {
    num: 8,
    title: "Du entscheidest",
    desc: "Wenn du etwas Bestimmtes verlangst, hat das immer Vorrang vor allen anderen Regeln. Claude arbeitet für dich, nicht umgekehrt.",
    code: "User instructions always take priority over this file.",
  },
];

function CopyButton({ text, label = "Kopieren" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex shrink-0 items-center gap-2 rounded-md border border-[#DFDFDC] bg-white px-3 py-1.5 text-xs font-medium text-[#37352F] transition-colors hover:bg-[#F1F1EE]"
    >
      {copied ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Kopiert!
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function TokenEfficientPage() {
  const [activeTab, setActiveTab] = useState("das-problem");

  const handleTab = (id: string) => {
    setActiveTab(id);
    scrollToSection(id);
  };

  return (
    <>
      <head>
        <title>Claude Token Efficient | Dein Tutorial</title>
        <meta
          name="description"
          content="Spare bis zu 63% Tokens mit einer einzigen Datei. 8 Regeln, die Claude direkt antworten lassen – ohne Fülltext – und dein Guthaben hält länger."
        />
        <meta property="og:title" content="Claude Token Efficient | Dein Tutorial" />
        <meta
          property="og:description"
          content="Spare bis zu 63% Tokens mit einer einzigen Datei. 8 Regeln, die Claude direkt antworten lassen – ohne Fülltext – und dein Guthaben hält länger."
        />
      </head>

      <div className="min-h-screen bg-[#F7F7F5] text-[#37352F]">
        <main className="min-h-screen bg-white">
          <div className="mx-auto max-w-5xl px-4 pb-28 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:py-12">

            {/* Breadcrumb — desktop only */}
            <div className="mb-8 hidden items-center gap-2 text-sm text-[#8B8B85] sm:flex">
              <a className="transition-colors hover:text-[#37352F]" href="/tutorials">
                tutorials
              </a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="font-medium text-[#37352F]">token efficient</span>
            </div>

            {/* Header */}
            <header className="mb-8 sm:mb-10">
              <h1 className="text-3xl font-bold tracking-tight text-[#23211d] sm:text-5xl">
                Tokens sparen mit einer einzigen Datei
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-[#5B5851] sm:text-lg sm:leading-8">
                Claude berechnet jedes Wort. Mit einer Datei mit 8 Regeln antwortet Claude direkt,
                ohne Fülltext, ohne Begrüßungen – und dein Guthaben hält viel länger. So einfach ist das.
              </p>
            </header>

            {/* Tab navigation */}
            <nav className="mb-8 flex gap-2 overflow-x-auto pb-2 sm:mb-10 sm:grid sm:grid-cols-5">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTab(tab.id)}
                  className={`min-w-[145px] rounded-md px-3 py-2 text-left text-sm sm:min-w-0 ${
                    activeTab === tab.id
                      ? "bg-[#EBEBEA] font-semibold text-[#1f1e1a]"
                      : "text-[#66635D] hover:bg-[#EFEFED]"
                  }`}
                >
                  <span className="mr-2 font-mono text-xs text-[#8B8B85]">{tab.num}</span>
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* ── Section 01 — Das Problem ── */}
            <section id="das-problem" className="scroll-mt-24 mb-14">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                01 das problem
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Was sind Tokens und warum sind sie wichtig?
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">

                {/* Amber box */}
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
                  <p className="font-semibold text-amber-900">🎮 Stell dir das vor:</p>
                  <p className="mt-2 text-amber-900">
                    Tokens sind wie <strong>Spielmünzen in einem Automaten</strong>. Jedes Wort, das Claude
                    liest oder schreibt, kostet eine Münze. Wenn du fragst &bdquo;Wie spät ist es?&ldquo; und Claude
                    antwortet mit &bdquo;Tolle Frage! Es freut mich, dass du das fragst. Die aktuelle Uhrzeit
                    ist...&ldquo; &ndash; diese überflüssigen Wörter sind Münzen, die du verschwendest.{" "}
                    <strong>Du zahlst für Fülltext.</strong>
                  </p>
                </div>

                {/* Grey box */}
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                  <p className="text-sm font-semibold text-[#8B8B85]">💡 Die Lösung:</p>
                  <p className="mt-1 text-[#4D4A44]">
                    Eine Datei namens <strong>CLAUDE.md</strong> mit 8 Regeln, die Claude sagen: &bdquo;Hör
                    auf zu reden&ldquo;. Wie ein Schild am Automaten: &bdquo;Gib mir nur, was ich bestellt habe,
                    ohne Schnickschnack&ldquo;. In 30 Sekunden installiert und fertig.
                  </p>
                </div>

                {/* Stats grid */}
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg border border-[#E6E6E4] bg-[#FCFCFB] p-3">
                    <p className="text-2xl font-bold text-[#23211d]">8</p>
                    <p className="text-xs text-[#8B8B85]">einfache Regeln</p>
                  </div>
                  <div className="rounded-lg border border-[#E6E6E4] bg-[#FCFCFB] p-3">
                    <p className="text-2xl font-bold text-[#23211d]">63%</p>
                    <p className="text-xs text-[#8B8B85]">weniger Wörter</p>
                  </div>
                  <div className="rounded-lg border border-[#E6E6E4] bg-[#FCFCFB] p-3">
                    <p className="text-2xl font-bold text-[#23211d]">30s</p>
                    <p className="text-xs text-[#8B8B85]">zur Installation</p>
                  </div>
                </div>

              </div>
            </section>

            {/* ── Section 02 — Die 8 Regeln ── */}
            <section id="die-regeln" className="scroll-mt-24 mb-14">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                02 die regeln
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Die 8 Regeln – einfach erklärt
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">

                <p>
                  Jede Regel ist eine Anweisung, die Claude in deinem gesamten Projekt befolgt. Hier
                  erkläre ich jede so, als wärst du 5 Jahre alt:
                </p>

                {RULES.map((rule) => (
                  <div
                    key={rule.num}
                    className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#171717] text-sm font-bold text-white">
                        {rule.num}
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#23211d]">{rule.title}</p>
                        <p className="mt-1 text-sm text-[#5B5851]">{rule.desc}</p>
                        <p className="mt-2 rounded-lg bg-[#F0F0EE] px-3 py-2 font-mono text-xs text-[#4D4A44]">
                          {rule.code}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </section>

            {/* ── Section 03 — Ergebnisse ── */}
            <section id="ergebnisse" className="scroll-mt-24 mb-14">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                03 die zahlen
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Die Ergebnisse lügen nicht
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">

                <p>
                  Echte Nutzer haben diese 8 Regeln getestet und die Zahlen sprechen für sich. Dieselbe
                  Antwort, aber mit viel weniger unnötigem Text:
                </p>

                {/* Emerald stats grid */}
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                    <p className="text-3xl font-bold text-emerald-900">63%</p>
                    <p className="mt-1 text-sm font-medium text-emerald-800">weniger Wörter insgesamt</p>
                    <p className="mt-1 text-xs text-emerald-700">Von durchschnittlich 465 auf nur 170 Wörter</p>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                    <p className="text-3xl font-bold text-emerald-900">75%</p>
                    <p className="mt-1 text-sm font-medium text-emerald-800">weniger bei Code-Reviews</p>
                    <p className="mt-1 text-xs text-emerald-700">Von 120 Wörtern auf nur 30</p>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                    <p className="text-3xl font-bold text-emerald-900">64%</p>
                    <p className="mt-1 text-sm font-medium text-emerald-800">weniger bei Erklärungen</p>
                    <p className="mt-1 text-xs text-emerald-700">Von 180 Wörtern auf nur 65</p>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                    <p className="text-3xl font-bold text-emerald-900">16%</p>
                    <p className="mt-1 text-sm font-medium text-emerald-800">Gesamtersparnis</p>
                    <p className="mt-1 text-xs text-emerald-700">Von echten Nutzern gemeldet</p>
                  </div>
                </div>

                {/* Grey summary box */}
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                  <p className="text-sm font-semibold text-[#8B8B85]">🎯 Einfach ausgedrückt:</p>
                  <p className="mt-1 text-[#4D4A44]">
                    Früher antwortete Claude wie eine <strong>Bibel</strong>. Jetzt antwortet er wie eine
                    WhatsApp-Nachricht: kurz, klar und auf den Punkt. Gleiche Qualität, weniger
                    Verschwendung.
                  </p>
                </div>

              </div>
            </section>

            {/* ── Section 04 — Installation ── */}
            <section id="installation" className="scroll-mt-24 mb-14">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                04 installation
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Installation in 30 Sekunden
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">

                {/* Blue steps box */}
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
                  <p className="font-semibold text-blue-900">📋 Nur 3 Schritte:</p>
                  <ol className="mt-3 space-y-2 text-sm text-blue-800">
                    <li>
                      <strong>1.</strong> Lade die Datei <strong>CLAUDE.md</strong> herunter oder kopiere
                      sie aus dem Projekt
                    </li>
                    <li>
                      <strong>2.</strong> Lege sie im Stammverzeichnis deines Projekts ab (wo dein Code
                      liegt)
                    </li>
                    <li>
                      <strong>3.</strong> Öffne Claude Code und erwähne die neuen Regeln – Claude befolgt
                      sie automatisch
                    </li>
                  </ol>
                </div>

                {/* Code block — CLAUDE.md content */}
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#2f2d27]">
                        Inhalt der CLAUDE.md Datei
                      </h3>
                      <p className="mt-1 text-sm text-[#5f5b53]">
                        Kopiere alles und füge es in eine Datei namens{" "}
                        <code className="rounded bg-[#F0F0EE] px-1.5 py-0.5 text-xs">CLAUDE.md</code>{" "}
                        im Stammverzeichnis deines Projekts ein
                      </p>
                    </div>
                    <CopyButton text={CLAUDE_MD_CONTENT} label="Kopieren" />
                  </div>
                  <div className="rounded-lg bg-[#171717] p-3">
                    <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">
                      {CLAUDE_MD_CONTENT}
                    </pre>
                  </div>
                </div>

                {/* Curl command */}
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#2f2d27]">
                        Oder direkt von GitHub herunterladen
                      </h3>
                      <p className="mt-1 text-sm text-[#5f5b53]">
                        Führe diesen Befehl im Terminal deines Projekts aus
                      </p>
                    </div>
                    <CopyButton text={CURL_COMMAND} label="Befehl kopieren" />
                  </div>
                  <div className="rounded-lg bg-[#171717] p-3">
                    <pre className="overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">
                      {CURL_COMMAND}
                    </pre>
                  </div>
                </div>

                {/* Where to put the file */}
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                  <p className="text-sm font-semibold text-[#8B8B85]">🤔 Wo kommt die Datei hin?</p>
                  <p className="mt-1 text-[#4D4A44]">
                    In den <strong>Hauptordner</strong> deines Projekts – auf der gleichen Ebene wie{" "}
                    <code className="rounded bg-[#F0F0EE] px-1.5 py-0.5 text-xs">package.json</code>{" "}
                    oder{" "}
                    <code className="rounded bg-[#F0F0EE] px-1.5 py-0.5 text-xs">README.md</code>.
                    Claude Code erkennt sie automatisch, wenn du das Projekt öffnest.
                  </p>
                </div>

              </div>
            </section>

            {/* ── Section 05 — Zusammenfassung ── */}
            <section id="zusammenfassung" className="scroll-mt-24 mb-14">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                05 zusammenfassung
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Schnell-Referenzkarte
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">

                {RULES.map((rule) => (
                  <div
                    key={rule.num}
                    className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#171717] text-sm font-bold text-white">
                        {rule.num}
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#23211d]">{rule.title}</p>
                        <p className="mt-1 text-sm text-[#5B5851]">{rule.desc}</p>
                        <p className="mt-2 rounded-lg bg-[#F0F0EE] px-3 py-2 font-mono text-xs text-[#4D4A44]">
                          {rule.code}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Final CTA */}
                <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
                  <p className="font-semibold text-blue-900">
                    Eine Datei. 8 Regeln. 63% weniger Verschwendung. Dein Claude-Guthaben hält viel
                    länger.
                  </p>
                  <p className="mt-2 text-sm text-blue-800">
                    Credit an das Originalprojekt:{" "}
                    <a
                      href="https://github.com/drona23/claude-token-efficient"
                      className="font-medium underline hover:text-blue-900"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      drona23/claude-token-efficient
                    </a>
                    . Folge uns auf Instagram{" "}
                    <a
                      href="https://www.instagram.com/kidealist_"
                      className="font-medium underline hover:text-blue-900"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @kidealist_
                    </a>{" "}
                    für mehr Claude-Tipps.
                  </p>
                </div>

              </div>
            </section>

          </div>
        </main>

        {/* Mobile bottom bar */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E6E6E4] bg-[#F7F7F5]/95 px-3 py-2 backdrop-blur sm:hidden">
          <div className="flex items-center gap-2">
            <a
              href="/tutorials"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] text-lg shadow-sm"
            >
              🏠
            </a>
            <div className="flex w-full items-center gap-1 overflow-x-auto rounded-2xl border border-[#E6E6E4] bg-white p-1 shadow-sm">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTab(tab.id)}
                  className={`shrink-0 rounded-xl px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#EBEBEA] text-[#1f1e1a]"
                      : "text-[#66635D] hover:bg-[#EFEFED]"
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#8B8B85]">{tab.num} </span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
