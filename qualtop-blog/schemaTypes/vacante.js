import { Briefcase } from 'lucide-react';

export default {
  name: 'vacante',
  title: 'Vacantes (Talento Humano)',
  type: 'document',
  icon: Briefcase,
  fields: [
    {
      name: 'isActive',
      title: '¿Vacante Activa?',
      type: 'boolean',
      description: 'Apaga este interruptor para ocultar la vacante de la página web sin borrarla.',
      initialValue: true,
    },
    {
      name: 'isNew',
      title: 'Etiqueta de "Nuevo"',
      type: 'boolean',
      description: 'Enciende esto si quieres que resalte con el brillito de "Nueva Vacante".',
      initialValue: true,
    },
    {
      name: 'puesto',
      title: 'Título del Puesto',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(80),
    },
    {
      // 👇 AQUÍ ESTÁ EL CAMBIO PRINCIPAL 👇
      name: 'area',
      title: 'Áreas / Categorías',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Añade una o más áreas (ej. Cloud, Data, Ciberseguridad). Pulsa "+ Add item" por cada una.',
      validation: (Rule) => Rule.required().min(1).error('Debes agregar al menos un área.'),
    },
    {
      name: 'ubicacion',
      title: 'Ubicación',
      type: 'string',
      description: 'Ej. CDMX (Híbrido), Remoto (Global), etc.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tipo',
      title: 'Tipo de Contrato',
      type: 'string',
      description: 'Ej. Full-time, Freelance, Por Proyecto, etc.',
      initialValue: 'Full-time',
    },
    {
      name: 'salario',
      title: 'Salario Esperado',
      type: 'string',
      description: 'Ej. Competitivo, Premium, o un rango como "$30k - $40k"',
    },
    {
      name: 'desc',
      title: 'Descripción del Rol',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'requisitos',
      title: 'Requisitos (Lo que te ayudará a tener éxito)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Añade cada requisito como un punto de la lista.',
    },
  ],
  preview: {
    select: {
      title: 'puesto',
      subtitle: 'area',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, subtitle, isActive } = selection;
      // Como ahora 'area' es un arreglo, lo unimos con comas para la vista previa
      const areasText = subtitle && subtitle.length > 0 ? subtitle.join(', ') : 'Sin área';
      
      return {
        title: title,
        subtitle: `${isActive ? '🟢 ACTIVA' : '🔴 INACTIVA'} | ${areasText}`,
      };
    },
  },
};