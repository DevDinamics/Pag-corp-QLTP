import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'; 
import {
  MapPin, Briefcase, ChevronRight, Send, Search, Sparkles,
  X, Upload, User, Mail, MessageCircle, Smartphone,
  DollarSign, CheckCircle2, ChevronDown, Loader2
} from 'lucide-react';
import { client } from '../client';
import CandidaturaEspontanea from './CandidaturaEspontanea';
import ReCAPTCHA from "react-google-recaptcha";

const BRAND = {
  accent: '#E8500A',
  accentMid: '#F4651F',
  accentSoft: 'rgba(232,80,10,0.10)',
  accentBorder: 'rgba(232,80,10,0.25)',
};

const OPCIONES_AREA = [
  "Inteligencia Artificial y Machine Learning",
  "Ciencia y Analítica de Datos (Data Science / Analytics)",
  "Gestión de Producto (Product Management)",
  "Metodologías Ágiles (Agile Coach / Scrum Master)",
  "Análisis de Negocio (Business Analyst)",
  "Diseño UX/UI (User Experience / User Interface)",
  "Cloud Computing (Arquitectos / Ingenieros de Nube)",
  "DevOps / SRE (Site Reliability Engineering)",
  "Ciberseguridad",
  "Blockchain",
  "SAP",
  "IoT",
  "Otro"
];

// NUEVA LISTA DE OPCIONES
const OPCIONES_ENTERASTE = [
  "Recomendación de un conocido",
  "Buscadores",
  "Sitio web de Qualtop",
  "AMITI",
  "LinkedIn",
  "Facebook",
  "Instagram",
  "Evento o conferencia",
  "Sesión virtual",
  "Correo electrónico",
  "Medio de comunicación",
  "Otro"
];

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbylVS2tFPgwRFDrb-FpVC5HV7ZZMewKqrgu4R7CrsT-DXHzfoDuQSLwzOigAZeFgF4CIg/exec";

// ── PROGRESS DOTS ────────────────────────────────────────────────────────────
const ProgressDots = ({ total, current }) => (
  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
    {Array.from({ length: total }).map((_, i) => (
      <motion.div
        key={i}
        animate={{
          width: i + 1 === current ? 20 : 6,
          backgroundColor: i + 1 <= current ? BRAND.accent : 'rgba(255,255,255,0.15)',
        }}
        transition={{ duration: 0.3 }}
        style={{ height: 6, borderRadius: 99 }}
      />
    ))}
  </div>
);

// ── FIELD ────────────────────────────────────────────────────────────────────
const Field = ({ icon: Icon, ...rest }) => (
  <div style={{ position: 'relative' }}>
    {Icon && (
      <Icon size={15} style={{
        position: 'absolute', left: 14, top: '50%',
        transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none',
      }} />
    )}
    <input
      {...rest}
      style={{
        width: '100%', boxSizing: 'border-box',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 12, padding: '12px 14px',
        paddingLeft: Icon ? 40 : 14,
        color: '#fff', fontSize: 'max(16px, 14px)', outline: 'none',
        transition: 'border-color .2s, background .2s',
      }}
      onFocus={e => { e.target.style.borderColor = BRAND.accent; e.target.style.background = 'rgba(255,255,255,0.07)'; }}
      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
    />
  </div>
);

// ── CONTACT PICKER ───────────────────────────────────────────────────────────
const ContactPicker = ({ value, onChange, telefono, onTelChange, codigoPais, onCodigoChange }) => {
  const methods = [
    { id: 'whatsapp', label: 'WhatsApp', Icon: MessageCircle },
    { id: 'email', label: 'Email', Icon: Mail },
    { id: 'llamada', label: 'Llamada', Icon: Smartphone },
  ];
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 14, padding: '14px 14px 12px',
    }}>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>
        ¿Por dónde prefieres que te contactemos?
      </p>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 6, background: 'rgba(0,0,0,0.25)', borderRadius: 10, padding: 5,
      }}>
        {methods.map(({ id, label, Icon }) => (
          <button key={id} type="button" onClick={() => onChange(id)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '9px 6px', borderRadius: 8, border: 'none', cursor: 'pointer',
            fontSize: 12, fontWeight: 600,
            background: value === id ? BRAND.accent : 'transparent',
            color: value === id ? '#fff' : 'rgba(255,255,255,0.4)',
            transition: 'all .2s', WebkitTapHighlightColor: 'transparent',
          }}>
            <Icon size={13} />{label}
          </button>
        ))}
      </div>
      <AnimatePresence>
        {value !== 'email' && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 10 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={{
                position: 'absolute', left: 2, top: '50%',
                transform: 'translateY(-50%)', display: 'flex', alignItems: 'center',
              }}>
                <select
                  name="codigoPais" value={codigoPais} onChange={onCodigoChange}
                  style={{
                    background: 'transparent', color: 'rgba(255,255,255,0.7)',
                    border: 'none', fontSize: 13, outline: 'none',
                    appearance: 'none', cursor: 'pointer', padding: '8px 4px 8px 12px', zIndex: 2,
                  }}
                >
                  <option value="+52" style={{ color: '#000' }}>+52 🇲🇽</option>
                  <option value="+1" style={{ color: '#000' }}>+1 🇺🇸</option>
                  <option value="+57" style={{ color: '#000' }}>+57 🇨🇴</option>
                  <option value="+54" style={{ color: '#000' }}>+54 🇦🇷</option>
                  <option value="+51" style={{ color: '#000' }}>+51 🇵🇪</option>
                  <option value="+56" style={{ color: '#000' }}>+56 🇨🇱</option>
                  <option value="+55" style={{ color: '#000' }}>+55 🇧🇷</option>
                  <option value="+593" style={{ color: '#000' }}>+593 🇪🇨</option>
                  <option value="+58" style={{ color: '#000' }}>+58 🇻🇪</option>
                  <option value="+34" style={{ color: '#000' }}>+34 🇪🇸</option>
                  <option value="+44" style={{ color: '#000' }}>+44 🇬🇧</option>
                </select>
                <ChevronDown size={11} style={{ color: 'rgba(255,255,255,0.3)', marginLeft: -2, marginRight: 8, pointerEvents: 'none' }} />
                <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
              </div>
              <input
                type="tel" name="telefono" value={telefono} onChange={onTelChange}
                placeholder="Número a 10 dígitos"
                required={value !== 'email'}
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10, padding: '10px 14px 10px 88px',
                  color: '#fff', fontSize: 'max(16px, 13px)', outline: 'none',
                  transition: 'border-color .2s',
                }}
                onFocus={e => e.target.style.borderColor = BRAND.accent}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── CV UPLOADER ──────────────────────────────────────────────────────────────
