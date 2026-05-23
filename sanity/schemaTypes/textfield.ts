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
      name: 'textfieldtype',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Om oss – intro', value: 'Om oss, intro' },
          { title: 'Om oss – innlegg', value: 'Om oss, innlegg' },
          { title: 'HMS – intro', value: 'HMS, intro' },
          { title: 'HMS – innlegg', value: 'HMS, innlegg' },
        ],
        layout: 'radio',
      },
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
