import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import VacantesSection from './VacantesSection';
import RecruitmentJourney from './RecruitmentJourney';
import FAQSection from './FAQSection';
import bgImage from '../assets/Carrers-image/image-2.carrers.jpg';

const WORDS = ["Crear.", "Innovar.", "Transformar.", "Crecer."];

function useTypewriter(words) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let speed = isDeleting ? 80 : 110;
    if (!isDeleting && text === currentWord) { speed = 2200; setIsDeleting(true); }
    else if (isDeleting && text === '') { setIsDeleting(false); setWordIndex(p => (p + 1) % words.length); speed = 400; }
    const t = setTimeout(() => setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1))), speed);
    return () => clearTimeout(t);
  }, [text, isDeleting, wordIndex, words]);

  return text;
}

export default function CareersHome() {
  const text = useTypewriter(WORDS);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY     = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]); 
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollToVacantes = (e) => {
    e.preventDefault();
    document.getElementById('vacantes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen bg-[#050505] font-sans text-white overflow-x-hidden">

      {/* ═══════════════════════════════════════
          HERO — FULL RESPONSIVE
      ═══════════════════════════════════════ */}
      <section
        ref={heroRef}
        // 👇 AQUÍ AGREGAMOS pt-32 md:pt-40 👇
        className="relative w-screen left-1/2 -translate-x-1/2 h-[100dvh] min-h-[600px] flex flex-col justify-center px-5 sm:px-10 md:px-16 lg:px-24 overflow-hidden pt-32 md:pt-40" 
      >

        {/* Fondo parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            src={bgImage}
            alt="Qualtop Team"
            style={{ y: bgY, scale: bgScale }}
            className="w-full h-full object-cover object-top opacity-55 grayscale-[15%]"
          />
          {/* Gradiente responsivo: en mobile cubre más para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-[#050505]/20 md:via-[#050505]/65 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
        </div>

        {/* ── CONTENIDO ── */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 w-full max-w-5xl"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center gap-3 mb-5 md:mb-7"
          >
            <div className="w-6 md:w-8 h-[2px] bg-qualtop-orange" />
            <span className="text-qualtop-orange font-bold tracking-[0.25em] uppercase text-[10px] sm:text-xs md:text-sm">
              Únete a Qualtop
            </span>
          </motion.div>

          {/* Headline — fluid typography con clamp */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-bold leading-[1.05] tracking-tight mb-5 md:mb-7"
            style={{ fontSize: "clamp(2rem, 5.5vw, 5.5rem)" }}
          >
            El lugar para <br />
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-qualtop-orange to-orange-400"
              style={{ minHeight: "1.1em", display: "inline-block" }}
            >
              {text}
            </span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.75 }}
              className="text-qualtop-orange font-light"
            >
              |
            </motion.span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-gray-300 font-light leading-relaxed max-w-xl md:max-w-2xl"
            style={{ fontSize: "clamp(0.95rem, 2.2vw, 1.35rem)" }}
          >
            Cada talento en Qualtop es transformador y tiene la oportunidad de cambiar el mundo. Descubre tu máximo potencial y explótalo.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            onClick={scrollToVacantes}
            className="mt-10 md:mt-14 inline-flex items-center gap-0 group cursor-pointer"
          >
            {/* Pill */}
            <div className="flex items-center bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-xl rounded-full pl-5 sm:pl-7 pr-2 py-2 transition-all duration-500 shadow-xl hover:shadow-qualtop-orange/10 hover:border-qualtop-orange/30">
              <span className="text-gray-300 group-hover:text-white transition-colors text-xs sm:text-sm pr-4 whitespace-nowrap">
                Muéstrame las vacantes
              </span>
              <div className="bg-qualtop-orange text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-qualtop-orange/40 shrink-0">
                <ArrowRight size={18} />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll hint — desaparece al hacer scroll */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} className="text-white/25" />
          </motion.div>
          <span className="text-white/20 text-[9px] tracking-[0.4em] font-mono uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          SECCIONES SECUNDARIAS
      ═══════════════════════════════════════ */}

      <div id="vacantes" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 xl:px-16 bg-[#050505]">
        <VacantesSection />
      </div>
        
      <RecruitmentJourney />

      <FAQSection />

    </main>
  );
}