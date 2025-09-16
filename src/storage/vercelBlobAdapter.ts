import type { CollectionUpload } from 'payload'
// Minimal adapter for @payloadcms/plugin-cloud-storage using Vercel Blob
// Note: Types are relaxed to avoid tight coupling to plugin internals.
// The plugin calls `handleUpload` and `handleDelete`; we also provide `generateFileURL`.

import { put, del } from '@vercel/blob'

type VercelBlobAdapterOptions = {
  token: string
  prefix?: string
}

type UploadArgs = {
  file: {
    buffer?: Buffer
    data?: Buffer
    filename?: string
    originalFilename?: string
    mimeType?: string
    mimetype?: string
    size?: number
  }
  /** Existing doc data for the upload field */
  data?: Record<string, unknown>
  /** Optional per-collection prefix provided by the plugin */
  prefix?: string
}

type DeleteArgs = {
  doc: any
}

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_')
}

function resolveKey(filename: string, prefix?: string) {
  const base = sanitizeFilename(filename)
  const stamp = Date.now().toString(36)
  return [prefix, `${stamp}_${base}`].filter(Boolean).join('/')
}

export function vercelBlobAdapter(opts: VercelBlobAdapterOptions) {
  const token = opts.token
  const rootPrefix = opts.prefix

  if (!token) {
    // eslint-disable-next-line no-console
    console.warn('[vercelBlobAdapter] Missing BLOB_READ_WRITE_TOKEN')
  }

  return {
    name: 'vercel-blob',
    // @ts-ignore - plugin will pass a compatible shape
    async handleUpload({ file, prefix }: UploadArgs) {
      const filename =
        file?.originalFilename || file?.filename || `upload_${Date.now()}`
      const key = resolveKey(filename, prefix || rootPrefix)
      const contentType = (file?.mimeType || file?.mimetype || 'application/octet-stream') as string
      const body: Buffer | undefined = (file as any)?.buffer || (file as any)?.data
      if (!body) {
        throw new Error('vercelBlobAdapter: missing file buffer')
      }

      const { url } = await put(key, body, {
        access: 'public',
        token,
        contentType,
      })

      return {
        filename: key,
        mimeType: contentType,
        filesize: file?.size,
        url,
      }
    },

    // @ts-ignore - plugin will pass a compatible shape
    async handleDelete({ doc }: DeleteArgs) {
      const target = doc?.url || doc?.filename
      if (!target) return
      try {
        await del(target as string, { token })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('[vercelBlobAdapter] delete failed:', e)
      }
    },

    // For safety, prefer the stored absolute URL when available
    // @ts-ignore - plugin calls with the file/doc
    generateFileURL(file: any) {
      return file?.url || file?.filename || ''
    },
  }
}

