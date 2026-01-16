import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Mail, Phone, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// --- INPUT REUTILIZABLE (Ahora recibe 'name') ---
const InputGroup = ({ label, name, type = "text", placeholder, required = false, isTextArea = false }) => {
  return (
    <div className="group relative">
      {isTextArea ? (
        <textarea 
          name={name} // Importante para EmailJS
          required={required}
          placeholder=" " 
          className="peer w-full bg-[#111] text-white border border-white/10 rounded-lg px-4 py-4 pt-6 outline-none focus:border-qualtop-orange focus:ring-1 focus:ring-qualtop-orange transition-all duration-300 min-h-[120px] resize-none text-base"
        />
      ) : (
        <input 
          type={type}
          name={name} // Importante para EmailJS
          required={required}
          placeholder=" "
          className="peer w-full bg-[#111] text-white border border-white/10 rounded-lg px-4 py-4 pt-6 outline-none focus:border-qualtop-orange focus:ring-1 focus:ring-qualtop-orange transition-all duration-300 text-base"
        />
      )}
      <label className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 pointer-events-none 
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
        peer-focus:top-1 peer-focus:text-xs peer-focus:text-qualtop-orange
        peer-valid:top-1 peer-valid:text-xs peer-valid:text-gray-400">
        {label} {required && <span className="text-qualtop-orange">*</span>}
      </label>
    </div>
  );
};

