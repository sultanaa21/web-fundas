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
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all overflow-hidden"
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
                        <div className="absolute right-0 mt-4 w-72 z-50 bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                            <div className="px-2 pb-5 border-b border-white/5 mb-4">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">CUENTA</p>
                                <p className="text-lg font-bold text-white truncate">{user.email}</p>
                            </div>

                            <div className="space-y-1">
                                <button
                                    onClick={() => {
                                        window.location.href = "/cuenta";
                                        setShowUserMenu(false);
                                    }}
                                    className="w-full flex items-center gap-4 px-2 py-3 rounded-2xl hover:bg-white/5 transition-all group"
                                >
                                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors">
                                        <User className="h-5 w-5 text-gray-400 group-hover:text-white" />
                                    </div>
                                    <span className="font-medium text-[16px] text-gray-300 group-hover:text-white">Mi Perfil</span>
                                </button>

                                <button
                                    onClick={async () => {
                                        await signOut();
                                        setShowUserMenu(false);
                                        window.location.reload();
                                    }}
                                    className="w-full flex items-center gap-4 px-2 py-3 rounded-2xl hover:bg-red-500/5 transition-all group"
                                >
                                    <div className="p-3 bg-red-500/10 rounded-2xl group-hover:bg-red-500/20 transition-colors text-red-500">
                                        <LogOut className="h-5 w-5" />
                                    </div>
                                    <span className="font-medium text-[16px] text-red-500">Cerrar Sesión</span>
                                </button>
                            </div>
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
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 shadow-lg transition-all"
                title="Iniciar sesión"
            >
                <User className="h-5 w-5 text-white" />
            </button>
            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
