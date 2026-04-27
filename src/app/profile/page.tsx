// src/app/profile/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { formatXP } from '@/lib/utils'
import { getXPProgressPercent, getXPForNextLevel } from '@/lib/game'
import BadgeModal from '@/components/BadgeModal'

const ALL_BADGES = [
  { slug: 'premier-pas', name: 'Premier Pas', emoji: '🚀', description: 'Terminer ta première leçon' },
  { slug: 'curieux', name: 'Curieux', emoji: '🔍', description: 'Terminer 5 leçons' },
  { slug: 'apprenti-ia', name: 'Apprenti IA', emoji: '🤖', description: 'Terminer le chapitre 1' },
  { slug: 'semaine-de-feu', name: 'Semaine de Feu', emoji: '🔥', description: '7 jours de suite' },
  { slug: 'perfectionniste', name: 'Perfectionniste', emoji: '⭐', description: '100% à une leçon' },
  { slug: 'prompt-master', name: 'Prompt Master', emoji: '✍️', description: 'Terminer Prompt Engineering' },
  { slug: 'marathonien', name: 'Marathonien', emoji: '🏅', description: '30 jours de suite' },
  { slug: 'encyclopedie', name: 'Encyclopédie', emoji: '📚', description: '500 XP gagnés' },
]

export default function ProfilePage() {
  const { data: session } = useSession()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedBadge, setSelectedBadge] = useState<any>(null)

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
  }, [])

  if (loading) return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="skeleton h-40 rounded-2xl mb-6 mt-2" />
      <div className="skeleton h-24 rounded-2xl mb-4" />
      <div className="grid grid-cols-4 gap-3">
        {[1,2,3,4].map(i => <div key={i} className="skeleton h-24 rounded-xl" />)}
      </div>
    </div>
  )

  const profile = data?.profile
  const streak = data?.streak
  const earnedBadgeSlugs = new Set((data?.badges ?? []).map((b: any) => b.slug))
  const earnedAt: Record<string, string> = Object.fromEntries(
    (data?.badges ?? []).map((b: any) => [b.slug, b.earnedAt])
  )
  const xpProgress = profile ? getXPProgressPercent(profile.xp, profile.level) : 0
  const xpForNext = profile ? getXPForNextLevel(profile.level) : 100

  const goalLabel: Record<string, string> = {
    culture: '📖 Culture générale',
    pro: '💼 Usage professionnel',
    expert: '🏅 Devenir expert',
  }
  const levelLabel: Record<string, string> = {
    debutant: '🌱 Débutant',
    intermediaire: '🌿 Intermédiaire',
    avance: '🌳 Avancé',
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Profile card */}
      <div className="glass-card neon-border p-6 mb-6 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center text-5xl">
            {profile?.avatar ?? '🤖'}
          </div>
          <div>
            <h1 className="font-display text-2xl font-black">{session?.user?.name}</h1>
            <p className="text-white/50 text-sm">{session?.user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs glass px-2 py-1 rounded-full text-white/60">{levelLabel[profile?.userLevel] ?? '—'}</span>
              <span className="text-xs glass px-2 py-1 rounded-full text-white/60">{goalLabel[profile?.goal] ?? '—'}</span>
            </div>
          </div>
        </div>

        {/* XP Progress */}
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/60 font-medium">Niveau {profile?.level ?? 1}</span>
            <span className="font-mono text-white/40">{profile?.xp ?? 0} / {xpForNext} XP</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${xpProgress}%` }} />
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'XP Total', value: formatXP(profile?.xp ?? 0), emoji: '⭐' },
          { label: 'Leçons', value: profile?.totalLessonsCompleted ?? 0, emoji: '📚' },
          { label: 'Meilleure série', value: `${streak?.longestStreak ?? 0}j`, emoji: '🔥' },
          { label: 'Vies', value: `${profile?.hearts ?? 5}/5`, emoji: '❤️' },
        ].map(s => (
          <div key={s.label} className="glass-card p-4 text-center">
            <div className="text-2xl mb-1">{s.emoji}</div>
            <div className="font-display text-xl font-black text-cyan-neon">{s.value}</div>
            <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="mb-8">
        <h2 className="font-display text-xl font-black mb-4">Badges</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {ALL_BADGES.map(badge => {
            const earned = earnedBadgeSlugs.has(badge.slug)
            return (
              <button
                key={badge.slug}
                onClick={() => setSelectedBadge({ ...badge, earned, earnedAt: earnedAt[badge.slug] ?? null })}
                className={`glass rounded-xl p-3 text-center transition-all overflow-hidden cursor-pointer hover:scale-105 active:scale-95 ${earned ? 'ring-1 ring-lime-neon/30' : 'opacity-40 grayscale'}`}
              >
                <div className="text-3xl mb-1">{badge.emoji}</div>
                <div className="text-xs font-medium leading-tight text-white/70 break-words">{badge.name}</div>
                {!earned && <div className="text-xs text-white/30 mt-0.5">🔒</div>}
              </button>
            )
          })}
        </div>
      </div>

      <BadgeModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />

      {/* Sign out */}
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="w-full glass rounded-xl py-3 text-white/40 hover:text-white/70 hover:bg-white/5 transition-all text-sm"
      >
        🚪 Se déconnecter
      </button>
    </div>
  )
}
