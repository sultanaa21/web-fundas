import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TerminosPage() {
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

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">Términos y Condiciones</h1>

                <div className="prose prose-invert prose-sm max-w-none space-y-12 text-gray-300">
                    <section>
                        <p className="text-lg">El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación de los presentes Términos y Condiciones.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">Uso del sitio web</h2>
                        <p>El usuario se compromete a:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Utilizar el sitio de forma legal y responsable</li>
                            <li>No realizar actividades fraudulentas</li>
                            <li>No interferir en el funcionamiento del sitio</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">Precios y pagos</h2>
                        <p>Todos los precios están expresados en la moneda indicada en el sitio web.</p>
                        <p className="mt-4">CASELYN se reserva el derecho a modificar precios y productos sin previo aviso.</p>
                        <p className="mt-4">Los pagos se procesan de forma segura mediante <strong>Stripe y PayPal</strong>.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">Responsabilidad</h2>
                        <p>CASELYN no se hace responsable de:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Retrasos en la entrega causados por terceros</li>
                            <li>Uso indebido de los productos</li>
                            <li>Daños derivados del uso incorrecto de las fundas</li>
                        </ul>
                    </section>

                    <section className="pt-8 border-t border-white/10">
                        <h2 className="text-xl font-semibold text-white mb-4">Modificaciones</h2>
                        <p>CASELYN se reserva el derecho a modificar estos términos en cualquier momento.</p>
                        <p className="mt-8 text-sm text-gray-500 italic">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
