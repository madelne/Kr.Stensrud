import ImageUrlBuilder from '@sanity/image-url';
import sanity from '@/sanity';


// Helper function to extract plain text from Portable Text
const getPlainText = (blocks: any) => {
  // If it's already a string, return it
  if (typeof blocks === 'string') return blocks;

  // If it's null/undefined, return empty string
  if (!blocks || !Array.isArray(blocks)) return '';

  // Process Portable Text blocks
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) return '';
      return block.children.map((child: any) => child.text).join('');
    })
    .join(' ');
};

const getPlainTextPreview = (blocks: any, max: number) => {
  const string = getPlainText(blocks);
  if (string.length <= max) return string;
  return string.substring(0, max).trimEnd() + '...';
}

// Helper function to get image URL from Sanity image object
const getImageUrl = (image: any) => {
  const builder = ImageUrlBuilder(sanity);
  if (!image?.asset?._ref) return '/placeholder.jpg';
  return builder.image(image).width(800).url();
};

// Helper to get author name
const getAuthorName = (author: any) => {
  return author?.name || 'Unknown Author';
};

// Helper to get category name
const getCategory = (category: any) => {
  return category?.title || 'Uncategorized';
};

// Formate published date to Norwegian format
const getFormattedDate = (publishDate: Date | string) => {
  const date = typeof publishDate === 'string'
    ? new Date(publishDate)
    : publishDate;
  return date.toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export { getPlainText, getPlainTextPreview, getImageUrl, getAuthorName, getCategory, getFormattedDate };
