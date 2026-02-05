'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, TrendingUp, Clock, Layers, Globe } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const benefits = [
    {
        icon: Zap,
        title: '10x Más Rápido',
        description: 'Automatiza procesos en días, no meses. Despliega agentes inteligentes con velocidad empresarial.',
        color: 'text-amber-500'
    },
    {
        icon: Shield,
        title: 'Seguridad Enterprise',
        description: 'Cumplimiento SOC2, encriptación end-to-end y auditoría completa de todas las acciones.',
        color: 'text-emerald-500'
    },
    {
        icon: TrendingUp,
        title: 'ROI Comprobado',
        description: 'Clientes reportan 300% de retorno en el primer año con reducción del 80% en errores.',
        color: 'text-blue-500'
    },
    {
        icon: Clock,
        title: '24/7 Operación',
        description: 'Bots que nunca duermen. Automatización continua sin supervisión constante.',
        color: 'text-purple-500'
    },
    {
        icon: Layers,
        title: 'Multi-Sistema',
        description: 'Conecta cualquier aplicación: SAP, Oracle, Salesforce, legacy systems y más.',
        color: 'text-rose-500'
    },
    {
        icon: Globe,
        title: 'Escala Global',
        description: 'Despliega en múltiples regiones con soporte para internacionalización completa.',
        color: 'text-cyan-500'
    }
];

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

export function KeyBenefits() {
    return (
        <section className="py-24 md:py-32 bg-background relative overflow-hidden" id="beneficios">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rocket-red/5 to-transparent pointer-events-none" />

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rocket-red/10 border border-rocket-red/20 mb-6"
                        variants={itemVariants} transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <span className="w-2 h-2 rounded-full bg-rocket-red animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-rocket-red">
                            Beneficios Clave
                        </span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6 leading-tight"
                        variants={itemVariants} transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        ¿Por qué <span className="text-rocket-red">Rocketbot</span>?
                    </motion.h2>

                    <motion.p
                        className="text-lg md:text-xl max-w-2xl mx-auto text-foreground/70"
                        variants={itemVariants} transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        La plataforma de automatización más completa y poderosa para empresas que quieren escalar.
                    </motion.p>
                </motion.div>

                {/* Benefits Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {benefits.map((benefit, index) => (
                        <motion.div key={benefit.title} variants={itemVariants} transition={{ duration: 0.5, ease: "easeOut" }}>
                            <GlassCard className="p-8 h-full" variant="default">
                                <div className="flex flex-col h-full">
                                    {/* Icon with glow */}
                                    <motion.div
                                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center mb-6 shadow-lg ${benefit.color}`}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: 'spring', stiffness: 400 }}
                                    >
                                        <benefit.icon className="w-7 h-7" />
                                    </motion.div>

                                    {/* Content */}
                                    <h3 className="text-xl font-display font-black mb-3">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-foreground/60 text-sm leading-relaxed flex-grow">
                                        {benefit.description}
                                    </p>

                                    {/* Bottom accent */}
                                    <motion.div
                                        className="h-1 w-12 bg-gradient-to-r from-rocket-red to-rocket-red/50 rounded-full mt-6"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: 48 }}
                                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                    />
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
