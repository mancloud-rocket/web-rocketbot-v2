'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import {
    LayoutTemplate, MousePointer, Terminal, Eye, Bug, CheckCircle,
    ArrowRight, Box, Target, Code2, Scan, Play, Pause, StepForward,
    Monitor, Keyboard, Layers, Zap, Database, Globe
} from 'lucide-react';

const MotionCheckCircle = motion(CheckCircle);
import { cn } from '@/lib/utils';

// === UTILS ===

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

// Ensure component is mounted before rendering potential hydration mismatch content
function ClientOnly({ children }: { children: React.ReactNode }) {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => { setHasMounted(true); }, []);
    if (!hasMounted) return null;
    return <>{children}</>;
}


// === SCENES ===

// 1. HERO - BUILD FAST
function HeroSection({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const scale = useTransform(scrollYProgress, [0, 0.1], [1, 20]);
    const opacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

    return (
        <motion.div
            className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity }}
        >
            {/* Background Blueprint Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative z-10 text-center px-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-md shadow-[0_0_30px_-10px_var(--orange-500)]">
                        <LayoutTemplate className="w-5 h-5 text-orange-500" />
                        <span className="text-sm font-bold text-orange-500 tracking-[0.2em] uppercase">Rocketbot Studio</span>
                    </div>

                    <h1 className="text-[12vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter text-foreground mb-8 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50">
                        DISEÑA <br /> <span className="text-orange-500">SIN LÍMITES</span>
                    </h1>

                    <p className="text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
                        Construye bots potentes en minutos.<br />
                        La fusión perfecta entre <strong className="text-foreground font-medium">Low-Code</strong> y <strong className="text-foreground font-medium">Python puro</strong>.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}

// 2. LAYER 1: VISUAL EDITOR - ANIMATION: TETRIS/MAGNET
function VisualLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.1, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
    const snapProgress = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

    const blocks = [
        { id: 1, label: "Open Browser", color: "bg-blue-500", x: -100, y: -150, finalY: 0 },
        { id: 2, label: "Extract Data", color: "bg-green-500", x: 150, y: -50, finalY: 60 },
        { id: 3, label: "Save to Excel", color: "bg-purple-500", x: -50, y: 100, finalY: 120 },
    ];

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-[2px]"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={15} color="bg-orange-500" Icon={Box} />
            </ClientOnly>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto px-6 items-center w-full relative z-10">
                {/* Content */}
                <div className="order-2 lg:order-1 space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 font-mono text-sm">
                        <LayoutTemplate className="w-4 h-4" />
                        LAYER 01: VISUAL
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        ARRASTRA <br /> <span className="text-orange-500">Y CONECTA</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Interfaz intuitiva de arrastrar y soltar. Crea flujos complejos sin escribir una sola línea de código.
                        Más de 600 comandos pre-construidos listos para usar.
                    </p>
                </div>

                {/* Animation: Blocks Snapping */}
                <div className="order-1 lg:order-2 flex justify-center h-[400px] items-center">
                    <div className="relative w-80 h-[300px] border-l-2 border-dashed border-white/10 pl-8">
                        {/* Connection Line */}
                        <motion.div
                            className="absolute left-8 top-4 w-1 bg-orange-500/50"
                            style={{ height: useTransform(snapProgress, [0, 1], ["0%", "80%"]) }}
                        />

                        {blocks.map((block, i) => {
                            const x = useTransform(snapProgress, [0, 1], [block.x, 0]);
                            const y = useTransform(snapProgress, [0, 1], [block.y, block.finalY]);
                            const rotate = useTransform(snapProgress, [0, 0.8], [block.x > 0 ? 15 : -15, 0]);

                            return (
                                <motion.div
                                    key={block.id}
                                    style={{ x, y, rotate }}
                                    className={cn("absolute left-8 w-64 p-4 rounded-lg text-white font-bold shadow-xl flex items-center gap-3", block.color)}
                                >
                                    <div className="w-2 h-2 rounded-full bg-white/50" />
                                    {block.label}
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// 3. LAYER 2: RECORDER - ANIMATION: TARGET LOCK
function RecorderLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.3, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
    const scanProgress = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);

    const uiElements = [
        { label: "Button: Login", x: "20%", y: "30%", w: 100, h: 40 },
        { label: "Input: Email", x: "20%", y: "50%", w: 200, h: 40 },
        { label: "Table: Data", x: "60%", y: "40%", w: 150, h: 120 },
    ];

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={15} color="bg-red-500" Icon={Target} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Animation: Targeting */}
                <div className="relative h-[400px] bg-background/40 rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                    {/* Simulated UI */}
                    <div className="absolute top-4 left-4 right-4 h-8 bg-white/5 rounded flex items-center gap-2 px-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                        <div className="w-full h-4 bg-black/20 rounded ml-4" />
                    </div>

                    {uiElements.map((el, i) => (
                        <div
                            key={i}
                            style={{ left: el.x, top: el.y, width: el.w, height: el.h }}
                            className="absolute bg-white/5 border border-white/10 rounded flex items-center justify-center text-xs text-white/30"
                        >
                            {el.label}
                        </div>
                    ))}

                    {/* Crosshair Cursor */}
                    <motion.div
                        className="absolute z-20 pointer-events-none"
                        style={{
                            left: useTransform(scanProgress, [0, 0.33, 0.66, 1], ["50%", "25%", "65%", "25%"]),
                            top: useTransform(scanProgress, [0, 0.33, 0.66, 1], ["50%", "33%", "45%", "53%"]),
                        }}
                    >
                        <Target className="w-12 h-12 text-red-500 drop-shadow-[0_0_15px_var(--red-500)]" />
                        <motion.div
                            className="absolute -inset-4 border-2 border-red-500/50 rounded-full"
                            animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    </motion.div>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-sm">
                        <MousePointer className="w-4 h-4" />
                        LAYER 02: RECORDER
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        GRABADOR <br /> <span className="text-red-500">UNIVERSAL</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Detecta selectores automáticamente en cualquier aplicación.
                        Web, Desktop, SAP, Mainframe, Citrix. Si está en la pantalla, podemos automatizarlo.
                    </p>
                    <div className="flex gap-4">
                        {[Globe, Monitor, Database, Terminal].map((Icon, i) => (
                            <div key={i} className="p-3 rounded-lg bg-red-500/10 text-red-500">
                                <Icon className="w-6 h-6" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// 4. LAYER 3: CODE (PYTHON) - ANIMATION: MATRIX/TERMINAL
function CodeLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
    const scrollCode = useTransform(scrollYProgress, [0.5, 0.7], [0, -200]);

    const codeSnippet = `
def process_data(data):
    # Rocketbot Native Python
    results = []
    for item in data:
        if item.score > 0.8:
            enrich = ai.analyze(item.text)
            results.append({
                "id": item.id,
                "sentiment": enrich.sentiment,
                "confidence": item.score
            })
    
    return pd.DataFrame(results)

# Integración directa
import pandas as pd
import numpy as np
import tensorflow as tf
`;

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={20} color="bg-green-500" Icon={Terminal} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                {/* Content */}
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 font-mono text-sm">
                        <Code2 className="w-4 h-4" />
                        LAYER 03: EXTENSIBLE
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        POTENCIA DE <br /> <span className="text-green-500">PYTHON</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        No te limites a lo que te da la herramienta.
                        Importa cualquier librería de Python, crea tus propios comandos y extiéndelo al infinito.
                    </p>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <p className="text-sm font-mono text-green-400">
                            &gt; pip install pandas numpy opencv-python ...
                        </p>
                    </div>
                </div>

                {/* Animation: Terminal */}
                <div className="relative h-[400px] bg-black rounded-lg border border-green-500/30 p-6 overflow-hidden shadow-[0_0_50px_-20px_rgba(34,197,94,0.3)]">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-green-900/20 border-b border-green-500/20 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>

                    <motion.div style={{ y: scrollCode }} className="mt-8">
                        <pre className="font-mono text-sm text-green-500 leading-relaxed">
                            {codeSnippet}
                            {codeSnippet}
                            {codeSnippet}
                        </pre>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

// 5. LAYER 4: VISION - ANIMATION: X-RAY SCAN
function VisionLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.7, 0.75, 0.85, 0.9], [0, 1, 1, 0]);
    const scanLine = useTransform(scrollYProgress, [0.7, 0.9], ["0%", "100%"]);

    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center"
            style={{ opacity, display: useTransform(opacity, v => v > 0 ? 'flex' : 'none') }}
        >
            <ClientOnly>
                <SideParticles count={15} color="bg-purple-500" Icon={Eye} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                {/* Animation: X-Ray */}
                <div className="relative h-[400px] rounded-xl overflow-hidden border border-purple-500/30 group">
                    {/* Blurred/Pixelated Layer */}
                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                        <div className="text-8xl font-black text-white/10 select-none">INVOICE #001</div>
                    </div>

                    {/* Scanned/Clear Layer (Revealed by mask) - Simulated via separate div for simplicity */}
                    <motion.div
                        className="absolute inset-0 bg-purple-900/20 flex items-center justify-center border-r-2 border-purple-500 shadow-[0_0_20px_var(--purple-500)]"
                        style={{ width: scanLine, overflow: 'hidden' }}
                    >
                        <div className="w-full h-full flex flex-col items-center justify-center relative min-w-[600px]"> {/* Min-width to prevent text reflow */}
                            <div className="text-8xl font-black text-purple-500 select-none">INVOICE #001</div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] border-2 border-dashed border-purple-400/50 rounded-lg flex items-start p-4">
                                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">DETECTED: ID_NUM</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 font-mono text-sm">
                        <Scan className="w-4 h-4" />
                        LAYER 04: VISION
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        VISIÓN <br /> <span className="text-purple-500">COMPUTACIONAL</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Automatiza interfaces imposibles (Citrix, RDP, Legacy) usando IA visual.
                        Encuentra elementos por su apariencia, no solo por código.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}


function DebugStep({ t, i, scrollYProgress }: { t: number, i: number, scrollYProgress: MotionValue<number> }) {
    const bgColor = useTransform(
        scrollYProgress,
        s => s >= t ? "rgba(6,182,212,0.1)" : "rgba(255,255,255,0.05)"
    );
    const borderColor = useTransform(
        scrollYProgress,
        s => s >= t ? "rgba(6,182,212,0.5)" : "transparent"
    );
    const checkOpacity = useTransform(scrollYProgress, s => s >= t ? 1 : 0);

    return (
        <motion.div
            className={cn("p-4 rounded-lg border flex justify-between items-center transition-colors duration-300",
                i === 3 ? "mb-0" : "mb-0"
            )}
            style={{
                backgroundColor: bgColor,
                borderColor: borderColor
            }}
        >
            <span className="font-mono text-sm">Step {i + 1}: Executing Command...</span>
            <MotionCheckCircle className="w-4 h-4 text-cyan-500" style={{ opacity: checkOpacity }} />
        </motion.div>
    );
}

// 6. LAYER 5: DEBUG - ANIMATION: STEP OVER
function DebugLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollYProgress, [0.9, 0.95], [0, 1]);
    const step = useTransform(scrollYProgress, [0.92, 0.94, 0.96, 0.98], [0, 1, 2, 3]);

    return (
        <motion.div
            className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity }}
        >
            <ClientOnly>
                <SideParticles count={20} color="bg-cyan-500" Icon={Bug} />
            </ClientOnly>

            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 h-screen pointer-events-auto items-center relative z-10">
                {/* Content */}
                <div className="space-y-8 text-center md:text-left">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 font-mono text-sm">
                        <Bug className="w-4 h-4" />
                        LAYER 05: DEBUGGING
                    </div>
                    <h2 className="text-5xl font-black text-foreground">
                        DEPURACIÓN <br /> <span className="text-cyan-500">PASO A PASO</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Control total en tiempo real. Inspecciona variables, puntos de interrupción y estado del bot en cada milisegundo.
                    </p>
                    <div className="flex gap-4 justify-center md:justify-start">
                        <button className="p-4 rounded-full bg-cyan-500 text-black hover:scale-110 transition-transform"><Play fill="currentColor" /></button>
                        <button className="p-4 rounded-full bg-gray-700 text-white hover:scale-110 transition-transform"><Pause fill="currentColor" /></button>
                        <button className="p-4 rounded-full bg-gray-700 text-white hover:scale-110 transition-transform"><StepForward /></button>
                    </div>
                </div>

                {/* Animation: Steps */}
                <div className="h-[400px] bg-background/50 border border-white/10 rounded-xl p-8 flex flex-col gap-4 relative overflow-hidden backdrop-blur-md">
                    {[0.92, 0.94, 0.96, 0.98].map((t, i) => (
                        <DebugStep key={i} t={t} i={i} scrollYProgress={scrollYProgress} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function RPAStudioPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100, damping: 30, restDelta: 0.001
    });

    return (
        <div ref={containerRef} className="relative bg-background h-[700vh]">
            <Navbar />

            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 bg-background transition-colors duration-500">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-background to-background pointer-events-none" />
            </div>

            <HeroSection scrollYProgress={smoothProgress} />
            <VisualLayer scrollYProgress={smoothProgress} />
            <RecorderLayer scrollYProgress={smoothProgress} />
            <CodeLayer scrollYProgress={smoothProgress} />
            <VisionLayer scrollYProgress={smoothProgress} />
            <DebugLayer scrollYProgress={smoothProgress} />

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
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-purple-600 z-50"
                style={{ width: useTransform(smoothProgress, v => `${v * 100}%`) }}
            />
        </div>
    );
}
