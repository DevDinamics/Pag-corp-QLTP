import React from 'react';
import { Linkedin, Facebook, Instagram, Youtube, ArrowRight, Mail } from 'lucide-react';

const footerLinks = {
  qualtop: [
    { label: "Nosotros", href: "#" },
    { label: "Valores", href: "#" },
    { label: "Servicios", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Razón de ser", href: "#" },
    { label: "Blog", href: "#" }
  ],
  servicios: [
    { label: "Modernización Tecnológica", href: "#" },
    { label: "Soluciones de negocio con IA", href: "#" }
  ],
  legal: [
    { label: "Política Organizacional de Seguridad de la Información", href: "#" },
    { label: "Política Antisoborno", href: "#" },
    { label: "Línea de denuncia", href: "#" },
    { label: "Aviso de privacidad", href: "#" }
  ]
};

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#020202] pt-24 pb-12 px-6 border-t border-white/5 overflow-hidden font-sans">
      
      {/* Luz ambiental de fondo según tu diseño */}
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-qualtop-orange/10 blur-[180px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* COLUMNA MARCA (4/12) */}
          <div className="md:col-span-4 space-y-6">
            <img 
              src="https://qualtop.com/wp-content/uploads/2025/09/Q_Logo.svg" 
              alt="Qualtop Logo" 
              className="w-40 h-auto object-contain"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Innovación, agilidad y modernización de producción de software.
            </p>
            
            {/* Newsletter integrado para darle el toque innovador */}
            <div className="pt-4 max-w-sm">
                <div className="relative">
                    <input 
                        type="email" 
                        placeholder="info@qualtop.com" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-12 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-qualtop-orange transition-all"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-qualtop-orange text-white rounded-md">
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
          </div>

          {/* COLUMNA QUALTOP (2/12) */}
          <div className="md:col-span-2">
            <h4 className="text-qualtop-orange font-bold text-lg mb-6">Qualtop</h4>
            <ul className="space-y-4">
              {footerLinks.qualtop.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-white hover:text-qualtop-orange transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA SERVICIOS (3/12) */}
          <div className="md:col-span-3">
            <h4 className="text-qualtop-orange font-bold text-lg mb-6">Servicios</h4>
            <ul className="space-y-4">
              {footerLinks.servicios.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-white hover:text-qualtop-orange transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Sección Legal integrada según imagen */}
            <div className="mt-12">
                <h4 className="text-qualtop-orange font-bold text-lg mb-6">Legal</h4>
                <ul className="space-y-4">
                {footerLinks.legal.map((link, i) => (
                    <li key={i}>
                    <a href={link.href} className="text-white hover:text-qualtop-orange transition-colors text-sm block leading-snug">
                        {link.label}
                    </a>
                    </li>
                ))}
                </ul>
            </div>
          </div>

          {/* COLUMNA CONTACTO (3/12) */}
          <div className="md:col-span-3">
            <h4 className="text-qualtop-orange font-bold text-lg mb-6">Contacto</h4>
            <div className="space-y-6">
                <a href="mailto:info@qualtop.com" className="text-white hover:text-qualtop-orange transition-colors text-sm block">
                    info@qualtop.com
                </a>
                
                <div className="flex gap-4">
                    <a href="#" className="text-white hover:text-qualtop-orange transition-all"><Facebook size={20} /></a>
                    <a href="#" className="text-white hover:text-qualtop-orange transition-all"><Instagram size={20} /></a>
                    <a href="#" className="text-white hover:text-qualtop-orange transition-all"><Linkedin size={20} /></a>
                    <a href="#" className="text-white hover:text-qualtop-orange transition-all"><Youtube size={20} /></a>
                </div>
            </div>
          </div>

        </div>

        {/* BARRA FINAL */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-gray-600 uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Qualtop Group. All Rights Reserved.</p>
            <p>Innovando el futuro del software</p>
        </div>
      </div>
    </footer>
  );
}