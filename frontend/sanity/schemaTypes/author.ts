import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Forfatter',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
