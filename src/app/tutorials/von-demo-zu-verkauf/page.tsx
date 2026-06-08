"use client";

import { useState } from "react";

const PROMPT_01 = `Agiere als mein Frontend-Sicherheitsauditor. Schau dir an, wie meine App gebündelt und veröffentlicht wird, und sag mir in einfachen Worten, wie sehr mein Code offenliegt.

1. Bestätige mir, ob der Produktions-Build Source Maps erzeugt und ob die auf den Server hochgeladen werden. Wenn ja, erkläre mir das Risiko und deaktiviere sie in der Bundler-Konfiguration (Next.js, Vite oder was auch immer ich nutze).
2. Suche nach API-Keys, Tokens oder Secrets, die direkt im Frontend-Code stehen (API-Schlüssel, Stripe-Keys, Datenbank-Credentials). Liste sie mit Datei und Zeilennummer auf.
3. Für jeden exponierten Secret: sag mir, welcher nur auf dem Server oder in Umgebungsvariablen leben sollte, und verschiebe ihn dahin. Unterscheide zwischen öffentlichen Variablen (die dürfen zum Client) und privaten.
4. Prüfe, ob der Produktionscode minifiziert rauskommt – ohne Kommentare und interne Namen.

Gib mir zuerst den vollständigen Report. Ändere nichts, bis ich dir sage: "Mach es."`;

const PROMPT_02 = `Agiere als mein Datenbank-Sicherheitsexperte. Ich will meine Datenbank mit RLS (Row Level Security) absichern – das ist das Schloss, das dafür sorgt, dass jeder Nutzer nur seine eigenen Daten sieht und anfassen kann.

1. Schau dir meine Datenbank (Supabase/Postgres oder was ich nutze) an und sag mir Tabelle für Tabelle, ob RLS aktiviert ist oder ob sie für jeden offen steht.
2. Zeige mir Tabellen mit sensiblen Daten (Nutzer, Zahlungen, Nachrichten), auf die heute jemand zugreifen könnte, der das nicht darf.
3. Schlage die nötigen RLS-Richtlinien vor, damit jede Zeile nur von ihrem Eigentümer erreichbar ist (z.B. user_id der Zeile mit dem eingeloggten Nutzer vergleichen), und zeig mir das SQL dazu.
4. Gib mir einen Test-Case: Wie bestätige ich, dass Nutzer A die Daten von Nutzer B nicht mehr sehen kann?

Liefere mir zuerst die Diagnose und den SQL-Vorschlag. Führe keine Änderungen in der Datenbank aus, bis ich es genehmige.`;

const PROMPT_03 = `Agiere als mein Git-Leitfaden für Versionskontrolle. Ich will meine App verbessern können, ohne Angst zu haben, sie kaputtzumachen.

1. Prüf, ob das Projekt schon Git verwendet. Falls nicht, initialisiere es und erstelle eine passende .gitignore für meinen Stack (kein node_modules, .env oder Build-Dateien).
2. Bestätige mir, dass kein Secret (.env, Schlüssel) in der Git-History liegt. Wenn doch, sag mir das und erkläre, wie ich es rausbekomme.
3. Erkläre mir in einfacher Sprache einen sicheren Arbeitsablauf: stabiler Hauptbranch, ein Branch pro Änderung, commits mit klaren Nachrichten. Schlag Beispielnamen vor.
4. Zeig mir, wie ich zurückgehe, wenn eine Version schiefläuft (wie ich die letzte Änderung rückgängig mache, ohne alles zu verlieren).

Erst die Diagnose des aktuellen Stands. Wenn ich sie genehmige, machen wir die Änderungen.`;

const PROMPT_04 = `Agiere als mein API-Architekt. Ich will, dass meine App sich ordentlich mit externen Diensten verbindet und eigene Endpunkte sauber bereitstellt.

1. Liste die APIs, die meine App bereits nutzt, und die eigenen Routen, die sie bereitstellt. Sag mir, welche sensible Daten zurückgeben, ohne Authentifizierung zu verlangen.
2. Prüf, ob jeder Endpunkt validiert, wer aufruft (Authentifizierung) und was er darf (Berechtigungen), und ob Eingaben vor der Verarbeitung geprüft werden.
3. Schlag eine klare, einheitliche Struktur für meine Endpunkte vor: Namen, Methoden, Fehlerbehandlung und Antworten. Markiere, was heute unsicher oder inkonsistent ist.
4. Sag mir, wo eine API-Integration (Zahlungen, E-Mail, KI) mehr Sinn ergibt, als selbst zu bauen.

Gib mir erst das Inventar und die Findings. Ändere keinen Code, bis ich ja sage.`;

const PROMPT_05 = `Agiere als mein Deployment-Ingenieur. Ich will meine App von meinem Computer (localhost) ins Live-Internet bringen, stabil und dauerhaft.

1. Schau dir meinen Stack an und empfehle mir den einfachsten Weg zum Veröffentlichen (z.B. Vercel, Netlify oder ähnliches für das Frontend, und wo Datenbank und Backend laufen würden).
2. Liste alles auf, was ich für Produktion konfigurieren muss: Umgebungsvariablen, Domain, HTTPS und die Trennung zwischen Test- und Produktionsumgebung.
3. Gib mir die Schritt-für-Schritt-Anleitung für das erste Deployment, so als ob ich es noch nie gemacht hätte.
4. Sag mir, was ich nach der Veröffentlichung prüfen soll, um zu bestätigen, dass alles funktioniert.

Erst der vollständige Plan. Wir führen ihn aus, wenn ich ihn genehmige.`;

