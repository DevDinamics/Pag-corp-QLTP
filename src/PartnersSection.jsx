import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  { name: "Oracle", logo: "https://cdn.worldvectorlogo.com/logos/oracle-6.svg", width: "w-32 md:w-44" },
  { name: "Databricks", logo: "https://qualtop.com/wp-content/uploads/2025/11/darabricks.png", width: "w-32 md:w-44" },
  { name: "AWS", logo: "https://cdn.worldvectorlogo.com/logos/aws-2.svg", width: "w-20 md:w-28" },
  { name: "Google Cloud", logo: "https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg", width: "w-20 md:w-28" },
  { name: "IBM", logo: "https://cdn.worldvectorlogo.com/logos/ibm.svg", width: "w-24 md:w-36" },
  { name: "SAFe", logo: "https://qualtop.com/wp-content/uploads/2025/11/safe_SAI_Partner_Badge_Gold.jpg", width: "w-24 md:w-36" },
  { name: "ISTQB", logo: "https://qualtop.com/wp-content/uploads/2025/11/istqb1.png", width: "w-28 md:w-40" }
];

const seamlessPartners = [...partners, ...partners];

export default function PartnersSection() {
  return (
    <section className="relative w-full bg-[#050505] py-24 overflow-hidden border-t border-white/5">
      
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter uppercase">
             Partners
        </h2>
      </div>

      {/* Aumentamos h-24 md:h-40 para que los logos tengan espacio arriba y abajo 
          sin ser cortados por el 'overflow-hidden'.
      */}
      <div className="relative w-full flex items-center h-24 md:h-40 overflow-hidden group">
        
        {/* CINTAS INVISIBLES AJUSTADAS */}
        <div className="absolute top-0 left-0 h-full w-32 md:w-64 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-32 md:w-64 bg-gradient-to-l from-[#050505] via-[#050505]/90 to-transparent z-20 pointer-events-none" />

        <motion.div 
            className="flex gap-16 md:gap-32 items-center whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }} 
            transition={{
                repeat: Infinity,
                duration: 35, // Aumentamos duración porque el recorrido es mayor
                ease: "linear",
            }}
        >
            {seamlessPartners.map((partner, index) => (
                <div 
                    key={index} 
                    className="relative flex-shrink-0 flex items-center justify-center px-4"
                >
                    <img 
                        src={partner.logo} 
                        alt={partner.name} 
                        className={`
                            ${partner.width} 
                            h-full 
                            max-h-16 md:max-h-24
                            object-contain 
                            transition-all duration-500
                            brightness-0 invert opacity-40
                            hover:filter-none hover:opacity-100 hover:scale-110
                        `} 
                    />
                    
                    {/* Glow efecto opcional al hover */}
                    <div className="absolute inset-0 bg-qualtop-orange/10 blur-3xl rounded-full opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}