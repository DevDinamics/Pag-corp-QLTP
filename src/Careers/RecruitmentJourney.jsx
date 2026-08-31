import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Search, MessagesSquare, Rocket } from 'lucide-react';
import bgImage from '../assets/Carrers-image/image-1-carrers.webp';

const journeySteps = [
  {
    id: 1,
    icon: Search,
    title: "Descubre tu Oportunidad",
    desc: "Encuentra el rol que haga match con tu experiencia. Nuestro proceso descarta los filtros robóticos y valora tu trayectoria real."
  },
  {
    id: 2,
    icon: MessagesSquare,
    title: "Conecta con Expertos",
    desc: "Cero preguntas de pizarrón sin sentido. Tendrás charlas técnicas y de cultura directamente con los líderes con los que trabajarás."
  },
  {
    id: 3,
    icon: Rocket,
    title: "Bienvenido a Qualtop",
    desc: "Recibe tu oferta, conoce a tu nuevo equipo y prepárate para generar impacto sostenible en la industria desde el día uno."
  }
];

// Componente de partícula flotante
const FloatingOrb = ({ style, delay = 0 }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={style}
    animate={{
      y: [0, -30, 0],
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.15, 1],
    }}
    transition={{
      duration: 6 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

// Tarjeta individual con animación de entrada lateral
const StepCard = ({ step, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = step.icon;

  const directions = [
    { x: -80, y: 0 },
    { x: 0,   y: 60 },
    { x: 80,  y: 0 },
  ];
  const dir = directions[index];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: dir.x, y: dir.y, filter: "blur(12px)" }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full"
    >
      {/* Glow de hover detrás de la tarjeta */}
      <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-qualtop-orange/0 to-qualtop-orange/0 group-hover:from-qualtop-orange/20 group-hover:to-transparent transition-all duration-700 blur-xl" />

      <div className="relative h-full bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-10 xl:p-12 overflow-hidden flex flex-col
        hover:border-qualtop-orange/40 hover:bg-white/[0.07] transition-all duration-500
        shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_30px_80px_rgba(255,77,0,0.12)]
        hover:-translate-y-2">

        {/* Línea de acento superior animada */}
        <motion.div
          className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-qualtop-orange to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: index * 0.15 + 0.4, ease: "easeOut" }}
        />

        {/* Destello de fondo en hover */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-qualtop-orange/5 rounded-full blur-3xl group-hover:bg-qualtop-orange/15 transition-all duration-700" />

        {/* Ícono con ring animado */}
        <div className="relative mb-8 self-start">
          <motion.div
            className="absolute inset-0 rounded-2xl bg-qualtop-orange/30 blur-md"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
          />
          <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-qualtop-orange via-[#ff6b2b] to-[#ff4500] flex items-center justify-center shadow-lg shadow-qualtop-orange/40 group-hover:scale-110 transition-transform duration-500">
            <Icon size={26} className="text-white" strokeWidth={1.8} />
          </div>
        </div>

        <h3 className="text-xl md:text-2xl xl:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-qualtop-orange transition-colors duration-300">
          {step.title}
        </h3>
        <p className="text-gray-400 font-light leading-relaxed text-base md:text-lg flex-grow">
          {step.desc}
        </p>

        {/* Conector de flecha entre tarjetas (solo en desktop, no en la última) */}
        {index < journeySteps.length - 1 && (
          <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10">
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="text-qualtop-orange/60"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function RecruitmentJourney() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen left-1/2 -translate-x-1/2 min-h-screen py-24 md:py-32 px-4 sm:px-6 md:px-10 xl:px-16 2xl:px-24 flex items-center justify-center overflow-hidden"
    >

      {/* ── FONDO PARALLAX ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={bgImage}
          alt="Equipo Qualtop"
          style={{ y: bgY, scale: bgScale }}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/50 to-[#050505]" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        {/* Orbes flotantes de ambiente */}
        <FloatingOrb delay={0}   style={{ top: '20%', left: '10%',  width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,77,0,0.12) 0%, transparent 70%)' }} />
        <FloatingOrb delay={2}   style={{ bottom: '15%', right: '8%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,120,30,0.08) 0%, transparent 70%)' }} />
        <FloatingOrb delay={1.2} style={{ top: '50%', left: '50%',  width: 300, height: 300, background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', transform: 'translate(-50%,-50%)' }} />
      </div>

      {/* ── CONTENIDO ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16 md:mb-24"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={titleInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="inline-block py-1.5 px-5 rounded-full bg-white/8 border border-white/15 text-white text-[10px] font-bold tracking-[0.3em] uppercase mb-6 backdrop-blur-md"
          >
            Tu Experiencia
          </motion.span>

          {/* Título con reveal línea a línea */}
          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={titleInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.05]"
            >
              Un proceso{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qualtop-orange via-[#ff7b1a] to-[#ffaa60]">
                diferente.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-gray-300 text-base md:text-lg xl:text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            Diseñamos un viaje de reclutamiento transparente, ágil y centrado al 100% en el talento humano, no en algoritmos.
          </motion.p>
        </motion.div>

        {/* TARJETAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 xl:gap-8 relative">
          {journeySteps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}