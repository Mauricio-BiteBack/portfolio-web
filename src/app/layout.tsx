import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mauricio Jaramillo – Web Designer & Builder",
  description:
    "Web Designer & Builder. Ich entwickle moderne Websites und Online-Shops. Schnell, klar und auf den Punkt.",
  openGraph: {
    title: "Mauricio Jaramillo – Web Designer & Builder",
    description: "Web Designer & Builder. Ich entwickle moderne Websites.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Dancing+Script:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
