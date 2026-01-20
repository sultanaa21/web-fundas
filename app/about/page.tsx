export default function AboutPage() {
    return (
        <div className="container mx-auto px-6 py-32 md:px-16">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-6xl md:text-8xl font-semibold tracking-tight text-white mb-24 leading-tight">
                    Sobre <br />
                    <span className="text-white/40">Nosotros.</span>
                </h1>

                <div className="mt-32 space-y-20 text-left">
                    <section className="relative group">
                        <div className="absolute -inset-8 bg-gradient-to-r from-white/5 to-transparent rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
                        <div className="relative bg-white/[0.02] border border-white/5 p-12 md:p-20 rounded-[40px] backdrop-blur-md overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -mr-32 -mt-32" />

                            <p className="text-white/90 text-2xl md:text-3xl leading-[1.4] font-medium mb-12 tracking-tight">
                                CASELYN es una tienda online especializada en fundas premium para móvil. El proyecto nació cuando detectamos que la mayoría de tiendas no ofrecían una experiencia de compra cuidada ni productos de verdadera calidad.
                            </p>

                            <div className="w-12 h-[1px] bg-white/20 mb-12" />

                            <p className="text-gray-500 text-lg md:text-xl leading-[1.7] font-normal max-w-2xl italic">
                                Por eso seleccionamos fundas de diferentes estilos y diseños, siempre priorizando materiales de calidad y un servicio premium para el cliente. Tras mucho trabajo y dedicación, hoy CASELYN ofrece una experiencia pensada para quienes buscan fundas exclusivas, duraderas y bien diseñadas.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
