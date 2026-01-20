"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import { supabase } from "@/lib/supabaseClient";
import { LogOut, RefreshCw, Filter } from "lucide-react";

type OrderItem = { name: string; model?: string; qty: number; price: number };

type OrderRow = {
    id: string;
    created_at: string;
    customer_name: string;
    contact: string;
    address: string;
    items: OrderItem[] | any;
    total: number | string;
    status: string;
};

const STATUS_LABELS: Record<string, string> = {
    pendiente: "Pendiente",
    en_produccion: "En producción",
    enviado: "Enviado",
    cancelado: "Cancelado",
};

const STATUS_OPTIONS = ["pendiente", "en_produccion", "enviado", "cancelado"] as const;

export default function AdminPage() {
    const { showToast } = useToast();
    const router = useRouter();

    const [orders, setOrders] = useState<OrderRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState<string>("todos");
    const [isSessionLoading, setIsSessionLoading] = useState(true);

    // Comprobar sesión y redirigir
    useEffect(() => {
        async function checkSession() {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.replace("/admin/login");
            } else {
                setIsSessionLoading(false);

                // Cargar pedidos directamente aquí o llamar a fetchOrders
                try {
                    setLoading(true);
                    const res = await fetch("/api/admin/orders", {
                        headers: {
                            Authorization: `Bearer ${session.access_token}`,
                        },
                        cache: "no-store",
                    });

                    const data = await res.json().catch(() => null);

                    if (res.ok && data?.ok) {
                        setOrders(data.orders || []);
                    } else if (res.status === 403) {
                        showToast("error", "No tienes permisos de administrador.");
                        await supabase.auth.signOut();
                        router.replace("/admin/login");
                    }
                } finally {
                    setLoading(false);
                }
            }
        }
        checkSession();
    }, [router, showToast]);


    const filteredOrders = useMemo(() => {
        if (filter === "todos") return orders;
        return orders.filter((o) => o.status === filter);
    }, [orders, filter]);

    async function fetchOrders() {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        setLoading(true);
        try {
            const res = await fetch("/api/admin/orders", {
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                },
                cache: "no-store",
            });

            const data = await res.json().catch(() => null);

            if (!res.ok || !data?.ok) {
                if (res.status === 403) {
                    showToast("error", "No tienes permisos de administrador.");
                    await supabase.auth.signOut();
                    router.replace("/admin/login");
                } else {
                    showToast("error", "Error cargando pedidos.");
                }
                return;
            }

            setOrders(data.orders || []);
        } finally {
            setLoading(false);
        }
    }

    async function updateStatus(id: string, newStatus: string) {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        try {
            const res = await fetch(`/api/admin/orders/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok || !data?.ok) {
                showToast("error", "Error actualizando estado.");
                return;
            }

            setOrders((prev) =>
                prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
            );
            showToast("success", "Estado actualizado");
        } catch (e) {
            showToast("error", "Error de red/servidor.");
        }
    }

    async function handleLogout() {
        await supabase.auth.signOut();
        showToast("info", "Sesión cerrada.");
        router.replace("/admin/login");
    }

    if (isSessionLoading) {
        return <div className="min-h-screen bg-black flex items-center justify-center">
            <RefreshCw className="h-8 w-8 text-white/20 animate-spin" />
        </div>;
    }

    return (
        <div className="min-h-screen bg-black text-white px-6 py-16">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between gap-4 mb-10">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-semibold tracking-tight">Admin Portal</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl px-2 py-1">
                            <Filter className="h-4 w-4 text-white/30 ml-2" />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="bg-transparent border-none focus:ring-0 text-sm py-1.5 pr-8 transition-all"
                            >
                                <option value="todos">Todos los pedidos</option>
                                <option value="pendiente">Pendientes</option>
                                <option value="en_produccion">En producción</option>
                                <option value="enviado">Enviados</option>
                                <option value="cancelado">Cancelados</option>
                            </select>
                        </div>

                        <button
                            onClick={() => fetchOrders()}
                            className="p-2.5 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-white/[0.06] transition-colors group"
                            title="Actualizar"
                            disabled={loading}
                        >
                            <RefreshCw className={`h-5 w-5 text-white/70 ${loading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
                        </button>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all"
                        >
                            <LogOut className="h-4 w-4" />
                            Salir
                        </button>
                    </div>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
                    <div className="overflow-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-white/[0.04] text-white/70">
                                <tr>
                                    <th className="text-left p-4">Cliente</th>
                                    <th className="text-left p-4">Contacto</th>
                                    <th className="text-left p-4">Productos</th>
                                    <th className="text-left p-4">Total</th>
                                    <th className="text-left p-4">Estado</th>
                                    <th className="text-left p-4">Fecha</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredOrders.map((o) => {
                                    const items = Array.isArray(o.items) ? o.items : [];
                                    return (
                                        <tr key={o.id} className="border-t border-white/10">
                                            <td className="p-4">
                                                <div className="font-semibold">{o.customer_name}</div>
                                                <div className="text-white/60 text-xs break-all">{o.id}</div>
                                            </td>
                                            <td className="p-4">{o.contact}</td>
                                            <td className="p-4">
                                                {items.length ? (
                                                    <div className="space-y-1">
                                                        {items.map((it: any, idx: number) => (
                                                            <div key={idx} className="text-white/80">
                                                                {it.name} {it.model ? <span className="text-white/50">({it.model})</span> : ""} ×{it.qty}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-white/50">—</span>
                                                )}
                                            </td>
                                            <td className="p-4 font-semibold">
                                                {Number(o.total).toFixed(2)}€
                                            </td>
                                            <td className="p-4">
                                                <select
                                                    value={o.status}
                                                    onChange={(e) => updateStatus(o.id, e.target.value)}
                                                    className="bg-black text-white border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-white/20"
                                                >
                                                    {STATUS_OPTIONS.map((s) => (
                                                        <option key={s} value={s} className="bg-black text-white">
                                                            {STATUS_LABELS[s]}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="p-4 text-white/70">
                                                {new Date(o.created_at).toLocaleString()}
                                            </td>
                                        </tr>
                                    );
                                })}

                                {!loading && filteredOrders.length === 0 ? (
                                    <tr>
                                        <td className="p-6 text-white/60" colSpan={6}>
                                            No hay pedidos con ese filtro.
                                        </td>
                                    </tr>
                                ) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
