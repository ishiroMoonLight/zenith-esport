import { PlayerForm } from "@/components/admin/PlayerForm";

/**
 * Vue de la page de création d'un joueur.
 * Importée et utilisée par app/admin/players/create/page.tsx.
 */
export default function CreatePlayerPageView() {
    return (
        <div className="mx-auto max-w-5xl">
            <PlayerForm />
        </div>
    );
}
