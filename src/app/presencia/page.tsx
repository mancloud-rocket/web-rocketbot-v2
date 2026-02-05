'use client';

import { Navbar } from '@/components/ui/Navbar';
import { PresenceScrollytelling } from '@/components/sections/PresenceScrollytelling';
import { ImpactMatrix } from '@/components/sections/ImpactMatrix';
import { HubsDirectory } from '@/components/sections/HubsDirectory';
import { motion } from 'framer-motion';

export default function PresencePage() {
    return (
        <motion.main
            className="bg-[#050505] min-h-screen selection:bg-rocket-red selection:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <Navbar forceDark={true} hideThemeToggle={true} noAnimation={false} />

            {/* Scrollytelling Section (400vh) */}
            <PresenceScrollytelling />

            {/* The rest of the content (Standard scroll) */}
            <div className="relative z-10 bg-[#050505]">
                <ImpactMatrix />
                <HubsDirectory />
            </div>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 text-center text-gray-500 text-sm bg-[#050505] relative z-20">
                <p>© 2026 Rocketbot. Global Scale Automation.</p>
            </footer>
        </motion.main>
    );
}
