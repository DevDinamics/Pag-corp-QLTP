import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Zap, BrainCircuit, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FullScreenMenu from './FullScreenMenu';

// --- COMPONENTE: HAMBURGUESA ---
const CustomHamburger = ({ onClick, className }) => (
  <button onClick={onClick} className={`group flex flex-col items-end gap-[5px] p-2 hover:opacity-80 transition-opacity ${className}`}>
    <span className="w-6 h-[2px] bg-white transition-all duration-300 group-hover:bg-qualtop-orange group-hover:w-8" />
    <span className="w-4 h-[2px] bg-white transition-all duration-300 group-hover:bg-qualtop-orange group-hover:w-6" />
  </button>
);

// --- COMPONENTE: OVERLAY DE BÚSQUEDA ---
const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

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
    if (!query.trim()) return;
    navigate(`/blog?q=${encodeURIComponent(query)}`);
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
          className="fixed inset-0 z-[200] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center"
        >
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
                placeholder="Busca en Qualtop..." 
                className="w-full bg-transparent border-b-2 border-white/20 text-3xl md:text-5xl text-white py-4 focus:outline-none focus:border-qualtop-orange transition-colors placeholder:text-gray-700 font-bold"
              />
              <button type="submit" className={`absolute right-0 bottom-4 text-qualtop-orange transition-all duration-300 ${query.trim() ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                <ArrowRight size={32} />
              </button>
            </form>
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
      // Cambiamos el estado después de 50px de scroll para evitar parpadeos al inicio
      setIsScrolled(window.scrollY > 50);
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
      {/* --- LOGICA DE ESTILOS DE LA ISLA ---
         isScrolled (Bajando):
           - bg-[#050505]: Sólido oscuro (sin transparencia).
           - border-white/10: Borde sutil.
           - py-2: Más compacto.
           - shadow-2xl: Sombra fuerte para flotar.
         
         !isScrolled (Arriba/Top):
           - bg-transparent: Totalmente transparente (o bg-black/10 muy sutil).
           - border-transparent: Sin bordes.
           - shadow-none: Sin sombra.
           - py-4: Más espacioso.
      */}
      <nav 
        className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
        w-[95%] md:max-w-7xl rounded-full
        ${menuOpen ? 'opacity-0 pointer-events-none -top-10' : 'opacity-100'} 
        ${isScrolled 
            ? 'top-4 bg-[#050505] border border-white/10 shadow-2xl py-2 md:py-3' 
            : 'top-6 bg-transparent border border-transparent shadow-none py-3 md:py-5 backdrop-blur-none'
        }`}
      >
        <div className="w-full px-5 md:px-8 flex items-center justify-between">
          
          {/* LOGO */}
          <div className="flex items-center cursor-pointer group z-50 shrink-0">
            <Link to="/">
              <div className="relative w-24 md:w-28 transition-all duration-500">
                <img 
                  src="https://qualtop.com/wp-content/uploads/2025/09/Q_Logo.svg" 
                  alt="Qualtop Logo" 
                  className="w-full h-auto object-contain group-hover:brightness-125 transition-all duration-500" 
                />
              </div>
            </Link>
          </div>

          {/* MENÚ DESKTOP */}
          <div className="hidden md:flex items-center gap-8" onMouseLeave={() => setActiveDropdown(null)}>
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.href;

              return (
                <div key={index} className="relative h-full flex items-center" onMouseEnter={() => item.hasDropdown && setActiveDropdown(index)}>
                  <Link 
                    to={item.href} 
                    className={`relative flex items-center gap-1 text-sm font-medium transition-all duration-300 tracking-wide px-2 py-2
                    ${activeDropdown === index || isActive ? 'text-qualtop-orange' : 'text-gray-300 hover:text-white'}`}
                  >
                    {item.title}
                    {item.hasDropdown && (
                      <ChevronDown 
                        size={14} 
                        className={`transition-transform duration-300 ${activeDropdown === index ? 'rotate-180 text-qualtop-orange' : ''}`} 
                      />
                    )}
                  </Link>

                  {/* DROPDOWN (Siempre sólido para legibilidad) */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === index && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.95 }} 
                        animate={{ opacity: 1, y: 0, scale: 1 }} 
                        exit={{ opacity: 0, y: 15, scale: 0.95 }} 
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[340px]"
                      >
                        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2 relative">
                           {/* Triángulo decorativo */}
                           <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#111] border-t border-l border-white/10 rotate-45"></div>
                          
                          <div className="flex flex-col gap-1 relative z-10">
                            {item.dropdownItems.map((sub, i) => (
                              <Link 
                                key={i} 
                                to={sub.href} 
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-all"
                              >
                                <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:bg-qualtop-orange/20 group-hover:text-qualtop-orange transition-colors">
                                  {sub.icon}
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-gray-200 group-hover:text-white">{sub.label}</div>
                                  <p className="text-[11px] text-gray-500 group-hover:text-gray-400">{sub.desc}</p>
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

          {/* ACCIONES DERECHA */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Botón Desktop */}
            <button 
                onClick={() => navigate('/contact-home')}
                className={`hidden lg:block font-bold py-2.5 px-6 rounded-full transition-all text-xs tracking-wider active:scale-95
                  ${isScrolled 
                    ? 'bg-white text-black hover:bg-qualtop-orange hover:text-white' // Botón normal en scroll
                    : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-black' // Botón cristal arriba
                  }`}
            >
                CONTACTO
            </button>
            
            <div className={`h-6 w-[1px] hidden md:block transition-colors ${isScrolled ? 'bg-white/10' : 'bg-white/20'}`}></div>

            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>
            
            <CustomHamburger onClick={() => setMenuOpen(true)} />
          </div>
        </div>
      </nav>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <FullScreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} isScrolled={isScrolled} />
    </>
  );
}