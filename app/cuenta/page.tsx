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
    Mail,
    ArrowLeft,
    CheckCircle2,
    Clock,
    Truck,
    CreditCard,
    Bell,
    Lock,
    Eye,
    EyeOff
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

type ViewType = "main" | "tracking" | "order" | "edit-profile" | "password" | "notifications";

export default function ProfilePage() {
    const { user, loading, signOut, syncProfile } = useAuth();
    const router = useRouter();
    const [view, setView] = useState<ViewType>("main");
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        }
        if (user) {
            syncProfile(user);
        }
    }, [user, loading, router, syncProfile]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] pt-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="h-10 w-48 bg-white/5 rounded-xl animate-pulse mb-4" />
                    <div className="h-4 w-64 bg-white/5 rounded-lg animate-pulse mb-12" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-64 bg-white/5 border border-white/10 rounded-3xl animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!user) return null;

    const renderView = () => {
        switch (view) {
            case "main":
                return <MainView user={user} setView={setView} setSelectedOrder={setSelectedOrder} signOut={signOut} />;
            case "tracking":
                return <TrackingView setView={setView} order={selectedOrder} />;
            case "order":
                return <OrderDetailView setView={setView} order={selectedOrder} />;
            case "edit-profile":
                return <EditProfileView setView={setView} user={user} />;
            case "password":
                return <ChangePasswordView setView={setView} />;
            case "notifications":
                return <NotificationsView setView={setView} />;
            default:
                return <MainView user={user} setView={setView} setSelectedOrder={setSelectedOrder} signOut={signOut} />;
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {renderView()}
            </div>
        </main>
    );
}

// Sub-components

