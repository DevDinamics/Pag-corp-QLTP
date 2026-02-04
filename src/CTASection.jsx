import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, ArrowRight } from 'lucide-react';

export default function CTASection() {

  const scrollToContact = () => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // CAMBIO 1: Padding vertical reducido en móvil (py-16) vs desktop (md:py-24)
    // CAMBIO 2: Padding horizontal ajustado (px-4) para móviles pequeños
    <section className="relative w-full bg-[#050505] py-16 md:py-24 px-4 md:px-6 overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-qualtop-orange group"
        >
          
          {/* --- FONDOS (Sin cambios mayores, solo optimización visual) --- */}
          <div className="absolute inset-0 z-0">
            <motion.img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
              alt="Tech Background" 
              className="w-full h-full object-cover opacity-40"
              animate={{ scale: [1, 1.1] }} 
              transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-qualtop-orange/10 mix-blend-multiply"></div>
            {/* Gradiente extra para asegurar legibilidad en móviles */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
          </div>

          <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-qualtop-orange/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse"></div>

          {/* --- CONTENIDO --- */}
          {/* CAMBIO 3: Padding interno más cómodo en móvil (p-6) vs desktop (p-20) */}
          {/* CAMBIO 4: Gap reducido en móvil (gap-8) */}
          <div className="relative z-10 p-6 sm:p-10 md:p-16 lg:p-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-10">
            
            <div className="max-w-2xl w-full">
              {/* CAMBIO 5: Tamaños de texto escalables (3xl -> 6xl) */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight md:leading-[1.1] mb-4 md:mb-6"
              >
                ¿Tienes un <span className="text-qualtop-orange">reto tecnológico</span> que ya impacta la operación?
              </motion.h2>
              
              {/* CAMBIO 6: Texto base más legible en móvil (text-base) */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-light"
              >
                Analizamos tu contexto operativo y tecnológico para entender si podemos generar <span className="text-white font-semibold">impacto real</span>, sin ruido comercial.
              </motion.p>
            </div>

            {/* --- BOTÓN DE ACCIÓN --- */}
            {/* CAMBIO 7: w-full en el contenedor para que ocupe todo el ancho en móvil */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="w-full md:w-auto flex-shrink-0"
            >
              <button 
                onClick={scrollToContact}
                // CAMBIO 8: w-full en móvil, w-auto en desktop. Padding ajustado. justify-center para centrar contenido en móvil.
                className="w-full md:w-auto group relative bg-qualtop-orange hover:bg-[#ff5e1a] text-white font-bold py-4 md:py-5 px-6 md:px-10 rounded-lg overflow-hidden transition-all duration-300 shadow-[0_0_40px_rgba(255,77,0,0.3)] hover:shadow-[0_0_60px_rgba(255,77,0,0.5)] active:scale-95 md:hover:scale-105 flex justify-center"
              >
                
                <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-white/20 skew-x-[-20deg] group-hover:left-[180%] transition-all duration-700 ease-in-out"></div>
                
                {/* CAMBIO 9: Tamaño de texto y icono ajustado para que quepa en una línea en móviles pequeños */}
                <span className="relative z-10 flex items-center justify-center gap-3 text-base md:text-lg tracking-wide uppercase whitespace-nowrap">
                  <CalendarCheck size={20} className="md:w-6 md:h-6" />
                  <span>Agendar conversación</span>
                  <ArrowRight size={18} className="md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
              
            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}