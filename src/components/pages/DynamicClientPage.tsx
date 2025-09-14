"use client"
import React from 'react'
import { useQuery } from '@apollo/client'
import Renderer from '@/components/sections/Renderer'
import { PAGE_QUERY } from '@/graphql/pageQuery'

export default function DynamicClientPage({ slug }: { slug: string }) {
  const { data, loading, error } = useQuery(PAGE_QUERY, { variables: { slug } })

  if (loading) return <div style={{ padding: '2rem' }}>Loading…</div>
  if (error) return <div style={{ padding: '2rem', color: 'crimson' }}>Error: {error.message}</div>

  const page = data?.Pages?.docs?.[0]
  if (!page) return <div style={{ padding: '2rem' }}>Page not found</div>

  return <Renderer layout={page.layout || []} />
}

