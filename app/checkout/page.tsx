"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/Button";
import { CreditCard, Truck, Lock, ShieldCheck, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { getCart, clearCart, type CartItem } from "@/lib/cart";
import { useToast } from "@/components/Toast";

export default function CheckoutPage() {
    const router = useRouter();
    const { showToast } = useToast();

    // Cart state
    const [items, setItems] = useState<CartItem[]>([]);
    const [mounted, setMounted] = useState(false);

    // Form state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");

    // UI state
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setItems(getCart());
        setMounted(true);
    }, []);

    const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);
    const total = subtotal; // shipping free

    function buildAddress() {
        const parts = [shippingAddress.trim(), city.trim(), postalCode.trim()].filter(Boolean);
        return parts.join(", ");
    }

    function validate() {
        if (!firstName.trim()) return "Falta el nombre.";
        if (!lastName.trim()) return "Falta el apellido.";
        if (!email.trim()) return "Falta el email.";
        if (!shippingAddress.trim()) return "Falta la dirección.";
        if (!city.trim()) return "Falta la ciudad.";
        if (!postalCode.trim()) return "Falta el código postal.";
        if (!items.length) return "El carrito está vacío.";
        if (total <= 0) return "Total inválido.";
        return null;
    }

    async function handleCreateOrder() {
        if (isSubmitting) return;

        const errorMsg = validate();
        if (errorMsg) {
            showToast("error", errorMsg);
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer_name: `${firstName} ${lastName}`.trim(),
                    contact: email.trim(),
                    address: buildAddress(),
                    items: items.map((x) => ({
                        name: x.name,
                        model: x.model,
                        qty: x.qty,
                        price: x.price,
                    })),
                    total,
                }),
            });

            const data = await res.json().catch(() => null);
            console.log("ORDER RESPONSE:", data);

            if (res.ok && data?.ok) {
                clearCart();
                showToast("success", "Pedido creado correctamente");
                router.push("/");
            } else {
                showToast("error", "Error creando pedido. Mira consola (F12).");
            }
        } catch (err) {
            console.error(err);
            showToast("error", "Error de red/servidor.");
        } finally {
            setIsSubmitting(false);
        }
    }

    // Loading state
    if (!mounted) {
        return (
            <div className="container mx-auto px-6 py-32 md:px-16">
                <div className="text-center text-white/50">Loading...</div>
            </div>
        );
    }

    // Empty cart
    if (items.length === 0) {
        return (
            <div className="container mx-auto px-6 py-32 md:px-16">
                <div className="flex items-center justify-between mb-20">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">Checkout</h1>
                </div>

                <div className="relative overflow-hidden rounded-[32px] bg-white/[0.02] border border-white/5 py-40 px-8 text-center flex flex-col items-center max-w-3xl mx-auto">
                    <div className="relative mb-12 w-28 h-28 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/50">
                        <ShoppingBag className="h-12 w-12" />
                    </div>
                    <h2 className="text-3xl font-semibold tracking-tight text-white mb-6">Cart is Empty</h2>
                    <p className="text-gray-400 max-w-sm mx-auto text-lg mb-12">
                        Add some products before checkout.
                    </p>
                    <Link href="/fundas">
                        <Button variant="primary" className="px-12 h-14 text-base">
                            Browse Catalog
                        </Button>
                    </Link>
                </div>
            </div>
        );
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
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-all"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-all"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-all md:col-span-2"
                            />
                            <input
                                type="text"
                                placeholder="Shipping Address"
                                value={shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                                className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-all md:col-span-2"
                            />
                            <input
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-all"
                            />
                            <input
                                type="text"
                                placeholder="Postal Code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
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

                        {/* Cart items */}
                        <div className="space-y-4 border-b border-white/5 pb-8 mb-5">
                            {items.map((item) => (
                                <div key={`${item.id}-${item.model ?? ""}`} className="flex gap-4">
                                    <div className="relative w-14 h-14 rounded-xl bg-white/[0.03] border border-white/5 overflow-hidden shrink-0">
                                        {item.image ? (
                                            <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/30">
                                                <ShoppingBag className="h-5 w-5" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate">{item.name}</p>
                                        {item.model && <p className="text-xs text-gray-500">{item.model}</p>}
                                        <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                                    </div>
                                    <p className="text-sm font-semibold text-white">{(item.price * item.qty).toFixed(2)}€</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-5 border-b border-white/5 pb-8">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="text-white">{subtotal.toFixed(2)}€</span>
                            </div>
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-gray-500">Shipping</span>
                                <span className="text-white">Free</span>
                            </div>
                        </div>

                        <div className="flex justify-between py-10 text-3xl font-semibold text-white tracking-tight">
                            <span>Total</span>
                            <span>{total.toFixed(2)}€</span>
                        </div>

                        <Button
                            variant="primary"
                            className="w-full h-14 gap-3 text-base"
                            onClick={handleCreateOrder}
                            disabled={isSubmitting}
                        >
                            <Lock className="h-4 w-4" />
                            {isSubmitting ? "Processing..." : "Secure Payment"}
                        </Button>

                        <p className="text-[10px] text-gray-500 mt-8 text-center flex items-center justify-center gap-2 font-medium tracking-tight">
                            <ShieldCheck className="h-3.5 w-3.5 text-white/50" /> SSL Encrypted Transaction
                        </p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[24px] flex items-center gap-5">
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5">
                            <Truck className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-white leading-tight">
                            Free Express Shipping <br />
                            <span className="text-gray-500 font-normal">Standard on all orders.</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
