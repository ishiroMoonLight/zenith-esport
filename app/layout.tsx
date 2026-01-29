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
  title: "Zenith E-Sport | Tekken Team",
  description: "The official showcase of Zenith E-Sport. Elite Tekken competitors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased bg-slate-950 text-white selection:bg-violet-500 selection:text-white`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
