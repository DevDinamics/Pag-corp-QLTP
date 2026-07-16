import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, ArrowDown, Mail, Clock, FileText } from 'lucide-react';

export default function PoliticaSeguridad() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const scrollToCompromiso = (e) => {
    e.preventDefault();
    const element = document.getElementById('compromiso');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
    }
  };

  return (
    <section className="relative bg-[#050505] font-sans text-white overflow-hidden min-h-screen">
      
      {/* Fondo Decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none z-0">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,#FF4D00,transparent_60%)] blur-[150px] opacity-30" />
      </div>

      {/* --- HEADER HERO --- */}
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Seguridad de la Información</span>
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
              Explorar Política 
              <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>

        </div>
      </div>

      {/* --- SECCIÓN PRINCIPAL --- */}
      <div id="compromiso" className="relative z-10 max-w-4xl mx-auto px-6 pb-32 pt-10 scroll-mt-24 space-y-8">
        
        {/* Intro Card: Objetivo y Alcance */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Shield size={250} />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-4 relative z-10 text-white">
            <AlertTriangle className="text-qualtop-orange" size={32} /> Objetivo
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light mb-10 relative z-10">
            Establecer la política de seguridad de la información de la organización Qualtop, S.A. de C.V., en alineación con su propósito, a fin de proporcionar un marco de referencia para la formulación de objetivos de seguridad, garantizar el cumplimiento de los requisitos aplicables y reafirmar el compromiso con la mejora continua del sistema de gestión de seguridad de la información.
          </p>

          <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-4 relative z-10 text-white">
            Alcance
          </h3>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light relative z-10">
            Dicha política abarca todas las áreas de la organización que participen en el Sistema de Gestión Integrado.
          </p>
        </motion.div>

        {/* Tarjeta: Descripción */}
        <motion.div 
          {...fadeIn}
          className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-4 relative z-10 text-white">
            <FileText className="text-qualtop-orange" size={28} /> Descripción
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light relative z-10">
            En la organización nos comprometemos a preservar y proteger la información contra amenazas internas y externas, mediante procesos de evaluación de riesgos, mejora continua, objetivos de seguridad de la información y aspectos legales, asegurando la disponibilidad, integridad y confidencialidad de los activos de la información.
          </p>
        </motion.div>

        {/* Contacto Directo */}
        <motion.div 
          {...fadeIn}
          className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10"
        >
          <p className="text-gray-400 font-medium text-lg">¿Solicitudes sobre privacidad o Derechos ARCO?</p>
          <a href="mailto:privacidad@qualtop.com" className="flex items-center gap-3 bg-[#111] border border-white/10 hover:border-qualtop-orange px-8 py-4 rounded-xl transition-all group shadow-md">
            <Mail className="text-gray-500 group-hover:text-qualtop-orange transition-colors" size={24} />
            <span className="text-white font-medium text-lg">privacidad@qualtop.com</span>
          </a>
        </motion.div>

        {/* FECHA DE ACTUALIZACIÓN */}
        <motion.div 
          {...fadeIn}
          className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-16"
        >
          <Clock size={16} />
          <span>Última actualización: 09/06/2026</span>
        </motion.div>              
        
      </div>
    </section>
  );
}