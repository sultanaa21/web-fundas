import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const collections = [
    {
        title: "Pure Motion",
        description: "Dynamic silhouettes for the modern carry.",
        image: "/minimal_case_silhouette_1_1768766996532.png",
        slug: "pure"
    },
    {
        title: "Essential Frame",
        description: "Defined boundaries. Absolute protection.",
        image: "/minimal_case_silhouette_4_1768767035904.png",
        slug: "essential"
    },
    {
        title: "Refined Geometry",
        description: "The intersection of form and function.",
        image: "/minimal_case_silhouette_6_1768767061453.png",
        slug: "refined"
    }
];

export default function CollectionsPage() {
    return (
        <div className="container mx-auto px-6 py-32 md:px-16">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white mb-20 text-center">
                Collections
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {collections.map((collection) => (
                    <Link
                        key={collection.slug}
                        href="/fundas"
                        className="group relative aspect-[4/5] overflow-hidden rounded-[32px] bg-white/[0.03] border border-white/5 transition-all hover:bg-white/[0.05] hover:border-white/20 backdrop-blur-sm"
                    >
                        <Image
                            src={collection.image}
                            alt={collection.title}
                            fill
                            className="object-contain p-16 opacity-40 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                        <div className="absolute bottom-12 left-12 right-12">
                            <h2 className="text-3xl font-semibold text-white mb-3 tracking-tight">
                                {collection.title}
                            </h2>
                            <p className="text-gray-400 text-base mb-8 leading-relaxed font-normal">
                                {collection.description}
                            </p>
                            <div className="inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight text-white/70 group-hover:text-white transition-colors">
                                Explore <ArrowRight className="h-4 w-4" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
