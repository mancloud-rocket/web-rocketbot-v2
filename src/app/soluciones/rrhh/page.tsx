'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import { Users, Heart, Shield, FileText, UserPlus, CheckCircle, ChevronDown, CheckSquare, Search, Briefcase } from 'lucide-react';
import { ClientOnly } from '@/components/ui/ClientOnly';

// --- Particle Components ---
function FloatingElement({ children, delay = 0, duration = 10, xRange = [0, 0], yRange = [0, 0] }: { children: React.ReactNode, delay?: number, duration?: number, xRange?: number[], yRange?: number[] }) {
    return (
        <motion.div
            animate={{
                y: yRange,
                x: xRange,
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay,
            }}
        >
            {children}
        </motion.div>
    );
}

function SideParticles({ count = 10, color = "text-rose-500", Icon }: { count?: number, color?: string, Icon?: any }) {
    const [particles, setParticles] = useState<{ id: number; left: number; top: number; size: number; duration: number; delay: number; scale: number; rotation: number }[]>([]);

    useEffect(() => {
        setParticles(
            Array.from({ length: count }).map((_, i) => ({
                id: i,
                left: i % 2 === 0 ? Math.random() * 20 : 80 + Math.random() * 20,
                top: Math.random() * 100,
                size: Math.random() * 20 + 10,
                duration: Math.random() * 5 + 5,
                delay: Math.random() * 2,
                scale: Math.random() * 0.5 + 0.5,
                rotation: Math.random() * 360,
            }))
        );
    }, [count]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute"
                    style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                    }}
                >
                    <FloatingElement delay={p.delay} duration={p.duration} yRange={[-20, 20]}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 0.6, scale: p.scale }}
                            style={{ rotate: p.rotation }}
                            className={color}
                        >
                            {Icon ? <Icon size={p.size} /> : <div style={{ width: p.size, height: p.size }} className="rounded-full bg-current" />}
                        </motion.div>
                    </FloatingElement>
                </div>
            ))}
        </div>
    );
}

// --- Cinematic Layers ---

