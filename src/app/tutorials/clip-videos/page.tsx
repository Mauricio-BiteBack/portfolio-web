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
        <code className="block overflow-x-auto whitespace-pre text-xs text-zinc-100 sm:text-sm">
          {code}
        </code>
      </div>
      <CopyButton text={code} />
    </div>
  );
}

export default function ClipVideosPage() {
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
            <span className="font-medium text-[#37352F]">clip videos</span>
          </div>

          {/* Header */}
          <header className="mb-8 sm:mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-[#23211d] sm:text-5xl">
              Automatische Clips aus YouTube-Videos
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#5B5851] sm:text-lg sm:leading-8">
              Mit Claude + Mosaic API — kein Videoschnittprogramm nötig
            </p>
          </header>

          {/* Flow Overview */}
          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:mb-10 sm:p-5 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#8B8B85]">
              Der komplette Ablauf
            </p>
            <div className="grid gap-3 sm:grid-cols-3 text-center text-sm">
              <div className="rounded-lg border border-amber-200 bg-white/60 p-3 space-y-1">
                <p className="font-semibold text-[#37352F]">1. YouTube-Link eingeben</p>
                <p className="text-[#5f4b1e]">Kopiere die URL deines Videos und gib sie Claude zusammen mit deinen Anweisungen.</p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-white/60 p-3 space-y-1">
                <p className="font-semibold text-[#37352F]">2. API-Key eingeben</p>
                <p className="text-[#5f4b1e]">Claude fragt nach deinem Mosaic API-Key. Du gibst ihn einmal ein — danach läuft alles automatisch.</p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-white/60 p-3 space-y-1">
                <p className="font-semibold text-[#37352F]">3. Fertige Clips erhalten</p>
                <p className="text-[#5f4b1e]">Claude liefert dir 5 Clips, automatisch auf 9:16 zugeschnitten, mit Untertiteln — fertig zum Posten.</p>
              </div>
            </div>
          </div>

          {/* Section 01 — Was ist Mosaic? */}
          <section id="was-ist-mosaic" className="scroll-mt-24 mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              01 was ist mosaic
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
              Was ist Mosaic?
            </h2>
            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm text-[#5B5851] sm:text-[15px]">
                  Mosaic ist eine KI-gestützte Video-Editing-Plattform mit einer API, die du direkt in Claude nutzen kannst.
                  Du brauchst kein Schnittprogramm und keine technischen Kenntnisse.
                </p>
                <p className="text-sm text-[#5B5851] sm:text-[15px]">
                  Claude übernimmt für dich:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-[#5B5851]">
                  <li>Das automatische Zuschneiden auf 9:16 (Hochformat für Reels, TikTok, Shorts)</li>
                  <li>Das Hinzufügen von Untertiteln</li>
                  <li>Das Erstellen mehrerer Clips aus einem langen Video</li>
                  <li>Die Auswahl der besten Momente aus dem Video</li>
                </ul>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 text-center text-sm">
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-1">
                  <p className="text-2xl">🎙️</p>
                  <p className="font-semibold text-[#37352F]">Podcast</p>
                  <p className="text-[#5B5851]">5 kurze Clips für Instagram</p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-1">
                  <p className="text-2xl">▶️</p>
                  <p className="font-semibold text-[#37352F]">YouTube-Tutorial</p>
                  <p className="text-[#5B5851]">TikTok-Highlights</p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-1">
                  <p className="text-2xl">🎤</p>
                  <p className="font-semibold text-[#37352F]">Interview</p>
                  <p className="text-[#5B5851]">LinkedIn-Clips mit Untertiteln</p>
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
                  <strong>Nur 2 Dinge.</strong> Wenn du Claude bereits nutzt, brauchst du nur noch einen Mosaic-Account.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-2">
                  <p className="text-sm font-semibold text-[#37352F]">1. Claude</p>
                  <p className="text-sm text-[#5B5851]">
                    Entweder claude.ai (Browser) oder Claude Code (Terminal). Beides funktioniert.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-2">
                  <p className="text-sm font-semibold text-[#37352F]">2. Mosaic-Account mit API-Key</p>
                  <p className="text-sm text-[#5B5851]">
                    Erstelle einen Account auf edit.mosaic.so. Der API-Key hat immer das Format:
                  </p>
                  <div className="text-xs text-[#5B5851]">
                    <code className="rounded bg-[#F1F1EE] px-1.5 py-0.5 font-mono">
                      mk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    </code>
                  </div>
                  <p className="text-xs text-[#5B5851]">
                    Du findest ihn unter Einstellungen → API. Kostenlose Testphase verfügbar.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 03 — Schritt-für-Schritt-Anleitung */}
          <section id="anleitung" className="scroll-mt-24 mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              03 anleitung
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
              Schritt-für-Schritt-Anleitung
            </h2>
            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">

              {/* Schritt 1 */}
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm font-semibold text-[#37352F]">Schritt 1: Mosaic-Account erstellen</p>
                <ol className="list-decimal pl-5 space-y-1 text-sm text-[#5B5851]">
                  <li>Gehe auf edit.mosaic.so</li>
                  <li>Erstelle einen kostenlosen Account</li>
                  <li>Gehe zu Einstellungen → API</li>
                  <li>Kopiere deinen API-Key (beginnt mit mk_)</li>
                </ol>
              </div>

              {/* Schritt 2 */}
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm font-semibold text-[#37352F]">Schritt 2: Claude öffnen und Prompt eingeben</p>
                <p className="text-sm text-[#5B5851]">
                  Öffne Claude und gib ihm folgenden Prompt (passe die URL an dein Video an):
                </p>
              </div>
              <CodeBlock
                label="Prompt für Claude"
                code={`Nutze die Mosaic API, um 5 Clips aus diesem YouTube-Video zu erstellen:\nhttps://www.youtube.com/watch?v=DEIN_VIDEO_ID\nSchneide sie auf 9:16 zu und füge Untertitel auf Deutsch hinzu.`}
              />

              {/* Schritt 3 */}
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm font-semibold text-[#37352F]">Schritt 3: API-Key eingeben</p>
                <p className="text-sm text-[#5B5851]">
                  Claude wird dich nach deinem Mosaic API-Key fragen. Füge ihn einfach ein:
                </p>
              </div>
              <CodeBlock
                label="Dein Mosaic API-Key"
                code="mk_a7f3d92bc1e548f6a0d3b7c2e1f94a82"
              />
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-[#5f4b1e]">
                <p>
                  Claude verbindet sich mit der Mosaic API und startet die Verarbeitung. Das dauert je nach
                  Videolänge 2–5 Minuten.
                </p>
              </div>

              {/* Schritt 4 */}
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <p className="text-sm font-semibold text-[#37352F]">Schritt 4: Clips herunterladen</p>
                <p className="text-sm text-[#5B5851]">
                  Sobald Mosaic fertig ist, bekommst du Links zu deinen 5 fertigen Clips.
                  Du kannst sie direkt herunterladen und auf deinen Kanälen posten.
                </p>
              </div>

            </div>
          </section>

          {/* Section 04 — Ergebnis */}
          <section id="ergebnis" className="scroll-mt-24 mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              04 ergebnis
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
              Was du am Ende bekommst
            </h2>
            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 space-y-3">
                <ul className="list-disc pl-5 space-y-1 text-sm text-[#5B5851]">
                  <li>5 Clips aus den besten Momenten deines Videos</li>
                  <li>Hochformat 9:16 — fertig für Reels, TikTok und Shorts</li>
                  <li>Automatisch generierte Untertitel</li>
                  <li>Sofort bereit zum Hochladen — kein weiteres Bearbeiten nötig</li>
                </ul>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-[#5f4b1e]">
                <p>
                  Das funktioniert mit jedem öffentlichen YouTube-Video, egal aus welcher Nische.
                </p>
              </div>
            </div>
          </section>

          {/* Section 05 — FAQ */}
          <section id="faq" className="scroll-mt-24 mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
              05 häufige fragen
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
              Häufige Fragen
            </h2>
            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <div className="space-y-3">
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-1">
                  <p className="text-sm font-semibold text-[#37352F]">Muss ich programmieren können?</p>
                  <p className="text-sm text-[#5B5851]">
                    Nein. Du gibst Claude nur den YouTube-Link und deinen API-Key. Claude erledigt den Rest.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-1">
                  <p className="text-sm font-semibold text-[#37352F]">Was kostet Mosaic?</p>
                  <p className="text-sm text-[#5B5851]">
                    Es gibt eine kostenlose Testphase. Die kostenpflichtigen Pläne starten ab ca. 9,99 $/Monat.
                    Die Anzahl der Clips hängt von deinen Credits ab.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-1">
                  <p className="text-sm font-semibold text-[#37352F]">Funktioniert das mit jedem Video?</p>
                  <p className="text-sm text-[#5B5851]">
                    Ja, mit jedem öffentlichen YouTube-Video. Es funktioniert auch mit deinen eigenen hochgeladenen Videos.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-1">
                  <p className="text-sm font-semibold text-[#37352F]">In welchen Sprachen können die Untertitel sein?</p>
                  <p className="text-sm text-[#5B5851]">
                    Mosaic unterstützt mehrere Sprachen. Gib einfach im Prompt an, welche Sprache du möchtest,
                    z. B. &bdquo;auf Deutsch&ldquo; oder &bdquo;auf Englisch&ldquo;.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-1">
                  <p className="text-sm font-semibold text-[#37352F]">Kann ich mehr als 5 Clips erstellen?</p>
                  <p className="text-sm text-[#5B5851]">
                    Ja. Passe die Zahl im Prompt einfach an: &bdquo;Erstelle 10 Clips&ldquo; — solange du genug Credits hast.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 space-y-1">
                  <p className="text-sm font-semibold text-[#37352F]">Kann ich die Clips nachträglich anpassen?</p>
                  <p className="text-sm text-[#5B5851]">
                    Ja. Du kannst Claude bitten, bestimmte Clips zu ändern, z. B. einen anderen Ausschnitt
                    oder einen anderen Untertitel-Stil.
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
