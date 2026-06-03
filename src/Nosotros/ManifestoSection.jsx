import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';

export default function ManifestoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation(); 
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full bg-[#050505] py-20 md:py-32 px-4 md:px-6 overflow-hidden font-sans">
      
      {/* 1. TÍTULO FLOTANTE DE FONDO (Mantenemos como acento pero muy tenue) */}
      <div className="absolute top-10 md:top-20 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden">
        <h1 className="text-[12vw] font-bold text-white/[0.02] leading-none tracking-tighter whitespace-nowrap">
          OUR MANIFESTO
        </h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- NUEVO CONTENEDOR PRINCIPAL: Flexbox responsivo --- */}
        <div 
          className="relative w-full rounded-3xl md:rounded-[2.5rem] bg-[#111] border border-white/10 group shadow-2xl p-6 md:p-16 flex flex-col md:flex-row items-center gap-10 md:gap-16"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* LUZ DE FONDO DECORATIVA (como en la captura de inspiración) */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-qualtop-orange rounded-full blur-[150px] opacity-10 pointer-events-none" />

          {/* COLUMNA IZQUIERDA: Texto */}
          <div className="w-full md:w-1/2 relative z-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              {/* Etiqueta */}
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="h-[2px] w-8 bg-qualtop-orange" />
                <span className="text-white font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">
                  Nuestro Propósito
                </span>
              </div>

              {/* Título */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight md:leading-[1.1] mb-6 md:mb-8">
                Llevamos más de <span className="text-transparent bg-clip-text bg-gradient-to-r from-qualtop-orange to-orange-400">15 años</span> transformando industrias.
              </h2>

              {/* Tarjeta de Cristal ( Glassmorphic Text Panel ) */}
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-5 md:p-8 rounded-xl md:rounded-2xl text-gray-300 text-sm md:text-lg font-light leading-relaxed max-w-lg shadow-xl">                 <p className="mb-3 md:mb-4">
                    Somos expertos en modernización, datos, IA y desarrollo de software.
                 </p>
                 <p className="mb-3 md:mb-4 hidden sm:block">
                    Pero más allá de la tecnología, lo que realmente nos impulsa es generar impacto.
                 </p>
                 <div className="flex items-center gap-2 md:gap-3 text-white font-medium pt-3 md:pt-4 border-t border-white/10 text-xs md:text-base">
                    <ArrowUpRight className="text-qualtop-orange w-4 h-4 md:w-5 md:h-5" />
                    Innovamos con propósito.
                 </div>
              </div>
            </motion.div>
          </div>

          {/* COLUMNA DERECHA: El Video como tarjeta independiente */}
          <div className="w-full md:w-1/2 relative group rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-lg cursor-pointer">
            
            {/* Aspect Ratio Responsivo: Vertical en móvil (9:16), Cine en Desktop (21:9 o 16:9) */}
            <div className="relative aspect-[9/16] md:aspect-[21/9] w-full">
                <video
                  ref={videoRef}
                  loop
                  muted={isMuted} 
                  playsInline
                  poster="https://qualtop.com/wp-content/uploads/2025/09/poster-frame.jpg" 
                  className={`w-full h-full object-cover transition-all duration-1000 ${isPlaying ? 'scale-100' : 'group-hover:scale-105'}`}
                  onClick={togglePlay}
                >
                  <source src="/Qualtop.mp4" type="video/mp4" />
                </video>
                
                {/* Degradado oscuro: desaparece al darle play para que el video luzca sus colores reales */}
                <div className={`absolute inset-0 bg-black/50 transition-opacity duration-1000 pointer-events-none ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
            </div>

            {/* BOTÓN PLAY CENTRADO (Simplificado y reducido para el nuevo layout) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700 pointer-events-none">
                <button 
                  onClick={togglePlay}
                  className={`group/play relative rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 pointer-events-auto ${isPlaying ? 'w-10 h-10 md:w-14 md:h-14' : 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24'}`}
                >
                    {/* Ondas (se apagan en play) */}
                    <div className={`absolute inset-0 rounded-full border border-white/20 animate-[ping_3s_linear_infinite] ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
                    
                    {/* Fondo (se hace más transparente al reproducir para no estorbar) */}
                    <div className={`absolute inset-0 backdrop-blur-md rounded-full transition-colors duration-500 ${isPlaying ? 'bg-black/20 border border-white/10' : 'bg-white/10 border border-white/30 group-hover/play:bg-qualtop-orange group-hover/play:border-qualtop-orange'}`} />

                    {/* Icono */}
                    <div className="relative z-10 text-white transition-transform duration-300 group-hover/play:scale-110">
                        {isPlaying ? (
                            <div className="flex gap-0.5 items-end h-3 md:h-5">
                                <span className="w-0.5 md:w-1 h-3 md:h-5 bg-qualtop-orange animate-[bounce_1s_infinite] rounded-full" />
                                <span className="w-0.5 md:w-1 h-2 md:h-3.5 bg-qualtop-orange animate-[bounce_1s_infinite_0.2s] rounded-full" />
                                <span className="w-0.5 md:w-1 h-2.5 md:h-4 bg-qualtop-orange animate-[bounce_1s_infinite_0.4s] rounded-full" />
                            </div>
                        ) : (
                            <Play fill="currentColor" className="text-white w-6 h-6 md:w-10 md:h-10 ml-0.5 md:ml-1" />
                        )}
                    </div>
                </button>
            </div>

            {/* BOTÓN DE SONIDO FLOTANTE (Top-Right del Video) */}
            <div className="absolute top-4 right-4 z-40">
                <button 
                  onClick={toggleMute}
                  className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-qualtop-orange hover:border-qualtop-orange text-white transition-all duration-300 shadow-lg"
                  title={isMuted ? "Activar sonido" : "Silenciar"}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
            </div>

            {/* BARRA DE PROGRESO (Bottom del Video) */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-50">
                <motion.div 
                  className="h-full bg-qualtop-orange"
                  initial={{ width: 0 }}
                  animate={{ width: isPlaying ? '100%' : '0%' }}
                  transition={{ duration: 30, ease: "linear" }}
                />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}