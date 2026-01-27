import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PortableText } from '@portabletext/react';
import {
  Calendar, ArrowLeft, Share2, Check, Mail, 
  Linkedin, Twitter, Loader2, ExternalLink, Clock
} from 'lucide-react';

// CONEXIÓN CON SANITY
import { client, urlFor } from '../../client'; 

// =================================================================
// 1. ESTILOS DE TIPOGRAFÍA (SOLUCIÓN DEFINITIVA AL TEXTO ENCIMADO)
// =================================================================
const ptComponents = {
  block: {
    // H2: Espaciado masivo para separar secciones
    h2: ({children}) => (
      <h2 className="text-3xl md:text-4xl font-bold text-white mt-20 mb-8 leading-tight tracking-tight relative group">
        <span className="absolute -left-6 top-2 w-1 h-8 bg-qualtop-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"></span>
        {children}
      </h2>
    ),
    // H3: Subtítulos claros
    h3: ({children}) => (
      <h3 className="text-2xl font-semibold text-white mt-12 mb-6 leading-snug">
        {children}
      </h3>
    ),
    // PÁRRAFO: Aquí está la magia. leading-loose (espaciado entre lineas amplio)
    normal: ({children}) => (
      <p className="text-lg md:text-xl text-gray-300 leading-[1.8] mb-8 font-light text-justify md:text-left">
        {children}
      </p>
    ),
    // CITAS
    blockquote: ({children}) => (
      <blockquote className="my-16 relative pl-8 md:pl-12 border-l-2 border-qualtop-orange bg-white/5 p-8 rounded-r-xl font-serif italic text-xl md:text-2xl text-white leading-relaxed">
        "{children}"
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="list-disc pl-6 md:pl-10 space-y-4 mb-12 text-gray-300 text-lg md:text-xl leading-relaxed marker:text-qualtop-orange">{children}</ul>,
    number: ({children}) => <ol className="list-decimal pl-6 md:pl-10 space-y-4 mb-12 text-gray-300 text-lg md:text-xl leading-relaxed marker:text-qualtop-orange">{children}</ol>,
  },
  marks: {
    link: ({children, value}) => (
      <a href={value.href} target="_blank" rel="noreferrer" className="text-qualtop-orange hover:text-white underline decoration-qualtop-orange/40 hover:decoration-white underline-offset-4 transition-all font-medium inline-flex items-center gap-1">
        {children} <ExternalLink size={14} className="opacity-70" />
      </a>
    ),
    strong: ({children}) => <strong className="font-bold text-white">{children}</strong>
  },
  types: {
    image: ({value}) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-16 -mx-6 md:-mx-0">
          <img
            src={urlFor(value).width(1200).url()}
            alt={value.alt || 'Imagen del artículo'}
            className="w-full h-auto md:rounded-2xl shadow-2xl border border-white/5"
          />
          {value.caption && (
            <figcaption className="text-center text-gray-500 text-sm mt-4 font-mono">
              — {value.caption}
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
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
  // Barra de progreso
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Cálculo de tiempo de lectura
  const calculateReadingTime = (blocks) => {
    if(!blocks) return 5;
    const text = blocks.map(block => block.children?.map(child => child.text).join('')).join(' ');
    const words = text.split(' ').length;
    return Math.ceil(words / 200); 
  };

  useEffect(() => {
    // QUERY ACTUALIZADA: Incluye 'subtitle' por si lo agregas a Sanity
    const query = `*[_type == "post" && slug.current == $slug][0]{
      title,
      subtitle, 
      mainImage,
      publishedAt,
      excerpt,
      body,
      "authorName": author->name,
      "authorImage": author->image, 
      "categories": categories[]->title
    }`;

    setLoading(true);
    client.fetch(query, { slug }).then((data) => {
        setPost(data);
        setLoading(false);
      }).catch((err) => { console.error(err); setLoading(false); });
  }, [slug]);

  useEffect(() => { if (!loading && post) window.scrollTo(0, 0); }, [loading, post]);

  // COPIAR LINK
  const handleCopyLink = async () => {
    const url = window.location.href; 
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch (err) {}
  };

  // COMPARTIR REDES SOCIALES (Popup Pro)
  const shareToSocial = (platform) => {
    const url = encodeURIComponent(window.location.href); 
    let shareUrl = "";

    if (platform === 'linkedin') {
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } 
    
    if (platform === 'twitter') {
        const text = encodeURIComponent(`🚀 Lectura recomendada: ${post?.title} vía @Qualtop`);
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    }

    const width = 600;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    window.open(
        shareUrl, 
        'Compartir', 
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );
  };

  if (loading) return <div className="bg-[#050505] min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-qualtop-orange" size={40} /></div>;
  if (!post) return null;

  const readingTime = calculateReadingTime(post.body);

  return (
    <div className="bg-[#050505] text-gray-200 font-sans min-h-screen selection:bg-qualtop-orange selection:text-white">
      <Helmet>
        <title>{post.title} | Qualtop Blog</title>
        <meta name="description" content={post.excerpt || "Lee este artículo en el blog de Qualtop."} />

        {/* --- OPEN GRAPH (LINKEDIN / FACEBOOK) --- */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.subtitle} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="Qualtop" />
        
        {/* IMAGEN 1200x630 (Perfecta para LinkedIn) */}
        {post.mainImage && (
            <meta 
            property="og:image" 
            content={urlFor(post.mainImage).width(1200).height(630).fit('crop').url()} 
            />
        )}
        
        {/* --- TWITTER CARDS --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.mainImage && (
            <meta 
            name="twitter:image" 
            content={urlFor(post.mainImage).width(1200).height(630).fit('crop').url()} 
            />
        )}
      </Helmet>

      {/* --- BARRA DE PROGRESO DE LECTURA --- */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-qualtop-orange origin-left z-[100]" />

      {/* --- HERO HEADER --- */}
      <header className="relative pt-40 pb-20 px-6 md:px-12 border-b border-white/5 bg-[#050505] overflow-hidden">
         <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-white/5 rounded-full blur-[150px] opacity-20 pointer-events-none translate-x-1/2 -translate-y-1/2" />

         <div className="max-w-5xl mx-auto relative z-10">
            <button onClick={() => navigate('/blog')} className="group flex items-center gap-3 text-sm font-bold tracking-widest text-gray-500 hover:text-white mb-10 transition-colors uppercase">
                <div className="p-2 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                   <ArrowLeft size={16} />
                </div>
                Volver
            </button>

            <div className="flex items-center gap-4 mb-8">
                <span className="px-3 py-1 rounded-md bg-white/10 text-white text-xs font-bold uppercase tracking-widest border border-white/10">
                    {post.categories ? post.categories[0] : "Tech"}
                </span>
                <span className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
                    <Clock size={14} /> {readingTime} min lectura
                </span>
            </div>

            {/* TÍTULO AJUSTADO: Más controlado y estético */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-[1.1] mb-6 max-w-4xl">
                {post.title}
            </h1>

            {/* SUBTÍTULO (Si existe en Sanity) */}
            {post.subtitle && (
                <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mb-10">
                    {post.subtitle}
                </p>
            )}

            {/* AUTOR */}
            <div className="flex items-center gap-4 border-t border-white/10 pt-8 mt-8">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10">
                    {post.authorImage ? <img src={urlFor(post.authorImage).width(100).url()} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-gray-800"/>}
                </div>
                <div>
                    <p className="text-white font-bold text-base">{post.authorName || "Equipo Qualtop"}</p>
                    <p className="text-gray-500 text-sm">{new Date(post.publishedAt).toLocaleDateString('es-ES', { dateStyle: 'long' })}</p>
                </div>
            </div>
         </div>
      </header>

      {/* --- BODY --- */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* CONTENIDO */}
        <article className="lg:col-span-8 lg:col-start-1 max-w-none">
            <div className="prose prose-xl prose-invert max-w-none">
                <PortableText value={post.body} components={ptComponents} />
            </div>

            {/* CTA INTERNO */}
            <div className="my-20 p-10 bg-[#111] rounded-2xl border border-white/10 relative overflow-hidden group text-center md:text-left">
                <div className="absolute top-0 right-0 w-64 h-64 bg-qualtop-orange/10 blur-[80px] group-hover:bg-qualtop-orange/20 transition-all duration-700" />
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">¿Te interesa este tema?</h3>
                <p className="text-gray-400 mb-8 relative z-10 text-lg">Descubre cómo Qualtop puede impulsar la transformación digital de tu negocio.</p>
                <button onClick={() => navigate('/contact-home')} className="relative z-10 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-qualtop-orange hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    Agendar Consultoría
                </button>
            </div>
        </article>

        {/* SIDEBAR STICKY */}
        <aside className="lg:col-span-3 lg:col-start-10 hidden lg:block h-full">
            <div className="sticky top-32 space-y-12">
                <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Compartir</p>
                    <div className="flex flex-col gap-3">
                        <button onClick={handleCopyLink} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                            <div className="p-2 rounded-full bg-white/5 group-hover:bg-white group-hover:text-black transition-all"><Share2 size={18}/></div>
                            <span className="text-sm font-medium">Copiar Enlace</span>
                        </button>
                        <button onClick={() => shareToSocial('linkedin')} className="flex items-center gap-3 text-gray-400 hover:text-[#0077b5] transition-colors group">
                            <div className="p-2 rounded-full bg-white/5 group-hover:bg-[#0077b5] group-hover:text-white transition-all"><Linkedin size={18}/></div>
                            <span className="text-sm font-medium">LinkedIn</span>
                        </button>
                        <button onClick={() => shareToSocial('twitter')} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                            <div className="p-2 rounded-full bg-white/5 group-hover:bg-black group-hover:text-white transition-all"><Twitter size={18}/></div>
                            <span className="text-sm font-medium">X (Twitter)</span>
                        </button>
                    </div>
                </div>
            </div>
        </aside>

      </div>

      {/* TOAST */}
      <AnimatePresence>
        {copied && (
          <motion.div initial={{y:50, opacity:0}} animate={{y:0, opacity:1}} exit={{y:50, opacity:0}} className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full font-bold shadow-2xl z-50 flex items-center gap-2">
             <Check size={18} className="text-green-600"/> Link copiado
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}