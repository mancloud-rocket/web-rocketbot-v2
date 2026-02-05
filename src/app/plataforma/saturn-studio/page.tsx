'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import {
    LayoutTemplate, Boxes, Workflow, Globe, Zap, Database,
    ArrowRight, Activity, Shield, Cpu, Network, CheckCircle,
    Play, Pause, Plus, Share2, Orbit
} from 'lucide-react';
import { cn } from '@/lib/utils';

// === UTILS (Reusing from RPA Studio for consistency) ===

function useRandomParticles(count: number, side: 'left' | 'right' | 'both' = 'both') {
    const [particles, setParticles] = useState<Array<{ id: number, top: string, left: string, delay: number, duration: number, xOff: number, yOff: number, scale: number, rotation: number }>>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const newParticles = Array.from({ length: count }).map((_, i) => {
            let leftVal = Math.random() * 100;
            if (side === 'left') leftVal = Math.random() * 20;
            if (side === 'right') leftVal = 80 + Math.random() * 20;
            if (side === 'both') {
                leftVal = Math.random() > 0.5 ? Math.random() * 20 : 80 + Math.random() * 20;
            }

            return {
                id: i,
                top: `${Math.random() * 100}%`,
                left: `${leftVal}%`,
                delay: Math.random() * 5,
                duration: 10 + Math.random() * 20,
                xOff: Math.random() * 50 - 25,
                yOff: Math.random() * 50 - 25,
                scale: 0.3 + Math.random() * 0.7,
                rotation: Math.random() * 360
            };
        });
        setParticles(newParticles);
    }, [count, side]);

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

