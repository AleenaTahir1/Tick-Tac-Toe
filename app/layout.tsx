import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '🌈 Modern Tic-Tac-Toe | Beautiful & Animated',
  description: 'A stunning, modern tic-tac-toe game built with React, Tailwind CSS, Framer Motion, and ShadCN. Features smooth animations, sleek design, and beautiful visual effects.',
  keywords: ['tic-tac-toe', 'react', 'game', 'animation', 'framer-motion', 'tailwind', 'modern', 'beautiful'],
  authors: [{ name: 'Modern Game Developer' }],
  creator: 'Modern Game Studio',
  openGraph: {
    title: '🌈 Modern Tic-Tac-Toe | Beautiful & Animated',
    description: 'Experience the most beautiful tic-tac-toe game ever created!',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: '🌈 Modern Tic-Tac-Toe | Beautiful & Animated',
    description: 'Experience the most beautiful tic-tac-toe game ever created!',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#6366f1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎮</text></svg>" />
      </head>
      <body className="font-poppins antialiased">
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  )
} 