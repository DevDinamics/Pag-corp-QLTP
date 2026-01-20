import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PortableText } from '@portabletext/react';
import {
  Calendar, ArrowLeft, Share2,
  Check, Mail, Linkedin, Twitter, Loader2, ExternalLink
} from 'lucide-react';

// CONEXIÓN CON SANITY
import { client, urlFor } from '../../client'; 

// --- 1. ESTILOS "PRO" PARA EL CONTENIDO (PortableText) ---
const ptComponents = {
  block: {
    // H2: Borde naranja, espaciado amplio, tipografía clara
    h2: ({children}) => (
      <h2 className="text-2xl md:text-3xl font-bold text-white mt-16 mb-8 border-l-4 border-qualtop-orange pl-6 leading-tight">
        {children}
      </h2>
    ),
    // H3: Subtítulos
    h3: ({children}) => (
      <h3 className="text-xl font-bold text-white mt-10 mb-4">
        {children}
      </h3>
    ),
    // Párrafos: Color gris claro para no cansar la vista (UX), altura de línea cómoda
    normal: ({children}) => (
      <p className="text-lg text-gray-300 leading-9 mb-8 font-light">
        {children}
      </p>
    ),
    // Citas: Caja destacada oscura
    blockquote: ({children}) => (
      <blockquote className="bg-[#111] border-l-4 border-qualtop-orange p-8 my-12 rounded-r-xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <span className="text-6xl text-qualtop-orange font-serif">"</span>
        </div>
        <p className="text-xl text-white italic m-0 leading-relaxed font-medium relative z-10">
          {children}
        </p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="list-disc pl-6 space-y-4 mb-10 text-gray-300 marker:text-qualtop-orange text-lg leading-8">{children}</ul>,
    number: ({children}) => <ol className="list-decimal pl-6 space-y-4 mb-10 text-gray-300 marker:text-qualtop-orange text-lg leading-8">{children}</ol>,
  },
  // --- NUEVO: Estilos para Enlaces dentro del texto ---
  marks: {
    link: ({children, value}) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel} 
          target="_blank"
          className="text-qualtop-orange hover:text-white underline decoration-qualtop-orange/50 underline-offset-4 hover:decoration-white transition-all inline-flex items-center gap-1 font-medium"
        >
          {children} <ExternalLink size={14} className="opacity-50" />
        </a>
      );
    }
  },
  types: {
    image: ({value}) => {
      if (!value?.asset?._ref) { return null; }
      return (
        <figure className="my-12">
          <div className="border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <img
              src={urlFor(value).width(1200).url()}
              alt={value.alt || 'Imagen del blog'}
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-gray-500 text-sm mt-3 italic border-b border-white/5 pb-2 inline-block px-4 mx-auto">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    }
  }
};

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef(null);
  
  // ESTADOS
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [subStatus, setSubStatus] = useState('idle');

  // --- CARGA DE DATOS ---
  useEffect(() => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
      title,
      mainImage,
      publishedAt,
      body,
      "authorName": author->name,
      "authorImage": author->image, 
      "categories": categories[]->title
    }`;

    setLoading(true);
    client.fetch(query, { slug })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando post:", err);
        setLoading(false);
      });
  }, [slug]);

  // Scroll al inicio al cargar
  useEffect(() => {
    if (!loading && post) window.scrollTo(0, 0);
  }, [loading, post]);

  // --- FUNCIONES DE COMPARTIR ---
  const handleSharePost = async () => {
    const url = window.location.href; 
    const title = post?.title || "Blog Qualtop";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 0 && window.innerWidth < 1024);

    if (isMobile && navigator.share) {
      try { await navigator.share({ title, url }); } catch (error) { console.log('Cancelado'); }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) { console.error('Error', err); }
    }
  };

  const shareToSocial = (platform) => {
    const url = encodeURIComponent(window.location.href); 
    const text = encodeURIComponent(`Lectura recomendada: ${post?.title}`);
    let shareUrl = "";
    if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubStatus('loading');
    setTimeout(() => { setSubStatus('success'); setTimeout(() => setSubStatus('idle'), 3000); }, 1500);
  };

  // --- RENDERIZADO ---
  if (loading) {
    return (
      <div className="bg-[#080808] min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-qualtop-orange" size={40} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-[#080808] min-h-screen flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Artículo no encontrado</h2>
        <button onClick={() => navigate('/blog')} className="text-qualtop-orange hover:underline">Volver al Blog</button>
      </div>
    );
  }

  return (
    <div className="bg-[#080808] text-gray-300 font-sans selection:bg-qualtop-orange selection:text-white min-h-screen">
      
      <Helmet>
        <title>{post.title} | Blog Qualtop</title>
        <meta name="description" content={`Lee sobre ${post.title} en el blog de Qualtop.`} />
        <meta property="og:title" content={post.title} />
        {post.mainImage && <meta property="og:image" content={urlFor(post.mainImage).width(800).url()} />}
      </Helmet>

      {/* --- HERO HEADER --- */}
      <header className="relative pt-32 pb-20 px-6 bg-[#0a0a0a] border-b border-white/5 overflow-hidden">
         {/* Fondo sutil (Glow) */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-qualtop-orange/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
            <div className="lg:col-span-10">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                    <button onClick={() => navigate('/blog')} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest group">
                        <ArrowLeft size={14} className="text-qualtop-orange group-hover:-translate-x-1 transition-transform" />
                        Volver al Blog
                    </button>
                </div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8"
                >
                    {post.title}
                </motion.h1>

                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  className="flex flex-wrap items-center gap-6 text-sm text-gray-400 border-t border-white/5 pt-8"
                >
                    {/* AVATAR */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden bg-white/5">
                            {post.authorImage ? (
                                <img 
                                    src={urlFor(post.authorImage).width(100).height(100).url()} 
                                    alt={post.authorName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center font-bold text-white text-xs bg-gradient-to-br from-gray-800 to-black">QT</div>
                            )}
                        </div>
                        <div>
                            <p className="text-white font-bold leading-none text-base">{post.authorName || "Equipo Qualtop"}</p>
                            <p className="text-xs text-qualtop-orange mt-1 font-medium tracking-wide uppercase">{post.categories ? post.categories[0] : "Tecnología"}</p>
                        </div>
                    </div>
                    
                    {/* FECHA */}
                    <div className="flex items-center gap-2 pl-4 border-l border-white/10">
                        <Calendar size={18} className="text-gray-500"/>
                        <span>{new Date(post.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                </motion.div>
            </div>
         </div>
      </header>

      {/* --- BODY --- */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* COLUMNA IZQUIERDA: CONTENIDO */}
        <motion.main 
          className="lg:col-span-8"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        >
            <div ref={contentRef} className="max-w-none">
                <PortableText 
                    value={post.body} 
                    components={ptComponents} 
                />
            </div>

            {/* CALL TO ACTION */}
            <div className="bg-gradient-to-r from-[#111] to-[#0a0a0a] border border-qualtop-orange/20 p-8 md:p-12 rounded-2xl mt-20 mb-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-qualtop-orange/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-qualtop-orange/20 transition-all duration-700"></div>
                
                <h4 className="text-qualtop-orange font-bold uppercase tracking-[0.2em] text-xs mb-6 flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-qualtop-orange"></span> Siguiente Paso
                </h4>
                
                <p className="text-white font-medium text-xl md:text-2xl m-0 relative z-10 leading-relaxed mb-8">
                    ¿Tu organización enfrenta retos similares? Hablemos sobre cómo implementar estas soluciones hoy.
                </p>
                
                <button onClick={() => navigate('/contact-home')} className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-qualtop-orange hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,77,0,0.4)]">
                   Contactar Consultor <ArrowLeft className="rotate-180" size={16}/>
                </button>
            </div>

            {/* SHARE BAR */}
            <div className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Comparte este artículo
                </span>
                <div className="flex gap-3">
                     <button onClick={() => shareToSocial('linkedin')} className="p-3 bg-white/5 rounded-full hover:bg-[#0077b5] hover:text-white transition-all hover:-translate-y-1"><Linkedin size={18}/></button>
                     <button onClick={() => shareToSocial('twitter')} className="p-3 bg-white/5 rounded-full hover:bg-black hover:text-white transition-all hover:-translate-y-1"><Twitter size={18}/></button>
                     <button onClick={handleSharePost} className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-qualtop-orange text-white rounded-full transition-all hover:-translate-y-1 active:scale-95 text-sm font-medium">
                        <Share2 size={16} /><span>Copiar Link</span>
                    </button>
                </div>
            </div>
        </motion.main>

        {/* SIDEBAR (Sticky) */}
        <aside className="lg:col-span-4 space-y-12">
            <div className="lg:sticky lg:top-32 space-y-8">
              
              {/* Newsletter Box */}
              <div className="bg-[#0f0f0f] p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-qualtop-orange/10 blur-xl rounded-full"></div>
                  
                  <div className="flex items-center gap-3 mb-6 text-qualtop-orange">
                      <Mail size={20} />
                      <span className="font-bold uppercase tracking-widest text-xs">Newsletter</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3">
                      Inteligencia directo a tu inbox.
                  </h3>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                      Análisis de mercado, tendencias Tech y casos de éxito Qualtop. Sin spam.
                  </p>
                  
                  <form className="space-y-3" onSubmit={handleSubscribe}>
                      <input type="email" required placeholder="tu@empresa.com" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-qualtop-orange focus:ring-1 focus:ring-qualtop-orange focus:outline-none transition-all placeholder:text-gray-600" disabled={subStatus === 'loading' || subStatus === 'success'} />
                      <button type="submit" disabled={subStatus !== 'idle'} className={`w-full font-bold uppercase tracking-widest text-xs py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${subStatus === 'success' ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-qualtop-orange hover:text-white'} ${subStatus === 'loading' ? 'opacity-70' : ''}`}>
                          {subStatus === 'idle' && "Suscribirme"}
                          {subStatus === 'loading' && <><Loader2 className="animate-spin" size={16} /></>}
                          {subStatus === 'success' && <><Check size={16} /> Listo</>}
                      </button>
                  </form>
              </div>

            </div>
        </aside>

      </div>

      {/* TOAST NOTIFICACIÓN */}
      <AnimatePresence>
        {copied && (
          <motion.div initial={{ opacity: 0, y: 50, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: 20, x: '-50%' }} className="fixed bottom-10 left-1/2 z-[9999] bg-white text-black px-6 py-3 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-3 border border-gray-200">
            <div className="bg-green-100 text-green-700 p-1 rounded-full"><Check size={14} /></div>
            <span className="font-bold text-sm tracking-wide">Enlace copiado al portapapeles</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}