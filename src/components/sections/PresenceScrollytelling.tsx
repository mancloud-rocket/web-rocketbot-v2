'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ClientOnly } from '@/components/ui/ClientOnly';

// ============================================
// CONFIGURATION
// ============================================
const TOTAL_IMAGES = 240;
const IMAGE_PATH = '/jpgseq2/ezgif-frame-';
const standardEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ============================================
// IMAGE SEQUENCE BACKGROUND COMPONENT
// ============================================
function ImageSequenceBackground({ scrollProgress }: { scrollProgress: any }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    useEffect(() => {
        const imageArray: HTMLImageElement[] = [];
        for (let i = 1; i <= TOTAL_IMAGES; i++) {
            const img = new Image();
            img.src = `${IMAGE_PATH}${String(i).padStart(3, '0')}.jpg`;
            imageArray.push(img);
        }
        setImages(imageArray);
    }, []);

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
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
    }, [images]);

    useMotionValueEvent(scrollProgress, "change", (latest: number) => {
        drawFrame(latest);
    });

    useEffect(() => {
        drawFrame(0);
        const handleResize = () => drawFrame(scrollProgress.get());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [drawFrame, scrollProgress]);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 w-full h-full object-cover"
            />
            <div className="fixed inset-0 z-[1] bg-black/50" />
        </>
    );
}

// ============================================
// PHASES DATA
// ============================================
const phases = [
    {
        title: "Poder Local",
        description: "Iniciamos en el corazón de Chile, expandiendo la automatización a toda la región.",
        start: 0,
        end: 0.33
    },
    {
        title: "Impacto Regional",
        description: "Liderando la transformación en AR, MX, CO y más de 12 países en Latam.",
        start: 0.33,
        end: 0.66
    },
    {
        title: "Escala Global",
        description: "Desde Estados Unidos hasta Emiratos Árabes e India. Tecnología sin fronteras.",
        start: 0.66,
        end: 1
    }
];

function PhaseContent({ phase, scrollProgress }: { phase: any, scrollProgress: any }) {
    const opacity = useTransform(
        scrollProgress,
        [phase.start, phase.start + 0.1, phase.end - 0.1, phase.end],
        [0, 1, 1, 0]
    );
    const y = useTransform(
        scrollProgress,
        [phase.start, phase.end],
        [40, -40]
    );

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-6 uppercase tracking-tighter">
                {phase.title}
            </h2>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-medium leading-relaxed">
                {phase.description}
            </p>
        </motion.div>
    );
}

// ============================================
// MAIN COMPONENT
// ============================================
export function PresenceScrollytelling() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative h-[400vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <ClientOnly>
                    <ImageSequenceBackground scrollProgress={scrollYProgress} />
                </ClientOnly>

                <div className="relative z-10 w-full h-full">
                    {phases.map((phase, i) => (
                        <PhaseContent key={i} phase={phase} scrollProgress={scrollYProgress} />
                    ))}
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                >
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Scroll para explorar</span>
                    <div className="w-px h-12 bg-gradient-to-b from-rocket-red to-transparent" />
                </motion.div>
            </div>
        </section>
    );
}
