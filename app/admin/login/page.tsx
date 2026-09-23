import type { Metadata } from "next";
import AdminLoginPageView from "@/presentation/pages/admin/AdminLoginPageView";

export const metadata: Metadata = {
  title: "Connexion Administration",
};

export default function LoginPage() {
    return <AdminLoginPageView />;
}

