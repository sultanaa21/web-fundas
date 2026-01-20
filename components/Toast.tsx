"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { X } from "lucide-react";

// Types
type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    type: ToastType;
    message: string;
}

interface ToastContextValue {
    toasts: Toast[];
    showToast: (type: ToastType, message: string) => void;
    hideToast: (id: string) => void;
}

// Context
const ToastContext = createContext<ToastContextValue | null>(null);

// Hook
export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx;
}

// Toast Item Component
function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
    const bgColor = {
        success: "bg-green-500/90",
        error: "bg-red-500/90",
        info: "bg-white/10",
    }[toast.type];

    const icon = {
        success: "✓",
        error: "✕",
        info: "ℹ",
    }[toast.type];

    return (
        <div
            className={`${bgColor} backdrop-blur-md text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[280px] max-w-[400px] animate-slide-in border border-white/10`}
        >
            <span className="text-lg font-semibold">{icon}</span>
            <p className="flex-1 text-sm font-medium leading-snug">{toast.message}</p>
            <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors shrink-0"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}

// Provider
export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((type: ToastType, message: string) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        setToasts((prev) => [...prev, { id, type, message }]);

        // Auto-dismiss after 3s
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const hideToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
            {children}
            {/* Toast Container - fixed position */}
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
                {toasts.map((toast) => (
                    <div key={toast.id} className="pointer-events-auto">
                        <ToastItem toast={toast} onClose={() => hideToast(toast.id)} />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
