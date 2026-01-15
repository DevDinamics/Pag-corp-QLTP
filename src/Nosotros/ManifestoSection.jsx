import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

export default function ManifestoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Función para manejar el Play/Pause con suavidad
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
    <section className="bg-black py-32 px-6 overflow-hidden relative">
      
      {/* Luz ambiental de fondo */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-qualtop-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* 1. COLUMNA IZQUIERDA: TEXTO MANIFIESTO */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 order-2 lg:order-1"
          >
            <span className="text-qualtop-orange text-xs font-black tracking-[0.3em] uppercase block mb-6">
              Nuestro Propósito
            </span>
            
            <h2 className="text-3xl md:text-5xl font-medium text-white leading-[1.1] tracking-tight mb-8">
              Llevamos más de <span className="text-qualtop-orange">15 años</span> transformando industrias y elevando el estándar.
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-gray-400 font-light leading-relaxed border-l border-white/10 pl-6">
              <p>
                Somos expertos en modernización, datos, inteligencia artificial y desarrollo de software.
              </p>
              <p>
                Pero más allá de la tecnología, lo que realmente nos impulsa es generar impacto.
              </p>
              <p className="text-white font-medium">
                Innovamos con propósito, construimos con visión y trabajamos para dejar huella.
              </p>
            </div>
            
            
          </motion.div>

          {/* 2. COLUMNA DERECHA: VIDEO PLAYER INTERACTIVO */}
          <div className="relative order-1 lg:order-2">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[2rem] overflow-hidden aspect-video group shadow-2xl border border-white/10 bg-gray-900"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              
              {/* VIDEO ELEMENT */}
              <video
                ref={videoRef}
                loop
                muted // Muted es necesario a veces, pero si quieres audio quítalo
                playsInline
                // Importante: Poner una imagen 'poster' aquí sería ideal para que no se vea negro al inicio
                poster="https://qualtop.com/wp-content/uploads/2025/09/poster-frame.jpg" 
                className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-100' : 'scale-105 opacity-80'}`}
                onClick={togglePlay}
              >
                <source src="https://qualtop.com/wp-content/uploads/2025/09/Qualtop.mp4" type="video/mp4" />
              </video>

              {/* OVERLAY OSCURO (Solo visible cuando está pausado para leer el texto del botón) */}
              <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 pointer-events-none ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />

              {/* BOTÓN PLAY CENTRAL (Animación Personalizada) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <AnimatePresence>
                  {(!isPlaying || isHovering) && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
                      transition={{ duration: 0.3 }}
                      onClick={togglePlay}
                      className="group/btn relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer pointer-events-auto hover:bg-qualtop-orange hover:border-qualtop-orange transition-all duration-500"
                    >
                      {/* Onda de expansión (Pulse Effect) */}
                      {!isPlaying && (
                        <span className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-50" />
                      )}
                      
                      {/* Icono dinámico */}
                      {isPlaying ? (
                        <Pause size={32} fill="currentColor" className="text-white" />
                      ) : (
                        <Play size={32} fill="currentColor" className="text-white ml-1" />
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* ETIQUETA INFERIOR (Solo visible en pausa) */}
              <motion.div 
                animate={{ opacity: isPlaying ? 0 : 1, y: isPlaying ? 20 : 0 }}
                className="absolute bottom-6 left-6 pointer-events-none"
              >
                 <span className="text-[10px] font-black tracking-widest text-qualtop-orange uppercase mb-1 block">
                    Ver Showreel
                 </span>
                 <span className="text-white font-bold text-sm tracking-wide">
                    Descubre nuestro ADN
                 </span>
              </motion.div>

            </motion.div>

            {/* Decoración de fondo detrás del video */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border border-white/5 rounded-[2rem] rounded-tl-none" />
          </div>

        </div>
      </div>
    </section>
  );
}