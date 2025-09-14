"use client"
import React from 'react'
import { ApolloProvider as Provider } from '@apollo/client'
import { createApolloClient } from '@/lib/apollo'

export default function ApolloProvider({ children }: { children: React.ReactNode }) {
  // Create a new client per render; for production consider a memoized/singleton
  const client = createApolloClient()
  return <Provider client={client}>{children}</Provider>
}

