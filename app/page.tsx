import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Roster from "@/components/Roster";
import BlogSection from "@/components/BlogSection";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
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
