// src/app/admin/chapitres/page.tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminChapitresPage() {
  const [chapters, setChapters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/chapters').then(r => r.json()).then(data => {
      setChapters(data)
      setLoading(false)
    })
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce chapitre ? Toutes ses leçons seront supprimées.')) return
    await fetch(`/api/admin/chapters/${id}`, { method: 'DELETE' })
    setChapters(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-black mb-1">Chapitres</h1>
          <p className="text-white/40 text-sm">{chapters.length} chapitres au total</p>
        </div>
        <Link href="/admin/chapitres/new"
          className="btn-primary px-5 py-2.5 text-sm inline-flex items-center gap-2">
          ➕ Nouveau chapitre
        </Link>
      </div>

      {loading ? (
        <div className="text-white/40 text-center py-20">Chargement...</div>
      ) : (
        <div className="space-y-3">
          {chapters.map(chapter => (
            <div key={chapter.id}
              className="glass-card p-5 border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{chapter.emoji}</span>
                <div>
                  <div className="font-bold text-white">{chapter.title}</div>
                  <div className="text-xs text-white/40 mt-0.5">
                    Ordre {chapter.order} · {chapter._count?.lessons ?? 0} leçons · {chapter.xpRequired} XP requis
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link href={`/admin/chapitres/${chapter.id}`}
                  className="px-4 py-2 rounded-xl border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm transition-all">
                  ✏️ Modifier
                </Link>
                <button onClick={() => handleDelete(chapter.id)}
                  className="px-4 py-2 rounded-xl border border-red-500/30 text-red-400/60 hover:text-red-400 hover:border-red-500/60 text-sm transition-all">
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
