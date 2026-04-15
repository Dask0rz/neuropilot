// src/app/admin/exercices/[id]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

type Option = { id?: string; text: string; isCorrect: boolean; order: number }

export default function AdminExerciceFormPage() {
  const { id } = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const router = useRouter()
  const isNew = id === 'new'

  const [lessons, setLessons] = useState<any[]>([])
  const [form, setForm] = useState({
    lessonId: searchParams.get('lessonId') ?? '',
    type: 'qcm',
    question: '',
    explanation: '',
    order: 1,
    xpValue: 5,
  })
  const [options, setOptions] = useState<Option[]>([
    { text: '', isCorrect: true, order: 0 },
    { text: '', isCorrect: false, order: 1 },
    { text: '', isCorrect: false, order: 2 },
    { text: '', isCorrect: false, order: 3 },
  ])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/lessons?simple=1').then(r => r.json()).then(setLessons)
    if (!isNew) {
      fetch(`/api/admin/exercises/${id}`)
        .then(r => r.json())
        .then(data => {
          setForm({
            lessonId: data.lessonId, type: data.type, question: data.question,
            explanation: data.explanation, order: data.order, xpValue: data.xpValue,
          })
          setOptions(data.options.map((o: any) => ({
            id: o.id, text: o.text, isCorrect: o.isCorrect, order: o.order,
          })))
        })
    }
  }, [id])

  function addOption() {
    setOptions(prev => [...prev, { text: '', isCorrect: false, order: prev.length }])
  }

  function removeOption(i: number) {
    setOptions(prev => prev.filter((_, idx) => idx !== i))
  }

  function updateOption(i: number, field: keyof Option, value: any) {
    setOptions(prev => prev.map((o, idx) => idx === i ? { ...o, [field]: value } : o))
  }

  function setCorrect(i: number) {
    // Pour QCM/vrai_faux : une seule bonne réponse
    if (['qcm', 'vrai_faux', 'completer'].includes(form.type)) {
      setOptions(prev => prev.map((o, idx) => ({ ...o, isCorrect: idx === i })))
    } else {
      updateOption(i, 'isCorrect', !options[i].isCorrect)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const url = isNew ? '/api/admin/exercises' : `/api/admin/exercises/${id}`
    const method = isNew ? 'POST' : 'PUT'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, options }),
    })
    if (res.ok) {
      router.push(form.lessonId ? `/admin/exercices?lessonId=${form.lessonId}` : '/admin/exercices')
    } else {
      const data = await res.json()
      setError(data.error ?? 'Erreur')
      setSaving(false)
    }
  }

  const typeHints: Record<string, string> = {
    qcm: 'Une seule bonne réponse. Coche la case de la bonne option.',
    vrai_faux: 'Deux options : Vrai et Faux. Coche la bonne.',
    completer: 'La question contient ___ à la place du mot manquant. Une seule bonne réponse.',
    relier: 'Format des options : "Terme gauche || Terme droite". Toutes les options sont correctes.',
    ordre: 'Toutes les options sont correctes. Le champ "Ordre" définit la position correcte.',
    cas_pratique: 'Une seule bonne réponse parmi les options.',
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} className="text-white/40 hover:text-white transition-colors">←</button>
        <h1 className="font-display text-2xl font-black">
          {isNew ? 'Nouvel exercice' : 'Modifier l\'exercice'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Leçon *</label>
            <select required value={form.lessonId} onChange={e => setForm(p => ({ ...p, lessonId: e.target.value }))}
              className="admin-input w-full">
              <option value="">Sélectionner...</option>
              {lessons.map(l => (
                <option key={l.id} value={l.id}>{l.chapter?.emoji} {l.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Type *</label>
            <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
              className="admin-input w-full">
              <option value="qcm">📝 QCM</option>
              <option value="vrai_faux">⚡ Vrai ou Faux</option>
              <option value="completer">✏️ Compléter</option>
              <option value="relier">🔗 Relier</option>
              <option value="ordre">📋 Ordre</option>
              <option value="cas_pratique">💼 Cas pratique</option>
            </select>
          </div>
        </div>

        {typeHints[form.type] && (
          <div className="text-xs text-cyan-neon/60 bg-cyan-neon/5 border border-cyan-neon/15 rounded-xl px-4 py-3">
            💡 {typeHints[form.type]}
          </div>
        )}

        <div>
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Question *</label>
          <textarea required value={form.question} onChange={e => setForm(p => ({ ...p, question: e.target.value }))}
            className="admin-input w-full h-24 resize-none"
            placeholder={form.type === 'completer' ? 'Ex: Le ___ est la base du deep learning.' : 'Question...'} />
        </div>

        <div>
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Explication (après réponse) *</label>
          <textarea required value={form.explanation} onChange={e => setForm(p => ({ ...p, explanation: e.target.value }))}
            className="admin-input w-full h-20 resize-none"
            placeholder="Explication affichée après la réponse de l'utilisateur..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Ordre dans la leçon</label>
            <input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: +e.target.value }))}
              className="admin-input w-full" min={1} />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">XP</label>
            <input type="number" value={form.xpValue} onChange={e => setForm(p => ({ ...p, xpValue: +e.target.value }))}
              className="admin-input w-full" min={1} />
          </div>
        </div>

        {/* Options */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs text-white/50 uppercase tracking-wider">Options</label>
            <button type="button" onClick={addOption}
              className="text-xs text-cyan-neon/60 hover:text-cyan-neon transition-colors">
              + Ajouter une option
            </button>
          </div>
          <div className="space-y-2">
            {options.map((opt, i) => (
              <div key={i} className="flex items-start gap-2">
                <button type="button" onClick={() => setCorrect(i)}
                  className={`mt-2.5 w-5 h-5 rounded-full border-2 shrink-0 transition-all ${
                    opt.isCorrect
                      ? 'border-lime-neon bg-lime-neon/30'
                      : 'border-white/20 hover:border-white/40'
                  }`} />
                <input
                  value={opt.text}
                  onChange={e => updateOption(i, 'text', e.target.value)}
                  className="admin-input flex-1 text-sm"
                  placeholder={
                    form.type === 'relier' ? `Terme gauche || Terme droite` :
                    form.type === 'ordre' ? `Étape ${i + 1}` :
                    `Option ${String.fromCharCode(65 + i)}`
                  }
                />
                {form.type === 'ordre' && (
                  <input type="number" value={opt.order}
                    onChange={e => updateOption(i, 'order', +e.target.value)}
                    className="admin-input w-16 text-sm text-center" min={1}
                    title="Position correcte" />
                )}
                {options.length > 2 && (
                  <button type="button" onClick={() => removeOption(i)}
                    className="mt-2.5 text-white/20 hover:text-red-400 transition-colors text-lg leading-none">
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-white/25 mt-2">
            {['qcm', 'vrai_faux', 'completer'].includes(form.type)
              ? 'Clique sur le cercle pour définir la bonne réponse'
              : form.type === 'relier'
                ? 'Toutes les options avec || sont les paires correctes'
                : 'Le chiffre à droite = position correcte dans l\'ordre'}
          </p>
        </div>

        {error && <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-primary px-8 py-3 disabled:opacity-50">
            {saving ? 'Sauvegarde...' : isNew ? 'Créer l\'exercice' : 'Sauvegarder'}
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
