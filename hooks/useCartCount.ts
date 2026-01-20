"use client";

import { useState, useEffect, useCallback } from "react";
import { getCart } from "@/lib/cart";

export function useCartCount() {
    const [count, setCount] = useState(0);

    const updateCount = useCallback(() => {
        const items = getCart();
        const total = items.reduce((acc, item) => acc + item.qty, 0);
        setCount(total);
    }, []);

    useEffect(() => {
        updateCount();

        const handleUpdate = () => updateCount();

        window.addEventListener("cart_updated", handleUpdate);
        window.addEventListener("storage", handleUpdate);

        return () => {
            window.removeEventListener("cart_updated", handleUpdate);
            window.removeEventListener("storage", handleUpdate);
        };
    }, [updateCount]);

    return count;
}
