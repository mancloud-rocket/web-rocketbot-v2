'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import { GraduationCap, FileText, BarChart2, MessageSquare, CheckCircle, ChevronDown, BookOpen, CreditCard, PieChart, Users } from 'lucide-react';
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

function SideParticles({ count = 10, color = "text-blue-500", Icon }: { count?: number, color?: string, Icon?: any }) {
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

function AdmissionsLayer({ scrollYProgress }: { scrollYProgress: any }) {
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
                <div className="space-y-6 bg-background/50 backdrop-blur-md p-8 rounded-3xl border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-blue-500/20 text-blue-500 border border-blue-500/30">
                            <FileText className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight">
                            Matrículas y <span className="text-blue-500">Admisiones</span>
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Simplifica el proceso de inscripción. Desde la captura de datos hasta la validación de documentos, todo en un flujo digital sin fricción.
                    </p>
                    <ul className="space-y-3">
                        {["Formularios digitales inteligentes", "Validación automática de requisitos", "Notificaciones de estado en tiempo real"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-foreground/80">
                                <CheckCircle className="w-5 h-5 text-blue-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Visual */}
                <div className="relative h-[400px] w-full bg-black/40 rounded-3xl border border-blue-500/30 overflow-hidden flex items-center justify-center">
                    {/* Floating Forms Animation */}
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 100, opacity: 0, scale: 0.8 }}
                            animate={{ y: -100, opacity: [0, 1, 0], scale: 1 }}
                            transition={{ duration: 4, delay: i * 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bg-background p-4 rounded-xl border border-blue-500/30 shadow-lg w-48"
                            style={{ left: `${20 + i * 20}%` }}
                        >
                            <div className="h-2 w-1/3 bg-blue-500/50 rounded mb-2" />
                            <div className="space-y-2">
                                <div className="h-1 w-full bg-muted rounded" />
                                <div className="h-1 w-full bg-muted rounded" />
                                <div className="h-1 w-2/3 bg-muted rounded" />
                            </div>
                            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-green-500" />
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        className="relative z-10 p-6 bg-blue-500/10 backdrop-blur-xl rounded-full border border-blue-500 text-blue-500"
                    >
                        <GraduationCap className="w-16 h-16" />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function BillingLayer({ scrollYProgress }: { scrollYProgress: any }) {
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
                <div className="order-2 md:order-1 relative h-[400px] w-full bg-black/40 rounded-3xl border border-blue-500/30 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 opacity-20">
                        {[...Array(36)].map((_, i) => (
                            <div key={i} className="bg-blue-500/20 rounded-sm" />
                        ))}
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="flex gap-4">
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="p-4 bg-background rounded-xl border border-blue-500 shadow-lg"
                            >
                                <div className="text-xs text-muted-foreground">Tuition</div>
                                <div className="text-xl font-bold font-mono">$5,000</div>
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                                className="p-4 bg-background rounded-xl border border-blue-500 shadow-lg"
                            >
                                <div className="text-xs text-muted-foreground">Material</div>
                                <div className="text-xl font-bold font-mono">$350</div>
                            </motion.div>
                        </div>
                        <div className="w-1 h-12 bg-blue-500" />
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="px-6 py-2 bg-green-500 text-white font-bold rounded-full shadow-xl"
                        >
                            PAID
                        </motion.div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="order-1 md:order-2 space-y-6 bg-background/50 backdrop-blur-md p-8 rounded-3xl border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-blue-500/20 text-blue-500 border border-blue-500/30">
                            <CreditCard className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight">
                            Pagos y <span className="text-blue-500">Facturación</span>
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Gestiona cobros, becas y planes de pago con precisión. Integra pasarelas de pago y automatiza la emisión de facturas y recibos.
                    </p>
                    <ul className="space-y-3">
                        {["Gestión de planes de pago flexibles", "Conciliación automática de depósitos", "Alertas de morosidad"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-foreground/80">
                                <CheckCircle className="w-5 h-5 text-blue-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
}

function ReportingLayer({ scrollYProgress }: { scrollYProgress: any }) {
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
                <div className="space-y-6 bg-background/50 backdrop-blur-md p-8 rounded-3xl border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-blue-500/20 text-blue-500 border border-blue-500/30">
                            <PieChart className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight">
                            Reportes <span className="text-blue-500">Académicos</span>
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Convierte datos en decisiones. Visualiza el rendimiento estudiantil, la ocupación de aulas y métricas financieras en dashboards intuitivos.
                    </p>
                    <ul className="space-y-3">
                        {["Dashboards personalizables", "Reportes de asistencia en tiempo real", "Análisis de retención estudiantil"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-foreground/80">
                                <CheckCircle className="w-5 h-5 text-blue-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Visual */}
                <div className="relative h-[400px] w-full bg-black/40 rounded-3xl border border-blue-500/30 overflow-hidden flex items-center justify-center">
                    <div className="w-3/4 h-3/4 relative">
                        {/* Bar Chart Animation */}
                        <div className="absolute inset-0 flex items-end justify-between gap-2 p-4">
                            {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm opacity-80"
                                />
                            ))}
                        </div>
                        {/* Floating Line */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                            <motion.path
                                d="M 0 200 C 50 100 150 150 250 50"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="4"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 2, delay: 0.5 }}
                            />
                        </svg>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function RequestsLayer({ scrollYProgress }: { scrollYProgress: any }) {
    const opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.9, 1], [0, 1, 1, 1]); // Stays visible via transition logic, but let's conform to layout
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
                <div className="order-2 md:order-1 relative h-[400px] w-full bg-black/40 rounded-3xl border border-blue-500/30 overflow-hidden flex flex-col items-center justify-center gap-4">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 to-transparent" />

                    {[1, 2].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ x: i % 2 === 0 ? 50 : -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.3 }}
                            className={`p-4 rounded-2xl max-w-[80%] shadow-lg ${i % 2 === 0 ? 'self-end bg-blue-500 text-white mr-8' : 'self-start bg-background border border-border ml-8 text-foreground'}`}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <MessageSquare className="w-4 h-4" />
                                <span className="text-xs font-bold">{i % 2 === 0 ? 'Admin' : 'Student'}</span>
                            </div>
                            <p className="text-sm">
                                {i % 2 === 0 ? 'Certificado enviado a tu correo.' : 'Hola, necesito mi certificado de alumno regular.'}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Text Content */}
                <div className="order-1 md:order-2 space-y-6 bg-background/50 backdrop-blur-md p-8 rounded-3xl border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-blue-500/20 text-blue-500 border border-blue-500/30">
                            <Users className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight">
                            Atención al <span className="text-blue-500">Estudiante</span>
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Mejora la satisfacción estudiantil con atención rápida y eficiente. Automatiza respuestas a preguntas frecuentes y gestiona solicitudes complejas.
                    </p>
                    <ul className="space-y-3">
                        {["Chatbots de atención 24/7", "Generación automática de certificados", "Sistema de tickets integrado"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-foreground/80">
                                <CheckCircle className="w-5 h-5 text-blue-500" />
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

export default function EducationPage() {
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
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-700 origin-left z-50"
                style={{ scaleX: smoothProgress }}
            />

            {/* Background Particles */}
            <ClientOnly>
                <div className="fixed inset-0 z-0 opacity-40">
                    <SideParticles count={15} color="text-blue-400" Icon={BookOpen} />
                    <SideParticles count={10} color="text-teal-400" Icon={GraduationCap} />
                </div>
            </ClientOnly>

            {/* Hero Section */}
            <motion.div
                className="fixed inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4 text-center"
                style={{ opacity: heroOpacity, scale: heroScale }}
            >
                <div className="relative">
                    <div className="absolute -inset-10 bg-blue-500/20 blur-3xl rounded-full" />
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-400 mb-8 mx-auto shadow-2xl shadow-blue-500/40"
                    >
                        <GraduationCap className="w-12 h-12 text-white" />
                    </motion.div>
                </div>

                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-6"
                >
                    Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">Education</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12"
                >
                    Transforma la gestión educativa con una plataforma integral que conecta alumnos, docentes y administración.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute bottom-12"
                >
                    <ChevronDown className="w-8 h-8 text-blue-500" />
                </motion.div>
            </motion.div>

            {/* Scroll Space */}
            <div className="relative z-10">
                <div className="h-screen" /> {/* Hero Space */}
                <div className="h-screen" /> {/* Admissions Space */}
                <div className="h-screen" /> {/* Billing Space */}
                <div className="h-screen" /> {/* Reporting Space */}
                <div className="h-screen" /> {/* Requests Space */}
            </div>

            {/* Layers */}
            <AdmissionsLayer scrollYProgress={smoothProgress} />
            <BillingLayer scrollYProgress={smoothProgress} />
            <ReportingLayer scrollYProgress={smoothProgress} />
            <RequestsLayer scrollYProgress={smoothProgress} />

        </div>
    );
}
