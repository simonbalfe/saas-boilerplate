import type { Metadata } from 'next'
import '@/src/globals.css'
import { PostHogProvider } from '@/src/lib/providers'
import { LayoutContent } from '@/src/components/layout-content'

export const metadata: Metadata = {
  title: 'dashboard template',
  description: 'orange',
  openGraph: {
    images: [
      {
        url: 'https://tenor.com/view/cigar-smoke-funny-gif-25177516',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className='font-primary'>
        <PostHogProvider>
          <LayoutContent>{children}</LayoutContent>
        </PostHogProvider>
      </body>
    </html>
  )
}
