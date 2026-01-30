"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, FileText, PlusCircle, Settings, LogOut, User } from "lucide-react";

export function AdminSidebar() {
    const pathname = usePathname();

    const links = [
        { href: "/admin", label: "Blogs", icon: FileText },
        { href: "/admin/players", label: "Players", icon: User },
    ];

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-slate-800 bg-slate-950 transition-transform sm:translate-x-0">
            <div className="flex h-full flex-col overflow-y-auto px-3 py-4">
                <Link href="/admin" className="mb-8 flex items-center pl-2.5">
                    <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
                        Zenith <span className="text-violet-500">Admin</span>
                    </span>
                </Link>

                <ul className="space-y-2 font-medium">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`flex items-center rounded-lg p-2 group transition-colors ${isActive
                                        ? "bg-violet-600/20 text-violet-400"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                        }`}
                                >
                                    <Icon className={`h-5 w-5 transition duration-75 ${isActive ? "text-violet-400" : "text-slate-500 group-hover:text-white"}`} />
                                    <span className="ms-3">{link.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-auto pt-4 border-t border-slate-800">
                    <Link
                        href="/"
                        className="flex items-center rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white group transition-colors mb-2"
                    >
                        <Home className="h-5 w-5 text-slate-500 transition duration-75 group-hover:text-white" />
                        <span className="ms-3">View Site</span>
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white group transition-colors"
                    >
                        <LogOut className="h-5 w-5 text-slate-500 transition duration-75 group-hover:text-white" />
                        <span className="ms-3">Sign Out</span>
                    </Link>
                </div>
            </div>
        </aside>
    );
}
