import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function GarantiaPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-24">
            <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-12 group"
                >
                    <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                    Volver
                </Link>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">Política de Garantías</h1>

                <div className="prose prose-invert prose-sm max-w-none space-y-12 text-gray-300">
                    <section>
                        <p className="text-lg">Todos los productos vendidos por CASELYN cuentan con una garantía de <strong>10 días naturales</strong> desde la fecha de recepción, exclusivamente por defectos de fabricación.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">La garantía no cubre:</h2>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Daños por uso indebido</li>
                            <li>Golpes, caídas o desgaste normal</li>
                            <li>Manipulaciones o modificaciones del producto</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">Para solicitar la garantía</h2>
                        <p>Será necesario enviar:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Número de pedido</li>
                            <li>Fotografías claras del defecto</li>
                            <li>Descripción del problema</li>
                        </ul>
                    </section>

                    <section className="pt-8 border-t border-white/10">
                        <p>Contacto:</p>
                        <a href="mailto:caselyncontact@gmail.com" className="text-white hover:underline block mt-2 font-medium">
                            📧 caselyncontact@gmail.com
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
}
