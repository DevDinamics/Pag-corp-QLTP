import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, AudioLines, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';

export default function ManifestoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  // Nuevo estado para el volumen
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

  // Función para manejar el sonido
  const toggleMute = (e) => {
    e.stopPropagation(); // Evita que al dar clic al sonido se pause el video
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full bg-[#050505] py-20 md:py-32 px-4 md:px-6 overflow-hidden">
      
      {/* 1. TÍTULO FLOTANTE (Fondo) */}
      <div className="absolute top-10 md:top-20 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden">
        <h1 className="text-[15vw] md:text-[10vw] font-bold text-white/[0.03] leading-none tracking-tighter whitespace-nowrap">
          OUR MANIFESTO
        </h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- CONTENEDOR PRINCIPAL --- */}
        <div 
          className="relative w-full rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-[#111] border border-white/10 group shadow-2xl"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          
          {/* A. EL VIDEO */}
          {/* Responsive: 9/16 (Vertical) en móvil, 21/9 (Cine) en Desktop */}
          <div className="relative aspect-[9/16] md:aspect-[21/9] w-full">
            <video
              ref={videoRef}
              loop
              muted={isMuted} // Vinculado al estado
              playsInline
              poster="https://qualtop.com/wp-content/uploads/2025/09/poster-frame.jpg" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              onClick={togglePlay}
            >
              <source src="https://qualtop.com/wp-content/uploads/2025/09/Qualtop.mp4" type="video/mp4" />
            </video>

            {/* Overlay Responsive: Vertical en móvil (bottom-top), Horizontal en desktop (left-right) */}
            <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/40 to-transparent transition-opacity duration-700 ${isPlaying ? 'opacity-40' : 'opacity-80'}`} />
          </div>

          {/* NUEVO: BOTÓN DE SONIDO FLOTANTE */}
          <div className="absolute top-6 right-6 z-40 pointer-events-auto">
            <button 
              onClick={toggleMute}
              className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-qualtop-orange hover:border-qualtop-orange text-white transition-all duration-300"
              title={isMuted ? "Activar sonido" : "Silenciar"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>

          {/* B. CAPA DE CONTENIDO (Layout) */}
          <div className="absolute inset-0 p-6 md:p-16 flex flex-col justify-end md:justify-between md:flex-row md:items-center pointer-events-none">
            
            {/* Contenido Texto */}
            {/* LA MAGIA AQUÍ: Añadimos una transición de opacidad basada en si 'isPlaying' es true y es tamaño móvil (md:opacity-100 lo mantiene visible en desktop) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`pointer-events-auto w-full md:max-w-2xl relative z-20 mt-20 md:mt-0 transition-opacity duration-500 ${isPlaying ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100'}`}
            >
              {/* Etiqueta */}
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className={`h-[2px] w-8 transition-all duration-500 ${isPlaying ? 'bg-green-500 w-12' : 'bg-qualtop-orange'}`} />
                <span className="text-white font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">
                  {isPlaying ? 'Reproduciendo' : 'Nuestro Propósito'}
                </span>
              </div>

              {/* Título Responsive */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight md:leading-[1.1] mb-6 md:mb-8 drop-shadow-lg">
                Llevamos más de <span className="text-transparent bg-clip-text bg-gradient-to-r from-qualtop-orange to-orange-400">15 años</span> transformando industrias.
              </h2>

              {/* Tarjeta de Cristal */}
              <div className="bg-black/60 md:bg-black/40 backdrop-blur-xl border border-white/10 p-5 md:p-8 rounded-xl md:rounded-2xl md:rounded-bl-none text-gray-200 text-sm md:text-lg font-light leading-relaxed max-w-lg shadow-xl">
                 <p className="mb-3 md:mb-4">
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

            {/* C. BOTÓN PLAY */}
            {/* Responsive: Absoluto centrado en móvil, estático a la derecha en desktop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 pointer-events-auto z-30">
                <button 
                  onClick={togglePlay}
                  className="group/play relative w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95"
                >
                    {/* Ondas */}
                    <div className={`absolute inset-0 rounded-full border border-white/20 animate-[ping_3s_linear_infinite] ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
                    <div className={`absolute inset-0 rounded-full border border-white/10 animate-[ping_3s_linear_infinite_1.5s] ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
                    
                    {/* Fondo */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full border border-white/30 group-hover/play:bg-qualtop-orange group-hover/play:border-qualtop-orange transition-colors duration-500" />

                    {/* Icono */}
                    <div className="relative z-10 text-white transition-transform duration-300 group-hover/play:scale-110">
                        {isPlaying ? (
                            <div className="flex gap-1 items-end h-6 md:h-8">
                                <span className="w-1 md:w-1.5 h-6 md:h-8 bg-white animate-[bounce_1s_infinite] rounded-full" />
                                <span className="w-1 md:w-1.5 h-4 md:h-5 bg-white animate-[bounce_1s_infinite_0.2s] rounded-full" />
                                <span className="w-1 md:w-1.5 h-5 md:h-7 bg-white animate-[bounce_1s_infinite_0.4s] rounded-full" />
                            </div>
                        ) : (
                            <Play size={28} fill="currentColor" className="ml-1 md:ml-2 md:w-10 md:h-10" />
                        )}
                    </div>
                </button>
                
                <p className="mt-3 md:mt-4 text-center text-[10px] md:text-xs font-bold tracking-widest uppercase text-white/70 hidden md:block">
                    {isPlaying ? 'Pausar' : 'Ver Reel'}
                </p>
            </div>

          </div>

          {/* D. BARRA DE PROGRESO */}
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
    </section>
  );
}