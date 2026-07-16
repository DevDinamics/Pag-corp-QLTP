import React from 'react';

import { FileText, Users, Building, Cpu } from 'lucide-react';

// ============================================================================
// ARCHIVO: politicasData.js
// OBJETIVO: Centralizar la información para auditorías ISO 27001
// ============================================================================

export const politicasData = [
  
  // ==========================================================================
  // --- SECCIÓN 1: ORGANIZATIVOS ---
  // ==========================================================================
  {
    id: "organizativos",
    title: "Organizativos",
    icon: <FileText size={20} />, // (Importa el ícono en tu componente principal)
    items: [
      {
        section: "5.1",
        title: "Políticas de seguridad de la información",
        content: (
          <div className="space-y-4 text-gray-300">
            <p className="font-semibold text-white mb-2">Políticas para la seguridad de la información:</p>
            <p>Para la organización la información es un activo que es esencial y necesita ser protegido de acuerdo con la importancia que tiene para el impacto; económico, operativo, humano o de imagen; que puede generar que una determinada amenaza afecte la integridad, disponibilidad o confidencialidad de la misma.</p>
            <p>De la necesidad por proteger la información ante amenazas, es que surge la "Seguridad de la Información", la cual se define como el conjunto de medidas, preventivas y correctivas, que permiten resguardar y proteger la información.</p>
            <p className="text-sm italic text-gray-500">Todos los aspectos relativos a lineamientos complementarios y que contemplan sus rubros auxiliares se encuentran en nuestra /wiki/spaces/GQPYA/pages/828671885.</p>
            
            <div className="border-t border-white/10 pt-4 mt-4">
              <p className="font-semibold text-white mb-2">Revisión de las políticas para la seguridad de la información:</p>
              <p>Las políticas de seguridad de la información serán revisadas al menos una vez al año, al ser requerido por la dirección o si ocurren cambios significativos en la organización, y dejando como evidencia un registro Minuta de reunión y/o solicitud de mejora.</p>
            </div>
          </div>
        )
      },
      {
        section: "5.2",
        title: "Roles y responsabilidades en seguridad de la información",
        content: (
          <div className="space-y-4 text-gray-300">
            <p>Las responsabilidades de los integrantes del Comité de Seguridad de la Información se encuentran especificados en los nombramientos y en las <strong>/wiki/spaces/GQPYA/pages/882573369</strong>.</p>
          </div>
        )
      },
      {
        section: "5.7",
        title: "Inteligencia de amenazas",
        content: (
          <div className="space-y-4 text-gray-300">
            <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad del departamento de TI:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Para garantizar la detección temprana, análisis efectivo y respuesta adecuada a las amenazas cibernéticas para proteger la integridad, confidencialidad y disponibilidad de los activos de la organización se debe realizar un análisis de las amenazas de manera trimestral e identificar acciones que permitan prevenirlas.</li>
              <li>Recopilar datos de fuentes internas y externas, como registros de eventos, inteligencia de amenazas compartida, feeds de seguridad y análisis de vulnerabilidades.</li>
              <li>Clasificar y priorizar las amenazas en función de su gravedad y probabilidad de impacto.</li>
              <li>Utilizar herramientas de análisis de malware, inteligencia artificial y técnicas de análisis forense para comprender la naturaleza de las amenazas.</li>
              <li>Participar en plataformas de intercambio de inteligencia de amenazas con otras organizaciones del sector y contribuir activamente a la comunidad mediante la divulgación de hallazgos relevantes.</li>
              <li>Mantener actualizada la base de datos del antivirus con una frecuencia de cada 2 horas; en amenazas críticas, actualizar al momento la base de datos de amenazas.</li>
            </ul>
          </div>
        )
      },
      {
        section: "5.9",
        title: "Inventario de información y otros activos asociados",
        content: (
          <div className="space-y-6 text-gray-300">
            <div>
              <p className="font-semibold text-white mb-2">Inventario de activos tecnológicos:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Todas las estaciones de trabajo, dispositivos móviles y demás recursos tecnológicos son asignados a un responsable, por lo cual es su compromiso hacer uso adecuado y eficiente de dichos recursos.</li>
                <li>El departamento de TI es el responsable de preparar las estaciones de trabajo fijas y/o portátiles/laptops de los colaboradores y de hacer entrega de las mismas, asegurándose de que el colaborador verifique el estado utilizando el Checklist de entrega de equipo de cómputo.</li>
                <li>El Líder de Procesos y Certificaciones y/o Analista de Procesos deberán levantar, revisar y actualizar el inventario de activos de información al interior de sus procesos o áreas, instalaciones físicas o personas por lo menos una vez al año, contemplando como mínimo los documentos con clasificación de la confidencialidad: confidenciales y externos. Los activos se registran en el inventario dentro de la herramienta Magnus.</li>
                <li>El Analista de Soporte deberá verificar en Magnus si existe disponibilidad de equipo y/o licencias. En caso de no contar con ellos, informará al Gerente de Infraestructura y Soporte TI para solicitar la compra mediante una Solicitud de Compras siguiendo el Proceso de Compras.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white mb-2">Propiedad de los activos:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>La organización es propietaria de los activos tecnológicos, los cuales tendrán un responsable asignado identificado en Magnus. Todo colaborador que tenga asignado un recurso tecnológico deberá tener asignada una responsiva.</li>
                <li>Cuando un equipo se entrega a un tercero para hacerle llegar al colaborador final, deberá firmar una carta responsiva <strong>(Formato Carta de Resguardo)</strong> con vigencia temporal hasta que el usuario final entregue a TI su responsiva firmada.</li>
                <li>Todos los activos identificados en Magnus como disponible <strong>(stock)</strong> son responsabilidad del área de Infraestructura y Soporte TI.</li>
                <li>El Líder de cada área y/o responsable de proyectos debe tener una reunión de forma semestral con su equipo para revisar los documentos oficiales y de apoyo <strong>(no controlados por el Plan de Configuración, a su proceso y/o políticas)</strong> asegurándose de que se encuentren actualizados en Confluence y se mencionen en el formato Resguardo de Información.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "5.10",
        title: "Uso aceptable de la información y activos asociados",
        content: (
          <div className="space-y-6 text-gray-300">
            <div>
              <p className="font-semibold text-white mb-2">Uso aceptable de los activos:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Los usuarios deben ser conscientes que los recursos se encuentran sujetos a auditorías <strong>(Formato Plan de Auditorias Mantenimiento)</strong> por parte de TI y a revisiones del Gerente de Infraestructura y Soporte de TI.</li>
                <li>El departamento de TI debe autorizar la instalación, cambio o eliminación de componentes en activos o infraestructura propiedad de la organización, estableciendo una configuración adecuada.</li>
                <li>Los colaboradores utilizarán exclusivamente software autorizado y usarán los recursos de forma ética para evitar daños o pérdidas sobre la operación o la imagen de la organización.</li>
                <li>Los recursos e infraestructura provistos son proporcionados con el único fin de llevar a cabo las labores de la organización; no deben ser utilizados para fines personales.</li>
                <li>Google Drive es una herramienta proporcionada exclusivamente para el desarrollo de las actividades laborales. Queda prohibido su uso para fines personales o ajenos a las funciones asignadas.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad de todos los usuarios:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Toda la información generada y almacenada en Google Drive será considerada propiedad de la organización, conforme a la política 5.32 <strong>(Derechos de propiedad intelectual)</strong>.</li>
                <li>Los colaboradores deberán utilizar únicamente su cuenta organizacional de Google Workspace <strong>(@qualtop.com)</strong> para acceder a Google Drive. Queda prohibido el uso de cuentas personales de Google.</li>
                <li>Es obligatorio almacenar la información operativa y de proyectos en las Unidades compartidas designadas por el área correspondiente, no en Mi unidad, salvo para borradores temporales de trabajo individual.</li>
                <li className="text-qualtop-orange font-medium">Queda estrictamente prohibido almacenar en Google Drive contenidos pornográficos, ilegales, discriminatorios o de naturaleza opuesta a las actividades laborales, en concordancia con la sección 8.20 <strong>(Controles de red)</strong>.</li>
                <li>Administrar sus contraseñas en el o los equipos asignados y resguardar la documentación oficial o de apoyo en Confluence dentro del apartado \"Ejecución del Servicio\" de cada área con base a lo identificado en el Plan de Configuración.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "5.11",
        title: "Devolución de activos",
        content: (
          <div className="space-y-4 text-gray-300">
            <ul className="list-disc pl-5 space-y-2">
              <li>Todos los usuarios deben entregar, al departamento de TI, los recursos tecnológicos cuando estos se retiran de la organización o son trasladados de área.</li>
              <li>Al finalizar su relación laboral o cambiar de funciones, los colaboradores deben llevar a cabo una entrega adecuada de su puesto de trabajo a su jefe inmediato o a quien este delegue, así mismo, los recursos tecnológicos y activos de información proporcionados.</li>
              <li>El departamento de TI debe recibir los equipos de trabajo fijo y/o portátil/laptop para su reasignación o disposición final, y generar copias de seguridad de la información de los colaboradores que se retiran o cambian de labores, cuando es formalmente solicitado.</li>
            </ul>
          </div>
        )
      },
      {
        section: "5.14",
        title: "Transferencia de información",
        content: (
          <div className="space-y-6 text-gray-300 text-sm">
            <div>
              <p className="font-semibold text-white mb-2">Políticas y procedimientos de transferencia de información:</p>
              <p className="text-qualtop-orange font-medium mb-1">Responsabilidad del departamento de TI</p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Definir herramientas con mecanismos de acceso y privilegios mediante protocolos seguros <strong>(FTPs, HTTPs, SSL o TLS)</strong> previa autorización.</li>
                <li>Configurar en la consola de Google Workspace que la compartición fuera del dominio genere una advertencia y quede registrada en auditoría, ejecutando revisiones trimestrales para revocar accesos excedidos.</li>
              </ul>

              <p className="text-qualtop-orange font-medium mb-1">Responsabilidad de todos los usuarios</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Analizar la confidencialidad antes de transferir. Envío de información sensible externa será por correo previa autorización y por medios seguros. Prohibida la transferencia a dispositivos USB u otros externos no autorizados, así como el uso de correos personales.</li>
                <li><strong>Compartición interna:</strong> Preferentemente mediante Unidades compartidas, asignando el permiso mínimo necesario <strong>(Lector por defecto; Editor solo para colaboración activa)</strong>. No usar "Cualquier persona con el enlace" para uso interno o confidencial (solo para documentos Públicos). Enlaces externos expiran en máximo 30 días naturales.</li>
                <li><strong>Compartición externa:</strong> Requiere autorización previa del dueño. Archivos externos serán configurados obligatoriamente como \"Solo lectura\" <strong>(Lector)</strong> con una expiración máxima de 15 días naturales renovables. Queda prohibido compartir carpetas completas externamente, solo archivos individuales.</li>
                <li><strong className="text-white">No está permitido el envío de archivos que contengan extensiones ejecutables (.exe, .bat, .cmd, .msi, .ps1) bajo ninguna circunstancia.</strong></li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4 bg-white/5 p-4 rounded-xl">
              <p className="font-semibold text-white mb-2">Protocolo de Solicitud de Información de Clientes a Terceros:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Ante la solicitud de un tercero de datos confidenciales del cliente, el colaborador generará el documento <em>Transferencia de información</em> indicando datos, destinatario y finalidad.</li>
                <li>Contactar al Cliente para presentar el documento y pedir autorización por escrito.</li>
                <li>Si aprueba (validando firma), se comparte la información. Si rechaza, se notifica la negativa al tercero.</li>
              </ol>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white mb-2">Mensajería electrónica:</p>
              <p className="text-qualtop-orange font-medium mb-1">Responsabilidad del departamento de TI</p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Al dar de baja un colaborador, redireccionar el correo a la persona designada por el jefe de área por el periodo establecido.</li>
                <li>Las cuentas se asignan bajo el mínimo privilegio. El uso compartido o mal uso resultará en acciones disciplinarias conforme al Reglamento Interno de Trabajo.</li>
                <li>Se deshabilitarán las cuentas inactivas por más de <strong>90 días</strong> (monitoreado mensualmente contra HeadCount). Cuentas de servicio críticas quedan exentas y bajo monitoreo especial.</li>
              </ul>
              <p className="text-qualtop-orange font-medium mb-1">Responsabilidad de todos los usuarios</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>La cuenta es individual; está prohibido usar cuentas ajenas. Reactivaciones se solicitan por ticket justificando el acceso.</li>
                <li>Prohibido el envío de cadenas de mensajes comerciales, políticos, religiosos, discriminatorios o pornografía.</li>
                <li>Los correos deben respetar el estándar de imagen corporativa, conservando el mensaje legal de confidencialidad y aviso de privacidad.</li>
              </ul>
            </div>
            <p className="text-xs italic text-gray-500 mt-2">Nota: Otras políticas se encuentran en 5.17, 7.10 <strong>(Transferencia de medios físicos)</strong> y 8.7 Controles contra el código malicioso.</p>
          </div>
        )
      },
      {
        section: "5.15",
        title: "Control de acceso",
        content: (
          <div className="space-y-5 text-gray-300">
            <p>Todo el colaborador que requiera un usuario de Jira Service Management deberá ser autorizado por Gerente de PMO o Analista de PMO mediante un comentario dentro del mismo ticket o correo.</p>
            <p>Para cualquier acceso o cambio en las herramientas deberán ser solicitados mediante correo o un ticket de tipo Alta y baja de usuario de herramientas QG en el Portal de Servicios y ser autorizados por el dueño de la información mediante un comentario dentro del mismo ticket o correo.</p>
            <p>En caso de que algún jefe de área solicita un ticket de acceso, usuario u otro, no será necesaria la autorización en el ticket o correo, se considera autorizado automáticamente.</p>
            <p>El área de THDO es responsable de notificar la baja de personal mediante un correo electrónico, según lo especificado en el proceso Baja de Personal.</p>
            <p>El Gerente de Infraestructura y Soporte de TI es responsable de la gestión y administración integral de todas las herramientas tecnológicas de la organización, en calidad de superadministrador. Cada sistema es administrado por el Responsable asignado a esa herramienta, según lo indicado en el Control de Acceso Privilegiado.</p>
            <p>El Coordinador de PMO es responsable de la asignación de permisos en espacios de Confluence y proyectos en jira solamente para los proyectos de operaciones, esto aplica a: Proyectos de desarrollo de software a la medida, garantía, certificación de aplicaciones, equipos extendidos, mesa de ayuda <strong>(soporte y mantenimiento de sistemas)</strong>, media y cloud. Dichos permisos deben ser solicitados con un ticket en tipo de solicitud Permisos Administrativos desde el Portal de Servicios.</p>
            
            {/* Tabla de Matriz */}
            <div className="mt-6">
              <p className="font-semibold text-white mb-3">Los permisos en Google Drive se asignarán conforme a la siguiente matriz:</p>
              <div className="bg-[#111] border border-white/10 rounded-xl overflow-x-auto shadow-lg">
                <table className="w-full text-sm text-left text-gray-300">
                  <thead className="bg-[#1a1a1a] text-qualtop-orange border-b border-white/10">
                    <tr>
                      <th className="py-4 px-6 border-r border-white/10 font-semibold tracking-wide">Rol</th>
                      <th className="py-4 px-6 border-r border-white/10 font-semibold tracking-wide">Permisos en Drive</th>
                      <th className="py-4 px-6 font-semibold tracking-wide">Alcance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 bg-[#0a0a0a]">
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-medium text-white border-r border-white/5">Dirección / Alta Gerencia</td>
                      <td className="py-4 px-6 border-r border-white/5">Lectura, escritura, compartición externa autorizada</td>
                      <td className="py-4 px-6">Unidades compartidas estratégicas</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-medium text-white border-r border-white/5">Gerentes / Líderes de Área</td>
                      <td className="py-4 px-6 border-r border-white/5">Lectura, escritura, compartición interna</td>
                      <td className="py-4 px-6">Unidades compartidas de su área</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-medium text-white border-r border-white/5">Colaboradores operativos</td>
                      <td className="py-4 px-6 border-r border-white/5">Lectura, escritura según asignación</td>
                      <td className="py-4 px-6">Carpetas de proyecto asignadas</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-medium text-white border-r border-white/5">Personal externo / Visitas</td>
                      <td className="py-4 px-6 border-r border-white/5">Solo lectura o sin acceso</td>
                      <td className="py-4 px-6">Previa autorización del dueño</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-medium text-white border-r border-white/5">Cuentas de servicio</td>
                      <td className="py-4 px-6 border-r border-white/5">Según configuración técnica</td>
                      <td className="py-4 px-6">Documentado en Control de Acceso Privilegiado</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm italic text-gray-500 mt-3">Nota: La asignación de permisos superiores a los definidos en esta matriz requiere autorización expresa del dueño de la información mediante un ticket de tipo Solicitud de Permisos Administrativos en el Portal de Servicios.</p>
              <p className="text-sm italic text-gray-500 mt-1">Algunas otras políticas se encuentran en el punto 7.2 Controles de entrada física.</p>
            </div>

            {/* Acceso a redes */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="font-semibold text-white mb-2">Acceso a redes y los servicios de red:</p>
              
              <p className="text-qualtop-orange font-medium mt-3 mb-2">Responsabilidad del departamento de TI</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Asegurar que las redes inalámbricas de la organización cuenten con métodos de autenticación que evite accesos no autorizados.</li>
                <li>El Gerente de Infraestructura y Soporte de TI debe autorizar los cambios a las configuraciones de red.</li>
                <li>El Analista de soporte debe autorizar la creación o modificación de las cuentas de acceso a las redes o recursos de red.</li>
                <li>El Analista de soporte debe verificar periódicamente los controles de acceso para los usuarios provistos por externos/visitas, con el fin de revisar que dichos usuarios tengan acceso permitido únicamente a aquellos recursos de red y servicios de la plataforma tecnológica para los que fueron autorizados.</li>
              </ul>

              <p className="text-qualtop-orange font-medium mt-6 mb-2">Responsabilidad de todos los usuarios</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Cuando un colaborador o personal externo/visita requiera el acceso a alguna red de datos se deberán poner en contacto mediante cualquier medio de comunicación con el personal de TI.</li>
                <li>Los equipos de cómputo que se conecten o deseen conectarse a las redes de datos de la organización deben cumplir con todos los requisitos <strong>(que cuente con antivirus)</strong> o controles para autenticarse en ellas y únicamente podrán realizar las tareas para las que fueron autorizados.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "5.16",
        title: "Registro y baja de usuario",
        content: (
          <div className="space-y-4 text-gray-300">
            <p className="font-semibold text-white mb-2">Registro y cancelación de usuarios:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Para el registro de usuarios en las plataformas tecnológicas se deberá seguir lo indicado en el proceso <strong>/wiki/spaces/GQPYA/pages/882835481</strong>.</li>
              <li>Para la modificación de usuarios en las plataformas tecnológicas se deberá seguir lo indicado en el proceso <strong>/wiki/spaces/GQPYA/pages/882507821</strong>.</li>
              <li>Para la cancelación o baja de usuarios en las plataformas tecnológicas se deberá seguir el proceso <strong>/wiki/spaces/GQPYA/pages/902398145</strong>.</li>
            </ul>
          </div>
        )
      },
      {
        section: "5.17",
        title: "Autenticación de información",
        content: (
          <div className="space-y-6 text-gray-300">
            <div>
              <p className="font-semibold text-white mb-2">Gestión de información secreta de autentificación de los usuarios:</p>
              <p className="text-qualtop-orange font-medium mb-1">Responsabilidad del departamento de TI</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>En caso de algún cambio en los lineamientos de definición de contraseñas será responsabilidad del Gerente de Infraestructura y Soporte de TI.</li>
                <li>El área de TI nunca compartirá usuario y contraseña juntos, deberán viajar en distinto medio o canal.</li>
                <li>Las contraseñas de las redes deberán estar formadas por lo menos con una combinación de: letras en mayúsculas, minúsculas, números y caracteres especiales. Con una longitud mínima de 8 caracteres.</li>
                <li>Cambiar o generar las contraseñas de consolas y administración de aplicativos por lo menos cada 90 días.</li>
              </ul>
              
              <p className="text-qualtop-orange font-medium mb-1">Responsabilidad de los usuarios</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Después de iniciar sesión por primera vez, se recomienda modificar la contraseña asignada por el administrador, siempre y cuando el aplicativo lo permita, alineada a los lineamientos organizacionales.</li>
                <li>El resguardo de la información para contraseñas de equipos y sistemas deberá contar con: Longitud mínima de 8 dígitos para personal operativo y Staff, mínimo una mayúscula, minúsculas, mínimo un dígito numérico, mínimo un carácter especial <strong>(por ejemplo: !, $, #, %)</strong>.</li>
                <li>Cambiar o generar las contraseñas de sistemas y aplicaciones con un máximo de 180 días.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white mb-2">Uso de información secreta de autentificación (Responsabilidad de usuarios):</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Hacerse responsables de las acciones realizadas en la plataforma tecnológica, servicios de red y sistemas, así como del usuario y contraseña asignados. No deben compartirlos con otros colaboradores o con personal externo/visita.</li>
                <li>Atender los lineamientos para la configuración de contraseñas implantados por la organización.</li>
                <li><strong className="text-white">Las contraseñas no deben estar escritas en hojas de papel, post-it u otros disponibles.</strong></li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white mb-2">Sistemas de administración de contraseñas:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Administradores:</strong> Establecer cuentas personalizadas con los privilegios correspondientes para cada uno de los administradores de servicios de red y sistemas.</li>
                <li><strong>Departamento de TI:</strong> Validar que las contraseñas de los equipos de cómputo cumplan con la política establecida.</li>
                <li><strong>Usuarios:</strong> Asegurar que no se despliegan en la pantalla las contraseñas ingresadas. Usar una bóveda de contraseñas del navegador está permitido.</li>
                <li>Ante bloqueos u olvido, registrar un ticket de Solicitud de Permisos Administrativos en el Portal de Servicios y seguir las instrucciones del link temporal. Ante sospechas de vulnerabilidad, realizar un cambio inmediato omitiendo contraseñas anteriores.</li>
              </ul>
              <p className="text-xs italic text-gray-500 mt-2">Nota: Otras políticas se encuentran en 5.17 y 8.5 Procedimientos seguros de inicio de sesión.</p>
            </div>
          </div>
        )
      },
      {
        section: "5.18",
        title: "Derechos de acceso",
        content: (
          <div className="space-y-6 text-gray-300">
            <div>
              <p className="font-semibold text-white mb-2">Eliminación o ajuste de los derechos de acceso:</p>
              <p className="mb-2">Los administradores de las plataformas tecnológicas deben asegurarse que los usuarios o perfiles de usuario que tienen asignados por defecto los diferentes recursos sean inhabilitados o eliminados según lo definido por el proceso Baja de Personal y <strong>/wiki/spaces/GQPYA/pages/882507821</strong>.</p>
              <p><strong>Responsabilidad de los jefes de área:</strong> Avisar por medio de tipo de solicitud Solicitud de Permisos Administrativos en el Portal de Servicios, cualquier modificación de las cuentas de acceso de los recursos tecnológicos y sistemas de información de la organización.</p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white mb-2">Revisión de los derechos de acceso de usuario (Responsabilidad de los administradores):</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Verificar y ratificar mensualmente, en conjunto con el área de THDO, el listado de usuarios activos en la herramienta Atlassian.</li>
                <li>Remover de los grupos de usuarios o permisos a todos aquellos que fueron dados de baja. En caso de reingresar se deberá asegurar que la configuración de permisos sea consistente a sus nuevas actividades.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "5.23",
        title: "Seguridad de la información para el uso de servicios en la nube",
        content: (
          <div className="space-y-6 text-gray-300 text-sm">
            <p className="font-semibold text-white mb-1">Criterios mínimos para contratar un servicio en la nube:</p>
            <p className="mb-3">Porcentaje de disponibilidad del servicio del 99%, continuidad del servicio, protección de datos y confidencialidad, garantía, soporte técnico 24/7/365, SLA de servicio, cumplimiento de estándares reconocidos <strong>(ISO 27000, SOC2)</strong>, capacidades de gestión de identidad y acceso <strong>(IAM)</strong>, procedimientos de respuesta a incidentes claros y localización de centros de datos geográficamente distribuidos con transparencia de precios.</p>
            <p className="text-xs italic text-gray-500 mb-2">Para Atlassian Cloud los requerimientos se definen en su sitio legal. Las responsabilidades se consultan en /wiki/spaces/CDS1/pages/3622404097. El Gerente de TI deberá revisar y aprobar que se cuenten con los requerimientos mínimos antes de contratar.</p>
            
            <div className="border-t border-white/10 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                <p className="font-semibold text-white mb-2">Cifrado de Datos y Control:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>En Reposo:</strong> Cifrado robusto <strong>(por ejemplo, AES-256)</strong>. Google Drive lo incluye por defecto.</li>
                  <li><strong>En Tránsito:</strong> Protocolos seguros como TLS 1.2 o superior.</li>
                  <li><strong>Acceso:</strong> Requerir Autenticación Multifactor <strong>(MFA)</strong> e implementar gestión de identidades basada en roles <strong>(RBAC)</strong>.</li>
                  <li><strong>Restricciones IRM:</strong> Deshabilitar descarga, copia e impresión en documentos Confidenciales o Restringidos para usuarios de solo lectura.</li>
                  <li><strong>Reglas DLP:</strong> Configurar en Google Workspace para detectar y prevenir compartición de información sensible, complementando la política 8.12.</li>
                </ul>
              </div>
              <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                <p className="font-semibold text-white mb-2">Copias de Seguridad y Eliminación:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Backups:</strong> Copias automatizadas periódicas de datos críticos, cifradas y guardadas en ubicaciones seguras y redundantes.</li>
                  <li><strong>Eliminación TI/Propietario:</strong> Identificar datos obsoletos, duplicados o al final de su ciclo de vida, confirmando que no estén sujetos a retenciones legales o contractuales. Documentar de forma clara la justificación.</li>
                  <li><strong>Clasificación:</strong> Clasificar datos según nivel de sensibilidad en base a la sección de Identificación de documentos de <strong>/wiki/spaces/GQPYA/pages/872317256</strong>.</li>
                  <li><strong>Ejecución:</strong> TI ejecutará la eliminación utilizando las herramientas y métodos definidos en el Proceso de Eliminación Segura de Datos en la Nube Google GCP _ AWS.</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        section: "5.24",
        title: "Responsabilidades y procedimientos",
        content: (
          <div className="space-y-6 text-gray-300">
            <div>
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad del Gerente de Infraestructura y Soporte de TI:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Establecer responsabilidades y procedimientos para asegurar una respuesta rápida, ordenada y efectiva frente a los incidentes de seguridad de la información.</li>
                <li>Evaluar todos los incidentes de seguridad de acuerdo a sus circunstancias particulares y escalar al comité de seguridad de la información aquellos en los que se considere pertinente.</li>
                <li>Designar personal calificado, para investigar adecuadamente los incidentes de seguridad reportados, identificando las causas, realizando una investigación exhaustiva, proporcionando las soluciones y finalmente previniendo su recurrencia.</li>
                <li>Crear bases de conocimiento para los incidentes de seguridad presentados con sus respectivas soluciones, con el fin de reducir el tiempo de respuesta para los incidentes futuros, partiendo de dichas bases de conocimiento.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad del comité de seguridad de la información:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Debe analizar los incidentes de seguridad que le son escalados y activar el procedimiento de contacto con las autoridades, cuando lo consideren necesario.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad de todos los usuarios:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Es responsabilidad de los colaboradores, propietarios de los activos de información y del personal externo/visitante reportar cualquier evento o incidente relacionado con la información y/o los recursos tecnológicos con la mayor prontitud posible informando al Gerente de Infraestructura y Soporte de TI mediante un ticket de Incidente de seguridad de la información en el Portal de Servicios.</li>
                <li>En caso de conocer la pérdida o divulgación no autorizada de información clasificada como uso interno, reservada o restringida, los colaboradores deben registrar un ticket de Incidente de seguridad de la información en el Portal de Servicios para que se le dé seguimiento.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "5.29",
        title: "Disrupción y Continuidad de la Información",
        content: (
          <div className="space-y-6 text-gray-300">
            <div>
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad del departamento de TI:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Elaborar un plan de recuperación ante desastres y un conjunto de procedimientos de contingencia, recuperación y retorno a la normalidad para cada uno de los servicios y sistemas prestados.</li>
                <li>El Gerente de Infraestructura y Soporte de TI en conjunto con el Responsable de Continuidad debe reconocer las situaciones que serán identificadas como emergencia o desastre para la organización, los procesos o las áreas y determinar cómo se debe actuar sobre las mismas.</li>
                <li>Liderar los temas relacionados con la continuidad del negocio y la recuperación ante desastres mediante las actividades desempeñadas por los Analistas de Soporte.</li>
                <li>Realizar los análisis de impacto al negocio y los análisis de riesgos de continuidad para, posteriormente proponer posibles estrategias de recuperación en caso de activarse el plan de contingencia o continuidad, con las consideraciones de seguridad de la información a que haya lugar.</li>
                <li>Con apoyo de los Analistas de Soporte realizarán un análisis de impacto y deberán seleccionar las estrategias de recuperación más convenientes para la organización.</li>
                <li>Validar que los procedimientos de contingencia, recuperación y retorno a la normalidad incluyan consideraciones de seguridad de la información.</li>
                <li>Seleccionar por lo menos un escenario de los especificados en el Plan de Contingencia/Plan de Recuperación de Funciones/Servicios Esenciales para realizar pruebas de recuperación ante desastres y/o continuidad de negocio por lo menos una vez al año, verificando la seguridad de la información durante su realización y la documentación de dichas pruebas.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad de los jefes administrativos:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Identificar en conjunto con el Responsable de Continuidad las Funciones/Servicios Esenciales y los procedimientos de continuidad que podrían ser utilizados en caso de un evento adverso, teniendo en cuenta la seguridad de la información.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "5.31",
        title: "Identificación de requerimientos legales, estatutarios, regulatorios y contractuales",
        content: (
          <div className="space-y-4 text-gray-300">
            <p className="font-semibold text-white mb-2">Regulación de controles criptográficos:</p>
            <p>Esta política aplicará única y exclusivamente a aquellos clientes que por su condición y tipo de contrato necesiten y contemplen controles criptográficos dentro de su operación. La organización se apegará a las directrices definidas por el cliente.</p>
          </div>
        )
      },
      {
        section: "5.32",
        title: "Derechos de propiedad intelectual",
        content: (
          <div className="space-y-4 text-gray-300">
            <p>La política general de la empresa es que una persona que crea una obra privada es el autor de esa obra, a menos que sea “trabajo por contrato”. Un “trabajo hecho por contrato” es un trabajo preparado por un empleado dentro del ámbito de su empleo o un trabajo especialmente ordenado o comisionado para su uso como una contribución a un trabajo colectivo. La empresa paga a sus empleados por el trabajo, algunos los cuales incluye crear o mejorar productos o sistemas que pueden ser o no implementados. Por lo tanto, la compañía seguirá siendo el propietario de toda la propiedad intelectual generada por sus empleados y esto seguirá siendo de nuestra propiedad, incluso después de que aquellos empleados hayan dejado la empresa.</p>
            <p>Los secretos comerciales son una parte de nuestra propiedad intelectual y puede ser tangible o intangible, <strong>(por ejemplo, una estrategia para aumentar la eficiencia de los trabajadores)</strong>. Nuestra expectativa es que los empleados actuales y anteriores mantengan nuestros secretos comerciales.</p>
            <p className="text-sm italic text-gray-500 pt-2 border-t border-white/5">A menos que exista un acuerdo por escrito firmado especificando la propiedad o sesión de derechos, la compañía no es propiedad de los derechos de propiedad intelectual de un trabajo por encargo que se lleve a cabo por un consultor o un contratista independiente.</p>
          </div>
        )
      },
      {
        section: "5.34",
        title: "Protección y privacidad de la información de carácter personal",
        content: (
          <div className="space-y-4 text-gray-300">
            <p>Dentro de la organización debe existir un rol responsable de seguimiento a las peticiones de solicitudes ARCO. El solicitante deberá enviar su petición al correo establecido por la organización <a href="mailto:privacidad@qualtop.com" className="text-qualtop-orange hover:underline font-medium">privacidad@qualtop.com</a>, donde el responsable compartirá el formato <strong>F-ARCO-Qualtop.pdf</strong> para completar la información y proceder.</p>
            
            <div className="bg-white/5 p-4 rounded-xl space-y-3">
              <p>El área de Talento Humano y Desarrollo Organizacional es responsable de la documentación de los colaboradores. Si un colaborador o ex colaborador requiere información mediante el formato del aviso de privacidad:</p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>El solicitante llenará el formato de derechos ARCO y lo enviará al correo oficial junto con la documentación señalada.</li>
                <li>El encargado revisará la información y de proceder solicitará al área de Talento Humano la información requerida (en caso contrario, expondrá las razones de la negativa).</li>
                <li>El área de Talento Humano enviará la información al encargado de la gestión de privacidad.</li>
              </ul>
              <p className="text-xs pt-2 border-t border-white/5">En caso de que algún cliente, proveedor, partner o aliado requiera información mediante el aviso de privacidad, se seguirá el proceso anterior sustituyendo al área de Talento Humano y Desarrollo Organizacional por el área de <strong>Administración y finanzas</strong>.</p>
            </div>
          </div>
        )
      },
      {
        section: "5.37",
        title: "Documentación de procedimientos operacionales",
        content: (
          <div className="space-y-4 text-gray-300">
            <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad del departamento de TI:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>El conjunto de información técnica de la plataforma tecnológica deberá estar disponible para las personas que ejecutan la configuración y operación de los sistemas operativos, firmware, servicios de red, bases de datos y sistemas de información que conforman la plataforma tecnológica.</li>
              <li>Es el encargado de la operación y administración de los recursos tecnológicos que apoyan los procesos, asignarán funciones específicas a sus colaboradores, quienes deben efectuar la operación y administración de dichos recursos tecnológicos, utilizando y manteniendo la documentación de los procesos, manuales de servicios o instructivos operativos para la ejecución de las actividades.</li>
            </ul>
            
            <p className="font-semibold text-qualtop-orange mt-4 mb-2">Responsabilidad de todos los usuarios:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Cuando se detecte alguna actualización o la necesidad de generar algún proceso operativo se deberá registrar por medio del proceso de <strong>/wiki/spaces/GQPYA/pages/19169393</strong>.</li>
            </ul>
          </div>
        )
      }
    ]
  },

 // ==========================================================================
  // --- SECCIÓN 2: PERSONAS ---
  // ==========================================================================
  {
    id: "personas",
    title: "Personas",
    icon: <Users size={20} />, // (Recuerda asegurarte de que el icono esté importado arriba)
    items: [
      {
        section: "6.1",
        title: "Investigación de antecedentes",
        content: (
          <div className="space-y-4 text-gray-300">
            <p>El líder de área/solicitante deberá solicitar el ticket de nuevo ingreso con al menos 2 días laborales de anticipación al ingreso del colaborador.</p>
            <p>El líder de área/solicitante debe indicar las características del equipo dentro del ticket de nuevo ingreso.</p>
          </div>
        )
      },
      {
        section: "6.5",
        title: "Responsabilidades ante la finalización o cambio",
        content: (
          <div className="space-y-5 text-gray-300">
            <div>
              <p className="font-semibold text-white mb-2">Responsabilidad del departamento de TI:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Los respaldos de correo electrónico se realizarán solo por petición indicado en el mismo ticket de baja de personal o cambio de puesto.</li>
                <li>Almacenar la carta responsiva física y digital <strong>(Formato Carta de Resguardo)</strong>, firmada por el usuario, por lo menos tres meses después de la desvinculación.</li>
                <li>La responsiva en formato digital se deberá resguardar en Magnus.</li>
                <li>La responsiva en formato físico, se deberá resguardar en el archivero y entregar al colaborador una copia.</li>
              </ul>
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white mb-2">Cambio de puesto:</p>
              <p>Cuando un colaborador cambie de puesto e identifiquen que las características del equipo deban cambiar, el líder de área/solicitante deberá registrar un ticket de tipo Solicitud de aplicaciones, comunicaciones y equipamiento por medio del Portal de Servicios solicitando el cambio con al menos 2 días laborales de anticipación al ingreso del colaborador.</p>
            </div>
          </div>
        )
      },
      {
        section: "6.7",
        title: "Teletrabajo",
        content: (
          <div className="space-y-6 text-gray-300">
            
            {/* USO DE CONEXIONES REMOTAS */}
            <div>
              <p className="font-semibold text-white mb-2">Uso de conexiones remotas:</p>
              
              <p className="text-qualtop-orange font-medium mt-3 mb-2">Responsabilidad de todos los usuarios</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Los colaboradores que requieran acceso a una conexión de VPN deberán solicitarla a través del Portal de Servicios y ser aprobada por su jefe inmediato, excepto cuando el jefe inmediato realizó la solicitud, después de su aprobación podrá establecer conexión únicamente con las credenciales proporcionadas.</li>
                <li>Los usuarios únicamente deben acceder a los aplicativos o herramientas por medio de los equipos asignados por la organización y, bajo ninguna circunstancia, en computadoras públicas, de hoteles o cafés internet, entre otros.</li>
                <li className="text-qualtop-orange font-medium">Bajo ninguna circunstancia se debe utilizar un equipo de cómputo personal para el desempeño de las actividades.</li>
                <li>Toda información creada por el desarrollo de las actividades de un colaborador será considerada como propiedad de la organización.</li>
                <li>Es de carácter mandatorio almacenar la información de la organización en las herramientas establecidas.</li>
                <li>Esta estrictamente prohibido cambiar la configuración del software de acceso remoto <strong>(VPN)</strong> establecida por el departamento de Infraestructura y Soporte TI.</li>
                <li>El equipo asignado deberá ser utilizado solamente por el colaborador para fines laborales.</li>
                <li>Las sesiones de videoconferencia de zoom se solicitan al administrador mediante algún medio de comunicación, en caso de que se requerir la grabación de esta, notificarlo en la misma solicitud.</li>
                <li>Permitir la verificación del cumplimiento de estas políticas por el área de Infraestructura y Soporte TI.</li>
              </ul>

              <p className="text-qualtop-orange font-medium mt-4 mb-2">Responsabilidad del departamento de TI</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Las herramientas que se utilizan para el soporte vía conexión remota de TI son Team Viewer y AnyDesk.</li>
              </ul>
            </div>

            {/* TRABAJO REMOTO */}
            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white mb-2">Trabajo remoto:</p>
              
              <p className="text-qualtop-orange font-medium mt-3 mb-2">Responsabilidad del departamento de TI</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Asegurar que los equipos tengan instalado el agente del antivirus Kaspersky para el control del filtrado de contenido y conexiones de dispositivo de almacenamiento externo.</li>
                <li>Administrar la herramienta autorizada por la organización para llevar a cabo videoconferencias en Zoom.</li>
                <li>Cada administrador de Zoom es responsable de gestionar las sesiones de videoconferencia.</li>
                <li>Las sesiones que se graben se almacenarán en la nube en la cuenta de Zoom por 20 días hábiles.</li>
                <li>Las herramientas permitidas para llevar a cabo videoconferencias son Zoom, Teams y Google Chat/Google Meet.</li>
              </ul>
            </div>

          </div>
        )
      }
    ]
  },

  // ==========================================================================
  // --- SECCIÓN 3: FÍSICOS ---
  // ==========================================================================
  {
    id: "fisicos",
    title: "Físicos",
    icon: <Building size={20} />, // (Recuerda asegurarte de que el icono esté importado arriba)
    items: [
      {
        section: "7.1",
        title: "Perímetro de seguridad física",
        content: (
          <div className="space-y-6 text-gray-300">
            <div>
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad del departamento de TI:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Las solicitudes de acceso al SITE o a las zonas de cableado pueden ser registradas por correo electrónico y deben ser aprobadas por colaboradores del departamento de TI autorizados; no obstante, los visitantes siempre deberán estar acompañados de un colaborador de dicha dirección durante su visita al SITE o las zonas de cableado.</li>
                <li>No se permite el ingreso al centro de datos <strong>(SITE)</strong>, al personal que no esté expresamente autorizado. Se debe llevar un control de ingreso y salida del personal que visita el centro de datos. En el centro de datos debe disponerse de un formato para el registro, al iniciar y finalizar la actividad a realizar.</li>
                <li>Velar porque los recursos de la plataforma tecnológica ubicados en el SITE se encuentran protegidos contra fallas o interrupciones eléctricas.</li>
                <li>Certificar que el SITE y las zonas de cableado que están bajo su custodia, se encuentren separados de áreas que tengan líquidos inflamables o que corran riesgo de inundaciones e incendios.</li>
                <li>En caso de alguna falla o interrupción eléctrica asegurar que las labores de mantenimiento dentro de las zonas de cableado y del SITE sean realizadas por personal idóneo y apropiadamente autorizado e identificado.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidades de los jefes administrativos:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Cuando se encuentren en áreas restringidas deben velar mediante monitoreo por la efectividad de los controles de acceso físico implantados en sus áreas.</li>
                <li>Cuando se encuentren en áreas restringidas deben autorizar cualquier ingreso temporal a sus áreas, evaluando la pertinencia del ingreso; así mismo, deben delegar en personal del área el registro y supervisión de cada ingreso a sus áreas.</li>
                <li>Velar porque las contraseñas de sistemas de alarma, cajas fuertes, llaves y otros mecanismos de seguridad de acceso a sus áreas solo sean utilizados por los colaboradores autorizados y, salvo situaciones de emergencia u otro tipo de eventos que por su naturaleza lo requieran, estos no sean transferidos a otros colaboradores de la organización.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad de todos los usuarios:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Los ingresos y egresos de personal a las instalaciones deben ser registrados en la bitácora digital que se encuentra en la tableta asignada en la recepción por consiguiente, los colaboradores y personal externo/visita deben cumplir completamente con los controles físicos implantados.</li>
                <li>Todas las áreas destinadas al procesamiento o almacenamiento de información sensible, así como aquellas en las que se encuentren los equipos y demás infraestructura de soporte a los sistemas de información y comunicaciones, se consideran áreas de acceso restringido.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "7.2",
        title: "Controles de entrada física",
        content: (
          <div className="space-y-6 text-gray-300">
            <div>
              <p className="font-semibold text-white mb-2">Para el ingreso a las instalaciones de QUALTOP:</p>
              <p className="mb-2">Dado que las operaciones en la oficina de representación son limitadas, y no se resguarda información sensible en dichas instalaciones, su uso se restringe principalmente a actividades de capacitación y bienvenida de nuevos ingresos. Por lo anterior, se aplican los siguientes controles de acceso:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Las visitas o nuevos colaboradores deben ser notificadas con al menos 24 horas de anticipación a través de canales oficiales <strong>(correo electrónico / chat de Google)</strong> e incluir: Nombre y Apellido de la visita o ingreso, empresa de procedencia <strong>(si aplica)</strong>, motivo de la visita, nombre del colaborador que la recibe, empresa que visita <strong>(Qualtop)</strong> y fecha de la visita.</li>
                <li>A su llegada, el visitante o nuevo colaborador deberá presentar una identificación oficial <strong>(el acceso no será autorizado sin este requisito)</strong>, indicar el nombre del colaborador que lo recibirá y registrarse en la bitácora del edificio, donde se le entregará un gafete de visitante.</li>
                <li>El departamento de administración de personal y capacitación será responsable de custodiar la llave de acceso y la tarjeta RFID, llevando un registro de entrega firmado por el colaborador que la utilice. El colaborador que recibe debe acompañarlo para el acceso a las instalaciones.</li>
                <li>Para los colaboradores que tengan una responsiva del equipo no es necesario el registro en la bitácora del edificio que se encuentra en la recepción. Deberán seguir los lineamientos definidos para el ingreso y permanencia dentro en las instalaciones.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-qualtop-orange mb-2">Prohibiciones estrictas en cualquiera de las instalaciones:</p>
              <ul className="list-disc pl-5 space-y-2 text-qualtop-orange">
                <li>Ingresar con armas de fuego o punzocortantes.</li>
                <li>Acceder bajo los efectos de alcohol o cualquier tipo de droga.</li>
                <li>Incumplir los lineamientos o normas de comportamiento profesional establecidos para permanecer en una oficina.</li>
                <li className="text-white font-medium list-none mt-2">La organización se reserva el derecho de solicitar el retiro inmediato de cualquier persona que incumpla estas disposiciones.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "7.3",
        title: "Seguridad de oficinas, despachos y recursos",
        content: (
          <div className="space-y-4 text-gray-300">
            <p className="font-semibold text-white mb-2">Aseguramiento de oficinas, salas e instalaciones:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Las políticas aplicables para el aseguramiento de oficinas, salas e instalaciones se encuentran en las Políticas de Seguridad e Higiene.</li>
              <li>El acceso al SITE será mediante el uso de llave, la cual es responsabilidad del área de TI.</li>
              <li className="text-qualtop-orange font-medium">No se permite el ingreso de alimentos y bebidas al centro de datos (SITE).</li>
              <li>Se deben mantener y monitorear las condiciones de temperatura del centro de datos <strong>(SITE)</strong>.</li>
              <li>Se prohíbe al personal ingresar o trasladar recursos tecnológicos del centro de datos <strong>(SITE)</strong> sin previa autorización por el Gerente de Infraestructura y soporte TI, exceptuando los equipos portátiles y sus accesorios.</li>
            </ul>
          </div>
        )
      },
      {
        section: "7.4",
        title: "Monitoreo de la seguridad física",
        content: (
          <div className="space-y-4 text-gray-300">
            <ul className="list-disc pl-5 space-y-2">
              <li>Limitar el acceso digital a las cámaras y la infraestructura que lo soporta a todo el personal no autorizado, el Gerente de Infraestructura y Soporte TI es quien gestiona el control de acceso y visualización de las cámaras.</li>
              <li>Solo está permitido el acceso de visualización de las cámaras para los Analistas de Soporte TI designados.</li>
              <li>Se debe contar con un almacenamiento de 30 días de grabaciones de las cámaras para luego depurar la información.</li>
              <li>El monitoreo continuo de las cámaras se realiza con la herramienta Site24x7, la cual permite supervisar los servicios en tiempo real y generar alertas automáticas por correo electrónico ante cualquier interrupción.</li>
              <li>Asegurar que las contraseñas de acceso a las cámaras cumplan con las características de contraseña segura establecida por la organización.</li>
              <li>Las aplicaciones que son administradoras de recursos deben tener una contraseña de 12 a 25 dígitos y se debe asegurar cumplir con las características de contraseña segura.</li>
              <li>Es responsabilidad del Gerente de Infraestructura y Soporte TI realizar cambio de contraseña de las aplicaciones administradoras de los recursos con una periodicidad de 6 meses.</li>
            </ul>

            <div className="bg-white/5 border border-white/10 rounded-lg p-5 mt-4">
              <p className="font-semibold text-white mb-2">Revisión y Escalamiento:</p>
              <p className="mb-3">La revisión de los controles físicos se realizará por el área de Procesos y Certificaciones revisando el control de acceso físico de entrada, áreas seguras, SITE, con una periodicidad trimestral.</p>
              <p className="mb-2">En caso de que una observación derivada del monitoreo de controles físicos no sea atendida o remediada dentro del tiempo establecido, se deberá implementar el siguiente protocolo de escalamiento:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li><strong className="text-white">Primer nivel:</strong> Se notificará formalmente mediante correo electrónico al responsable directo solicitándole su atención.</li>
                <li><strong className="text-white">Segundo nivel:</strong> Se notificará a su jefe directo y se fijará una nueva fecha para su resolución.</li>
                <li><strong className="text-white">Tercer nivel:</strong> Se notificará mediante correo electrónico al Director del área correspondiente.</li>
              </ol>
            </div>
          </div>
        )
      },
      {
        section: "7.6",
        title: "El trabajo en áreas seguras",
        content: (
          <div className="space-y-4 text-gray-300">
            <ul className="list-disc pl-5 space-y-2">
              <li>Los colaboradores and el personal externo/visita no deben intentar ingresar a áreas a las cuales no tengan autorización.</li>
              <li>Las políticas aplicables para el trabajo en áreas seguras se encuentran en las Políticas de Seguridad e Higiene.</li>
            </ul>
          </div>
        )
      },
      {
        section: "7.7",
        title: "Política de escritorio despejado y pantalla limpia",
        content: (
          <div className="space-y-4 text-gray-300">
            <p className="font-semibold text-white mb-2">Responsabilidad de los usuarios (Política de pantalla y escritorio limpio):</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Los colaboradores de la organización y el personal externo/visita deben asegurar que sus escritorios se encuentren libres de documentos que son utilizados durante el desarrollo de sus funciones, al terminar la jornada laboral guardar en un lugar seguro cualquier documento o medios de almacenamiento que contenga información de la organización. Cualquiera de los escritorios dentro de las instalaciones deberá de permanecer limpios de papeles y de medios de información.</li>
              <li>Es responsabilidad de cada empleado conservar la pantalla de escritorio del equipo de cómputo asignado libre de accesos directos no autorizados, y/o archivos con información crítica o sensible, en la medida de lo posible no debe tener accesos.</li>
              <li>En la pantalla de escritorio no debe de permanecer ningún icono que ejecute un programa que no sea nativo de la plataforma del sistema operativo, plataforma tecnológica o aplicativos autorizados y gestionados por el área de Infraestructura y Soporte TI.</li>
              <li>Así mismo las pantallas deberán de permanecer sin documentos y/o programas abiertos, con el fin de reducir los riesgos por pérdida de información durante o fuera de las horas de trabajo.</li>
              <li>Se deben retirar inmediatamente de la impresora los documentos con información clasificada y/o confidencial.</li>
              <li>No dejar expuesta información de uso interno, crítica o sensible cuando se reciban o encuentre cerca personal externo, sin previa autorización.</li>
              <li>Evitar dejar llaves u otro activo de acceso sobre el escritorio de trabajo cuando se ausente del lugar asignado.</li>
              <li>Evitar dejar información de uso interno visible o en pizarrones cuando se retire de la oficina o sala de juntas.</li>
            </ul>
          </div>
        )
      },
      {
        section: "7.8",
        title: "Emplazamiento y protección de equipos",
        content: (
          <div className="space-y-5 text-gray-300">
            <p className="font-semibold text-white mb-2">Ubicación y protección de equipo:</p>
            <div>
              <p className="text-qualtop-orange font-medium mb-2">Responsabilidad del departamento de TI:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Administrar el circuito cerrado de las cámaras de seguridad en las instalaciones de la organización.</li>
                <li>Realizar un monitoreo diario en tiempo real en Site 24x7 del listado de sistemas críticos incluyendo el sistema de videovigilancia.</li>
              </ul>
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="text-qualtop-orange font-medium mb-2">Responsabilidad de todos los usuarios:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Seguir los lineamientos de señalización especificados en el layout de la oficina identificado dentro del Plan de Continuidad para proteger la confidencialidad, integridad y disponibilidad de los recursos tecnológicos ubicados en las zonas restringidas.</li>
                <li>Consultar el Plan de Continuidad para conocer la señalización especificada para las zonas en el layout de la oficina.</li>
                <li>Seguir las Políticas de Seguridad e Higiene para la protección de los equipos.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "7.9",
        title: "Seguridad de los equipos fuera de las instalaciones",
        content: (
          <div className="space-y-4 text-gray-300">
            <p className="font-semibold text-white mb-2">Es responsabilidad de todos los usuarios:</p>
            <p>Garantizar el uso y transporte adecuado de los equipos portátiles <strong>(laptops)</strong> y cualquier recurso tecnológico. Estos deben ser transportados con las medidas de seguridad apropiadas, siempre como equipaje de mano. Además, se debe tener especial cuidado de no exponerlos a fuertes campos electromagnéticos o situaciones que comprometan su integridad física.</p>
            
            <div className="bg-qualtop-orange/10 border border-qualtop-orange/20 rounded-lg p-4 mt-2">
              <p className="font-semibold text-qualtop-orange mb-2">En caso de pérdida o robo de un equipo de cómputo fuera de las instalaciones, se debe realizar lo siguiente:</p>
              <ol className="list-decimal pl-5 space-y-1 text-white">
                <li>Informar de forma inmediata al Jefe directo y al Gerente de Infraestructura y Soporte de TI para que se inicie el trámite interno.</li>
                <li>Poner la denuncia ante la autoridad competente y dar seguimiento.</li>
                <li>Registrar un incidente de seguridad de la información en el Portal de Servicios.</li>
              </ol>
            </div>
          </div>
        )
      },
      {
        section: "7.10",
        title: "Medios de almacenamiento",
        content: (
          <div className="space-y-6 text-gray-300">
            
            {/* Gestión de medios removibles */}
            <div>
              <p className="font-semibold text-white mb-2">Gestión de medios removibles:</p>
              
              <p className="text-qualtop-orange font-medium mt-3 mb-2">Responsabilidad del departamento de TI</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Registrar la información del equipo removible en el inventario de activos.</li>
                <li>Contar con una carta responsiva <strong>(Formato Carta de Resguardo)</strong> del medio autorizado.</li>
                <li>Garantizar que los medios removibles autorizados, estén limpios de información y de malware.</li>
                <li>Mantener bloqueados todos los dispositivos de almacenamiento externo de los equipos de cómputo del personal asignado en los proyectos que cuenten con el agente de la consola de administración de Kaspersky.</li>
              </ul>

              <p className="text-qualtop-orange font-medium mt-4 mb-2">Responsabilidad de todos los usuarios</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Cuando se requiera utilizar algún medio removible se deberá solicitar el dispositivo y/o permiso temporal mediante el portal de servicios en Solicitud de Aplicaciones, Comunicaciones y Equipamiento.</li>
                <li>No almacenar la información confidencial en cualquier medio removible.</li>
                <li>No utilizar los medios removibles como medios de almacenamiento permanentes.</li>
                <li>Analizar el dispositivo antes de uso para verificar que no cuente con virus o código malicioso.</li>
                <li>Eliminar la información del dispositivo cuando ya no sea requerida.</li>
                <li>Notificar el robo pérdida del medio al personal de Soporte Técnico.</li>
                <li>Firmar una responsiva sobre el buen uso y cuidado del medio.</li>
                <li>Permitir la verificación del cumplimiento de estas políticas al área de Soporte que realiza la verificación.</li>
              </ul>
            </div>

            {/* Disposición medios */}
            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white mb-2">Disposición de medios:</p>
              <p className="mb-2">El uso de periféricos y medios de almacenamiento en los recursos de la plataforma tecnológica será reglamentado por El departamento de TI, junto con el Gerente de Infraestructura y Soporte de TI, considerando las labores realizadas por los colaboradores y su necesidad de uso.</p>
              
              <p className="text-qualtop-orange font-medium mt-3 mb-2">Responsabilidad del departamento de TI</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Autorizar el uso de periféricos o medios de almacenamiento en los equipos de cómputo de acuerdo con el perfil del cargo del colaborador solicitante.</li>
                <li>Establecer las condiciones de uso de periféricos y medios de almacenamiento en los equipos de cómputo, según lo definido en la política 8.3.1 Gestión de medios removibles.</li>
                <li>Una vez terminada la vida útil del medio de almacenamiento se deberá realizar una destrucción lógica de la información almacenada en cintas del disco duro por medio de la herramienta definida por el área de Infraestructura y Soporte TI.</li>
                <li>Después del formateo a bajo nivel el área de Infraestructura y Soporte TI, la destrucción dependerá de lo siguiente:
                  <ul className="list-circle pl-5 mt-1 space-y-1">
                    <li><strong>Equipos de cómputo propiedad de la organización:</strong> Equipos con información confidencial considerado en desuso <strong>(equipo obsoleto, desactualizado, dañado u otro)</strong>: se procederá a la destrucción física del medio, por el método que el Gerente de Infraestructura y Soporte TI considere <strong>(perforación, incineración o si se requiere contratar a un proveedor certificado)</strong> y documentarlo mediante fotografías, videos u otro, procurando almacenar los desperdicios para el manejo según las disposiciones oficiales de equipo electrónico.</li>
                    <li><strong>Equipos de cómputo arrendados:</strong> no se destruirán, solo se asegurará se realice un borrado seguro de la información que contiene.</li>
                  </ul>
                </li>
                <li>Todos los equipos <strong>(discos duros, monitores, laptop, etc.)</strong> que van a ser desechados se deberán registrar y/o actualizar en un inventario de desecho en Magnus, el cual deberán compartir con el área de administración para su aprobación y posteriormente someterlos a donación o venta, en caso de ser vendido la factura e importe deberán ser entregados al área de administración.</li>
              </ul>

              <p className="text-qualtop-orange font-medium mt-4 mb-2">Responsabilidad de todos los usuarios (colaboradores y el personal externo/visitas)</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Deben tener en cuenta las condiciones de uso de los periféricos y medios de almacenamiento establecidos por el departamento de TI, según lo definido en la política 8.3.1 Gestión de medios removibles.</li>
                <li>No deben modificar la configuración que aplique a periféricos y medios de almacenamiento establecidos por el departamento de TI.</li>
                <li>No deben utilizar medios de almacenamiento personales en los equipos de cómputo.</li>
                <li>Registrar un ticket de tipo de Solicitud de aplicaciones, Comunicaciones y Equipamiento por medio del Portal de Servicios para solicitar algún periférico o medio de almacenamiento.</li>
                <li>Está prohibido el uso de medios extraíbles salvo que exista una justificación para su uso por parte del encargado del departamento, y solo se permitirá el uso de medios de almacenamiento conocidos e identificados.</li>
              </ul>
            </div>

            {/* Transferencia de medios físicos */}
            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white mb-2">Transferencia de medios físicos:</p>
              
              <p className="text-qualtop-orange font-medium mt-3 mb-2">Responsabilidad del departamento de Talento Humano</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Cuando se va a recibir información sensible o crítica de personal externo de la organización el receptor interno de la información deberá indicarle los lineamientos mínimos de seguridad que se deben cumplir.</li>
                <li>Cuando la transferencia de información sensible o crítica sea dentro de la misma ubicación geográfica se deberá entregar de manera personal y validar la autorización e identidad de la persona quién recibirá la información.</li>
                <li>Enviar la información de uso interno por los mecanismos autorizados por la organización: Se debe utilizar un sobre cerrado y se envía con el personal de la empresa, o bien, mediante una paquetería certificada.</li>
                <li>La recepción que envía la documentación a otra sede debe llevar su registro.</li>
                <li>Al enviar información sensible o crítica en el sobre cerrado debe indicar la fecha de envío, nombre de quien envía/departamento, a quien lo envía/departamento, la documentación que contiene y la cantidad de hojas. Si el contenido de la documentación es confidencial se deberá indicar la palabra "CONFIDENCIAL".</li>
                <li>Una vez que llegue la documentación debe dirigirse a Recepción de la sede receptora, quien va a verificar que los datos que se indican en el sobre sea consistente con su contenido, quien deberá registrar la documentación recibida en una bitácora <strong>(fecha, quien entrega, que es lo que están entregando/confidencial, para quien va dirigido)</strong>.</li>
                <li>Cuando el sobre indique Confidencial por ningún motivo debe abrirse para verificar su contenido.</li>
                <li>Cuando la sede que recibe la documentación no cuenta con recepción, es responsabilidad del usuario a quien va dirigida informar la recepción de la documentación.</li>
                <li>Toda la documentación <strong>(avisos, requerimientos u otros)</strong> que envíen autoridades gubernamentales deberá recibirlo Recepción, registrarlo en la bitácora y cuando aplique enviar por correo al Especialista Legal para validar la documentación.</li>
                <li>El equipo de Talento Humano es el responsable de recibir la documentación de índole laboral, deberán notificar su recepción a la recepcionista para su registro en la Bitácora de Relación de Recepción y Entrega de Correspondencia y firmar de recibido. Para la recepción de equipos se utilizan las mismas bitácoras de envío y recepción de correspondencia.</li>
                <li>La recepcionista o persona encargada de oficina será responsable de recibir toda la correspondencia, la correspondencia puede ser interna o externa. Deberá de anotar el contenido de cada paquete o sobre registrándolo en la Bitácora de Relación de Recepción y Entrega de Correspondencia, a excepción la correspondencia que contenga la nota: “CONFIDENCIAL”. Y en ese caso solo se registrará como llegó a la oficina y a quién pertenece.</li>
                <li>Después de realizar el registro de la correspondencia se procede a informar al destinatario que ha recibido un paquete/sobre a su nombre a través de un mensaje vía Skype. Al entregar el paquete/sobre el destinatario deberá firmar en la Bitácora de Relación de Recepción y Entrega de Correspondencia.</li>
                <li>Durante los primeros 10 días del mes siguiente se tendrá que escanear y resguardar al espacio de QG-Talento Humano y Desarrollo Organizacional en la página Bitácora de envío y recepción de correspondencia.</li>
              </ul>
              
              <p className="text-qualtop-orange font-medium mt-4 mb-2">Responsabilidad del departamento de TI</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Para el envío de equipos de cómputo se deberá registrar una Solicitud de Mensajería en el Portal de Servicios.</li>
              </ul>
            </div>

          </div>
        )
      },
      {
        section: "7.11",
        title: "Instalaciones de suministro",
        content: (
          <div className="space-y-4 text-gray-300">
            <p className="font-semibold text-white mb-2">Servicios públicos:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Los servidores de información deben de contar con un UPS de respaldo de energía.</li>
              <li>Los servidores deberán contar con una alimentación eléctrica regulada.</li>
              <li>Ante fallas de los servicios públicos se deberá consultar y seguir lo establecido en el Plan de Continuidad.</li>
            </ul>
          </div>
        )
      },
      {
        section: "7.12",
        title: "Security del cableado",
        content: (
          <div className="space-y-4 text-gray-300">
            <ul className="list-disc pl-5 space-y-2">
              <li>El cableado debe estar ordenado y hacer uso de canaletas para su organización.</li>
              <li>Evitar que el cableado cruce área de pasillos.</li>
              <li>Solo el personal de TI o personal externo autorizado por TI podrán agregar o quitar el cableado.</li>
            </ul>
          </div>
        )
      },
      {
        section: "7.13",
        title: "Mantenimiento de los equipos",
        content: (
          <div className="space-y-4 text-gray-300">
            <ul className="list-disc pl-5 space-y-2">
              <li>La instalación, reparación o retiro de cualquier componente de hardware o software de los equipos de trabajo, dispositivos móviles y demás recursos tecnológicos de la organización <strong>(servidores, discos duros externos, etc.)</strong>, solo puede ser realizado por los colaboradores del departamento de TI.</li>
              <li>En caso de que el departamento de TI no pueda solucionar un problema con el recurso tecnológico lo asignará al personal externo autorizado por dicha dirección.</li>
              <li>Cuando se presente una falla o problema de hardware o software en una estación de trabajo u otro recurso tecnológico propiedad de la organización el usuario responsable debe informar al departamento de TI por medio de un ticket de tipo Solicitud de Aplicaciones, Comunicaciones y Equipamiento o Solicitud General de Soporte en el Portal de Servicios, con el fin de realizar una asistencia adecuada. El usuario no debe intentar solucionar el problema.</li>
              <li>Las estaciones de trabajo, dispositivos móviles y demás recursos tecnológicos asignados a los colaboradores y personal externo/visita deben atender las instrucciones técnicas que proporcione el departamento de TI.</li>
              <li>Realizar mantenimientos preventivos de los recursos de la plataforma tecnológica de la organización, según lo definido en la página Mantenimientos Preventivo.</li>
              <li>El mantenimiento preventivo de equipos y servidores se deberá realizar por lo menos una vez al año.</li>
              <li>Se deberá generar incidencias de tipo Tarea en Jira y deberá asignarse al componente \"Mantenimiento\", el seguimiento se deberá documentar en dicha tarea y las hojas de mantenimiento generadas deberán almacenarse en Confluence.</li>
            </ul>
          </div>
        )
      },
      {
        section: "7.14",
        title: "Reutilización o eliminación segura de equipos",
        content: (
          <div className="space-y-4 text-gray-300">
            <p className="font-semibold text-white mb-2">Disposición o reutilización segura del equipo:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Antes de hacer una restauración de un equipo de cómputo se deberá realizar un respaldo y resguardarlo por lo menos un mes.</li>
              <li>Los equipos de cómputo se deberán restaurar y realizar las configuraciones iniciales y los sistemas que apliquen según el rol para que se encuentren listas para asignar nuevamente.</li>
              <li>Cuando el jefe inmediato solicite el equipo del colaborador dado de baja se deberá firmar una carta responsiva <strong>(formato Carta de Resguardo)</strong>.</li>
            </ul>
            <p className="text-sm italic text-gray-500 mt-2">Algunas otras políticas se encuentran en 7.10 <strong>(Disposición medios)</strong></p>
          </div>
        )
      },
    ]
  },

  // ==========================================================================
  // --- SECCIÓN 4: TECNOLÓGICOS ---
  // ==========================================================================
  {
    id: "tecnologicos",
    title: "Tecnológicos",
    icon: <Cpu size={20} />, // (Asegúrate de que esté importado arriba)
    items: [
      {
        section: "8.1",
        title: "Dispositivos de punto final del usuario",
        content: (
          <div className="space-y-6 text-gray-300">
            {/* Equipo de usuario desatendido */}
            <div>
              <p className="font-semibold text-white mb-2">Equipo de usuario desatendido:</p>
              <p className="mb-3">La organización adoptará un modelo corporativo-gestionado como mecanismo principal para el acceso a sistemas y datos internos mediante dispositivos móviles, conforme a los siguientes lineamientos:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Todos los dispositivos móviles utilizados para acceder a sistemas corporativos serán proporcionados por la organización y gestionados centralmente mediante las herramientas autorizadas por el área de Infraestructura y Soporte TI <strong>(actualmente Google Workspace Enterprise)</strong>.</li>
                <li className="text-qualtop-orange font-medium">Queda estrictamente prohibido el uso de dispositivos personales <strong>(BYOD)</strong> para acceder a sistemas, correo corporativo, plataformas de colaboración o cualquier activo de información de la organización, salvo autorización explícita por escrito del Gerente de Infraestructura y Soporte TI y del Director de área correspondiente.</li>
                <li>En caso excepcional de autorizar un dispositivo personal, este deberá cumplir con todos los controles de seguridad establecidos en la presente política.</li>
                <li>La organización se reserva el derecho de aplicar políticas de gestión remota sobre cualquier dispositivo autorizado para acceder a sus sistemas, incluyendo el borrado remoto en caso necesario.</li>
              </ul>
            </div>

            {/* Responsabilidad del Departamento de TI */}
            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-qualtop-orange mb-3">Responsabilidad del Departamento de TI:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Gestionar de manera centralizada todos los dispositivos móviles corporativos a través de la plataforma autorizada <strong>(Google Workspace Enterprise / Google Endpoint Management u otra equivalente definida por el área de Infraestructura y Soporte TI)</strong>.</li>
                <li>Configurar e imponer las políticas de seguridad de forma remota en todos los dispositivos gestionados, incluyendo: requerimiento de contraseña/PIN, cifrado de almacenamiento, bloqueo automático por inactividad y restricción de instalación de aplicaciones no autorizadas.</li>
                <li>Mantener actualizado el inventario de dispositivos móviles corporativos en Magnus, incluyendo: marca, modelo, número de serie, IMEI, colaborador asignado y estado de la gestión MDM.</li>
                <li>Ejecutar el borrado remoto de información corporativa en dispositivos reportados como perdidos, robados o en proceso de baja del colaborador, en un plazo no mayor a 4 horas hábiles tras la notificación formal.</li>
                <li>Verificar trimestralmente el cumplimiento de las políticas de seguridad aplicadas en los dispositivos gestionados, documentando los resultados en el formato definido para auditorías de mantenimiento.</li>
              </ul>
            </div>

            {/* Es responsabilidad de los usuarios */}
            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-qualtop-orange mb-3">Es responsabilidad de los usuarios:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Bloquear sus equipos de cómputo en el momento de abandonar su puesto de trabajo.</li>
                <li>Activar el protector de pantalla automática con contraseña con un intervalo de 1 a 5 minutos de inactividad.</li>
                <li>Los equipos de cómputo que estén fuera de la oficina, bajo ninguna circunstancia deben ser dejados desatendidos en lugares públicos.</li>
                <li className="text-qualtop-orange font-medium">Bajo ninguna circunstancia se debe dejar desatendido ningún equipo de cómputo, laptop, tableta, Banda Ancha Móvil o dispositivos de almacenamiento en lugares públicos.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "8.2",
        title: "Gestión de privilegios de acceso",
        content: (
          <div className="space-y-4 text-gray-300">
            <p className="font-semibold text-white mb-2">Gestión de derechos de acceso privilegiado:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Para la creación, modificación, bloqueo y eliminación de cuentas de usuario privilegiadas, deberán seguirse los siguientes procesos: /wiki/spaces/GQPYA/pages/882835481, /wiki/spaces/GQPYA/pages/882507821, y /wiki/spaces/GQPYA/pages/902398145.</li>
              <li>Solo los directores de área designarán quien podrá tener los permisos privilegiados en las herramientas de acuerdo a las responsabilidades asignadas.</li>
              <li>Los administradores de los sistemas no deberán compartir o generar los accesos sin evidencia de la autorización de un gerente o director de área dueño de la información.</li>
              <li>Para el caso de Confluence y Jira solo se permitirá como máximo 3 administradores <strong>(Site-admin)</strong>.</li>
            </ul>
          </div>
        )
      },
      {
        section: "8.3",
        title: "Restricción del acceso a la información",
        content: (
          <div className="space-y-6 text-gray-300">
            <div>
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad del departamento de TI:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Otorgar los privilegios para administración de recursos tecnológicos, servicios de red y sistemas de información sólo a aquellos colaboradores designados para dichas funciones.</li>
                <li>Asegurar que los sistemas de información requieran autenticación por medio de un usuario y contraseña, excepto aquellas páginas específicamente clasificadas como públicas.</li>
                <li>Deshabilitar las funcionalidades o servicios no utilizados de los sistemas operativos, el firmware y las bases de datos. Se debe configurar el conjunto mínimo requerido de funcionalidades, servicios y utilitarios.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad de todos los usuarios:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Para el control de los derechos de acceso a los usuarios en las plataformas tecnológicas los permisos para lectura, escritura y borrado deberán estar relacionados con las actividades de los roles y para solicitar cualquier acceso se debe realizar por medio del Portal de servicios por el tipo de solicitud Solicitud de Permisos Administrativos.</li>
                <li>En caso de que el solicitante no sea el dueño de la información, la solicitud deberá ser autorizada por la persona correspondiente.</li>
                <li>Solamente deberán tener acceso en los proyectos los involucrados en el equipo de trabajo y los administradores de la herramienta.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "8.4",
        title: "Control de acceso al código fuente de los programas",
        content: (
          <div className="space-y-4 text-gray-300">
            <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad del departamento de TI:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Contar con acceso controlado y restricción de privilegios, además de un registro de actividades a dichos archivos a los códigos fuentes de las herramientas.</li>
              <li>Establecer el control de acceso para que los usuarios utilicen diferentes perfiles para los ambientes de desarrollo, pruebas y producción, asegurándose que los usuarios internos o externos posean acceso limitado y controlado a los datos y activos que se encuentren en producción.</li>
            </ul>
            <p className="text-sm italic text-gray-500 mt-2">Nota: Algunas otras políticas se encuentran en /wiki/spaces/GQPYA/pages/886899737.</p>
          </div>
        )
      },
      {
        section: "8.5",
        title: "Procedimientos seguros de inicio de sesión",
        content: (
          <div className="space-y-4 text-gray-300">
            <ul className="list-disc pl-5 space-y-2">
              <li>Es opcional el inicio de sesión mediante huella digital en los equipos de cómputo que tengan esta funcionalidad para su login.</li>
              <li>Para el inicio de sesión en las aplicaciones dependerá de los mecanismos de seguridad permitidos por cada una de ellas proporcionando el mínimo de información para autenticación, registro de sesiones exitosas con fecha y hora de último acceso, bloqueo de inicio de sesión, entre otras.</li>
            </ul>
            <p className="font-semibold text-white mt-4 mb-2">Adquisición de nuevas aplicaciones:</p>
            <p>En caso de que la organización adquiera una nueva aplicación deberá considerar que su inicio de sesión sea seguro, por ejemplo:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Autenticación multifactor (MFA):</strong> combinación de contraseña segura e individual más un segundo factor <strong>(token, app de autenticación o biometría)</strong>.</li>
              <li>Que no muestre la contraseña introducida.</li>
              <li>Cierre de sesiones inactivas.</li>
            </ul>
          </div>
        )
      },
      {
        section: "8.6",
        title: "Gestión de capacidades",
        content: (
          <div className="space-y-4 text-gray-300">
            <ul className="list-disc pl-5 space-y-2">
              <li>El departamento de TI proveerá la capacidad de procesamiento requerida en los recursos tecnológicos y sistemas de información de la organización.</li>
              <li>Se deberá monitorear en las retrospectivas con el CSI, según lo indicado en el proceso de /wiki/spaces/GQPYA/pages/898565030 los indicadores relacionados a la capacidad de acuerdo a lo definido en los /wiki/spaces/MDPQG/pages/2475458569.</li>
              <li>Cuando la red presente algún problema de velocidad se deberán realizar pruebas en las redes de la organización mediante un speed test con la finalidad de identificar el tráfico de datos que permita tomar acciones en el momento de su aplicación.</li>
              <li>Cuando se tenga la necesidad de alguna infraestructura específica y la organización no tenga la capacidad se deberá registrar un ticket de solicitud de compra en el Portal de Servicios.</li>
            </ul>
          </div>
        )
      },
      {
        section: "8.7",
        title: "Controles contra el código malicioso",
        content: (
          <div className="space-y-6 text-gray-300">
            {/* Controles contra malware */}
            <div>
              <p className="font-semibold text-white mb-2">Controles contra malware:</p>
              
              <p className="text-qualtop-orange font-medium mt-3 mb-2">Responsabilidad del departamento de TI</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Proveer herramientas tales como antivirus, antimalware, anti spam, antispyware, entre otras, que reduzcan el riesgo de contagio de malware y respalden la seguridad de la información contenida y administrada en la plataforma tecnológica y los servicios que se ejecutan en la misma.</li>
                <li>Asegurar que el software de antivirus, antimalware, anti spam y antispyware cuente con las licencias de uso requeridas, certificando así su autenticidad y la posibilidad de actualización periódica de las últimas bases de datos de firmas del proveedor del servicio.</li>
                <li>Configurar el antivirus para que cuando se descargue algún programa o actualización en los equipos de cómputo se muestre una alerta en caso de que éste sea malicioso.</li>
                <li>Programar un escaneo diario para que al encender el equipo de cada colaborador se inicie.</li>
                <li>En caso de que se identifiquen situaciones de riesgo con respecto a malware el Gerente de Infraestructura y Soporte TI solicitará el envío de comunicados al área de Comunicación y Cultura de THDO.</li>
              </ul>

              <p className="text-qualtop-orange font-medium mt-4 mb-2">Responsabilidad de todos los usuarios</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>No deben cambiar o eliminar la configuración del software de antivirus, antispyware, antimalware, anti spam definida por el departamento de TI; por consiguiente, únicamente podrán realizar tareas de escaneo de virus en diferentes medios.</li>
                <li>Deben ejecutar el software de antivirus, antispyware, anti spam, antimalware sobre los archivos y/o documentos que son abiertos o ejecutados por primera vez, especialmente los que se encuentran en medios de almacenamiento externos o que provienen del correo electrónico.</li>
                <li>Deben asegurarse que los archivos adjuntos de los correos electrónicos descargados de internet o copiados de cualquier medio de almacenamiento, provienen de fuentes conocidas y seguras para evitar el contagio de virus informáticos y/o instalación de malware en los recursos tecnológicos.</li>
                <li>Previo a cualquier instalación o actualización notificar al departamento de TI aquellos programas donde se identifique una alerta de software malicioso.</li>
                <li>Cuando sospechen o detecten alguna infección por malware deben notificar al departamento de TI para que tome las medidas de control correspondientes registrando un ticket de Incidente de Seguridad de la Información en el Portal de Servicios.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "8.8",
        title: "Gestión de vulnerabilidades técnicas",
        content: (
          <div className="space-y-4 text-gray-300">
            <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad del departamento de TI:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Debe estar informado de las nuevas vulnerabilidades técnicas y aplicar acciones con la finalidad de prevenir incidentes de seguridad. En caso de requerir apoyo de otras áreas o usuarios deberá comunicarse por correo electrónico.</li>
              <li>El Gerente de Infraestructura y Soporte de TI deberá planificar las pruebas de vulnerabilidad en la Revisión de Seguridad de la Información en la sección Inspección de Cumplimiento Técnico.</li>
              <li>El alcance de las pruebas de vulnerabilidad se deberá definir por el Gerente de Infraestructura y Soporte de TI.</li>
              <li>Se deberá generar un Plan de Mejoras Vulnerabilidades en el que se atenderán los hallazgos identificados, solo se trabajarán los hallazgos críticos y altos, los medios y bajos queda a consideración del Gerente de Infraestructura y Soporte de TI.</li>
              <li>Se deberán ejecutar por lo menos una vez al año un análisis de vulnerabilidades <strong>(Formato Plan de Mejoras Vulnerabilidades)</strong>.</li>
              <li>Debe identificar, ejecutar y monitorear planes de acción del formato Análisis de Vulnerabilidad para la mitigación de las vulnerabilidades técnicas detectadas en la plataforma tecnológica.</li>
            </ul>
          </div>
        )
      },
      {
        section: "8.9",
        title: "Gestión de la configuración",
        content: (
          <div className="space-y-4 text-gray-300">
            <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad del departamento de TI:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Las configuraciones en la nube se realizarán según la petición del cliente y se implementará el proceso interno correspondiente.</li>
              <li>Para configurar los equipos de cómputo se implementará lo indicado en el Manual de Configuración de equipos de cómputo.</li>
              <li>Resguardar la imagen utilizada para la preparación de las configuraciones de los equipos de cómputo.</li>
              <li>Cada vez que exista una actualización crítica del sistema operativo se actualizará la imagen utilizada para equipos de cómputo.</li>
              <li>Es responsabilidad del cliente la configuración de aquellos equipos de cómputo que por tema contractual sean gestionados por su organización.</li>
            </ul>
          </div>
        )
      },
      {
        section: "8.10",
        title: "Eliminación de la información",
        content: (
          <div className="space-y-6 text-gray-300">
            <div>
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad del departamento de Procesos y Certificaciones:</p>
              <p>En conjunto con el propietario del documento se deberá establecer en los Lineamientos de Control Documental y en los Inventarios de activos de información el tiempo que la documentación y registros estarán vigentes, una vez que se cumpla deberán eliminarse de acuerdo con las políticas establecidas.</p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad del departamento de TI:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Para la eliminación de la información deberán considerarse las políticas establecidas en 7.10 Disposición medios.</li>
                <li>Antes de eliminar la información de documentos obsoletos o Google Drive se deberá realizar un respaldo, tales como: proyectos cerrados en Confluence o Jira, repositorio de código, entre otros.</li>
                <li>Configurar en Google Workspace las políticas de retención de datos en Google Vault, estableciendo periodos de retención conforme a los requisitos legales, contractuales y los definidos en las Políticas de Control Documental.</li>
                <li>La información eliminada de Google Drive permanece en la papelera durante 30 días y posteriormente es eliminada de forma permanente. Para información sujeta a retención legal, se deberá configurar una retención específica en Google Vault.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white mb-2">Eliminación de Información en Formato Físico:</p>
              <p className="mb-2">La eliminación de documentos físicos deberá realizarse una vez cumplido el plazo de conservación definido por normativa legal <strong>(laboral, fiscal, de protección de datos)</strong> o por disposiciones internas. Se utilizarán métodos de destrucción que impidan la recuperación de la información, tales como:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Triturado cruzado.</li>
                <li>Incineración controlada.</li>
                <li>Servicios de destrucción certificados.</li>
              </ul>
              <p className="mt-3">Cada área deberá designar a un responsable para la eliminación segura de la documentación física. La eliminación deberá ser autorizada y supervisada por el área propietaria de la información o, en caso de tratarse de documentación gestionada por un proveedor, por el Gerente de Infraestructura y Soporte TI.</p>
              <p className="mt-2 font-semibold text-white">En caso de eliminar grandes volúmenes de documentos, podrá contratarse un proveedor externo que cumpla con los siguientes requisitos:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Certificación en manejo y destrucción segura de información.</li>
                <li>Acuerdo de confidencialidad vigente.</li>
                <li>Emisión de un certificado de destrucción, detallando fecha, método y volumen eliminado.</li>
                <li>Mantenimiento de la cadena de custodia en todo momento.</li>
                <li>Supervisión por parte de personal interno designado.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white mb-2">Eliminación de Información en Formato Digital:</p>
              <p className="mb-3">La eliminación segura de información procederá cuando se haya cumplido el periodo de conservación legal, contractual o de utilidad para la organización, o bien cuando la información se considere duplicada, innecesaria, obsoleta o sujeta a depuración por actualización.</p>
              <p className="mb-3 text-sm italic text-gray-500">Nota: Se debe consultar el /wiki/spaces/GQPYA/pages/872317256 para conocer el tratamiento aplicable a la información considerada como documentación obsoleta.</p>
              
              <p className="font-semibold text-white mb-2">Esta práctica aplica en diversos escenarios, considerando las siguientes áreas:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Gestión de Proyectos:</strong> Eliminación de datos obsoletos de proyectos completados que ya no requieren almacenamiento y limpieza de versiones duplicadas o descartadas de documentos técnicos y cronogramas.</li>
                <li><strong>Bases de Datos:</strong> Depuración de registros inactivos tras cumplir con los tiempos de retención y eliminación de datos personales de clientes tras la finalización de servicios y aprobación legal.</li>
                <li><strong>Sistemas y Software:</strong> Remoción de datos temporales generados por pruebas de software y eliminación de información residual tras la desinstalación de aplicaciones o herramientas.</li>
                <li><strong>Seguridad y Cumplimiento:</strong> Borrado seguro de datos sensibles y eliminación de archivos que no cumplan con los requisitos de almacenamiento cifrado según normativas.</li>
                <li><strong>Recursos Humanos:</strong> Eliminación de información de candidatos no seleccionados una vez concluido el proceso de contratación y depuración de archivos de empleados inactivos fuera del periodo de retención legal.</li>
                <li><strong>Infraestructura TI:</strong> Limpieza de logs de sistemas y servidores tras el análisis y cierre de incidencias correspondientes y depuración de backups obsoletos según la política de rotación de respaldos.</li>
                <li>
                  <strong>Ambientes Nube:</strong>
                  <ul className="list-circle pl-5 mt-1 space-y-1">
                    <li>Depuración de snapshots obsoletos según la política de rotación de respaldos <strong>(tres meses)</strong>.</li>
                    <li>Eliminación de ambientes obsoletos de proyectos o POCs completados o por modificación de versiones.</li>
                    <li>Eliminación de bases de datos obsoletas de proyectos o POCs completados o por modificación de versiones.</li>
                    <li>Eliminación de Servicios <strong>(PaaS)</strong> obsoletos de proyectos o POCs completados.</li>
                    <li>Eliminación de Buckets obsoletos de proyectos o POCs completados.</li>
                    <li>Eliminación de Volúmenes obsoletos de ambientes obsoletos.</li>
                    <li>Eliminación de Servicios de Redes obsoletos de ambientes obsoletos.</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white mb-2">Resguardo:</p>
              <p className="mb-2">Se debe cumplir con los siguientes criterios antes de realizar la eliminación de información:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Identificación de información crítica:</strong> Información que debe ser respaldada debido a requisitos legales, normativos o para posibles necesidades futuras del negocio.</li>
                <li><strong>Creación de Copias de Seguridad:</strong> Copias de seguridad de toda la información identificada como crítica, utilizando medios de almacenamiento seguros y protegidos contra accesos no autorizados.</li>
                <li><strong>Almacenamiento de Respaldos:</strong> Los respaldos deben ser almacenados en ubicaciones seguras, que pueden incluir servidores encriptados, almacenamiento en la nube con acceso restringido, o medios físicos almacenados en lugares protegidos.</li>
                <li><strong>Snapshots de Ambientes:</strong> Snapshots de ambientes para preservar la última imagen de servidores y el snapshot base.</li>
                <li><strong>Snapshots de Base de Datos:</strong> Snapshots de bases de datos para preservar la última imagen de esquemas.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white mb-2">Frecuencia, Revisión y Pruebas de Recuperación:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Los respaldos deberán realizarse previo a cualquier acción de eliminación.</li>
                <li>Se deberán ejecutar pruebas periódicas de recuperación, como mínimo una vez al año, según lo establecido en el plan de continuidad del negocio.</li>
                <li>Los resultados de dichas pruebas deberán documentarse, incluyendo cualquier incidente o problema detectado y las acciones correctivas implementadas.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white mb-2">Para ejecutar la eliminación se debe aplicar:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Métodos de Eliminación:</strong> Utilizar métodos seguros de eliminación, como el borrado criptográfico de datos electrónicos, la sobreescritura de discos duros, o la destrucción física de medios de almacenamiento o bien los que defina el Gerente de Infraestructura y Soporte de TI para salvaguardar la seguridad de la información.</li>
                <li><strong>Verificación de Eliminación:</strong> Verificar que la información ha sido eliminada de manera irreversible y que no es posible su recuperación, exceptuando los respaldos previamente realizados.</li>
              </ul>
              <p className="mt-3">La eliminación segura de información puede aplicarse conforme a los escenarios descritos anteriormente; no obstante, dichos escenarios son enunciativos y no limitativos, por lo que podrán contemplarse otros casos en los que sea necesario eliminar información de forma segura conforme a estos lineamientos.</p>
              <p className="mt-3 font-semibold text-white">Toda eliminación de información ya sea física o digital, deberá:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Ser registrada en el formato F-BitácoraDeEliminaciónFísica.xlsx o en el formato F-ControlEliminaciónSeguraDigital-QTP.docx cuando aplique.</li>
                <li>Incluir: fecha, tipo de información, método utilizado, responsable, ubicación, medio afectado y evidencia <strong>(foto y/o videos, certificado cuando aplique, log digital, captura de pantalla)</strong>.</li>
                <li>Esta evidencia deberá conservarse conforme al periodo definido o disposiciones legales aplicables.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad de todos los usuarios:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>No eliminar archivos de las Unidades compartidas sin autorización del líder de área o del propietario del documento.</li>
                <li>Al finalizar un proyecto, los archivos temporales y borradores deberán ser depurados de Mi unidad, conservando únicamente las versiones finales en la Unidad compartida correspondiente.</li>
                <li>Reportar al departamento de TI cualquier eliminación accidental de archivos críticos mediante un ticket de Respaldo de información en el Portal de Servicios.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "8.12",
        title: "Prevención de la fuga de datos",
        content: (
          <div className="space-y-6 text-gray-300">
            <div>
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidades del departamento de Procesos y Certificaciones:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Clasificar los documentos en función de su clasificación confidencial e importancia para la organización e identificarlos en los Inventarios de Activos de Información.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidades del departamento de TI:</p>
              <p className="mb-2">Implementar métodos para la prevención de fuga de datos, tales como:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Establecer e implementar políticas de filtrado web bloqueando el acceso a sitios web no autorizados.</li>
                <li>Implementar un control para el bloqueo de dispositivos USB en los equipos de cómputo utilizados por los empleados.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad de los usuarios:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Aplican las políticas 5.14 <strong>(Políticas y procedimientos de transferencia de información)</strong>.</li>
                <li>Aplican las políticas 7.7 <strong>(Política de puesto de trabajo despejado y pantalla limpia)</strong>.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "8.13",
        title: "Copias de seguridad de la información",
        content: (
          <div className="space-y-6 text-gray-300">
            <div>
              <p className="font-semibold text-white mb-2">Respaldos de la información:</p>
              
              <p className="text-qualtop-orange font-medium mt-3 mb-2">Responsabilidad del departamento de TI</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Los respaldos de información de los equipos de cómputo se realizarán automáticamente con Google Drive para escritorio. Este servicio está disponible para los usuarios con licenciamiento Business Estándar, el cual está asignado a los recursos que tienen un mayor impacto en la operación. El resguardo de la información operativa será almacenada en los repositorios oficiales con los que se cuentan.</li>
                <li>Generar y utilizar los procedimientos para la generación, restauración, almacenamiento y tratamiento para las copias de respaldo de la información, velando por su integridad y disponibilidad.</li>
                <li>Debe disponer de los recursos necesarios para permitir la identificación de los medios de almacenamiento, la información contenida en ellos y la ubicación física de los mismos para permitir un rápido y eficiente acceso a los medios que contienen la información resguardada.</li>
                <li>Llevar a cabo los procedimientos para realizar pruebas de recuperación a las copias de respaldo, para así comprobar su integridad y posibilidad de uso en caso de ser necesario. Excepto a aquellos aplicativos en donde el proveedor cumpla con estrictas medidas de disponibilidad y certificaciones que lo avalen.</li>
                <li>Será responsable de las copias de respaldo de la información que son almacenadas externamente.</li>
                <li><strong className="text-white">No es permitido trasladar discos duros con información bajo ninguna circunstancia.</strong></li>
                <li>Definir y mantener el /wiki/spaces/CDS1/pages/23102446 donde debe especificar quién, cuándo y con qué periodicidad se realizarán los respaldos.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="text-qualtop-orange font-medium mb-2">Responsabilidades de los propietarios de los aplicativos y sistemas</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Los propietarios de los recursos tecnológicos y sistemas de información deben definir, en conjunto con el departamento de TI, las estrategias para la generación y retención de las copias de respaldo de los aplicativos y sistemas.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="text-qualtop-orange font-medium mb-2">Responsabilidad de todos los usuarios</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Es es responsabilidad de los usuarios de la plataforma tecnológica identificar la información crítica que debe ser respaldada y almacenarla de acuerdo con su nivel de clasificación.</li>
                <li>Tener disponibilidad para que el área de TI pueda realizar las actividades de respaldo de equipo de cómputo de acuerdo a lo planeado.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "8.14",
        title: "Disponibilidad de los recursos de tratamiento de la información",
        content: (
          <div className="space-y-4 text-gray-300">
            <p className="font-semibold text-white mb-2">Disponibilidad de las instalaciones para el procesamiento de la información:</p>
            
            <p className="text-qualtop-orange font-medium mt-3 mb-2">Responsabilidad del departamento de TI</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>El departamento de TI y el Gerente de Infraestructura y Soporte de TI deben analizar y establecer los requerimientos de redundancia para los sistemas de información críticos para la organización y la plataforma tecnológica que los apoya, los cuales están registrados en el Plan de Continuidad.</li>
              <li>Debe evaluar y probar soluciones de redundancia tecnológica y seleccionar la solución que mejor cumple los requerimientos de la organización.</li>
              <li>El departamento de TI, a través de los Analistas de Soporte, debe administrar las soluciones de redundancia tecnológica y realizar pruebas periódicas sobre dichas soluciones, para asegurar el cumplimiento de los requerimientos de disponibilidad de la organización.</li>
            </ul>
          </div>
        )
      },
      {
        section: "8.15",
        title: "Inicio de Sesión",
        content: (
          <div className="space-y-4 text-gray-300">
            <p>Realizar monitoreo permanente del uso que dan los colaboradores y el personal externo/visita a los recursos de la plataforma tecnológica y los sistemas de información de la organización. Además, velar por la custodia de los registros de auditoría cumpliendo con los periodos de retención establecidos para dichos registros.</p>
            <p className="font-semibold text-white mt-4 mb-2">Rubros incluidos:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Registro de eventos.</li>
              <li>Protección de la información del registro.</li>
              <li>Registros del administrador y operador.</li>
            </ul>
          </div>
        )
      },
      {
        section: "8.16",
        title: "Monitoreo de Actividades",
        content: (
          <div className="space-y-4 text-gray-300">
            <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad del departamento de TI:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Realizar monitoreo en tiempo real de las actividades de redes, aplicativos en la herramienta de monitoreo UpTime, las amenazas y vulnerabilidades en Kaspersky, las cuáles emiten notificaciones de caídas de servicios y amenazas detectadas en tiempo real.</li>
              <li>Utilizar la herramienta Site 24x7 para el monitoreo de actividades: capacidad, rendimiento y disponibilidad de la NAS, Compaq, Magnus, repositorio de código <strong>(GITLAB)</strong>.</li>
              <li>Se realizará un monitoreo del ancho de banda del correo electrónico a través de cPanel y del tráfico de correo y control de SPAM en MagicSpam.</li>
              <li>El monitoreo del tráfico de red se realizará con Firewall de Fortinet.</li>
              <li>Realizar un monitoreo de los accesos a sistemas como Atlassian, Odoo, Servidor de correos y Consolas de nube Google, Azure y AWS con una periodicidad trimestral.</li>
              <li>Analizar los resultados del monitoreo de actividades para detectar posibles situaciones donde se pueda presentar un evento o incidente de seguridad de la información.</li>
              <li>En caso de identificación de un evento o incidente de seguridad de la información se deberá registrar mediante un ticket de Incidente de seguridad de la información en el Portal de Servicios, seguir el proceso de Manejo de incidentes y las políticas 5.24 Responsabilidades y procedimientos.</li>
            </ul>
          </div>
        )
      },
      {
        section: "8.17",
        title: "Sincronización del reloj",
        content: (
          <div className="space-y-4 text-gray-300">
            <ul className="list-disc pl-5 space-y-2">
              <li>La única fuente de tiempo será a través de la sincronización automática del reloj al horario de Internet.</li>
              <li>La configuración de la hora o zona horaria en los equipos de cómputo se establece por defecto según el sistema operativo <strong>(Windows)</strong>.</li>
              <li>Los ambientes de desarrollo deben estar configurados con el protocolo NTP <strong>(Network Time Protocol)</strong>.</li>
              <li>Las herramientas que se hospedan en Cloud se ajustarán a la sincronización de tiempo que su host determine, siempre y cuando garantice que la fuente de sincronización del horario se actualice automáticamente con la fuente de UTC predeterminada del país donde radique o se consulte el servicio.</li>
            </ul>
          </div>
        )
      },
      {
        section: "8.18",
        title: "Uso de utilidades con privilegios del sistema",
        content: (
          <div className="space-y-6 text-gray-300">
            {/* Uso de privilegios de los programas de utilidades */}
            <div>
              <p className="font-semibold text-white mb-2">Uso de privilegios de los programas de utilidades:</p>
              
              <p className="text-qualtop-orange font-medium mt-3 mb-2">Responsabilidad del departamento de TI</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>En caso de que los ambientes sean establecidos en los servidores internos de la organización deben estar separados a nivel físico y lógico para desarrollo, pruebas y producción, contando cada uno con su plataforma, servidores, aplicaciones, dispositivos y versiones independientes de los otros ambientes, evitando que las actividades de desarrollo y pruebas puedan poner en riesgo la integridad de la información de producción.</li>
                <li>Dar seguimiento a las solicitudes de soporte identificadas por el área de desarrollo en caso de requerir apoyo con el establecimiento de los ambientes de desarrollo, pruebas y producción de los proyectos.</li>
                <li>Revisar por lo menos una vez al año la actividad de los usuarios con altos privilegios en los registros de auditoría de la plataforma tecnológica y los sistemas de información.</li>
                <li>Es responsable únicamente de la adquisición de la licencia de software y de la gestión del proceso de compra.</li>
                <li>Debe garantizar que el acceso a la licencia sea controlado y que solo los usuarios autorizados puedan utilizarla.</li>
                <li>No es responsable del uso posterior que se haga de la licencia una vez que se haya entregado al solicitante.</li>
              </ul>

              <p className="text-qualtop-orange font-medium mt-4 mb-2">Responsabilidad de los administradores</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Cada herramienta tendrá control del listado de las cuentas administrativas.</li>
                <li>Establecer los ambientes de trabajo para desarrollo, pruebas y producción, de acuerdo a las especificaciones técnicas y/o contractuales de cada proyecto.</li>
              </ul>

              <p className="text-qualtop-orange font-medium mt-4 mb-2">Responsabilidad del usuario</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Para la instalación de aplicaciones o sistemas adicionales que tengan uso de un licenciamiento se deberá solicitar a TI mediante un ticket desde el Portal de Servicios especificando el propósito del uso y los recursos necesarios.</li>
                <li>Es el único responsable del uso y consumo de la licencia de software solicitada.</li>
                <li>Debe asegurarse de que el software se utilice conforme a los términos y condiciones establecidos por el proveedor de la licencia.</li>
                <li>Es responsable de monitorear el consumo de la licencia y de garantizar que no se excedan los límites permitidos.</li>
                <li>Debe reportar al área de Infraestructura y Soporte TI, cualquier incidente o uso inadecuado de la licencia al área de Infraestructura.</li>
                <li>Cualquier cambio en los programas de utilidades que se realicen en el equipo de cómputo, como programas de desfragmentador de disco duro, restaurador del sistema operativo, particionador de disco duro deberá solicitar apoyo al área de TI mediante un ticket de tipo Solicitud General de Soporte en el Portal de Servicios.</li>
              </ul>
            </div>
            
            <p className="text-sm italic text-gray-500 mt-2">Nota: Algunas otras políticas se encuentran en el punto 8.7 <strong>(Controles contra el código malicioso)</strong>.</p>
          </div>
        )
      },
      {
        section: "8.19",
        title: "Instalación de software en sistemas operativos",
        content: (
          <div className="space-y-6 text-gray-300">
            {/* Instalación de software en sistemas operacionales */}
            <div>
              <p className="font-semibold text-white mb-2">Instalación de software en sistemas operacionales:</p>
              
              <p className="text-qualtop-orange font-medium mt-3 mb-2">Responsabilidad del departamento de TI</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Para cualquier instalación, actualización, o mantenimiento de un servidor de sistemas virtualizado en operación se tiene que crear un SNAPSHOT o IMAGEN para garantizar la continuidad del sistema en caso de algún fallo.</li>
                <li>Asegurar que el software operativo instalado en la plataforma tecnológica <strong>(COMPAQ)</strong> cuenta con soporte de los proveedores.</li>
                <li>Conceder accesos temporales y controlados a los proveedores para realizar las actualizaciones sobre el software operativo, así como monitorear dichas actualizaciones.</li>
                <li>El Gerente de Infraestructura y Soporte TI es responsable de establecer y mantener una imagen ISO con las últimas actualizaciones de seguridad críticas para los equipos de cómputo de uso del personal de la organización.</li>
                <li>Solo se permitirá la instalación de extensiones en Google Chrome que se encuentren dentro de Google Chrome Store.</li>
                <li>Antes de la instalación externa, realizar una revisión exhaustiva de la política de privacidad y seguridad de la extensión para garantizar que no tenga vulnerabilidades ni código malicioso, lo cual no represente riesgos para la integridad de nuestros datos, de lo contrario será rechazada y no se permitirá su instalación.</li>
                <li>Es responsable de asegurar que las extensiones instaladas deben mantenerse actualizadas automáticamente para garantizar que se beneficien de las últimas correcciones de seguridad y mejoras de rendimiento.</li>
                <li>En los mantenimientos de equipos de cómputo se llevará a cabo una revisión periódica de las extensiones instaladas para identificar y abordar cualquier problema de seguridad o incumplimiento de políticas de seguridad de la información.</li>
              </ul>

              <p className="text-qualtop-orange font-medium mt-4 mb-2">Responsabilidad de todos los usuarios</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Antes de instalar cualquier extensión externa a Google Chrome Store, se debe generar una Solicitud de Aplicaciones, Comunicaciones y Equipamiento en el Portal de Soporte y Servicios, proporcionar una justificación clara de su necesidad y utilidad en el contexto de su trabajo, deben obtener la aprobación del área de Infraestructura y soporte TI mediante un comentario.</li>
                <li>Es responsabilidad del usuario atender las notificaciones de actualizaciones en sus equipos de cómputo.</li>
                <li>Informar cualquier problema o inquietud relacionada con las extensiones instaladas para que puedan abordarse de manera oportuna mediante el registro de una Solicitud de Aplicaciones, Comunicaciones y Equipamiento en el Portal de Soporte y Servicios.</li>
              </ul>
            </div>

            {/* Restricciones en la instalación de software */}
            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white mb-2">Restricciones en la instalación de software:</p>
              
              <p className="text-qualtop-orange font-medium mt-3 mb-2">Responsabilidad del departamento de TI</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Realizará auditorías apegándose a los puntos que están establecidos en el formato F-MantenimientoPreventivo según lo definido en 7.13 Mantenimiento de equipo, en caso de encontrar algún software no notificado será desinstalado.</li>
              </ul>

              <p className="text-qualtop-orange font-medium mt-4 mb-2">Responsabilidad de los usuarios</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>En caso de requerir la instalación de algún software deberá solicitarse a través de un ticket de Solicitud general de soporte desde el Portal de Servicios.</li>
                <li>Informar al departamento de TI cuando haya alguna actualización del software para el apoyo con la actualización del mismo a través de un ticket de Solicitud general de soporte desde el Portal de Servicios.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "8.20",
        title: "Controles de red",
        content: (
          <div className="space-y-6 text-gray-300">
            <div>
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad del departamento de TI</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Cualquier cambio a las configuraciones de red requeridas por el área de TI deberá ser solicitado y dar seguimiento a través de un correo electrónico asignado al responsable de la administración del servicio por parte del proveedor, el cual deberá realizar las configuraciones solicitadas.</li>
                <li>
                  Las redes y equipos de cómputo deberán establecer categorías de sitios web que serán filtradas y tener un filtrado web por lo menos en las siguientes categorías de Filtrado:
                  <ul className="list-circle pl-5 mt-1 space-y-1">
                    <li>Malware y Amenazas: Bloquear sitios web conocidos por distribuir malware, spyware o phishing.</li>
                    <li>Contenido para Adultos: Restringir el acceso a contenido pornográfico u ofensivo.</li>
                    <li>Redes Sociales: Controlar o limitar el acceso a plataformas de redes sociales durante horas de trabajo.</li>
                    <li>Juegos en Línea: Restringir el acceso a juegos en línea no relacionados con el trabajo.</li>
                    <li>Descargas de Archivos: Limitar el acceso a sitios que permiten descargas de archivos no relacionados con el trabajo.</li>
                  </ul>
                </li>
                <li>El departamento de TI tiene control sobre todas las redes de la organización.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-qualtop-orange mb-2">Responsabilidad de los usuarios</p>
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-qualtop-orange font-medium">Es de conocimiento general y mandatorio que está prohibido almacenar en el equipo de cómputo o visualizar/consultar en internet contenidos pornográficos, ilegales o de naturaleza opuesta a las actividades de trabajo, ya que son consideradas faltas graves al presente lineamiento y será reportada al área de THDO para su evaluación y sanción a criterio de estos.</li>
                <li>Solicitar excepciones al filtrado web en el portal de servicios mediante una solicitud, justificando el motivo por el cual es requerida la excepción, la autorización la debe realizar el Jefe de Área y/o Director de Área.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "8.21",
        title: "Seguridad en los servicios de red",
        content: (
          <div className="space-y-4 text-gray-300">
            <ul className="list-disc pl-5 space-y-2">
              <li>Cualquier cambio en la seguridad en la red requeridas por el área de TI deberá ser solicitado y dar seguimiento a través de un correo electrónico asignado al responsable de la administración del servicio por parte del proveedor, el cual deberá realizar los cambios solicitados.</li>
              <li>El departamento de TI es responsable de la seguridad de la red contra ataques o hackeo.</li>
              <li>Proteger por medio del contenido web que tiene el antivirus HTTP y HTPPS, para los aplicativos utilizará el protocolo certificado SSL.</li>
              <li>El departamento de TI establecerá por medio del antivirus protección a la información en los equipos de cómputo.</li>
              <li>Los puertos permitidos deberán ser de mutuo acuerdo entre el proveedor y el departamento de TI.</li>
            </ul>
          </div>
        )
      },
      {
        section: "8.22",
        title: "Segregación de redes",
        content: (
          <div className="space-y-4 text-gray-300">
            <ul className="list-disc pl-5 space-y-2">
              <li>Todas las personas que sean clientes o visita deberán conectarse a la red para invitados y el acceso deberá ser solicitado directamente con el área de TI.</li>
              <li>Para los usuarios y proveedores se deberán utilizar las redes establecidas y configuradas por el área de TI de acuerdo a la ubicación física de la persona.</li>
              <li>Cuando el usuario sea una persona de nuevo ingreso la configuración de acceso a la red deberá estar activa en el equipo de cómputo.</li>
              <li>Para dar acceso a un proveedor el usuario interno responsable de la visita deberá solicitar el acceso al área de TI por cualquier medio de comunicación.</li>
              <li>Debe existir una segregación de red en donde usuarios claves <strong>(Directores, Gerentes, Asistente de dirección)</strong> no tengan restricciones en su navegación, el resto de los usuarios tendrán una navegación controlada definida por el Gerente de Infraestructura y Soporte de TI.</li>
            </ul>
          </div>
        )
      },
      {
        section: "8.24",
        title: "Uso de criptografía",
        content: (
          <div className="space-y-6 text-gray-300">
            {/* Política sobre el uso de controles criptográficos */}
            <div>
              <p className="font-semibold text-white mb-2">Política sobre el uso de controles criptográficos:</p>
              
              <p className="text-qualtop-orange font-medium mt-3 mb-2">Responsabilidad del departamento de TI</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Los respaldos de información de los equipos de cómputo de usuarios VIP o que manejen información crítica serán almacenados en la NAS en donde solo Gerente de Infraestructura y personal a su cargo tienen acceso.</li>
                <li>
                  El tipo de cifrado que deben contener las páginas web del corporativo son los siguientes:
                  <ul className="list-circle pl-5 mt-1 space-y-1">
                    <li>Signature algorithm, RSA 2048 bits <strong>(SHA256withRSA)</strong>.</li>
                    <li>Protocols, TLS 1.2</li>
                  </ul>
                </li>
                <li>Se deberá encriptar los discos duros de los equipos de cómputo que contengan información confidencial o de clientes, equipos que se encuentren trabajando fuera de la oficina o viajando.</li>
              </ul>

              <p className="text-qualtop-orange font-medium mt-4 mb-2">Responsabilidad de los usuarios</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Para almacenar y/o transmitir información digital mayor a 10 MB se deberá utilizar la herramienta We Transfer, esta información deberá tener contraseña y será proporcionado al receptor de la información, en caso de desconocer cómo utilizarla deberá contactar al departamento de TI.</li>
              </ul>
            </div>

            {/* Gestión de llaves */}
            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white mb-2">Gestión de llaves:</p>
              
              <p className="text-qualtop-orange font-medium mt-3 mb-2">Responsabilidad del departamento de TI</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Asegurarse que los controles criptográficos de los sistemas construidos cumplen con los estándares establecidos por el Área de Infraestructura y Soporte TI.</li>
                <li>Es el principal responsable del resguardo de las llaves para desencriptar los discos duros de los equipos de cómputo.</li>
                <li>Una vez que se ha preparado el equipo de cómputo se realiza el cifrado de disco duro, obteniéndose la llave de Bitlocker, la cual se deberá resguardar en Magnus como único gestor de llaves de Bitlocker, donde sólo tendrán acceso el Gerente de Infraestructura y Soporte de TI y el personal a su cargo.</li>
                <li>En caso de que el Cliente sea el responsable de cargar la imagen de equipo de cómputo de su organización o proveer el equipo, el proceso de cifrado y resguardo de llaves no será responsabilidad del área de Infraestructura y Soporte TI, estarán identificados en Magnus.</li>
                <li>La gestión de llaves es permanente mientras el usuario se encuentre activo en la organización.</li>
              </ul>

              <p className="text-qualtop-orange font-medium mt-4 mb-2">Responsabilidad de los usuarios</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Mantener segura la contraseña de arranque del disco duro encriptado del equipo de cómputo asignado.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "8.31",
        title: "Separación de ambientes de desarrollo, prueba y producción",
        content: (
          <div className="space-y-4 text-gray-300">
            <p className="font-semibold text-white mb-2">Separación de entornos de desarrollo, pruebas y operación:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>El área de Infraestructura y Soporte TI es el responsable de la administración de las plataformas y los recursos que se utilicen para gestionar los ambientes de trabajo que se utilizará para los proyectos, las características y parametrización de los ambientes es responsabilidad del área de desarrollo.</li>
              <li>El control de acceso a los ambientes de desarrollo deberá estar limitado a los responsables del área o especificados en el proyecto.</li>
              <li>Para la solicitud de configuración de ambientes se deberá seguir lo especificado en el Proceso de Aprovisionamiento.</li>
            </ul>
          </div>
        )
      },
      {
        section: "8.32",
        title: "Gestión del cambio",
        content: (
          <div className="space-y-6 text-gray-300">
            <div>
              <p className="mb-2">Para los cambios en infraestructura se deberá seguir el Proceso de Mejora de la organización. Se deberá realizar un respaldo antes de efectuar algún cambio y en caso de que algo falle se deberá hacer un rollback.</p>
              
              <p className="font-semibold text-white mt-4 mb-2">Los posibles cambios del sistema de gestión de la seguridad de la información pueden ser:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Cambios de oficina.</li>
                <li>Cambio de ubicación del SITE.</li>
                <li>Ampliación de infraestructura física.</li>
                <li>Los cambios significativos del SGI u otros.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="mb-3">Para todos los cambios significativos del SGI se deberá realizar un análisis de impacto, el cual puede documentarse en una minuta, retrospectiva, o bien, a través de un riesgo de seguridad o antisoborno.</p>
              <p className="mb-3">Cada cambio significativo del SGI deberá ser administrado a través de las herramientas, para proyectos internos deberá tener como mínimo la página como plan de proyecto <strong>(QG-PlantillaProyectoInterno)</strong> en el sitio de proyectos internos. Para cambios administrados por un externo deberá tener como mínimo un plan de trabajo.</p>
              <p className="mb-2">El área de TI revisará por la eficiencia de los controles implantados en los procesos operativos asociados a los recursos tecnológicos con el objeto de proteger la confidencialidad, la integridad y la disponibilidad de la información manejada y asegurará que los cambios efectuados sobre los recursos tecnológicos, serán adecuadamente controlados y debidamente autorizados.</p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white mb-2">Para los cambios en la asignación o en figuras relevantes del Sistema de Gestión Integrado <strong>(SGI)</strong>, se deberá cumplir con lo siguiente:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Analizar el impacto del cambio en los procesos, controles y responsabilidades del SGI, documentarlo en una minuta.</li>
                <li>Evaluar si existen riesgos asociados <strong>(p. ej., pérdida de continuidad, brechas en responsabilidades, carencia de competencias)</strong>, en caso de identificarse, seguir el proceso Gestión de Riesgos y Oportunidades SGI.</li>
                <li>Solicitar al colaborador saliente o al miembro del comité que complete el documento "Entrega/Recepción de Puesto" <strong>(ubicado en el proceso de Baja de Personal)</strong> y entregarlo al Responsable del SGI para su resguardo y posterior transferencia al nuevo responsable.</li>
                <li>Asignar al nuevo responsable considerando perfil, competencias y experiencia alineadas a los requisitos del puesto, obteniendo aprobación de la alta dirección.</li>
                <li>Actualizar los documentos del SGI que correspondan.</li>
                <li>Notificar a las partes interesadas internas y externas, según aplique <strong>(p. ej., comité, auditores, personal involucrado)</strong>.</li>
                <li>Emitir el nombramiento formal <strong>(en caso de aplicar)</strong>.</li>
                <li>Asegurar la capacitación del nuevo responsable sobre sus funciones, procesos del SGI y normativa aplicable. En caso de identificar una necesidad de capacitación, registrar una solicitud de capacitación.</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white mb-2">Se consideran figuras relevantes del Sistema de Gestión Integrado <strong>(SGI)</strong> las siguientes:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Alta Dirección/Representante de la Dirección.</li>
                <li>Responsable del SGI.</li>
                <li>Oficial de Cumplimiento Antisoborno.</li>
                <li>Jefe de Servicios/Encargado de Seguridad.</li>
                <li>Analista de Riesgos.</li>
                <li>Auditor Interno Líder.</li>
                <li>Representante del área de Talento Humano.</li>
                <li>Representante del área Legal.</li>
                <li>Representante del área de Administración y Finanzas.</li>
                <li>Representante del área de Operaciones.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        section: "8.34",
        title: "Controles de auditoría de sistemas de información",
        content: (
          <div className="space-y-4 text-gray-300">
            <ul className="list-disc pl-5 space-y-2">
              <li>El equipo de infraestructura y Soporte TI deberá conducir revisiones anuales para detectar el uso de software no autorizado y aplicar las medidas correspondientes, utilizando el Checklist de Mantenimiento.</li>
              <li>Los equipos de cómputo de cualquier colaborador pueden ser sometidos a auditorias (Plan de Auditorias Mantenimiento) periódicas por el departamento de TI según lo definido en 7.13 Mantenimiento de equipo, con la finalidad de identificar la aplicación de las políticas de seguridad de la información, instalación de software no permitido, validación de contraseña segura, equipos desatendidos, escritorio limpio, entre otros.</li>
              <li>Ejecutar las pruebas de vulnerabilidad en horario laboral para tener más actividad en la red y poder identificar el mayor número de vulnerabilidades considerando un día operativo.</li>
              <li>El Gerente de Infraestructura y Soporte de TI deberá notificar a los responsables de las áreas la ejecución de un análisis de vulnerabilidad con la finalidad de planear el análisis de forma efectiva y que estén enterados ante algún escenario de interrupción breve de un servicio o aplicativo.</li>
            </ul>
          </div>
        )
      }
    ]
  }
];