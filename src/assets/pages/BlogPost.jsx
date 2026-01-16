import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, ArrowLeft, Share2,
  Check, Mail, Linkedin, Twitter, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function BlogPost() {
  const navigate = useNavigate();
  const contentRef = useRef(null);

  // --- 1. LÓGICA INTELIGENTE DE COMPARTIR ---
  const [copied, setCopied] = useState(false);

  const handleSharePost = async () => {
    // ERROR CORREGIDO: Usamos la URL limpia (SIN encodeURIComponent)
    // Esto soluciona el link raro en el celular.
    const url = window.location.href; 
    const title = "La Nueva Era de la Gestión de Siniestros";
    
    // DETECCIÓN RÁPIDA: ¿Es celular/tablet?
    // (Verificamos si es iOS/Android o si tiene pantalla táctil pequeña)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 0 && window.innerWidth < 1024);

    // CASO 1: Es MÓVIL y soporta compartir nativo -> Abre menú del cel
    if (isMobile && navigator.share) {
      try {
        await navigator.share({
            title: title,
            url: url // URL limpia
        });
      } catch (error) { 
        console.log('Cancelado por usuario'); 
      }
    } 
    // CASO 2: Es DESKTOP (Web) -> Solo copia y muestra alerta
    else {
      try {
        await navigator.clipboard.writeText(url); // URL limpia
        setCopied(true); // ¡Mostramos la alerta visual!
        setTimeout(() => setCopied(false), 2500);
      } catch (err) { 
        console.error('Error al copiar', err); 
      }
    }
  };

  // --- 2. LÓGICA REDES SOCIALES ---
  const shareToSocial = (platform) => {
    // Aquí SÍ codificamos porque la URL va dentro de otra URL
    // NOTA: Cuando subas a Vercel, cambia "google.com" por window.location.href
    const url = encodeURIComponent(window.location.href); 
    const text = encodeURIComponent("Lectura recomendada sobre Gestión de Siniestros e IA:");
    
    let shareUrl = "";

    if (platform === 'linkedin') {
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === 'twitter') {
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    }

    window.open(shareUrl, '_blank', 'width=600,height=600');
  };

  // --- 3. BOTÓN SUSCRIBIRME ---
  const [subStatus, setSubStatus] = useState('idle');
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subStatus !== 'idle') return;
    setSubStatus('loading');
    setTimeout(() => {
      setSubStatus('success');
      setTimeout(() => setSubStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="bg-[#080808] text-gray-300 font-sans selection:bg-qualtop-orange selection:text-white min-h-screen">
      
      <Helmet>
        {/* Título que sale en la pestaña del navegador y en Google */}
        <title>La Nueva Era de la Gestión de Siniestros | Blog Qualtop</title>
        
        {/* Descripción corta para Google (el texto gris debajo del link) */}
        <meta name="description" content="Descubre cómo la IA y el enfoque omnicanal están revolucionando la gestión de siniestros. Análisis estratégico de Qualtop sobre Insurtech." />
        
        {/* --- Open Graph: Cómo se ve al compartir en WhatsApp/LinkedIn --- */}
        <meta property="og:title" content="La Nueva Era de la Gestión de Siniestros | Qualtop" />
        <meta property="og:description" content="Análisis sobre IA, Omnicanalidad y eficiencia operativa en seguros." />
        <meta property="og:type" content="article" />
        {/* Si tienes una imagen de portada para el blog, pon su URL aquí */}
        {/* <meta property="og:image" content="https://tu-dominio.com/img/blog-cover.jpg" /> */}
      </Helmet>


      {/* --- HERO HEADER --- */}
      <header className="relative pt-32 pb-20 px-6 bg-[#0a0a0a] border-b border-white/5">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-9">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <button onClick={() => navigate('/blog')} className="flex items-center gap-2 text-gray-500 hover:text-qualtop-orange transition-colors text-xs font-bold uppercase tracking-widest group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Blog
                    </button>
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-8">
                    La Nueva Era de la <br />
                    <span className="text-qualtop-orange">Gestión de Siniestros.</span>
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 border-t border-white/5 pt-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                            QT
                        </div>
                        <div>
                            <p className="text-white font-bold leading-none">Redacción Qualtop</p>
                            <p className="text-xs text-gray-500 mt-1">Análisis Técnico</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-qualtop-orange"/>
                        <span>12 Enero, 2026</span>
                    </div>
                </div>
            </div>
         </div>
      </header>

      {/* --- LAYOUT PRINCIPAL --- */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* COLUMNA IZQUIERDA: ARTÍCULO */}
        <main className="lg:col-span-8">
            <div
              ref={contentRef}
              className="
                prose prose-lg prose-invert max-w-none
                text-gray-300
                prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-20 prose-h2:mb-10 prose-h2:border-l-4 prose-h2:border-qualtop-orange prose-h2:pl-6
                prose-p:leading-9 prose-p:mb-10 prose-p:text-lg prose-p:font-light
                prose-strong:text-white prose-strong:font-bold
                prose-ul:list-disc prose-ul:pl-6 prose-li:marker:text-qualtop-orange prose-li:mb-6 prose-li:leading-8
                prose-blockquote:bg-[#111] prose-blockquote:border-l-qualtop-orange prose-blockquote:p-10 prose-blockquote:rounded-r-2xl prose-blockquote:text-white prose-blockquote:not-italic prose-blockquote:text-xl prose-blockquote:leading-normal prose-blockquote:my-16 prose-blockquote:shadow-lg
              "
            >
                {/* --- CONTENIDO --- */}
                
                <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-12">
                    En un entorno de negocios cada vez más competitivo y digitalizado, la eficiencia en la gestión de siniestros es un punto crucial para la satisfacción del cliente y la optimización de costos.
                </p>

                <p>
                    La implementación de un proceso de <strong>Notificación de Siniestros (FNOL) omnicanal</strong> se presenta como una herramienta estratégica que no solo mejora la experiencia del cliente, sino que también refuerza la sostenibilidad y la estabilidad financiera de las organizaciones.
                </p>

                <h2>El Enfoque Omnicanal en la Gestión de Siniestros</h2>
                <p>
                    La estrategia omnicanal permite a las aseguradoras interactuar con sus clientes de múltiples maneras, a través de diferentes plataformas y dispositivos. Al integrar colas y eventos que capturan cada interacción del cliente, las compañías pueden asegurar que cada notificación de siniestro es tratada con rapidez y precisión.
                </p>
                <ul>
                    <li>
                        <strong>Colas y Eventos:</strong> La utilización de colas para gestionar las interacciones garantiza que cada cliente reciba atención oportuna, independientemente del canal que utilice. Las alertas y eventos permiten priorizar los casos más urgentes.
                    </li>
                    <li>
                        <strong>Procesamiento Multinube:</strong> Adopción de soluciones multinube que aseguran la escalabilidad y flexibilidad requeridas para manejar picos en la demanda, permitiendo que los sistemas se adapten a diversas circunstancias contingentes.
                    </li>
                </ul>

                <h2>Inteligencia Artificial en el Triage y Documentación</h2>
                <p>
                    La inteligencia artificial (IA) se convierte en un aliado crucial para el triage de los siniestros. Al implementar algoritmos de tratamiento, es posible clasificar los casos automáticamente, facilitando la documentación conforme a reglas de auto-aprobación.
                </p>
                <ul>
                    <li>
                        <strong>Automatización de Triage:</strong> La IA permite reducir significativamente el tiempo de evaluación inicial, permitiendo que los casos menos complejos sean aprobados sin intervención manual.
                    </li>
                    <li>
                        <strong>Reglas de Auto-aprobación:</strong> Estas reglas configuran un sistema que disminuye la carga operativa, asegurando que solo los casos que realmente requieren revisión manual sean sometidos a procesos más largos.
                    </li>
                </ul>

                <h2>Telemetría y Auditoría End-to-End</h2>
                <p>
                    Implementar una solución con telemetría asegura una visibilidad completa en tiempo real a lo largo del ciclo de vida del siniestro. Esto no solo permite un seguimiento efectivo de los procesos, sino que también puede señalar áreas de mejora dentro de los mismos.
                </p>
                <ul>
                    <li>
                        <strong>Auditoría End-to-End:</strong> La capacidad de auditar cada paso del proceso garantiza la transparencia y facilita la identificación de cuellos de botella, todo ello alineado con los estándares regulatorios.
                    </li>
                    <li>
                        <strong>KPIs Clave:</strong> Establecer KPIs como el tiempo hasta la oferta, la tasa de auto-aprobación, el tiempo hasta el pago, así como indicadores de satisfacción del cliente como el CSAT y el NPS, posiciona a la organización para realizar mejoras continuas en su oferta de servicios.
                    </li>
                </ul>

                <h2>Pruebas Mensuales de Resiliencia y Mejora de Flujo</h2>
                <p>
                    Por último, es esencial la implementación de pruebas mensuales de resiliencia en los procesos. Esto asegura que, incluso en situaciones imprevistas, la organización puede mantener su efectividad operativa. La mejora continua del flujo de requisitos no solo resalta la capacidad de la gestión de siniestros para adaptarse, sino que además optimiza la experiencia del cliente.
                </p>
                <ul>
                    <li>
                        <strong>Resiliencia Operativa:</strong> Realizar simulaciones y pruebas permite al equipo identificar y abordar posibles fallos en el sistema antes de que se materialicen en problemas reales.
                    </li>
                    <li>
                        <strong>Flujo de Trabajo Mejorado:</strong> Cada evaluación y ajuste en el flujo es una oportunidad para maximizar la satisfacción del cliente y optimizar los costos operativos.
                    </li>
                </ul>

                <h2>Reflexión Final</h2>
                <p>
                    La modernización en la gestión de siniestros no es una opción, sino una necesidad. La combinación de un enfoque omnicanal, IA en triage, telemetría, y pruebas de resiliencia brinda a las organizaciones, no solo la capacidad de mejorar su eficiencia y rentabilidad, sino también de elevar la experiencia del cliente a nuevos estándares.
                </p>

                <blockquote>
                    "Esto representa no solo un cambio en la operación, sino una transformación cultural hacia la excelencia en cada interacción."
                </blockquote>

                {/* CALL TO ACTION BOX */}
                <div className="bg-gradient-to-br from-qualtop-orange/10 to-transparent border border-qualtop-orange/30 p-10 rounded-3xl mt-16 mb-8 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-qualtop-orange/20 blur-3xl rounded-full pointer-events-none"></div>
                    <h4 className="text-qualtop-orange font-bold uppercase tracking-widest text-xs mb-4">¿Siguiente Paso?</h4>
                    <p className="text-white font-medium text-xl m-0 relative z-10 leading-relaxed">
                        Si deseas profundizar en un análisis adaptado a tu organización y tus retos específicos, considera una conversación estratégica donde exploraremos juntos cómo implementar estas transformaciones en tu modelo de negocio.
                    </p>
                </div>
            </div>

            {/* BARRA DE COMPARTIR */}
            <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
                <span className="text-sm font-bold text-white uppercase tracking-widest opacity-80">
                    Comparte este insight
                </span>
                <div className="flex gap-4">
                     <button 
                        onClick={() => shareToSocial('linkedin')}
                        className="p-3 bg-white/5 rounded-full hover:bg-[#0077b5] hover:text-white transition-colors group"
                        title="Compartir en LinkedIn"
                     >
                        <Linkedin size={20} className="group-hover:scale-110 transition-transform"/>
                     </button>

                     <button 
                        onClick={() => shareToSocial('twitter')}
                        className="p-3 bg-white/5 rounded-full hover:bg-black hover:text-white transition-colors group"
                        title="Compartir en X"
                     >
                        <Twitter size={20} className="group-hover:scale-110 transition-transform"/>
                     </button>
                     
                     <button
                        onClick={handleSharePost}
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-qualtop-orange text-white rounded-full transition-all duration-300 active:scale-95"
                     >
                        <Share2 size={18} />
                        <span>Compartir</span>
                    </button>
                </div>
            </div>
        </main>

        {/* SIDEBAR */}
        <aside className="lg:col-span-4 space-y-12">
            <div className="bg-[#111] p-8 rounded-2xl border border-white/5 sticky top-32 shadow-xl">
                <div className="flex items-center gap-3 mb-4 text-qualtop-orange">
                    <Mail size={24} />
                    <span className="font-bold uppercase tracking-widest text-xs">Newsletter</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                    Estrategia Tecnológica en tu bandeja.
                </h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    Suscríbete para recibir nuestros últimos casos de éxito, tendencias de IA y análisis de mercado directamente en tu correo.
                </p>
                
                <form className="space-y-3" onSubmit={handleSubscribe}>
                    <input
                        type="email"
                        required
                        placeholder="tu@correo.com"
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-qualtop-orange focus:outline-none transition-colors disabled:opacity-50"
                        disabled={subStatus === 'loading' || subStatus === 'success'}
                    />
                    <button 
                        type="submit"
                        disabled={subStatus !== 'idle'}
                        className={`
                            w-full font-bold uppercase tracking-widest text-xs py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2
                            ${subStatus === 'success' ? 'bg-green-600 text-white border border-green-500' : 'bg-white text-black hover:bg-qualtop-orange hover:text-white'}
                            ${subStatus === 'loading' ? 'opacity-80 cursor-wait' : ''}
                        `}
                    >
                        {subStatus === 'idle' && "Suscribirme"}
                        {subStatus === 'loading' && <><Loader2 className="animate-spin" size={16} /> Procesando...</>}
                        {subStatus === 'success' && <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="flex items-center gap-2"><Check size={16} /> ¡Suscrito!</motion.div>}
                    </button>
                </form>
            </div>
        </aside>

      </div>

      {/* TOAST NOTIFICATION (Solo para Desktop/Fallback) */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-[9999] bg-white text-black px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
          >
            <Check size={20} className="text-green-600" />
            <span className="font-bold text-sm">¡Enlace copiado!</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}