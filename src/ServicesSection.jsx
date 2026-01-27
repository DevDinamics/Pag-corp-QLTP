import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Share2, Cpu, ArrowRight } from 'lucide-react';

const services = [
  {
    id: "01",
    title: "Reducción de Riesgos",
    desc: "Blindaje de sistemas críticos.",
    details: "Arquitectura de seguridad activa y redundancia de datos para asegurar continuidad operativa 24/7.",
    icon: <ShieldAlert size={24} />,
  },
  {
    id: "02",
    title: "Interconexión Total",
    desc: "Eliminación de silos de datos.",
    details: "Unificamos plataformas legacy con arquitecturas modernas para un flujo de información en tiempo real.",
    icon: <Share2 size={24} />,
  },
  {
    id: "03",
    title: "Inteligencia Artificial",
    desc: "Decisiones automatizadas.",
    details: "Modelos predictivos que transforman datos crudos en estrategias de negocio escalables.",
    icon: <Cpu size={24} />,
  }
];

const ServiceNode = ({ service, index, isHovered, onHover, onLeave }) => {
  return (
    <div 
      className="relative pl-16 md:pl-24 py-8 group cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* --- LÍNEA VERTICAL CONECTORA (Circuit Line) --- */}
      {/* Solo se muestra si no es el último elemento para conectar con el siguiente */}
      {index !== services.length - 1 && (
        <div className="absolute left-[27px] md:left-[35px] top-16 bottom-0 w-[2px] bg-white/10 overflow-hidden">
            <motion.div 
                initial={{ y: '-100%' }}
                animate={{ y: isHovered ? '100%' : '-100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-full h-1/2 bg-gradient-to-b from-transparent via-qualtop-orange to-transparent opacity-50"
            />
        </div>
      )}

      {/* --- EL NODO (ICONO) --- */}
      <div className={`absolute left-0 top-8 w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-500 ${
        isHovered 
          ? 'bg-[#050505] border-qualtop-orange text-qualtop-orange shadow-[0_0_30px_rgba(255,77,0,0.6)] scale-110' 
          : 'bg-[#0a0a0a] border-white/10 text-gray-500'
      }`}>
        {service.icon}
      </div>

      {/* --- CONTENIDO --- */}
      <div className="relative z-10">
        
        {/* Número de fondo (Decorativo) */}
        <span className={`absolute -top-6 -left-4 text-6xl md:text-8xl font-bold opacity-[0.03] select-none transition-colors duration-500 font-mono ${isHovered ? 'text-qualtop-orange' : 'text-white'}`}>
            {service.id}
        </span>

        <h3 className={`text-2xl md:text-4xl font-bold transition-colors duration-300 mb-2 flex items-center gap-4 ${isHovered ? 'text-white' : 'text-gray-400'}`}>
          {service.title}
          <motion.span 
            animate={{ x: isHovered ? 10 : 0, opacity: isHovered ? 1 : 0 }}
            className="text-qualtop-orange hidden md:block"
          >
            <ArrowRight size={24} />
          </motion.span>
        </h3>

        <p className="text-lg text-gray-400 max-w-xl mb-4">
          {service.desc}
        </p>

        {/* Detalles Expandibles (Sin bordes, solo texto puro) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0, x: -20 }}
              animate={{ opacity: 1, height: 'auto', x: 0 }}
              exit={{ opacity: 0, height: 0, x: -20 }}
              className="overflow-hidden"
            >
              <div className="pl-4 border-l-2 border-qualtop-orange/50 py-1">
                 <p className="text-base text-gray-300 leading-relaxed max-w-2xl">
                    {service.details}
                 </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Luz ambiental al hacer hover */}
      {isHovered && (
         <div className="absolute top-1/2 left-1/4 w-[400px] h-[200px] bg-qualtop-orange/5 blur-[80px] rounded-full pointer-events-none -translate-y-1/2" />
      )}
    </div>
  );
};

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative py-32 bg-[#050505] overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header a la izquierda */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* TÍTULO FIJO LATERAL (Sticky en Desktop) */}
            <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-[2px] w-12 bg-qualtop-orange" />
                        <span className="text-qualtop-orange font-bold tracking-[0.3em] text-xs uppercase">Core Solutions</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
                        Ingeniería <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Invisible.</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        No vendemos software. Construimos la columna vertebral digital que permite a la banca escalar sin romperse.
                    </p>
                </div>
            </div>

            {/* LISTA DE NODOS (Circuito) */}
            <div className="lg:col-span-8 space-y-4">
                {services.map((service, index) => (
                    <ServiceNode 
                        key={index} 
                        service={service} 
                        index={index}
                        isHovered={hoveredIndex === index}
                        onHover={() => setHoveredIndex(index)}
                        onLeave={() => setHoveredIndex(null)}
                    />
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}