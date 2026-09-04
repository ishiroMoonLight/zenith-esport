"use client";

import { PlayerForm } from "@/components/admin/PlayerForm";
import { usePlayerDetail } from "@/presentation/hooks/usePlayerDetail";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";

interface EditPlayerPageViewProps {
    playerId: string;
}

/**
 * Vue de la page d'édition d'un joueur — charge le joueur via l'API.
 * Importée et utilisée par app/admin/players/edit/[id]/page.tsx.
 */
export default function EditPlayerPageView({ playerId }: EditPlayerPageViewProps) {
    const { player, loading, error } = usePlayerDetail(playerId);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24">
                <Loader2 className="h-10 w-10 animate-spin text-violet-500" />
            </div>
        );
    }

    if (error || !player) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-5xl">
            <PlayerForm
                initialData={{
                    nom: player.nom,
                    prenom: player.prenom,
                    pseudo: player.pseudo,
                    playerImage: player.playerImage,
                }}
                playerId={player.id}
                isEditing
            />
        </div>
    );
}
