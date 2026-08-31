import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Scale, FileText, Users, Globe, CheckCircle2, Plus, Minus, Clock } from 'lucide-react';


const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

// --- COMPONENTE DEL ACORDEÓN ---
const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  

  return (
    <div className="border-b border-qualtop-orange/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg md:text-xl font-medium text-gray-200 group-hover:text-qualtop-orange transition-colors duration-300">
          {title}
        </span>
        <div className="text-qualtop-orange ml-4 shrink-0 transition-transform duration-300">
          {isOpen ? <Minus size={24} /> : <Plus size={24} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-gray-400 leading-relaxed pr-4 md:pr-8 space-y-4">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function AntisobornoSection() {
  
  // ==========================================
  // CLASE REUTILIZABLE PARA ENLACES (Para mantener el diseño premium y ahorrar código)
  // ==========================================
  const linkClass = "font-medium text-white underline decoration-white/30 underline-offset-4 hover:text-qualtop-orange hover:decoration-qualtop-orange transition-all duration-300";

  // ==========================================
  // BASE DE DATOS DE POLÍTICAS (Toda la info legal exacta)
  // ==========================================
  const policiesData = [
    {
      title: "Revisión de la Política Antisoborno",
      content: (
        <p>
          La Política Antisoborno será revisada al menos una vez al año, al ser requerido por la dirección o si ocurren cambios significativos en la organización, y dejando como evidencia un registro Minuta de reunión.
        </p>
      )
    },
    {
      title: "Identificar y prevenir el soborno",
      content: (
        <>
          <p>
            En nuestra organización entendemos como Soborno a la oferta, promesa, entrega, aceptación o solicitud de una ventaja indebida de cualquier valor <strong>(que pueda ser de naturaleza financiera o no financiera)</strong>, directamente o indirectamente e independiente de su ubicación en violación de la ley aplicable, como incentivo o recompensa para que una persona actúe o deje de actuar en relación con el desempeño de las obligaciones de esa persona.
          </p>
          <p>
            Los Sobornos pueden tener la forma de obsequios, prestamos, valores, pago de entretenimiento, viajes, vacaciones, pagos de comisiones o recompensas en efectivo o en especie, ofertas de trabajo, servicios personales especiales o cualquier otra cosa de valor, que se proporcione con el ánimo de obtener una ventaja o influenciar una decisión. Los actos de corrupción para efectos de la política antisoborno de la organización incluyen conductas no éticas tales como soborno, fraude, extorsión o la utilización de información falsa o privilegiada en perjuicio de la empresa.
          </p>
          <p>
            Estas acciones están prohibidas y constituyen delitos graves. La organización prohíbe cualquier intento de ayudar u ocultar actos de corrupción independientemente de si obtienes un beneficio.
          </p>
          <p>
            Asimismo, se entiende como un acto de corrupción y faltas de ética, el “fraude ocupacional” entendiendo a este como el uso intencional del puesto de trabajo para el enriquecimiento personal, de un socio de negocio u otra entidad a través del uso indebido de los recursos o activos de la empresa.
          </p>
          <p>
            Si identifican alguna alerta, se deberá contactar al Oficial de Cumplimiento Antisoborno para orientación y generar el registro en la{' '}
            <a href="https://www.qualtop.com/linea-de-denuncia/" target="_blank" rel="noreferrer" className={linkClass}>
              Línea de Denuncia - Qualtop
            </a>.
          </p>
        </>
      )
    },
    {
      title: "Principios fundamentales",
      content: (
        <>
          <p>Por lo anterior la organización prohíbe en su nombre o representación:</p>
          <ul className="list-disc pl-5 space-y-2 marker:text-qualtop-orange">
            <li>Ofrecer, pagar, prometer, autorizar el pago o recibir, directa o indirectamente, dinero, obsequios o servicios de o a cualquier colaborador, servidor público o socio de negocio, a fin de obtener alguna ventaja o de influir en una decisión a lo largo de nuestra cadena de valor.</li>
            <li>Aceptar u ofrecer algún servicio, entretenimiento, dinero, valores, gastos de viaje, alojamiento o comidas cuyo valor sea inapropiado o que no porten el logotipo de la Empresa, de o a un servidor público, proveedor, u otra parte interesada o realizar algún tipo de acto o actividad que se pueda interpretar como un incentivo para influir en una decisión o la obtención de una ventaja. En ciertas relaciones comerciales, la aceptación de comidas y otros tipos de hospitalidad se consideran normales y se estima que no influyen en las decisiones de una persona.</li>
            <li>Negociar o hacer pagos a terceros si existe algún indicio de que esas personas puedan realizar algún tipo de soborno en nuestra representación.</li>
            <li>Realizar pagos por concepto de gastos de viaje a servidores públicos o sus familiares.</li>
            <li>Realizar pagos a causas o partidos políticos con recursos de la empresa o a nombre de la organización. Se pueden realizar donativos bajo los lineamientos previamente establecidos de la organización.</li>
          </ul>
          <p>
            Los colaboradores, directivos y socios de negocio dentro del alcance del Sistema de Gestión Antisoborno deberán apegarse a nuestra política antisoborno, procesos aplicables y ayudar en el logro de nuestros objetivos antisoborno.
          </p>
          <p>
            El personal designado como Oficial de Cumplimiento Antisoborno tiene la autoridad e independencia para supervisar el sistema de gestión, y proporcionar orientación al personal sobre cualquier inquietud, o sospecha de soborno.
          </p>
          <p>
            El Analista de Riesgos en conjunto con el Oficial de Cumplimiento Antisoborno deben evaluar los riesgos de soborno que puedan afectar el logro de los objetivos.
          </p>
        </>
      )
    },
    {
      title: "Compromisos",
      content: (
        <div className="space-y-4">
          <ul className="list-disc pl-5 space-y-2 text-white/80">
            <li>
              Es responsabilidad del personal y socios de negocio cumplir los requisitos del Sistema de Gestión Antisoborno.
            </li>
            <li>
              Apegarnos a las leyes aplicables a nuestra organización identificadas en la{' '}
              <a 
                href="https://id.atlassian.com/login?continue=https%3A%2F%2Fid.atlassian.com%2Fjoin%2Fuser-access%3Fresource%3Dari%253Acloud%253Aconfluence%253A%253Asite%252Fd227f807-7c05-4503-9327-f19b4443a9bf%26continue%3Dhttps%253A%252F%252Fqualtopgroup.atlassian.net%252Fwiki%252Fspaces%252FQGADM%252Fpages%252F884572291%252FTabla%252Bde%252BRequisitos%252BLegales&application=confluence&orgId=5e8ebd31-64bf-4df2-a389-c3ba3bd74a4a" 
                target="_blank" 
                rel="noreferrer" 
                className={linkClass}
              >
                Tabla de Requisitos Legales
              </a>.
            </li>
            <li>
              Realizar todas las negociaciones, compras y transacciones financieras con apego a nuestros procesos internos y conservando todos los registros de las mismas para ser revisados en caso de auditoría.
            </li>
            <li>
              Asegurarnos de que los pagos que realicemos o que se realicen por nuestra cuenta sean exclusivamente una remuneración por servicios efectivamente prestados a nuestra compañía o en nombre de ella.
            </li>
            <li>
              Adoptar los controles internos y denunciar, si es necesario ante las autoridades correspondientes, aquellos casos en los que algún empleado o socio de negocio incurra en un acto de corrupción.
            </li>
            <li>
              Promover las mejores prácticas para prevenir y luchar contra el soborno y la corrupción a lo largo de nuestra cadena de valor, capacitar al personal sobre las medidas preventivas y realizar campañas de difusión.
            </li>
            <li>
              Fortalecer la eficacia del sistema de gestión compartiendo sugerencias que nos lleven a la mejora continua del mismo.
            </li>
            <li>
              La organización define como &apos;Puestos Clave&apos; a aquellos roles con alta exposición a riesgos de corrupción, gestión financiera o relación con terceros interesados, con toma de decisión que puede influir en decisiones que podrían ser vulnerables a prácticas de soborno. Para estos perfiles identificados en la{' '}
              <a 
                href="https://qualtopgroup.atlassian.net/wiki/spaces/BDPYAS/pages/5967414001/Pol+tica+de+Control+de+Expedientes" 
                target="_blank" 
                rel="noreferrer" 
                className={linkClass}
              >
                Política de Control de Expedientes
              </a>, la Debida Diligencia es obligatoria y reinforced, consistiendo en la realización de un Estudio Socioeconómico y verificaciones de antecedentes{' '}
              <a 
                href="https://qualtopgroup.atlassian.net/wiki/spaces/BDPYAS/pages/5967414231/Reclutamiento+y+Selecci+n" 
                target="_blank" 
                rel="noreferrer" 
                className={linkClass}
              >
                (ver Proceso de Reclutamiento y Selección)
              </a>.
            </li>
            <li>
              La Declaración de Cumplimiento Antisoborno es un requisito obligatorio para la totalidad de los colaboradores de la organización sin excepción. Deberá presentarse en el momento de la contratación, al menos una vez al año y, en caso de cambio de puesto, deberá renovarse.
            </li>
          </ul>
        </div>
      )
    },
    {
      title: "Regalos",
      content: (
        <>
          <p>
            Está prohibido dar o recibir regalos, comidas, entretenimiento, hospitalidad o cortesías <strong>(en adelante regalos)</strong>, sin embargo, puede ser aceptable mientras no haya expectativa de que la persona que recibió el beneficio vaya a corresponder con algo a cambio de esa atención. Así mismo, los regalos deben ser razonables según las circunstancias, no excesivos e infrecuentes y deben cumplir la siguiente serie de requisitos que los regulan:
          </p>
          <ul className="list-disc pl-5 space-y-2 marker:text-qualtop-orange">
            <li>Se podrá realizar o recibir regalos de valor modesto, como tazas, lapiceros o camisetas, o con valor simbólico, como trofeos o placas en reconocimiento.</li>
            <li>En ningún caso se podrá ofrecer o aceptar dinero en efectivo o equivalente <strong>(vales o tarjetas de regalo)</strong>.</li>
            <li>Únicamente se podrá ofrecer o aceptar regalos u otro tipo de atenciones que no vulneren la legalidad vigente ni estén prohibidos en el marco de un contrato vigente; teniendo en cuenta que el valor no supere el importe de $4,500.00 pesos mexicanos anuales por persona y que no supere anualmente 30,000 pesos mexicanos por cliente, proveedor, partner, socio o aliado.</li>
            <li>No se podrá aceptar o realizar regalos o invitaciones de/a una misma persona más de 3 veces al año.</li>
            <li>Se habrá de respetar en todo momento la Política de Regalos de las Organizaciones con las que tenemos relaciones de negocio.</li>
            <li>No se aceptarán u ofrecerán regalos hechos en forma de servicios o beneficios <strong>(por ejemplo, promesas de empleo)</strong>.</li>
            <li>No se debe realizar o aceptar regalos durante o inmediatamente después de la negociación de un contrato.</li>
            <li>No se debe aceptar u ofrecer regalos a aquellas personas que participen directamente en la adjudicación de contratos, aprobación de certificados, u otros.</li>
            <li>No deben resultar en un problema si se hace público este regalo.</li>
            <li>Cuando los regalos superen el valor o la frecuencia establecidos se solicitará la aprobación previa de Dirección General.</li>
          </ul>
          <p>
            Si la organización decide otorgar algún obsequio o regalo a sus colaboradores esta acción no se considerará un acto de soborno y estarán regulados con procesos y políticas internas de la empresa. En caso de que la organización decida otorgar un regalo a alguien externo a la organización deberá cumplir la política Antisoborno. En caso de otorgar regalo(s) se deberá seguir el Proceso de Compras y Política de Compras.
          </p>
          <p>
            Los regalos por recibir deben ser previamente reportados y autorizados vía correo electrónico al Oficial de Cumplimiento Antisoborno.
          </p>
          <p>El Oficial de Cumplimiento Antisoborno deberá:</p>
          <ul className="list-disc pl-5 space-y-2 marker:text-qualtop-orange">
            <li>Revisar cada solicitud de compra clasificada como regalo en el sistema administrativo Solicitud de compra.</li>
            <li>Revisar que en estas solicitudes de compra de regalo recibidas, se señalen las cantidades de regalos por cada cliente en particular.</li>
            <li>Validar que se cumplan las políticas establecidas para los regalos y en caso de que así sea, deberá de comunicarlo vía correo electrónico a los integrantes del Comité de Ética, estos deberán de revisar la información y responder por correo a más tardar los siguientes 3 días hábiles con su aprobación o rechazo, la solicitud se considerará aprobada o rechazada cuando por lo menos la mitad más uno de los integrantes del Comité de Ética haya expresado su decisión.</li>
            <li>Informar de la decisión final registrándola en la solicitud de compra.</li>
            <li>Ser responsable de llevar un registro de todos los regalos solicitados y recibidos por cada año calendario.</li>
          </ul>
          <p>
            Si tenemos una duda sobre dar o aceptar una comida o regalo debemos preguntar a nuestro jefe directo, consultarlo con algún integrante del comité de ética o hacerlo mediante la línea de denuncia de Qualtop: <a href="https://www.qualtop.com/linea-de-denuncia/" target="_blank" rel="noreferrer" className={linkClass}>https://www.qualtop.com/linea-de-denuncia/</a>.
          </p>
        </>
      )
    },
    {
      title: "Donaciones y Patrocinios",
      content: (
        <>
          <p>La organización puede realizar Donaciones o Contribuciones Sociales a alguna institución y organización sin fines de lucro con la finalidad de contribuir al bienestar y desarrollo de la sociedad y de la comunidad.</p>
          <p>La organización deberá verificar que los Donativos apoyen alguna de las siguientes causas:</p>
          <ul className="list-disc pl-5 space-y-2 marker:text-qualtop-orange">
            <li><strong>Promoción del bienestar:</strong> Proyectos que promuevan hábitos saludables y una mejor calidad de vida, como el deporte o alimentación balanceada.</li>
            <li><strong>Voluntariado:</strong> Programas que busquen el involucramiento de la comunidad para el apoyo de personas en situación vulnerable.</li>
            <li><strong>Auxilio en Desastres Naturales:</strong> Asistencia a personas afectadas por contingencias provocadas por temblores, huracanes, entre otros.</li>
            <li><strong>Educación:</strong> Formación de niños y jóvenes de escasos recursos a través de instituciones con programas educativos.</li>
            <li><strong>Medio Ambiente:</strong> Impulsar programas para el cuidado y conservación de los recursos.</li>
          </ul>
          <p>Para otorgar un Donativo o contribución a un organismo o institución sin fines de lucro se debe cumplir con los siguientes lineamientos:</p>
          <ul className="list-disc pl-5 space-y-2 marker:text-qualtop-orange">
            <li>Que las instituciones u organizaciones estén legalmente constituidas y registradas fiscalmente para emitir recibos deducibles de impuestos.</li>
            <li>Llevar un control efectivo y transparente de los Donativos, estos deberán ser adecuadamente registrados en la contabilidad.</li>
            <li>En ninguna circunstancia se otorgarán Donativos a personas físicas.</li>
            <li>No se otorgará apoyo a instituciones u organizaciones con las que exista un Conflicto de Interés con algún Colaborador de la organización, a menos que se cuente con la autorización de Dirección General.</li>
            <li>Se debe seguir el Proceso de Compras y Política de Compras para la gestión de un Donativo.</li>
          </ul>
          <p>El objetivo de los Patrocinios es la promoción de la marca de la organización y para realizarlos se deberá cumplir con los siguientes lineamientos:</p>
          <ul className="list-disc pl-5 space-y-2 marker:text-qualtop-orange">
            <li>No realizar pagos en efectivo.</li>
            <li>No aceptar compromisos como obligado.</li>
            <li>No comprometer Patrocinios por períodos.</li>
            <li>Todos los Patrocinios deberán ser documentados especificando los montos económicos, la forma en que éstos serán utilizados y el o los beneficiarios de los mismos.</li>
            <li>No otorgar un Patrocinio que ponga en riesgo la reputación de la organización o de sus accionistas.</li>
            <li>Los Patrocinios deberán ser registrados como tal en la contabilidad.</li>
          </ul>
        </>
      )
    },
    {
      title: "Gastos de Viaje y Viáticos",
      content: (
        <>
          <p>
            Está prohibido ofrecer, solicitar o aceptar invitaciones a viajes ya que se pueden percibir con la intención de influir o inducir a cualquiera de las partes a realizar actos que otorguen un beneficio Indebido a la organización, a sus Colaboradores, Familiares, amigos, asociados o entidades en las que tenga un Interés significativo.
          </p>
          <p>
            Cuando se trate de invitaciones para fines relacionados con el negocio, como presentaciones y conferencias deberán tener un sentido legítimo empresarial y los gastos de viaje que se deriven deben ser cubiertos por la organización.
          </p>
          <p>
            Los gastos de viaje y viáticos que pueden ser autorizados corresponden a los derivados de transportación aérea o terrestre, hospedaje y alimentos, que deberán cumplir con los siguientes lineamientos:
          </p>
          <ul className="list-disc pl-5 space-y-2 marker:text-qualtop-orange">
            <li>El costo de los vuelos, transporte, alimentos y hospedaje se autorizarán y reembolsarán conforme a los lineamientos establecidos en la Política de Viajes y/u Hospedajes.</li>
            <li>Cualquier gasto que no esté relacionado con un asunto de negocios de la organización o trabajo no será autorizado ni reembolsado.</li>
            <li>Los reembolsos a Terceros sólo aplicarán cuando exista un contrato <strong>(o en su defecto, una propuesta de servicios aceptada)</strong> que lo estipule.</li>
          </ul>
          <p>El oficial de cumplimiento antisoborno deberá:</p>
          <ul className="list-disc pl-5 space-y-2 marker:text-qualtop-orange">
            <li>Revisar cada solicitud de viáticos y reembolsos registrada para terceros en la mesa de ayuda de Solicitudes administrativas.</li>
            <li>Únicamente considerar los registros de gastos por otorgar a empresas o individuos que no formen parte de las empresas de Grupo Qualtop y validar que se cumplan las políticas establecidas para los viáticos y reembolso y en caso de que así sea, deberá de comunicarlo vía correo electrónico a los integrantes del Comité de Ética, estos deberán de revisar la información y responder por correo a más tardar los siguientes 3 días hábiles con su aprobación o rechazo, la solicitud se considerará aprobada o rechazada cuando por lo menos la mitad más uno de los integrantes del Comité de Ética haya expresado su decisión.</li>
            <li>Informar de la decisión final al colaborador.</li>
            <li>Ser responsable de llevar un registro de todos los tickets solicitados y recibidos.</li>
          </ul>
        </>
      )
    },
    {
      title: "Socios de Negocio",
      content: (
        <>
          <p>Las organizaciones sobre las que la organización tiene control son la de Proveedores, Aliados y Socios de Negocio. Quienes deben apegarse y cumplir la presente política.</p>
          <p>Las organizaciones sobre las que se considera no tenemos control son los Clientes y Partners, ya que nos estaremos apegando a sus lineamientos. Debido a ello, si se identifica algún desapego a esta política o antecedente de soborno se deberá identificar, evaluar y tratar como un riesgo de soborno.</p>
          <p>Cuando se haya identificado un riesgo no bajo de soborno, ya sea a través de la evaluación de riesgos o la debida diligencia, se deberá determinar si el socio de negocio cuenta con controles antisoborno apropiados que gestionen el riesgo de soborno, tales como: Política Antisoborno, Función de Cumplimiento Antisoborno, Código de Ética u otro similar.</p>
          <p>En este contexto, si se identifica que el socio de negocio no cuenta con dichos controles, o si no es posible verificarlos, la organización deberá:</p>
          <ul className="list-disc pl-5 space-y-2 marker:text-qualtop-orange">
            <li>De ser posible, fomentar y requerir la implementación de controles antisoborno en relación con la operación, proyecto o actividad correspondiente.</li>
            <li>De no ser posible, se deberá evaluar el riesgo de soborno que conlleva la relación con el socio de negocio y evaluar la manera de gestionar dicho riesgo.</li>
          </ul>
          <p>Cuando algún Proveedor, Aliado o Socio de Negocio no desea aceptar la Política Antisoborno no se podrá continuar con la firma del contrato ni la relación comercial.</p>
          <p>Cuando un socio de negocio no desee implementar controles antisoborno la organización puede tomar la decisión de terminar, interrumpir, suspender o retirarse de la relación comercial.</p>
        </>
      )
    },
/*     {
      title: "Puestos Clave",
      content: (
        <>
          <p>Los puestos identificados como clave que se listan a continuación deberán presentar una declaración de cumplimiento antisoborno por lo menos una vez al año o al cambiar de puesto:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <div>
              <h4 className="text-white font-bold mb-3 border-b border-white/10 pb-2">Puestos Administrativos</h4>
              <ul className="list-disc pl-5 space-y-1 marker:text-qualtop-orange text-sm md:text-base">
                <li>Director General</li>
                <li>Director de Innovación</li>
                <li>Director de Soluciones de Negocio y Alianzas</li>
                <li>Director de Administración y Finanzas</li>
                <li>Director de Auditoría Interna y Procesos</li>
                <li>Director Comercial Gobierno</li>
                <li>Director de Talento & Q-ltura</li>
                <li>Director de PMO</li>
                <li>Gerente de Infraestructura y Soporte TI</li>
                <li>Gerente Marketing</li>
                <li>Gerente de Cuentas por Cobrar</li>
                <li>Gerente de Capacitación y Desarrollo Organizacional</li>
                <li>Gerente de Administración de Personal</li>
                <li>Gerente de Reclutamiento y Selección</li>
                <li>Gerente de Tesorería</li>
                <li>Coordinador de Nómina y Beneficios</li>
                <li>Coordinador de Reclutamiento</li>
                <li>Analista de Nómina</li>
                <li>Contador General</li>
                <li>Sales Analysis & Engineering Manager</li>
                <li>Account Manager</li>
                <li>Sales & Business Development Director</li>
                <li>Business Success Director</li>
                <li>Customer Success Leader Jr</li>
                <li>Customer Success Leader Sr</li>
                <li>Project Success Leader</li>
                <li>Business transformation Director</li>
                <li>Especialista de Proyectos de Gobierno Sr.</li>
                <li>Líder Especialista de Proyectos de Gobierno</li>
                <li>Reclutador</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3 border-b border-white/10 pb-2">Puestos de Operaciones / Proyecto</h4>
              <ul className="list-disc pl-5 space-y-1 marker:text-qualtop-orange text-sm md:text-base">
                <li>Director de Operaciones</li>
                <li>Director de Portafolio</li>
                <li>Gerente de Desarrollo</li>
                <li>Gerente de Fábrica de Desarrollo</li>
                <li>Coordinador de Ambientación/Infraestructura</li>
                <li>Coordinador de Desarrollo</li>
                <li>Coordinador de Liberaciones</li>
                <li>Coordinador de Mesa de Servicio</li>
                <li>Coordinador de Niveles de Servicio y Op.</li>
                <li>Coordinador de QA</li>
                <li>Coordinador de Testing</li>
                <li>Coordinador de área de servicios especializados</li>
                <li>Líder de Área</li>
                <li>Líder de Proyecto</li>
                <li>PM Adv</li>
                <li>PM Sr</li>
              </ul>
            </div>
          </div>
        </>
      )
    }, */
    {
      title: "Formación",
      content: (
        <>
          <p>Toda capacitación que se requiera deberá seguir el proceso de Capacitaciones.</p>
          <p>Todo el personal incluyendo directivos, debe realizar el curso de formación sobre la Política Antisoborno por lo menos una vez al año, dicho curso será administrado por el área de capacitación.</p>
          <p>Todo el personal señalado en el alcance del Sistema de Gestión Antisoborno, debe realizar el curso de formación sobre la Política Antisoborno por lo menos una vez al año, dicho curso será administrado por el área de capacitación.</p>
        </>
      )
    },
    {
      title: "Delegación de la Toma de Decisiones Antisoborno",
      content: (
        <>
          <p>El Oficial de Cumplimiento Antisoborno será el responsable de gestionar las tomas de decisiones formales que se presenten y de asegurar la implementación de la mejor solución conforme al instructivo Toma de decisiones organizacionales.</p>
          <p>Es obligatorio realizar un proceso formal de Toma de decisiones organizacionales ante las siguientes situaciones:</p>
          <ul className="list-disc pl-5 space-y-2 marker:text-qualtop-orange">
            <li>Ante un incumplimiento con la Política Antisoborno.</li>
            <li>Cuándo en la debida diligencia se identifica algún antecedente de soborno.</li>
            <li>Cuando exista conflicto de intereses ya sea entre personal interno, o personal interno con agentes externos a la organización.</li>
          </ul>
          <p>Es sugerido realizar un proceso formal de toma de decisiones ante las siguientes situaciones:</p>
          <ul className="list-disc pl-5 space-y-2 marker:text-qualtop-orange">
            <li>Cuándo el Cliente o Aliado o Partner no tenga un sistema de gestión antisoborno o controles antisoborno aplicados.</li>
          </ul>
          <p>El Comité de Ética tiene la facultad para tomar decisiones sobre los dilemas éticos y denuncias que contravienen la conducta ética de los colaboradores. En caso de que el Comité de Ética así lo decida por mayoría, la decisión final a tomar será turnada hacia la Dirección General.</p>
        </>
      )
    },
    {
      title: "Consecuencias del Incumplimiento",
      content: (
        <>
          <p>Los Directivos y los colaboradores deben conocer, comprender y cumplir la presente política.</p>
          <p>Cualquier acto no congruente o en contra de esta política que sea observado o denunciado por cualquier medio, será revisado por el Comité de Ética, conforme a los lineamientos que para este efecto aplican y estarán sujetos a sanciones según lo indica la Matriz de Sanciones definida en el Reglamento Interno de Trabajo, las cuales pueden llegar hasta la rescisión laboral.</p>
        </>
      )
    },
    {
      title: "Procedimiento de Cumplimiento, Implementación, Denuncia y Control",
      content: (
        <>
          <p>Cualquier Directivo, Colaborador, Proveedor, Aliado, Partner o Cliente, tiene la obligación de reportar ante cualquier conocimiento de incumplimiento real o sospechoso de esta Política al Oficial de Cumplimiento Antisoborno.</p>
          <p>Cuando un colaborador o socio de negocio requiera obtener información, asesoría, exponer sus preocupaciones, solicitar apoyo o plantear dudas sobre temas relacionados con riesgos o posibles actos de soborno podrán acercarse al Oficial de Cumplimiento Antisoborno o al Comité de Ética para obtener asesoría, o bien, podrán hacer uso de la <a href="https://www.qualtop.com/linea-de-denuncia/" target="_blank" rel="noreferrer" className={linkClass}>Línea de Denuncia</a>.</p>
          <p>Cualquier reporte de soborno o actividad sospechosa será tratado como confidencial. Ninguna persona que realice un reporte de soborno o de actividad sospechosa de buena fe sufrirá sanción o perjuicio por esta actividad.</p>
          <p>Se ha establecido el canal <a href="https://www.qualtop.com/linea-de-denuncia/" target="_blank" rel="noreferrer" className={linkClass}>Línea de Denuncia</a> supervisado por el Oficial de Cumplimiento Antisoborno y Comité de Ética, el cual es un canal de acceso público de denuncia, para que todos los interesados puedan realizar, de buena fe y sin temor a represalias, consultas o comunicaciones de incumplimientos de lo establecido en esta Política.</p>
          <p>Si se tiene conocimiento de alguna conducta <strong>(activa o pasiva)</strong> contraria al contenido de la presente Política, se debe seguir el Proceso de Atención a la Línea de Denuncia para el planteamiento de inquietudes o denuncias y comunicarlo a través de la Línea de Denuncia, al que se podrá acceder a través de las páginas web de la organización:</p>
          <ul className="list-disc pl-5 space-y-2 marker:text-qualtop-orange">
            <li><a href="https://www.qualtop.com/linea-de-denuncia/" target="_blank" rel="noreferrer" className={linkClass}>https://www.qualtop.com/linea-de-denuncia/</a></li>
          </ul>
          <p>La denuncia se puede presentar de forma anónima o el remitente se puede identificar. En cualquier caso, se garantiza la confidencialidad de la información que se comunique.</p>
          <p>Todas aquellas personas que, de buena fe o sobre la base de una creencia razonable, transmitan sus notificaciones, cooperen en una investigación o se nieguen a participar en actos presumibles de soborno estarán protegidas contra cualquier tipo de discriminación, represalias y penalización por motivo de las denuncias realizadas a menos que en base a las investigaciones se compruebe que estas mismas personas que notifican o cooperan en la investigación se encuentren involucradas.</p>
          <p>Reportar en la Línea de Denuncia cualquier discriminación o represalias ante alguna denuncia, participación en la investigación o por negarse a participar en actos de soborno. Es causa de despido para todo aquel que tome represalias contra algún denunciante, participante en una investigación o por negarse a participar en un soborno.</p>
          <p>Las denuncias falsas o difamatorias podrán ser objeto de sanción o dar lugar al ejercicio de las acciones a que haya lugar en derecho.</p>
        </>
      )
    }
  ];

  return (
    <section className="relative py-32 bg-[#050505] overflow-hidden font-sans text-white">
      
     

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* ==========================================
            1. HEADER Y TEXTO INTRODUCTORIO
        ========================================== */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold leading-tight mb-12 tracking-tight"
          >
            Política <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Antisoborno</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg text-gray-400 leading-relaxed"
          >
            <p>
              El objetivo de este documento es establecer las políticas Antisoborno, asegurando y promoviendo que cualquier actividad que se desempeñe dentro de la organización <strong>(Qualtop, S.A. de C.V.)</strong>, o a nombre de la misma, esté fundamentada en la ética y valores que nos caracterizan, condenando la corrupción, soborno, fraude o cualquier otro acto ilegal que se pudiera presentar a lo largo de nuestra cadena productiva.
            </p>
            <p>
              Dentro de nuestra organización buscamos promover siempre los valores y aptitudes que nos representan tales como la honestidad y la ética, permitiendo así que nuestro desempeño sea reconocido no solo por nuestros resultados sino también por nuestra <span className="text-qualtop-orange italic">calidad humana</span>.
            </p>
            <p>
              Se describen las políticas y normas Antisoborno definidas por la organización, tomándose como base las leyes y demás regulaciones aplicables bajo las recomendaciones del estándar <strong className="text-white">ISO 37001:2016</strong>.
            </p>
          </motion.div>
        </div>

        {/* ==========================================
            2. TARJETA DE ALCANCE (GLASSMORPHISM)
        ========================================== */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#111] to-[#0a0a0a] p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden mb-24"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Globe size={160} />
          </div>
          
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white relative z-10">
            <Users className="text-qualtop-orange" /> Alcance
          </h3>
          
          <p className="text-gray-300 leading-relaxed mb-8 relative z-10 text-lg">
            Esta política es aplicable a los colaboradores, socios, proveedores, aliados, partners y clientes. A fin de coadyuvar y promover el cumplimiento de esta política, se ha establecido un Sistema de Gestión Antisoborno <strong>(SGAS)</strong> bajo la Norma ISO 37001:2016, el cual contiene medidas diseñadas para:
          </p>
          
          <ul className="space-y-4 relative z-10">
            {[
              'Identificar y evaluar riesgos.',
              'Prevenir, detectar y enfrentar el soborno.',
              'Controles y procesos que buscan el logro de los objetivos antisoborno.',
              'Reforzar nuestra cultura de honestidad y ética en los negocios.'
            ].map((li, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-400">
                <CheckCircle2 size={20} className="text-qualtop-orange shrink-0 mt-1" />
                <span>{li}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ==========================================
            3. ACORDEÓN DE DESCRIPCIÓN Y NORMAS
        ========================================== */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-10">Descripción</h3>
          
          <div className="border-t border-qualtop-orange/30">
            {policiesData.map((policy, index) => (
              <AccordionItem key={index} title={policy.title} content={policy.content} />
            ))}
          </div>
        </div>

        {/* FECHA DE ACTUALIZACIÓN */}
        <motion.div 
          {...fadeIn}
          className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-16"
        >
          <Clock size={16} />
          <span>Última actualización: 09/06/2026</span>
        </motion.div>

      </div>
    </section>
  );
}