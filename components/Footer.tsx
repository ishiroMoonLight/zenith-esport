"use client";

import { Twitter, Twitch, Youtube, Instagram, Facebook } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#020617] text-gray-400 border-t border-white/5 py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Brand */}
                    <div className="flex items-center space-x-2">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                            <Image
                                src="/zenith/logo.jpg"
                                alt="Zenith E-Sport Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="text-xl font-bold text-white tracking-wider uppercase">
                            Zenith <span className="text-violet-500">E-Sport</span>
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex gap-8 text-sm font-medium">
                        <Link href="/" className="hover:text-violet-400 transition-colors">Accueil</Link>
                        <Link href="/roster" className="hover:text-violet-400 transition-colors">Roster</Link>
                        <Link href="/about" className="hover:text-violet-400 transition-colors">À propos</Link>
                        <Link href="/blog" className="hover:text-violet-400 transition-colors">Blog</Link>
                    </div>


                </div>

                <div className="mt-8 text-center text-xs text-gray-600">
                    &copy; {new Date().getFullYear()} Zenith E-Sport. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
