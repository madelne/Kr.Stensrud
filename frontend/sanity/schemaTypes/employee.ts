import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'employee',
  title: 'Ansatt',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Stilling',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'phone',
      title: 'Telefon (valgfri)',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-post (valgfri)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Rekkefølge',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
