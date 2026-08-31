import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Mail, Phone, Loader2, AlertCircle } from 'lucide-react';

// Lista de dominios personales y temporales bloqueados: //
const FREE_EMAIL_DOMAINS = [
  // Proveedores gratuitos personales //
  'gmail.com', 'googlemail.com',
  'hotmail.com', 'outlook.com', 'live.com', 'msn.com',
  'yahoo.com', 'yahoo.es', 'yahoo.com.mx', 'ymail.com',
  'icloud.com', 'me.com', 'mac.com',
  'aol.com', 'protonmail.com', 'proton.me', 'zoho.com',
  // Proveedores de correos temporales //
  'tempmail.com', 'temp-mail.org', '10minutemail.com', 'guerrillamail.com',
  'mailinator.com', 'throwawaymail.com', 'yopmail.com', 'sharklasers.com',
  'dispostable.com', 'trashmail.com', 'getairmail.com', 'mohmal.com'
];

const isCorporateEmail = (email) => {
  if (!email || !email.includes('@')) return false;
  const domain = email.split('@')[1].toLowerCase().trim();
  return !FREE_EMAIL_DOMAINS.includes(domain);
};

const InputGroup = ({ label, name, type = "text", placeholder, required = false, isTextArea = false }) => {
  return (
    <div className="group relative">
      {isTextArea ? (
        <textarea 
          name={name}
          required={required}
          placeholder=" " 
          className="peer w-full bg-white/5 text-white border border-white/10 rounded-lg px-4 py-4 pt-6 outline-none focus:border-qualtop-orange focus:ring-1 focus:ring-qualtop-orange focus:bg-white/10 transition-all duration-300 min-h-[120px] resize-none text-base font-light placeholder-transparent backdrop-blur-sm"
        />
      ) : (
        <input 
          type={type}
          name={name}
          required={required}
          placeholder=" "
          className="peer w-full bg-white/5 text-white border border-white/10 rounded-lg px-4 py-4 pt-6 outline-none focus:border-qualtop-orange focus:ring-1 focus:ring-qualtop-orange focus:bg-white/10 transition-all duration-300 text-base font-light placeholder-transparent backdrop-blur-sm"
        />
      )}
      <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-300 pointer-events-none 
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
        peer-focus:top-2 peer-focus:text-xs peer-focus:text-qualtop-orange
        peer-valid:top-2 peer-valid:text-xs peer-valid:text-gray-400">
        {label} {required && <span className="text-qualtop-orange">*</span>}
      </label>
    </div>
  );
};

