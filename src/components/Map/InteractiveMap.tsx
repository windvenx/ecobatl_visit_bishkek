"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
    ssr: false,
    loading: () => <div className="h-[300px] md:h-[500px] bg-secondary/50 animate-pulse rounded-[3rem] flex items-center justify-center text-primary/30 text-xl font-bold border-8 border-white">Initializing Map...</div>
});

const PLACES = [
    { id: 1, name: "Площадь Ала-Тоо", category: "attractions", lat: 42.8740, lng: 74.5944, hours: "Круглосуточно", desc: "Главная площадь города" },
    { id: 2, name: "Дубовый парк", category: "parks", lat: 42.8778, lng: 74.5756, hours: "8:00-22:00", desc: "Любимый парк жителей центра" },
    { id: 3, name: "Ош Базар", category: "food", lat: 42.8712, lng: 74.5511, hours: "7:00-19:00", desc: "Крупнейший рынок города" },
    { id: 4, name: "Нацбольница", category: "emergency", lat: 42.8756, lng: 74.5893, hours: "Круглосуточно", desc: "Национальная больница", phone: "103" },
    { id: 5, name: "Ала-Арча (въезд)", category: "parks", lat: 42.6394, lng: 74.4957, hours: "8:00-20:00", desc: "Национальный парк, 40 км от центра" },
    { id: 6, name: "Дордой Базар", category: "food", lat: 42.9089, lng: 74.6312, hours: "7:00-18:00", desc: "Крупнейший рынок в ЦА" },
    { id: 7, name: "Филармония", category: "attractions", lat: 42.8756, lng: 74.5958, hours: "10:00-19:00", desc: "Главный концертный зал" },
    { id: 8, name: "Парк Горького", category: "parks", lat: 42.8764, lng: 74.5825, hours: "9:00-21:00", desc: "Парк с аттракционами" },
    { id: 9, name: "Скорая помощь", category: "emergency", lat: 42.8672, lng: 74.5693, hours: "Круглосуточно", desc: "Станция скорой помощи", phone: "103" },
    { id: 10, name: "Бета Сторес", category: "food", lat: 42.8731, lng: 74.5700, hours: "9:00-22:00", desc: "Торговый центр с едой" }
];

export default function InteractiveMap() {
    const t = useTranslations("Map");
    const [filter, setFilter] = useState("all");

    const filterOptions = [
        { id: "all", label: "Все" },
        { id: "food", label: "Еда" },
        { id: "parks", label: "Парки" },
        { id: "emergency", label: "Помощь" },
        { id: "attractions", label: "Достопримечательности" },
    ];

    return (
        <section id="map" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{t("title") || "Интерактивная карта"}</h2>

                <div className="flex flex-wrap items-center justify-center gap-3">
                    {filterOptions.map(opt => (
                        <button
                            key={opt.id}
                            onClick={() => setFilter(opt.id)}
                            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${filter === opt.id
                                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                                    : "bg-secondary text-primary/70 hover:bg-secondary/70 hover:text-primary"
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
                <LeafletMap places={PLACES} filter={filter} />
            </div>
        </section>
    );
}
