import AppLayout from '@/components/layout/app-layout'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AppLayout>{children}</AppLayout>
}
