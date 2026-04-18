// src/app/layout.tsx
import type { Metadata } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/layout/Providers'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yukino — Pilote ton futur avec l\'IA',
  description: 'Apprends l\'intelligence artificielle de façon gamifiée, progressive et addictive. De zéro à expert en quelques semaines.',
  keywords: 'intelligence artificielle, machine learning, apprentissage, formation, IA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body className="bg-navy-900 text-white font-body antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
