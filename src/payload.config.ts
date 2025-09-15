// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { Theme } from './globals/Theme'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages],
  globals: [Header, Footer, Theme],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    'http://localhost:3000',
    'https://*.vercel.app',
  ].filter(Boolean),
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    'http://localhost:3000',
    'https://*.vercel.app',
  ].filter(Boolean),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url:
      process.env.DATABASE_URI ||
      process.env.MONGODB_URI ||
      process.env.MONGO_URL ||
      '',
    connectOptions: {
      serverSelectionTimeoutMS: 30000,
    },
  }),
  sharp,
  plugins: [payloadCloudPlugin()],
})
