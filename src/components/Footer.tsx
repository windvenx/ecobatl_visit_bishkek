import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { Globe, Mail, Link2, Share2 } from "lucide-react";

export default function Footer() {
    const t = useTranslations("Footer");
    const tn = useTranslations("Navbar");

    const quickLinks = [
        { name: tn("safety"), id: "safety" },
        { name: tn("quick"), id: "quick-start" },
        { name: tn("routes"), id: "routes" },
        { name: tn("map"), id: "map" },
        { name: tn("food"), id: "food" },
    ];

    return (
        <footer className="bg-primary text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-6">
                            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                                B
                            </div>
                            <span className="font-bold text-2xl tracking-tight">Visit Bishkek</span>
                        </Link>
                        <p className="text-white/60 max-w-sm mb-8">
                            {t("tagline")}
                        </p>
                        <div className="flex space-x-4">
                            {[Globe, Mail, Link2, Share2].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-accent">{t("quickLinks")}</h4>
                        <ul className="space-y-4 text-white/60">
                            {quickLinks.map((link) => (
                                <li key={link.id}>
                                    <Link href={`#${link.id}`} className="hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-accent">{t("contact")}</h4>
                        <p className="text-white/60 mb-4">
                            ul. Togolok Moldo 1<br />
                            Bishkek, Kyrgyzstan
                        </p>
                        <p className="text-white/60">
                            hello@visitbishkek.kg
                        </p>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
                    <p>{t("rights")}</p>
                    <p className="mt-4 md:mt-0 font-medium">{t("madeBy")}</p>
                </div>
            </div>
        </footer>
    );
}
