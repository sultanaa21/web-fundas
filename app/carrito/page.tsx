import Link from "next/link";
import Button from "@/components/Button";
import { ArrowLeft, ShoppingBag, Zap } from "lucide-react";

export default function CartPage() {
    return (
        <div className="container mx-auto px-6 py-32 md:px-16">
            <div className="flex items-center justify-between mb-20">
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">Your Cart</h1>
                <Link href="/fundas" className="text-sm font-medium text-gray-500 hover:text-white transition-colors flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Continue Shopping
                </Link>
            </div>

            <div className="relative overflow-hidden rounded-[32px] bg-white/[0.02] border border-white/5 py-40 px-8 text-center flex flex-col items-center max-w-5xl mx-auto">
                <div className="relative mb-12 w-28 h-28 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/50 backdrop-blur-sm">
                    <ShoppingBag className="h-12 w-12" />
                </div>

                <h2 className="relative text-3xl font-semibold tracking-tight text-white mb-6">
                    Empty Sanctuary
                </h2>
                <p className="relative text-gray-400 max-w-sm mx-auto text-lg mb-12 font-normal leading-relaxed">
                    Your collection is waiting for its first masterpiece. <br /> Elevate your carry now.
                </p>

                <Link href="/fundas" className="relative mb-10">
                    <Button variant="primary" className="px-12 h-14 gap-3 text-base">
                        <Zap className="h-4 w-4" /> Browse Catalog
                    </Button>
                </Link>

                <Link href="/checkout" className="text-sm font-medium text-gray-500 hover:text-white transition-colors">
                    Go to Checkout
                </Link>
            </div>
        </div>
    );
}
