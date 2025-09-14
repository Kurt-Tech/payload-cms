import React from 'react'

type Props = {
  heading: string
  subheading?: string
  ctaText?: string
  ctaLink?: string
}

export default function Hero({ heading, subheading, ctaText, ctaLink }: Props) {
  return (
    <section style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>{heading}</h1>
      {subheading && (
        <p style={{ marginTop: '0.75rem', color: '#555' }}>{subheading}</p>
      )}
      {ctaText && ctaLink && (
        <div style={{ marginTop: '1.25rem' }}>
          <a href={ctaLink} style={{ padding: '0.5rem 1rem', border: '1px solid #000', borderRadius: 6 }}>
            {ctaText}
          </a>
        </div>
      )}
    </section>
  )}

