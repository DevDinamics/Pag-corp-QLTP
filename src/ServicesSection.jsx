import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Share2, Cpu } from 'lucide-react';

const services = [
  {
    title: "Reducción de Riesgos Críticos",
    desc: "Reducimos riesgos en sistemas y datos que sostienen la operación.",
    details: "Implementamos capas de seguridad activa y redundancia de datos para asegurar que los procesos vitales de la banca nunca se detengan.",
    icon: <ShieldAlert size={28} />,
  },
  {
    title: "Interconexión de Sistemas",
    desc: "Conectamos sistemas para recuperar visibilidad y control total.",
    details: "Unificamos plataformas heredadas con arquitecturas modernas, permitiendo un flujo de información en tiempo real sin silos de datos.",
    icon: <Share2 size={28} />,
  },
  {
    title: "Activación de Inteligencia Artificial",
    desc: "Activamos IA para automatizar decisiones y escalar la inteligencia.",
    details: "Desplegamos modelos predictivos y algoritmos de aprendizaje automático que transforman datos crudos en decisiones estratégicas.",
    icon: <Cpu size={28} />,
  }
];

const InfoCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[400px] rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-qualtop-orange/30"
    >
      {/* --- EFECTO DE FONDO (PATRÓN TECNOLÓGICO) --- */}
      <div 
        className={`absolute inset-0 opacity-[0.03] transition-opacity duration-700 ${isHovered ? 'opacity-[0.07]' : ''}`}
        style={{ 
          backgroundImage: `radial-gradient(circle, #FF4D00 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* --- ICONO Y TÍTULO --- */}
      <div className="relative z-10">
        <div className={`mb-8 w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-500 ${
          isHovered ? 'bg-qualtop-orange border-qualtop-orange text-white shadow-[0_0_20px_rgba(255,77,0,0.4)]' : 'bg-white/5 border-white/10 text-qualtop-orange'
        }`}>
          {service.icon}
        </div>

        <h3 className="text-2xl font-bold text-white leading-tight mb-4 tracking-tight">
          {service.title}
        </h3>
        
        <p className={`text-base leading-relaxed transition-colors duration-500 ${isHovered ? 'text-white' : 'text-gray-400'}`}>
          {service.desc}
        </p>
      </div>

      {/* --- DETALLES INFORMATIVOS (REVELADO) --- */}
      <div className="relative z-10 mt-auto">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 border-t border-white/10"
            >
              <p className="text-sm text-gray-500 leading-relaxed italic">
                {service.details}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Barra de estado estética */}
        <div className={`mt-6 h-[2px] transition-all duration-700 ${isHovered ? 'w-full bg-qualtop-orange' : 'w-10 bg-white/20'}`} />
      </div>

      {/* Glow ambiental */}
      <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-qualtop-orange/5 blur-[60px] rounded-full transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
    </motion.div>
  );
};

export default function ServicesSection() {
  return (
    <section className="relative py-32 bg-black overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header minimalista */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-4">
             <div className="h-2 w-2 rounded-full bg-qualtop-orange animate-pulse" />
             <p className="text-qualtop-orange font-bold tracking-[0.4em] text-[10px] uppercase">
               Core Expertise
             </p>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-tight">
            Pilares de <span className="text-qualtop-orange">Innovación.</span>
          </h2>
        </div>

        {/* Grid de Información */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <InfoCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}