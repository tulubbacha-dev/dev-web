import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TTB Technology LLC - AI & Machine Learning Solutions',
  description: 'Enterprise-grade AI, Machine Learning, and Data Science solutions for government, healthcare, finance, and enterprise organizations.',
  keywords: 'AI, Machine Learning, Generative AI, Data Science, MLOps, Cloud Computing, Digital Transformation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-ttb-dark">
        {children}
      </body>
    </html>
  )
}
