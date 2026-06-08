"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function AdminLogin() {
    const t = useTranslations("Admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/admin");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-10 border border-primary/5">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
                        B
                    </div>
                    <h1 className="text-2xl font-bold text-primary">{t("loginTitle")}</h1>
                    <p className="text-gray-500">{t("loginDesc")}</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-primary/60 mb-2 uppercase tracking-wider">{t("email")}</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-6 py-4 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="admin@visitbishkek.kg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-primary/60 mb-2 uppercase tracking-wider">{t("password")}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-4 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 text-red-500 text-sm rounded-xl border border-red-100 italic">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                    >
                        {loading ? t("loggingIn") : t("loginButton")}
                    </button>
                </form>
            </div>
        </div>
    );
}
