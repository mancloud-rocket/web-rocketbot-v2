'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import { Landmark, TrendingUp, DollarSign, PieChart, BarChart3, CheckCircle, ChevronDown, Coins, Activity } from 'lucide-react';
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

function SideParticles({ count = 10, color = "text-emerald-500", Icon }: { count?: number, color?: string, Icon?: any }) {
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

function FinInventoryLayer({ scrollYProgress }: { scrollYProgress: any }) {
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
                <div className="space-y-6 bg-background/50 backdrop-blur-md p-8 rounded-3xl border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
                            <TrendingUp className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight">
                            Gestión de <span className="text-emerald-500">Activos</span>
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Maximiza el valor de tus inventarios y activos fijos. Automatiza la depreciación, el seguimiento de costos y la valuación en tiempo real.
                    </p>
                    <ul className="space-y-3">
                        {["Valuación automática de stock", "Cálculo de depreciación", "Integración con ERPs"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-foreground/80">
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Visual */}
                <div className="relative h-[400px] w-full bg-black/40 rounded-3xl border border-emerald-500/30 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 flex items-end justify-center p-8 gap-4">
                        {[30, 50, 45, 70, 65, 85, 80, 95].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${h}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className="w-8 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm"
                            />
                        ))}
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="absolute top-8 right-8 p-4 bg-background/90 rounded-xl border border-emerald-500 shadow-xl"
                    >
                        <div className="text-xs text-muted-foreground uppercase">Valor Total</div>
                        <div className="text-2xl font-bold text-emerald-500">$12.5M</div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function ProcessingLayer({ scrollYProgress }: { scrollYProgress: any }) {
    const opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
    const x = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [100, 0, 0, 100]); // Right Entry

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
                <div className="order-2 md:order-1 relative h-[400px] w-full bg-black/40 rounded-3xl border border-emerald-500/30 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent)]" />

                    {/* Stream of transactions */}
                    <div className="space-y-2 w-2/3">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ x: ['-20%', '0%'] }}
                                transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, repeatType: 'reverse' }}
                                className="flex justify-between p-3 bg-background/80 rounded border-l-2 border-emerald-500 text-sm font-mono"
                            >
                                <span>TRX-00{i + 1}</span>
                                <span className="text-emerald-500">APROBADO</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Text Content */}
                <div className="order-1 md:order-2 space-y-6 bg-background/50 backdrop-blur-md p-8 rounded-3xl border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
                            <Activity className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight">
                            Procesamiento <span className="text-emerald-500">Financiero</span>
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Agilidad en cada transacción. Automatiza cuentas por pagar y cobrar, conciliaciones y cierres contables con precisión milimétrica.
                    </p>
                    <ul className="space-y-3">
                        {["Pago automático a proveedores", "Generación de remesas", "Validación fiscal"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-foreground/80">
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
}

function FinReportingLayer({ scrollYProgress }: { scrollYProgress: any }) {
    const opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.9, 1], [0, 1, 1, 1]); // Ends visible
    const x = useTransform(scrollYProgress, [0.6, 0.7, 0.9, 1], [-100, 0, 0, 0]); // Left Entry

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
                <div className="space-y-6 bg-background/50 backdrop-blur-md p-8 rounded-3xl border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
                            <PieChart className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight">
                            Reportes <span className="text-emerald-500">Operativos</span>
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Visibilidad total de tu salud financiera. Genera balances, estados de resultados y proyecciones de flujo de caja con un clic.
                    </p>
                    <ul className="space-y-3">
                        {["Consolidación multi-empresa", "Reportes regulatorios", "KPIs en tiempo real"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-foreground/80">
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Visual */}
                <div className="relative h-[400px] w-full bg-black/40 rounded-3xl border border-emerald-500/30 overflow-hidden flex items-center justify-center">
                    <div className="relative w-64 h-64">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                            <motion.circle
                                cx="50" cy="50" r="40"
                                fill="none" stroke="#064e3b" strokeWidth="8"
                            />
                            <motion.circle
                                cx="50" cy="50" r="40"
                                fill="none" stroke="#10b981" strokeWidth="8"
                                strokeDasharray="251.2"
                                strokeDashoffset="251.2"
                                whileInView={{ strokeDashoffset: 50 }}
                                transition={{ duration: 2, ease: "easeOut" }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-4xl font-bold text-emerald-500">85%</div>
                            <div className="text-xs text-muted-foreground">Efficiency</div>
                        </div>
                    </div>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-8 right-8 flex items-center gap-2 bg-background p-2 rounded-lg border border-border"
                    >
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-medium">Live Data</span>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Page Component ---

export default function FinancePage() {
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
        <div ref={containerRef} className="relative bg-background min-h-[400vh]">
            <Navbar />

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-700 origin-left z-50"
                style={{ scaleX: smoothProgress }}
            />

            {/* Background Particles */}
            <ClientOnly>
                <div className="fixed inset-0 z-0 opacity-40">
                    <SideParticles count={15} color="text-emerald-400" Icon={DollarSign} />
                    <SideParticles count={10} color="text-green-400" Icon={Coins} />
                </div>
            </ClientOnly>

            {/* Hero Section */}
            <motion.div
                className="fixed inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4 text-center"
                style={{ opacity: heroOpacity, scale: heroScale }}
            >
                <div className="relative">
                    <div className="absolute -inset-10 bg-emerald-500/20 blur-3xl rounded-full" />
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 mb-8 mx-auto shadow-2xl shadow-emerald-500/40"
                    >
                        <Landmark className="w-12 h-12 text-white" />
                    </motion.div>
                </div>

                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-6"
                >
                    Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">Finance</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12"
                >
                    Toma el control financiero total. Automatización contable, conciliación inteligente y reportes estratégicos en tiempo real.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute bottom-12"
                >
                    <ChevronDown className="w-8 h-8 text-emerald-500" />
                </motion.div>
            </motion.div>

            {/* Scroll Space */}
            <div className="relative z-10">
                <div className="h-screen" /> {/* Hero Space */}
                <div className="h-screen" /> {/* Inventory Space */}
                <div className="h-screen" /> {/* Processing Space */}
                <div className="h-screen" /> {/* Reporting Space */}
            </div>

            {/* Layers */}
            <FinInventoryLayer scrollYProgress={smoothProgress} />
            <ProcessingLayer scrollYProgress={smoothProgress} />
            <FinReportingLayer scrollYProgress={smoothProgress} />

        </div>
    );
}
