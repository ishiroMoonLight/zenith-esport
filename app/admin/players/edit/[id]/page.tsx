import EditPlayerPageView from "@/presentation/pages/admin/EditPlayerPageView";
import { notFound } from "next/navigation";

export default async function EditPlayerPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    if (!id) {
        notFound();
    }

    return <EditPlayerPageView playerId={id} />;
}