const PROMPT_06 = `Agiere als mein App-Sicherheitsauditor. Ich will die Lücken schließen, durch die jemand reinkommen oder mir das Konto leeren könnte.

1. Prüf, wie ich Login und Sessions handhabe: Passwörter, Tokens, Ablauf und Abmelden. Markiere Schwachstellen.
2. Suche nach häufigen Sicherheitslücken: Injection in Datenbankabfragen, Nutzerdaten ohne Validierung, ungeschützte Endpunkte und falsch gesetzte Berechtigungen.
3. Prüf, ob kostenpflichtige Dienste (KI, Versand, Zahlungen) von jedem unkontrolliert aufgerufen werden können.
4. Liefere mir die Findings sortiert nach Schweregrad (kritisch, hoch, mittel) mit einer einfachen Erklärung zu jedem.

Erstmal nur der priorisierte Report. Die Fixes genehmigen wir einen nach dem anderen.`;

const PROMPT_07 = `Agiere als mein Rate-Limiting-Experte. Ich will verhindern, dass jemand meine App tausendmal aufrufen und mir das Guthaben verbrennen oder den Dienst lahmlegen kann.

1. Identifiziere die teuersten oder sensibelsten Endpunkte (die die KI aufrufen, E-Mails versenden, Login machen oder Zahlungen anfassen).
2. Sag mir, ob heute ein Limit pro Nutzer oder IP existiert. Falls nicht, erkläre mir das konkrete Risiko in Euro und Verfügbarkeit.
3. Schlag vernünftige Limits pro Route vor (wie viele Anfragen pro Minute) und ein einfaches Tool zum Einrichten (z.B. Upstash/Redis oder was zu meinem Stack passt).
4. Definiere, was passiert, wenn jemand das Limit überschreitet: welche Nachricht er bekommt und wie lange er gesperrt wird.

Gib mir den Plan mit den vorgeschlagenen Limits. Wir implementieren ihn, wenn ich ihn genehmige.`;

const PROMPT_08 = `Agiere als mein Performance- und Caching-Spezialist. Ich will, dass meine App sich schnell anfühlt und die Leute nicht wegen Langsamkeit abbrechen.

1. Finde langsame oder wiederholte Operationen: schwere Datenbankabfragen, Aufrufe externer APIs und Daten, die sich kaum ändern aber ständig abgefragt werden.
2. Sag mir, wo Caching Sinn ergibt (im Browser, auf dem Server oder in einer Redis-Schicht) und wie lange jeweils.
3. Erkläre mir das Risiko, alte Daten anzuzeigen, und wie ich den Cache invalidiere, wenn sich etwas ändert.
4. Schätz ab, wie viel Geschwindigkeit jede Änderung bringen würde, um zu priorisieren.

Erst Diagnose und Vorschlag. Ändere nichts, bis ich es genehmige.`;

const PROMPT_09 = `Agiere als mein Skalierbarkeits-Architekt. Ich will, dass meine App nicht abstürzt, wenn 1.000 Nutzer sie gleichzeitig benutzen.

1. Finde die Engpässe: Abfragen ohne Indizes, blockierende Prozesse, schwere Tasks, die im Hintergrund laufen sollten, und schlecht verwaltete Datenbankverbindungen.
2. Sag mir, welche Teile wachsen können und welche als erste unter Last brechen würden – einfach erklärt.
3. Schlag konkrete, priorisierte Verbesserungen vor: Indizes in der Datenbank, langsame Tasks in eine Queue verschieben, Ergebnisse paginieren und das Aufwändigste auslagern.
4. Empfehle mir, wie ich viele gleichzeitige Nutzer simulieren kann, um es zu testen, bevor es wirklich passiert.

Liefere mir den priorisierten Report. Die Änderungen genehmigen wir eine nach der anderen.`;

const PROMPT_10 = `Agiere als mein Monitoring-Ingenieur. Ich will von Fehlern in meiner App erfahren, bevor mir ein verärgerter Nutzer davon erzählt.

1. Prüf, ob ich heute Fehler in Produktion sehen kann und ob Logs existieren. Falls nicht, sag mir das klar.
2. Empfehle mir ein einfaches Tool für Fehlererfassung und Alerts (z.B. Sentry oder ähnliches) und führe mich durch die Einbindung in meinen Stack.
3. Definiere, was ich überwachen sollte: Fehler, Ausfälle, langsame Antwortzeiten und ungewöhnliche Kosten bei nutzungsbasierten Diensten.
4. Richte Alerts ein, die mich benachrichtigen (E-Mail oder Nachricht), wenn etwas aus dem Ruder läuft – ohne mich mit Rauschen zu überfluten.

Erst der Monitoring-Plan. Wir verbinden es, wenn ich es genehmige.`;

