"use client";

import { useState } from "react";
import Link from "next/link";
import { Save, ArrowLeft } from "lucide-react";
import { ImageUpload } from "./ImageUpload";

// Minimal Player Type for the form
interface PlayerData {
    gamertag: string;
    name: string;
    rank: string;
    playerImage: string;
    socials: {
        twitter?: string;
        twitch?: string;
        youtube?: string;
        instagram?: string;
    }
}

interface PlayerFormProps {
    initialData?: Partial<PlayerData>;
    isEditing?: boolean;
}

export function PlayerForm({ initialData, isEditing = false }: PlayerFormProps) {
    const [formData, setFormData] = useState<PlayerData>({
        gamertag: initialData?.gamertag || "",
        name: initialData?.name || "",
        rank: initialData?.rank || "Tekken King",
        playerImage: initialData?.playerImage || "",
        socials: {
            twitter: initialData?.socials?.twitter || "",
            twitch: initialData?.socials?.twitch || "",
            youtube: initialData?.socials?.youtube || "",
            instagram: initialData?.socials?.instagram || "",
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            socials: { ...prev.socials, [name]: value }
        }));
    };

    const handleImageChange = (value: string) => {
        setFormData((prev) => ({ ...prev, playerImage: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Player Form submitted:", formData);
        alert(`Player ${isEditing ? "updated" : "created"} (Simulated)!`);
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
                    className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300"
                >
                    <Save className="mr-2 h-4 w-4" />
                    Save Player
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Player Details</h3>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="gamertag" className="block text-sm font-medium text-slate-300">
                                    Gamertag
                                </label>
                                <input
                                    type="text"
                                    id="gamertag"
                                    name="gamertag"
                                    required
                                    value={formData.gamertag}
                                    onChange={handleChange}
                                    className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500"
                                    placeholder="e.g. Ishiro"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                                    Real Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500"
                                    placeholder="e.g. Reynolds"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="rank" className="block text-sm font-medium text-slate-300">
                                    Rank
                                </label>
                                <select
                                    id="rank"
                                    name="rank"
                                    value={formData.rank}
                                    onChange={handleChange}
                                    className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-white focus:border-violet-500 focus:ring-violet-500"
                                >
                                    <option value="Tekken God Supreme">Tekken God Supreme</option>
                                    <option value="Tekken King">Tekken King</option>
                                    <option value="Tekken Emperor">Tekken Emperor</option>
                                    <option value="God of Destruction">God of Destruction</option>
                                    <option value="Community Manager">Community Manager</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Social Media</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="twitter" className="block text-sm font-medium text-slate-300">Twitter (X)</label>
                                <input
                                    type="text" id="twitter" name="twitter"
                                    value={formData.socials.twitter} onChange={handleSocialChange}
                                    className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500"
                                    placeholder="#"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="twitch" className="block text-sm font-medium text-slate-300">Twitch</label>
                                <input
                                    type="text" id="twitch" name="twitch"
                                    value={formData.socials.twitch} onChange={handleSocialChange}
                                    className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500"
                                    placeholder="#"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="youtube" className="block text-sm font-medium text-slate-300">YouTube</label>
                                <input
                                    type="text" id="youtube" name="youtube"
                                    value={formData.socials.youtube} onChange={handleSocialChange}
                                    className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500"
                                    placeholder="#"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="instagram" className="block text-sm font-medium text-slate-300">Instagram</label>
                                <input
                                    type="text" id="instagram" name="instagram"
                                    value={formData.socials.instagram} onChange={handleSocialChange}
                                    className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500"
                                    placeholder="#"
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
                        <ImageUpload
                            value={formData.playerImage}
                            onChange={handleImageChange}
                            label="Profile Picture"
                        />
                        <div className="space-y-2 pt-2 border-t border-slate-800">
                            <label htmlFor="playerImage" className="block text-xs font-medium text-slate-500">
                                Or enter URL manually
                            </label>
                            <input
                                type="text"
                                id="playerImage"
                                name="playerImage"
                                value={formData.playerImage} // Use main field for manual input too
                                onChange={handleChange}
                                className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-xs text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500"
                                placeholder="/zenith/players/..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
