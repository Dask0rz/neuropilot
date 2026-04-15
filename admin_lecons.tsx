// src/app/admin/lecons/page.tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminLeconsPage() {
  const [lessons, setLessons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/admin/lessons').then(r => r.json()).then(data => {
      setLessons(data)
      setLoading(false)
    })
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette leçon ? Tous ses exercices seront supprimés.')) return
    await fetch(`/api/admin/lessons/${id}`, { method: 'DELETE' })
    setLessons(prev => prev.filter(l => l.id !== id))
  }

  const filtered = lessons.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase()) ||
    l.chapter?.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-black mb-1">Leçons</h1>
          <p className="text-white/40 text-sm">{lessons.length} leçons au total</p>
        </div>
        <Link href="/admin/lecons/new"
          className="btn-primary px-5 py-2.5 text-sm inline-flex items-center gap-2">
          ➕ Nouvelle leçon
        </Link>
      </div>

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Rechercher une leçon ou un chapitre..."
        className="w-full mb-6 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-neon/50 placeholder:text-white/25"
      />

      {loading ? (
        <div className="text-white/40 text-center py-20">Chargement...</div>
      ) : (
        <div className="space-y-2">
          {filtered.map(lesson => (
            <div key={lesson.id}
              className="glass-card p-4 border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl shrink-0">{lesson.chapter?.emoji ?? '📝'}</span>
                <div className="min-w-0">
                  <div className="font-medium text-white truncate">{lesson.title}</div>
                  <div className="text-xs text-white/40 mt-0.5">
                    {lesson.chapter?.title} · Leçon {lesson.order} · {lesson._count?.exercises ?? 0} exercices · {lesson.xpReward} XP
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link href={`/admin/lecons/${lesson.id}`}
                  className="px-3 py-1.5 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm transition-all">
                  ✏️
                </Link>
                <Link href={`/admin/exercices?lessonId=${lesson.id}`}
                  className="px-3 py-1.5 rounded-lg border border-cyan-neon/20 text-cyan-neon/60 hover:text-cyan-neon hover:border-cyan-neon/40 text-sm transition-all">
                  🎯
                </Link>
                <button onClick={() => handleDelete(lesson.id)}
                  className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400/60 hover:text-red-400 hover:border-red-500/60 text-sm transition-all">
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
