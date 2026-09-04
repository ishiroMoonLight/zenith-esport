"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { ImageUpload } from "./ImageUpload";
import { createPlayerUseCase, updatePlayerUseCase } from "@/infrastructure/di/container";

interface PlayerFormData {
    nom: string;
    prenom: string;
    pseudo: string;
    playerImage?: string | null;
}

interface PlayerFormProps {
    initialData?: Partial<PlayerFormData>;
    playerId?: string;
    isEditing?: boolean;
}

export function PlayerForm({ initialData, playerId, isEditing = false }: PlayerFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        nom: initialData?.nom || "",
        prenom: initialData?.prenom || "",
        pseudo: initialData?.pseudo || "",
    });

    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(initialData?.playerImage || null);
    const [newImage, setNewImage] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (file: File | null) => {
        setNewImage(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            if (isEditing && playerId) {
                await updatePlayerUseCase.execute(playerId, {
                    nom: formData.nom,
                    prenom: formData.prenom,
                    pseudo: formData.pseudo,
                    image: newImage || undefined,
                });
            } else {
                await createPlayerUseCase.execute({
                    nom: formData.nom,
                    prenom: formData.prenom,
                    pseudo: formData.pseudo,
                    image: newImage || undefined,
                });
            }
            router.push("/admin/players");
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
                        href="/admin/players"
                        className="flex items-center text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Back to Players
                    </Link>
                    <h1 className="text-2xl font-bold text-white">
                        {isEditing ? "Edit Player" : "Add New Player"}
                    </h1>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300 disabled:opacity-50"
                >
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Player
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
                    {/* Basic Info */}
                    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Player Details</h3>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="pseudo" className="block text-sm font-medium text-slate-300">
                                    Gamertag / Pseudo
                                </label>
                                <input
                                    type="text"
                                    id="pseudo"
                                    name="pseudo"
                                    required
                                    value={formData.pseudo}
                                    onChange={handleChange}
                                    className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500"
                                    placeholder="e.g. Ishiro"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="prenom" className="block text-sm font-medium text-slate-300">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="prenom"
                                    name="prenom"
                                    required
                                    value={formData.prenom}
                                    onChange={handleChange}
                                    className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500"
                                    placeholder="John"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="nom" className="block text-sm font-medium text-slate-300">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="nom"
                                    name="nom"
                                    required
                                    value={formData.nom}
                                    onChange={handleChange}
                                    className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    {/* Player Photo */}
                    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 space-y-4">
                        <h3 className="font-semibold text-white">Player Photo</h3>
                        
                        {existingImageUrl && !newImage && (
                            <div className="space-y-2 mb-4">
                                <label className="block text-xs font-medium text-slate-400">Image actuelle</label>
                                <div className="relative rounded overflow-hidden h-32 border border-slate-700 w-32 mx-auto">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={existingImageUrl.startsWith('http') ? existingImageUrl : `http://localhost:4000${existingImageUrl}`} alt="Player" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )}

                        <ImageUpload
                            value={newImage}
                            onChange={handleImageChange}
                            label={existingImageUrl ? "Remplacer l'image" : "Profile Picture"}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