function MainView({ user, setView, setSelectedOrder, signOut }: any) {
    const sections = [
        {
            title: "Seguimiento de paquetes",
            icon: Package,
            description: "Consulta el estado de tus envíos actuales",
            items: [
                { id: "12345", label: "Pedido #12345", status: "En camino", date: "Entrega estimada: 23 Ene", type: "tracking" }
            ]
        },
        {
            title: "Pedidos realizados",
            icon: ShoppingBag,
            description: "Historial de todas tus compras",
            items: [
                { id: "54321", label: "Funda Silicona - iPhone 15", status: "Entregado", date: "15 Ene 2024", type: "order" },
                { id: "54322", label: "Pack 2 Cristales Templados", status: "Entregado", date: "10 Ene 2024", type: "order" }
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
            ],
            action: { label: "Editar Perfil", view: "edit-profile" }
        },
        {
            title: "Gestión de cuenta",
            icon: Settings,
            description: "Seguridad y preferencias",
            links: [
                { label: "Cambiar contraseña", view: "password" },
                { label: "Preferencias de notificación", view: "notifications" }
            ]
        }
    ];

    return (
        <>
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
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setSelectedOrder(item);
                                            setView(item.type as ViewType);
                                        }}
                                        className="flex items-center justify-between p-4 bg-white/5 rounded-2xl group/item cursor-pointer hover:bg-white/10 transition-colors"
                                    >
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
                                {section.action && (
                                    <button
                                        onClick={() => setView(section.action.view)}
                                        className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-xl transition-all border border-white/10"
                                    >
                                        {section.action.label}
                                    </button>
                                )}
                            </div>
                        )}

                        {section.links && (
                            <div className="space-y-2">
                                {section.links.map((link, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setView(link.view as ViewType)}
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

            <div className="mt-12 flex justify-center">
                <button
                    onClick={async () => {
                        await signOut();
                        window.location.href = "/";
                    }}
                    className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-gray-400 rounded-2xl hover:bg-white/10 hover:text-white transition-all font-medium"
                >
                    <LogOut className="h-5 w-5" />
                    Cerrar Sesión
                </button>
            </div>
        </>
    );
}

function TrackingView({ setView, order }: any) {
    const steps = [
        { label: "Pedido confirmado", status: "completed", date: "20 Ene" },
        { label: "En preparación", status: "completed", date: "21 Ene" },
        { label: "En camino", status: "current", date: "22 Ene" },
        { label: "Entregado", status: "upcoming", date: "23 Ene (Est.)" }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
                onClick={() => setView("main")}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
            >
                <ArrowLeft className="h-4 w-4" /> Volver al Perfil
            </button>

            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Pedido #{order?.id || "12345"}</h2>
                        <p className="text-gray-400">Estado: <span className="text-purple-400 font-semibold">En camino</span></p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/20 px-6 py-3 rounded-2xl text-purple-400">
                        <p className="text-sm font-medium">Entrega estimada</p>
                        <p className="text-xl font-bold">Mañana, 23 Ene</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="relative mb-16 px-4">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 rounded-full" />
                    <div className="absolute top-1/2 left-0 w-2/3 h-1 bg-purple-500 -translate-y-1/2 rounded-full" />
                    <div className="relative flex justify-between">
                        {steps.map((step, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className={`h-10 w-10 rounded-full border-4 border-[#050505] flex items-center justify-center transition-all ${step.status === "completed" ? "bg-purple-500 text-white" :
                                        step.status === "current" ? "bg-[#050505] border-purple-500 text-purple-500" :
                                            "bg-white/5 border-white/10 text-gray-600"
                                    }`}>
                                    {step.status === "completed" ? <CheckCircle2 className="h-5 w-5" /> :
                                        step.status === "current" ? <Clock className="h-5 w-5 animate-pulse" /> :
                                            <div className="h-2 w-2 rounded-full bg-current" />}
                                </div>
                                <div className="mt-4 text-center">
                                    <p className={`text-sm font-bold ${step.status === "upcoming" ? "text-gray-600" : "text-white"}`}>{step.label}</p>
                                    <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-12">
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-purple-500" /> Dirección de envío
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            Miguel Angel <br />
                            Calle Ejemplo 123, 4ºB <br />
                            28001 Madrid, España
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Package className="h-5 w-5 text-purple-500" /> Productos
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-gray-400">
                                <span>Funda Silicona - iPhone 15</span>
                                <span>x1</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-400">
                                <span>Pack 2 Cristales Templados</span>
                                <span>x1</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                    <Button variant="primary" className="flex-1" onClick={() => setView("order")}>
                        Ver pedido completo
                    </Button>
                    <button className="flex-1 py-4 px-6 bg-white/5 hover:bg-white/10 text-white font-medium rounded-2xl transition-all border border-white/10">
                        Contactar soporte
                    </button>
                </div>
            </div>
        </div>
    );
}

function OrderDetailView({ setView, order }: any) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
                onClick={() => setView("main")}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
            >
                <ArrowLeft className="h-4 w-4" /> Volver al Perfil
            </button>

            <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
                <div className="p-8 md:p-12 border-b border-white/10 bg-white/[0.02]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-3xl font-bold text-white">Pedido #{order?.id || "54321"}</h2>
                                <span className="bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/20">
                                    ENTREGADO
                                </span>
                            </div>
                            <p className="text-gray-400">Realizado el 15 de Enero de 2024</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all">
                                <Mail className="h-5 w-5" />
                            </button>
                            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-all">
                                Descargar Factura
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-12">
                    <h3 className="text-xl font-bold text-white mb-6">Resumen del pedido</h3>
                    <div className="space-y-6 mb-12">
                        <div className="flex items-center gap-6 p-4 bg-white/5 rounded-2xl">
                            <div className="w-20 h-20 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                                <Package className="h-8 w-8 text-gray-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-bold">Funda Silicona - iPhone 15</h4>
                                <p className="text-gray-500 text-sm">Negro · Transparente</p>
                                <p className="text-white font-bold mt-1">29,99€</p>
                            </div>
                            <Button variant="primary" className="h-10 px-6 text-sm">Comprar de nuevo</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 border-t border-white/5 pt-12">
                        <div>
                            <h4 className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-4">Envío</h4>
                            <div className="flex gap-4">
                                <MapPin className="h-5 w-5 text-purple-500 shrink-0" />
                                <p className="text-white leading-relaxed">
                                    Miguel Angel <br />
                                    Calle Ejemplo 123, 4ºB <br />
                                    28001 Madrid, España
                                </p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-4">Pago</h4>
                            <div className="flex gap-4">
                                <CreditCard className="h-5 w-5 text-purple-500 shrink-0" />
                                <div>
                                    <p className="text-white">Tarjeta de Crédito</p>
                                    <p className="text-gray-500 text-sm">Mastercard terminada en 4455</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-[24px] p-8 space-y-4">
                        <div className="flex justify-between text-gray-400">
                            <span>Subtotal</span>
                            <span>29,99€</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>Envío</span>
                            <span className="text-green-400 font-medium">Gratis</span>
                        </div>
                        <div className="flex justify-between text-white text-xl font-bold pt-4 border-t border-white/10">
                            <span>Total</span>
                            <span>29,99€</span>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-center gap-8 text-sm text-gray-500">
                        <button className="hover:text-white transition-colors underline underline-offset-4">Solicitar devolución</button>
                        <button className="hover:text-white transition-colors underline underline-offset-4">Reportar incidencia</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EditProfileView({ setView, user }: any) {
    const [formData, setFormData] = useState({
        full_name: user?.user_metadata?.full_name || "",
        phone: "+34 600 000 000",
        address: "Calle Ejemplo 123, Madrid"
    });

    const handleSave = () => {
        // Logic to save profile...
        setView("main");
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
                onClick={() => setView("main")}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
            >
                <ArrowLeft className="h-4 w-4" /> Volver al Perfil
            </button>

            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12 max-w-2xl mx-auto">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-white mb-2">Editar Perfil</h2>
                    <p className="text-gray-400">Mantén tus datos actualizados para tus próximos pedidos.</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Email (No editable)</label>
                        <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl text-gray-500 cursor-not-allowed">
                            <Mail className="h-5 w-5" />
                            <span>{user?.email}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Nombre completo</label>
                        <input
                            type="text"
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Teléfono</label>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Dirección predeterminada</label>
                        <textarea
                            rows={3}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                        />
                    </div>

                    <div className="pt-6 flex flex-col sm:flex-row gap-4">
                        <Button variant="primary" className="flex-1" onClick={handleSave}>
                            Guardar cambios
                        </Button>
                        <button
                            onClick={() => setView("main")}
                            className="flex-1 py-4 px-6 bg-white/5 hover:bg-white/10 text-white font-medium rounded-2xl transition-all border border-white/10"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChangePasswordView({ setView }: any) {
    const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
                onClick={() => setView("main")}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
            >
                <ArrowLeft className="h-4 w-4" /> Volver al Perfil
            </button>

            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12 max-w-2xl mx-auto">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-white mb-2">Cambiar contraseña</h2>
                    <p className="text-gray-400">Te recomendamos utilizar una contraseña segura y única.</p>
                </div>

                <div className="space-y-6">
                    <PasswordField
                        label="Contraseña actual"
                        show={showPass.current}
                        onToggle={() => setShowPass({ ...showPass, current: !showPass.current })}
                    />
                    <PasswordField
                        label="Nueva contraseña"
                        show={showPass.new}
                        onToggle={() => setShowPass({ ...showPass, new: !showPass.new })}
                    />
                    <PasswordField
                        label="Confirmar nueva contraseña"
                        show={showPass.confirm}
                        onToggle={() => setShowPass({ ...showPass, confirm: !showPass.confirm })}
                    />

                    <div className="pt-6">
                        <Button variant="primary" className="w-full" onClick={() => setView("main")}>
                            Actualizar contraseña
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PasswordField({ label, show, onToggle }: any) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all pr-12"
                    placeholder="••••••••"
                />
                <button
                    onClick={onToggle}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                    {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
            </div>
        </div>
    );
}

function NotificationsView({ setView }: any) {
    const [prefs, setPrefs] = useState({
        orders: true,
        shipping: true,
        promos: false
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
                onClick={() => setView("main")}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
            >
                <ArrowLeft className="h-4 w-4" /> Volver al Perfil
            </button>

            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12 max-w-2xl mx-auto">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-white mb-2">Preferencias</h2>
                    <p className="text-gray-400">Elige cómo quieres que nos comuniquemos contigo.</p>
                </div>

                <div className="space-y-4">
                    <NotificationToggle
                        title="Emails de pedidos"
                        description="Recibe confirmaciones de compra y facturas."
                        active={prefs.orders}
                        onToggle={() => setPrefs({ ...prefs, orders: !prefs.orders })}
                    />
                    <NotificationToggle
                        title="Notificaciones de envío"
                        description="Sigue el trayecto de tus paquetes en tiempo real."
                        active={prefs.shipping}
                        onToggle={() => setPrefs({ ...prefs, shipping: !prefs.shipping })}
                    />
                    <NotificationToggle
                        title="Ofertas y promociones"
                        description="Sé el primero en enterarte de nuevos lanzamientos."
                        active={prefs.promos}
                        onToggle={() => setPrefs({ ...prefs, promos: !prefs.promos })}
                    />
                </div>

                <div className="mt-12 p-6 bg-purple-500/5 border border-purple-500/10 rounded-2xl flex gap-4 items-center">
                    <Bell className="h-6 w-6 text-purple-500 shrink-0" />
                    <p className="text-sm text-gray-400">
                        Puedes cambiar estas preferencias en cualquier momento. Los cambios se guardan automáticamente.
                    </p>
                </div>
            </div>
        </div>
    );
}

function NotificationToggle({ title, description, active, onToggle }: any) {
    return (
        <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
            <div className="mr-8">
                <h4 className="text-white font-bold mb-1">{title}</h4>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <button
                onClick={onToggle}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${active ? 'bg-purple-500' : 'bg-white/10'}`}
            >
                <span className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${active ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
        </div>
    );
}
