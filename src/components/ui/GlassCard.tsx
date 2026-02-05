'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'premium' | 'neon-red' | 'neon-cyan' | 'neon-magenta';
    hover?: boolean;
    onClick?: () => void;
}

export function GlassCard({
    children,
    className,
    variant = 'default',
    hover = true,
    onClick
}: GlassCardProps) {
    const baseClasses = 'relative overflow-hidden transition-all duration-300 gpu-accelerated';

    const variantClasses = {
        default: 'glass-card',
        premium: 'glass-card-premium',
        'neon-red': 'glass-card neon-border-red',
        'neon-cyan': 'glass-card neon-border-cyan',
        'neon-magenta': 'glass-card neon-border-magenta'
    };

    return (
        <motion.div
            className={cn(baseClasses, variantClasses[variant], className)}
            whileHover={hover ? {
                scale: 1.01,
                y: -2
            } : undefined}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={onClick}
        >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}

interface GlassCardHeaderProps {
    children: ReactNode;
    className?: string;
    icon?: ReactNode;
    badge?: string;
}

export function GlassCardHeader({ children, className, icon, badge }: GlassCardHeaderProps) {
    return (
        <div className={cn('flex items-center gap-4 mb-4', className)}>
            {icon && (
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-rocket-red/10 dark:bg-rocket-red/20 flex items-center justify-center text-rocket-red">
                    {icon}
                </div>
            )}
            <div className="flex-1">
                {children}
            </div>
            {badge && (
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-rocket-red/10 text-rocket-red border border-rocket-red/20">
                    {badge}
                </span>
            )}
        </div>
    );
}

interface GlassCardTitleProps {
    children: ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export function GlassCardTitle({ children, className, size = 'md' }: GlassCardTitleProps) {
    const sizeClasses = {
        sm: 'text-lg',
        md: 'text-xl md:text-2xl',
        lg: 'text-2xl md:text-3xl'
    };

    return (
        <h3 className={cn(
            'font-display font-black leading-tight',
            sizeClasses[size],
            className
        )}>
            {children}
        </h3>
    );
}

interface GlassCardDescriptionProps {
    children: ReactNode;
    className?: string;
}

export function GlassCardDescription({ children, className }: GlassCardDescriptionProps) {
    return (
        <p className={cn(
            'text-sm md:text-base text-foreground/70 font-sans leading-relaxed mt-2',
            className
        )}>
            {children}
        </p>
    );
}
