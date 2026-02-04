import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Revisamos si ya existe la preferencia guardada en el navegador
    const consent = localStorage.getItem('site-cookie-consent');
    if (!consent) {
      // Si no existe, esperamos 1.5 segundos y mostramos el banner
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('site-cookie-consent', 'true');
    setIsVisible(false);
    // Aquí podrías activar scripts de Google Analytics, Pixel, etc.
  };

  const handleDecline = () => {
    localStorage.setItem('site-cookie-consent', 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-50 md:w-[400px]"
        >
          {/* Contenedor con estilo Glass/Tech */}
          <div className="bg-[#0a0a0a]/95 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            
            {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-qualtop-orange/10 blur-[40px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-white/5 rounded-full border border-white/10 text-qualtop-orange">
                  <Cookie size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Cookies & Privacidad</h4>
                  <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                    Usamos cookies para mejorar tu experiencia y analizar el tráfico. 
                    No guardamos datos sensibles sin tu permiso.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3 pt-2">
                <button
                  onClick={handleDecline}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-200"
                >
                  Solo necesarias
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium bg-qualtop-orange text-white hover:bg-orange-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
                >
                  <Check size={16} />
                  Aceptar todas
                </button>
              </div>

              {/* Botón de cerrar (X) discreto */}
              <button 
                onClick={handleDecline}
                className="absolute -top-2 -right-2 p-2 text-gray-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}