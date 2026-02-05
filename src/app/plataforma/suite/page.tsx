'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue, useMotionTemplate } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import {
    Rocket, Brain, Bot, Network, Eye, Users, ArrowRight, CheckCircle,
    Search, Binary, Cpu, Shield, Activity, FileJson, FileText, Image as ImageIcon,
    FileAudio, Database, Workflow, Lock, Server, Zap, BarChart3, Fingerprint,
    MessageSquare, Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

// === UTILS ===

// Helper to avoid hydration mismatch for random elements
// We return an empty array during SSR, and populate on client mount
// Helper to avoid hydration mismatch for random elements
// We return an empty array during SSR, and populate on client mount
function useRandomParticles(count: number, side: 'left' | 'right' | 'both' = 'both') {
    const [particles, setParticles] = useState<Array<{ id: number, top: string, left: string, delay: number, duration: number, xOff: number, yOff: number, scale: number, rotation: number }>>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const newParticles = Array.from({ length: count }).map((_, i) => {
            // Determine left position based on constraints
            let leftVal = Math.random() * 100;
            if (side === 'left') leftVal = Math.random() * 20; // 0-20%
            if (side === 'right') leftVal = 80 + Math.random() * 20; // 80-100%
            if (side === 'both') {
                // Randomly choose left (0-20) or right (80-100)
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

// Updated FloatingElement to accept className and style for positioning
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

// Side Particles Component
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
                        animate={{ opacity: 0.2, scale: p.scale }}
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

// Ensure component is mounted before rendering potential hydration mismatch content
function ClientOnly({ children }: { children: React.ReactNode }) {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => { setHasMounted(true); }, []);
    if (!hasMounted) return null;
    return <>{children}</>;
}


// === SCENES ===

// 1. HERO - THE SUITE
function HeroSection({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const scale = useTransform(scrollYProgress, [0, 0.1], [1, 20]);
    const opacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

    return (
        <motion.div
            className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity }}
        >
            {/* Background Elements - Deeper Void */}
            <ClientOnly>
                <div className="absolute inset-0 z-0 opacity-30 dark:opacity-50">
                    <FloatingElement yRange={[-20, 20]} delay={0} className="top-1/2 left-1/2 -ml-48 -mt-48">
                        <Rocket className="w-96 h-96 text-rocket-red blur-[80px] opacity-30" />
                    </FloatingElement>
                </div>
            </ClientOnly>

            <div className="relative z-10 text-center px-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full border border-rocket-red/30 bg-rocket-red/10 backdrop-blur-md shadow-[0_0_30px_-10px_var(--rocket-red)]">
                        <Rocket className="w-5 h-5 text-rocket-red animate-pulse" />
                        <span className="text-sm font-bold text-rocket-red tracking-[0.2em] uppercase">Rocketbot Suite</span>
                    </div>
                    {/* Fixed text gradient for Light Mode visibility */}
                    <h1 className="text-[12vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter text-foreground mb-8 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50">
                        AUTOMATIZACIÓN <br /> <span className="text-rocket-red">TOTAL</span>
                    </h1>
                    <p className="text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
                        Escalabilidad Infinita. Grado Empresarial. <br />
                        Desde tareas simples hasta <strong className="text-foreground font-medium">Agentes Autónomos</strong>.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}

// 2. LAYER 1: ROBOTIC (RPA) - ANIMATION: CONSTRUCTION
function RoboticLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.1, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
    // Construction Animation: Parts coming together
    const partProgress = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]); // 0 = disassembled, 1 = assembled

    const parts = [
        { Icon: Binary, x: -200, y: -200, color: "text-blue-500" },
        { Icon: Cpu, x: 200, y: -150, color: "text-blue-400" },
        { Icon: Zap, x: -150, y: 200, color: "text-blue-600" },
        { Icon: FileText, x: 150, y: 150, color: "text-cyan-500" },
        { Icon: Database, x: 0, y: -250, color: "text-blue-300" },
        { Icon: Server, x: 0, y: 250, color: "text-indigo-500" }
    ];

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-[2px]"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={15} color="bg-blue-500" />
            </ClientOnly>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto px-6 items-center w-full relative z-10">

                {/* Content Side */}
                <div className="order-2 lg:order-1 space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 font-mono text-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        LAYER 01: EXECUTION
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tight">
                        FUERZA DE <br /> <span className="text-blue-500">TRABAJO DIGITAL</span>
                    </h2>

                    <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                        Bots que imitan la interacción humana con <strong>precisión quirúrgica</strong>.
                        Ejecutan tareas repetitivas 24/7, eliminando errores y liberando talento.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { title: "Ejecución Universal", desc: "Web, Desktop, Mainframe, SAP, Citrix." },
                            { title: "Sin Errores", desc: "100% de precisión en entrada de datos." },
                            { title: "Alta Velocidad", desc: "Procesamiento 10x más rápido que humanos." },
                            { title: "No Invasivo", desc: "Se integra sin cambiar tu infraestructura." }
                        ].map((item, i) => (
                            <div key={i} className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 transition-colors">
                                <div className="text-sm font-bold text-foreground mb-1">{item.title}</div>
                                <div className="text-xs text-muted-foreground">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Animation Side: Construction */}
                <div className="order-1 lg:order-2 flex justify-center relative h-[500px] w-full items-center">
                    <div className="relative w-96 h-96">
                        {/* Central Core */}
                        <motion.div
                            className="absolute inset-0 bg-blue-500/20 rounded-full blur-[80px]"
                            animate={{ scale: [0.8, 1.2, 0.8] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <Bot className="w-48 h-48 text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]" strokeWidth={1} />
                        </div>

                        {/* Flying Parts Assembling */}
                        {parts.map((part, index) => (
                            <RoboticPart
                                key={index}
                                part={part}
                                index={index}
                                partProgress={partProgress}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}


function RoboticPart({ part, index, partProgress }: { part: any, index: number, partProgress: MotionValue<number> }) {
    const x = useTransform(partProgress, [0, 1], [part.x, 0]);
    const y = useTransform(partProgress, [0, 1], [part.y, 0]);
    const scale = useTransform(partProgress, [0, 1], [1, 0]);
    const opacity = useTransform(partProgress, [0, 0.8, 1], [1, 1, 0]);

    return (
        <motion.div
            key={index}
            style={{ x, y, scale, opacity }}
            className="absolute inset-0 flex items-center justify-center"
        >
            <part.Icon className={`w-12 h-12 ${part.color}`} />
        </motion.div>
    );
}

function IntelligentItem({ item, i, chaosProgress }: { item: any, i: number, chaosProgress: MotionValue<number> }) {
    const x = useTransform(chaosProgress, [0, 1], [item.startX, i * 70]);
    const y = useTransform(chaosProgress, [0, 1], [item.startY, 0]);
    const rotate = useTransform(chaosProgress, [0, 1], [(i * 65) % 360, 0]);

    return (
        <motion.div
            key={i}
            style={{ x, y, rotate }}
            className="absolute flex flex-col items-center gap-2"
        >
            <div className="w-14 h-14 rounded-xl bg-background border border-neon-magenta shadow-lg shadow-neon-magenta/20 flex items-center justify-center z-10">
                <item.Icon className="w-6 h-6 text-neon-magenta" />
            </div>
            <motion.span style={{ opacity: chaosProgress }} className="text-[10px] font-bold text-neon-magenta">{item.label}</motion.span>
        </motion.div>
    );
}

// 3. LAYER 2: INTELLIGENT (AI) - ANIMATION: CHAOS TO ORDER
function IntelligentLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.3, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
    const chaosProgress = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);

    // Items that start scattered and align into a grid
    const chaosItems = [
        { Icon: FileText, label: "PDF", startX: -200, startY: -100, endX: 0, endY: 0 },
        { Icon: ImageIcon, label: "JPG", startX: 200, startY: -50, endX: 60, endY: 0 },
        { Icon: FileJson, label: "JSON", startX: -150, startY: 150, endX: 120, endY: 0 },
        { Icon: FileAudio, label: "WAV", startX: 150, startY: 200, endX: 180, endY: 0 },
        { Icon: Database, label: "SQL", startX: 0, startY: -200, endX: 240, endY: 0 },
    ];

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={15} color="bg-neon-magenta" Icon={Binary} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Animation Side */}
                <div className="relative h-[400px] flex items-center justify-center">
                    <div className="relative w-full max-w-md h-64 border border-neon-magenta/20 bg-neon-magenta/5 rounded-2xl overflow-hidden backdrop-blur-sm">

                        {/* Structured Grid Target */}
                        <div className="absolute inset-0 grid grid-cols-5 items-center justify-items-center opacity-50">
                            {/* Grid slots visual guide */}
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-12 h-12 border border-dashed border-neon-magenta/30 rounded-lg"></div>
                            ))}
                        </div>

                        {/* Chaos Elements */}
                        <div className="absolute inset-0 flex items-center justify-start px-8">
                            {chaosItems.map((item, i) => (
                                <IntelligentItem
                                    key={i}
                                    item={item}
                                    i={i}
                                    chaosProgress={chaosProgress}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-neon-magenta/10 border border-neon-magenta/20 text-neon-magenta font-mono text-sm">
                        <Brain className="w-4 h-4" />
                        LAYER 02: COGNITION
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black text-foreground">
                        DE CAOS A <br /> <span className="text-neon-magenta">CLARIDAD</span>
                    </h2>

                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Transformamos datos no estructurados en información accionable.
                        Procesamos documentos, imágenes, audios y más.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {["PDF", "JPG/PNG", "JSON", "CSV", "XML", "TXT", "WAV", "MP3"].map(fmt => (
                            <span key={fmt} className="px-3 py-1 bg-neon-magenta/5 border border-neon-magenta/20 rounded text-xs font-bold text-foreground">
                                {fmt}
                            </span>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex gap-4 items-start">
                            <Eye className="w-6 h-6 text-neon-magenta mt-1" />
                            <div>
                                <h4 className="font-bold text-foreground">Visión Computacional</h4>
                                <p className="text-sm text-muted-foreground">Lee pantallas como un humano.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <FileText className="w-6 h-6 text-neon-magenta mt-1" />
                            <div>
                                <h4 className="font-bold text-foreground">OCR Avanzado</h4>
                                <p className="text-sm text-muted-foreground">Extrae datos de facturas y formularios.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// 4. LAYER 3: AGENTIC (AUTONOMOUS) - ANIMATION: NEURAL NETWORK
function AgenticLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
    const particles = useRandomParticles(8);

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={12} color="bg-rocket-red" Icon={Brain} />
            </ClientOnly>

            {/* Background Network */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                {/* This could be more complex, but keeping lightweight */}
            </div>

            <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
                <div className="inline-flex items-center justify-center p-4 bg-rocket-red/10 rounded-full mb-8 ring-1 ring-rocket-red/50 shadow-[0_0_50px_-10px_var(--rocket-red)]">
                    <Workflow className="w-12 h-12 text-rocket-red" />
                </div>

                <h2 className="text-5xl md:text-7xl font-black text-foreground mb-6">
                    AGENTES <span className="text-rocket-red">AUTÓNOMOS</span>
                </h2>

                <h3 className="text-2xl text-muted-foreground font-light mb-12 max-w-2xl mx-auto">
                    Más allá de la automatización lineal. Agentes que <strong>piensan, deciden y actúan</strong>.
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-background to-rocket-red/5 border border-rocket-red/10 hover:border-rocket-red/30 transition-all cursor-crosshair group">
                        <Brain className="w-8 h-8 text-rocket-red mb-4 group-hover:scale-110 transition-transform" />
                        <h4 className="text-xl font-bold text-foreground mb-2">Razonamiento</h4>
                        <p className="text-sm text-muted-foreground">Analizan contexto complejo y toman decisiones basadas en lógica difusa, no solo if/else.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-background to-rocket-red/5 border border-rocket-red/10 hover:border-rocket-red/30 transition-all cursor-crosshair group">
                        <MessageSquare className="w-8 h-8 text-rocket-red mb-4 group-hover:scale-110 transition-transform" />
                        <h4 className="text-xl font-bold text-foreground mb-2">Memoria</h4>
                        <p className="text-sm text-muted-foreground">Mantienen el contexto de conversaciones y procesos a largo plazo.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-background to-rocket-red/5 border border-rocket-red/10 hover:border-rocket-red/30 transition-all cursor-crosshair group">
                        <Zap className="w-8 h-8 text-rocket-red mb-4 group-hover:scale-110 transition-transform" />
                        <h4 className="text-xl font-bold text-foreground mb-2">Autonomía</h4>
                        <p className="text-sm text-muted-foreground">Se recuperan de errores y buscan caminos alternativos sin intervención humana.</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// 5. LAYER 4: ORCHESTRATION (ASSETS) - ANIMATION: ROTATING HUB
function OrchestrationLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.7, 0.75, 0.85, 0.9], [0, 1, 1, 0]);

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={15} color="bg-purple-500" Icon={Network} />
            </ClientOnly>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto px-6 items-center w-full relative z-10">

                {/* Content Side */}
                <div className="order-2 lg:order-1 space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 font-mono text-sm">
                        <Server className="w-4 h-4" />
                        LAYER 04: GOVERNANCE
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-foreground">
                        ORQUESTACIÓN <br /> <span className="text-purple-500">CENTRALIZADA</span>
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Un solo panel de control para todo tu ecosistema digital. Gobernanza, seguridad y control total.
                    </p>

                    <ul className="space-y-4">
                        {[
                            { icon: Lock, text: "Gestión de Credenciales (Vault Safe)" },
                            { icon: Layers, text: "Control de Versiones y Despliegues" },
                            { icon: Activity, text: "Balanceo de Cargas y Colas" },
                            { icon: Fingerprint, text: "Roles y Permisos Granulares" }
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                                <div className="p-2 rounded bg-purple-500/20 text-purple-500">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <span className="text-lg font-medium text-foreground">{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Animation: Rotating Hub */}
                <div className="order-1 lg:order-2 flex justify-center">
                    <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                        {/* Outer Ring */}
                        <motion.div
                            className="absolute inset-0 border border-dashed border-purple-500/30 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        />
                        {/* Inner Ring */}
                        <motion.div
                            className="absolute inset-10 border border-purple-500/20 rounded-full"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Central Hub */}
                        <div className="relative z-10 w-40 h-40 bg-purple-500/10 rounded-full backdrop-blur-xl border border-purple-500/50 flex items-center justify-center shadow-[0_0_60px_-10px_var(--neon-purple)]">
                            <Network className="w-16 h-16 text-purple-500" />
                        </div>

                        {/* Satellites */}
                        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 flex flex-col items-center">
                            <Server className="w-8 h-8 text-purple-400 mb-2" />
                            <span className="text-xs font-mono text-purple-400">SRV-01</span>
                        </motion.div>
                        <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 flex flex-col items-center">
                            <Server className="w-8 h-8 text-purple-400 mt-2" />
                            <span className="text-xs font-mono text-purple-400">SRV-02</span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// 6. LAYERS 5 & 6: SUPERVISION & HUMAN - ANIMATION: SCANNING
function SupervisionAndHumanLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.9, 0.95], [0, 1]);

    return (
        <motion.div
            className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity }}
        >
            <ClientOnly>
                <SideParticles count={20} color="bg-green-500" />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 h-screen pointer-events-auto items-center relative z-10">

                {/* Supervision */}
                <div className="bg-background/20 backdrop-blur-md p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Eye className="w-12 h-12 text-green-500 mb-6" />
                    <h2 className="text-3xl font-black text-foreground mb-4">SUPERVISIÓN 360°</h2>
                    <p className="text-muted-foreground mb-6">
                        Logs detallados, métricas en tiempo real y alertas predictivas.
                        Nunca pierdas de vista el estado de tu operación.
                    </p>
                    <div className="h-32 bg-black/40 rounded-xl relative overflow-hidden flex items-end p-2 gap-1 border border-white/5">
                        {/* Fake Chart */}
                        {[40, 70, 50, 90, 60, 80, 40, 90, 100, 70].map((h, i) => (
                            <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-green-500/50 rounded-sm" />
                        ))}
                        {/* Scanning Line */}
                        <motion.div
                            className="absolute top-0 bottom-0 w-1 bg-green-400 shadow-[0_0_15px_var(--neon-green)]"
                            animate={{ left: ["0%", "100%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </div>

                {/* Human in the Loop */}
                <div className="bg-background/20 backdrop-blur-md p-8 rounded-3xl border border-white/10 relative text-center">
                    <Users className="w-16 h-16 text-foreground mx-auto mb-6 p-4 bg-white/10 rounded-full" />
                    <h2 className="text-4xl font-black text-foreground mb-4">HUMAN IN THE LOOP</h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        <strong>Tu tiempo importa.</strong><br />
                        Deja que los robots trabajen y enfócate en la estrategia.
                        Colaboración fluida entre expertos y fuerza digital.
                    </p>
                    <button className="px-8 py-4 bg-rocket-red text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform">
                        Solicitar Demo Personalizada
                    </button>
                </div>

            </div>
        </motion.div>
    );
}

export default function CinematicSuitePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100, damping: 30, restDelta: 0.001
    });

    return (
        <div ref={containerRef} className="relative bg-background h-[800vh]">
            <Navbar />

            {/* Ambient Audio or Global Effects could go here */}

            {/* Fixed Background that changes with Theme */}
            <div className="fixed inset-0 z-0 bg-background transition-colors duration-500">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-background/80 pointer-events-none" />
            </div>

            <HeroSection scrollYProgress={smoothProgress} />
            <RoboticLayer scrollYProgress={smoothProgress} />
            <IntelligentLayer scrollYProgress={smoothProgress} />
            <AgenticLayer scrollYProgress={smoothProgress} />
            <OrchestrationLayer scrollYProgress={smoothProgress} />
            <SupervisionAndHumanLayer scrollYProgress={smoothProgress} />

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

            {/* Scroll Progress Bar Top */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-rocket-red to-purple-600 z-50"
                style={{ width: useTransform(smoothProgress, v => `${v * 100}%`) }}
            />
        </div>
    );
}
