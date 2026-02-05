'use client';

import { useRef, ReactNode, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollyPhaseProps {
    scenes: {
        id: string;
        content: ReactNode; // Text/Box content
        visual: ReactNode;  // 3D/Image visual
        color?: string;
    }[];
}

export function ScrollyPhase({ scenes }: ScrollyPhaseProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeScene, setActiveScene] = useState(0);

    // Track scroll within this specific container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Update active scene based on scroll progress
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const step = 1 / scenes.length;
            const current = Math.min(
                Math.floor(latest / step),
                scenes.length - 1
            );
            setActiveScene(current);
        });
        return () => unsubscribe();
    }, [scrollYProgress, scenes.length]);

    return (
        <div ref={containerRef} className="relative w-full" style={{ height: `${scenes.length * 100}vh` }}>
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:flex-row">

                {/* Visual Side (Right on Desktop, Background on Mobile) */}
                <div className="absolute inset-0 md:relative md:w-1/2 h-full flex items-center justify-center p-6 md:p-12 order-1 md:order-2">
                    <div className="relative w-full h-full max-w-2xl max-h-[80vh] flex items-center justify-center">
                        {scenes.map((scene, index) => (
                            <motion.div
                                key={`visual-${scene.id}`}
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: activeScene === index ? 1 : 0,
                                    scale: activeScene === index ? 1 : 0.8,
                                    filter: activeScene === index ? 'blur(0px)' : 'blur(10px)'
                                }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <>{scene.visual}</>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Content Side (Left on Desktop, Overlay on Mobile) */}
                <div className="relative md:w-1/2 h-full flex items-center p-6 md:p-12 z-20 order-2 md:order-1 pointer-events-none">
                    <div className="max-w-xl mx-auto">
                        {scenes.map((scene, index) => (
                            <motion.div
                                key={`content-${scene.id}`}
                                className={cn(
                                    "absolute top-1/2 -translate-y-1/2 w-full",
                                    "p-6 md:p-0 backdrop-blur-sm md:backdrop-blur-none bg-background/50 md:bg-transparent rounded-xl md:rounded-none"
                                )}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{
                                    opacity: activeScene === index ? 1 : 0,
                                    x: activeScene === index ? 0 : -50,
                                    pointerEvents: activeScene === index ? 'auto' : 'none'
                                }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <>{scene.content}</>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
