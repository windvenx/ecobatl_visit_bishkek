"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Clock, Mountain, Map as MapIcon, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";

const SimpleMap = dynamic(() => import("./Map/SimpleMap"), {
    ssr: false,
    loading: () => <div className="h-[200px] bg-secondary/50 animate-pulse rounded-2xl flex items-center justify-center text-primary/30">Loading map...</div>
});

export default function Routes() {
    const t = useTranslations("Routes");
    const tc = useTranslations("Common");

    const routes = [
        {
            id: 1,
            title: t("cityWalk.title"),
            badge: "Green",
            badgeColor: "bg-accent/10 text-accent border-accent/20",
            stops: [
                t("cityWalk.stops.0"),
                t("cityWalk.stops.1"),
                t("cityWalk.stops.2"),
                t("cityWalk.stops.3"),
                t("cityWalk.stops.4"),
                t("cityWalk.stops.5")
            ],
            duration: t("cityWalk.duration"),
            difficulty: t("cityWalk.difficulty"),
            cost: "~500 KGS",
            center: [42.875, 74.605] as [number, number],
            zoom: 13,
        },
        {
            id: 2,
            title: t("greenBishkek.title"),
            badge: "Teal",
            badgeColor: "bg-primary/10 text-primary border-primary/20",
            stops: [
                t("greenBishkek.stops.0"),
                t("greenBishkek.stops.1"),
                t("greenBishkek.stops.2"),
                t("greenBishkek.stops.3")
            ],
            duration: t("greenBishkek.duration"),
            difficulty: t("greenBishkek.difficulty"),
            cost: "~800 KGS",
            center: [42.75, 74.55] as [number, number],
            zoom: 11,
        },
        {
            id: 3,
            title: t("streetArt.title"),
            badge: "Orange",
            badgeColor: "bg-orange-500/10 text-orange-600 border-orange-500/20",
            stops: [
                t("streetArt.stops.0"),
                t("streetArt.stops.1"),
                t("streetArt.stops.2"),
                t("streetArt.stops.3"),
                t("streetArt.stops.4")
            ],
            duration: t("streetArt.duration"),
            difficulty: t("streetArt.difficulty"),
            cost: "~300 KGS",
            center: [42.87, 74.58] as [number, number],
            zoom: 14,
        },
    ];

    return (
        <section id="routes" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">{t("title")}</h2>
                    <p className="text-gray-600">{t("desc")}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {routes.map((route, i) => (
                        <motion.div
                            key={route.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-[2.5rem] border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                        >
                            <div className="p-2">
                                <SimpleMap center={route.center} zoom={route.zoom} />
                            </div>

                            <div className="p-8 pt-4 flex-grow flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-primary">{route.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${route.badgeColor}`}>
                                        {route.badge}
                                    </span>
                                </div>

                                <div className="space-y-3 mb-6 flex-grow">
                                    <div className="flex items-center text-sm font-medium text-gray-500">
                                        <Clock size={16} className="mr-2" />
                                        <span>{route.duration}</span>
                                        <span className="mx-2 text-gray-300">|</span>
                                        <Mountain size={16} className="mr-2" />
                                        <span>{route.difficulty}</span>
                                    </div>
                                    <div className="flex items-center text-sm font-medium text-gray-500">
                                        <Wallet size={16} className="mr-2" />
                                        <span>{tc("cost")}: {route.cost}</span>
                                    </div>

                                    <div className="pt-4">
                                        <p className="text-xs font-bold text-primary/40 uppercase tracking-widest mb-2">{tc("stopsLabel")}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {route.stops.map((stop, j) => (
                                                <span key={j} className="text-xs bg-secondary/80 text-primary/80 px-2 py-1 rounded-lg">
                                                    {stop}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl group-hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
                                    <MapIcon size={18} />
                                    <span>{t("viewOnMap")}</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
