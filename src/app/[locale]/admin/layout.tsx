import { requireAdmin, getCurrentUser } from "@/lib/auth";
import { LayoutDashboard, MapPin, Route, Users, FileText } from "lucide-react";
import { Link } from "@/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    await requireAdmin();
    const user = await getCurrentUser();

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
        { name: "Places", href: "/admin/places", icon: <MapPin size={20} /> },
        { name: "Routes", href: "/admin/routes", icon: <Route size={20} /> },
        { name: "Guides", href: "/admin/guides", icon: <Users size={20} /> },
        { name: "Applications", href: "/admin/applications", icon: <FileText size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-secondary/30 flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-primary/5 flex flex-col p-6">
                <div className="flex items-center space-x-2 mb-10 px-4">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        B
                    </div>
                    <span className="font-bold text-xl tracking-tight text-primary">Admin</span>
                </div>

                <nav className="flex-grow space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-primary/60 hover:text-primary hover:bg-secondary/70 font-medium transition-all"
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto border-t border-primary/5 pt-4">
                    <div className="px-4 py-2 mb-2 text-sm text-gray-500 font-medium break-all">
                        {user?.email}
                    </div>
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-10 overflow-auto">
                {children}
            </main>
        </div>
    );
}
