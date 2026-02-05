'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import { ConnectedNetwork } from '../ui/ConnectedNetwork';
import { SaturnFlowAnimation } from '../ui/SaturnFlowAnimation';

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-20 bg-background transition-colors duration-300">

            {/* Innovative Animated Background */}
            <ConnectedNetwork />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none" />

            <div className="container relative z-10 px-6 mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    <div className="w-full lg:w-1/2 text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-7xl font-display font-black tracking-tight text-foreground mb-6 leading-[1.1]"
                        >
                            Agentic <br />
                            Enterprise <br />
                            <span className="text-rocket-red">
                                Automation.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-lg mb-10 font-light leading-relaxed"
                        >
                            Liberamos tiempo para lo que realmente importa.
                            <span className="block mt-2 text-base text-gray-600 dark:text-gray-500 font-mono">
                                Agentes digitales que piensan, deciden y ejecutan.
                            </span>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link
                                href="/start"
                                className="h-12 px-8 rounded-lg bg-rocket-red text-white font-bold flex items-center gap-2 hover:bg-red-700 transition-colors shadow-lg hover:shadow-rocket-red/30"
                            >
                                Comenzar Ahora
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <button className="h-12 px-6 rounded-lg border border-border text-foreground font-medium hover:bg-gray-100 dark:hover:bg-white/5 transition-colors flex items-center gap-3">
                                <Play className="w-4 h-4 fill-current" />
                                Ver Demo
                            </button>
                        </motion.div>

                        {/* Tech Stack / Trust badges could go here */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-12 flex items-center gap-6 text-gray-600 grayscale opacity-60"
                        >
                            {/* Placeholders for logos if needed */}
                        </motion.div>
                    </div>

                    {/* Right Content - Saturn Studio Flow Animation */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 1 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-rocket-red/20 rounded-3xl opacity-30 blur-3xl" />
                            <SaturnFlowAnimation />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