const PROMPT_MASTER = `Agiere als mein Senior-Produktionsauditor. Ich will diese App in die echte Welt bringen und verkaufen – sag mir, wie bereit sie ist. Prüfe sie gegen diese 10 Punkte und gib mir einen Checklist-Report.

1. Frontend komprimiert und ohne Source Maps, keine API-Keys oder Secrets im Client-Code.
2. Datenbank mit RLS: Jeder Nutzer greift nur auf seine eigenen Daten zu.
3. Versionskontrolle mit Git, keine Secrets in der History.
4. APIs mit Authentifizierung, Berechtigungen und Eingabevalidierung.
5. Stabiles Hosting und Deployment, getrennte Umgebungen und Umgebungsvariablen.
6. App-Sicherheit: Login, Sessions und häufige Schwachstellen geschlossen.
7. Rate Limiting auf teuren Endpunkten, damit niemand das Guthaben verbrennt oder den Dienst lahmlegt.
8. Caching wo nötig, damit die App schnell ist.
9. Skalierbarkeit für viele gleichzeitige Nutzer.
10. Monitoring für Fehler, Performance und Kosten – mit Alerts.

Für jeden Punkt: Status (grün / gelb / rot), was du in einem Satz gefunden hast, und das Risiko, wenn ich es so lasse. Am Ende: sortiere mir die 3 dringendsten Fixes. Nur Diagnose – ändere noch nichts.`;

