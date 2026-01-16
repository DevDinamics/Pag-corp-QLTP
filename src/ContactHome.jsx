import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquareText } from 'lucide-react';

// Importaciones originales (Mantenidas)
import ContactForm from '../src/assets/pages/ContactForm'; 
import FAQSection from '../src/assets/pages/FAQSection';

export default function ContactHome() {
  
  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form-section');
    if (formSection) {
      // Offset de -50px para que no quede pegado al borde superior al hacer scroll
      const yOffset = -50; 
      const y = formSection.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    // 1. FONDO BASE: Negro puro
    <main className="relative w-full min-h-screen bg-[#050505] selection:bg-qualtop-orange selection:text-white font-sans overflow-hidden">

      {/* 2. ATMÓSFERA DE FONDO */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
         
         {/* Trama de puntos técnica (Ajustada para móvil y desktop) */}
         <div className="absolute inset-0 opacity-[0.12]" 
              style={{ 
                backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', 
                backgroundSize: '30px 30px' 
              }} 
         />
         
         {/* Vignette (Sombra en bordes) para centrar la atención */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />

         {/* Glow Ambiental (Detrás del título) */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-qualtop-orange/10 blur-[100px] md:blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 w-full">
        
        {/* --- HERO SECTION --- */}
        <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              
              {/* Título Responsivo Masivo */}
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter mb-8 leading-[0.9]">
                ¡Hablemos!
              </h1>
              
              {/* Subtítulo legible */}
              <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto mb-12">
                ¿Tienes un desafío tecnológico? <br className="hidden md:block" />
                Selecciona tu interés y conectemos con el experto adecuado.
              </p>

              {/* Botón de Acción con Feedback Táctil */}
              <button 
                onClick={scrollToForm}
                className="
                  group relative inline-flex items-center gap-3 
                  px-8 py-4 md:px-10 md:py-5 
                  bg-gradient-to-r from-[#FF4D00] to-[#ff6a00] 
                  rounded-full text-white text-base md:text-lg font-bold tracking-wide 
                  shadow-[0_0_20px_rgba(255,77,0,0.3)] 
                  hover:shadow-[0_0_40px_rgba(255,77,0,0.5)] 
                  active:scale-95 transition-all duration-300 hover:-translate-y-1
                "
              >
                <MessageSquareText size={20} className="opacity-90" />
                <span>Iniciar Conversación</span>
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
              </button>
            </motion.div>
          </div>

          {/* Indicador de Scroll (Flecha abajo sutil) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 text-white/20"
          >
            <ArrowRight className="rotate-90" size={24} />
          </motion.div>
        </section>

        {/* --- FORMULARIO --- */}
        <section 
          id="contact-form-section" 
          className="w-full px-4 md:px-6 pb-20 pt-10 md:pt-20 min-h-screen flex items-center justify-center"
        >
           {/* Contenedor del formulario con un poco de respiro visual */}
           <div className="w-full max-w-7xl mx-auto">
             <ContactForm />
           </div>
        </section>

        {/* --- FAQ --- */}
        {/* Separador visual sutil antes de las FAQ */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-7xl mx-auto" />
        
        <FAQSection />

      </div>

    </main>
  );
}