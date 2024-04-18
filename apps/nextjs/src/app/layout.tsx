import type { Metadata, Viewport } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { getUrl, TRPCReactProvider } from '~/trpc/react'
import { cn } from './../../../../packages/ui/src'
import { ThemeProvider, ThemeToggle } from './../../../../packages/ui/src/theme'
import { Toaster } from './../../../../packages/ui/src/toast'

import '~/styles/globals.css'

import { SEO_DESCRIPTION, SITE_NAME } from '~/constants'

export const metadata: Metadata = {
  metadataBase: new URL(getUrl()),
  title: `${SITE_NAME}`,
  description: `${SEO_DESCRIPTION}`,
  openGraph: {
    title: `${SITE_NAME}`,
    description: `${SEO_DESCRIPTION}`,
    url: getUrl(),
    siteName: `${SITE_NAME}`,
    locale: 'en_US',
    type: 'website',
  },
  applicationName: `${SITE_NAME}`,
  keywords: ['Website Builder', 'App builder', 'No code tool'],
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans text-foreground antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <>
              {props.children}
              <div className="absolute bottom-4 right-4">
                <ThemeToggle />
              </div>
              <Toaster />
            </>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
