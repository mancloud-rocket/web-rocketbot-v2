'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import {
    Layout, UserCheck, CheckSquare, GitBranch,
    FileSpreadsheet, Hand, MessageSquare, AlertTriangle,
    ArrowRight, CheckCircle2, User, Bot
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

function SideParticles({ count = 20, color = "bg-neon-cyan", Icon }: { count?: number, color?: string, Icon?: any }) {
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
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00D4FF12_1px,transparent_1px),linear-gradient(to_bottom,#00D4FF12_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center px-4"
            >
                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative"
                    >
                        <div className="w-32 h-32 rounded-lg bg-neon-cyan/20 blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <Layout className="w-40 h-40 text-neon-cyan drop-shadow-[0_0_30px_rgba(0,212,255,0.5)]" />
                    </motion.div>
                </div>

                <div className="inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 backdrop-blur-md">
                    <UserCheck className="w-5 h-5 text-neon-cyan" />
                    <span className="text-sm font-bold text-neon-cyan tracking-[0.2em] uppercase">Xperience</span>
                </div>

                <h1 className="text-[10vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter text-foreground mb-8">
                    HUMAN <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-cyan">IN THE LOOP</span>
                </h1>

                <p className="text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
                    La automatización se encuentra con la intuición humana.<br />
                    Formularios inteligentes, aprobaciones y hand-off para cuando la IA <strong className="text-foreground font-medium">necesita ayuda</strong>.
                </p>
            </motion.div>
        </motion.div>
    );
}

