"use client";

import { motion } from "framer-motion";
import { blogPosts } from "@/data/blogData";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Loader2, Tag } from "lucide-react";
import { useBlogs } from "@/presentation/hooks/useBlogs";

export default function BlogSection() {
    // Display only the latest 3 posts
    // const latestPosts = blogPosts.slice(0, 3);
    const { blogs, loading, error } = useBlogs();

    return (
        <section id="blog" className="py-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-slate-950 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wider font-sans">
                        Latest <span className="text-violet-500">News</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Stay updated with the latest tournaments, roster changes, and exclusive team content.
                    </p>
                </motion.div>

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
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.slice(0, 3).map((post, index) => (
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

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white uppercase tracking-wider bg-transparent border-2 border-violet-600 rounded-lg hover:bg-violet-600 transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]"
                    >
                        View All News
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
