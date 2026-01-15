import React from 'react';
import { motion } from 'framer-motion'; // Importamos motion
import { ShieldCheck, LineChart, Clock, Zap } from 'lucide-react';

const benefits = [
  {
    id: 1,
    title: "Reducción de Riesgos",
    description: "Minimiza puntos únicos de fallo y vulnerabilidades en sistemas legacy.",
    icon: <ShieldCheck size={28} />,
  },
  {
    id: 2,
    title: "Eficiencia Operativa",
    description: "Automatiza procesos manuales y reduce tiempos de respuesta.",
    icon: <Clock size={28} />,
  },
  {
    id: 3,
    title: "Toma de Decisiones",
    description: "Visibilidad en tiempo real para decisiones basadas en datos.",
    icon: <LineChart size={28} />,
  },
  {
    id: 4,
    title: "Innovación Acelerada",
    description: "Libera recursos para enfocarse en nuevas iniciativas de negocio.",
    icon: <Zap size={28} />,
  }
];

// --- VARIANTES DE ANIMACIÓN (Framer Motion) ---

// Variante para el contenedor: controla el "stagger" (retraso en cascada)
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Cada hijo aparecerá 0.15s después del anterior
      delayChildren: 0.5,    // Retraso inicial antes de empezar
    }
  }
};

// Variante para cada tarjeta (Hijo)
const item = {
  hidden: { opacity: 0, y: 50, scale: 0.9 }, // Empieza más abajo y pequeño
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", // Tipo de física
      stiffness: 100, // Rigidez del resorte
      damping: 15,    // Amortiguación (para que no rebote demasiado)
      duration: 0.6
    } 
  }
};

export default function BenefitsSection() {
  return (
    <section className="relative w-full bg-[#050505] py-32 px-6 border-t border-white/5 overflow-hidden">
      
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-qualtop-orange/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER DE SECCIÓN ANIMADO */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20"
        >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Diseñamos soluciones que llegan a producción en entornos  <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-qualtop-orange ">
                    reales y complejos.
                </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Más allá de la tecnología, entregamos impacto medible en los indicadores clave del negocio.
            </p>
        </motion.div>

        {/* --- GRID DE BENEFICIOS CON ANIMACIÓN STAGGER --- */}
        <motion.div 
          variants={container} // Aplicamos las variantes del contenedor
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={item} // Aplicamos las variantes del ítem
              // Animación al hacer HOVER en la tarjeta
              whileHover={{ 
                scale: 1.03, // Crece ligeramente
                transition: { duration: 0.2 }
              }}
              className="group relative p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden transition-all duration-300 hover:border-qualtop-orange/50 hover:shadow-[0_10px_40px_-10px_rgba(255,77,0,0.2)]"
            >
              
              {/* Degradado de fondo que aparece al hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-qualtop-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Contenedor del Icono */}
                <div className="mb-6 p-4 rounded-xl bg-white/5 text-qualtop-orange w-fit border border-white/5 transition-all duration-300 group-hover:bg-qualtop-orange/20 group-hover:border-qualtop-orange/30 group-hover:scale-110 group-hover:-rotate-3">
                  {benefit.icon}
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 transition-colors group-hover:text-qualtop-orange">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}