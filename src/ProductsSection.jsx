import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const data = {
  modernizacion: {
    subtitle: "Intervenimos sistemas críticos, datos y arquitectura para reducir riesgo, habilitar decisiones y acelerar innovación sin comprometer la operación.",
    cards: [
      { title: "Reducimos el riesgo operativo de sistemas core sin detener la operación.", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000" },
      { title: "Habilitamos decisiones ejecutivas confiables basadas en datos gobernados.", img: "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=1000" },
      { title: "Aseguramos continuidad operativa frente a picos, fallas y auditorías.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000" },
      { title: "Aceleramos la innovación sin comprometer estabilidad ni regulación.", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000" }
    ]
  },
  ia: {
    subtitle: "IA aplicada a decisiones, eficiencia y control operativo.",
    description: "Plataformas de IA diseñadas para resolver retos específicos de operación, decisión y eficiencia en entornos complejos y regulados.",
    cards: [
      { 
        logo: "https://qualtop.com/wp-content/uploads/2025/11/qopa.svg", 
        title: "QOPA", 
        desc: "IA aplicada a análisis, decisión y recomendación en entornos complejos.",
        isPotenciada: true 
      },
      { 
        logo: "https://qualtop.com/wp-content/uploads/2025/11/decode.svg", 
        title: "DeCode", 
        desc: "Digitalización rápida de procesos internos sin fricción operativa." 
      },
      { 
        logo: "https://qualtop.com/wp-content/uploads/2025/11/qloudia.svg", 
        title: "Qloudia", 
        desc: "Automatización inteligente de procesos críticos en la nube." 
      },
      { 
        logo: "https://qualtop.com/wp-content/uploads/2025/11/looker1.svg", 
        title: "Looker", 
        desc: "Visibilidad ejecutiva y control del desempeño en tiempo real." 
      }
    ]
  }
};

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState('modernizacion');

  return (
    <section className="bg-black py-24 px-6 text-white overflow-hidden min-h-screen relative">
      
      {/* --- CORRECCIÓN DE OFFSET (ANCLA FANTASMA) --- */}
      {/* Este div invisible está 32 unidades (aprox 128px) arriba de la sección real.
          Al recibir el id="servicios", el navegador scrollea aquí, dejando el título visible abajo. */}
      <div id="servicios" className="absolute -top-32 left-0 w-full h-1 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* TÍTULO PRINCIPAL */}
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 tracking-tighter">
          Capacidades clave para organizaciones <br />
          <span className="text-qualtop-orange">donde fallar no es opción.</span>
        </h2>

        {/* SELECTOR DE TABS */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('modernizacion')}
              className={`px-8 py-3 rounded-lg text-xs font-black tracking-widest uppercase transition-all duration-500 ${
                activeTab === 'modernizacion' ? 'bg-qualtop-orange text-white shadow-lg' : 'text-gray-500 hover:text-white'
              }`}
            >
              Modernización Tecnológica
            </button>
            <button
              onClick={() => setActiveTab('ia')}
              className={`px-8 py-3 rounded-lg text-xs font-black tracking-widest uppercase transition-all duration-500 ${
                activeTab === 'ia' ? 'bg-qualtop-orange text-white shadow-lg' : 'text-gray-500 hover:text-white'
              }`}
            >
              Soluciones de negocio con IA
            </button>
          </div>
        </div>

        {/* SUBTÍTULO DINÁMICO */}
        <div className="max-w-4xl mx-auto text-center mb-16 h-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className={`text-2xl font-bold mb-4 transition-colors ${activeTab === 'ia' ? 'text-qualtop-orange' : 'text-white'}`}>
                {activeTab === 'ia' ? data.ia.subtitle : "Capacidades de Infraestructura"}
              </h3>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                {activeTab === 'ia' ? data.ia.description : data.modernizacion.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* GRID DE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data[activeTab].cards.map((card, idx) => (
            <motion.div
              key={activeTab + idx}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative group bg-[#0a0a0a] rounded-xl border border-white/10 p-8 h-[400px] flex flex-col justify-between overflow-hidden hover:border-qualtop-orange/40 transition-all"
            >
              <div className="relative z-10">
                {card.logo && (
                  <div className="h-10 mb-6">
                    <img src={card.logo} alt={card.title} className="h-full w-auto object-contain" />
                  </div>
                )}
                
                {card.isPotenciada && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-qualtop-orange/10 border border-qualtop-orange/20 text-qualtop-orange text-[10px] font-black tracking-widest mb-4">
                    <Sparkles size={10} /> IA POTENCIADA
                  </span>
                )}

                <h3 className="text-xl font-bold leading-snug">{card.title}</h3>
                {card.desc && <p className="text-gray-400 text-sm mt-4">{card.desc}</p>}
              </div>

              {/* IMAGEN DE FONDO */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${card.img || 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000'})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTÓN CTA */}
        {activeTab === 'ia' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 text-center"
          >
            <button className="bg-qualtop-orange hover:bg-orange-600 text-white font-black py-5 px-14 rounded-md shadow-[0_10px_30px_rgba(255,77,0,0.3)] transition-all duration-300 tracking-[0.2em] uppercase text-xs">
              Hablemos sobre tu caso
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}