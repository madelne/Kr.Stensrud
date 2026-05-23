import { defineField, defineType } from 'sanity'

// Link to a URL, for example a youtube video
export default defineType({
  name: 'link',
  title: 'Lenke',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'url',
    },
  },
})

