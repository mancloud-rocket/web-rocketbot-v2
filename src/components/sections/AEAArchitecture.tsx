'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GlassCard, GlassCardTitle, GlassCardDescription } from '@/components/ui/GlassCard';
import { DataTube } from '@/components/ui/DataTube';

// === ICONS ===
const SupervisionIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20v-2a4 4 0 014-4h8a4 4 0 014 4v2" />
        <path d="M16 3l2 2-2 2" className="opacity-60" />
    </svg>
);

const HITLIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="2" width="14" height="10" rx="2" />
        <path d="M12 12v4" />
        <circle cx="12" cy="19" r="3" />
    </svg>
);

const OrchestrationIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        <path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" className="opacity-60" />
    </svg>
);

const AgentIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a4 4 0 014 4c0 1.5-.8 2.8-2 3.5v1.5h3a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2h3V9.5A4 4 0 018 6a4 4 0 014-4z" />
        <circle cx="9" cy="15" r="1" fill="currentColor" />
        <circle cx="15" cy="15" r="1" fill="currentColor" />
    </svg>
);

const AIIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
    </svg>
);

const RobotIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="8.5" cy="15.5" r="1.5" />
        <circle cx="15.5" cy="15.5" r="1.5" />
        <path d="M12 2v4M8 7h8" />
    </svg>
);

// === ANIMATION VARIANTS ===
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

// === LAYER CARD COMPONENT ===
interface LayerCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
    variant?: 'default' | 'premium' | 'neon-red' | 'neon-cyan';
    children?: React.ReactNode;
    className?: string;
    hoverExplanation?: string;
    tooltipSide?: 'left' | 'right';
    itemsCenter?: boolean;
    titleClassName?: string;
    iconClassName?: string;
    headerClassName?: string;
}