// --- SELECT REUTILIZABLE (Ahora recibe 'name') ---
const SelectGroup = ({ label, name, options, required = false }) => (
  <div className="group relative">
    <select 
      name={name} // Importante para EmailJS
      required={required}
      className="peer w-full bg-[#111] text-white border border-white/10 rounded-lg px-4 py-4 pt-6 outline-none focus:border-qualtop-orange focus:ring-1 focus:ring-qualtop-orange transition-all duration-300 appearance-none cursor-pointer text-base"
    >
      <option value="" disabled selected className="text-gray-500"></option>
      {options.map((opt, i) => <option key={i} value={opt} className="bg-[#111]">{opt}</option>)}
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
  const form = useRef(); // Referencia al formulario
  const [formState, setFormState] = useState('idle'); // 'idle', 'loading', 'success', 'error'

  const sendEmail = (e) => {
    e.preventDefault();
    setFormState('loading');

    // REEMPLAZA ESTOS VALORES CON LOS TUYOS DE EMAILJS
    const SERVICE_ID = 'service_0t7rujq';  // Tu Service ID (ej: service_z8s9d8s)
    const TEMPLATE_ID = 'template_hx9719f'; // Tu Template ID (ej: template_k2j9s8d)
    const PUBLIC_KEY = 'OlKg1l5iedr6UKUvd';  // Tu Public Key (está en Account > API Keys)

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          setFormState('success');
          e.target.reset(); // Limpia el formulario
          // Volver a estado normal después de 5 segundos
          setTimeout(() => setFormState('idle'), 5000);
      }, (error) => {
          console.log(error.text);
          setFormState('error');
          // Volver a intentar después de 3 segundos
          setTimeout(() => setFormState('idle'), 3000);
      });
  };

  return (
    <section className="relative w-full bg-[#050505] py-16 md:py-24 px-4 md:px-6 overflow-hidden border-t border-white/5">
      
      {/* Fondo decorativo */}
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-qualtop-orange/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start relative z-10">
        
        {/* --- COLUMNA IZQUIERDA: TEXTO --- */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative lg:sticky lg:top-24"
        >
          <span className="inline-block px-3 py-1 mb-4 md:mb-6 text-[10px] md:text-xs font-bold tracking-widest text-qualtop-orange uppercase border border-qualtop-orange/30 rounded-full bg-qualtop-orange/10">
            Hablemos Claro
          </span>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Conversemos sobre un <span className="text-qualtop-orange bg-clip-text">reto real</span> de tu operación.
          </h2>
          
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 md:mb-10">
            Sin vendedores agresivos. Solo ingenieros y consultores analizando si tu contexto técnico y operativo hace match con nuestras soluciones.
          </p>

          {/* Datos de contacto */}
          <div className="space-y-6 border-t border-white/10 pt-8">
            <div className="flex items-center gap-4 group cursor-pointer">
               <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-qualtop-orange/20 group-hover:text-qualtop-orange transition-all duration-300">
                 <Mail size={18} className="md:w-5 md:h-5" />
               </div>
               <div>
                 <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">Correo</p>
                 <p className="text-white text-sm md:text-base font-medium break-all">hola@qualtop.com</p>
               </div>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
               <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-qualtop-orange/20 group-hover:text-qualtop-orange transition-all duration-300">
                 <Phone size={18} className="md:w-5 md:h-5" />
               </div>
               <div>
                 <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">Teléfono</p>
                 <p className="text-white text-sm md:text-base font-medium">+52 (55) 1234 5678</p>
               </div>
            </div>
          </div>
        </motion.div>


        {/* --- COLUMNA DERECHA: FORMULARIO PRO --- */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full"
        >
          <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-10 shadow-2xl relative overflow-hidden">
             
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-qualtop-orange/50 to-transparent"></div>

             {/* AGREGAMOS ref={form} Y onSubmit={sendEmail} */}
             <form ref={form} onSubmit={sendEmail} className="space-y-5 md:space-y-6">
                
                {/* Fila 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  {/* AGREGAMOS name="user_name" */}
                  <InputGroup name="user_name" label="Nombre completo" required />
                  {/* AGREGAMOS name="user_email" */}
                  <InputGroup name="user_email" label="Correo electrónico" type="email" required />
                </div>

                {/* Fila 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <InputGroup name="company" label="Compañía / Empresa" required />
                  <InputGroup name="phone" label="Número telefónico" type="tel" required />
                </div>

                {/* Fila 3 - Selects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <SelectGroup name="industry" label="Industria" options={["Banca & Finanzas", "Retail", "Manufactura", "Logística", "Otro"]} required />
                  <SelectGroup name="service" label="Servicio de interés" options={["Modernización Tecnológica", "Soluciones de IA", "Consultoría", "Auditoría QA"]} required />
                </div>
                
                {/* Mensaje */}
                <InputGroup name="message" label="Cuéntanos sobre tu reto..." isTextArea required />

                {/* Checkbox Legal */}
                <div className="flex items-start gap-3 mt-2">
                  <div className="relative flex items-center mt-1">
                    <input type="checkbox" required className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-white/20 bg-[#111] checked:border-qualtop-orange checked:bg-qualtop-orange transition-all" />
                    <CheckCircle2 size={14} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Al enviar, apruebas nuestra <a href="#" className="text-gray-400 hover:text-qualtop-orange underline decoration-1 underline-offset-2 transition-colors">Política de privacidad</a>.
                  </p>
                </div>

                {/* Botón Submit con Estados */}
                <button 
                  type="submit" 
                  disabled={formState === 'loading' || formState === 'success'}
                  className={`w-full group relative flex items-center justify-center gap-2 py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-500
                    ${formState === 'success' ? 'bg-green-600 text-white cursor-default' : 
                      formState === 'error' ? 'bg-red-600 text-white' :
                      'bg-qualtop-orange hover:bg-orange-600 text-white shadow-[0_0_20px_rgba(255,77,0,0.3)] hover:shadow-[0_0_40px_rgba(255,77,0,0.5)]'}
                  `}
                >
                  {formState === 'idle' && (
                    <>
                      <span>Enviar Mensaje</span>
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                  {formState === 'loading' && (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Enviando...</span>
                    </>
                  )}
                  {formState === 'success' && (
                    <>
                      <span>¡Mensaje Enviado!</span>
                      <CheckCircle2 size={18} />
                    </>
                  )}
                  {formState === 'error' && (
                    <>
                      <span>Error al enviar</span>
                      <AlertCircle size={18} />
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