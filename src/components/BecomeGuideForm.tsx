"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, Phone, User, Mail, MessageSquare } from "lucide-react";

export default function BecomeGuideForm() {
    const t = useTranslations("Guides");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        experience: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("guide_applications").insert([formData]);

        if (error) {
            alert(error.message);
            setLoading(false);
        } else {
            setSubmitted(true);
            setLoading(false);
        }
    };

    return (
        <section id="become-guide" className="py-20 bg-secondary/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatePresence mode="wait">
                    {!submitted ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
                        >
                            <div className="bg-primary p-12 text-white md:w-1/3 flex flex-col justify-center">
                                <h2 className="text-3xl font-bold mb-6">{t("becomeGuide")}</h2>
                                <p className="text-primary-foreground/80 leading-relaxed mb-8">
                                    Join our community of local enthusiasts. Show your city, make friends, and earn!
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 text-sm">
                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">1</div>
                                        <span>Fill the application</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-sm">
                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">2</div>
                                        <span>Pass a short interview</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-sm">
                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">3</div>
                                        <span>Start hosting tours!</span>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-12 md:w-2/3 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-primary/40 uppercase tracking-widest pl-2">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/20" size={18} />
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full pl-12 pr-6 py-4 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-primary/10"
                                                placeholder="Adilet Amanov"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-primary/40 uppercase tracking-widest pl-2">Phone</label>
                                        <div className="relative">
                                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/20" size={18} />
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full pl-12 pr-6 py-4 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-primary/10"
                                                placeholder="+996 555 123 456"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-primary/40 uppercase tracking-widest pl-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/20" size={18} />
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full pl-12 pr-6 py-4 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-primary/10"
                                            placeholder="adilet@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-primary/40 uppercase tracking-widest pl-2">Brief Experience</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-5 top-5 text-primary/20" size={18} />
                                        <textarea
                                            required
                                            value={formData.experience}
                                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                            className="w-full pl-12 pr-6 py-4 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-primary/10 min-h-[120px]"
                                            placeholder="Tell us about yourself and why you want to be a guide..."
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-5 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 disabled:opacity-50"
                                >
                                    <Send size={18} />
                                    <span>{loading ? "Sending..." : "Submit Application"}</span>
                                </button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-[3.5rem] p-20 text-center shadow-2xl border border-primary/5"
                        >
                            <div className="w-24 h-24 bg-green-500 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-green-200">
                                <CheckCircle2 size={48} />
                            </div>
                            <h2 className="text-4xl font-bold text-primary mb-4">Application Sent!</h2>
                            <p className="text-gray-500 text-lg max-w-md mx-auto line-clamp-2">
                                Thank you for your interest! Our team will review your application and contact you soon via email or phone.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
