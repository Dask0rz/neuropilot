// src/app/register/page.tsx
'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Erreur lors de l\'inscription')
      setLoading(false)
      return
    }

    await signIn('credentials', { email, password, redirect: false })
    router.push('/onboarding')
  }

  return (
    <main className="min-h-screen bg-navy-900 bg-grid flex items-center justify-center p-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-lime-neon/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-cyan-neon/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-3xl">🧠</span>
            <span className="font-display font-bold text-2xl text-gradient">Yukino</span>
          </Link>
          <h1 className="font-display text-3xl font-black mb-2">Crée ton compte</h1>
          <p className="text-white/50">Et commence à maîtriser l'IA aujourd'hui</p>
        </div>

        <div className="glass-card neon-border p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Prénom ou pseudo</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/30 border border-white/10 focus:border-cyan-neon/50 focus:outline-none focus:ring-1 focus:ring-cyan-neon/30 transition-all"
                placeholder="Alex"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/30 border border-white/10 focus:border-cyan-neon/50 focus:outline-none focus:ring-1 focus:ring-cyan-neon/30 transition-all"
                placeholder="ton@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/30 border border-white/10 focus:border-cyan-neon/50 focus:outline-none focus:ring-1 focus:ring-cyan-neon/30 transition-all"
                placeholder="Minimum 6 caractères"
                minLength={6}
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm animate-fade-in">
                ⚠️ {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? '⏳ Création...' : '🚀 Créer mon compte'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-white/40 text-sm">
          Déjà un compte ?{' '}
          <Link href="/login" className="text-cyan-neon hover:underline">Se connecter</Link>
        </p>
      </div>
    </main>
  )
}
