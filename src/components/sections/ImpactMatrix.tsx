'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

function Counter({ value, label, suffix = "", duration = 2 }: { value: number, label: string, suffix?: string, duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const totalFrames = duration * 60;
            let frame = 0;

            const timer = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                // Ease out expo
                const currentCount = Math.round(end * (1 - Math.pow(2, -10 * progress)));
                setCount(currentCount);

                if (frame === totalFrames) {
                    setCount(end);
                    clearInterval(timer);
                }
            }, 1000 / 60);

            return () => clearInterval(timer);
        }
    }, [isInView, value, duration]);

    return (
        <div ref={ref} className="text-center relative group">
            <div className="absolute inset-0 bg-rocket-red/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <motion.div
                className="text-6xl md:text-8xl font-display font-black text-white mb-2 flex items-center justify-center gap-1"
                initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, type: 'spring' }}
            >
                <span>{count.toLocaleString()}</span>
                <span className="text-rocket-red">{suffix}</span>
            </motion.div>
            <motion.p
                className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                {label}
            </motion.p>
        </div>
    );
}

export function ImpactMatrix() {
    return (
        <section className="relative py-32 bg-[#050505]">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                    <Counter value={900} label="Clientes Globales" suffix="+" />
                    <Counter value={5000} label="Desarrolladores" suffix="+" />
                    <Counter value={150} label="Partners Estratégicos" suffix="+" />
                </div>
            </div>

            {/* Neuro-pulse background line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rocket-red/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rocket-red/30 to-transparent" />
        </section>
    );
}
