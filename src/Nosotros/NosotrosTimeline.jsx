import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion'; // Quitamos useSpring
import { Zap, Globe, Award, TrendingUp, Cpu, Server } from 'lucide-react';

// --- DATOS (Sin cambios) ---
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

// --- COMPONENTE DE FILA ---
const MilestoneRow = ({ item, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      // "amount: 0.5" significa que se activa justo cuando el elemento está al 50% de la pantalla
      viewport={{ once: false, amount: 0.5 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative grid grid-cols-[50px_1fr] md:grid-cols-[1fr_120px_1fr] items-center gap-4 md:gap-0 mb-20 md:mb-32 last:mb-0 group"
    >
      
      {/* 1. CONTENIDO (Lógica responsiva mantenida) */}
      <div className={`
        flex flex-col md:block 
        ${index % 2 === 0 ? 'md:justify-end md:text-right md:order-1' : 'md:justify-start md:order-3 md:text-left'} 
        col-start-2 md:col-auto 
      `}>
        
        {/* AÑO (Visible solo en móvil) */}
        <div className={`md:hidden mb-2 text-4xl font-black text-white/20`}>
            {item.year}
        </div>

        {/* TARJETA */}
        <div className={`
           relative p-6 md:p-8 rounded-2xl border border-white/5 
           bg-white/[0.02] md:backdrop-blur-sm 
           max-w-md w-full 
           transition-all duration-300 hover:border-qualtop-orange/30 hover:bg-white/[0.04] group-hover:shadow-[0_0_50px_rgba(255,77,0,0.1)]
           ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}
        `}>
          {/* Acento lateral */}
          <div className={`
            absolute top-8 w-1 h-8 bg-qualtop-orange rounded-full hidden md:block
            ${index % 2 === 0 ? '-right-[2px]' : '-left-[2px]'}
          `} />
          
          <h3 className={`text-xl md:text-2xl font-bold text-white mb-3 uppercase tracking-tight flex items-center gap-3 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
             <span className={`${index % 2 === 0 ? 'md:hidden' : ''} text-qualtop-orange`}>
                <item.icon size={20} />
             </span>
             <span>{item.title}</span>
             <span className={`hidden md:block ${index % 2 === 0 ? '' : 'md:hidden'} text-qualtop-orange`}>
                <item.icon size={20} />
             </span>
          </h3>
          
          <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
            {item.desc}
          </p>
        </div>
      </div>

      {/* 2. NODO CENTRAL */}
      <div className="relative flex justify-center items-center h-full row-start-1 md:row-auto col-start-1 md:col-start-2 md:order-2">
        <div className="relative z-20">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-black border-2 border-white/20 group-hover:border-qualtop-orange group-hover:scale-150 transition-all duration-300" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-qualtop-orange/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Conector Lateral */}
        <motion.div 
           initial={{ scaleX: 0 }}
           whileInView={{ scaleX: 1 }}
           viewport={{ once: false }} // IMPORTANTE: Para que se anime al subir y bajar
           transition={{ duration: 0.4 }}
           className={`
             absolute top-1/2 h-[1px] bg-gradient-to-r from-qualtop-orange to-transparent
             w-[25px] left-[50%] origin-left block md:hidden
             md:w-[60px] 
             ${index % 2 === 0 ? 'md:right-[50%] md:origin-right md:left-auto' : 'md:left-[50%] md:origin-left'}
           `}
        />
      </div>

      {/* 3. AÑO GIGANTE (Solo Desktop) */}
      <div className={`hidden md:flex ${index % 2 === 0 ? 'justify-start order-3' : 'justify-end order-1'}`}>
        <motion.span 
          initial={{ color: 'transparent', opacity: 0.3 }} 
          whileInView={{ color: 'rgba(255, 255, 255, 0.65)', opacity: 1 }}
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 0.5 }}
          className="text-[60px] lg:text-[100px] font-black tracking-tighter stroke-text select-none" 
          style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
        >
          {item.year}
        </motion.span>
      </div>
      
    </motion.div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function VerticalTimeline() {
  const containerRef = useRef(null);
  
  // Conexión DIRECTA al scroll (Sin físicas, modo raw)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Ajuste fino: Empieza a llenarse cuando el contenedor entra al centro
    // Termina de llenarse cuando el final del contenedor llega al centro
    offset: ["start center", "end center"]
  });

  return (
    <section className="bg-[#050505] py-20 md:py-40 relative overflow-hidden font-sans">
      
      {/* Grid fondo */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
        
        {/* Header */}
        <div className="text-center mb-20 md:mb-32">
          <h2 className="text-white text-4xl md:text-7xl font-bold mt-4 tracking-tighter">
            Evolución <span className="text-qualtop-orange">Digital</span>
          </h2>
        </div>

        <div className="relative">
          {/* Riel Guía (Gris) */}
          <div className="absolute left-[25px] md:left-[50%] top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
          
          {/* --- BARRA DE PROGRESO (Sin Delay) --- */}
          <motion.div 
            className="absolute left-[25px] md:left-[50%] top-0 w-[2px] bg-qualtop-orange -translate-x-1/2 shadow-[0_0_20px_#FF4D00] origin-top z-10 will-change-transform"
            style={{ 
              scaleY: scrollYProgress, // Conexión directa 1:1
              height: '100%' 
            }}
          />

          {/* Lista de Hitos */}
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