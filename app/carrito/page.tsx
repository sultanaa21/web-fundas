"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import { ArrowLeft, ShoppingBag, Zap, Trash2, Plus, Minus } from "lucide-react";
import { getCart, removeFromCart, updateQty, type CartItem } from "@/lib/cart";

export default function CartPage() {
    const [items, setItems] = useState<CartItem[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setItems(getCart());
        setMounted(true);
    }, []);

    function handleRemove(id: string, model?: string) {
        const updated = removeFromCart(id, model);
        setItems(updated);
    }

    function handleQtyChange(id: string, model: string | undefined, delta: number) {
        const item = items.find((i) => i.id === id && i.model === model);
        if (!item) return;
        const newQty = item.qty + delta;
        if (newQty < 1) return;
        const updated = updateQty(id, model, newQty);
        setItems(updated);
    }

    const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

    // Show loading state until mounted (to avoid hydration mismatch)
    if (!mounted) {
        return (
            <div className="container mx-auto px-6 py-32 md:px-16">
                <div className="text-center text-white/50">Loading...</div>
            </div>
        );
    }

    // Empty cart state
    if (items.length === 0) {
        return (
            <div className="container mx-auto px-6 py-32 md:px-16">
                <div className="flex items-center justify-between mb-20">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">Tu Carrito</h1>
                    <Link href="/fundas" className="text-sm font-medium text-gray-500 hover:text-white transition-colors flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" /> Continuar Comprando
                    </Link>
                </div>

                <div className="relative overflow-hidden rounded-[32px] bg-white/[0.02] border border-white/5 py-40 px-8 text-center flex flex-col items-center max-w-5xl mx-auto">
                    <div className="relative mb-12 w-28 h-28 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/50 backdrop-blur-sm">
                        <ShoppingBag className="h-12 w-12" />
                    </div>

                    <h2 className="relative text-3xl font-semibold tracking-tight text-white mb-6">
                        Santuario Vacío
                    </h2>
                    <p className="relative text-gray-400 max-w-sm mx-auto text-lg mb-12 font-normal leading-relaxed">
                        Tu colección está esperando su primera obra maestra. <br /> Eleva tu estilo ahora.
                    </p>

                    <Link href="/fundas" className="relative mb-10">
                        <Button variant="primary" className="px-12 h-14 gap-3 text-base">
                            <Zap className="h-4 w-4" /> Explorar Catálogo
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Cart with items
    return (
        <div className="container mx-auto px-6 py-32 md:px-16">
            <div className="flex items-center justify-between mb-20">
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">Tu Carrito</h1>
                <Link href="/fundas" className="text-sm font-medium text-gray-500 hover:text-white transition-colors flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Continuar Comprando
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div
                            key={`${item.id}-${item.model ?? ""}`}
                            className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6 rounded-[20px] sm:rounded-[24px] bg-white/[0.02] border border-white/5"
                        >
                            {/* Top row: Image + Details + Remove */}
                            <div className="flex gap-4 flex-1">
                                {/* Image */}
                                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden shrink-0">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-contain p-2 sm:p-3"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/30">
                                            <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8" />
                                        </div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="text-base sm:text-lg font-semibold text-white truncate">{item.name}</h3>
                                        <button
                                            onClick={() => handleRemove(item.id, item.model)}
                                            className="text-gray-500 hover:text-red-400 transition-colors shrink-0 sm:hidden"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                    {item.model && (
                                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{item.model}</p>
                                    )}
                                    <p className="text-base sm:text-lg font-semibold text-white mt-2">{item.price.toFixed(2)}€</p>
                                </div>
                            </div>

                            {/* Bottom row: Qty + Total */}
                            <div className="flex items-center justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t border-white/5 sm:border-0">
                                {/* Qty controls */}
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <button
                                        onClick={() => handleQtyChange(item.id, item.model, -1)}
                                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white hover:bg-white/[0.1] transition-colors"
                                    >
                                        <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    </button>
                                    <span className="text-white font-semibold w-6 sm:w-8 text-center text-sm sm:text-base">{item.qty}</span>
                                    <button
                                        onClick={() => handleQtyChange(item.id, item.model, 1)}
                                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white hover:bg-white/[0.1] transition-colors"
                                    >
                                        <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    </button>
                                </div>

                                {/* Item total + remove (desktop) */}
                                <div className="flex items-center gap-4">
                                    <p className="text-base sm:text-lg font-semibold text-white">
                                        {(item.price * item.qty).toFixed(2)}€
                                    </p>
                                    <button
                                        onClick={() => handleRemove(item.id, item.model)}
                                        className="text-gray-500 hover:text-red-400 transition-colors hidden sm:block"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="h-fit">
                    <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[32px]">
                        <h2 className="text-xl font-semibold text-white mb-10 tracking-tight">Resumen del Pedido</h2>

                        <div className="space-y-5 border-b border-white/5 pb-8">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="text-white">{total.toFixed(2)}€</span>
                            </div>
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-gray-500">Envío</span>
                                <span className="text-white">Gratis</span>
                            </div>
                        </div>

                        <div className="flex justify-between py-10 text-3xl font-semibold text-white tracking-tight">
                            <span>Total</span>
                            <span>{total.toFixed(2)}€</span>
                        </div>

                        <Link href="/checkout">
                            <Button variant="primary" className="w-full h-14 text-base">
                                Proceder al Pago
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
