import { PostForm } from "@/components/admin/PostForm";
import { blogPosts } from "@/data/blogData";
import { notFound } from "next/navigation";

export default async function EditPostPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const post = blogPosts.find((p) => p.id === id);

    if (!post) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-5xl">
            <PostForm initialData={post} isEditing />
        </div>
    );
}
