import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function DevolucionesPage() {
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

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">Política de Devoluciones y Reembolsos</h1>

                <div className="prose prose-invert prose-sm max-w-none space-y-12 text-gray-300">
                    <section>
                        <p className="text-lg">En CASELYN, queremos que estés satisfecho con tu compra.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">Plazo de devoluciones</h2>
                        <p>Aceptamos devoluciones <strong>dentro de los 10 días naturales</strong> posteriores a la recepción del producto.</p>
                        <p className="mt-4">Para que una devolución sea aceptada:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>El producto debe estar sin usar</li>
                            <li>Debe conservar su estado original</li>
                            <li>No debe presentar daños causados por el cliente</li>
                        </ul>
                        <p className="mt-6 text-yellow-500/80">⚠️ No se aceptarán devoluciones una vez superados los 10 días desde la entrega.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">Productos personalizados</h2>
                        <p>Las fundas personalizadas o hechas a medida <strong>no admiten devolución</strong>, salvo en caso de defecto de fabricación o error por nuestra parte.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">Proceso de reembolso</h2>
                        <p>Una vez recibida y revisada la devolución, el reembolso se procesará en un plazo de <strong>5 a 10 días hábiles</strong>.</p>
                        <p className="mt-4">El reembolso se realizará utilizando el mismo método de pago empleado en la compra (Stripe o PayPal). Ten en cuenta que <strong>Stripe o PayPal pueden tardar algunos días adicionales</strong> en reflejar el importe en tu cuenta bancaria.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">Costos de envío</h2>
                        <p>Los gastos de envío <strong>no son reembolsables</strong>, salvo en caso de producto defectuoso o error de envío atribuible a CASELYN.</p>
                    </section>

                    <section className="pt-8 border-t border-white/10">
                        <p>Para iniciar una devolución, contáctanos en:</p>
                        <a href="mailto:caselyncontact@gmail.com" className="text-white hover:underline block mt-2 font-medium">
                            📧 caselyncontact@gmail.com
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
}
