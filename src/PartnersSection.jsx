import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

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

export default function PartnersSection() {
  return (
    <section className="relative w-full bg-[#050505] py-40 overflow-hidden">
      
      {/* 1. FONDO CON TEXTURA "NOISE" (Da sensación de material premium) */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
      </div>

      {/* 2. LUCES AMBIENTALES FLOTANTES */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-qualtop-orange/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ENCABEZADO MINIMALISTA */}
        <div className="text-center mb-24">

          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Partners
          </motion.h2>
        </div>

        {/* GRID CENTRADO (Flex wrap para centrar la última tarjeta si es impar) */}
        <div className="flex flex-wrap justify-center gap-6">
          {partners.map((partner, index) => (
            <LuxuryCard key={index} partner={partner} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

// --- COMPONENTE DE LUJO: OBSIDIAN GLASS CARD ---
const LuxuryCard = ({ partner, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Física más "pesada" para sentir calidad (High Mass)
  const mouseX = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]); // Movimiento sutil
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - left) / width - 0.5);
    y.set((e.clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      // Ancho fijo o flexible según necesites
      className="relative h-44 w-full md:w-[calc(33%-1.5rem)] lg:w-[calc(25%-1.5rem)] min-w-[280px]"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full group"
      >
        
        {/* --- 1. BASE DE CRISTAL OSCURO (Obsidian Base) --- */}
        <div className="absolute inset-0 rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 shadow-2xl transition-colors duration-500 group-hover:border-white/10 overflow-hidden">
            
            {/* Ruido sutil interno */}
            <div className="absolute inset-0 opacity-[0.03] bg-repeat mix-blend-overlay" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />

            {/* --- 2. ILUMINACIÓN VOLUMÉTRICA (El color de la marca explota al fondo) --- */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 ease-out"
                style={{ 
                    background: `radial-gradient(circle at center, ${partner.brandColor}, transparent 80%)`,
                    filter: 'blur(40px)'
                }}
            />
            
            {/* Spot de luz que sigue al mouse */}
            <motion.div 
               className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
               style={{
                   background: useTransform(
                       [mouseX, mouseY],
                       ([xVal, yVal]) => `radial-gradient(
                           600px circle at ${50 + xVal * 100}% ${50 + yVal * 100}%, 
                           rgba(255,255,255,0.03), 
                           transparent 40%
                       )`
                   )
               }}
            />
        </div>

        {/* --- 3. CONTENIDO FLOTANTE (Logo) --- */}
        <div className="absolute inset-0 flex items-center justify-center p-8 z-20 transform-style-3d">
            <motion.div 
                style={{ transform: "translateZ(40px)" }} // Flota literalmente fuera de la tarjeta
                className="relative"
            >
                <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className={`${partner.width} h-auto object-contain transition-all duration-500
                    /* ESTADO NORMAL: Gris metálico plateado (Efecto Platino) */
                    filter grayscale brightness-[0.7] contrast-[0.8] opacity-60
                    /* ESTADO HOVER: Color original brillante */
                    group-hover:filter-none group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_${partner.brandColor}40]`}
                />
            </motion.div>
        </div>

        {/* --- 4. REFLEJOS DE CRISTAL (Glass Glare) --- */}
        {/* Borde superior brillante (Luz de estudio) */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
        {/* Borde inferior suave */}
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30" />

      </motion.div>
    </motion.div>
  );
};