const TABS = [
  { id: "das-problem", label: "Das Problem", num: "01" },
  { id: "die-basis", label: "Die Basis (1–5)", num: "02" },
  { id: "zum-verkaufen", label: "Für den Verkauf (6–10)", num: "03" },
  { id: "audit", label: "Audit", num: "04" },
  { id: "faq", label: "FAQ", num: "05" },
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
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Kopiert!
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

export default function VonDemoZuVerkaufPage() {
  const [activeTab, setActiveTab] = useState("das-problem");

  const handleTab = (id: string) => {
    setActiveTab(id);
    scrollToSection(id);
  };

  return (
    <>
      <head>
        <title>Von Demo zu verkaufbar: Die 10 Schichten für deine KI-App | suite.bitebackapp.de</title>
        <meta
          name="description"
          content="Du hast eine App mit KI gebaut und sie sieht auf deinem Bildschirm großartig aus – aber sie ist noch ein Demo. Was ein Spielzeug, das in Tagen zusammenbricht, von einem Produkt trennt, für das Leute zahlen, sind 10 Schichten: komprimiertes Frontend ohne API-Keys, Datenbank mit RLS, Versionskontrolle, echte APIs, Hosting, Sicherheit, Rate Limiting, Caching, Skalierbarkeit und Monitoring. Hier erklären wir jede davon von Grund auf."
        />
        <meta property="og:title" content="Von Demo zu verkaufbar: Die 10 Schichten für deine KI-App" />
        <meta
          property="og:description"
          content="Du hast eine App mit KI gebaut und sie sieht auf deinem Bildschirm großartig aus – aber sie ist noch ein Demo. Was ein Spielzeug, das in Tagen zusammenbricht, von einem Produkt trennt, für das Leute zahlen, sind 10 Schichten."
        />
      </head>

      <div className="min-h-screen bg-[#F7F7F5] text-[#37352F]">
        <main className="min-h-screen bg-white">
          <div className="mx-auto max-w-5xl px-4 pb-28 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:py-12">

            {/* Breadcrumb — nur Desktop */}
            <div className="mb-8 hidden items-center gap-2 text-sm text-[#8B8B85] sm:flex">
              <a className="transition-colors hover:text-[#37352F]" href="/tutorials">
                tutorials
              </a>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="font-medium text-[#37352F]">Von Demo zu verkaufbar</span>
            </div>

            {/* Header */}
            <header className="mb-8 sm:mb-10">
              <h1 className="text-3xl font-bold tracking-tight text-[#23211d] sm:text-5xl">
                Von Demo zu verkaufbar: Die 10 Schichten, die deine KI-App braucht, damit Leute zahlen
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-[#5B5851] sm:text-lg sm:leading-8">
                Eine App schön aussehen lassen ist der einfache Part – sie zu verkaufen ist eine andere Geschichte.{" "}
                <strong className="text-[#37352F]">Was ein Spielzeug, das in Tagen einbricht, von einem Produkt trennt, für das Leute zahlen, sind 10 Schichten</strong>: abgesichertes Frontend, Datenbank mit Schloss, Deployment, Sicherheit, Monitoring und mehr. Wir erklären dir jede davon von Grund auf – auch wenn du nicht programmierst – und geben dir den genauen Prompt, damit Claude Code Schicht für Schicht prüft und umsetzt.
              </p>
            </header>

            {/* Übersicht-Karten */}
            <div className="mb-6 sm:mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Auf einen Blick</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-xs text-[#8B8B85]">01</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#37352F]" aria-hidden="true">
                      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/>
                      <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/>
                      <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>
                    </svg>
                  </div>
                  <p className="text-sm font-semibold leading-5 text-[#37352F]">Warum deine App noch nicht verkauft</p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-xs text-[#8B8B85]">02</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#37352F]" aria-hidden="true">
                      <path d="M4 9.8V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3"/>
                      <path d="M14 2v5a1 1 0 0 0 1 1h5"/>
                      <path d="M9 17v-2a2 2 0 0 0-4 0v2"/>
                      <rect width="8" height="5" x="3" y="17" rx="1"/>
                    </svg>
                  </div>
                  <p className="text-sm font-semibold leading-5 text-[#37352F]">Die Basis: 5 Punkte, ohne die nichts läuft</p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-xs text-[#8B8B85]">03</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#37352F]" aria-hidden="true">
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                  </div>
                  <p className="text-sm font-semibold leading-5 text-[#37352F]">Für den echten Verkauf: die anderen 5</p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-xs text-[#8B8B85]">04</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#37352F]" aria-hidden="true">
                      <path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/>
                      <path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/>
                    </svg>
                  </div>
                  <p className="text-sm font-semibold leading-5 text-[#37352F]">Alle 10 auf einmal prüfen</p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-xs text-[#8B8B85]">05</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#37352F]" aria-hidden="true">
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"/>
                      <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"/>
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"/>
                    </svg>
                  </div>
                  <p className="text-sm font-semibold leading-5 text-[#37352F]">Fertige Prompts für Claude Code</p>
                </div>
              </div>
            </div>

            {/* Navigations-Übersichtskarte */}
            <div className="mb-8 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:mb-10 sm:p-5">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                  das problem · die basis · zum verkaufen · audit · faq
                </p>
                <p className="text-sm font-semibold text-[#37352F]">10 Schichten, ein Ziel: dass du bezahlt wirst</p>
                <p className="max-w-3xl text-sm leading-6 text-[#5B5851]">
                  Das hier ist kein Programmierkurs. Es ist die Liste von dem, was jede App von innen braucht, um vom Demo zum Produkt zu werden: dass niemand deine Keys sieht, jeder Nutzer nur seine Daten anfassen kann, die App Last aushält und du merkst, wenn etwas kaputt geht. Jeder Punkt hat eine einfache Erklärung und einen fertigen Prompt zum Reinkopieren in Claude Code – der macht die schwere Arbeit: erst prüft er und sagt dir, wie du dastehst, und erst wenn du zustimmst, setzt er es um. Am Ende gibt es einen Master-Audit, der alle 10 Schichten auf einmal prüft.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { href: "#das-problem", icon: "map", label: "Das Problem" },
                  { href: "#die-basis", icon: "file-lock", label: "Die Basis (1–5)" },
                  { href: "#zum-verkaufen", icon: "shield-check", label: "Für den Verkauf (6–10)" },
                  { href: "#audit", icon: "list-checks", label: "Audit" },
                  { href: "#faq", icon: "help-circle", label: "FAQ" },
                ].map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#E6E6E4] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#37352F] transition-colors hover:bg-[#F1F1EE]"
                  >
                    {label}
                  </a>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#E6E6E4] pt-3">
                {["Vom Demo zum Produkt", "10 Schichten, von Grund auf erklärt", "Prompts für Claude Code", "Ohne Fachchinesisch", "Auch ohne Programmierkenntnisse"].map((tag) => (
                  <span key={tag} className="inline-flex items-center rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-medium text-[#7A7A72]">{tag}</span>
                ))}
              </div>
            </div>

            {/* Tab-Navigation */}
            <nav className="mb-8 flex gap-2 overflow-x-auto pb-2 sm:mb-10 sm:grid sm:grid-cols-5">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTab(tab.id)}
                  className={`min-w-[145px] rounded-md px-3 py-2 text-left text-sm sm:min-w-0 transition-colors ${
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

            {/* Sections */}
            <div className="space-y-14">

              {/* Sektion 1: Das Problem */}
              <section id="das-problem" className="scroll-mt-24">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">das problem</p>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                  Warum deine App noch nicht verkauft
                </h2>
                <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                  <p>
                    <em>Vibe-Coding</em> – also mit KI programmieren – hat es so einfach gemacht, dass jeder an einem Nachmittag etwas bauen kann, das großartig aussieht. Aber wenn du der KI sagst „bau mir eine App, die mich reich macht", verkauft das noch nichts. Was außen schön wirkt, ist innen fast immer noch ein Demo: Die erste Person, die zahlt, wird die Schwachstellen finden.
                  </p>
                  <p>
                    Was wirklich verkauft, ist eine App, die <strong className="font-semibold text-[#37352F]">strukturiert und durchdacht</strong> ist –{" "}
                    <strong className="font-semibold text-[#37352F]">Schicht für Schicht aufgebaut</strong> mit Claude als deinem Architekten für jeden Teil. Es sind 10 Schichten, die niemand sieht, aber die alles tragen. Ohne sie funktioniert deine App am Tag, an dem du sie vorstellst, und bricht eine Woche später ein. Mit ihnen hörst du auf, ein <em>Vibe-Coder</em> zu sein, und wirst zum echten App-Entwickler.
                  </p>
                  <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                    <p className="text-sm font-semibold text-[#37352F]">So benutzt du diesen Guide</p>
                    <p className="mt-2 text-sm leading-6 text-[#5B5851]">
                      Jeder Punkt hat zwei Dinge: eine einfache Erklärung, was es ist und warum es wichtig ist, und einen fertigen Prompt zum Reinkopieren in{" "}
                      <strong className="text-[#37352F]">Claude Code</strong> (dein Terminal). Jeder Prompt ist so gebaut, dass Claude{" "}
                      <strong className="text-[#37352F]">zuerst prüft</strong> – er sagt dir, wo du stehst, ohne etwas anzufassen – und erst wenn du zustimmst, setzt er es um. So zerstörst du nichts, was schon funktioniert. Du musst nicht programmieren können: kopieren, einfügen, leiten.
                    </p>
                  </div>
                  <p>
                    Falls du Claude Code noch nicht in deinem Terminal hast, schau dir zuerst die <strong className="font-semibold text-[#37352F]">Einrichtungsanleitung</strong> an, die wir am Ende verlinken. Wenn du es bereits hast, fang direkt an: Wir starten mit der Basis.
                  </p>
                </div>
              </section>

              {/* Sektion 2: Die Basis */}
              <section id="die-basis" className="scroll-mt-24">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">die basis · punkte 1 bis 5</p>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                  Die Basis: 5 Punkte, ohne die nichts läuft
                </h2>
                <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                  <p>
                    Diese fünf sind das Fundament. Fehlen sie, ist es egal, wie schön deine App aussieht: von innen ist sie offen, zerbrechlich oder auf deinem Computer gefangen. Fang hier an, der Reihe nach, und lass Claude Code jeden Punkt prüfen, bevor du etwas änderst.
                  </p>
                  <div className="space-y-8">

                    {/* Punkt 01 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#8B8B85]">01</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#37352F]" aria-hidden="true">
                          <path d="M4 9.8V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3"/>
                          <path d="M14 2v5a1 1 0 0 0 1 1h5"/>
                          <path d="M9 17v-2a2 2 0 0 0-4 0v2"/>
                          <rect width="8" height="5" x="3" y="17" rx="1"/>
                        </svg>
                        <h3 className="text-lg font-semibold text-[#2f2d27]">Komprimiertes Frontend</h3>
                      </div>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Was das ist:</strong> Deine App wird gepackt und minifiziert veröffentlicht, ohne die „Source Maps", die deinen originalen Code rekonstruieren.
                      </p>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Warum es wichtig ist:</strong> Ohne das öffnet jeder die Browser-Entwicklertools und sieht deinen Code – und schlimmer noch: deine privaten API-Keys.
                      </p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">Frontend komprimieren und Keys verstecken</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Claude Code prüft Source Maps und exponierte Secrets im Client und sagt dir, was auf den Server muss.</p>
                          </div>
                          <CopyButton text={PROMPT_01} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_01}</pre>
                        </div>
                      </div>
                    </div>

                    {/* Punkt 02 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#8B8B85]">02</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#37352F]" aria-hidden="true">
                          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <h3 className="text-lg font-semibold text-[#2f2d27]">Datenbank mit RLS</h3>
                      </div>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Was das ist:</strong> Ein Schloss auf Datenbankebene: Jede Zeile kann nur von ihrem Eigentümer gesehen und angefasst werden.
                      </p>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Warum es wichtig ist:</strong> Ohne RLS kann ein neugieriger Nutzer die Daten eines anderen abfragen. Das ist das häufigste Datenleck in schnell gebauten Apps.
                      </p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">Datenbank mit RLS absichern</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Prüft Tabelle für Tabelle und schlägt Richtlinien vor, damit jeder Nutzer nur seine eigenen Daten sieht.</p>
                          </div>
                          <CopyButton text={PROMPT_02} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_02}</pre>
                        </div>
                      </div>
                    </div>

                    {/* Punkt 03 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#8B8B85]">03</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#37352F]" aria-hidden="true">
                          <path d="M15 6a9 9 0 0 0-9 9V3"/>
                          <circle cx="18" cy="6" r="3"/>
                          <circle cx="6" cy="18" r="3"/>
                        </svg>
                        <h3 className="text-lg font-semibold text-[#2f2d27]">Versionskontrolle</h3>
                      </div>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Was das ist:</strong> Git speichert jede Version deines Codes, damit du ohne Angst vorankommst und zurückgehen kannst, wenn etwas kaputtgeht.
                      </p>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Warum es wichtig ist:</strong> Ohne das zerstört eine schlechte Bearbeitung deine App, und es gibt keinen sauberen Weg, zurück zu dem zu kommen, was funktioniert hat.
                      </p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">Versionskontrolle mit Git einrichten</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Initialisiert Git, entfernt Secrets aus der History und zeigt dir, wie du ohne Schaden zurückgehst.</p>
                          </div>
                          <CopyButton text={PROMPT_03} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_03}</pre>
                        </div>
                      </div>
                    </div>

                    {/* Punkt 04 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#8B8B85]">04</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#37352F]" aria-hidden="true">
                          <path d="M12 22v-5"/>
                          <path d="M15 8V2"/>
                          <path d="M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z"/>
                          <path d="M9 8V2"/>
                        </svg>
                        <h3 className="text-lg font-semibold text-[#2f2d27]">Saubere APIs</h3>
                      </div>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Was das ist:</strong> Die Türen, durch die deine App mit anderen Diensten spricht (Zahlungen, E-Mail, KI) und durch die andere mit ihr sprechen.
                      </p>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Warum es wichtig ist:</strong> Schlecht gebaut lassen sie rein, wer nicht rein soll, oder fallen aus. Gut gebaut macht deine App echte Sachen, sieht nicht nur schön aus.
                      </p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">APIs ordnen und absichern</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Macht ein Inventar deiner Endpunkte, markiert unsichere und schlägt eine einheitliche Struktur vor.</p>
                          </div>
                          <CopyButton text={PROMPT_04} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_04}</pre>
                        </div>
                      </div>
                    </div>

                    {/* Punkt 05 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#8B8B85]">05</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#37352F]" aria-hidden="true">
                          <path d="M12 13v8"/>
                          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
                          <path d="m8 17 4-4 4 4"/>
                        </svg>
                        <h3 className="text-lg font-semibold text-[#2f2d27]">Hosting und Deployment</h3>
                      </div>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Was das ist:</strong> Deine App ins Internet stellen, damit sie auf einer echten Domain lebt und nicht nur auf deinem localhost:3000.
                      </p>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Warum es wichtig ist:</strong> Wenn sie nur auf deinem Computer läuft, kann niemand sie benutzen oder kaufen. Hier geht sie live und stabil.
                      </p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">App online stellen</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Gibt dir den Deployment-Plan Schritt für Schritt, von localhost zu einer echten stabilen Domain.</p>
                          </div>
                          <CopyButton text={PROMPT_05} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_05}</pre>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Sektion 3: Für den Verkauf */}
              <section id="zum-verkaufen" className="scroll-mt-24">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">für den echten verkauf · punkte 6 bis 10</p>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                  Für den echten Verkauf: die anderen 5
                </h2>
                <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                  <p>
                    Wenn die Basis steht, funktioniert deine App. Diese fünf sind es, die dafür sorgen, dass sie die echte Welt aushält: Leute, die versuchen reinzukommen, Lastspitzen, Bots, die dir das Guthaben verbrennen wollen, und der Moment, in dem etwas kaputt geht und du es als Erster mitbekommen musst. Hier hörst du auf, ein Demo zu haben, und fängst an, ein Produkt zu haben, für das du Geld nehmen kannst.
                  </p>
                  <div className="space-y-8">

                    {/* Punkt 06 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#8B8B85]">06</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#37352F]" aria-hidden="true">
                          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
                          <path d="m9 12 2 2 4-4"/>
                        </svg>
                        <h3 className="text-lg font-semibold text-[#2f2d27]">Sicherheit</h3>
                      </div>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Was das ist:</strong> Die Lücken schließen, durch die jemand reinkommen könnte: schwacher Login, unvalidierte Daten, offene Endpunkte.
                      </p>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Warum es wichtig ist:</strong> Eine einzige Lücke und jemand leert dein Konto oder stiehlt Daten deiner Nutzer. Das ist das Teuerste, was dir passieren kann.
                      </p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">Sicherheitslücken schließen</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Prüft Login, Sessions und häufige Schwachstellen und sortiert sie nach Schweregrad.</p>
                          </div>
                          <CopyButton text={PROMPT_06} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_06}</pre>
                        </div>
                      </div>
                    </div>

                    {/* Punkt 07 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#8B8B85]">07</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#37352F]" aria-hidden="true">
                          <path d="m12 14 4-4"/>
                          <path d="M3.34 19a10 10 0 1 1 17.32 0"/>
                        </svg>
                        <h3 className="text-lg font-semibold text-[#2f2d27]">Rate Limiting</h3>
                      </div>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Was das ist:</strong> Eine Begrenzung, wie oft jemand in einer bestimmten Zeit Anfragen an deine App schicken kann.
                      </p>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Warum es wichtig ist:</strong> Ohne das schlägt ein Bot tausendmal auf deinen KI-Endpunkt ein und verbrennt dir in Minuten das Guthaben und das Konto.
                      </p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">Rate Limiting einrichten</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Findet deine teuren Endpunkte und schlägt Limits vor, damit niemand dir das Guthaben verbrennt.</p>
                          </div>
                          <CopyButton text={PROMPT_07} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_07}</pre>
                        </div>
                      </div>
                    </div>

                    {/* Punkt 08 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#8B8B85]">08</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#37352F]" aria-hidden="true">
                          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
                        </svg>
                        <h3 className="text-lg font-semibold text-[#2f2d27]">Caching</h3>
                      </div>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Was das ist:</strong> Ergebnisse speichern, die sich kaum ändern, damit sie nicht bei jedem Besuch neu berechnet werden.
                      </p>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Warum es wichtig ist:</strong> Ohne Caching ist deine App langsam, die Leute werden ungeduldig und brechen ab. Mit Caching fliegt sie.
                      </p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">App mit Caching beschleunigen</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Erkennt langsame und wiederholte Operationen und sagt dir, was du wie lange cachen solltest.</p>
                          </div>
                          <CopyButton text={PROMPT_08} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_08}</pre>
                        </div>
                      </div>
                    </div>

                    {/* Punkt 09 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#8B8B85]">09</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#37352F]" aria-hidden="true">
                          <path d="M16 7h6v6"/>
                          <path d="m22 7-8.5 8.5-5-5L2 17"/>
                        </svg>
                        <h3 className="text-lg font-semibold text-[#2f2d27]">Skalierbarkeit</h3>
                      </div>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Was das ist:</strong> Sie so bauen, dass sie viele gleichzeitige Nutzer aushält, ohne einzubrechen.
                      </p>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Warum es wichtig ist:</strong> An dem Tag, an dem 1.000 Nutzer gleichzeitig kommen, fällt eine App ohne das genau dann aus, wenn du sie am meisten brauchst.
                      </p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">App skalierbar machen</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Findet die Engpässe, bevor 1.000 Nutzer gleichzeitig auftauchen.</p>
                          </div>
                          <CopyButton text={PROMPT_09} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_09}</pre>
                        </div>
                      </div>
                    </div>

                    {/* Punkt 10 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#8B8B85]">10</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#37352F]" aria-hidden="true">
                          <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>
                        </svg>
                        <h3 className="text-lg font-semibold text-[#2f2d27]">Monitoring</h3>
                      </div>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Was das ist:</strong> Augen auf deine Live-App: Fehler, Ausfälle, Langsamkeit und Kosten – mit Alerts, die dich benachrichtigen.
                      </p>
                      <p className="text-sm leading-6 text-[#5B5851]">
                        <strong className="text-[#37352F]">Warum es wichtig ist:</strong> Das Wichtigste überhaupt: Wenn du nicht siehst, was kaputt geht, erfährst du es von einem verärgerter Nutzer. Hier erfährst du es zuerst.
                      </p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">Monitoring einrichten</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Verbindet Fehlererfassung und Alerts, damit du es vor einem verärgerter Nutzer weißt.</p>
                          </div>
                          <CopyButton text={PROMPT_10} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_10}</pre>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Sektion 4: Audit */}
              <section id="audit" className="scroll-mt-24">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">alles auf einmal</p>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                  Alle 10 Punkte in einem Rutsch prüfen
                </h2>
                <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                  <p>
                    Wenn du nicht jeden Punkt einzeln durchgehen willst, prüft dieser Prompt alle 10 Schichten zusammen und gibt dir eine{" "}
                    <strong className="font-semibold text-[#37352F]">Checkliste mit Ampel</strong> zurück: Grün für das, was passt, Gelb für das, was verbessert werden sollte, und Rot für das, was dringend ist. Am Ende sortiert er dir die 3 wichtigsten Fixes, damit du weißt, wo du anfängst.
                  </p>
                  <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[#2f2d27]">Master-Audit aller 10 Punkte</h3>
                        <p className="mt-1 text-sm text-[#5f5b53]">Claude Code prüft deine App gegen alle 10 Schichten und gibt dir eine Checkliste mit Ampel und den 3 dringendsten Fixes.</p>
                      </div>
                      <CopyButton text={PROMPT_MASTER} />
                    </div>
                    <div className="rounded-lg bg-[#171717] p-3">
                      <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_MASTER}</pre>
                    </div>
                  </div>
                  <p>
                    Nutze ihn als deinen Radar vor dem Launch und führe ihn von Zeit zu Zeit wieder aus. Wenn ein Punkt rot wird, geh zurück zum entsprechenden Abschnitt oben und feuere den spezifischen Prompt ab. Denk daran: Der Audit schaut nur – er ändert nichts, bis du es genehmigst.
                  </p>
                </div>
              </section>

              {/* Sektion 5: FAQ */}
              <section id="faq" className="scroll-mt-24">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">häufige fragen</p>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                  FAQ
                </h2>
                <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                  <div className="space-y-4">
                    <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                      <p className="text-sm font-semibold text-[#37352F]">Muss ich programmieren können?</p>
                      <p className="mt-2 text-sm leading-6 text-[#5B5851]">
                        Nein – weder um es zu verstehen noch um es auszuführen. Die Prompts machen die technische Arbeit: Du kopierst, fügst ein und leitest. Es hilft, Claude Code im Terminal installiert zu haben, weil dort der Audit und die Änderungen passieren.
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                      <p className="text-sm font-semibold text-[#37352F]">Funktioniert das mit Claude Code oder mit Claude.ai?</p>
                      <p className="mt-2 text-sm leading-6 text-[#5B5851]">
                        Mit Claude Code – dem, das in deinem Terminal lebt und dein Projekt lesen und bearbeiten kann. Der Chat von Claude.ai erklärt dir Konzepte, aber er fasst deinen Code nicht an. Um wirklich zu prüfen und umzusetzen, brauchst du das Terminal.
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                      <p className="text-sm font-semibold text-[#37352F]">Muss ich alle 10 auf einmal machen?</p>
                      <p className="mt-2 text-sm leading-6 text-[#5B5851]">
                        Nein. Starte zuerst mit dem Master-Audit, um deine Ampel zu sehen, und geh das Rote an. Die Punkte 1 bis 5 sind das Fundament; 6 bis 10 fügst du hinzu, wenn deine App wächst und echte Nutzer hat.
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                      <p className="text-sm font-semibold text-[#37352F]">Funktioniert das mit jedem Stack oder nur mit einem bestimmten?</p>
                      <p className="mt-2 text-sm leading-6 text-[#5B5851]">
                        Die 10 Punkte gelten für jede App. Die konkreten Tools (welche Datenbank, wo hosten) ändern sich je nach Projekt – deshalb bitten die Prompts Claude, sich an deinen Stack anzupassen, statt dir einen aufzuzwingen.
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                      <p className="text-sm font-semibold text-[#37352F]">Wo fange ich an, wenn ich total verloren bin?</p>
                      <p className="mt-2 text-sm leading-6 text-[#5B5851]">
                        Bei Punkt 1 (keine Keys sichtbar) und Punkt 2 (RLS). Das sind die zwei, die dich am schnellsten in Schwierigkeiten bringen, wenn du sie offen lässt. Von dort aus folgst du der Reihenfolge.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

            </div>

            {/* Footer-Bereich */}
            <div className="mt-14 space-y-6 border-t border-[#EBEBEA] pt-8">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Abschluss</p>
                <p className="text-sm leading-relaxed text-[#5f5b53]">
                  Eine App, die sich verkauft, ist nicht die mit den meisten Screens – es ist die, die hält. Diese 10 Schichten sind es, die ein hübsches Demo von einem Produkt trennen, das Leute zahlen, ohne dass es nach einer Woche auseinanderfällt. Mach sie nicht alle heute: Führe den Audit aus, geh das Rote an und füge den Rest hinzu, während du wächst. Da hörst du auf, ein <em>Vibe-Coder</em> zu sein, und wirst zum echten App-Entwickler.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-[#37352F]">Tools, die wir erwähnen</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <a target="_blank" rel="noreferrer" className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 transition-colors hover:bg-[#F1F1EE]" href="https://supabase.com">
                    <p className="text-sm font-semibold text-[#37352F]">Supabase</p>
                    <p className="mt-2 text-xs leading-5 text-[#5B5851]">Eine Datenbank auf Postgres-Basis mit integriertem RLS – beliebt, um das Nutzer-Schloss zu aktivieren.</p>
                  </a>
                  <a target="_blank" rel="noreferrer" className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 transition-colors hover:bg-[#F1F1EE]" href="https://vercel.com">
                    <p className="text-sm font-semibold text-[#37352F]">Vercel</p>
                    <p className="mt-2 text-xs leading-5 text-[#5B5851]">Einer der einfachsten Wege, deine App von localhost live zu bringen – mit Domain und HTTPS.</p>
                  </a>
                  <a target="_blank" rel="noreferrer" className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 transition-colors hover:bg-[#F1F1EE]" href="https://sentry.io">
                    <p className="text-sm font-semibold text-[#37352F]">Sentry</p>
                    <p className="mt-2 text-xs leading-5 text-[#5B5851]">Fängt die Fehler deiner App in Produktion auf und benachrichtigt dich, wenn etwas live kaputt geht.</p>
                  </a>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a className="flex items-center gap-2 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 text-sm font-medium text-[#37352F] transition-colors hover:bg-[#F1F1EE]" href="/tutorials/token-efficient">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
                  </svg>
                  <div>
                    <p className="font-semibold">Token-effizient mit Claude</p>
                    <p className="text-xs text-[#8B8B85]">Bis zu 63% Tokens sparen mit einer einzigen Datei.</p>
                  </div>
                </a>
                <a className="flex items-center gap-2 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 text-sm font-medium text-[#37352F] transition-colors hover:bg-[#F1F1EE]" href="/tutorials">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
                    <path d="M12 19h8"/>
                    <path d="m4 17 6-6-6-6"/>
                  </svg>
                  <div>
                    <p className="font-semibold">Alle Tutorials</p>
                    <p className="text-xs text-[#8B8B85]">Weitere Guides rund um Claude Code und KI-Apps.</p>
                  </div>
                </a>
              </div>

              <p className="flex flex-wrap items-center gap-2 text-xs leading-relaxed text-[#8B8B85]">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
                  <path d="M15 3h6v6"/>
                  <path d="M10 14 21 3"/>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                </svg>
                Diese Seite ist nicht mit Supabase, Vercel oder Sentry verbunden – wir nennen sie als gängige Beispiele. Tools und Pläne ändern sich; im Zweifelsfall prüfe direkt auf der jeweiligen Website.
              </p>
            </div>

          </div>
        </main>

        {/* Mobile Bottom Bar */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E6E6E4] bg-[#F7F7F5]/95 px-3 py-2 backdrop-blur sm:hidden">
          <div className="flex items-center gap-2">
            <a
              aria-label="Zur Startseite"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] text-lg shadow-sm transition-colors hover:bg-[#F0F0ED]"
              href="/tutorials"
            >
              <span aria-hidden="true">🏠</span>
            </a>
            <div className="flex w-full items-center gap-1 overflow-x-auto rounded-2xl border border-[#E6E6E4] bg-white p-1 shadow-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTab(tab.id)}
                  className={`flex shrink-0 items-center rounded-xl px-3 py-2 text-xs font-medium transition-colors duration-300 ${
                    activeTab === tab.id
                      ? "bg-[#EBEBEA] font-semibold text-[#1f1e1a]"
                      : "text-[#6a665f] hover:bg-[#F0F0ED] hover:text-[#37352F]"
                  }`}
                >
                  <span className="mr-1 font-mono text-[10px] text-[#8B8B85]">{tab.num}</span>
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
