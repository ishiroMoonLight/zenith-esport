import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Only protect /admin routes
    if (request.nextUrl.pathname.startsWith("/admin")) {

        // Ignore the login page itself
        if (request.nextUrl.pathname === "/admin/login") {
            // If already logged in, redirect to dashboard
            if (request.cookies.has("admin_session")) {
                return NextResponse.redirect(new URL("/admin", request.url));
            }
            return NextResponse.next();
        }

        // Check for auth cookie
        const authCookie = request.cookies.get("admin_session");

        if (!authCookie) {
            // Redirect to login if not authenticated
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/admin/:path*",
};
