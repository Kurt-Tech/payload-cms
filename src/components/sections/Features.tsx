import React from 'react'

type Item = { title: string; description?: string }
type Props = { heading?: string; items: Item[] }

export default function Features({ heading, items }: Props) {
  return (
    <section style={{ padding: '2rem 1rem', maxWidth: 960, margin: '0 auto' }}>
      {heading && (
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>{heading}</h2>
      )}
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {items?.map((it, i) => (
          <div key={i} style={{ border: '1px solid #e5e5e5', borderRadius: 8, padding: '1rem' }}>
            <div style={{ fontWeight: 600 }}>{it.title}</div>
            {it.description && <p style={{ color: '#666', marginTop: 6 }}>{it.description}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

