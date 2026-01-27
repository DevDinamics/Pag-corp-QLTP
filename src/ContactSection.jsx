import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Mail, Phone, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// --- CONFIGURACIÓN EMAILJS ---
// Lo ideal es mover esto a un archivo .env (ej: import.meta.env.VITE_EMAILJS_SERVICE_ID)
const EMAIL_CONFIG = {
  SERVICE_ID: 'service_0t7rujq',
  TEMPLATE_ID: 'template_hx9719f',
  PUBLIC_KEY: 'OlKg1l5iedr6UKUvd',
};

// --- INPUT REUTILIZABLE ---
const InputGroup = ({ label, name, type = "text", placeholder, required = false, isTextArea = false }) => {
  return (
    <div className="group relative">
      {isTextArea ? (
        <textarea 
          name={name}
          required={required}
          placeholder=" " 
          className="peer w-full bg-[#111] text-white border border-white/10 rounded-lg px-4 py-4 pt-6 outline-none focus:border-qualtop-orange focus:ring-1 focus:ring-qualtop-orange transition-all duration-300 min-h-[120px] resize-none text-base font-light placeholder-transparent"
        />
      ) : (
        <input 
          type={type}
          name={name}
          required={required}
          placeholder=" "
          className="peer w-full bg-[#111] text-white border border-white/10 rounded-lg px-4 py-4 pt-6 outline-none focus:border-qualtop-orange focus:ring-1 focus:ring-qualtop-orange transition-all duration-300 text-base font-light placeholder-transparent"
        />
      )}
      <label className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 pointer-events-none 
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
        peer-focus:top-2 peer-focus:text-xs peer-focus:text-qualtop-orange
        peer-valid:top-2 peer-valid:text-xs peer-valid:text-gray-400">
        {label} {required && <span className="text-qualtop-orange">*</span>}
      </label>
    </div>
  );
};

// --- SELECT REUTILIZABLE ---
const SelectGroup = ({ label, name, options, required = false }) => (
  <div className="group relative">
    <select 
      name={name}
      required={required}
      defaultValue="" // Fix para React warning
      className="peer w-full bg-[#111] text-white border border-white/10 rounded-lg px-4 py-4 pt-6 outline-none focus:border-qualtop-orange focus:ring-1 focus:ring-qualtop-orange transition-all duration-300 appearance-none cursor-pointer text-base font-light"
    >
      <option value="" disabled className="text-gray-500"></option>
      {options.map((opt, i) => <option key={i} value={opt} className="bg-[#111] text-white">{opt}</option>)}
    </select>
    <label className="absolute left-4 top-1 text-xs text-gray-400 transition-all duration-300 pointer-events-none">
      {label} {required && <span className="text-qualtop-orange">*</span>}
    </label>
    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 peer-focus:text-qualtop-orange transition-colors">
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
  </div>
);

