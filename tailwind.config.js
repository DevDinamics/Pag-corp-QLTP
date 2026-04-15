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

      // 2. COLORES 
      colors: {
        'qualtop-orange': '#E63B11', 
        'qualtop-dark': '#07080A',   
        'qualtop-card': '#111111',   
      },

      // 3. ANIMACIONES (
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
  
  // 4. PLUGINS --Blog

  plugins: [
    require('@tailwindcss/typography'),
  ],
}