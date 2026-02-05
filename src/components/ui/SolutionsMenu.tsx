'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    ShoppingBag,
    GraduationCap,
    Users,
    Landmark,
    Briefcase
} from 'lucide-react';

interface SolutionsMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const solutions = [
    {
        title: 'Retail',
        description: 'Logística, inventarios y experiencia de compra unificada.',
        icon: ShoppingBag,
        href: '/soluciones/retail',
        color: 'text-orange-500',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20'
    },
    {
        title: 'Educación',
        description: 'Gestión académica, admisiones y servicios estudiantiles.',
        icon: GraduationCap,
        href: '/soluciones/educacion',
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20'
    },
    {
        title: 'RRHH',
        description: 'Gestión de talento, nómina y procesos internos optimizados.',
        icon: Users,
        href: '/soluciones/rrhh',
        color: 'text-rose-500',
        bg: 'bg-rose-500/10',
        border: 'border-rose-500/20'
    },
    {
        title: 'Finanzas',
        description: 'Conciliación, reportes y automatización contable.',
        icon: Landmark,
        href: '/soluciones/finanzas',
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20'
    }
];

export function SolutionsMenu({ isOpen, onClose }: SolutionsMenuProps) {
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
                    {/* Backdrop Blur Overlay for whole screen */}
                    {/* Backdrop Blur Overlay for whole screen - Starting below Navbar to keep it sharp */}
                    <div className="fixed top-[72px] inset-x-0 bottom-0 bg-background/20 backdrop-blur-md -z-10" onClick={onClose} />

                    <div className="container mx-auto max-w-7xl px-4">
                        <div className="glass-card-premium p-6 rounded-2xl border border-white/20 shadow-2xl bg-white/70 dark:bg-black/70 backdrop-blur-[40px] backdrop-saturate-[180%]">
                            <div className="grid grid-cols-12 gap-8">
                                {/* Left Side: Highlight / CTA */}
                                <div className="col-span-12 lg:col-span-3 flex flex-col justify-between p-4 rounded-xl bg-gradient-to-br from-rocket-red/10 to-transparent border border-rocket-red/10">
                                    <div>
                                        <div className="w-12 h-12 rounded-lg bg-rocket-red/20 flex items-center justify-center mb-4">
                                            <Briefcase className="w-6 h-6 text-rocket-red" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Soluciones por Industria</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Descubre cómo Rocketbot transforma procesos críticos en cada sector.
                                        </p>
                                    </div>
                                    <div className="mt-8">
                                        <div className="text-xs font-bold text-rocket-red uppercase tracking-widest mb-2">CASOS DE ÉXITO</div>
                                        <div className="text-sm font-bold">+500 Implementaciones</div>
                                    </div>
                                </div>

                                {/* Right Side: Solutions Grid */}
                                <div className="col-span-12 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {solutions.map((item) => (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            onClick={onClose}
                                            className={`group relative p-4 rounded-xl border transition-all duration-300 hover:shadow-lg flex items-start gap-4 ${item.bg} ${item.border} hover:bg-opacity-20`}
                                        >
                                            <div className={`p-3 rounded-lg bg-background/50 backdrop-blur-sm ${item.color}`}>
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-semibold text-foreground group-hover:text-rocket-red transition-colors">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {item.description}
                                                </p>
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
