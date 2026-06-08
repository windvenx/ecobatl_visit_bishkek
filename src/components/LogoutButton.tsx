"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "@/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh(); // Refresh to trigger server re-evaluation
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-medium transition-all w-full text-left"
        >
            <LogOut size={20} />
            <span>Logout</span>
        </button>
    );
}
