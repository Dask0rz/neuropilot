// src/app/admin/layout.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ADMIN_NAV = [
  { href: '/admin', icon: '📊', label: 'Vue d\'ensemble' },
  { href: '/admin/chapitres', icon: '📚', label: 'Chapitres' },
  { href: '/admin/lecons', icon: '📝', label: 'Leçons' },
  { href: '/admin/exercices', icon: '🎯', label: 'Exercices' },
  { href: '/admin/utilisateurs', icon: '👥', label: 'Utilisateurs' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-navy-900 bg-grid">
      {/* Header */}
      <header className="glass border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-white/40 hover:text-white transition-colors text-sm">
            ← Dashboard
          </Link>
          <span className="text-white/20">|</span>
          <span className="text-orange-400 font-display font-bold">⚙️ Panel Admin</span>
        </div>
        <span className="text-xs text-white/30 font-mono bg-orange-400/10 border border-orange-400/20 px-3 py-1 rounded-full">
          MODE ADMIN
        </span>
      </header>

      <div className="flex">
        {/* Sidebar admin */}
        <aside className="w-56 min-h-screen glass border-r border-white/5 p-4 hidden md:block sticky top-[61px] self-start">
          <nav className="space-y-1">
            {ADMIN_NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${
                  pathname === item.href
                    ? 'bg-orange-400/15 text-orange-400 border border-orange-400/30'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="md:hidden w-full border-b border-white/5 flex overflow-x-auto gap-2 px-4 py-2">
          {ADMIN_NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl whitespace-nowrap text-xs transition-all ${
                pathname === item.href
                  ? 'bg-orange-400/15 text-orange-400 border border-orange-400/30'
                  : 'text-white/50 hover:text-white bg-white/5'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Contenu */}
        <main className="flex-1 p-6 max-w-5xl">
          {children}
        </main>
      </div>
    </div>
  )
}
