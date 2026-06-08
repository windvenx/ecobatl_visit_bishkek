"use client";

import { useState } from "react";
import { Link, useRouter, usePathname } from "@/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Languages, Menu, X } from "lucide-react";

export default function Navbar() {
    const t = useTranslations("Navbar");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const nextLocale = locale === "en" ? "ru" : locale === "ru" ? "ky" : "en";

    const switchLocale = () => {
        router.replace(pathname, { locale: nextLocale });
        localStorage.setItem("user-locale", nextLocale);
    };

    const navLinks = [
        { name: t("safety"), href: "#safety" },
        { name: t("quick"), href: "#quick-start" },
        { name: t("routes"), href: "#routes" },
        { name: t("map"), href: "#map" },
        { name: t("food"), href: "#food" },
        { name: t("guides"), href: "#guides" },
    ];

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-primary/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                B
                            </div>
                            <span className="font-bold text-xl text-primary tracking-tight">Visit Bishkek</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={switchLocale}
                            className="flex items-center space-x-1 px-3 py-1 rounded-full bg-secondary text-primary font-bold text-xs hover:bg-secondary/80 transition-colors uppercase"
                        >
                            <Languages size={14} />
                            <span>{locale}</span>
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button
                            onClick={switchLocale}
                            className="flex items-center space-x-1 px-3 py-1 rounded-full bg-secondary text-primary font-bold text-xs uppercase"
                        >
                            <Languages size={14} />
                            <span>{locale}</span>
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-primary p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-primary/10 animate-in slide-in-from-top duration-300">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-secondary/30 rounded-md"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
