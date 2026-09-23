import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Roster from "@/components/Roster";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Roster des Joueurs",
  description:
    "Découvrez les joueurs et compétiteurs d'élite de l'équipe Zenith E-Sport sur Tekken 8 à Madagascar. Roster complet, mains et palmarès.",
  alternates: {
    canonical: "/roster",
  },
  openGraph: {
    title: "Roster des Joueurs | Zenith E-Sport",
    description:
      "Découvrez les joueurs d'élite de l'équipe Zenith E-Sport sur Tekken 8.",
    url: "/roster",
  },
};

export default function RosterPage() {
  return (
    <main className="min-h-screen bg-slate-950 selection:bg-violet-500 selection:text-white">
      <Navbar />

      {/* Page Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-700/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-fuchsia-700/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block text-violet-400 font-bold tracking-widest uppercase text-sm mb-4">
            Zenith E-Sport
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase mb-6 leading-none">
            Notre{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
              Roster
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Des guerriers d&apos;élite, forgés dans le feu de la compétition. Chaque
            joueur incarne la philosophie Zenith : précision, discipline et
            volonté de dominer.
          </p>
          {/* Decorative line */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-violet-500" />
            <div className="w-2 h-2 rounded-full bg-violet-500" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-violet-500" />
          </div>
        </div>
      </section>

      {/* Roster Component */}
      <Roster />

      <Footer />
    </main>
  );
}
