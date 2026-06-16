"use client";

import { useState } from "react";

// ─── Prompts ────────────────────────────────────────────────────────────────

const PROMPT_START = `(Claude Code oder Codex)

Kontext: Ich bereite diese App vor, um von 10 auf tausend Nutzer zu skalieren. Bevor ich Code ändere, will ich eine ehrliche Diagnose. Mein Stack ist {Sprache/Framework}, Datenbank {Postgres / MySQL / ...}, Hosting {Vercel / AWS / Railway / ...}.

Aufgabe:
1. Geh das Projekt durch und sag mir, wo die vier Skalierungsrisiken liegen: Queries ohne Index oder mit SELECT *, Dinge, die immer wieder berechnet werden und nicht gecacht sind, schwere Operationen, die live laufen (E-Mails, Reports), und ob es irgendein Load Testing gibt.
2. Sortiere die Funde nach Auswirkung: Was bricht zuerst, wenn 100 und dann 1000 Nutzer kommen?
3. Ändere noch NICHTS. Gib mir nur die Karte.

Was ich als Output will: Eine priorisierte Liste mit [Risiko · Datei · Was passiert beim Skalieren · Welcher der vier Fixes das löst], damit ich sie Schritt für Schritt mit den Prompts für jeden Bereich angehen kann.`;

const PROMPT_INDEX_1 = `(Claude Code oder Codex)

Kontext: Diese App verwendet {deine Datenbank: Postgres / MySQL / SQLite / ...}. Ich will, dass Queries auch dann noch schnell bleiben, wenn die Datenmenge von hundert auf hunderttausend Zeilen wächst.

Aufgabe:
1. Finde die Datenbankabfragen, die am häufigsten ausgeführt werden (die der Hauptseiten und meist genutzten Endpunkte).
2. Prüfe für jede Query, nach welchen Spalten gefiltert, sortiert oder gejoined wird.
3. Sag mir, welche KEINEN passenden Index haben und bei mehr Daten einen Full Table Scan machen würden.
4. Schlage die fehlenden Indizes vor (mit dem genauen CREATE INDEX) und erkläre in einer Zeile, welche Query jeder Index beschleunigt.

Grenzen:
- Leg keinen Index für jede Spalte "auf Vorrat" an: nur die, die wirklich von echten Queries verwendet werden. Zu viele Indizes verlangsamen Schreiboperationen.
- Zeig mir die Liste, bevor du irgendetwas änderst, und warte auf mein OK.

Was ich als Output will: Eine Tabelle [Query · Spalten · vorgeschlagener Index · was er beschleunigt], und danach die Migration fertig zum Anwenden.`;

const PROMPT_INDEX_2 = `(Claude Code oder Codex)

Kontext: Ich vermute, dass es langsame Queries und N+1-Probleme gibt (eine Query, die innerhalb einer Schleife viele weitere auslöst). Ich verwende {dein ORM / Stack: Prisma, Drizzle, ActiveRecord, ...}.

Aufgabe:
1. Suche Stellen, an denen die Datenbank innerhalb einer Schleife oder eines Listen-Renders abgefragt wird (das ist meistens ein N+1).
2. Suche SELECT-Statements, die zu viele Spalten oder Zeilen holen (SELECT * wo nur zwei Felder gebraucht werden, Listen ohne Limit oder Paginierung).
3. Schätze für die heißen Stellen, wie die Ladezeit wächst, wenn die Tabelle von 100 auf 100 000 Zeilen geht.

Grenzen:
- Schreibe noch nichts um: Ich will zuerst die Diagnose, sortiert von schlimmsten nach weniger schlimmen.
- Markiere jeden Fund als [kritisch / mittel / gering] und sag mir den konkreten Fix (Eager Loading, Paginierung, nur benötigte Felder selektieren, Index).

Was ich als Output will: Priorisierte Liste problematischer Queries mit Datei und Zeile sowie dem vorgeschlagenen Fix für jede.`;

const PROMPT_CACHE_1 = `(Claude Code oder Codex)

Kontext: Es gibt Dinge, die meine App immer wieder berechnet, obwohl sich das Ergebnis kaum ändert. Ich will eine klare Caching-Strategie, bevor ich überall Cache einbaue.

Aufgabe:
1. Finde heraus, was immer wieder berechnet oder abgefragt wird und teuer ist: Dashboards, Aggregationen, Antworten externer APIs, Seiten, die sich kaum ändern.
2. Entscheide für jeden Kandidaten: Wird es gecacht? Wie lang (TTL)? Mit welchem Key? Und wann wird es invalidiert (welches Ereignis macht es alt)?
3. Empfehle mir, wo der Cache lebt (Prozess-Speicher, Redis, CDN-/HTTP-Cache) je nach Fall.

Grenzen:
- Cache keine Daten, die sich sofort ändern, und keine nutzerspezifischen Daten ohne den Nutzer im Key (ich will nicht einem Nutzer die Daten eines anderen ausliefern).
- Definiere IMMER, wie jeder Cache invalidiert wird.

Was ich als Output will: Eine Tabelle [was gecacht wird · wo · TTL · Key · wann invalidiert], bevor Code angefasst wird.`;

