import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Mail, AlertCircle } from 'lucide-react';

// Lista de dominios personales y temporales bloqueados
const FREE_EMAIL_DOMAINS = [
  // Gratuitos personales comunes
  'gmail.com', 'googlemail.com',
  'hotmail.com', 'outlook.com', 'live.com', 'msn.com',
  'yahoo.com', 'yahoo.es', 'yahoo.com.mx', 'ymail.com',
  'icloud.com', 'me.com', 'mac.com',
  'aol.com', 'protonmail.com', 'proton.me', 'zoho.com',
  // Temporales / Desechables
  'tempmail.com', 'temp-mail.org', '10minutemail.com', 'guerrillamail.com',
  'mailinator.com', 'throwawaymail.com', 'yopmail.com', 'sharklasers.com',
  'dispostable.com', 'trashmail.com', 'getairmail.com', 'mohmal.com'
];

const isCorporateEmail = (email) => {
  if (!email || !email.includes('@')) return false;
  const domain = email.split('@')[1].toLowerCase().trim();
  return !FREE_EMAIL_DOMAINS.includes(domain);
};

// --- INPUTS REUTILIZABLES ---
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
  const [customError, setCustomError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ── 1. VALIDACIÓN DE CORREO CORPORATIVO (FRONTEND) ──
    if (!isCorporateEmail(formData.email)) {
      setCustomError('Por favor ingresa un correo corporativo de tu empresa (no se admiten cuentas personales como Gmail, Hotmail u Outlook).');
      setFormState('error');
      setTimeout(() => {
        setFormState('idle');
        setCustomError('');
      }, 5000);
      return;
    }

    setFormState('loading');
    setCustomError('');

    // Validación del script reCAPTCHA
    if (!window.grecaptcha) {
      console.error('El script de reCAPTCHA no se ha cargado.');
      setFormState('error');
      setCustomError('Error de seguridad. Por favor recarga la página e intenta de nuevo.');
      setTimeout(() => {
        setFormState('idle');
        setCustomError('');
      }, 4000);
      return;
    }

    // 2. Generar Token reCAPTCHA v3
    window.grecaptcha.ready(function() {
      window.grecaptcha.execute('6LeXCr0sAAAAAAIxiMH34WPnYqV46m_7X7p-R78H', { action: 'submit' }).then(async function(token) {
        
        const dataToSend = {
          ...formData,
          email: formData.email.trim().toLowerCase(),
          recaptcha_token: token
        };

        // 3. Envío con ruta relativa automática
        try {
          const respuesta = await fetch('/enviar_proyecto.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
          });

          const result = await respuesta.json();

          if (respuesta.ok && result.status === 'success') {
            setFormState('success');
            setFormData({ nombre: '', email: '', empresa: '', telefono: '', industria: '', servicio: '', mensaje: '' });
            setTimeout(() => setFormState('idle'), 4000);
          } else {
            setCustomError(result.message || 'Error al procesar la solicitud.');
            setFormState('error');
            setTimeout(() => {
              setFormState('idle');
              setCustomError('');
            }, 5000);
          }
        } catch (error) {
          setCustomError('Error de conexión con el servidor.');
          setFormState('error');
          setTimeout(() => {
            setFormState('idle');
            setCustomError('');
          }, 4000);
        }

      });
    });
  };

  return (
    <div className="w-full scroll-mt-32 relative z-10" id="contact-form-section">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">        
        
        {/* --- COLUMNA IZQUIERDA --- */}
        <div className="lg:col-span-5 pt-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-qualtop-orange uppercase border border-qualtop-orange/30 rounded-full bg-qualtop-orange/10">
               Contáctanos
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Hablemos sobre tu <br/><span className="text-qualtop-orange">gran proyecto.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Cuéntanos tus ideas, retos o necesidades y nuestro equipo se pondrá en contacto contigo para encontrar la mejor solución. En Qualtop, cada conversación es el primer paso hacia una transformación real.
            </p>
            
            <div className="space-y-6 border-t border-white/10 pt-8">
                <a href="mailto:info@qualtop.com" className="flex items-center gap-4 group cursor-pointer w-fit">
                   <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-qualtop-orange/20 group-hover:text-qualtop-orange transition-all duration-300">
                     <Mail size={20} className="text-white group-hover:text-qualtop-orange transition-colors" />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500 uppercase tracking-wider">Correo</p>
                     <p className="text-white font-medium group-hover:text-qualtop-orange transition-colors">info@qualtop.com</p>
                   </div>
                </a>
            </div>
          </motion.div>
        </div>

        {/* --- COLUMNA DERECHA --- */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative" 
          >
             <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProInput label="Nombre completo" name="nombre" value={formData.nombre} onChange={handleChange} required />
                  <ProInput label="Correo corporativo" type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProInput label="Compañía / Empresa" name="empresa" value={formData.empresa} onChange={handleChange} required />
                  <ProInput label="Teléfono" type="tel" name="telefono" value={formData.telefono} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <ProSelect label="Industria" name="industria" options={['Tecnología', 'Finanzas', 'Retail', 'Otro']} value={formData.industria} onChange={handleChange} />
                   <ProSelect label="Servicio de interés" name="servicio" options={['Modernización Tecnológica', 'Soluciones de negocio con IA']} value={formData.servicio} onChange={handleChange} required />
                </div>
                <ProTextArea label="Cuéntanos sobre tu reto..." name="mensaje" value={formData.mensaje} onChange={handleChange} required />

                {/* Mensaje de error visible */}
                {customError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-xs leading-relaxed">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{customError}</span>
                  </div>
                )}

                <div className="flex items-start gap-3 mt-2">
                  <div className="relative flex items-center">
                    <input type="checkbox" required className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-white/20 bg-[#111] checked:border-qualtop-orange checked:bg-qualtop-orange transition-all" />
                    <CheckCircle2 size={14} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Al hacer click en enviar, apruebas a Qualtop el uso y distribución de tus datos personales. Para más información visita nuestro <a href="./aviso-privacidad" className="text-gray-400 hover:text-qualtop-orange underline decoration-1 underline-offset-2 transition-colors">Aviso de privacidad</a>.
                    <br/>
                    <span className="text-[10px] text-gray-600 mt-1 block">Este sitio está protegido por reCAPTCHA y se aplican la <a href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noreferrer">Política de Privacidad</a> y los <a href="https://policies.google.com/terms" className="underline" target="_blank" rel="noreferrer">Términos de Servicio</a> de Google.</span>
                  </p>
                </div>

                <button 
                  type="submit" 
                  disabled={formState === 'loading' || formState === 'success'}
                  className={`w-full group relative flex items-center justify-center gap-2 py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-500
                    ${formState === 'success' ? 'bg-green-600 text-white cursor-default' : 
                      formState === 'error' ? 'bg-red-600/90 text-white' :
                      'bg-qualtop-orange hover:bg-[#ff5f1a] text-white shadow-[0_4px_20px_rgba(255,77,0,0.3)] hover:shadow-[0_4px_30px_rgba(255,77,0,0.5)]'}
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
                  {formState === 'error' && (
                    <><span>Verifica tus datos</span><AlertCircle size={18} /></>
                  )}
                </button>

             </form>
          </motion.div>
        </div>

      </div>
    </div>
  );
}