export default function ContactSection() {
  const form = useRef();
  const [formState, setFormState] = useState('idle');

  const sendEmail = (e) => {
    e.preventDefault();
    setFormState('loading');

    emailjs.sendForm(
      EMAIL_CONFIG.SERVICE_ID, 
      EMAIL_CONFIG.TEMPLATE_ID, 
      form.current, 
      EMAIL_CONFIG.PUBLIC_KEY
    )
    .then((result) => {
        console.log('Email enviado:', result.text);
        setFormState('success');
        e.target.reset();
        setTimeout(() => setFormState('idle'), 5000);
    }, (error) => {
        console.error('Error al enviar:', error.text);
        setFormState('error');
        setTimeout(() => setFormState('idle'), 4000);
    });
  };

  return (
    <section id="contacto" className="relative w-full bg-[#050505] py-16 md:py-24 px-4 md:px-6 overflow-hidden border-t border-white/5 scroll-mt-20">
      
      {/* Fondo decorativo */}
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-qualtop-orange/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none mix-blend-screen opacity-50"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative z-10">
        
        {/* --- COLUMNA IZQUIERDA: TEXTO --- */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative lg:sticky lg:top-32"
        >
          <span className="inline-block px-3 py-1 mb-4 md:mb-6 text-[10px] md:text-xs font-bold tracking-widest text-qualtop-orange uppercase border border-qualtop-orange/30 rounded-full bg-qualtop-orange/5">
            Hablemos Claro
          </span>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Conversemos sobre un <span className="text-transparent bg-clip-text bg-gradient-to-r from-qualtop-orange to-orange-400">reto real</span> de tu operación.
          </h2>
          
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
            Sin vendedores agresivos. Solo ingenieros y consultores analizando si tu contexto técnico y operativo hace match con nuestras soluciones.
          </p>

          {/* Datos de contacto */}
          <div className="space-y-6 border-t border-white/10 pt-8">
            <a href="mailto:hola@qualtop.com" className="flex items-center gap-4 group w-fit">
               <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-qualtop-orange group-hover:text-white text-gray-400 transition-all duration-300">
                 <Mail size={20} />
               </div>
               <div>
                 <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Correo Electrónico</p>
                 <p className="text-white text-base font-medium group-hover:text-qualtop-orange transition-colors">hola@qualtop.com</p>
               </div>
            </a>
            
            <a href="tel:+525512345678" className="flex items-center gap-4 group w-fit">
               <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-qualtop-orange group-hover:text-white text-gray-400 transition-all duration-300">
                 <Phone size={20} />
               </div>
               <div>
                 <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Línea Directa</p>
                 <p className="text-white text-base font-medium group-hover:text-qualtop-orange transition-colors">+52 (55) 1234 5678</p>
               </div>
            </a>
          </div>
        </motion.div>


        {/* --- COLUMNA DERECHA: FORMULARIO --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full"
        >
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden group">
             
             {/* Línea naranja decorativa superior */}
             <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-qualtop-orange to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

             <form ref={form} onSubmit={sendEmail} className="space-y-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputGroup name="user_name" label="Nombre completo" required />
                  <InputGroup name="user_email" label="Correo electrónico" type="email" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputGroup name="company" label="Empresa" required />
                  <InputGroup name="phone" label="Teléfono" type="tel" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <SelectGroup name="industry" label="Industria" options={["Banca & Finanzas", "Retail", "Manufactura", "Logística", "Tecnología", "Otro"]} required />
                  <SelectGroup name="service" label="Interés Principal" options={["Modernización de Apps", "Inteligencia Artificial", "QA & Testing", "Consultoría Cloud", "Staffing IT"]} required />
                </div>
                
                <InputGroup name="message" label="¿Cómo podemos ayudarte?" isTextArea required />

                {/* Checkbox */}
                <div className="flex items-start gap-3 mt-2">
                  <div className="relative flex items-center mt-1">
                    <input type="checkbox" required id="privacy" className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-white/20 bg-[#111] checked:border-qualtop-orange checked:bg-qualtop-orange transition-all" />
                    <CheckCircle2 size={12} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <label htmlFor="privacy" className="text-xs text-gray-500 leading-relaxed cursor-pointer select-none">
                    He leído y acepto la <a href="#" className="text-gray-400 hover:text-qualtop-orange underline transition-colors">Política de Privacidad</a>.
                  </label>
                </div>

                {/* Botón */}
                <button 
                  type="submit" 
                  disabled={formState === 'loading' || formState === 'success'}
                  className={`w-full group relative flex items-center justify-center gap-2 py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-300 transform active:scale-[0.98]
                    ${formState === 'success' ? 'bg-green-600 text-white cursor-default' : 
                      formState === 'error' ? 'bg-red-600 text-white' :
                      'bg-qualtop-orange hover:bg-[#ff5e1a] text-white shadow-lg shadow-qualtop-orange/20'}
                  `}
                >
                  {formState === 'idle' && (
                    <>
                      <span>Enviar Solicitud</span>
                      <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                  {formState === 'loading' && (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      <span>Procesando...</span>
                    </>
                  )}
                  {formState === 'success' && (
                    <>
                      <CheckCircle2 size={18} />
                      <span>Mensaje Enviado</span>
                    </>
                  )}
                  {formState === 'error' && (
                    <>
                      <AlertCircle size={18} />
                      <span>Error - Intenta de nuevo</span>
                    </>
                  )}
                </button>

             </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}