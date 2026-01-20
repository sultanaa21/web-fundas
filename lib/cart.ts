// Cart utilities — localStorage based, client-side only

export type CartItem = {
    id: string;        // slug del producto
    name: string;
    model?: string;    // variante opcional (ej: "iPhone 15")
    price: number;
    qty: number;
    image?: string;
};

const KEY = "cart_items_v1";

/** Lee el carrito de localStorage */
export function getCart(): CartItem[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

/** Guarda el carrito en localStorage */
export function saveCart(items: CartItem[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(items));
}

/** 
 * Añade item al carrito. 
 * Si existe mismo id+model, suma qty. 
 * Devuelve el carrito actualizado.
 */
export function addToCart(item: Omit<CartItem, "qty"> & { qty?: number }): CartItem[] {
    const cart = getCart();
    const qty = item.qty ?? 1;

    const idx = cart.findIndex(
        (c) => c.id === item.id && c.model === item.model
    );

    if (idx >= 0) {
        cart[idx].qty += qty;
    } else {
        cart.push({ ...item, qty });
    }

    saveCart(cart);
    return cart;
}

/** Elimina item del carrito por id + model */
export function removeFromCart(id: string, model?: string): CartItem[] {
    const cart = getCart().filter(
        (c) => !(c.id === id && c.model === model)
    );
    saveCart(cart);
    return cart;
}

/** Actualiza cantidad de un item (mínimo 1) */
export function updateQty(id: string, model: string | undefined, qty: number): CartItem[] {
    const cart = getCart();
    const idx = cart.findIndex((c) => c.id === id && c.model === model);

    if (idx >= 0) {
        cart[idx].qty = Math.max(1, qty);
    }

    saveCart(cart);
    return cart;
}

/** Vacía el carrito */
export function clearCart(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(KEY);
}

/** Calcula el total del carrito */
export function getCartTotal(): number {
    return getCart().reduce((acc, item) => acc + item.price * item.qty, 0);
}
