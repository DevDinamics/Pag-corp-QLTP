import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Gamepad2, Leaf, Users } from 'lucide-react';

export default function TalentHook() {
  // Estado para saber cuál tarjeta está expandida (0 por defecto)
  const [activeId, setActiveId] = useState(0);

  const cards = [
    {
      id: 0,
      icon: Trophy,
      title: "Reconocimiento",
      subtitle: "Celebramos tu éxito",
      desc: "Programas de reconocimiento y recompensas. En Qualtop, cada victoria cuenta y se celebra a lo grande.",
      // Imagen de oficina moderna / trofeo
      img: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 1,
      icon: Gamepad2,
      title: "Bienestar 360°",
      subtitle: "Balance Vida-Trabajo",
      desc: "Clases de yoga, clubs de lectura, torneos de gaming y Tech Talks. Tu bienestar es nuestra prioridad.",
      // Imagen de gente relajada / gaming
      img: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1778&auto=format&fit=crop"
    },
    {
      id: 2,
      icon: Leaf,
      title: "Impacto Social",
      subtitle: "Voluntariado y Sostenibilidad",
      desc: "Iniciativas de voluntariado y sostenibilidad. Trabajamos para dejar un mundo mejor del que encontramos.",
      // Imagen de naturaleza / equipo voluntario
      img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      icon: Users,
      title: "Conexión",
      subtitle: "Espacios Únicos",
      desc: "Espacios para conectar, compartir y celebrar. Creamos entornos donde la colaboración fluye naturalmente.",
      // Imagen de colaboración / reunión
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section className="bg-black py-20 md:py-32 px-4 md:px-6 overflow-hidden relative font-sans">
      
      {/* Luz Ambiental de Fondo (Efecto Glow Naranja) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] md:w-[800px] md:h-[600px] bg-qualtop-orange/5 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start lg:items-center relative z-10">
        
        {/* 1. MANIFIESTO (Lado Izquierdo) */}
        <div className="lg:col-span-4 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-qualtop-orange text-xs font-black tracking-[0.3em] uppercase block mb-6">
              Talento Qualtop
            </span>
            
            <h2 className="text-4xl md:text-5xl font-medium text-white leading-[1.1] mb-8">
              Cada talento tiene el <span className="text-transparent bg-clip-text bg-gradient-to-r from-qualtop-orange to-orange-400">poder</span> de transformar.
            </h2>

            <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed">
              <p>
                En Qualtop no solo desarrollamos tecnología: <strong className="text-white">aquí desarrollas tu máximo potencial.</strong>
              </p>
              <p className="hidden md:block">
                Formarás parte de proyectos reales, innovadores y de alto impacto, en un ambiente diseñado para inspirarte.
              </p>
              
              {/* Cita destacada */}
              <div className="relative pl-6 py-2 border-l-4 border-qualtop-orange/50 bg-white/5 rounded-r-xl mx-auto lg:mx-0 max-w-md lg:max-w-none text-left backdrop-blur-sm">
                 <p className="text-gray-200 italic font-medium text-sm md:text-base">
                   "Nuestra cultura es colaborativa, humana y pensada para que disfrutes el camino."
                 </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 2. PANEL ELÁSTICO (Lado Derecho - EL WOW FACTOR) */}
        {/* Altura adaptativa: h-[600px] en móvil, h-[550px] en desktop */}
        <div className="lg:col-span-8 h-[600px] md:h-[550px] flex flex-col md:flex-row gap-3">
          
          {cards.map((card) => {
            const isActive = activeId === card.id;
            
            return (
              <motion.div
                key={card.id}
                layout // Propiedad mágica de Framer para animar cambios de layout
                onClick={() => setActiveId(card.id)}
                onMouseEnter={() => setActiveId(card.id)}
                transition={{ duration: 0.4, ease: "easeInOut" }} 
                className={`
                  relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500
                  ${isActive 
                    ? 'flex-[5] border-qualtop-orange shadow-[0_0_30px_rgba(255,77,0,0.15)]' // Tarjeta expandida (ocupa 5 partes)
                    : 'flex-[1] border-white/10 hover:border-white/30 bg-[#0a0a0a]' // Tarjeta contraída (ocupa 1 parte)
                  }
                `}
              >
                {/* FONDO IMAGEN (Solo visible cuando activo) */}
                <AnimatePresence mode='wait'>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 z-0"
                    >
                      <img src={card.img} alt={card.title} className="w-full h-full object-cover filter grayscale mix-blend-luminosity scale-105" />
                      {/* Gradiente para asegurar legibilidad del texto */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CONTENIDO INTERNO */}
                <div className="absolute inset-0 z-10 p-5 md:p-8 flex flex-col justify-end">
                  
                  {/* ESTADO INACTIVO (Ícono y Título Rotado) */}
                  {!isActive && (
                    <div className="h-full flex md:flex-col items-center justify-center md:justify-end gap-4 opacity-50 hover:opacity-100 transition-opacity">
                       <card.icon size={24} className="text-gray-400" />
                       
                       {/* Texto Vertical solo en Desktop */}
                       <span className="hidden md:block text-xs font-black tracking-[0.2em] text-gray-500 uppercase rotate-180 whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
                          {card.title}
                       </span>
                       
                       {/* Texto Horizontal solo en Móvil */}
                       <span className="md:hidden text-sm font-bold text-gray-400 uppercase tracking-wider">
                          {card.title}
                       </span>
                    </div>
                  )}

                  {/* ESTADO ACTIVO (Contenido Completo) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="w-full"
                      >
                         {/* Icono Grande */}
                         <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-qualtop-orange flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-orange-900/20">
                           <card.icon className="text-white w-6 h-6 md:w-8 md:h-8" />
                         </div>
                         
                         <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-none">
                           {card.title}
                         </h3>
                         
                         <span className="text-qualtop-orange text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 block">
                           {card.subtitle}
                         </span>
                         
                         <p className="text-gray-300 text-sm md:text-lg font-light leading-relaxed max-w-lg">
                           {card.desc}
                         </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}