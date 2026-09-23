"use client";

import React, { useState } from 'react';

const TutorialPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { id: 'section-1', label: 'Was sind Skills?' },
    { id: 'section-2', label: 'Marketing' },
    { id: 'section-3', label: 'Social Media' },
    { id: 'section-4', label: 'Design' },
    { id: 'section-5', label: 'Fazit' },
  ];

  const scrollToSection = (id: string, index: number) => {
    setActiveSection(index);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#37352F]">
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-5xl px-4 pb-28 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:py-12">

          {/* Breadcrumb */}
          <div className="mb-8 hidden items-center gap-2 text-sm text-[#8B8B85] sm:flex">
            <a className="transition-colors hover:text-[#37352F]" href="/tutorials">tutorials</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
            <span className="font-medium text-[#37352F]">claude-fuenf-abteilungen-skills</span>
          </div>

          {/* Header */}
          <header className="mb-8 sm:mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-[#23211d] sm:text-5xl">Claude: Fünf Abteilungen, ein Setup</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#5B5851] sm:text-lg sm:leading-8">50 Marketing-Skills, 17 Social-Media-Skills, UI/UX, Finanzen und Legal. Einmal installiert, fertig. Mauricio von BauMitMau zeigt dir wie.</p>
          </header>

          {/* Tab Navigation */}
          <nav className="mb-8 flex gap-2 overflow-x-auto pb-2 sm:mb-10 sm:grid sm:grid-cols-5">
            {sections.map((section, index) => (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id, index)}
                className={`min-w-[145px] rounded-md px-3 py-2 text-left text-sm sm:min-w-0 ${
                  activeSection === index
                    ? 'bg-[#EBEBEA] font-semibold text-[#1f1e1a]'
                    : 'text-[#66635D] hover:bg-[#EFEFED]'
                }`}
              >
                <span className="mr-2 font-mono text-xs text-[#8B8B85]">0{index + 1}</span>
                {section.label}
              </button>
            ))}
          </nav>

          {/* SECTION 1 */}
          <section id="section-1" className="scroll-mt-24 mb-14">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">01 Was sind Skills?</p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">Kurz erklärt: was ein Skill ist</h2>
            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
                <p className="font-semibold text-amber-900">📄 Ein Skill ist eine gespeicherte Anweisung</p>
                <p className="mt-2 text-amber-900">Du schreibst Claude einmal, wie er etwas machen soll. Das bleibt. Jede neue Unterhaltung, gleicher Output, ohne nochmal erklären.</p>
              </div>
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                <p className="text-sm font-semibold text-[#8B8B85]">💡 Was du damit löst</p>
                <p className="mt-1 text-[#4D4A44]">Du erklärst Claude heute wie du deine Verkaufs-Mails schreibst. Morgen öffnest du eine neue Session und es klingt wieder anders. Mit einem Skill passiert das nicht mehr.</p>
              </div>
              <p>Die Skills kommen nicht als einzelne Dateien. Sie kommen als Pakete, ganze Abteilungen auf einmal. Du installierst ein Paket mit einem Befehl und bekommst dutzende Skills in einem Rutsch.</p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg border border-[#E6E6E4] bg-[#FCFCFB] p-3">
                  <p className="text-2xl font-bold text-[#23211d]">50</p>
                  <p className="text-xs text-[#8B8B85]">Marketing-Skills</p>
                </div>
                <div className="rounded-lg border border-[#E6E6E4] bg-[#FCFCFB] p-3">
                  <p className="text-2xl font-bold text-[#23211d]">17</p>
                  <p className="text-xs text-[#8B8B85]">Social-Media-Skills</p>
                </div>
                <div className="rounded-lg border border-[#E6E6E4] bg-[#FCFCFB] p-3">
                  <p className="text-2xl font-bold text-[#23211d]">5</p>
                  <p className="text-xs text-[#8B8B85]">Abteilungen gesamt</p>
                </div>
              </div>
              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                <p className="text-sm font-semibold text-[#8B8B85]">🛠️ Was du brauchst</p>
                <p className="mt-1 text-[#4D4A44]">Claude Code installiert und offen. Einen Ordner zum Arbeiten, z.B. <span className="font-mono text-sm bg-[#F0F0EE] px-1 rounded">mein-betrieb</span>. Mehr nicht. Kein Programmieren, keine extra Accounts.</p>
              </div>
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="section-2" className="scroll-mt-24 mb-14">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">02 Marketing</p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">50 Marketing-Skills in einem Paket</h2>
            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <p>Mit diesem Paket fängst du an, weil es entscheidet was du sagst. 50 Skills von Corey Haines: von der Anzeigenidee bis zur Mail an den Kunden der nicht zurückgekommen ist.</p>

              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                <p className="text-sm font-semibold text-[#8B8B85]">📦 Marketing Skills von Corey Haines</p>
                <ul className="mt-2 space-y-1 text-sm text-[#5B5851]">
                  <li><strong>Skills:</strong> 50, geprüft im Repo am 24. August 2026</li>
                  <li><strong>Lizenz:</strong> MIT, lesen, kopieren, ändern ohne Erlaubnis</li>
                  <li><strong>Voraussetzung:</strong> Keine. Das einzige Paket ohne Vorbedingung</li>
                  <li><strong>Repo:</strong> coreyhaines31/marketingskills</li>
                </ul>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
                <p className="font-semibold text-amber-900">⚠️ Zuerst: product-marketing laufen lassen</p>
                <p className="mt-2 text-amber-900">Das ist der Skill der speichert worum es bei deinem Produkt geht, wen du ansprichst und was dich unterscheidet. Die anderen 49 lesen das zuerst. Wenn der leer ist, klingt alles generisch.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                  <p className="font-semibold text-[#23211d] text-sm">✍️ Texte die verkaufen</p>
                  <p className="mt-1 text-xs text-[#5B5851]">copywriting, copy-editing, cold-email, emails, offers, pricing, sms, social</p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                  <p className="font-semibold text-[#23211d] text-sm">🔍 Gefunden werden</p>
                  <p className="mt-1 text-xs text-[#5B5851]">seo-audit, ai-seo, programmatic-seo, site-architecture, schema, directory-submissions, aso</p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                  <p className="font-semibold text-[#23211d] text-sm">📢 Werbung</p>
                  <p className="mt-1 text-xs text-[#5B5851]">ads, ad-creative, ab-testing, attribution, analytics, marketing-loops, image, video</p>
                </div>
                <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4">
                  <p className="font-semibold text-[#23211d] text-sm">🔄 Konvertierung & Bindung</p>
                  <p className="mt-1 text-xs text-[#5B5851]">cro, signup, onboarding, popups, paywalls, churn-prevention, referrals, lead-magnets, customer-research</p>
                </div>
              </div>

              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                <h3 className="text-lg font-semibold text-[#2f2d27]">Installation: zwei Befehle</h3>
                <p className="mt-1 text-sm text-[#5f5b53]">Erst den Marketplace hinzufügen, dann installieren.</p>
                <div className="mt-3 space-y-3">
                  <div>
                    <p className="text-xs text-[#8B8B85] mb-1">1. Marketplace hinzufügen</p>
                    <div className="rounded-lg bg-[#171717] p-3">
                      <pre className="whitespace-pre-wrap text-xs leading-6 text-zinc-100">/plugin marketplace add coreyhaines31/marketingskills</pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#8B8B85] mb-1">2. Die 50 Skills installieren</p>
                    <div className="rounded-lg bg-[#171717] p-3">
                      <pre className="whitespace-pre-wrap text-xs leading-6 text-zinc-100">/plugin install marketing-skills</pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                <p className="text-sm font-semibold text-[#8B8B85]">🤔 Achtung: häufigster Fehler</p>
                <p className="mt-1 text-[#4D4A44]">Dieses Paket hat eine zweite Installationsart, die die Dateien in einen Ordner kopiert den Claude Code nicht liest. Details dazu weiter unten im Abschnitt zu typischen Fehlern.</p>
              </div>
            </div>
          </section>

          {/* SECTION 3 */}
          <section id="section-3" className="scroll-mt-24 mb-14">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">03 Social Media</p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">17 Skills für den Auftritt</h2>
            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <p>Du weißt was du sagst. Dieses Paket regelt wie es rausgeht: Reels-Skripte, Titelbilder, Hooks, der angepinnte Kommentar, der Wochenkalender. 17 Skills von Charlie Hills, genau 17.</p>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
                <p className="font-semibold text-amber-900">⚠️ Pflicht-Schritt vor allem anderen: voice-builder</p>
                <p className="mt-2 text-amber-900">voice-builder interviewt dich und speichert zwei Dateien: wer du bist und wie du klingst. Die anderen 16 Skills lesen diese Dateien bevor sie irgendetwas schreiben. Ohne das funktioniert das Paket technisch, aber es klingt nach niemandem.</p>
              </div>

              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                <p className="text-sm font-semibold text-[#8B8B85]">📦 Social Media Skills von Charlie Hills</p>
                <ul className="mt-2 space-y-1 text-sm text-[#5B5851]">
                  <li><strong>Skills:</strong> 17 genau</li>
                  <li><strong>Lizenz:</strong> MIT</li>
                  <li><strong>Voraussetzung:</strong> voice-builder zuerst laufen lassen</li>
                  <li><strong>API-Keys:</strong> Zwei, aber nur für 3 Skills. Die anderen 14 brauchen nichts</li>
                  <li><strong>Repo:</strong> charlie947/social-media-skills</li>
                </ul>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { name: 'voice-builder', desc: 'Deine Stimme definieren. Zuerst.' },
                  { name: 'post-writer', desc: 'Den Post schreiben.' },
                  { name: 'hook-generator', desc: 'Die ersten Zeilen, die entscheiden ob man weiterliest.' },
                  { name: 'reels-scripting', desc: 'Reel-Skript mit Video als Referenz.' },
                  { name: 'post-formatter', desc: 'Form geben damit es im Feed lesbar ist.' },
                  { name: 'post-scorer', desc: 'Bewertung vor dem Veröffentlichen.' },
                  { name: 'content-matrix', desc: 'Kalender und Themen-Mix.' },
                  { name: 'niche-research', desc: 'Was die Nische gerade bespricht.' },
                  { name: 'profile-optimizer', desc: 'Bio und Profilbild verbessern.' },
                  { name: 'newsletter-voice', desc: 'Die Variante für E-Mail.' },
                  { name: 'pinned-comment', desc: 'Der angepinnte Kommentar den kaum jemand bearbeitet.' },
                  { name: 'analytics-dashboard', desc: 'Was funktioniert hat und was nicht.' },
                ].map((skill) => (
                  <div key={skill.name} className="rounded-lg border border-[#E6E6E4] bg-[#FCFCFB] px-3 py-2">
                    <p className="font-mono text-xs font-semibold text-[#23211d]">{skill.name}</p>
                    <p className="text-xs text-[#5B5851] mt-0.5">{skill.desc}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                <h3 className="text-lg font-semibold text-[#2f2d27]">Installation</h3>
                <div className="mt-3 space-y-3">
                  <div>
                    <p className="text-xs text-[#8B8B85] mb-1">1. Marketplace hinzufügen</p>
                    <div className="rounded-lg bg-[#171717] p-3">
                      <pre className="whitespace-pre-wrap text-xs leading-6 text-zinc-100">/plugin marketplace add charlie947/social-media-skills</pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#8B8B85] mb-1">2. Die 17 Skills installieren</p>
                    <div className="rounded-lg bg-[#171717] p-3">
                      <pre className="whitespace-pre-wrap text-xs leading-6 text-zinc-100">/plugin install social-media-skills</pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
                <h3 className="text-lg font-semibold text-[#2f2d27]">Erster Befehl nach der Installation</h3>
                <div className="mt-3 rounded-lg bg-[#171717] p-3">
                  <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100">{`> Führe voice-builder aus. Ich möchte meine Stimme definieren bevor ich die anderen Skills benutze.

Mein Betrieb ist: _______
An wen ich mich wende: _______
Wie ich klingen will: _______`}</pre>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section id="section-4" className="scroll-mt-24 mb-14">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">04 Design</p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">Zwei Pakete die zusammen erst Sinn ergeben</h2>
            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">
              <p>Du weißt was du sagst und wo du es veröffentlichst. Jetzt soll es nicht schlecht aussehen. Hier kommen zwei Pakete: eines gibt Claude Können, das andere gibt ihm Geschmack.</p>

              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                <p className="text-sm font-semibold text-[#8B8B85]">🎨 Warum beide zusammen</p>
                <p className="mt-1 text-[#4D4A44]">Mit Können allein liefert Claude etwas Korrektes und Vergessliches. Geschmack ist das was einen Bildschirm entschieden wirken lässt statt nach Default-Einstellungen.</p>
              </div>

              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#171717] text-sm font-bold text-white">1</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#23211d]">UI/UX Pro Max — das Können</p>
                    <p className="mt-1 text-sm text-[#5B5851]">Riesiger Katalog mit Stilen, Paletten und Typografie-Paaren plus ein Suchwerkzeug. Barrierefreiheit, Diagrammtypen, Vorlagen nach Technologie. 7 Skills insgesamt. Claude erfindet keine Palette mehr aus dem Bauch heraus.</p>
                    <div className="mt-3 space-y-2">
                      <p className="text-xs text-[#8B8B85]">Marketplace hinzufügen:</p>
                      <div className="rounded-lg bg-[#171717] p-3">
                        <pre className="whitespace-pre-wrap text-xs leading-6 text-zinc-100">/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill</pre>
                      </div>
                      <p className="text-xs text-[#8B8B85]">Installieren (Achtung: mit @ und Marketplace-Name dahinter):</p>
                      <div className="rounded-lg bg-[#171717] p-3">
                        <pre className="whitespace-pre-wrap text-xs leading-6 text-zinc-100">/plugin install ui-ux-pro-max@ui-ux-pro-max-skill</pre>
                      </div>
                      <p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">Das ist das einzige der fünf Pakete das den Namen mit @ und Marketplace dahinter braucht. Ohne @ findet es Claude Code nicht.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#171717] text-sm font-bold text-white">2</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#23211d]">Taste — der Geschmack</p>
                    <p className="mt-1 text-sm text-[#5B5851]">13 Skills die Claude beibringen zu entscheiden: was rausnehmen, was Luft lassen, wann ein Design fertig ist. Varianten mit eigenem Charakter: minimalistisch, brutalistisch-industriell, hochwertiger Look. Bestehende Sachen neu gestalten und Bilder in Code umwandeln ist auch dabei. Die Hauptvariante hat drei Regler von eins bis zehn für Variation, Bewegung und visuelle Dichte.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
                <p className="font-semibold text-blue-900">📋 Reihenfolge</p>
                <ol className="mt-3 space-y-2 text-sm text-blue-800">
                  <li><strong>1.</strong> UI/UX Pro Max installieren (Marketplace + Install mit @)</li>
                  <li><strong>2.</strong> Taste installieren (Marketplace + Install)</li>
                  <li><strong>3.</strong> Beide zusammen nutzen, Claude kombiniert sie selbst</li>
                </ol>
              </div>
            </div>
          </section>

          {/* SECTION 5 */}
          <section id="section-5" className="scroll-mt-24 mb-14">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">05 Fazit</p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">Was du jetzt hast</h2>
            <div className="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">

              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#171717] text-sm font-bold text-white">1</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#23211d]">Marketing: 50 Skills</p>
                    <p className="mt-1 text-sm text-[#5B5851]">Von der Anzeige bis zur Rückgewinnungs-Mail. Zuerst product-marketing laufen lassen, dann funktioniert der Rest.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#171717] text-sm font-bold text-white">2</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#23211d]">Social Media: 17 Skills</p>
                    <p className="mt-1 text-sm text-[#5B5851]">voice-builder zuerst, immer. Danach klingt alles nach dir und nicht nach einer generischen KI.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#171717] text-sm font-bold text-white">3</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#23211d]">Design: UI/UX Pro Max + Taste</p>
                    <p className="mt-1 text-sm text-[#5B5851]">Eines gibt Claude Können, das andere Geschmack. Zusammen hört Claude auf, generische Sachen zu liefern.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#171717] text-sm font-bold text-white">4</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#23211d]">Finanzen: 8 Skills von Anthropic</p>
                    <p className="mt-1 text-sm text-[#5B5851]">Finanzberichte, Abstimmungen, Monatsabschluss, Abweichungsanalysen. Offizielles Plugin.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#171717] text-sm font-bold text-white">5</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#23211d]">Legal: 9 Skills plus eine komplette Suite</p>
                    <p className="mt-1 text-sm text-[#5B5851]">Verträge aufsetzen, Klauseln prüfen, NDAs sichten. Immer als Entwurf zur Überprüfung durch einen Anwalt.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
                <p className="text-sm font-semibold text-[#8B8B85]">🎯 Der Schritt den kaum jemand macht</p>
                <p className="mt-1 text-[#4D4A44]">Wenn alle fünf Pakete installiert sind: schreib Claude einen Prompt in dem du sagst wie du arbeitest. Bitte ihn die fünf Sammlungen zu lesen und alles auf dich anzupassen. Ein generischer Skill aus dem Internet spart dir eine halbe Stunde. Einer der auf dich zugeschnitten ist, verändert deinen Alltag.</p>
              </div>

              <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
                <p className="font-semibold text-blue-900">Fragen? Mauricio antwortet auf Instagram.</p>
                <p className="mt-2 text-sm text-blue-800">Schreib mir auf <a href="https://instagram.com/kidealist" target="_blank" rel="noopener noreferrer" className="underline font-semibold">@kidealist</a> wenn du beim Setup nicht weiterkommst oder etwas nicht so läuft wie erwartet.</p>
              </div>

              {/* [Adaptado de @soyenriquerocha con permiso] */}
            </div>
          </section>

        </div>
      </main>

      {/* Fixed bottom nav — mobile only */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E6E6E4] bg-[#F7F7F5]/95 px-3 py-2 backdrop-blur sm:hidden">
        <div className="flex items-center gap-2">
          <a href="/tutorials" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] text-lg shadow-sm">🏠</a>
          <div className="flex w-full items-center gap-1 overflow-x-auto rounded-2xl border border-[#E6E6E4] bg-white p-1 shadow-sm">
            {sections.map((section, index) => (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id, index)}
                className={`shrink-0 rounded-xl px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  activeSection === index
                    ? 'bg-[#EBEBEA] text-[#1f1e1a]'
                    : 'text-[#66635D] hover:bg-[#EFEFED]'
                }`}
              >
                <span className="font-mono text-[10px] text-[#8B8B85]">0{index + 1} </span>
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;