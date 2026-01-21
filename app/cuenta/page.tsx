"use client";

import { useAuth } from "@/hooks/useAuth";
import {
    Package,
    ShoppingBag,
    User as UserIcon,
    Settings,
    ChevronRight,
    LogOut,
    MapPin,
    Phone,
    Mail
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] pt-32 px-6 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!user) return null;

    const sections = [
        {
            title: "Seguimiento de paquetes",
            icon: Package,
            description: "Consulta el estado de tus envíos actuales",
            items: [
                { label: "Pedido #12345", status: "En camino", date: "Entrega estimada: 23 Ene" }
            ]
        },
        {
            title: "Pedidos realizados",
            icon: ShoppingBag,
            description: "Historial de todas tus compras",
            items: [
                { label: "Funda Silicona - iPhone 15", status: "Entregado", date: "15 Ene 2024" },
                { label: "Pack 2 Cristales Templados", status: "Entregado", date: "10 Ene 2024" }
            ]
        },
        {
            title: "Información personal",
            icon: UserIcon,
            description: "Gestiona tus datos y direcciones",
            details: [
                { label: "Email", value: user.email, icon: Mail },
                { label: "Nombre", value: user.user_metadata?.full_name || "No especificado", icon: UserIcon },
                { label: "Teléfono", value: "+34 600 000 000", icon: Phone },
                { label: "Dirección", value: "Calle Ejemplo 123, Madrid", icon: MapPin }
            ]
        },
        {
            title: "Gestión de cuenta",
            icon: Settings,
            description: "Seguridad y preferencias",
            links: [
                { label: "Cambiar contraseña", action: () => { } },
                { label: "Preferencias de notificación", action: () => { } },
                { label: "Privacidad y datos", action: () => { } }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-[#050505] pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-2">Mi Perfil</h1>
                    <p className="text-gray-400">Bienvenido de nuevo, {user.email}</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sections.map((section, idx) => (
                        <section
                            key={idx}
                            className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all group"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-purple-500/10 rounded-2xl">
                                    <section.icon className="h-6 w-6 text-purple-500" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                                    <p className="text-sm text-gray-400">{section.description}</p>
                                </div>
                            </div>

                            {section.items && (
                                <div className="space-y-3">
                                    {section.items.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl group/item cursor-pointer hover:bg-white/10 transition-colors">
                                            <div>
                                                <p className="text-white font-medium">{item.label}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs text-purple-400 font-medium">{item.status}</span>
                                                    <span className="text-xs text-gray-500">•</span>
                                                    <span className="text-xs text-gray-500">{item.date}</span>
                                                </div>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-gray-600 group-hover/item:text-white transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {section.details && (
                                <div className="space-y-4">
                                    {section.details.map((detail, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="p-2 bg-white/5 rounded-lg">
                                                <detail.icon className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider">{detail.label}</p>
                                                <p className="text-sm text-white font-medium">{detail.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-xl transition-all border border-white/10">
                                        Editar Perfil
                                    </button>
                                </div>
                            )}

                            {section.links && (
                                <div className="space-y-2">
                                    {section.links.map((link, i) => (
                                        <button
                                            key={i}
                                            onClick={link.action}
                                            className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-left group/link"
                                        >
                                            <span className="text-sm text-white font-medium">{link.label}</span>
                                            <ChevronRight className="h-4 w-4 text-gray-600 group-hover/link:text-white transition-colors" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </section>
                    ))}
                </div>

                {/* Logout Button */}
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={async () => {
                            await signOut();
                            router.push("/");
                        }}
                        className="flex items-center gap-2 px-8 py-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all font-semibold"
                    >
                        <LogOut className="h-5 w-5" />
                        Cerrar Sesión Permanente
                    </button>
                </div>
            </div>
        </main>
    );
}
