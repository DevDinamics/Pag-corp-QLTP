import React from 'react';
import { motion } from 'framer-motion';

// 1. IMPORTACIÓN DE LOGOS DESDE ASSETS
import logoOracle from './assets/partners-logos/logo-oracle-company.png';
import logoDatabricks from './assets/partners-logos/Databricks_Logo.png'; 
import logoAws from './assets/partners-logos/logo-Amazon.png';
import logoGoogleCloud from './assets/partners-logos/lockup_GoogleCloud_FullColor_rgb_139x24px-1.svg';
import logoIbm from './assets/partners-logos/logo-ibm.png';
import logoSafe from './assets/partners-logos/Certified Tester Expert Level Test Management Strategic Test Management.png';

// --- DATOS DE PARTNERS ---
const partners = [
  { name: "Oracle", logo: logoOracle, width: "w-28", brandColor: "#F80000" },
  { name: "Databricks", logo: logoDatabricks, width: "w-28", brandColor: "#FF3621" },
  { name: "AWS", logo: logoAws, width: "w-16", brandColor: "#FF9900" },
  { name: "Google Cloud", logo: logoGoogleCloud, width: "w-24", brandColor: "#4285F4" },
  { name: "IBM", logo: logoIbm, width: "w-20", brandColor: "#0066FF" },
  { name: "SAFe", logo: logoSafe, width: "w-20", brandColor: "#FFB800" },
];

const marqueePartners = [...partners, ...partners, ...partners, ...partners];

export default function PartnersCarousel() {
  return (
    <section className="relative w-full bg-[#050505] py-24 overflow-hidden">
      
      {/* 1. AMBIENTE */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-qualtop-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-qualtop-orange text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4 block"
          >
            Ecosistema
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight"
          >
            Aliados Estratégicos
          </motion.h2>
        </div>
        
      </div>

       {/* --- CAROUSEL TRACK --- */}
       {/* Aumentamos el padding vertical a py-16 para que los reflejos tengan espacio de existir */}
       <div className="relative w-full overflow-hidden py-16 group">
            
            {/* MÁSCARAS DE DEGRADADO */}
            <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

            {/* TRACK DE MOVIMIENTO */}
            <div className="flex w-max animate-infinite-scroll group-hover:[animation-play-state:paused] items-center gap-16 md:gap-24 px-8">
                {marqueePartners.map((partner, index) => (
                    <PartnerLogo key={index} partner={partner} />
                ))}
            </div>

        </div>

      {/* KEYFRAMES */}
      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); } 
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 50s linear infinite; 
        }
      `}</style>
    </section>
  );
}

// --- LOGO CON EFECTO APPLE (Reflejo 3D) ---
const PartnerLogo = ({ partner }) => {
  return (
    <div className="relative group/logo cursor-pointer flex-shrink-0 flex items-center justify-center h-24 overflow-visible">
      
      {/* EL RESPLANDOR TRASERO */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 opacity-0 group-hover/logo:opacity-30 transition-opacity duration-700 blur-[25px] rounded-full scale-150"
        style={{ backgroundColor: partner.brandColor }}
      />

      {/* EL LOGO PURO CON HOVER DE COLOR */}
      <img 
          src={partner.logo} 
          alt={`Logo de ${partner.name}`}
          className={`
            ${partner.width} max-h-12 object-contain relative z-10 
            transition-all duration-500 ease-out
            
            /* ESTADO NORMAL: Blanco/Grisáceo semi-transparente */
            brightness-0 invert opacity-40
            
            /* ESTADO HOVER: Quitamos los filtros para que regrese a su color original */
            group-hover/logo:brightness-100 group-hover/logo:invert-0 group-hover/logo:opacity-100 group-hover/logo:scale-110 group-hover/logo:-translate-y-3
          `}
      />
    </div>
  );
};