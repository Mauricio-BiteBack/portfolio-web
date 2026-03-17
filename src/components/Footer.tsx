"use client";

import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/kidealist_/",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@kidealist?is_from_webapp=1&sender_device=pc",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mauricio-jaramillo-4b214a2b7",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "E-Mail",
    href: "mailto:mauriciojaramillo146@gmail.com",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-black pt-24 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-12 flex flex-col items-center gap-12">

        {/* 1. Contact section — ARRIBA */}
        <div className="w-full border border-neutral-800 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Heading */}
          <div className="text-center md:text-left">
            <p className="text-neutral-500 text-sm uppercase tracking-widest mb-2">
              Kontakt
            </p>
            <h2
              className="text-white font-black uppercase leading-none"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              Lass uns
              <br />
              zusammenarbeiten.
            </h2>
          </div>

          {/* Right: Email + Phone on same row */}
          <div className="flex flex-col gap-4 items-start">
            {/* Email */}
            <a
              href="mailto:mauriciojaramillo146@gmail.com"
              className="group flex items-center gap-3 text-white hover:text-blue-400 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 group-hover:border-blue-600 flex items-center justify-center transition-colors flex-shrink-0">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <p className="text-neutral-500 text-xs mb-0.5">E-Mail</p>
                <p className="text-sm font-medium">Mauriciojaramillo146@gmail.com</p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+4915750159428"
              className="group flex items-center gap-3 text-white hover:text-blue-400 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 group-hover:border-blue-600 flex items-center justify-center transition-colors flex-shrink-0">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.06 6.06l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <p className="text-neutral-500 text-xs mb-0.5">Telefon</p>
                <p className="text-sm font-medium">+49 157 50159428</p>
              </div>
            </a>
          </div>
        </div>

        {/* 2. Logo in blue circle */}
        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">
          <Image
            src="/images/Logo-Mauricio.png"
            alt="MJ Logo"
            width={44}
            height={44}
            className="brightness-0 invert"
          />
        </div>

        {/* 3. Nav links */}
        <nav className="flex items-center gap-8 text-white text-base">
          <Link href="#" className="hover:text-neutral-300 transition-colors">
            Home
          </Link>
          <Link href="/impressum" className="hover:text-neutral-300 transition-colors">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-neutral-300 transition-colors">
            Datenschutz
          </Link>
        </nav>

        {/* 4. Social icons */}
        <div className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={link.name}
              className="w-11 h-11 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-12">
        <p className="text-neutral-600 text-sm">
          © 2026 Biteback. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
