'use client';

import { ReactNode, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Navbar } from '../ui/Navbar';

interface ProductLayoutProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
    heroColor?: string; // hex or tailwind color class
}

export function ProductLayout({ children, title, subtitle, heroColor = 'rocket-red' }: ProductLayoutProps) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-background selection:bg-rocket-red selection:text-white">
            <Navbar />

            {/* Progress Bar */}
            <motion.div
                className={cn("fixed top-0 left-0 right-0 h-1 z-[60]", `bg-${heroColor}`)}
                style={{ scaleX, transformOrigin: "0%" }}
            />

            <main className="relative pt-20">
                {children}
            </main>

            {/* Standard Footer can go here */}
            <footer className="py-20 border-t border-border text-center text-gray-500 text-sm mt-20">
                <div className="container mx-auto px-6">
                    <p>© 2026 Rocketbot. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
