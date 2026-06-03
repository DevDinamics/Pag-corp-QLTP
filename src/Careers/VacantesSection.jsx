import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Briefcase, ChevronRight, Send, Search, Sparkles, X, ExternalLink } from 'lucide-react';

// IMPORTA TU CLIENTE DE SANITY AQUÍ (Ajusta la ruta si es necesario)
import { client } from '../client'; 

const areas = ["Todas", "Engineering", "Innovation", "Data", "Quality Assurance", "Design"];

// ── MODAL DE POSTULACIÓN ──
const ApplyModal = ({ job, onClose }) => {
  const [step, setStep] = useState(1); // 1: confirm, 2: success
  if (!job) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-lg bg-[#0f0f0f] border border-white/10 rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-qualtop-orange to-transparent" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-qualtop-orange/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative p-7 sm:p-9">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X size={16} className="text-gray-400" />
            </button>

            {step === 1 && (
              <>
                <div className="mb-7">
                  <span className="text-[10px] text-qualtop-orange font-bold tracking-[0.3em] uppercase block mb-3">
                    Postulación
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight pr-8">
                    {job.puesto}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 flex items-center gap-2">
                    <MapPin size={13} /> {job.ubicacion}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-7">
                  {job.requisitos && job.requisitos.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/[0.04] border border-white/5 rounded-xl p-3 text-xs text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-qualtop-orange shrink-0" />
                      {req}
                    </div>
                  ))}
                </div>

                <p className="text-gray-400 text-sm mb-7 leading-relaxed">
                  Al continuar serás redirigido para enviarnos tu información. Nuestro equipo de Reclutamiento se pondrá en contacto contigo a la brevedad.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium transition-all"
                  >
                    Cancelar
                  </button>
                  {/* Cuando tengamos el formulario de PHP listo, aquí cambiaremos la acción */}
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-3.5 rounded-2xl bg-qualtop-orange hover:bg-orange-600 text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-[0_8px_24px_rgba(255,77,0,0.35)] active:scale-95 group"
                  >
                    Continuar
                    <ExternalLink size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-qualtop-orange/10 border border-qualtop-orange/30 flex items-center justify-center mx-auto mb-6"
                >
                  <motion.svg
                    width="36" height="36" viewBox="0 0 36 36"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <motion.path
                      d="M8 18 L15 25 L28 11"
                      fill="none" stroke="#ff4d00" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3">¡Gracias por tu interés!</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto mb-8">
                  Tu solicitud para <span className="text-white font-medium">{job.puesto}</span> fue enviada. Nuestro equipo te contactará pronto.
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-2xl bg-white/8 hover:bg-white/12 border border-white/10 text-white text-sm font-medium transition-all"
                >
                  Cerrar
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ── DETALLE MOBILE DRAWER ──

const MobileDrawer = ({ job, onClose, onApply }) => {
  
  // 1. LA MAGIA PARA BLOQUEAR EL FONDO
// 1. LA MAGIA PARA BLOQUEAR EL FONDO (A PRUEBA DE iPHONE)
  useEffect(() => {
    if (job) {
      // Bloqueamos el body y el html (vital para iOS)
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [job]);

  // Función para cerrar el modal si el usuario desliza hacia abajo
  const handleDragEnd = (event, info) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {job && (
        <div className="fixed inset-0 z-[900] flex items-end lg:hidden">
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-[10px] touch-none overscroll-none"
  onClick={onClose}
          />

          <motion.div
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.08}
            onDragEnd={handleDragEnd}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 260, mass: 0.8 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full bg-[#121212]/95 backdrop-blur-3xl border-t border-white/10 rounded-t-[32px] p-6 pb-10 max-h-[90vh] overflow-y-auto shadow-[0_-15px_50px_rgba(0,0,0,0.6)] overscroll-contain touch-pan-y"
>
            <div className="w-12 h-1.5 rounded-full bg-white/25 mx-auto mb-7 cursor-grab active:cursor-grabbing" />

            <button onClick={onClose} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-colors">
              <X size={16} className="text-gray-300" />
            </button>

            <div className="flex flex-wrap gap-2 mb-5 mt-1">
              <span className="bg-qualtop-orange text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">{job.tipo}</span>
              <span className="bg-white/10 text-gray-300 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">ID: #{job._id?.slice(-4).toUpperCase()}</span>
              {job.isNew && (
                <span className="flex items-center gap-1 bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  <Sparkles size={10} /> Nuevo
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 leading-tight">{job.puesto}</h2>
            <p className="text-gray-500 text-sm flex items-center gap-1.5 mb-6"><MapPin size={13} /> {job.ubicacion}</p>

            <div className="grid grid-cols-2 gap-4 mb-8 border-y border-white/5 py-6">
              <div><p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Ubicación</p><p className="text-gray-200 font-medium text-sm">{job.ubicacion}</p></div>
              <div><p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Salario</p><p className="text-gray-200 font-medium text-sm">{job.salario}</p></div>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-qualtop-orange" /> Descripción del rol
                </h4>
                <p className="text-gray-400 leading-relaxed font-light text-sm">{job.desc}</p>
              </div>
              {job.requisitos && job.requisitos.length > 0 && (
                <div>
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-qualtop-orange" /> Lo que te ayudará a tener éxito:
                  </h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {job.requisitos.map((req, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-400 bg-white/5 p-3 rounded-xl border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-qualtop-orange shrink-0" />{req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <ApplyButton job={job} onApply={onApply} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ── BOTÓN POSTULARME ──
const ApplyButton = ({ job, onApply }) => (
  <motion.button
    onClick={() => onApply(job)}
    whileTap={{ scale: 0.97 }}
    className="w-full mt-2 relative overflow-hidden bg-qualtop-orange text-white font-bold py-4 sm:py-5 rounded-2xl flex items-center justify-center gap-3 group shadow-[0_10px_30px_rgba(255,77,0,0.3)] hover:shadow-[0_14px_40px_rgba(255,77,0,0.45)] transition-shadow"
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
      initial={{ x: "-100%" }}
      whileHover={{ x: "200%" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    />
    <div className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <span className="relative z-10 text-sm sm:text-base">Postularme a esta vacante</span>
    <motion.div
      className="relative z-10"
      animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <Send size={17} />
    </motion.div>
  </motion.button>
);

// ── COMPONENTE PRINCIPAL ──
export default function VacantesSection() {
  const [vacantes, setVacantes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState('');
  const [activeArea, setActiveArea] = useState('Todas');
  const [applyJob, setApplyJob] = useState(null);
  const [drawerJob, setDrawerJob] = useState(null);

  useEffect(() => {
    const query = '*[_type == "vacante" && isActive == true] | order(_createdAt desc)';
    
    client.fetch(query)
      .then((data) => {
        setVacantes(data);
        if (data.length > 0) {
          setSelectedJob(data[0]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al traer las vacantes:", error);
        setIsLoading(false);
      });
  }, []);

  const filtered = vacantes.filter(job => {
    const matchesArea = activeArea === 'Todas' || job.area === activeArea;
    const matchesSearch =
      job.puesto?.toLowerCase().includes(search.toLowerCase()) ||
      (job.requisitos && job.requisitos.some(r => r.toLowerCase().includes(search.toLowerCase())));
    return matchesArea && matchesSearch;
  });

  const handleCardClick = (job) => {
    setSelectedJob(job);
    if (window.innerWidth < 1024) setDrawerJob(job);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/10 border-t-qualtop-orange rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-7xl mx-auto">
        {/* ── HEADER ── */}
        <div className="mb-10 md:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] text-qualtop-orange font-bold tracking-[0.35em] uppercase block mb-3"
          >
            Oportunidades Abiertas
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-bold text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Encuentra tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-qualtop-orange to-orange-400">próximo reto.</span>
          </motion.h2>
        </div>

        {/* ── FILTROS ── */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-12">
          <div className="relative w-full sm:w-80 md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-qualtop-orange transition-colors" size={17} />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por puesto o tecnología..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-11 pr-5 outline-none focus:border-qualtop-orange focus:bg-white/8 transition-all text-sm text-white placeholder:text-gray-600"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 flex-nowrap">
            {areas.map(cat => (
              <button key={cat} onClick={() => setActiveArea(cat)}
                className={`px-4 sm:px-5 py-2.5 rounded-full border transition-all text-xs font-semibold whitespace-nowrap shrink-0 ${
                  activeArea === cat
                    ? 'bg-qualtop-orange border-qualtop-orange text-white shadow-[0_4px_16px_rgba(255,77,0,0.3)]'
                    : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/25 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── MASTER-DETAIL ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          {/* Lista */}
          <div className="lg:col-span-5 space-y-3 lg:max-h-[820px] lg:overflow-y-auto lg:pr-2">
            {filtered.length === 0 && (
              <p className="text-gray-600 text-sm py-10 text-center">No se encontraron vacantes activas en esta área.</p>
            )}
            {filtered.map((job) => (
              <motion.div
                key={job._id}
                onClick={() => handleCardClick(job)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.99 }}
                className={`p-5 sm:p-6 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                  selectedJob?._id === job._id
                    ? 'bg-qualtop-orange/10 border-qualtop-orange shadow-[0_0_24px_rgba(255,77,0,0.12)]'
                    : 'bg-white/[0.02] border-white/8 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div
  className={`absolute left-0 top-4 bottom-4 w-[3px] bg-qualtop-orange rounded-full transition-all duration-300 origin-center ${
    selectedJob?._id === job._id ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
  }`}
/>

                <div className="flex justify-between items-start mb-2 pl-2">
                  <div className="flex flex-col items-start gap-1.5 flex-1 min-w-0 pr-3">
                    {job.isNew && (
                      <span className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase">
                        <Sparkles size={9} /> Nuevo
                      </span>
                    )}
                    <h3 className={`font-bold text-base sm:text-lg leading-snug ${selectedJob?._id === job._id ? 'text-white' : 'text-gray-200'}`}>
                      {job.puesto}
                    </h3>
                  </div>
                  <ChevronRight size={17} className={`shrink-0 mt-1 transition-all duration-300 ${selectedJob?._id === job._id ? 'translate-x-1 text-qualtop-orange' : 'text-gray-600'}`} />
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 pl-2">
                  <span className="flex items-center gap-1.5"><Briefcase size={12} className="text-qualtop-orange" />{job.area}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={12} />{job.ubicacion}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detalle desktop */}
          <div className="hidden lg:block lg:col-span-7 sticky top-28">
            <AnimatePresence mode="wait">
              {selectedJob && (
                <motion.div
                  key={selectedJob._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 xl:p-12 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.025] pointer-events-none select-none">
                    <Briefcase size={180} />
                  </div>
                  <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-qualtop-orange/5 blur-[80px] rounded-full pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      <span className="bg-qualtop-orange text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">{selectedJob.tipo}</span>
                      <span className="bg-white/8 text-gray-400 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">ID: #{selectedJob._id.slice(-4).toUpperCase()}</span>
                      {selectedJob.isNew && (
                        <span className="flex items-center gap-1 bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase ml-auto">
                          <Sparkles size={11} /> Vacante Reciente
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl xl:text-4xl font-bold mb-6 text-white leading-tight">{selectedJob.puesto}</h2>

                    <div className="grid grid-cols-2 gap-6 mb-8 border-y border-white/5 py-6">
                      <div><p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1.5">Ubicación</p><p className="text-gray-200 font-medium text-sm">{selectedJob.ubicacion}</p></div>
                      <div><p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1.5">Salario esperado</p><p className="text-gray-200 font-medium text-sm">{selectedJob.salario}</p></div>
                    </div>

                    <div className="space-y-7">
                      <div>
                        <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-qualtop-orange" /> Descripción del rol
                        </h4>
                        <p className="text-gray-400 leading-relaxed font-light text-sm xl:text-base">{selectedJob.desc}</p>
                      </div>
                      
                      {selectedJob.requisitos && selectedJob.requisitos.length > 0 && (
                        <div>
                          <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-qualtop-orange" /> Lo que te ayudará a tener éxito:
                          </h4>
                          <ul className="grid grid-cols-1 xl:grid-cols-2 gap-2.5">
                            {selectedJob.requisitos.map((req, i) => (
                              <li key={i} className="flex items-center gap-3 text-sm text-gray-400 bg-white/[0.04] p-3 rounded-xl border border-white/5">
                                <div className="w-1.5 h-1.5 rounded-full bg-qualtop-orange shrink-0" />{req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="mt-10">
                      <ApplyButton job={selectedJob} onApply={setApplyJob} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <MobileDrawer job={drawerJob} onClose={() => setDrawerJob(null)} onApply={setApplyJob} />
      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
    </>
  );
}