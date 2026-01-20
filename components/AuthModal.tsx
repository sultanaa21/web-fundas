"use client";

import { useState } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Button from "./Button";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    if (!isOpen) return null;

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setName("");
        setError(null);
        setSuccess(null);
    };

    async function handleEmailAuth(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            if (isLogin) {
                const { error } = await signInWithEmail(email, password);
                if (error) {
                    if (error.message.includes("Invalid login")) {
                        setError("Correo o contraseña incorrectos.");
                    } else {
                        setError(error.message);
                    }
                } else {
                    resetForm();
                    onClose();
                    window.location.reload();
                }
            } else {
                const { error } = await signUpWithEmail(email, password, name);
                if (error) {
                    if (error.message.includes("already registered")) {
                        setError("Este correo ya está registrado. Por favor, inicia sesión.");
                    } else {
                        setError(error.message);
                    }
                } else {
                    setSuccess("¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.");
                    setTimeout(() => {
                        resetForm();
                        setIsLogin(true);
                    }, 3000);
                }
            }
        } catch (err: any) {
            setError(err.message || "Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleLogin() {
        setLoading(true);
        setError(null);
        const { error } = await signInWithGoogle();
        if (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-[40px] p-10 overflow-hidden shadow-2xl">
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -mr-32 -mt-32" />

                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
                >
                    <X className="h-6 w-6" />
                </button>

                <div className="relative z-10">
                    <h2 className="text-3xl font-semibold text-white mb-2 tracking-tight">
                        {isLogin ? "Bienvenido" : "Crea tu cuenta"}
                    </h2>
                    <p className="text-gray-500 mb-10 font-normal">
                        {isLogin ? "Ingresa tus credenciales para continuar." : "Únete a CASELYN y disfruta de ventajas exclusivas."}
                    </p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-500 text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleEmailAuth} className="space-y-4">
                        {!isLogin && (
                            <div className="relative">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Nombre completo"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-gray-600 outline-none focus:border-white/20 transition-colors"
                                    required
                                />
                            </div>
                        )}
                        <div className="relative">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-gray-600 outline-none focus:border-white/20 transition-colors"
                                required
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-gray-600 outline-none focus:border-white/20 transition-colors"
                                required
                                minLength={6}
                            />
                        </div>

                        <Button
                            variant="primary"
                            className="w-full h-14 mt-4"
                            disabled={loading}
                        >
                            {loading ? "Procesando..." : (isLogin ? "Iniciar Sesión" : "Registrarse")}
                        </Button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#0A0A0A] px-4 text-gray-500">O continuar con</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] text-white rounded-2xl py-4 font-medium transition-all disabled:opacity-50"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                        </svg>
                        Google
                    </button>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError(null);
                                setSuccess(null);
                            }}
                            className="text-white font-medium hover:underline transition-all"
                        >
                            {isLogin ? "Regístrate ahora" : "Inicia sesión"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
