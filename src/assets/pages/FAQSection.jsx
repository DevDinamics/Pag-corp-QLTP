import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';

const faqs = [
  {
    question: "¿Qué servicios tecnológicos ofrecen?",
    answer: "Nos especializamos en desarrollo de software a medida, consultoría estratégica en TI, implementación de soluciones de Inteligencia Artificial y equipos dedicados (Staff Augmentation) de alto rendimiento."
  },
  {
    question: "¿Con qué tecnologías trabajan?",
    answer: "Somos agnósticos, pero nuestro core incluye React, Node.js, Python (para IA/ML), arquitecturas Cloud-Native (AWS/Azure) y metodologías DevOps modernas."
  },
  {
    question: "¿Cómo es el proceso de inicio?",
    answer: "Iniciamos con una fase de 'Discovery' para entender a fondo tu operación y retos. Luego, diseñamos una propuesta técnica y un roadmap claro antes de escribir la primera línea de código."
  },
  {
    question: "¿Cómo garantizan la seguridad y calidad?",
    answer: "Integramos prácticas de DevSecOps y QA automatizado desde el día uno. Tu propiedad intelectual y la seguridad de los datos son nuestra prioridad absoluta."
  },

    {
    question: "¿Cómo garantizan la seguridad y calidad?",
    answer: "Integramos prácticas de DevSecOps y QA automatizado desde el día uno. Tu propiedad intelectual y la seguridad de los datos son nuestra prioridad absoluta."
  },
];

export default function FAQSection() {
  // Estado para saber cuál está abierto (null = ninguno)
  const [openIndex, setOpenIndex] = useState(null);

  return (
    // SECCIÓN CON FONDO TRANSPARENTE (se mezcla con el padre negro)
    <section className="py-32 px-6 relative bg-transparent">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* --- COLUMNA IZQUIERDA: HEADER --- */}
        <div className="lg:col-span-5 sticky top-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-qualtop-orange/10 rounded-lg">
                    <Sparkles className="text-qualtop-orange" size={20} />
                </div>
                <span className="text-qualtop-orange text-sm font-bold tracking-[0.2em] uppercase">
                  
                </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Preguntas Frecuentes
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Resolvemos las dudas clave antes de iniciar nuestra colaboración tecnológica.
            </p>

            {/* Decoración visual sutil */}
            <div className="mt-12 h-px w-32 bg-gradient-to-r from-qualtop-orange/50 to-transparent" />
          </motion.div>
        </div>

        {/* --- COLUMNA DERECHA: REACTIVE DATA STREAM (FAQs) --- */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div 
                key={index}
                layout // Magia de Framer Motion para animar el cambio de tamaño suavemente
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, layout: { duration: 0.4, type: "spring", stiffness: 100, damping: 15 } }}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`group relative rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden ${
                  isOpen 
                    ? 'border-qualtop-orange bg-black/40 shadow-[0_0_30px_rgba(255,77,0,0.15)]' // Estado Activo (Brillante)
                    : 'border-white/10 bg-black/20 hover:border-white/30 hover:bg-white/[0.02]' // Estado Inactivo (Sutil)
                }`}
              >
                
                {/* EFECTO DE LUZ DE FONDO (Solo visible cuando está abierto) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            // Gradiente sutil naranja + efecto de vidrio borroso
                            className="absolute inset-0 bg-gradient-to-b from-qualtop-orange/10 via-transparent to-transparent pointer-events-none backdrop-blur-md"
                        />
                    )}
                </AnimatePresence>

                <div className="relative z-10 p-6 md:p-8">
                  {/* PREGUNTA (Header del item) */}
                  <div className="flex justify-between items-center gap-6">
                    <h3 className={`text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                      {faq.question}
                    </h3>
                    
                    {/* Icono animado */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isOpen ? 'bg-qualtop-orange border-qualtop-orange rotate-45' : 'border-white/20 text-gray-400 group-hover:border-white group-hover:text-white'
                    }`}>
                      <Plus size={20} className={`transition-transform duration-300 ${isOpen ? 'text-white' : ''}`} />
                    </div>
                  </div>

                  {/* RESPUESTA (Contenido expandible) */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="pt-6 mt-6 border-t border-white/10">
                          <p className="text-gray-300 text-lg leading-relaxed font-light">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}