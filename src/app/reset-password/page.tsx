'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) setError('Lien invalide ou expiré.')
  }, [token])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    if (password.length < 8) {
      setError('Le mot de passe doit faire au moins 8 caractères.')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Erreur serveur')
        setStatus('error')
      } else {
        setStatus('success')
        setTimeout(() => router.push('/login'), 3000)
      }
    } catch {
      setError('Erreur réseau, réessaie.')
      setStatus('error')
    }
  }

  return (
    <div className="glass-card neon-border p-8">
      {status === 'success' ? (
        <div className="text-center space-y-4">
          <div className="text-5xl">✅</div>
          <h2 className="font-display text-xl font-bold">Mot de passe modifié !</h2>
          <p className="text-white/60 text-sm">Tu vas être redirigé vers la connexion...</p>
          <Link href="/login" className="block mt-4 text-cyan-neon hover:underline text-sm">
            Se connecter maintenant
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Nouveau mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/30 border border-white/10 focus:border-cyan-neon/50 focus:outline-none focus:ring-1 focus:ring-cyan-neon/30 transition-all"
              placeholder="••••••••"
              minLength={8}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/30 border border-white/10 focus:border-cyan-neon/50 focus:outline-none focus:ring-1 focus:ring-cyan-neon/30 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {(error || status === 'error') && (
            <div className="bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm animate-fade-in">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading' || !token}
            className="btn-primary w-full py-3"
          >
            {status === 'loading' ? '⏳ Modification...' : '🔒 Modifier le mot de passe'}
          </button>
        </form>
      )}
    </div>
  )
}

export default function ResetPasswordPage() {
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
            <span className="font-display font-bold text-2xl text-gradient">Yukino</span>
          </Link>
          <h1 className="font-display text-3xl font-black mb-2">Nouveau mot de passe</h1>
          <p className="text-white/50">Choisis un mot de passe sécurisé</p>
        </div>

        <Suspense fallback={<div className="glass-card neon-border p-8 text-center text-white/50">Chargement...</div>}>
          <ResetPasswordForm />
        </Suspense>

        <p className="text-center mt-6 text-white/40 text-sm">
          <Link href="/login" className="text-cyan-neon hover:underline">
            ← Retour à la connexion
          </Link>
        </p>
      </div>
    </main>
  )
}
