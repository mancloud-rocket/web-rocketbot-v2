'use client';
import { useTheme } from 'next-themes';
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import { PricingCard, PricingPlan } from '@/components/ui/PricingCard';
import { Calendar, ArrowRight, Rocket } from 'lucide-react';
import { ClientOnly } from '@/components/ui/ClientOnly';

// ============================================
// CONFIGURATION
// ============================================
const TOTAL_IMAGES = 152; // Actual number of frames
const IMAGE_PATH = '/jpgseq/ezgif-frame-';
const standardEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ============================================
// PRICING PLANS DATA
// ============================================
const pricingPlans: PricingPlan[] = [
    {
        name: "Rocketbot Suite Free",
        description: "Versión limitada para exploración inicial y aprendizaje",
        price: "$0",
        period: "/siempre",
        variant: "default",
        badge: null,
        glowColor: "rgba(255, 255, 255, 0.1)",
        features: [
            { icon: "Code", text: "Licencia Community Developer" },
            { icon: "Network", text: "Orquestador Free (1 proceso)" },
            { icon: "UserCheck", text: "Rocketbot RPA Attended (ilimitado)" },
            { icon: "Workflow", text: "SaturnStudio Free (1 proceso)" },
            { icon: "Sparkles", text: "AIStudio Free (1000 tokens)" }
        ]
    },
    {
        name: "Rocketbot Suite Basic",
        description: "Ingeniería avanzada de procesos con despliegue de Python",
        price: "$299",
        period: "/mes",
        variant: "neon-red",
        badge: { text: "Más Popular", color: "var(--rocket-red)" },
        glowColor: "rgba(188, 0, 23, 0.3)",
        features: [
            { icon: "Code", text: "Licencia Developer Ilimitada" },
            { icon: "Network", text: "Orquestador Basic (5 procesos)" },
            { icon: "UserCheck", text: "Rocketbot RPA Attended (ilimitado)" },
            { icon: "Layers", text: "Rocketbot RPA Unattended (2 procesos paralelos)" },
            { icon: "Workflow", text: "SaturnStudio Basic (5 procesos)" },
            { icon: "Sparkles", text: "AIStudio Free (1000 tokens)" }
        ]
    },
    {
        name: "Rocketbot Suite Enterprise",
        description: "Operativa inteligente robustecida por capacidades de IA",
        price: "$699",
        period: "/mes",
        variant: "neon-cyan",
        badge: { text: "Enterprise", color: "var(--neon-cyan)" },
        glowColor: "rgba(0, 212, 255, 0.3)",
        features: [
            { icon: "Code", text: "Licencia Enterprise Ilimitada" },
            { icon: "Network", text: "Orquestador Enterprise (50 procesos)" },
            { icon: "UserCheck", text: "Rocketbot RPA Attended (ilimitado)" },
            { icon: "Layers", text: "Rocketbot RPA Unattended (4 paralelos)" },
            { icon: "Workflow", text: "SaturnStudio Enterprise (20 procesos)" },
            { icon: "Brain", text: "AIStudio Enterprise (80M tokens)" }
        ]
    },
    {
        name: "Rocketbot Suite Corporate",
        description: "Sistemas agénticos autónomos para orquestación global",
        price: "Consultar",
        period: "",
        variant: "neon-magenta",
        badge: { text: "Corporate", color: "var(--neon-magenta)" },
        glowColor: "rgba(255, 0, 245, 0.3)",
        features: [
            { icon: "Code", text: "Licencia Corporate Ilimitada" },
            { icon: "Network", text: "Orquestador Corporate (1000 procesos)" },
            { icon: "UserCheck", text: "Rocketbot RPA Attended (ilimitado)" },
            { icon: "Layers", text: "Rocketbot RPA Unattended (1000 paralelos)" },
            { icon: "Workflow", text: "SaturnStudio Corporate (1000 procesos)" },
            { icon: "Brain", text: "AIStudio Corporate (160M tokens)" }
        ]
    }
];

