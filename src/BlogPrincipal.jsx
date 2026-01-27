import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search, X, Loader2, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
// Asegúrate de que la ruta a tu cliente de Sanity sea correcta
import { client, urlFor } from './client'; 

// --- VARIANTES DE ANIMACIÓN (Para solucionar el bug de carga) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Efecto cascada entre tarjetas
    }
  },
  exit: { opacity: 0 } // Variante de salida opcional
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function BlogHome() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // --- CONFIGURACIÓN ---
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9; 

  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Scroll al inicio al cambiar de página
  useEffect(() => { 
    window.scrollTo({ top: 0, behavior: 'instant' }); 
  }, [location.pathname, currentPage]); 

  // Carga de datos
  useEffect(() => {
    // Query optimizada para traer solo lo necesario
    const query = `*[_type == "post"] | order(publishedAt desc) {
      title, 
      shortTitle, 
      slug, 
      mainImage, 
      publishedAt,
      "categories": categories[]->title,
      "excerpt": body[0].children[0].text
    }`;

    client.fetch(query).then((data) => {
        const formattedPosts = data.map(post => ({
          id: post.slug.current,
          title: post.shortTitle || post.title, 
          category: post.categories ? post.categories[0] : "Tecnología",
          date: new Date(post.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
          
          // Fallback de imagen por si no hay en Sanity
          image: post.mainImage 
            ? urlFor(post.mainImage).width(800).height(500).url() 
            : "https://placehold.co/800x500/111/FF4D00?text=Qualtop+Blog", 
          
          excerpt: post.excerpt ? post.excerpt.substring(0, 100) + "..." : "Descubre las últimas tendencias en tecnología..."
        }));
        setPosts(formattedPosts);
        setFilteredPosts(formattedPosts);
        setLoading(false);
      })
      .catch((err) => { 
        console.error("Error Sanity:", err); 
        setLoading(false); 
      });
  }, []);

  // Lógica de Buscador
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q') || "";
    setSearchTerm(query);
    setCurrentPage(1); 
    
    if (posts.length > 0) {
      if (query) {
        const lowerQuery = query.toLowerCase();
        const results = posts.filter(post => 
          post.title.toLowerCase().includes(lowerQuery) || 
          (post.excerpt && post.excerpt.toLowerCase().includes(lowerQuery)) ||
          (post.category && post.category.toLowerCase().includes(lowerQuery))
        );
        setFilteredPosts(results);
      } else { 
        setFilteredPosts(posts); 
      }
    }
  }, [location.search, posts]);

  const clearSearch = () => { navigate('/blog'); setSearchTerm(""); };

  // Paginación
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll suave hacia arriba al cambiar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading State
  if (loading) return (
    <div className="bg-[#050505] min-h-screen flex items-center justify-center z-50 relative">
      <Loader2 className="animate-spin text-qualtop-orange" size={40} />
    </div>
  );

  return (
    // FIX DE LAYOUT: pt-32 para bajar el contenido del navbar, min-h-screen para evitar colapso
    <div className="bg-[#050505] min-h-screen relative overflow-hidden pb-40 pt-32">
      
      {/* Fondo Ambiental */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-qualtop-orange/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <header className="mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-qualtop-orange/30 bg-qualtop-orange/10 text-[11px] font-bold tracking-widest uppercase text-qualtop-orange mb-6"
          >
            <Sparkles size={12} /> <span>Insights & Tendencias</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }} 
            className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6"
          >
            Blog <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Qualtop</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }} 
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed font-light"
          >
            Explorando el futuro de la Inteligencia Artificial, la Nube y la Modernización Empresarial.
          </motion.p>
        </header>

        {/* BARRA DE BÚSQUEDA ACTIVA */}
        <AnimatePresence>
          {searchTerm && (
            <motion.div 
              initial={{opacity:0, y:-10}} 
              animate={{opacity:1, y:0}} 
              exit={{opacity:0, y:-10}} 
              className="mb-12"
            >
              <div className="flex items-center justify-between bg-[#111] border border-white/10 p-4 rounded-xl shadow-xl max-w-2xl mx-auto">
                <p className="text-gray-300">Resultados para: <span className="text-qualtop-orange font-bold">"{searchTerm}"</span></p>
                <button onClick={clearSearch} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={18} className="text-gray-400 hover:text-white"/>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GRID DE POSTS */}
        {filteredPosts.length > 0 ? (
          <>
            {/* FIX ANIMACIÓN: KEY dinámico basado en currentPage */}
            <motion.div 
              key={currentPage} // <--- ESTA ES LA SOLUCIÓN CLAVE
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            >
              {currentPosts.map((post) => (
                <motion.div 
                  key={post.id} 
                  variants={itemVariants} // Usamos la variante hija
                  className="group h-full"
                >
                  <Link to={`/blog/${post.id}`} className="block h-full">
                    <article className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-qualtop-orange/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,77,0,0.1)] h-full flex flex-col group-hover:-translate-y-2">
                      
                      {/* Imagen */}
                      <div className="aspect-[16/10] overflow-hidden relative">
                         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-60"/>
                         <img 
                           src={post.image} 
                           alt={post.title} 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                         />
                         <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg shadow-lg">
                            <span className="text-[10px] font-bold text-qualtop-orange uppercase tracking-wider">{post.category}</span>
                         </div>
                      </div>

                      {/* Contenido */}
                      <div className="p-6 md:p-8 flex flex-col flex-grow relative z-20">
                        <div className="flex items-center gap-2 mb-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                           <span>{post.date}</span>
                        </div>
                        
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-qualtop-orange transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow font-light border-l-2 border-white/10 pl-4 group-hover:border-qualtop-orange/50 transition-colors">
                          {post.excerpt}
                        </p>
                        
                        <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-white group-hover:text-qualtop-orange transition-colors">
                            Leer Artículo
                          </span>
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-qualtop-orange group-hover:text-white transition-all">
                             <ArrowUpRight size={14} />
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* --- PAGINACIÓN --- */}
            {totalPages > 1 && (
              <div className="mt-24 flex justify-center items-center gap-4 relative z-50 pb-20">
                <button 
                  onClick={() => paginate(currentPage - 1)} 
                  disabled={currentPage === 1} 
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#111] border border-white/10 text-white hover:border-qualtop-orange disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-white/5"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex gap-2 bg-[#111] p-2 rounded-xl border border-white/10">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button 
                      key={i} 
                      onClick={() => paginate(i + 1)} 
                      className={`w-10 h-10 rounded-lg font-bold transition-all text-sm ${currentPage === i + 1 ? 'bg-qualtop-orange text-white shadow-lg shadow-orange-500/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={() => paginate(currentPage + 1)} 
                  disabled={currentPage === totalPages} 
                  className="h-12 px-6 flex items-center gap-2 rounded-xl bg-[#111] border border-white/10 text-white hover:border-qualtop-orange disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-bold uppercase tracking-widest hover:bg-white/5"
                >
                  Siguiente <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center border border-white/5 rounded-3xl bg-white/[0.02]"
          >
             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Search size={32} className="text-gray-500"/>
             </div>
             <h3 className="text-2xl font-bold text-white mb-2">No encontramos resultados</h3>
             <p className="text-gray-400 mb-8">Intenta con otra palabra clave o regresa al inicio.</p>
             <button onClick={clearSearch} className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-qualtop-orange hover:text-white transition-all">
                Ver todos los artículos
             </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}