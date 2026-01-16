import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Helmet } from 'react-helmet-async'; // Importamos Helmet para SEO

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
import BlogHome from './BlogHome';
import BlogPost from './assets/pages/BlogPost';
import ContactHome from './ContactHome';


/* =========================================
   AUXILIAR: RESET DE SCROLL AL CAMBIAR RUTA
   ========================================= */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/* =========================================
   AUXILIAR: SCROLL A SECCIONES (CORREGIDO)
   ========================================= */
const ScrollToHashElement = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    // Función centralizada para hacer el scroll
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

    // 1. Ejecutar al cargar
    handleScroll();

    // 2. Escuchar clics manuales (Solución al bug de "ya estoy aquí")
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
    {/* 1. HERO SECTION (Optimizado para rendimiento) */}
    <section className="relative h-screen w-full overflow-hidden">
      
      {/* Fondo 3D (Neural Network) */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 6, 14], fov: 50 }} 
          // OPTIMIZACIÓN CRÍTICA: dpr={[1, 1]} evita que renderice en 4K en pantallas retina, eliminando el lag
          dpr={[1, 1]} 
          performance={{ min: 0.5 }}
        >
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['#000000', 10, 50]} />
          
          <NeuralNetwork />
          
          <Suspense fallback={null}>
            {/* OPTIMIZACIÓN: multisampling={0} quita carga pesada a la GPU */}
            <EffectComposer disableNormalPass multisampling={0}>
              <Bloom 
                luminanceThreshold={0.2} 
                mipmapBlur 
                intensity={1.0} 
                radius={0.4} 
              />
              <Vignette offset={0.1} darkness={1.1} eskil={false} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>
      
      {/* Contenido Texto del Hero */}
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

      {/* DEGRADADO DE FUSIÓN */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-b from-transparent to-[#000000] z-20 pointer-events-none" />
    </section>

    <div className="relative z-10 bg-[#000000] -mt-32 pb-20">
      <ServicesSection />
      <ProductsSection />
      <BenefitsSection />
      <PartnersSection /> 
      <CTASection />
      <ContactSection />
    </div>
  </>
);

/* =========================================
   APP PRINCIPAL (Configuración de Rutas)
   ========================================= */
export default function App() {
  return (
    <Router>
      {/* --- SEO DEFAULT (Para páginas que no tengan Helmet propio) --- */}
      <Helmet>
        <title>Qualtop</title>
        <meta name="description" content="Qualtop ofrece soluciones de desarrollo de software, inteligencia artificial y modernización tecnológica para empresas líderes." />
        <meta name="theme-color" content="#FF4D00" />
      </Helmet>

      <ScrollToTop />
      <ScrollToHashElement />
      
      <main className="relative w-full min-h-screen bg-[#000000] selection:bg-qualtop-orange selection:text-white font-sans text-white">      
        <Navbar />
        
        <Routes>
          {/* Landing Principal */}
          <Route path="/" element={<Home />} />
          
          {/* Páginas Independientes */}
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<BlogHome />} />
          <Route path="/blog/gestion-siniestros" element={<BlogPost />} />
          <Route path="/contact-home" element={<ContactHome />} />

          {/* Redirección */}
          <Route path="*" element={<Home />} />
        </Routes>

        <Footer />
      </main>
    </Router>
  );
}