import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gmaso - Keep Writing',
  description: 'Personal blog by gmaso',
  keywords: ['blog', 'technology', 'programming'],
  authors: [{ name: 'gma so' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
