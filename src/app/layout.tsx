import type { Metadata, Viewport } from 'next'
import './globals.css'

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

export const viewport: Viewport = {
  themeColor: '#0B1020',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')==='light'?'light':'dark'}catch{document.documentElement.dataset.theme='dark'}",
          }}
        />
        {children}
      </body>
    </html>
  )
}
