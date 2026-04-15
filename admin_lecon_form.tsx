// src/app/admin/lecons/[id]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

export default function AdminLeconFormPage() {
  const { id } = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const router = useRouter()
  const isNew = id === 'new'

  const [chapters, setChapters] = useState<any[]>([])
  const [form, setForm] = useState({
    chapterId: searchParams.get('chapterId') ?? '',
    slug: '', title: '', description: '',
    order: 1, xpReward: 20, duration: 5, content: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/chapters').then(r => r.json()).then(setChapters)
    if (!isNew) {
      fetch(`/api/admin/lessons/${id}`)
        .then(r => r.json())
        .then(data => setForm({
          chapterId: data.chapterId, slug: data.slug, title: data.title,
          description: data.description, order: data.order,
          xpReward: data.xpReward, duration: data.duration, content: data.content ?? '',
        }))
    }
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const url = isNew ? '/api/admin/lessons' : `/api/admin/lessons/${id}`
    const method = isNew ? 'POST' : 'PUT'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin/lecons')
    } else {
      const data = await res.json()
      setError(data.error ?? 'Erreur lors de la sauvegarde')
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} className="text-white/40 hover:text-white transition-colors">←</button>
        <h1 className="font-display text-2xl font-black">
          {isNew ? 'Nouvelle leçon' : 'Modifier la leçon'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Chapitre *</label>
          <select required value={form.chapterId} onChange={e => setForm(p => ({ ...p, chapterId: e.target.value }))}
            className="admin-input w-full">
            <option value="">Sélectionner un chapitre...</option>
            {chapters.map(c => (
              <option key={c.id} value={c.id}>{c.emoji} {c.title}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Titre *</label>
            <input required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              className="admin-input w-full" placeholder="Titre de la leçon" />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Slug *</label>
            <input required value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
              className="admin-input w-full font-mono text-sm" placeholder="c1-l6" />
          </div>
        </div>

        <div>
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Description *</label>
          <textarea required value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            className="admin-input w-full h-20 resize-none" placeholder="Brève description de la leçon..." />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Ordre</label>
            <input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: +e.target.value }))}
              className="admin-input w-full" min={1} />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">XP récompense</label>
            <input type="number" value={form.xpReward} onChange={e => setForm(p => ({ ...p, xpReward: +e.target.value }))}
              className="admin-input w-full" min={1} />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Durée (min)</label>
            <input type="number" value={form.duration} onChange={e => setForm(p => ({ ...p, duration: +e.target.value }))}
              className="admin-input w-full" min={1} />
          </div>
        </div>

        <div>
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">
            Contenu du cours (Markdown)
          </label>
          <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
            className="admin-input w-full font-mono text-sm resize-y"
            style={{ minHeight: '300px' }}
            placeholder={`# Titre\n\nContenu en markdown...\n\n> 💡 Conseil\n\n## Section\n\n- Point 1`} />
          <p className="text-xs text-white/25 mt-1">
            Supporte : # titres, **gras**, *italique*, - listes, &gt; 💡 blocs info, &gt; 🔥 blocs important
          </p>
        </div>

        {error && <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-primary px-8 py-3 disabled:opacity-50">
            {saving ? 'Sauvegarde...' : isNew ? 'Créer la leçon' : 'Sauvegarder'}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-secondary px-6 py-3">
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
        .admin-input:focus { border-color: rgba(0, 212, 255, 0.5); }
        .admin-input::placeholder { color: rgba(255,255,255,0.25); }
        .admin-input option { background: #0A0F1E; color: white; }
      `}</style>
    </div>
  )
}
