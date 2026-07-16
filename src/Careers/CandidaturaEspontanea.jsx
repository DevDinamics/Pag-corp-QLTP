import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Sparkles, QrCode, ArrowRight } from 'lucide-react';

import { QRCodeCanvas } from 'qrcode.react';

// URL a la que llevará el QR (debe ser la página donde vive este componente)
const QR_URL = "https://beta.qualtop.com/careers"; 

export default function CandidaturaEspontanea({ onOpenForm }) {
  const [showQR, setShowQR] = useState(false);

  // ── useEffect para abrir el formulario desde el hash de la URL ──
  useEffect(() => {
    if (window.location.hash === '#form') {

      setTimeout(() => {
      onOpenForm();
    }, 500);


      onOpenForm();
      
    }
  }, [onOpenForm]);

  return (
    <div className="w-full max-w-7xl mx-auto mt-12 mb-20 px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative rounded-[32px] bg-[#0f0f0f] border border-white/10 p-8 sm:p-12 shadow-2xl"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[32px] pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-qualtop-orange/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-qualtop-orange text-[10px] font-bold tracking-widest uppercase mb-4">
              <Sparkles size={12} /> Red de Talento
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
              ¿No encuentras una vacante <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qualtop-orange to-orange-400">
                que haga match con tu perfil?
              </span>
            </h3>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed mx-auto md:mx-0">
              Siempre estamos buscando mentes brillantes. Déjanos tu CV y nuestro equipo te contactará en cuanto se abra una posición ideal para ti.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0 relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenForm}
              className="relative overflow-hidden w-full sm:w-auto px-8 py-4 rounded-2xl bg-qualtop-orange text-white font-bold flex items-center justify-center gap-3 transition-shadow shadow-[0_8px_24px_rgba(255,77,0,0.3)] hover:shadow-[0_12px_32px_rgba(255,77,0,0.45)] group"
            >
              <FileText size={18} className="relative z-10" />
              <span className="relative z-10">Subir mi CV ahora</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <div 
              className="relative w-full sm:w-auto"
              onMouseEnter={() => setShowQR(true)}
              onMouseLeave={() => setShowQR(false)}
            >
              <button
                onClick={() => setShowQR(!showQR)}
                className="w-full sm:w-[56px] h-[56px] rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-3 transition-colors group relative z-10"
              >
                <QrCode size={20} className="text-gray-400 group-hover:text-qualtop-orange transition-colors" />
              </button>

              <AnimatePresence>
                {showQR && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute bottom-[calc(100%+16px)] right-0 sm:right-0 p-4 bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-[100] flex flex-col items-center"
                  >
                    <div className="absolute -bottom-2 right-[20px] w-4 h-4 bg-[#1a1a1a] border-b border-r border-white/10 rotate-45 hidden sm:block" />
                    
                    {/* Generador de QR dinámico usando Google API */}
                    {showQR && (
  <motion.div
    initial={{ opacity: 0, y: 15, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.95 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className="absolute bottom-[calc(100%+16px)] right-0 sm:right-0 p-4 bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-[100] flex flex-col items-center"
  >
    <div className="absolute -bottom-2 right-[20px] w-4 h-4 bg-[#1a1a1a] border-b border-r border-white/10 rotate-45 hidden sm:block" />
    
    {/* 2. Este componente genera el QR localmente y NO falla */}
    <div className="bg-white p-2 rounded-lg">
      <QRCodeCanvas 
        value="https://beta.qualtop.com/careers#form" 
        size={100}
        level="H" // Nivel de corrección de error alto
      />
    </div>
    
    <p className="text-xs text-gray-400 mt-3 text-center w-32 font-medium leading-tight">
      Escanea para aplicar desde tu móvil
    </p>
  </motion.div>
)}
                    
                    <p className="text-xs text-gray-400 mt-3 text-center w-32 font-medium leading-tight">
                      Escanea para aplicar desde tu móvil
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}