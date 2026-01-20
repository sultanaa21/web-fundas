import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import Phone360Animation from "@/components/Phone360Animation";
{/* Featured Collection */ }
<section className="container mx-auto px-6 md:px-16">
  <div className="flex items-end justify-between mb-16">
    <div className="text-left">
      <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">Colección Destacada</h2>
      <p className="mt-3 text-gray-500 font-normal">Diseños seleccionados para esta temporada.</p>
    </div>
    <Link href="/fundas" className="group flex items-center gap-2 text-sm font-normal text-gray-400 hover:text-white transition-colors">
      Ver todo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  </div>

  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</section>

{/* Newsletter / CTA */ }
<section className="container mx-auto px-6 md:px-16">
  <div className="relative overflow-hidden rounded-[32px] bg-white/[0.02] border border-white/5 py-24 px-8 text-center max-w-5xl mx-auto">
    <h2 className="relative text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-white">
      Diseñado para <br /> el Futuro
    </h2>
    <p className="relative text-gray-400 max-w-xl mx-auto text-base mb-12 font-normal leading-relaxed">
      Únete a más de 50.000 minimalistas que reciben nuestras últimas novedades sobre protección de forma pura.
    </p>
    <div className="relative max-w-md mx-auto flex gap-2 p-1.5 bg-white/[0.03] rounded-full border border-white/10 backdrop-blur-sm">
      <input
        type="email"
        placeholder="Introduce tu email"
        className="flex-grow bg-transparent border-none focus:ring-0 text-sm font-medium px-6 text-white placeholder:text-gray-600 outline-none"
      />
      <Button variant="primary" className="px-8 h-12">Unirme</Button>
    </div>
  </div>
</section>
    </div >
  );
}
