import { Mail, Phone, MapPin, Send } from "lucide-react";
import Button from "@/components/Button";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-6 py-32 md:px-16">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Contact Info */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-6xl md:text-8xl font-semibold tracking-tight text-white mb-10 leading-tight">
                            Get In <br />
                            <span className="text-white/40">Touch.</span>
                        </h1>
                        <p className="text-gray-400 text-lg mb-16 max-w-md font-normal leading-relaxed">
                            Have a question about our collections or need support with your order? Our team is here to help you.
                        </p>

                        <div className="space-y-12">
                            <div className="flex items-center gap-6 group">
                                <div className="h-14 w-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/50 group-hover:border-white/20 transition-all">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">Email Us</p>
                                    <p className="text-white text-base font-medium">support@caselyn.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group">
                                <div className="h-14 w-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/50 group_hover:border-white/20 transition-all">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">Call Us</p>
                                    <p className="text-white text-base font-medium">+1 (555) 000-CASELYN</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group">
                                <div className="h-14 w-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/50 group-hover:border-white/20 transition-all">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">Visit Studio</p>
                                    <p className="text-white text-base font-medium">123 Minimalist Way, New York, NY</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white/[0.02] border border-white/5 p-10 md:p-16 rounded-[32px] relative overflow-hidden backdrop-blur-sm">
                        <form className="relative space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-semibold uppercase tracking-tight text-white/40 ml-1">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-8 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-all"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-semibold uppercase tracking-tight text-white/40 ml-1">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-8 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-semibold uppercase tracking-tight text-white/40 ml-1">Message</label>
                                <textarea
                                    rows={5}
                                    placeholder="How can we help?"
                                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-8 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-all resize-none"
                                />
                            </div>
                            <Button variant="primary" className="w-full h-16 text-base gap-3" type="button">
                                <Send className="h-4 w-4" /> Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
