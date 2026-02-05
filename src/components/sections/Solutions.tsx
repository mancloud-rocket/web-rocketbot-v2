'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Landmark, FileDown, CheckCircle2, ArrowRight, ShoppingBag, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

const solutions = [
    {
        id: 'retail',
        title: 'RETAIL',
        icon: ShoppingBag,
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
        useCases: [
            'Gestión de Inventarios',
            'Procesamiento de Pedidos',
            'Informes Operativos Automatizados',
            'Gestión de Logística y Envíos',
            'Conciliación de Pagos',
            'Actualización de Portales'
        ]
    },
    {
        id: 'educacion',
        title: 'EDUCACIÓN',
        icon: GraduationCap,
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
        useCases: [
            'Gestión de Matrículas y Admisiones',
            'Procesamiento de Pagos y Facturación',
            'Reportes Académicos y Administrativos',
            'Gestión de Solicitudes Estudiantiles',
            'Gestión de Personal'
        ]
    },
    {
        id: 'rrhh',
        title: 'RRHH',
        icon: Users,
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800',
        useCases: [
            'Procesamiento de Solicitudes de Préstamos',
            'Monitoreo y Prevención de Fraudes',
            'Activación, Remisión y Cierre de Casos',
            'Renovación de Depósitos a Plazos',
            'Onboarding de Empleados'
        ]
    },
    {
        id: 'finanzas',
        title: 'FINANZAS',
        icon: Landmark,
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
        useCases: [
            'Conciliación Bancaria Automática',
            'Generación de Reportes Financieros',
            'Gestión de Cuentas por Pagar',
            'Auditoría y Cumplimiento',
            'Gestión de Riesgos'
        ]
    }
];

export function Solutions() {
    const [activeTab, setActiveTab] = useState(solutions[0]);

    return (
        <section className="py-32 bg-background relative border-t border-border transition-colors duration-300" id="soluciones">
            <div className="container px-6 mx-auto">

                <div className="max-w-3xl mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-black text-foreground mb-6">
                        Soluciones por <span className="text-rocket-red">Industria</span>
                    </h2>
                    <p className="text-xl text-gray-500 dark:text-gray-400">
                        Optimizamos los procesos críticos de tu negocio, permitiendo que tu equipo se concentre en decisiones estratégicas.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row bg-card rounded-[40px] border border-border overflow-hidden shadow-2xl">

                    {/* Navigation Sidebar */}
                    <div className="lg:w-1/3 border-b lg:border-b-0 lg:border-r border-border p-8 lg:p-12 space-y-4">
                        {solutions.map((sol) => (
                            <button
                                key={sol.id}
                                onClick={() => setActiveTab(sol)}
                                className={cn(
                                    "w-full group flex items-center justify-between p-6 rounded-2xl transition-all duration-300",
                                    activeTab.id === sol.id
                                        ? "bg-rocket-red text-white shadow-xl shadow-rocket-red/20"
                                        : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 hover:text-foreground"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <sol.icon className={cn("w-6 h-6", activeTab.id === sol.id ? "text-white" : "text-rocket-red group-hover:scale-110 transition-transform")} />
                                    <span className="font-display font-black tracking-widest uppercase">{sol.title}</span>
                                </div>
                                {activeTab.id === sol.id && <motion.div layoutId="arrow"><ArrowRight className="w-5 h-5" /></motion.div>}
                            </button>
                        ))}

                        <div className="pt-12 mt-12 border-t border-border/50 hidden lg:block">
                            <div className="p-6 rounded-2xl bg-rocket-red/5 border border-rocket-red/10 group cursor-pointer hover:bg-rocket-red transition-all">
                                <p className="text-xs font-bold text-rocket-red group-hover:text-white uppercase tracking-widest mb-2 transition-colors">¿Buscas otro sector?</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/80 transition-colors">Contamos con +500 casos de uso implementados en diversas industrias.</p>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:w-2/3 flex flex-col md:flex-row">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col md:flex-row w-full"
                            >
                                <div className="p-8 lg:p-12 flex-1">
                                    <div className="flex items-center gap-3 mb-8">
                                        <span className="px-3 py-1 bg-rocket-red/10 text-rocket-red text-[10px] font-bold uppercase rounded-full tracking-widest border border-rocket-red/20">
                                            Casos de Éxito
                                        </span>
                                        <div className="h-px flex-1 bg-border" />
                                    </div>

                                    <ul className="space-y-6 mb-12">
                                        {activeTab.useCases.map((useCase, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-start gap-4 text-lg text-foreground/80 group/desc"
                                            >
                                                <CheckCircle2 className="w-5 h-5 text-rocket-red mt-1 shrink-0 group-hover/desc:scale-125 transition-transform" />
                                                <span className="leading-tight">{useCase}</span>
                                            </motion.li>
                                        ))}
                                    </ul>

                                    <button className="inline-flex items-center gap-3 px-8 py-4 bg-rocket-red text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-lg hover:shadow-rocket-red/30 transform hover:-translate-y-1">
                                        DESCARGAR DOCUMENTO
                                        <FileDown className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="md:w-[350px] relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-rocket-red/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <img
                                        src={activeTab.image}
                                        alt={activeTab.title}
                                        className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
