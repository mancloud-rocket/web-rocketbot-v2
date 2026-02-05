'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSpreadsheet, Database, Send } from 'lucide-react';

// Sample Python code that appears to be typed - shorter and faster
const sampleCode = `def create_automation():
    robot = Robot("DataProcessor")
    robot.read_excel("data.xlsx")
    robot.filter_active()
    robot.send_report()

    return robot`;

const typedCode = sampleCode.split('');

// Performance: Memoize delay function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function GenesisEvolutionAnimation() {
  const [phase, setPhase] = useState<'coding' | 'transition' | 'dragdrop'>('coding');
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [activeBlock, setActiveBlock] = useState<number>(-1);
  const [cursorPosition, setCursorPosition] = useState({ x: 60, y: 80 });
  const [showSuccess, setShowSuccess] = useState(false);

  // Typing animation for the first phase - optimized with loop
  useEffect(() => {
    if (phase !== 'coding') return;

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < typedCode.length) {
        setTypedText(prev => prev + typedCode[index]);
        index++;
      } else {
        clearInterval(typeInterval);
        // Wait before transition
        setTimeout(() => setPhase('transition'), 1500);
      }
    }, 40);

    return () => clearInterval(typeInterval);
  }, [phase]);

  // Cursor blinking - faster for Python
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 600); // Medium blinking

    return () => clearInterval(blinkInterval);
  }, []);

  // Transition to drag-drop after showing transition text
  useEffect(() => {
    if (phase === 'transition') {
      setTimeout(() => setPhase('dragdrop'), 3000);
    }
  }, [phase]);

  // Enhanced drag-drop animation sequence - slower, more deliberate, with infinite loop
  useEffect(() => {
    if (phase !== 'dragdrop') return;

    let isMounted = true;

    const sequence = async () => {
      if (!isMounted) return;

      // Reset state
      setActiveBlock(-1);
      setShowSuccess(false);
      setCursorPosition({ x: 60, y: 60 });

      // First block appears - slower
      setActiveBlock(0);
      setCursorPosition({ x: 60, y: 60 });
      await delay(1500);

      if (!isMounted) return;

      // Move to second block (centered) - slower
      setActiveBlock(1);
      setCursorPosition({ x: 220, y: 60 });
      await delay(1800);

      if (!isMounted) return;

      // Move to third block - slower
      setActiveBlock(2);
      setCursorPosition({ x: 380, y: 60 });
      await delay(1800);

      if (!isMounted) return;

      // Simulate drag and connect - more deliberate
      setCursorPosition({ x: 140, y: 90 });
      await delay(1200);

      if (!isMounted) return;

      setCursorPosition({ x: 300, y: 90 });
      await delay(1200);

      if (!isMounted) return;

      // Final celebration - slower and more elegant
      setShowSuccess(true);
      setActiveBlock(3);
      setCursorPosition({ x: 220, y: 140 });
      await delay(3000); // Show success longer

      if (!isMounted) return;

      // Loop back to coding phase
      setPhase('coding');
      setTypedText('');
      setActiveBlock(-1);
      setShowSuccess(false);
    };

    const timeoutId = setTimeout(sequence, 1500);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [phase]);

  return (
    <div className="relative w-full h-[420px] glass-card rounded-2xl shadow-2xl overflow-hidden">
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-rocket-red/60" />
          <div className="w-3 h-3 rounded-full bg-neon-cyan/60" />
          <div className="w-3 h-3 rounded-full bg-neon-lime/60" />
        </div>
        <div className="flex items-center gap-2 text-xs text-foreground/70">
          <span className="text-lg">💻</span>
          <span className="font-medium">Rocketbot Studio</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative w-full h-[calc(100%-44px)] overflow-hidden">
        <AnimatePresence mode="wait">
          {phase === 'coding' && (
            <motion.div
              key="coding"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
            >
              {/* Code Editor Interface - Centered and compact with glassmorphism */}
              <motion.div
                className="w-80 h-52 glass-card rounded-xl overflow-hidden shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
              >
                {/* Editor Header */}
                <div className="flex items-center justify-between px-3 py-2 glass border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-rocket-red" />
                    <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                    <div className="w-2 h-2 rounded-full bg-neon-lime" />
                  </div>
                  <span className="text-xs text-foreground/80 font-medium">robot.py</span>
                </div>

                {/* Code Content - Python colors with glassmorphism */}
                <div className="p-3 font-mono text-xs text-neon-cyan leading-relaxed bg-background/30 backdrop-blur-sm">
                  <pre className="whitespace-pre-wrap text-foreground/90">
                    {typedText}
                    <motion.span
                      animate={{ opacity: cursorVisible ? 1 : 0 }}
                      className="inline-block w-1.5 h-3.5 bg-neon-cyan ml-0.5"
                    />
                  </pre>
                </div>

                {/* Typing indicator - Python focused */}
                <motion.div
                  className="absolute bottom-2 right-2 flex items-center gap-2 text-xs text-foreground/70"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                  Escribiendo Python...
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {phase === 'transition' && (
            <motion.div
              key="transition"
              className="absolute inset-0 flex items-center justify-center p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold text-rocket-red"
                >
                  Pasamos al futuro
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="text-6xl"
                >
                  ⚡
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-lg text-foreground/70"
                >
                  De líneas de código a bloques visuales
                </motion.div>
              </div>
            </motion.div>
          )}

          {phase === 'dragdrop' && (
            <motion.div
              key="dragdrop"
              className="absolute inset-0 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Enhanced Visual Drag & Drop Interface - Glassmorphism Design */}
              <div className="h-full glass-card rounded-2xl relative overflow-hidden shadow-2xl">
                {/* Subtle Grid Background */}
                <AnimatePresence>
                  {!showSuccess && (
                    <motion.div
                      initial={{ opacity: 0.05 }}
                      animate={{ opacity: 0.05 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 dark:opacity-10"
                      style={{
                        backgroundImage: `
                          radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)
                        `,
                        backgroundSize: '20px 20px'
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Elegant Toolbar - Glassmorphism Style */}
                <AnimatePresence>
                  {!showSuccess && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center gap-3 p-4 border-b border-border glass"
                    >
                  <motion.div
                    className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl transition-all cursor-pointer group"
                    whileHover={{ scale: 1.02, y: -1 }}
                    animate={activeBlock === 0 ? {
                      boxShadow: '0 0 20px rgba(188, 0, 23, 0.3)',
                      borderColor: 'rgba(188, 0, 23, 0.4)'
                    } : {}}
                  >
                    <FileSpreadsheet className="w-4 h-4 text-foreground/70 group-hover:text-rocket-red transition-colors" />
                    <span className="text-sm font-medium text-foreground/90">Leer Excel</span>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl transition-all cursor-pointer group"
                    whileHover={{ scale: 1.02, y: -1 }}
                    animate={activeBlock === 1 ? {
                      boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
                      borderColor: 'rgba(0, 212, 255, 0.4)'
                    } : {}}
                  >
                    <Database className="w-4 h-4 text-foreground/70 group-hover:text-neon-cyan transition-colors" />
                    <span className="text-sm font-medium text-foreground/90">Procesar Datos</span>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl transition-all cursor-pointer group"
                    whileHover={{ scale: 1.02, y: -1 }}
                    animate={activeBlock === 2 ? {
                      boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
                      borderColor: 'rgba(0, 255, 136, 0.4)'
                    } : {}}
                  >
                    <Send className="w-4 h-4 text-foreground/70 group-hover:text-neon-lime transition-colors" />
                    <span className="text-sm font-medium text-foreground/90">Enviar Email</span>
                  </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Enhanced Canvas Area */}
                <AnimatePresence>
                  {!showSuccess && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="relative flex-1 p-6 min-h-[200px]"
                    >
                      {/* Beautiful Workflow Nodes - Glassmorphism with neon accents */}
                      <motion.div
                    className="absolute top-12 left-12 w-36 h-20 glass-card rounded-2xl flex flex-col items-center justify-center"
                    initial={{ scale: 0, opacity: 0, rotateY: -90 }}
                    animate={activeBlock >= 0 ? {
                      scale: 1,
                      opacity: 1,
                      rotateY: 0,
                      boxShadow: activeBlock === 0 ? '0 0 30px rgba(188, 0, 23, 0.4)' : undefined
                    } : {
                      scale: 0,
                      opacity: 0,
                      rotateY: -90
                    }}
                    transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 150, damping: 20 }}
                  >
                    <FileSpreadsheet className="w-6 h-6 text-rocket-red mb-1" />
                    <div className="text-xs font-semibold text-foreground">Leer Excel</div>
                    <div className="text-[10px] text-foreground/60">Importar datos</div>
                  </motion.div>

                  <motion.div
                    className="absolute top-12 left-1/2 transform -translate-x-1/2 w-36 h-20 glass-card rounded-2xl flex flex-col items-center justify-center"
                    initial={{ scale: 0, opacity: 0, rotateY: -90 }}
                    animate={activeBlock >= 1 ? {
                      scale: 1,
                      opacity: 1,
                      rotateY: 0,
                      boxShadow: activeBlock === 1 ? '0 0 30px rgba(0, 212, 255, 0.4)' : undefined
                    } : {
                      scale: 0,
                      opacity: 0,
                      rotateY: -90
                    }}
                    transition={{ delay: 1.0, duration: 0.8, type: "spring", stiffness: 150, damping: 20 }}
                  >
                    <Database className="w-6 h-6 text-neon-cyan mb-1" />
                    <div className="text-xs font-semibold text-foreground">Procesar</div>
                    <div className="text-[10px] text-foreground/60">Filtrar & transformar</div>
                  </motion.div>

                  <motion.div
                    className="absolute top-12 right-12 w-36 h-20 glass-card rounded-2xl flex flex-col items-center justify-center"
                    initial={{ scale: 0, opacity: 0, rotateY: -90 }}
                    animate={activeBlock >= 2 ? {
                      scale: 1,
                      opacity: 1,
                      rotateY: 0,
                      boxShadow: activeBlock === 2 ? '0 0 30px rgba(0, 255, 136, 0.4)' : undefined
                    } : {
                      scale: 0,
                      opacity: 0,
                      rotateY: -90
                    }}
                    transition={{ delay: 1.5, duration: 0.8, type: "spring", stiffness: 150, damping: 20 }}
                  >
                    <Send className="w-6 h-6 text-neon-lime mb-1" />
                    <div className="text-xs font-semibold text-foreground">Enviar Email</div>
                    <div className="text-[10px] text-foreground/60">Notificar resultados</div>
                  </motion.div>

                  {/* Intelligent Cursor Animation - Optimized for performance */}
                  {activeBlock >= 0 && activeBlock < 3 && (
                    <motion.div
                      className="absolute z-10 pointer-events-none will-change-transform"
                      animate={cursorPosition}
                      transition={{ type: "spring", stiffness: 150, damping: 20 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 2, -2, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative"
                      >
                        <div className="w-5 h-5 text-rocket-red drop-shadow-lg">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 2L20 12L12 14L9 22L5 2Z" />
                          </svg>
                        </div>
                        <motion.div
                          className="absolute inset-0 w-5 h-5 bg-rocket-red/20 rounded-full blur-sm"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Floating Data Particles - Optimized for performance */}
                  {activeBlock >= 1 && activeBlock < 3 && (
                    <motion.div
                      className="absolute top-28 left-52 w-2 h-2 bg-neon-cyan rounded-full"
                      animate={{
                        x: [0, 15, 0],
                        y: [0, -8, 0],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}

                  {activeBlock >= 2 && activeBlock < 3 && (
                    <motion.div
                      className="absolute top-28 right-52 w-2 h-2 bg-neon-lime rounded-full"
                      animate={{
                        x: [0, -15, 0],
                        y: [0, -8, 0],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    />
                  )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Success Celebration - Glassmorphism with neon glow */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center glass-card-premium rounded-2xl z-50"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.div
                          className="text-center px-8"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <motion.div
                            animate={{ 
                              rotate: [0, 5, -5, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="text-5xl mb-4"
                          >
                            ✨
                          </motion.div>
                          <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="text-xl font-bold text-foreground mb-2"
                          >
                            ¡Automatización creada!
                          </motion.div>
                          <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="text-sm text-foreground/70"
                          >
                            Sin escribir una sola línea de código
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase Indicator - Glassmorphism style */}
        <div className="absolute bottom-3 left-3 text-xs text-foreground/70 font-mono glass-card px-2 py-1 rounded-md">
          {phase === 'coding' && 'Fase 1: Código Puro'}
          {phase === 'transition' && 'Transición...'}
          {phase === 'dragdrop' && 'Fase 2: Automatización Visual'}
        </div>
      </div>
    </div>
  );
}
