"use client";

import { useState } from "react";

// ─── Prompts / Copy-Paste ────────────────────────────────────────────────────

const README_TEMPLATE = `# Wer ich bin und wie wir zusammenarbeiten

Ich bin [DEIN NAME], [DEIN BERUF]. Ich arbeite in [BRANCHE] und meine Zielgruppe ist [ZIELGRUPPE].

Mein täglicher Stack: [TOOL-LISTE — z.B. Gmail, Notion, Shopify, Google Calendar]
Meine wichtigsten Kunden: [KUNDENTYP ODER NAMEN]

## Wie du mit mir redest
- Immer auf Deutsch, direkt und auf den Punkt
- Kurze Sätze und konkrete Beispiele
- Keine Emojis, außer ich frag explizit danach
- Wenn etwas wichtig ist, sag es klar – keine Umschweife

## Wie du NICHT mit mir redest
- Keine Wörter wie "unverzichtbar", "revolutionär", "das darfst du nicht verpassen"
- Frag mich nicht "Wie kann ich dir helfen?" – du kennst meinen Kontext
- Gib mir keine A/B/C-Optionen, außer ich frag ausdrücklich danach
- Keine ellenlangen Listen, wenn zwei Sätze reichen

## Wie wir zusammenarbeiten
- Bevor du etwas Größeres machst, sag mir was du vorhast und warte auf grünes Licht
- Wenn du ein Problem findest, sag es mir sofort – nicht einfach weitermachen
- Wenn dir was unklar ist, frag lieber nach als zu raten
- Wenn du eine Aufgabe erledigt hast, gib mir eine kurze Zusammenfassung was du geändert hast`;

const PROMPT_SALES = `Du arbeitest als mein Vertriebsassistent. Mein Stack:
- Gmail: mein Haupt-Posteingang für Leads (alles, was auf meine geschäftliche E-Mail kommt)
- Google Calendar: mein Kalender, freie Slots für Demos sind [ZEITEN — z.B. Mo–Fr von 10–13 Uhr]
- HubSpot: mein CRM, jeden neuen Lead muss ich als Kontakt anlegen und einen Deal eröffnen

Deine tägliche Arbeit (erledigst du jeden Morgen wenn ich Cowork öffne):
1. Lies die ungelesenen E-Mails der letzten 24 Stunden.
2. Finde heraus, welche neue Leads sind (Leute, die mir noch nie geschrieben haben).
3. Für jeden neuen Lead:
   - Lege ihn als Kontakt in HubSpot an mit allen Daten aus der E-Mail.
   - Wenn er nach einem Demo oder Meeting gefragt hat, biete ihm 2 freie Slots aus dem Kalender an.
   - Schreib mir einen Antwort-Entwurf, den ich lesen und abschicken kann.
4. Wenn alte Leads antworten, aktualisiere den Deal-Status in HubSpot.
5. Fass am Ende zusammen, was du gemacht hast: wie viele neue Leads, wie viele Entwürfe, welche Deals sich bewegt haben.

Regeln:
- Schick nie E-Mails in meinem Namen – immer nur Entwürfe.
- Wenn eine E-Mail unklar ist, frag mich bevor du handelst.
- Wenn ein Lead aggressiv oder merkwürdig wird, antworte nicht und sag mir Bescheid.`;

const PROMPT_NEWSLETTER = `Du arbeitest als Redakteur meines Newsletters [NAME DES NEWSLETTERS].

Mein Setup:
- Notion: ich habe eine Seite namens "Entwürfe" mit allen Drafts in der Warteschlange.
- Drive: wenn ein Draft fertig ist, exportierst du ihn als Markdown in den Ordner "Newsletter / Final", damit ich ihn in [Substack · Beehiiv · Ghost · anderes] einfügen kann.

Mein redaktioneller Stil:
- Zielgruppe: [BESCHREIB DEN LESER — z.B. Early-Stage-Gründer, die täglich KI nutzen]
- Stimme: direkt, kein Fülltext, mit konkreten Beispielen. Informelles Deutsch.
- Länge: [WÖRTER — z.B. 800–1200 Wörter]
- Struktur: starker Hook in den ersten 3 Zeilen, Hauptteil mit 2–3 Punkten, Abschluss mit CTA.

Deine Arbeit:
1. Wenn ich dir sage "nimm Entwurf N", liest du diese Notion-Seite.
2. Du gibst mir redaktionelles Feedback: Was funktioniert, was soll raus, wo bricht der Rhythmus ein.
3. Wenn ich sage "mach die finale Version", schreibst du den Entwurf komplett um – meiner Stimme und Struktur treu – und exportierst ihn in Drive als .md.
4. Bevor du exportierst, zeig mir das Ergebnis zur Freigabe.

Regeln:
- Veröffentliche nie etwas – ich paste es manuell in die Plattform.
- Wenn ein Entwurf eine schwache Idee hat, sag es direkt statt es zu verschönern.
- Wenn dir Kontext zu einem Thema fehlt, frag mich bevor du etwas erfindest.`;

const PROMPT_SHOPIFY = `Du bist der Analyst meines Shopify-Shops [URL ODER NAME DES SHOPS].

Was ich jeden Montag um 9 Uhr brauche (richte es als Scheduled Task ein):
1. Verkaufsbericht der letzten Woche (Montag bis Sonntag):
   - Gesamtumsatz in EUR und Anzahl der Bestellungen.
   - Top 5 meistverkaufte Produkte.
   - Bottom 5 Produkte, die sich kaum bewegen.
   - Vergleich zur Vorwoche (gestiegen/gefallen um wie viel).
2. Lagerbestand-Warnungen:
   - Produkte mit weniger als [N — z.B. 20 Einheiten] Lagerbestand.
   - Produkte, die laut Verkaufstempo wahrscheinlich in den nächsten 7 Tagen ausverkauft sind.
3. Empfehlungen:
   - Was dringend nachbestellt werden muss.
   - Was im Preis gesenkt werden sollte, weil es liegt.

Format des Berichts:
- Google-Drive-Dokument im Ordner "Shopify-Berichte / Wöchentlich".
- Name: "JJJJ-MM-TT · Wochenbericht".
- Struktur: 3-Zeilen-Zusammenfassung oben, danach die detaillierten Abschnitte.

Regeln:
- Wenn du etwas Komisches findest (Massenrücksendungen, Phantom-Artikel), sag mir im Chat Bescheid bevor du den Bericht speicherst.
- Ändere keine Preise oder Lagerbestände direkt – du empfiehlst nur.
- Wenn eine Woche keine Verkäufe gab (Urlaub, Website-Ausfall), sag es klar in der Zusammenfassung.`;

const PROMPT_ADS = `Du bist mein Marketing-Manager für Facebook Ads.

Mein Konto: [ID ODER NAME DES FB-ADS-KONTOS].
Meine aktiven Kampagnen: [LISTE NAMEN ODER SAG "alle laufenden"].
Mein ungefähres Tagesbudget: [EUR/TAG].

Was ich jeden Morgen um 8 Uhr brauche (Scheduled Task):
1. Metriken von gestern:
   - Gesamtausgaben und pro Kampagne.
   - CTR (Click-Through-Rate) pro Anzeige.
   - CPL oder CPA (was zutrifft) pro Kampagne.
   - ROAS wenn Conversions richtig gemessen werden.
2. Automatische Flags:
   - Anzeigen mit CTR unter [%] – Kandidaten zum Pausieren.
   - Anzeigen mit CPL über [EUR] – Copy oder Targeting überprüfen.
   - Anzeigen, die ihr Budget vor 18 Uhr ausschöpfen (Signal: Budget erhöhen).
3. Wochentrend:
   - Vergleich mit den letzten 7 Tagen.
   - Welche Kampagnen besser wurden, welche schlechter.

Speichere den Bericht in Drive unter "Marketing / FB Ads / Daily" mit Name "JJJJ-MM-TT.md".

Regeln:
- Pausiere oder ändere keine Kampagnen – du empfiehlst nur.
- Wenn eine Metrik an einem Tag mehr als 30% einbricht, schreib mir eine WhatsApp (an diese Nummer [DEINE NUMMER]) zusätzlich zum normalen Bericht.
- Wenn eine Anzeige absurd gut performt (CTR + ROAS sehr hoch), hebe es hervor damit ich sie skalieren kann.`;

