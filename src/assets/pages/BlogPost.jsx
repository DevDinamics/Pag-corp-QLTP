import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Clock, Linkedin, Twitter, ArrowLeft, Share2, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



export default function BlogPost() {
  const navigate = useNavigate();
  const contentRef = useRef(null); // Referencia al contenedor del texto

  // --- 1. BARRA DE PROGRESO (Lógica Nativa Framer Motion) ---
  const { scrollYProgress } = useScroll({
    target: contentRef, // Medimos solo el contenedor del texto
    offset: ["start end", "end end"] // Empieza cuando el texto entra por abajo, termina cuando sale
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- 2. NOTIFICACIÓN (Toast) ---
  const [copied, setCopied] = useState(false);

  const handleSharePost = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-[#050505] text-gray-300 font-sans selection:bg-qualtop-orange selection:text-white pb-32">
      
      {/* --- BARRA DE PROGRESO --- */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[9999] bg-black/5">
        <motion.div 
          className="h-full bg-qualtop-orange origin-left shadow-[0_0_15px_rgba(255,77,0,0.8)]"
          style={{ scaleX }} 
        />
      </div>

      {/* HEADER (Estilo Original) */}
      <header className="pt-40 pb-16 px-6 max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-gray-500 hover:text-qualtop-orange transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Volver</span>
        </button>

        <div className="flex items-center gap-3 mb-6 text-qualtop-orange text-[10px] font-black uppercase tracking-widest">
          <span className="bg-qualtop-orange/10 px-2 py-1 rounded">Insights</span>
          <span className="text-gray-600">•</span>
          <span className="flex items-center gap-1 text-gray-500"><Clock size={12}/> 12 Enero, 2026</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-tight">
          La Nueva Era de la <br />
          <span className="text-qualtop-orange">Gestión de Siniestros.</span>
        </h1>
      </header>

      {/* CUERPO DEL ARTÍCULO */}
      <main className="max-w-3xl mx-auto px-6">
        
        {/* INFO AUTOR / COMPARTIR */}
        <div className="flex flex-wrap items-center justify-between border-y border-white/5 py-6 mb-12 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-qualtop-orange" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">Equipo Qualtop</span>
          </div>
          <div className="flex gap-4 text-gray-500">
            <Linkedin size={18} className="hover:text-white cursor-pointer transition-colors" />
            <Twitter size={18} className="hover:text-white cursor-pointer transition-colors" />
            
            {/* Botón Share con la nueva función */}
            <Share2 
              size={18} 
              onClick={handleSharePost} 
              className="hover:text-white cursor-pointer transition-colors" 
              title="Copiar enlace" 
            />
          </div>
        </div>

{/* --- CONTENIDO PRINCIPAL --- */}
        <div 
          ref={contentRef} 
          className="prose prose-invert prose-orange max-w-none space-y-8 text-lg md:text-xl leading-[1.8] text-gray-400 relative"
        >
          
          <p className="text-2xl text-white font-medium italic border-l-4 border-qualtop-orange pl-6 py-2">
            "En un entorno cada vez más competitivo y digitalizado, la eficiencia en la gestión de siniestros es el punto crucial para la satisfacción del cliente y la optimización de costos."
          </p>

          <p>
            La implementación de un proceso de <strong>Notificación de Siniestros (FNOL) omnicanal</strong> se presenta como una herramienta estratégica que no solo mejora la experiencia del cliente, sino que también refuerza la sostenibilidad financiera de las organizaciones.
          </p>

          {/* TÍTULO 1 (Ahora es un h2 normal) */}
          <h2 id="enfoque-omnicanal" className="text-2xl md:text-3xl font-bold text-white pt-6 tracking-tight">
            El Enfoque Omnicanal en la Gestión de Siniestros
          </h2>
          
          <p>
            La estrategia omnicanal permite a las aseguradoras interactuar con sus clientes de múltiples maneras, a través de diferentes plataformas y dispositivos. Al integrar colas y eventos que capturan cada interacción del cliente, las compañías pueden asegurar que cada notificación de siniestro es tratada con rapidez y precisión.
          </p>

          <p>
            <strong>Colas y Eventos:</strong> La utilización de colas para gestionar las interacciones garantiza que cada cliente reciba atención oportuna, independientemente del canal que utilice. Las alertas y eventos permiten priorizar los casos más urgentes.
          </p>

          <p>
            <strong>Procesamiento Multinube:</strong> Adopción de soluciones multinube que aseguran la escalabilidad y flexibilidad requeridas para manejar picos en la demanda, permitiendo que los sistemas se adapten a diversas circunstancias contingentes.
          </p>

          {/* TÍTULO 2 (Ahora es un h2 normal) */}
          <h2 id="ia-triage" className="text-2xl md:text-3xl font-bold text-white pt-6 tracking-tight">
            Inteligencia Artificial en el Triage
          </h2>
          
          <p>
            La inteligencia artificial (IA) se convierte en un aliado crucial para el triage de los siniestros. Al implementar algoritmos de tratamiento, es posible clasificar los casos automáticamente, facilitando la documentación conforme a reglas de auto-aprobación.
          </p>

          <p>
            <strong>Automatización de Triage:</strong> La IA permite reducir significativamente el tiempo de evaluación inicial, permitiendo que los casos menos complejos sean aprobados sin intervención manual.
          </p>

          <p>
            <strong>Reglas de Auto-aprobación:</strong> Estas reglas configuran un sistema que disminuye la carga operativa, asegurando que solo los casos que realmente requieren revisión manual sean sometidos a procesos más largos.
          </p>

          {/* TÍTULO 3 (Ahora es un h2 normal) */}
          <h2 id="reflexion-final" className="text-2xl md:text-3xl font-bold text-white pt-6 tracking-tight">
            Reflexión Final
          </h2>          
          
          <p className="text-gray-500 italic pb-10">
            La modernización en la gestión de siniestros no es una opción, sino una necesidad. La combinación de un enfoque omnicanal, IA en triage, telemetría, y pruebas de resiliencia brinda a las organizaciones la capacidad de mejorar su eficiencia y rentabilidad.
          </p>
        </div>
      </main>

      {/* --- NOTIFICACIÓN "PRO" (Toast) --- */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-3 px-6 py-3 bg-[#111] border border-white/10 rounded-full shadow-2xl backdrop-blur-md"
          >
            <div className="bg-green-500/20 text-green-500 p-1 rounded-full">
              <Check size={16} strokeWidth={3} />
            </div>
            <span className="text-sm font-medium text-white tracking-wide">
              Enlace copiado al portapapeles
            </span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}