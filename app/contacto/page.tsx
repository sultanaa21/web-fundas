"use client";

import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import Button from "@/components/Button";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Algo salió mal. Por favor intenta de nuevo.");
            }

            setStatus("success");
            setFormData({ name: "", email: "", message: "" });

            // Reset success message after 5 seconds if desired, or keep it.
            setTimeout(() => setStatus("idle"), 5000); // Optional: reset state

        } catch (error: any) {
            console.error("Form error:", error);
            setStatus("error");
            setErrorMessage(error.message || "Error al enviar el mensaje.");
        }
    };

    return (
        <div className="container mx-auto px-6 py-32 md:px-16">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Contact Info */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-6xl md:text-8xl font-semibold tracking-tight text-white mb-10 leading-tight">
                            Ponte en <br />
                            <span className="text-white/40">Contacto.</span>
                        </h1>
                        <p className="text-gray-400 text-lg mb-16 max-w-md font-normal leading-relaxed">
                            ¿Tienes alguna pregunta sobre nuestras colecciones o necesitas ayuda con tu pedido? Nuestro equipo está aquí para ayudarte.
                        </p>

                        <div className="space-y-12">
                            <div className="flex items-center gap-6 group">
                                <div className="h-14 w-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/50 group-hover:border-white/20 transition-all">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">Escríbenos</p>
                                    <p className="text-white text-base font-medium">caselyncontact@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white/[0.02] border border-white/5 p-10 md:p-16 rounded-[32px] relative overflow-hidden backdrop-blur-sm">
                        <form onSubmit={handleSubmit} className="relative space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-tight text-white/40 ml-1">Nombre</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Tu nombre"
                                        disabled={status === "loading" || status === "success"}
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-8 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-all disabled:opacity-50"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-tight text-white/40 ml-1">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Tu email"
                                        disabled={status === "loading" || status === "success"}
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-8 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-all disabled:opacity-50"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-tight text-white/40 ml-1">Mensaje</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    maxLength={1000}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="¿En qué podemos ayudarte?"
                                    disabled={status === "loading" || status === "success"}
                                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-8 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-all resize-none disabled:opacity-50"
                                />
                            </div>

                            {status === "error" && (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-200 text-sm">
                                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            {status === "success" ? (
                                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3 text-green-200 text-sm">
                                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                                    <span>¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.</span>
                                </div>
                            ) : (
                                <Button
                                    variant="primary"
                                    className="w-full h-16 text-base gap-3"
                                    type="submit"
                                    disabled={status === "loading"}
                                >
                                    {status === "loading" ? (
                                        <>
                                            <div className="h-4 w-4 border-2 border-slate-800 border-t-transparent rounded-full animate-spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4" /> Enviar Mensaje
                                        </>
                                    )}
                                </Button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
