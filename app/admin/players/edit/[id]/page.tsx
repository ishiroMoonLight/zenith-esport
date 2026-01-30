import { PlayerForm } from "@/components/admin/PlayerForm";
import { players } from "@/public/zenith/players/data.js";
import { notFound } from "next/navigation";

export default async function EditPlayerPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const player = players.find((p) => p.id === parseInt(id));

    if (!player) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-5xl">
            <PlayerForm initialData={player} isEditing />
        </div>
    );
}
