// src/app/dashboard/page.tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatXP, isStreakActive } from '@/lib/utils'
import { getXPProgressPercent, getXPForNextLevel } from '@/lib/game'

function HeartCountdown({ nextHeartAt }: { nextHeartAt: string }) {
  const [label, setLabel] = useState('')
  useEffect(() => {
    const target = new Date(nextHeartAt).getTime()
    const update = () => {
      const diff = target - Date.now()
      if (diff <= 0) { setLabel('bientôt'); return }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setLabel(h > 0 ? `${h}h${String(m).padStart(2,'0')}` : `${m}:${String(s).padStart(2,'0')}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [nextHeartAt])
  return <div className="text-xs text-white/30 mt-0.5">+❤️ dans {label}</div>
}

export default function DashboardPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [recharging, setRecharging] = useState(false)

  const fetchData = () => fetch('/api/dashboard').then(r => r.json()).then(d => { setData(d); setLoading(false) })

  useEffect(() => { fetchData() }, [])

  async function handleRecharge() {
    setRecharging(true)
    await fetch('/api/hearts', { method: 'POST' })
    await fetchData()
    setRecharging(false)
  }

  if (loading) return <DashboardSkeleton />

  const profile = data?.profile
  const streak = data?.streak
  const badges = data?.badges ?? []
  const chaptersProgress = data?.chaptersProgress ?? []
  const todayXP = data?.todayXP ?? 0
  const reviewCount = data?.reviewCount ?? 0

  const xpProgress = profile ? getXPProgressPercent(profile.xp, profile.level) : 0
  const xpForNext = profile ? getXPForNextLevel(profile.level) : 100
  const streakActive = isStreakActive(streak?.lastActivityAt)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-2">
        <div>
          <h1 className="font-display text-3xl font-black">
            Bonjour {profile?.avatar} !
          </h1>
          <p className="text-white/50 mt-1">
            {streakActive ? `🔥 Série active — ${streak?.currentStreak} jour${streak?.currentStreak > 1 ? 's' : ''}` : 'Commence ta leçon du jour 👆'}
          </p>
        </div>
        <div className="glass rounded-2xl px-4 py-3 text-center neon-border">
          <div className="font-mono text-2xl font-bold text-cyan-neon">{formatXP(profile?.xp ?? 0)}</div>
          <div className="text-xs text-white/40 mt-0.5">XP Total</div>
        </div>
      </div>

      {/* Key stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard emoji="⭐" label="Niveau" value={`${profile?.level ?? 1}`} color="#00D4FF" />
        <StatCard emoji="🔥" label="Série" value={`${streak?.currentStreak ?? 0}j`} color="#FFB347" active={streakActive} />
        <StatCard emoji="⚡" label="XP aujourd'hui" value={`+${todayXP}`} color="#A3FF47" />
        <HeartsCard hearts={profile?.hearts ?? 5} maxHearts={profile?.maxHearts ?? 5} nextHeartAt={profile?.nextHeartAt} onRecharge={handleRecharge} recharging={recharging} />
      </div>

      {/* XP Progress */}
      <div className="glass-card p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-display font-bold">Progression niveau {profile?.level}</span>
          <span className="text-sm text-white/50 font-mono">{profile?.xp} / {xpForNext} XP</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${xpProgress}%` }} />
        </div>
        <div className="text-xs text-white/30 mt-2">
          {xpForNext - (profile?.xp ?? 0)} XP pour atteindre le niveau {(profile?.level ?? 1) + 1}
        </div>
      </div>

      {/* Review alert */}
      {reviewCount > 0 && (
        <Link href="/review" className="block glass-card border border-orange-400/30 bg-orange-400/5 p-5 mb-6 hover:bg-orange-400/10 transition-colors group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔁</span>
              <div>
                <div className="font-display font-bold">Révisions en attente</div>
                <div className="text-white/50 text-sm">{reviewCount} leçon{reviewCount > 1 ? 's' : ''} à revoir aujourd'hui</div>
              </div>
            </div>
            <span className="text-white/40 group-hover:text-white transition-colors">→</span>
          </div>
        </Link>
      )}

      {/* Chapters progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl">Mes chapitres</h2>
          <Link href="/chapters" className="text-cyan-neon text-sm hover:underline">Voir tout →</Link>
        </div>
        <div className="space-y-3">
          {chaptersProgress.slice(0, 4).map((ch: any) => (
            <ChapterProgressCard key={ch.chapterId} chapter={ch} />
          ))}
        </div>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl">Badges gagnés</h2>
            <Link href="/dashboard/profile" className="text-cyan-neon text-sm hover:underline">Voir tout →</Link>
          </div>
          <div className="flex gap-3 flex-wrap">
            {badges.slice(0, 5).map((b: any) => (
              <div key={b.id} className="glass rounded-xl p-3 text-center" title={b.description}>
                <div className="text-3xl mb-1">{b.emoji}</div>
                <div className="text-xs text-white/50 font-medium">{b.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA if no progress */}
      {chaptersProgress.filter((c: any) => c.completedLessons > 0).length === 0 && (
        <div className="glass-card neon-border p-8 text-center mt-6">
          <div className="text-5xl mb-4">🚀</div>
          <h3 className="font-display text-2xl font-black mb-3">Lance-toi !</h3>
          <p className="text-white/50 mb-6">Ta première leçon t'attend. 5 minutes suffiront pour démarrer.</p>
          <Link href="/chapters" className="btn-primary inline-block">
            Commencer le chapitre 1
          </Link>
        </div>
      )}
    </div>
  )
}

function HeartsCard({ hearts, maxHearts, nextHeartAt, onRecharge, recharging }: any) {
  const empty = hearts < maxHearts
  return (
    <div className={`glass-card p-4 text-center ${empty ? 'ring-1 ring-red-500/30' : ''}`}>
      <div className="text-2xl mb-1">❤️</div>
      <div className="font-display text-2xl font-black text-red-400">{hearts}/{maxHearts}</div>
      <div className="text-white/40 text-xs mt-0.5">Vies</div>
      {empty && nextHeartAt && <HeartCountdown nextHeartAt={nextHeartAt} />}
      {empty && (
        <button
          onClick={onRecharge}
          disabled={recharging}
          className="mt-2 text-xs px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 hover:bg-red-500/30 transition-all disabled:opacity-40 w-full"
        >
          {recharging ? '...' : 'Recharger'}
        </button>
      )}
    </div>
  )
}

function StatCard({ emoji, label, value, color, active }: any) {
  return (
    <div className={`glass-card p-4 text-center ${active ? 'ring-1 ring-orange-400/50' : ''}`}>
      <div className="text-2xl mb-1">{emoji}</div>
      <div className="font-display text-2xl font-black" style={{ color }}>{value}</div>
      <div className="text-white/40 text-xs mt-0.5">{label}</div>
    </div>
  )
}

function ChapterProgressCard({ chapter }: { chapter: any }) {
  return (
    <Link
      href={chapter.isLocked ? '#' : `/chapters/${chapter.chapterId}`}
      className={`glass rounded-xl p-4 flex items-center gap-4 transition-all duration-200 ${chapter.isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/5 hover:-translate-y-0.5'}`}
    >
      <span className="text-2xl">{chapter.chapterEmoji}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium truncate">{chapter.chapterTitle}</span>
          <span className="text-sm text-white/40 ml-2 shrink-0">{chapter.completedLessons}/{chapter.totalLessons}</span>
        </div>
        <div className="progress-bar h-1.5">
          <div className="progress-fill" style={{ width: `${chapter.percentage}%` }} />
        </div>
      </div>
      {chapter.isLocked && <span className="text-white/30">🔒</span>}
      {!chapter.isLocked && chapter.percentage === 100 && <span className="text-lime-neon">✓</span>}
    </Link>
  )
}

function DashboardSkeleton() {
  return (
    <div className="p-6 max-w-4xl mx-auto animate-pulse">
      <div className="flex justify-between mb-8 pt-2">
        <div>
          <div className="skeleton h-9 w-48 mb-2" />
          <div className="skeleton h-5 w-36" />
        </div>
        <div className="skeleton h-16 w-24 rounded-2xl" />
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[1,2,3,4].map(i => <div key={i} className="skeleton h-24 rounded-2xl" />)}
      </div>
      <div className="skeleton h-20 rounded-2xl mb-6" />
      <div className="space-y-3">
        {[1,2,3].map(i => <div key={i} className="skeleton h-14 rounded-xl" />)}
      </div>
    </div>
  )
}
