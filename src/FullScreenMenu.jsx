import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Instagram, Linkedin, Facebook, 
  ChevronDown, Mail, MapPin, Zap, BrainCircuit 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FullScreenMenu({ isOpen, onClose, isScrolled }) {
  
  // Estado para el acordeón en Móvil
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  // --- DATOS DEL MENÚ ---
  // Enriquecemos la estructura para que el móvil tenga submenús, 
  // pero el escritorio seguirá usando solo el link principal.
const mainLinks = [
    { title: "Inicio", href: "/" }, 
    { title: "Nosotros", href: "/nosotros" },
    { 
      title: "Servicios", 
      href: "/#servicios", // Link general
      // Subitems con HASH ESPECÍFICO para activar los botones
      subItems: [
        { label: 'Modernización Tecnológica', href: '/#modernizacion', icon: <Zap size={18}/> },
        { label: 'Soluciones con IA', href: '/#ia', icon: <BrainCircuit size={18}/> }
      ]
    }, 
    { title: "Blog", href: "/blog" },
    { title: "Contacto", href: "/contact-home" }
  ];

  const legalLinks = ["Política de Seguridad de la información", "Política Antisoborno", "Línea de denuncia"];

  // --- ANIMACIONES ---
  const menuVariants = {
    closed: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.4 } },
    open: { opacity: 1, backdropFilter: "blur(25px)", transition: { duration: 0.5 } }
  };

  const containerVars = {
    initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.2, staggerChildren: 0.08, staggerDirection: 1 } }
  };

  const linkVars = {
    initial: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-[200] bg-black/90 md:bg-black/70 text-white flex flex-col font-sans overflow-y-auto"
        >
          {/* --- HEADER (IGUAL PARA AMBOS) --- */}
          <div className="w-full relative z-20 border-b border-white/5 bg-black/20 shrink-0">
            <div 
              className="max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-500"
              style={{ height: isScrolled ? '72px' : '112px' }} 
            >
              <Link to="/" onClick={onClose} className="flex items-center group cursor-pointer">
                <div className={`relative transition-all duration-500 ${isScrolled ? 'w-24' : 'w-28 md:w-32'}`}>
                  <img src="https://qualtop.com/wp-content/uploads/2025/09/Q_Logo.svg" alt="Logo" className="w-full h-auto object-contain" />
                </div>
              </Link>

              <button onClick={onClose} className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em]">
                <span className="text-gray-400 group-hover:text-white transition-colors hidden md:block">Cerrar</span>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-qualtop-orange group-hover:border-qualtop-orange transition-all duration-300">
                  <X size={20} className="group-hover:rotate-90 transition-transform" />
                </div>
              </button>
            </div>
          </div>

          {/* =========================================================
             DISEÑO ESCRITORIO (LG+) - SE MANTIENE EL ORIGINAL
             ========================================================= */}
          <div className="hidden lg:flex flex-grow items-center relative z-10 w-full max-w-7xl mx-auto px-12">
            <div className="w-full grid grid-cols-2 gap-16 items-center">
                
                {/* COLUMNA IZQUIERDA: LINKS GIGANTES */}
                <motion.div variants={containerVars} initial="initial" animate="open" exit="initial" className="flex flex-col gap-5">
                    {mainLinks.map((link, index) => (
                        <div key={index} className="overflow-visible group py-1"> 
                            <motion.div variants={linkVars}>
                                <Link 
                                    to={link.href} 
                                    onClick={onClose}
                                    className="text-6xl font-bold tracking-tighter leading-[1.2] text-gray-400 hover:text-white transition-all duration-300 inline-block hover:translate-x-4"
                                >
                                    {link.title}
                                </Link>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>

                {/* COLUMNA DERECHA: LEGAL & SOCIAL */}
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="flex flex-col items-end gap-16">
                    <div className="flex flex-col gap-8 w-full">
                        <p className="text-qualtop-orange font-bold tracking-[0.4em] text-[15px] uppercase opacity-60 text-right">SOPORTE & LEGAL</p>
                        {legalLinks.map((text, i) => (
                            <Link key={i} to="#" className="group relative text-gray-400 hover:text-white transition-all duration-500 text-lg flex items-center justify-end gap-4">
                                <span className="group-hover:-translate-x-2 transition-transform duration-500">{text}</span>
                                <div className="h-[1px] w-0 group-hover:w-12 bg-qualtop-orange transition-all duration-500" />
                            </Link>
                        ))}
                    </div>
                    <div className="flex gap-5 justify-end w-full">
                        {[<Linkedin />, <Facebook />, <Instagram />].map((icon, i) => (
                            <a key={i} href="#" className="w-14 h-14 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-gray-400 hover:text-white hover:bg-qualtop-orange transition-all duration-500 shadow-lg">
                                {React.cloneElement(icon, { size: 20, strokeWidth: 1.5 })}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
          </div>

          {/* =========================================================
             DISEÑO MÓVIL (< LG) - REDISEÑADO TIPO "PRO"
             ========================================================= */}
          <div className="lg:hidden flex-grow flex flex-col px-6 py-8 overflow-y-auto">
            
            {/* 1. NAVEGACIÓN MÓVIL */}
            <motion.nav 
              variants={containerVars} 
              initial="initial" 
              animate="open" 
              className="flex flex-col gap-6 mb-12"
            >
              {mainLinks.map((link, index) => (
                <motion.div key={index} variants={linkVars} className="border-b border-white/5 pb-4">
                  {/* SI TIENE SUBITEMS (SERVICIOS) */}
                  {link.subItems ? (
                    <div>
                      <button 
                        onClick={() => toggleExpand(index)}
                        className="w-full flex items-center justify-between text-3xl font-bold text-white"
                      >
                        {link.title}
                        <ChevronDown 
                          className={`text-qualtop-orange transition-transform duration-300 ${expandedItem === index ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      
                      <AnimatePresence>
                        {expandedItem === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-3 mt-4 pl-4 border-l-2 border-white/10">
                              {link.subItems.map((sub, i) => (
                                <Link 
                                  key={i} 
                                  to={sub.href} 
                                  onClick={onClose}
                                  className="flex items-center gap-3 text-gray-400 hover:text-white py-2"
                                >
                                  <span className="text-qualtop-orange">{sub.icon}</span>
                                  <span className="text-sm font-medium">{sub.label}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    /* SI ES LINK NORMAL */
                    <Link 
                      to={link.href} 
                      onClick={onClose}
                      className="block text-3xl font-bold text-gray-300 hover:text-white"
                    >
                      {link.title}
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.nav>

            {/* 2. DATOS DE CONTACTO MÓVIL (Visualmente atractivo) */}
            <div className="bg-[#111] p-6 rounded-xl border border-white/10 mb-8">
               <h4 className="text-qualtop-orange text-xs font-bold uppercase tracking-widest mb-4">Contacto Directo</h4>
               <a href="mailto:info@qualtop.com" className="flex items-center gap-3 text-lg font-medium text-white mb-3">
                 <Mail size={18} className="text-gray-500" /> info@qualtop.com
               </a>
               <div className="flex items-start gap-3 text-sm text-gray-400">
                 <MapPin size={18} className="text-gray-500 shrink-0 mt-1" />
                 <p>Av. Vallarta 1234, Guadalajara, Jal.</p>
               </div>
            </div>

            {/* 3. LEGAL & SOCIALES MÓVIL */}
            <div className="mt-auto">
                <div className="flex gap-4 mb-6">
                    {[<Linkedin />, <Facebook />, <Instagram />].map((icon, i) => (
                        <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-qualtop-orange transition-colors">
                            {React.cloneElement(icon, { size: 18 })}
                        </a>
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    {legalLinks.map((text, i) => (
                        <Link key={i} to="#" className="text-xs text-gray-600 hover:text-gray-400">
                            {text}
                        </Link>
                    ))}
                </div>
            </div>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}