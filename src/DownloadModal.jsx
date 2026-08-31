import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Check, Mail, Loader2, AlertCircle } from 'lucide-react';

// Lista de proveedores gratuitos comunes
const FREE_EMAIL_DOMAINS = [
  'gmail.com', 'googlemail.com',
  'hotmail.com', 'outlook.com', 'live.com', 'msn.com',
  'yahoo.com', 'yahoo.es', 'yahoo.com.mx', 'ymail.com',
  'icloud.com', 'me.com', 'mac.com',
  'aol.com', 'protonmail.com', 'proton.me', 'zoho.com'
];

const isCorporateEmail = (email) => {
  if (!email || !email.includes('@')) return false;
  const domain = email.split('@')[1].toLowerCase().trim();
  return !FREE_EMAIL_DOMAINS.includes(domain);
};

export default function DownloadModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    // Validación de correo corporativo en el frontend
    if (!isCorporateEmail(email)) {
      setErrorMessage('Por favor, ingresa un correo electrónico de tu empresa (no se admiten cuentas personales como Gmail o Hotmail).');
      setStatus('error');
      return;
    }

    setErrorMessage('');
    setStatus('loading');

    try {
      // Usar ruta relativa para que funcione automáticamente en beta y producción
      const response = await fetch('/enviar_manual.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setEmail('');
          setErrorMessage('');
        }, 4000);
      } else {
        setErrorMessage(result.message || 'No pudimos procesar tu solicitud.');
        setStatus('error');
      }
    } catch (error) {
      setErrorMessage('Ocurrió un error de conexión.');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
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
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>

                <div className="p-8">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border mb-6 transition-colors duration-300 
                    ${status === 'success' ? 'bg-green-500/10 border-green-500 text-green-500' : 
                      status === 'error' ? 'bg-red-500/10 border-red-500 text-red-500' : 
                      'bg-white/5 border-white/10 text-qualtop-orange'}`}>
                    {status === 'success' ? <Check size={24} /> : status === 'error' ? <AlertCircle size={24} /> : <Download size={24} />}
                  </div>

                  {status === 'success' ? (
                    <div className="text-center py-4">
                      <h3 className="text-2xl font-bold text-white mb-2">¡Enviado!</h3>
                      <p className="text-gray-400 text-sm">Revisa tu bandeja de entrada. Te hemos enviado el link a <span className="text-qualtop-orange">{email}</span>.</p>
                    </div>
                  ) : status === 'error' ? (
                     <div className="text-center py-4">
                      <h3 className="text-2xl font-bold text-white mb-2">Se requiere correo corporativo</h3>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">{errorMessage || 'No pudimos procesar tu solicitud.'}</p>
                      <button onClick={handleReset} className="text-qualtop-orange hover:underline text-sm font-medium">Intentar de nuevo</button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-white mb-2">Caso de Éxito: Banca 2026</h3>
                      <p className="text-gray-400 text-sm mb-6 leading-relaxed">Te enviaremos el PDF completo directamente a tu correo corporativo.</p>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative group">
                          <Mail className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-qualtop-orange transition-colors" size={18} />
                          <input 
                            type="email" name="email" placeholder="tu@empresa.com" required value={email}
                            onChange={(e) => setEmail(e.target.value)} disabled={status === 'loading'}
                            className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-qualtop-orange/50 focus:ring-1 focus:ring-qualtop-orange/50 transition-all disabled:opacity-50"
                          />
                        </div>
                        <button type="submit" disabled={status === 'loading'} className="w-full bg-qualtop-orange hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2">
                          {status === 'loading' ? <><Loader2 className="animate-spin" size={20} /> Enviando...</> : <>Recibir PDF por Correo <Download size={18} /></>}
                        </button>
                      </form>
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