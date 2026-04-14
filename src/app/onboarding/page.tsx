// src/app/onboarding/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const AVATARS = ['🚀', '🤖', '🧠', '⚡', '🦾', '🌟', '🔮', '🎯', '💡', '🏆']

const LEVELS = [
  { value: 'debutant', label: 'Débutant', desc: 'Je découvre l\'IA pour la première fois', emoji: '🌱' },
  { value: 'intermediaire', label: 'Intermédiaire', desc: 'J\'ai quelques notions, je veux aller plus loin', emoji: '🌿' },
  { value: 'avance', label: 'Avancé', desc: 'Je connais les bases, je veux maîtriser les détails', emoji: '🌳' },
]

const GOALS = [
  { value: 'culture', label: 'Culture générale', desc: 'Comprendre l\'IA pour en parler intelligemment', emoji: '📖' },
  { value: 'pro', label: 'Usage professionnel', desc: 'Utiliser l\'IA pour booster ma carrière', emoji: '💼' },
  { value: 'expert', label: 'Devenir expert', desc: 'Maîtriser les concepts techniques en profondeur', emoji: '🏅' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [avatar, setAvatar] = useState('🚀')
  const [userLevel, setUserLevel] = useState('')
  const [goal, setGoal] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleFinish() {
    setLoading(true)
    await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ avatar, userLevel, goal }),
    })
    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen bg-navy-900 bg-grid flex items-center justify-center p-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-neon/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-lime-neon/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg animate-slide-up">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-10">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-2 rounded-full transition-all duration-300 ${s === step ? 'w-8 bg-cyan-neon' : s < step ? 'w-4 bg-lime-neon' : 'w-4 bg-white/20'}`} />
          ))}
        </div>

        {/* Step 1 — Avatar */}
        {step === 1 && (
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-4">{avatar}</div>
            <h1 className="font-display text-3xl font-black mb-2">Choisis ton avatar</h1>
            <p className="text-white/50 mb-8">Il t'accompagnera tout au long de ton parcours</p>
            <div className="grid grid-cols-5 gap-3 mb-10">
              {AVATARS.map(a => (
                <button
                  key={a}
                  onClick={() => setAvatar(a)}
                  className={`text-4xl p-4 rounded-2xl transition-all duration-200 hover:scale-110 active:scale-95 ${avatar === a ? 'bg-cyan-neon/20 ring-2 ring-cyan-neon scale-110' : 'glass hover:bg-white/10'}`}
                >
                  {a}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="btn-primary w-full py-3">
              Continuer →
            </button>
          </div>
        )}

        {/* Step 2 — Level */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h1 className="font-display text-3xl font-black mb-2 text-center">Ton niveau actuel</h1>
            <p className="text-white/50 mb-8 text-center">Sois honnête — on adaptera le parcours pour toi</p>
            <div className="space-y-3 mb-8">
              {LEVELS.map(l => (
                <button
                  key={l.value}
                  onClick={() => setUserLevel(l.value)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 text-left ${userLevel === l.value ? 'border-cyan-neon bg-cyan-neon/10 shadow-lg' : 'glass border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                >
                  <span className="text-3xl">{l.emoji}</span>
                  <div>
                    <div className="font-display font-bold">{l.label}</div>
                    <div className="text-white/50 text-sm">{l.desc}</div>
                  </div>
                  {userLevel === l.value && <span className="ml-auto text-cyan-neon">✓</span>}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-secondary flex-1 py-3">← Retour</button>
              <button onClick={() => setStep(3)} disabled={!userLevel} className="btn-primary flex-1 py-3">Continuer →</button>
            </div>
          </div>
        )}

        {/* Step 3 — Goal */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h1 className="font-display text-3xl font-black mb-2 text-center">Ton objectif</h1>
            <p className="text-white/50 mb-8 text-center">Qu'est-ce qui t'amène ici ?</p>
            <div className="space-y-3 mb-8">
              {GOALS.map(g => (
                <button
                  key={g.value}
                  onClick={() => setGoal(g.value)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 text-left ${goal === g.value ? 'border-lime-neon bg-lime-neon/10' : 'glass border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                >
                  <span className="text-3xl">{g.emoji}</span>
                  <div>
                    <div className="font-display font-bold">{g.label}</div>
                    <div className="text-white/50 text-sm">{g.desc}</div>
                  </div>
                  {goal === g.value && <span className="ml-auto text-lime-neon">✓</span>}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-secondary flex-1 py-3">← Retour</button>
              <button onClick={handleFinish} disabled={!goal || loading} className="btn-primary flex-1 py-3">
                {loading ? '⏳ ...' : '🚀 C\'est parti !'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
