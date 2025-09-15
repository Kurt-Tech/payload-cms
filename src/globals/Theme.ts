import type { GlobalConfig } from 'payload'

export const Theme: GlobalConfig = {
  slug: 'theme',
  access: { read: () => true },
  fields: [
    {
      name: 'brand',
      type: 'group',
      fields: [
        {
          name: 'primaryHex',
          type: 'text',
          label: 'Primary Color (Hex)',
          admin: { placeholder: '#3B82F6' },
        },
        {
          name: 'accentHex',
          type: 'text',
          label: 'Accent Color (Hex)',
          admin: { placeholder: '#10B981' },
        },
      ],
    },
    {
      name: 'radius',
      type: 'select',
      label: 'Border Radius',
      defaultValue: 'md',
      options: [
        { label: 'None', value: 'none' },
        { label: 'SM', value: 'sm' },
        { label: 'MD', value: 'md' },
        { label: 'LG', value: 'lg' },
      ],
    },
  ],
}

