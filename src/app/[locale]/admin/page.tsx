import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    await requireAdmin();
    const supabase = createServerComponentClient({ cookies });

    const [
        { count: placesCount },
        { count: routesCount },
        { count: guidesCount },
        { count: appsCount },
        { data: recentApps }
    ] = await Promise.all([
        supabase.from("places").select("*", { count: "exact", head: true }),
        supabase.from("routes").select("*", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("guides").select("*", { count: "exact", head: true }).eq("status", "approved"),
        supabase.from("guide_applications").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("guide_applications").select("*").order("created_at", { ascending: false }).limit(5)
    ]);

    const stats = [
        { label: "Всего мест на карте", value: placesCount || 0, color: "text-blue-600" },
        { label: "Активных маршрутов", value: routesCount || 0, color: "text-green-600" },
        { label: "Одобренных гидов", value: guidesCount || 0, color: "text-purple-600" },
        { label: "Новых заявок", value: appsCount || 0, color: "text-orange-600" },
    ];

    return (
        <div>
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-primary mb-2">Дашборд</h1>
                <p className="text-gray-500">Сводка данных платформы Visit Bishkek.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-primary/5 shadow-sm">
                        <p className="text-sm font-bold text-primary/40 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h2 className="text-4xl font-bold text-primary mb-2">{stat.value}</h2>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[2.5rem] border border-primary/5 shadow-sm p-10 overflow-hidden">
                <h3 className="text-xl font-bold text-primary mb-6">Последние заявки ({recentApps?.length || 0})</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 text-sm text-gray-400">
                                <th className="pb-4 font-medium px-4">Имя</th>
                                <th className="pb-4 font-medium px-4">Email</th>
                                <th className="pb-4 font-medium px-4">Статус</th>
                                <th className="pb-4 font-medium px-4">Дата</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentApps && recentApps.length > 0 ? recentApps.map((app: any) => (
                                <tr key={app.id} className="border-b border-gray-50 last:border-0 hover:bg-secondary/20 transition-colors">
                                    <td className="py-4 px-4 font-bold text-primary">{app.name}</td>
                                    <td className="py-4 px-4 text-gray-600">{app.email}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                                                app.status === 'approved' ? 'bg-green-100 text-green-600' :
                                                    'bg-red-100 text-red-600'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-gray-500 text-sm">
                                        {new Date(app.created_at).toLocaleDateString("ru-RU")}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-gray-500">Нет последних заявок</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
