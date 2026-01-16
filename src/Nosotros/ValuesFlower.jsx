import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ValuesFlower() {
  const [hoveredValue, setHoveredValue] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // DATOS
  const centerValue = { id: 'core', title: 'Humildad', desc: 'El origen de nuestra grandeza.' };
  
  const satellites = [
    { id: 1, title: 'Liderazgo', angle: 270, desc: 'Inspirar para transformar.' },
    { id: 2, title: 'Agilidad', angle: 330, desc: 'Adaptación veloz y precisa.' },
    { id: 3, title: 'Calidad', angle: 30, desc: 'Excelencia en cada detalle.' },
    { id: 4, title: 'Respeto', angle: 90, desc: 'Valoramos a cada persona.' },
    { id: 5, title: 'Resp. Social', angle: 150, desc: 'Impacto positivo en el mundo.' },
    { id: 6, title: 'Equipo', angle: 210, desc: 'Juntos llegamos más lejos.' },
  ];

  // Radio dinámico ajustado
  const RADIUS = isMobile ? 125 : 190; 

  return (
    <section className="bg-[#050505] py-20 md:py-32 px-4 overflow-hidden relative min-h-[90vh] flex items-center justify-center font-sans">
      
      {/* --- FONDO AMBIENTAL (Más profundo) --- */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-qualtop-orange/5 blur-[100px] rounded-full" />
         <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* 1. TEXTO INTRODUCTORIO */}
        {/* CORRECCIÓN DE ORDEN: 'order-1' asegura que salga PRIMERO en móvil */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left order-1 lg:order-1"
        >
          <span className="text-qualtop-orange text-xs font-black tracking-[0.3em] uppercase block mb-4 lg:mb-6">
            Nuestro ADN
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6 lg:mb-8">
            Nuestros <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-qualtop-orange to-orange-400">
              Valores.
            </span>
          </h2>
          
          <div className="h-1 w-16 lg:w-24 bg-qualtop-orange mb-6 lg:mb-8 rounded-full mx-auto lg:mx-0 shadow-[0_0_15px_#FF4D00]" />
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light leading-snug">
            "Son las raíces de nuestro árbol de la cultura."
          </p>
          <p className="mt-6 text-gray-500 text-base md:text-lg max-w-md mx-auto lg:mx-0">
             Cada decisión, cada proyecto y cada línea de código está impregnada de estos principios fundamentales que nos definen como Qualtop.
          </p>
        </motion.div>

        {/* 2. SISTEMA INTERACTIVO */}
        {/* CORRECCIÓN DE ORDEN: 'order-2' asegura que salga SEGUNDO en móvil */}
        <div className="relative h-[400px] md:h-[600px] flex items-center justify-center order-2 lg:order-2 scale-95 md:scale-100 mt-8 lg:mt-0">
            
            {/* ANILLOS ORBITALES DE FONDO (Mejora de Diseño) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[250px] h-[250px] md:w-[380px] md:h-[380px] rounded-full border border-white/5" />
                <div className="absolute w-[180px] h-[180px] md:w-[280px] md:h-[280px] rounded-full border border-white/5 border-dashed opacity-50" />
            </div>

            {/* CÍRCULO CENTRAL (Humildad) */}
            <motion.div 
              className="absolute z-30 w-32 h-32 md:w-44 md:h-44 rounded-full flex items-center justify-center cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              animate={{ 
                boxShadow: ['0 0 20px rgba(255,77,0,0.2)', '0 0 50px rgba(255,77,0,0.4)', '0 0 20px rgba(255,77,0,0.2)']
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
               {/* Fondo y Brillo */}
               <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-black rounded-full border border-qualtop-orange shadow-[0_0_30px_rgba(255,77,0,0.15)] z-0" />
               
               {/* Texto Central */}
               <div className="relative z-10 text-center px-2">
                 <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight drop-shadow-lg">{centerValue.title}</h3>
               </div>
               
               {/* Ondas (Pulse) */}
               <div className="absolute inset-0 rounded-full border border-qualtop-orange/40 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30" />
            </motion.div>

            {/* SATÉLITES */}
            {satellites.map((item, index) => {
              const radian = (item.angle * Math.PI) / 180;
              const x = Math.cos(radian) * RADIUS;
              const y = Math.sin(radian) * RADIUS;

              return (
                <React.Fragment key={item.id}>
                  
                  {/* LÍNEA CONECTORA */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 h-[1px] origin-left -z-10"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: RADIUS }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    style={{ 
                      rotate: item.angle,
                      background: hoveredValue === item.id 
                        ? 'linear-gradient(90deg, transparent, #FF4D00)' 
                        : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08))'
                    }}
                  />

                  {/* NODO DE VALOR (Con animación de respiración) */}
                  <motion.div
                    className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center cursor-pointer"
                    style={{ x, y }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    // Animación de "Respiración" (Floating)
                    animate={{ 
                      y: [y, y - 5, y],
                    }}
                    transition={{ 
                      // Delay aleatorio para que no se muevan todos igual
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 },
                      scale: { duration: 0.5 }
                    }}
                    whileHover={{ scale: 1.15, zIndex: 50 }}
                    onMouseEnter={() => setHoveredValue(item.id)}
                    onMouseLeave={() => setHoveredValue(null)}
                  >
                    {/* Estilo de la esfera */}
                    <div className={`absolute inset-0 rounded-full border bg-[#0a0a0a] backdrop-blur-xl transition-all duration-300 ${
                      hoveredValue === item.id 
                        ? 'border-qualtop-orange shadow-[0_0_25px_rgba(255,77,0,0.5)]' 
                        : 'border-white/10 hover:border-white/30'
                    }`} />

                    {/* Texto del Valor */}
                    <div className="relative z-10 text-center px-1 flex flex-col items-center justify-center h-full">
                      <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                        hoveredValue === item.id ? 'text-white' : 'text-gray-400'
                      }`}>
                        {item.title}
                      </span>
                    </div>

                    {/* TOOLTIP (Descripción) */}
                    <AnimatePresence>
                      {hoveredValue === item.id && !isMobile && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="absolute -bottom-16 w-44 bg-black/90 border border-qualtop-orange/30 p-4 rounded-xl text-center pointer-events-none z-[60] shadow-2xl"
                        >
                          {/* Triángulo del tooltip */}
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black border-t border-l border-qualtop-orange/30 rotate-45" />
                          
                          <p className="text-white text-[11px] font-medium leading-relaxed">
                            <span className="text-qualtop-orange block mb-1 font-bold text-[9px] uppercase tracking-widest">Significado</span>
                            {item.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </React.Fragment>
              );
            })}
        </div>

      </div>
    </section>
  );
}