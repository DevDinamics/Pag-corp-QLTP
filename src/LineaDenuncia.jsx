import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

export default function LineaDenuncia() {
  return (
    <section className="relative pt-40 pb-32 bg-[#050505] min-h-screen font-sans text-white overflow-hidden">
      
      {/* FONDO ANIMADO / LUCES */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-qualtop-orange rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-white rounded-full blur-[150px] opacity-5" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* ENCABEZADO (Mantenemos tu diseño pro) */}
        <div className="mb-12 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6"
          >
            <div className="p-4 bg-gradient-to-br from-white/10 to-transparent rounded-2xl border border-white/20 shadow-lg backdrop-blur-md shrink-0">
              <ShieldAlert className="text-qualtop-orange" size={40} />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                Linea de <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Denuncia</span>
              </h1>
              <p className="text-xl text-qualtop-orange font-medium mb-2">
                Te invitamos a compartir todos los detalles relevantes sobre la situación que deseas reportar.
              </p>
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }} 
            className="text-gray-400 leading-relaxed text-lg max-w-3xl"
          >
            Cuanta más información proporciones, más efectiva será nuestra investigación y respuesta. Garantizamos la confidencialidad de tu identidad y el manejo responsable de la información que nos brindes.
          </motion.p>
        </div>

        {/* CONTENEDOR DEL IFRAME */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
          className="bg-white/[0.02] backdrop-blur-xl p-2 md:p-6 rounded-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative w-full overflow-hidden"
        >
          
          <iframe 
            src="https://qrewards.qualtop.com/api/denouncement/?site=qualtop" 
            width="100%" 
            height="1000px" 
            frameBorder="0" 
            style={{ overflowY: 'scroll', backgroundColor: 'transparent' }}
            className="w-full rounded-2xl"
            title="Formulario de Línea de Denuncia"
          ></iframe>
        </motion.div>

      </div>
    </section>
  );
}