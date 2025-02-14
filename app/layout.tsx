import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { PROJECT_NAME } from './constants'

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

// Set Monaspace Argon as the default font.
// https://monaspace.githubnext.com/
const monaspace = localFont({
  src: '../public/fonts/MonaspaceArgonVarVF.woff',
  weight: '100 900',
  variable: '--font-monaspace-argon'
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${PROJECT_NAME}`,
    default: `Home | ${PROJECT_NAME}`
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${monaspace.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
