'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Users, Zap, Star, Code, Rocket, Target, Lightbulb, ChevronDown, Globe } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { ConnectedNetwork } from '../ui/ConnectedNetwork';
import { GenesisEvolutionAnimation } from '../ui/GenesisEvolutionAnimation';

interface StoryScene {
  id: string;
  year?: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  icon: any;
  content: React.ReactNode;
  founders?: Array<{
    name: string;
    role: string;
    initials: string;
    gradient: string;
  }>;
}

const stories: StoryScene[] = [
  {
    id: 'intro',
    title: 'NUESTRA HISTORIA',
    subtitle: 'Un viaje de innovación. Una revolución RPA.',
    description: 'Baja para descubrir cómo Rocketbot transformó la industria de la automatización desde 2018.',
    color: 'rocket-red',
    icon: Rocket,
    content: null
  },
  {
    id: 'genesis',
    year: '2018',
    title: 'La Génesis',
    subtitle: 'Del Código Puro a la Automatización Visual',
    description: 'Todo comenzó con una visión audaz: hacer accesible la automatización a empresas de cualquier tamaño, sin requerir programadores especializados.',
    color: 'rocket-red',
    icon: Star,
    founders: [
      {
        name: 'Rafael Fuentes',
        role: 'Cofundador y Visionario Técnico',
        initials: 'RF',
        gradient: 'from-rocket-red to-neon-magenta'
      },
      {
        name: 'David Cuello',
        role: 'Cofundador y Estratega Empresarial',
        initials: 'DC',
        gradient: 'from-neon-cyan to-neon-lime'
      }
    ],
    content: (
      <div className="space-y-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard className="p-4 border-rocket-red/20 bg-rocket-red/5">
            <Code className="text-rocket-red w-5 h-5 mb-2" />
            <p className="text-sm text-gray-400">Transformamos lógica compleja en bloques estandarizados.</p>
          </GlassCard>
          <GlassCard className="p-4 border-neon-cyan/20 bg-neon-cyan/5">
            <Lightbulb className="text-neon-cyan w-5 h-5 mb-2" />
            <p className="text-sm text-gray-400">Democratizamos la industria tecnológica para todos.</p>
          </GlassCard>
        </div>
      </div>
    )
  },
  {
    id: 'expansion',
    year: '2018-2020',
    title: 'Explosión de Talento',
    subtitle: 'Crecimiento Exponencial',
    description: 'El equipo creció exponencialmente, atrayendo mentes brillantes de todas las latitudes. Rocketbot captó la atención de inversores y medios.',
    color: 'neon-cyan',
    icon: Users,
    content: (
      <div className="space-y-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { metric: '50+', label: 'Miembros Globales', icon: Users },
            { metric: 'Global', label: 'Alcance Mundial', icon: Globe },
            { metric: 'Breakthrough', label: 'Tecnologías Innovadoras', icon: Zap }
          ].map((item, index) => (
            <GlassCard key={index} className="p-6 text-center border-neon-cyan/20 bg-neon-cyan/5">
              <item.icon className="w-8 h-8 text-neon-cyan mx-auto mb-3" />
              <div className="text-2xl font-black text-neon-cyan">{item.metric}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</div>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="p-8 border-neon-cyan/20 bg-gradient-to-r from-neon-cyan/10 to-transparent">
          <h4 className="text-lg font-bold text-neon-cyan mb-3">Red Global de Innovación</h4>
          <p className="text-sm text-gray-400">Conectando talento de continentes enteros para construir el futuro de la automatización.</p>
        </GlassCard>
      </div>
    )
  },
  {
    id: 'suite',
    year: '2020-2021',
    title: 'La Suite Rocketbot',
    subtitle: 'Revolución de Herramientas',
    description: 'Studio, Orquestador y Xperience revolucionaron la industria. Más de 500 clientes adoptaron nuestras soluciones.',
    color: 'neon-magenta',
    icon: Zap,
    content: (
      <div className="space-y-6 mt-8">
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: 'Studio', desc: 'Entorno de desarrollo intuitivo' },
            { name: 'Orquestador', desc: 'Gestión centralizada de procesos' },
            { name: 'Xperience', desc: 'Interfaz revolucionaria' }
          ].map((item) => (
            <GlassCard key={item.name} className="p-4 text-center border-neon-magenta/20 bg-neon-magenta/5">
              <div className="font-bold text-sm uppercase mb-1">{item.name}</div>
              <div className="text-xs text-gray-400">{item.desc}</div>
            </GlassCard>
          ))}
        </div>
        <GlassCard variant="premium" className="p-8 border-neon-magenta/20 bg-neon-magenta/5 text-center">
          <div className="text-5xl font-black text-neon-magenta mb-2">500+</div>
          <div className="text-lg font-bold text-gray-300">Clientes Adoptaron</div>
          <div className="text-sm text-gray-400 mt-2">
            Empresas de todos los tamaños encontraron en Rocketbot la solución perfecta
          </div>
        </GlassCard>
      </div>
    )
  },
  {
    id: 'global',
    year: '2021',
    title: 'Conquista Global',
    subtitle: 'Europa & Estados Unidos',
    description: 'Desembarcamos en Europa y Estados Unidos, consolidando nuestra presencia internacional y llevando la democratización del RPA a nuevos continentes.',
    color: 'neon-lime',
    icon: Globe,
    content: (
      <div className="space-y-6 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { region: 'Latinoamérica', status: 'Consolidado', clients: '200+', color: 'rocket-red' },
            { region: 'Estados Unidos', status: 'Nuevo Mercado', clients: '150+', color: 'neon-cyan' },
            { region: 'Europa', status: 'Expansión', clients: '100+', color: 'neon-magenta' },
            { region: 'Global', status: 'Crecimiento', clients: '450+', color: 'neon-lime' }
          ].map((market) => (
            <GlassCard key={market.region} className="p-4 text-center border-white/10">
              <div className={`text-${market.color} font-bold text-sm mb-1`}>{market.region}</div>
              <div className="text-xs text-gray-400 mb-2">{market.status}</div>
              <div className="text-lg font-black text-foreground">{market.clients}</div>
              <div className="text-xs text-gray-500">Clientes</div>
            </GlassCard>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="p-6 border-neon-cyan/20 bg-neon-cyan/5">
            <h4 className="text-lg font-bold text-neon-cyan mb-3">Europa: Nuevo Horizonte</h4>
            <p className="text-sm text-gray-400">
              Las empresas europeas encontraron en Rocketbot la solución perfecta para modernizar sus procesos.
            </p>
          </GlassCard>
          <GlassCard className="p-6 border-neon-magenta/20 bg-neon-magenta/5">
            <h4 className="text-lg font-bold text-neon-magenta mb-3">Estados Unidos: Mercado Clave</h4>
            <p className="text-sm text-gray-400">
              El desembarco norteamericano representó un hito crucial en nuestra expansión global.
            </p>
          </GlassCard>
        </div>
      </div>
    )
  },
  {
    id: 'ai-era',
    year: '2021-Presente',
    title: 'Era de la IA',
    subtitle: 'IAStudio & SaturnStudio',
    description: 'Nuestra plataforma ahora potencia la automatización inteligente con aprendizaje automático y decisiones predictivas para más de 900 clientes.',
    color: 'neon-cyan',
    icon: Target,
    content: (
      <div className="space-y-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard variant="premium" className="p-8 border-neon-cyan/20 bg-neon-cyan/5">
            <h4 className="text-xl font-bold text-neon-cyan mb-3">SaturnStudio</h4>
            <p className="text-sm text-gray-400">
              Plataforma de desarrollo potenciada por IA con aprendizaje automático integrado.
            </p>
          </GlassCard>
          <GlassCard variant="premium" className="p-8 border-neon-magenta/20 bg-neon-magenta/5">
            <h4 className="text-xl font-bold text-neon-magenta mb-3">AIStudio</h4>
            <p className="text-sm text-gray-400">
              Estudio de IA que revoluciona la interacción con la automatización inteligente.
            </p>
          </GlassCard>
        </div>
        <GlassCard variant="premium" className="p-8 border-gradient-to-r from-rocket-red to-neon-cyan bg-gradient-to-r from-rocket-red/10 to-neon-cyan/10 text-center">
          <div className="text-6xl font-black bg-gradient-to-r from-rocket-red to-neon-cyan bg-clip-text text-transparent mb-3">
            900+
          </div>
          <div className="text-lg font-bold text-gray-300 mb-2">Clientes Globales con IA</div>
          <div className="text-sm text-gray-400">
            Marcas reconocidas confían en Rocketbot para su transformación digital
          </div>
        </GlassCard>
      </div>
    )
  }
];

