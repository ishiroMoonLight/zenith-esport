"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const password = formData.get("password") as string;

    // Hardcoded for simplicity as requested.
    // In production, use env variable: process.env.ADMIN_PASSWORD
    if (password === "zenith") {
        // Set HTTP-only cookie
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        redirect("/admin");
    }

    return { error: "Invalid password" };
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    redirect("/admin/login");
}
