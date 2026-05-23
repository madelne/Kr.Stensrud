import {defineField, defineType} from 'sanity'

// Image type, which includes an image
export default defineType({
  name: 'heroImage',
  title: 'Hovedbilde',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Forsidebilde',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
    }
  }
})
