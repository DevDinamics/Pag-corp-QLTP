import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, AudioLines, ArrowUpRight } from 'lucide-react';

export default function ManifestoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

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

  return (
    <section className="relative w-full bg-[#050505] py-32 px-4 md:px-6 overflow-hidden">
      
      {/* 1. TÍTULO FLOTANTE (Background Text) - Efecto de profundidad */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden">
        <h1 className="text-[12vw] md:text-[10vw] font-bold text-white/[0.03] leading-none tracking-tighter whitespace-nowrap">
          OUR MANIFESTO
        </h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- CONTENEDOR PRINCIPAL "CINEMA" --- */}
        <div 
          className="relative w-full rounded-[2.5rem] overflow-hidden bg-[#111] border border-white/10 group shadow-2xl"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          
          {/* A. EL VIDEO (Fondo Inmersivo) */}
          <div className="relative aspect-[9/16] md:aspect-[21/9] w-full">
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              // Usa tu poster aquí
              poster="https://qualtop.com/wp-content/uploads/2025/09/poster-frame.jpg" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              onClick={togglePlay}
            >
              <source src="https://qualtop.com/wp-content/uploads/2025/09/Qualtop.mp4" type="video/mp4" />
            </video>

            {/* Overlay Cinemático (Oscurece el video para que el texto se lea) */}
            <div className={`absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent transition-opacity duration-700 ${isPlaying ? 'opacity-40' : 'opacity-80'}`} />
          </div>

          {/* B. LA TARJETA DE TEXTO (Glassmorphism) - Flotando a la izquierda */}
          <div className="absolute inset-0 p-8 md:p-16 flex flex-col md:flex-row items-end md:items-center justify-between pointer-events-none">
            
            {/* Contenido Texto (Interactivo) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="pointer-events-auto max-w-2xl relative z-20"
            >
              {/* Etiqueta */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`h-[2px] w-8 transition-all duration-500 ${isPlaying ? 'bg-green-500 w-12' : 'bg-qualtop-orange'}`} />
                <span className="text-white font-mono text-xs tracking-[0.3em] uppercase">
                  {isPlaying ? 'Reproduciendo Manifiesto' : 'Nuestro Propósito'}
                </span>
              </div>

              {/* Título */}
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8 drop-shadow-lg">
                Llevamos más de <span className="text-transparent bg-clip-text bg-gradient-to-r from-qualtop-orange to-orange-400">15 años</span> transformando industrias.
              </h2>

              {/* Tarjeta de Cristal para los párrafos */}
              <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-bl-none text-gray-200 text-lg font-light leading-relaxed max-w-lg shadow-xl transform transition-all hover:bg-black/60">
                 <p className="mb-4">
                    Somos expertos en modernización, datos, inteligencia artificial y desarrollo de software.
                 </p>
                 <p className="mb-4">
                    Pero más allá de la tecnología, lo que realmente nos impulsa es generar impacto.
                 </p>
                 <div className="flex items-center gap-3 text-white font-medium pt-4 border-t border-white/10">
                    <ArrowUpRight className="text-qualtop-orange" size={20} />
                    Innovamos con propósito.
                 </div>
              </div>
            </motion.div>

            {/* C. BOTÓN PLAY GIGANTE (A la derecha o centro) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 pointer-events-auto z-30">
                <button 
                  onClick={togglePlay}
                  className="group/play relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110"
                >
                    {/* Círculos de onda (Pulse) */}
                    <div className={`absolute inset-0 rounded-full border border-white/20 animate-[ping_3s_linear_infinite] ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
                    <div className={`absolute inset-0 rounded-full border border-white/10 animate-[ping_3s_linear_infinite_1.5s] ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
                    
                    {/* Fondo del botón (Blur) */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full border border-white/30 group-hover/play:bg-qualtop-orange group-hover/play:border-qualtop-orange transition-colors duration-500" />

                    {/* Icono */}
                    <div className="relative z-10 text-white transition-transform duration-300 group-hover/play:scale-110">
                        {isPlaying ? (
                            <div className="flex gap-1 items-end h-8">
                                <span className="w-1.5 h-8 bg-white animate-[bounce_1s_infinite] rounded-full" />
                                <span className="w-1.5 h-5 bg-white animate-[bounce_1s_infinite_0.2s] rounded-full" />
                                <span className="w-1.5 h-7 bg-white animate-[bounce_1s_infinite_0.4s] rounded-full" />
                            </div>
                        ) : (
                            <Play size={40} fill="currentColor" className="ml-2" />
                        )}
                    </div>
                </button>
                
                <p className="mt-4 text-center text-xs font-bold tracking-widest uppercase text-white/70">
                    {isPlaying ? 'Pausar Video' : 'Ver Showreel'}
                </p>
            </div>

          </div>

          {/* D. BARRA DE PROGRESO DECORATIVA (Bottom) */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
             <motion.div 
               className="h-full bg-qualtop-orange"
               initial={{ width: 0 }}
               animate={{ width: isPlaying ? '100%' : '0%' }}
               transition={{ duration: 30, ease: "linear" }} // Ajusta duration a la duración real de tu video si quieres
             />
          </div>

        </div>

      </div>
    </section>
  );
}