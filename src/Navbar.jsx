import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronRight, Zap, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FullScreenMenu from './FullScreenMenu';
import { Link, useLocation } from 'react-router-dom';

const CustomHamburger = ({ onClick, className }) => (
  <button onClick={onClick} className={`group flex flex-col items-end gap-[6px] p-2 hover:opacity-80 transition-opacity ${className}`}>
    <span className="w-8 h-[2px] bg-white transition-all duration-300 group-hover:bg-qualtop-orange group-hover:w-10" />
    <span className="w-5 h-[2px] bg-white transition-all duration-300 group-hover:bg-qualtop-orange group-hover:w-8" />
  </button>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollPos > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- MODIFICACIÓN AQUÍ: Href de Nosotros actualizado a ruta limpia ---
  const navItems = [
    { title: 'Servicios', href: '/', hasDropdown: true, 
      dropdownItems: [
        { label: 'Modernización Tecnológica', href: '/#servicios', desc: 'Migración cloud', icon: <Zap size={18} /> },
        { label: 'Soluciones de negocio con IA', href: '/#ia', desc: 'Automatización', icon: <BrainCircuit size={18} /> }
      ] 
    },
    { title: 'Nosotros', href: '/nosotros', hasDropdown: false }, // <--- CAMBIO: Ahora es una página
    { title: 'Blog', href: '/blog', hasDropdown: false }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${isScrolled ? 'bg-black/95 py-3 shadow-xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          <div className="flex items-center cursor-pointer group z-50">
            <Link to="/">
              <div className={`relative transition-all duration-500 ${isScrolled ? 'w-24' : 'w-32'}`}>
                <img src="https://qualtop.com/wp-content/uploads/2025/09/Q_Logo.svg" alt="Qualtop Logo" className="w-full h-auto object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8" onMouseLeave={() => setActiveDropdown(null)}>
            {navItems.map((item, index) => {
              // --- MODIFICACIÓN AQUÍ: Lógica de active mejorada ---
              const isActive = location.pathname === item.href;

              return (
                <div key={index} className="relative h-full flex items-center py-2" onMouseEnter={() => item.hasDropdown && setActiveDropdown(index)}>
                  <Link to={item.href} className={`relative flex items-center gap-1 text-[14px] font-medium transition-all duration-300 tracking-wide ${activeDropdown === index || isActive ? 'text-qualtop-orange' : 'text-gray-300 hover:text-white'}`}>
                    {item.title}
                    {item.hasDropdown && <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === index ? 'rotate-180 text-qualtop-orange' : ''}`} />}
                    
                    {/* INDICADOR ACTIVO (Para Nosotros y Blog) */}
                    {isActive && (
                      <motion.div 
                        layoutId="navIndicator" 
                        className="absolute -bottom-1 left-0 w-full h-[2px] bg-qualtop-orange" 
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === index && (
                      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[340px]">
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                          <div className="p-2 flex flex-col gap-1">
                            {item.dropdownItems.map((sub, i) => (
                              <Link key={i} to={sub.href} className="group flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-all">
                                <div className="p-2 rounded-md bg-white/5 text-gray-400 group-hover:text-qualtop-orange transition-colors">{sub.icon}</div>
                                <div>
                                  <div className="text-sm font-semibold text-gray-200 group-hover:text-white">{sub.label}</div>
                                  <p className="text-xs text-gray-500 mt-1">{sub.desc}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden lg:block bg-qualtop-orange hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-lg transition-all text-xs tracking-widest uppercase">Contáctanos</button>
            <Search className="cursor-pointer text-gray-400 hover:text-white transition-colors" size={20} />
            <CustomHamburger onClick={() => setMenuOpen(true)} />
          </div>
        </div>
      </nav>
      <FullScreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} isScrolled={isScrolled} />
    </>
  );
}