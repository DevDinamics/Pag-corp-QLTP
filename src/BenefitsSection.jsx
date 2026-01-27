import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, LineChart, Clock, Zap } from 'lucide-react';

const benefits = [
  {
    id: 1,
    title: "Reducción de Riesgos",
    tagline: "SEGURIDAD BLINDADA",
    description: "Eliminamos vulnerabilidades críticas en sistemas legacy, asegurando operación continua.",
    icon: <ShieldCheck size={40} />, 
  },
  {
    id: 2,
    title: "Eficiencia Operativa",
    tagline: "VELOCIDAD PURA",
    description: "Automatización inteligente que reduce tiempos de proceso de días a minutos.",
    icon: <Clock size={40} />,
  },
  {
    id: 3,
    title: "Toma de Decisiones",
    tagline: "DATA REAL",
    description: "Transformamos terabytes de datos oscuros en estrategia de negocio clara y accionable.",
    icon: <LineChart size={40} />,
  },
  {
    id: 4,
    title: "Innovación Acelerada",
    tagline: "TIME-TO-MARKET",
    description: "Desbloqueamos deuda técnica para lanzar nuevos productos hoy, no el próximo año.",
    icon: <Zap size={40} />,
  }
];

export default function BenefitsSection() {
  return (
    <section className="relative w-full bg-[#050505] py-24 px-6 overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER CENTRADO (Como en la imagen) --- */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
           >
             Diseñamos soluciones que llegan a producción <br className="hidden md:block"/>
             en entornos <span className="text-gray-400">reales y complejos.</span>
           </motion.h2>
        </div>

        {/* --- GRID CON DIVISORES VERTICALES --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, index) => (
            <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative px-6 py-8 md:py-0 group
                  /* Lógica de Bordes: */
                  /* En Desktop (lg): Borde a la izquierda, excepto el primero */
                  ${index !== 0 ? 'lg:border-l lg:border-qualtop-orange' : ''}
                  /* En Tablet (md): Borde a la izquierda en los pares (2 y 4) */
                  ${index % 2 !== 0 ? 'md:border-l md:border-qualtop-orange lg:border-l-0' : ''}
                  /* En Móvil: Borde arriba excepto el primero (para separar verticalmente) */
                  ${index !== 0 ? 'border-t border-qualtop-orange/30 md:border-t-0' : ''}
                `}
            >
                {/* Icono */}
                <div className="mb-6 text-white group-hover:text-qualtop-orange transition-colors duration-300">
                    {item.icon}
                </div>

                {/* Texto Destacado (Tagline) */}
                <h4 className="text-lg md:text-xl font-bold text-qualtop-orange mb-3">
                    {item.tagline}
                </h4>

                {/* Título y Descripción */}
                <div>
                   <h3 className="text-white font-bold text-lg mb-2 hidden">
                     {item.title} {/* Oculto visualmente si prefieres solo el tagline como en la foto, o puedes descomentarlo */}
                   </h3>
                   <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                     {item.description}
                   </p>
                </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}