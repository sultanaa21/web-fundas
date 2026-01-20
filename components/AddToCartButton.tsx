"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";
import { ShoppingCart, Check } from "lucide-react";

interface AddToCartButtonProps {
    item: {
        id: string;
        name: string;
        model?: string;
        price: number;
        image?: string;
    };
    className?: string;
    variant?: "small" | "large";
}

export default function AddToCartButton({ item, className = "", variant = "small" }: AddToCartButtonProps) {
    const [added, setAdded] = useState(false);

    function handleClick(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        addToCart({
            id: item.id,
            name: item.name,
            model: item.model,
            price: item.price,
            image: item.image,
        });

        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    }

    const baseStyles = variant === "large"
        ? "w-full h-16 text-base gap-3 inline-flex items-center justify-center rounded-full px-8 py-4 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
        : "w-full h-11 text-sm gap-2 inline-flex items-center justify-center rounded-full px-4 py-2 font-medium transition-all duration-200 focus:outline-none";

    const colorStyles = added
        ? "bg-green-500 text-white"
        : "bg-white text-black hover:bg-gray-100";

    return (
        <button
            onClick={handleClick}
            className={`${baseStyles} ${colorStyles} ${className}`}
        >
            {added ? (
                <>
                    <Check className={variant === "large" ? "h-5 w-5" : "h-4 w-4"} />
                    Added
                </>
            ) : (
                <>
                    <ShoppingCart className={variant === "large" ? "h-5 w-5" : "h-4 w-4"} />
                    {variant === "large" ? "Add to Cart" : "Add"}
                </>
            )}
        </button>
    );
}
