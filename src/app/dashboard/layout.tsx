// src/app/dashboard/layout.tsx
'use client'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const NAV_ITEMS = [
  { href: '/dashboard', icon: '🏠', label: 'Accueil' },
  { href: '/dashboard/chapters', icon: '🗺️', label: 'Parcours' },
  { href: '/dashboard/weekly-quiz', icon: '⚡', label: 'Quiz Hebdo' },
  { href: '/dashboard/leaderboard', icon: '🏆', label: 'Leaderboard' },
  { href: '/dashboard/review', icon: '🔁', label: 'Réviser' },
  { href: '/dashboard/profile', icon: '👤', label: 'Profil' },
  { href: '/dashboard/stats', icon: '📊', label: 'Stats' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status !== 'authenticated') return
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return

    navigator.serviceWorker.ready.then(async (reg) => {
      const existing = await reg.pushManager.getSubscription()
      if (existing) return

      const permission = await Notification.requestPermission()
      if (permission !== 'granted') return

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BNvfzulfkQBMUEqHM4KXKTVqjKwrkB-IJi7UMqsMeYXD8PBXPXGbZBc1cHIy_ScYMVBMzEEjgWjGfFZaMkIcjg4',
      })

      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub),
      })
    })
  }, [status])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl animate-bounce mb-4">🧠</div>
          <p className="text-white/50 font-display">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!session) return null

  const isAdmin = (session.user as any)?.role === 'admin'

  return (
    <div className="min-h-screen bg-navy-900 bg-grid">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-cyan-neon/3 rounded-full blur-3xl -translate-x-1/2" />
      </div>

      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 glass border-r border-white/5 z-20 hidden lg:flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <span className="font-display font-bold text-xl text-gradient">Yukino</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                pathname === item.href
                  ? 'bg-cyan-neon/15 text-cyan-neon border border-cyan-neon/30'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}

          {isAdmin && (
            <div className="pt-3 mt-3 border-t border-white/10">
              <Link
                href="/admin"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  pathname.startsWith('/admin')
                    ? 'bg-orange-400/15 text-orange-400 border border-orange-400/30'
                    : 'text-orange-400/60 hover:text-orange-400 hover:bg-orange-400/5'
                }`}
              >
                <span className="text-xl">⚙️</span>
                <span className="font-medium">Admin</span>
              </Link>
            </div>
          )}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 transition-all w-full"
          >
            <span className="text-xl">🚪</span>
            <span className="text-sm">Se déconnecter</span>
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav — icônes uniquement, sans labels */}
      <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/5 z-20 lg:hidden">
        <div className="flex items-center justify-around px-2 py-3 pb-safe">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
                pathname === item.href
                  ? 'text-cyan-neon bg-cyan-neon/10'
                  : 'text-white/40'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              aria-label="Admin"
              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
                pathname.startsWith('/admin')
                  ? 'text-orange-400 bg-orange-400/10'
                  : 'text-orange-400/40'
              }`}
            >
              <span className="text-2xl">⚙️</span>
            </Link>
          )}
        </div>
      </nav>

      {/* pt-safe-top compense la status bar iPhone en mode PWA */}
      <main className="lg:ml-64 pb-24 lg:pb-0 min-h-screen pt-safe-top">
        {children}
      </main>
    </div>
  )
}
