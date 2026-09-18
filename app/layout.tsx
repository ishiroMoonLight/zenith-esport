import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zenith E-Sport | Équipe Tekken",
  description: "La vitrine officielle de Zenith E-Sport. Compétiteurs d'élite Tekken.",
  icons: {
    icon: "/zenith/logo.jpg",
    apple: "/zenith/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${outfit.variable} antialiased bg-slate-950 text-white selection:bg-violet-500 selection:text-white`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
