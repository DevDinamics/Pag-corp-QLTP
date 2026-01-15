import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative w-full bg-[#050505] py-24 px-6 overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- TARJETA CTA PRINCIPAL --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full rounded-3xl overflow-hidden border border-qualtop-orange group"
        >
          
          {/* 1. FONDO CON MOVIMIENTO (Cinemático) */}
          <div className="absolute inset-0 z-0">
            <motion.img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop" // Imagen tecnológica abstracta
              alt="Tech Background" 
              className="w-full h-full object-cover opacity-40"
              animate={{ scale: [1, 1.1] }} // Zoom muy lento
              transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            />
            {/* Gradiente para asegurar lectura del texto */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-qualtop-orange/10 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
          </div>

          {/* 2. EFECTO DE RESPLANDOR (Glow) */}
          {/* Luz naranja ambiental en la esquina */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-qualtop-orange/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse"></div>

          {/* 3. CONTENIDO TEXTUAL */}
          <div className="relative z-10 p-8 md:p-16 lg:p-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            
            <div className="max-w-2xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
              >
                ¿Tienes un <span className="text-qualtop-orange">reto tecnológico</span> que ya impacta la operación?
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-gray-300 leading-relaxed font-light"
              >
                Analizamos tu contexto operativo y tecnológico para entender si podemos generar <span className="text-white font-semibold">impacto real</span>, sin ruido comercial.
              </motion.p>
            </div>

            {/* 4. BOTÓN DE ACCIÓN (Magnético) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex-shrink-0"
            >
              <button className="group relative bg-qualtop-orange hover:bg-[#ff5e1a] text-white font-bold py-5 px-10 rounded-lg overflow-hidden transition-all duration-300 shadow-[0_0_40px_rgba(255,77,0,0.3)] hover:shadow-[0_0_60px_rgba(255,77,0,0.5)] hover:scale-105">
                
                {/* Brillo que pasa por el botón */}
                <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-white/20 skew-x-[-20deg] group-hover:left-[180%] transition-all duration-700 ease-in-out"></div>
                
                <span className="relative z-10 flex items-center gap-3 text-lg tracking-wide uppercase">
                  <CalendarCheck size={24} />
                  Agendar conversación
                  <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
              
              <p className="mt-4 text-center md:text-right text-xs text-gray-500 font-medium tracking-wider uppercase opacity-60">
                
              </p>
            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}