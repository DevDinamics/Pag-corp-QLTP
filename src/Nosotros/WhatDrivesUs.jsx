import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, Globe, Heart, Users, 
  Zap, Smile, RefreshCw, Fingerprint 
} from 'lucide-react';

export default function WhatDrivesUs() {
  const cards = [
    {
      id: "01",
      icon: Cpu,
      title: "Excelencia Total",
      text: "Excelencia humana y tecnológica. ¿Existe algo más?",
    },
    {
      id: "02",
      icon: Globe,
      title: "Transformación",
      text: "Cada talento Qualtop es transformador y tiene la oportunidad de cambiar el mundo.",
    },
    {
      id: "03",
      icon: Heart,
      title: "Pasión",
      text: "La pasión hace que lo ordinario sea extraordinario. Vive día a día con entusiasmo.",
    },
    {
      id: "04",
      icon: Users,
      title: "Unidad",
      text: "Lo extraordinario sucede cuando juntos comenzamos, juntos progresamos y juntos triunfamos.",
    },
    {
      id: "05",
      icon: Zap,
      title: "Potencial",
      text: "En Qualtop todos podemos desarrollar nuestro máximo potencial. Descubre el tuyo y explótalo.",
    },
    {
      id: "06",
      icon: Smile,
      title: "Hábitos",
      text: "Construye relaciones y hábitos saludables, sé tu propio ejemplo.",
    },
    {
      id: "07",
      icon: RefreshCw,
      title: "Oportunidad",
      text: "En Qualtop un cambio es una oportunidad.",
    },
    {
      id: "08",
      icon: Fingerprint,
      title: "Legado",
      text: "En Qualtop, deja tu marca. Tu trabajo transforma.",
    }
  ];

  return (
    <section className="bg-black py-24 px-6 relative">
      
      {/* Fondo Decorativo Sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full border-x border-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER COMPACTO */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>

            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
              ¿Qué nos <span className="text-qualtop-orange">impulsa?</span>
            </h2>
          </div>
          <div className="hidden md:block">
             <span className="text-xs text-gray-500 font-mono">[ 8 PILARES FUNDAMENTALES ]</span>
          </div>
        </div>

        {/* GRID COMPACTO (4 Columnas en Desktop = Ahorro brutal de espacio vertical) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="group relative h-full bg-white/[0.02] border border-white/5 hover:border-qualtop-orange/50 hover:bg-white/[0.04] p-6 rounded-xl transition-all duration-300 flex flex-col"
            >
              
              {/* Encabezado de la Tarjeta */}
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-white group-hover:bg-qualtop-orange transition-all duration-300">
                  <card.icon size={20} />
                </div>

              </div>

              {/* Contenido */}
              <div className="mt-auto">
                 {/* Título pequeño para escaneo rápido (opcional, extraído del contexto) */}
                 <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide opacity-80 group-hover:opacity-100">
                    {card.title}
                 </h3>
                 <p className="text-sm text-gray-400 font-light leading-relaxed group-hover:text-gray-200 transition-colors">
                   {card.text}
                 </p>
              </div>

              {/* Decoración Hover (Esquina brillante) */}
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-qualtop-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-br-xl" />
              
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}