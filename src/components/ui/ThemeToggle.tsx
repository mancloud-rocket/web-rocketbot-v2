'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="relative p-2 rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: isDark ? 0 : 180,
                    scale: isDark ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="text-white"
                style={{ display: isDark ? 'block' : 'none' }}
            >
                <Moon className="w-5 h-5 text-foreground" />
            </motion.div>

            <motion.div
                initial={false}
                animate={{
                    rotate: isDark ? -180 : 0,
                    scale: isDark ? 0 : 1
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center text-foreground"
                style={{ display: isDark ? 'none' : 'flex' }}
            >
                <Sun className="w-5 h-5 text-foreground" />
            </motion.div>
        </button>
    );
}
