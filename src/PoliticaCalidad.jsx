import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import Navbar from './Navbar'; // Ajusta la ruta de importación si es necesario
import Footer from './Footer'; // Ajusta la ruta de importación si es necesario

export default function PoliticaCalidad() {
  // Asegurarnos de que la página cargue hasta arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-qualtop-orange selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Luz naranja de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-qualtop-orange/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            Política de <span className="text-qualtop-orange">Calidad</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Nuestro compromiso con la excelencia, la estandarización y la mejora continua.
          </motion.p>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section className="px-6 pb-32">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* TARJETA: OBJETIVO */}
          <motion.div 
            {...fadeIn}
            className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-sm hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-qualtop-orange/10 rounded-xl text-qualtop-orange">
                <Target size={28} />
              </div>
              <h2 className="text-3xl font-bold">Objetivo</h2>
            </div>
            <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
              <p>
                El propósito principal de esta política es el de garantizar la excelencia y satisfacción de nuestros clientes en la entrega de nuestros productos y/o servicios, mediante la estandarización y optimización de procesos bajo un enfoque de mejora continua, asegurando siempre el cumplimiento de los requisitos aplicables y los objetivos estratégicos de la organización.
              </p>
              <p>
                Se describen las políticas definidas por la organización, tomándose como base las leyes y demás regulaciones aplicables bajo las recomendaciones del estándar <span className="text-white font-semibold">ISO 9001:2015</span>.
              </p>
            </div>
          </motion.div>

          {/* TARJETA: ALCANCE */}
          <motion.div 
            {...fadeIn}
            className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-sm hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-qualtop-orange/10 rounded-xl text-qualtop-orange">
                <ShieldCheck size={28} />
              </div>
              <h2 className="text-3xl font-bold">Alcance</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              Esta política es de aplicación obligatoria para todos los colaboradores, proveedores y socios de negocio que participan en el ciclo de vida de los productos y/o servicios de la organización en cumplimiento de los requisitos de calidad (ISO 9001:2015).
            </p>
          </motion.div>

          {/* TARJETA: DESCRIPCIÓN Y COMPROMISOS */}
          <motion.div 
            {...fadeIn}
            className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-sm hover:border-white/10 transition-colors"
          >
            <h2 className="text-3xl font-bold mb-8">Descripción y Compromisos</h2>
            
            <div className="space-y-8 text-gray-300 leading-relaxed text-lg">
              <p>
                Nos enfocamos en la <span className="text-white font-semibold">satisfacción total de necesidades y expectativas</span> de nuestros clientes mediante la entrega de soluciones confiables y oportunas, así como de la estandarización de nuestros procesos.
              </p>
              <p>
                Aplicamos metodologías ágiles y marcos de alta madurez para asegurar que nuestros productos y/o servicios cumplan con los requisitos técnicos, legales y reglamentarios aplicables, fomentando una cultura de mejora continua y eficiencia.
              </p>

              <div className="pt-6 border-t border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Nuestro compromiso se basa en:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Satisfacción del Cliente", desc: "Entender y cumplir sus requisitos y los del mercado." },
                    { title: "Mejora Continua", desc: "Estandarizar y optimizar nuestros procesos, productos y sistema de gestión integrado de manera constante." },
                    { title: "Cumplimiento", desc: "Cumplir los requisitos legales, reglamentarios y normativos aplicables." },
                    { title: "Desarrollo del Personal", desc: "Capacitar a nuestro equipo para asegurar la competencia y calidad en sus labores." }
                  ].map((item, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="mt-1 text-qualtop-orange flex-shrink-0">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <strong className="block text-white mb-1">{item.title}</strong>
                        <span className="text-gray-400 text-base">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* FECHA DE ACTUALIZACIÓN */}
          <motion.div 
            {...fadeIn}
            className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-12"
          >
            <Clock size={16} />
            <span>Última actualización: 05/03/2026</span>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}