"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_BASE_URL } from "@/infrastructure/config/apiConfig";

interface LoginApiResponse {
    success: boolean;
    data: {
        token: string;
        admin: {
            id: string;
            email: string;
        };
    };
    message: string;
}

export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Veuillez remplir tous les champs." };
    }

    let data: LoginApiResponse;

    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const body = await response.json() as LoginApiResponse;

        if (!response.ok || !body.success) {
            return { error: body.message ?? "Identifiants incorrects." };
        }

        data = body;
    } catch {
        return { error: "Impossible de contacter le serveur. Réessayez." };
    }

    // Stocker le JWT dans un cookie pour la protection des routes Next.js (middleware)
    const cookieStore = await cookies();
    cookieStore.set("admin_token", data.data.token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 jours
        path: "/",
    });

    return { success: true, token: data.data.token };
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_token");
    redirect("/admin/login");
}
