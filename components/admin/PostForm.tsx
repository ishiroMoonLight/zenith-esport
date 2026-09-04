"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Loader2, Trash2, X } from "lucide-react";
import dynamic from "next/dynamic";
import { ImageUpload } from "./ImageUpload";
import { createBlogUseCase, updateBlogUseCase, deleteBlogImageUseCase } from "@/infrastructure/di/container";
import { BlogImage } from "@/domain/models/Blog";

const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
    ssr: false,
    loading: () => <div className="h-64 w-full animate-pulse rounded-lg bg-slate-800" />,
});

interface PostFormData {
    titre: string;
    description: string;
    contenu: string;
    images?: BlogImage[]; // Existing images
}

interface PostFormProps {
    initialData?: Partial<PostFormData>;
    postId?: string;
    isEditing?: boolean;
}

export function PostForm({ initialData, postId, isEditing = false }: PostFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        titre: initialData?.titre || "",
        description: initialData?.description || "",
        contenu: initialData?.contenu || "",
    });

    const [existingImages, setExistingImages] = useState<BlogImage[]>(initialData?.images || []);
    const [newImage, setNewImage] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleContentChange = (value: string) => {
        setFormData((prev) => ({ ...prev, contenu: value }));
    };

    const handleImageChange = (file: File | null) => {
        setNewImage(file);
    };

    const handleDeleteExistingImage = async (imageId: string) => {
        if (!postId) return;
        if (!confirm("Voulez-vous vraiment supprimer cette image ?")) return;

        try {
            await deleteBlogImageUseCase.execute(postId, imageId);
            setExistingImages(prev => prev.filter(img => img.id !== imageId));
        } catch (err) {
            alert("Erreur lors de la suppression de l'image.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            if (isEditing && postId) {
                await updateBlogUseCase.execute(postId, {
                    titre: formData.titre,
                    description: formData.description,
                    contenu: formData.contenu,
                    images: newImage ? [newImage] : undefined,
                });
            } else {
                await createBlogUseCase.execute({
                    titre: formData.titre,
                    description: formData.description,
                    contenu: formData.contenu,
                    images: newImage ? [newImage] : [],
                });
            }
            router.push("/admin");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue.");
        } finally {
            setIsSubmitting(false);
        }
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
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300 disabled:opacity-50"
                >
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Post
                </button>
            </div>

            {error && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-red-400">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Titre */}
                    <div className="space-y-2">
                        <label htmlFor="titre" className="block text-sm font-medium text-slate-300">
                            Post Title
                        </label>
                        <input
                            type="text"
                            id="titre"
                            name="titre"
                            required
                            value={formData.titre}
                            onChange={handleChange}
                            className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500"
                            placeholder="Enter post title"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-slate-300">
                            Excerpt (Short Description)
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            rows={3}
                            value={formData.description}
                            onChange={handleChange}
                            className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500"
                            placeholder="Brief summary used in cards..."
                        />
                    </div>

                    {/* Content - CKEditor */}
                    <RichTextEditor
                        value={formData.contenu}
                        onChange={handleContentChange}
                    />
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    {/* Featured Image */}
                    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 space-y-4">
                        <h3 className="font-semibold text-white">Featured Image</h3>
                        
                        {existingImages.length > 0 && (
                            <div className="space-y-2 mb-4">
                                <label className="block text-xs font-medium text-slate-400">Images existantes</label>
                                <div className="grid gap-2">
                                    {existingImages.map(img => (
                                        <div key={img.id} className="relative rounded overflow-hidden h-24 border border-slate-700">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={img.url} alt="Post image" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteExistingImage(img.id)}
                                                className="absolute top-1 right-1 bg-red-500/80 p-1 rounded hover:bg-red-500 text-white"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <ImageUpload
                            value={newImage}
                            onChange={handleImageChange}
                            label={existingImages.length > 0 ? "Ajouter une nouvelle image" : "Uploader une image"}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
