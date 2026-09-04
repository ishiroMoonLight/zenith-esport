import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Roster from "@/components/Roster";
import BlogSection from "@/components/BlogSection";
import About from "@/components/About";
import Footer from "@/components/Footer";

/**
 * Vue de la page d'accueil — assemblage de toutes les sections publiques.
 * Importée et utilisée par app/page.tsx.
 */
export default function HomePageView() {
  return (
    <main className="min-h-screen selection:bg-violet-500 selection:text-white bg-slate-950">
      <Navbar />
      <Hero />
      <Roster />
      <BlogSection />
      <About />
      <Footer />
    </main>
  );
}
