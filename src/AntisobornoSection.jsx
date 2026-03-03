import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Scale, FileText, Users, Globe, CheckCircle2, Plus, Minus } from 'lucide-react';

// --- COMPONENTE DEL ACORDEÓN ---
const AccordionItem = ({ title, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-qualtop-orange/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg md:text-xl font-medium text-gray-200 group-hover:text-qualtop-orange transition-colors duration-300">
          {title}
        </span>
        <div className="text-qualtop-orange ml-4 shrink-0 transition-transform duration-300">
          {isOpen ? <Minus size={24} /> : <Plus size={24} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-400 leading-relaxed pr-8">
              {/* AQUÍ VA EL TEXTO INTERNO DE CADA SECCIÓN */}
              <p>
                Información detallada sobre {title.toLowerCase()}. Este espacio está reservado para la descripción específica de esta política interna según los estándares de Qualtop y la ISO 37001:2016.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function AntisobornoSection() {
  // LISTA DE TEMAS PARA EL ACORDEÓN
  const policyTopics = [
    "Revisión de Política Antisoborno",
    "Identificar y prevenir el soborno",
    "Principios Fundamentales",
    "Compromisos",
    "Regalos",
    "Donaciones y Patrocinios",
    "Gastos de Viaje y Viáticos",
    "Socios de negocio",
    "Puestos clave",
    "Formación",
    "Delegación de la toma de decisiones antisoborno",
    "Consecuencias del Incumplimiento",
    "Procedimiento de Cumplimiento, Implementación, Denuncia y Control"
  ];

  return (
    <section className="relative py-32 bg-[#050505] overflow-hidden font-sans text-white">
      
      {/* Fondo Decorativo Sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#FF4D00,transparent_50%)] blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* ==========================================
            1. HEADER Y TEXTO INTRODUCTORIO
        ========================================== */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[2px] w-12 bg-qualtop-orange" />
            <span className="text-qualtop-orange font-bold tracking-[0.3em] text-xs uppercase">Compliance & Ethics</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold leading-tight mb-12 tracking-tight"
          >
            Políticas <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Antisoborno.</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg text-gray-400 leading-relaxed"
          >
            <p>
              El objetivo de este documento es establecer las políticas Antisoborno, asegurando y promoviendo que cualquier actividad que se desempeñe dentro de la organización <strong className="text-white">Qualtop, S.A. de C.V.</strong>, o a nombre de la misma, esté fundamentada en la ética y valores que nos caracterizan, condenando la corrupción, soborno, fraude o cualquier otro acto ilegal que se pudiera presentar a lo largo de nuestra cadena productiva.
            </p>
            <p>
              Dentro de nuestra organización buscamos promover siempre los valores y aptitudes que nos representan tales como la honestidad y la ética, permitiendo así que nuestro desempeño sea reconocido no solo por nuestros resultados sino también por nuestra <span className="text-qualtop-orange italic">calidad humana</span>.
            </p>
            <p>
              Se describen las políticas y normas Antisoborno definidas por la organización, tomándose como base las leyes y demás regulaciones aplicables bajo las recomendaciones del estándar <strong className="text-white">ISO 37001:2016</strong>.
            </p>
          </motion.div>
        </div>

        {/* ==========================================
            2. TARJETA DE ALCANCE (GLASSMORPHISM)
        ========================================== */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#111] to-[#0a0a0a] p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden mb-24"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Globe size={160} />
          </div>
          
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white relative z-10">
            <Users className="text-qualtop-orange" /> Alcance
          </h3>
          
          <p className="text-gray-300 leading-relaxed mb-8 relative z-10 text-lg">
            Esta política es aplicable a los colaboradores, socios, proveedores, aliados, partners y clientes. A fin de coadyuvar y promover el cumplimiento de esta política, se ha establecido un <strong className="text-white">Sistema de Gestión Antisoborno (SGAS)</strong> bajo la Norma ISO 37001:2016, el cual contiene medidas diseñadas para:
          </p>
          
          <ul className="space-y-4 relative z-10">
            {[
              'Identificar y evaluar riesgos.',
              'Prevenir, detectar y enfrentar el soborno.',
              'Establecer controles y procesos que buscan el logro de los objetivos antisoborno.',
              'Reforzar nuestra cultura de honestidad y ética en los negocios.'
            ].map((li, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-400">
                <CheckCircle2 size={20} className="text-qualtop-orange shrink-0 mt-1" />
                <span>{li}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ==========================================
            3. ACORDEÓN DE DESCRIPCIÓN Y NORMAS
        ========================================== */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-10">Descripción y Normativas</h3>
          
          <div className="border-t border-qualtop-orange/30">
            {policyTopics.map((topic, index) => (
              <AccordionItem key={index} title={topic} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}