import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Layers, Cpu } from 'lucide-react';

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
    <section className="bg-black py-20 md:py-32 px-4 md:px-6 relative overflow-hidden font-sans">
      
      {/* Fondo: Grid Técnico Sutil */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER: Adaptable */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 border-b border-white/10 pb-6 md:pb-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
               {/* Detalle decorativo pequeño */}
               <div className="w-2 h-2 bg-qualtop-orange rounded-full animate-pulse" />
               <span className="text-qualtop-orange text-xs font-mono tracking-widest uppercase">
                 Core Purpose
               </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight">
              Nuestro Propósito
            </h2>
          </motion.div>
        </div>

        {/* GRID DE MÓDULOS PRO */}
        {/* Truco Pro: Border-top y Border-left en el contenedor, y Border-right/bottom en los hijos.
            Esto crea una cuadrícula perfecta sin bordes dobles, sin importar el tamaño de pantalla. */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/10">
          
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="
                group relative 
                border-r border-b border-white/10 
                bg-black hover:bg-white/[0.02] active:bg-white/[0.04]
                transition-colors duration-500 overflow-hidden 
                min-h-[320px] md:min-h-[420px] 
                flex flex-col justify-between 
                p-6 md:p-10
              "
            >
              
              {/* 1. BARRA SUPERIOR DE ENERGÍA */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5">
                <div className="h-full bg-qualtop-orange w-0 group-hover:w-full transition-all duration-700 ease-in-out" />
              </div>

              {/* 2. NUMERACIÓN DE FONDO (Detalle Visual) */}
              <span className="absolute top-6 right-6 text-[10px] font-mono text-white/10 group-hover:text-qualtop-orange/50 transition-colors">
                {card.id}
              </span>

              {/* 3. CONTENIDO SUPERIOR */}
              <div className="relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 border border-white/20 rounded-lg flex items-center justify-center mb-6 md:mb-8 group-hover:border-qualtop-orange group-hover:bg-qualtop-orange/10 transition-all duration-300">
                  <card.icon size={20} className="text-gray-300 group-hover:text-qualtop-orange transition-colors md:w-6 md:h-6" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 group-hover:translate-x-2 transition-transform duration-300">
                  {card.title}
                </h3>
              </div>

              {/* 4. CONTENIDO INFERIOR */}
              <div className="relative z-10">
                <p className="text-gray-400 font-light leading-relaxed text-sm md:text-lg border-l-2 border-transparent group-hover:border-qualtop-orange pl-0 group-hover:pl-4 transition-all duration-300">
                  {card.text}
                </p>
              </div>

              {/* Efecto de ruido/grano solo en hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-500 mix-blend-overlay" 
                   style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

            </motion.div>
          ))}
          
        </div>

      </div>
    </section>
  );
}