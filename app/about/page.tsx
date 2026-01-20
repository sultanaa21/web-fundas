export default function AboutPage() {
    return (
        <div className="container mx-auto px-6 py-32 md:px-16">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-6xl md:text-8xl font-semibold tracking-tight text-white mb-20 leading-tight">
                    Sobre <br />
                    <span className="text-white/40">Nosotros.</span>
                </h1>

                <div className="space-y-10 text-left mt-32">
                    <section className="bg-white/[0.02] border border-white/5 p-12 md:p-16 rounded-[32px] backdrop-blur-sm">
                        <p className="text-gray-400 text-xl md:text-2xl leading-relaxed font-normal mb-10">
                            CASELYN es una tienda online especializada en fundas premium para móvil. El proyecto nació cuando detectamos que la mayoría de tiendas no ofrecían una experiencia de compra cuidada ni productos de verdadera calidad.
                        </p>
                        <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-normal">
                            Por eso seleccionamos fundas de diferentes estilos y diseños, siempre priorizando materiales de calidad y un servicio premium para el cliente. Tras mucho trabajo y dedicación, hoy CASELYN ofrece una experiencia pensada para quienes buscan fundas exclusivas, duraderas y bien diseñadas.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
