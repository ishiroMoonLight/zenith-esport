"use client";

import { motion } from "framer-motion";
import { Twitter, Twitch, Youtube, Instagram } from "lucide-react";
import Image from "next/image";

const players = [
    {
        id: 1,
        gamertag: "VoidWalker",
        name: "Alex Mercer",
        main: "Kazuya Mishima",
        rank: "God of Destruction",
        image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=2600&auto=format&fit=crop", // Placeholder
        socials: { twitter: "#", twitch: "#" }
    },
    {
        id: 2,
        gamertag: "NeonStrike",
        name: "Sarah Lin",
        main: "Reina",
        rank: "Tekken God Supreme",
        image: "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=2574&auto=format&fit=crop", // Placeholder
        socials: { twitter: "#", youtube: "#" }
    },
    {
        id: 3,
        gamertag: "IronFist",
        name: "Marcus King",
        main: "King",
        rank: "Tekken God Omega",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop", // Placeholder
        socials: { twitter: "#", twitch: "#", instagram: "#" }
    },
    {
        id: 4,
        gamertag: "ShadowStep",
        name: "Kenji Sato",
        main: "Jin Kazama",
        rank: "Bushin",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2574&auto=format&fit=crop", // Placeholder
        socials: { twitter: "#", twitch: "#" }
    }
];

export default function Roster() {
    return (
        <section id="team" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-900/10 rounded-full blur-[100px]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-4">
                        Active <span className="text-violet-500">Roster</span>
                    </h2>
                    <div className="w-24 h-1 bg-violet-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {players.map((player, index) => (
                        <motion.div
                            key={player.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            className="group relative bg-[#0f172a] rounded-xl overflow-hidden border border-white/5 hover:border-violet-500/50 transition-colors duration-300"
                        >
                            <div className="relative h-80 w-full overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10"></div>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={player.image}
                                    alt={player.gamertag}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                            </div>

                            <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                                <span className="text-violet-400 text-xs font-bold tracking-wider uppercase mb-1 block">
                                    {player.name}
                                </span>
                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">{player.gamertag}</h3>
                                <p className="text-sm text-gray-400 mb-4">Main: <span className="text-white font-medium">{player.main}</span></p>

                                <div className="flex gap-3 pt-4 border-t border-white/10">
                                    {player.socials.twitter && (
                                        <a href={player.socials.twitter} className="text-gray-400 hover:text-sky-500 transition-colors"><Twitter size={18} /></a>
                                    )}
                                    {player.socials.twitch && (
                                        <a href={player.socials.twitch} className="text-gray-400 hover:text-violet-500 transition-colors"><Twitch size={18} /></a>
                                    )}
                                    {player.socials.youtube && (
                                        <a href={player.socials.youtube} className="text-gray-400 hover:text-red-500 transition-colors"><Youtube size={18} /></a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
