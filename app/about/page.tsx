export default function AboutPage() {
    return (
        <div className="container mx-auto px-6 py-32 md:px-16">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-6xl md:text-8xl font-semibold tracking-tight text-white mb-20 leading-tight">
                    Minimalismo <br />
                    <span className="text-white/40">Reimaginado.</span>
                </h1>

                <div className="space-y-12 text-left mt-32">
                    <section className="bg-white/[0.02] border border-white/5 p-12 md:p-16 rounded-[32px] backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold text-white mb-8 tracking-tight">Nuestra Filosofía</h2>
                        <p className="text-gray-400 text-xl leading-relaxed font-normal">
                            En CASELYN, creemos que tu dispositivo más esencial merece algo más que una simple &quot;protección&quot;. Merece ser una extensión de tu identidad. Combinamos la forma geométrica pura con ingeniería de precisión para crear objetos que redefinen la relación entre tecnología y estética.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <section className="bg-white/[0.02] border border-white/5 p-10 rounded-[32px] backdrop-blur-sm">
                            <h2 className="text-xl font-semibold text-white mb-5 tracking-tight">Artesanía</h2>
                            <p className="text-gray-500 text-base leading-relaxed font-normal">
                                Cada funda CASELYN se somete a rigurosas pruebas y es inspeccionada a mano para detectar defectos microscópicos. Utilizamos polímeros de primera calidad y materiales de grado aeroespacial.
                            </p>
                        </section>
                        <section className="bg-white/[0.02] border border-white/5 p-10 rounded-[32px] backdrop-blur-sm">
                            <h2 className="text-xl font-semibold text-white mb-5 tracking-tight">Sostenibilidad</h2>
                            <p className="text-gray-500 text-base leading-relaxed font-normal">
                                Nuestro compromiso con el futuro significa utilizar embalajes 100% reciclados y métodos de envío neutros en carbono. Diseñamos para la longevidad, no para el desecho.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
