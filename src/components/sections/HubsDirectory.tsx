'use client';

import { motion } from 'framer-motion';
import { MapPin, Globe, Building2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const regions = [
    {
        name: "LATAM Hub",
        hq: "Chile (Santiago)",
        offices: ["Brasil (São Paulo)"],
        presence: ["Argentina", "Uruguay", "Perú", "México", "Ecuador", "Venezuela", "Colombia", "Bolivia", "Paraguay", "Rep. Dominicana", "Guatemala"],
        icon: Globe,
        color: "from-rocket-red/20 to-rocket-red/5"
    },
    {
        name: "North America",
        hq: null,
        offices: ["Estados Unidos (Miami)"],
        presence: ["USA Network"],
        icon: Building2,
        color: "from-blue-500/20 to-blue-500/5"
    },
    {
        name: "EMEA & Asia",
        hq: null,
        offices: ["España (Madrid)"],
        presence: ["España", "Emiratos Árabes (UAE)", "India (IND)"],
        icon: Star,
        color: "from-neon-magenta/20 to-neon-magenta/5"
    }
];

export function HubsDirectory() {
    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
                        Nuestros <span className="text-rocket-red">Hubs</span>
                    </h2>
                    <p className="text-white/60 max-w-2xl text-lg font-medium">
                        Una red global diseñada para dar soporte local con tecnología de clase mundial.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {regions.map((region, idx) => (
                        <RegionCard key={region.name} region={region} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function RegionCard({ region, index }: { region: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-rocket-red/30 transition-colors"
        >
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[200%] -top-full group-hover:top-0 transition-all duration-[2000ms] ease-in-out pointer-events-none" />

            <div className={cn("inline-flex p-3 rounded-2xl bg-gradient-to-br mb-6", region.color)}>
                <region.icon className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-6">{region.name}</h3>

            <div className="space-y-6">
                {region.hq && (
                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-rocket-red uppercase tracking-widest">Global HQ</span>
                        <div className="flex items-center gap-2 text-white font-bold">
                            <MapPin className="w-4 h-4" />
                            {region.hq}
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Oficinas Locales</span>
                    <div className="flex flex-wrap gap-2">
                        {region.offices.map((office: string) => (
                            <span key={office} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/80">
                                {office}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Presencia Regional</span>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {region.presence.map((country: string) => (
                            <div key={country} className="flex items-center gap-2 text-white/60 text-xs">
                                <div className="w-1 h-1 rounded-full bg-rocket-red" />
                                {country}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Glow */}
            <div className={cn("absolute -right-20 -bottom-20 w-40 h-40 blur-[80px] opacity-20 transition-opacity group-hover:opacity-40", region.color.split(' ')[0])} />
        </motion.div>
    );
}
