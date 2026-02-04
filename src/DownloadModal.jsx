import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Check, Mail, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function DownloadModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // 1. Configura los parámetros que coincidan con tu plantilla de EmailJS
    const templateParams = {
      user_email: email,      // La variable {{user_email}} en tu plantilla
      to_name: "Visitante",   // Opcional
      message: "Solicitud de descarga del Caso de Éxito Banca 2026" // Opcional
    };

    // 2. Envío real con EmailJS
    // REEMPLAZA ESTOS VALORES CON LOS DE TU DASHBOARD DE EMAILJS
    const serviceID = 'service_9x342ob'; 
    const templateID = 'template_1gx5erv';
    const publicKey = 'OlKg1l5iedr6UKUvd'; 

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('success');
        
        // Opcional: También abrir el PDF directamente en el navegador
        // window.open('/assets/caso-exito-banca.pdf', '_blank');

        setTimeout(() => {
          onClose();
          setStatus('idle');
          setEmail('');
        }, 3000);
      })
      .catch((err) => {
        console.log('FAILED...', err);
        setStatus('error');
      });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="pointer-events-auto w-full max-w-md relative"
            >
              <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden relative">
                
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-qualtop-orange/20 blur-[50px] rounded-full pointer-events-none" />

                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="p-8">
                  {/* ICONO DINÁMICO SEGÚN ESTADO */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border mb-6 transition-colors duration-300 
                    ${status === 'success' ? 'bg-green-500/10 border-green-500 text-green-500' : 
                      status === 'error' ? 'bg-red-500/10 border-red-500 text-red-500' : 
                      'bg-white/5 border-white/10 text-qualtop-orange'}`}>
                    {status === 'success' ? <Check size={24} /> : 
                     status === 'error' ? <AlertCircle size={24} /> :
                     <Download size={24} />}
                  </div>

                  {status === 'success' ? (
                    <div className="text-center py-4">
                      <h3 className="text-2xl font-bold text-white mb-2">¡Enviado!</h3>
                      <p className="text-gray-400 text-sm">
                        Revisa tu bandeja de entrada (y spam). Te hemos enviado el link de descarga a <span className="text-qualtop-orange">{email}</span>.
                      </p>
                    </div>
                  ) : status === 'error' ? (
                     <div className="text-center py-4">
                      <h3 className="text-2xl font-bold text-white mb-2">Ups, algo falló</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        No pudimos enviar el correo. Por favor intenta de nuevo.
                      </p>
                      <button 
                        onClick={() => setStatus('idle')}
                        className="text-qualtop-orange hover:underline text-sm"
                      >
                        Intentar de nuevo
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-white mb-2">Caso de Éxito: Banca 2026</h3>
                      <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        Te enviaremos el PDF completo directamente a tu correo electrónico para que lo leas cuando quieras.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative group">
                          <Mail className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-qualtop-orange transition-colors" size={18} />
                          <input 
                            type="email" 
                            name="user_email" // Importante para autocompletar
                            placeholder="tu@empresa.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'loading'}
                            className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-qualtop-orange/50 focus:ring-1 focus:ring-qualtop-orange/50 transition-all disabled:opacity-50"
                          />
                        </div>

                        <button 
                          type="submit"
                          disabled={status === 'loading'}
                          className="w-full bg-qualtop-orange hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,77,0,0.2)] hover:shadow-[0_0_30px_rgba(255,77,0,0.4)]"
                        >
                          {status === 'loading' ? (
                            <>
                              <Loader2 className="animate-spin" size={20} />
                              Enviando...
                            </>
                          ) : (
                            <>
                              Recibir PDF por Correo
                              <Mail size={18} />
                            </>
                          )}
                        </button>
                      </form>
                      
                      <p className="text-xs text-center text-gray-600 mt-4">
                        Tus datos están protegidos.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}