import {defineField, defineType} from 'sanity'

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
