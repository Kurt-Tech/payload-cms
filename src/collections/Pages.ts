import type { CollectionConfig, Block } from 'payload'

const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Slider',
    plural: 'Hero Slides',
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      fields: [
        {
          name: 'badge',
          type: 'text',
          label: 'Badge',
          defaultValue: 'Trusted Care',
          admin: {
            description: 'Optional pill text shown above the heading.',
          },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Headline',
        },
        {
          name: 'subheading',
          type: 'textarea',
          label: 'Subheadline',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'ctaText',
              type: 'text',
              label: 'Primary CTA Text',
            },
            {
              name: 'ctaLink',
              type: 'text',
              label: 'Primary CTA Link',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'secondaryCtaText',
              type: 'text',
              label: 'Secondary CTA Text',
              defaultValue: 'Meet Our Providers',
            },
            {
              name: 'secondaryCtaLink',
              type: 'text',
              label: 'Secondary CTA Link',
              defaultValue: '/providers',
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
        },
      ],
    },
  ],
}

const FeaturesBlock: Block = {
  slug: 'features',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      labels: {
        singular: 'Feature',
        plural: 'Features',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}

const TestimonialsBlock: Block = {
  slug: 'testimonials',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
    },
    {
      name: 'quotes',
      type: 'array',
      required: true,
      labels: {
        singular: 'Quote',
        plural: 'Quotes',
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text' },
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
    {
      type: 'row',
      fields: [
        { name: 'ctaText', type: 'text', label: 'CTA Text' },
        { name: 'ctaLink', type: 'text', label: 'CTA Link' },
      ],
    },
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
      labels: {
        singular: 'Question',
        plural: 'Questions',
      },
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
