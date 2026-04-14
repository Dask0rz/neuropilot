// src/app/dashboard/chapters/[chapterId]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ChapterDetailPage() {
  const { chapterId } = useParams<{ chapterId: string }>()
  const [chapter, setChapter] = useState<any>(null)
  const [progress, setProgress] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [chapRes, chaptersRes] = await Promise.all([
        fetch(`/api/chapters`),
        fetch(`/api/chapters`),
      ])
      const allChapters = await chapRes.json()
      const ch = allChapters.find((c: any) => c.id === chapterId)
      if (ch) setChapter(ch)

      // Load user progress for this chapter's lessons
      const dashRes = await fetch('/api/dashboard')
      const dash = await dashRes.json()
      setLoading(false)
    }
    load()
  }, [chapterId])

  if (loading) return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="skeleton h-8 w-32 mb-6" />
      <div className="skeleton h-32 rounded-2xl mb-6" />
      <div className="space-y-3">
        {[1,2,3,4,5].map(i => <div key={i} className="skeleton h-20 rounded-xl" />)}
      </div>
    </div>
  )

  if (!chapter) return (
    <div className="p-6 text-center text-white/50">Chapitre introuvable</div>
  )

  const completedLessonIds = new Set(
    chapter.lessons?.filter((_: any, i: number) => i < (chapter.completedLessons ?? 0)).map((l: any) => l.id) ?? []
  )

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link href="/dashboard/chapters" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors text-sm">
        ← Retour au parcours
      </Link>

      {/* Chapter header */}
      <div className="glass-card p-6 mb-6" style={{ borderTop: `3px solid ${chapter.color}` }}>
        <div className="flex items-center gap-4 mb-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
            style={{ background: `${chapter.color}20`, border: `1px solid ${chapter.color}40` }}
          >
            {chapter.emoji}
          </div>
          <div>
            <div className="text-sm text-white/40 font-mono mb-1">Chapitre {chapter.order}</div>
            <h1 className="font-display text-2xl font-black">{chapter.title}</h1>
          </div>
        </div>
        <p className="text-white/60 mb-4 text-sm leading-relaxed">{chapter.description}</p>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-white/40">{chapter.completedLessons ?? 0}/{chapter._count?.lessons ?? 0} leçons complétées</span>
          <span className="font-mono" style={{ color: chapter.color }}>{chapter.progress ?? 0}%</span>
        </div>
        <div className="progress-bar">
          <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${chapter.progress ?? 0}%`, background: chapter.color }} />
        </div>
      </div>

      {/* Lessons list */}
      <div className="space-y-3">
        {chapter.lessons?.map((lesson: any, idx: number) => {
          const isCompleted = idx < (chapter.completedLessons ?? 0)
          const isNext = idx === (chapter.completedLessons ?? 0)
          const isLocked = idx > (chapter.completedLessons ?? 0)

          return (
            <Link
              key={lesson.id}
              href={isLocked ? '#' : `/learn/${lesson.id}`}
              className={`flex items-center gap-4 rounded-xl p-4 border transition-all duration-200 ${
                isLocked
                  ? 'glass border-white/5 opacity-50 cursor-not-allowed'
                  : isNext
                    ? 'glass border-cyan-neon/40 bg-cyan-neon/5 hover:bg-cyan-neon/10 shadow-lg'
                    : 'glass border-white/10 hover:border-white/30 hover:bg-white/5'
              }`}
            >
              {/* Status indicator */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${
                isCompleted ? 'bg-lime-neon/20 text-lime-neon' :
                isNext ? 'bg-cyan-neon/20 text-cyan-neon border border-cyan-neon/50' :
                'bg-white/5 text-white/20'
              }`}>
                {isCompleted ? '✓' : isLocked ? '🔒' : idx + 1}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-medium truncate">{lesson.title}</span>
                  {isNext && <span className="xp-badge shrink-0">+{lesson.xpReward} XP</span>}
                </div>
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <span>⏱ ~{lesson.duration} min</span>
                  {isCompleted && <span className="text-lime-neon/60">Terminé</span>}
                </div>
              </div>

              {!isLocked && (
                <span className={`text-lg ${isNext ? 'text-cyan-neon' : 'text-white/20'}`}>
                  {isCompleted ? '' : '→'}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
