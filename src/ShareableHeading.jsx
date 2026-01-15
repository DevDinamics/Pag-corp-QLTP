import React, { useState } from 'react';
import { Link as LinkIcon, Check } from 'lucide-react'; // Asegúrate de tener lucide-react o usa tus iconos

const ShareableHeading = ({ children, id, as: Tag = 'h2', className = '' }) => {
  const [copied, setCopied] = useState(false);

  // Si no se provee un ID, intentamos generarlo del texto (slugify básico)
  const headingId = id || children.toString().toLowerCase()
    .replace(/\s+/g, '-')     // Reemplaza espacios con guiones
    .replace(/[^\w\-]+/g, '') // Elimina caracteres no alfanuméricos
    .replace(/\-\-+/g, '-')   // Reemplaza múltiples guiones con uno solo
    .replace(/^-+/, '')       // Elimina guiones al inicio
    .replace(/-+$/, '');      // Elimina guiones al final

  const handleShareClick = () => {
    // Construye la URL completa con el hash (#)
    const url = `${window.location.origin}${window.location.pathname}#${headingId}`;

    // API moderna del portapapeles
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      // Ocultar el mensaje de "Copiado" después de 2 segundos
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Error al copiar el link: ', err);
      alert('No se pudo copiar el link automáticamente.');
    });
  };

  return (
    <div className={`group relative flex items-center gap-2 ${className}`}>
      {/* El título en sí (h2, h3, etc.) con el ID asignado */}
      <Tag id={headingId} className="scroll-mt-24"> {/* scroll-mt-24 da espacio si tienes un header fijo */}
        {children}
      </Tag>




    </div>
  );
};

export default ShareableHeading;