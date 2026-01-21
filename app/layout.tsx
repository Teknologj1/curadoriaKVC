import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { RegisterSW } from "@/components/pwa/RegisterSW";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KVC Curadoria Imobiliária",
  description: "Curadoria imobiliária premium para decisões importantes",
  manifest: "/manifest.webmanifest",
  themeColor: "#0E0E10",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "KVC Curadoria",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-theme="light" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="theme-color" content="#0E0E10" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
