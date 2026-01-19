"use client";

import categories from "@/data/categories.json";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Filters() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const currentCategory = searchParams.get("category") || "all";

    const handleFilter = (slug: string) => {
        const params = new URLSearchParams(searchParams);
        if (slug === "all") {
            params.delete("category");
        } else {
            params.set("category", slug);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex flex-col gap-12">
            <div>
                <h3 className="text-xs font-semibold text-white/50 mb-6 tracking-tight">Collections</h3>
                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => handleFilter("all")}
                        className={`text-left text-sm font-medium transition-all hover:text-white ${currentCategory === "all" ? "text-white" : "text-gray-500"}`}
                    >
                        All Items
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleFilter(cat.slug)}
                            className={`text-left text-sm font-medium transition-all hover:text-white ${currentCategory === cat.slug ? "text-white" : "text-gray-500"}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-white/50 mb-6 tracking-tight">Price Range</h3>
                <div className="flex flex-col gap-5">
                    <label className="flex items-center gap-3.5 text-sm font-medium text-gray-500 cursor-pointer group hover:text-white transition-colors">
                        <input type="checkbox" className="h-[18px] w-[18px] rounded-md border-white/10 bg-white/5 text-white accent-white focus:ring-white/20 focus:ring-offset-0 ring-offset-background" />
                        0€ - 25€
                    </label>
                    <label className="flex items-center gap-3.5 text-sm font-medium text-gray-500 cursor-pointer group hover:text-white transition-colors">
                        <input type="checkbox" className="h-[18px] w-[18px] rounded-md border-white/10 bg-white/5 text-white accent-white focus:ring-white/20 focus:ring-offset-0 ring-offset-background" />
                        25€ - 50€
                    </label>
                    <label className="flex items-center gap-3.5 text-sm font-medium text-gray-500 cursor-pointer group hover:text-white transition-colors">
                        <input type="checkbox" className="h-[18px] w-[18px] rounded-md border-white/10 bg-white/5 text-white accent-white focus:ring-white/20 focus:ring-offset-0 ring-offset-background" />
                        Extra Premium
                    </label>
                </div>
            </div>
        </div>
    );
}
