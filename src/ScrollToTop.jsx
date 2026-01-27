import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Hook de Framer Motion para detectar scroll (más preciso)
  const { scrollY } = useScroll();

  // 1. Detectar el Scroll para mostrar/ocultar
  useEffect(() => {
    // Usamos el hook reactivo de framer motion
    return scrollY.onChange((latest) => {
      if (latest > 400) { // Mostramos después de 400px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, [scrollY]);

  // 2. Función para subir suavemente
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- VARIANTES DE ANIMACIÓN (La magia está aquí) ---
  
  // El contenedor del botón
  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.6, 
      y: 40, // Empieza más abajo
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      // Rebote tipo "spring" al aparecer
      transition: { type: "spring", stiffness: 300, damping: 20 } 
    },
    hover: { 
      scale: 1.1, // Crece un poco más
      backgroundColor: '#FF4D00', // Naranja Qualtop
      borderColor: '#FF4D00',
      // Sombra de neón intensa
      boxShadow: "0px 0px 25px rgba(255, 77, 0, 0.5)",
      transition: { type: "spring", stiffness: 400, damping: 15 }
    },
    tap: { 
      scale: 0.9, // Se "hunde" al hacer clic (feedback táctil)
      backgroundColor: '#cc3d00', // Un naranja un poco más oscuro al presionar
      boxShadow: "0px 0px 10px rgba(255, 77, 0, 0.3)",
      transition: { type: "spring", stiffness: 500, damping: 10 }
    }
  };

  // El icono de la flecha (se mueve independiente)
  const iconVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
    hover: { 
      y: -3, // Sube un poquito
      scale: 1.1,
      transition: { type: "spring", stiffness: 300, damping: 10, delay: 0.05 } // Pequeño delay para efecto de capas
    },
    tap: {
        y: 0, // Vuelve al centro al hacer clic
        scale: 0.9,
    }
  };


  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          // Estados base
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={scrollToTop}
          // Clases base minimalistas (estado inactivo)
          className="fixed bottom-8 right-8 z-[90] w-12 h-12 flex items-center justify-center rounded-full bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 text-white shadow-lg outline-none cursor-pointer overflow-hidden"
          aria-label="Volver arriba"
        >
            {/* Efecto de brillo sutil en el borde (opcional, muy pro) */}
            <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-20 transition-opacity bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none"></div>

            <motion.div variants={iconVariants}>
               <ArrowUp size={22} strokeWidth={2.5} />
            </motion.div>
            
            {/* "Ripple" o destello al hacer clic que sale del botón */}
            <motion.div
                className="absolute inset-0 rounded-full bg-white"
                initial={{ opacity: 0, scale: 0 }}
                whileTap={{ opacity: 0.2, scale: 1.5, transition: { duration: 0.4 } }}
            />
        </motion.button>
      )}
    </AnimatePresence>
  );
}