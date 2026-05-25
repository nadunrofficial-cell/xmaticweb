import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: 'Xmatic Digital | AI-Powered Digital Marketing Agency',
  description: 'Launch your brand into the next digital orbit. We combine AI-powered branding, creative content, and digital strategy to scale brands.',
  keywords: ['digital marketing', 'AI branding', 'social media management', 'content creation', 'web design'],
  authors: [{ name: 'Xmatic Digital' }],
  openGraph: {
    title: 'Xmatic Digital | AI-Powered Digital Marketing Agency',
    description: 'Launch your brand into the next digital orbit with AI-powered branding and creative strategy.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#070913',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-[#070913] text-foreground min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
