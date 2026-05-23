import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certification',
  title: 'Sertifisering',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'url',
      title: 'Lenke (valgfri)',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
})
