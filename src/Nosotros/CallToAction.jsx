import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CallToActionClean() {
  return (
    <section className="relative py-20 md:py-32 px-6 flex items-center justify-center bg-[#050505] overflow-hidden min-h-[50vh]">
      
      {/* 1. FONDO AMBIENTAL RESPONSIVO */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
             animate={{ 
               opacity: [0.2, 0.4, 0.2], 
               scale: [0.8, 1.1, 0.8] 
             }}
             transition={{ 
               duration: 8, 
               repeat: Infinity, 
               ease: "easeInOut" 
             }}
             // Ajuste: En móvil es más pequeño (300px), en desktop grande (800px)
             className="w-[300px] h-[300px] md:w-[800px] md:h-[400px] bg-qualtop-orange/20 blur-[80px] md:blur-[150px] rounded-full"
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
          {/* Tipografía ajustada para que no grite en móvil */}
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[1.2] md:leading-[1.1] mb-6 md:mb-10">
            Si buscas un lugar donde tu <span className="text-gray-500 md:text-gray-400">código</span>, tus <span className="text-gray-500 md:text-gray-400">ideas</span> y tu <span className="text-qualtop-orange font-bold">energía</span> marquen la diferencia.
          </h2>
          <p className="text-xl md:text-3xl text-gray-300 font-light mb-12 md:mb-16">
            Este es tu lugar.
          </p>
        </motion.div>

        {/* 3. BOTÓN RESPONSIVO */}
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            <Link 
              to="/contact-home" 
              // Ajuste de padding: px-8 en móvil, px-12 en desktop
              className="group relative inline-flex items-center justify-center gap-3 md:gap-4 px-8 py-4 md:px-12 md:py-6 bg-qualtop-orange rounded-full text-lg md:text-xl font-bold text-white uppercase tracking-widest transition-all duration-300 hover:bg-[#ff5f1a] hover:scale-105 hover:shadow-[0_10px_40px_-10px_rgba(255,77,0,0.5)] w-full md:w-auto"
            >
              <span>Postúlate Ahora</span>
              {/* Icono responsivo */}
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-2" strokeWidth={3} />
            </Link>
            
            <p className="mt-8 text-gray-600 text-[10px] md:text-sm font-mono uppercase tracking-[0.2em]">
              Qualtop Careers // Join Us
            </p>
        </motion.div>

      </div>
    </section>
  );
}