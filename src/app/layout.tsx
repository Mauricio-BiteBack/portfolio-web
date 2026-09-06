import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kopfwerk — Automatización, Apps y Contenido con IA",
  description:
    "Auditoría, desarrollo y capacitación en IA para empresas que quieren operar con más claridad, más control y menos fricción.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Kopfwerk — Automatización, Apps y Contenido con IA",
    description:
      "Auditoría, desarrollo y capacitación en IA para empresas que quieren operar con más claridad, más control y menos fricción.",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${jakartaSans.variable} font-jakarta antialiased`}>
        {children}
      </body>
    </html>
  );
}
