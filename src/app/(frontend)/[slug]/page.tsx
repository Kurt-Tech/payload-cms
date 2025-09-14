import DynamicClientPage from '@/components/pages/DynamicClientPage'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <DynamicClientPage slug={slug} />
}
