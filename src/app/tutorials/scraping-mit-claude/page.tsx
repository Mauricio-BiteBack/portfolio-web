"use client";

import { useState } from "react";

// ─── Prompt-Texte ────────────────────────────────────────────────────────────

const PROMPT_NATIV_01 = `Nutze WebFetch, um diese Seite zu laden: {URL hier einfügen}

Extrahiere daraus folgende Felder:
- {Feld 1, z. B. Produktname}
- {Feld 2, z. B. aktueller Preis}
- {Feld 3, z. B. Verfügbarkeit}
- {weitere nach Bedarf}

Wenn du fertig bist:
1. Zeig mir die Daten als Tabelle auf dem Bildschirm zur Kontrolle.
2. Speichere alles in einer CSV-Datei namens daten.csv in diesem Ordner, mit deutschen Spaltenbezeichnungen und Komma als Trennzeichen.
3. Wenn eine Seite ein Feld nicht hat, lass die Zelle leer – erfinde keine Werte.`;

const PROMPT_NATIV_02 = `Ich will den gesamten Katalog dieser Seite, nicht nur die erste Seite: {URL der ersten Seite einfügen}

Schritte:
1. Mache einen WebFetch auf die Start-URL und zeig mir, wie das Paginierungsmuster aussieht (z. B. ?page=N, /seite/N oder ein „Weiter"-Link).
2. Geh alle Seiten durch – bis zum Ende oder maximal {N, z. B. 20} Seiten.
3. Von jedem Produkt extrahiere: {Name, Preis, Link zur Detailseite, Bild falls vorhanden}.
4. Dedupliziere über den Detailseiten-Link (manchmal taucht dasselbe Produkt auf zwei Seiten auf).
5. Speichere alles in katalog.csv, sortiert nach Preis aufsteigend.

Wenn eine Seite länger als 10 Sekunden braucht, überspring sie und sag mir am Ende welche, damit ich sie manuell prüfen kann.`;

const PROMPT_NATIV_03 = `Suche und hole Informationen über: {Thema beschreiben, z. B. „Digital-Marketing-Agenturen in München mit mehr als 10 Mitarbeitern"}

Schritte:
1. Nutze WebSearch, um die ersten {N, z. B. 10} passenden URLs zu finden.
2. Filtere heraus, was offensichtlich nicht passt (Foren, generische Aggregatoren, bezahlte Anzeigen).
3. Von jeder verbliebenen URL mache WebFetch und extrahiere: {Name, Website, Stadt, ein Satz was sie machen}.
4. Wenn eine Seite die Information nicht klar zeigt, markiere sie als „unvollständig" statt etwas zu erfinden.
5. Konsolidiere alles in ergebnisse.csv und sag mir: wie viele URLs gefunden, wie viele genutzt, wie viele verworfen.`;

const PROMPT_NATIV_04 = `Nimm die CSV, die wir gerade erstellt haben (oder diese Datei: {dateiname.csv}) und wandle sie in eine schön formatierte Excel-Datei .xlsx um:

1. Header-Zeile mit hellgrauem Hintergrund und fettem Text.
2. Spaltenbreiten automatisch an den längsten Inhalt angepasst.
3. Autofilter in der Header-Zeile aktiviert.
4. Wenn es eine Preisspalte gibt: Zahlenformat mit zwei Dezimalstellen und Tausendertrennzeichen.
5. Wenn es eine URL-Spalte gibt: echte klickbare Hyperlinks.

Nutze Python mit openpyxl. Wenn es nicht installiert ist, installiere es zuerst mit pip install openpyxl. Speichere die Datei als daten.xlsx in diesem Ordner.`;

const PROMPT_NATIV_05 = `Ich brauche eine B2B-Lead-Liste aus dieser Branche und Region:
- Branche: {z. B. E-Commerce-SaaS}
- Region: {z. B. Deutschland und Österreich}
- Zielgröße: {z. B. 10–200 Mitarbeiter}

Schritte:
1. Identifiziere 2–3 öffentliche Verzeichnisse, wo diese Unternehmen gelistet sind (Crunchbase, G2, Product Hunt, AngelList, Branchenverbände, Y-Combinator-Listen, usw.). KEIN LinkedIn (blockieren Bots und verstößt gegen deren AGB).
2. Für jedes Verzeichnis nutze WebSearch oder direkten WebFetch, um passende Unternehmen zu finden.
3. Von jedem Unternehmen extrahiere, was im Profil öffentlich steht: Name, Website, ein-Satz-Beschreibung, Stadt, Größe (falls angegeben), allgemeine Kontakt-E-Mail (nur wenn auf deren Website veröffentlicht).
4. Konsolidiere in leads.csv, sortiert nach Relevanz (wie gut passt es zur Branche).
5. Sag mir am Ende, aus welchem Verzeichnis jeder Lead stammt, damit ich das nachprüfen kann.

Regeln: nur öffentliche Daten, keine persönlichen Einzeldaten scrapen, keine privaten Profile anfassen.`;

const PROMPT_SGAI_01 = `Installiere ScrapeGraphAI in diesem Ordner und mach es einsatzbereit. Ich nutze Groq als Provider, weil es kostenlos ist.

Schritte in dieser Reihenfolge – stop und sag mir Bescheid, wenn etwas schiefläuft:

1. Prüfe, ob ich Python 3.12 oder höher habe (python3 --version). Falls nicht, sag mir, wie ich es installiere (Mac/Windows/Linux).

2. Erstelle ein virtualenv in .venv und aktiviere es (source .venv/bin/activate auf Mac/Linux).

3. Führe pip install scrapegraphai aus und dann playwright install (das kann ein paar Minuten dauern, weil Chromium heruntergeladen wird).

4. Erstelle eine .env-Datei mit GROQ_API_KEY=DEINEN_KEY_HIER_EINFÜGEN als Platzhalter. Sag mir genau, dass ich zu https://console.groq.com/ gehen, ein kostenloses Konto erstellen, einen API-Key generieren und ihn in diese Datei einfügen soll. Warte auf meine Bestätigung.

5. Wenn ich bestätigt habe, erstelle smoke_test.py, das einen SmartScraperGraph gegen https://scrapegraphai.com/ macht und fragt: "Extrahiere die Firmenbeschreibung und die Gründer." Konfiguriere das Modell als groq/llama-3.3-70b-versatile.

6. Führe den Smoke-Test aus (python smoke_test.py). Wenn es klappt, sag mir, dass wir startklar sind, und zeig mir den Output. Wenn es fehlschlägt, diagnostiziere und behebe es.

7. Füge .env, .venv/ und __pycache__/ zur .gitignore hinzu.`;

