"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBlogDetail } from "@/presentation/hooks/useBlogDetail";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Tag,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Images as ImagesIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogDetailPageViewProps {
  /** L'ID du blog (= slug dans l'URL, qui correspond à l'id CUID du backend) */
  blogId: string;
}

/**
 * Vue de la page détail d'un article — branchée sur useBlogDetail().
 * Inclut une galerie interactive multi-images avec visionneuse Lightbox plein écran.
 */
export default function BlogDetailPageView({ blogId }: BlogDetailPageViewProps) {
  const { blog, loading, error } = useBlogDetail(blogId);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Clavier pour la lightbox (Echap, Gauche, Droite)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null || !blog?.images) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % blog.images.length : 0
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + blog.images.length) % blog.images.length : 0
        );
      }
    },
    [lightboxIndex, blog?.images]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const allImages = blog?.images ?? [];

  return (
    <main className="min-h-screen selection:bg-violet-500 selection:text-white bg-slate-950">
      <Navbar />

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col justify-center items-center min-h-[60vh] gap-3">
          <Loader2 className="h-12 w-12 animate-spin text-violet-500" />
          <p className="text-slate-400 text-sm">Chargement de l&apos;article...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex flex-col justify-center items-center min-h-[60vh] text-center px-4">
          <p className="text-red-400 text-xl mb-4">{error}</p>
          <Link
            href="/blog"
            className="text-violet-400 hover:text-violet-300 flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Retour aux articles
          </Link>
        </div>
      )}

      {/* Blog Content */}
      {!loading && !error && blog && (
        <>
          {/* Hero Image Section */}
          <div className="relative h-[60vh] w-full mt-20 bg-slate-900">
            {blog.image ? (
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                unoptimized
                className="object-cover"
                priority
              />
            ) : (
              <div className="h-full w-full bg-slate-800 flex items-center justify-center">
                <span className="text-slate-600">Aucune image principale</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
              <div className="container mx-auto max-w-4xl">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
                >
                  <ArrowLeft size={20} className="mr-2" /> Retour au Blog
                </Link>
                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-violet-300 mb-4 font-mono uppercase tracking-wider">
                  <span className="bg-violet-600/20 border border-violet-500/30 px-3 py-1 rounded-full text-violet-300 flex items-center gap-2">
                    <Tag size={14} /> {blog.category}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar size={14} /> {blog.date}
                  </span>
                  {allImages.length > 1 && (
                    <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-slate-300 flex items-center gap-2">
                      <ImagesIcon size={14} /> {allImages.length} images
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                  {blog.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <article className="container mx-auto px-4 py-16 max-w-4xl relative z-10">
            <div className="prose prose-lg prose-invert mx-auto">
              <p className="text-xl text-gray-300 leading-relaxed font-light mb-8 border-l-4 border-violet-500 pl-6 italic">
                {blog.excerpt}
              </p>
              <div
                className="text-gray-300 space-y-6 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* Galerie de photos si plusieurs images */}
            {allImages.length > 0 && (
              <section className="mt-16 pt-12 border-t border-slate-800">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-violet-600/20 text-violet-400">
                      <ImagesIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Galerie Photos</h2>
                      <p className="text-sm text-slate-400">
                        {allImages.length} {allImages.length > 1 ? "images associées" : "image associée"} à cet article — cliquez pour agrandir
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allImages.map((img, index) => (
                    <motion.div
                      key={img.id || index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      onClick={() => setLightboxIndex(index)}
                      className="group relative h-64 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 cursor-pointer shadow-lg hover:border-violet-500/60 transition-all duration-300"
                    >
                      <Image
                        src={img.url}
                        alt={`${blog.title} - Image ${index + 1}`}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div className="flex items-center justify-between w-full text-white text-xs font-medium">
                          <span className="bg-violet-600/90 px-2.5 py-1 rounded-full backdrop-blur-sm">
                            Image {index + 1} / {allImages.length}
                          </span>
                          <span className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm">
                            <Maximize2 size={12} /> Agrandir
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Navigation Footer */}
            <div className="border-t border-white/10 mt-16 pt-12 flex justify-between items-center">
              <Link
                href="/blog"
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Retour aux articles
              </Link>
            </div>
          </article>

          {/* Lightbox Plein Écran */}
          <AnimatePresence>
            {lightboxIndex !== null && allImages[lightboxIndex] && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                onClick={() => setLightboxIndex(null)}
              >
                {/* Bouton Fermer */}
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="absolute top-5 right-5 z-[130] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Fermer (Echap)"
                >
                  <X size={24} />
                </button>

                {/* Navigation Précédente */}
                {allImages.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((prev) =>
                        prev !== null ? (prev - 1 + allImages.length) % allImages.length : 0
                      );
                    }}
                    className="absolute left-4 z-[130] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Image précédente (Flèche gauche)"
                  >
                    <ChevronLeft size={28} />
                  </button>
                )}

                {/* Conteneur de l'image */}
                <div
                  className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative w-full h-[75vh]">
                    <Image
                      src={allImages[lightboxIndex].url}
                      alt={`${blog.title} - Plein écran`}
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-white text-sm font-semibold">
                      {blog.title}
                    </p>
                    <p className="text-slate-400 text-xs mt-1">
                      Image {lightboxIndex + 1} sur {allImages.length}
                    </p>
                  </div>
                </div>

                {/* Navigation Suivante */}
                {allImages.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((prev) =>
                        prev !== null ? (prev + 1) % allImages.length : 0
                      );
                    }}
                    className="absolute right-4 z-[130] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Image suivante (Flèche droite)"
                  >
                    <ChevronRight size={28} />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <Footer />
    </main>
  );
}
