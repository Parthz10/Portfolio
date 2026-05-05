import type { Metadata } from 'next'
import { Geist, Instrument_Serif } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Parth Pokharel',
  description: 'Windows 11 portfolio for Parth Pokharel',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${instrumentSerif.variable}`}>
      <body>
        {children}
        <Toaster richColors theme="dark" position="bottom-right" />
      </body>
    </html>
  )
}