const PROMPT_PERSONAL = `Du bist mein persönlicher Assistent. Wir arbeiten jeden Tag Montag bis Freitag.

Mein Setup:
- Gmail: mein Haupt-Posteingang.
- Google Calendar: mein Kalender.
- Google Drive: ich habe eine Datei "To-Do.md" im Ordner "Persönlich / Ausstehend" mit Aufgaben, die ich manuell ergänze.

Was ich jeden Morgen um 7 Uhr brauche (Scheduled Task):
1. Posteingang: 3–5 wichtigste E-Mails vom Vortag und von heute, die eine Antwort erfordern.
2. Kalender: die Meetings von heute mit Uhrzeit, wer dabei ist, und wenn du Kontext hast (E-Mails mit dieser Person), gib mir ein 2-Zeilen-Briefing pro Meeting.
3. To-Do.md: lies die Datei und teile die Aufgaben in 3 Gruppen:
   - Heute (dringend oder mit Deadline).
   - Diese Woche (wichtig aber nicht dringend).
   - Später (kann warten).
4. Zusammenfassung: gib mir oben einen Absatz "So sieht dein Tag aus" – maximal 3 Zeilen.

Format: lass mir die Zusammenfassung als Nachricht in Cowork, nicht als Datei. Ich lese sie, sobald ich die App öffne.

Regeln:
- Wenn ich mehr als 3 Meetings an einem Tag habe, schlage vor, welches ich verschieben könnte (du machst es nicht selbst).
- Wenn eine E-Mail im Posteingang wie Spam oder Phishing aussieht, sag es mir separat damit ich es markieren kann.
- Wenn eine Aufgabe aus To-Do.md schon laut E-Mail oder Kalendereintrag erledigt ist, markiere sie in der Zusammenfassung, damit ich sie lösche.`;

const PROMPT_RESEARCHER = `Du bist mein Researcher. Mein Forschungsbereich: [BESCHREIB — z.B. Sprachmodelle in der Buchhaltung, oder B2B-Marketing-Trends, oder personalisierte Medizin].

Mein Setup:
- Notion: ich habe eine Datenbank namens "Research Library" mit Spalten: Titel · Autor · Jahr · Thema · 3-Zeilen-Zusammenfassung · Meine Notizen · Link.
- Drive: wenn du eine PDF oder eine lange Datei speichern musst, kommt sie in "Research / Quelldateien".

Wenn ich dir einen Link, eine PDF oder einen Paper-Namen schicke:
1. Lies es komplett (kein Überfliegen).
2. Erstelle eine 3-Zeilen-Zusammenfassung: was es sagt + warum es wichtig ist + was es mit dem verbindet, was wir schon recherchiert haben.
3. Füge es zur Notion-Datenbank hinzu mit allen Feldern.
4. Wenn der Paper etwas sagt, das einem anderen in der Datenbank widerspricht oder ergänzt, markiere das in "Meine Notizen".
5. Wenn der Inhalt sehr lang ist (z.B. kompletter Paper oder Buch), speichere eine Kopie in Drive und verlinke sie von Notion aus.

Einmal pro Woche (sonntags um 18 Uhr, Scheduled Task):
- Schau dir die Datenbank an und sag mir, welche Themen sich wiederholen (Cluster).
- Schlage mir 3 Papers oder Quellen vor, die es wert wären, Lücken zu füllen.

Regeln:
- Erfinde nie Zitate – wenn du den genauen Wert nicht findest, sag es mir und such ihn wirklich.
- Wenn ein Paper kontrovers ist oder bekannte Kritik hat, markiere es in "Meine Notizen".
- Die 3-Zeilen-Zusammenfassungen sind heilig – nicht mehr und nicht weniger.`;

// ─── Tabs ───────────────────────────────────────────────────────────────────

const TABS = [
  { id: "was-ist-cowork", label: "Was ist Cowork", num: "01" },
  { id: "installieren", label: "Installieren", num: "02" },
  { id: "projekt-readme", label: "Projekt + README", num: "03" },
  { id: "verbinden", label: "Verbinden", num: "04" },
  { id: "features", label: "14 Features", num: "05" },
  { id: "combos", label: "6 Combos", num: "06" },
  { id: "upgrade", label: "Wann zu Code", num: "07" },
  { id: "fallstricke", label: "Fallstricke", num: "08" },
];

// ─── Hilfskomponenten ────────────────────────────────────────────────────────

function CopyButton({ text, label = "Kopieren" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
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
        <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">{code}</pre>
      </div>
    </div>
  );
}

// ─── Hauptseite ──────────────────────────────────────────────────────────────

