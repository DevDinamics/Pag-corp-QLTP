import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Server, Lock, AlertTriangle, ArrowDown, Mail } from 'lucide-react';

export default function PoliticaSeguridad() {
  const pilares = [
    {
      icon: <Server size={32} className="text-qualtop-orange" />,
      title: "Disponibilidad",
      desc: "Garantizamos el acceso a los activos de información en todo momento."
    },
    {
      icon: <Shield size={32} className="text-qualtop-orange" />,
      title: "Integridad",
      desc: "Protegemos la exactitud y totalidad de la información."
    },
    {
      icon: <Lock size={32} className="text-qualtop-orange" />,
      title: "Confidencialidad",
      desc: "Aseguramos que la información solo sea accesible para personal autorizado."
    }
  ];

  // Función para el efecto de scroll suave "Pro"
  const scrollToCompromiso = (e) => {
    e.preventDefault();
    const element = document.getElementById('compromiso');
    if (element) {
      // 'start' alinea la sección justo debajo de tu Navbar
      element.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
    }
  };

  return (
    <section className="relative bg-[#050505] font-sans text-white overflow-hidden">
      
      {/* Fondo Decorativo tipo "Escudo" centrado */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none z-0">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,#FF4D00,transparent_60%)] blur-[150px] opacity-30" />
      </div>

      {/* --- HEADER HERO (100% ALTO DE PANTALLA) --- */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 pb-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[2px] w-8 md:w-16 bg-qualtop-orange" />
            <span className="text-qualtop-orange font-bold tracking-[0.3em] text-xs md:text-sm uppercase">Compliance</span>
            <div className="h-[2px] w-8 md:w-16 bg-qualtop-orange" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-10"
          >
            Política Organizacional de <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Seguridad de la Información.</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button 
              onClick={scrollToCompromiso}
              className="group flex items-center gap-3 bg-qualtop-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(255,77,0,0.3)] hover:shadow-[0_0_40px_rgba(255,77,0,0.5)] hover:scale-105"
            >
              Saber más 
              {/* Cambiamos la flecha por ArrowDown y la animamos hacia abajo en el hover */}
              <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>

        </div>
      </div>

      {/* --- SECCIÓN DE COMPROMISO --- */}
      <div id="compromiso" className="relative z-10 max-w-6xl mx-auto px-6 pb-32 pt-10 scroll-mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Shield size={250} />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-4 relative z-10 text-white">
            <AlertTriangle className="text-qualtop-orange" size={36} /> Nuestro Compromiso
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-16 relative z-10 max-w-4xl">
            En <strong className="text-white font-semibold">Qualtop</strong> nos comprometemos a preservar y proteger la información contra amenazas internas y externas, mediante procesos de evaluación de riesgos, mejora continua, objetivos de seguridad y aspectos legales.
          </p>

          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-16 relative z-10 max-w-4xl">
            En la organización nos comprometemos a preservar y proteger la información contra amenazas internas y externas, mediante procesos de evaluación de riesgos, mejora continua, objetivos de seguridad de la información y aspectos legales, asegurando la disponibilidad, integridad y confidencialidad de los activos de la información.
          </p>

          {/* Grid de Pilares de Seguridad */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 border-t border-white/10 pt-16">
            {pilares.map((pilar, i) => (
              <div key={i} className="bg-[#0f0f0f] border border-white/5 p-8 rounded-2xl hover:border-qualtop-orange/50 transition-all duration-300 hover:-translate-y-2 group shadow-lg">
                <div className="mb-6 p-4 bg-white/5 rounded-2xl inline-block group-hover:bg-qualtop-orange/10 transition-colors">
                  {pilar.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{pilar.title}</h3>
                <p className="text-gray-400 leading-relaxed">{pilar.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Contacto directo */}
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <p className="text-gray-400 font-medium text-lg">¿Tienes dudas sobre nuestra gestión de datos?</p>
            <a href="mailto:info@qualtop.com" className="flex items-center gap-3 bg-[#111] border border-white/10 hover:border-qualtop-orange px-8 py-4 rounded-xl transition-all group shadow-md">
              <Mail className="text-gray-500 group-hover:text-qualtop-orange transition-colors" size={24} />
              <span className="text-white font-medium text-lg">info@qualtop.com</span>
            </a>
          </div>

        </motion.div>
      </div>

    </section>
  );
}