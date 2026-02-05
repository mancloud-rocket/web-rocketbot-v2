'use client';

import { motion } from 'framer-motion';
import { Shield, BarChart3, Users, Zap } from 'lucide-react';

export function Showcase() {
    return (
        <section className="py-32 bg-background relative border-t border-border transition-colors duration-300" id="orquestador">
            <div className="container px-6 mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display font-black text-foreground mb-6"
                    >
                        Gobierno y Control <br />
                        <span className="text-rocket-red">Empresarial</span>
                    </motion.h2>
                    <p className="text-xl text-gray-500 dark:text-gray-400">
                        La Capa de Orquestación de Rocketbot te permite tener una visión 360º de tu ecosistema digital.
                        Gestiona permisos, monitorea ejecuciones y asegura la continuidad operativa.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: Shield,
                            title: "Seguridad Bancaria",
                            desc: "Encriptación AES-256 y gestión de credenciales segura. Cumplimiento normativo integrado."
                        },
                        {
                            icon: BarChart3,
                            title: "Analítica en Tiempo Real",
                            desc: "Dashboards personalizables para medir ROI, eficiencia y estado de salud de tus bots."
                        },
                        {
                            icon: Users,
                            title: "Gestión de Equipos",
                            desc: "Roles granulares y flujos de aprobación. Colaboración segura entre desarrolladores y operaciones."
                        },
                        {
                            icon: Zap,
                            title: "Alta Disponibilidad",
                            desc: "Arquitectura resiliente capaz de manejar picos de carga y asegurar ejecución 24/7."
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-2xl bg-card border border-border hover:border-rocket-red/50 transition-colors group"
                        >
                            <item.icon className="w-10 h-10 text-rocket-red mb-6" />
                            <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
