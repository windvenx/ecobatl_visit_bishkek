"use client";

import { useState } from "react";
import { approveApplication, rejectApplication } from "@/app/actions/applications";
import { Check, X, Eye } from "lucide-react";

export default function ApplicationsTable({ applications }: { applications: any[] }) {
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("all");
    const [selectedApp, setSelectedApp] = useState<any>(null);

    const filteredApps = filter === "all"
        ? applications
        : applications.filter(a => a.status === filter);

    const handleApprove = async (app: any) => {
        if (!confirm(`Одобрить заявку от ${app.name}? Это добавит его в список гидов.`)) return;
        setLoading(true);
        try {
            await approveApplication(app);
            if (selectedApp?.id === app.id) setSelectedApp(null);
        } catch (e: any) {
            alert(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (id: string) => {
        if (!confirm("Отклонить заявку?")) return;
        setLoading(true);
        try {
            await rejectApplication(id);
            if (selectedApp?.id === id) setSelectedApp(null);
        } catch (e: any) {
            alert(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Заявки гидов</h1>
                    <p className="text-gray-500">Управление запросами на становление гидом.</p>
                </div>
                <div className="flex bg-secondary/30 rounded-xl p-1">
                    {["all", "pending", "approved", "rejected"].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-colors ${filter === f ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-primary'}`}
                        >
                            {f === 'all' ? 'Все' : f === 'pending' ? 'Новые' : f === 'approved' ? 'Одобрены' : 'Отклонены'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-primary/5 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-secondary/20 border-b border-primary/5">
                        <tr>
                            <th className="px-8 py-6 font-bold text-primary/60 uppercase text-xs tracking-widest">Имя</th>
                            <th className="px-8 py-6 font-bold text-primary/60 uppercase text-xs tracking-widest">Контакты</th>
                            <th className="px-8 py-6 font-bold text-primary/60 uppercase text-xs tracking-widest">Статус</th>
                            <th className="px-8 py-6 font-bold text-primary/60 uppercase text-xs tracking-widest">Дата</th>
                            <th className="px-8 py-6 font-bold text-primary/60 uppercase text-xs tracking-widest">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredApps.map((app) => (
                            <tr key={app.id} className={`hover:bg-secondary/10 transition-colors ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                                <td className="px-8 py-6 font-bold text-primary">{app.name}</td>
                                <td className="px-8 py-6">
                                    <div className="text-sm text-gray-600">{app.email}</div>
                                    <div className="text-xs text-gray-400 mt-1">{app.phone}</div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${app.status === 'pending' ? 'bg-orange-100 text-orange-600 border-orange-200' :
                                            app.status === 'approved' ? 'bg-green-100 text-green-600 border-green-200' :
                                                'bg-red-100 text-red-600 border-red-200'
                                        }`}>
                                        {app.status}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-sm text-gray-500 font-mono">
                                    {new Date(app.created_at).toLocaleDateString("ru-RU")}
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => setSelectedApp(app)} className="p-2 text-primary/40 hover:text-primary transition-colors tooltip" title="Подробнее">
                                            <Eye size={18} />
                                        </button>
                                        {app.status === 'pending' && (
                                            <>
                                                <button onClick={() => handleApprove(app)} className="p-2 text-green-400 hover:text-green-600 transition-colors" title="Одобрить">
                                                    <Check size={18} />
                                                </button>
                                                <button onClick={() => handleReject(app.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors" title="Отклонить">
                                                    <X size={18} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredApps.length === 0 && (
                    <div className="p-20 text-center text-gray-400">Нет заявок по данному фильтру.</div>
                )}
            </div>

            {/* Modal */}
            {selectedApp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white p-8 rounded-[2rem] w-full max-w-2xl border border-white/20 shadow-2xl relative my-8">
                        <button onClick={() => setSelectedApp(null)} className="absolute right-6 top-6 text-gray-400 hover:text-primary transition-colors">
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold text-primary mb-6">Детали заявки</h2>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4 bg-secondary/30 p-6 rounded-2xl">
                                <div>
                                    <p className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">Имя</p>
                                    <p className="font-medium text-primary">{selectedApp.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">Email</p>
                                    <p className="font-medium text-primary">{selectedApp.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">Телефон</p>
                                    <p className="font-medium text-primary">{selectedApp.phone}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">Статус</p>
                                    <p className="font-medium capitalize text-primary">{selectedApp.status}</p>
                                </div>
                            </div>

                            {selectedApp.experience && (
                                <div className="bg-secondary/30 p-6 rounded-2xl">
                                    <p className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-2">Опыт работы / О себе</p>
                                    <p className="text-gray-700 whitespace-pre-wrap">{selectedApp.experience}</p>
                                </div>
                            )}

                            {selectedApp.status === "pending" && (
                                <div className="flex justify-end space-x-4 pt-4">
                                    <button
                                        onClick={() => handleReject(selectedApp.id)}
                                        disabled={loading}
                                        className="px-6 py-3 bg-red-100 text-red-600 font-bold rounded-xl hover:bg-red-200 transition-colors disabled:opacity-50"
                                    >
                                        {loading ? "..." : "Отклонить"}
                                    </button>
                                    <button
                                        onClick={() => handleApprove(selectedApp)}
                                        disabled={loading}
                                        className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20 disabled:opacity-50"
                                    >
                                        <Check size={18} />
                                        <span>{loading ? "..." : "Одобрить гида"}</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
