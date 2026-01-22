"use client";

import { motion } from "framer-motion";
import { Trophy, Target, Zap } from "lucide-react";

export default function About() {
    return (
        <section id="about" className="py-24 bg-[#0f172a] relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-violet-500 font-bold tracking-widest uppercase mb-2 block">Our Mission</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                            Redefining the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">Competitive Metal</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                            Zenith E-Sport was founded on a simple principle: perfection in execution. We are a collective of elite Tekken players dedicated to pushing the boundaries of what's possible in the Iron Fist Tournament.
                        </p>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            From local brackets to the world stage, our team embodies discipline, strategy, and the relentless will to win. We don't just play the game; we study it, break it, and master it.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="bg-black/20 p-4 rounded-lg border border-violet-500/20">
                                <Trophy className="text-violet-500 mb-2" size={32} />
                                <h4 className="font-bold text-white mb-1">Elite Talent</h4>
                                <p className="text-sm text-gray-500">Top ranked competitors globally.</p>
                            </div>
                            <div className="bg-black/20 p-4 rounded-lg border border-violet-500/20">
                                <Target className="text-violet-500 mb-2" size={32} />
                                <h4 className="font-bold text-white mb-1">Precision</h4>
                                <p className="text-sm text-gray-500">Frame-perfect execution.</p>
                            </div>
                            <div className="bg-black/20 p-4 rounded-lg border border-violet-500/20">
                                <Zap className="text-violet-500 mb-2" size={32} />
                                <h4 className="font-bold text-white mb-1">Community</h4>
                                <p className="text-sm text-gray-500">Inspiring the next generation.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-violet-600 blur-[80px] opacity-20"></div>
                        {/* Visual Placeholder for Team Image or Abstract Graphic */}
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2671&auto=format&fit=crop"
                                alt="Esports Arena"
                                className="w-full h-auto object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-2xl font-bold text-white">Join the Legacy</h3>
                                <p className="text-violet-300">#ZenithRising</p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
