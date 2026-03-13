import {defineField, defineType} from 'sanity'

// Category type for a project, such as rehabilitation, new construction, etc. Type includes the category's title
export default defineType({
  name: 'category',
  title: 'Kategori',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
