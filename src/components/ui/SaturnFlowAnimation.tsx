'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

// Node definitions for the flow
const flowNodes = [
    { id: 'start', label: 'Start', icon: '🚀', color: '#BC0017', x: 50, y: 140 },
    { id: 'classifier', label: 'Classifier', icon: '🤖', color: '#00D4FF', x: 170, y: 140 },
    { id: 'extract', label: 'Extract Data', icon: '📊', color: '#10B981', x: 290, y: 80 },
    { id: 'process', label: 'AI Process', icon: '🧠', color: '#F59E0B', x: 410, y: 140 },
    { id: 'validate', label: 'Validate', icon: '✓', color: '#8B5CF6', x: 530, y: 140 },
    { id: 'output', label: 'Output', icon: '📤', color: '#10B981', x: 650, y: 140 },
];

// Connection paths between nodes
const connections = [
    { from: 'start', to: 'classifier' },
    { from: 'classifier', to: 'extract' },
    { from: 'extract', to: 'process' },
    { from: 'process', to: 'validate' },
    { from: 'validate', to: 'output' },
];

// Cursor component
function AnimatedCursor({ x, y, clicking }: { x: number; y: number; clicking: boolean }) {
    return (
        <motion.div
            className="absolute pointer-events-none z-50"
            animate={{ x: x - 4, y: y - 4 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <motion.path
                    d="M5 2L20 12L12 14L9 22L5 2Z"
                    fill="white"
                    stroke="#0F1115"
                    strokeWidth="1.5"
                    animate={{ scale: clicking ? 0.85 : 1 }}
                    transition={{ duration: 0.1 }}
                />
            </svg>
            {clicking && (
                <motion.div
                    className="absolute top-2 left-2 w-4 h-4 rounded-full bg-white/30"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                />
            )}
        </motion.div>
    );
}

// Node component
function FlowNode({
    node,
    visible,
    active,
    executing,
    delay
}: {
    node: typeof flowNodes[0];
    visible: boolean;
    active: boolean;
    executing: boolean;
    delay: number;
}) {
    return (
        <motion.div
            className="absolute flex flex-col items-center"
            style={{ left: node.x - 28, top: node.y - 28 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: visible ? 1 : 0,
                scale: visible ? 1 : 0
            }}
            transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Node circle with Moons */}
            <motion.div
                className="relative w-14 h-14 flex items-center justify-center text-xl"
                animate={{
                    scale: active ? 1.15 : executing ? [1, 1.1, 1] : 1,
                }}
                transition={{
                    scale: executing ? { repeat: Infinity, duration: 0.6 } : { duration: 0.2 }
                }}
            >
                {/* Left Moon */}
                <div
                    className="absolute -left-1 w-3 h-7 rounded-l-full opacity-80"
                    style={{ backgroundColor: node.color }}
                />
                {/* Right Moon */}
                <div
                    className="absolute -right-1 w-3 h-7 rounded-r-full opacity-80"
                    style={{ backgroundColor: node.color }}
                />

                {/* Main Circle */}
                <div
                    className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl z-10 bg-white dark:bg-gray-900 border-[3px]"
                    style={{
                        borderColor: node.color,
                        boxShadow: active || executing ? `0 0 20px ${node.color}40` : 'none'
                    }}
                >
                    <span className="relative z-10">{node.icon}</span>

                    {/* Subtle internal glow */}
                    <div className="absolute inset-0 rounded-full bg-current opacity-5" style={{ color: node.color }} />
                </div>

                {/* Pulse ring when executing */}
                {executing && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 z-0"
                        style={{ borderColor: node.color }}
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                )}
            </motion.div>

            {/* Label */}
            <motion.span
                className="mt-1 text-[10px] font-medium text-foreground/70 whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: visible ? 1 : 0 }}
                transition={{ delay: delay + 0.2 }}
            >
                {node.label}
            </motion.span>
        </motion.div>
    );
}

