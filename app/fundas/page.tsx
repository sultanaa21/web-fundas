import { Suspense } from "react";
import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import Filters from "@/components/Filters";
import { SlidersHorizontal } from "lucide-react";

export default function FundasPage({
    searchParams,
}: {
    searchParams: { category?: string };
}) {
    const category = searchParams.category;

    const filteredProducts = category && category !== "all"
        ? products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
        : products;

    return (
        <div className="container mx-auto px-6 py-24 md:px-16">
            <div className="flex flex-col gap-16 md:flex-row">
                {/* Sidebar / Filters */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="sticky top-32 bg-white/[0.02] border border-white/5 p-10 rounded-[32px] backdrop-blur-sm">
                        <div className="flex items-center gap-2.5 mb-10">
                            <SlidersHorizontal className="h-4 w-4 text-white/70" />
                            <span className="text-xs font-semibold tracking-tight text-white">Filters</span>
                        </div>
                        <Suspense fallback={<div className="text-xs text-gray-500">Loading...</div>}>
                            <Filters />
                        </Suspense>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    <div className="flex items-baseline justify-between mb-16 border-b border-white/5 pb-8">
                        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
                            {category && category !== "all" ? category : "All Products"}
                        </h1>
                        <span className="text-sm font-medium text-gray-500">
                            {filteredProducts.length} items
                        </span>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-40 bg-white/[0.02] border border-white/5 rounded-[32px]">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">No products found.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
