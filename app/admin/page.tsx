"use client";

import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/components/Toast";

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
    const [token, setToken] = useState("");
    const [authed, setAuthed] = useState(false);

    const [orders, setOrders] = useState<OrderRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState<string>("todos");

    // cargar token guardado
    useEffect(() => {
        const saved = sessionStorage.getItem("ADMIN_TOKEN") || "";
        if (saved) {
            setToken(saved);
            setAuthed(true);
        }
    }, []);

    const filteredOrders = useMemo(() => {
        if (filter === "todos") return orders;
        return orders.filter((o) => o.status === filter);
    }, [orders, filter]);

    async function fetchOrders(tk: string) {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/orders", {
                headers: {
                    Authorization: `Bearer ${tk}`,
                },
                cache: "no-store",
            });

            const data = await res.json().catch(() => null);

            if (!res.ok || !data?.ok) {
                showToast("error", "No autorizado o error cargando pedidos.");
                return;
            }

            setOrders(data.orders || []);
        } finally {
            setLoading(false);
        }
    }

    async function updateStatus(id: string, newStatus: string) {
        try {
            const res = await fetch(`/api/admin/orders/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok || !data?.ok) {
                console.log("UPDATE ERROR:", data);
                showToast("error", "Error actualizando estado.");
                return;
            }

            // Actualiza en pantalla sin recargar todo
            setOrders((prev) =>
                prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
            );
            showToast("success", "Estado actualizado");
        } catch (e) {
            showToast("error", "Error de red/servidor.");
        }
    }

    function handleLogin() {
        if (!token.trim()) {
            alert("Pon el token primero.");
            return;
        }
        sessionStorage.setItem("ADMIN_TOKEN", token.trim());
        setAuthed(true);
        fetchOrders(token.trim());
    }

    useEffect(() => {
        if (authed && token.trim()) {
            fetchOrders(token.trim());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authed]);

    return (
        <div className="min-h-screen bg-black text-white px-6 py-16">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between gap-4 mb-10">
                    <h1 className="text-3xl font-semibold tracking-tight">Admin — Pedidos</h1>

                    <div className="flex items-center gap-3">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-sm"
                        >
                            <option value="todos">Todos</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="en_produccion">En producción</option>
                            <option value="enviado">Enviado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>

                        <button
                            onClick={() => fetchOrders(token)}
                            className="bg-white text-black rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-50"
                            disabled={!authed || loading}
                        >
                            {loading ? "Cargando..." : "Actualizar"}
                        </button>
                    </div>
                </div>

                {!authed ? (
                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                        <p className="text-sm text-white/70 mb-4">
                            Este panel está protegido. Mete tu <b>ADMIN_TOKEN</b>.
                        </p>

                        <div className="flex gap-3">
                            <input
                                type="password"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                placeholder="ADMIN_TOKEN"
                                className="flex-1 bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm"
                            />
                            <button
                                onClick={handleLogin}
                                className="bg-white text-black rounded-xl px-5 py-3 text-sm font-semibold"
                            >
                                Entrar
                            </button>
                        </div>
                    </div>
                ) : (
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
                )}

                {authed ? (
                    <button
                        className="mt-6 text-xs text-white/60 underline"
                        onClick={() => {
                            sessionStorage.removeItem("ADMIN_TOKEN");
                            setAuthed(false);
                            setToken("");
                            setOrders([]);
                        }}
                    >
                        Cerrar sesión admin
                    </button>
                ) : null}
            </div>
        </div>
    );
}
