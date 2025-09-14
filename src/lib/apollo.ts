import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import fetch from 'cross-fetch'

export function createApolloClient() {
  const uri = process.env.NEXT_PUBLIC_PAYLOAD_GRAPHQL_URL || '/api/graphql'
  return new ApolloClient({
    link: new HttpLink({ uri, fetch }),
    cache: new InMemoryCache(),
    // Disable SSR cache rehydration by default; caller can adjust if needed
    ssrMode: typeof window === 'undefined',
  })
}

