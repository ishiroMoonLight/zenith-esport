"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBlogDetail } from "@/presentation/hooks/useBlogDetail";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Loader2 } from "lucide-react";

interface BlogDetailPageViewProps {
  /** L'ID du blog (= slug dans l'URL, qui correspond à l'id CUID du backend) */
  blogId: string;
}

/**
 * Vue de la page détail d'un article — branchée sur useBlogDetail().
 * Importée et utilisée par app/blog/[slug]/page.tsx.
 */
export default function BlogDetailPageView({ blogId }: BlogDetailPageViewProps) {
  const { blog, loading, error } = useBlogDetail(blogId);

  return (
    <main className="min-h-screen selection:bg-violet-500 selection:text-white bg-slate-950">
      <Navbar />

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-violet-500" />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex flex-col justify-center items-center min-h-[60vh] text-center px-4">
          <p className="text-red-400 text-xl mb-4">{error}</p>
          <Link href="/blog" className="text-violet-400 hover:text-violet-300 flex items-center gap-2">
            <ArrowLeft size={16} /> Retour aux articles
          </Link>
        </div>
      )}

      {/* Blog Content */}
      {!loading && !error && blog && (
        <>
          {/* Hero Image Section */}
          <div className="relative h-[60vh] w-full mt-20">
            {blog.image ? (
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="h-full w-full bg-slate-800" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
              <div className="container mx-auto max-w-4xl">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
                >
                  <ArrowLeft size={20} className="mr-2" /> Back to Blog
                </Link>
                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-violet-300 mb-4 font-mono uppercase tracking-wider">
                  <span className="bg-violet-600/20 border border-violet-500/30 px-3 py-1 rounded-full text-violet-300 flex items-center gap-2">
                    <Tag size={14} /> {blog.category}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar size={14} /> {blog.date}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-sans">
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
                className="text-gray-400 space-y-6"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* Image Gallery */}
            {blog.images && blog.images.length > 1 && (
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {blog.images.slice(1).map((img) => (
                  <div key={img.id} className="relative h-60 rounded-xl overflow-hidden">
                    <Image src={img.url} alt={blog.title} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Navigation Footer */}
            <div className="border-t border-white/10 mt-16 pt-12 flex justify-between items-center">
              <Link
                href="/blog"
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to News
              </Link>
            </div>
          </article>
        </>
      )}

      <Footer />
    </main>
  );
}