// Increased opacity to 0.6 as requested
function SideParticles({ count = 10, color = "bg-foreground", Icon }: { count?: number, color?: string, Icon?: any }) {
    const particles = useRandomParticles(count, 'both');

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

// 1. HERO - THE INTELLIGENT CORE
function HeroSection({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const scale = useTransform(scrollYProgress, [0, 0.1], [1, 15]);
    const opacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const rotate = useTransform(scrollYProgress, [0, 0.2], [0, 90]);

    return (
        <motion.div
            className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity }}
        >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="relative z-10 text-center px-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* Saturn Icon Animated */}
                    <div className="flex justify-center mb-8">
                        <motion.div
                            style={{ rotate }}
                            className="relative"
                        >
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 blur-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />
                            <Orbit className="w-32 h-32 text-indigo-400 drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]" />
                        </motion.div>
                    </div>

                    <div className="inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md">
                        <Cpu className="w-5 h-5 text-indigo-500" />
                        <span className="text-sm font-bold text-indigo-500 tracking-[0.2em] uppercase">Saturn Studio</span>
                    </div>

                    <h1 className="text-[10vw] md:text-[7vw] font-black leading-[0.9] tracking-tighter text-foreground mb-8">
                        INTELLIGENT <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">PROCESS MODELER</span>
                    </h1>

                    <p className="text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
                        Donde convergen <strong className="text-foreground font-medium">RPAs</strong>, <strong className="text-foreground font-medium">APIs</strong> y <strong className="text-foreground font-medium">IA</strong>.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}

// 2. LAYER 1: CONVERGENCE (The Hub)
function ConvergenceLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.1, 0.15, 0.25, 0.3], [0, 1, 1, 0]);

    // Animation: Lines converging to center
    const lineProgress = useTransform(scrollYProgress, [0.1, 0.25], ["0%", "100%"]);

    const sources = [
        { label: "RPA Bots", icon: Boxes, color: "text-orange-500", x: -200, y: -100 },
        { label: "Webhooks", icon: Network, color: "text-green-500", x: 200, y: -100 },
        { label: "APIs", icon: Database, color: "text-blue-500", x: -200, y: 100 },
        { label: "Chatbots", icon: Share2, color: "text-purple-500", x: 200, y: 100 },
    ];

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-[2px]"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={15} color="bg-indigo-500" Icon={Activity} />
            </ClientOnly>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto px-6 items-center w-full relative z-10">
                <div className="order-2 lg:order-1 space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 font-mono text-sm">
                        <LayoutTemplate className="w-4 h-4" />
                        LAYER 01: CONVERGENCE
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        EL NÚCLEO <br /> <span className="text-indigo-500">DE TODO</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Unifica tu ecosistema. Conecta RPAs de escritorio, canales de comunicación, Webhooks y aplicaciones de terceros en un solo orquestador inteligente.
                    </p>
                </div>

                <div className="order-1 lg:order-2 flex justify-center items-center h-[500px] relative">
                    {/* Central Hub */}
                    <motion.div
                        className="w-32 h-32 rounded-full border-4 border-indigo-500 bg-indigo-950/50 flex items-center justify-center relative z-20 shadow-[0_0_50px_var(--indigo-500)]"
                        animate={{ boxShadow: ["0 0 20px rgba(99,102,241,0.5)", "0 0 60px rgba(99,102,241,0.8)", "0 0 20px rgba(99,102,241,0.5)"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Cpu className="w-16 h-16 text-white" />
                    </motion.div>

                    {/* Connecting Lines & Nodes */}
                    {sources.map((source, i) => (
                        <div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <motion.div
                                className="absolute flex flex-col items-center gap-2"
                                style={{ x: source.x, y: source.y }}
                            >
                                <div className={cn("p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md", source.color)}>
                                    <source.icon className="w-8 h-8" />
                                </div>
                                <span className="text-xs font-bold text-white/50">{source.label}</span>
                            </motion.div>

                            {/* Line to center */}
                            <svg className="absolute inset-0 w-full h-full overflow-visible z-10">
                                <motion.line
                                    x1="50%" y1="50%"
                                    x2={`calc(50% + ${source.x * 0.8}px)`}
                                    y2={`calc(50% + ${source.y * 0.8}px)`}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-indigo-500/30"
                                    strokeDasharray="10 10"
                                />
                                <motion.circle
                                    r="4"
                                    fill="white"
                                    style={{
                                        offsetPath: `path('M 50% 50% L calc(50% + ${source.x}px) calc(50% + ${source.y}px)')`
                                    }}
                                />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// 3. LAYER 2: THE MOONS (Integrations)
function MoonsLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.3, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
    const rotate = useTransform(scrollYProgress, [0.3, 0.5], [0, 180]);

    const moons = [
        { label: "SAP", cx: 150, cy: 0, r: 30, color: "bg-blue-600" },
        { label: "Salesforce", cx: 100, cy: 100, r: 25, color: "bg-cyan-500" },
        { label: "Slack", cx: -100, cy: 100, r: 28, color: "bg-purple-500" },
        { label: "Office 365", cx: -150, cy: 0, r: 35, color: "bg-red-500" },
        { label: "Gmail", cx: -100, cy: -100, r: 25, color: "bg-red-600" },
        { label: "Oracle", cx: 100, cy: -100, r: 30, color: "bg-red-700" },
    ];

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background/90"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={20} color="bg-blue-400" Icon={Globe} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Solar System Animation */}
                <div className="relative h-[500px] flex items-center justify-center">
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-[0.8]" />
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-[0.5]" />

                    {/* Planet */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-[0_0_40px_var(--blue-500)] z-20" />

                    {/* Orbiting Moons */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ rotate }}
                    >
                        {moons.map((moon, i) => (
                            <motion.div
                                key={i}
                                className={cn("absolute flex items-center justify-center rounded-full text-white text-[10px] font-bold shadow-lg", moon.color)}
                                style={{
                                    width: moon.r,
                                    height: moon.r,
                                    x: moon.cx,
                                    y: moon.cy
                                }}
                                whileHover={{ scale: 1.2 }}
                            >
                                {moon.label.substring(0, 2)}
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="absolute top-10 right-10 text-right">
                        <div className="text-6xl font-black text-foreground/10">90+</div>
                        <div className="text-xl text-blue-400 font-bold">INTEGRACIONES</div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 font-mono text-sm">
                        <Globe className="w-4 h-4" />
                        LAYER 02: MOONS
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        UNIVERSO DE <br /> <span className="text-blue-500">INTEGRACIONES</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        No reinventes la rueda. Sistema de "Lunas" con más de 90 aplicaciones listas para conectar.
                        SAP, Salesforce, Azure, AWS, Google Workspace y más.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

// 4. LAYER 3: SMART MODELER (N8N Style)
function ModelerLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
    const pathLength = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background/95 backdrop-blur-sm"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={25} color="bg-amber-500" Icon={Workflow} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                {/* Content */}
                <div className="space-y-8 lg:order-2">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-mono text-sm">
                        <Workflow className="w-4 h-4" />
                        LAYER 03: VISUAL FLOWS
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        SMART PROCESS <br /> <span className="text-amber-500">MODELER</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Diseña flujos complejos visualmente. Similar a N8N pero con el poder empresarial de Rocketbot.
                        Arrastra nodos, conecta cables ("noodles") y observa cómo fluyen tus datos en tiempo real.
                    </p>
                </div>

                {/* Animation: Node Graph */}
                <div className="relative h-[400px] bg-neutral-900 rounded-xl border border-white/10 p-8 shadow-2xl lg:order-1 overflow-hidden">
                    {/* Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]" />

                    {/* Nodes */}
                    <div className="absolute top-1/2 left-10 -translate-y-1/2 w-32 h-12 bg-green-600 rounded-md flex items-center justify-center text-white font-bold text-xs shadow-lg z-10">
                        WEBHOOK
                    </div>

                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-32 h-12 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xs shadow-lg z-10">
                        TRANSFORM JSON
                    </div>

                    <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-32 h-12 bg-purple-600 rounded-md flex items-center justify-center text-white font-bold text-xs shadow-lg z-10">
                        AI CLASSIFY
                    </div>

                    <div className="absolute top-1/2 right-10 -translate-y-1/2 w-32 h-12 bg-orange-600 rounded-md flex items-center justify-center text-white font-bold text-xs shadow-lg z-10">
                        RPA TRIGGER
                    </div>

                    {/* Connecting Noodles */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        <motion.path
                            d="M 170 200 C 250 200, 250 150, 310 150"
                            stroke="#4ADE80" strokeWidth="4" fill="transparent"
                            style={{ pathLength }}
                        />
                        <motion.path
                            d="M 170 200 C 250 200, 250 250, 310 250"
                            stroke="#4ADE80" strokeWidth="4" fill="transparent"
                            style={{ pathLength }}
                        />
                        <motion.path
                            d="M 440 150 C 500 150, 500 200, 580 200"
                            stroke="#60A5FA" strokeWidth="4" fill="transparent"
                            style={{ pathLength }}
                        />
                        <motion.path
                            d="M 440 250 C 500 250, 500 200, 580 200"
                            stroke="#A78BFA" strokeWidth="4" fill="transparent"
                            style={{ pathLength }}
                        />
                    </svg>

                </div>
            </div>
        </motion.div>
    );
}

// 5. LAYER 4: ENTERPRISE (Pricing/Scale)
function PricingLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.7, 0.75, 0.9, 1], [0, 1, 1, 1]);
    const scale = useTransform(scrollYProgress, [0.7, 0.9], [0.8, 1]);

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={15} color="bg-emerald-500" Icon={Shield} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
                {/* Content */}
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-mono text-sm">
                        <Shield className="w-4 h-4" />
                        LAYER 04: ENTERPRISE
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        ESCALA <br /> <span className="text-emerald-500">ILIMITADA</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Flujos ilimitados. Componentes (Lunas) ilimitados.
                        Seguridad de grado bancario, gobierno centralizado y precios predecibles.
                    </p>
                    <button className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-full hover:scale-105 transition-transform">
                        Ver Planes Enterprise
                    </button>
                </div>

                {/* Visual: Cards */}
                <motion.div style={{ scale }} className="grid gap-6">
                    <div className="p-8 bg-card border border-emerald-500/30 rounded-2xl backdrop-blur-md relative overflow-hidden group hover:border-emerald-500 transition-colors">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-300" />
                        <h3 className="text-2xl font-bold mb-2">Saturn Core</h3>
                        <p className="text-muted-foreground mb-4">Orquestación Central</p>
                        <div className="text-4xl font-black mb-4">ILIMITADO</div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Flujos Concurrentes</li>
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Usuarios & Roles</li>
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Auditoría Extendida</li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function SaturnStudioPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100, damping: 30, restDelta: 0.001
    });

    return (
        <div ref={containerRef} className="relative bg-background h-[600vh]">
            <Navbar />

            {/* Deep Space Background */}
            <div className="fixed inset-0 z-0 bg-background transition-colors duration-500">
                {/* Stars */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-background to-background pointer-events-none" />
            </div>

            <HeroSection scrollYProgress={smoothProgress} />
            <ConvergenceLayer scrollYProgress={smoothProgress} />
            <MoonsLayer scrollYProgress={smoothProgress} />
            <ModelerLayer scrollYProgress={smoothProgress} />
            <PricingLayer scrollYProgress={smoothProgress} />

            {/* Scroll Indicator */}
            <motion.div
                className="fixed bottom-10 right-10 z-50 mix-blend-difference pointer-events-none"
                style={{ opacity: useTransform(smoothProgress, [0.9, 1], [1, 0]) }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-mono tracking-widest text-white">SCROLL</span>
                    <motion.div
                        className="w-px h-12 bg-white"
                        style={{ scaleY: useTransform(smoothProgress, [0, 1], [0, 1]) }}
                    />
                </div>
            </motion.div>

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 z-50"
                style={{ width: useTransform(smoothProgress, v => `${v * 100}%`) }}
            />
        </div>
    );
}
