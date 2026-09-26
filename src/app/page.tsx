import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QuizSection from "./diagnose/QuizSection";
import ComparisonTable from "@/components/ComparisonTable";
import ProsConsCards from "@/components/ProsConsCards";
import PhaseScroll from "@/components/PhaseScroll";
import CaseCard from "@/components/CaseCard";
import FeatureSplit from "@/components/FeatureSplit";
import RiskReveal from "@/components/RiskReveal";

export const metadata: Metadata = {
  title: "Kostenlose Diagnose für KMU | Kopfwerk",
  description:
    "30 Minuten, kostenlos: wir prüfen, ob Sie wirklich Technologie brauchen, bevor wir Ihnen etwas verkaufen. Für KMU in Köln und NRW.",
};

const TALLY_URL = "https://tally.so/r/QKZeEp";

function CtaButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={TALLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-kw-gold px-7 py-4 text-sm font-semibold text-kw-dark transition-all duration-200 hover:scale-[1.03] hover:bg-kw-gold-light active:scale-[0.98] sm:text-base ${className}`}
    >
      Kostenlose Diagnose buchen
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </a>
  );
}

const SERVICES = [
  {
    eyebrow: "Automatisierung",
    title: "Zeit zurück,",
    titleAccent: "nicht nur Software.",
    text: "Wir mappen zuerst, was wirklich Zeit kostet. Dann automatisieren wir genau einen Prozess, richtig, in den Tools, die Sie schon nutzen.",
    points: [
      { title: "Kostenlose Diagnose vor jedem Angebot", desc: "Wir sagen ehrlich, ob und was sich lohnt, bevor Sie etwas bezahlen." },
      { title: "Ein Prozess, komplett fertig gebaut", desc: "Kein Werkzeug wird halb fertig abgeliefert, keine zehn Baustellen gleichzeitig." },
      { title: "Läuft in Ihren bestehenden Tools", desc: "Keine Migration, kein neues System, das Ihr Team erst lernen muss." },
      { title: "Ergebnis jeden Monat sichtbar", desc: "Die Kennzahl steht vor dem Bauen fest, nicht danach schöngerechnet." },
    ],
    ctaLabel: "Kostenlosen KI-Check starten",
    ctaHref: "#kostenloser-check",
    imageSrc: "/servicios-automation.jpg",
    videoSrc: "/service-automatisierung.mp4",
    imageAlt: "Beispiel eines Automatisierungs-Workflows",
    imageSide: "right" as const,
  },
  {
    eyebrow: "Website & App",
    title: "Eine Website,",
    titleAccent: "die verkauft.",
    text: "Nicht nur schön. Gebaut um die eine Aktion, die Ihnen wirklich Anfragen bringt, mit Wartung, die dranbleibt.",
    points: [
      { title: "Kostenloser Conversion-Check zuerst", desc: "Wir prüfen, was Ihre Website heute verhindert, bevor wir etwas neu bauen." },
      { title: "Auf die eine Aktion gebaut", desc: "Anrufen, schreiben, kaufen, buchen. Alles auf der Seite dient diesem einen Ziel." },
      { title: "Mobil zuerst gedacht", desc: "Die meisten Ihrer Kunden suchen Sie vom Handy aus, die Seite ist dafür gebaut." },
      { title: "Laufende Wartung inklusive", desc: "Ihre Website bleibt aktuell und schnell, ohne dass Sie sich darum kümmern müssen." },
    ],
    ctaLabel: "Kostenlose Diagnose buchen",
    ctaHref: TALLY_URL,
    imageSrc: "/servicios-app.jpg",
    videoSrc: "/service-website.mp4",
    imageAlt: "Beispiel einer Website, die konvertiert",
    imageSide: "left" as const,
  },
  {
    eyebrow: "KI-Content",
    title: "Content,",
    titleAccent: "der groß wirkt.",
    text: "Sobald Ihr System läuft, verdient es, gesehen zu werden. Foto und Video mit KI produziert, ohne die Kosten einer klassischen Produktion.",
    points: [
      { title: "Nur für bestehende Kunden", desc: "Wird nie kalt verkauft, sondern erst angeboten, wenn Ihr System schon funktioniert." },
      { title: "Ohne Studio, ohne Fotografen", desc: "Fotorealistische Ergebnisse, ohne die Kosten einer klassischen Produktion." },
      { title: "Im Ton Ihrer Marke", desc: "Kein generischer Stockcontent, sondern abgestimmt auf das, was Sie schon aufgebaut haben." },
      { title: "Eine Korrekturrunde inklusive", desc: "Passt es nicht auf Anhieb, wird nachgebessert, ohne von vorn zu beginnen." },
    ],
    ctaLabel: "Kostenlose Diagnose buchen",
    ctaHref: TALLY_URL,
    imageSrc: "/servicios-genai.jpg",
    videoSrc: "/service-content.mp4",
    imageAlt: "Beispiel eines mit KI produzierten Contents",
    imageSide: "right" as const,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-kw-dark text-kw-cream">
      {/* ── Top bar ── */}
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{ background: "linear-gradient(to bottom, rgba(10,8,8,0.55) 0%, rgba(10,8,8,0.22) 60%, transparent 100%)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 lg:px-8">
          <Link href="/" className="flex items-center transition-transform duration-200 hover:scale-[1.03]">
            <Image src="/kopfwerk-logo-dark.svg" alt="Kopfwerk" width={320} height={96} className="h-20 w-auto sm:h-24" priority />
          </Link>
          <a
            href={TALLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-kw-gold px-5 py-2.5 text-xs font-semibold text-kw-dark transition-all duration-200 hover:scale-[1.05] hover:bg-kw-gold-light sm:text-sm"
          >
            Diagnose buchen
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="h-full w-full object-cover">
            <source src="/kopfwerk-hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top, #1D1616 0%, rgba(29,22,22,0.85) 30%, rgba(29,22,22,0.45) 65%, rgba(29,22,22,0.15) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-20 w-full px-6 pb-16 pt-36 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Sie haben schon einmal für Technologie bezahlt, die nichts gebracht hat.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-kw-cream/65 sm:text-xl">
              Deshalb prüfen wir zuerst kostenlos, ob Sie wirklich etwas brauchen, bevor wir Ihnen etwas verkaufen.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <CtaButton />
                <a
                  href="#kostenloser-check"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-kw-cream backdrop-blur-md transition-all duration-200 hover:scale-[1.03] hover:border-white/35 hover:bg-white/[0.08] sm:text-base"
                >
                  Oder erst den KI-Check machen
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
                </a>
              </div>
              <p className="text-xs text-kw-cream/50">30 Minuten Diagnose oder 2 bis 10 Minuten Check. Beides kostenlos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Kostenloser KI-Check (Quiz) ── */}
      <section id="kostenloser-check" className="px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
        <QuizSection />
      </section>

      {/* ── Services ── */}
      <section className="bg-white/[0.015] px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-24 sm:gap-32">
          {SERVICES.map((s) => (
            <FeatureSplit key={s.eyebrow} {...s} />
          ))}
        </div>
      </section>

      {/* ── Methodik ── */}
      <section className="px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <PhaseScroll
            heading="Der Kopfwerk"
            headingAccent="Audit"
            subheading="Kriterium vor Technologie. Fünf Phasen, immer in dieser Reihenfolge, auch wenn Phase zwei bedeutet, Ihnen zu sagen, dass sich nichts lohnt."
            phases={[
              {
                tag: "Diagnose",
                dur: "Woche 1",
                title: "Wir kartieren Ihre Abläufe",
                desc: "Bevor wir irgendetwas bauen, verstehen wir, was wirklich Zeit kostet, wie oft, und wer es macht. Kein Werkzeug wird angefasst, bevor das klar ist.",
              },
              {
                tag: "Design",
                dur: "3 bis 5 Tage",
                title: "Wir entwerfen die Lösung",
                desc: "Wir schlagen vor, was zuerst gebaut wird, mit klarem Nutzen und ohne Überraschungen beim Umfang.",
              },
              {
                tag: "Umsetzung",
                dur: "2 bis 6 Wochen",
                title: "Wir bauen und stellen es scharf",
                desc: "In Ihren bestehenden Tools, ohne Migration, ohne neues System, das Sie erst lernen müssen.",
              },
              {
                tag: "Begleitung",
                dur: "Ab der Übergabe",
                title: "Wir begleiten und schulen Ihr Team",
                desc: "Andere Agenturen liefern ab und zwingen Sie, Ihre Arbeitsweise zu ändern. Wir passen uns Ihrer an und bleiben, bis Ihr Team es versteht.",
              },
            ]}
          />
        </div>
      </section>

      {/* ── Warum Kopfwerk ── */}
      <section className="px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Wir verkaufen keine Technologie. Wir verkaufen Kriterium.
          </h2>
          <ComparisonTable
            rows={[
              { label: "Kostenlose Diagnose, bevor wir etwas verkaufen", kopfwerk: "yes", other: "no" },
              { label: "Schriftliche, geprüfte Garantie", desc: "Kein Kleingedrucktes, keine Ausreden.", kopfwerk: "yes", other: "no" },
              { label: "Sagt ehrlich, wenn sich etwas nicht lohnt", kopfwerk: "yes", other: "no" },
              { label: "Ein fester Ansprechpartner", other: "Oft wechselnd", kopfwerk: "yes" },
              { label: "Begleitung nach der Lieferung", desc: "Einweisung fürs Team, nicht nur eine Rechnung.", kopfwerk: "yes", other: "partial" },
              { label: "Lokal in Köln", other: "Meist remote", kopfwerk: "yes" },
              { label: "Monatlich kündbar", other: "Oft Jahresvertrag", kopfwerk: "yes" },
              { label: "Web, Automatisierung und Content aus einer Hand", kopfwerk: "yes", other: "Meist nur ein Bereich" },
            ]}
          />
          <div className="mt-6">
            <ProsConsCards
              otherTitle="Was andere Agenturen oft gut machen"
              otherPoints={[
                "Größere Teams für sehr große Projekte.",
                "Oft mehr Fallstudien und bekannte Referenzen.",
                "Manche sind auf eine einzelne Nische spezialisiert.",
              ]}
              usTitle="Was Kopfwerk anders macht"
              usPoints={[
                "Kostenlose Diagnose, bevor überhaupt etwas verkauft wird.",
                "Ein Ansprechpartner von der Diagnose bis zur Übergabe.",
                "Schriftliche Garantie statt vager Versprechen.",
                "Lokal in Köln, direkt erreichbar.",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── Beweis ── */}
      <section className="bg-white/[0.015] px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">Echte Arbeit, echte Kunden.</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <CaseCard
              href="/cases/mic"
              service="Automatisierung"
              client="MIC"
              title="Manuelle Kundenrecherche in Lateinamerika automatisiert."
              metric="+160 Std."
              metricLabel="pro Monat"
              metricNote="Kundenangabe"
              imageSrc="/mic-report.webp"
            />
            <CaseCard
              href="/cases/ayori"
              service="KI-Content"
              client="Ayori"
              title="Kampagne mit KI produziert statt teurer Fotoproduktion."
              metric="-85%"
              metricLabel="Produktionskosten"
              metricNote="Kundenangabe"
              imageSrc="/ayori-1.webp"
            />
          </div>
        </div>
      </section>

      {/* ── Risiko ── */}
      <RiskReveal
        eyebrow="Ihr Risiko"
        text="Null Risiko. Wenn es sich nicht lohnt, kostet es Sie nichts. Wenn wir nicht liefern, bekommen Sie Ihr Geld zurück."
      />

      {/* ── Final CTA ── */}
      <section className="relative overflow-hidden px-6 py-24 text-center sm:py-32 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(110,44,52,0.3) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Bereit für ein ehrliches Gespräch?
          </h2>
          <div className="mt-8 flex flex-col items-center gap-3">
            <CtaButton />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 py-10 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <Image src="/kopfwerk-logo-dark.svg" alt="Kopfwerk" width={200} height={60} className="h-11 w-auto opacity-70" />
          <p className="text-xs text-kw-cream/30">© 2026 Kopfwerk · Alle Rechte vorbehalten.</p>
          <nav className="flex gap-5 text-xs text-kw-cream/40">
            <Link href="/impressum" className="transition-colors hover:text-kw-cream/70">Impressum</Link>
            <Link href="/datenschutz" className="transition-colors hover:text-kw-cream/70">Datenschutz</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
