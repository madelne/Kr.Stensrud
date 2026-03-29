import {defineField, defineType} from 'sanity'

// Textfield post, including title, type, and body.
// Type is a reference to a textfieldType
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
      name: 'textfieldtype',
      title: 'textfield Type',
      type: 'reference',
      to: {type: 'textfieldType'},
    }),
    defineField({
      name: 'body',
      title: 'Tekst',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      //body: 'body',
    },
  },
})
