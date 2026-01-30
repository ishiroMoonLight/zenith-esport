"use client";

import { login } from "@/app/actions/auth";
import { useState, useTransition } from "react";
import { Lock } from "lucide-react";

export default function LoginPage() {
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const result = await login(formData);
            if (result?.error) {
                setError(result.error);
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
                        Admin Access
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Enter your password to access the backoffice.
                    </p>
                </div>

                <form action={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Password"
                            className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                        />
                    </div>

                    {error && (
                        <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20 text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex w-full justify-center rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? "Authenticating..." : "Sign in"}
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-xs text-slate-600">
                        Hint: The password is <span className="font-mono">zenith</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
