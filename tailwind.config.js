/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. FUENTES
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], 
      },

      // 2. COLORES (Aquí agregamos la paleta Dark Mode)
      colors: {
        'qualtop-orange': '#FF4D00', // Tu naranja de siempre
        'qualtop-dark': '#050505',   // NUEVO: El negro suave para el fondo (menos cansado)
        'qualtop-card': '#111111',   // NUEVO: Gris muy oscuro para las tarjetas
      },

      // 3. ANIMACIONES (Conservamos las tuyas)
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'hologram': 'hologramPosition 3s ease infinite alternate',
        'shimmer': 'shimmer 2s linear infinite', 
      },
      keyframes: {
        hologramPosition: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
    },
  },
  
  // 4. PLUGINS
  // Agregamos esto para que funcione la clase 'prose' en el Blog
  plugins: [
    require('@tailwindcss/typography'),
  ],
}