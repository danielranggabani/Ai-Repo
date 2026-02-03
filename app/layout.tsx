import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'reactflow/dist/style.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Marketing Ads Generator',
  description: 'Create marketing ads with AI workflows',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
