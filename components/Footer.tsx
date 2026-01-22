"use client";

import { Twitter, Twitch, Youtube, Instagram, Gamepad2 } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#020617] text-gray-400 border-t border-white/5 py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Brand */}
                    <div className="flex items-center space-x-2">
                        <div className="p-2 bg-violet-600 rounded-lg">
                            <Gamepad2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-wider uppercase">
                            Zenith <span className="text-violet-500">E-Sport</span>
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex gap-8 text-sm font-medium">
                        <Link href="#" className="hover:text-violet-400 transition-colors">Home</Link>
                        <Link href="#team" className="hover:text-violet-400 transition-colors">Team</Link>
                        <Link href="#about" className="hover:text-violet-400 transition-colors">About</Link>
                        <Link href="#" className="hover:text-violet-400 transition-colors">Contact</Link>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-violet-600 hover:text-white transition-all duration-300">
                            <Twitter size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-violet-600 hover:text-white transition-all duration-300">
                            <Twitch size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-violet-600 hover:text-white transition-all duration-300">
                            <Youtube size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-violet-600 hover:text-white transition-all duration-300">
                            <Instagram size={18} />
                        </a>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-gray-600">
                    &copy; {new Date().getFullYear()} Zenith E-Sport. All rights reserved. designed by DeepMind.
                </div>
            </div>
        </footer>
    );
}
