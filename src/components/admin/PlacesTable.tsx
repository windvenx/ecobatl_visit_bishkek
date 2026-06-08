"use client";

import { useState } from "react";
import { savePlaceAction, deletePlaceAction, togglePublishPlaceAction } from "@/app/actions/places";
import { Plus, Edit2, Trash2, X, Eye, EyeOff } from "lucide-react";

export default function PlacesTable({ places }: { places: any[] }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPlace, setCurrentPlace] = useState<any>(null);

    const openCreateModal = () => {
        setCurrentPlace(null);
        setModalOpen(true);
    };

    const openEditModal = (place: any) => {
        setCurrentPlace(place);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.currentTarget);
            await savePlaceAction(formData);
            closeModal();
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Вы уверены, что хотите удалить место?")) return;
        setLoading(true);
        try {
            await deletePlaceAction(id);
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePublish = async (id: string, currentStatus: boolean) => {
        setLoading(true);
        try {
            await togglePublishPlaceAction(id, !currentStatus);
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Места</h1>
                    <p className="text-gray-500">Управление интерактивными маркерами на карте.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center space-x-2 px-6 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                    <Plus size={20} />
                    <span>Добавить место</span>
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-primary/5 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-secondary/20 border-b border-primary/5">
                        <tr>
                            <th className="px-8 py-6 font-bold text-primary/60 uppercase text-xs tracking-widest">Название (RU)</th>
                            <th className="px-8 py-6 font-bold text-primary/60 uppercase text-xs tracking-widest">Категория</th>
                            <th className="px-8 py-6 font-bold text-primary/60 uppercase text-xs tracking-widest">Координаты</th>
                            <th className="px-8 py-6 font-bold text-primary/60 uppercase text-xs tracking-widest">Статус</th>
                            <th className="px-8 py-6 font-bold text-primary/60 uppercase text-xs tracking-widest">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {places.map((place) => (
                            <tr key={place.id} className={`hover:bg-secondary/10 transition-colors ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                                <td className="px-8 py-6 font-bold text-primary">{place.name?.ru || place.name}</td>
                                <td className="px-8 py-6">
                                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-bold uppercase border border-accent/10">
                                        {place.category}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-sm text-gray-500 font-mono">
                                    {place.lat}, {place.lng}
                                </td>
                                <td className="px-8 py-6">
                                    <button
                                        onClick={() => handleTogglePublish(place.id, place.is_published)}
                                        className={`px-3 py-1 rounded-full text-xs font-bold w-[120px] justify-center flex items-center space-x-1 transition-colors ${place.is_published ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                                    >
                                        {place.is_published ? <Eye size={12} /> : <EyeOff size={12} />}
                                        <span>{place.is_published ? 'Опубликовано' : 'Скрыто'}</span>
                                    </button>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center space-x-3">
                                        <button onClick={() => openEditModal(place)} className="p-2 text-primary/40 hover:text-primary transition-colors">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(place.id)} className="p-2 text-red-300 hover:text-red-500 transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {places.length === 0 && (
                    <div className="p-20 text-center text-gray-400">Нет добавленных мест.</div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white p-8 rounded-[2rem] w-full max-w-3xl border border-white/20 shadow-2xl relative my-8">
                        <button onClick={closeModal} className="absolute right-6 top-6 text-gray-400 hover:text-primary transition-colors">
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold text-primary mb-6">
                            {currentPlace ? "Изменить место" : "Добавить место"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {currentPlace && <input type="hidden" name="id" value={currentPlace.id} />}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <label className="block">
                                    <span className="text-xs font-bold text-primary/60 uppercase tracking-widest pl-2">Название (RU)</span>
                                    <input type="text" name="name_ru" required defaultValue={currentPlace?.name?.ru || currentPlace?.name} className="mt-1 w-full px-4 py-3 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none" />
                                </label>
                                <label className="block">
                                    <span className="text-xs font-bold text-primary/60 uppercase tracking-widest pl-2">Название (EN)</span>
                                    <input type="text" name="name_en" defaultValue={currentPlace?.name?.en || ""} className="mt-1 w-full px-4 py-3 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none" />
                                </label>
                                <label className="block">
                                    <span className="text-xs font-bold text-primary/60 uppercase tracking-widest pl-2">Название (KY)</span>
                                    <input type="text" name="name_ky" defaultValue={currentPlace?.name?.ky || ""} className="mt-1 w-full px-4 py-3 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none" />
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <label className="block">
                                    <span className="text-xs font-bold text-primary/60 uppercase tracking-widest pl-2">Категория</span>
                                    <select name="category" required defaultValue={currentPlace?.category || "food"} className="mt-1 w-full px-4 py-3 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none appearance-none">
                                        <option value="food">Еда (Food)</option>
                                        <option value="parks">Парки (Parks)</option>
                                        <option value="emergency">Помощь (Emergency)</option>
                                        <option value="attractions">Достопримечательности</option>
                                    </select>
                                </label>
                                <label className="block">
                                    <span className="text-xs font-bold text-primary/60 uppercase tracking-widest pl-2">Широта (Lat)</span>
                                    <input type="number" step="any" name="lat" required defaultValue={currentPlace?.lat} placeholder="42.875" className="mt-1 w-full px-4 py-3 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none" />
                                </label>
                                <label className="block">
                                    <span className="text-xs font-bold text-primary/60 uppercase tracking-widest pl-2">Долгота (Lng)</span>
                                    <input type="number" step="any" name="lng" required defaultValue={currentPlace?.lng} placeholder="74.605" className="mt-1 w-full px-4 py-3 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none" />
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <label className="block">
                                    <span className="text-xs font-bold text-primary/60 uppercase tracking-widest pl-2">Описание (RU)</span>
                                    <textarea name="desc_ru" defaultValue={currentPlace?.desc?.ru} className="mt-1 w-full px-4 py-3 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none h-24" />
                                </label>
                                <label className="block">
                                    <span className="text-xs font-bold text-primary/60 uppercase tracking-widest pl-2">Описание (EN)</span>
                                    <textarea name="desc_en" defaultValue={currentPlace?.desc?.en} className="mt-1 w-full px-4 py-3 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none h-24" />
                                </label>
                                <label className="block">
                                    <span className="text-xs font-bold text-primary/60 uppercase tracking-widest pl-2">Описание (KY)</span>
                                    <textarea name="desc_ky" defaultValue={currentPlace?.desc?.ky} className="mt-1 w-full px-4 py-3 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none h-24" />
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <label className="block">
                                    <span className="text-xs font-bold text-primary/60 uppercase tracking-widest pl-2">Часы работы</span>
                                    <input type="text" name="hours" defaultValue={currentPlace?.hours || ""} placeholder="Пн-Вс: 09:00-22:00" className="mt-1 w-full px-4 py-3 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none" />
                                </label>
                                <label className="block">
                                    <span className="text-xs font-bold text-primary/60 uppercase tracking-widest pl-2">Телефон</span>
                                    <input type="text" name="phone" defaultValue={currentPlace?.phone || ""} placeholder="+996 555..." className="mt-1 w-full px-4 py-3 bg-secondary/50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none" />
                                </label>
                                <label className="flex items-center space-x-3 pt-6">
                                    <input type="checkbox" name="is_published" value="true" defaultChecked={currentPlace ? currentPlace.is_published : true} className="w-5 h-5 accent-primary border-gray-300 rounded" />
                                    <span className="text-sm font-bold text-primary">Опубликовано</span>
                                </label>
                            </div>

                            <button type="submit" disabled={loading} className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50">
                                {loading ? "Сохранение..." : "Сохранить"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
