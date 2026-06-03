import { Briefcase } from 'lucide-react'; // Puedes usar el icono que prefieras

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
      name: 'area',
      title: 'Área / Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Engineering', value: 'Engineering' },
          { title: 'Innovation', value: 'Innovation' },
          { title: 'Quality Assurance', value: 'Quality Assurance' },
          { title: 'Data', value: 'Data' },
          { title: 'Design', value: 'Design' },
        ],
      },
      validation: (Rule) => Rule.required(),
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
      options: {
        list: ['Full-time', 'Part-time', 'Freelance', 'Internship'],
      },
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
      return {
        title: title,
        subtitle: `${isActive ? '🟢 ACTIVA' : '🔴 INACTIVA'} | ${subtitle}`,
      };
    },
  },
};