import { blogPosts, BlogPost } from "@/data/blogData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { notFound } from "next/navigation";

// Generate static params for all blog posts
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const resolvedParams = await params;
    const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen selection:bg-violet-500 selection:text-white bg-slate-950">
            <Navbar />

            {/* Hero Image Section */}
            <div className="relative h-[60vh] w-full mt-20">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
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
                                <Tag size={14} /> {post.category}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar size={14} /> {post.date}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-sans">
                            {post.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <article className="container mx-auto px-4 py-16 max-w-4xl relative z-10">
                <div className="prose prose-lg prose-invert mx-auto">
                    <p className="text-xl text-gray-300 leading-relaxed font-light mb-8 border-l-4 border-violet-500 pl-6 italic">
                        {post.excerpt}
                    </p>
                    <div className="text-gray-400 space-y-6">
                        {/* 
                           In a real app, this would be rendered Markdown or HTML. 
                           Since we have a simple string, we'll just display it. 
                           If you used a markdown parser, you'd render it here.
                        */}
                        {post.content.split('\n').map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>
                </div>

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

            <Footer />
        </main>
    );
}
