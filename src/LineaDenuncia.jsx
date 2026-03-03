import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Plus, Trash2, UploadCloud, Info, ChevronDown, Check } from 'lucide-react';

// ==========================================
// COMPONENTE: SELECT PRO
// ==========================================
const SelectPro = ({ label, options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // Aseguramos que el select abierto tenga la máxima prioridad local
    <div className={`relative w-full ${isOpen ? 'z-[999]' : 'z-10'}`} ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-black/30 backdrop-blur-md border ${isOpen ? 'border-qualtop-orange' : 'border-white/10'} hover:border-white/30 rounded-xl py-3 px-4 text-white cursor-pointer flex justify-between items-center transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)]`}
      >
        <span className={value ? "text-white" : "text-gray-500"}>
          {value ? options.find(o => o.value === value)?.label : placeholder}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className={isOpen ? "text-qualtop-orange" : "text-gray-500"} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-2 bg-[#1a1a1a] border border-white/20 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden z-[999]"
          >
            {options.map((option) => (
              <div 
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer flex items-center justify-between transition-colors ${
                  value === option.value ? 'bg-qualtop-orange/10 text-qualtop-orange' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {option.label}
                {value === option.value && <Check size={16} />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function LineaDenuncia() {
  const [implicados, setImplicados] = useState([{ id: 1, nombre: '', puesto: '', tipo: '' }]);
  
  const [formData, setFormData] = useState({
    relacion: '',
    accion: '',
    anonimato: '',
    tipoDenuncia: '',
    enterado: ''
  });

  const handleSelectChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const agregarImplicado = () => setImplicados([...implicados, { id: Date.now(), nombre: '', puesto: '', tipo: '' }]);
  const eliminarImplicado = (id) => setImplicados(implicados.filter(imp => imp.id !== id));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado", formData);
  };

  const inputBaseClass = "w-full bg-black/30 backdrop-blur-md border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-qualtop-orange focus:bg-black/50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)]";
  const labelClass = "block text-sm font-medium text-gray-300 mb-2";
  const glassPanelClass = "bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative";

  return (
    <section className="relative pt-40 pb-32 bg-[#050505] min-h-screen font-sans text-white overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-qualtop-orange rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-white rounded-full blur-[150px] opacity-5" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <div className="mb-16 text-center md:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
            <div className="p-4 bg-gradient-to-br from-white/10 to-transparent rounded-2xl border border-white/20 shadow-lg backdrop-blur-md shrink-0">
              <ShieldAlert className="text-qualtop-orange" size={40} />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Portal de <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Denuncia.</span></h1>
              <p className="text-xl text-qualtop-orange font-medium mb-2">Confidencialidad absoluta y manejo ético.</p>
            </div>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-400 leading-relaxed text-lg max-w-3xl">
            Cuanta más información proporciones, más efectiva será nuestra investigación. Garantizamos el manejo responsable de la información que nos brindes mediante encriptación de extremo a extremo.
          </motion.p>
        </div>

        <motion.form initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} onSubmit={handleSubmit} className="space-y-10">
          
          {/* BLOQUE 1: Datos Generales */}
          <div className={glassPanelClass}>
            {/* ESCALERA Z-INDEX 1: Prioridad Máxima z-[50] */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-[50]">
              <SelectPro 
                label="Relación con la empresa*" 
                placeholder="Selecciona..."
                value={formData.relacion}
                onChange={(val) => handleSelectChange('relacion', val)}
                options={[
                  { value: 'empleado', label: 'Empleado' },
                  { value: 'proveedor', label: 'Proveedor' },
                  { value: 'cliente', label: 'Cliente' },
                  { value: 'otro', label: 'Otro' }
                ]}
              />
              <SelectPro 
                label="¿Qué deseas realizar?*" 
                placeholder="Selecciona..."
                value={formData.accion}
                onChange={(val) => handleSelectChange('accion', val)}
                options={[
                  { value: 'denuncia', label: 'Denuncia' },
                  { value: 'duda', label: 'Duda o Consulta' }
                ]}
              />
              <SelectPro 
                label="¿Cómo desea enviar su reporte?*" 
                placeholder="Selecciona..."
                value={formData.anonimato}
                onChange={(val) => handleSelectChange('anonimato', val)}
                options={[
                  { value: 'anonimo', label: 'Totalmente Anónimo' },
                  { value: 'confidencial', label: 'Confidencial (Dejando mis datos)' }
                ]}
              />
            </div>

            {/* ESCALERA Z-INDEX 2: Prioridad Media z-[40] */}
            <div className="pt-6 relative z-[40]">
              <SelectPro 
                label="Tipo de Denuncia*" 
                placeholder="Selecciona la categoría principal..."
                value={formData.tipoDenuncia}
                onChange={(val) => handleSelectChange('tipoDenuncia', val)}
                options={[
                  { value: 'acoso', label: 'Acoso' },
                  { value: 'antisoborno', label: 'Antisoborno / Corrupción' },
                  { value: 'incidentes', label: 'Incidentes Laborales / Salud Laboral' },
                  { value: 'procesos', label: 'Procesos Corporativos / Fraude' }
                ]}
              />
            </div>

            <div className="mt-8 bg-black/20 border border-white/5 p-5 rounded-2xl flex items-start gap-4 backdrop-blur-sm relative z-10">
              <div className="p-2 bg-qualtop-orange/10 rounded-full shrink-0">
                <Info className="text-qualtop-orange" size={20} />
              </div>
              <div className="text-sm text-gray-400 space-y-2">
                <p className="font-medium text-gray-300">Enrutamiento automático de seguridad:</p>
                <p>Las denuncias de <strong>Acoso</strong> son estrictamente confidenciales. <strong>Antisoborno</strong> se escala a Dirección General. <strong>Incidentes</strong> a THDO y <strong>Procesos</strong> a Finanzas. Todas incluyen copia cifrada a Auditoría.</p>
              </div>
            </div>
          </div>

          {/* BLOQUE 2: Detalles del Incidente */}
          <div className={glassPanelClass}>
            <div className="space-y-6 relative z-10">
              <div>
                <label className={labelClass}>Asunto*</label>
                <input type="text" required placeholder="Ej: Irregularidad en contrato de proveedor X" className={inputBaseClass} />
              </div>
              <div>
                <label className={labelClass}>Descripción detallada*</label>
                <textarea 
                  required 
                  rows="6" 
                  placeholder="Describa los hechos, ubicaciones, fechas y cualquier detalle relevante para la investigación..." 
                  className={`${inputBaseClass} resize-y leading-relaxed`}
                ></textarea>
                <div className="flex justify-end mt-2">
                  <span className="text-xs text-gray-500 font-mono">0 / 3000 caracteres</span>
                </div>
              </div>
            </div>
          </div>

          {/* BLOQUE 3: Implicados DINÁMICO */}
          <div className="space-y-4 relative z-[30]"> 
            <div className="flex items-center justify-between bg-white/[0.02] border border-white/10 p-5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <ShieldAlert className="text-qualtop-orange" size={20}/>
                Personas Implicadas
              </h3>
              <button 
                type="button" 
                onClick={agregarImplicado}
                className="flex items-center gap-2 text-sm bg-white/10 hover:bg-qualtop-orange text-white px-4 py-2.5 rounded-xl transition-all font-medium border border-white/10 hover:border-qualtop-orange"
              >
                <Plus size={16} /> <span className="hidden md:inline">Agregar Implicado</span>
              </button>
            </div>

            <AnimatePresence>
              {implicados.map((imp, index) => (
                <motion.div 
                  key={imp.id}
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  className="bg-black/40 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 relative shadow-xl mb-4"
                  // Escalera Z-Index Dinámica para los implicados
                  style={{ zIndex: 30 - index }} 
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={labelClass}>Nombre completo*</label>
                      <input type="text" required placeholder="Nombre del implicado" className={inputBaseClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Puesto / Cargo*</label>
                      <input type="text" required placeholder="Ej: Gerente de Ventas" className={inputBaseClass} />
                    </div>
                    <div>
                      <SelectPro 
                        label="Rol en el incidente*" 
                        placeholder="Selecciona..."
                        value={imp.tipo}
                        onChange={(val) => {
                          const nuevosImplicados = [...implicados];
                          nuevosImplicados[index].tipo = val;
                          setImplicados(nuevosImplicados);
                        }}
                        options={[
                          { value: 'denunciado', label: 'Denunciado / Involucrado' },
                          { value: 'testigo', label: 'Testigo presencial' }
                        ]}
                      />
                    </div>
                  </div>
                  
                  {implicados.length > 1 && (
                    <div className="mt-6 flex justify-end pt-4 border-t border-white/5">
                      <button 
                        type="button" 
                        onClick={() => eliminarImplicado(imp.id)}
                        className="text-gray-400 hover:text-red-400 flex items-center gap-2 text-sm font-medium transition-colors hover:bg-red-400/10 px-4 py-2 rounded-xl"
                      >
                        <Trash2 size={16} /> Remover persona
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* BLOQUE 4: Evidencia */}
          <div className={glassPanelClass}>
            <div className="relative z-10">
              <label className={labelClass}>Evidencia digital (Opcional pero recomendado)</label>
              <div className="relative mt-2">
                <input type="file" id="evidencia" className="hidden" multiple />
                <label 
                  htmlFor="evidencia" 
                  className="w-full flex flex-col items-center justify-center gap-4 bg-black/30 border-2 border-dashed border-white/20 hover:border-qualtop-orange rounded-2xl py-12 cursor-pointer transition-all group backdrop-blur-sm"
                >
                  <div className="p-4 bg-white/5 rounded-full group-hover:scale-110 group-hover:bg-qualtop-orange/20 transition-all duration-300">
                    <UploadCloud className="text-gray-400 group-hover:text-qualtop-orange" size={32} />
                  </div>
                  <div className="text-center">
                    <span className="text-gray-300 font-medium block mb-1 group-hover:text-white transition-colors">
                      Haz clic para subir o arrastra tus archivos aquí
                    </span>
                    <span className="text-xs text-gray-500">
                      Formatos seguros aceptados: PDF, JPG, PNG, MP4, MP3 (Máx 50MB)
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* CHECKBOX Y SUBMIT */}
          <div className="pt-8 relative z-10">
            <label className="flex items-start gap-4 cursor-pointer group mb-10 bg-white/[0.02] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors backdrop-blur-sm">
              <input type="checkbox" required className="mt-1 accent-qualtop-orange w-5 h-5 shrink-0" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                Al hacer click en enviar, consiento el uso estrictamente confidencial de la información proporcionada para fines de investigación interna, conforme a las regulaciones de protección de datos vigentes y la <a href="#" className="text-qualtop-orange hover:text-white underline transition-colors">Política de Privacidad</a> de Qualtop.
              </span>
            </label>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-qualtop-orange to-orange-600 text-white font-bold text-lg md:text-xl py-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(255,77,0,0.3)] hover:shadow-[0_0_50px_rgba(255,77,0,0.5)] hover:scale-[1.01] active:scale-[0.99]"
            >
              Emitir Reporte Confidencial
            </button>
          </div>

        </motion.form>
      </div>
    </section>
  );
}