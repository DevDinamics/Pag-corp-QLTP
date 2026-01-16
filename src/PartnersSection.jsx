import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- DATOS DE PARTNERS ---
const partners = [
  { name: "Oracle", logo: "https://cdn.worldvectorlogo.com/logos/oracle-6.svg", width: "w-32", brandColor: "#F80000" },
  { name: "Databricks", logo: "https://qualtop.com/wp-content/uploads/2025/11/darabricks.png", width: "w-32", brandColor: "#FF3621" },
  { name: "AWS", logo: "https://cdn.worldvectorlogo.com/logos/aws-2.svg", width: "w-20", brandColor: "#FF9900" },
  { name: "Google Cloud", logo: "https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg", width: "w-24", brandColor: "#4285F4" },
  { name: "IBM", logo: "https://cdn.worldvectorlogo.com/logos/ibm.svg", width: "w-24", brandColor: "#0530AD" },
  { name: "SAFe", logo: "https://qualtop.com/wp-content/uploads/2025/11/safe_SAI_Partner_Badge_Gold.jpg", width: "w-24", brandColor: "#FFB800" },
  { name: "ISTQB", logo: "https://qualtop.com/wp-content/uploads/2025/11/istqb1.png", width: "w-28", brandColor: "#005b96" }
];

export default function PartnersSection() {
  return (
    <section className="relative w-full bg-[#050505] py-32 overflow-hidden border-t border-white/5 perspective-1000">
      
      {/* FONDO AMBIENTAL (Cyberpunk Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Luz ambiental central */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-qualtop-orange/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ENCABEZADO */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-qualtop-orange font-mono text-xs tracking-[0.3em] uppercase mb-4 block"
          >
            Ecosistema Global
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white "
          >
            Partners

          </motion.h2>
        </div>

        {/* GRID DE TARJETAS 3D */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <TiltCard key={index} partner={partner} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

// --- COMPONENTE AVANZADO: TARJETA CON TILT 3D Y GLARE ---
const TiltCard = ({ partner, index }) => {
  // Valores de movimiento para el efecto 3D
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Física del resorte para suavizar el movimiento (Spring Physics)
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  // Transformar posición del mouse en rotación (Tilt)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Estado para opacidad del brillo
  const [hovered, setHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    // Calculamos la posición del mouse relativa al centro de la tarjeta (-0.5 a 0.5)
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{
        perspective: 1000, // Profundidad 3D
      }}
      className="relative h-40 md:h-48 w-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full rounded-2xl bg-[#0a0a0a] border border-white/5 flex items-center justify-center cursor-pointer group"
      >
        
        {/* 1. BRILLO AMBIENTAL (Glow trasero según color de marca) */}
        <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-2xl -z-10"
            style={{ backgroundColor: partner.brandColor }}
        />

        {/* 2. CAPA DE CRISTAL (Glassmorphism) */}
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[2px] rounded-2xl group-hover:bg-white/[0.05] transition-colors duration-300" />

        {/* 3. CONTENIDO (LOGO) - Flota sobre la tarjeta (translateZ) */}
        <motion.div 
            style={{ transform: "translateZ(30px)" }} // Efecto de flotación real
            className="relative z-20 p-6"
        >
            <img 
                src={partner.logo} 
                alt={partner.name}
                className={`${partner.width} max-h-16 object-contain filter grayscale brightness-125 opacity-50 group-hover:filter-none group-hover:opacity-100 transition-all duration-500`}
            />
        </motion.div>

        {/* 4. EFECTO "GLARE" (Reflejo de luz holográfica) */}
        <div
            className="absolute inset-0 z-30 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
                background: `radial-gradient(
                    circle at ${50 + x.get() * 100}% ${50 + y.get() * 100}%, 
                    rgba(255,255,255,0.15), 
                    transparent 60%
                )`
            }}
        />
        
        {/* 5. BORDE BRILLANTE */}
        <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />

      </motion.div>
    </motion.div>
  );
};