// Connection line component
function ConnectionLine({
    fromNode,
    toNode,
    visible,
    active,
    delay
}: {
    fromNode: typeof flowNodes[0];
    toNode: typeof flowNodes[0];
    visible: boolean;
    active: boolean;
    delay: number;
}) {
    // Calculate path
    const startX = fromNode.x + 28;
    const startY = fromNode.y;
    const endX = toNode.x - 28;
    const endY = toNode.y;

    // Bezier curve control points
    const midX = (startX + endX) / 2;
    const path = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;

    return (
        <motion.svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        >
            {/* Background line */}
            <motion.path
                d={path}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-border"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: visible ? 1 : 0 }}
                transition={{ delay, duration: 0.5, ease: "easeOut" }}
            />

            {/* Active glow line */}
            {active && (
                <motion.path
                    d={path}
                    stroke="#00D4FF"
                    strokeWidth="3"
                    fill="none"
                    style={{ filter: 'blur(2px)' }}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                />
            )}

            {/* Flowing particle */}
            {active && (
                <motion.circle
                    r="4"
                    fill="#00D4FF"
                    style={{ filter: 'blur(1px)' }}
                    animate={{
                        offsetDistance: ["0%", "100%"]
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            )}
        </motion.svg>
    );
}

// Play button component
function PlayButton({ visible, onClick, executing }: { visible: boolean; onClick: () => void; executing: boolean }) {
    return (
        <motion.button
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-rocket-red text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
            style={{ boxShadow: '0 0 20px rgba(188, 0, 23, 0.4)' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: visible ? 1 : 0,
                scale: visible ? 1 : 0,
                rotate: executing ? 360 : 0
            }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            {executing ? <RotateCcw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 ml-0.5" />}
        </motion.button>
    );
}

// Main component
export function SaturnFlowAnimation() {
    const [phase, setPhase] = useState<'building' | 'complete' | 'executing' | 'reset'>('building');
    const [visibleNodes, setVisibleNodes] = useState<string[]>([]);
    const [visibleConnections, setVisibleConnections] = useState<string[]>([]);
    const [cursorPos, setCursorPos] = useState({ x: 30, y: 200 });
    const [cursorClicking, setCursorClicking] = useState(false);
    const [executingNode, setExecutingNode] = useState<string | null>(null);
    const [activeConnection, setActiveConnection] = useState<string | null>(null);

    // Build animation sequence
    useEffect(() => {
        if (phase !== 'building') return;

        const buildSequence = async () => {
            // Start with cursor at rest
            await delay(500);

            for (let i = 0; i < flowNodes.length; i++) {
                const node = flowNodes[i];

                // Move cursor to node position
                setCursorPos({ x: node.x, y: node.y - 50 });
                await delay(400);

                // Click to place node
                setCursorClicking(true);
                await delay(100);
                setCursorClicking(false);

                // Show node
                setVisibleNodes(prev => [...prev, node.id]);
                await delay(300);

                // Draw connection from previous node
                if (i > 0) {
                    const conn = connections[i - 1];
                    setVisibleConnections(prev => [...prev, `${conn.from}-${conn.to}`]);
                    await delay(200);
                }
            }

            // Move cursor away
            setCursorPos({ x: 700, y: 200 });
            await delay(500);

            setPhase('complete');
        };

        buildSequence();
    }, [phase]);

    // Execute animation sequence
    useEffect(() => {
        if (phase !== 'executing') return;

        const executeSequence = async () => {
            for (let i = 0; i < flowNodes.length; i++) {
                setExecutingNode(flowNodes[i].id);

                if (i < connections.length) {
                    setActiveConnection(`${connections[i].from}-${connections[i].to}`);
                }

                await delay(600);
            }

            // Finish
            setExecutingNode(null);
            setActiveConnection(null);
            await delay(1000);

            // Reset for loop
            setPhase('reset');
        };

        executeSequence();
    }, [phase]);

    // Reset and restart
    useEffect(() => {
        if (phase !== 'reset') return;

        const resetSequence = async () => {
            setVisibleNodes([]);
            setVisibleConnections([]);
            setCursorPos({ x: 30, y: 200 });
            await delay(800);
            setPhase('building');
        };

        resetSequence();
    }, [phase]);

    const handlePlay = () => {
        if (phase === 'complete') {
            setPhase('executing');
        }
    };

    return (
        <div className="relative w-full h-[280px] bg-card dark:bg-[#0F1115] border border-border dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border dark:border-white/10">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground/50">
                    <span className="text-lg">🪐</span>
                    <span className="font-medium">Saturn Studio</span>
                </div>
            </div>

            {/* Flow canvas */}
            <div className="relative w-full h-[calc(100%-44px)]">
                {/* Grid background */}
                <div
                    className="absolute inset-0 opacity-20 dark:opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                />

                {/* Connection lines */}
                {connections.map((conn) => {
                    const fromNode = flowNodes.find(n => n.id === conn.from)!;
                    const toNode = flowNodes.find(n => n.id === conn.to)!;
                    const connKey = `${conn.from}-${conn.to}`;

                    return (
                        <ConnectionLine
                            key={connKey}
                            fromNode={fromNode}
                            toNode={toNode}
                            visible={visibleConnections.includes(connKey)}
                            active={activeConnection === connKey}
                            delay={0}
                        />
                    );
                })}

                {/* Nodes */}
                {flowNodes.map((node, index) => (
                    <FlowNode
                        key={node.id}
                        node={node}
                        visible={visibleNodes.includes(node.id)}
                        active={false}
                        executing={executingNode === node.id}
                        delay={0}
                    />
                ))}

                {/* Animated cursor */}
                <AnimatedCursor
                    x={cursorPos.x}
                    y={cursorPos.y}
                    clicking={cursorClicking}
                />

                {/* Play button */}
                <PlayButton
                    visible={phase === 'complete' || phase === 'executing'}
                    onClick={handlePlay}
                    executing={phase === 'executing'}
                />

                {/* "Building flow..." indicator */}
                {phase === 'building' && (
                    <motion.div
                        className="absolute bottom-4 left-4 text-xs text-foreground/50 font-mono"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        Diseñando flujo...
                    </motion.div>
                )}

                {/* Execution indicator */}
                {phase === 'executing' && (
                    <motion.div
                        className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-neon-cyan font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <motion.div
                            className="w-2 h-2 rounded-full bg-neon-cyan"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        />
                        Ejecutando...
                    </motion.div>
                )}
            </div>
        </div>
    );
}

// Utility delay function
function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