export function HistoryTimeline() {
  const [currentScene, setCurrentScene] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen w-full bg-background flex items-center justify-center">
        <div className="text-rocket-red animate-pulse">Cargando historia...</div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Scenes Container - Each scene takes full viewport height */}
      {stories.map((story, index) => (
        <SceneSection
          key={story.id}
          story={story}
          index={index}
          isActive={currentScene === index}
          onBecomeActive={() => setCurrentScene(index)}
          total={stories.length}
        />
      ))}

      {/* Scene Navigation Dots */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        {stories.map((_, index) => (
          <SceneDot
            key={index}
            index={index}
            isActive={currentScene === index}
            onClick={() => {
              const element = document.getElementById(`scene-${index}`);
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SceneSection({
  story,
  index,
  isActive,
  onBecomeActive,
  total
}: {
  story: StoryScene;
  index: number;
  isActive: boolean;
  onBecomeActive: () => void;
  total: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    margin: "-50% 0px -50% 0px",
    amount: 0
  });

  // Update current scene when this section becomes visible
  useEffect(() => {
    if (isInView) {
      onBecomeActive();
    }
  }, [isInView, onBecomeActive]);

  return (
    <section
      id={`scene-${index}`}
      ref={sectionRef}
      className="h-screen w-full relative overflow-hidden bg-background"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background opacity-95" />
        <div className="absolute inset-0 opacity-10">
          <ConnectedNetwork />
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full flex items-center justify-center p-6">
        <div className="container max-w-7xl mx-auto">
          {story.id === 'intro' ? (
            <IntroScene story={story} isActive={isActive} />
          ) : (
            <StoryScene story={story} isActive={isActive} />
          )}
        </div>
      </div>

      {/* Scroll Indicator - Only show when scene is active and not the last one */}
      {isActive && index < total - 1 && (
        <ScrollIndicator />
      )}
    </section>
  );
}

function IntroScene({ story, isActive }: { story: StoryScene; isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="text-center relative"
    >
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-[12vw] md:text-8xl font-black tracking-tighter leading-none text-foreground uppercase mb-6"
      >
        {story.title.split(' ').map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
            className={i === 1 ? "text-rocket-red" : ""}
          >
            {word}
            {i === 0 && <br />}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-xl md:text-2xl font-light text-gray-500 uppercase tracking-[0.2em] max-w-2xl mx-auto mb-12"
      >
        {story.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        <GlassCard className="p-6 border-white/20 bg-white/5 dark:bg-white/5">
          <p className="text-sm text-gray-600 dark:text-gray-300 font-mono leading-relaxed">
            {story.description}
          </p>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

function StoryScene({ story, isActive }: { story: StoryScene; isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
    >
      {/* Content Side */}
      <div className="space-y-8 order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4"
        >
          {/* Year Badge */}
          {story.year && (
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-rocket-red/20 bg-rocket-red/5 text-rocket-red text-sm font-black uppercase tracking-widest shadow-lg shadow-rocket-red/10">
              {story.year}
            </div>
          )}

          {/* Title */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.8] text-foreground">
            {story.title}
          </h2>

          {/* Subtitle */}
          <h3 className={`text-xl md:text-2xl lg:text-3xl text-${story.color} opacity-90 font-light italic leading-tight`}>
            {story.subtitle}
          </h3>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-500 max-w-xl font-light leading-relaxed">
            {story.description}
          </p>
        </motion.div>

        {/* Founders Section - Only for genesis scene */}
        {story.founders && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-gray-300">Los Visionarios</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {story.founders.map((founder, idx) => (
                <GlassCard key={idx} variant="premium" className="p-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${founder.gradient} flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto`}>
                    {founder.initials}
                  </div>
                  <h5 className="font-bold text-center mb-2">{founder.name}</h5>
                  <p className="text-sm text-gray-400 text-center">{founder.role}</p>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {story.content}
        </motion.div>
      </div>

      {/* Visual Side */}
      <motion.div
        initial={{ opacity: 0, x: 30, scale: 0.9 }}
        animate={isActive ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 30, scale: 0.9 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex justify-center items-center order-1 lg:order-2"
      >
        {story.id === 'genesis' ? (
          <GenesisEvolutionAnimation />
        ) : (
          /* Animated Icon Container */
          <motion.div
            animate={isActive ? {
              rotateY: [0, 5, -5, 0],
              rotateX: [0, -3, 3, 0]
            } : {}}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className={`relative w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-[3rem] border-2 border-dashed border-${story.color}/30 bg-${story.color}/5 flex items-center justify-center backdrop-blur-sm`}
          >
            {/* Glow Effect */}
            <div className={`absolute inset-0 bg-${story.color}/10 rounded-[3rem] blur-2xl animate-pulse`} />

            {/* Main Icon */}
            <story.icon className={`w-32 h-32 md:w-40 md:h-40 text-${story.color} opacity-60 relative z-10`} />

            {/* Animated Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className={`absolute inset-8 rounded-full border border-${story.color}/20`}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className={`absolute inset-16 rounded-full border border-${story.color}/10`}
            />

            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 bg-${story.color}/40 rounded-full`}
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

function SceneDot({ index, isActive, onClick }: { index: number; isActive: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className={`w-3 h-3 rounded-full transition-all duration-300 ${isActive
        ? 'bg-rocket-red shadow-lg shadow-rocket-red/50 scale-125'
        : 'bg-white/20 hover:bg-white/40'
        }`}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    />
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2 text-gray-400"
      >
        <span className="text-xs uppercase tracking-widest font-mono">Continúa</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </motion.div>
  );
}
