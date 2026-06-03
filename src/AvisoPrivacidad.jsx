import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AvisoPrivacidad() {
  const pClass = "text-gray-400 leading-relaxed mb-6 text-lg";
  const h2Class = "text-2xl md:text-3xl font-bold text-white mt-16 mb-8 flex items-center gap-3 border-b border-white/10 pb-4";
  const ulClass = "list-none space-y-3 mb-8 pl-0";
  const liClass = "flex items-start gap-3 text-gray-400 text-lg";

  return (
    <section className="relative pt-40 pb-32 bg-[#050505] min-h-screen font-sans text-white">
      
      {/* Fondo */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white/[0.03] to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="mb-16 text-center md:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <span className="text-qualtop-orange font-bold tracking-[0.3em] text-xs uppercase px-4 py-2 bg-qualtop-orange/10 rounded-full border border-qualtop-orange/20">
              Documento Legal
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Aviso de Privacidad
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }}
            className="text-gray-500 font-mono text-sm tracking-widest uppercase"
          >
            Última actualización: 10 de abril de 2025
          </motion.p>
        </div>

        {/* --- CONTENIDO --- */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3 }}
          className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm"
        >
          <p className={pClass}>
            <strong className="text-white">QLTP Partners S.A. de C.V.</strong>, integrante de Grupo Qualtop ® con domicilio en México, y portal de Internet <a href="https://www.qualtop.com" className="text-qualtop-orange hover:underline">www.qualtop.com</a>, es el responsable del uso y protección de sus datos personales, y al respecto le informamos lo siguiente:
          </p>

          <h2 className={h2Class}><FileText className="text-qualtop-orange" /> ¿Qué son los datos personales?</h2>
          <p className={pClass}>
            Los datos personales son toda aquella información que se relaciona con nuestra persona y que nos identifica o nos hace identificables. Nos dan identidad, nos describen y precisan:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><CheckCircle2 size={18} className="text-qualtop-orange"/> Datos Generales</h3>
              <ul className={ulClass}>
                {['Nuestra edad', 'Domicilio', 'Número telefónico', 'Correo electrónico personal', 'Trayectoria académica, laboral o profesional', 'Patrimonio', 'Número de seguridad social', 'CURP, entre otros.'].map((item, i) => (
                  <li key={i} className={liClass}><div className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0"/> {item}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-qualtop-orange/5 p-6 rounded-2xl border border-qualtop-orange/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><AlertCircle size={18} className="text-qualtop-orange"/> Datos Sensibles</h3>
              <p className="text-sm text-gray-400 mb-4">Describen aspectos más sensibles o delicados, como:</p>
              <ul className={ulClass}>
                {['Nuestra forma de pensar', 'Estado de salud', 'Origen étnico y racial', 'Características físicas (ADN, huella digital)', 'Ideología y opiniones políticas', 'Creencias o convicciones religiosas o filosóficas', 'Preferencias sexuales, entre otros.'].map((item, i) => (
                  <li key={i} className={liClass}><div className="w-1.5 h-1.5 rounded-full bg-qualtop-orange mt-2 shrink-0"/> {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className={pClass}>
            El concepto de datos personales abarca la información en cualquier modo, sea alfabética, numérica, gráfica, fotográfica o sonora, y puede estar contenida en cualquier soporte (papel, memoria informática, cinta de video, DVD). Los datos personales siempre son suyos, pero en ocasiones es necesario proporcionarlos a terceros para trámites, productos o servicios.
          </p>

          <h2 className={h2Class}><ShieldCheck className="text-qualtop-orange" /> ¿Qué datos personales recabaremos?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
            {['Nombre', 'Registro Federal de Contribuyentes (RFC)', 'Clave única de Registro de Población (CURP)', 'Domicilio', 'Teléfono particular', 'Teléfono celular', 'Correo electrónico', 'Datos de identificación', 'Datos de contacto', 'Campañas de publicidad'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300 bg-black/20 px-4 py-2 rounded-lg border border-white/5">
                <CheckCircle2 size={16} className="text-gray-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <h2 className={h2Class}>¿Para qué fines utilizaremos los datos personales?</h2>
          <p className={pClass}>
            Los datos que recabamos podrán ser utilizados para la realización de contrato y/o convenio que respalden nuestra relación contractual, así como en las siguientes <strong>finalidades secundarias</strong> que no son necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención:
          </p>
          
          <ul className="space-y-3 mb-8 bg-[#111] p-6 rounded-2xl border border-white/5">
            {[
              'Proveer servicios y productos solicitados.',
              'Cumplimiento a las obligaciones contraídas.',
              'Notificación de nuevos servicios o productos o cambios de estos.',
              'Actualización de base de datos de clientes.',
              'Evaluación de nuestra calidad de servicios.',
              'Mercadotecnia y/o publicitaria y/o campañas de publicidad.',
              'Prospección comercial.'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300">
                <div className="w-2 h-2 rounded-sm bg-qualtop-orange mt-2 shrink-0"/> {item}
              </li>
            ))}
          </ul>

          <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl mb-8">
            <p className="text-gray-300 mb-4">
              En caso de que no desee que sus datos personales se utilicen para estos fines secundarios, envíenos un correo electrónico a <a href="mailto:privacidad@qualtop.com" className="text-qualtop-orange hover:underline font-medium">privacidad@qualtop.com</a> especificando su negativa. La negativa para el uso de sus datos personales en los fines secundarios no será motivo para negar los servicios o productos que solicita.
            </p>
          </div>

          <h2 className={h2Class}>Derechos ARCO y Revocación</h2>
          <p className={pClass}>
            Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (<strong className="text-white">Acceso</strong>). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (<strong className="text-white">Rectificación</strong>); que la eliminemos de nuestros registros o bases de datos (<strong className="text-white">Cancelación</strong>); así como oponerse al uso de sus datos personales para fines específicos (<strong className="text-white">Oposición</strong>).
          </p>
          
          <div className="bg-qualtop-orange/10 border-l-4 border-qualtop-orange p-6 rounded-r-xl mb-8">
            <p className="text-white font-medium mb-2">Para el ejercicio de derechos ARCO, revocación de consentimiento o limitación de divulgación:</p>
            <p className="text-gray-300">Deberá presentar la solicitud respectiva a través del correo electrónico: <a href="mailto:privacidad@qualtop.com" className="text-qualtop-orange font-bold hover:underline flex items-center gap-2 mt-2"><Mail size={18}/> privacidad@qualtop.com</a></p>
          </div>
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            Es importante que tenga en cuenta que no en todos los casos podremos atender su solicitud o concluir el uso de forma inmediata, ya que es posible que por alguna obligación legal requiramos seguir tratando sus datos personales. Para ciertos fines, la revocación de su consentimiento implicará que no le podamos seguir prestando el servicio.
          </p>

          <h2 className={h2Class}>Cambios y Retención de Datos</h2>
          <p className={pClass}>
            El presente aviso de privacidad puede sufrir modificaciones derivadas de requerimientos legales, necesidades por los productos o servicios, prácticas de privacidad o modelo de negocio. Nos comprometemos a mantenerlo informado a través de correo electrónico y/o nuestra página oficial.
          </p>
          <p className={pClass}>
            <strong>Conservación:</strong> Cuando los datos hayan dejado de ser necesarios para el cumplimiento de las finalidades, serán suprimidos una vez que concluya el plazo de conservación de <strong>setenta y dos meses</strong> de acuerdo con el artículo 10 de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
          </p>

          {/* --- BLOQUE DE CONSENTIMIENTO --- */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row gap-4">
              <label className="flex-1 cursor-pointer group">
                <input type="radio" name="consentimiento" className="peer sr-only" />
                <div className="p-6 rounded-2xl border border-white/10 bg-[#0a0a0a] peer-checked:border-qualtop-orange peer-checked:bg-qualtop-orange/5 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-600 peer-checked:border-qualtop-orange peer-checked:bg-qualtop-orange flex items-center justify-center transition-colors">
                      <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100" />
                    </div>
                    <span className="text-white font-bold">Estoy de acuerdo</span>
                  </div>
                  <p className="text-sm text-gray-500 ml-8 leading-relaxed">
                    Consiento que mis datos personales sean utilizados conforme a los términos y condiciones del presente aviso de privacidad.
                  </p>
                </div>
              </label>

              <label className="flex-1 cursor-pointer group">
                <input type="radio" name="consentimiento" className="peer sr-only" />
                <div className="p-6 rounded-2xl border border-white/10 bg-[#0a0a0a] peer-checked:border-red-500/50 peer-checked:bg-red-500/5 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-600 peer-checked:border-red-500 flex items-center justify-center transition-colors">
                      <div className="w-2 h-2 rounded-full bg-red-500 opacity-0 peer-checked:opacity-100" />
                    </div>
                    <span className="text-white font-bold">No estoy de acuerdo</span>
                  </div>
                  <p className="text-sm text-gray-500 ml-8 leading-relaxed">
                    No consiento que mis datos personales sean utilizados conforme a este aviso.
                  </p>
                </div>
              </label>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}