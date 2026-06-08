"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Smartphone, Car, Banknote, Phone, Hospital, Coins, Info } from "lucide-react";

export default function QuickStart() {
    const t = useTranslations("QuickStart");

    const items = [
        { icon: <Smartphone />, text: t("items.sim") },
        { icon: <Car />, text: t("items.taxi") },
        { icon: <Banknote />, text: t("items.money") },
        { icon: <Phone />, text: t("items.emergency") },
        { icon: <Hospital />, text: t("items.hospital") },
        { icon: <Coins />, text: t("items.currency") },
    ];

    return (
        <section id="quick-start" className="py-20 bg-secondary/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">{t("title")}</h2>
                    <p className="text-gray-600">{t("desc")}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start p-6 bg-white rounded-2xl shadow-sm border border-primary/5 hover:shadow-md transition-shadow"
                        >
                            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mr-4">
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 leading-relaxed">{item.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 flex items-center justify-center">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium border border-primary/10">
                        <Info size={16} />
                        <span>{t("offlineNote")}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