const CVUploader = ({ file, onChange, id = 'cv-upload' }) => (
  <div>
    <input type="file" id={id} accept=".pdf,.doc,.docx" onChange={onChange} style={{ display: 'none' }} />
    <label htmlFor={id} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: 6,
      width: '100%', height: 100,
      border: `1.5px dashed ${file ? BRAND.accent : 'rgba(255,255,255,0.12)'}`,
      borderRadius: 14, cursor: 'pointer',
      background: file ? BRAND.accentSoft : 'rgba(255,255,255,0.03)',
      transition: 'all .25s', WebkitTapHighlightColor: 'transparent',
    }}>
      <Upload size={22} color={file ? BRAND.accent : 'rgba(255,255,255,0.3)'} />
      <span style={{ fontSize: 13, color: file ? '#fff' : 'rgba(255,255,255,0.5)' }}>
        {file ? file.name : 'Adjunta tu CV (PDF o Word)'}
      </span>
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Máx. 5 MB</span>
    </label>
  </div>
);

// ── SUCCESS SCREEN ───────────────────────────────────────────────────────────
const SuccessScreen = ({ title, body, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    style={{ textAlign: 'center', padding: '24px 0' }}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.1, type: 'spring', stiffness: 280 }}
      style={{
        width: 72, height: 72, borderRadius: '50%',
        background: BRAND.accentSoft, border: `1.5px solid ${BRAND.accentBorder}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 20px',
      }}
    >
      <CheckCircle2 size={32} color={BRAND.accent} />
    </motion.div>
    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{title}</h3>
    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 280, margin: '0 auto 28px' }}>
      {body}
    </p>
    <button
      onClick={onClose}
      style={{
        padding: '10px 28px', borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.06)',
        color: 'rgba(255,255,255,0.7)', fontSize: 13, cursor: 'pointer',
        transition: 'all .2s', WebkitTapHighlightColor: 'transparent',
      }}
    >Cerrar</button>
  </motion.div>
);

const useScrollLock = (active) => {
  useEffect(() => {
    if (!active) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prevStyle = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      overflow: body.style.overflow,
    };
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.overflow = 'hidden';
    return () => {
      body.style.position = prevStyle.position;
      body.style.top = prevStyle.top;
      body.style.left = prevStyle.left;
      body.style.right = prevStyle.right;
      body.style.overflow = prevStyle.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [active]);
};

// ── MODAL BASE ───────────────────────────────────────────────────────────────
const Modal = ({ children, onClose }) => {
  const [visible, setVisible] = useState(false);
  const closingRef = useRef(false);

  useScrollLock(true);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') triggerClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const triggerClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 340);
  };

  const y = useMotionValue(0);
  const scrollRef = useRef(null);

  const handleDragEnd = (_, info) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      triggerClose();
    } else {
      animate(y, 0, { type: 'spring', stiffness: 420, damping: 40 });
    }
  };

  return (
    <>
      <style>{`
        @media (min-width: 600px) {
          .modal-sheet { border-radius: 24px !important; max-width: 480px !important; }
          .modal-wrap  { align-items: center !important; padding: 24px !important; }
        }
        .modal-scroll {
          overflow-y: auto;
          max-height: 92dvh;
          padding: 28px 24px 40px;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-y: contain;
          touch-action: pan-y;
        }
        .modal-scroll::-webkit-scrollbar { width: 3px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 99px; }
      `}</style>

      <motion.div
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        onClick={triggerClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(0,0,0,0.72)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }}
      >
        <div
          className="modal-wrap"
          style={{
            position: 'relative', zIndex: 1, width: '100%',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          }}
          onClick={e => e.stopPropagation()}
        >
          <motion.div
            className="modal-sheet"
            style={{
              y,
              position: 'relative', width: '100%', maxWidth: 480,
              background: '#101010',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px 24px 0 0',
              overflow: 'hidden',
              boxShadow: '0 -24px 80px rgba(0,0,0,0.7)',
              willChange: 'transform',
            }}
            initial={{ y: '100%' }}
            animate={{ y: visible ? 0 : '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40, mass: 0.8 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.04, bottom: 0 }}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            onClick={e => e.stopPropagation()}
            onPointerDown={e => {
              if (scrollRef.current?.scrollTop > 0) e.stopPropagation();
            }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, transparent, ${BRAND.accent}, transparent)`,
              pointerEvents: 'none',
            }} />
            <div style={{
              paddingTop: 14, paddingBottom: 6,
              display: 'flex', justifyContent: 'center',
              touchAction: 'none', cursor: 'grab',
            }}>
              <div style={{ width: 36, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.15)' }} />
            </div>
            <button
              onClick={triggerClose}
              aria-label="Cerrar"
              style={{
                position: 'absolute', top: 14, right: 14, zIndex: 10,
                width: 30, height: 30, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background .2s', WebkitTapHighlightColor: 'transparent',
              }}
            >
              <X size={14} color="rgba(255,255,255,0.55)" />
            </button>
            <div ref={scrollRef} className="modal-scroll">
              {children}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

// ── SPONTANEOUS APPLY MODAL ──────────────────────────────────────────────────
const SpontaneousApplyModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef(null);

  const [formData, setFormData] = useState({
    nombre: '', email: '', telefono: '', codigoPais: '+52',
    metodoContacto: 'whatsapp', areaInteres: OPCIONES_AREA[0], cvFile: null,
    comoTeEnteraste: OPCIONES_ENTERASTE[0], comoTeEnterasteOtro: '',
  });

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleFile = e => e.target.files?.[0] && setFormData(p => ({ ...p, cvFile: e.target.files[0] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.cvFile) return alert("Por favor adjunta tu CV.");
    setIsSubmitting(true);
    try {
      const token = await recaptchaRef.current.executeAsync();
      if (!token) {
        alert("Error de seguridad. Por favor, recarga la página.");
        recaptchaRef.current.reset();
        setIsSubmitting(false);
        return;
      }
      const fileToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
      });
      const cvBase64Content = await fileToBase64(formData.cvFile);
      
      const payload = {
        nombre: formData.nombre, email: formData.email,
        telefono: `${formData.codigoPais} ${formData.telefono}`,
        area: "Postulación abierta",
        puesto: "Interés en: " + formData.areaInteres,
        cvBase64: cvBase64Content, cvMimeType: formData.cvFile.type,
        comoTeEnteraste: formData.comoTeEnteraste === 'Otro' ? `Otro: ${formData.comoTeEnterasteOtro}` : formData.comoTeEnteraste,
        recaptchaToken: token,
      };
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === "error") throw new Error(result.mensaje);
      recaptchaRef.current.reset();
      setIsSubmitting(false);
      setStep(2);
    } catch (error) {
      console.error("Error en el envío:", error);
      alert("Hubo un error al enviar tu información. Intenta de nuevo.");
      recaptchaRef.current.reset();
      setIsSubmitting(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      {step === 1 ? (
        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ marginBottom: 20 }}>
            <span style={{ fontSize: 10, letterSpacing: '0.3em', color: BRAND.accent, fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              Talent Network
            </span>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Únete a nuestra red</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
              Déjanos tu CV y te avisamos cuando haya un reto para ti.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            <Field icon={User} type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre completo" required />
            <Field icon={Mail} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo electrónico" required />
            <ContactPicker
              value={formData.metodoContacto}
              onChange={v => setFormData(p => ({ ...p, metodoContacto: v }))}
              telefono={formData.telefono} onTelChange={handleChange}
              codigoPais={formData.codigoPais} onCodigoChange={handleChange}
            />
            <div>
              <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8, display: 'block' }}>
                ¿En qué área te gustaría desarrollarte?
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  name="areaInteres" value={formData.areaInteres} onChange={handleChange}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    borderRadius: 12, padding: '12px 36px 12px 14px',
                    color: '#fff', fontSize: 13, outline: 'none', appearance: 'none', cursor: 'pointer',
                  }}
                >
                  {OPCIONES_AREA.map(a => (
                    <option key={a} value={a} style={{ color: '#000' }}>{a}</option>
                  ))}
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* NUEVO CAMPO */}
            <div>
              <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8, display: 'block' }}>
                ¿Cómo te enteraste de nosotros?
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  name="comoTeEnteraste" value={formData.comoTeEnteraste} onChange={handleChange}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    borderRadius: 12, padding: '12px 36px 12px 14px',
                    color: '#fff', fontSize: 13, outline: 'none', appearance: 'none', cursor: 'pointer',
                  }}
                >
                  {OPCIONES_ENTERASTE.map(o => (
                    <option key={o} value={o} style={{ color: '#000' }}>{o}</option>
                  ))}
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
              </div>
            </div>

            <AnimatePresence>
              {formData.comoTeEnteraste === 'Otro' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                  <Field type="text" name="comoTeEnterasteOtro" value={formData.comoTeEnterasteOtro} onChange={handleChange} placeholder="Si seleccionaste 'Otro', por favor especifícalo" required />
                </motion.div>
              )}
            </AnimatePresence>

            <CVUploader file={formData.cvFile} onChange={handleFile} id="cv-spont" />
          </div>
          <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey="6LeXCr0sAAAAAAIxiMH34WPnYqV46m_7X7p-R78H" />
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 16, textAlign: 'center', lineHeight: 1.4 }}>
            Este sitio está protegido por reCAPTCHA y se aplican la{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>Política de Privacidad</a> y los{' '}
            <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>Términos de Servicio</a> de Google.
          </div>
          <button
            type="submit" disabled={isSubmitting}
            style={{
              width: '100%', padding: '14px', borderRadius: 16,
              background: BRAND.accent, border: 'none',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
              color: '#fff', fontSize: 14, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'background .2s, transform .1s',
              boxShadow: `0 8px 24px ${BRAND.accentSoft}`,
              WebkitTapHighlightColor: 'transparent',
            }}
            onMouseEnter={e => !isSubmitting && (e.currentTarget.style.background = BRAND.accentMid)}
            onMouseLeave={e => !isSubmitting && (e.currentTarget.style.background = BRAND.accent)}
          >
            {isSubmitting
              ? <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>Enviando... <Loader2 size={16} className="animate-spin" /></span>
              : <>Enviar mi CV <Send size={14} /></>}
          </button>
        </motion.form>
      ) : (
        <SuccessScreen
          title="¡Ya estás en el radar!"
          body="Tu CV se guardó en nuestra base de talentos. En cuanto tengamos el reto ideal para ti, te escribiremos."
          onClose={onClose}
        />
      )}
    </Modal>
  );
};

