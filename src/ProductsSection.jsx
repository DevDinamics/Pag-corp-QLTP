import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Server, BarChart3, Activity, Zap } from 'lucide-react';
import logoDecode from './assets/Services-logos/decode.svg';
import logoDoma from './assets/Services-logos/Logo_doma.png';
import logoLooker from './assets/Services-logos/looker1.svg';
import logoQopa from './assets/Services-logos/qopa.svg';

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

const servicesIA = [
  { 
    id: 'decode',
    logo: logoDecode, 
    title: "DeCode", 
    desc: "Digitalización rápida de procesos internos.",
    bgGradient: "hover:bg-blue-900/10"
  },
  { 
    id: 'doma',
    logo: logoDoma, 
    title: "Doma", 
    desc: "Motor de automatización impulsado por la inteligencia de QOPA.",
    bgGradient: "hover:bg-indigo-900/10"
  },
  { 
    id: 'looker',
    logo: logoLooker, 
    title: "Looker", 
    desc: "Visibilidad y control de desempeño.",
    bgGradient: "hover:bg-emerald-900/10"
  }
];

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState('tech'); 
  const location = useLocation();
  const navigate = useNavigate();

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
    <section id="servicios" className="relative py-24 bg-[#020202] overflow-hidden">
      
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
            <span className="block mt-4 text-gray-500">donde fallar no es opción.</span>
          </h3>
        </div>

        {/* --- TOGGLE BUTTONS --- */}
        <div className="flex justify-center mb-20">
          <div className="bg-[#0a0a0a] p-1.5 rounded-2xl flex relative w-full max-w-lg border border-white/10 shadow-2xl">
            <motion.div 
              className="absolute top-1.5 bottom-1.5 bg-[#E63B11] rounded-xl shadow-[0_0_20px_rgba(230,59,17,0.3)] z-0"
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
            
            {/* ================= PESTAÑA: MODERNIZACIÓN TECNOLÓGICA ================= */}
            {activeTab === 'tech' && (
              <motion.div
                key="tech"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <div className="text-center mb-12">
                   <h4 className="text-3xl font-bold text-qualtop-orange mb-4">Infraestructura Robusta & Escalable</h4>
                   <p className="text-gray-400 max-w-2xl mx-auto">Intervenimos sistemas críticos, datos y arquitectura para reducir riesgo, habilitar decisiones y acelerar innovación sin comprometer la operación.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
                  {servicesTech.map((item, i) => (
                    <div key={i} className="group p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-qualtop-orange/30 transition-all duration-300 hover:bg-[#0f0f0f] relative overflow-hidden">
                      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-qualtop-orange/10 blur-[60px] rounded-full group-hover:bg-qualtop-orange/20 transition-all duration-500" />
                      <div className="relative z-10">
                        <div className="w-14 h-14 rounded-xl bg-[#111] border border-white/10 flex items-center justify-center text-white mb-6 group-hover:text-qualtop-orange group-hover:border-qualtop-orange/30 transition-all shadow-lg">
                            {React.cloneElement(item.icon, { size: 28 })}
                        </div>
                        <h5 className="text-xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform">{item.title}</h5>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ================= PESTAÑA: SOLUCIONES IA (DISEÑO BENTO GRID) ================= */}
            {activeTab === 'ia' && (
              <motion.div
                key="ia"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center w-full"
              >
                
                {/* GRID BENTO: QOPA A LA IZQ, TARJETITAS A LA DER */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
                  
                  {/* TARJETA PRINCIPAL: QOPA */}
                  <motion.div 
                    whileHover={{ scale: 0.99 }}
                    transition={{ duration: 0.3 }}
                    className="lg:col-span-7 relative h-[450px] lg:h-[500px] rounded-[2rem] overflow-hidden border border-white/10 group cursor-pointer flex flex-col justify-between p-10 md:p-14"
                    style={{ background: 'linear-gradient(145deg, rgba(35,12,0,1) 0%, rgba(10,10,10,1) 100%)' }} // Fondo cálido premium
                  >
                    {/* Resplandor de fondo animado */}
                    <div className="absolute top-0 left-0 w-full h-full bg-qualtop-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative z-10">
                       <div className="h-16 md:h-20 mb-8">
                         {/* Logo de QOPA */}
                         <img src={logoQopa} alt="QOPA" className="h-full w-auto object-contain" />
                       </div>
                       <h5 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">QOPA</h5>
                       <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-md font-medium">
                         IA aplicada a análisis, decisión y recomendación en entornos complejos.
                       </p>
                    </div>
                    
                    <Link 
                       to="https://qopa.ai/#inicio" 
                       className="flex items-center gap-3 text-[#E63B11] font-bold uppercase tracking-[0.2em] text-sm group-hover:gap-5 transition-all w-fit relative z-20"
                    >
                       CONOCE MÁS <ArrowRight size={18} strokeWidth={2.5} />
                    </Link>
                  </motion.div>

                  {/* TARJETAS SECUNDARIAS (DeCode, Doma, Looker) */}
                  <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                    {servicesIA.map((item, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className={`relative h-[240px] lg:h-auto rounded-[2rem] overflow-hidden border border-white/5 bg-[#0a0a0a] flex flex-col p-8 justify-between transition-colors duration-500 ${item.bgGradient}`}
                      >
                         <div className="relative z-10 h-14 mb-4">
                            
                            <img src={item.logo} alt={item.title} className="h-full w-auto object-contain opacity-90" />
                         </div>
                         
                         <div className="relative z-10">
                            <h5 className="text-2xl font-bold text-white mb-3">{item.title}</h5>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                         </div>
                      </motion.div>
                    ))}
                  </div>

                </div>

                {/* BOTÓN CTA INFERIOR */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="w-full flex justify-center"
                >
                  <button 
                    onClick={() => navigate('/contact-home')}
                    className="bg-[#E63B11] hover:bg-[#ff4d00] text-white font-bold py-5 px-12 rounded-xl text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_30px_rgba(230,59,17,0.2)] hover:shadow-[0_0_50px_rgba(230,59,17,0.5)] active:scale-95 flex items-center gap-4"
                  >
                    HABLEMOS SOBRE TU CASO <ArrowRight size={20} strokeWidth={2.5} />
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