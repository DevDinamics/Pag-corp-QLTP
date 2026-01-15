import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ValuesFlower() {
  const [hoveredValue, setHoveredValue] = useState(null);

  // El núcleo central
  const centerValue = { id: 'core', title: 'Humildad', desc: 'El origen de nuestra grandeza.' };

  // Los valores satélite (Posicionados matemáticamente en círculo)
  const satellites = [
    { id: 1, title: 'Liderazgo', angle: 300, desc: 'Inspirar para transformar.' },
    { id: 2, title: 'Agilidad', angle: 0, desc: 'Adaptación veloz y precisa.' },
    { id: 3, title: 'Calidad', angle: 60, desc: 'Excelencia en cada detalle.' },
    { id: 4, title: 'Respeto', angle: 120, desc: 'Valoramos a cada persona.' },
    { id: 5, title: 'Responsabilidad Social', angle: 180, desc: 'Impacto positivo en el mundo.' }, // Nombre largo ajustado
    { id: 6, title: 'Trabajo en Equipo', angle: 240, desc: 'Juntos llegamos más lejos.' },
  ];

  // Radio de distancia del centro
  const RADIUS = 170; 

  return (
    <section className="bg-black py-32 px-4 overflow-hidden relative min-h-[90vh] flex items-center justify-center">
      
      {/* Fondo Ambiental */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-qualtop-orange/5 blur-[120px] rounded-full" />
         {/* Grid técnico muy sutil */}
         <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* 1. TEXTO INTRODUCTORIO (Lado Izquierdo) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <span className="text-qualtop-orange text-xs font-black tracking-[0.3em] uppercase block mb-6">
            Nuestro ADN
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight mb-8">
            Nuestros <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-qualtop-orange to-orange-400">
              Valores.
            </span>
          </h2>
          <div className="h-1 w-24 bg-qualtop-orange mb-8 rounded-full" />
          <p className="text-2xl md:text-3xl text-gray-300 font-light leading-snug">
            "Son las raíces de nuestro árbol de la cultura."
          </p>
          <p className="mt-6 text-gray-500 text-lg max-w-md">
             Cada decisión, cada proyecto y cada línea de código está impregnada de estos principios fundamentales que nos definen como Qualtop.
          </p>
        </motion.div>

        {/* 2. GEOMETRÍA INTERACTIVA (Lado Derecho) */}
        <div className="relative h-[500px] flex items-center justify-center">
            
            {/* CÍRCULO CENTRAL (Humildad) */}
            <motion.div 
              className="absolute z-20 w-40 h-40 rounded-full flex items-center justify-center cursor-pointer group"
              whileHover={{ scale: 1.1 }}
              animate={{ boxShadow: '0 0 40px rgba(255, 77, 0, 0.2)' }}
            >
               {/* Fondo Glassmorphism */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md rounded-full border border-qualtop-orange/50 group-hover:bg-qualtop-orange group-hover:border-qualtop-orange transition-colors duration-500" />
               
               <div className="relative z-10 text-center px-2">
                 <h3 className="text-white font-bold text-lg tracking-wide group-hover:text-black transition-colors">{centerValue.title}</h3>
               </div>
               
               {/* Ondas de expansión (Pulse) */}
               <div className="absolute inset-0 rounded-full border border-qualtop-orange/30 animate-ping opacity-20" />
            </motion.div>

            {/* SATÉLITES */}
            {satellites.map((item) => {
              // Cálculo trigonométrico para posicionar en círculo
              const x = Math.cos((item.angle * Math.PI) / 180) * RADIUS;
              const y = Math.sin((item.angle * Math.PI) / 180) * RADIUS;

              return (
                <React.Fragment key={item.id}>
                  {/* LÍNEA CONECTORA (Se ilumina al hover) */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 origin-left h-[1px] bg-white/10 -z-10"
                    style={{ 
                      width: RADIUS, 
                      rotate: item.angle,
                      background: hoveredValue === item.id 
                        ? 'linear-gradient(40deg, #FF4D00, transparent)' 
                        : 'linear-gradient(40deg, rgba(255,255,255,0.1), transparent)'
                    }}
                  />

                  {/* NODO DE VALOR */}
                  <motion.div
                    className="absolute w-32 h-32 rounded-full flex items-center justify-center cursor-pointer"
                    style={{ x, y }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, delay: item.id * 0 }}
                    whileHover={{ scale: 1.15, zIndex: 40 }}
                    onMouseEnter={() => setHoveredValue(item.id)}
                    onMouseLeave={() => setHoveredValue(null)}
                  >
                    {/* Estilo de la esfera */}
                    <div className={`absolute inset-0 rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 ${
                      hoveredValue === item.id ? 'border-qualtop-orange bg-white/10' : ''
                    }`} />

                    {/* Texto */}
                    <div className="relative z-10 text-center px-2">
                      <span className={`text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${
                        hoveredValue === item.id ? 'text-qualtop-orange font-bold' : 'text-gray-300'
                      }`}>
                        {item.title}
                      </span>
                    </div>

                    {/* Tooltip flotante (Descripción) */}
                    {hoveredValue === item.id && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full mt-4 w-48 bg-white/10 backdrop-blur-xl border border-white/10 p-3 rounded-lg text-center pointer-events-none z-50"
                      >
                        <p className="text-white text-xs font-light">{item.desc}</p>
                      </motion.div>
                    )}
                  </motion.div>
                </React.Fragment>
              );
            })}
        </div>

      </div>
    </section>
  );
}