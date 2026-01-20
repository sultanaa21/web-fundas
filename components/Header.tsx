"use client";

import Link from "next/link";
import { ShoppingCart, Menu, Search } from "lucide-react";
import { useCartCount } from "@/hooks/useCartCount";

export default function Header() {
  const cartCount = useCartCount();

  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-16">
        <div className="flex items-center gap-16">
          <Link href="/" className="text-xl font-semibold tracking-tight text-white hover:opacity-80 transition-opacity">
            CASELYN
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            <Link href="/fundas" className="text-sm font-medium text-gray-500 hover:text-white transition-colors">Tienda</Link>
            <Link href="/collections" className="text-sm font-medium text-gray-500 hover:text-white transition-colors">Colecciones</Link>
            <Link href="/about" className="text-sm font-medium text-gray-500 hover:text-white transition-colors">Sobre nosotros</Link>
            <Link href="/contacto" className="text-sm font-medium text-gray-500 hover:text-white transition-colors">Contacto</Link>
          </nav>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-3 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
            <Search className="h-5 w-5" />
          </button>
          {/* More subtle Apple-style cart button */}
          <Link href="/carrito" className="flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-full hover:bg-gray-100 transition-all">
            <ShoppingCart className="h-4 w-4 text-black" />
            <span className="text-sm font-medium text-black">Carrito</span>
            {cartCount > 0 && (
              <span className="ml-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-black text-xs font-semibold text-white animate-in zoom-in duration-300">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="p-3 md:hidden text-gray-400">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
