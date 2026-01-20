"use client";

import Button from "@/components/Button";
import { CreditCard, Truck, Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
    async function handleCreateOrder() {
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer_name: "Test Cliente",
                    contact: "600123456",
                    address: "Girona",
                    items: [{ name: "Minimal Form", model: "iPhone 15", qty: 1, price: 45 }],
                    total: 45,
                }),
            });

            const data = await res.json();
            console.log("ORDER RESPONSE:", data);

            if (res.ok && data?.ok) {
                alert("✅ Pedido creado y guardado en Supabase");
            } else {
                alert("❌ Error creando pedido. Mira consola (F12).");
            }
        } catch (err) {
            console.error(err);
            alert("❌ Error de red/servidor. Mira consola (F12).");
        }
    }

    return (
        <div className="container mx-auto px-6 py-32 md:px-16">
            <div className="flex items-center justify-between mb-20">
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
                    Checkout
                </h1>
                <Link
                    href="/carrito"
                    className="text-sm font-medium text-gray-500 hover:text-white transition-colors flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" /> Return to Cart
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-20 lg:grid-cols-3">
                {/* Checkout Form */}
                <div className="lg:col-span-2 space-y-16">
                    <section>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-10 w-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-white text-sm font-semibold">
                                1
                            </div>
                            <h2 className="text-2xl font-semibold tracking-tight text-white">
                                Shipping Information
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-all"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-all"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-all md:col-span-2"
                            />
                            <input
                                type="text"
                                placeholder="Shipping Address"
                                className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-all md:col-span-2"
                            />
                            <input
                                type="text"
                                placeholder="City"
                                className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-all"
                            />
                            <input
                                type="text"
                                placeholder="Postal Code"
                                className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-all"
                            />
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-10 w-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-white text-sm font-semibold">
                                2
                            </div>
                            <h2 className="text-2xl font-semibold tracking-tight text-white">
                                Payment Method
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <label className="flex items-center justify-between rounded-3xl border border-white/40 bg-white/[0.03] p-8 cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <CreditCard className="h-5 w-5 text-white" />
                                    <span className="font-semibold text-white tracking-tight text-sm">
                                        Stripe / Card
                                    </span>
                                </div>
                                <div className="h-5 w-5 rounded-full border-4 border-white bg-black" />
                            </label>
                            <label className="flex items-center justify-between rounded-3xl border border-white/5 bg-white/[0.03] p-8 cursor-pointer hover:border-white/20 transition-all">
                                <div className="flex items-center gap-4">
                                    <span className="font-semibold text-white tracking-tight text-sm">
                                        PayPal
                                    </span>
                                </div>
                                <div className="h-5 w-5 rounded-full border border-white/20" />
                            </label>
                        </div>
                    </section>
                </div>

                {/* Order Summary */}
                <div className="h-fit space-y-8">
                    <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[32px] relative overflow-hidden backdrop-blur-sm">
                        <h2 className="text-xl font-semibold text-white mb-10 tracking-tight">
                            Order Summary
                        </h2>
                        <div className="space-y-5 border-b border-white/5 pb-8">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="text-white">0.00€</span>
                            </div>
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-gray-500">Shipping</span>
                                <span className="text-white">Free</span>
                            </div>
                        </div>
                        <div className="flex justify-between py-10 text-3xl font-semibold text-white tracking-tight">
                            <span>Total</span>
                            <span>0.00€</span>
                        </div>

                        <Button
                            variant="primary"
                            className="w-full h-14 gap-3 text-base"
                            onClick={handleCreateOrder}
                        >
                            <Lock className="h-4 w-4" /> Secure Payment
                        </Button>

                        <p className="text-[10px] text-gray-500 mt-8 text-center flex items-center justify-center gap-2 font-medium tracking-tight">
                            <ShieldCheck className="h-3.5 w-3.5 text-white/50" /> SSL Encrypted
                            Transaction
                        </p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[24px] flex items-center gap-5">
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5">
                            <Truck className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-white leading-tight">
                            Free Express Shipping <br />
                            <span className="text-gray-500 font-normal">
                                Standard on all orders.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
