import React from 'react'

type Quote = { name: string; quote: string }
type Props = { heading?: string; quotes: Quote[] }

export default function Testimonials({ heading, quotes }: Props) {
  return (
    <section style={{ padding: '2rem 1rem', background: '#fafafa' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {heading && (
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>{heading}</h2>
        )}
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {quotes?.map((q, i) => (
            <figure key={i} style={{ border: '1px solid #e5e5e5', borderRadius: 8, padding: '1rem' }}>
              <blockquote style={{ margin: 0, fontStyle: 'italic' }}>“{q.quote}”</blockquote>
              <figcaption style={{ marginTop: 8, color: '#555' }}>— {q.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

