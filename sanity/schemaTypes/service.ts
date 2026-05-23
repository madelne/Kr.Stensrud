import {defineField, defineType} from 'sanity'

// Type of service the company offers, such as rehabilitation, new construction, etc.
// Type includes the service's name, description, and examples of projects that fall under the service.
export default defineType({
  name: 'service',
  title: 'Tjeneste',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Beskrivelse',
      type: 'blockContent',
    }),
    defineField({
      name: 'projects',
      title: 'Eksempler på prosjekter',
      type: 'array',
      of: [{type: 'reference', to: {type: 'project'}}],
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
