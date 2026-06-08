"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Utensils, Info, CheckCircle2 } from "lucide-react";

export default function FoodCulture() {
    const t = useTranslations("FoodCulture");

    const foods = [
        { name: t("foods.beshbarmak.name"), desc: t("foods.beshbarmak.desc"), price: "~300 KGS" },
        { name: t("foods.laghman.name"), desc: t("foods.laghman.desc"), price: "~150 KGS" },
        { name: t("foods.samsa.name"), desc: t("foods.samsa.desc"), price: "~50 KGS" },
        { name: t("foods.kumys.name"), desc: t("foods.kumys.desc"), price: "Varies" },
    ];

    const tipsCount = 5;
    const tips = Array.from({ length: tipsCount }).map((_, i) => t(`tips.${i}`));

    return (
        <section id="food" className="py-20 bg-secondary/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">{t("title")}</h2>
                    <p className="text-gray-600">{t("desc")}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Must Try Food */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-primary/5"
                    >
                        <div className="flex items-center space-x-3 mb-8 text-primary">
                            <Utensils size={24} />
                            <h3 className="text-2xl font-bold">{t("mustTry")}</h3>
                        </div>
                        <div className="space-y-6">
                            {foods.map((food, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div>
                                        <h4 className="font-bold text-primary">{food.name}</h4>
                                        <p className="text-sm text-gray-500">{food.desc}</p>
                                    </div>
                                    <span className="font-bold text-accent text-sm">{food.price}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Cultural Tips */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-primary p-8 md:p-10 rounded-[2.5rem] text-white overflow-hidden relative"
                    >
                        <div className="absolute -bottom-10 -right-10 opacity-10">
                            <Info size={200} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center space-x-3 mb-8 text-secondary">
                                <Info size={24} />
                                <h3 className="text-2xl font-bold">{t("culturalTips")}</h3>
                            </div>
                            <ul className="space-y-6">
                                {tips.map((tip, i) => (
                                    <li key={i} className="flex items-start space-x-4">
                                        <CheckCircle2 size={20} className="text-accent flex-shrink-0 mt-1" />
                                        <span className="text-lg text-white/90">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
