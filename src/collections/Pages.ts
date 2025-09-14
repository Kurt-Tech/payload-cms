import type { CollectionConfig, Block } from 'payload'

const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    { name: 'ctaText', type: 'text' },
    { name: 'ctaLink', type: 'text' },
  ],
}

const FeaturesBlock: Block = {
  slug: 'features',
  fields: [
    { name: 'heading', type: 'text', required: false },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text' },
      ],
    },
  ],
}

const TestimonialsBlock: Block = {
  slug: 'testimonials',
  fields: [
    { name: 'heading', type: 'text', required: false },
    {
      name: 'quotes',
      type: 'array',
      required: true,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'quote', type: 'textarea', required: true },
      ],
    },
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [HeroBlock, FeaturesBlock, TestimonialsBlock],
    },
  ],
}

