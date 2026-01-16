import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, Globe, Heart, Users, 
  Zap, Smile, RefreshCw, Fingerprint 
} from 'lucide-react';

export default function WhatDrivesUs() {
  const cards = [
    { id: "01", icon: Cpu, title: "Excelencia Total", text: "Excelencia humana y tecnológica. ¿Existe algo más?" },
    { id: "02", icon: Globe, title: "Transformación", text: "Cada talento Qualtop es transformador y tiene la oportunidad de cambiar el mundo." },
    { id: "03", icon: Heart, title: "Pasión", text: "La pasión hace que lo ordinario sea extraordinario. Vive día a día con entusiasmo." },
    { id: "04", icon: Users, title: "Unidad", text: "Lo extraordinario sucede cuando juntos comenzamos, juntos progresamos y juntos triunfamos." },
    { id: "05", icon: Zap, title: "Potencial", text: "En Qualtop todos podemos desarrollar nuestro máximo potencial. Descubre el tuyo y explótalo." },
    { id: "06", icon: Smile, title: "Hábitos", text: "Construye relaciones y hábitos saludables, sé tu propio ejemplo." },
    { id: "07", icon: RefreshCw, title: "Oportunidad", text: "En Qualtop un cambio es una oportunidad." },
    { id: "08", icon: Fingerprint, title: "Legado", text: "En Qualtop, deja tu marca. Tu trabajo transforma." }
  ];

  return (
    <section className="bg-black py-20 md:py-32 px-4 md:px-6 relative font-sans">
      
      {/* Fondo Decorativo: Línea central sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-3">
               <div className="w-1.5 h-1.5 bg-qualtop-orange rounded-full animate-pulse" />
               <span className="text-gray-500 text-xs font-mono tracking-widest uppercase">
                 [ 8 Pilares Fundamentales ]
               </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
              ¿Qué nos <span className="text-qualtop-orange">impulsa?</span>
            </h2>
          </motion.div>
        </div>

        {/* GRID TÉCNICO PRO */}
        {/* La magia: Border-t y Border-l en el contenedor padre */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
          
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="
                group relative 
                /* Bordes hijos: Derecha y Abajo */
                border-r border-b border-white/10 
                bg-black 
                /* Interacciones */
                hover:bg-white/[0.03] active:bg-white/[0.05]
                transition-all duration-300 
                p-6 md:p-8 
                flex flex-col justify-between
                min-h-[220px] md:min-h-[280px]
              "
            >
              
              {/* 1. Header de la Tarjeta (Icono + ID) */}
              <div className="flex justify-between items-start mb-6">
                <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-white group-hover:bg-qualtop-orange transition-all duration-300">
                  <card.icon size={22} />
                </div>
                {/* ID estilo técnico */}
                <span className="text-[10px] font-mono text-white/20 group-hover:text-qualtop-orange transition-colors">
                  {card.id}
                </span>
              </div>

              {/* 2. Contenido */}
              <div className="relative z-10">
                 <h3 className="text-lg font-bold text-white mb-3 tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                    {card.title}
                 </h3>
                 <p className="text-sm text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors">
                   {card.text}
                 </p>
              </div>

              {/* 3. Decoración Hover (Barra inferior) */}
              <div className="absolute bottom-0 left-0 h-[2px] bg-qualtop-orange w-0 group-hover:w-full transition-all duration-500" />
              
              {/* 4. Glow sutil en hover */}
              <div className="absolute inset-0 bg-qualtop-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}