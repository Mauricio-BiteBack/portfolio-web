import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – Mauricio Jaramillo",
};

export default function Impressum() {
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
          <span className="text-neutral-600 text-sm tracking-wide">Impressum</span>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-8 py-16 pb-24">
        {/* Title */}
        <h1 className="text-5xl font-black mb-2">Impressum</h1>
        <p className="text-neutral-500 text-sm mb-14">Angaben gemäß § 5 TMG</p>

        {/* Contact card */}
        <div className="border border-neutral-800 rounded-2xl p-8 mb-14 space-y-5">
          <div>
            <p className="text-neutral-500 text-xs uppercase tracking-widest mb-1">Name</p>
            <p className="text-white font-medium">Mauricio Andres Jaramillo Sagastizabal</p>
          </div>
          <div className="border-t border-neutral-800" />
          <div>
            <p className="text-neutral-500 text-xs uppercase tracking-widest mb-1">Adresse</p>
            <p className="text-white font-medium">
              Ritterstraße 28<br />
              50354 Hürth<br />
              Deutschland
            </p>
          </div>
          <div className="border-t border-neutral-800" />
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <p className="text-neutral-500 text-xs uppercase tracking-widest mb-1">Telefon</p>
              <a
                href="tel:+4915750159428"
                className="text-white font-medium hover:text-blue-400 transition-colors"
              >
                +49 157 50159428
              </a>
            </div>
            <div className="flex-1">
              <p className="text-neutral-500 text-xs uppercase tracking-widest mb-1">E-Mail</p>
              <a
                href="mailto:mauriciojaramillo146@gmail.com"
                className="text-white font-medium hover:text-blue-400 transition-colors"
              >
                mauriciojaramillo146@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-10 text-neutral-300 leading-relaxed">
          {/* Berufsbezeichnung */}
          <section>
            <h2 className="text-white font-bold text-base uppercase tracking-widest mb-3">
              Berufsbezeichnung
            </h2>
            <p>Kleinunternehmer – Webdesign &amp; Webentwicklung</p>
          </section>

          <div className="border-t border-neutral-900" />

          {/* Kleinunternehmerregelung */}
          <section>
            <h2 className="text-white font-bold text-base uppercase tracking-widest mb-3">
              Hinweis gemäß Kleinunternehmerregelung § 19 UStG
            </h2>
            <p>
              Als Kleinunternehmer im Sinne von § 19 Abs. 1 UStG wird keine
              Umsatzsteuer erhoben.
            </p>
          </section>

          <div className="border-t border-neutral-900" />

          {/* Verantwortlich */}
          <section>
            <h2 className="text-white font-bold text-base uppercase tracking-widest mb-3">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p>
              Mauricio Andres Jaramillo Sagastizabal<br />
              Ritterstraße 28, 50354 Hürth, Deutschland
            </p>
          </section>

          <div className="border-t border-neutral-900" />

          {/* Haftungsausschluss */}
          <section>
            <h2 className="text-white font-bold text-base uppercase tracking-widest mb-5">
              Haftungsausschluss
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-2">Haftung für Inhalte</h3>
                <p>
                  Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte
                  auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
                  §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet,
                  übermittelte oder gespeicherte fremde Informationen zu überwachen oder
                  nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                  hinweisen.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Haftung für Links</h3>
                <p>
                  Mein Angebot enthält Links zu externen Websites Dritter, auf deren
                  Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden
                  Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
                  Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
                  verantwortlich.
                </p>
              </div>
            </div>
          </section>

          <div className="border-t border-neutral-900" />

          {/* Urheberrecht */}
          <section>
            <h2 className="text-white font-bold text-base uppercase tracking-widest mb-3">
              Urheberrecht
            </h2>
            <p>
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen
              Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
              Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen
              des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
              Autors. Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
