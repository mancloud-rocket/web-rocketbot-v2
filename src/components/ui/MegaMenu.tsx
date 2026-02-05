'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Layers,
    Rocket,
    Brain,
    Bot,
    Network,
    Layout,
    ArrowRight,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from './GlassCard';

interface MegaMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const products = [
    {
        title: 'Rocketbot Suite',
        description: 'La plataforma de automatización empresarial end-to-end.',
        icon: Layers,
        href: '/plataforma/suite',
        color: 'text-rocket-red',
        bg: 'bg-rocket-red/10',
        border: 'border-rocket-red/20'
    },
    {
        title: 'Saturn Studio',
        description: 'Construye bots potentes sin límites en Python.',
        icon: Rocket,
        href: '/plataforma/saturn-studio',
        color: 'text-orange-500',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20'
    },
    {
        title: 'AIStudio',
        description: 'Inteligencia Artificial Generativa y OCR avanzado.',
        icon: Brain,
        href: '/plataforma/aistudio',
        color: 'text-neon-magenta',
        bg: 'bg-neon-magenta/10',
        border: 'border-neon-magenta/20'
    },
    {
        title: 'RPA Studio',
        description: 'Automatización legacy y desktop robusta.',
        icon: Bot,
        href: '/plataforma/rpa-studio',
        color: 'text-green-500',
        bg: 'bg-green-500/10',
        border: 'border-green-500/20'
    },
    {
        title: 'Orquestador',
        description: 'Gobierno, programación y gestión centralizada.',
        icon: Network,
        href: '/plataforma/orchestrator',
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20'
    },
    {
        title: 'Xperience',
        description: 'Formularios inteligentes y Human-in-the-Loop.',
        icon: Layout,
        href: '/plataforma/xperience',
        color: 'text-neon-cyan',
        bg: 'bg-neon-cyan/10',
        border: 'border-neon-cyan/20'
    }
];

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full left-0 w-full pt-4 z-50"
                    onMouseLeave={onClose}
                >
                    {/* Backdrop Blur Overlay for whole screen - Starting below Navbar to keep it sharp */}
                    <div className="fixed top-[72px] inset-x-0 bottom-0 bg-background/20 backdrop-blur-md -z-10" onClick={onClose} />

                    <div className="container mx-auto max-w-7xl px-4">
                        <div className="glass-card-premium p-6 rounded-2xl border border-white/20 shadow-2xl bg-white/70 dark:bg-black/70 backdrop-blur-[40px] backdrop-saturate-[180%]">
                            <div className="grid grid-cols-12 gap-8">
                                {/* Left Side: Highlight / CTA */}
                                <div className="col-span-12 lg:col-span-3 flex flex-col justify-between p-4 rounded-xl bg-gradient-to-br from-rocket-red/10 to-transparent border border-rocket-red/10">
                                    <div>
                                        <h3 className="text-lg font-display font-bold text-foreground mb-2">
                                            Plataforma Integral
                                        </h3>
                                        <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
                                            Una suite completa diseñada para escalar tu fuerza de trabajo digital desde un solo lugar.
                                        </p>
                                    </div>
                                    <Link
                                        href="/plataforma/suite"
                                        className="flex items-center gap-2 text-sm font-bold text-rocket-red hover:translate-x-1 transition-transform"
                                        onClick={onClose}
                                    >
                                        Explorar todo
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>

                                {/* Right Side: Product Grid */}
                                <div className="col-span-12 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {products.map((product) => (
                                        <Link
                                            key={product.title}
                                            href={product.href}
                                            onClick={onClose}
                                            className="group block"
                                        >
                                            <div className="h-full p-4 rounded-xl transition-all duration-200 hover:bg-white/5 hover:scale-[1.02] border border-transparent hover:border-white/10">
                                                <div className="flex items-start gap-4">
                                                    <div className={cn(
                                                        "p-2.5 rounded-lg transition-colors",
                                                        product.bg,
                                                        product.color
                                                    )}>
                                                        <product.icon className="w-6 h-6" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h4 className="font-bold text-foreground group-hover:text-rocket-red transition-colors">
                                                                {product.title}
                                                            </h4>
                                                            <ChevronRight className="w-4 h-4 text-foreground/30 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                        </div>
                                                        <p className="text-xs text-foreground/60 leading-relaxed font-medium">
                                                            {product.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
