import { useState, useEffect } from 'react';

const useReadingProgress = (ref) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (!ref.current) return;

      const element = ref.current;
      const windowHeight = window.innerHeight;
      
      // 1. Obtener la posición del rectángulo del elemento en la ventana
      const rect = element.getBoundingClientRect();
      
      // 2. Calcular la posición absoluta en el documento
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop; 
      const elementHeight = rect.height;

      // 3. Definir inicio y fin de la lectura
      // Inicio: Cuando el inicio del texto toca el tope de la pantalla
      const start = elementTop;
      // Fin: Cuando el final del texto toca el fondo de la pantalla (lectura terminada)
      const end = elementTop + elementHeight - windowHeight;

      // Logs de depuración (Borrar después de verificar)
      // console.log("Scroll:", Math.round(scrollTop), "Start:", Math.round(start), "End:", Math.round(end));

      // Si el scroll no ha llegado al inicio del artículo, es 0%
      if (scrollTop < start) {
        return setProgress(0);
      }

      // Si el scroll pasó el final, es 100%
      if (scrollTop > end) {
        return setProgress(100);
      }

      // 4. Calcular porcentaje
      const percentage = (scrollTop - start) / (end - start);
      setProgress(percentage * 100);
    };

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    
    // Ejecutar al inicio para ajustar la barra si ya hay scroll
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [ref]);

  return progress;
};

export default useReadingProgress;