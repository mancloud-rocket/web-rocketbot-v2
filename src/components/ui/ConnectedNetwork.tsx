'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export function ConnectedNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let mouseX = width / 2;
        let mouseY = height / 2;

        const particles: Particle[] = [];
        const particleCount = 60; // Less dense, more cleaner

        // Core brand colors
        const colors = {
            red: '#BC0017',
            dark: '#0B0E11',
            white: '#FFFFFF',
            gray: '#1A1F26'
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            isRed: boolean;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.isRed = Math.random() > 0.85; // 15% are core nodes (Red)
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off walls
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Interaction with mouse
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    this.x += dx * 0.005;
                    this.y += dy * 0.005;
                }
            }

            draw(isDark: boolean) {
                if (!ctx) return;

                if (this.isRed) {
                    ctx.fillStyle = colors.red;
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = colors.red;
                } else {
                    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(11,14,17,0.5)';
                    ctx.shadowBlur = 0;
                }

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0; // Reset
            }
        }

        // Init
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            if (!ctx) return;
            const isDark = theme === 'dark' || theme === 'system'; // simplify theme check

            // Clear with trail effect? No, let's keep it sharp for enterprise feel
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw(isDark);
            });

            // Connections
            particles.forEach((a, i) => {
                particles.slice(i + 1).forEach(b => {
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();

                        // Connection color logic
                        if (a.isRed && b.isRed) {
                            // Red to Red connection (Strong)
                            ctx.strokeStyle = `rgba(188, 0, 23, ${0.4 * (1 - dist / 150)})`;
                            ctx.lineWidth = 1.5;
                        } else if (a.isRed || b.isRed) {
                            // Node to Agent connection
                            ctx.strokeStyle = isDark
                                ? `rgba(255, 255, 255, ${0.1 * (1 - dist / 150)})`
                                : `rgba(11, 14, 17, ${0.1 * (1 - dist / 150)})`;
                            ctx.lineWidth = 0.8;
                        } else {
                            // Weak connection
                            ctx.strokeStyle = isDark
                                ? `rgba(255, 255, 255, ${0.05 * (1 - dist / 150)})`
                                : `rgba(11, 14, 17, ${0.05 * (1 - dist / 150)})`;
                            ctx.lineWidth = 0.5;
                        }

                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                });
            });

            // Mouse Connection
            particles.forEach(p => {
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(188, 0, 23, ${0.2 * (1 - dist / 200)})`;
                    ctx.moveTo(mouseX, mouseY);
                    ctx.lineTo(p.x, p.y);
                    ctx.stroke();
                }
            });

            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
    );
}
