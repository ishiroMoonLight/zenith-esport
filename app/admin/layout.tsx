import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-950">
            <AdminSidebar />

            <div className="p-4 sm:ml-64">
                <div className="min-h-[calc(100vh-2rem)] rounded-2xl border-2 border-dashed border-slate-800 p-4 sm:p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
