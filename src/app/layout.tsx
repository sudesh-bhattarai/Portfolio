import type { Metadata, Viewport } from 'next'
import './globals.css'

// EDITABLE SEO: update the title, description, and social metadata here.
export const metadata: Metadata = {
  title: 'Sudesh Bhattarai | IT Student & Developer',
  description: 'Portfolio of Sudesh Bhattarai, an IT student and aspiring software developer.',
  openGraph: {
    title: 'Sudesh Bhattarai | IT Student & Developer',
    description: 'Portfolio of Sudesh Bhattarai, an IT student and aspiring software developer.',
    type: 'website',
  },
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = { themeColor: '#0B1020' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
