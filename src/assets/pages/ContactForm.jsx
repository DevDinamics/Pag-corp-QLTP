import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Mail, Phone, Check } from 'lucide-react';

// --- TUS INPUTS REUTILIZABLES (Sin cambios) ---
const ProInput = ({ label, type = "text", name, value, onChange, required = false }) => {
  return (
    <div className="group relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" " 
        className="peer w-full bg-[#111] text-white border border-white/10 rounded-lg px-4 py-4 pt-6 outline-none focus:border-qualtop-orange focus:ring-1 focus:ring-qualtop-orange transition-all duration-300"
      />
      <label className={`absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 pointer-events-none 
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
        peer-focus:top-1 peer-focus:text-xs peer-focus:text-qualtop-orange
        peer-valid:top-1 peer-valid:text-xs peer-valid:text-gray-400
        ${value ? 'top-1 text-xs text-gray-400' : ''}
      `}>
        {label} {required && <span className="text-qualtop-orange">*</span>}
      </label>
    </div>
  );
};

const ProSelect = ({ label, name, value, onChange, options, required = false }) => {
  return (
    <div className="group relative">
      <select 
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="peer w-full bg-[#111] text-white border border-white/10 rounded-lg px-4 py-4 pt-6 outline-none focus:border-qualtop-orange focus:ring-1 focus:ring-qualtop-orange transition-all duration-300 appearance-none cursor-pointer"
      >
        <option value="" disabled hidden></option>
        {options.map((opt, i) => (
          <option key={i} value={opt} className="bg-[#111] py-2">{opt}</option>
        ))}
      </select>
      <label className={`absolute left-4 transition-all duration-300 pointer-events-none 
        ${value ? 'top-1 text-xs text-gray-400' : 'top-4 text-base text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-qualtop-orange'}
      `}>
        {label} {required && <span className="text-qualtop-orange">*</span>}
      </label>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 peer-focus:text-qualtop-orange transition-colors">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </div>
  );
};

const ProTextArea = ({ label, name, value, onChange, required = false }) => {
  return (
    <div className="group relative">
      <textarea 
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className="peer w-full bg-[#111] text-white border border-white/10 rounded-lg px-4 py-4 pt-6 outline-none focus:border-qualtop-orange focus:ring-1 focus:ring-qualtop-orange transition-all duration-300 min-h-[140px] resize-none"
      />
      <label className={`absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 pointer-events-none 
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
        peer-focus:top-1 peer-focus:text-xs peer-focus:text-qualtop-orange
        peer-valid:top-1 peer-valid:text-xs peer-valid:text-gray-400
        ${value ? 'top-1 text-xs text-gray-400' : ''}
      `}>
        {label} {required && <span className="text-qualtop-orange">*</span>}
      </label>
    </div>
  );
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '', email: '', empresa: '', telefono: '', industria: '', servicio: '', mensaje: ''
  });
  const [formState, setFormState] = useState('idle'); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
      console.log("Datos enviados:", formData);
    }, 2000);
  };

  return (
    <div className="w-full scroll-mt-32 relative z-10" id="contact-form-section">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">        
        
        {/* --- COLUMNA IZQUIERDA (Texto) --- */}
        <div className="lg:col-span-5 pt-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-qualtop-orange uppercase border border-qualtop-orange/30 rounded-full bg-qualtop-orange/10">
               Contáctanos
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Hablemos sobre tu <br/><span className="text-qualtop-orange">próximo reto.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Cuéntanos tus ideas o necesidades y nuestro equipo conectará contigo para encontrar la mejor solución tecnológica.
            </p>
            
            <div className="space-y-6 border-t border-white/10 pt-8">
                <div className="flex items-center gap-4 group cursor-pointer">
                   <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-qualtop-orange/20 group-hover:text-qualtop-orange transition-all duration-300">
                     <Mail size={20} className="text-white group-hover:text-qualtop-orange transition-colors" />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500 uppercase tracking-wider">Correo</p>
                     <p className="text-white font-medium group-hover:text-qualtop-orange transition-colors">hola@qualtop.com</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                   <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-qualtop-orange/20 group-hover:text-qualtop-orange transition-all duration-300">
                     <Phone size={20} className="text-white group-hover:text-qualtop-orange transition-colors" />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500 uppercase tracking-wider">Teléfono</p>
                     <p className="text-white font-medium group-hover:text-qualtop-orange transition-colors">+52 (55) 1234 5678</p>
                   </div>
                </div>
            </div>
          </motion.div>
        </div>

        {/* --- COLUMNA DERECHA (Formulario Integrado) --- */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            // CAMBIO CLAVE AQUÍ: Quitamos el bg-[#0a0a0a], el borde y el shadow. Ahora es transparente.
            className="relative" 
          >
             <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProInput label="Nombre completo" name="nombre" value={formData.nombre} onChange={handleChange} required />
                  <ProInput label="Correo electrónico" type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProInput label="Compañía / Empresa" name="empresa" value={formData.empresa} onChange={handleChange} required />
                  <ProInput label="Número telefónico" type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <ProSelect label="Industria" name="industria" options={['Tecnología', 'Finanzas', 'Retail', 'Salud', 'Manufactura']} value={formData.industria} onChange={handleChange} required />
                   <ProSelect label="Servicio de interés" name="servicio" options={['Software Development', 'AI Solutions', 'Consultoría TI', 'Staff Augmentation']} value={formData.servicio} onChange={handleChange} required />
                </div>
                <ProTextArea label="Cuéntanos sobre tu reto..." name="mensaje" value={formData.mensaje} onChange={handleChange} required />

                <div className="flex items-start gap-3 mt-2">
                  <div className="relative flex items-center">
                    <input type="checkbox" required className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-white/20 bg-[#111] checked:border-qualtop-orange checked:bg-qualtop-orange transition-all" />
                    <CheckCircle2 size={14} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Al hacer click en enviar, apruebas a Qualtop el uso y distribución de tus datos personales. <a href="#" className="text-gray-400 hover:text-qualtop-orange underline decoration-1 underline-offset-2 transition-colors">Política de privacidad</a>.
                  </p>
                </div>

                <button 
                  type="submit" 
                  disabled={formState !== 'idle'}
                  className={`w-full group relative flex items-center justify-center gap-2 py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-500
                    ${formState === 'success' ? 'bg-green-600 text-white cursor-default' : 'bg-qualtop-orange hover:bg-[#ff5f1a] text-white shadow-[0_4px_20px_rgba(255,77,0,0.3)] hover:shadow-[0_4px_30px_rgba(255,77,0,0.5)]'}
                    ${formState === 'loading' ? 'cursor-wait opacity-80' : ''}
                  `}
                >
                  {formState === 'idle' && (
                    <><span>Enviar Mensaje</span><Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                  )}
                  {formState === 'loading' && (
                     <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  )}
                  {formState === 'success' && (
                    <><span>¡Mensaje Enviado!</span><CheckCircle2 size={18} /></>
                  )}
                </button>

             </form>
          </motion.div>
        </div>

      </div>
    </div>
  );
}