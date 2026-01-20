import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function EnviosPage() {
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

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">Política de Envíos</h1>

                <div className="prose prose-invert prose-sm max-w-none space-y-12 text-gray-300">
                    <section>
                        <p className="text-lg text-white font-medium italic">CASELYN trabaja bajo un modelo de dropshipping, por lo que los productos se envían directamente desde nuestros proveedores.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">Procesamiento de pedidos</h2>
                        <p>El tiempo de procesamiento es de <strong>3 a 7 días hábiles</strong> antes del envío.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">Tiempo de entrega</h2>
                        <p>El plazo estimado de entrega es de <strong>7 a 20 días hábiles</strong>, dependiendo del destino y la empresa de transporte.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">Retrasos</h2>
                        <p>CASELYN no se responsabiliza de retrasos causados por:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Aduanas</li>
                            <li>Festivos</li>
                            <li>Problemas logísticos ajenos a la empresa</li>
                        </ul>
                        <p className="mt-8">Se proporcionará número de seguimiento cuando esté disponible.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
