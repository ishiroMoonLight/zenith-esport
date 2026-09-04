import { PostForm } from "@/components/admin/PostForm";

/**
 * Vue de la page de création d'un article de blog.
 * Importée et utilisée par app/admin/posts/create/page.tsx.
 */
export default function CreatePostPageView() {
    return (
        <div className="mx-auto max-w-5xl">
            <PostForm />
        </div>
    );
}
