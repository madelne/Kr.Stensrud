import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hmsImage',
  title: 'HMS-bilde',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
