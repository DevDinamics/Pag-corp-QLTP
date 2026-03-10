import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei'; // Optimización de carga 3D
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Helmet, HelmetProvider } from 'react-helmet-async'; 

// ... IMPORTS SECCIONES ...
import Navbar from './Navbar';
import NeuralNetwork from './NeuralNetwork';
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
import { SpeedInsights } from "@vercel/speed-insights/react";
import AntisobornoSection from './AntisobornoSection';
import LineaDenuncia from './LineaDenuncia';
import PoliticaSeguridad from './PoliticaSeguridad';
import AvisoPrivacidad from './AvisoPrivacidad';


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
    const handleClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.hash && target.origin === window.location.origin && target.pathname === window.location.pathname) { setTimeout(handleScroll, 100); }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [hash, pathname]);
  return null;
};

// --- HOME COMPONENT OPTIMIZADO PARA CERO DELAY ---
const Home = () => {
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden bg-[#050505]">
        
        
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="bg-[#050505] w-full h-full" />}>
            <Canvas 
              camera={{ position: [0, 0, 30], fov: 50 }} 
              dpr={1} 
              performance={{ min: 0.5 }}
              gl={{ 
                antialias: false, 
                powerPreference: "high-performance",
                stencil: false,
                depth: true // Mantener true para la red neuronal
              }}
            >
              <color attach="background" args={['#050505']} />
              <fog attach="fog" args={['#050505', 10, 60]} /> 
              
              <NeuralNetwork />
              
              <Suspense fallback={null}>
                <EffectComposer disableNormalPass multisampling={0}>
                  <Bloom 
                    luminanceThreshold={0.2} 
                    mipmapBlur 
                    intensity={1.2} 
                    radius={0.4} 
                  />
                </EffectComposer>
              </Suspense>
              <Preload all />
            </Canvas>
          </Suspense>
        </div>
        
        
        <div className="relative z-10 flex flex-col justify-center min-h-screen max-w-7xl mx-auto px-6 md:px-12 pointer-events-none transform-gpu">
          <div className="mt-10 md:mt-0"> 
            <h3 className="text-qualtop-orange font-extrabold text-xl md:text-2xl tracking-[0.3em] mb-6 uppercase drop-shadow-[0_0_15px_rgba(255,77,0,0.5)]">
              CASO DE ÉXITO
            </h3>
            
        
            <h1 className="text-4xl md:text-6xl text-white mb-10 max-w-5xl leading-tight tracking-tight">
              Modernización Tecnológica para <br className="hidden lg:block"/>
              <span className="font-bold inline-block mt-2 text-white">
                la Banca Mexicana – 2026
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

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Qualtop | Transformación Digital</title>
        <meta name="description" content="Soluciones tech." />
        <meta name="theme-color" content="#050505" />
        <link rel="canonical" href="https://qualtop.com/" />
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
            <Route path="*" element={<Home />} />
          </Routes>
          <CookieConsent />
          <ScrollToTopButton /> 
          <Footer />
          <SpeedInsights />
        </main>
      </Router>
    </HelmetProvider>
  );
}