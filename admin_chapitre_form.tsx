// src/app/admin/chapitres/[id]/page.tsx
// Fonctionne aussi pour /admin/chapitres/new (id = "new")
'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function AdminChapitreFormPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const isNew = id === 'new'

  const [form, setForm] = useState({
    slug: '', title: '', description: '', emoji: '📚',
    order: 1, color: '#00D4FF', xpRequired: 0, isLocked: false,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/chapters/${id}`)
        .then(r => r.json())
        .then(data => setForm({
          slug: data.slug, title: data.title, description: data.description,
          emoji: data.emoji, order: data.order, color: data.color,
          xpRequired: data.xpRequired, isLocked: data.isLocked,
        }))
    }
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const url = isNew ? '/api/admin/chapters' : `/api/admin/chapters/${id}`
    const method = isNew ? 'POST' : 'PUT'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin/chapitres')
    } else {
      const data = await res.json()
      setError(data.error ?? 'Erreur lors de la sauvegarde')
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} className="text-white/40 hover:text-white transition-colors">←</button>
        <h1 className="font-display text-2xl font-black">
          {isNew ? 'Nouveau chapitre' : 'Modifier le chapitre'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Emoji</label>
            <input value={form.emoji} onChange={e => setForm(p => ({ ...p, emoji: e.target.value }))}
              className="admin-input w-full text-center text-2xl" maxLength={2} />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Ordre</label>
            <input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: +e.target.value }))}
              className="admin-input w-full" min={1} />
          </div>
        </div>

        <div>
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Titre *</label>
          <input required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
            className="admin-input w-full" placeholder="Ex: Machine Learning" />
        </div>

        <div>
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Slug *</label>
          <input required value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
            className="admin-input w-full font-mono" placeholder="Ex: machine-learning" />
        </div>

        <div>
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Description *</label>
          <textarea required value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            className="admin-input w-full h-24 resize-none" placeholder="Description du chapitre..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Couleur</label>
            <div className="flex gap-2">
              <input type="color" value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))}
                className="w-12 h-10 rounded-lg border border-white/20 bg-transparent cursor-pointer" />
              <input value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))}
                className="admin-input flex-1 font-mono text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">XP requis</label>
            <input type="number" value={form.xpRequired} onChange={e => setForm(p => ({ ...p, xpRequired: +e.target.value }))}
              className="admin-input w-full" min={0} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="locked" checked={form.isLocked}
            onChange={e => setForm(p => ({ ...p, isLocked: e.target.checked }))}
            className="w-4 h-4 rounded" />
          <label htmlFor="locked" className="text-sm text-white/60">Chapitre verrouillé</label>
        </div>

        {error && <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="btn-primary px-8 py-3 disabled:opacity-50">
            {saving ? 'Sauvegarde...' : isNew ? 'Créer le chapitre' : 'Sauvegarder'}
          </button>
          <button type="button" onClick={() => router.back()}
            className="btn-secondary px-6 py-3">
            Annuler
          </button>
        </div>
      </form>

      <style jsx global>{`
        .admin-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          padding: 10px 14px;
          color: white;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        .admin-input:focus {
          border-color: rgba(0, 212, 255, 0.5);
        }
        .admin-input::placeholder {
          color: rgba(255,255,255,0.25);
        }
      `}</style>
    </div>
  )
}
