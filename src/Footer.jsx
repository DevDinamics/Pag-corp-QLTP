import React from 'react';
import { Linkedin, Facebook, Instagram, Youtube, ArrowRight, Mail } from 'lucide-react';

// 1. IMPORTAMOS EL LOGO OFICIALMENTE PARA VITE
import logoQualtop from './assets/logos/Logo2Qualtop.png';

const footerLinks = {
  qualtop: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Valores", href: "/valores" },
    { label: "Servicios", href: "/servicios#modernizacion" },
    // { label: "FAQs", href: "/faqs" },
    { label: "Blog", href: "/blog" }
  ],
  servicios: [
    { label: "Modernización Tecnológica", href: "/servicios#modernizacion" },
    { label: "Soluciones de negocio con IA", href: "/servicios#ia" }
  ],
  legal: [
    { label: "Política Organizacional de Seguridad de la Información", href: "/politica-seguridad" },
    { label: "Política Antisoborno", href: "/politicas-antisoborno" },
    { label: "Línea de denuncia", href: "/linea-de-denuncia" },
    { label: "Aviso de privacidad", href: "/aviso-privacidad" },
    { label: "Política de Calidad", href: "/politica-calidad" }
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
              // 2. USAMOS LA VARIABLE DEL LOGO QUE IMPORTAMOS ARRIBA
              src={logoQualtop} 
              alt="Qualtop Logo" 
              className="w-40 h-auto object-contain"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Innovación, agilidad y modernización de producción de software.
            </p>
            

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
                <h4 className="text-qualtop-orange font-bold text-lg mb-6">Compliance</h4>
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
                      <a href="https://www.facebook.com/qualtop" aria-label="Visitar nuestro Facebook" className="text-white hover:text-qualtop-orange transition-all"><Facebook size={20} /></a>
                      <a href=" https://www.instagram.com/qualtop_" aria-label="Visitar nuestro Instagram" className="text-white hover:text-qualtop-orange transition-all"><Instagram size={20} /></a>
                      <a href="https://www.linkedin.com/company/qualtopgroup/" aria-label="Visitar nuestro LinkedIn" className="text-white hover:text-qualtop-orange transition-all"><Linkedin size={20} /></a>
                      <a href="https://www.youtube.com/@qualtop_" aria-label="Visitar nuestro YouTube" className="text-white hover:text-qualtop-orange transition-all"><Youtube size={20} /></a>
                </div>
            </div>

            {/* SECCIÓN ATENCIÓN LABORAL (Alineada al nivel de Compliance) */}
            <div className="mt-12">
                <h4 className="text-qualtop-orange font-bold text-lg mb-2">Atención Laboral</h4>
                <a href="mailto:atencionthdo@qualtop.com" className="text-white hover:text-qualtop-orange transition-colors text-sm block font-semibold">
                    atencionthdo@qualtop.com
                </a>
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