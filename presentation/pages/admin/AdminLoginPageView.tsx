"use client";

import { login } from "@/app/actions/auth";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";

/**
 * Vue de la page de connexion admin.
 * Importée et utilisée par app/admin/login/page.tsx.
 */
export default function AdminLoginPageView() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const result = await login(formData);
            if (result?.error) {
                setError(result.error);
            } else if (result?.token) {
                // Sauvegarde du token dans le localStorage pour les requêtes API
                try {
                    localStorage.setItem("admin_token", result.token);
                    localStorage.setItem("token", result.token);
                } catch {}
                router.push("/admin");
                router.refresh();
            }
        });
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4">
            <div className="w-full max-w-sm space-y-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-sm">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-4 rounded-full bg-violet-500/10 p-4">
                        <Lock className="h-8 w-8 text-violet-500" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">
                        Accès Administration
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Entrez vos identifiants pour accéder au panneau d&apos;administration.
                    </p>
                </div>

                <form action={handleSubmit} className="mt-8 space-y-4">
                    {/* Champ Email */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="sr-only">Adresse e-mail</label>
                        <div className="relative">
                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                placeholder="Adresse e-mail"
                                className="block w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                            />
                        </div>
                    </div>

                    {/* Champ Mot de passe */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="sr-only">Mot de passe</label>
                        <div className="relative">
                            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                placeholder="Mot de passe"
                                className="block w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20 text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="mt-2 flex w-full justify-center rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? "Connexion en cours..." : "Se connecter"}
                    </button>
                </form>


            </div>
        </div>
    );
}