function LoansLayer({ scrollYProgress }: { scrollYProgress: any }) {
    const opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.3, 0.4], [0, 1, 1, 0]);
    const x = useTransform(scrollYProgress, [0.1, 0.2, 0.3, 0.4], [-100, 0, 0, -100]); // Left Entry

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-10"
            style={{ opacity }}
        >
            <motion.div
                className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                style={{ x }}
            >
                {/* Text Content */}
                <div className="space-y-6 bg-background/50 backdrop-blur-md p-8 rounded-3xl border border-rose-500/20 shadow-[0_0_50px_rgba(244,63,94,0.1)]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-rose-500/20 text-rose-500 border border-rose-500/30">
                            <CheckSquare className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight">
                            Solicitudes de <span className="text-rose-500">Préstamos</span>
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Evaluación crediticia al instante. Automatiza la recepción de documentos, la revisión de historial y la aprobación de fondos.
                    </p>
                    <ul className="space-y-3">
                        {["Coring automático", "Integración con burós de crédito", "Firma digital de contratos"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-foreground/80">
                                <CheckCircle className="w-5 h-5 text-rose-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Visual */}
                <div className="relative h-[400px] w-full bg-black/40 rounded-3xl border border-rose-500/30 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-64 h-80 bg-background rounded-xl border border-border shadow-2xl relative overflow-hidden">
                            <div className="h-4 bg-rose-500 w-full" />
                            <div className="p-4 space-y-4">
                                <div className="space-y-2">
                                    <div className="h-2 w-1/2 bg-muted rounded" />
                                    <div className="h-8 w-full bg-muted/50 rounded border border-dashed border-border" />
                                </div>
                                <div className="space-y-2">
                                    <div className="h-2 w-1/3 bg-muted rounded" />
                                    <div className="h-8 w-full bg-muted/50 rounded border border-dashed border-border" />
                                </div>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                                    className="h-2 w-full bg-rose-500 rounded origin-left"
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 1.5, repeat: Infinity, repeatDelay: 2 }}
                                    className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
                                >
                                    <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center">
                                        <CheckCircle className="w-10 h-10 text-green-500" />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function FraudLayer({ scrollYProgress }: { scrollYProgress: any }) {
    const opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [0, 1, 1, 0]);
    const x = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [100, 0, 0, 100]); // Right Entry

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-10"
            style={{ opacity }}
        >
            <motion.div
                className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                style={{ x }}
            >
                {/* Visual */}
                <div className="order-2 md:order-1 relative h-[400px] w-full bg-black/40 rounded-3xl border border-rose-500/30 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute w-64 h-64 bg-rose-500/20 rounded-full blur-3xl"
                    />

                    <div className="relative z-10">
                        <Shield className="w-32 h-32 text-rose-500" />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-t-4 border-rose-500/50 w-full h-full scale-125"
                        />
                    </div>

                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: -100, opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 w-12 h-12 bg-red-600/80 rounded-full blur-lg"
                    />
                </div>

                {/* Text Content */}
                <div className="order-1 md:order-2 space-y-6 bg-background/50 backdrop-blur-md p-8 rounded-3xl border border-rose-500/20 shadow-[0_0_50px_rgba(244,63,94,0.1)]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-rose-500/20 text-rose-500 border border-rose-500/30">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight">
                            Prevención de <span className="text-rose-500">Fraudes</span>
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Protege tu organización con monitoreo continuo. Detecta patrones sospechosos en nóminas y accesos en tiempo real.
                    </p>
                    <ul className="space-y-3">
                        {["Análisis de comportamiento", "Alertas in-situ", "Bloqueo preventivo de cuentas"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-foreground/80">
                                <CheckCircle className="w-5 h-5 text-rose-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
}

function CasesLayer({ scrollYProgress }: { scrollYProgress: any }) {
    const opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
    const x = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [-100, 0, 0, -100]); // Left Entry

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-10"
            style={{ opacity }}
        >
            <motion.div
                className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                style={{ x }}
            >
                {/* Text Content */}
                <div className="space-y-6 bg-background/50 backdrop-blur-md p-8 rounded-3xl border border-rose-500/20 shadow-[0_0_50px_rgba(244,63,94,0.1)]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-rose-500/20 text-rose-500 border border-rose-500/30">
                            <Search className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight">
                            Gestión de <span className="text-rose-500">Casos</span>
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Centraliza incidencias laborales y legales. Mantén un historial completo y asegura el cumplimiento de tiempos de respuesta.
                    </p>
                    <ul className="space-y-3">
                        {["Digitalización de expedientes", "Seguimiento de plazos legales", "Reportes de auditoría"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-foreground/80">
                                <CheckCircle className="w-5 h-5 text-rose-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Visual */}
                <div className="relative h-[400px] w-full bg-black/40 rounded-3xl border border-rose-500/30 overflow-hidden flex items-center justify-center p-8">
                    <div className="w-full max-w-xs space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.2 }}
                                className="bg-background/90 p-4 rounded-lg flex items-center gap-4 border-l-4 border-rose-500 shadow-md"
                            >
                                <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded">
                                    <FileText className="w-4 h-4 text-rose-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="h-2 w-3/4 bg-foreground/20 rounded mb-1" />
                                    <div className="h-1 w-1/2 bg-foreground/10 rounded" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function OnboardingLayer({ scrollYProgress }: { scrollYProgress: any }) {
    const opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.9, 1], [0, 1, 1, 1]);
    const x = useTransform(scrollYProgress, [0.7, 0.8, 0.9, 1], [100, 0, 0, 0]); // Right Entry

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-10"
            style={{ opacity }}
        >
            <motion.div
                className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                style={{ x }}
            >
                {/* Visual */}
                <div className="order-2 md:order-1 relative h-[400px] w-full bg-black/40 rounded-3xl border border-rose-500/30 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 to-transparent" />

                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring" }}
                        className="relative z-10"
                    >
                        <div className="w-32 h-32 rounded-full bg-background border-4 border-rose-500 flex items-center justify-center shadow-2xl overflow-hidden">
                            <Users className="w-16 h-16 text-muted-foreground" />
                        </div>
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full border-4 border-background"
                        >
                            <CheckCircle className="w-6 h-6" />
                        </motion.div>
                    </motion.div>

                    {/* Confetti effect (simplified) */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 0, opacity: 1 }}
                            animate={{ y: 100, opacity: 0, x: Math.random() * 100 - 50 }}
                            transition={{ duration: 2, delay: Math.random(), repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 w-2 h-2 bg-rose-500 rounded-full"
                        />
                    ))}
                </div>

                {/* Text Content */}
                <div className="order-1 md:order-2 space-y-6 bg-background/50 backdrop-blur-md p-8 rounded-3xl border border-rose-500/20 shadow-[0_0_50px_rgba(244,63,94,0.1)]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-rose-500/20 text-rose-500 border border-rose-500/30">
                            <UserPlus className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight">
                            Onboarding <span className="text-rose-500">Digital</span>
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Crea la mejor primera impresión. Automatiza la entrega de equipos, accesos y capacitaciones para nuevos talentos.
                    </p>
                    <ul className="space-y-3">
                        {["Kits de bienvenida automáticos", "Asignación de activos TI", "Rutas de aprendizaje personalizadas"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-foreground/80">
                                <CheckCircle className="w-5 h-5 text-rose-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Page Component ---

export default function RRHHPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Hero Transforms
    const heroOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
    const heroScale = useTransform(smoothProgress, [0, 0.1], [1, 1.2]);

    return (
        <div ref={containerRef} className="relative bg-background min-h-[500vh]">
            <Navbar />

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 to-rose-700 origin-left z-50"
                style={{ scaleX: smoothProgress }}
            />

            {/* Background Particles */}
            <ClientOnly>
                <div className="fixed inset-0 z-0 opacity-40">
                    <SideParticles count={15} color="text-rose-400" Icon={Users} />
                    <SideParticles count={10} color="text-pink-400" Icon={Heart} />
                </div>
            </ClientOnly>

            {/* Hero Section */}
            <motion.div
                className="fixed inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4 text-center"
                style={{ opacity: heroOpacity, scale: heroScale }}
            >
                <div className="relative">
                    <div className="absolute -inset-10 bg-rose-500/20 blur-3xl rounded-full" />
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 mb-8 mx-auto shadow-2xl shadow-rose-500/40"
                    >
                        <Users className="w-12 h-12 text-white" />
                    </motion.div>
                </div>

                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-6"
                >
                    People <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">First</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12"
                >
                    Potencia tu recurso más valioso con herramientas que automatizan lo operativo y priorizan lo humano.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute bottom-12"
                >
                    <ChevronDown className="w-8 h-8 text-rose-500" />
                </motion.div>
            </motion.div>

            {/* Scroll Space */}
            <div className="relative z-10">
                <div className="h-screen" /> {/* Hero Space */}
                <div className="h-screen" /> {/* Loans Space */}
                <div className="h-screen" /> {/* Fraud Space */}
                <div className="h-screen" /> {/* Cases Space */}
                <div className="h-screen" /> {/* Onboarding Space */}
            </div>

            {/* Layers */}
            <LoansLayer scrollYProgress={smoothProgress} />
            <FraudLayer scrollYProgress={smoothProgress} />
            <CasesLayer scrollYProgress={smoothProgress} />
            <OnboardingLayer scrollYProgress={smoothProgress} />

        </div>
    );
}
