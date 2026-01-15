import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, ChevronRight } from 'lucide-react';

const posts = [
  {
    id: 'gestion-siniestros',
    title: "La Nueva Era de la Gestión de Siniestros",
    category: "INSURTECH",
    date: "12 Ene, 2026",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
    excerpt: "Optimización de costos y satisfacción del cliente mediante IA y omnicanalidad."
  },
  {
    id: 'pricing-multinube',
    title: "Pricing Inteligente sobre Arquitecturas Multinube",
    category: "CLOUD & DATA",
    date: "13 Ene, 2026",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000",
    excerpt: "Estrategias dinámicas de precios impulsadas por datos en tiempo real."
  },
  {
    id: 'forecasting-retail',
    title: "Forecasting de Alta Precisión en Retail",
    category: "ANALYTICS",
    date: "9 Ene, 2026",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000",
    excerpt: "Multinube para aumentar márgenes y predecir demanda con exactitud."
  },
  {
    id: 'cultura-ejecuta',
    title: "Cultura que ejecuta: cómo alinear incentivos y OKR",
    category: "ESTRATEGIA",
    date: "29 Dic, 2025",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000",
    excerpt: "Alineación de objetivos para obtener resultados reales en la organización."
  },
  {
    id: 'modernizacion-core',
    title: "Modernización del core con riesgo controlado",
    category: "CORE BANKING",
    date: "17 Dic, 2025",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000",
    excerpt: "Evolución tecnológica segura para sistemas financieros críticos."
  },
  {
    id: 'modernizacion-escalable',
    title: "Modernización escalable: el modelo de ventaja sostenible",
    category: "INNOVACIÓN",
    date: "17 Dic, 2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
    excerpt: "Modelos que convierten la innovación en beneficios competitivos duraderos."
  }
];

export default function BlogHome() {
  return (
    <div className="bg-[#020202] min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-24">
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-qualtop-orange font-black text-xs tracking-[0.5em] uppercase mb-4"
          >
            
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-bold text-white tracking-tighter text-center"
          >
            Blog <span className="text-gray-500 italic"></span>
          </motion.h1>
        </header>

        {/* GRID DE ARTÍCULOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {posts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.1 }}
              className="group relative"
            >
              <Link to={`/blog/${post.id}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-6 border border-white/5 bg-[#111]">
                  <img 
                    src={post.image} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-40 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/80 via-transparent to-transparent" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[9px] font-black tracking-[0.2em] text-qualtop-orange uppercase">
                    <span>{post.category}</span>
                    <span className="text-gray-800">•</span>
                    <span className="text-gray-500">{post.date}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white group-hover:text-qualtop-orange transition-colors duration-300 leading-tight">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="pt-4 flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
                    Leer Más <ArrowUpRight size={14} className="text-qualtop-orange" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* PAGINACIÓN ESTILO PRO */}
        <div className="mt-32 flex justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((num) => (
              <button 
                key={num}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                  num === 1 ? 'bg-qualtop-orange text-white shadow-lg shadow-qualtop-orange/20' : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {num}
              </button>
            ))}
            <span className="text-gray-700 px-2">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-xs font-bold text-gray-500 hover:text-white hover:bg-white/5">
              9
            </button>
          </div>
          <button className="flex items-center gap-2 text-gray-500 hover:text-white text-xs font-bold ml-4 transition-colors">
            Siguiente <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}