const SelectGroup = ({ label, name, options, required = false }) => (
  <div className="group relative">
    <select 
      name={name}
      required={required}
      defaultValue=""
      className="peer w-full bg-white/5 text-white border border-white/10 rounded-lg px-4 py-4 pt-6 outline-none focus:border-qualtop-orange focus:ring-1 focus:ring-qualtop-orange focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer text-base font-light backdrop-blur-sm"
    >
      <option value="" disabled className="text-gray-500"></option>
      {options.map((opt, i) => <option key={i} value={opt} className="bg-[#111] text-white py-2">{opt}</option>)}
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
  const [customError, setCustomError] = useState('');

  const sendEmail = async (e) => {
    e.preventDefault();

    // Extraemos los datos del formulario
    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData.entries());

    // ── 1. VALIDACIÓN DE CORREO CORPORATIVO (FRONTEND) ──
    if (!isCorporateEmail(data.user_email)) {
      setCustomError('Por favor ingresa un correo corporativo de tu empresa (no cuentas personales como Gmail, Hotmail u Outlook).');
      setFormState('error');
      setTimeout(() => {
        setFormState('idle');
        setCustomError('');
      }, 5000);
      return;
    }

    setFormState('loading');
    setCustomError('');

    // Validación de script de reCAPTCHA
    if (!window.grecaptcha) {
      setFormState('error');
      setCustomError('Error de seguridad. Recarga la página e intenta de nuevo.');
      setTimeout(() => setFormState('idle'), 4000);
      return;
    }

    // 2. Generamos el Token de reCAPTCHA v3
    window.grecaptcha.ready(function() {
      window.grecaptcha.execute('6LeXCr0sAAAAAAIxiMH34WPnYqV46m_7X7p-R78H', { action: 'submit' }).then(async function(token) {
        data.recaptcha_token = token;

        // 3. Enviamos a PHP con ruta relativa automática
        try {
          const response = await fetch('/enviar_correo.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          const result = await response.json();

          if (response.ok && result.status === 'success') {
            setFormState('success');
            if (form.current) form.current.reset();
            setTimeout(() => setFormState('idle'), 5000);
          } else {
            setCustomError(result.message || 'Error del servidor al procesar tu solicitud.');
            setFormState('error');
            setTimeout(() => {
              setFormState('idle');
              setCustomError('');
            }, 5000);
          }

        } catch (error) {
          setCustomError('Error de conexión. Intenta nuevamente.');
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
    <section id="contacto" className="relative w-full bg-[#050505] py-16 md:py-24 px-4 md:px-6 overflow-hidden border-t border-white/5 scroll-mt-20">
      
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-qualtop-orange/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen opacity-40 translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-30"></div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative lg:sticky lg:top-32"
        >
          <span className="inline-block px-3 py-1 mb-4 md:mb-6 text-[10px] md:text-xs font-bold tracking-widest text-qualtop-orange uppercase border border-qualtop-orange/30 rounded-full bg-qualtop-orange/5 backdrop-blur-md">
            Hablemos Claro
          </span>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Conversemos sobre un <span className="text-transparent bg-clip-text bg-gradient-to-r from-qualtop-orange to-orange-400">reto real</span> de tu operación.
          </h2>
          
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
            Sin vendedores agresivos. Solo ingenieros y consultores analizando si tu contexto técnico y operativo hace match con nuestras soluciones.
          </p>

          <div className="space-y-6 border-t border-white/10 pt-8">
            <a href="mailto:info@qualtop.com" className="flex items-center gap-4 group w-fit">
               <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-qualtop-orange group-hover:text-white text-gray-400 transition-all duration-300 border border-white/5">
                 <Mail size={20} />
               </div>
               <div>
                 <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Correo Electrónico</p>
                 <p className="text-white text-base font-medium group-hover:text-qualtop-orange transition-colors">info@qualtop.com</p>
               </div>
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full"
        >
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] relative overflow-hidden group">
             
             <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-qualtop-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

             <form ref={form} onSubmit={sendEmail} className="space-y-5 relative z-10">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputGroup name="user_name" label="Nombre completo" required />
                  <InputGroup name="user_email" label="Correo corporativo" type="email" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputGroup name="company" label="Empresa" required />
                  <InputGroup name="phone" label="Teléfono" type="tel" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <SelectGroup name="industry" label="Industria" options={["Banca & Finanzas", "Retail", "Manufactura", "Logística", "Tecnología", "Otro"]} />
                  <SelectGroup name="service" label="Interés Principal" options={["Modernización de Apps", "Inteligencia Artificial", "QA & Testing", "Consultoría Cloud", "Staffing IT"]} required />
                </div>
                
                <InputGroup name="message" label="¿Cómo podemos ayudarte?" isTextArea required />

                {/* Mensaje de error visible si la validación falla */}
                {customError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-xs leading-relaxed">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{customError}</span>
                  </div>
                )}

                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex items-start gap-3">
                    <div className="relative flex items-center mt-1">
                      <input type="checkbox" required id="privacy" className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-white/20 bg-white/5 checked:border-qualtop-orange checked:bg-qualtop-orange transition-all" />
                      <CheckCircle2 size={12} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <label htmlFor="privacy" className="text-xs text-gray-500 leading-relaxed cursor-pointer select-none">
                      He leído y acepto el <a href="./aviso-privacidad" className="text-gray-400 hover:text-qualtop-orange underline transition-colors">Aviso de Privacidad</a>.
                    </label>
                  </div>
                  <span className="text-[10px] text-gray-600 pl-7">Este sitio está protegido por reCAPTCHA y se aplican la <a href="https://policies.google.com/privacy" className="underline hover:text-gray-400" target="_blank" rel="noreferrer">Política de Privacidad</a> y los <a href="https://policies.google.com/terms" className="underline hover:text-gray-400" target="_blank" rel="noreferrer">Términos de Servicio</a> de Google.</span>
                </div>

                <button 
                  type="submit" 
                  disabled={formState === 'loading' || formState === 'success'}
                  className={`w-full group relative flex items-center justify-center gap-2 py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-300 transform active:scale-[0.98] border border-transparent
                    ${formState === 'success' ? 'bg-green-600/90 text-white cursor-default backdrop-blur-md' : 
                      formState === 'error' ? 'bg-red-600/90 text-white backdrop-blur-md' :
                      'bg-qualtop-orange hover:bg-[#ff5e1a] text-white shadow-[0_0_20px_rgba(255,77,0,0.3)] hover:shadow-[0_0_30px_rgba(255,77,0,0.5)]'}
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
                      <span>Verifica tus datos</span>
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