// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/layout/Providers'
import { RegisterSW } from '@/components/RegisterSW'
import { InstallBanner } from '@/components/InstallBanner'

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
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Yukino',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    apple: '/icons/icon-192.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#7c3aed',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body className="bg-navy-900 text-white font-body antialiased">
        <RegisterSW />
        <InstallBanner />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
