import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Layers, Cpu, ArrowUpRight } from 'lucide-react';

export default function PurposeSectionTech() {
  const cards = [
    {
      id: "01",
      title: "Impacto Real",
      text: "Diseñamos e implementamos soluciones tecnológicas que generan impacto real en la operación y el negocio.",
      icon: Zap,
    },
    {
      id: "02",
      title: "Valor Sostenible",
      text: "Desarrollar capacidades técnicas y estratégicas que generen valor sostenible a largo plazo.",
      icon: Layers,
    },
    {
      id: "03",
      title: "Visión Innovadora",
      text: "Impulsar una visión profesional e innovadora de la tecnología aplicada al negocio.",
      icon: Cpu,
    }
  ];

  return (
    <section className="bg-black py-16 md:py-32 px-4 md:px-6 relative overflow-hidden font-sans">
      
      {/* Fondo: Grid Técnico Sutil */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 border-b border-white/10 pb-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
               <div className="w-2 h-2 bg-qualtop-orange rounded-full animate-pulse" />
               <span className="text-qualtop-orange text-xs font-mono tracking-widest uppercase">
                 Core Purpose
               </span>
            </div>
            {/* Ajuste de tamaño de texto para móvil (text-4xl) y desktop (lg:text-6xl) */}
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-medium text-white tracking-tight leading-tight">
              Nuestro Propósito
            </h2>
          </motion.div>
        </div>

        {/* GRID DE TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          {cards.map((card, index) => (
            <OffsetCard key={card.id} card={card} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

// --- COMPONENTE DE TARJETA RESPONSIVO ---
const OffsetCard = ({ card, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      // Altura: auto en móvil, fija en desktop
      className="relative w-full h-auto min-h-[340px] md:h-[400px] group perspective-1000 cursor-pointer"
    >
      
      {/* 1. CAPA TRASERA (Ghost Border) 
          En móvil: Se oculta o se queda estática para no ensuciar el layout vertical.
          En desktop (md): Aparece al hover.
      */}
      <div className="hidden md:block absolute inset-0 border-2 border-qualtop-orange rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-6 translate-y-6" />

      {/* 2. TARJETA PRINCIPAL 
          En móvil: Fondo sólido, sin traslación.
          En desktop: Efecto de movimiento (-translate) al hover.
      */}
      <div 
        className="
          relative md:absolute inset-0 
          bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 
          flex flex-col justify-center items-center text-center
          transition-all duration-500 ease-out
          
          /* Estilos Desktop Hover */
          md:group-hover:-translate-y-2 md:group-hover:-translate-x-2 
          md:group-hover:border-white/20 md:group-hover:bg-[#111]
          md:group-hover:shadow-[20px_20px_50px_rgba(0,0,0,0.8)]
          
          z-20 overflow-hidden
        "
      >
        
        {/* Ruido sutil */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

        {/* ICONO 
            Móvil: Siempre pequeño y arriba (como si ya estuviera en hover).
            Desktop: Grande y centrado, se encoge al hover.
        */}
        <div className="relative z-10 mb-4 md:mb-6 transition-all duration-500 
                        md:group-hover:mb-2 md:group-hover:scale-75 md:group-hover:-translate-y-4">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10 
                          /* En móvil el borde naranja está activo por defecto para dar color */
                          border-qualtop-orange/50 text-qualtop-orange
                          md:border-white/10 md:text-white
                          md:group-hover:border-qualtop-orange md:group-hover:text-qualtop-orange transition-colors duration-500">
             <card.icon size={32} className="md:w-[36px] md:h-[36px]" strokeWidth={1.5} />
          </div>
        </div>

        {/* TÍTULO 
             Móvil: Posición fija.
             Desktop: Se mueve hacia arriba al hover.
        */}
        <h3 className="relative z-10 text-xl md:text-2xl font-bold text-white mb-2 transition-transform duration-500 md:group-hover:-translate-y-2">
          {card.title}
        </h3>

        {/* TEXTO Y BOTÓN
            Móvil: Siempre visible (opacity-100, max-h-full).
            Desktop: Oculto (opacity-0, max-h-0) hasta hacer hover.
        */}
        <div className="relative z-10 transition-all duration-700 ease-in-out
                        opacity-100 max-h-full
                        md:max-h-0 md:opacity-0 
                        md:group-hover:max-h-[200px] md:group-hover:opacity-100">
            
            <div className="pt-4 border-t border-white/10 w-full mt-2 md:mt-0">
                <p className="text-gray-400 text-sm leading-relaxed">
                    {card.text}
                </p>
                {/* Flecha solo decorativa */}
                <div className="mt-4 flex justify-center opacity-50 md:opacity-100">
                    <ArrowUpRight className="text-qualtop-orange" size={20} />
                </div>
            </div>
        </div>

      </div>

    </motion.div>
  );
};