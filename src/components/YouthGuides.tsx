"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { UserPlus, Star } from "lucide-react";

export default function YouthGuides() {
    const t = useTranslations("Guides");

    const guides = [
        { name: "Aisuluu", age: 24, specialty: t("specialties.architecture"), color: "bg-blue-100" },
        { name: "Bakyt", age: 22, specialty: t("specialties.food"), color: "bg-orange-100" },
        { name: "Daniyar", age: 25, specialty: t("specialties.nature"), color: "bg-green-100" },
        { name: "Meerim", age: 23, specialty: t("specialties.art"), color: "bg-purple-100" },
        { name: "Uran", age: 26, specialty: t("specialties.night"), color: "bg-red-100" },
        { name: "Begimay", age: 22, specialty: t("specialties.history"), color: "bg-teal-100" },
    ];

    return (
        <section id="guides" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">{t("title")}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{t("desc")}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {guides.map((guide, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -10 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-[2.5rem] p-6 border border-primary/5 shadow-sm hover:shadow-xl transition-all"
                        >
                            <div className={`w-full aspect-square ${guide.color} rounded-[2rem] mb-6 flex items-center justify-center text-primary/20 overflow-hidden relative`}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="text-6xl font-bold">{guide.name[0]}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-xl font-bold text-primary">{guide.name}, {guide.age}</h3>
                                <div className="flex items-center text-orange-400">
                                    <Star size={14} fill="currentColor" />
                                    <span className="text-xs font-bold ml-1">NEW</span>
                                </div>
                            </div>
                            <p className="text-gray-500 font-medium">{guide.specialty}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <a href="#become-guide" className="inline-flex items-center space-x-2 px-10 py-5 bg-accent text-white font-bold rounded-2xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20">
                        <UserPlus size={20} />
                        <span>{t("becomeGuide")}</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
