"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBlogs } from "@/presentation/hooks/useBlogs";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Loader2 } from "lucide-react";
import { useEffect } from "react";

/**
 * Vue de la page Blog — liste complète des articles depuis l'API.
 * Importée et utilisée par app/blog/page.tsx.
 */
export default function BlogPageView() {
  const { blogs, loading, error } = useBlogs();

  return (
    <main className="min-h-screen selection:bg-violet-500 selection:text-white bg-slate-950">
      <Navbar />

      <section className="pt-32 pb-20 relative overflow-hidden min-h-screen">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-slate-950 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 uppercase tracking-wider font-sans">
              News & <span className="text-violet-500">Updates</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              All the latest stories from the Zenith E-Sport universe.
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="h-10 w-10 animate-spin text-violet-500" />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-24">
              <p className="text-red-400 text-lg">{error}</p>
              <p className="text-slate-500 text-sm mt-2">Vérifiez que le serveur backend est en cours d&apos;exécution.</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && blogs.length === 0 && (
            <div className="text-center py-24">
              <p className="text-slate-400 text-lg">Aucun article pour le moment.</p>
            </div>
          )}

          {/* Articles Grid */}
          {!loading && !error && blogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-violet-500/50 transition-colors duration-300"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 w-full overflow-hidden">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="h-full w-full bg-slate-800 flex items-center justify-center">
                          <span className="text-slate-600 text-sm">Aucune image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-semibold text-white bg-violet-600 rounded-full shadow-lg">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-violet-400" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-violet-400 text-sm font-medium group-hover:text-violet-300 transition-colors">
                        Read More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