// 1. LAYER 1: INTELLIGENT FORMS
function FormsLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.1, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
    const x = useTransform(scrollYProgress, [0.1, 0.2], [-100, 0]); // Enter from Left

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background/90"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={15} color="bg-neon-cyan" Icon={FileSpreadsheet} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <motion.div style={{ x }} className="order-2 lg:order-1 space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan font-mono text-sm">
                        <CheckSquare className="w-4 h-4" />
                        LAYER 01: SMART FORMS
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        FORMULARIOS <br /> <span className="text-neon-cyan">DINÁMICOS</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Crea interfaces para tus bots en minutos. Arrastra componentes, conecta variables y despliega formularios web seguros que disparan automatizaciones.
                    </p>
                </motion.div>

                <div className="order-1 lg:order-2 relative h-[400px] flex items-center justify-center">
                    {/* Form Animation */}
                    <div className="w-full max-w-sm bg-card border border-white/10 rounded-xl p-6 shadow-2xl space-y-4 glass-card-premium">
                        <div className="h-4 w-1/3 bg-foreground/20 rounded" />
                        <div className="space-y-2">
                            <div className="h-10 bg-secondary/50 rounded border border-white/5" />
                            <div className="h-10 bg-secondary/50 rounded border border-white/5" />
                            <div className="flex gap-2">
                                <div className="h-10 w-1/2 bg-secondary/50 rounded border border-white/5" />
                                <div className="h-10 w-1/2 bg-secondary/50 rounded border border-white/5" />
                            </div>
                        </div>
                        <motion.div
                            className="bg-neon-cyan text-black font-bold h-12 rounded flex items-center justify-center cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            SUBMIT REQUEST
                        </motion.div>

                        {/* Floating visual elements */}
                        <motion.div
                            className="absolute -right-10 top-10 p-3 bg-neon-cyan text-black rounded-lg shadow-lg text-sm font-bold"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            Drag & Drop
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// 2. LAYER 2: THE HUMAN TOUCH
function HandshakeLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.3, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
    const x = useTransform(scrollYProgress, [0.3, 0.4], [100, 0]); // Enter from Right
    const scale = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1.2]);

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background/95"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={20} color="bg-blue-500" Icon={Hand} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="order-1 relative h-[400px] flex items-center justify-center">
                    {/* Handshake/Collaboration Abstract Visual */}
                    <div className="relative">
                        <motion.div
                            className="absolute right-0 top-0 w-32 h-32 rounded-full border-4 border-neon-cyan/50"
                            animate={{ x: [0, 20, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute left-0 bottom-0 w-32 h-32 rounded-full border-4 border-blue-500/50"
                            animate={{ x: [0, -20, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="relative z-10 p-8 glass-card rounded-2xl flex items-center gap-4">
                            <div className="flex flex-col items-center">
                                <Bot className="w-12 h-12 text-neon-cyan mb-2" />
                                <span className="text-xs font-mono text-neon-cyan">AGENT</span>
                            </div>
                            <ArrowRight className="w-8 h-8 text-white/50" />
                            <div className="flex flex-col items-center">
                                <User className="w-12 h-12 text-blue-500 mb-2" />
                                <span className="text-xs font-mono text-blue-500">HUMAN</span>
                            </div>
                        </div>
                    </div>
                </div>

                <motion.div style={{ x }} className="order-2 space-y-8 text-right lg:text-left">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 font-mono text-sm">
                        <UserCheck className="w-4 h-4" />
                        LAYER 02: COLLABORATION
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        EL TOQUE <br /> <span className="text-blue-500">HUMANO</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        No todo puede ser 100% automático. Xperience facilita la intervención humana segura y auditada en medio de procesos críticos.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}

// 3. LAYER 3: APPROVALS
function ApprovalLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
    const x = useTransform(scrollYProgress, [0.5, 0.6], [-100, 0]); // Enter from Left

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background/90"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={15} color="bg-green-500" Icon={CheckCircle2} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <motion.div style={{ x }} className="order-2 lg:order-1 space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 font-mono text-sm">
                        <GitBranch className="w-4 h-4" />
                        LAYER 03: WORKFLOWS
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        FLUJOS DE <br /> <span className="text-green-500">APROBACIÓN</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Redirige tareas a supervisores. Aprueba gastos, valida excepciones y libera procesos bloqueados desde cualquier dispositivo.
                    </p>
                </motion.div>

                <div className="order-1 lg:order-2 relative h-[400px] flex flex-col items-center justify-center space-y-4">
                    {/* Approval Card Stack */}
                    <motion.div
                        className="w-full max-w-md bg-card border-l-4 border-l-yellow-500 rounded p-4 shadow-lg flex justify-between items-center"
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div>
                            <div className="text-sm font-bold">Expense &gt; $5,000</div>
                            <div className="text-xs text-muted-foreground">Pending Approval</div>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-green-500/20 text-green-500 text-xs font-bold rounded">APPROVE</button>
                            <button className="px-3 py-1 bg-red-500/20 text-red-500 text-xs font-bold rounded">REJECT</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

// 4. LAYER 4: AGENTIC HANDOFF
function HandoffLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.7, 0.75, 0.9, 1], [0, 1, 1, 1]);
    const x = useTransform(scrollYProgress, [0.7, 0.8], [100, 0]); // Enter from Right
    const scale = useTransform(scrollYProgress, [0.7, 0.9], [0.8, 1]);

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={15} color="bg-red-500" Icon={AlertTriangle} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
                <div className="order-1 relative h-[400px] flex items-center justify-center">
                    {/* Handoff Animation */}
                    <div className="relative w-80 h-80 bg-black/40 rounded-full border border-red-500/30 flex items-center justify-center">
                        <div className="absolute inset-0 border border-red-500/10 rounded-full animate-ping" />
                        <AlertTriangle className="w-16 h-16 text-red-500" />

                        {/* Routing Line */}
                        <motion.div
                            className="absolute top-1/2 left-full w-20 h-1 bg-gradient-to-r from-red-500 to-green-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: 80 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                        <motion.div
                            className="absolute top-1/2 left-[calc(100%+80px)] p-2 bg-green-500 text-black font-bold text-xs rounded"
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.5 }}
                        >
                            HUMAN RESOLVED
                        </motion.div>
                    </div>
                </div>

                <motion.div style={{ x, scale }} className="order-2 space-y-8 text-right md:text-left">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-sm">
                        <Bot className="w-4 h-4" />
                        LAYER 04: AGENTIC HANDOFF
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        ROUTING <br /> <span className="text-red-500">AUTOMÁTICO</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Cuando el Agente de IA "duda" o encuentra una excepción no contemplada, transfiere el contexto completo (chat, datos, estado) a un humano en Xperience.
                    </p>
                    <button className="px-8 py-4 bg-neon-cyan text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_var(--neon-cyan)]">
                        Ver Flow
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function XperiencePage() {
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
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neon-cyan/10 via-background to-background pointer-events-none" />
            </div>

            <HeroSection scrollYProgress={smoothProgress} />
            <FormsLayer scrollYProgress={smoothProgress} />
            <HandshakeLayer scrollYProgress={smoothProgress} />
            <ApprovalLayer scrollYProgress={smoothProgress} />
            <HandoffLayer scrollYProgress={smoothProgress} />

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-neon-cyan to-blue-500 z-50"
                style={{ width: useTransform(smoothProgress, v => `${v * 100}%`) }}
            />
        </div>
    );
}
