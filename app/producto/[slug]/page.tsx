"use client";

import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import products from "@/data/products.json";
import Button from "@/components/Button";
import { ShieldCheck, Truck, ArrowLeft, Star, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { addToCart } from "@/lib/cart";
import { use, useState } from "react";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const router = useRouter();
    const [addedToCart, setAddedToCart] = useState(false);

    const product = products.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    function handleAddToCart() {
        addToCart({
            id: product!.slug,
            name: product!.name,
            price: product!.price,
            image: product!.image,
        });
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 1200);
    }

    function handleBuyNow() {
        addToCart({
            id: product!.slug,
            name: product!.name,
            price: product!.price,
            image: product!.image,
        });
        router.push("/checkout");
    }

    return (
        <div className="container mx-auto px-6 py-24 md:px-16">
            <Link href="/fundas" className="inline-flex items-center gap-2.5 text-sm font-medium text-gray-500 hover:text-white mb-16 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back to Catalog
            </Link>

            <div className="grid grid-cols-1 gap-24 lg:grid-cols-2">
                {/* Product Gallery */}
                <div className="space-y-8">
                    <div className="aspect-square rounded-[32px] bg-white/[0.03] border border-white/5 overflow-hidden relative group backdrop-blur-sm">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-20 transition-transform duration-1000 group-hover:scale-105"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square rounded-2xl bg-white/[0.03] border border-white/5 cursor-pointer hover:border-white/20 transition-all opacity-40 hover:opacity-100 overflow-hidden relative">
                                <Image src={product.image} alt={product.name} fill className="object-contain p-4" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col pt-4">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="text-xs font-semibold tracking-tight text-white/60 bg-white/[0.05] px-4 py-1.5 rounded-full border border-white/5">
                            {product.category}
                        </span>
                        {product.badge && (
                            <span className="text-xs font-semibold tracking-tight text-white bg-white/[0.08] px-4 py-1.5 rounded-full border border-white/10">
                                {product.badge}
                            </span>
                        )}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-tight">
                        {product.name}
                    </h1>

                    <div className="mt-8 flex items-center gap-5">
                        <div className="flex items-center text-white/80">
                            {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-current" />)}
                        </div>
                        <span className="text-sm font-medium text-gray-500 tracking-tight">12 Certified Reviews</span>
                    </div>

                    <p className="mt-12 text-5xl font-semibold text-white tracking-tight">{product.price.toFixed(2)}€</p>

                    <div className="mt-12 space-y-10 border-b border-white/5 pb-16">
                        <div className="space-y-4">
                            <h3 className="text-xs font-semibold text-white/40 tracking-tight uppercase">Description</h3>
                            <p className="text-gray-400 text-lg leading-relaxed font-normal">
                                {product.description}
                            </p>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed font-normal">
                            Crafted from high-grade materials, {product.name} offers unparalleled protection without compromising on style. The precision-engineered design ensures a perfect fit for your device, maintaining the slim profile you love.
                        </p>
                    </div>

                    <div className="mt-16 flex flex-col gap-5">
                        <Button
                            className="w-full h-16 text-base gap-3"
                            variant="primary"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {addedToCart ? "Added ✓" : "Add to Cart"}
                        </Button>
                        <Button
                            className="w-full h-14 text-base font-medium"
                            variant="outline"
                            onClick={handleBuyNow}
                        >
                            Buy Now
                        </Button>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-6 border-t border-white/5 pt-16 sm:grid-cols-2">
                        <div className="flex items-start gap-5 p-6 rounded-[24px] bg-white/[0.02] border border-white/5 transition-colors hover:bg-white/[0.04]">
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 shrink-0">
                                <Truck className="h-5 w-5 text-white/70" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white tracking-tight">Express Delivery</p>
                                <p className="text-xs text-gray-500 mt-1.5 font-normal">24/48h Worldwide Shipping</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-5 p-6 rounded-[24px] bg-white/[0.02] border border-white/5 transition-colors hover:bg-white/[0.04]">
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 shrink-0">
                                <ShieldCheck className="h-5 w-5 text-white/70" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white tracking-tight">Lifetime Warranty</p>
                                <p className="text-xs text-gray-500 mt-1.5 font-normal">Guaranteed against any defects</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
