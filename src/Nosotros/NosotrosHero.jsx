import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function NosotrosHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
      
      {/* 1. Subtítulo superior sutil */}
      <motion.p 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-gray-400 text-lg md:text-xl font-medium mb-6 tracking-tight"
      >
        Pensado para entornos complejos y operaciones críticas.
      </motion.p>

      {/* 2. Título Monumental (Efecto Pro Max) */}
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-4xl md:text-7xl text-white mb-10 max-w-5xl drop-shadow-lg leading-[1.4]"
      >
        Tecnología y <br />
        estrategia para <br />
        <span className="text-qualtop-orange inline-block mt-2">
          operar, escalar y <br className="hidden md:block" /> decidir mejor.
        </span>
      </motion.h1>

      {/* 3. Bloque de descripción y Botón (Copy exacto de tu captura) */}
      <div className="max-w-4xl mt-8">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-10 font-medium"
        >
          Acompañamos a organizaciones que necesitan modernizar, integrar y escalar su tecnología sin comprometer estabilidad ni control. Nuestro foco está en producción, no en promesas.
        </motion.p>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-qualtop-orange hover:bg-orange-600 text-white font-black py-5 px-12 rounded-lg transition-all duration-300 tracking-[0.2em] uppercase text-xs flex items-center gap-4 shadow-[0_15px_40px_rgba(255,77,0,0.3)]"
        >
          Cómo trabajamos <ArrowRight size={18} />
        </motion.button>
      </div>

      {/* 4. Elemento decorativo de fondo (Aura sutil) */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-qualtop-orange/10 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}