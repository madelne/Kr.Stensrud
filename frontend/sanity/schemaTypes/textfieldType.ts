import {defineField, defineType} from 'sanity'

// Textfield type, which is a reference in the textfield post. Type includes the type's name, such as "about us - intro", etc.
export default defineType({
  name: 'textfieldType',
  title: 'Teksttype',
  type: 'document',
  fields: [
    defineField({
      name: 'textfieldtype',
      title: 'Textfield type',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'textfieldtype',
    },
  },
})
