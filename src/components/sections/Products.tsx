'use client';

import { motion } from 'framer-motion';
import { Brain, Eye, Activity, MousePointer2, ThumbsUp, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const products = [
    {
        title: "RPA STUDIO",
        description: "Construcción de bots transaccionales y procesos repetitivos.",
        icon: MousePointer2,
        href: "https://rocketbot.com/es/productos/studio/"
    },
    {
        title: "AI STUDIO",
        description: "Aprendizaje automático, análisis de datos, optimización de procesos y ejecución inteligente de tareas.",
        icon: Eye,
        href: "https://rocketbot.com/es/productos/ai-studio/"
    },
    {
        title: "SATURN STUDIO",
        description: "Diseño de flujos, condiciones, decisiones y agentes inteligentes.",
        icon: Brain,
        href: "https://rocketbot.com/es/productos/studio/"
    },
    {
        title: "ORQUESTADOR",
        description: "Gestión centralizada de bots, procesos y excepciones, con interfaz de colaboración humana (HITL).",
        icon: Activity,
        href: "https://rocketbot.com/es/productos/orchestrator/"
    },
    {
        title: "XPERIENCE",
        description: "Crea formularios inteligentes que conectan, automatizan y disparan procesos empresariales.",
        icon: ThumbsUp,
        href: "https://rocketbot.com/es/productos/xperience/"
    }
];

export function Products() {
    return (
        <section className="py-32 bg-background relative overflow-hidden transition-colors duration-300" id="plataforma">
            <div className="container px-6 mx-auto relative z-10">

                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-rocket-red font-black uppercase tracking-widest text-sm mb-4"
                    >
                        Nuestra Suite
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-display font-black text-foreground mb-6"
                    >
                        Productos
                    </motion.h2>
                    <div className="w-24 h-1 bg-rocket-red mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="h-full p-8 rounded-[32px] bg-card border border-border group-hover:border-rocket-red/50 transition-all duration-500 flex flex-col items-center text-center">

                                <div className="relative mb-8">
                                    <div className="absolute -inset-4 bg-rocket-red/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center text-rocket-red group-hover:bg-rocket-red group-hover:text-white transition-all duration-300 transform group-hover:-rotate-12 group-hover:scale-110 shadow-sm group-hover:shadow-rocket-red/20 shadow-black/5">
                                        <product.icon className="w-8 h-8" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-display font-black text-foreground mb-4 uppercase tracking-tighter">
                                    {product.title}
                                </h3>

                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 grow">
                                    {product.description}
                                </p>

                                <Link
                                    href={product.href}
                                    className="w-full py-3 rounded-xl bg-background border border-border text-foreground text-xs font-bold uppercase tracking-widest hover:bg-rocket-red hover:text-white hover:border-rocket-red transition-all duration-300"
                                >
                                    Ver más
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
