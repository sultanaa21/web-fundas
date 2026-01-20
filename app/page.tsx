import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import Phone360Animation from "@/components/Phone360Animation";
import { ArrowRight, ShieldCheck, Truck, Zap, Cpu } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-32 pb-32">
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        {/* 3D Phone Animation Background */}
        <div className="absolute inset-0 z-0">
          <Phone360Animation speed={40} className="opacity-40" />
          {/* Blend Gradients */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-10" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent z-10" />
        </div>

        <div className="container relative z-20 mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md mb-8">
              <span className="relative flex h-1.5 w-1.5">
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/60"></span>
              </span>
              <span className="text-xs font-medium tracking-tight text-white/60">Premium Aesthetics</span>
            </div>

            <h1 className="text-7xl md:text-9xl font-semibold tracking-tight leading-none text-white select-none">
              CASELYN
            </h1>

            <div className="max-w-xl mx-auto mt-10">
              <p className="text-lg md:text-xl text-gray-400 font-normal leading-relaxed mb-16">
                Redefining protection through minimalist geometry and pure form.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Link href="/fundas">
                  <Button variant="primary" className="min-w-[220px] h-14 text-base">Explore Catalog</Button>
                </Link>
                <Link href="/collections" className="group flex items-center gap-2.5 text-base font-medium text-gray-500 hover:text-white transition-colors">
                  View Collections <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
          <div className="w-[1px] h-12 bg-white/10" />
        </div>
      </section>

      {/* Benefit Bar */}
      <section className="container mx-auto px-6 md:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-y border-white/5">
          <div className="flex items-center gap-3 text-gray-500 group hover:text-white transition-colors">
            <ShieldCheck className="h-5 w-5 text-white" />
            <span className="text-sm font-normal">Military Grade Protection</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500 group hover:text-white transition-colors">
            <Zap className="h-5 w-5 text-white" />
            <span className="text-sm font-normal">Sustainable Materials</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500 group hover:text-white transition-colors">
            <Cpu className="h-5 w-5 text-white" />
            <span className="text-sm font-normal">Magsafe Compatible</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500 group hover:text-white transition-colors">
            <Truck className="h-5 w-5 text-white" />
            <span className="text-sm font-normal">Free Worldwide Shipping</span>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="container mx-auto px-6 md:px-16">
        <div className="flex items-end justify-between mb-16">
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">Featured Collection</h2>
            <p className="mt-3 text-gray-500 font-normal">Curated designs for the season.</p>
          </div>
          <Link href="/fundas" className="group flex items-center gap-2 text-sm font-normal text-gray-400 hover:text-white transition-colors">
            View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="container mx-auto px-6 md:px-16">
        <div className="relative overflow-hidden rounded-[32px] bg-white/[0.02] border border-white/5 py-24 px-8 text-center max-w-5xl mx-auto">
          <h2 className="relative text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-white">
            Designed for <br /> the Future
          </h2>
          <p className="relative text-gray-400 max-w-xl mx-auto text-base mb-12 font-normal leading-relaxed">
            Join over 50,000 minimalists who receive our latest updates on pure form protection.
          </p>
          <div className="relative max-w-md mx-auto flex gap-2 p-1.5 bg-white/[0.03] rounded-full border border-white/10 backdrop-blur-sm">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-transparent border-none focus:ring-0 text-sm font-medium px-6 text-white placeholder:text-gray-600 outline-none"
            />
            <Button variant="primary" className="px-8 h-12">Join</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
