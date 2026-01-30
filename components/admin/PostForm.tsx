"use client";

import { useState } from "react";
import { BlogPost } from "@/data/blogData"; // We might need to adjust this depending on if BlogPost is exported
import Link from "next/link";
import { Save, ArrowLeft, Image as ImageIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { ImageUpload } from "./ImageUpload";

// Dynamic import for RichTextEditor to avoid SSR issues with CKEditor
const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
    ssr: false,
    loading: () => <div className="h-64 w-full animate-pulse rounded-lg bg-slate-800" />,
});

interface PostFormProps {
    initialData?: Partial<BlogPost>;
    isEditing?: boolean;
}

export function PostForm({ initialData, isEditing = false }: PostFormProps) {
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        category: initialData?.category || "General",
        date: initialData?.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        excerpt: initialData?.excerpt || "",
        content: initialData?.content || "",
        image: initialData?.image || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleContentChange = (value: string) => {
        setFormData((prev) => ({ ...prev, content: value }));
    }

    const handleImageChange = (value: string) => {
        setFormData((prev) => ({ ...prev, image: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert(`Post ${isEditing ? "updated" : "created"} (Simulated)! Check console for data.`);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin"
                        className="flex items-center text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold text-white">
                        {isEditing ? "Edit Post" : "Create New Post"}
                    </h1>
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300"
                >
                    <Save className="mr-2 h-4 w-4" />
                    Save Post
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium text-slate-300">
                            Post Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500"
                            placeholder="Enter post title"
                        />
                    </div>



                    {/* Excerpt */}
                    <div className="space-y-2">
                        <label htmlFor="excerpt" className="block text-sm font-medium text-slate-300">
                            Excerpt (Short Description)
                        </label>
                        <textarea
                            id="excerpt"
                            name="excerpt"
                            prefix="test"
                            rows={3}
                            value={formData.excerpt}
                            onChange={handleChange}
                            className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500"
                            placeholder="Brief summary used in cards..."
                        />
                    </div>

                    {/* Content - CKEditor */}
                    <RichTextEditor
                        value={formData.content}
                        onChange={handleContentChange}
                    />
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    {/* Category */}
                    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 space-y-4">
                        <h3 className="font-semibold text-white">Organization</h3>
                        <div className="space-y-2">
                            <label htmlFor="category" className="block text-sm font-medium text-slate-300">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-white focus:border-violet-500 focus:ring-violet-500"
                            >
                                <option value="General">General</option>
                                <option value="Tournament">Tournament</option>
                                <option value="Behind the Scenes">Behind the Scenes</option>
                                <option value="Guide">Guide</option>
                            </select>
                        </div>
                    </div>

                    {/* Featured Image - DragDrop */}
                    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 space-y-4">
                        <h3 className="font-semibold text-white">Featured Image</h3>
                        <ImageUpload
                            value={formData.image}
                            onChange={handleImageChange}
                        />
                        <div className="space-y-2 pt-2 border-t border-slate-800">
                            <label htmlFor="imageUrl" className="block text-xs font-medium text-slate-500">
                                Or enter URL manually
                            </label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-xs text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
