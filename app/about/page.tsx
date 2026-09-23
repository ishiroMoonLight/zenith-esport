import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez l'histoire, la mission et les valeurs de Zenith E-Sport — une équipe d'élite Tekken déterminée à redéfinir la scène compétitive à Madagascar.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "À propos | Zenith E-Sport",
    description:
      "Découvrez l'histoire, la mission et les valeurs de Zenith E-Sport — une équipe d'élite Tekken déterminée à redéfinir la scène compétitive.",
    url: "/about",
  },
};

const social_medias = [
  {
    name: "TikTok",
    handle: "@zenith_e.sport",
    description: "Highlights, clips explosifs et moments forts de nos compétitions.",
    badge: "Clips & Vidéos",
    action: "Suivre sur TikTok",
    url: "https://www.tiktok.com/@zenith_e.sport",
    borderHover: "hover:border-pink-500/50 hover:shadow-[0_0_25px_rgba(236,72,153,0.15)]",
    iconBg: "bg-black text-white border border-pink-500/30",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.068-.117a2.896 2.896 0 0 1 2.89-4.148c.307 0 .604.05.882.14V9.77a6.34 6.34 0 0 0-.882-.062 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34c3.487 0 6.34-2.853 6.34-6.34V8.756a8.19 8.19 0 0 0 4.254 1.374V6.686z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    handle: "Zenith E-Sport",
    description: "Actualités officielles, annonces des tournois et événements de l'équipe.",
    badge: "Actu & Événements",
    action: "Rejoindre la page",
    url: "https://www.facebook.com/profile.php?id=100071631273678",
    borderHover: "hover:border-blue-500/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]",
    iconBg: "bg-blue-600/20 text-blue-400 border border-blue-500/30",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    handle: "@zenith_e.sport",
    description: "Photos officielles, stories de nos déplacements et coulisses d'entraînement.",
    badge: "Photos & Backstage",
    action: "Voir nos photos",
    url: "https://www.instagram.com/zenith_e.sport?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
    borderHover: "hover:border-pink-500/50 hover:shadow-[0_0_25px_rgba(236,72,153,0.15)]",
    iconBg: "bg-gradient-to-tr from-amber-500/20 via-pink-500/20 to-purple-500/20 text-pink-400 border border-pink-500/30",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 selection:bg-violet-500 selection:text-white">
      <Navbar />

      {/* Page Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-fuchsia-700/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-700/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block text-violet-400 font-bold tracking-widest uppercase text-sm mb-4">
            Notre Histoire
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase mb-6 leading-none">
            À{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
              Propos
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Fondée sur la passion du jeu compétitif, Zenith E-Sport est bien plus
            qu&apos;une équipe — c&apos;est une famille unie par la même obsession de la
            victoire.
          </p>
          {/* Decorative line */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-fuchsia-500" />
            <div className="w-2 h-2 rounded-full bg-fuchsia-500" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-fuchsia-500" />
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="py-12 border-y border-white/5 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {[
              { value: "2025", label: "Fondée en" },
              { value: "5+", label: "Joueurs actifs" },
              { value: "20+", label: "Tournois joués" },
            ].map((stat) => (
              <div key={stat.label} className="group">
                <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </p>
                <p className="text-gray-500 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Component */}
      <About />

      {/* Values Section */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.08),transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-violet-400 font-bold tracking-widest uppercase text-sm mb-2 block">
              Notre ADN
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-4">
              Nos <span className="text-violet-500">Valeurs</span>
            </h2>
            <div className="w-24 h-1 bg-violet-600 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Excellence",
                desc: "Nous ne nous contentons pas de participer. Chaque session d'entraînement, chaque match, chaque analyse est orientée vers un seul objectif : être les meilleurs.",
              },
              {
                icon: "🤝",
                title: "Cohésion",
                desc: "L'équipe avant tout. La force de Zenith réside dans la synergie entre ses membres — des personnalités différentes, un seul état d'esprit.",
              },
              {
                icon: "🎯",
                title: "Rigueur",
                desc: "La victoire se prépare avant le tournoi. Analyse des adversaires, perfectionnement des combos, mental d'acier — rien n'est laissé au hasard.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="group bg-[#0f172a] rounded-2xl p-8 border border-white/5 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-5xl mb-5">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Networks Section */}
      <section className="py-24 bg-[#0a0f1d] border-t border-white/5 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-violet-400 font-bold tracking-widest uppercase text-sm mb-2 block">
              Rejoignez la communauté
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-4">
              Suivez-nous sur les{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
                Réseaux
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Restez au plus près de nos joueurs, suivez les compétitions en direct,
              découvrez les coulisses et vibrez avec toute la communauté Zenith.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {social_medias.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative bg-[#0f172a]/90 backdrop-blur-sm rounded-2xl p-6 border border-white/5 ${social.borderHover} transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${social.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                      {social.icon}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
                      {social.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">
                    {social.name}
                  </h3>
                  <p className="text-xs font-mono text-violet-400 mb-3">
                    {social.handle}
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    {social.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                  <span>{social.action}</span>
                  <svg
                    className="w-4 h-4 text-violet-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* Discord Banner */}
          <div className="mt-12 relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-950/80 p-8 md:p-10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[90px] pointer-events-none" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-5 text-left">
                <div className="p-4 rounded-2xl bg-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">Rejoignez le Discord de Tekken Madagascar</h4>
                  <p className="text-slate-300 text-sm">
                    Trouvez des partenaires de jeu, échangez avec le staff et participez à nos tournois communautaires.
                  </p>
                </div>
              </div>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-105"
              >
                Rejoindre le serveur
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
