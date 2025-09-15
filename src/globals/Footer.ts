import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: { read: () => true },
  fields: [
    {
      name: 'links',
      type: 'array',
      label: 'Footer Links',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'external', type: 'checkbox', label: 'Open in new tab' },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
    },
  ],
}

