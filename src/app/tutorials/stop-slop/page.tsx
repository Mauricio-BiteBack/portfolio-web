// DATEI: app/tutorials/stop-slop/page.tsx
// URL: suite.bitebackapp.de/tutorials/stop-slop
//
// ============================================================
// CLAUDE CODE PROMPT — NUR DIESE DATEI ERSTELLEN
// ============================================================
// Erstelle NUR die Datei: app/tutorials/stop-slop/page.tsx
// Berühre keine anderen Dateien im Projekt.
// Die Seite soll unter /tutorials/stop-slop erreichbar sein.
// Deployment läuft über Vercel — kein weiteres Setup nötig.
// ============================================================

"use client";

import { useState } from "react";

// ─── Kleines Hilfselement: Code-Block mit Kopierfunktion ──────────────────────
function CodeBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-w-0 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
      <p className="mb-3 text-sm font-semibold text-[#37352F]">{label}</p>
      <div className="rounded-lg bg-[#171717] p-3">
        <code className="block overflow-x-auto whitespace-nowrap text-xs text-zinc-100 sm:text-sm">
          {code}
        </code>
      </div>
      <button
        type="button"
        onClick={copy}
        className="mt-3 inline-flex items-center gap-2 rounded-md border border-[#DFDFDC] bg-white px-3 py-1.5 text-xs font-medium text-[#37352F] transition-colors hover:bg-[#F1F1EE]"
      >
        {/* Kopieren-Icon */}
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
        {copied ? "Kopiert ✓" : "Befehl kopieren"}
      </button>
    </div>
  );
}

