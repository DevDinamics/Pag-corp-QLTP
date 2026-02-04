import React from 'react';
import { motion } from 'framer-motion';

// --- DATOS DE PARTNERS ---
const partners = [
  { name: "Oracle", logo: "https://cdn.worldvectorlogo.com/logos/oracle-6.svg", width: "w-32", brandColor: "#F80000" },
  { name: "Databricks", logo: "https://qualtop.com/wp-content/uploads/2025/11/darabricks.png", width: "w-32", brandColor: "#FF3621" },
  { name: "AWS", logo: "https://cdn.worldvectorlogo.com/logos/aws-2.svg", width: "w-20", brandColor: "#FF9900" },
  { name: "Google Cloud", logo: "https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg", width: "w-24", brandColor: "#4285F4" },
  { name: "IBM", logo: "https://cdn.worldvectorlogo.com/logos/ibm.svg", width: "w-24", brandColor: "#0066FF" },
  { name: "SAFe", logo: "https://qualtop.com/wp-content/uploads/2025/11/safe_SAI_Partner_Badge_Gold.jpg", width: "w-20", brandColor: "#FFB800" },
  { name: "ISTQB", logo: "https://qualtop.com/wp-content/uploads/2025/11/istqb1.png", width: "w-28", brandColor: "#005b96" }
];

// Duplicamos x4 para asegurar el loop infinito suave
const marqueePartners = [...partners, ...partners, ...partners, ...partners];

export default function PartnersCarousel() {
  return (
    <section className="relative w-full bg-[#050505] py-24 overflow-hidden border-t border-white/5">
      
      {/* 1. AMBIENTE */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-qualtop-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full">
        
        {/* HEADER */}
        <div className="text-center mb-16 px-6">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-qualtop-orange text-xs font-bold tracking-[0.3em] uppercase mb-4 block"
          >
            Ecosistema
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white tracking-tight"
          >
            Aliados Estratégicos
          </motion.h2>
        </div>

        {/* --- CAROUSEL TRACK --- */}
        <div className="relative w-full overflow-hidden py-10 group">
            
            {/* MÁSCARAS DE DEGRADADO (Fades laterales para que no se corten de golpe) */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

            {/* TRACK DE MOVIMIENTO */}
            {/* group-hover:pause -> Detiene todo el carrusel al poner el mouse encima */}
            <div className="flex w-max animate-infinite-scroll group-hover:[animation-play-state:paused] items-center">
                {marqueePartners.map((partner, index) => (
                    <PartnerLogo key={index} partner={partner} />
                ))}
            </div>

        </div>

      </div>

      {/* KEYFRAMES */}
      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
}

// --- LOGO FLOTANTE SIN TARJETA ---
const PartnerLogo = ({ partner }) => {
  return (
    // Espaciado generoso entre logos (mx-10 md:mx-16)
    <div className="relative mx-10 md:mx-16 group/logo cursor-pointer py-4">
      
      {/* 1. BACKLIGHT (Luz trasera) 
          Solo aparece en hover, usando el color de la marca. 
          Al no tener tarjeta, esto crea un efecto de "halo" detrás del logo.
      */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full opacity-0 group-hover/logo:opacity-40 transition-opacity duration-500 blur-[30px]"
        style={{ backgroundColor: partner.brandColor }}
      />

      {/* 2. EL LOGO */}
      <img 
          src={partner.logo} 
          alt={partner.name}
          className={`
            ${partner.width} h-auto object-contain transition-all duration-500 relative z-10
            
            /* ESTADO NORMAL (Fantasma): 
               - Grayscale (blanco y negro)
               - Brightness bajo (gris oscuro)
               - Opacidad media (semi-invisible)
            */
            filter grayscale brightness-[0.5] opacity-40 contrast-[0.8]
            
            /* ESTADO HOVER (Encendido): 
               - Full Color
               - Brillo total
               - Escala un poco más grande
               - Drop Shadow del color de la marca
            */
            group-hover/logo:filter-none 
            group-hover/logo:opacity-100 
            group-hover/logo:scale-110 
            group-hover/logo:drop-shadow-[0_0_15px_${partner.brandColor}80]
          `}
      />
      
    </div>
  );
};