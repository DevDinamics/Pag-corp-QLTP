import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search, X, Loader2, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { client, urlFor } from './client'; 

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
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname, currentPage]); 

  // Carga de datos
  useEffect(() => {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      title, shortTitle, slug, mainImage, publishedAt,
      "categories": categories[]->title,
      "excerpt": body[0].children[0].text
    }`;

    client.fetch(query).then((data) => {
        const formattedPosts = data.map(post => ({
          id: post.slug.current,
          title: post.shortTitle || post.title, 
          category: post.categories ? post.categories[0] : "",
          date: new Date(post.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
          
          // Si tiene imagen en Sanity la usa, si no, pone el placeholder elegante
          image: post.mainImage 
            ? urlFor(post.mainImage).width(800).height(500).url() 
            : "https://placehold.co/800x500/111/FF4D00?text=Qualtop+Blog", 
          
          excerpt: post.excerpt ? post.excerpt.substring(0, 100) + "..." : "Lee el análisis completo..."
        }));
        setPosts(formattedPosts);
        setFilteredPosts(formattedPosts);
        setLoading(false);
      })
      .catch((err) => { console.error("Error Sanity:", err); setLoading(false); });
  }, []);

  // Buscador y Filtros
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
          post.excerpt.toLowerCase().includes(lowerQuery) ||
          post.category.toLowerCase().includes(lowerQuery)
        );
        setFilteredPosts(results);
      } else { setFilteredPosts(posts); }
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <div className="bg-black min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-orange-500"/></div>;

  return (
    <div className="bg-[#020202] min-h-screen relative overflow-hidden pb-40">
      
      {/* Fondo Ambiental */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pt-40 px-6">
        <header className="mb-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold tracking-widest uppercase text-qualtop-orange mb-6">
            <Sparkles size={12} /> <span>Insights & Tendencias</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6">
            <span className="text-white">Blog</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Explorando el futuro de la Inteligencia Artificial, la Nube y la Modernización Empresarial.
          </motion.p>
        </header>

        <AnimatePresence>
          {searchTerm && (
            <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="mb-16 sticky top-24 z-50">
              <div className="max-w-xl mx-auto flex justify-between bg-[#111] border border-orange-500/30 p-4 rounded-2xl shadow-2xl backdrop-blur-md">
                <p className="text-white">Buscando: <span className="text-orange-500">"{searchTerm}"</span></p>
                <button onClick={clearSearch}><X size={18} className="text-gray-400 hover:text-white"/></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {currentPosts.map((post, index) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group h-full">
                  <Link to={`/blog/${post.id}`} className="block h-full">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,77,0,0.1)] h-full flex flex-col">
                      <div className="aspect-[16/10] overflow-hidden relative">
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"/>
                         <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"/>
                         <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/60 backdrop-blur border border-white/10 rounded-lg">
                            <span className="text-[10px] font-bold text-qualtop-orange uppercase tracking-wider">{post.category}</span>
                         </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 mb-4 text-xs font-medium text-gray-500">
                           <span>{post.date}</span>
                           <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                           <span> </span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-qualtop-orange transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow font-light">
                          {post.excerpt}
                        </p>
                        <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white group-hover:text-qualtop-orange transition-colors">Leer Artículo</span>
                          <ArrowUpRight size={16} className="text-gray-500 group-hover:text-qualtop-orange transition-colors"/>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* --- PAGINACIÓN --- */}
            {totalPages > 1 && (
              <div className="mt-24 flex justify-center items-center gap-4 relative z-50 pb-20">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#111] border border-white/10 text-white hover:border-qualtop-orange disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-2 bg-[#111] p-2 rounded-xl border border-white/10">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => paginate(i + 1)} className={`w-10 h-10 rounded-lg font-bold transition-all ${currentPage === i + 1 ? 'bg-qualtop-orange text-white shadow-lg shadow-orange-500/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="h-12 px-6 flex items-center gap-2 rounded-xl bg-[#111] border border-white/10 text-white hover:border-qualtop-orange disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-bold uppercase tracking-widest">
                  Siguiente <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
             <Search size={48} className="text-gray-700 mb-4"/>
             <h3 className="text-2xl font-bold text-white mb-2">Sin resultados</h3>
             <button onClick={clearSearch} className="text-qualtop-orange underline">Ver todos los artículos</button>
          </div>
        )}
      </div>
    </div>
  );
}