// ─── Haupt-Seite ──────────────────────────────────────────────────────────────
export default function StopSlopPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#37352F]">
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-5xl px-4 pb-28 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:py-12">

          {/* ── Breadcrumb (Desktop) ─────────────────────────────────────── */}
          <div className="mb-6 hidden sm:block">
            <div className="flex items-center gap-2">
              <a
                aria-label="Zur Startseite"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] text-lg shadow-sm transition-colors hover:bg-[#F0F0ED]"
                href="/"
              >
                <span aria-hidden="true">🏠</span>
              </a>
              <div className="flex items-center gap-1 text-sm text-[#8B8B85]">
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
                <span className="font-medium text-[#37352F]">stop slop</span>
              </div>
            </div>
          </div>

          {/* ── Breadcrumb (Mobile, unten fixiert) ──────────────────────── */}
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E6E6E4] bg-[#F7F7F5]/95 px-3 py-2 backdrop-blur sm:hidden">
            <div className="flex items-center gap-2">
              <a
                aria-label="Zur Startseite"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] text-lg shadow-sm transition-colors hover:bg-[#F0F0ED]"
                href="/"
              >
                <span aria-hidden="true">🏠</span>
              </a>
              <div className="flex items-center gap-1 overflow-x-auto rounded-2xl border border-[#E6E6E4] bg-white p-1 shadow-sm text-sm text-[#8B8B85]">
                <a className="shrink-0 px-3 py-1.5 transition-colors hover:text-[#37352F]" href="/tutorials">
                  tutorials
                </a>
                <span className="shrink-0">/</span>
                <span className="shrink-0 px-3 py-1.5 font-medium text-[#37352F]">stop slop</span>
              </div>
            </div>
          </div>

          {/* ── Header ──────────────────────────────────────────────────── */}
          <header className="mb-8 sm:mb-10">
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-[#E6E6E4] bg-[#F7F7F5] px-3 py-1 text-xs font-medium text-[#5B5851]">
                Claude Skill
              </span>
              <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                Open Source · MIT
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[#23211d] sm:text-5xl">
              Stop Slop
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#5B5851] sm:text-lg sm:leading-8">
              Ein Skill, der KI-Sprachmuster aus deutschen Texten entfernt — verbotene Phrasen, 
              strukturelle Klischees, roboterhafte Rhythmen. Claude lernt, wie echter Text klingt.
            </p>
          </header>

          {/* ── GitHub Banner ────────────────────────────────────────────── */}
          <div className="mb-8 flex flex-col gap-3 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#37352F]">Open-Source-Projekt</p>
              <p className="text-sm text-[#5B5851]">
                Der vollständige Code von Stop Slop ist auf GitHub verfügbar. Stöbern, beitragen oder anpassen.
              </p>
              <p className="flex items-center gap-1.5 text-sm text-[#5B5851]">
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
                  className="text-amber-500"
                  aria-hidden="true"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
                Gib uns einen Stern auf GitHub, um das Projekt zu unterstützen.
              </p>
            </div>
            <a
              href="https://github.com/Mauricio-BiteBack/Stop-Slop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-[#E6E6E4] bg-white px-4 py-2.5 text-sm font-medium text-[#37352F] transition-colors hover:bg-[#F1F1EE]"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Auf GitHub ansehen
            </a>
          </div>

          {/* ── Was du lernen wirst ──────────────────────────────────────── */}
          <div className="mb-8 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:mb-10 sm:p-5 space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#8B8B85]">
              Was du lernen wirst
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#4D4A44] sm:text-[15px]">
              <li>
                <strong className="text-[#37352F]">Was Stop Slop ist</strong> — und warum KI-Texte so klingen wie KI-Texte.
              </li>
              <li>
                <strong className="text-[#37352F]">Installation in Claude Code</strong> — mit einem einzigen Befehl.
              </li>
              <li>
                <strong className="text-[#37352F]">Einrichtung in Claude.ai (Projects)</strong> — auch ohne Terminal.
              </li>
              <li>
                <strong className="text-[#37352F]">Benutzerdefinierte Anweisungen</strong> — für Claude.ai ohne Projekte.
              </li>
              <li>
                <strong className="text-[#37352F]">Wie du den Skill benutzt</strong> — Bewertung, Umschreibung, Vorher/Nachher.
              </li>
            </ul>
          </div>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* 01 KONZEPT */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <section id="konzept" className="scroll-mt-24 mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              01 konzept
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
              Was ist KI-Slop?
            </h2>

            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p>
                  KI-Texte klingen oft irgendwie... falsch. Nicht falsch im Sinne von Faktenfehlern — 
                  sondern falsch wie ein Roboter, der versucht, menschlich zu klingen. Formulierungen wie 
                  <strong className="text-[#37352F]"> „In der heutigen schnelllebigen Welt...&quot;</strong> oder
                  <strong className="text-[#37352F]"> „Es ist wichtig zu betonen, dass...&quot;</strong> — kein 
                  echter Mensch schreibt so.
                </p>
                <p>
                  Stop Slop ist ein Skill für Claude, der diese Muster erkennt und entfernt. Er bewertet 
                  deinen Text auf fünf Dimensionen und schreibt alles um, was nach Maschine klingt — 
                  auf Deutsch.
                </p>
              </div>

              {/* Vorher / Nachher */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 space-y-2">
                  <p className="text-sm font-semibold text-red-700">❌ Vorher — typisches KI-Slop</p>
                  <p className="text-sm text-red-900 italic">
                    „In der heutigen schnelllebigen Welt ist es unerlässlich, dass Unternehmen
                    innovative Strategien entwickeln, um wettbewerbsfähig zu bleiben und
                    gleichzeitig nachhaltig zu wachsen.&quot;
                  </p>
                </div>
                <div className="rounded-xl border border-green-200 bg-green-50 p-4 space-y-2">
                  <p className="text-sm font-semibold text-green-700">✓ Nachher — menschlich</p>
                  <p className="text-sm text-green-900 italic">
                    „Wer nicht wächst, verliert Marktanteile. Punkt. Die Frage ist, welche
                    Strategie dafür taugt.&quot;
                  </p>
                </div>
              </div>

              {/* Die 5 Dimensionen */}
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm font-semibold text-[#37352F]">Die 5 Bewertungsdimensionen</p>
                <p className="text-sm text-[#5B5851]">
                  Stop Slop bewertet jeden Text mit 1–10 Punkten pro Dimension. Unter 35/50 Punkten 
                  wird der Text automatisch überarbeitet.
                </p>
                <div className="grid gap-2 sm:grid-cols-5 text-center text-sm text-[#5B5851]">
                  {[
                    { label: "Direktheit", desc: "Aussagen oder Ankündigungen?" },
                    { label: "Rhythmus", desc: "Abwechslungsreich oder gleichförmig?" },
                    { label: "Vertrauen", desc: "Respektiert die Intelligenz des Lesers?" },
                    { label: "Authentizität", desc: "Klingt es menschlich?" },
                    { label: "Dichte", desc: "Gibt es Kürzbares?" },
                  ].map((d) => (
                    <div key={d.label} className="rounded-lg border border-[#E6E6E4] bg-[#F7F7F5] p-3">
                      <p className="font-semibold text-[#37352F]">{d.label}</p>
                      <p className="text-xs mt-1">{d.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* 02 INSTALLATION — CLAUDE CODE */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <section id="claude-code" className="scroll-mt-24 mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              02 installation
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
              Claude Code
            </h2>

            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p>
                  Claude Code ist das Terminal-Tool von Anthropic. Skills sind Ordner mit Anweisungen, 
                  die Claude automatisch erkennt und lädt, wenn sie relevant sind. Die Installation 
                  dauert unter einer Minute.
                </p>
              </div>

              {/* Schritt 1 */}
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm font-semibold text-[#37352F]">
                  Schritt 1 — Repository klonen
                </p>
                <p className="text-sm text-[#5B5851]">
                  Öffne dein Terminal und führe diesen Befehl aus. Er lädt den Skill in den richtigen Ordner.
                </p>
              </div>

              <CodeBlock
                label="Stop Slop installieren"
                code="git clone https://github.com/Mauricio-BiteBack/Stop-Slop.git ~/.claude/skills/stop-slop-de"
              />

              {/* Schritt 2 */}
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm font-semibold text-[#37352F]">
                  Schritt 2 — Überprüfen ob es geklappt hat
                </p>
                <p className="text-sm text-[#5B5851]">
                  Führe diesen Befehl aus, um zu prüfen ob die Dateien da sind:
                </p>
              </div>

              <CodeBlock
                label="Installation überprüfen"
                code="ls ~/.claude/skills/stop-slop-de"
              />

              <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-sm text-green-800 space-y-2">
                <p>
                  <strong>✓ Erfolgreich, wenn du siehst:</strong>
                </p>
                <p className="font-mono text-xs">
                  SKILL.md &nbsp; README.md &nbsp; references/ &nbsp; CHANGELOG.md &nbsp; LICENSE
                </p>
                <p>
                  Das war es. Claude Code erkennt den Skill automatisch — kein weiteres Setup nötig.
                </p>
              </div>

              {/* Kein git? */}
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-[#5f4b1e] space-y-2">
                <p>
                  <strong>Hast du kein Git installiert?</strong>
                </p>
                <p>
                  Prüfe es mit{" "}
                  <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">git --version</code>{" "}
                  im Terminal. Wenn kein Git gefunden wird, lade es von{" "}
                  <a
                    href="https://git-scm.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-2 hover:text-amber-700"
                  >
                    git-scm.com
                  </a>{" "}
                  herunter. Alternativ kannst du auf GitHub auf den grünen{" "}
                  <strong>„Code&quot;</strong>-Button klicken und{" "}
                  <strong>„Download ZIP&quot;</strong> wählen — dann entpackst du den Ordner manuell nach{" "}
                  <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">~/.claude/skills/stop-slop-de</code>.
                </p>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* 03 INSTALLATION — CLAUDE.AI PROJECTS */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <section id="claude-projects" className="scroll-mt-24 mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              03 installation
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
              Claude.ai — Projekte
            </h2>

            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p>
                  Kein Terminal, kein Git — diese Methode funktioniert direkt im Browser über{" "}
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-2 hover:text-[#37352F]"
                  >
                    claude.ai
                  </a>
                  . Du lädst die Skill-Dateien einfach als Projektwissen hoch. Perfekt für Anfänger.
                </p>
              </div>

              {/* Schritte */}
              <div className="grid gap-3 sm:grid-cols-1">
                {[
                  {
                    num: "1",
                    title: "Dateien herunterladen",
                    desc: (
                      <>
                        Gehe zu{" "}
                        <a
                          href="https://github.com/Mauricio-BiteBack/Stop-Slop"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium underline underline-offset-2 hover:text-[#37352F]"
                        >
                          github.com/Mauricio-BiteBack/Stop-Slop
                        </a>
                        . Klicke auf den grünen <strong>„Code&quot;</strong>-Button, dann auf{" "}
                        <strong>„Download ZIP&quot;</strong>. Entpacke die ZIP-Datei auf deinem Computer.
                      </>
                    ),
                  },
                  {
                    num: "2",
                    title: "Ein neues Projekt in Claude.ai erstellen",
                    desc: (
                      <>
                        Öffne{" "}
                        <a
                          href="https://claude.ai"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium underline underline-offset-2 hover:text-[#37352F]"
                        >
                          claude.ai
                        </a>{" "}
                        in deinem Browser. Klicke links in der Seitenleiste auf{" "}
                        <strong>„Projekte&quot;</strong> und dann auf <strong>„Neues Projekt&quot;</strong>.
                        Gib ihm einen Namen, z.B. „Texte auf Deutsch überarbeiten&quot;.
                      </>
                    ),
                  },
                  {
                    num: "3",
                    title: "SKILL.md hochladen",
                    desc: (
                      <>
                        Im Projekt findest du einen Bereich <strong>„Projektwissen&quot;</strong>. Klicke
                        auf <strong>„Dateien hochladen&quot;</strong> und lade diese Dateien aus dem 
                        entpackten Ordner hoch:
                        <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                          <li>
                            <code className="rounded bg-[#F1F1EE] px-1.5 py-0.5 font-mono text-xs">
                              SKILL.md
                            </code>{" "}
                            — die Kernanweisungen (Pflicht)
                          </li>
                          <li>
                            <code className="rounded bg-[#F1F1EE] px-1.5 py-0.5 font-mono text-xs">
                              references/phrases.md
                            </code>{" "}
                            — verbotene Phrasen (empfohlen)
                          </li>
                          <li>
                            <code className="rounded bg-[#F1F1EE] px-1.5 py-0.5 font-mono text-xs">
                              references/structures.md
                            </code>{" "}
                            — Strukturmuster (empfohlen)
                          </li>
                          <li>
                            <code className="rounded bg-[#F1F1EE] px-1.5 py-0.5 font-mono text-xs">
                              references/examples.md
                            </code>{" "}
                            — Vorher/Nachher-Beispiele (optional)
                          </li>
                        </ul>
                      </>
                    ),
                  },
                  {
                    num: "4",
                    title: "Fertig — Claude kennt den Skill",
                    desc: (
                      <>
                        Ab jetzt „kennt&quot; Claude in diesem Projekt die Regeln von Stop Slop. Schreib
                        einfach im Chat: <strong>„Überprüfe diesen Text auf KI-Muster&quot;</strong> oder 
                        füge deinen Text ein und bitte um Überarbeitung.
                      </>
                    ),
                  },
                ].map((step) => (
                  <div
                    key={step.num}
                    className="flex gap-4 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F0F0ED] text-sm font-bold text-[#37352F]">
                      {step.num}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-[#37352F]">{step.title}</p>
                      <p className="text-sm text-[#5B5851]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm text-[#3f4c65] space-y-2">
                <p>
                  <strong>Tipp: Mindestens SKILL.md + phrases.md hochladen</strong>
                </p>
                <p>
                  Die Referenzdateien werden bei Bedarf geladen — sie machen den Skill deutlich 
                  präziser. Mit nur{" "}
                  <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs">SKILL.md</code>{" "}
                  funktioniert es, aber mit allen Dateien ist das Ergebnis viel besser.
                </p>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* 04 BENUTZERDEFINIERTE ANWEISUNGEN */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <section id="custom-instructions" className="scroll-mt-24 mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              04 installation
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
              Claude.ai — Benutzerdefinierte Anweisungen
            </h2>

            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p>
                  Du möchtest den Skill in <strong>jedem</strong> Claude-Chat aktiv haben — 
                  ohne Projekt? Dann sind benutzerdefinierte Anweisungen die richtige Wahl. 
                  Claude wendet die Regeln dann automatisch auf jede Konversation an.
                </p>
              </div>

              {[
                {
                  num: "1",
                  title: "Einstellungen öffnen",
                  desc: (
                    <>
                      Klicke oben rechts auf dein Profilbild, dann auf <strong>„Einstellungen&quot;</strong>
                      (oder „Settings&quot;). Wähle den Reiter <strong>„Benutzerdefinierte Anweisungen&quot;</strong>.
                    </>
                  ),
                },
                {
                  num: "2",
                  title: "SKILL.md öffnen",
                  desc: (
                    <>
                      Öffne die Datei{" "}
                      <code className="rounded bg-[#F1F1EE] px-1.5 py-0.5 font-mono text-xs">
                        SKILL.md
                      </code>{" "}
                      aus dem heruntergeladenen Ordner mit einem Texteditor (z.B. Editor unter 
                      Windows, TextEdit unter Mac). Kopiere den <strong>gesamten Inhalt</strong>.
                    </>
                  ),
                },
                {
                  num: "3",
                  title: "In das Textfeld einfügen",
                  desc: (
                    <>
                      Füge den kopierten Text in das Feld{" "}
                      <strong>„Was soll Claude über dich wissen?&quot;</strong> oder{" "}
                      <strong>„Wie soll Claude antworten?&quot;</strong> ein. Klicke auf{" "}
                      <strong>„Speichern&quot;</strong>.
                    </>
                  ),
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="flex gap-4 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F0F0ED] text-sm font-bold text-[#37352F]">
                    {step.num}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[#37352F]">{step.title}</p>
                    <p className="text-sm text-[#5B5851]">{step.desc}</p>
                  </div>
                </div>
              ))}

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-[#5f4b1e] space-y-2">
                <p>
                  <strong>Zeichenbegrenzung beachten</strong>
                </p>
                <p>
                  Claude.ai hat eine Zeichenbegrenzung für benutzerdefinierte Anweisungen. Wenn 
                  der SKILL.md-Inhalt zu lang ist, kopiere nur den wichtigsten Teil — die 
                  Kernregeln oben in der Datei. Die Referenzdateien kannst du bei Bedarf manuell 
                  in den Chat einfügen.
                </p>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* 05 BENUTZUNG */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <section id="benutzung" className="scroll-mt-24 mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              05 benutzung
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
              Stop Slop verwenden
            </h2>

            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p>
                  Der Skill ist installiert. Jetzt musst du Claude nur noch ansprechen — auf 
                  Deutsch, ganz natürlich. Ein paar Beispiele, die sofort funktionieren:
                </p>
              </div>

              {/* Beispiele */}
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                <h3 className="text-lg font-semibold text-[#2f2d27] mb-3">
                  Beispiele — was du Claude schreiben kannst
                </h3>
                <div className="rounded-lg bg-[#171717] p-3">
                  <pre className="max-h-[300px] overflow-auto whitespace-pre-wrap text-xs leading-7 text-zinc-100 sm:text-sm">
{`Überprüfe diesen Text auf KI-Muster und überarbeite ihn.

Bewerte diesen Absatz und sag mir, was klingt wie KI.

Schreib das menschlicher — kein Slop.

Analysiere meinen Text und gib mir eine Punktzahl.

Entferne alle KI-typischen Phrasen aus diesem E-Mail-Entwurf.`}
                  </pre>
                </div>
              </div>

              {/* Wie Claude antwortet */}
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm font-semibold text-[#37352F]">Was Claude dann macht</p>
                <div className="grid gap-2 sm:grid-cols-4 text-center text-sm text-[#5B5851]">
                  {[
                    { label: "1. Bewertung", desc: "Gibt einen Score von 1–10 für jede der 5 Dimensionen" },
                    { label: "2. Diagnose", desc: "Erklärt, welche Muster gefunden wurden" },
                    { label: "3. Umschreibung", desc: "Überarbeitet den Text, wenn er unter 35/50 liegt" },
                    { label: "4. Neu-Score", desc: "Bewertet den überarbeiteten Text nochmal" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg border border-[#E6E6E4] bg-[#F7F7F5] p-3">
                      <p className="font-semibold text-[#37352F]">{s.label}</p>
                      <p className="text-xs mt-1">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* In Claude Code */}
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm font-semibold text-[#37352F]">In Claude Code — direkte Aktivierung</p>
                <p className="text-sm text-[#5B5851]">
                  Wenn du Claude Code im Terminal verwendest, kannst du den Skill auch direkt 
                  aufrufen — Claude erkennt ihn automatisch anhand deiner Anfrage. Du kannst 
                  auch explizit schreiben:
                </p>
              </div>

              <CodeBlock
                label="Skill direkt ansprechen (im Claude Code Terminal)"
                code="Verwende den Stop-Slop-Skill und überarbeite diesen Text: [dein Text]"
              />

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm text-[#3f4c65] space-y-2">
                <p>
                  <strong>Tipp: Immer den vollständigen Text einfügen</strong>
                </p>
                <p>
                  Je mehr Text du Claude gibst, desto besser kann er Muster erkennen. Ein einzelner 
                  Satz ist zu wenig für eine gute Bewertung — ein Absatz oder ein vollständiger 
                  Abschnitt liefert viel präzisere Ergebnisse.
                </p>
              </div>
            </div>
          </section>

          {/* ── Footer-Banner ─────────────────────────────────────────────── */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm text-[#3f4c65] space-y-2">
            <p>
              <strong>Open Source</strong>
            </p>
            <p>
              Stop Slop ist Open Source. Du kannst den Code einsehen, beitragen oder anpassen im{" "}
              <a
                href="https://github.com/Mauricio-BiteBack/Stop-Slop"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-2 hover:text-blue-700"
              >
                GitHub-Repository
              </a>
              . Basiert auf dem Original von Hardik Pandya — auf Deutsch übersetzt und angepasst.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}