const PROMPT_CACHE_2 = `(Claude Code oder Codex)

Kontext: Wir haben schon geklärt, was sich zu cachen lohnt (aus der Strategie vorhin). Jetzt implementiere es. Ich verwende {Redis / In-Memory-Cache / was verfügbar ist}.

Aufgabe:
1. Implementiere den Cache für {die konkrete Berechnung oder den Endpunkt}: einmal berechnen, mit Key und TTL speichern und bei folgenden Aufrufen direkt ausliefern.
2. Implementiere die Invalidierung: Wenn sich {das betroffene Datum} ändert, lösche oder aktualisiere den Eintrag.
3. Baue einen Fallback ein: Wenn der Cache fehlschlägt oder leer ist, wird neu berechnet, ohne dass etwas kaputt geht.

Grenzen:
- Ändere das sichtbare Verhalten nicht: Der Nutzer soll dasselbe sehen, nur schneller.
- Miss es: Zeig mir den Vorher-Nachher-Vergleich (Antwortzeit oder DB-Anfragen), um zu bestätigen, dass es was gebracht hat.

Was ich als Output will: Den Cache-Code + die Invalidierung und eine Notiz, wie viel Zeit oder Last reduziert wurde.`;

const PROMPT_ASYNC_1 = `(Claude Code oder Codex)

Kontext: Es gibt Operationen, die den Nutzer warten lassen: E-Mails senden, Reports oder PDFs generieren, Bilder verarbeiten, langsame APIs aufrufen. Ich will, dass die zu asynchroner Verarbeitung übergehen, damit die Antwort sofort kommt.

Aufgabe:
1. Finde die schweren Operationen, die heute "live" innerhalb der Nutzeranfrage laufen.
2. Für jede: Nimm sie aus der Anfrage heraus, stelle sie als Hintergrundjob in die Queue und antworte sofort (z. B. "Dein Report wird erstellt, du bekommst Bescheid").
3. Manage den Status: Woher weiß der Nutzer, wenn es fertig ist (Benachrichtigung, Polling oder Webhook)?

Grenzen:
- Bau nicht für alles eine Queue: Nur für das, was wirklich dauert oder scheitern kann und einen Retry verdient.
- Jeder Job muss wiederholbar sein, ohne den Effekt zu duplizieren (nicht zweimal dieselbe E-Mail senden).

Was ich als Output will: Die Liste der Operationen, die sich lohnen zu verschieben, und die Implementierung der ersten von Anfang bis Ende (in Queue stellen → verarbeiten → benachrichtigen).`;

const PROMPT_ASYNC_2 = `(Claude Code oder Codex)

Kontext: Ich brauche die Queue-Infrastruktur, um Jobs im Hintergrund zu verarbeiten. Ich verwende {dein Stack: Node, Python, Ruby, ...}. Wähle das Standard-Tool für meinen Stack ({BullMQ, Celery, Sidekiq, was passt}) und erkläre mir, warum.

Aufgabe:
1. Konfiguriere die Queue und einen Worker, der Jobs außerhalb der Web-Anfrage verarbeitet.
2. Bau Retries mit progressivem Warten ein und eine Dead-Letter-Queue für Jobs, die endgültig scheitern, damit nichts verloren geht.
3. Lass einen Beispiel-Job von Anfang bis Ende laufen, den ich als Vorlage kopieren kann.

Grenzen:
- Halte es einfach: Keine Microservices oder Extra-Queues, die ich noch nicht brauche.
- Erkläre mir in klarer Sprache, wie ich den Worker lokal und in Produktion starte.

Was ich als Output will: Die Queue konfiguriert, ein laufender Worker, ein Beispiel-Job und die Anleitung zum Starten.`;

const PROMPT_LOAD_1 = `(Claude Code oder Codex)

Kontext: Ich will Load Testing machen, bevor ich launche, um herauszufinden, wo meine App bricht. Ich verwende k6. Die wichtigsten Routen sind {deine Startseite, Login, der meistgenutzte Endpunkt, Checkout, ...}.

Aufgabe:
1. Erstelle ein k6-Skript, das diese Routen so ansteuert, wie es ein echter Nutzer tun würde (nicht nur die Startseite: den kompletten Flow).
2. Konfiguriere Szenarien, die die Last schrittweise erhöhen: 10, 100, 500 und 1000 gleichzeitige Nutzer.
3. Definiere, was "akzeptabel" ist (z. B.: 95 % der Antworten unter 500 ms, 0 % Fehler), damit der Test von selbst besteht oder scheitert.

Grenzen:
- Zeige IMMER auf eine Test- oder Staging-Umgebung, niemals auf Produktion mit echten Nutzern.
- Verwende realistische Daten (Test-Accounts für Login, verschiedene Suchanfragen, nicht immer dieselbe).

Was ich als Output will: Das k6-Skript fertig, den Befehl zum Ausführen und wie ich den Report lese.`;

const PROMPT_LOAD_2 = `(Claude Code oder Codex)

Kontext: Ich habe das k6-Skript schon. Jetzt will ich den Lauf und die Diagnose. Meine App läuft auf {dein Hosting: Vercel, AWS, Railway, ...} und die Datenbank auf {Postgres auf ...}.

Aufgabe:
1. Starte den Test mit bis zu 1000 gleichzeitigen Nutzern.
2. Finde den Punkt, an dem es anfängt abzubauen: Bei wie vielen Nutzern steigen die Ladezeiten, wo tauchen Fehler auf, welche Ressource sättigt zuerst (Datenbank, CPU, Speicher, Verbindungen).
3. Ordne jeden Engpass einem konkreten Fix zu: Fehlender Index? Fehlendes Caching? Etwas Schweres, das async sein sollte? Zu wenige DB-Verbindungen?

Grenzen:
- Gib mir nicht nur die Endzahl: Ich will wissen, WAS zuerst gebrochen ist und warum.
- Wenn du den Test selbst läufst, erinnere mich daran, den Server hochzufahren; der Lauf dauert ein paar Minuten.

Was ich als Output will: Der Test-Report, der Cliff (bei wie vielen Nutzern es bricht), die sättigende Ressource und die Liste der Fixes in Reihenfolge nach Auswirkung.`;