// ============================================
// IMAGE SEQUENCE BACKGROUND COMPONENT
// ============================================
function ImageSequenceBackground({ scrollProgress }: { scrollProgress: any }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    // Preload images
    useEffect(() => {
        const imageArray: HTMLImageElement[] = [];

        for (let i = 1; i <= TOTAL_IMAGES; i++) {
            const img = new Image();
            img.src = `${IMAGE_PATH}${String(i).padStart(3, '0')}.jpg`;
            imageArray.push(img);
        }
        setImages(imageArray);
    }, []);

    // Draw frame on scroll
    const drawFrame = useCallback((progress: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx || images.length === 0) return;

        const frameIndex = Math.min(
            Math.floor(progress * (TOTAL_IMAGES - 1)),
            TOTAL_IMAGES - 1
        );
        const img = images[frameIndex];

        if (img && img.complete) {
            // Set canvas size to match viewport
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Draw image with 'cover' behavior (fills viewport, may crop)
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
    }, [images]);

    // Listen to scroll progress
    useMotionValueEvent(scrollProgress, "change", (latest: number) => {
        drawFrame(latest);
    });

    // Initial draw and resize handler
    useEffect(() => {
        drawFrame(0);
        const handleResize = () => drawFrame(scrollProgress.get());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [drawFrame, scrollProgress]);

    return (
        <>
            {/* Canvas for image sequence */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 w-full h-full object-cover"
            />

            {/* Dark overlay for text legibility */}
            <div className="fixed inset-0 z-[1] bg-black/40" />
        </>
    );
}

// ============================================
// INTRO SECTION
// ============================================
function IntroSection({ scrollProgress }: { scrollProgress: any }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Small delay to ensure scroll values are initialized
        const timer = setTimeout(() => setIsMounted(true), 50);
        return () => clearTimeout(timer);
    }, []);

    // Scroll-linked transforms (only applied after mount)
    const scrollOpacity = useTransform(scrollProgress, [0, 0.08, 0.12], [1, 1, 0]);
    const scrollY = useTransform(scrollProgress, [0, 0.12], [0, -50]);
    const scrollScale = useTransform(scrollProgress, [0, 0.12], [1, 0.95]);

    return (
        <motion.div
            className="h-screen flex flex-col items-center justify-center px-4 text-center"
            style={isMounted
                ? { opacity: scrollOpacity, y: scrollY, scale: scrollScale }
                : { opacity: 1, y: 0, scale: 1 }
            }
        >
            {/* Title container for staggered animation */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: standardEase }}
                className="relative z-10"
            >
                <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black tracking-tighter text-white mb-12 leading-[0.9]">
                    Elige Tu <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-rocket-red to-[#FF4D6D] drop-shadow-[0_0_35px_rgba(188,0,23,0.4)]">Plan</span>
                </h1>

                <p className="text-xl md:text-2xl font-sans font-light tracking-wide text-white/60 max-w-3xl mx-auto leading-relaxed">
                    Arquitecturas de automatización diseñadas para escalar: desde <span className="text-white font-medium">procesos básicos</span> hasta ecosistemas de <span className="text-white font-medium">IA autónoma</span>.
                </p>
            </motion.div>

            {/* Elegant scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-12 flex flex-col items-center gap-4"
            >
                <div className="flex flex-col items-center">
                    <span className="text-white/20 text-[9px] font-sans uppercase tracking-[0.5em] mb-4">
                        Desplázate para Explorar
                    </span>
                    <div className="relative w-7 h-12 rounded-full border border-white/10 bg-white/5 flex items-start justify-center p-2">
                        <motion.div
                            animate={{
                                y: [0, 16, 0],
                                opacity: [0.3, 1, 0.3]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="w-1 h-3 rounded-full bg-rocket-red shadow-[0_0_8px_rgba(188,0,23,0.6)]"
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ============================================
// PLAN SECTION (Individual)
// ============================================
interface PlanSectionProps {
    plan: PricingPlan;
    index: number;
    totalPlans: number;
    scrollProgress: any;
}

function PlanSection({ plan, index, totalPlans, scrollProgress }: PlanSectionProps) {
    // Calculate scroll ranges for this plan
    // Intro takes 0-0.12, CTA takes 0.88-1, plans split the middle
    const planSpace = (0.88 - 0.12) / totalPlans;
    const start = 0.12 + (index * planSpace);
    const peak = start + (planSpace * 0.5);
    const end = start + planSpace;

    const opacity = useTransform(
        scrollProgress,
        [start, start + 0.05, peak, end - 0.05, end],
        [0, 1, 1, 1, 0]
    );

    const y = useTransform(
        scrollProgress,
        [start, start + 0.05, end - 0.05, end],
        [60, 0, 0, -60]
    );

    const scale = useTransform(
        scrollProgress,
        [start, start + 0.05, end - 0.05, end],
        [0.9, 1, 1, 0.9]
    );

    return (
        <div className="h-screen flex items-center justify-center px-4">
            <motion.div
                style={{ opacity, y, scale }}
                className="w-full max-w-md lg:max-w-lg"
            >
                <PricingCard plan={plan} />
            </motion.div>
        </div>
    );
}

// ============================================
// CTA SECTION
// ============================================
function CTASection({ scrollProgress }: { scrollProgress: any }) {
    const opacity = useTransform(scrollProgress, [0.85, 0.92, 1], [0, 1, 1]);
    const y = useTransform(scrollProgress, [0.85, 0.92], [50, 0]);
    const scale = useTransform(scrollProgress, [0.85, 0.92], [0.95, 1]);

    return (
        <div className="h-screen flex items-center justify-center px-4">
            <motion.div
                style={{ opacity, y, scale }}
                className="text-center max-w-2xl"
            >
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                    ¿No estás seguro cuál elegir?
                </h2>
                <p className="text-xl font-sans text-white/70 mb-10">
                    Agenda una demo personalizada y te ayudamos a encontrar el plan perfecto
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-rocket-red text-white font-display font-bold uppercase tracking-wide rounded-xl hover:bg-[#9A0013] transition-colors"
                    >
                        <Calendar className="w-5 h-5" />
                        Agendar Demo
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 border-2 border-white/30 text-white font-display font-bold uppercase tracking-wide rounded-xl hover:bg-white/10 transition-colors"
                    >
                        Descargar Full Pricing
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}

// ============================================
// MAIN COMPONENT
// ============================================
export function PricingScrollytelling() {
    const { setTheme, theme } = useTheme();

    useEffect(() => {
        // Force dark theme on mount
        const originalTheme = theme;
        setTheme('dark');
        // We don't necessarily want to restore it on unmount if the user is 
        // browsing the suite, but it's safer to leave it dark as it's the default.
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Calculate total height: Intro + 4 plans + CTA = 6 sections
    const totalSections = 2 + pricingPlans.length; // Intro + Plans + CTA

    // Auto-scroll state
    const [isAutoScrolling, setIsAutoScrolling] = useState(false);
    const autoScrollRef = useRef<number | null>(null);

    // Start continuous auto-scroll
    const startAutoScroll = useCallback(() => {
        setIsAutoScrolling(true);

        const scrollSpeed = 5; // pixels per frame (faster for 22fps content)
        let lastTime = performance.now();

        const animate = (currentTime: number) => {
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;

            // Calculate scroll amount based on time delta for consistent speed
            const scrollAmount = scrollSpeed * (deltaTime / 16.67); // Normalized to 60fps

            window.scrollBy(0, scrollAmount);

            // Check if we've reached the end
            if (window.scrollY < document.body.scrollHeight - window.innerHeight) {
                autoScrollRef.current = requestAnimationFrame(animate);
            } else {
                setIsAutoScrolling(false);
            }
        };

        autoScrollRef.current = requestAnimationFrame(animate);
    }, []);

    // Stop auto-scroll on manual interaction
    useEffect(() => {
        // Trigger a tiny scroll to initialize visibility/animations
        // as requested: "un scroll inmediatamente de una sola unidad"
        window.scrollTo(0, 51);

        const stopAutoScroll = () => {
            if (autoScrollRef.current) {
                cancelAnimationFrame(autoScrollRef.current);
                autoScrollRef.current = null;
                setIsAutoScrolling(false);
            }
        };

        // Listen for manual scroll, touch, or wheel
        window.addEventListener('wheel', stopAutoScroll, { passive: true });
        window.addEventListener('touchstart', stopAutoScroll, { passive: true });

        return () => {
            stopAutoScroll();
            window.removeEventListener('wheel', stopAutoScroll);
            window.removeEventListener('touchstart', stopAutoScroll);
        };
    }, []);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative bg-[#0A0A0F] force-dark-page"
            style={{ height: `${totalSections * 100}vh` }}
        >
            <div className="relative z-[60]">
                <Navbar noAnimation hideThemeToggle forceDark={true} />
            </div>

            {/* Progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rocket-red via-neon-magenta to-neon-cyan origin-left z-50"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Image sequence background */}
            <ClientOnly>
                <ImageSequenceBackground scrollProgress={scrollYProgress} />
            </ClientOnly>

            {/* Content */}
            <div className="relative z-10">
                <IntroSection scrollProgress={scrollYProgress} />

                {pricingPlans.map((plan, index) => (
                    <PlanSection
                        key={plan.name}
                        plan={plan}
                        index={index}
                        totalPlans={pricingPlans.length}
                        scrollProgress={scrollYProgress}
                    />
                ))}

                <CTASection scrollProgress={scrollYProgress} />
            </div>
        </motion.div>
    );
}
