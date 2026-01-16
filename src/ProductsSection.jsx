import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Server, BarChart3, Activity, Zap, BrainCircuit } from 'lucide-react';

// --- DATOS MODERNIZACIÓN (Tech) ---
const servicesTech = [
  { 
    icon: <Server />, 
    title: "Sistemas Core", 
    desc: "Reducimos el riesgo operativo de sistemas core sin detener la operación." 
  },
  { 
    icon: <BarChart3 />, 
    title: "Data Driven", 
    desc: "Habilitamos decisiones ejecutivas confiables basadas en datos gobernados." 
  },
  { 
    icon: <Activity />, 
    title: "Continuidad", 
    desc: "Aseguramos continuidad operativa frente a picos, fallas y auditorías." 
  },
  { 
    icon: <Zap />, 
    title: "Innovación Ágil", 
    desc: "Aceleramos la innovación sin comprometer estabilidad ni regulación." 
  }
];

// --- DATOS IA (Complementarios a QOPA) ---
const servicesIA = [
  { 
    id: 'decode',
    logo: "https://qualtop.com/wp-content/uploads/2025/11/decode.svg", 
    title: "DeCode", 
    desc: "Digitalización rápida de procesos internos.",
    bgGradient: "from-blue-500/10 to-cyan-900/10"
  },
  { 
    id: 'cloudia',
    logo: "https://qualtop.com/wp-content/uploads/2025/11/qloudia.svg", 
    title: "Cloudia", 
    desc: "Automatización inteligente en la nube.",
    bgGradient: "from-indigo-500/10 to-blue-900/10"
  },
  { 
    id: 'looker',
    logo: "https://qualtop.com/wp-content/uploads/2025/11/looker1.svg", 
    title: "Looker", 
    desc: "Visibilidad y control de desempeño.",
    bgGradient: "from-emerald-500/10 to-green-900/10"
  }
];

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState('tech'); 
  const location = useLocation();
  const navigate = useNavigate();

  // Escuchar Hash de URL
  useEffect(() => {
    if (location.hash === '#modernizacion') {
      setActiveTab('tech');
      document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
    } else if (location.hash === '#ia') {
      setActiveTab('ia');
      document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  return (
    <section id="servicios" className="relative py-24 bg-[#000000] overflow-hidden">
      
      {/* Anclas invisibles */}
      <div id="modernizacion" className="absolute top-20" />
      <div id="ia" className="absolute top-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ENCABEZADO */}
<div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-qualtop-orange font-bold tracking-[0.2em] uppercase text-sm mb-4">
            Nuestras Capacidades
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white leading-normal">
            Capacidades clave para organizaciones
            {/* CORRECCIÓN: 'block' baja el texto y 'mt-4' lo separa del de arriba */}
            <span className="block mt-4 text-gray-500">donde fallar no es opción.</span>
          </h3>
        </div>

        {/* --- TOGGLE BUTTONS --- */}
        <div className="flex justify-center mb-20">
          <div className="bg-[#111] p-1.5 rounded-2xl flex relative w-full max-w-lg border border-white/10 shadow-2xl">
            <motion.div 
              className="absolute top-1.5 bottom-1.5 bg-qualtop-orange rounded-xl shadow-lg z-0"
              initial={false}
              animate={{ x: activeTab === 'tech' ? 0 : '100%', width: '50%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button onClick={() => setActiveTab('tech')} className={`relative z-10 w-1/2 py-4 text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors duration-300 ${activeTab === 'tech' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}>
              <span className="leading-tight">Modernización<br/>Tecnológica</span>
            </button>
            <button onClick={() => setActiveTab('ia')} className={`relative z-10 w-1/2 py-4 text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors duration-300 ${activeTab === 'ia' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}>
              <span className="leading-tight">Soluciones<br/>de Negocio con IA</span>
            </button>
          </div>
        </div>

        {/* --- CONTENIDO --- */}
        <div className="min-h-[600px]">
          <AnimatePresence mode='wait'>
            
            {/* ==============================================
                PESTAÑA 1: MODERNIZACIÓN (TECH) - SIN BOTÓN
               ============================================== */}
            {activeTab === 'tech' ? (
              <motion.div
                key="tech"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <div className="text-center mb-12">
                   <h4 className="text-3xl font-bold text-qualtop-orange mb-4">Infraestructura Robusta & Escalable</h4>
                   <p className="text-gray-400 max-w-2xl mx-auto">Transformamos sistemas heredados en arquitecturas modernas, seguras y listas para el futuro digital.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
                  {servicesTech.map((item, i) => (
                    <div key={i} className="group p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-qualtop-orange/50 transition-all duration-300 hover:bg-[#111] relative overflow-hidden">
                      {/* Efecto Glow en Hover */}
                      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-qualtop-orange/10 blur-[60px] rounded-full group-hover:bg-qualtop-orange/20 transition-all duration-500" />
                      
                      <div className="relative z-10">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center text-white mb-6 group-hover:text-qualtop-orange group-hover:border-qualtop-orange/30 transition-all shadow-lg">
                            {React.cloneElement(item.icon, { size: 28 })}
                        </div>
                        <h5 className="text-xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform">{item.title}</h5>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* AQUÍ ELIMINAMOS EL BOTÓN QUE ESTABA ANTES */}

              </motion.div>
            ) : (
              
              /* ==============================================
                 PESTAÑA 2: IA 
                 ============================================== */
              <motion.div
                key="ia"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <div className="text-center mb-16">
                   <h4 className="text-3xl md:text-4xl font-bold text-qualtop-orange mb-4">
                     IA aplicada a decisiones, eficiencia y control.
                   </h4>
                   <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                     Plataformas diseñadas para resolver retos específicos en entornos complejos.
                   </p>
                </div>

                {/* LAYOUT ASIMÉTRICO: QOPA GRANDE + GRID DE OTROS */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
                  
                  {/* QOPA: TARJETA HERO */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="lg:col-span-6 relative h-[450px] lg:h-[500px] rounded-3xl overflow-hidden border border-qualtop-orange/30 bg-[#0a0a0a] group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-black to-black opacity-100 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-qualtop-orange/20 blur-[100px] rounded-full" />
                    
                    <div className="absolute inset-0 p-10 md:p-12 flex flex-col justify-between z-10">
                       <div>
                          <div className="h-24 mb-6">
                            <img src="https://qualtop.com/wp-content/uploads/2025/11/qopa.svg" alt="QOPA" className="h-full w-auto object-contain" />
                          </div>
                          <h5 className="text-4xl font-bold text-white mb-4">QOPA</h5>
                          <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                            Nuestra IA insignia aplicada a análisis profundo, toma de decisiones estratégicas y recomendación en tiempo real.
                          </p>
                       </div>
                       
                       <div className="flex items-center gap-3 text-qualtop-orange font-bold uppercase tracking-widest text-sm group-hover:gap-5 transition-all">
                          Conoce más <ArrowRight size={20} />
                       </div>
                    </div>
                  </motion.div>

                  {/* OTROS PRODUCTOS: GRID 2x2 */}
                  <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                    {servicesIA.map((item, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        className="relative h-[240px] lg:h-auto rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] group flex flex-col p-6 justify-between"
                      >
                         <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                         
                         <div className="relative z-10 h-12 mb-4">
                            <img src={item.logo} alt={item.title} className="h-full w-auto object-contain" />
                         </div>
                         
                         <div className="relative z-10">
                            <h5 className="text-xl font-bold text-white mb-2">{item.title}</h5>
                            <p className="text-gray-400 text-xs leading-relaxed group-hover:text-white transition-colors">{item.desc}</p>
                         </div>
                      </motion.div>
                    ))}
                    
                    {/* Tarjeta Extra */}
                    <motion.div 
                      whileHover={{ y: -5 }}
                      onClick={() => navigate('/contact-home')}
                      className="relative h-[240px] lg:h-auto rounded-2xl overflow-hidden border border-dashed border-white/10 bg-transparent group flex flex-col p-6 justify-center items-center text-center cursor-pointer hover:border-qualtop-orange/50 hover:bg-white/[0.02] transition-all"
                    >
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 mb-4 group-hover:text-qualtop-orange group-hover:bg-qualtop-orange/10 transition-colors">
                           <BrainCircuit size={24} />
                        </div>
                        <p className="text-white font-bold text-sm">¿Necesitas algo a la medida?</p>
                        <p className="text-gray-500 text-xs mt-2">Creamos soluciones de IA personalizadas.</p>
                    </motion.div>
                  </div>
                </div>

                {/* BOTÓN CTA EXCLUSIVO IA */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                >
                  <button 
                    onClick={() => navigate('/contact-home')}
                    className="bg-qualtop-orange hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-lg text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,77,0,0.5)] active:scale-95 flex items-center gap-3"
                  >
                    Hablemos sobre tu caso <ArrowRight size={18} />
                  </button>
                </motion.div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}