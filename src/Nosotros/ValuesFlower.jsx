import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- DATOS (Solo Título) ---
const centerValue = 'Humildad';

const satellites = [
  // OPTIMIZACIÓN: Ajusté ligeramente las posiciones para evitar cortes en pantallas móviles verticales
  { id: 1, title: 'Liderazgo', position: { top: '15%', left: '10%' } },
  { id: 2, title: 'Agilidad', position: { top: '25%', right: '10%' } }, // Right ajustado
  { id: 3, title: 'Calidad', position: { bottom: '30%', left: '15%' } },
  { id: 4, title: 'Respeto', position: { bottom: '15%', right: '10%' } },
  { id: 5, title: 'Responsabilidad', position: { top: '45%', left: '5%' } }, // Bajé un poco para no chocar con el centro
  { id: 6, title: 'Equipo', position: { bottom: '40%', right: '5%' } },
  { id: 7, title: 'Innovación', position: { top: '12%', right: '20%' } },
  { id: 8, title: 'Pasión', position: { bottom: '10%', left: '30%' } },
];

// --- PALABRA FLOTANTE (Minimalista) ---
const FlyingWord = ({ item, range, progress }) => {
  // Opacidad: Fade in -> Hold -> Fade out
  const opacity = useTransform(progress, [range[0], range[0] + 0.1, range[1] - 0.1, range[1]], [0, 1, 1, 0]);
  
  // Escala: Ajustada para móvil. En móvil crece menos (3.5) para no tapar toda la pantalla.
  // En desktop sigue creciendo masivo (5).
  // Nota: Framer Motion no acepta media queries directos en arrays, así que usamos un valor seguro intermedio o clases CSS para controlar el tamaño base.
  const scale = useTransform(progress, [range[0], range[1]], [0.5, 4]);
  
  // Blur: Simula profundidad de campo (DOF)
  const blur = useTransform(progress, [range[0], range[0] + 0.15, range[1] - 0.15, range[1]], [8, 0, 0, 15]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  
  // Color: Pasa de gris oscuro (lejos) a blanco brillante (cerca)
  const color = useTransform(progress, [range[0], range[0] + 0.2], ["#444", "#fff"]);

  return (
    <motion.div
      style={{ 
        opacity, 
        scale, 
        filter,
        color,
        ...item.position 
      }}
      // RESPONSIVO:
      // text-2xl en móvil (para palabras largas) -> text-5xl en tablet -> text-7xl en desktop
      // whitespace-nowrap asegura que no se rompa la palabra
      className="absolute z-20 pointer-events-none font-sans font-bold whitespace-nowrap text-3xl sm:text-5xl md:text-7xl tracking-tight leading-none"
    >
       {item.title}
    </motion.div>
  );
};

export default function ValuesScrollTypo() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // El NÚCLEO (Humildad) se desvanece
  const coreOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const coreScale = useTransform(scrollYProgress, [0, 0.15], [1, 2]);
  const coreBlur = useTransform(scrollYProgress, [0, 0.15], [0, 20]);
  const coreFilter = useTransform(coreBlur, (v) => `blur(${v}px)`);

  return (
    // Altura controlable para la duración del viaje
    <section ref={targetRef} className="relative h-[300vh] bg-[#050505] font-sans">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-[1000px]">
         
         {/* Fondo Limpio */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />

         {/* TÍTULO FIJO */}
         {/* RESPONSIVO: Ajustado top y tamaños de fuente para que no ocupe media pantalla en móvil */}
         <div className="absolute top-8 md:top-16 text-center w-full z-30 px-4">
            <span className="text-qualtop-orange text-[10px] md:text-[14px] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase block mb-2 opacity-80">
                NUESTROS
            </span>
            <h2 className="text-2xl md:text-4xl font-medium text-white tracking-widest uppercase">
                Valores
            </h2>
         </div>

         {/* --- PALABRA CENTRAL (CORE) --- */}
         {/* RESPONSIVO: text-5xl en móvil, sube hasta 9xl en desktop */}
         <motion.h1 
           style={{ opacity: coreOpacity, scale: coreScale, filter: coreFilter }}
           className="relative z-10 text-5xl sm:text-7xl md:text-9xl font-black text-white tracking-tighter text-center px-4"
         >
            {centerValue}
         </motion.h1>

         {/* --- PALABRAS SATÉLITE (Viaje) --- */}
         {satellites.map((item, i) => {
            // Distribución escalonada
            const start = 0.1 + (i * 0.08); 
            const end = start + 0.4; 
            return (
               <FlyingWord 
                 key={item.id} 
                 item={item} 
                 range={[start, end]} 
                 progress={scrollYProgress} 
               />
            );
         })}

         {/* Indicador sutil */}
         <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
            className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 text-white/20 text-[10px] tracking-[0.3em] font-mono animate-pulse"
         >
            SCROLL
         </motion.div>

      </div>
    </section>
  );
}