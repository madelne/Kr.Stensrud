import { defineField, defineType } from 'sanity'

// Link to a URL, for example a youtube video
export default defineType({
  name: 'link',
  title: 'Lenke',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
  ]
})

