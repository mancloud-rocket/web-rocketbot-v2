'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import { Rocket, Menu, X, ChevronDown } from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { SolutionsMenu } from './SolutionsMenu';

interface NavbarProps {
    noAnimation?: boolean;
    hideThemeToggle?: boolean;
    forceDark?: boolean;
}

export function Navbar({ noAnimation = false, hideThemeToggle = false, forceDark = false }: NavbarProps) {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [isSolutionsMenuOpen, setIsSolutionsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = forceDark || (mounted && resolvedTheme === 'dark');
    const logoSrc = isDark ? '/logo-white.png' : '/logo-redblack.png';

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 transition-all duration-300",
                forceDark && "force-dark-page",
                isScrolled ? "py-3" : "py-5"
            )}
            initial={noAnimation ? false : { y: -100 }}
            animate={noAnimation ? false : { y: 0 }}
            transition={noAnimation ? { duration: 0 } : { duration: 0.5 }}
            onMouseLeave={() => {
                setIsMegaMenuOpen(false);
                setIsSolutionsMenuOpen(false);
            }}
        >
            {/* 
                BACKGROUND DECOUPLING:
                We move the background, blur and shadow to a sibling div instead of the parent <nav>.
                This fixes the "nested backdrop-blur" bug where the MegaMenu's blur would fail
                if the parent <nav> also had a backdrop-blur.
            */}
            <div className={cn(
                "absolute inset-0 -z-10 transition-all duration-300",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md shadow-lg opacity-100"
                    : "bg-transparent opacity-0"
            )} />

            <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative z-[60]">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-48 h-10 md:w-56 md:h-12 transition-transform duration-300 group-hover:scale-105">
                        {mounted ? (
                            <Image
                                src={logoSrc}
                                alt="Rocketbot Logo"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full" />
                        )}
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/nuestra-historia"
                        className="text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                    >
                        Historia
                    </Link>

                    <Link
                        href="/presencia"
                        className="text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                    >
                        Presencia
                    </Link>

                    {/* Plataforma Dropdown Trigger */}
                    <div
                        className="relative h-full flex items-center group"
                        onMouseEnter={() => {
                            setIsMegaMenuOpen(true);
                            setIsSolutionsMenuOpen(false);
                        }}
                    // Menu controls its own closing via mouseLeave, but we also close if we leave the trigger area without entering menu
                    >
                        <button
                            className={cn(
                                "flex items-center gap-1 text-sm font-medium transition-colors",
                                isMegaMenuOpen ? "text-rocket-red" : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
                            )}
                        >
                            Plataforma
                            <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isMegaMenuOpen && "rotate-180")} />
                        </button>
                    </div>

                    {/* Soluciones Dropdown Trigger */}
                    <div
                        className="relative h-full flex items-center group"
                        onMouseEnter={() => {
                            setIsSolutionsMenuOpen(true);
                            setIsMegaMenuOpen(false);
                        }}
                    >
                        <button
                            className={cn(
                                "flex items-center gap-1 text-sm font-medium transition-colors",
                                isSolutionsMenuOpen ? "text-rocket-red" : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
                            )}
                        >
                            Soluciones
                            <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isSolutionsMenuOpen && "rotate-180")} />
                        </button>
                    </div>

                    {['Desarrolladores', 'Precios'].map((item) => (
                        <Link
                            key={item}
                            href={item === 'Precios' ? '/pricing' : `#${item.toLowerCase()}`}
                            className="text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Mega Menu Overlay */}
                <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
                <SolutionsMenu isOpen={isSolutionsMenuOpen} onClose={() => setIsSolutionsMenuOpen(false)} />

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-4">
                    {!hideThemeToggle && <ThemeToggle />}
                    <Link
                        href="/login"
                        className="text-sm font-medium text-foreground hover:text-rocket-red transition-colors"
                    >
                        Iniciar Sesión
                    </Link>
                    <Link
                        href="/start"
                        className="group relative px-6 py-2.5 overflow-hidden rounded-full bg-rocket-red text-white font-bold text-sm shadow-lg hover:shadow-rocket-red/50 transition-all duration-300 transform hover:scale-105"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Comenzar
                            <Rocket className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rocket-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    {!hideThemeToggle && <ThemeToggle />}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="relative z-50 p-2 text-foreground"
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden flex flex-col pt-24 px-6 overflow-y-auto"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Plataforma</h3>
                                <Link onClick={() => setIsMobileMenuOpen(false)} href="/plataforma/suite" className="block text-lg font-semibold text-foreground">Suite</Link>
                                <Link onClick={() => setIsMobileMenuOpen(false)} href="/plataforma/saturn-studio" className="block text-lg font-semibold text-foreground">Saturn Studio</Link>
                                <Link onClick={() => setIsMobileMenuOpen(false)} href="/plataforma/aistudio" className="block text-lg font-semibold text-foreground">AI Studio</Link>
                                <Link onClick={() => setIsMobileMenuOpen(false)} href="/plataforma/rpa-studio" className="block text-lg font-semibold text-foreground">RPA Studio</Link>
                                <Link onClick={() => setIsMobileMenuOpen(false)} href="/plataforma/orchestrator" className="block text-lg font-semibold text-foreground">Orquestador</Link>
                                <Link onClick={() => setIsMobileMenuOpen(false)} href="/plataforma/xperience" className="block text-lg font-semibold text-foreground">Xperience</Link>
                            </div>

                            <div className="h-px bg-border" />

                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Soluciones</h3>
                                <Link onClick={() => setIsMobileMenuOpen(false)} href="/soluciones/retail" className="block text-lg font-semibold text-foreground">Retail</Link>
                                <Link onClick={() => setIsMobileMenuOpen(false)} href="/soluciones/educacion" className="block text-lg font-semibold text-foreground">Educación</Link>
                                <Link onClick={() => setIsMobileMenuOpen(false)} href="/soluciones/rrhh" className="block text-lg font-semibold text-foreground">RRHH</Link>
                                <Link onClick={() => setIsMobileMenuOpen(false)} href="/soluciones/finanzas" className="block text-lg font-semibold text-foreground">Finanzas</Link>
                            </div>

                            <div className="h-px bg-border" />

                            <Link
                                href="/nuestra-historia"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-lg font-medium text-foreground"
                            >
                                Nuestra Historia
                            </Link>

                            <Link
                                href="/presencia"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-lg font-medium text-foreground"
                            >
                                Presencia Global
                            </Link>

                            <Link
                                href="/pricing"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-lg font-medium text-foreground"
                            >
                                Precios
                            </Link>

                            <div className="pt-6 space-y-4">
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block w-full py-3 text-center text-foreground font-medium border border-border rounded-xl"
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    href="/start"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block w-full py-3 text-center bg-rocket-red text-white font-bold rounded-xl shadow-lg"
                                >
                                    Comenzar Gratis
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
