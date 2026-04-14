// src/app/stats/page.tsx
'use client'
import { useEffect, useState } from 'react'

export default function StatsPage() {
  const [data, setData] = useState<any>(null)
  const [dashData, setDashData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/stats').then(r => r.json()),
      fetch('/api/dashboard').then(r => r.json()),
    ]).then(([stats, dash]) => {
      setData(stats)
      setDashData(dash)
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <div className="skeleton h-10 w-40 mt-2" />
      {[1,2,3,4].map(i => <div key={i} className="skeleton h-32 rounded-2xl" />)}
    </div>
  )

  const weeklyXP = data?.weeklyXP ?? []
  const chapterAverages = data?.chapterAverages ?? []
  const maxXP = Math.max(...weeklyXP.map((d: any) => d.xp), 1)
  const streak = dashData?.streak
  const profile = dashData?.profile
  const chaptersProgress = dashData?.chaptersProgress ?? []
  const totalCompleted = chaptersProgress.reduce((acc: number, c: any) => acc + c.completedLessons, 0)
  const totalLessons = chaptersProgress.reduce((acc: number, c: any) => acc + c.totalLessons, 0)
  const globalProgress = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="font-display text-3xl font-black mb-2 pt-2">Statistiques</h1>
      <p className="text-white/50 mb-8">Visualise ta progression et identifie tes points forts</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'XP Total', value: profile?.xp ?? 0, emoji: '⭐', color: '#00D4FF' },
          { label: 'Leçons faites', value: totalCompleted, emoji: '📚', color: '#A3FF47' },
          { label: 'Série actuelle', value: `${streak?.currentStreak ?? 0}j`, emoji: '🔥', color: '#FFB347' },
          { label: 'Maîtrisées', value: data?.mastered ?? 0, emoji: '✅', color: '#C9B1FF' },
        ].map(s => (
          <div key={s.label} className="glass-card p-4 text-center">
            <div className="text-2xl mb-1">{s.emoji}</div>
            <div className="font-display text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Weekly XP bar chart */}
      <div className="glass-card p-6 mb-6">
        <h2 className="font-display font-bold text-lg mb-6">XP cette semaine</h2>
        <div className="flex items-end gap-2 h-32">
          {weeklyXP.map((d: any, i: number) => {
            const height = maxXP > 0 ? Math.max(4, Math.round((d.xp / maxXP) * 100)) : 4
            const isToday = i === weeklyXP.length - 1
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-xs font-mono text-white/40">{d.xp > 0 ? d.xp : ''}</div>
                <div
                  className="w-full rounded-t-lg transition-all duration-700"
                  style={{
                    height: `${height}%`,
                    background: isToday ? 'linear-gradient(180deg, #00D4FF, #A3FF47)' : d.xp > 0 ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.05)',
                    minHeight: '4px',
                  }}
                />
                <div className={`text-xs ${isToday ? 'text-cyan-neon font-bold' : 'text-white/30'}`}>{d.day}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Global progress */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg">Parcours global</h2>
          <span className="font-mono text-cyan-neon font-bold">{globalProgress}%</span>
        </div>
        <div className="progress-bar h-3 mb-3">
          <div className="progress-fill" style={{ width: `${globalProgress}%` }} />
        </div>
        <div className="flex justify-between text-xs text-white/40">
          <span>{totalCompleted} leçons terminées</span>
          <span>{totalLessons - totalCompleted} restantes</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="glass-card p-5 text-center border border-lime-neon/20">
          <div className="text-4xl mb-2">🏆</div>
          <div className="font-display text-3xl font-black text-lime-neon">{data?.mastered ?? 0}</div>
          <div className="text-sm text-white/50 mt-1">Notions maîtrisées</div>
          <div className="text-xs text-white/30 mt-0.5">(score ≥ 80%)</div>
        </div>
        <div className="glass-card p-5 text-center border border-orange-400/20">
          <div className="text-4xl mb-2">🔄</div>
          <div className="font-display text-3xl font-black text-orange-400">{data?.toReview ?? 0}</div>
          <div className="text-sm text-white/50 mt-1">À consolider</div>
          <div className="text-xs text-white/30 mt-0.5">(score &lt; 80%)</div>
        </div>
      </div>

      {chapterAverages.filter((c: any) => c.lessons > 0).length > 0 && (
        <div className="glass-card p-6 mb-6">
          <h2 className="font-display font-bold text-lg mb-5">Score moyen par chapitre</h2>
          <div className="space-y-3">
            {chapterAverages.filter((c: any) => c.lessons > 0).sort((a: any, b: any) => b.average - a.average).map((ch: any) => (
              <div key={ch.title}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span>{ch.emoji}</span>
                    <span className="text-white/70 truncate max-w-[180px]">{ch.title}</span>
                    <span className="text-white/30 text-xs">({ch.lessons})</span>
                  </div>
                  <span className="font-mono text-sm font-bold" style={{ color: ch.average >= 80 ? '#A3FF47' : ch.average >= 60 ? '#FFB347' : '#FF6B6B' }}>
                    {ch.average}%
                  </span>
                </div>
                <div className="progress-bar h-1.5">
                  <div className="h-full rounded-full" style={{ width: `${ch.average}%`, background: ch.average >= 80 ? '#A3FF47' : ch.average >= 60 ? '#FFB347' : '#FF6B6B' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="font-display font-bold text-lg mb-4">Détail par chapitre</h2>
        <div className="space-y-2">
          {chaptersProgress.map((ch: any) => (
            <div key={ch.chapterId} className={`glass rounded-xl p-4 flex items-center gap-3 ${ch.isLocked ? 'opacity-40' : ''}`}>
              <span className="text-xl">{ch.chapterEmoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium truncate">{ch.chapterTitle}</span>
                  <span className="text-xs font-mono text-white/40 ml-2 shrink-0">{ch.completedLessons}/{ch.totalLessons}</span>
                </div>
                <div className="progress-bar h-1">
                  <div className="progress-fill" style={{ width: `${ch.percentage}%` }} />
                </div>
              </div>
              {ch.isLocked && <span className="text-white/20 text-sm">🔒</span>}
              {!ch.isLocked && ch.percentage === 100 && <span className="text-lime-neon">✓</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
