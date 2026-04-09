//Layout

import { type Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { RootLayout } from '@/components/RootLayout'

import '@/styles/tailwind.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s - ProDG Studio',
    default: 'ProDG Studio - Where Bold Ideas Become Global Ventures.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full bg-neutral-950 text-base antialiased ${montserrat.variable}`}>
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