// ── APPLY MODAL (AHORA CON 3 PASOS) ──────────────────────────────────────────
const ApplyModal = ({ job, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef(null);

  const [formData, setFormData] = useState({
    nombre: '', email: '', telefono: '', codigoPais: '+52',
    metodoContacto: 'whatsapp',
    certificado: 'no', certAno: '', certVigente: 'si',
    cvFile: null, certFile: null,
    comoTeEnteraste: OPCIONES_ENTERASTE[0], comoTeEnterasteOtro: '',
  });

  if (!job) return null;
  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleFile = e => e.target.files?.[0] && setFormData(p => ({ ...p, cvFile: e.target.files[0] }));
  const handleCertFile = e => e.target.files?.[0] && setFormData(p => ({ ...p, certFile: e.target.files[0] }));

  // Validación para pasar del Paso 2 al Paso 3
  const handleNextToStep3 = (e) => {
    e.preventDefault();
    if (!formData.cvFile) return alert("Por favor adjunta tu CV.");
    if (formData.certificado === 'si') {
      if (!formData.certAno.trim()) return alert("Por favor ingresa el año de tu certificación.");
      if (!formData.certFile) return alert("Por favor adjunta el documento de tu certificación.");
    }
    setStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = await recaptchaRef.current.executeAsync();
      if (!token) { alert("Error de seguridad."); setIsSubmitting(false); return; }
      const fileToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
      });
      const cvBase64Content = await fileToBase64(formData.cvFile);
      let certBase64Content = null, certMimeType = null;
      if (formData.certificado === 'si' && formData.certFile) {
        certBase64Content = await fileToBase64(formData.certFile);
        certMimeType = formData.certFile.type;
      }
      
      const payload = {
        nombre: formData.nombre, email: formData.email,
        telefono: `${formData.codigoPais} ${formData.telefono}`,
        area: job.area, puesto: job.puesto,
        cvBase64: cvBase64Content, cvMimeType: formData.cvFile.type,
        certBase64: certBase64Content, certMimeType,
        certAno: formData.certificado === 'si' ? formData.certAno : 'N/A',
        certVigente: formData.certificado === 'si' ? formData.certVigente : 'N/A',
        comoTeEnteraste: formData.comoTeEnteraste === 'Otro' ? `Otro: ${formData.comoTeEnterasteOtro}` : formData.comoTeEnteraste,
        recaptchaToken: token,
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === "error") throw new Error(result.mensaje);
      setIsSubmitting(false);
      setStep(4);
    } catch (error) {
      console.error(error);
      alert("Hubo un error al enviar la postulación. Intenta de nuevo.");
      setIsSubmitting(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <ProgressDots total={3} current={step === 4 ? 3 : step} />
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
          {step < 4 ? `PASO ${step} DE 3` : ''}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
            <span style={{ fontSize: 10, letterSpacing: '0.3em', color: BRAND.accent, fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Postulación</span>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6, lineHeight: 1.3 }}>{job.puesto}</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 24 }}>
              <MapPin size={12} /> {job.ubicacion}
            </p>
            {job.requisitos?.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8, marginBottom: 24 }}>
                {job.requisitos.slice(0, 4).map((req, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 10, padding: '10px 12px', fontSize: 12, color: 'rgba(255,255,255,0.5)',
                  }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: BRAND.accent, flexShrink: 0 }} />
                    {req}
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={onClose} style={{
                flex: 1, padding: '13px', borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.1)', background: 'transparent',
                color: 'rgba(255,255,255,0.5)', fontSize: 13, cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}>Cancelar</button>
              <button onClick={() => setStep(2)} style={{
                flex: 2, padding: '13px', borderRadius: 14,
                border: 'none', background: BRAND.accent, color: '#fff', fontSize: 14, fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'background .2s', WebkitTapHighlightColor: 'transparent',
              }}
                onMouseEnter={e => e.currentTarget.style.background = BRAND.accentMid}
                onMouseLeave={e => e.currentTarget.style.background = BRAND.accent}
              >
                Continuar <ChevronRight size={15} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.form key="s2" onSubmit={handleNextToStep3} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Completa tu perfil</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
              Aplicando a: <span style={{ color: 'rgba(255,255,255,0.7)' }}>{job.puesto}</span>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              <Field icon={User} type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre completo" required />
              <Field icon={Mail} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo electrónico" required />
              <ContactPicker
                value={formData.metodoContacto}
                onChange={v => setFormData(p => ({ ...p, metodoContacto: v }))}
                telefono={formData.telefono} onTelChange={handleChange}
                codigoPais={formData.codigoPais} onCodigoChange={handleChange}
              />
              <div style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14, padding: '14px',
              }}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>
                  ¿Cuentas con alguna certificación relacionada al puesto?
                </p>
                <div style={{ display: 'flex', gap: 20, marginBottom: 12 }}>
                  {['si', 'no'].map(v => {
                    const isChecked = formData.certificado === v;
                    return (
                      <label key={v} style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        cursor: 'pointer', fontSize: 13, color: '#fff',
                        WebkitTapHighlightColor: 'transparent',
                      }}>
                        <input
                          type="radio" name="certificado" value={v}
                          checked={isChecked} onChange={handleChange}
                          style={{ display: 'none' }}
                        />
                        <div style={{
                          width: 18, height: 18, borderRadius: '50%',
                          border: `1.5px solid ${isChecked ? BRAND.accent : 'rgba(255,255,255,0.25)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'border-color 0.2s ease',
                        }}>
                          <AnimatePresence>
                            {isChecked && (
                              <motion.div
                                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                style={{ width: 10, height: 10, borderRadius: '50%', background: BRAND.accent }}
                              />
                            )}
                          </AnimatePresence>
                        </div>
                        {v === 'si' ? 'Sí' : 'No'}
                      </label>
                    );
                  })}
                </div>
                <AnimatePresence>
                  {formData.certificado === 'si' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
                        paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)',
                      }}>
                        <div>
                          <label style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Año</label>
                          <input type="text" name="certAno" value={formData.certAno} onChange={handleChange} placeholder="2023" required={formData.certificado === 'si'}
                            style={{
                              width: '100%', boxSizing: 'border-box',
                              background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.08)',
                              borderRadius: 10, padding: '9px 12px', color: '#fff',
                              fontSize: 'max(16px, 13px)', outline: 'none',
                            }} />
                        </div>
                        <div>
                          <label style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>¿Vigente?</label>
                          <div style={{ position: 'relative' }}>
                            <select name="certVigente" value={formData.certVigente} onChange={handleChange}
                              style={{
                                width: '100%', boxSizing: 'border-box',
                                background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 10, padding: '9px 30px 9px 12px',
                                color: '#fff', fontSize: 13, outline: 'none', appearance: 'none',
                              }}>
                              <option value="si">Sí</option>
                              <option value="no">No</option>
                            </select>
                            <ChevronDown size={12} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
                          </div>
                        </div>
                      </div>
                      <div style={{ marginTop: 16 }}>
                        <input type="file" id="cert-upload" accept=".pdf,.png,.jpg,.jpeg" onChange={handleCertFile} style={{ display: 'none' }} />
                        <label htmlFor="cert-upload" style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                          width: '100%', padding: '12px',
                          border: `1px dashed ${formData.certFile ? BRAND.accent : 'rgba(255,255,255,0.15)'}`,
                          borderRadius: 10, cursor: 'pointer',
                          background: formData.certFile ? BRAND.accentSoft : 'rgba(0,0,0,0.2)',
                          transition: 'all 0.2s',
                        }}>
                          <Upload size={14} color={formData.certFile ? BRAND.accent : 'rgba(255,255,255,0.4)'} />
                          <span style={{ fontSize: 12, color: formData.certFile ? '#fff' : 'rgba(255,255,255,0.5)' }}>
                            {formData.certFile ? formData.certFile.name : 'Adjuntar comprobante (PDF o JPG)'}
                          </span>
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <CVUploader file={formData.cvFile} onChange={handleFile} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" onClick={() => setStep(1)} style={{
                padding: '13px 18px', borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.1)', background: 'transparent',
                color: 'rgba(255,255,255,0.5)', fontSize: 13, cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}>Atrás</button>
              <button
                type="submit"
                style={{
                  flex: 1, padding: '13px', borderRadius: 14,
                  border: 'none', background: BRAND.accent,
                  color: '#fff', fontSize: 14, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: `0 6px 20px ${BRAND.accentSoft}`,
                  transition: 'background .2s', WebkitTapHighlightColor: 'transparent', cursor: 'pointer'
                }}
                onMouseEnter={e => e.currentTarget.style.background = BRAND.accentMid}
                onMouseLeave={e => e.currentTarget.style.background = BRAND.accent}
              >
                Continuar <ChevronRight size={15} />
              </button>
            </div>
          </motion.form>
        )}

        {/* NUEVO PASO 3 */}
        {step === 3 && (
          <motion.form key="s3" onSubmit={handleSubmit} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Un último detalle</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
              Ayúdanos a saber cómo llegaste aquí.
            </p>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8, display: 'block' }}>
                ¿Cómo te enteraste de nosotros?
              </label>
              <div style={{ position: 'relative', marginBottom: 12 }}>
                <select
                  name="comoTeEnteraste" value={formData.comoTeEnteraste} onChange={handleChange}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    borderRadius: 12, padding: '12px 36px 12px 14px',
                    color: '#fff', fontSize: 13, outline: 'none', appearance: 'none', cursor: 'pointer',
                  }}
                >
                  {OPCIONES_ENTERASTE.map(o => (
                    <option key={o} value={o} style={{ color: '#000' }}>{o}</option>
                  ))}
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
              </div>

              <AnimatePresence>
                {formData.comoTeEnteraste === 'Otro' && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                    <Field type="text" name="comoTeEnterasteOtro" value={formData.comoTeEnterasteOtro} onChange={handleChange} placeholder="Si seleccionaste 'Otro', por favor especifícalo" required />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey="6LeXCr0sAAAAAAIxiMH34WPnYqV46m_7X7p-R78H" />
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 16, textAlign: 'center', lineHeight: 1.4 }}>
              Este sitio está protegido por reCAPTCHA y se aplican la{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>Política de Privacidad</a> y los{' '}
              <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>Términos de Servicio</a> de Google.
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" onClick={() => setStep(2)} style={{
                padding: '13px 18px', borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.1)', background: 'transparent',
                color: 'rgba(255,255,255,0.5)', fontSize: 13, cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}>Atrás</button>
              <button
                type="submit" disabled={isSubmitting}
                style={{
                  flex: 1, padding: '13px', borderRadius: 14,
                  border: 'none', background: BRAND.accent,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  color: '#fff', fontSize: 14, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: `0 6px 20px ${BRAND.accentSoft}`,
                  transition: 'background .2s', WebkitTapHighlightColor: 'transparent',
                }}
                onMouseEnter={e => !isSubmitting && (e.currentTarget.style.background = BRAND.accentMid)}
                onMouseLeave={e => !isSubmitting && (e.currentTarget.style.background = BRAND.accent)}
              >
                {isSubmitting
                  ? <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>Enviando... <Loader2 size={16} className="animate-spin" /></span>
                  : <>Enviar postulación <Send size={14} /></>}
              </button>
            </div>
          </motion.form>
        )}

        {/* PASO 4 (ÉXITO) */}
        {step === 4 && (
          <motion.div key="s4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <SuccessScreen
              title="¡Postulación enviada!"
              body={`Recibimos tu info para ${job.puesto}. Nuestro equipo te contactará pronto.`}
              onClose={onClose}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

// ── MOBILE DRAWER — Apple-style, sin flicker ────────────────────────────────
const MobileDrawer = ({ job, onClose, onApply }) => {
  const [currentJob, setCurrentJob] = useState(job);
  const [visible, setVisible] = useState(false);

  const y = useMotionValue(0);
  const overlayOpacity = useTransform(y, [0, 600], [1, 0]);
  const scrollRef = useRef(null);
  const closingRef = useRef(false);

  useEffect(() => {
    if (job) {
      closingRef.current = false;
      setCurrentJob(job);
      y.set(0);
      requestAnimationFrame(() => setVisible(true));
    } else {
      triggerClose();
    }
  }, [job]);

  useScrollLock(visible);

  const triggerClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    setVisible(false);
    setTimeout(() => {
      onClose();
      closingRef.current = false;
    }, 380);
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.y > 110 || info.velocity.y > 500) {
      triggerClose();
    } else {
      animate(y, 0, { type: 'spring', stiffness: 420, damping: 40 });
    }
  };

  if (!currentJob) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 900,
        display: 'flex', alignItems: 'flex-end',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      className="lg-hidden"
    >
      <motion.div
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
        onClick={triggerClose}
      />

      <motion.div
        initial={false}
        animate={{ y: visible ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 400, damping: 42, mass: 0.8 }}
        style={{
          y,
          position: 'relative', width: '100%',
          background: 'rgba(13,13,13,0.99)',
          borderTop: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '28px 28px 0 0',
          maxHeight: '88dvh',
          willChange: 'transform',
          boxShadow: '0 -20px 60px rgba(0,0,0,0.6)',
          zIndex: 1,
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.04, bottom: 0 }}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          paddingTop: 14, paddingBottom: 8,
          display: 'flex', justifyContent: 'center',
          touchAction: 'none', cursor: 'grab',
        }}>
          <div style={{ width: 40, height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.2)' }} />
        </div>

        <button
          onClick={triggerClose}
          style={{
            position: 'absolute', top: 14, right: 16, zIndex: 10,
            width: 30, height: 30, borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <X size={14} color="rgba(255,255,255,0.55)" />
        </button>

        <div
          ref={scrollRef}
          style={{
            overflowY: 'auto',
            maxHeight: 'calc(88dvh - 50px)',
            padding: '4px 20px 44px',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            touchAction: 'pan-y',
          }}
          onPointerDown={e => {
            if (scrollRef.current?.scrollTop > 0) e.stopPropagation();
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            <span style={{
              background: BRAND.accentSoft, border: `1px solid ${BRAND.accentBorder}`,
              color: BRAND.accent, fontSize: 10, fontWeight: 700,
              padding: '4px 10px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>{currentJob.tipo}</span>
            {currentJob.isNew && (
              <span style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
                color: '#4ade80', fontSize: 10, fontWeight: 700,
                padding: '4px 10px', borderRadius: 99, textTransform: 'uppercase',
              }}>
                <Sparkles size={9} /> Nuevo
              </span>
            )}
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 6, lineHeight: 1.2 }}>
            {currentJob.puesto}
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 24 }}>
            <MapPin size={12} /> {currentJob.ubicacion}
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24,
            padding: '16px 0',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            {[['Ubicación', currentJob.ubicacion], ['Salario', currentJob.salario]].map(([label, value]) => (
              <div key={label}>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{label}</p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{value}</p>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 24 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: BRAND.accent }} /> Descripción del rol
            </h4>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>{currentJob.desc}</p>
          </div>

          {currentJob.requisitos?.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: BRAND.accent }} /> Lo que te ayudará a tener éxito
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {currentJob.requisitos.map((req, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10, fontSize: 13,
                    color: 'rgba(255,255,255,0.5)',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 10, padding: '10px 12px',
                  }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: BRAND.accent, flexShrink: 0 }} />
                    {req}
                  </div>
                ))}
              </div>
            </div>
          )}

          <ApplyButton job={currentJob} onApply={onApply} />
        </div>
      </motion.div>
    </div>
  );
};

// ── APPLY BUTTON ─────────────────────────────────────────────────────────────
const ApplyButton = ({ job, onApply }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      onClick={() => onApply(job)}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        width: '100%', padding: '16px 24px',
        borderRadius: 18, border: 'none', cursor: 'pointer',
        background: hovered ? BRAND.accentMid : BRAND.accent,
        color: '#fff', fontSize: 15, fontWeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        transition: 'background .2s',
        boxShadow: `0 10px 32px rgba(232,80,10,0.25)`,
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      Postularme a esta vacante
      <motion.div animate={{ x: hovered ? 3 : 0, y: hovered ? -2 : 0 }} transition={{ duration: 0.2 }}>
        <Send size={16} />
      </motion.div>
    </motion.button>
  );
};

// ── JOB CARD ─────────────────────────────────────────────────────────────────
const JobCard = ({ job, isSelected, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const areasDisplay = Array.isArray(job.area) ? job.area.join(', ') : job.area;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.99 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        padding: '18px 20px', borderRadius: 16, cursor: 'pointer',
        position: 'relative', overflow: 'hidden',
        border: isSelected
          ? `1px solid ${BRAND.accentBorder}`
          : `1px solid rgba(255,255,255,${hovered ? '0.1' : '0.05'})`,
        background: isSelected
          ? BRAND.accentSoft
          : `rgba(255,255,255,${hovered ? '0.04' : '0.02'})`,
        transition: 'border-color .2s, background .2s',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <motion.div
        animate={{ scaleY: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
        style={{
          position: 'absolute', left: 0, top: 12, bottom: 12, width: 3,
          background: BRAND.accent, borderRadius: 99, transformOrigin: 'center',
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: isSelected ? 8 : 0, transition: 'padding .2s', marginBottom: 8 }}>
        <div style={{ flex: 1, minWidth: 0, paddingRight: 10 }}>
          {job.isNew && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 6,
              background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
              color: '#4ade80', fontSize: 9, fontWeight: 700,
              padding: '3px 8px', borderRadius: 99, textTransform: 'uppercase',
            }}>
              <Sparkles size={8} /> Nuevo
            </span>
          )}
          <h3 style={{
            fontSize: 15, fontWeight: 700, lineHeight: 1.3,
            color: isSelected ? '#fff' : 'rgba(255,255,255,0.85)',
            display: 'block',
          }}>{job.puesto}</h3>
        </div>
        <motion.div animate={{ x: isSelected ? 2 : 0 }}>
          <ChevronRight size={16} color={isSelected ? BRAND.accent : 'rgba(255,255,255,0.2)'} />
        </motion.div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 12, color: 'rgba(255,255,255,0.35)', paddingLeft: isSelected ? 8 : 0, transition: 'padding .2s' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Briefcase size={11} color={BRAND.accent} /> {areasDisplay}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <MapPin size={11} /> {job.ubicacion}
        </span>
      </div>
    </motion.div>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function VacantesSection() {
  const [vacantes, setVacantes] = useState([]);
  const [areasDinamicas, setAreasDinamicas] = useState(['Todas']);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState('');
  const [activeArea, setActiveArea] = useState('Todas');
  const [applyJob, setApplyJob] = useState(null);
  const [drawerJob, setDrawerJob] = useState(null);
  const [isSpontaneousOpen, setIsSpontaneousOpen] = useState(false);

useEffect(() => {
    client.fetch('*[_type == "vacante" && isActive == true] | order(_createdAt desc)')
      .then(data => {
        setVacantes(data);
        if (data.length > 0) setSelectedJob(data[0]);

        const areasUnicas = ['Todas', ...new Set(data.flatMap(job => job.area || []))];
        setAreasDinamicas(areasUnicas);
        
        setIsLoading(false);
      })
      .catch(err => { console.error(err); setIsLoading(false); });
  }, []);

  const filtered = vacantes.filter(job => {
    const matchArea = activeArea === 'Todas' || (job.area && job.area.includes(activeArea));
    const q = search.toLowerCase();
    const matchSearch = !q
      || job.puesto?.toLowerCase().includes(q)
      || job.requisitos?.some(r => r.toLowerCase().includes(q));
    return matchArea && matchSearch;
  });

  const handleCardClick = job => {
    setSelectedJob(job);
    if (window.innerWidth < 1024) setDrawerJob(job);
  };

  if (isLoading) return (
    <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: `3px solid rgba(255,255,255,0.08)`,
        borderTopColor: BRAND.accent,
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <>
      <style>{`
        .lg-hidden { display: block; }
        @media (min-width: 1024px) { .lg-hidden { display: none; } }
        .lg-grid { display: none; }
        @media (min-width: 1024px) { .lg-grid { display: block; } }
        .job-list::-webkit-scrollbar { width: 4px; }
        .job-list::-webkit-scrollbar-track { background: transparent; }
        .job-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
        .search-input::placeholder { color: rgba(255,255,255,0.2); }
        .area-scroll { scrollbar-width: none; }
        .area-scroll::-webkit-scrollbar { display: none; }
        button, label, a { -webkit-tap-highlight-color: transparent; }
        @media (min-width: 1024px) { .vacantes-grid { grid-template-columns: 5fr 7fr !important; gap: 28px !important; } }
      `}</style>

      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 40 }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontSize: 10, color: BRAND.accent, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}
          >
            Oportunidades Abiertas
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
            style={{ fontWeight: 800, color: '#fff', lineHeight: 1.15, fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: 0 }}
          >
            Encuentra tu{' '}
            <span style={{ color: BRAND.accent }}>próximo reto.</span>
          </motion.h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          <div style={{ position: 'relative', maxWidth: 380 }}>
            <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)' }} />
            <input
              className="search-input"
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por puesto o tecnología…"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 99, padding: '11px 16px 11px 42px',
                color: '#fff', fontSize: 'max(16px, 14px)', outline: 'none',
                transition: 'border-color .2s',
              }}
              onFocus={e => e.target.style.borderColor = BRAND.accentBorder}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          </div>
          <div className="area-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
            {areasDinamicas.map(cat => (
              <button
                key={cat} onClick={() => setActiveArea(cat)}
                style={{
                  padding: '8px 16px', borderRadius: 99, border: 'none',
                  cursor: 'pointer', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0,
                  background: activeArea === cat ? BRAND.accent : 'rgba(255,255,255,0.05)',
                  color: activeArea === cat ? '#fff' : 'rgba(255,255,255,0.4)',
                  boxShadow: activeArea === cat ? `0 4px 14px rgba(232,80,10,0.2)` : 'none',
                  transition: 'all .2s', WebkitTapHighlightColor: 'transparent',
                }}
              >{cat}</button>
            ))}
          </div>
        </div>

        <div className="vacantes-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
          <div className="job-list" style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 820, overflowY: 'auto', paddingRight: 4 }}>
            {filtered.length === 0 && (
              <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14, textAlign: 'center', padding: '40px 0' }}>
                No hay vacantes en esta área por el momento.
              </p>
            )}
            {filtered.map((job, idx) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
              >
                <JobCard job={job} isSelected={selectedJob?._id === job._id} onClick={() => handleCardClick(job)} />
              </motion.div>
            ))}
          </div>

          <div className="lg-grid" style={{ position: 'sticky', top: 100 }}>
            <AnimatePresence mode="wait">
              {selectedJob && (
                <motion.div
                  key={selectedJob._id}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24 }}
                  style={{
                    background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 24, padding: 36, position: 'relative', overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute', bottom: -60, right: -60, width: 220, height: 220,
                    background: BRAND.accentSoft, borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none',
                  }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                      <span style={{
                        background: BRAND.accentSoft, border: `1px solid ${BRAND.accentBorder}`,
                        color: BRAND.accent, fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: '0.1em',
                      }}>{selectedJob.tipo}</span>
                      <span style={{
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 99, textTransform: 'uppercase',
                      }}>ID: #{selectedJob._id?.slice(-4).toUpperCase()}</span>
                      {selectedJob.isNew && (
                        <span style={{
                          marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4,
                          background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)',
                          color: '#4ade80', fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 99, textTransform: 'uppercase',
                        }}>
                          <Sparkles size={10} /> Vacante reciente
                        </span>
                      )}
                    </div>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 20 }}>
                      {selectedJob.puesto}
                    </h2>
                    <div style={{
                      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24,
                      padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      {[['Ubicación', selectedJob.ubicacion], ['Salario esperado', selectedJob.salario]].map(([label, value]) => (
                        <div key={label}>
                          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{label}</p>
                          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{value}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginBottom: 24 }}>
                      <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: BRAND.accent }} /> Descripción del rol
                      </h4>
                      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>{selectedJob.desc}</p>
                    </div>
                    {selectedJob.requisitos?.length > 0 && (
                      <div style={{ marginBottom: 32 }}>
                        <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 5, height: 5, borderRadius: '50%', background: BRAND.accent }} /> Lo que te ayudará a tener éxito
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
                          {selectedJob.requisitos.map((req, i) => (
                            <div key={i} style={{
                              display: 'flex', alignItems: 'center', gap: 10, fontSize: 13,
                              color: 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.03)',
                              border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 12px',
                            }}>
                              <div style={{ width: 5, height: 5, borderRadius: '50%', background: BRAND.accent, flexShrink: 0 }} />
                              {req}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <ApplyButton job={selectedJob} onApply={setApplyJob} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div style={{ marginTop: 80 }}>
          <CandidaturaEspontanea onOpenForm={() => setIsSpontaneousOpen(true)} />
        </div>
      </div>

      <MobileDrawer job={drawerJob} onClose={() => setDrawerJob(null)} onApply={setApplyJob} />
      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
      {isSpontaneousOpen && <SpontaneousApplyModal onClose={() => setIsSpontaneousOpen(false)} />}
    </>
  );
}