"use client";

import { motion } from "framer-motion";
import { Menu, X, Gamepad2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const navItems = [
    { name: "Home", href: "#" },
    { name: "Team", href: "#team" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-black/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse z-50">
                        <div className="p-2 bg-violet-600 rounded-lg shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                            <Gamepad2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white tracking-wider uppercase font-sans">
                            Zenith <span className="text-violet-500">E-Sport</span>
                        </span>
                    </Link>

                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>

                    <div
                        className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? "block" : "hidden"
                            }`}
                    >
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-white/10 rounded-lg bg-black/80 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="block py-2 px-3 text-gray-300 rounded hover:bg-white/10 md:hover:bg-transparent md:hover:text-violet-400 md:p-0 transition-colors duration-300"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
