import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Zap, Globe, Award, TrendingUp, Cpu, Server } from 'lucide-react';

// Datos de la historia
const milestones = [
  { year: '2006', title: 'Fundación', desc: 'Nace la visión de transformar la industria TI en México.', icon: Zap },
  { year: '2010', title: 'Calidad CMMI', desc: 'Certificación internacional en procesos de software.', icon: Award },
  { year: '2012', title: 'Partnerships', desc: 'Alianzas con líderes globales de nube e infraestructura.', icon: Globe },
  { year: '2014', title: 'Premio Nacional', desc: 'Máximo galardón a la calidad y procesos en México.', icon: Award },
  { year: '2018', title: 'IA Core', desc: 'Integración de IA en el núcleo de nuestras soluciones.', icon: Cpu },
  { year: '2022', title: 'Evolución 2.0', desc: 'Nueva arquitectura de servicios multinube.', icon: Server },
  { year: '2024', title: 'Liderazgo Latam', desc: 'Consolidación como líderes en modernización regional.', icon: TrendingUp },
  { year: '2026', title: 'Futuro', desc: 'Definiendo la próxima era de la banca y retail.', icon: Zap },
];

const MilestoneRow = ({ item, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative grid grid-cols-[1fr_80px_1fr] md:grid-cols-[1fr_120px_1fr] items-center gap-0 md:gap-8 mb-32 last:mb-0 group"
    >
      
      {/* 1. LADO IZQUIERDO: CONTENIDO (Tarjeta) */}
      <div className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start order-3'} text-right`}>
        <div className={`relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm max-w-md transition-all duration-500 hover:border-qualtop-orange/30 hover:bg-white/[0.04] group-hover:shadow-[0_0_50px_rgba(255,77,0,0.1)] ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
          {/* Pequeño acento naranja */}
          <div className={`absolute top-8 w-1 h-8 bg-qualtop-orange rounded-full ${index % 2 === 0 ? '-right-[2px]' : '-left-[2px]'}`} />
          
          <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-tight flex items-center gap-3 justify-end">
             {index % 2 !== 0 && <item.icon className="text-qualtop-orange" size={20} />}
             <span>{item.title}</span>
             {index % 2 === 0 && <item.icon className="text-qualtop-orange" size={20} />}
          </h3>
          <p className="text-gray-400 text-base leading-relaxed font-light">
            {item.desc}
          </p>
        </div>
      </div>

      {/* 2. CENTRO: NODO DE ENERGÍA */}
      <div className="relative flex justify-center items-center h-full order-2">
        {/* El punto central */}
        <div className="relative z-20">
            <div className="w-4 h-4 rounded-full bg-black border-2 border-white/20 group-hover:border-qualtop-orange group-hover:scale-150 transition-all duration-500" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-qualtop-orange/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* Conector horizontal hacia la tarjeta */}
        <motion.div 
           initial={{ scaleX: 0 }}
           whileInView={{ scaleX: 1 }}
           transition={{ delay: 0.3, duration: 0.5 }}
           className={`absolute top-1/2 h-[1px] w-[40px] md:w-[60px] bg-gradient-to-r from-qualtop-orange to-transparent ${index % 2 === 0 ? 'right-[50%] origin-right' : 'left-[50%] origin-left'}`}
        />
      </div>

{/* 3. LADO DERECHO/IZQUIERDO: AÑO (Tipografía) */}
      <div className={`flex ${index % 2 === 0 ? 'justify-start order-3' : 'justify-end order-1'}`}>
        <motion.span 
          // 1. Estado inicial: Transparente (solo borde)
          initial={{ color: 'transparent', opacity: 0.3 }} 
          
          // 2. Estado al entrar en pantalla: Se rellena de color (Se ilumina)
          whileInView={{ color: 'rgba(255, 255, 255, 0.65)', opacity: 2 }}
          
          // 3. Configuración de cuándo se activa (-20% de margen para que no sea inmediato al borde)
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
          
          // 4. Duración suave del encendido
          transition={{ duration: 0.8, ease: "easeOut" }}
          
          className="text-[60px] md:text-[100px] font-black tracking-tighter stroke-text" 
          style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
        >
          {item.year}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default function VerticalTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Suavizamos la animación de la línea vertical
  const scaleY = scrollYProgress;useSpring(scrollYProgress, {
    stiffness: 500,
    damping: 90,
    restDelta: 0.001
  });

  return (
    <section className="bg-[#050505] py-40 relative overflow-hidden">
      
      {/* Grid de fondo sutil */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={containerRef}>
        
        {/* Header */}
        <div className="text-center mb-32">
          <span className="text-qualtop-orange text-xs font-black tracking-[0.4em] uppercase"></span>
          <h2 className="text-white text-5xl md:text-7xl font-bold mt-4 tracking-tighter">
            Evolución <span className=" text-qualtop-orange">Digital</span>
          </h2>
        </div>

        <div className="relative">
          {/* --- LÍNEA VERTICAL DE FONDO (Gris) --- */}
          <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
          
          {/* --- LÍNEA DE PROGRESO (Naranja Brillante) --- */}
          <motion.div 
            className="absolute left-[50%] top-0 w-[2px] bg-qualtop-orange -translate-x-1/2 shadow-[0_0_20px_#FF4D00] origin-top z-10"
            style={{ scaleY, height: '100%' }}
          />

          {/* Renderizado de los Hitos */}
          <div className="relative z-20">
            {milestones.map((item, index) => (
              <MilestoneRow key={index} item={item} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}