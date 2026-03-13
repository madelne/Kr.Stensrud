import {defineField, defineType} from 'sanity'

// Author of a post, such as a project. Type includes the author's name
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