const PROMPT_SGAI_02 = `Diese Seite lädt mit JavaScript und WebFetch gibt mir nur die leere Shell: {URL einfügen}

Was ich extrahieren möchte: {Felder beschreiben, z. B. „alle sichtbaren Produkte mit Name, Preis und Lagerbestand"}

Schritte:
1. Erstelle ein Script scrape_js.py, das SmartScraperGraph von ScrapeGraphAI mit diesen Optionen nutzt:
   - llm: groq/llama-3.3-70b-versatile (Key aus der .env, die wir konfiguriert haben)
   - headless: true
   - verbose: true (damit ich sehe, was passiert, falls es fehlschlägt)
   - timeout: 120 Sekunden (JS-Seiten brauchen länger)

2. Der Prompt des Graphen soll spezifisch sein: "Extrahiere jedes Produkt mit seinen Feldern: Name, Preis in EUR falls vorhanden, Lagerbestand oder Verfügbarkeit, Link zur Detailseite."

3. Führe das Script aus.

4. Der Output ist ein dict. Übergib es an pandas und speichere es als js_scrape.csv.

5. Wenn Playwright hängt oder Cloudflare blockiert, sag mir genau welcher Fehler aufgetreten ist und schlage Alternativen vor (z. B. Proxy-Rotation, Non-Headless-Modus, längere Wartezeit).`;

const PROMPT_SGAI_03 = `Ich habe eine urls.txt-Datei mit einer URL pro Zeile (mehr als 50). Ich will dieselbe Extraktion auf alle anwenden und die Ergebnisse zusammenführen.

Die Extraktion, die ich möchte: {Felder beschreiben, z. B. „Produktname, Preis, kurze Beschreibung"}

Schritte:
1. Lese urls.txt und sag mir, wie viele URLs drin sind.

2. Erstelle scrape_multi.py mit SmartScraperMultiGraph:
   - llm: groq/llama-3.3-70b-versatile
   - headless: true
   - konservatives Rate-Limiting (nicht mehr als 2 Requests pro Sekunde – ich will weder geblockt werden noch Groqs Limit überschreiten).

3. Wenn es mehr als 100 URLs sind, teile den Batch in 50er-Chunks auf und frag mich vor jedem nächsten, damit ich Fehler und Token-Verbrauch im Blick habe.

4. Bei jeder fehlgeschlagenen URL: trag sie in fehler.txt ein, anstatt den ganzen Run abzubrechen.

5. Wenn fertig: konsolidiere die Ergebnisse in lote.xlsx mit einer Spalte „url_quelle", damit ich weiß, woher jede Zeile kommt.

6. Gib mir am Ende eine Zusammenfassung: wie viele erfolgreich, wie viele fehlgeschlagen, Token-Gesamtverbrauch (steht im verbose-Output), Gesamtlaufzeit.`;

const PROMPT_SGAI_04 = `Ich will eine schnelle Recherche über dieses Thema und konkrete Daten – keine Zusammenfassungen:

Thema: {Suchanfrage beschreiben, z. B. „Online-Kaffeeshops, die nach Deutschland liefern, mit Preisen für Hochlandkaffee"}

Schritte:
1. Erstelle search_research.py mit SearchGraph von ScrapeGraphAI:
   - llm: groq/llama-3.3-70b-versatile
   - max_results: 10 (Top-10-Seiten, die es findet).

2. Prompt des Graphen: "Liste jeden Shop mit: Name, Website, Stadt, Durchschnittspreis ihres Hochlandkaffees in EUR falls sichtbar, ob sie nach Deutschland liefern, direkter Link zum Produkt."

3. Führe das Script aus und zeig mir das rohe dict auf dem Bildschirm.

4. Wandle es danach mit pandas in search_results.csv um. Bereinige: Wenn ein Shop auf zwei verschiedenen Seiten auftaucht, behalte den vollständigsten Eintrag (den mit mehr ausgefüllten Feldern).

5. Zeig mir am Ende, welche URLs berücksichtigt wurden (search_graph.get_considered_urls()), damit ich weiß, woher die Daten kommen.`;

const CMD_SCRAPE_FOLDER = `mkdir -p ~/scrape && cd ~/scrape && claude`;
const CMD_INSTALL_SGAI = `pip install scrapegraphai && playwright install`;

// ─── Tabs ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "was-ist-das", label: "Was ist das?", num: "01" },
  { id: "wie-funktioniert", label: "Wie's geht", num: "02" },
  { id: "weg-a", label: "Weg A – Nativ", num: "03" },
  { id: "prompts-nativ", label: "5 Prompts", num: "04" },
  { id: "wann-nicht", label: "Grenzen", num: "05" },
  { id: "weg-b", label: "Weg B – SGAI", num: "06" },
  { id: "prompts-sgai", label: "4 SGAI-Prompts", num: "07" },
  { id: "b2b-faelle", label: "B2B-Fälle", num: "08" },
  { id: "spielregeln", label: "Spielregeln", num: "09" },
  { id: "faq", label: "FAQ", num: "10" },
];

// ─── Components ───────────────────────────────────────────────────────────────

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
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
          Kopiert!
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
          {label}
        </>
      )}
    </button>
  );
}

function ChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
  );
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ScrapingMitClaudePage() {
  const [activeTab, setActiveTab] = useState("was-ist-das");

  const handleTab = (id: string) => {
    setActiveTab(id);
    scrollToSection(id);
  };

  return (
    <>
      <head>
        <title>Daten aus dem Internet ziehen mit Claude Code – ScrapeGraphAI als Plan B | @kidealist</title>
        <meta name="description" content="Italiener haben ScrapeGraphAI gebaut: 26k Stars auf GitHub, MIT-Lizenz. Das Muster: Seite laden → bereinigen → mit LLM extrahieren → exportieren. Claude Code hat alle drei Teile bereits eingebaut. Diese Anleitung zeigt zwei Wege: den nativen (kein Install, kein extra API-Key) und Plan B mit ScrapeGraphAI + Groq kostenlos, wenn WebFetch nicht ausreicht." />
        <meta property="og:title" content="Daten aus dem Internet ziehen mit Claude Code – ScrapeGraphAI als Plan B" />
        <meta property="og:description" content="Zwei Wege, Daten aus dem Internet zu holen – ganz ohne zusätzliche Tools zu bezahlen, direkt in Claude Code." />
      </head>

      <div className="min-h-screen bg-[#F7F7F5] text-[#37352F]">
        <main className="min-h-screen bg-white">
          <div className="mx-auto max-w-5xl px-4 pb-28 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:py-12">

            {/* Breadcrumb — desktop only */}
            <div className="mb-8 hidden items-center gap-2 text-sm text-[#8B8B85] sm:flex">
              <a className="transition-colors hover:text-[#37352F]" href="/tutorials">tutorials</a>
              <ChevronRight />
              <span className="font-medium text-[#37352F]">ScrapeGraphAI</span>
            </div>

            {/* Header */}
            <header className="mb-8 sm:mb-10">
              <h1 className="text-3xl font-bold tracking-tight text-[#23211d] sm:text-5xl">
                ScrapeGraphAI: das italienische Scraping-Muster, direkt in deinem Claude Code
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-[#5B5851] sm:text-lg sm:leading-8">
                Ein paar Italiener haben ScrapeGraphAI vor zwei Jahren gebaut. 26.000 Stars auf GitHub, MIT-Lizenz – und das Muster ist simpel: Seite laden, bereinigen, ein LLM fragt was du willst, speichern.{" "}
                <strong className="text-[#37352F]">Claude Code hat alle drei Teile schon eingebaut.</strong>{" "}
                Diese Anleitung geht zwei Wege: den nativen, ohne Installation und ohne extra API-Key für 80&nbsp;% der Fälle – und Plan&nbsp;B mit ScrapeGraphAI lokal, wenn WebFetch nicht mehr ausreicht. Mit fertigen Prompts zum direkten Kopieren.
              </p>
            </header>

            {/* Auf einen Blick – 4 Karten */}
            <div className="mb-6 sm:mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Auf einen Blick</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { num: "01", icon: <LayersIcon />, label: "Das Muster hinter dem Repo" },
                  { num: "02", icon: <GlobeIcon />, label: "Nativer Weg" },
                  { num: "03", icon: <BoxesIcon />, label: "Weg mit ScrapeGraphAI" },
                  { num: "04", icon: <WandIcon />, label: "Fertige Prompts + B2B-Fälle" },
                ].map((c) => (
                  <div key={c.num} className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="font-mono text-xs text-[#8B8B85]">{c.num}</span>
                      {c.icon}
                    </div>
                    <p className="text-sm font-semibold leading-5 text-[#37352F]">{c.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inhalt-Übersicht */}
            <div className="mb-8 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:mb-10 sm:p-5">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
                  was ist das · wie&apos;s geht · weg a · 5 prompts · grenzen · weg b · 4 sgai-prompts · b2b-fälle · spielregeln · faq
                </p>
                <p className="text-sm font-semibold text-[#37352F]">
                  Zwei Wege, Daten aus dem Internet zu holen – ohne extra Tools zu bezahlen, direkt in Claude Code
                </p>
                <p className="max-w-3xl text-sm leading-6 text-[#5B5851]">
                  Zuerst zeige ich dir, was ScrapeGraphAI intern macht: vier Schritte in einer Kette (laden, bereinigen, mit LLM extrahieren, exportieren). Dann siehst du die Tabelle der Entsprechungen mit Claude Code – alle vier Teile sind schon da. Weg&nbsp;A löst Preismonitoring, B2B-Leads aus öffentlichen Verzeichnissen, Nachrichtenmonitoring und Kataloge ohne Installation. Weg&nbsp;B ist für JS-lastige Seiten oder wenn du hunderte URLs auf einmal brauchst – Claude Code installiert ScrapeGraphAI, konfiguriert Groq kostenlos als Gehirn und orchestriert die Graphen. Am Ende kommen 3 echte Anwendungsfälle, wo du das besser nicht nutzen solltest (LinkedIn als Beispiel), und ein kurzes FAQ.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { href: "#was-ist-das", icon: <HelpCircleSmIcon />, label: "Was ist das?" },
                  { href: "#wie-funktioniert", icon: <LayersSmIcon />, label: "Wie's geht" },
                  { href: "#weg-a", icon: <GlobeSmIcon />, label: "Weg A" },
                  { href: "#prompts-nativ", icon: <WandSmIcon />, label: "5 Prompts" },
                  { href: "#wann-nicht", icon: <ShieldAlertSmIcon />, label: "Wann's nicht reicht" },
                  { href: "#weg-b", icon: <BoxesSmIcon />, label: "Weg B" },
                  { href: "#prompts-sgai", icon: <TerminalSmIcon />, label: "4 SGAI-Prompts" },
                  { href: "#b2b-faelle", icon: <BriefcaseSmIcon />, label: "B2B-Fälle" },
                  { href: "#spielregeln", icon: <ShieldCheckSmIcon />, label: "Spielregeln" },
                  { href: "#faq", icon: <HelpCircleSmIcon />, label: "FAQ" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#E6E6E4] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#37352F] transition-colors hover:bg-[#F1F1EE]"
                  >
                    {item.icon}
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#E6E6E4] pt-3">
                {["26.000 Stars auf GitHub", "Open Source MIT", "Von Italienern gebaut", "Fertige Copy-Paste-Prompts", "Weg A komplett kostenlos"].map((tag) => (
                  <span key={tag} className="inline-flex items-center rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-medium text-[#7A7A72]">{tag}</span>
                ))}
              </div>
            </div>

            {/* Tab-Navigation — desktop */}
            <nav className="mb-8 hidden gap-1 sm:grid sm:grid-cols-10 sm:mb-10">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTab(tab.id)}
                  className={`rounded-md px-2 py-2 text-left text-xs font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#EBEBEA] font-semibold text-[#1f1e1a]"
                      : "text-[#66635D] hover:bg-[#EFEFED]"
                  }`}
                >
                  <span className="mr-1 font-mono text-[10px] text-[#8B8B85]">{tab.num}</span>
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Tab-Navigation — mobile scroll */}
            <nav className="mb-8 flex gap-2 overflow-x-auto pb-2 sm:hidden">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTab(tab.id)}
                  className={`min-w-[130px] rounded-md px-3 py-2 text-left text-sm transition-colors ${
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

            {/* ── Sektionen ─────────────────────────────────────────────────────── */}
            <div className="space-y-14">

              {/* 01 Was ist das */}
              <section id="was-ist-das" className="scroll-mt-24">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">01 hintergrund</p>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                  Was ist ScrapeGraphAI und warum ist dieses Repo interessant?
                </h2>
                <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                  <p>
                    ScrapeGraphAI ist eine Python-Bibliothek, die <strong>Graphen</strong> + <strong>LLMs</strong> kombiniert, um strukturierte Daten von Webseiten auf Basis eines natürlichsprachlichen Prompts zu extrahieren. Gebaut von ein paar Italienern – Marco Vinciguerra und Lorenzo Padoan – vor zwei Jahren. Heute hat es <strong>26.000 Stars auf GitHub</strong>, MIT-Lizenz und läuft auf Python 3.12+.
                  </p>
                  <p>
                    Das Wichtige ist nicht die Bibliothek selbst – sondern <strong>das Muster, das sie dokumentiert haben</strong>: wie man ein Modell bittet, Daten von einer Seite zu extrahieren, ohne CSS-Selektoren schreiben oder fragile Regeln pflegen zu müssen. Genau dieses Muster kann Claude Code nativ reproduzieren, ohne das Paket zu installieren. Das schauen wir uns in der nächsten Sektion an.
                  </p>
                  <p>
                    Wann lohnt es sich, die Bibliothek trotzdem zu installieren? Wenn dein Fall an Grenzen stößt, die Claude Code nicht out-of-the-box löst: Seiten mit schwerem JavaScript-Rendering, Anti-Bot-Systeme wie Cloudflare, massives paralleles Scrapen, oder strenge Pydantic-Schemas für Produktionspipelines. Dafür ist Weg&nbsp;B weiter unten.
                  </p>
                  <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Kompatibilitätshinweis</p>
                    <p className="mt-2 text-sm leading-6 text-[#5B5851]">
                      ScrapeGraphAI unterstützt Anthropic Claude nicht als direkten Provider (die offizielle Liste umfasst OpenAI, Groq, Google, Azure, Mistral, Ollama u. a.). Kein Problem: Bei Weg&nbsp;A nutzt du es gar nicht, und bei Weg&nbsp;B orchestriert Claude Code die Bibliothek + einen kostenlosen Provider wie Groq. Details dazu im FAQ am Ende.
                    </p>
                  </div>
                </div>
              </section>

              {/* 02 Wie es funktioniert */}
              <section id="wie-funktioniert" className="scroll-mt-24">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">02 die erkenntnis</p>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                  Wie ScrapeGraphAI intern funktioniert (und warum Claude Code das schon kann)
                </h2>
                <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                  <p>Die ganze Magie von ScrapeGraphAI sind vier Schritte in einer Kette. Wenn du das verstehst, hast du das Muster verstanden:</p>
                  <ol className="space-y-3">
                    {[
                      { num: "01", title: "Fetch", desc: "Die HTML-Seite herunterladen. ScrapeGraphAI nutzt Playwright (echter Browser, unterstützt JS) oder BeautifulSoup für statische Seiten." },
                      { num: "02", title: "Clean", desc: "Das rohe HTML mit html2text in lesbares Markdown umwandeln und in Stücke schneiden, wenn es zu groß für den LLM-Kontext ist." },
                      { num: "03", title: "Extract", desc: "Das Markdown + deinen Prompt ans LLM schicken. Das Modell gibt die gewünschten Felder als strukturiertes JSON zurück." },
                      { num: "04", title: "Export", desc: "Dir ein Python-Dict zurückgeben. Du übergibst es an pandas und speicherst es als CSV oder Excel." },
                    ].map((step) => (
                      <li key={step.num} className="flex items-start gap-4 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                        <span className="shrink-0 rounded-full bg-[#171717] px-2.5 py-0.5 font-mono text-xs text-zinc-100">{step.num}</span>
                        <div>
                          <p className="text-sm font-semibold text-[#37352F]">{step.title}</p>
                          <p className="mt-1 text-sm leading-6 text-[#5B5851]">{step.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p>Jetzt der interessante Teil: <strong>Claude Code bringt alle vier Teile nativ mit.</strong> Das ist keine Theorie – sie sind bereits als Tools eingebaut. Hier die Entsprechungstabelle:</p>
                  <div className="overflow-hidden rounded-xl border border-[#E6E6E4]">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#F1F1EE] text-xs uppercase tracking-[0.12em] text-[#5B5851]">
                        <tr>
                          <th className="px-4 py-3">ScrapeGraphAI-Teil</th>
                          <th className="px-4 py-3">Natives Äquivalent in Claude Code</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E6E6E4] bg-white">
                        {[
                          ["Playwright oder BeautifulSoup (fetch)", "WebFetch (natives Tool von Claude Code)"],
                          ["html2text (clean)", "WebFetch gibt dir schon sauberes Markdown zurück"],
                          ["Externer LLM-Provider (OpenAI, Groq, …)", "Claude selbst, innerhalb von Claude Code"],
                          ["pandas → CSV / Excel", "Bash + Python (csv, openpyxl) von Claude ausgeführt"],
                          ["SearchGraph (suchen + mehrfach scrapen)", "WebSearch + WebFetch in einer Schleife"],
                        ].map(([left, right]) => (
                          <tr key={left}>
                            <td className="px-4 py-3 text-[#5B5851]">{left}</td>
                            <td className="px-4 py-3 font-medium text-[#37352F]">{right}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="rounded-xl border border-[#E6E6E4] bg-white p-4 text-sm leading-6 text-[#5B5851]">
                    Fazit: Für <strong>80&nbsp;% der Fälle</strong> (statisches HTML, E-Commerce, News, öffentliche B2B-Verzeichnisse) brauchst du ScrapeGraphAI nicht zu installieren und keine extra API zu bezahlen. Das ist Weg&nbsp;A.
                  </p>
                </div>
              </section>

              {/* 03 Weg A */}
              <section id="weg-a" className="scroll-mt-24">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">03 weg a</p>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                  Nativer Modus in 60 Sekunden: kein Install, kein API-Key
                </h2>
                <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                  <p>
                    Das ist der Weg, den du 80&nbsp;% der Zeit nimmst. Er funktioniert gegen normale HTML-Seiten, Blogs, einfache Online-Shops, öffentliche Verzeichnisse, Nachrichtenseiten, paginierte Kataloge. Wenn die Seite in deinem Browser ohne Login gut aussieht, schafft WebFetch das fast sicher.
                  </p>
                  <div className="min-w-0 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                    <p className="mb-3 text-sm font-semibold text-[#37352F]">Der einzige Befehl (Ordner erstellen und Claude starten)</p>
                    <div className="rounded-lg bg-[#171717] p-3">
                      <code className="block overflow-x-auto whitespace-nowrap text-xs text-zinc-100 sm:text-sm">{CMD_SCRAPE_FOLDER}</code>
                    </div>
                    <div className="mt-3">
                      <CopyButton text={CMD_SCRAPE_FOLDER} label="Befehl kopieren" />
                    </div>
                  </div>
                  <ol className="space-y-3">
                    {[
                      { num: "01", title: "Erstelle einen leeren Ordner, wo du die Daten speichern willst", desc: "Sowas wie ~/scrape oder Desktop/scrape. Hier leben die CSV-Dateien, die du generierst. Getrennt zu halten vermeidet Durcheinander in anderen Projekten." },
                      { num: "02", title: "Öffne Claude Code in diesem Ordner", desc: "Im Terminal gehst du in den Ordner und startest Claude Code. Die Session erbt den Ordner als cwd, so bleiben die erzeugten Dateien hier." },
                      { num: "03", title: "Füge einen Prompt aus Weg A ein", desc: "Fang mit Prompt 01 an (einzelne Seite → CSV). Claude nutzt WebFetch, um die Seite zu laden, liest sie, extrahiert die gewünschten Felder und speichert die CSV. Kein Installationsschritt." },
                    ].map((step) => (
                      <li key={step.num} className="flex items-start gap-4 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                        <span className="shrink-0 rounded-full bg-[#171717] px-2.5 py-0.5 font-mono text-xs text-zinc-100">{step.num}</span>
                        <div>
                          <p className="text-sm font-semibold text-[#37352F]">{step.title}</p>
                          <p className="mt-1 text-sm leading-6 text-[#5B5851]">{step.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="rounded-xl border border-[#E6E6E4] bg-white p-4 text-sm leading-6 text-[#5B5851]">
                    Wenn Claude Code noch nicht auf deinem Rechner installiert ist, schau zuerst in die Installationsanleitung auf <strong>@kidealist</strong> und komm dann hierher zurück.
                  </p>
                </div>
              </section>

              {/* 04 Prompts nativ */}
              <section id="prompts-nativ" className="scroll-mt-24">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">04 legen wir los</p>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                  Fertige Prompts zum Kopieren – nativer Modus
                </h2>
                <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                  <p>
                    Kein Install. Nur Claude Code in einem leeren Ordner geöffnet. Jeder Prompt hat einen <strong>Kopieren</strong>-Button – du fügst ihn ein und ersetzt die <code className="rounded bg-[#F0F0EE] px-1 py-0.5 font-mono text-xs">{"{Platzhalter}"}</code> bevor du absendest.
                  </p>
                  <p>
                    Wenn Claude länger als gewöhnlich braucht oder meldet, dass die Seite nicht richtig lädt – das ist das Symptom, über das ich im nächsten Abschnitt rede. Dann fängt das Territorium von Weg&nbsp;B an.
                  </p>

                  <div className="space-y-6">
                    {/* Prompt 01 */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Prompt 01</p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">Daten von dieser Seite als CSV holen</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Der einfachste Einstieg. Du gibst eine URL und die Felder an. Claude nutzt WebFetch, liest was wichtig ist, gibt es strukturiert zurück und speichert die CSV im aktuellen Ordner.</p>
                          </div>
                          <CopyButton text={PROMPT_NATIV_01} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_NATIV_01}</pre>
                        </div>
                      </div>
                    </div>

                    {/* Prompt 02 */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Prompt 02</p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">Ganzer Katalog, nicht nur die erste Seite</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Wenn die Seite Paginierung hat (?page=2, ?page=3 oder ein „Weiter&quot;-Button). Claude erkennt das Muster, iteriert per WebFetch durch alle Seiten, bündelt Ergebnisse und dedupliziert.</p>
                          </div>
                          <CopyButton text={PROMPT_NATIV_02} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_NATIV_02}</pre>
                        </div>
                      </div>
                    </div>

                    {/* Prompt 03 */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Prompt 03</p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">Suchen + scrapen (nativer SearchGraph)</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Das native Äquivalent zum SearchGraph von ScrapeGraphAI. Nutzt WebSearch, um Kandidaten-URLs zu finden, dann WebFetch auf jeder, konsolidiert in CSV. Nützlich wenn du keine spezifischen URLs hast, nur das Thema.</p>
                          </div>
                          <CopyButton text={PROMPT_NATIV_03} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_NATIV_03}</pre>
                        </div>
                      </div>
                    </div>

                    {/* Prompt 04 */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Prompt 04</p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">Als Excel exportieren, nicht nur als CSV</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Wenn du die .xlsx-Datei mit fetten Headern, automatischen Spaltenbreiten und Filtern brauchst. Claude schreibt ein Script mit openpyxl, führt es aus und lässt die fertige Excel-Datei zurück.</p>
                          </div>
                          <CopyButton text={PROMPT_NATIV_04} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_NATIV_04}</pre>
                        </div>
                      </div>
                    </div>

                    {/* Prompt 05 */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Prompt 05</p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">B2B-Leads aus öffentlichen Verzeichnissen</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Crunchbase, G2, Product Hunt, Branchenverbände. Du gibst Branche + Region an. Claude sucht in den richtigen öffentlichen Verzeichnissen, holt die Unternehmensseiten und erstellt eine Lead-CSV.</p>
                          </div>
                          <CopyButton text={PROMPT_NATIV_05} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_NATIV_05}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 05 Grenzen */}
              <section id="wann-nicht" className="scroll-mt-24">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">05 die grenzen</p>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                  Wann WebFetch nicht ausreicht und Weg B sinnvoller ist
                </h2>
                <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                  <p>
                    Weg A deckt die große Mehrheit der alltäglichen Fälle ab, aber es gibt vier klare Symptome, die dich zu ScrapeGraphAI drängen. Wenn du eines davon bei der Arbeit erkennst, ist das ein Zeichen, dass dieser spezifische Fall mit der Bibliothek besser gelöst wird.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { num: "Symptom 01", title: "WebFetch gibt dir fast leeres HTML zurück", desc: "Passiert bei Seiten, die mit React, Vue oder Next.js gebaut wurden, wo der Inhalt erst durch JavaScript nachgeladen wird. WebFetch sieht nur das leere Gerüst. ScrapeGraphAI mit Playwright klappt hier, weil es einen echten Headless-Browser öffnet und wartet, bis alles gerendert ist." },
                      { num: "Symptom 02", title: "Die Seite wirft dir einen Cloudflare-Challenge oder 403", desc: "Aggressiver Anti-Bot-Schutz. ScrapeGraphAI hat undetected-playwright als Abhängigkeit, was in einigen Fällen hilft. Keine Wunderwaffe, aber es besteht mehr Checks als ein einfacher Fetch." },
                      { num: "Symptom 03", title: "Du musst hunderte oder tausende URLs auf einmal abarbeiten", desc: "Hunderte WebFetch-Aufrufe in Claude Code sind langsam und kontextintensiv. ScrapeGraphAI hat SmartScraperMultiGraph mit kontrollierter Parallelität und URL-weiser Fehlerbehandlung." },
                      { num: "Symptom 04", title: "Es ist Produktion und du brauchst strenge Schemas", desc: "Wenn die Daten in eine Datenbank oder Pipeline fließen, musst du sicherstellen, dass jede Zeile einem Schema entspricht (Pflichtfelder, richtige Typen). ScrapeGraphAI akzeptiert ein Pydantic-BaseModel und validiert den LLM-Output dagegen." },
                    ].map((s) => (
                      <div key={s.num} className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">{s.num}</p>
                        <p className="mt-2 text-sm font-semibold text-[#37352F]">{s.title}</p>
                        <p className="mt-1 text-sm leading-6 text-[#5B5851]">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className="rounded-xl border border-[#E6E6E4] bg-white p-4 text-sm leading-6 text-[#5B5851]">
                    Wenn keines der vier Symptome bei deinem Fall auftaucht, bleib bei Weg&nbsp;A. Füg keine unnötige Komplexität hinzu.
                  </p>
                </div>
              </section>

              {/* 06 Weg B */}
              <section id="weg-b" className="scroll-mt-24">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">06 weg b</p>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                  ScrapeGraphAI installieren mit Claude Code als Orchestrator – ohne Python selbst anzufassen
                </h2>
                <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                  <p>
                    Wenn WebFetch nicht ausreicht, ist Plan B <strong>ScrapeGraphAI lokal zu installieren</strong>. Claude Code kümmert sich um alles: führt <code className="rounded bg-[#F0F0EE] px-1 py-0.5 font-mono text-xs">pip install</code> aus, konfiguriert die Umgebung, schreibt das Script und führt es aus. Du kopierst weiterhin nur Prompts.
                  </p>
                  <div className="min-w-0 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                    <p className="mb-3 text-sm font-semibold text-[#37352F]">Das Einzige, was du im Kopf haben musst – Claude Code macht das für dich</p>
                    <div className="rounded-lg bg-[#171717] p-3">
                      <code className="block overflow-x-auto whitespace-nowrap text-xs text-zinc-100 sm:text-sm">{CMD_INSTALL_SGAI}</code>
                    </div>
                    <div className="mt-3">
                      <CopyButton text={CMD_INSTALL_SGAI} label="Befehl kopieren" />
                    </div>
                  </div>
                  <p>
                    Damit ScrapeGraphAI funktioniert, braucht es einen LLM-Provider als Gehirn (kein Anthropic – haben wir schon gesagt). Der einfachste und kostenlose ist <strong>Groq</strong>: schnell, ohne Kreditkarte, mit Llama-70B-Modellen, die für Scraping genauso gut extrahieren wie GPT-4o-mini. Wenn du schon OpenAI hast oder lieber Ollama lokal willst, klappt beides – aber das simpelste Setup ist mit Groq.
                  </p>
                  <ol className="space-y-3">
                    {[
                      { num: "01", title: "Hol dir deinen kostenlosen Groq-API-Key", desc: "Geh zu console.groq.com, erstell ein Konto (keine Kreditkarte nötig), generier einen API-Key, kopier ihn. Das Free-Tier reicht für persönliches tägliches Scraping locker aus." },
                      { num: "02", title: "Füge Prompt 01 von Weg B ein (Alles-in-einem-Installation)", desc: "Claude Code installiert scrapegraphai, installiert die Playwright-Browser, fragt dich nach dem API-Key für .env, führt einen Smoke-Test gegen die Repo-Seite aus, um zu bestätigen, dass alles läuft." },
                      { num: "03", title: "Wenn der Smoke-Test bestanden hat, wechsle zum Prompt, den du brauchst", desc: "Prompt 02 für JS-lastige Seiten, 03 für Batches mit hunderten URLs, 04 für SearchGraph (suchen + scrapen ohne vorherige URLs). Claude schreibt das Python-Script, führt es aus und liefert die Daten." },
                    ].map((step) => (
                      <li key={step.num} className="flex items-start gap-4 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                        <span className="shrink-0 rounded-full bg-[#171717] px-2.5 py-0.5 font-mono text-xs text-zinc-100">{step.num}</span>
                        <div>
                          <p className="text-sm font-semibold text-[#37352F]">{step.title}</p>
                          <p className="mt-1 text-sm leading-6 text-[#5B5851]">{step.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="rounded-xl border border-[#E6E6E4] bg-white p-4 text-sm leading-6 text-[#5B5851]">
                    <strong>Wenn du 100&nbsp;% lokal ohne API-Key willst:</strong> ersetze Groq durch Ollama. Du installierst Ollama, lädst ein Modell herunter (<code className="rounded bg-[#F0F0EE] px-1 py-0.5 font-mono text-xs">ollama pull llama3.2</code>) und änderst im Config den Provider zu <code className="rounded bg-[#F0F0EE] px-1 py-0.5 font-mono text-xs">ollama/llama3.2</code>. Mehr Setup-Aufwand, aber null Abhängigkeit von externen Diensten.
                  </p>
                </div>
              </section>

              {/* 07 Prompts SGAI */}
              <section id="prompts-sgai" className="scroll-mt-24">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">07 plan b in aktion</p>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                  Fertige Prompts – mit installiertem ScrapeGraphAI
                </h2>
                <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                  <p>
                    Diese Prompts setzen voraus, dass du Prompt 01 (Installation) bereits ausgeführt hast und der Smoke-Test bestanden hat. Falls nicht, geh zuerst oben zur Weg-B-Sektion. Jeder Prompt erzeugt ein Python-Script, das Claude Code für dich schreibt und ausführt.
                  </p>

                  <div className="space-y-6">
                    {/* SGAI Prompt 01 */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Prompt 01</p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">ScrapeGraphAI installieren und mit kostenlosem Groq fertig machen</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Alles in einem: pip install + playwright install + Groq-API-Key-Setup + Smoke-Test. Wenn fertig, kannst du jeden der folgenden Prompts ausführen. Erklärt dir, wo du den API-Key herbekommst (kostenlos, keine Kreditkarte).</p>
                          </div>
                          <CopyButton text={PROMPT_SGAI_01} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_SGAI_01}</pre>
                        </div>
                      </div>
                    </div>

                    {/* SGAI Prompt 02 */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Prompt 02</p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">SmartScraperGraph gegen eine JS-lastige Seite</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Wenn WebFetch fast nichts zurückgibt, weil die Seite mit React/Vue/Next rendert und der Inhalt erst später lädt. Hier hilft ScrapeGraphAI, weil es Playwright nutzt (echter Headless-Browser). Claude schreibt das Script, führt es aus, liefert die Daten als CSV.</p>
                          </div>
                          <CopyButton text={PROMPT_SGAI_02} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_SGAI_02}</pre>
                        </div>
                      </div>
                    </div>

                    {/* SGAI Prompt 03 */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Prompt 03</p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">MultiGraph mit 50+ URLs parallel</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Massenverarbeitung. Claude liest URLs aus einer urls.txt-Datei, baut SmartScraperMultiGraph, läuft mit Parallelismus, bündelt Ergebnisse, exportiert Excel. Nützlich wenn du die Liste der Seiten bereits hast und alle mit demselben Prompt abarbeiten willst.</p>
                          </div>
                          <CopyButton text={PROMPT_SGAI_03} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_SGAI_03}</pre>
                        </div>
                      </div>
                    </div>

                    {/* SGAI Prompt 04 */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Prompt 04</p>
                      <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2f2d27]">SearchGraph für breite „finde und hole&quot;-Themen</h3>
                            <p className="mt-1 text-sm text-[#5f5b53]">Wenn du keine URLs hast, nur das Thema. SearchGraph sucht bei DuckDuckGo, scrapt die Top-N-Ergebnisse und konsolidiert. Funktioniert wie eine automatische Mini-Recherche.</p>
                          </div>
                          <CopyButton text={PROMPT_SGAI_04} />
                        </div>
                        <div className="rounded-lg bg-[#171717] p-3">
                          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{PROMPT_SGAI_04}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 08 B2B-Fälle */}
              <section id="b2b-faelle" className="scroll-mt-24">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">08 echte fälle</p>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                  3 legitime B2B-Anwendungsfälle, die dir Stunden (und Geld) sparen
                </h2>
                <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                  <p>
                    Hier kommen Fälle, die Leute wirklich lösen wollen – alle mit öffentlichen Daten und ohne die AGB irgendeines Dienstes zu verletzen. Jeder mit einem Mock der CSV, die du am Ende hättest.
                  </p>

                  <div className="space-y-6">
                    {/* Fall 01 */}
                    <div className="space-y-3 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Fall 01</p>
                        <h3 className="mt-1 text-lg font-semibold text-[#2f2d27]">Preismonitoring bei E-Commerce-Konkurrenten</h3>
                      </div>
                      <div className="space-y-2 text-sm leading-6 text-[#5B5851]">
                        <p><strong className="text-[#37352F]">Wann du es nutzt:</strong> Du willst wissen, wie sich deine Konkurrenz bei Preisen und Bestand jede Woche verhält.</p>
                        <p><strong className="text-[#37352F]">Wie du es machst:</strong> Weg A (einzelne Seite → CSV), jede Woche gegen die URLs der Schlüsselprodukte ausgeführt. Danach Woche-für-Woche-Vergleich mit einem kleinen Script.</p>
                      </div>
                      <div className="rounded-lg bg-[#171717] p-3">
                        <pre className="overflow-auto whitespace-pre text-xs leading-6 text-zinc-100">{`produkt,aktueller_preis,vorheriger_preis,delta,bestand
Sneaker Modell X,129,149,-20,Verfügbar
Tasche Modell Y,249,249,0,Ausverkauft
Gürtel Z,79,89,-10,Verfügbar`}</pre>
                      </div>
                    </div>

                    {/* Fall 02 */}
                    <div className="space-y-3 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Fall 02</p>
                        <h3 className="mt-1 text-lg font-semibold text-[#2f2d27]">B2B-Leads aus öffentlichen Branchenverzeichnissen</h3>
                      </div>
                      <div className="space-y-2 text-sm leading-6 text-[#5B5851]">
                        <p><strong className="text-[#37352F]">Wann du es nutzt:</strong> Du musst eine Prospect-Liste für Outreach deiner Agentur oder deines SaaS erstellen. Dein Segment ist klar: Branche + Region + Größe.</p>
                        <p><strong className="text-[#37352F]">Wie du es machst:</strong> Weg A (Prompt 05 für B2B-Leads) mit Crunchbase, G2, Product Hunt, AngelList, Branchenverbänden oder kuratierten Listen wie Y Combinator. Nur öffentliche Profilinfos.</p>
                      </div>
                      <div className="rounded-lg bg-[#171717] p-3">
                        <pre className="overflow-auto whitespace-pre text-xs leading-6 text-zinc-100">{`unternehmen,website,stadt,branche,oeffentlicher_kontakt
Acme GmbH,acme.de,München,SaaS E-Commerce,hallo@acme.de
Beans Lab,beanslab.io,Berlin,SaaS E-Commerce,
Nord Tech,nordtech.de,Hamburg,SaaS E-Commerce,info@nordtech.de`}</pre>
                      </div>
                    </div>

                    {/* Fall 03 */}
                    <div className="space-y-3 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Fall 03</p>
                        <h3 className="mt-1 text-lg font-semibold text-[#2f2d27]">Nachrichten- oder Änderungsmonitoring einer Seite</h3>
                      </div>
                      <div className="space-y-2 text-sm leading-6 text-[#5B5851]">
                        <p><strong className="text-[#37352F]">Wann du es nutzt:</strong> Du musst bei einer bestimmten Seite auf dem Laufenden bleiben (Preisänderungen eines Lieferanten, neue Blog-Posts, regulatorische Ankündigungen).</p>
                        <p><strong className="text-[#37352F]">Wie du es machst:</strong> Weg A (einzelne Seite) täglich per Cron-Job ausgeführt. Täglichen Snapshot in CSV speichern, mit dem vom Vortag vergleichen. Für JS-lastige Seiten zu Weg B (Prompt 02) wechseln.</p>
                      </div>
                      <div className="rounded-lg bg-[#171717] p-3">
                        <pre className="overflow-auto whitespace-pre text-xs leading-6 text-zinc-100">{`datum,titel,zusammenfassung,url
2026-05-28,Neuer Pro-Plan,49€/Monat-Tier mit 10k Requests gestartet,/blog/neuer-plan
2026-05-27,API-Änderung,v1-Endpoint wird im Juli abgekündigt,/blog/api-v1-deprecated`}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 09 Spielregeln */}
              <section id="spielregeln" className="scroll-mt-24">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">09 die spielregeln</p>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                  Verantwortungsvoller Umgang, wo du das NICHT nutzen solltest, und wann es sich lohnt zu zahlen
                </h2>
                <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                  <p>
                    Öffentliche Daten zu scrapen ist ein legitimes Werkzeug – aber wie jedes Werkzeug gibt es Graubereiche. Lies das, bevor du den ersten Prompt in der Produktion abfeuerst.
                  </p>
                  <ul className="space-y-3">
                    {[
                      { title: "Respektiere robots.txt und die Regeln der Seite", desc: "ScrapeGraphAI prüft das nicht standardmäßig und WebFetch auch nicht. Die Verantwortung liegt bei dir: Wenn /robots.txt den Pfad verbietet, scrapt ihn nicht. Teile auch keine persönlichen Daten Dritter ohne Einwilligung." },
                      { title: "Vernünftiges Rate-Limiting", desc: "Schick keine 100 Requests pro Sekunde an eine Seite. Mindestens 1–2 Sekunden zwischen jedem Fetch. Wenn du 429 oder 503 siehst, stopp. Die Prompts von Weg B haben das bereits eingebaut; bei Weg A sag Claude, dass er das Tempo respektieren soll." },
                      { title: "Copyright und Wiederverwendung von Inhalten", desc: "Öffentliche Daten für interne Analysen oder Lead Generation zu scrapen ist normalerweise in Ordnung. Gescrapte Inhalte republizieren (Texte, Bilder, Produktbeschreibungen) ist etwas anderes und kann rechtliche Probleme verursachen. Im Zweifel: lass es." },
                      { title: "Seiten, bei denen du das nicht nutzen solltest", desc: "LinkedIn ist das Paradebeispiel: Du verstößt gegen deren AGB, sie blockieren Bots aggressiv und haben Gerichtsprozesse gegen Scraper gewonnen. Dasselbe gilt für Facebook, Instagram, Twitter/X wenn sie Auth verlangen. Nutze ihre offiziellen APIs oder bezahl B2B-Verzeichnisse mit lizenzierten Daten." },
                    ].map((item) => (
                      <li key={item.title} className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                        <p className="text-sm font-semibold text-[#37352F]">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-[#5B5851]">{item.desc}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="rounded-xl border border-[#E6E6E4] bg-white p-4 text-sm leading-6 text-[#5B5851]">
                    <strong>Und wenn ich es in der Cloud laufen lassen will, nicht auf meinem Rechner?</strong> ScrapeGraphAI hat einen{" "}
                    <a href="https://dashboard.scrapegraphai.com/login" target="_blank" rel="noreferrer" className="font-semibold text-[#23211d] underline decoration-[#B4B2AB] underline-offset-4">Hosted-Service</a>{" "}
                    mit Bezahl-Tarifen für ernsthafte Produktion (monatliche Credits, ohne Python selbst zu pflegen). Wenn du über den persönlichen Gebrauch hinausgehst, ist das ein vernünftiger Weg. Die echten Preise schaust du auf deren Seite nach – wir erfinden hier keine Zahlen.
                  </p>
                </div>
              </section>

              {/* 10 FAQ */}
              <section id="faq" className="scroll-mt-24">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">10 häufige fragen</p>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
                  FAQ – die Fragen, die immer kommen
                </h2>
                <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                  <div className="space-y-3">
                    {[
                      {
                        q: "Brauche ich einen API-Key, um anzufangen?",
                        a: "Bei Weg A nicht. Claude Code und WebFetch reichen. Bei Weg B schon: Du brauchst einen Groq-API-Key (kostenlos, keine Kreditkarte) oder einen von OpenAI (bezahlt) oder Ollama lokal. Der Key wird in einer .env-Datei in deinem Arbeitsordner gespeichert.",
                      },
                      {
                        q: "Warum ist Anthropic / Claude nicht in der offiziellen Provider-Liste von ScrapeGraphAI?",
                        a: "Das ist die Entscheidung der Maintainer des Open-Source-Projekts. Ihre offiziellen Provider sind OpenAI, Groq, Google, Azure, Mistral, MiniMax, Ollama u. a. Das betrifft dich nicht: Bei Weg A ist Claude das Gehirn, weil du in Claude Code bist; bei Weg B nutzt ScrapeGraphAI Groq oder einen anderen Provider als Gehirn, während Claude Code den Rest orchestriert.",
                      },
                      {
                        q: "Ist das legal?",
                        a: "Ja, grundsätzlich – wenn du öffentliche Daten scrapst, robots.txt respektierst, den Server nicht überlastest und keine urheberrechtlich geschützten Inhalte weiterveröffentlichst. Graubereiche sind Social-Media-Plattformen mit Auth (LinkedIn, Facebook), persönliche Daten ohne Einwilligung und Seiten, die Scraping in ihren AGB explizit verbieten. In diesen Fällen: offizielle API nutzen oder lizenzierten Datenanbieter.",
                      },
                      {
                        q: "Wie automatisiere ich das, damit es täglich von alleine läuft?",
                        a: "Zwei Optionen. Weg A: Nutze /schedule von Claude Code, um deinen Prompt täglich in der Cloud auszuführen. Weg B: Wenn dein Python-Script einmal läuft, packst du es in einen Cron-Job auf deinem Rechner oder Server (cron, launchd auf Mac, Task-Planer unter Windows).",
                      },
                      {
                        q: "Wie wandle ich die CSV in eine richtige formatierte Excel-Datei um?",
                        a: "Prompt 04 von Weg A macht das für dich (openpyxl mit fetten Headern, automatischen Breiten, Filtern, klickbaren Hyperlinks). Wenn du sie nur ohne Formatierung öffnen willst, öffnen Numbers auf Mac, LibreOffice oder Google Sheets CSV direkt und du konvertierst sie mit einem Klick zu xlsx.",
                      },
                      {
                        q: "Was kostet Weg B mit Groq?",
                        a: "Für typische persönliche Nutzung: nichts. Das Free-Tier von Groq ist sehr großzügig (hunderttausende Tokens pro Tag). Wenn du das Rate-Limit überschreitest, müsstest du auf deren Bezahl-Tarif wechseln – aber für 99&nbsp;% der persönlichen oder kleinen Team-Scraping-Fälle reicht das Free-Tier.",
                      },
                    ].map((item) => (
                      <details key={item.q} className="group rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 open:bg-white">
                        <summary className="cursor-pointer list-none text-sm font-semibold text-[#37352F] group-open:mb-3">{item.q}</summary>
                        <p className="text-sm leading-6 text-[#5B5851]">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </section>

            </div>

            {/* ── Footer-Bereich ────────────────────────────────────────────────── */}
            <div className="mt-14 space-y-6 border-t border-[#EBEBEA] pt-8">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Community-Anleitung</p>
                <p className="text-sm leading-relaxed text-[#5f5b53]">
                  Diese Anleitung geht tief auf{" "}
                  <code className="rounded bg-[#F0F0EE] px-1 py-0.5 font-mono text-xs">ScrapeGraphAI</code>{" "}
                  ein, weil das Muster, das die Italiener dokumentiert haben (laden → bereinigen → mit LLM extrahieren → exportieren) das ist, was beim Scraping am meisten den Unterschied macht – und Claude Code hat alle vier Teile schon nativ an Bord. Die Anleitung kommt aus dem Archiv von{" "}
                  <a className="inline-flex items-center gap-1 font-semibold text-[#23211d] underline decoration-[#B4B2AB] underline-offset-4" href="https://twitter.com/kidealist" target="_blank" rel="noreferrer">@kidealist</a>
                  . Wenn sich im Repo oder in der offiziellen Doku etwas ändert, ist das die Quelle der Wahrheit.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { href: "https://github.com/ScrapeGraphAI/Scrapegraph-ai", title: "Offizielles ScrapeGraphAI-Repo", desc: "Quellcode, Beispiele für jeden Graph-Typ, offene Issues. Die Quelle der Wahrheit, wenn sich etwas ändert." },
                  { href: "https://docs.scrapegraphai.com/introduction", title: "Offizielle Dokumentation", desc: "Referenz für jeden Graphen (SmartScraper, SearchGraph, MultiGraph), unterstützte Provider und Konfigurationsoptionen." },
                  { href: "https://console.groq.com/", title: "Groq Console – kostenloser API-Key", desc: "Wo du den API-Key für Weg B ohne Kreditkarte bekommst. Sehr großzügiges Free-Tier, ausreichend für persönliches Scraping." },
                  { href: "https://dashboard.scrapegraphai.com/login", title: "Hosted Dashboard (wenn du SaaS statt lokal willst)", desc: "ScrapeGraphAI hat seinen Cloud-Service. Nützlich wenn du das Script nicht auf deinem eigenen Rechner laufen lassen willst." },
                ].map((link) => (
                  <a key={link.href} target="_blank" rel="noreferrer" className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 transition-colors hover:bg-[#F1F1EE]" href={link.href}>
                    <p className="text-sm font-semibold text-[#37352F]">{link.title}</p>
                    <p className="mt-2 text-xs leading-5 text-[#5B5851]">{link.desc}</p>
                  </a>
                ))}
              </div>

              <div className="space-y-2 rounded-xl border border-[#E6E6E4] bg-white p-4 sm:p-5">
                <p className="text-sm font-semibold text-[#37352F]">Wo fange ich heute an?</p>
                <p className="text-sm leading-relaxed text-[#5B5851]">
                  Öffne einen neuen Ordner, starte Claude Code darin und kopiere{" "}
                  <a href="#prompts-nativ" className="font-semibold text-[#23211d] underline decoration-[#B4B2AB] underline-offset-4">Prompt 01 von Weg A</a>
                  . In weniger als einer Minute hast du deine erste extrahierte CSV – ohne Installation, ohne API. Wenn du auf eine JS-lastige Seite stößt oder hunderte URLs auf einmal brauchst, wechselst du dann zu{" "}
                  <a href="#weg-b" className="font-semibold text-[#23211d] underline decoration-[#B4B2AB] underline-offset-4">Weg B</a>
                  .
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
                  onClick={() => handleTab(tab.id)}
                  className={`min-w-[110px] rounded-xl px-3 py-2 text-left text-xs font-medium transition-colors ${
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

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────

function LayersIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#37352F]" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>;
}
function GlobeIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#37352F]" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>;
}
function BoxesIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#37352F]" aria-hidden="true"><path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/></svg>;
}
function WandIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#37352F]" aria-hidden="true"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/></svg>;
}

// Small versions for nav links
function HelpCircleSmIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>;
}
function LayersSmIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>;
}
function GlobeSmIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>;
}
function WandSmIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/></svg>;
}
function ShieldAlertSmIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>;
}
function BoxesSmIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true"><path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/></svg>;
}
function TerminalSmIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true"><path d="M12 19h8"/><path d="m4 17 6-6-6-6"/></svg>;
}
function BriefcaseSmIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>;
}
function ShieldCheckSmIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>;
}