// ─── Tab-Konfiguration ───────────────────────────────────────────────────────

const TABS = [
  { id: "cliff", label: "Der Cliff", num: "01" },
  { id: "wie-fragen", label: "Wie du fragst", num: "02" },
  { id: "indexing", label: "Indexing", num: "03" },
  { id: "caching", label: "Caching", num: "04" },
  { id: "async", label: "Async", num: "05" },
  { id: "load-testing", label: "Load Testing", num: "06" },
  { id: "checklist", label: "Checklist", num: "07" },
  { id: "faq", label: "FAQ", num: "08" },
];

// ─── Hilfkomponenten ─────────────────────────────────────────────────────────

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

function PromptBlock({ title, desc, code }: { title: string; desc: string; code: string }) {
  return (
    <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[#2f2d27]">{title}</h3>
          <p className="mt-1 text-sm text-[#5f5b53]">{desc}</p>
        </div>
        <CopyButton text={code} />
      </div>
      <div className="rounded-lg bg-[#171717] p-3">
        <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">
          {code}
        </pre>
      </div>
    </div>
  );
}

// ─── Hauptseite ──────────────────────────────────────────────────────────────

export default function AppSkalierenPage() {
  const [activeTab, setActiveTab] = useState("cliff");

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#37352F]">
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-5xl px-4 pb-28 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:py-12">

          {/* Breadcrumb – nur Desktop */}
          <div className="mb-8 hidden flex-wrap items-center gap-2 text-sm text-[#8B8B85] sm:flex">
            <a className="transition-colors hover:text-[#37352F]" href="/tutorials">
              Tutorials
            </a>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
            <span className="font-medium text-[#37352F]">App skalieren</span>
          </div>

          {/* Header */}
          <header className="mb-8 sm:mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-[#23211d] sm:text-5xl">
              Deine App schafft 10 Nutzer. Und 1000? Der Scaling Cliff – und wie du ihn mit Claude überwindest
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#5B5851] sm:text-lg sm:leading-8">
              Läuft perfekt mit 10 Nutzern, kriecht bei 100 und stürzt bei 1000 ab. Das ist der Scaling Cliff – und Apps, die mit KI gebaut wurden, trifft es besonders hart: Der Code ist darauf optimiert,{" "}
              <strong className="text-[#37352F]">dass er funktioniert, nicht dass er skaliert</strong>. Hier sind die genauen Prompts – für Claude Code oder Codex – für die drei Dinge, die das in deinem eigenen Code ohne eine einzige selbst geschriebene Zeile beheben, plus das Load Testing, das fast niemand macht.
            </p>
          </header>

          {/* Auf einen Blick */}
          <div className="mb-6 sm:mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Auf einen Blick</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { num: "01", icon: <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />, label: "Was ist der Scaling Cliff" },
                { num: "02", icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z" />, label: "Die 3 Fixes: Indexing, Caching, Async" },
                { num: "03", icon: <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />, label: "Load Testing vor dem Launch" },
                { num: "04", icon: <><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" /><path d="m14 7 3 3" /><path d="M5 6v4" /><path d="M19 14v4" /><path d="M10 2v2" /><path d="M7 8H3" /><path d="M21 16h-4" /><path d="M11 3H9" /></>, label: "Checklist + fertige Prompts" },
              ].map(({ num, icon, label }) => (
                <div key={num} className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-xs text-[#8B8B85]">{num}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#37352F]" aria-hidden="true">
                      {icon}
                    </svg>
                  </div>
                  <p className="text-sm font-semibold leading-5 text-[#37352F]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Inhaltsübersicht */}
          <div className="mb-8 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:mb-10 sm:p-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                der cliff · wie du fragst · indexing · caching · async · load testing · checklist · FAQ
              </p>
              <p className="text-sm font-semibold text-[#37352F]">
                Die genauen Prompts, damit deine App 1000 Nutzer verträgt, nicht nur zehn
              </p>
              <p className="max-w-3xl text-sm leading-6 text-[#5B5851]">
                Erst verstehst du das Problem: warum eine App, die mit 10 Nutzern fliegt, bei 1000 zusammenbricht – und warum KI-generierter Code besonders anfällig ist. Dann kommt das Umsetzbare: wie du diese Prompts richtig an deinen Agenten gibst und die drei Fixes, die er direkt in deinem Code anwendet – Indexing damit Queries nicht sterben wenn die Daten wachsen, Caching damit nichts tausendmal berechnet wird, und Async damit der Nutzer nicht auf E-Mails oder Reports wartet. Am Ende kommt das, was fast niemand macht: Load Testing (tausend Nutzer simulieren und den Cliff finden bevor deine Nutzer es tun), ein Checklist vor dem Launch und ein kurzes FAQ.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { href: "#cliff", icon: <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />, label: "Der Cliff" },
                { href: "#wie-fragen", icon: <><path d="M12 19h8" /><path d="m4 17 6-6-6-6" /></>, label: "Wie du fragst" },
                { href: "#indexing", icon: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" /></>, label: "Indexing" },
                { href: "#caching", icon: <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />, label: "Caching" },
                { href: "#async", icon: <><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></>, label: "Async" },
                { href: "#load-testing", icon: <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />, label: "Load Testing" },
                { href: "#checklist", icon: <><path d="M13 5h8" /><path d="M13 12h8" /><path d="M13 19h8" /><path d="m3 17 2 2 4-4" /><path d="m3 7 2 2 4-4" /></>, label: "Checklist" },
                { href: "#faq", icon: <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></>, label: "FAQ" },
              ].map(({ href, icon, label }) => (
                <a key={href} href={href} className="inline-flex items-center gap-1.5 rounded-lg border border-[#E6E6E4] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#37352F] transition-colors hover:bg-[#F1F1EE]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
                    {icon}
                  </svg>
                  {label}
                </a>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#E6E6E4] pt-3">
              {["Für Claude Code oder Codex", "Copy-Paste-Prompts", "Kein Code selbst schreiben", "Basiert auf Postgres und k6", "Checklist vor dem Launch"].map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-medium text-[#7A7A72]">{tag}</span>
              ))}
            </div>
          </div>

          {/* Tab-Navigation */}
          <nav className="mb-8 flex gap-2 overflow-x-auto pb-2 sm:mb-10 sm:grid sm:grid-cols-8">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollTo(tab.id)}
                className={`min-w-[120px] rounded-md px-3 py-2 text-left text-sm transition-colors sm:min-w-0 ${
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

          {/* ── Sektionen ──────────────────────────────────────────────────── */}
          <div className="space-y-14">

            {/* 01 Der Cliff */}
            <section id="cliff" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">01 das problem</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Was ist der Scaling Cliff – und warum trifft er KI-Apps so hart?
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>
                  Der <strong>Scaling Cliff</strong> ist diese unsichtbare Kante, an der deine App aufhört zu funktionieren – ohne Vorwarnung. Nicht so, dass es langsam schlechter wird: Sie hält durch, hält durch, und kippt dann plötzlich, wenn mehr Leute kommen als erwartet.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { title: "10 Nutzer", desc: "Alles perfekt. Lädt sofort, nichts bricht. Hier launchst du froh drauf los." },
                    { title: "100 Nutzer", desc: "Fängt an zu zähen. Seiten, die ewig laden, Buttons, die nicht beim ersten Klick reagieren." },
                    { title: "1000 Nutzer", desc: "Krachender Absturz. Fehler, Ewigkeitszeiten, Nutzer die gehen und nicht wiederkommen." },
                  ].map(({ title, desc }) => (
                    <div key={title} className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                      <p className="text-sm font-semibold text-[#37352F]">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-[#5B5851]">{desc}</p>
                    </div>
                  ))}
                </div>
                <p>
                  Warum trifft es Apps, die mit KI gebaut wurden, so heftig? Weil der Code, den KI ausspuckt, darauf optimiert ist, <strong>dass er läuft</strong>, nicht darauf, dass er <strong>skaliert</strong>. Er tut was du verlangt hast – mit den Daten, die du hattest (zehn Datensätze, du beim Testen allein) – und das sieht genauso aus wie etwas, das für Produktion bereit ist. Der Unterschied zeigt sich erst beim Volumen. Zwei klassische Beispiele:
                </p>
                <ol className="space-y-3">
                  {[
                    { num: "01", title: "Die Query, die schnell war, hört auf es zu sein", desc: "Diese Datenbankabfrage, die mit 100 Zeilen 50 Millisekunden braucht, braucht mit hunderttausend Zeilen 30 Sekunden. Der Nutzer wartet keine 30 Sekunden: Er schließt den Tab." },
                    { num: "02", title: "Der Aufruf, der bei jedem Laden wiederholt wird", desc: "Dieser Aufruf, den du bei jedem Seitenaufruf machst, geht gut mit 10 Nutzern. Mit tausend, die gleichzeitig einsteigen, ist es eine Todesspirale: Jeder feuert dieselbe Berechnung ab, der Server erstickt." },
                  ].map(({ num, title, desc }) => (
                    <li key={num} className="flex items-start gap-4 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                      <span className="shrink-0 rounded-full bg-[#171717] px-2.5 py-0.5 font-mono text-xs text-zinc-100">{num}</span>
                      <div>
                        <p className="text-sm font-semibold text-[#37352F]">{title}</p>
                        <p className="mt-1 text-sm leading-6 text-[#5B5851]">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p>
                  Der Code ist nicht schlecht. Er wurde einfach nicht fürs Skalieren entworfen. Und die gute Nachricht: Mit drei Dingen, die du deinem Code-Agenten sagst – <strong>Indexing</strong>, <strong>Caching</strong> und <strong>Async</strong> – machst du ihn vor dem Launch bereit, ohne selbst eine einzige Zeile anzufassen. Plus einem vierten Schritt, um zu prüfen, dass es wirklich hält: das <strong>Load Testing</strong>. Eines nach dem anderen.
                </p>
              </div>
            </section>

            {/* 02 Wie du fragst */}
            <section id="wie-fragen" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">02 bevor es losgeht</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Wie du diese Prompts an Claude (oder Codex) gibst, damit sie wirklich funktionieren
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>
                  Alle Prompts in dieser Anleitung sind dafür gemacht, direkt in deinen Code-Agenten gekopiert zu werden – <strong>Claude Code oder Codex</strong>, egal welchen du nutzt. Aber ein guter Prompt beim falschen Agenten bringt nichts. Diese vier Regeln machen den Unterschied zwischen einem echten Fix und einem "hab's versucht, hat sich nichts geändert".
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { title: "Starte ihn im Projektordner", desc: "Dein Agent arbeitet an dem Code, den er sieht. Starte ihn im Root-Verzeichnis des Repos, damit er deine Dateien lesen, Queries finden und wirklich editieren kann – nicht raten." },
                    { title: "Gib ihm Stack-Kontext", desc: "Fülle in jedem Prompt die {geschweifte Klammer} aus: Welche Datenbank, welches Framework, wo gehostet. Ohne das rät der Agent; mit dem gibt er dir den richtigen Fix beim ersten Versuch." },
                    { title: "Ein Bereich nach dem anderen, nicht alles auf einmal", desc: "Bitte ihn nicht um Indexing, Caching und Async in einer Nachricht. Geh sie einen nach dem anderen an: fixen, prüfen, testen, dann der nächste. Einfacher zu reviewen und rückgängig zu machen wenn was schiefläuft." },
                    { title: "Lass ihn erst erklären, dann editieren", desc: "Er soll dir erst zeigen, was er gefunden hat und was er ändern will, und dir den Diff zeigen. Du stimmst zu. So lernst du das Vokabular (das ist beabsichtigt) und kein blinder Change landet im Code." },
                  ].map(({ title, desc }) => (
                    <div key={title} className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                      <p className="text-sm font-semibold text-[#37352F]">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-[#5B5851]">{desc}</p>
                    </div>
                  ))}
                </div>
                <p>Starte ihn im Projektordner und du bist bereit für den ersten Prompt:</p>
                <div className="min-w-0 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                  <p className="mb-3 text-sm font-semibold text-[#37352F]">Geh in den Projektordner und starte deinen Agenten</p>
                  <div className="rounded-lg bg-[#171717] p-3">
                    <code className="block overflow-x-auto whitespace-nowrap text-xs text-zinc-100 sm:text-sm">
                      cd ~/pfad/zu/deinem/projekt &amp;&amp; claude   # oder: codex
                    </code>
                  </div>
                  <CopyButton text="cd ~/pfad/zu/deinem/projekt && claude" label="Befehl kopieren" />
                </div>
                <p>Alle Prompts hier folgen derselben Struktur – so wird ein Prompt aus einem Wunsch zu einer Anweisung, die der Agent ausführen kann:</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "Kontext", desc: "was die App macht, welchen Stack du nutzt, was du erreichen willst" },
                    { label: "Aufgabe", desc: "die konkreten Schritte, nummeriert, die er ausführen soll" },
                    { label: "Grenzen", desc: "was er NICHT tun soll und worauf er achten muss (nichts kaputt machen, nicht übertreiben)" },
                    { label: "Output", desc: "in welcher Form du die Antwort willst (Tabelle, Liste, Code)" },
                  ].map(({ label, desc }) => (
                    <div key={label} className="flex items-start gap-3 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                      <span className="shrink-0 rounded-md bg-[#171717] px-2 py-0.5 font-mono text-[11px] text-zinc-100">{label}</span>
                      <p className="text-sm leading-6 text-[#5B5851]">{desc}</p>
                    </div>
                  ))}
                </div>
                <p>Fang damit an. Bevor du irgendetwas fixst, lass dir die Karte geben: Wo sind die vier Risiken und was bricht zuerst. Damit gehst du den Rest in der Reihenfolge an, die am meisten bringt.</p>
                <PromptBlock
                  title="Der Start-Prompt: Gib mir zuerst die Karte, bevor du irgendetwas anfasst"
                  desc="Fang hier an. Statt blind zu reparieren, bittest du deinen Agenten, das Projekt zu durchsuchen und dir zu sagen, wo die vier Skalierungsrisiken liegen – geordnet nach dem, was zuerst fällt. Mit dieser Karte gehst du die anderen Prompts einen nach dem anderen an."
                  code={PROMPT_START}
                />
              </div>
            </section>

            {/* 03 Indexing */}
            <section id="indexing" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">03 fix 1</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Indexing: damit deine Queries schnell bleiben, egal wie die Daten wachsen
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>
                  Eine <strong>Query</strong> ist jede Frage, die deine App an die Datenbank stellt ("Gib mir die Bestellungen dieses Nutzers"). Ohne einen <strong>Index</strong> prüft die Datenbank Zeile für Zeile, bis sie das Gesuchte findet: Mit 100 Zeilen merkst du es nicht, mit hunderttausend dauert es ewig. Ein Index ist wie das Stichwortverzeichnis am Ende eines Buchs: Statt alle Seiten zu lesen, springt er direkt zur richtigen.
                </p>
                <p>
                  Der typische Fehler bei KI-generiertem Code ist das <code className="rounded bg-[#F0F0EE] px-1.5 py-0.5 text-xs">SELECT *</code> von allem: Es holt alle Spalten und scannt die ganze Tabelle. Was du willst, sind gezielte Abfragen mit Index, die auch bei Datenwachstum schnell bleiben. Sag deinem Agenten, er soll deine Queries durchsehen und die fehlenden Indizes anlegen:
                </p>
                <div className="space-y-4">
                  <PromptBlock
                    title="01 · Analysier mir die Queries und leg die fehlenden Indizes an"
                    desc="Dein Agent geht durch den Code, findet die meistgenutzten Abfragen und sagt dir, welche bei wachsenden Daten einen Full Table Scan machen würden. Er schlägt genau die fehlenden Indizes vor – ohne für jede Spalte einen anzulegen, nur weil er kann."
                    code={PROMPT_INDEX_1}
                  />
                  <PromptBlock
                    title="02 · Finde mir die langsamen Queries und die N+1-Probleme"
                    desc="Das N+1 ist diese Query, die innerhalb einer Schleife viele weitere auslöst: unsichtbar mit 10 Zeilen, tödlich mit hunderttausend. Dieser Prompt jagt sie zusammen mit den SELECT *, sortiert sie von schlimmsten nach weniger schlimmen und sagt dir den konkreten Fix."
                    code={PROMPT_INDEX_2}
                  />
                </div>
              </div>
            </section>

            {/* 04 Caching */}
            <section id="caching" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">04 fix 2</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Caching: berechne dasselbe nicht tausendmal
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>
                  <strong>Caching</strong> bedeutet, das Ergebnis von etwas Teurem zu speichern, damit man es nicht neu berechnen muss. Wenn tausend Leute dasselbe Dashboard anfragen und sich die Zahlen nicht geändert haben, macht es keinen Sinn, es tausendmal von Grund auf zusammenzubauen: Du berechnest es einmal, <strong>cachst</strong> es und lieferst es schnell an alle aus.
                </p>
                <p>
                  Der Trick ist nicht alles zu cachen, sondern mit Köpfchen zu cachen: Was speichern, wie lange, mit welchem Key, und – was fast immer vergessen wird – wann löschen, damit niemand alte Daten sieht. Deshalb kommen zwei Prompts: erst entwirft der Agent die Strategie, dann setzt er sie um.
                </p>
                <div className="space-y-4">
                  <PromptBlock
                    title="01 · Entwirf mir eine Caching-Strategie (kein blindes Cache-Einbauen)"
                    desc="Bevor du cachst, entscheide was gecacht wird, wie lange, mit welchem Key und – am wichtigsten – wann invalidiert wird. Ein Cache ohne Invalidierung ist ein Bug der nur wartet. Dieser Prompt liefert dir diese Tabelle, bevor eine Zeile angefasst wird."
                    code={PROMPT_CACHE_1}
                  />
                  <PromptBlock
                    title="02 · Bau Caching für das, was immer wieder berechnet wird"
                    desc="Mit der Strategie schon festgelegt implementiert dein Agent den Cache von Anfang bis Ende: einmal berechnen, speichern, schnell ausliefern, und die Invalidierung fertig. Er zeigt dir Vorher und Nachher, damit du siehst, dass es wirklich was gebracht hat."
                    code={PROMPT_CACHE_2}
                  />
                </div>
              </div>
            </section>

            {/* 05 Async */}
            <section id="async" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">05 fix 3</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Async: damit der Nutzer nicht auf E-Mails und Reports wartet
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>
                  Wenn jemand in deiner App etwas tut, erwartet er eine Antwort <em>sofort</em>. Aber es gibt Aufgaben, die dauern: Eine E-Mail senden, einen Report generieren, ein Bild verarbeiten. Wenn du das "live" machst, während der Nutzer wartet, lässt du ihn auf einen Spinner starren – und mit tausend gleichzeitigen Nutzern staut sich alles.
                </p>
                <p>
                  <strong>Async</strong> (asynchrone Verarbeitung) trennt das: Statt die schwere Aufgabe in dem Moment zu machen, schickst du sie in eine <strong>Queue</strong> und verarbeitest sie <strong>im Hintergrund</strong>. Der Nutzer bekommt sofort ein "Alles klar, wir bereiten das vor" – und die schwere Arbeit passiert dahinter, ohne jemanden zu blockieren. Sag deinem Agenten, er soll schwere Operationen verschieben und, wenn nötig, die Queue aufsetzen:
                </p>
                <div className="space-y-4">
                  <PromptBlock
                    title="01 · Verlagere die schweren Operationen in den Hintergrund"
                    desc="E-Mails senden, Reports generieren oder Bilder verarbeiten sollten den Nutzer nicht auf einen Spinner starren lassen. Dieser Prompt findet die Operationen, die heute live laufen, und zieht sie aus der Anfrage heraus: sofortige Antwort, Arbeit im Hintergrund."
                    code={PROMPT_ASYNC_1}
                  />
                  <PromptBlock
                    title="02 · Setz mir die Hintergrund-Job-Queue auf"
                    desc="Die Infrastruktur, die Async erst möglich macht: eine Queue, ein Worker der außerhalb der Web-Anfrage verarbeitet, Retries mit Wartezeit und ein Ort wo Jobs die endgültig scheitern landen. Dein Agent wählt das Standard-Tool für deinen Stack und erklärt warum."
                    code={PROMPT_ASYNC_2}
                  />
                </div>
              </div>
            </section>

            {/* 06 Load Testing */}
            <section id="load-testing" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">06 der test</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Load Testing: finde den Cliff, bevor deine Nutzer ihn finden
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>
                  Indexing, Caching und Async reparieren den Code. <strong>Load Testing</strong> ist das, was beweist, dass es wirklich geholfen hat. Es ist der Schritt, den fast niemand macht – und deshalb erfährt fast jeder vom Cliff am Tag des Launches, live, mit echten Nutzern die zugucken.
                </p>
                <p>
                  Load Testing ist <strong>simulierter Traffic</strong>: Statt "wir launchen und schauen was passiert" täuschst du tausend Nutzer vor, die gleichzeitig reinkommen, und misst was hält. Das Standard-Open-Source-Tool dafür ist <strong>k6</strong>. Dein Agent baut das Skript, fährt die Last schrittweise hoch und sagt dir genau wo es kracht – damit es beim Test kracht, nicht in Produktion.
                </p>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 text-sm leading-6 text-[#5B5851]">
                  <strong className="text-[#37352F]">Hinweis:</strong> Wenn du deinen Agenten den Test laufen lässt, muss der Server oben sein (auf Staging zeigen, nie auf Produktion) und der Lauf dauert ein paar Minuten. Das ist normal: Er simuliert echten Traffic.
                </div>
                <div className="space-y-4">
                  <PromptBlock
                    title="01 · Richte mir Load Testing mit k6 ein"
                    desc="Der Schritt, den fast niemand macht. Dein Agent baut ein k6-Skript, das deine Routen so ansteuert wie ein echter Nutzer und die Last schrittweise hochfährt: 10, 100, 500, 1000 Nutzer. Mit einem Schwellenwert was akzeptabel ist, damit der Test von selbst besteht oder scheitert."
                    code={PROMPT_LOAD_1}
                  />
                  <PromptBlock
                    title="02 · Simuliere tausend Nutzer und sag mir genau wo es kracht"
                    desc="Dass es beim Test kracht, nicht in Produktion. Dieser Lauf fährt auf bis zu tausend gleichzeitige Nutzer und sagt dir bei wie vielen es anfängt abzubauen, welche Ressource zuerst sättigt und – wichtig – welcher der vier Fixes das löst."
                    code={PROMPT_LOAD_2}
                  />
                </div>
              </div>
            </section>

            {/* 07 Checklist */}
            <section id="checklist" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">07 schritt für schritt</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Checklist: was du vor dem Launch prüfen musst
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>
                  Das ist die Liste, die das Video nicht schafft zu geben. Bevor du deine App der Welt öffnest, geh sie von oben nach unten durch: Jeder Punkt, den du nicht abhaken kannst, ist ein Cliff, der auf dich wartet. Daneben steht der Bereich (und sein Prompt), der ihn löst.
                </p>
                <ol className="space-y-3">
                  {[
                    { num: "01", text: "Die Queries deiner meistgenutzten Seiten haben einen Index auf die Spalten, nach denen sie filtern oder sortieren.", tag: "Indexing" },
                    { num: "02", text: "Es gibt keine SELECT * und keine Listen ohne Paginierung im heißen Code.", tag: "Indexing" },
                    { num: "03", text: "Du hast geprüft, dass es keine N+1-Probleme gibt (Queries innerhalb von Schleifen oder Listen-Renders).", tag: "Indexing" },
                    { num: "04", text: "Was immer wieder berechnet wird ohne sich zu ändern (Dashboards, Aggregationen) ist gecacht.", tag: "Caching" },
                    { num: "05", text: "Jeder Cache hat definiert, wann er invalidiert wird; keiner liefert alte Daten aus.", tag: "Caching" },
                    { num: "06", text: "Schwere Operationen (E-Mails, Reports, Exports) blockieren den Nutzer nicht.", tag: "Async" },
                    { num: "07", text: "Du hast eine Queue mit Retries und einen Ort wo Jobs landen die scheitern.", tag: "Async" },
                    { num: "08", text: "Du hast Load Testing mit realistischen Daten (hunderttausend Zeilen, nicht zehn) auf Staging gemacht.", tag: "Load Testing" },
                    { num: "09", text: "Du weißt, bei wie vielen Nutzern deine App bricht und welche Ressource zuerst sättigt.", tag: "Load Testing" },
                    { num: "10", text: "Du hast den Load Test nach den Fixes wiederholt und der Cliff hat sich nach oben verschoben.", tag: "Load Testing" },
                  ].map(({ num, text, tag }) => (
                    <li key={num} className="flex items-start gap-4 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                      <span className="shrink-0 rounded-full bg-[#171717] px-2.5 py-0.5 font-mono text-xs text-zinc-100">{num}</span>
                      <div>
                        <p className="text-sm leading-6 text-[#37352F]">{text}</p>
                        <span className="mt-2 inline-flex items-center rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-[#7A7A72] ring-1 ring-[#E6E6E4]">{tag}</span>
                      </div>
                    </li>
                  ))}
                </ol>
                <p>
                  Wenn du alle zehn abhaken kannst, funktioniert deine App nicht nur – sie hält. Und das Beste: Du hast keine einzige Zeile Code selbst geschrieben, nur die richtigen Prompts an deinen Agenten gegeben.
                </p>
              </div>
            </section>

            {/* 08 FAQ */}
            <section id="faq" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">08 fragen</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                Schnelle Antworten
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <div className="space-y-3">
                  {[
                    {
                      q: "Muss ich programmieren können, um das zu nutzen?",
                      a: "Nein. Du kopierst die Prompts in deinen Agenten, er geht durch den Code und macht die Änderungen; du prüfst, ob sie Sinn ergeben und testest, dass die App noch läuft. Wichtig ist, das Was zu verstehen (Index, Cache, Async), nicht das Wie zu schreiben.",
                    },
                    {
                      q: "Funktioniert das mit jeder Datenbank?",
                      a: "Ja. Die Beispiele gehen von PostgreSQL aus, weil es das Häufigste ist, aber derselbe Prompt funktioniert mit MySQL, SQLite oder was du nutzt: Füll einfach die {geschweifte Klammer} mit deiner Datenbank und der Agent passt sich an.",
                    },
                    {
                      q: "Claude oder Codex?",
                      a: "Beide. Die Prompts sind agnostisch: Sie sind so geschrieben, dass sie in Claude Code oder Codex gleich gut funktionieren. Nutz den, den du schon offen hast, und kopier sie so rein.",
                    },
                    {
                      q: "Mache ich das vor oder nach dem Bauen der App?",
                      a: "An dem was schon gebaut ist, kurz vor dem Launch oder wenn du merkst, dass es anfängt zu zähen. Übertreib nicht zu Beginn: erst zum Laufen bringen, dann zum Halten bringen. Aber wart nicht bis du schon tausend Nutzer drauf hast.",
                    },
                    {
                      q: "Wie viele Nutzer wird meine App dann aushalten?",
                      a: "Das sagt dir der Load Test, nicht die Intuition. Deshalb ist er der Schritt, der alles abschließt: Du simulierst die Last, siehst wo es bricht, fixst und testest nochmal. Die echte Zahl kommt aus dem Test, nicht aus dem Raten.",
                    },
                  ].map(({ q, a }) => (
                    <div key={q} className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                      <p className="text-sm font-semibold text-[#37352F]">{q}</p>
                      <p className="mt-1 text-sm leading-6 text-[#5B5851]">{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>

          {/* Footer / Quellen */}
          <div className="mt-14 space-y-6 border-t border-[#EBEBEA] pt-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Community-Anleitung</p>
              <p className="text-sm leading-relaxed text-[#5f5b53]">
                Diese Anleitung ist das Prompt-Paket, das im Video über den <code className="rounded bg-[#F0F0EE] px-1 py-0.5 font-mono text-xs">Scaling Cliff</code> versprochen wurde: die drei Dinge, die du deinem Agenten sagst, damit deine App skaliert – Indexing, Caching und Async – plus das Load Testing, das fast niemand macht. Die Anleitung lebt im Tutorial-Bereich von{" "}
                <a className="inline-flex items-center gap-1 font-semibold text-[#23211d] underline decoration-[#B4B2AB] underline-offset-4" href="/tutorials">
                  @kidealist
                </a>
                . Wenn sich an den Tools etwas ändert, ist die Quelle unten aktuell.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  href: "https://grafana.com/docs/k6/latest/",
                  title: "k6-Dokumentation (Load Testing)",
                  desc: "Das Open-Source-Tool für echten Traffic-Simulation. Hier findest du die Referenz für Skripte, Szenarien und Metriken für deinen ersten Load Test.",
                },
                {
                  href: "https://www.postgresql.org/docs/current/indexes.html",
                  title: "Indizes in PostgreSQL (offizielle Docs)",
                  desc: "Was ein Index ist, wann er hilft und wann er schadet. Die Quelle der Wahrheit, wenn dein Agent Indexing vorschlägt und du verstehen willst was er gemacht hat.",
                },
                {
                  href: "https://www.postgresql.org/docs/current/sql-explain.html",
                  title: "EXPLAIN ANALYZE – finde die langsame Query",
                  desc: "Der Befehl, der dir genau sagt, wie lange eine Abfrage dauert und warum. Das ist was dein Agent im Hintergrund nutzt, um Engpässe aufzuspüren.",
                },
                {
                  href: "https://redis.io/docs/latest/develop/",
                  title: "Caching mit Redis",
                  desc: "Der meistgenutzte In-Memory-Speicher für Caching: einmal berechnen, hier speichern und schnell ausliefern. Hilfreich wenn du die Caching-Strategie umsetzt.",
                },
              ].map(({ href, title, desc }) => (
                <a key={href} target="_blank" rel="noreferrer" className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 transition-colors hover:bg-[#F1F1EE]" href={href}>
                  <p className="text-sm font-semibold text-[#37352F]">{title}</p>
                  <p className="mt-2 text-xs leading-5 text-[#5B5851]">{desc}</p>
                </a>
              ))}
            </div>
            <div className="space-y-2 rounded-xl border border-[#E6E6E4] bg-white p-4 sm:p-5">
              <p className="text-sm font-semibold text-[#37352F]">Womit fängst du heute an?</p>
              <p className="text-sm leading-relaxed text-[#5B5851]">
                Starte deinen Agenten im Projektordner und kopier den{" "}
                <a href="#wie-fragen" className="font-semibold text-[#23211d] underline decoration-[#B4B2AB] underline-offset-4">Start-Prompt</a>
                {" "}damit er dir die Karte deiner vier Risiken gibt. Mit der Liste gehst du das erste mit dem{" "}
                <a href="#indexing" className="font-semibold text-[#23211d] underline decoration-[#B4B2AB] underline-offset-4">Bereich 1 (Indexing)</a>
                {" "}an und arbeitest dich durch die Anleitung. Vor dem Launch überspring nicht die{" "}
                <a href="#checklist" className="font-semibold text-[#23211d] underline decoration-[#B4B2AB] underline-offset-4">Checklist</a>.
              </p>
            </div>
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
                onClick={() => scrollTo(tab.id)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#EBEBEA] font-semibold text-[#1f1e1a]"
                    : "text-[#66635D] hover:bg-[#F0F0ED]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
