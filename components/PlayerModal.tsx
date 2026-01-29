"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Twitter, Twitch, Youtube, Instagram, Trophy } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Define the Player interface based on the data structure
export interface Player {
    id: number;
    gamertag: string;
    name: string;
    mains: {
        character: string;
        characterImage: string;
    }[];
    rank: string;
    playerImage: string;
    socials: {
        twitter?: string;
        twitch?: string;
        youtube?: string;
        instagram?: string;
    };
}

interface PlayerModalProps {
    isOpen: boolean;
    onClose: () => void;
    player: Player | null;
}

export default function PlayerModal({ isOpen, onClose, player }: PlayerModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted || !player) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[90] flex items-center justify-center p-4 cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed z-[100] w-full max-w-4xl bg-slate-900/90 border border-violet-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-violet-900/20 max-h-[90vh] overflow-y-auto md:flex md:flex-row flex-col pointer-events-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/40 hover:bg-violet-600 rounded-full text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {/* Left Side: Player Image */}
                        <div className="md:w-1/2 relative h-64 md:h-auto min-h-[400px] overflow-hidden group">
                            <div className="absolute inset-0 bg-violet-600/20 mix-blend-overlay z-10"></div>
                            {/* Gradient Overlay for Text Visibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10 md:hidden"></div>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <Image
                                src={player.playerImage}
                                alt={player.gamertag}
                                width={300}
                                height={300}
                                className="w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        {/* Right Side: Player Info */}
                        <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center relative bg-gradient-to-b from-slate-900 to-slate-950">
                            {/* Decorative Background Element */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                            <div className="mb-2">
                                <span className="text-violet-400 font-bold tracking-widest text-sm uppercase flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-violet-400 inline-block"></span>
                                    {player.name}
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-4 text-shadow-glow">
                                {player.gamertag}
                            </h2>

                            <div className="flex items-center gap-2 mb-8 bg-white/5 w-fit px-4 py-2 rounded-lg border border-white/10">
                                <Trophy className="text-yellow-500" size={20} />
                                <span className="text-slate-200 font-medium">{player.rank}</span>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-white/60 text-sm uppercase tracking-wider font-bold mb-3">Mains</h3>
                                    <div className="flex gap-4 flex-wrap">
                                        {player.mains.map((main, idx) => (
                                            <div key={idx} className="flex flex-col items-center">
                                                <div className="w-16 h-16 rounded-full border-2 border-violet-500/50 overflow-hidden relative group/char">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={main.characterImage}
                                                        alt={main.character}
                                                        className="object-cover"
                                                        width={64}
                                                        height={64}
                                                    />
                                                    <div className="absolute inset-0 bg-violet-600/0 group-hover/char:bg-violet-600/20 transition-colors"></div>
                                                </div>
                                                <span className="text-xs text-center text-slate-400 mt-1 max-w-[80px] leading-tight">
                                                    {main.character}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-white/60 text-sm uppercase tracking-wider font-bold mb-3">Follow</h3>
                                    <div className="flex gap-4">
                                        {player.socials.twitter && (
                                            <a href={player.socials.twitter} className="p-3 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1DA1F2] transition-all hover:scale-110">
                                                <Twitter size={20} />
                                            </a>
                                        )}
                                        {player.socials.twitch && (
                                            <a href={player.socials.twitch} className="p-3 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-[#9146FF] transition-all hover:scale-110">
                                                <Twitch size={20} />
                                            </a>
                                        )}
                                        {player.socials.youtube && (
                                            <a href={player.socials.youtube} className="p-3 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-[#FF0000] transition-all hover:scale-110">
                                                <Youtube size={20} />
                                            </a>
                                        )}
                                        {player.socials.instagram && (
                                            <a href={player.socials.instagram} className="p-3 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45] transition-all hover:scale-110">
                                                <Instagram size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
