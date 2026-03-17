"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col">
      <style>{`
        @media (max-width: 767px) {
          .hero-photo-container {
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            transform: none !important;
          }
          .hero-texts-container {
            flex-direction: row !important;
            justify-content: flex-start !important;
            align-items: flex-start !important;
            gap: 12px !important;
            padding: 0 20px 28px 20px !important;
          }
          .hero-h1 {
            font-size: 80px !important;
          }
          .hero-subtitle {
            font-size: 32px !important;
            text-align: left !important;
            margin-right: 0 !important;
          }
        }
      `}</style>

      {/* Background: pure black */}
      <div className="absolute inset-0 z-0" style={{ background: "#000000" }} />

      {/* Blue radial gradient — bottom third only, top completely black */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 38% at 50% 85%, #1e4fc2 0%, #0d2860 42%, transparent 70%)",
        }}
      />

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-6 md:px-12">
        <Link
          href="https://suite.bitebackapp.de"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/Logo-Mauricio.png"
            alt="Mauricio Jaramillo"
            width={80}
            height={80}
            className="brightness-0 invert"
          />
        </Link>

        <a
          href="#kontakt"
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-full text-sm transition-colors duration-200"
        >
          Kontaktiere Mich
        </a>
      </nav>

      {/* Photo */}
      <div
        className="hero-photo-container"
        style={{
          position: "absolute",
          top: "72px",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(360px, 52vw, 720px)",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <Image
          src="/images/portfolio.png"
          alt="Mauricio Jaramillo"
          fill
          className="object-cover object-top md:object-contain md:object-bottom"
          priority
          sizes="(max-width: 768px) 100vw, 52vw"
        />
      </div>

      {/* Bottom texts */}
      <div
        className="hero-texts-container"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "0 40px 36px 40px",
          zIndex: 6,
        }}
      >
        {/* Left: ICH BIN MAURICIO */}
        <h1
          className="hero-h1"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "135px",
            lineHeight: "78%",
            color: "white",
            margin: 0,
          }}
        >
          ICH BIN
          <br />
          MAURICIO
        </h1>

        {/* Right: WEB DESIGNER & BUILDER */}
        <p
          className="hero-subtitle"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "72px",
            lineHeight: "82%",
            color: "white",
            textAlign: "right",
            margin: 0,
            marginRight: "40px",
          }}
        >
          WEB
          <br />
          DESIGNER
          <br />
          &amp; BUILDER
        </p>
      </div>

      {/* Gradient connector to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none"
        style={{
          height: "120px",
          background: "linear-gradient(to bottom, transparent 0%, #000000 100%)",
        }}
      />
    </section>
  );
}
