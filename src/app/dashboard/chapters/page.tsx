// src/app/chapters/page.tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ChaptersPage() {
  const [chapters, setChapters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/chapters')
      .then(r => r.json())
      .then(d => { setChapters(d); setLoading(false) })
  }, [])

  if (loading) return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="skeleton h-10 w-48 mb-8 mt-2" />
      <div className="space-y-4">
        {[1,2,3,4].map(i => <div key={i} className="skeleton h-36 rounded-2xl" />)}
      </div>
    </div>
  )

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl font-black mb-2 pt-2">Parcours d'apprentissage</h1>
      <p className="text-white/50 mb-8">8 chapitres pour maîtriser l'IA de A à Z</p>

      {/* Visual path */}
      <div className="space-y-3">
        {chapters.map((ch: any, idx: number) => (
          <div key={ch.id} className="relative">
            {/* Connector line */}
            {idx < chapters.length - 1 && (
              <div className="absolute left-8 top-full h-3 w-0.5 bg-white/10 z-0" />
            )}
            <Link
              href={ch.isLocked ? '#' : `/chapters/${ch.id}`}
              className={`relative z-10 flex items-start gap-4 glass rounded-2xl p-5 transition-all duration-300 ${
                ch.isLocked
                  ? 'opacity-50 cursor-not-allowed'
                  : ch.progress === 100
                    ? 'ring-1 ring-lime-neon/40 hover:-translate-y-0.5'
                    : 'hover:-translate-y-0.5 hover:shadow-xl neon-border'
              }`}
            >
              {/* Chapter number circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-navy-900 font-display font-black text-lg shrink-0"
                style={{ background: ch.isLocked ? '#444' : ch.color }}
              >
                {ch.isLocked ? '🔒' : ch.order}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{ch.emoji}</span>
                  <h2 className="font-display font-bold text-lg">{ch.title}</h2>
                  {ch.progress === 100 && <span className="text-lime-neon text-sm ml-1">✓ Terminé</span>}
                </div>
                <p className="text-white/50 text-sm mb-3 leading-relaxed">{ch.description}</p>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs text-white/40 mb-1">
                      <span>{ch.completedLessons ?? 0}/{ch._count?.lessons ?? 0} leçons</span>
                      <span>{ch.progress ?? 0}%</span>
                    </div>
                    <div className="progress-bar h-1.5">
                      <div className="progress-fill" style={{ width: `${ch.progress ?? 0}%` }} />
                    </div>
                  </div>
                  {!ch.isLocked && (
                    <div className="text-xs font-mono text-white/30">
                      {ch.isLocked ? `🔒 ${ch.xpRequired} XP pour débloquer` : ch.progress === 100 ? '' : '✓ Débloqué'}
                    </div>
                  )}
                </div>
              </div>

              {!ch.isLocked && (
                <div className="text-white/30 self-center">→</div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
