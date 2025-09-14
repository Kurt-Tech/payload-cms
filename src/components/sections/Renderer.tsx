import React from 'react'
import Hero from './Hero'
import Features from './Features'
import Testimonials from './Testimonials'

const components: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  features: Features,
  testimonials: Testimonials,
}

type Block = { blockType: string } & Record<string, any>

export default function Renderer({ layout }: { layout: Block[] }) {
  if (!Array.isArray(layout)) return null
  return (
    <>
      {layout.map((block, i) => {
        const Comp = components[block.blockType]
        return Comp ? <Comp key={i} {...block} /> : null
      })}
    </>
  )
}

