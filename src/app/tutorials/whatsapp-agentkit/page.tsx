"use client";

import { useState } from "react";

function CopyButton({ text }: { text: string }) {
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
      className="mt-3 inline-flex items-center gap-2 rounded-md border border-[#DFDFDC] bg-white px-3 py-1.5 text-xs font-medium text-[#37352F] transition-colors hover:bg-[#F1F1EE]"
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
          Befehl kopieren
        </>
      )}
    </button>
  );
}

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
      <p className="mb-3 text-sm font-semibold text-[#37352F]">{label}</p>
      <div className="rounded-lg bg-[#171717] p-3">
        <code className="block overflow-x-auto whitespace-nowrap text-xs text-zinc-100 sm:text-sm">
          {code}
        </code>
      </div>
      <CopyButton text={code} />
    </div>
  );
}

export default function WhatsAppAgentKitPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#37352F]">
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-5xl px-4 pb-28 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:py-12">

          {/* Breadcrumb */}
          <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#8B8B85]">
            <a className="transition-colors hover:text-[#37352F]" href="/tutorials">
              tutorials
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
            <span className="font-medium text-[#37352F]">whatsapp agentkit</span>
          </div>

          {/* Header */}
          <header className="mb-8 sm:mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-[#23211d] sm:text-5xl">
              WhatsApp AgentKit
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#5B5851] sm:text-lg sm:leading-8">
              Baue deinen eigenen WhatsApp-Agenten mit künstlicher Intelligenz in weniger als 30 Minuten.
              Du musst nicht programmieren können — Claude Code schreibt den gesamten Code für dich.
              Beantworte einfach Fragen zu deinem Unternehmen.
            </p>
          </header>

          {/* Download Banner */}
          <div className="mb-8 flex flex-col gap-3 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:mb-10 sm:p-5">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#37352F]">Projekt herunterladen</p>
              <p className="text-sm text-[#5B5851]">
                Du kannst das Projekt direkt als ZIP-Datei laden oder es dir auf GitHub ansehen.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/downloads/whatsapp-agentkit-main.zip"
                download
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#37352F] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1a1918]"
              >
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
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Als ZIP herunterladen
              </a>
              <a
                href="https://github.com/Hainrixz/whatsapp-agentkit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#E6E6E4] bg-white px-4 py-2.5 text-sm font-medium text-[#37352F] transition-colors hover:bg-[#F0F0ED]"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 fill-current"
                  aria-hidden="true"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                Auf GitHub ansehen
              </a>
            </div>
          </div>

          {/* Flow Overview */}
          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:mb-10 sm:p-5 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#8B8B85]">
              Der komplette Ablauf
            </p>
            <div className="grid gap-3 sm:grid-cols-3 text-center text-sm">
              <div className="rounded-lg border border-amber-200 bg-white/60 p-3 space-y-1">
                <p className="font-semibold text-[#37352F]">1. Klonen & starten</p>
                <p className="text-[#5f4b1e]">3 Befehle im Terminal – alles ist bereit</p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-white/60 p-3 space-y-1">
                <p className="font-semibold text-[#37352F]">2. Claude baut</p>
                <p className="text-[#5f4b1e]">Beantworte 10 Fragen – Claude schreibt deinen Agenten</p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-white/60 p-3 space-y-1">
                <p className="font-semibold text-[#37352F]">3. Deployen</p>
                <p className="text-[#5f4b1e]">Docker lokal oder Railway via GitHub – du entscheidest</p>
              </div>
            </div>
          </div>

          {/* Section 01 — Das Projekt */}
          <section id="was-ist" className="scroll-mt-24 mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              01 das projekt
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
              Was ist AgentKit?
            </h2>
            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm text-[#5B5851] sm:text-[15px]">
                  AgentKit ist ein Projekt, das <strong className="text-[#37352F]">Claude Code</strong> nutzt,
                  um einen vollständigen und personalisierten WhatsApp-Agenten für dein Unternehmen zu erstellen.
                </p>
                <p className="text-sm text-[#5B5851] sm:text-[15px]">
                  Du beantwortest einfach Fragen zu deinem Unternehmen. Claude Code übernimmt:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-[#5B5851]">
                  <li>Den gesamten Code schreiben</li>
                  <li>Die WhatsApp-Verbindung einrichten</li>
                  <li>Ein KI-„Gehirn" erstellen, das dein Unternehmen kennt</li>
                  <li>Alles bereit machen, damit deine Kunden schreiben können</li>
                </ul>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 text-center text-sm">
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-1">
                  <p className="text-2xl">🍽️</p>
                  <p className="font-semibold text-[#37352F]">Restaurant</p>
                  <p className="text-[#5B5851]">„Das Tagesgericht ist..."</p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-1">
                  <p className="text-2xl">💇</p>
                  <p className="font-semibold text-[#37352F]">Praxis / Salon</p>
                  <p className="text-[#5B5851]">„Dein Termin ist Dienstag um 15 Uhr"</p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-1">
                  <p className="text-2xl">🏠</p>
                  <p className="font-semibold text-[#37352F]">Immobilien</p>
                  <p className="text-[#5B5851]">„Wir haben 3 Wohnungen in deiner Preisspanne..."</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 02 — Voraussetzungen */}
          <section id="voraussetzungen" className="scroll-mt-24 mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              02 voraussetzungen
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
              Was du vorher brauchst
            </h2>
            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-[#5f4b1e] sm:p-5">
                <p>
                  <strong>Nur 4 Dinge.</strong> Wenn du Claude Code bereits installiert hast, brauchst du
                  nur noch einen API-Key und ein WhatsApp-Konto.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-2">
                  <p className="text-sm font-semibold text-[#37352F]">1. Python 3.11 oder höher</p>
                  <p className="text-sm text-[#5B5851]">Das ist die Programmiersprache, die der Agent im Hintergrund verwendet.</p>
                  <div className="space-y-1 text-xs text-[#5B5851]">
                    <p>
                      <strong className="text-[#37352F]">Mac:</strong>{" "}
                      <code className="rounded bg-[#F1F1EE] px-1.5 py-0.5 font-mono">brew install python</code>
                    </p>
                    <p>
                      <strong className="text-[#37352F]">Windows:</strong> Herunterladen von{" "}
                      <a
                        href="https://python.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline underline-offset-2 hover:text-[#37352F]"
                      >
                        python.org
                      </a>
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-2">
                  <p className="text-sm font-semibold text-[#37352F]">2. Claude Code</p>
                  <p className="text-sm text-[#5B5851]">Das Anthropic-Tool, das deinen Agenten baut.</p>
                  <div className="text-xs text-[#5B5851]">
                    <code className="rounded bg-[#F1F1EE] px-1.5 py-0.5 font-mono">
                      npm install -g @anthropic-ai/claude-code
                    </code>
                  </div>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-2">
                  <p className="text-sm font-semibold text-[#37352F]">3. Anthropic API-Key</p>
                  <p className="text-sm text-[#5B5851]">
                    Der „Schlüssel", damit dein Agent mit Claude AI denken kann. Erhältlich auf{" "}
                    <a
                      href="https://platform.claude.com/settings/keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline underline-offset-2 hover:text-[#37352F]"
                    >
                      platform.claude.com
                    </a>
                  </p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-2">
                  <p className="text-sm font-semibold text-[#37352F]">4. WhatsApp API-Konto</p>
                  <p className="text-sm text-[#5B5851]">Wähle einen Anbieter (Claude Code hilft dir bei der Einrichtung):</p>
                  <div className="space-y-1 text-xs text-[#5B5851]">
                    <p>
                      <a
                        href="https://whapi.cloud"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline underline-offset-2 hover:text-[#37352F]"
                      >
                        Whapi.cloud
                      </a>{" "}
                      — Einfach, kostenlose Sandbox
                    </p>
                    <p>
                      <a
                        href="https://developers.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline underline-offset-2 hover:text-[#37352F]"
                      >
                        Meta Cloud API
                      </a>{" "}
                      — Kostenlos pro Konversation
                    </p>
                    <p>
                      <a
                        href="https://twilio.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline underline-offset-2 hover:text-[#37352F]"
                      >
                        Twilio
                      </a>{" "}
                      — Für große Unternehmen
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 03 — Installation */}
          <section id="installation" className="scroll-mt-24 mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              03 installation
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
              AgentKit installieren (3 Befehle)
            </h2>
            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm font-semibold text-[#37352F]">Schritt 1: Repository klonen</p>
                <p className="text-sm text-[#5B5851]">
                  Das lädt das Projekt auf deinen Computer herunter. Öffne dein Terminal und kopiere diesen Befehl:
                </p>
              </div>
              <CodeBlock
                label="Repository klonen"
                code="git clone https://github.com/Hainrixz/whatsapp-agentkit.git"
              />
              <CodeBlock label="In den Ordner wechseln" code="cd whatsapp-agentkit" />
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm font-semibold text-[#37352F]">Schritt 2: Start-Skript ausführen</p>
                <p className="text-sm text-[#5B5851]">
                  Dieses Skript bereitet alles automatisch vor — es installiert Abhängigkeiten und richtet die Umgebung ein:
                </p>
              </div>
              <CodeBlock label="Projekt starten" code="bash start.sh" />
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm font-semibold text-[#37352F]">Schritt 3: Claude Code öffnen und /build-agent eingeben</p>
                <p className="text-sm text-[#5B5851]">
                  Damit startest du den Prozess, bei dem Claude Code dir Fragen zu deinem Unternehmen stellt und deinen Agenten baut:
                </p>
              </div>
              <CodeBlock label="Claude Code öffnen" code="claude" />
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-[#5f4b1e]">
                <p>
                  Sobald du in Claude Code bist, tippe:{" "}
                  <code className="rounded bg-white/60 px-1.5 py-0.5 font-mono text-xs">/build-agent</code>
                </p>
              </div>
            </div>
          </section>

          {/* Section 04 — Das Interview */}
          <section id="interview" className="scroll-mt-24 mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              04 das interview
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
              Claude Code stellt dir 10 Fragen (5 Minuten)
            </h2>
            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm text-[#5B5851] sm:text-[15px]">
                  Claude Code fragt dich nach deinem Unternehmen. Du antwortest einfach in normaler Sprache —
                  du brauchst keine technischen Kenntnisse. Mit deinen Antworten baut Claude einen personalisierten Agenten.
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  "Name deines Unternehmens",
                  "Was du anbietest",
                  "Wofür du den Agenten brauchst",
                  "Name des Agenten",
                  "Kommunikationsstil",
                  "Öffnungszeiten",
                  "Dateien deines Unternehmens (Menü, Preise, FAQ)",
                  "Dein Anthropic API-Key",
                  "Welchen WhatsApp-Anbieter du bevorzugst",
                  "Zugangsdaten des Anbieters",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#37352F] text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm text-[#5B5851]">{item}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-[#5f4b1e] space-y-2">
                <p>
                  <strong>Was passiert danach?</strong>
                </p>
                <p>
                  Claude Code nimmt deine Antworten und generiert in 2–5 Minuten automatisch die gesamte
                  Projektstruktur: Agent-Code, Konfiguration, Wissensbasis, Tests und Docker.
                </p>
              </div>
            </div>
          </section>

          {/* Section 05 — Testen */}
          <section id="testen" className="scroll-mt-24 mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              05 testen
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
              Deinen Agenten im Terminal testen (5 Minuten)
            </h2>
            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm text-[#5B5851] sm:text-[15px]">
                  Bevor du ihn mit WhatsApp verbindest, kannst du direkt im Terminal mit deinem Agenten chatten,
                  um zu prüfen, ob er richtig antwortet. Es ist wie ein Chat-Simulator.
                </p>
              </div>
              <CodeBlock label="Agenten im Terminal testen" code="python tests/test_local.py" />
              <CodeBlock
                label="Lokalen Server starten"
                code="uvicorn agent.main:app --reload --port 8000"
              />
            </div>
          </section>

          {/* Section 06 — Deployment */}
          <section id="deployment" className="scroll-mt-24 mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              06 deployment
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
              In Produktion deployen
            </h2>
            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm text-[#5B5851] sm:text-[15px]">
                  Du hast zwei Möglichkeiten, deinen Agenten ins Internet zu bringen. Beide funktionieren gut —
                  wähle die, die dir einfacher erscheint.
                </p>
              </div>
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm font-semibold text-[#37352F]">
                  Option A: Docker (auf deinem Computer oder Server)
                </p>
                <p className="text-sm text-[#5B5851]">
                  Docker verpackt deinen Agenten in einen Container, der auf jeder Maschine gleich läuft.
                  Ideal, wenn du deinen eigenen Server oder VPS hast.
                </p>
              </div>
              <CodeBlock label="Mit Docker bauen und starten" code="docker compose up --build" />
              <CodeBlock label="Agent-Logs anzeigen" code="docker compose logs -f agent" />
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm font-semibold text-[#37352F]">
                  Option B: Railway (via GitHub, ohne eigenen Server)
                </p>
                <p className="text-sm text-[#5B5851]">
                  Railway ist eine Plattform, die deinen Agenten für dich hostet. Du verbindest dein GitHub-Repository
                  und Railway deployt es automatisch. Es gibt einen kostenlosen Plan für kleine Projekte.
                </p>
                <ol className="list-decimal pl-5 space-y-1 text-sm text-[#5B5851]">
                  <li>Lade dein Projekt auf GitHub hoch (Claude Code kann das für dich erledigen)</li>
                  <li>
                    Gehe zu{" "}
                    <a
                      href="https://railway.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline underline-offset-2 hover:text-[#37352F]"
                    >
                      railway.app
                    </a>{" "}
                    und verbinde dein GitHub-Konto
                  </li>
                  <li>Wähle dein whatsapp-agentkit-Repository aus</li>
                  <li>Railway erkennt das Dockerfile und deployt automatisch</li>
                  <li>Konfiguriere die Umgebungsvariablen (API-Keys) im Railway-Dashboard</li>
                  <li>
                    Railway gibt dir eine öffentliche URL — richte sie als Webhook bei deinem WhatsApp-Anbieter ein
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 07 — Anpassen */}
          <section id="anpassen" className="scroll-mt-24 mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              07 anpassen
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
              Deinen Agenten nachträglich anpassen
            </h2>
            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm text-[#5B5851] sm:text-[15px]">
                  Du musst keinen Code anfassen. Öffne Claude Code und bitte um Änderungen in normaler Sprache:
                </p>
              </div>
              <CodeBlock
                label="Ton ändern"
                code={`claude "Mache den Agenten freundlicher und lockerer."`}
              />
              <CodeBlock
                label="Dienst hinzufügen"
                code={`claude "Füge unseren neuen Lieferservice zum Agenten hinzu."`}
              />
              <CodeBlock
                label="Anbieter wechseln"
                code={`claude "Migriere von Whapi zu Meta Cloud API."`}
              />
            </div>
          </section>

          {/* Section 08 — Architektur */}
          <section id="architektur" className="scroll-mt-24 mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              08 architektur
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
              Wie funktioniert es intern?
            </h2>
            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm text-[#5B5851] sm:text-[15px]">
                  Wenn ein Kunde eine Nachricht an dein WhatsApp schickt, passiert Folgendes:
                </p>
                <ol className="list-decimal pl-5 space-y-1 text-sm text-[#5B5851]">
                  <li>Die Nachricht kommt beim WhatsApp-Anbieter an (Whapi, Meta oder Twilio)</li>
                  <li>Der Anbieter leitet sie per Webhook an deinen Server weiter</li>
                  <li>Dein Server sucht den Gesprächsverlauf dieser Konversation</li>
                  <li>Er sendet die Nachricht + Verlauf + Unternehmensinformationen an Claude AI</li>
                  <li>Claude generiert eine intelligente Antwort</li>
                  <li>Die Antwort wird zurück über WhatsApp gesendet</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 09 — FAQ */}
          <section id="faq" className="scroll-mt-24 mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              09 häufige fragen
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
              Häufige Fragen
            </h2>
            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <div className="space-y-3">
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-1">
                  <p className="text-sm font-semibold text-[#37352F]">Muss ich programmieren können?</p>
                  <p className="text-sm text-[#5B5851]">
                    Nein. Claude Code schreibt den gesamten Code für dich. Du beantwortest nur Fragen zu deinem Unternehmen.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-1">
                  <p className="text-sm font-semibold text-[#37352F]">Was kostet es?</p>
                  <p className="text-sm text-[#5B5851]">
                    AgentKit ist kostenlos und Open Source. Die Claude API kostet ca. 3 $ pro Million Tokens
                    (sehr günstig für einen Bot). WhatsApp hängt vom Anbieter ab — Whapi hat eine kostenlose Sandbox.
                    Railway hat einen kostenlosen Plan.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-1">
                  <p className="text-sm font-semibold text-[#37352F]">Kann ich es für mein echtes Unternehmen nutzen?</p>
                  <p className="text-sm text-[#5B5851]">
                    Ja. Nachdem du es lokal getestet hast, lade es auf Railway oder Docker hoch — und jede
                    WhatsApp-Nachricht wird von deinem Agenten beantwortet.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-1">
                  <p className="text-sm font-semibold text-[#37352F]">Was passiert, wenn der Agent etwas nicht weiß?</p>
                  <p className="text-sm text-[#5B5851]">
                    Er antwortet: „Dazu habe ich keine Information — ich verbinde dich mit jemandem aus unserem Team."
                    Er erfindet niemals Daten.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-1">
                  <p className="text-sm font-semibold text-[#37352F]">Kann ich mehrere Agenten haben?</p>
                  <p className="text-sm text-[#5B5851]">
                    Ja. Klone das Repository mehrmals — einmal pro Unternehmen.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-1">
                  <p className="text-sm font-semibold text-[#37352F]">Kann ich den Anbieter später wechseln?</p>
                  <p className="text-sm text-[#5B5851]">
                    Ja. Sag Claude Code: „Ich möchte von Whapi zu Meta Cloud API wechseln."
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
