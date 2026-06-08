"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ShieldCheck, MapIcon as MapIconLucide } from "lucide-react";

export default function Hero() {
    const t = useTranslations("Hero");

    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background Gradient / Illustration placeholder */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl md:text-7xl font-extrabold text-primary tracking-tight mb-6"
                    >
                        {t("title1")}<br />
                        <span className="text-accent underline decoration-secondary">{t("titleSafe")}</span>{t("titleRemaining")}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10"
                    >
                        {t("subtitle")}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                    >
                        <a
                            href="#safety"
                            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                        >
                            <ShieldCheck size={20} />
                            <span>{t("isItSafe")}</span>
                        </a>
                        <a
                            href="#routes"
                            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-secondary text-primary font-bold rounded-2xl hover:bg-secondary/80 transition-all"
                        >
                            <MapIconLucide size={20} />
                            <span>{t("startExploring")}</span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
