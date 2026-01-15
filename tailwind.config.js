/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // AGREGA ESTA SECCIÓN DE FONTFAMILY
      fontFamily: {
        // Al ponerla en 'sans', Tailwind la usará automáticamente en todo el sitio
        sans: ['Poppins', 'sans-serif'], 
      },

      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'hologram': 'hologramPosition 3s ease infinite alternate',
        'shimmer': 'shimmer 2s linear infinite', // Por si usaste el anterior
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

      
      // Tu configuración de colores que ya tenías...
      colors: {
        'qualtop-orange': '#FF4D00',
        // ... otros colores
      }
    },
  },
  plugins: [],

  
}

