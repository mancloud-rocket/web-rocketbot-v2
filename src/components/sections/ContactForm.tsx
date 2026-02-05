'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Building2, MessageSquare, CheckCircle2 } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

interface FormData {
    name: string;
    email: string;
    company: string;
    message: string;
}

export function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        company: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [focused, setFocused] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', company: '', message: '' });
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const inputClasses = (field: string) => `
    w-full px-4 py-4 pl-12
    bg-white/50 dark:bg-white/5
    backdrop-blur-sm
    border border-border
    rounded-xl
    text-foreground
    placeholder:text-foreground/40
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-rocket-red/30 focus:border-rocket-red/50
    ${focused === field ? 'shadow-lg shadow-rocket-red/10' : ''}
  `;

    return (
        <section className="py-24 md:py-32 bg-background relative overflow-hidden" id="contacto">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-rocket-red/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px]" />
            </div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="glass-card-premium p-8 md:p-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        {/* Header */}
                        <motion.div className="text-center mb-10" variants={itemVariants} transition={{ duration: 0.5, ease: "easeOut" }}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rocket-red/10 border border-rocket-red/20 mb-6">
                                <span className="w-2 h-2 rounded-full bg-rocket-red animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-wider text-rocket-red">
                                    Hablemos
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black mb-4">
                                ¿Listo para <span className="text-rocket-red">automatizar</span>?
                            </h2>
                            <p className="text-foreground/60 max-w-lg mx-auto">
                                Cuéntanos sobre tu proyecto y nuestro equipo te contactará en menos de 24 horas.
                            </p>
                        </motion.div>

                        {/* Form */}
                        {!submitted ? (
                            <motion.form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                                variants={containerVariants}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <motion.div className="relative" variants={itemVariants} transition={{ duration: 0.5, ease: "easeOut" }}>
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Tu nombre"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={() => setFocused('name')}
                                            onBlur={() => setFocused(null)}
                                            required
                                            className={inputClasses('name')}
                                        />
                                    </motion.div>

                                    {/* Email */}
                                    <motion.div className="relative" variants={itemVariants} transition={{ duration: 0.5, ease: "easeOut" }}>
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="tu@email.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocused('email')}
                                            onBlur={() => setFocused(null)}
                                            required
                                            className={inputClasses('email')}
                                        />
                                    </motion.div>
                                </div>

                                {/* Company */}
                                <motion.div className="relative" variants={itemVariants} transition={{ duration: 0.5, ease: "easeOut" }}>
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                    <input
                                        type="text"
                                        name="company"
                                        placeholder="Nombre de tu empresa"
                                        value={formData.company}
                                        onChange={handleChange}
                                        onFocus={() => setFocused('company')}
                                        onBlur={() => setFocused(null)}
                                        className={inputClasses('company')}
                                    />
                                </motion.div>

                                {/* Message */}
                                <motion.div className="relative" variants={itemVariants} transition={{ duration: 0.5, ease: "easeOut" }}>
                                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-foreground/40" />
                                    <textarea
                                        name="message"
                                        placeholder="Cuéntanos sobre tu proyecto de automatización..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocused('message')}
                                        onBlur={() => setFocused(null)}
                                        rows={4}
                                        required
                                        className={`${inputClasses('message')} resize-none pt-4`}
                                    />
                                </motion.div>

                                {/* Submit Button & WhatsApp */}
                                <motion.div className="flex flex-wrap items-center gap-4" variants={itemVariants} transition={{ duration: 0.5, ease: "easeOut" }}>
                                    <motion.button
                                        type="submit"
                                        className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-rocket-red to-red-600 text-white font-bold rounded-xl shadow-lg shadow-rocket-red/30 flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-rocket-red/40 transition-all font-display uppercase tracking-wider text-sm"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Send className="w-5 h-5" />
                                        Enviar Mensaje
                                    </motion.button>

                                    <motion.a
                                        href="https://wa.me/+34600484723"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-14 h-14 bg-[#25D366] text-white flex items-center justify-center rounded-xl shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all cursor-pointer"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        title="Chatea con nosotros"
                                    >
                                        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                    </motion.a>
                                </motion.div>
                            </motion.form>
                        ) : (
                            /* Success State */
                            <motion.div
                                className="text-center py-12"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                >
                                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                                </motion.div>
                                <h3 className="text-2xl font-display font-black mb-2">¡Mensaje enviado!</h3>
                                <p className="text-foreground/60">Te contactaremos pronto.</p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