export default function CoworkMeisternPage() {
  const [activeTab, setActiveTab] = useState("was-ist-cowork");

  const scrollTo = (id: string) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#37352F]">
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-5xl px-4 pb-28 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:py-12">

          {/* Breadcrumb */}
          <div className="mb-8 hidden flex-wrap items-center gap-2 text-sm text-[#8B8B85] sm:flex">
            <a className="transition-colors hover:text-[#37352F]" href="/tutorials">Tutorials</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
            <span className="font-medium text-[#37352F]">Cowork meistern</span>
          </div>

          {/* Header */}
          <header className="mb-8 sm:mb-10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E6E6E4] bg-[#FCFCFB] px-3 py-1 text-xs font-semibold text-[#5B5851]">
              <span className="inline-flex gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="h-2 w-2 rounded-full bg-violet-500" />
              </span>
              1 App zum Installieren · 14 Features · 6 Copy-Paste-Combos · 4 Schritte
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[#23211d] sm:text-5xl">
              Cowork meistern — Claudes Arbeitspartner auf deinem Desktop
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#5B5851] sm:text-lg sm:leading-8">
              Cowork ist der agentische Modus von Claude, der in der <strong className="text-[#37352F]">Desktop-App</strong> lebt – nicht im Browser. Hier wird Claude vom Chatbot zu{" "}
              <strong className="text-[#37352F]">jemandem, der neben dir arbeitet</strong>: er liest dein Gmail, sieht deinen Kalender, bewegt Dinge in Notion, plant Aufgaben für 8 Uhr morgens und arbeitet während du schläfst. Die Anleitung deckt die{" "}
              <strong className="text-[#37352F]">4 Schritte</strong> (Desktop-App herunterladen, Projekt + README anlegen, Gmail/Notion/Calendar verbinden, wann du zu Code wechselst) plus den vollständigen Überblick über{" "}
              <strong className="text-[#37352F]">die 14 Features</strong> (Projects, Scheduled Tasks, Plugins, Skills, Computer Use, Live Artifacts, Permission Modes, native Tabellen, Sub-agent Coordination, Code Execution Isolation) mit den Fallstricken, die Anthropic offiziell dokumentiert.
            </p>
          </header>

          {/* Schnellübersicht */}
          <div className="mb-6 sm:mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#8B8B85]">Schnellübersicht · spring zum Schritt, der dich interessiert</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  href: "#installieren",
                  borderColor: "border-emerald-200 hover:border-emerald-300",
                  bgColor: "bg-emerald-50/50 hover:bg-emerald-50",
                  iconColor: "text-emerald-700",
                  dotColor: "bg-emerald-500",
                  labelColor: "text-emerald-700",
                  label: "Schritt 1 · installieren",
                  title: "Lade die Desktop-App herunter",
                  desc: "Cowork lebt nur in der Desktop-App von Claude. Wenn du über den Browser gehst, siehst du es nicht.",
                  iconPath: <><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" /></>,
                },
                {
                  href: "#features",
                  borderColor: "border-blue-200 hover:border-blue-300",
                  bgColor: "bg-blue-50/50 hover:bg-blue-50",
                  iconColor: "text-blue-700",
                  dotColor: "bg-blue-500",
                  labelColor: "text-blue-700",
                  label: "Schritt 2 · kennenlernen",
                  title: "Die 14 Dinge, die Cowork kann",
                  desc: "12 Features, die Anthropic dokumentiert + 2 abgeleitete, die die Community täglich nutzt.",
                  iconPath: <><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" /><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" /><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" /></>,
                },
                {
                  href: "#combos",
                  borderColor: "border-violet-200 hover:border-violet-300",
                  bgColor: "bg-violet-50/50 hover:bg-violet-50",
                  iconColor: "text-violet-700",
                  dotColor: "bg-violet-500",
                  labelColor: "text-violet-700",
                  label: "Schritt 3 · anwenden",
                  title: "6 Copy-Paste-Combos",
                  desc: "Vertriebsassistent, Newsletter-Editor, Shopify-Analyst, Marketing-Manager und mehr – jeder mit fertigem Prompt.",
                  iconPath: <><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" /><path d="m14 7 3 3" /><path d="M5 6v4" /><path d="M19 14v4" /><path d="M10 2v2" /><path d="M7 8H3" /><path d="M21 16h-4" /><path d="M11 3H9" /></>,
                },
              ].map(({ href, borderColor, bgColor, iconColor, dotColor, labelColor, label, title, desc, iconPath }) => (
                <a key={href} href={href} className={`group flex flex-col gap-3 rounded-xl border p-5 transition-colors ${borderColor} ${bgColor}`}>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white ${iconColor}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">{iconPath}</svg>
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#8B8B85] transition-transform group-hover:translate-y-0.5 group-hover:text-[#37352F]" aria-hidden="true"><path d="m7 7 10 10" /><path d="M17 7v10H7" /></svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
                      <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${labelColor}`}>{label}</p>
                    </div>
                    <p className="mt-1 text-lg font-bold text-[#23211d]">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#5B5851]">{desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Infobox */}
          <div className="mb-8 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:mb-10 sm:p-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Claude Cowork · natives Anthropic-Produkt (nur bezahlte Pläne)</p>
              <p className="text-sm font-semibold text-[#37352F]">Desktop-App Mac + Windows · 14 Features · 4 Schritte zum Start · 6 Copy-Paste-Combos · 6 offizielle Fallstricke</p>
              <p className="max-w-3xl text-sm leading-6 text-[#5B5851]">
                Diese Anleitung destilliert das komplette Handbuch für Claude Cowork – den agentischen Modus von Claude in der Desktop-App. Sie deckt die 4 Schritte ab (Desktop-App herunterladen, erstes Projekt + README anlegen, Gmail/Notion/Calendar/Drive/Shopify/HubSpot/Microsoft 365 verbinden, wann du zu Code wechselst), die 14 Features mit ihren Deep Dives, 6 echte Combos (Vertriebsassistent, Newsletter-Editor, Shopify-Analyst, Marketing-Manager Facebook Ads, Persönlicher Assistent, Researcher), 6 ehrliche Fallstricke mit wörtlichen Anthropic-Zitaten sowie Verweise auf verwandte Anleitungen.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#E6E6E4] pt-3">
              {["Desktop-App · Mac + Windows", "Pro · Max · Team oder Enterprise", "14 Features · 12 offizielle + 2 abgeleitete", "Speicher ist pro Projekt getrennt"].map((tag) => (
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
                className={`min-w-[120px] rounded-md px-3 py-2 text-left text-sm transition-colors sm:min-w-0 ${activeTab === tab.id ? "bg-[#EBEBEA] font-semibold text-[#1f1e1a]" : "text-[#66635D] hover:bg-[#EFEFED]"}`}
              >
                <span className="mr-2 font-mono text-xs text-[#8B8B85]">{tab.num}</span>
                {tab.label}
              </button>
            ))}
          </nav>

          {/* ── Sektionen ──────────────────────────────────────────────────── */}
          <div className="space-y-14">

            {/* 01 Was ist Cowork */}
            <section id="was-ist-cowork" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Was es ist · was sich ändert</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">Claude öffnet Dateien, liest deinen Posteingang und arbeitet während du schläfst</h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>Stell dir vor, dein gewohnter Claude-Chat öffnet jetzt Dateien auf deinem Mac, liest dein Gmail, plant Aufgaben für 8 Uhr morgens und arbeitet, während du schläfst. Das ist Cowork. Es ist der agentische Modus von Claude, der in der Desktop-App lebt – nicht im Browser – und Claude von einem Chatbot, der einzelne Fragen beantwortet, zu jemandem macht, der wirklich neben dir arbeitet.</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { num: "01", title: "Lebt in der Desktop-App · nicht im Browser", desc: "Wenn du Claude zahlst und nur über claude.ai im Browser nutzt, siehst du Cowork nicht. Du musst die Desktop-App für Mac oder Windows herunterladen. Danach wählst du in der Sidebar zwischen Chat, Cowork oder Code – Cowork ist das, was dich interessiert." },
                    { num: "02", title: "Arbeitet mit deinen Dateien und Apps · nicht nur mit Text", desc: "Cowork liest und schreibt Dateien direkt auf deiner Festplatte. Es sieht dein Gmail, wenn du es verbindest. Es kennt deinen Kalender. Es bewegt Dinge in Notion. Es plant Aufgaben für feste Zeiten. Das ist der Unterschied zwischen jemandem, der dich berät, und jemandem, der die Arbeit wirklich macht." },
                    { num: "03", title: "Speichert Kontext in Projekten · nicht in losen Chats", desc: "Im Chat fängt jedes Gespräch bei null an. In Cowork legst du ein Projekt an, gibst Anweisungen, die immer gelten, verbindest Dateien und Connectors – und dieser Kontext lebt dort. Beim nächsten Mal weiß Cowork schon, wer du bist und woran du arbeitest." },
                  ].map(({ num, title, desc }) => (
                    <article key={num} className="rounded-xl border border-[#E6E6E4] bg-white p-5">
                      <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#8B8B85]">{num}</p>
                      <h3 className="mt-2 text-base font-bold text-[#23211d]">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#5B5851]">{desc}</p>
                    </article>
                  ))}
                </div>
                <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-900">Ehrlicher Hinweis · die offizielle Reihenfolge ist umgekehrt</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#37352F]">Oft wird Cowork als "Trainingsräder vor Code" beschrieben. Offiziell sieht Anthropic es andersrum: Cowork ist der vereinfachte Nachfahre von Code, gedacht für Leute, die nicht programmieren. Praktisch ist das Ergebnis dasselbe – wenn du nicht programmierst, fang mit Cowork an; wenn du programmierst, gibt dir Code mehr Kontrolle. Aber es ist gut, die echte Reihenfolge zu kennen, damit dich niemand mit "Cowork ist das alte Ding" überraschen kann.</p>
                </div>
              </div>
            </section>

            {/* 02 Installieren */}
            <section id="installieren" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Schritt 1 · installieren</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">Lade die Desktop-App herunter · Cowork lebt nicht im Browser</h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>Cowork lebt nur in der Desktop-App von Claude. Wenn du über den Browser gehst, siehst du es nicht. Der erste Schritt ist, die App von der offiziellen Seite herunterzuladen – ein einziger Installer für Mac oder Windows, kostenlos zum Download, aber für die Aktivierung brauchst du einen bezahlten Plan.</p>
                <div className="min-w-0 rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                  <p className="mb-3 text-sm font-semibold text-[#37352F]">Offizielle Seite · Desktop-App herunterladen</p>
                  <div className="rounded-lg bg-[#171717] p-3">
                    <code className="block overflow-x-auto whitespace-nowrap text-xs text-zinc-100 sm:text-sm">https://claude.com/downloads</code>
                  </div>
                  <CopyButton text="https://claude.com/downloads" label="Link kopieren" />
                </div>
                <ol className="mt-2 space-y-3">
                  {[
                    { num: "01", color: "text-emerald-700", title: "Lade den Installer von der offiziellen Seite herunter", desc: "Öffne claude.com/downloads im Browser. Die Seite erkennt automatisch, ob du Mac oder Windows nutzt, und gibt dir die richtige Datei. Auf dem Mac ist es eine .dmg, unter Windows eine .exe. Der Download dauert weniger als eine Minute." },
                    { num: "02", color: "text-emerald-700", title: "Installiere sie und melde dich mit deinem Claude-Konto an", desc: "Öffne die Datei und folge den Installations-Schritten (auf dem Mac ziehst du das Icon in Anwendungen, unter Windows klickst du ein paar Mal auf Weiter). Beim ersten Start der App wirst du gebeten, dich anzumelden – nutze dasselbe Konto, das du auf claude.ai im Browser verwendest." },
                    { num: "03", color: "text-emerald-700", title: "Wähle in der Sidebar Cowork – NICHT Code", desc: "In der App siehst du in der linken Sidebar drei Modi: Chat, Cowork und Code. Geh zu Cowork, nicht zu Code. Code ist für später, wenn du Cowork schon draufhast. Klicke auf Cowork und du siehst das Hauptfenster mit der Option, ein neues Projekt zu erstellen." },
                  ].map(({ num, color, title, desc }) => (
                    <li key={num} className="rounded-lg border border-[#E6E6E4] bg-white p-4 sm:p-5">
                      <p className={`font-mono text-xs font-semibold tracking-[0.14em] ${color}`}>{num}</p>
                      <h3 className="mt-1 text-sm font-semibold text-[#23211d] sm:text-base">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#5B5851]">{desc}</p>
                    </li>
                  ))}
                </ol>
                <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-900">Cowork braucht einen bezahlten Plan · funktioniert nicht mit Free</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#37352F]">Um Cowork zu nutzen, brauchst du Pro (20 $/Monat), Max (100 $/Monat+), Team oder Enterprise. Mit dem Free-Plan erscheint der Cowork-Modus nicht in der Sidebar – du siehst nur Chat. Wenn du noch nicht weißt, welchen Plan du wählen sollst, schau dir zuerst die Vergleichsanleitung an.</p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8B8B85]">Technischer Hinweis · wo es NICHT funktioniert</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#37352F]">Cowork ist nicht auf Mobile oder Web verfügbar. Wenn du Pro oder Max hast, kannst du vom Handy eine Aufgabe starten, aber die Ausführung passiert trotzdem auf deinem Desktop mit der geöffneten Claude-App. Wenn der Computer schläft oder die App geschlossen ist, laufen keine Aufgaben.</p>
                </div>
              </div>
            </section>

            {/* 03 Projekt + README */}
            <section id="projekt-readme" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Schritt 2 · Projekt anlegen · der README-Trick</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">Eine README-Datei im Projekt · Schluss mit dem Bio-Kopieren</h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>Jedes Projekt in Cowork ist wie ein eigenes Büro für Claude. Du gibst Anweisungen, fügst Dateien hinzu, verbindest die Apps, die es braucht – und das alles lebt nur in diesem Projekt. Und hier kommt der Trick, den dir niemand sagt: In jedem Projekt legst du eine README-Datei an, die erklärt, wer du bist und wie Claude mit dir reden soll. Du schreibst es einmal und nie wieder deine Bio kopieren-einfügen.</p>
                <ol className="space-y-3">
                  {[
                    { num: "01", color: "text-blue-700", title: "Cowork → Projekte → Neues Projekt · wähle lokalen Ordner", desc: "In Cowork tippst du auf Neues Projekt. Du gibst ihm einen Namen (z.B. \"Tägliche Arbeit\") und wählst einen Ordner auf deiner Festplatte als Projektordner. Das ist der Ordner, aus dem Claude Dateien liest und in den er schreibt – wähle am besten einen neuen Ordner, damit er nicht an wichtige Dinge stößt." },
                    { num: "02", color: "text-blue-700", title: "Erstelle eine README.md-Datei im Ordner", desc: "In dem Ordner, den du gewählt hast, erstellst du eine neue Datei namens README.md (die Endung .md ist Markdown, ein Plaintext-Format mit einfacher Formatierung). Darin fügst du die Vorlage unten ein und ersetzt, was in [eckigen Klammern] steht, mit deinen echten Daten. Wenn du kein Markdown kennst, kein Problem – normaler Text mit Bindestrichen funktioniert genauso." },
                    { num: "03", color: "text-blue-700", title: "Sag Claude, die README am Anfang jeder Sitzung zu lesen", desc: "Geh zurück zu Cowork, öffne das Projekt, das du gerade eingerichtet hast, und schicke als erste Nachricht: \"Lies die Datei README.md in diesem Projekt und halte dich immer daran – wie du mit mir redest, was du vermeidest, welchen Stack ich nutze. Wenn du fertig bist, sag mir Bescheid und wir legen los.\" Das machst du EIN Mal pro Projekt – beim nächsten Mal weiß Cowork es schon, weil der Speicher pro Projekt getrennt ist." },
                  ].map(({ num, color, title, desc }) => (
                    <li key={num} className="rounded-lg border border-[#E6E6E4] bg-white p-4 sm:p-5">
                      <p className={`font-mono text-xs font-semibold tracking-[0.14em] ${color}`}>{num}</p>
                      <h3 className="mt-1 text-sm font-semibold text-[#23211d] sm:text-base">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#5B5851]">{desc}</p>
                    </li>
                  ))}
                </ol>
                <PromptBlock
                  title="README.md-Vorlage · in den Projektordner einfügen"
                  desc="Das ist der Kern des Tricks. Du schreibst es einmal, ersetzt die eckigen Klammern mit deinen echten Daten, und es lebt im Projekt. Claude liest es und behandelt dich genau so, wie du es willst."
                  code={README_TEMPLATE}
                />
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900">Was du gewinnst · der Einmal-Trick</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#37352F]">Du schreibst es EIN Mal und es lebt dort. Schluss mit Bio-Kopieren in jeden Chat. Und weil die Datei dir gehört, kannst du sie bearbeiten, wenn du etwas Neues lernst – zum Beispiel nach ein paar Sitzungen, in denen Claude etwas falsch gemacht hat, fügst du eine Zeile mehr in die README ein, die erklärt, was zu vermeiden ist.</p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8B8B85]">Ordner-Anweisungen vs. globale Anweisungen</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#37352F]">Cowork lässt dich auch Custom Instructions auf Kontoebene anlegen – das sind die globalen Anweisungen, die für alle deine Projekte gelten. Aber die README pro Projekt wiegt mehr, weil sie direkt am konkreten Arbeitsordner hängt, wo Claude Dateien liest und schreibt. Die globale Ebene ist für deine Basis-Identität; die README ist für den Projektkontext.</p>
                </div>
              </div>
            </section>

            {/* 04 Verbinden */}
            <section id="verbinden" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Schritt 3 · alles verbinden, was du schon nutzt</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">Gmail · Calendar · Notion · Drive · Shopify · und 3 weitere</h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>Hier hört Cowork auf, ein Chatbot zu sein, und wird zu jemandem, der deinen heutigen Posteingang sieht, deinen Kalender und deine Notion-Docs. Die Connectors sind die Apps, die du täglich nutzt – Gmail, Drive, Notion, Shopify usw. – die Cowork lesen und ändern kann, wenn du sie verbindest.</p>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8B8B85]">Wie du einen Connector aktivierst</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#37352F]">Operativer Pfad: Cowork → Einstellungen → Connectors → jeden einzeln aktivieren. Du wirst gebeten, dich in der App anzumelden (Gmail öffnet den Google-Flow, Notion fragt nach deiner Notion-Sitzung usw.). Das ist normales OAuth – Anthropic speichert nicht deine Passwörter, nur das Session-Token.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { title: "Gmail", desc: "Liest deine Tages-E-Mails, entwirft Drafts, die du vor dem Senden prüfst, und priorisiert den Posteingang nach Kontext (was ist dringend, was kann warten)." },
                    { title: "Google Calendar", desc: "Sieht deinen vollen Kalender, plant neue Termine, schlägt freie Slots vor, wenn jemand ein Meeting anfrägt, warnt vor Konflikten." },
                    { title: "Google Drive", desc: "Liest Dokumente, Tabellen und Präsentationen. Bearbeitet Versionen – wenn du sagst, er soll einen Bericht aktualisieren, tut er das direkt in der Drive-Datei." },
                    { title: "Notion", desc: "Liest Seiten und Datenbanken. Erstellt neue Seiten. Aktualisiert Aufgaben-Status. Wenn dein Wiki in Notion lebt, wird Cowork zum Redakteur dieses Wikis." },
                    { title: "Shopify", desc: "Sieht Lager, Produkte, Bestellungen, Kunden. Erstellt Wochenberichte, warnt welches Produkt bald ausläuft, schreibt neue Beschreibungen." },
                    { title: "Facebook Ads", desc: "Live-Metriken (CTR, Ausgaben, ROAS), welche Anzeigen laufen gut, welche man pausieren sollte. Nützlich für Ad-Manager, die Tagesberichte ohne Manager-Login wollen." },
                    { title: "HubSpot", desc: "Vollständiges CRM: Leads, Deals, Kontakte, Pipeline. Cowork kann Status aktualisieren, Deals verschieben, Follow-up-Notizen pro Kontakt schreiben." },
                    { title: "Microsoft 365", desc: "Google-Äquivalent: Outlook, OneDrive, Excel und Word. Wenn dein Unternehmen in Microsoft lebt, ersetzt dieser Connector die 3 Google-Optionen oben." },
                  ].map(({ title, desc }) => (
                    <article key={title} className="rounded-xl border border-[#E6E6E4] bg-white p-4 sm:p-5">
                      <h3 className="text-base font-bold text-[#23211d]">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#5B5851]">{desc}</p>
                    </article>
                  ))}
                </div>
                <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-900">Operativer Fallstrick · Aktivierung pro Chat</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#37352F]">Wichtiger operativer Fallstrick: Jeder neue Chat in einem Projekt startet mit deaktivierten Connectors, auch wenn du sie auf Kontoebene aktiviert hast. Du musst zu Beginn jedes Gesprächs auf das "+" klicken und die gewünschten aktivieren. Das ist ein kleiner Schalter, der beim ersten Mal erschreckt – denn du denkst "das funktioniert nicht", obwohl es nur eine einmalige Aktivierung pro Chat ist.</p>
                </div>
              </div>
            </section>

            {/* 05 Features */}
            <section id="features" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Die 14 Features von Cowork · 12 offizielle + 2 abgeleitete</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">Alles, was Cowork kann · von Projects bis Live Artifacts</h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>Anthropic dokumentiert 12 Features mit Namen in seinen offiziellen Quellen. Die anderen 2 (Computer Use und Live Artifacts) nutzt die Community täglich und Anthropic zeigt sie in Demos, benennt sie aber nicht explizit als Features. Jede Karte unten ist eine Einführung in das Feature.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { num: "Feature 01", color: "bg-emerald-100 text-emerald-800", border: "border-emerald-200 bg-emerald-50/40", title: "Projects", desc: "Der persistente Workspace von Cowork. Jedes Projekt hängt an einem Ordner auf deiner Festplatte, hat seine eigenen Anweisungen, einen eigenen Speicher (getrennt – kreuzt sich nicht mit anderen Projekten), und die Dateien, die du hinzufügst, leben dort. Hier macht der README-Trick Sinn: die README lebt im Ordner, nicht in deinem Kopf.", badge: null },
                    { num: "Feature 02", color: "bg-blue-100 text-blue-800", border: "border-blue-200 bg-blue-50/40", title: "Direct Local File Access", desc: "Cowork liest und schreibt Dateien auf deinem Mac oder Windows direkt. Du musst sie nicht vorher in die Cloud hochladen. Wenn du sagst, er soll eine Excel-Tabelle mit deinen Gmail-Daten erstellen, speichert er sie im Projektordner. Wenn du eine vorhandene Datei bearbeiten willst, öffnet er sie, ändert sie, speichert sie. Das ist das Feature, das Cowork vom Web-Chat trennt.", badge: null },
                    { num: "Feature 03", color: "bg-violet-100 text-violet-800", border: "border-violet-200 bg-violet-50/40", title: "Scheduled Tasks", desc: "Du sagst Cowork, dass er eine Aufgabe zu einer festen Zeit ausführen soll: \"Jeden Montag um 8 Uhr, lies meinen Posteingang und erstelle mir eine Zusammenfassung des Wichtigen\". Anthropic zeigt es mit dem Befehl /schedule. Es gibt 2 Modi: on demand (du startest wann du willst) oder Kadenz (läuft automatisch nach dem Zeitplan). Geplante Aufgaben leben in der Sidebar \"Geplant\".", badge: null },
                    { num: "Feature 04", color: "bg-amber-100 text-amber-800", border: "border-amber-200 bg-amber-50/40", title: "Sub-agent Coordination", desc: "Cowork kann Sub-Agenten parallel starten für Aufgaben, die sich in Teile aufteilen. Zum Beispiel: Um einen Monatsbericht zu erstellen, zieht einer Metriken aus Shopify, einer aus Facebook Ads, einer aus Gmail, und ein vierter fasst alles in einem Dokument zusammen. Du bittest um das Endergebnis; Cowork koordiniert die Sub-Agenten intern.", badge: null },
                    { num: "Feature 05", color: "bg-rose-100 text-rose-800", border: "border-rose-200 bg-rose-50/40", title: "Long-running Tasks", desc: "Mehrstufige Aufgaben, die Minuten oder Stunden dauern. Cowork gibt nicht nach 30 Sekunden auf – er arbeitet weiter, zeigt den Fortschritt, und wenn er fertig ist, sagt er dir Bescheid. Das ist der Anwendungsfall für \"Recherchiere das gründlich und erstelle mir ein 10-seitiges Dossier\" – er macht es, während du etwas anderes tust.", badge: null },
                    { num: "Feature 06", color: "bg-sky-100 text-sky-800", border: "border-sky-200 bg-sky-50/40", title: "Spreadsheets & Presentations", desc: "Cowork bearbeitet Excel mit nativen Formeln (SUMIF, VLOOKUP, Grafiken) und PowerPoint mit strukturierten Folien. Es ist kein PDF-Export – es ist die bearbeitbare .xlsx- oder .pptx-Datei, als ob du sie selbst öffnen würdest. Für Finanzanalysen, Kundenpräsentationen oder Berichte, die in Office leben.", badge: null },
                    { num: "Feature 07", color: "bg-fuchsia-100 text-fuchsia-800", border: "border-fuchsia-200 bg-fuchsia-50/40", title: "Code Execution Isolation", desc: "Cowork kann Code (hauptsächlich Python) in einer isolierten lokalen VM ausführen. Es berührt nicht direkt dein System, installiert keine Pakete auf deinem Mac – alles passiert in einer Sandbox. Nützlich für Datenanalysen, Skripte die Dateien verarbeiten, Grafikerstellung – ohne Risiko, etwas auf deinem Computer kaputt zu machen.", badge: null },
                    { num: "Feature 08", color: "bg-emerald-100 text-emerald-800", border: "border-emerald-200 bg-emerald-50/40", title: "Permission Modes · Ask vs. Act", desc: "Cowork hat 2 Betriebsmodi. Ask: er fragt dich bevor er irgendeine Aktion ausführt (E-Mail senden, Datei ändern, etwas in Notion verschieben). Act: er macht es selbst und informiert dich danach. Für Anfänger ist Ask empfehlenswert. Wenn du Vertrauen aufgebaut hast, wechselst du zu Act und sparst dir die Rückfragen.", badge: null },
                    { num: "Feature 09", color: "bg-blue-100 text-blue-800", border: "border-blue-200 bg-blue-50/40", title: "Global + Folder Instructions", desc: "2 Ebenen von Custom Instructions. Global gilt für dein gesamtes Konto (wer du bist, wie du behandelt werden willst). Folder gilt nur für ein bestimmtes Projekt (welche Kunden du in diesem Ordner betreust, welche Regeln nur hier gelten). Die README des Tricks lebt in Folder – aber du kannst beide Ebenen zusammen nutzen.", badge: null },
                    { num: "Feature 10", color: "bg-violet-100 text-violet-800", border: "border-violet-200 bg-violet-50/40", title: "Plugins", desc: "Pakete, die Skills + Connectors + Sub-agents in einem installierbaren Bundle kombinieren. Statt 5 einzelne Skills zu installieren, installierst du ein Plugin, das sie alle schon mitbringt. Claude Small Business ist ein offizielles Plugin: Ein Toggle aktiviert 15 Fähigkeiten + 7 Connectors auf einmal.", badge: null },
                    { num: "Feature 11", color: "bg-amber-100 text-amber-800", border: "border-amber-200 bg-amber-50/40", title: "Skills", desc: "Wiederverwendbare Anweisungen, die Cowork pro Projekt lädt. Eine Skill ist eine Markdown-Datei mit Frontmatter + Schritten + Fallstricken, die Claude beibringt, eine Aufgabe richtig zu erledigen (z.B. \"schreib einen B2B-Newsletter\", \"erstelle eine Rechnung nach diesem Format\"). Sie werden global oder pro Projekt installiert – das Scoping ist wichtig, weil irrelevante Skills trotzdem Token verbrauchen.", badge: null },
                    { num: "Feature 12", color: "bg-rose-100 text-rose-800", border: "border-rose-200 bg-rose-50/40", title: "Mobile Access", desc: "Wenn du Pro oder Max hast, kannst du über die Handy-App Aufgaben starten, die Cowork auf deinem Desktop ausführt. Es läuft nicht auf dem Handy – das ist nur die Fernbedienung. Nützlich wenn du unterwegs bist und eine Idee hast: du startest die Aufgabe, kommst nach Hause, sie ist schon erledigt. Voraussetzung: dein Computer ist wach und die App ist offen.", badge: null },
                    { num: "Feature 13", color: "bg-sky-100 text-sky-800", border: "border-sky-200 bg-sky-50/40", title: "Computer Use", desc: "Cowork kann Maus und Tastatur steuern für Apps ohne API. Zum Beispiel: wenn eine alte App, die du nutzt, keine OAuth-Verbindung hat, öffnet Cowork sie, klickt wo nötig, kopiert Daten, fügt sie ein. Die Community nutzt es, um Workflows zu automatisieren, die sonst manuell bleiben würden.", badge: "Abgeleitet" },
                    { num: "Feature 14", color: "bg-fuchsia-100 text-fuchsia-800", border: "border-fuchsia-200 bg-fuchsia-50/40", title: "Live Artifacts", desc: "Panels, die sich mit Daten aus deinen Connectors in Echtzeit aktualisieren. Zum Beispiel: ein Dashboard, das Shopify + Facebook Ads + Gmail-Metriken anzeigt und sich stündlich aktualisiert. Anthropic nennt es nicht offiziell als Feature, aber die Community nutzt es täglich für operative Dashboards ohne ein BI-Tool anzufassen.", badge: "Abgeleitet" },
                  ].map(({ num, color, border, title, desc, badge }) => (
                    <article key={num} className={`rounded-xl border p-5 ${border}`}>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-[0.14em] ${color}`}>{num}</span>
                        {badge && <span className="inline-flex items-center rounded-full bg-[#37352F] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">{badge}</span>}
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-[#23211d]">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#5B5851]">{desc}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* 06 Combos */}
            <section id="combos" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Schritt 3 · anwenden · 6 echte Copy-Paste-Combos</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">Welcher Stack für welche Arbeit · jeder Combo mit fertigem Prompt</h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>Hier sind 6 echte Stacks, die Leute in Cowork aufbauen. Jeder Combo hat eine fertige PromptCard: du ersetzt die eckigen Klammern mit deinem echten Fall, fügst es als erste Nachricht des Projekts ein, und Cowork startet mit dieser Logik. Wenn es zu kurz greift, passt du den Prompt an und sagst, er soll die Projektanweisungen aktualisieren.</p>
                <div className="space-y-5">
                  {[
                    { combo: "Combo 01", stack: "Stack · Gmail + Calendar + HubSpot", title: "Vertriebsassistent", promptTitle: "01 · Vertriebsassistent mit Posteingang-Triage + Kalender", promptDesc: "Cowork liest deinen Posteingang, priorisiert nach Dringlichkeit, plant Demos in freie Kalender-Slots und aktualisiert den Deal in HubSpot. Verbinde die 3 Connectors bevor du diesen Prompt einfügst.", code: PROMPT_SALES },
                    { combo: "Combo 02", stack: "Stack · Notion + Drive", title: "Newsletter-Editor", promptTitle: "02 · Newsletter-Editor mit Entwürfen in Notion + Drive", promptDesc: "Cowork liest deine Entwurfsdatenbank in Notion, schlägt redaktionelle Änderungen vor und exportiert fertige Versionen als Markdown nach Drive – bereit zum Einfügen in Substack/Beehiiv/Ghost.", code: PROMPT_NEWSLETTER },
                    { combo: "Combo 03", stack: "Stack · Shopify + Drive", title: "Shopify-Analyst", promptTitle: "03 · Wochenbericht Shopify mit Lagerbestand-Warnungen", promptDesc: "Cowork liest Shopify jede Woche, erstellt einen Verkaufsbericht, warnt dich welches Produkt bald ausläuft und speichert die Datei in Drive für dein Team.", code: PROMPT_SHOPIFY },
                    { combo: "Combo 04", stack: "Stack · Facebook Ads + Drive", title: "Marketing-Manager · Facebook Ads", promptTitle: "04 · Marketing-Manager mit täglichen Facebook-Ads-Metriken", promptDesc: "Cowork liest deine Facebook-Ads-Kampagnen jeden Morgen, flaggt Anzeigen die nicht laufen und speichert historische Metriken in Drive.", code: PROMPT_ADS },
                    { combo: "Combo 05", stack: "Stack · Gmail + Calendar + Drive", title: "Persönlicher Assistent", promptTitle: "05 · Persönlicher Assistent mit täglicher Aufgaben-Zusammenfassung", promptDesc: "Der universellste Combo: Cowork sagt dir, was du heute zu tun hast – basierend auf Posteingang, Kalender und deinen To-dos in Drive. Fang damit an, bevor du komplexere ausprobierst.", code: PROMPT_PERSONAL },
                    { combo: "Combo 06", stack: "Stack · Drive + Notion + Web Fetch", title: "Researcher", promptTitle: "06 · Researcher mit Wissensdatenbank in Notion", promptDesc: "Cowork recherchiert Themen, fasst Papers oder lange Artikel zusammen und archiviert sie in einer Notion-Datenbank, in der du später nach Thema oder Autor suchen kannst.", code: PROMPT_RESEARCHER },
                  ].map(({ combo, stack, title, promptTitle, promptDesc, code }) => (
                    <article key={combo} className="rounded-xl border border-[#E6E6E4] bg-white p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-violet-100 px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-violet-800">{combo}</span>
                        <span className="text-xs font-semibold text-violet-700">{stack}</span>
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-[#23211d]">{title}</h3>
                      <div className="mt-4">
                        <PromptBlock title={promptTitle} desc={promptDesc} code={code} />
                      </div>
                    </article>
                  ))}
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900">Dein Fall ist nicht dabei?</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#37352F]">Wenn dein Anwendungsfall nicht dabei ist, schreib es uns – die nächsten Combos bauen wir basierend auf dem, was ihr anfrägt. Die Tutorials-Community von <strong>@kidealist</strong> wächst genau so.</p>
                </div>
              </div>
            </section>

            {/* 07 Wann zu Code */}
            <section id="upgrade" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Schritt 4 · wann du zu Code wechselst</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">Die 3 Signale · weder zu früh noch zu spät</h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>Cowork sind die Stützräder. Code ist das Rennrad. Beide haben ihren Platz, aber wenn du noch nie gefahren bist, retten dich die Stützräder vor dem Sturz. Hier sind 3 Signale, die dir sagen, wann der richtige Zeitpunkt ist zu Code zu wechseln – nicht früher, denn wenn du Cowork nicht kennst, brennt dir Code in 3 Tagen dein Kontingent durch.</p>
                <ol className="space-y-3">
                  {[
                    { num: "Signal 01", color: "text-rose-700", title: "Du willst etwas, das 24/7 auf einem Server läuft · nicht auf deinem Desktop", desc: "Cowork braucht deinen eingeschalteten Computer mit geöffneter App, um Scheduled Tasks auszuführen. Wenn du willst, dass ein Agent deinen Shopify-Shop das ganze Wochenende betreut, während du im Urlaub bist, oder Leads um 3 Uhr morgens beantwortet, ist das Claude Code auf einem VPS. Cowork schafft das nicht – weder mit Pro noch mit Max." },
                    { num: "Signal 02", color: "text-rose-700", title: "Du willst eigenen Code schreiben · benutzerdefinierte Agenten mit eigenen Sub-Agents bauen", desc: "Wenn du Lust hast, ein Python-Skript zu schreiben, das 10.000 Dateien verarbeitet, oder einen Agenten zu bauen, der 5 verschiedene APIs mit benutzerdefinierter Logik nutzt, gibt dir Code das. Cowork kann Code in einer isolierten Sandbox ausführen, aber wenn der Code als Teil deines echten Workflows leben soll (nicht als einmalige Aufgabe), wechselst du zu Code." },
                    { num: "Signal 03", color: "text-rose-700", title: "Cowork ist zu klein · der Workflow passt nicht mehr in ein Projekt", desc: "Wenn du feststellst, dass du 8 Cowork-Projekte für verschiedene Teile derselben Sache erstellst, oder wenn mehrere Agenten miteinander kommunizieren sollen ohne durch dich zu gehen, stößt Cowork an seine Grenzen. Code gibt dir vollständige Kontrolle darüber, wie die Teile orchestriert werden. Aber komm erst zu diesem Punkt, nachdem du Cowork ausgereizt hast – die meisten tun das nie." },
                  ].map(({ num, color, title, desc }) => (
                    <li key={num} className="rounded-lg border border-[#E6E6E4] bg-white p-4 sm:p-5">
                      <p className={`font-mono text-xs font-semibold tracking-[0.14em] ${color}`}>{num}</p>
                      <h3 className="mt-1 text-sm font-semibold text-[#23211d] sm:text-base">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#5B5851]">{desc}</p>
                    </li>
                  ))}
                </ol>
                <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-900">Ehrlicher Hinweis · Framing vs. offizieller Stand</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#37352F]">Das Stützräder-Framing ist eine Metapher für den Einstieg. Offiziell sagt Anthropic, dass Cowork der vereinfachte Nachfahre von Code ist – also nach Code entstanden, nicht davor. Aber das praktische Ergebnis ist dasselbe: wenn du nicht programmierst, fang mit Cowork an; wenn du programmierst und mehr Kontrolle willst, gibt dir Code die Hebel. Die Metapher funktioniert auch wenn die Reihenfolge technisch umgekehrt ist.</p>
                </div>
              </div>
            </section>

            {/* 08 Fallstricke */}
            <section id="fallstricke" className="scroll-mt-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">6 ehrliche Fallstricke · wörtliche Anthropic-Zitate</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">Was dir niemand sagt · damit dich nichts überrascht</h2>
              <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
                <p>6 ehrliche Fallstricke mit wörtlichen Zitaten aus den offiziellen Anthropic-Dokumenten. In dieser Reihenfolge, weil es die sind, die dir in den ersten 2 Wochen am häufigsten begegnen.</p>
                <div className="space-y-3">
                  {[
                    {
                      num: "01", title: "Cowork verbraucht MEHR Kontingent als normaler Chat",
                      quote: "Working on tasks with Cowork consumes more of your usage allocation than chatting with Claude.",
                      desc: "Wörtlich aus dem Support-Artikel. Agentische Aufgaben verbrauchen mehr Token als eine Frage im Chat, weil Cowork Sub-Agenten startet, Dateien liest und Connector-APIs aufruft. Wenn dein Pro-Kontingent für einen Monat Chat gereicht hat, hält es in Cowork wahrscheinlich 2–3 Wochen. Behalte den Wochenzähler in der Sidebar im Blick."
                    },
                    {
                      num: "02", title: "Wenn du den Computer ausschaltest oder die App schließt · werden Aufgaben unterbrochen",
                      quote: "Tasks only run while your computer is awake and the Claude Desktop app is open.",
                      desc: "Wörtlich aus dem Support-Artikel. Cowork ist nicht cloud-nativ – es läuft auf deiner Maschine. Wenn du eine Scheduled Task für 8 Uhr geplant hast, aber um 7:55 Uhr den Laptop zugeklappt hast, wird sie nicht ausgeführt. Die Aufgabe bleibt im Pending-Status und wird beim nächsten verfügbaren Zeitfenster versucht. Für kritische Aufgaben, die nicht scheitern dürfen, ziehe in Betracht, den Workflow zu Claude Code auf einem VPS zu upgraden."
                    },
                    {
                      num: "03", title: "Keine Compliance-API · erscheint nicht in Audits",
                      quote: "Cowork activity is not captured in the Compliance API at this time.",
                      desc: "Wörtlich aus dem Support-Artikel. Wenn du in einer regulierten Branche arbeitest (Recht, Gesundheit, Finanzen) und dein Unternehmen alles, was mit KI passiert, auditieren muss, taugt Cowork heute nicht – die Aktivität wird nicht in der Compliance-API erfasst, die Chat schon aufzeichnet. Warte bis Anthropic Support veröffentlicht, oder nutze Code mit eigenem Logging."
                    },
                    {
                      num: "04", title: "Speicher ist pro Projekt getrennt · KEIN projektübergreifender Austausch",
                      quote: null,
                      desc: "Jedes Projekt erinnert sich an seinen Kontext. Aber wenn du 3 parallele Projekte hast (eines für Vertrieb, eines für Marketing, eines persönlich), kreuzt Cowork die Infos NICHT automatisch. Wenn du einen gemeinsamen Datenpunkt willst (z.B. deine Bio), trägst du ihn in die README jedes Projekts ein oder lädst ihn in die globalen Anweisungen auf Kontoebene."
                    },
                    {
                      num: "05", title: "Sitzungen sind NICHT teilbar",
                      quote: null,
                      desc: "Anders als ein öffentlicher Chat, dem du jemandem einen Link schicken kannst: Cowork-Sitzungen lassen sich nicht über eine URL teilen. Wenn du jemandem zeigen willst, was du gebaut hast, musst du den Output exportieren (Datei, Screenshot usw.) – die Sitzung bleibt nur in deinem Konto."
                    },
                    {
                      num: "06", title: "Free-Plan hat kein Cowork · du brauchst mindestens Pro",
                      quote: null,
                      desc: "In der Sidebar der Free-App siehst du nur Chat. Cowork ist ab Pro (20 $/Monat) aufwärts verfügbar (Max, Team, Enterprise). Wenn du die App heruntergeladen hast und Cowork nicht erscheint, ist das der Grund – kein Bug, sondern Plan."
                    },
                  ].map(({ num, title, quote, desc }) => (
                    <article key={num} className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
                      <p className="font-mono text-xs font-semibold tracking-[0.14em] text-amber-700">{num}</p>
                      <h3 className="mt-1 text-base font-bold text-[#23211d]">{title}</h3>
                      {quote && (
                        <blockquote className="mt-2 rounded-lg border border-amber-300/60 bg-white/70 p-3 text-sm italic leading-6 text-[#37352F]">
                          {quote}
                        </blockquote>
                      )}
                      <p className="mt-2 text-sm leading-6 text-[#5B5851]">{desc}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

          </div>

          {/* Footer */}
          <div className="mt-14 space-y-6 border-t border-[#EBEBEA] pt-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">Community-Anleitung</p>
              <p className="text-sm leading-relaxed text-[#5f5b53]">
                Diese Anleitung destilliert das komplette Handbuch für Claude Cowork – die 4 Schritte (App herunterladen, Projekt + README, Connectors, wann zu Code wechseln) plus die 14 Features, 6 Copy-Paste-Combos und 6 wörtliche Fallstricke. Sie ist Teil des Tutorial-Bereichs von{" "}
                <a className="inline-flex items-center gap-1 font-semibold text-[#23211d] underline decoration-[#B4B2AB] underline-offset-4" href="/tutorials">@kidealist</a>,
                {" "}einer freien Sammlung von Ressourcen für alle, die Claude täglich nutzen.
              </p>
            </div>
            <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5 sm:p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8B8B85]">Persönliches Fazit</p>
              <p className="text-sm leading-relaxed text-[#37352F] sm:text-[15px] sm:leading-7">Wenn du für Claude zahlst und ihn immer noch als Chatbot nutzt, verpasst du 80 % von dem, was das Tool kann. Cowork ist der Ort, wo Claude zu jemandem wird, der wirklich neben dir arbeitet – er öffnet dein Gmail, liest deinen Kalender, plant Aufgaben für 8 Uhr morgens während du schläfst. Die erste Woche ist komisch, die zweite kannst du nicht mehr ohne. Überwind die Hemmschwelle, lade die App herunter, leg ein Projekt an, leg eine README rein und fang mit einem der 6 Combos an. In 2 Wochen wirst du verstehen, warum alle, die diesen Schritt gemacht haben, nicht zurückgehen.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { href: "https://claude.com/downloads", title: "Desktop-App herunterladen · claude.com/downloads", desc: "Offizielle Download-Seite. Erkennt dein Betriebssystem (Mac oder Windows) und gibt dir den richtigen Installer. Kostenlos herunterladen, aber Cowork aktiviert sich nur mit einem bezahlten Plan." },
                { href: "https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork", title: "Get started with Claude Cowork · offizieller Support", desc: "Artikel aus dem Anthropic Help Center mit der offiziellen Einführung in Cowork. Enthält die wörtlichen Zitate der Fallstricke, die ich in dieser Anleitung verwende." },
                { href: "https://www.anthropic.com/product/claude-cowork", title: "Produktseite · anthropic.com/product/claude-cowork", desc: "Das offizielle Positioning von Cowork durch Anthropic, mit dem Satz \"non-technical teams started bypassing Claude's chat interface for Claude Code. Claude Cowork is the result.\"" },
                { href: "https://anthropic.skilljar.com/introduction-to-claude-cowork", title: "Introduction to Claude Cowork · kostenloser Skilljar-Kurs", desc: "Offizieller Anthropic-Kurs auf Skilljar. Deckt Meet Cowork → Make Cowork yours → Use Claude wherever → Sharing & safety ab. Die tiefgehende Ergänzung zu dieser Anleitung." },
              ].map(({ href, title, desc }) => (
                <a key={href} target="_blank" rel="noreferrer" className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 transition-colors hover:bg-[#F1F1EE]" href={href}>
                  <p className="text-sm font-semibold text-[#37352F]">{title}</p>
                  <p className="mt-2 text-xs leading-5 text-[#5B5851]">{desc}</p>
                </a>
              ))}
            </div>
            <div className="space-y-2 rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 sm:p-5">
              <p className="text-sm font-semibold text-[#37352F]">Wo anfangen, wenn du gerade neu hier bist</p>
              <p className="text-sm leading-relaxed text-[#5B5851]">(1) Lade die Desktop-App von claude.com/downloads herunter – Mac oder Windows, kostenlos herunterladen, braucht bezahlten Plan für Cowork. (2) Öffne die App, geh zu Cowork (NICHT zu Code), erstelle dein erstes Projekt mit einem neuen Ordner. (3) Füge die README ein, die in Abschnitt 2 steht – ersetze die eckigen Klammern mit deinen echten Daten und bitte Claude, sie zu lesen. (4) Geh zu Einstellungen → Connectors und aktiviere 2 Dinge, die du täglich nutzt – fang mit Gmail + Calendar an. (5) Probiere Combo 05 (Persönlicher Assistent) – er ist der universellste. In einer Woche wirst du den Unterschied spüren.</p>
            </div>
            <div className="space-y-2 rounded-xl border border-amber-200 bg-amber-50/40 p-4 sm:p-5">
              <p className="text-sm font-semibold text-[#37352F]">Für wen diese Seite nicht gilt</p>
              <p className="text-sm leading-relaxed text-[#5B5851]">Nutzer mit dem Free-Plan (Cowork gibt es nur ab Pro / Max / Team / Enterprise). Regulierte Branchen, die heute eine Compliance-API brauchen (Cowork erfasst keine Compliance – warte auf das Update oder nutze Code mit eigenem Logging). Nutzer, die nur einen Chatbot für lose Fragen ohne Dateizugriff oder Connectors brauchen (dafür reicht Chat, kein Grund mit Cowork zu verkomplizieren). Und wenn du fast ausschließlich vom Handy arbeitest, taugt Cowork nicht – es lebt auf dem Desktop, Mobile ist nur der Auslöser.</p>
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
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${activeTab === tab.id ? "bg-[#EBEBEA] font-semibold text-[#1f1e1a]" : "text-[#66635D] hover:bg-[#F0F0ED]"}`}
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
