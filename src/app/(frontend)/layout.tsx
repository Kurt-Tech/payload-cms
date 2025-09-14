import React from 'react'
import './styles.css'
import ApolloProvider from '@/components/providers/ApolloProvider'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <ApolloProvider>
          <main>{children}</main>
        </ApolloProvider>
      </body>
    </html>
  )
}
