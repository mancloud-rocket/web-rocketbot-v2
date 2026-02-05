'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import {
    Brain, ScanLine, MessageSquare, Eye, Network,
    Bot, FileText, Sparkles, Cpu, Search, Zap,
    ArrowRight, CheckCircle
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

function SideParticles({ count = 20, color = "bg-neon-magenta", Icon }: { count?: number, color?: string, Icon?: any }) {
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
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#FF00F512_1px,transparent_1px),linear-gradient(to_bottom,#FF00F512_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center px-4"
            >
                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative"
                    >
                        <div className="w-32 h-32 rounded-full bg-neon-magenta/20 blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <Brain className="w-40 h-40 text-neon-magenta drop-shadow-[0_0_30px_rgba(255,0,245,0.5)]" />
                    </motion.div>
                </div>

                <div className="inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full border border-neon-magenta/30 bg-neon-magenta/10 backdrop-blur-md">
                    <Sparkles className="w-5 h-5 text-neon-magenta" />
                    <span className="text-sm font-bold text-neon-magenta tracking-[0.2em] uppercase">AI Studio</span>
                </div>

                <h1 className="text-[10vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter text-foreground mb-8">
                    THE COGNITIVE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-magenta via-purple-500 to-neon-magenta">ENGINE</span>
                </h1>

                <p className="text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
                    Más allá de la automatización.<br />
                    Dota a tus bots de <strong className="text-foreground font-medium">vista</strong>, <strong className="text-foreground font-medium">lectura</strong> y <strong className="text-foreground font-medium">entendimiento</strong>.
                </p>
            </motion.div>
        </motion.div>
    );
}

// 1. LAYER 1: IDP (Intelligent Document Processing)
function IDPLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.1, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
    const x = useTransform(scrollYProgress, [0.1, 0.2], [-100, 0]); // Enter from Left
    const scanY = useTransform(scrollYProgress, [0.1, 0.3], ["0%", "100%"]);

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background/90"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={15} color="bg-neon-magenta" Icon={FileText} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <motion.div style={{ x }} className="order-2 lg:order-1 space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-neon-magenta/10 border border-neon-magenta/20 text-neon-magenta font-mono text-sm">
                        <ScanLine className="w-4 h-4" />
                        LAYER 01: INTELLIGENT DOCS
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        LECTURA <br /> <span className="text-neon-magenta">INSTANTÁNEA</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Procesa facturas, contratos y formularios en segundos.
                        Nuestra IA extrae, clasifica y valida datos de documentos no estructurados con precisión humana.
                    </p>
                </motion.div>

                <div className="order-1 lg:order-2 relative h-[500px] flex items-center justify-center p-8">
                    <div className="relative w-80 h-[400px] bg-white rounded-lg shadow-2xl p-8 text-black text-xs font-mono overflow-hidden glass-card-premium">
                        <div className="absolute top-0 left-0 w-full h-2 bg-neon-magenta" />
                        <div className="mb-4">INVOICE #4023</div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 w-1/2 rounded" />
                            <div className="h-4 bg-gray-200 w-3/4 rounded" />
                            <div className="h-32 bg-gray-100 rounded border border-dashed border-gray-300 p-2">
                                Item list...
                            </div>
                            <div className="flex justify-between font-bold text-lg mt-8">
                                <span>TOTAL</span>
                                <span className="text-neon-magenta">$4,500.00</span>
                            </div>
                        </div>

                        {/* Scan Beam */}
                        <motion.div
                            className="absolute top-0 left-0 w-full h-2 bg-neon-magenta shadow-[0_0_20px_var(--neon-magenta)] z-20"
                            style={{ top: scanY }}
                        />
                        <motion.div
                            className="absolute top-0 left-0 w-full bg-neon-magenta/20 z-10"
                            style={{ height: scanY }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// 2. LAYER 2: GENERATIVE AI
function GenAILayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.3, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
    const x = useTransform(scrollYProgress, [0.3, 0.4], [100, 0]); // Enter from Right
    const scale = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1.2]);

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background/95"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={20} color="bg-purple-500" Icon={MessageSquare} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="order-1 relative h-[400px] flex items-center justify-center">
                    <motion.div
                        style={{ scale }}
                        className="relative w-full max-w-md p-6 glass-card rounded-2xl border border-purple-500/30"
                    >
                        <div className="flex gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <Bot className="w-6 h-6 text-purple-500" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="p-3 rounded-lg bg-purple-500/10 text-sm text-foreground">
                                    Genera un script de Python para analizar estos datos de ventas.
                                </div>
                                <div className="p-3 rounded-lg bg-green-500/10 text-sm text-green-400 font-mono">
                                    import pandas as pd<br />
                                    data = pd.read_csv('sales.csv')<br />
                                    # Analysis complete...
                                </div>
                            </div>
                        </div>
                        {/* Particles emitting from chat */}
                        <div className="absolute inset-0 -z-10">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-500 rounded-full"
                                    animate={{
                                        x: (Math.random() - 0.5) * 400,
                                        y: (Math.random() - 0.5) * 400,
                                        opacity: [1, 0]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div style={{ x }} className="order-2 space-y-8 text-right lg:text-left">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 font-mono text-sm">
                        <Sparkles className="w-4 h-4" />
                        LAYER 02: GENERATIVE AI
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        CREATIVIDAD <br /> <span className="text-purple-500">GENERATIVA</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Integra LLMs como GPT-4 directamente en tus flujos.
                        Resumen de textos, redacción de correos, generación de código y análisis de sentimientos en tiempo real.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}

// 3. LAYER 3: COMPUTER VISION
function VisionLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
    const x = useTransform(scrollYProgress, [0.5, 0.6], [-100, 0]); // Enter from Left

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background/90"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={15} color="bg-cyan-500" Icon={Eye} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <motion.div style={{ x }} className="order-2 lg:order-1 space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 font-mono text-sm">
                        <Eye className="w-4 h-4" />
                        LAYER 03: COMPUTER VISION
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        OJOS <br /> <span className="text-cyan-500">DIGITALES</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Reconocimiento de objetos, detección de anomalías y clasificación visual.
                        Haz que tus bots "vean" la pantalla como un humano, interactuando con interfaces legacy o videos.
                    </p>
                </motion.div>

                <div className="order-1 lg:order-2 relative h-[500px] bg-black/50 rounded-xl overflow-hidden border border-cyan-500/30">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50" />

                    {/* Bounding Boxes Animation */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-cyan-500 rounded"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="absolute -top-6 left-0 bg-cyan-500 text-black font-bold text-xs px-2 py-1">SERVER RACK</div>
                        <div className="absolute -bottom-6 right-0 text-cyan-500 text-xs font-mono">CONF: 98%</div>
                    </motion.div>

                    <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />
                </div>
            </div>
        </motion.div>
    );
}

