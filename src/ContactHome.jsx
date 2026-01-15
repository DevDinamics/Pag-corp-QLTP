import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ContactForm from '../src/assets/pages/ContactForm'; 
import FAQSection from '../src/assets/pages/FAQSection';

export default function ContactHome() {
  
  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    // 1. FONDO BASE: Negro puro (#000000)
    <main className="relative w-full min-h-screen bg-black selection:bg-qualtop-orange selection:text-white">

      {/* 2. TRAMA DE PUNTOS (Estilo "Pilares de Innovación") */}
      {/* Esto crea el efecto de "malla" sutil en el fondo sin iluminar todo de naranja */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
         {/* Patrón de puntos CSS */}
         <div className="absolute inset-0 opacity-[0.15]" 
              style={{ 
                backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', 
                backgroundSize: '30px 30px' 
              }} 
         />
         
         {/* Degradado negro superior para que el texto resalte y no se pierda en los puntos */}
         <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 w-full">
        
        {/* --- HERO --- */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="block text-white/60 text-xl font-light mb-6 tracking-wide">
                ¿Tienes algún proyecto en mente?
              </span>
              
              <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter mb-10">
                ¡Hablemos!
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto mb-16">
                Gracias por tu interés en contactarnos, selecciona cuál es tu interés y nos aseguraremos de conectarte con la persona correcta.
              </p>

              <button 
                onClick={scrollToForm}
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#FF4D00] to-[#ff6a00] rounded-full text-white text-lg font-bold tracking-wide shadow-[0_0_20px_rgba(255,77,0,0.4)] hover:shadow-[0_0_40px_rgba(255,77,0,0.6)] transition-all duration-300 hover:-translate-y-1"
              >
                <span>Envíanos un mensaje</span>
                <ArrowRight className="transition-transform duration-300 group-hover:rotate-90" size={20} />
              </button>
            </motion.div>
          </div>
        </section>

        {/* --- FORMULARIO (Fondo Negro Continuo) --- */}
        {/* Agregamos padding extra arriba (pt-32) para separar bien las secciones */}
        <section className="w-full px-6 pb-20 pt-32" id="contact-form-section">
           <ContactForm />
        </section>

        {/* --- FAQ (Fondo Negro Continuo) --- */}
        <FAQSection />

      </div>

    </main>
  );
}