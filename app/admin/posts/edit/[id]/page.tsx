import EditPostPageView from "@/presentation/pages/admin/EditPostPageView";
import { notFound } from "next/navigation";

export default async function EditPostPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    if (!id) {
        notFound();
    }

    return <EditPostPageView postId={id} />;
}
