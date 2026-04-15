// src/app/admin/exercices/page.tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function AdminExercicesPage() {
  const searchParams = useSearchParams()
  const lessonId = searchParams.get('lessonId')
  const [exercises, setExercises] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = lessonId ? `/api/admin/exercises?lessonId=${lessonId}` : '/api/admin/exercises'
    fetch(url).then(r => r.json()).then(data => {
      setExercises(data)
      setLoading(false)
    })
  }, [lessonId])

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cet exercice ?')) return
    await fetch(`/api/admin/exercises/${id}`, { method: 'DELETE' })
    setExercises(prev => prev.filter(e => e.id !== id))
  }

  const typeLabel: Record<string, string> = {
    qcm: '📝 QCM', vrai_faux: '⚡ Vrai/Faux', relier: '🔗 Relier',
    completer: '✏️ Compléter', ordre: '📋 Ordre', cas_pratique: '💼 Cas pratique',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-black mb-1">Exercices</h1>
          <p className="text-white/40 text-sm">{exercises.length} exercices{lessonId ? ' dans cette leçon' : ' au total'}</p>
        </div>
        <Link
          href={`/admin/exercices/new${lessonId ? `?lessonId=${lessonId}` : ''}`}
          className="btn-primary px-5 py-2.5 text-sm inline-flex items-center gap-2">
          ➕ Nouvel exercice
        </Link>
      </div>

      {loading ? (
        <div className="text-white/40 text-center py-20">Chargement...</div>
      ) : (
        <div className="space-y-2">
          {exercises.map(ex => (
            <div key={ex.id}
              className="glass-card p-4 border border-white/10 flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-white/50">
                    {typeLabel[ex.type] ?? ex.type}
                  </span>
                  <span className="text-xs text-white/30">+{ex.xpValue} XP</span>
                </div>
                <div className="text-sm text-white font-medium line-clamp-2">{ex.question}</div>
                <div className="text-xs text-white/30 mt-1">
                  {ex.lesson?.title} · {ex.options?.length ?? 0} options
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link href={`/admin/exercices/${ex.id}`}
                  className="px-3 py-1.5 rounded-lg border border-white/20 text-white/60 hover:text-white text-sm transition-all">
                  ✏️
                </Link>
                <button onClick={() => handleDelete(ex.id)}
                  className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400/60 hover:text-red-400 text-sm transition-all">
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
