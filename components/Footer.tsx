import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-black pt-24 pb-16">
            <div className="container mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 gap-20 md:grid-cols-4">
                    <div className="flex flex-col gap-6">
                        {/* Simplified Apple-style logo */}
                        <Link href="/" className="text-xl font-semibold tracking-tight text-white">
                            CASELYN
                        </Link>
                        <p className="text-sm font-normal text-gray-500 leading-relaxed max-w-xs">
                            Elevating daily essentials through minimalist design and premium protection.
                        </p>
                    </div>
                    <div>
                        <h4 className="mb-6 text-xs font-semibold text-white">Shop</h4>
                        <ul className="flex flex-col gap-3 text-sm font-normal text-gray-500">
                            <li><Link href="/fundas" className="hover:text-white transition-colors">Catalog</Link></li>
                            <li><Link href="/collections" className="hover:text-white transition-colors">Collections</Link></li>
                            <li><Link href="/novedades" className="hover:text-white transition-colors">New Arrivals</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-6 text-xs font-semibold text-white">Support</h4>
                        <ul className="flex flex-col gap-3 text-sm font-normal text-gray-500">
                            <li><Link href="/contacto" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/envios" className="hover:text-white transition-colors">Shipping</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-6 text-xs font-semibold text-white">Connect</h4>
                        <ul className="flex flex-col gap-3 text-sm font-normal text-gray-500">
                            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">TikTok</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-normal text-gray-600">
                    <span>© {new Date().getFullYear()} CASELYN. All rights reserved.</span>
                    <div className="flex gap-8">
                        <Link href="/privacidad" className="hover:text-gray-400 transition-colors">Privacy</Link>
                        <Link href="/terminos" className="hover:text-gray-400 transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
