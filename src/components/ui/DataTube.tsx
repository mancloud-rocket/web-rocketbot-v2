'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DataTubeProps {
    direction: 'horizontal' | 'vertical';
    length?: string;
    thickness?: string;
    color?: 'cyan' | 'red' | 'magenta';
    delay?: number;
    className?: string;
}

export function DataTube({
    direction,
    length = '100%',
    thickness = '2px',
    color = 'cyan',
    delay = 0,
    className
}: DataTubeProps) {
    const colorMap = {
        cyan: {
            line: 'rgba(0, 212, 255, 0.3)',
            particle: 'rgba(0, 212, 255, 0.9)',
            glow: '0 0 10px rgba(0, 212, 255, 0.5)'
        },
        red: {
            line: 'rgba(188, 0, 23, 0.3)',
            particle: 'rgba(188, 0, 23, 0.9)',
            glow: '0 0 10px rgba(188, 0, 23, 0.5)'
        },
        magenta: {
            line: 'rgba(255, 0, 245, 0.3)',
            particle: 'rgba(255, 0, 245, 0.9)',
            glow: '0 0 10px rgba(255, 0, 245, 0.5)'
        }
    };

    const colors = colorMap[color];
    const isHorizontal = direction === 'horizontal';

    return (
        <div
            className={cn(
                'relative overflow-hidden gpu-accelerated',
                className
            )}
            style={{
                width: isHorizontal ? length : thickness,
                height: isHorizontal ? thickness : length,
                background: `linear-gradient(${isHorizontal ? '90deg' : '180deg'}, transparent 0%, ${colors.line} 50%, transparent 100%)`,
                borderRadius: '2px'
            }}
        >
            {/* Flowing particle */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: isHorizontal ? '20px' : '100%',
                    height: isHorizontal ? '100%' : '20px',
                    background: `linear-gradient(${isHorizontal ? '90deg' : '180deg'}, transparent, ${colors.particle}, transparent)`,
                    boxShadow: colors.glow,
                    [isHorizontal ? 'left' : 'top']: '-20px'
                }}
                animate={{
                    [isHorizontal ? 'x' : 'y']: isHorizontal
                        ? ['0%', '600%']
                        : ['0%', '600%']
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: delay
                }}
            />

            {/* Secondary particle with offset */}
            <motion.div
                className="absolute rounded-full opacity-60"
                style={{
                    width: isHorizontal ? '12px' : '100%',
                    height: isHorizontal ? '100%' : '12px',
                    background: `linear-gradient(${isHorizontal ? '90deg' : '180deg'}, transparent, ${colors.particle}, transparent)`,
                    boxShadow: colors.glow,
                    [isHorizontal ? 'left' : 'top']: '-12px'
                }}
                animate={{
                    [isHorizontal ? 'x' : 'y']: isHorizontal
                        ? ['0%', '800%']
                        : ['0%', '800%']
                }}
                transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: delay + 1
                }}
            />
        </div>
    );
}
