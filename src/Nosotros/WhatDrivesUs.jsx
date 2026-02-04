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
    <section className="bg-[#050505] py-20 md:py-32 px-4 md:px-6 relative font-sans">
      
      {/* Textura de ruido sutil para dar sensación de material (madera/piedra) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-8 border-b border-white/5">
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-3">
               <div className="w-1.5 h-1.5 bg-qualtop-orange rounded-full shadow-[0_0_10px_#FF4D00]" />
               <span className="text-gray-500 text-xs font-mono tracking-widest uppercase">
                 [ Nuestros Pilares ]
               </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
              ¿Qué nos <span className="text-qualtop-orange">impulsa?</span>
            </h2>
          </motion.div>
        </div>

        {/* GRID DE "BLOQUES TALLADOS" */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {cards.map((card, index) => (
            <motion.div
              key={card.id} // Usamos ID para key, pero no lo mostramos
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="
                group relative 
                bg-[#0a0a0a] 
                rounded-2xl 
                p-8 
                flex flex-col justify-between
                min-h-[260px]
                transition-all duration-300
                
                /* EFECTO TALLADO / BISELADO (La clave del efecto) */
                /* 1. Sombra exterior suave para elevar el bloque */
                shadow-[10px_10px_20px_#000000,-5px_-5px_15px_rgba(255,255,255,0.03)]
                /* 2. Borde sutil: Luz arriba/izq, Sombra abajo/der */
                border-t border-l border-white/5 border-b border-r border-black
                
                /* Hover: El bloque se levanta un poco más */
                hover:-translate-y-1 hover:shadow-[15px_15px_30px_#000000,-5px_-5px_15px_rgba(255,255,255,0.05)]
              "
            >
              
              {/* 1. Header: Icono "Hundido" (Inset) */}
              <div className="mb-6">
                <div className="
                   w-14 h-14 rounded-xl flex items-center justify-center 
                   text-gray-400 group-hover:text-qualtop-orange transition-colors duration-300
                   
                   /* EFECTO HUNDIDO (Inset Shadow) */
                   bg-[#080808]
                   shadow-[inset_3px_3px_6px_#000000,inset_-1px_-1px_2px_rgba(255,255,255,0.1)]
                ">
                  <card.icon size={24} strokeWidth={1.5} />
                </div>
              </div>

              {/* 2. Contenido */}
              <div className="relative z-10">
                 <h3 className="text-xl font-bold text-gray-200 mb-3 tracking-tight group-hover:text-white transition-colors">
                    {card.title}
                 </h3>
                 <p className="text-sm text-gray-500 font-light leading-relaxed group-hover:text-gray-400 transition-colors">
                   {card.text}
                 </p>
              </div>

              {/* 3. Detalle: Borde brillante al hover */}
              <div className="absolute inset-0 rounded-2xl border border-qualtop-orange/0 group-hover:border-qualtop-orange/20 transition-all duration-500 pointer-events-none" />

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}