function LayerCard({ title, description, icon, badge, variant = 'default', children, className, hoverExplanation, tooltipSide = 'right', itemsCenter = false, titleClassName, iconClassName, headerClassName }: LayerCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <GlassCard variant={variant} className={`p-5 md:p-6 transition-all duration-300 ${isHovered ? 'ring-2 ring-rocket-red/30' : ''} ${className}`}>
                <div className={cn(
                    "flex flex-col h-full",
                    itemsCenter && "justify-center"
                )}>
                    <div className={cn(
                        "flex gap-4",
                        itemsCenter ? "items-center flex-row" : "items-start flex-col sm:flex-row mb-3",
                        headerClassName
                    )}>
                        <motion.div
                            className={cn(
                                "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300",
                                titleClassName?.includes('white')
                                    ? "bg-white/20 text-white"
                                    : "bg-gradient-to-br from-rocket-red/20 to-rocket-red/10 dark:from-rocket-red/30 dark:to-rocket-red/10 text-rocket-red",
                                iconClassName
                            )}
                            animate={{ scale: isHovered ? 1.1 : 1 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                        >
                            {icon}
                        </motion.div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <GlassCardTitle size="sm" className={cn("text-foreground", titleClassName)}>
                                    {title}
                                </GlassCardTitle>
                                {badge && (
                                    <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30">
                                        {badge}
                                    </span>
                                )}
                            </div>
                            <GlassCardDescription className={cn("text-xs", titleClassName?.includes('white') && "!text-white/80")}>{description}</GlassCardDescription>
                        </div>
                        {itemsCenter && children && (
                            <div className="flex items-center gap-2">
                                {children}
                            </div>
                        )}
                    </div>
                    {!itemsCenter && children && (
                        <div className="mt-4">
                            {children}
                        </div>
                    )}
                </div>
            </GlassCard>

            {/* Hover Explanation Tooltip - Side positioned on desktop */}
            <AnimatePresence>
                {isHovered && hoverExplanation && (
                    <motion.div
                        className={`absolute z-50 top-0 hidden lg:block w-72 ${tooltipSide === 'left'
                            ? '-left-6 -translate-x-full'
                            : '-right-6 translate-x-full'
                            }`}
                        initial={{ opacity: 0, x: tooltipSide === 'left' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: tooltipSide === 'left' ? 20 : -20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <div className="glass-card-premium p-5 rounded-2xl shadow-2xl border border-rocket-red/20">
                            <div className="flex items-start gap-3">
                                <div className="w-1 h-8 bg-rocket-red rounded-full flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-sm font-bold text-foreground mb-1">Concepto</h4>
                                    <p className="text-xs text-foreground/80 leading-relaxed font-medium text-balance">
                                        {hoverExplanation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Tooltip - Keep it below but more subtle */}
            <AnimatePresence>
                {isHovered && hoverExplanation && (
                    <motion.div
                        className="lg:hidden absolute z-50 left-0 right-0 -bottom-2 translate-y-full"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                    >
                        <div className="bg-card/95 backdrop-blur-md p-3 rounded-xl border border-border shadow-xl mx-2">
                            <p className="text-[10px] text-foreground/80 leading-tight">
                                {hoverExplanation}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// === PRODUCT TAG COMPONENT ===
function ProductTag({ name, emoji }: { name: string; emoji: string }) {
    return (
        <motion.div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 text-xs font-bold text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
        >
            <span>{emoji}</span>
            <span>{name}</span>
        </motion.div>
    );
}

// === CAPABILITY CHIP COMPONENT ===
function CapabilityChip({ name, icons }: { name: string; icons: React.ReactNode[] }) {
    return (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-white/50 dark:bg-white/5 border border-border/50 hover:border-rocket-red/30 transition-colors">
            <div className="flex items-center -space-x-1.5">
                {icons.map((icon, i) => (
                    <div
                        key={i}
                        className="w-6 h-6 rounded-md bg-white dark:bg-gray-800 border border-border flex items-center justify-center text-[10px] shadow-sm"
                        style={{ zIndex: icons.length - i }}
                    >
                        {icon}
                    </div>
                ))}
            </div>
            <span className="text-xs font-medium text-foreground/80">{name}</span>
        </div>
    );
}

// === SYSTEM CHIP COMPONENT ===
function SystemChip({ name, description }: { name: string; description: string }) {
    return (
        <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-white/50 dark:bg-white/5 border border-border/50">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-xs font-bold text-foreground">{name}</span>
            <span className="text-[10px] text-foreground/50">{description}</span>
        </div>
    );
}

// === APP ICONS ===
const ExcelIcon = () => <div className="w-4 h-4 bg-[#217346] rounded text-white text-[7px] font-bold flex items-center justify-center">X</div>;
const SAPIcon = () => <div className="w-4 h-4 bg-[#0066B3] rounded text-white text-[5px] font-bold flex items-center justify-center">SAP</div>;
const SheetsIcon = () => <div className="w-4 h-4 bg-[#0F9D58] rounded text-white text-[7px] font-bold flex items-center justify-center">S</div>;
const GmailIcon = () => <div className="w-4 h-4 bg-white rounded border text-[8px] flex items-center justify-center">✉️</div>;
const DriveIcon = () => <div className="w-4 h-4 bg-[#FBBC04] rounded text-[8px] flex items-center justify-center">📁</div>;
const SlackIcon = () => <div className="w-4 h-4 bg-[#4A154B] rounded text-white text-[7px] font-bold flex items-center justify-center">S</div>;
const TeamsIcon = () => <div className="w-4 h-4 bg-[#6264A7] rounded text-white text-[6px] font-bold flex items-center justify-center">T</div>;
const PDFIcon = () => <div className="w-4 h-4 bg-[#FF0000] rounded text-white text-[6px] font-bold flex items-center justify-center">PDF</div>;
const DocIcon = () => <div className="w-4 h-4 bg-[#4285F4] rounded text-white text-[6px] font-bold flex items-center justify-center">D</div>;

// === MAIN COMPONENT ===
export function AEAArchitecture() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="py-16 md:py-24 bg-background relative overflow-hidden" id="arquitectura">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-rocket-red/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[120px]" />
            </div>

            <div className="container px-4 md:px-6 mx-auto relative z-10" ref={containerRef}>
                {/* Section Header */}
                <motion.div
                    className="text-center mb-10 md:mb-14"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rocket-red/10 border border-rocket-red/20 mb-4"
                        variants={itemVariants}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-rocket-red animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rocket-red">
                            Arquitectura Empresarial 2.0
                        </span>
                    </motion.div>

                    <motion.h2
                        className="text-3xl md:text-4xl lg:text-5xl font-display font-black mb-4 leading-tight"
                        variants={itemVariants}
                    >
                        AEA <span className="text-rocket-red">Blueprint</span>
                    </motion.h2>

                    <motion.p
                        className="text-base md:text-lg max-w-xl mx-auto text-foreground/70"
                        variants={itemVariants}
                    >
                        Sin importar qué sistema debas involucrar en el proceso, Rocketbot lo automatiza
                    </motion.p>
                </motion.div>

                {/* Architecture Diagram - 70% Scale */}
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {/* === ROW 1: Human Layers === */}
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-1" variants={itemVariants}>
                        <LayerCard
                            title="Capa de Supervisión 👁️"
                            description="Control humano end-to-end con monitoreo inteligente"
                            icon={<SupervisionIcon />}
                            variant="default"
                            hoverExplanation="Dashboards ejecutivos en tiempo real, alertas inteligentes, audit trails complejos y control total sobre todas las automatizaciones. Los supervisores pueden pausar, ajustar o escalar procesos en cualquier momento."
                            tooltipSide="left"
                            className="flex-1 h-full"
                        />
                        <LayerCard
                            title="HITL 🤝"
                            description="Humano en el ciclo con validación inteligente"
                            icon={<HITLIcon />}
                            variant="default"
                            badge="Human in the Loop"
                            hoverExplanation="Puntos de validación estratégicos donde humanos aprueban decisiones críticas. El agente solicita aprobación antes de ejecutar acciones de alto impacto, manteniendo el control sin sacrificar velocidad."
                            tooltipSide="right"
                            className="flex-1 h-full"
                        />
                    </motion.div>

                    {/* === DATA TUBES: Row 1 → Row 2 === */}
                    {mounted && (
                        <motion.div
                            className="flex justify-center gap-[40%] py-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <DataTube direction="vertical" length="30px" color="cyan" delay={0} />
                            <DataTube direction="vertical" length="30px" color="cyan" delay={0.5} />
                        </motion.div>
                    )}

                    {/* === ROW 2: Orchestration Layer === */}
                    <motion.div className="mb-1" variants={itemVariants}>
                        <div className="relative group">
                            <LayerCard
                                title="Capa de Orquestación ⚡"
                                description="Centro nervioso de la automatización"
                                icon={<OrchestrationIcon />}
                                variant="neon-red"
                                className="!bg-gradient-to-r !from-[#BC0017] !to-[#a00014] !border-none !py-4 md:!py-3"
                                titleClassName="!text-white"
                                iconClassName="!text-white"
                                itemsCenter={true}
                                hoverExplanation="El motor que coordina la ejecución de todos los procesos. Gestiona el flujo de datos entre capas, controla el estado de las ejecuciones y garantiza que cada tarea se realice en el orden y momento preciso."
                                tooltipSide="right"
                            >
                                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: '0 0 40px rgba(188, 0, 23, 0.4)' }} />
                                <ProductTag name="Orchestrator" emoji="⚡" />
                                <ProductTag name="Xperience" emoji="✦" />
                            </LayerCard>
                        </div>
                    </motion.div>

                    {/* === DATA TUBES: Row 2 → Row 3 === */}
                    {mounted && (
                        <motion.div
                            className="flex justify-between px-[12%] py-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <DataTube direction="vertical" length="30px" color="red" delay={0.2} />
                            <DataTube direction="vertical" length="30px" color="red" delay={0.7} />
                        </motion.div>
                    )}

                    {/* === ROW 3: Agentic & Intelligent/Robotic Layers === */}
                    <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-1" variants={itemVariants}>
                        {/* Agentic Layer - 2 cols */}
                        <div className="lg:col-span-2">
                            <LayerCard
                                title="Capa Agéntica 🧠"
                                description="Agentes autónomos especializados por roles empresariales"
                                icon={<AgentIcon />}
                                variant="premium"
                                className="h-full !py-10"
                                hoverExplanation="Agentes cognitivos especializados que entienden contexto, toman decisiones y ejecutan tareas complejas. Cada agente tiene un rol específico y habilidades para interactuar con múltiples sistemas empresariales."
                                tooltipSide="left"
                            >
                                {/* Saturn Studio Badge */}
                                <motion.div
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold mb-4 shadow-lg shadow-orange-500/30"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <span className="text-sm">🪐</span>
                                    <span>Saturn Studio</span>
                                </motion.div>

                                {/* 4 Role Cards Grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                    {/* Financial */}
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-rocket-red">
                                            Financial
                                        </div>
                                        <CapabilityChip name="Excel + SAP" icons={[<ExcelIcon key="e" />, <SAPIcon key="s" />]} />
                                        <CapabilityChip name="Sheets" icons={[<SheetsIcon key="sh" />]} />
                                        <CapabilityChip name="Drive" icons={[<DriveIcon key="d" />]} />
                                    </div>
                                    {/* Legal */}
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-rocket-red">
                                            Legal
                                        </div>
                                        <CapabilityChip name="PDF Docs" icons={[<PDFIcon key="p" />]} />
                                        <CapabilityChip name="Gmail" icons={[<GmailIcon key="g" />]} />
                                        <CapabilityChip name="Drive" icons={[<DriveIcon key="d2" />]} />
                                    </div>
                                    {/* Logistics */}
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-rocket-red">
                                            Logistics
                                        </div>
                                        <CapabilityChip name="SAP" icons={[<SAPIcon key="s2" />]} />
                                        <CapabilityChip name="Excel" icons={[<ExcelIcon key="e2" />]} />
                                        <CapabilityChip name="Slack" icons={[<SlackIcon key="sl" />]} />
                                    </div>
                                    {/* Operations */}
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-rocket-red">
                                            Operations
                                        </div>
                                        <CapabilityChip name="Teams" icons={[<TeamsIcon key="t" />]} />
                                        <CapabilityChip name="Docs" icons={[<DocIcon key="doc" />]} />
                                        <CapabilityChip name="Gmail" icons={[<GmailIcon key="g2" />]} />
                                    </div>
                                </div>
                            </LayerCard>
                        </div>

                        {/* Intelligent & Robotic Layers - 1 col */}
                        {/* Intelligent & Robotic Column */}
                        <div className="flex flex-col gap-4 h-full">
                            {/* Intelligent - Adaptive theming */}
                            <LayerCard
                                title="Capa Inteligente ✨"
                                description="Procesamiento cognitivo y LLMs"
                                icon={<AIIcon />}
                                variant="default"
                                className="!p-4 flex-1 h-full"
                                headerClassName="!mb-1"
                                hoverExplanation="Integración nativa con IA generativa y modelos de lenguaje de última generación. Permite extraer datos de documentos no estructurados, analizar sentimientos y tomar decisiones basadas en contexto."
                                tooltipSide="right"
                            >
                                <div className="flex justify-center mt-1">
                                    <motion.div
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-[10px] font-bold text-neon-cyan"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <span className="text-sm">🤖</span>
                                        <span>AiStudio</span>
                                    </motion.div>
                                </div>
                            </LayerCard>

                            {/* Robotic */}
                            <LayerCard
                                title="Capa Robótica 🦾"
                                description="Backend e infraestructura legacy"
                                icon={<RobotIcon />}
                                variant="default"
                                className="!p-4 flex-1 h-full"
                                headerClassName="!mb-1"
                                hoverExplanation="La base técnica que interactúa con sistemas de escritorio, terminales y aplicaciones web. Ejecución robusta de scripts y macros en cualquier entorno operativo con total confiabilidad."
                                tooltipSide="right"
                            >
                                <div className="space-y-1 w-full mt-1">
                                    <SystemChip name="AS/400" description="Legacy" />
                                    <SystemChip name="RDP" description="Remoto" />
                                    <SystemChip name="Unix" description="MAC/Linux" />
                                </div>
                            </LayerCard>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom Tagline */}
                <motion.p
                    className="text-center text-[10px] mt-8 text-foreground/40 font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                >
                    Rocketbot Enterprise Architecture Framework
                </motion.p>
            </div>
        </section>
    );
}
