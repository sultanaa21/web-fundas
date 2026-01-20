import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PrivacidadPage() {
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

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">Política de Privacidad</h1>

                <div className="prose prose-invert prose-sm max-w-none space-y-12 text-gray-300">
                    <section>
                        <p className="text-lg">En CASELYN, respetamos y protegemos la privacidad de nuestros usuarios.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">Información que recopilamos</h2>
                        <p>Podemos recopilar la siguiente información:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Nombre y apellidos</li>
                            <li>Dirección de correo electrónico</li>
                            <li>Dirección de envío</li>
                            <li>Información de pago (gestionada de forma segura por Stripe y PayPal)</li>
                        </ul>
                        <p className="mt-6 font-medium text-white">CASELYN no almacena datos bancarios ni información de tarjetas.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">Uso de la información</h2>
                        <p>La información recopilada se utiliza para:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Procesar y gestionar pedidos</li>
                            <li>Enviar confirmaciones y notificaciones</li>
                            <li>Proporcionar atención al cliente</li>
                            <li>Mejorar la experiencia de usuario</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">Protección de datos</h2>
                        <p>Aplicamos medidas de seguridad técnicas y organizativas para proteger tus datos personales.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">Terceros</h2>
                        <p>Compartimos únicamente la información necesaria con:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Plataformas de pago (Stripe y PayPal)</li>
                            <li>Proveedores logísticos encargados del envío</li>
                        </ul>
                        <p className="mt-4">Nunca vendemos ni cedemos tus datos personales a terceros.</p>
                    </section>

                    <section className="pt-8 border-t border-white/10">
                        <h2 className="text-xl font-semibold text-white mb-4">Derechos del usuario</h2>
                        <p>Puedes solicitar el acceso, modificación o eliminación de tus datos personales escribiendo a:</p>
                        <a href="mailto:caselyncontact@gmail.com" className="text-white hover:underline block mt-2 font-medium">
                            📧 caselyncontact@gmail.com
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
}
