import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Linkedin, Facebook } from 'lucide-react';

export default function FullScreenMenu({ isOpen, onClose, isScrolled }) {
  
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

  const mainLinks = [
    { title: "Inicio", href: "#" }, { title: "Nosotros", href: "#" },
    { title: "Servicios", href: "#" }, { title: "Blog", href: "./ass" },
    { title: "Contacto", href: "#" }
  ];

  const legalLinks = ["Política de Seguridad de la información", "Política Antisoborno", "Línea de denuncia"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-[200] bg-black/70 text-white flex flex-col overflow-hidden font-sans"
        >
          {/* HEADER ALINEADO AL NAVBAR */}
          <div className="w-full relative z-10 border-b border-white/5 bg-black/20">
            <div 
              className="max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-500"
              style={{ height: isScrolled ? '72px' : '112px' }} // Sincroniza posición exacta con Navbar
            >
              <div className="flex items-center group cursor-pointer">
                <div className={`relative transition-all duration-500 ${isScrolled ? 'w-24' : 'w-32'}`}>
                  <img src="https://qualtop.com/wp-content/uploads/2025/09/Q_Logo.svg" alt="Logo" className="w-full h-auto object-contain" />
                </div>
              </div>

              <button onClick={onClose} className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em]">
                <span className="text-gray-400 group-hover:text-white transition-colors hidden md:block">Cerrar</span>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-qualtop-orange group-hover:border-qualtop-orange transition-all duration-300">
                  <X size={20} className="group-hover:rotate-90 transition-transform" />
                </div>
              </button>
            </div>
          </div>

          {/* CONTENIDO */}
          <div className="flex-grow flex items-center relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* ENLACES (Corrección de la 'g' y Tamaño reducidos) */}
                <motion.div variants={containerVars} initial="initial" animate="open" exit="initial" className="flex flex-col gap-3 md:gap-5">
                    {mainLinks.map((link, index) => (
                        <div key={index} className="overflow-visible group py-1"> 
                            <motion.div variants={linkVars}>
                                <a href={link.href} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.2] text-gray-400 hover:text-white transition-all duration-300 inline-block">
                                    {link.title}
                                </a>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>

                {/* SOPORTE & LEGAL */}
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="flex flex-col items-start lg:items-end gap-16">
                    <div className="flex flex-col gap-8 w-full">
                        <p className="text-qualtop-orange font-bold tracking-[0.4em] text-[15px] uppercase opacity-60 lg:text-right">SOPORTE & LEGAL</p>
                        {legalLinks.map((text, i) => (
                            <a key={i} href="#" className="group relative text-gray-400 hover:text-white transition-all duration-500 text-sm md:text-lg flex items-center lg:justify-end gap-4">
                                <span className="group-hover:-translate-x-2 transition-transform duration-500 order-2 lg:order-1">{text}</span>
                                <div className="h-[1px] w-0 group-hover:w-12 bg-qualtop-orange transition-all duration-500 order-1 lg:order-2" />
                            </a>
                        ))}
                    </div>
                    <div className="flex gap-5 lg:justify-end w-full">
                        {[<Linkedin />, <Facebook />, <Instagram />].map((icon, i) => (
                            <a key={i} href="#" className="w-14 h-14 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-gray-400 hover:text-white hover:bg-qualtop-orange transition-all duration-500 shadow-lg">
                                {React.cloneElement(icon, { size: 20, strokeWidth: 1.5 })}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}