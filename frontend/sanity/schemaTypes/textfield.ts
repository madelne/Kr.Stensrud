import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'textfield',
  title: 'Tekstinnlegg',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'reference',
      to: {type: 'textfieldType'},
    }),
    defineField({
      name: 'body',
      title: 'Tekst',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      body: 'body',
    },
  },
})
