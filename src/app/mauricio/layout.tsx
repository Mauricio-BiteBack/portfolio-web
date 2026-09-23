import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./mauricio.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mauricio Jaramillo | Webdesign, Social Media, Generative KI & Automatisierung",
  description:
    "Portfolio von Mauricio Jaramillo: Webdesign und -entwicklung, Social Media, visuelle Produktion mit generativer KI und Automatisierung für echte Kunden.",
  icons: {
    icon: "/mauricio/favicon/mj-mark.png",
  },
  openGraph: {
    title: "Mauricio Jaramillo | Portfolio",
    description:
      "Webdesign und -entwicklung, Social Media, generative KI und Automatisierung.",
    type: "website",
  },
};

export default function MauricioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="mauricio-root" className={`${bebasNeue.variable}`}>
      {children}
    </div>
  );
}
