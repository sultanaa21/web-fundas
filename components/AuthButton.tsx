"use client";

import { useState } from "react";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "./AuthModal";

export default function AuthButton() {
    const { user, signOut, loading } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    if (loading) {
        return <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />;
    }

    if (user) {
        return (
            <div className="relative">
                <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all overflow-hidden"
                >
                    {user.user_metadata?.avatar_url ? (
                        <img src={user.user_metadata.avatar_url} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                        <User className="h-5 w-5 text-white" />
                    )}
                </button>

                {showUserMenu && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowUserMenu(false)}
                        />
                        <div className="absolute right-0 mt-4 w-56 z-50 bg-[#0A0A0A] border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl">
                            <div className="px-4 py-3 border-b border-white/5 mb-2">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Cuenta</p>
                                <p className="text-sm font-medium text-white truncate">{user.email}</p>
                            </div>
                            <button
                                onClick={() => {
                                    signOut();
                                    setShowUserMenu(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 rounded-xl transition-all font-medium"
                            >
                                <LogOut className="h-4 w-4" />
                                Cerrar Sesión
                            </button>
                        </div>
                    </>
                )}
            </div>
        );
    }

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                title="Iniciar sesión"
            >
                <User className="h-5 w-5 text-white" />
            </button>
            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
