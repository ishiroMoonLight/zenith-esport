"use client";

import Link from "next/link";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import { usePlayers } from "@/presentation/hooks/usePlayers";
import { deletePlayerUseCase } from "@/infrastructure/di/container";
import { useState } from "react";
import Image from "next/image";

/**
 * Vue du dashboard admin — liste des joueurs avec CRUD réel.
 * Importée et utilisée par app/admin/players/page.tsx.
 */
export default function PlayersDashboardPageView() {
    const { players, loading, error, refetch } = usePlayers();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string, gamertag: string) => {
        if (!confirm(`Supprimer le joueur "${gamertag}" ? Cette action est irréversible.`)) return;
        setDeletingId(id);
        try {
            await deletePlayerUseCase.execute(id);
            refetch();
        } catch (err) {
            alert(err instanceof Error ? err.message : "Erreur lors de la suppression.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Roster Management</h1>
                    <p className="text-slate-400">Manage your players and their profiles.</p>
                </div>
                <Link
                    href="/admin/players/create"
                    className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Player
                </Link>
            </div>

            {loading && (
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
                </div>
            )}
            {error && !loading && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-red-400">{error}</div>
            )}

            {!loading && (
                <div className="relative overflow-x-auto rounded-lg border border-slate-800 shadow-xl">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-900 text-xs uppercase text-slate-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Avatar</th>
                                <th scope="col" className="px-6 py-3">Gamertag</th>
                                <th scope="col" className="px-6 py-3">Real Name</th>
                                <th scope="col" className="px-6 py-3">Pseudo</th>
                                <th scope="col" className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player) => (
                                <tr key={player.id} className="border-b border-slate-800 bg-slate-950 hover:bg-slate-900/50">
                                    <td className="px-6 py-4">
                                        <div className="h-10 w-10 overflow-hidden rounded-full border border-slate-700 relative">
                                            {player.playerImage && !player.playerImage.startsWith("/zenith") ? (
                                                <Image
                                                    src={player.playerImage}
                                                    alt={player.gamertag}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-violet-600/20 flex items-center justify-center">
                                                    <span className="text-violet-400 text-xs font-bold">
                                                        {player.gamertag.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-white">
                                        {player.gamertag}
                                    </th>
                                    <td className="px-6 py-4">{player.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center rounded-md bg-violet-400/10 px-2 py-1 text-xs font-medium text-violet-400 ring-1 ring-inset ring-violet-400/20">
                                            {player.pseudo}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/players/edit/${player.id}`}
                                                className="rounded p-2 text-blue-500 hover:bg-blue-500/10"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(player.id, player.gamertag)}
                                                disabled={deletingId === player.id}
                                                className="rounded p-2 text-red-500 hover:bg-red-500/10 disabled:opacity-50"
                                            >
                                                {deletingId === player.id
                                                    ? <Loader2 className="h-4 w-4 animate-spin" />
                                                    : <Trash2 className="h-4 w-4" />
                                                }
                                                <span className="sr-only">Delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {players.length === 0 && (
                                <tr className="border-b border-slate-800 bg-slate-950">
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                        No players found. Add your first one!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
