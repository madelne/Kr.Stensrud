import {defineField, defineType} from 'sanity'

// Full building project, including title, author, published date, categories, description, and main image.
export default defineType({
  name: 'project',
  title: 'Prosjekt',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
    }),
    defineField({
      name: 'author',
      title: 'Forfatter',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'publishedAt',
      title: 'Sist oppdatert',
      type: 'date',
    }),
    defineField({
      name: 'categories',
      title: 'Kategorier',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'body',
      title: 'Beskrivelse',
      type: 'blockContent',
    }),
    defineField({
      name: 'mainImage',
      title: 'Forsidebilde',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      author: 'author.name',
      media: 'mainImage',
      body: 'body',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
