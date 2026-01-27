import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
// CORRECCIÓN: Se agregó HelmetProvider a la importación
import { Helmet, HelmetProvider } from 'react-helmet-async'; 

// --- COMPONENTES ---
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

/* =========================================
   AUXILIARES
   ========================================= */
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
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    };
    handleScroll();
    const handleClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.hash && target.origin === window.location.origin && target.pathname === window.location.pathname) {
        setTimeout(handleScroll, 100); 
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [hash, pathname]);
  return null;
};

/* =========================================
   PÁGINA HOME (Landing Principal)
   ========================================= */
const Home = () => (
  <>
    {/* 1. HERO SECTION */}
    <section className="relative h-screen w-full overflow-hidden bg-[#050505]">
      
      {/* Fondo 3D */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 2, 22], fov: 45 }} 
          dpr={[1, 2]} 
          performance={{ min: 0.5 }}
        >
          <color attach="background" args={['#050505']} />
          
          {/* Niebla lejana */}
          <fog attach="fog" args={['#050505', 10, 80]} /> 
          
          <NeuralNetwork />
          
          <Suspense fallback={null}>
            <EffectComposer disableNormalPass multisampling={0}>
              <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} radius={0.5} />
              <Vignette offset={0.2} darkness={0.6} eskil={false} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>
      
      {/* Contenido Texto */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen max-w-7xl mx-auto px-6 md:px-12 pointer-events-none">
        <div className="mt-10 md:mt-0"> 
          <h3 className="text-qualtop-orange font-extrabold text-xl md:text-2xl tracking-[0.3em] mb-6 uppercase drop-shadow-md">
            CASO DE ÉXITO
          </h3>
          <h1 className="text-4xl md:text-6xl text-white mb-10 max-w-5xl drop-shadow-lg leading-[1.4]">
            Modernización Tecnológica para <br className="hidden lg:block"/>
            <span className="font-bold inline-block mt-2">la Banca Mexicana – 2026</span>
          </h1>
          <div className="pointer-events-auto flex gap-6">
            <button className="bg-qualtop-orange hover:bg-orange-600 text-white text-base font-bold py-4 px-10 rounded-[4px] transition-all duration-300 hover:scale-105 uppercase tracking-widest">
              DESCARGAR
            </button>
          </div>
        </div>
      </div>

      {/* DEGRADADO INFERIOR */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-20 pointer-events-none" />
    </section>

    {/* SECCIONES SIGUIENTES */}
    <div className="relative z-10 bg-[#050505] -mt-20 pb-20">
      <ServicesSection />
      <ProductsSection />
      <BenefitsSection />
      <PartnersSection /> 
      <CTASection />
      <ContactSection />
    </div>
  </>
);

export default function App() {
  return (
    // HelmetProvider funcionará correctamente ahora que está importado
    <HelmetProvider>
      <Helmet>
        {/* SEO GLOBAL */}
        <title>Qualtop | Transformación Digital</title>
        <meta name="description" content="Soluciones de desarrollo de software, inteligencia artificial y modernización tecnológica." />
        <meta name="theme-color" content="#050505" />
        <link rel="canonical" href="https://qualtop.com/" />
      </Helmet>

      <Router>
        <ScrollToTop />
        <ScrollToHashElement />
        
        <main className="relative w-full min-h-screen bg-[#050505] selection:bg-qualtop-orange selection:text-white font-sans text-gray-300">      
          
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/blog" element={<BlogHome />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact-home" element={<ContactHome />} />
            <Route path="*" element={<Home />} />
          </Routes>
          
          <ScrollToTopButton /> 
          <Footer />
        </main>
      </Router>
    </HelmetProvider>
  );
}