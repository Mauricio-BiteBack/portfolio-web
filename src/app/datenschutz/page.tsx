import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz – Mauricio Jaramillo",
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Topbar */}
      <div className="border-b border-neutral-900">
        <div className="max-w-3xl mx-auto px-8 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Zurück
          </Link>
          <span className="text-neutral-600 text-sm tracking-wide">Datenschutz</span>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-8 py-16 pb-24">
        {/* Title */}
        <h1 className="text-5xl font-black mb-2">Datenschutz&shy;erklärung</h1>
        <p className="text-neutral-500 text-sm mb-14">Stand: März 2026</p>

        {/* Responsible party card */}
        <div className="border border-neutral-800 rounded-2xl p-8 mb-14 space-y-5">
          <p className="text-neutral-500 text-xs uppercase tracking-widest">Verantwortlicher</p>
          <div className="space-y-1">
            <p className="text-white font-medium">Mauricio Andres Jaramillo Sagastizabal</p>
            <p className="text-neutral-400">Ritterstraße 28, 50354 Hürth</p>
            <a
              href="mailto:mauriciojaramillo146@gmail.com"
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              mauriciojaramillo146@gmail.com
            </a>
          </div>
        </div>

        {/* Overview chips */}
        <div className="flex flex-wrap gap-2 mb-14">
          {[
            "Keine Cookies",
            "Kein Tracking",
            "Kein Kontaktformular",
            "Keine Datenweitergabe",
          ].map((item) => (
            <span
              key={item}
              className="text-xs font-medium text-neutral-300 border border-neutral-800 rounded-full px-4 py-2"
            >
              ✓ {item}
            </span>
          ))}
        </div>

        <div className="space-y-10 text-neutral-300 leading-relaxed">
          {/* 1 */}
          <section>
            <h2 className="text-white font-bold text-base uppercase tracking-widest mb-3">
              1. Allgemeine Hinweise
            </h2>
            <p>
              Diese Datenschutzerklärung informiert darüber, wie personenbezogene
              Daten beim Besuch dieser Website verarbeitet werden. Personenbezogene
              Daten sind alle Daten, mit denen du persönlich identifiziert werden
              kannst.
            </p>
          </section>

          <div className="border-t border-neutral-900" />

          {/* 2 */}
          <section>
            <h2 className="text-white font-bold text-base uppercase tracking-widest mb-3">
              2. Datenerfassung
            </h2>
            <div className="space-y-5">
              <div>
                <h3 className="text-white font-semibold mb-2">Cookies und Tracking</h3>
                <p>
                  Diese Website verwendet keine Cookies. Es werden keine
                  Analyse- oder Tracking-Tools (z. B. Google Analytics) eingesetzt.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Kontaktformular</h3>
                <p>
                  Diese Website verfügt über kein Kontaktformular. Kontaktaufnahmen
                  erfolgen ausschließlich über die angegebene E-Mail-Adresse oder
                  Telefonnummer.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Server-Logs</h3>
                <p>
                  Beim Besuch dieser Website werden vom Hosting-Anbieter technisch
                  notwendige Daten automatisch in sogenannten Server-Log-Dateien
                  gespeichert. Dazu gehören: Browsertyp, Betriebssystem, Referrer-URL,
                  IP-Adresse und Uhrzeit des Seitenaufrufs. Diese Daten können keiner
                  bestimmten Person zugeordnet werden und werden nicht mit anderen
                  Datenquellen zusammengeführt.
                </p>
              </div>
            </div>
          </section>

          <div className="border-t border-neutral-900" />

          {/* 3 */}
          <section>
            <h2 className="text-white font-bold text-base uppercase tracking-widest mb-3">
              3. Hosting
            </h2>
            <p>
              Diese Website wird bei{" "}
              <span className="text-white font-medium">Hostinger</span> gehostet.
              Beim Aufruf der Website werden technische Daten vom Hosting-Anbieter
              verarbeitet. Weitere Informationen zur Datenverarbeitung durch Hostinger
              findest du unter:{" "}
              <a
                href="https://www.hostinger.de/datenschutz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2"
              >
                hostinger.de/datenschutz
              </a>
            </p>
          </section>

          <div className="border-t border-neutral-900" />

          {/* 4 */}
          <section>
            <h2 className="text-white font-bold text-base uppercase tracking-widest mb-3">
              4. Externe Links
            </h2>
            <p>
              Diese Website enthält Links zu externen Plattformen (Instagram, TikTok,
              LinkedIn). Für die Datenschutzpraktiken dieser Drittanbieter übernehme
              ich keine Verantwortung. Bitte beachte die jeweiligen
              Datenschutzerklärungen der Anbieter.
            </p>
          </section>

          <div className="border-t border-neutral-900" />

          {/* 5 */}
          <section>
            <h2 className="text-white font-bold text-base uppercase tracking-widest mb-3">
              5. Deine Rechte
            </h2>
            <p className="mb-4">
              Gemäß DSGVO hast du das Recht auf:
            </p>
            <ul className="space-y-2 pl-0">
              {[
                "Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)",
                "Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
                "Löschung deiner Daten (Art. 17 DSGVO)",
                "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
                "Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
              ].map((right) => (
                <li key={right} className="flex items-start gap-3">
                  <span className="text-blue-500 mt-0.5 flex-shrink-0">→</span>
                  <span>{right}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5">
              Für Anfragen zu deinen Rechten wende dich an:{" "}
              <a
                href="mailto:mauriciojaramillo146@gmail.com"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                mauriciojaramillo146@gmail.com
              </a>
            </p>
          </section>

          <div className="border-t border-neutral-900" />

          {/* 6 */}
          <section>
            <h2 className="text-white font-bold text-base uppercase tracking-widest mb-3">
              6. Datenweitergabe
            </h2>
            <p>
              Es werden keine personenbezogenen Daten an Dritte weitergegeben,
              verkauft oder für Werbezwecke genutzt.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
