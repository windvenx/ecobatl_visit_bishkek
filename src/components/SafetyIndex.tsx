"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, ShieldAlert, Users, PhoneCall } from "lucide-react";

export default function SafetyIndex() {
    const t = useTranslations("Safety");
    const [currentMyth, setCurrentMyth] = useState(0);

    // Get myths from translations
    const mythsCount = 4; // Since we have 4 myths in JSON
    const myths = Array.from({ length: mythsCount }).map((_, i) => ({
        myth: t(`myths.${i}.myth`),
        fact: t(`myths.${i}.fact`),
    }));

    const nextMyth = () => setCurrentMyth((prev) => (prev + 1) % myths.length);
    const prevMyth = () => setCurrentMyth((prev) => (prev - 1 + myths.length) % myths.length);

    return (
        <section id="safety" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t("title")}</h2>
                    <div className="inline-flex flex-col items-center">
                        <div className="text-6xl font-black text-accent mb-2">4.1 / 5</div>
                        <div className="w-64 h-4 bg-secondary rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "82%" }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-accent"
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-2 font-medium">{t("ratingDesc")}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {[
                        { icon: <ShieldAlert className="text-primary" />, title: t("crime"), detail: t("crimeDesc") },
                        { icon: <Users className="text-primary" />, title: t("tourists"), detail: t("touristsDesc") },
                        { icon: <PhoneCall className="text-primary" />, title: t("emergency"), detail: t("emergencyDesc") }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="p-8 bg-secondary/30 rounded-3xl border border-secondary"
                        >
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                                {stat.icon}
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-2">{stat.title}</h3>
                            <p className="text-gray-600">{stat.detail}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Myths vs Facts Carousel */}
                <div className="relative max-w-3xl mx-auto bg-primary rounded-[2rem] p-8 md:p-12 text-white overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <ShieldAlert size={120} />
                    </div>

                    <div className="relative z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentMyth}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="min-h-[200px]"
                            >
                                <div className="inline-block px-3 py-1 bg-accent rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
                                    {t("mythFact")}
                                </div>
                                <h4 className="text-xl md:text-2xl font-bold mb-4 italic text-secondary">
                                    "{myths[currentMyth].myth}"
                                </h4>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    {myths[currentMyth].fact}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex items-center justify-between mt-10">
                            <div className="flex space-x-2">
                                {myths.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 transition-all duration-300 rounded-full ${i === currentMyth ? 'w-8 bg-accent' : 'w-2 bg-white/30'}`}
                                    />
                                ))}
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={prevMyth}
                                    className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextMyth}
                                    className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
