export default function AboutPage() {
    return (
        <div className="container mx-auto px-6 py-32 md:px-16">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-6xl md:text-8xl font-semibold tracking-tight text-white mb-20 leading-tight">
                    Minimalism <br />
                    <span className="text-white/40">Reimagined.</span>
                </h1>

                <div className="space-y-12 text-left mt-32">
                    <section className="bg-white/[0.02] border border-white/5 p-12 md:p-16 rounded-[32px] backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold text-white mb-8 tracking-tight">The Philosophy</h2>
                        <p className="text-gray-400 text-xl leading-relaxed font-normal">
                            At CASELYN, we believe that your most essential device deserves more than just &quot;protection.&quot; It deserves an extension of your identity. We combine pure geometric form with precision engineering to create objects that redefine the relationship between technology and aesthetic.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <section className="bg-white/[0.02] border border-white/5 p-10 rounded-[32px] backdrop-blur-sm">
                            <h2 className="text-xl font-semibold text-white mb-5 tracking-tight">Craftsmanship</h2>
                            <p className="text-gray-500 text-base leading-relaxed font-normal">
                                Every CASELYN case undergoes rigorous testing and is hand-inspected for microscopic defects. We use premium polymers and aerospace-grade materials.
                            </p>
                        </section>
                        <section className="bg-white/[0.02] border border-white/5 p-10 rounded-[32px] backdrop-blur-sm">
                            <h2 className="text-xl font-semibold text-white mb-5 tracking-tight">Sustainability</h2>
                            <p className="text-gray-500 text-base leading-relaxed font-normal">
                                Our commitment to the future means using 100% recycled packaging and carbon-neutral shipping methods. We design for longevity, not disposability.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