// 4. LAYER 4: COGNITIVE INTEGRATION
function IntegrationLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.7, 0.75, 0.9, 1], [0, 1, 1, 1]);
    const x = useTransform(scrollYProgress, [0.7, 0.8], [100, 0]); // Enter from Right
    const scale = useTransform(scrollYProgress, [0.7, 0.9], [0.8, 1]);

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={25} color="bg-neon-magenta" Icon={Network} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
                <div className="order-1 relative h-[500px] flex items-center justify-center">
                    {/* Neural Network Visualization */}
                    <svg className="absolute inset-0 w-full h-full">
                        <motion.circle cx="50%" cy="50%" r="50" className="text-neon-magenta" fill="currentColor" opacity="0.2" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 3, repeat: Infinity }} />
                        <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="var(--neon-magenta)" strokeWidth="2" strokeOpacity="0.5" />
                        <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="var(--neon-magenta)" strokeWidth="2" strokeOpacity="0.5" />
                        <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="var(--neon-magenta)" strokeWidth="2" strokeOpacity="0.5" />
                        <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="var(--neon-magenta)" strokeWidth="2" strokeOpacity="0.5" />

                        {/* Nodes */}
                        <circle cx="20%" cy="20%" r="10" fill="var(--neon-magenta)" />
                        <circle cx="80%" cy="20%" r="10" fill="var(--neon-magenta)" />
                        <circle cx="20%" cy="80%" r="10" fill="var(--neon-magenta)" />
                        <circle cx="80%" cy="80%" r="10" fill="var(--neon-magenta)" />
                    </svg>
                    <div className="bg-neon-magenta/20 backdrop-blur-md p-8 rounded-full border border-neon-magenta/50 z-20">
                        <Cpu className="w-16 h-16 text-neon-magenta" />
                    </div>
                </div>

                <motion.div style={{ x, scale }} className="order-2 space-y-8 text-right md:text-left">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-neon-magenta/10 border border-neon-magenta/20 text-neon-magenta font-mono text-sm">
                        <Network className="w-4 h-4" />
                        LAYER 04: NEURAL LINK
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        CEREBRO <br /> <span className="text-neon-magenta">CONECTADO</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Conecta el poder cognitivo a cualquier parte de tu empresa.
                        API RESTful para integración inmediata con ERPs, CRMs o cualquier bot de Rocketbot.
                    </p>
                    <button className="px-8 py-4 bg-neon-magenta text-white font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_var(--neon-magenta)]">
                        Explorar API
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function AIStudioPage() {
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
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neon-magenta/10 via-background to-background pointer-events-none" />
            </div>

            <HeroSection scrollYProgress={smoothProgress} />
            <IDPLayer scrollYProgress={smoothProgress} />
            <GenAILayer scrollYProgress={smoothProgress} />
            <VisionLayer scrollYProgress={smoothProgress} />
            <IntegrationLayer scrollYProgress={smoothProgress} />

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-neon-magenta to-purple-600 z-50"
                style={{ width: useTransform(smoothProgress, v => `${v * 100}%`) }}
            />
        </div>
    );
}
