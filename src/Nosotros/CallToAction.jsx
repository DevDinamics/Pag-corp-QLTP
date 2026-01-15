import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CallToActionClean() {
  return (
    <section className="relative py-32 px-6 flex items-center justify-center bg-[#050505] overflow-hidden">
      
      {/* 1. FONDO AMBIENTAL SUTIL */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
             animate={{ 
               opacity: [0.2, 0.4, 0.2], 
               scale: [1, 1.1, 1] 
             }}
             transition={{ 
               duration: 8, 
               repeat: Infinity, 
               ease: "easeInOut" 
             }}
             className="w-[800px] h-[400px] bg-qualtop-orange/20 blur-[150px] rounded-full"
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        
        {/* 2. TEXTO PRINCIPAL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[1.1] mb-10">
            Si buscas un lugar donde tu <span className="text-gray-400">código</span>, tus <span className="text-gray-400">ideas</span> y tu <span className="text-qualtop-orange font-bold">energía</span> marquen la diferencia.
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 font-light mb-16">
            Este es tu lugar.
          </p>
        </motion.div>

        {/* 3. BOTÓN CORREGIDO */}
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            {/* NOTA: 'to="/contacto"' asume que esa es la URL que definiste 
               en tu App.jsx para la página de contacto. 
            */}
            <Link 
              to="/contact-home" 
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-qualtop-orange rounded-full text-xl font-bold text-white uppercase tracking-widest transition-all duration-300 hover:bg-[#ff5f1a] hover:scale-105 hover:shadow-[0_10px_40px_-10px_rgba(255,77,0,0.5)]"
            >
              <span>Postúlate Ahora</span>
              <ArrowRight size={24} className="transition-transform duration-300 group-hover:translate-x-2" strokeWidth={3} />
            </Link>
            
            <p className="mt-8 text-gray-500 text-sm font-mono uppercase tracking-[0.2em]">
              Qualtop Careers // Join Us
            </p>
        </motion.div>

      </div>
    </section>
  );
}