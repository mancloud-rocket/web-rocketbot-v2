'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import { ShoppingBag, Package, Truck, Receipt, Barcode, Box, Globe, ChevronDown, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
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

function SideParticles({ count = 10, color = "text-orange-500", Icon }: { count?: number, color?: string, Icon?: any }) {
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

function InventoryLayer({ scrollYProgress }: { scrollYProgress: any }) {
    const opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.3, 0.4], [0, 1, 1, 0]);
    const x = useTransform(scrollYProgress, [0.1, 0.2, 0.3, 0.4], [-100, 0, 0, -100]); // Left Entry/Exit
    const scale = useTransform(scrollYProgress, [0.1, 0.2], [0.8, 1]);

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-10"
            style={{ opacity }}
        >
            <motion.div
                className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                style={{ x, scale }}
            >
                {/* Text Content */}
                <div className="space-y-6 bg-background/50 backdrop-blur-md p-8 rounded-3xl border border-orange-500/20 shadow-[0_0_50px_rgba(249,115,22,0.1)]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-orange-500/20 text-orange-500 border border-orange-500/30">
                            <Box className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight">
                            Gestión de <span className="text-orange-500">Inventarios</span>
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Control total de tu stock en tiempo real. Automatiza la reposición, predice la demanda y elimina el error humano en el conteo.
                    </p>
                    <ul className="space-y-3">
                        {["Actualización en tiempo real", "Predicción de demanda IA", "Alertas de stock bajo"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-foreground/80">
                                <CheckCircle className="w-5 h-5 text-orange-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Visual */}
                <div className="relative h-[400px] w-full bg-black/40 rounded-3xl border border-orange-500/30 overflow-hidden flex items-center justify-center group">
                    {/* Shelving Animation */}
                    <div className="absolute inset-0 grid grid-cols-3 gap-4 p-8 opacity-50">
                        {[...Array(9)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0.3, y: 0 }}
                                animate={{ opacity: [0.3, 1, 0.3], y: [0, -5, 0] }}
                                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                                className="bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-center justify-center"
                            >
                                <Box className="w-8 h-8 text-orange-500/50" />
                            </motion.div>
                        ))}
                    </div>
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1.05 }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                        className="relative z-10 p-6 bg-background/80 backdrop-blur-xl rounded-2xl border border-orange-500/50 shadow-2xl"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                            <span className="font-mono text-sm text-green-500">SYSTEM ONLINE</span>
                        </div>
                        <div className="text-4xl font-bold text-foreground mb-1">98.5%</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-widest">Precisión de Inventario</div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function OrdersLayer({ scrollYProgress }: { scrollYProgress: any }) {
    const opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [0, 1, 1, 0]);
    const x = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [100, 0, 0, 100]); // Right Entry/Exit

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-10"
            style={{ opacity }}
        >
            <motion.div
                className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                style={{ x }}
            >
                {/* Visual (Left on Desktop for this layer, but visually 2nd) */}
                <div className="order-2 md:order-1 relative h-[400px] w-full bg-black/40 rounded-3xl border border-orange-500/30 overflow-hidden flex items-center justify-center">
                    <motion.div
                        animate={{ x: [-100, 100] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
                    </motion.div>

                    <div className="relative z-10 grid gap-4 w-64">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ x: -200, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.5, duration: 0.5 }}
                                className="bg-background/90 p-4 rounded-lg border-l-4 border-orange-500 flex justify-between items-center shadow-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <Package className="w-5 h-5 text-orange-500" />
                                    <div className="text-sm font-bold">Order #{2300 + i}</div>
                                </div>
                                <span className="text-xs text-green-500 font-mono">PROCESSED</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Text Content */}
                <div className="order-1 md:order-2 space-y-6 bg-background/50 backdrop-blur-md p-8 rounded-3xl border border-orange-500/20 shadow-[0_0_50px_rgba(249,115,22,0.1)]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-orange-500/20 text-orange-500 border border-orange-500/30">
                            <ShoppingBag className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight">
                            Procesamiento de <span className="text-orange-500">Pedidos</span>
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Desde el clic hasta el envío en tiempo récord. Orquesta la recepción, validación y preparación de pedidos sin fricción.
                    </p>
                    <ul className="space-y-3">
                        {["Validación automática de pagos", "Asignación inteligente de stock", "Generación de etiquetas de envío"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-foreground/80">
                                <CheckCircle className="w-5 h-5 text-orange-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
}

function LogisticsLayer({ scrollYProgress }: { scrollYProgress: any }) {
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
                <div className="space-y-6 bg-background/50 backdrop-blur-md p-8 rounded-3xl border border-orange-500/20 shadow-[0_0_50px_rgba(249,115,22,0.1)]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-orange-500/20 text-orange-500 border border-orange-500/30">
                            <Truck className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight">
                            Gestión de <span className="text-orange-500">Logística</span>
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Optimiza rutas y tiempos de entrega. Conecta con múltiples carriers y mantén a tus clientes informados en cada paso.
                    </p>
                    <ul className="space-y-3">
                        {["Tracking unificado", "Optimización de rutas", "Integración con couriers"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-foreground/80">
                                <CheckCircle className="w-5 h-5 text-orange-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Visual */}
                <div className="relative h-[400px] w-full bg-black/40 rounded-3xl border border-orange-500/30 overflow-hidden flex items-center justify-center">
                    <Globe className="absolute w-[120%] h-[120%] text-orange-500/5 stroke-[0.5] animate-spin-slow" />

                    {/* Route Animation */}
                    <svg className="absolute inset-0 w-full h-full">
                        <motion.path
                            d="M 100 300 Q 250 100 500 200"
                            fill="none"
                            stroke="#f97316"
                            strokeWidth="2"
                            strokeDasharray="10 10"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.circle
                            r="6"
                            fill="#f97316"
                            style={{
                                offsetPath: "path('M 100 300 Q 250 100 500 200')",
                                offsetDistance: "0%"
                            }}
                            animate={{
                                offsetDistance: "100%"
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    </svg>

                    <div className="absolute bottom-6 right-6 bg-background/90 p-4 rounded-xl border border-orange-500/30 backdrop-blur-md">
                        <div className="text-xs text-muted-foreground uppercase mb-1">Status</div>
                        <div className="text-lg font-bold text-orange-500 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                            En Tránsito
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function PaymentsLayer({ scrollYProgress }: { scrollYProgress: any }) {
    const opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.9, 1], [0, 1, 1, 1]); // Stays visible at end
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
                <div className="order-2 md:order-1 relative h-[400px] w-full bg-black/40 rounded-3xl border border-orange-500/30 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-500/10" />

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="w-64 bg-background/90 rounded-t-xl p-6 shadow-2xl border-t-4 border-orange-500 relative"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div className="font-bold text-lg">Receipt</div>
                            <Receipt className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="space-y-4 font-mono text-sm opacity-80">
                            <div className="flex justify-between"><span>Item 01</span><span>$120.00</span></div>
                            <div className="flex justify-between"><span>Item 02</span><span>$45.00</span></div>
                            <div className="flex justify-between"><span>Tax</span><span>$15.00</span></div>
                            <div className="h-px bg-foreground/20 my-2" />
                            <div className="flex justify-between font-bold text-lg"><span>Total</span><span>$180.00</span></div>
                        </div>
                        <div className="absolute -bottom-2 left-0 right-0 h-4 bg-transparent [background-image:linear-gradient(135deg,transparent_50%,#000_50%),linear-gradient(45deg,#000_50%,transparent_50%)] [background-size:20px_20px]" />
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white font-bold p-4 rounded-full border-4 border-white shadow-xl rotate-12"
                    >
                        MATCHED
                    </motion.div>
                </div>

                {/* Text Content */}
                <div className="order-1 md:order-2 space-y-6 bg-background/50 backdrop-blur-md p-8 rounded-3xl border border-orange-500/20 shadow-[0_0_50px_rgba(249,115,22,0.1)]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-orange-500/20 text-orange-500 border border-orange-500/30">
                            <Receipt className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight">
                            Conciliación de <span className="text-orange-500">Pagos</span>
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Cuadra cada transacción automáticamente. Identifica discrepancias al instante y mantén tus finanzas saludables.
                    </p>
                    <ul className="space-y-3">
                        {["Cruce automático facturas/pagos", "Detección de anomalías", "Reportes financieros al día"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-foreground/80">
                                <CheckCircle className="w-5 h-5 text-orange-500" />
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

export default function RetailPage() {
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
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-600 origin-left z-50"
                style={{ scaleX: smoothProgress }}
            />

            {/* Background Particles */}
            <ClientOnly>
                <div className="fixed inset-0 z-0 opacity-40">
                    <SideParticles count={15} color="text-orange-500" Icon={Barcode} />
                    <SideParticles count={10} color="text-red-500" Icon={Box} />
                </div>
            </ClientOnly>

            {/* Hero Section */}
            <motion.div
                className="fixed inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4 text-center"
                style={{ opacity: heroOpacity, scale: heroScale }}
            >
                <div className="relative">
                    <div className="absolute -inset-10 bg-orange-500/20 blur-3xl rounded-full" />
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 mb-8 mx-auto shadow-2xl shadow-orange-500/40"
                    >
                        <ShoppingBag className="w-12 h-12 text-white" />
                    </motion.div>
                </div>

                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-6"
                >
                    Retail <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Evolution</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12"
                >
                    Revoluciona la experiencia de compra y optimiza cada eslabón de tu cadena de suministro con automatización inteligente.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute bottom-12"
                >
                    <ChevronDown className="w-8 h-8 text-orange-500" />
                </motion.div>
            </motion.div>

            {/* Scroll Space */}
            <div className="relative z-10">
                <div className="h-screen" /> {/* Hero Space */}
                <div className="h-screen" /> {/* Inventory Space */}
                <div className="h-screen" /> {/* Orders Space */}
                <div className="h-screen" /> {/* Logistics Space */}
                <div className="h-screen" /> {/* Payments Space */}
            </div>

            {/* Layers */}
            <InventoryLayer scrollYProgress={smoothProgress} />
            <OrdersLayer scrollYProgress={smoothProgress} />
            <LogisticsLayer scrollYProgress={smoothProgress} />
            <PaymentsLayer scrollYProgress={smoothProgress} />

        </div>
    );
}
