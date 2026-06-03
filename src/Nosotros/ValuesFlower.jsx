import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';


const centerValue = 'Humildad';


const satellites = [
  { id: 1, title: 'Liderazgo',       pos: { x: '-25vw', y: '-22vh' }, mpos: { x: '-28vw', y: '-18vh' } },
  { id: 2, title: 'Agilidad',        pos: { x: '30vw',  y: '-12vh' }, mpos: { x: '22vw',  y: '-15vh' } },
  { id: 3, title: 'Calidad',         pos: { x: '-32vw', y: '20vh'  }, mpos: { x: '-20vw', y: '18vh'  } },
  { id: 4, title: 'Respeto',         pos: { x: '25vw',  y: '25vh'  }, mpos: { x: '18vw',  y: '22vh'  } },
  { id: 5, title: 'Responsabilidad', pos: { x: '-15vw', y: '30vh'  }, mpos: { x: '-10vw', y: '28vh'  } },
  { id: 6, title: 'Equipo',          pos: { x: '32vw',  y: '10vh'  }, mpos: { x: '22vw',  y: '10vh'  } },
  { id: 7, title: 'Innovación',      pos: { x: '12vw',  y: '15vh'  }, mpos: { x: '8vw',   y: '-22vh' } },
  { id: 8, title: 'Pasión',          pos: { x: '-20vw', y: '5vh'   }, mpos: { x: '-18vw', y: '5vh'   } },
];

// --- HOOK ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

// --- PALABRA FLOTANTE ---
const FlyingWord = ({ item, range, progress, isMobile }) => {
  const opacity = useTransform(progress, [range[0], range[0] + 0.1, range[1] - 0.05, range[1]], [0, 1, 1, 0]);
  
  const maxScale = isMobile ? 1.0 : 2.0;
  const scale = useTransform(progress, [range[0], range[1]], [0.2, maxScale]);
  
  const blur = useTransform(progress, [range[0], range[0] + 0.2, range[1] - 0.2, range[1]], [15, 0, 0, 25]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  
  const zIndex = useTransform(progress, [range[0], range[1]], [10, 40]);
  
  const color = useTransform(progress, [range[0], range[0] + 0.3, range[1]], ["#222", "#fff", "#fff"]);

  const posX = isMobile ? item.mpos.x : item.pos.x;
  const posY = isMobile ? item.mpos.y : item.pos.y;

  return (
    <motion.div
      style={{ 
        opacity, 
        scale, 
        filter,
        color,
        zIndex,
        position: 'absolute',
        top: '50%',
        left: '50%',
        x: `calc(-50% + ${posX})`,
        y: `calc(-50% + ${posY})`,
      }}
      className="pointer-events-none font-sans font-black whitespace-nowrap text-4xl sm:text-3xl md:text-5xl tracking-tighter leading-none mix-blend-screen"
    >
       {item.title}
    </motion.div>
  );
};

export default function ValuesScrollTypo() {
  const targetRef = useRef(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // El NÚCLEO (Humildad)
  const coreOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const coreScale = useTransform(scrollYProgress, [0, 0.1], [1, 2.5]);
  const coreBlur = useTransform(scrollYProgress, [0, 0.1], [0, 30]);
  const coreFilter = useTransform(coreBlur, (v) => `blur(${v}px)`);

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-[#050505] font-sans z-10">

      <div className="sticky -top-[1px] h-[calc(100vh+2px)] w-full overflow-hidden flex items-center justify-center perspective-[1000px] bg-[#050505]">
         
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,43,0.03)_0%,transparent:60%)] pointer-events-none z-0" />
         
         <div className="absolute top-0 left-0 w-full h-32 md:h-48 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent z-40 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-40 pointer-events-none" />

         <div className="absolute top-24 md:top-32 text-center w-full z-50 px-4">
            <span className="text-qualtop-orange text-[10px] md:text-xs font-black tracking-[0.4em] uppercase block mb-3 opacity-90 drop-shadow-[0_0_15px_rgba(255,107,43,0.8)]">
                NUESTROS
            </span>
            <h2 className="text-xl md:text-5xl font-medium text-white tracking-[0.2em] uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,1)]">
                Valores
            </h2>
         </div>

         {/* --- PALABRA CENTRAL (CORE) — posicionada con inset-0 + flex para centrado perfecto --- */}
         <motion.div
           style={{ opacity: coreOpacity, scale: coreScale, filter: coreFilter }}
           className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none mix-blend-screen"
         >
           <h1 className="text-4xl sm:text-5xl md:text-[8rem] font-black text-white tracking-tighter text-center">
             {centerValue}
           </h1>
         </motion.div>

         {/* --- PALABRAS SATÉLITE --- */}
         {satellites.map((item, i) => {
            const start = 0.05 + (i * 0.09); 
            const end = start + 0.45; 
            return (
               <FlyingWord 
                 key={item.id} 
                 item={item} 
                 range={[start, end]} 
                 progress={scrollYProgress}
                 isMobile={isMobile}
               />
            );
         })}

         {/* Indicador sutil de Scroll (Desaparece rápido) */}
         <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50 pointer-events-none"
         >
            <div className="w-[1px] h-8 bg-gradient-to-b from-qualtop-orange to-transparent animate-[pulse_1.5s_ease-in-out_infinite]" />
            <span className="text-white/30 text-[9px] tracking-[0.4em] font-mono uppercase">
               Scroll
            </span>
         </motion.div>

      </div>
    </section>
  );
}