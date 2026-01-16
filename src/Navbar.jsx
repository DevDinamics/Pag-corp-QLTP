import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Zap, BrainCircuit, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FullScreenMenu from './FullScreenMenu';

// --- COMPONENTE: HAMBURGUESA PERSONALIZADA ---
const CustomHamburger = ({ onClick, className }) => (
  <button onClick={onClick} className={`group flex flex-col items-end gap-[6px] p-2 hover:opacity-80 transition-opacity ${className}`}>
    <span className="w-8 h-[2px] bg-white transition-all duration-300 group-hover:bg-qualtop-orange group-hover:w-10" />
    <span className="w-5 h-[2px] bg-white transition-all duration-300 group-hover:bg-qualtop-orange group-hover:w-8" />
  </button>
);

// --- COMPONENTE: OVERLAY DE BÚSQUEDA ---
const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate(); // 1. Importamos el hook de navegación

  // Enfocar el input cuando se abre
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    
    // 2. Validación: Si está vacío, no hace nada
    if (!query.trim()) return;

    console.log("Navegando a búsqueda:", query);
    
    // 3. ACCIÓN REAL: Redirigir al Blog con el parámetro de búsqueda
    // Esto cambiará la URL a: /blog?q=termino_buscado
    navigate(`/blog?q=${encodeURIComponent(query)}`);
    
    // 4. Limpieza
    setQuery("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center"
        >
          {/* Botón Cerrar */}
          <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors">
            <X size={32} />
          </button>

          <div className="w-full max-w-3xl px-6">
            <form onSubmit={handleSearch} className="relative group">
              <input 
                ref={inputRef}
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="¿Qué estás buscando?" 
                className="w-full bg-transparent border-b-2 border-white/20 text-3xl md:text-5xl text-white py-4 focus:outline-none focus:border-qualtop-orange transition-colors placeholder:text-gray-600 font-bold"
              />
              {/* Botón Flecha (Ahora sí envía el formulario) */}
              <button 
                type="submit" 
                className={`absolute right-0 bottom-4 text-qualtop-orange transition-all duration-300 ${query.trim() ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              >
                <ArrowRight size={32} />
              </button>
            </form>
            <p className="mt-4 text-gray-500 text-sm tracking-widest uppercase">Presiona Enter para buscar</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); 
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      title: 'Servicios', 
      href: '/', 
      hasDropdown: true, 
      dropdownItems: [
        { label: 'Modernización Tecnológica', href: '/#modernizacion', desc: 'Migración cloud', icon: <Zap size={18} /> },
        { label: 'Soluciones de negocio con IA', href: '/#ia', desc: 'Automatización', icon: <BrainCircuit size={18} /> }
      ] 
    },
    { title: 'Nosotros', href: '/nosotros', hasDropdown: false },
    { title: 'Blog', href: '/blog', hasDropdown: false }
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out
        ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} 
        ${isScrolled ? 'bg-black/80 backdrop-blur-lg py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          <div className="flex items-center cursor-pointer group z-50">
            <Link to="/">
              <div className={`relative transition-all duration-500 ${isScrolled ? 'w-24' : 'w-28 md:w-32'}`}>
                <img 
                  src="https://qualtop.com/wp-content/uploads/2025/09/Q_Logo.svg" 
                  alt="Qualtop Logo" 
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 lg:gap-12" onMouseLeave={() => setActiveDropdown(null)}>
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.href;

              return (
                <div key={index} className="relative h-full flex items-center py-2" onMouseEnter={() => item.hasDropdown && setActiveDropdown(index)}>
                  <Link 
                    to={item.href} 
                    className={`relative flex items-center gap-1 text-sm font-medium transition-all duration-300 tracking-wide 
                    ${activeDropdown === index || isActive ? 'text-qualtop-orange' : 'text-gray-300 hover:text-white'}`}
                  >
                    {item.title}
                    {item.hasDropdown && (
                      <ChevronDown 
                        size={14} 
                        className={`transition-transform duration-300 ${activeDropdown === index ? 'rotate-180 text-qualtop-orange' : ''}`} 
                      />
                    )}
                    
                    {isActive && (
                      <motion.div 
                        layoutId="navIndicator" 
                        className="absolute -bottom-1 left-0 w-full h-[2px] bg-qualtop-orange" 
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === index && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.95 }} 
                        animate={{ opacity: 1, y: 0, scale: 1 }} 
                        exit={{ opacity: 0, y: 10, scale: 0.95 }} 
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[360px]"
                      >
                        <div className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/5">
                           <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1.5 w-3 h-3 bg-[#0f0f0f] border-t border-l border-white/10 rotate-45"></div>
                          
                          <div className="p-2 flex flex-col gap-1 relative z-10">
                            {item.dropdownItems.map((sub, i) => (
                              <Link 
                                key={i} 
                                to={sub.href} 
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-start gap-4 p-4 rounded-lg hover:bg-white/[0.03] transition-all"
                              >
                                <div className="p-2.5 rounded-lg bg-white/5 text-gray-400 group-hover:bg-qualtop-orange/20 group-hover:text-qualtop-orange transition-colors">
                                  {sub.icon}
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-gray-200 group-hover:text-white mb-0.5">{sub.label}</div>
                                  <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">{sub.desc}</p>
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

          <div className="flex items-center gap-4 md:gap-6">
            <button 
                onClick={() => navigate('/contact-home')}
                className="hidden lg:block bg-qualtop-orange hover:bg-orange-600 text-white font-bold py-3 px-7 rounded-lg transition-all text-[11px] tracking-[0.15em] uppercase hover:shadow-[0_0_20px_rgba(255,77,0,0.4)] active:scale-95"
            >
                Contáctanos
            </button>
            
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>
            
            <CustomHamburger onClick={() => setMenuOpen(true)} className="ml-1" />
          </div>
        </div>
      </nav>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <FullScreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} isScrolled={isScrolled} />
    </>
  );
}