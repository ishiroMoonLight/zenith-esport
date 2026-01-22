"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#2e1065]/70 to-[#020617]/40 z-10"></div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10 pointer-events-none"></div>

            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-violet-500/20 border border-violet-500/50 text-violet-300 text-sm font-medium tracking-widest mb-6 uppercase backdrop-blur-sm">
                        Next Gen Fighting
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-violet-300 tracking-tighter drop-shadow-[0_0_25px_rgba(139,92,246,0.3)] mb-6">
                        ZENITH <br /> <span className="text-stroke-violet text-white/10">E-SPORT</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Rise to the challenge. Dominate the arena. <br />
                        The elite Tekken collective redefining competitive gaming.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(124,58,237,0.5)] flex items-center gap-2 group">
                            Meet the Roster
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </button>
                        <button className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-white font-medium rounded-full transition-all duration-300 backdrop-blur-sm">
                            Latest Matches
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020617] to-transparent z-20"></div>
        </section>
    );
}
