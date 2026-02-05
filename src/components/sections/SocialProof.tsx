'use client';

import { motion } from 'framer-motion';

const clients = [
    "LATAM Airlines", "Zurich", "Toyota", "Entel", "Oxxo", "Telefonica", "Santander", "Falabella"
];

export function SocialProof() {
    return (
        <section className="py-12 bg-background border-b border-border transition-colors duration-300">
            <div className="container px-6 mx-auto">
                <p className="text-center text-sm font-medium text-gray-500 mb-8 uppercase tracking-widest">
                    Confían en Rocketbot
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Using text for logos to avoid external image dependencies for now */}
                    {clients.map((client) => (
                        <span key={client} className="text-xl md:text-2xl font-bold text-gray-500 hover:text-foreground transition-colors cursor-default">
                            {client}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
