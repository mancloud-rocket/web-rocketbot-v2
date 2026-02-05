'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import {
    Network, Shield, Activity, Calendar, Globe,
    Server, Lock, BarChart3, Clock, CheckCircle,
    LayoutDashboard, AlertCircle, Play
} from 'lucide-react';
import { cn } from '@/lib/utils';

// === UTILS ===

function useRandomParticles(count: number) {
    const [particles, setParticles] = useState<Array<{ id: number, top: string, left: string, delay: number, duration: number, xOff: number, yOff: number, scale: number, rotation: number }>>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const newParticles = Array.from({ length: count }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            delay: Math.random() * 5,
            duration: 10 + Math.random() * 20,
            xOff: Math.random() * 50 - 25,
            yOff: Math.random() * 50 - 25,
            scale: 0.3 + Math.random() * 0.7,
            rotation: Math.random() * 360
        }));
        setParticles(newParticles);
    }, [count]);

    return mounted ? particles : [];
}

function FloatingElement({ children, delay = 0, xRange = [0, 0], yRange = [0, 0], duration = 5, className, style }: any) {
    return (
        <motion.div
            style={style}
            animate={{
                y: yRange,
                x: xRange,
                rotate: [0, 5, -5, 0]
            }}
            transition={{
                duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay
            }}
            className={cn("absolute", className)}
        >
            {children}
        </motion.div>
    );
}

function SideParticles({ count = 20, color = "bg-blue-500", Icon }: { count?: number, color?: string, Icon?: any }) {
    const particles = useRandomParticles(count);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((p) => (
                <FloatingElement
                    key={p.id}
                    xRange={[0, p.xOff]}
                    yRange={[0, p.yOff]}
                    duration={p.duration}
                    delay={p.delay}
                    style={{ left: p.left, top: p.top }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.6, scale: p.scale }}
                        style={{ rotate: p.rotation }}
                    >
                        {Icon ? (
                            <Icon className={cn("w-6 h-6", color.replace('bg-', 'text-'))} />
                        ) : (
                            <div className={cn("w-2 h-2 rounded-full", color)} />
                        )}
                    </motion.div>
                </FloatingElement>
            ))}
        </div>
    );
}

function ClientOnly({ children }: { children: React.ReactNode }) {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => { setHasMounted(true); }, []);
    if (!hasMounted) return null;
    return <>{children}</>;
}

// === SCENES ===

// 0. HERO
function HeroSection({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const scale = useTransform(scrollYProgress, [0, 0.1], [1, 15]);
    const opacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

    return (
        <motion.div
            className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity }}
        >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F612_1px,transparent_1px),linear-gradient(to_bottom,#3B82F612_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center px-4"
            >
                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="relative"
                    >
                        <div className="w-32 h-32 rounded-full bg-blue-500/20 blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <Globe className="w-40 h-40 text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
                    </motion.div>
                </div>

                <div className="inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md">
                    <Network className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-bold text-blue-500 tracking-[0.2em] uppercase">Orchestrator</span>
                </div>

                <h1 className="text-[10vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter text-foreground mb-8">
                    THE CONTROL <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">TOWER</span>
                </h1>

                <p className="text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
                    Gobierno centralizado para tu fuerza de trabajo digital.<br />
                    Controla, monitorea y escala tus bots desde <strong className="text-foreground font-medium">un solo lugar</strong>.
                </p>
            </motion.div>
        </motion.div>
    );
}

// 1. LAYER 1: FLEET MANAGEMENT
function FleetLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.1, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
    const x = useTransform(scrollYProgress, [0.1, 0.2], [-100, 0]); // Enter from Left

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background/90"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={15} color="bg-blue-500" Icon={Server} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <motion.div style={{ x }} className="order-2 lg:order-1 space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 font-mono text-sm">
                        <LayoutDashboard className="w-4 h-4" />
                        LAYER 01: FLEET MANAGEMENT
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        GESTIÓN DE <br /> <span className="text-blue-500">FLOTA</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Visualiza el estado de todos tus bots en tiempo real.
                        Detecta cuellos de botella, asigna licencias y gestiona versiones sin interrupciones.
                    </p>
                </motion.div>

                <div className="order-1 lg:order-2 relative h-[400px] flex items-center justify-center">
                    {/* Radar Animation */}
                    <div className="relative w-96 h-96 border border-blue-500/30 rounded-full bg-blue-900/10 backdrop-blur-sm">
                        <div className="absolute inset-0 border border-blue-500/10 rounded-full scale-75" />
                        <div className="absolute inset-0 border border-blue-500/10 rounded-full scale-50" />
                        <div className="absolute inset-0 border border-blue-500/10 rounded-full scale-25" />

                        {/* Radar Sweep */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(59,130,246,0.3)_360deg)]"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            style={{ maskImage: "radial-gradient(circle, transparent 0%, black 100%)" }}
                        />

                        {/* Bots / Blips */}
                        <motion.div
                            className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_var(--green-500)]"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_var(--green-500)]"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute top-1/2 right-10 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_var(--red-500)]"
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        />
                    </div>

                    {/* Floating Status Card */}
                    <div className="absolute -bottom-4 -right-4 bg-card border border-blue-500/30 rounded-lg p-4 shadow-xl glass-card">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm font-bold text-foreground">All Systems Operational</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Active Bots: 24/25</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// 2. LAYER 2: SECURITY
function SecurityLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.3, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
    const x = useTransform(scrollYProgress, [0.3, 0.4], [100, 0]); // Enter from Right
    const scale = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1]);

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background/95"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={20} color="bg-slate-500" Icon={Lock} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="order-1 relative h-[400px] flex items-center justify-center">
                    {/* Vault Animation */}
                    <motion.div
                        style={{ scale }}
                        className="relative w-64 h-64 border-8 border-slate-700 rounded-full flex items-center justify-center bg-slate-900 shadow-2xl"
                    >
                        <div className="absolute inset-0 border-4 border-dashed border-blue-500/30 rounded-full animate-spin-slow" />
                        <Lock className="w-24 h-24 text-blue-500" />

                        {/* Locking Mechanisms */}
                        <motion.div
                            className="absolute -left-4 top-1/2 w-8 h-4 bg-slate-600 rounded"
                            animate={{ x: [0, 20, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        />
                        <motion.div
                            className="absolute -right-4 top-1/2 w-8 h-4 bg-slate-600 rounded"
                            animate={{ x: [0, -20, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        />
                    </motion.div>
                </div>

                <motion.div style={{ x }} className="order-2 space-y-8 text-right lg:text-left">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-500 font-mono text-sm">
                        <Shield className="w-4 h-4" />
                        LAYER 02: BANK-GRADE SECURITY
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        SEGURIDAD <br /> <span className="text-slate-500">BLINDADA</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Cumplimiento enterprise ready. Gestión de roles (RBAC), bóveda de credenciales cifrada (AES-256) y logs de auditoría inmutables.
                    </p>
                    <div className="flex gap-4 justify-end lg:justify-start">
                        <span className="px-3 py-1 rounded bg-blue-500/10 text-blue-500 text-xs font-bold border border-blue-500/20">SOC2</span>
                        <span className="px-3 py-1 rounded bg-blue-500/10 text-blue-500 text-xs font-bold border border-blue-500/20">ISO 27001</span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

// 3. LAYER 3: ANALYTICS
function AnalyticsLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
    const x = useTransform(scrollYProgress, [0.5, 0.6], [-100, 0]); // Enter from Left

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background/90"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={15} color="bg-cyan-500" Icon={BarChart3} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <motion.div style={{ x }} className="order-2 lg:order-1 space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 font-mono text-sm">
                        <Activity className="w-4 h-4" />
                        LAYER 03: INSIGHTS
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        ANÁLISIS <br /> <span className="text-cyan-500">EN VIVO</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Toma decisiones basadas en datos. Dashboards personalizables para medir ROI, tiempos de ejecución y tasas de éxito de tus procesos.
                    </p>
                </motion.div>

                <div className="order-1 lg:order-2 relative h-[400px] w-full max-w-lg mx-auto">
                    {/* Dashboard Mockup */}
                    <div className="grid grid-cols-2 gap-4 h-full">
                        <motion.div
                            className="col-span-2 bg-card border border-white/10 rounded-xl p-4 shadow-lg"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="h-4 w-24 bg-cyan-500/20 rounded mb-4" />
                            <div className="flex items-end gap-2 h-32">
                                {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex-1 bg-cyan-500 rounded-t"
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${h}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            className="bg-card border border-white/10 rounded-xl p-4 shadow-lg flex flex-col justify-center items-center"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="text-4xl font-black text-green-500">99.9%</div>
                            <div className="text-xs text-muted-foreground mt-1">UPTIME</div>
                        </motion.div>
                        <motion.div
                            className="bg-card border border-white/10 rounded-xl p-4 shadow-lg flex flex-col justify-center items-center"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="text-4xl font-black text-blue-500">1.5M</div>
                            <div className="text-xs text-muted-foreground mt-1">TRANSACTIONS</div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// 4. LAYER 4: SMART SCHEDULING
function SchedulingLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.7, 0.75, 0.9, 1], [0, 1, 1, 1]);
    const x = useTransform(scrollYProgress, [0.7, 0.8], [100, 0]); // Enter from Right

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={15} color="bg-blue-500" Icon={Calendar} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
                <div className="order-1 relative h-[400px] flex items-center justify-center">
                    {/* Calendar/Trigger Animation */}
                    <div className="relative w-full max-w-md bg-card border border-blue-500/30 rounded-xl p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="font-bold text-lg">Schedule</div>
                            <Play className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg border border-transparent hover:border-blue-500/50 transition-colors"
                                    initial={{ x: -20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                >
                                    <Clock className="w-4 h-4 text-blue-500" />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">Daily Report Sync</div>
                                        <div className="text-xs text-muted-foreground">Every day at 08:00 AM</div>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <motion.div style={{ x }} className="order-2 space-y-8 text-right md:text-left">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 font-mono text-sm">
                        <Calendar className="w-4 h-4" />
                        LAYER 04: SCHEDULING
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        PROGRAMACIÓN <br /> <span className="text-blue-500">INTELIGENTE</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Ejecuta bots por tiempo, eventos, archivos o colas (Queues).
                        Balanceo de carga automático para optimizar el uso de licencias y recursos de infraestructura.
                    </p>
                    <button className="px-8 py-4 bg-blue-500 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_var(--blue-500)]">
                        Ver Demo
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function OrchestratorPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100, damping: 30, restDelta: 0.001
    });

    return (
        <div ref={containerRef} className="relative bg-background h-[500vh]">
            <Navbar />

            {/* Background Noise & Gradient */}
            <div className="fixed inset-0 z-0 bg-background transition-colors duration-500">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background pointer-events-none" />
            </div>

            <HeroSection scrollYProgress={smoothProgress} />
            <FleetLayer scrollYProgress={smoothProgress} />
            <SecurityLayer scrollYProgress={smoothProgress} />
            <AnalyticsLayer scrollYProgress={smoothProgress} />
            <SchedulingLayer scrollYProgress={smoothProgress} />

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 z-50"
                style={{ width: useTransform(smoothProgress, v => `${v * 100}%`) }}
            />
        </div>
    );
}
