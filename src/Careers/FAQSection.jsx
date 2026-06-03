import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "¿Qué puedes esperar desde un primer contacto hasta que formes parte de nuestro equipo?",
    a: "Tu tiempo vale mucho. Tu talento, más.\n\nOlvídate de los procesos eternos o de ser evaluado por una máquina; aquí leemos tu trayectoria con ojos humanos. Queremos que tu experiencia con nosotros sea ágil, transparente y, sobre todo, justa.\n\nAsí es nuestro camino juntos:\n\n1. Primer contacto: Una charla inicial con nuestro equipo de Reclutamiento y Selección para conocernos.\n2. Espacio Técnico: Evaluamos tus habilidades con un filtro diseñado específicamente para el proyecto y cliente al que aplicas.\n3. Match Cultural: Un espacio final para platicar sobre nuestra Q-ltura, valores, beneficios y expectativas.\n\n¡Queremos conocerte y escucharte!"
  },
  {
    q: "¿Ofrecen trabajo remoto?",
    a: "Entendemos que cada persona tiene necesidades distintas, por lo que ofrecemos esquemas 100% remotos o híbridos según las necesidades de nuestros clientes. Así, podrás diseñar el balance perfecto entre tu vida personal y profesional, trabajando desde donde te sientas más cómodo y eficiente."
  },
  {
    q: "¿Cómo impulsa Qualtop el crecimiento, bienestar y desarrollo de su equipo?",
    a: "Nos importa tu bienestar y tu crecimiento. Queremos que alcances tu máximo potencial mientras nosotros te respaldamos. Impulsamos tu evolución constante con un presupuesto anual exclusivo para tus certificaciones y capacitaciones."
  },
  {
    q: "¿Qué es lo que realmente nos hace únicos en Qualtop?",
    a: "Más que código, construimos tecnología con propósito. Si buscas un entorno donde puedas superar retos técnicos increíbles sin tener que dejar de lado tu bienestar, estás en el lugar correcto. Aquí la excelencia técnica y la calidad humana van de la mano."
  }
];

const AccordionItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Renderiza saltos de línea y numeración
  const renderAnswer = (text) => {
    return text.split('\n').map((line, i) => (
      line.trim() === '' 
        ? <br key={i} /> 
        : <span key={i} className="block">{line}</span>
    ));
  };

  return (
    <div className="border-b border-white/10">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-8 flex items-center justify-between group">
        <span className="text-xl font-medium text-gray-200 group-hover:text-white transition-colors text-left pr-6">{q}</span>
        <div className={`p-2 rounded-full border border-white/10 transition-all flex-shrink-0 ${isOpen ? 'bg-qualtop-orange border-qualtop-orange' : 'group-hover:border-white/30'}`}>
          {isOpen ? <Minus size={20} className="text-white" /> : <Plus size={20} className="text-gray-400" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="pb-8 text-gray-400 font-light leading-relaxed max-w-3xl">
              {renderAnswer(a)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQSection() {
  return (
    <section className="py-24 px-6 md:px-20 bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">¿Tienes más dudas?</h2>
        <div className="space-y-2">
          {faqs.map((item, i) => <AccordionItem key={i} {...item} />)}
        </div>
      </div>
    </section>
  );
}