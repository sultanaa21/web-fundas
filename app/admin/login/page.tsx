"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/Toast";
import Button from "@/components/Button";
import { Lock, Mail, ArrowLeft } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { showToast } = useToast();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        if (!email || !password) {
            showToast("error", "Por favor, completa todos los campos.");
            return;
        }

        if (password.length < 6) {
            showToast("error", "La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                showToast("error", "Credenciales inválidas: " + error.message);
                return;
            }

            showToast("success", "Sesión iniciada correctamente.");
            router.push("/admin");
        } catch (err) {
            showToast("error", "Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
            <Link
                href="/"
                className="absolute top-8 left-8 flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
            >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Volver a la tienda
            </Link>

            <div className="w-full max-w-md">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tighter mb-4">CASELYN ADMIN</h1>
                    <p className="text-white/50">Acceso restringido para administradores.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-white/40 ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@caselyn.com"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-white/40 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        className="w-full h-14 text-base font-semibold"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                    </Button>
                </form>

                <p className="mt-12 text-center text-xs text-white/20">
                    © {new Date().getFullYear()} CASELYN. All rights reserved.
                </p>
            </div>
        </div>
    );
}
