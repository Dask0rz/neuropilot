// src/app/login/page.tsx
'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email, password, redirect: false,
    })

    if (result?.error) {
      setError('Email ou mot de passe incorrect')
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  function fillDemo() {
    setEmail('demo@neuropilot.app')
    setPassword('demo1234')
  }

  return (
    <main className="min-h-screen bg-navy-900 bg-grid flex items-center justify-center p-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-cyan-neon/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-neon/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-3xl">🧠</span>
            <span className="font-display font-bold text-2xl text-gradient">NeuroPilot</span>
          </Link>
          <h1 className="font-display text-3xl font-black mb-2">Bon retour !</h1>
          <p className="text-white/50">Continue ton parcours là où tu t'es arrêté</p>
        </div>

        <div className="glass-card neon-border p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm animate-fade-in">
                ⚠️ {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? '⏳ Connexion...' : '→ Se connecter'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-white/10">
            <button
              onClick={fillDemo}
              className="w-full text-sm text-white/40 hover:text-cyan-neon/70 transition-colors py-2"
            >
              🎮 Utiliser le compte démo
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-white/40 text-sm">
          Pas encore de compte ?{' '}
          <Link href="/register" className="text-cyan-neon hover:underline">
            S'inscrire gratuitement
          </Link>
        </p>
      </div>
    </main>
  )
}
