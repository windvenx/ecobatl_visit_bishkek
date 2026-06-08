"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft, Save } from "lucide-react";

export default function NewPlace() {
    const t = useTranslations("Admin");
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: { en: "", ru: "", ky: "" },
        category: "Food",
        lat: "",
        lng: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await getSupabase().from("places").insert([{
            name: formData.name,
            category: formData.category,
            coordinates: `(${formData.lat},${formData.lng})` // Supabase POINT format
        }]);

        if (error) {
            alert(error.message);
            setLoading(false);
        } else {
            router.push("/admin/places");
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-primary/40 hover:text-primary mb-6 transition-colors"
            >
                <ArrowLeft size={20} />
                <span>Back to list</span>
            </button>

            <div className="bg-white rounded-[2.5rem] border border-primary/5 shadow-sm p-10">
                <h1 className="text-3xl font-bold text-primary mb-10">{t("addPlace")}</h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-primary/60 mb-2 uppercase tracking-wider">Name (EN)</label>
                            <input
                                type="text"
                                value={formData.name.en}
                                onChange={(e) => setFormData({ ...formData, name: { ...formData.name, en: e.target.value } })}
                                className="w-full px-6 py-4 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-primary/60 mb-2 uppercase tracking-wider">Name (RU)</label>
                            <input
                                type="text"
                                value={formData.name.ru}
                                onChange={(e) => setFormData({ ...formData, name: { ...formData.name, ru: e.target.value } })}
                                className="w-full px-6 py-4 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-primary/60 mb-2 uppercase tracking-wider">Name (KY)</label>
                            <input
                                type="text"
                                value={formData.name.ky}
                                onChange={(e) => setFormData({ ...formData, name: { ...formData.name, ky: e.target.value } })}
                                className="w-full px-6 py-4 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-primary/60 mb-2 uppercase tracking-wider">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-6 py-4 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                            >
                                <option>Food</option>
                                <option>Parks</option>
                                <option>Emergency</option>
                                <option>Culture</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-primary/60 mb-2 uppercase tracking-wider">Latitude</label>
                            <input
                                type="text"
                                value={formData.lat}
                                onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                                placeholder="42.875"
                                className="w-full px-6 py-4 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-primary/60 mb-2 uppercase tracking-wider">Longitude</label>
                            <input
                                type="text"
                                value={formData.lng}
                                onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                                placeholder="74.605"
                                className="w-full px-6 py-4 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center space-x-2 px-10 py-5 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                        >
                            <Save size={20} />
                            <span>{loading ? "Saving..." : t("save")}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
