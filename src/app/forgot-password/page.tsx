'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Erreur serveur')
        setStatus('error')
      } else {
        setStatus('sent')
      }
    } catch {
      setError('Erreur réseau, réessaie.')
      setStatus('error')
    }
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
            <span className="font-display font-bold text-2xl text-gradient">Yukino</span>
          </Link>
          <h1 className="font-display text-3xl font-black mb-2">Mot de passe oublié ?</h1>
          <p className="text-white/50">On t'envoie un lien pour le réinitialiser</p>
        </div>

        <div className="glass-card neon-border p-8">
          {status === 'sent' ? (
            <div className="text-center space-y-4">
              <div className="text-5xl">📬</div>
              <h2 className="font-display text-xl font-bold">Email envoyé !</h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Si cet email est associé à un compte, tu recevras un lien de réinitialisation.
                <br />
                Vérifie aussi tes spams.
              </p>
              <Link href="/login" className="block mt-4 text-cyan-neon hover:underline text-sm">
                ← Retour à la connexion
              </Link>
            </div>
          ) : (
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

              {status === 'error' && (
                <div className="bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm animate-fade-in">
                  ⚠️ {error}
                </div>
              )}

              <button type="submit" disabled={status === 'loading'} className="btn-primary w-full py-3">
                {status === 'loading' ? '⏳ Envoi en cours...' : '📧 Envoyer le lien'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center mt-6 text-white/40 text-sm">
          <Link href="/login" className="text-cyan-neon hover:underline">
            ← Retour à la connexion
          </Link>
        </p>
      </div>
    </main>
  )
}
