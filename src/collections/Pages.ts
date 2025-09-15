import type { CollectionConfig, Block } from 'payload'

const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    { name: 'ctaText', type: 'text' },
    { name: 'ctaLink', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
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
        { name: 'image', type: 'upload', relationTo: 'media' },
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
        { name: 'avatar', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}

const CalloutBlock: Block = {
  slug: 'callout',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'content', type: 'textarea' },
    { name: 'ctaText', type: 'text' },
    { name: 'ctaLink', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}

const FAQBlock: Block = {
  slug: 'faq',
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: (doc) => {
      const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
      const slug = (doc as any)?.slug || 'home'
      return `${base}/api/preview?slug=${slug}`
    },
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
      blocks: [HeroBlock, FeaturesBlock, TestimonialsBlock, CalloutBlock, FAQBlock],
    },
  ],
}
