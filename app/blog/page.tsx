import type { Metadata } from "next";
import BlogPageView from "@/presentation/pages/BlogPageView";

export const metadata: Metadata = {
  title: "Actualités & Blog",
  description:
    "Suivez toutes les actualités, annonces de tournois, récapitulatifs et nouveautés de l'équipe Zenith E-Sport.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Actualités & Blog | Zenith E-Sport",
    description:
      "Toutes les actualités et résultats de l'équipe Zenith E-Sport sur la scène Tekken.",
    url: "/blog",
  },
};

export default function BlogPage() {
  return <BlogPageView />;
}

