import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Gamepad2, Leaf, Users } from 'lucide-react';

export default function TalentHook() {
  // Estado para controlar qué panel está activo (0 = primero por defecto)
  const [activeId, setActiveId] = useState(0);

  const cards = [
    {
      id: 0,
      icon: Trophy,
      title: "Reconocimiento",
      subtitle: "Celebramos tu éxito",
      desc: "Programas de reconocimiento y recompensas. En Qualtop, cada victoria cuenta y se celebra a lo grande.",
      img: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop" // Abstracto Naranja
    },
    {
      id: 1,
      icon: Gamepad2,
      title: "Bienestar 360°",
      subtitle: "Balance Vida-Trabajo",
      desc: "Clases de yoga, clubs de lectura, torneos de gaming y Tech Talks. Tu bienestar es nuestra prioridad.",
      img: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1778&auto=format&fit=crop" // Abstracto VR/Gaming
    },
    {
      id: 2,
      icon: Leaf, // Icono para "Sostenibilidad"
      title: "Impacto Social",
      subtitle: "Voluntariado y Sostenibilidad",
      desc: "Iniciativas de voluntariado y sostenibilidad. Trabajamos para dejar un mundo mejor del que encontramos.",
      img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" // Oficina/Verde
    },
    {
      id: 3,
      icon: Users, // Icono para "Conectar"
      title: "Conexión",
      subtitle: "Espacios Únicos",
      desc: "Espacios para conectar, compartir y celebrar. Creamos entornos donde la colaboración fluye naturalmente.",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" // Equipo colaborando
    }
  ];

  return (
    <section className="bg-black py-32 px-6 overflow-hidden relative">
      
      {/* Luz Ambiental de Fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-qualtop-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* 1. MANIFIESTO (Lado Izquierdo - El "Gancho" Textual) */}
        <div className="lg:col-span-4">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
              <p>
                Formarás parte de proyectos reales, innovadores y de alto impacto.
              </p>
              
              {/* Cita destacada */}
              <div className="relative pl-6 py-2 border-l-4 border-qualtop-orange/50 bg-white/5 rounded-r-xl">
                 <p className="text-gray-200 italic font-medium">
                   "Nuestra cultura es colaborativa, humana y pensada para que disfrutes el camino."
                 </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 2. PANEL ELÁSTICO (Lado Derecho - El "Gancho" Visual) */}
        <div className="lg:col-span-8 h-[550px] flex flex-col md:flex-row gap-2">
          
          {cards.map((card) => {
            const isActive = activeId === card.id;
            
            return (
              <motion.div
                key={card.id}
                layout
                onClick={() => setActiveId(card.id)}
                onMouseEnter={() => setActiveId(card.id)}
                className={`relative h-[120px] md:h-full rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isActive 
                    ? 'flex-[4] border-qualtop-orange shadow-[0_0_30px_rgba(255,77,0,0.15)]' 
                    : 'flex-[1] border-white/10 hover:border-white/30 bg-[#0a0a0a]'
                }`}
              >
                {/* FONDO IMAGEN (Solo visible si activo) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 z-0"
                    >
                      <img src={card.img} alt={card.title} className="w-full h-full object-cover filter grayscale mix-blend-luminosity" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CONTENIDO INTERNO */}
                <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                  
                  {/* Icono y Título Vertical (Estado Inactivo) */}
                  {!isActive && (
                    <div className="h-full flex md:flex-col items-center justify-center md:justify-end gap-4 opacity-50 group-hover:opacity-100">
                       <card.icon size={24} className="text-gray-400" />
                       <span className="hidden md:block text-xs font-black tracking-widest text-gray-500 uppercase rotate-180 whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
                          {card.title}
                       </span>
                       <span className="md:hidden text-lg font-bold text-gray-400">
                          {card.title}
                       </span>
                    </div>
                  )}

                  {/* Contenido Completo (Estado Activo) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="w-full"
                      >
                         <div className="w-14 h-14 rounded-2xl bg-qualtop-orange flex items-center justify-center mb-6 shadow-lg">
                           <card.icon size={30} className="text-white" />
                         </div>
                         
                         <h3 className="text-3xl font-bold text-white mb-2 leading-none">
                           {card.title}
                         </h3>
                         
                         <span className="text-qualtop-orange text-xs font-bold uppercase tracking-widest mb-4 block">
                           {card.subtitle}
                         </span>
                         
                         <p className="text-gray-300 text-lg font-light leading-relaxed max-w-md">
                           {card.desc}
                         </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

                {/* Overlay gradiente siempre presente para legibilidad */}
                <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${isActive ? 'bg-transparent' : 'bg-black/40'}`} />

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}