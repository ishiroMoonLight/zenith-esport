"use client";

import { PostForm } from "@/components/admin/PostForm";
import { useBlogDetail } from "@/presentation/hooks/useBlogDetail";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";

interface EditPostPageViewProps {
    postId: string;
}

/**
 * Vue de la page d'édition d'un article — charge le blog via l'API.
 * Importée et utilisée par app/admin/posts/edit/[id]/page.tsx.
 */
export default function EditPostPageView({ postId }: EditPostPageViewProps) {
    const { blog, loading, error } = useBlogDetail(postId);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24">
                <Loader2 className="h-10 w-10 animate-spin text-violet-500" />
            </div>
        );
    }

    if (error || !blog) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-5xl">
            <PostForm
                initialData={{
                    titre: blog.title,
                    description: blog.excerpt,
                    contenu: blog.content,
                    images: blog.images,
                }}
                postId={blog.id}
                isEditing
            />
        </div>
    );
}
