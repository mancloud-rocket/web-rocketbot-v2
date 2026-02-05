'use client';

import { motion, Variants } from 'framer-motion';
import { GlassCard } from './GlassCard';
import {
    Check, Sparkles, Brain, MessageSquare, TrendingUp, Network,
    BarChart3, Clock, Users, GitBranch, Shield, Bot, Workflow,
    Server, UserCheck, Palette, Link as LucideLink, GraduationCap, Code, FileCheck, Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Icon mapping
const iconMap: Record<string, any> = {
    Check, Sparkles, Brain, MessageSquare, TrendingUp, Network,
    BarChart3, Clock, Users, GitBranch, Shield, Bot, Workflow,
    Server, UserCheck, Palette, Link: LucideLink, GraduationCap, Code, FileCheck, Layers
};

// Types
export interface PricingFeature {
    icon: string;
    text: string;
}

export interface PricingPlan {
    name: string;
    description: string;
    price: string;
    period: string;
    variant: 'default' | 'premium' | 'neon-red' | 'neon-cyan' | 'neon-magenta';
    badge?: { text: string; color: string } | null;
    glowColor: string;
    features: PricingFeature[];
}

interface PricingCardProps {
    plan: PricingPlan;
    className?: string;
}

// Animation constants
const standardEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const featureVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: standardEase }
    }
};

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 }
    }
};

export function PricingCard({ plan, className }: PricingCardProps) {
    return (
        <GlassCard
            variant={plan.variant}
            className={cn('relative p-8', className)}
            hover={true}
        >
            {/* Custom glow effect */}
            <div
                className="absolute inset-0 rounded-3xl opacity-50 pointer-events-none"
                style={{ boxShadow: `0 0 60px ${plan.glowColor}` }}
            />

            {/* Badge */}
            {plan.badge && (
                <div
                    className="absolute -top-4 right-8 px-4 py-1 text-white text-sm font-display font-bold rounded-full shadow-lg"
                    style={{ backgroundColor: plan.badge.color }}
                >
                    {plan.badge.text}
                </div>
            )}

            {/* Plan name */}
            <h3
                className="text-3xl md:text-4xl font-display font-extrabold mb-2"
                style={{ color: plan.badge?.color || 'white' }}
            >
                {plan.name}
            </h3>

            {/* Description */}
            <p className="text-base font-sans text-white/70 mb-6 leading-relaxed">
                {plan.description}
            </p>

            {/* Price */}
            <div className="mb-8">
                <span className="text-5xl md:text-6xl font-display font-black text-white">
                    {plan.price}
                </span>
                {plan.period && (
                    <span className="text-xl font-sans text-white/60 ml-2">
                        {plan.period}
                    </span>
                )}
            </div>

            {/* Features with stagger animation */}
            <motion.ul
                className="space-y-3 mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                {plan.features.map((feature, idx) => {
                    const Icon = iconMap[feature.icon] || Check;
                    return (
                        <motion.li
                            key={idx}
                            variants={featureVariants}
                            className="flex items-start gap-3 font-sans text-sm text-white/90"
                        >
                            <Icon
                                className="w-5 h-5 mt-0.5 flex-shrink-0"
                                style={{ color: plan.badge?.color || 'var(--neon-lime)' }}
                            />
                            <span>{feature.text}</span>
                        </motion.li>
                    );
                })}
            </motion.ul>
        </GlassCard>
    );
}
