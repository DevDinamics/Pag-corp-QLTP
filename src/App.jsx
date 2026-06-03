import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei'; 
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Helmet, HelmetProvider } from 'react-helmet-async'; 
import { motion } from 'framer-motion'; // Asegúrate de tener framer-motion instalado

import Navbar from './Navbar';
const NeuralNetwork = React.lazy(() => import('./NeuralNetwork'));
import Nosotros from './Nosotros/Nosotros'; 
import ServicesSection from './ServicesSection';
import ProductsSection from './ProductsSection';
import BenefitsSection from './BenefitsSection';
import PartnersSection from './PartnersSection';
import CTASection from './CTASection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import BlogHome from './BlogPrincipal'; 
import BlogPost from './assets/pages/BlogPost';
import ContactHome from './ContactHome';
import ScrollToTopButton from './ScrollToTop'; 
import CookieConsent from './CookieConsent';
import DownloadModal from './DownloadModal';
import AntisobornoSection from './AntisobornoSection';
import LineaDenuncia from './LineaDenuncia';
import PoliticaSeguridad from './PoliticaSeguridad';
import AvisoPrivacidad from './AvisoPrivacidad';
import PoliticaCalidad from './PoliticaCalidad';
import FAQSection from './assets/pages/FAQSection';
import ValuesFlower from './Nosotros/ValuesFlower';
import CareersHome from './Careers/CareersHome';

// --- UTILIDADES DE SCROLL ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const ScrollToHashElement = () => {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      if (hash) {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) { setTimeout(() => { element.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100); }
      }
    };
    handleScroll();
  }, [hash, pathname]);
  return null;
};

// --- HOME COMPONENT  SWITCH DE CAMPAÑA  ---
const Home = () => {
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // ==========================================================
  // CONFIGURACIÓN DE CAMPAÑA (Cambiar a false para volver a la normalidad)
  const isTalentLandCampaign = false; // <-- Cambia a false para activar la vista normal (caso de éxito)
  // ==========================================================

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden bg-[#050505]">
        
        {/* FONDO 3D */}
        <div className="absolute inset-0 z-0">
          <Canvas 
            camera={{ position: [0, 0, 30], fov: 50 }} 
            dpr={1} 
            performance={{ min: 0.5 }}
            gl={{ antialias: false, powerPreference: "high-performance", stencil: false, depth: true }}
          >
            <color attach="background" args={['#050505']} />
            <fog attach="fog" args={['#050505', 10, 60]} /> 
            
            <Suspense fallback={null}>
               <NeuralNetwork />
               <EffectComposer disableNormalPass multisampling={0}>
                 <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} radius={0.4} />
               </EffectComposer>
            </Suspense>
            <Preload all />
          </Canvas>
        </div>
        
        {/* CONTENIDO TEXTO */}
        <div className="relative z-10 flex flex-col justify-center min-h-screen max-w-7xl mx-auto px-6 md:px-12 pointer-events-none transform-gpu">
          <div className="mt-10 md:mt-0"> 
            
            {isTalentLandCampaign ? (
  /* ================= VISTA TALENT LAND 2026 (CYBER-GLOW) ================= */
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    className="relative"
  >
    <h3 className="text-qualtop-orange font-black text-sm md:text-base tracking-[0.5em] mb-6 uppercase">
      QUALTOP Patrocinador Oficial
    </h3>
    
    <h1 className="text-5xl md:text-8xl text-white mb-10 max-w-5xl leading-none font-medium tracking-tighter">
      TALENT <br/>
      <span className="relative inline-block text-white drop-shadow-[0_0_25px_rgba(255,77,0,0.6)]">
        LAND 2026
        {/* Línea decorativa animada abajo del texto */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 1, duration: 1.5 }}
          className="absolute -bottom-2 left-0 h-[2px] bg-qualtop-orange shadow-[0_0_15px_#FF4D00]"
        />
      </span>
    </h1>

    <div className="pointer-events-auto flex flex-wrap gap-6 mt-12">
      <a 
        href="https://talentland.qualtop.com/" 
        target="_blank"
        rel="noopener noreferrer"
        className="group relative px-12 py-5 bg-transparent text-white uppercase tracking-[0.3em] font-black text-xs overflow-hidden transition-all duration-300"
      >
        <span className="absolute inset-0 border border-white/20 group-hover:border-qualtop-orange transition-colors"></span>
        <span className="absolute top-0 left-0 w-0 h-[2px] bg-qualtop-orange group-hover:w-full transition-all duration-500"></span>
        <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-qualtop-orange group-hover:w-full transition-all duration-500"></span>
        
        <span className="relative z-10 group-hover:text-qualtop-orange transition-colors">
          Explorar Evento
        </span>
      </a>
    </div>
  </motion.div>
) : (
              /* ================= VISTA NORMAL (CASO DE ÉXITO) ================= */
              <div>
                <h3 className="text-qualtop-orange font-extrabold text-xl md:text-2xl tracking-[0.3em] mb-6 uppercase drop-shadow-[0_0_15px_rgba(255,77,0,0.5)]">
                  CASO DE ÉXITO
                </h3>
                
                <h1 className="text-4xl md:text-6xl text-white mb-10 max-w-5xl leading-tight tracking-tight">
                  Modernización de EUCs en una  <br className="hidden lg:block"/>
                  <span className="font-bold inline-block mt-2 text-white">
                    Institucíon Financiera Regulada
                    
                  </span>
                </h1>

                <div className="pointer-events-auto flex gap-6">
                  <button 
                    onClick={() => setShowDownloadModal(true)}
                    className="bg-qualtop-orange hover:bg-orange-600 text-white text-base font-bold py-4 px-10 rounded-[4px] transition-all duration-300 hover:scale-105 uppercase tracking-widest shadow-[0_0_30px_rgba(255,77,0,0.4)]"
                  >
                    DESCARGAR
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
        
        <DownloadModal isOpen={showDownloadModal} onClose={() => setShowDownloadModal(false)} />
      </section>
  
      <div className="relative z-10 bg-[#050505] -mt-2 pb-20">
        <ServicesSection />
        <ProductsSection />
        <BenefitsSection />
        <PartnersSection /> 
        <CTASection />
        <ContactSection />
      </div>
    </>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Qualtop | Transformación Digital</title>
        <meta name="description" content="Soluciones tech." />
      </Helmet>

      <Router>
        <ScrollToTop />
        <ScrollToHashElement />
        
        <main className="relative w-full min-h-screen bg-[#050505] font-sans text-white">      
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/blog" element={<BlogHome />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact-home" element={<ContactHome />} />
            <Route path="/politica-seguridad" element={<PoliticaSeguridad />} />
            <Route path="/politicas-antisoborno" element={<AntisobornoSection />} />
            <Route path="/linea-de-denuncia" element={<LineaDenuncia />} />
            <Route path="/aviso-privacidad" element={<AvisoPrivacidad />} />
            <Route path="/politica-calidad" element={<PoliticaCalidad />} />
            <Route path="/faqs" element={<FAQSection />} />
            <Route path="/valores" element={<ValuesFlower />} />
            <Route path="/servicios" element={<ServicesSection />} />
            <Route path="/productsSection" element={<ProductsSection />} />
            <Route path="*" element={<Home />} />
            <Route path="/careers" element={<CareersHome />} />
          </Routes>
          <CookieConsent />
          <ScrollToTopButton /> 
          <Footer />

        </main>
      </Router>
    </HelmetProvider>
  );
}