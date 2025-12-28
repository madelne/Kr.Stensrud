import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'textfieldType',
  title: 'Teksttype',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'type',
    },
  },
})
