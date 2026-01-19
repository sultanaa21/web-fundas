import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        slug: string;
        price: number;
        category: string;
        image: string;
        description: string;
        badge?: string;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group flex flex-col overflow-hidden rounded-[28px] bg-white/[0.03] border border-white/5 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/10">
            <Link href={`/producto/${product.slug}`} className="relative aspect-[4/5] overflow-hidden">
                {product.image && (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-12 transition-transform duration-500 group-hover:scale-105"
                    />
                )}
                {product.badge && (
                    <div className="absolute top-5 left-5 z-10 px-4 py-1.5 bg-white/95 backdrop-blur-sm text-black text-xs font-medium rounded-full">
                        {product.badge}
                    </div>
                )}
            </Link>
            <div className="flex flex-1 flex-col p-8 text-left">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500">
                        {product.category}
                    </span>
                    <span className="text-lg font-semibold text-white">{product.price.toFixed(2)}€</span>
                </div>
                <Link href={`/producto/${product.slug}`} className="block">
                    <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-gray-200 line-clamp-1">
                        {product.name}
                    </h3>
                </Link>
                <p className="mt-3 line-clamp-2 text-sm text-gray-500 flex-grow leading-relaxed">
                    {product.description}
                </p>
            </div>
        </div>
    );
}
