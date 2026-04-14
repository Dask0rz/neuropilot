// src/app/review/page.tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ReviewPage() {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/review')
      .then(r => r.json())
      .then(d => { setReviews(d); setLoading(false) })
  }, [])

  if (loading) return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="skeleton h-10 w-48 mb-8 mt-2" />
      <div className="space-y-4">
        {[1,2,3].map(i => <div key={i} className="skeleton h-28 rounded-xl" />)}
      </div>
    </div>
  )

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="font-display text-3xl font-black mb-2 pt-2">Révisions</h1>
<p className="text-white/50 mb-6">
  Les leçons que tu as déjà faites reviennent automatiquement au bon moment pour ancrer ta mémoire.
</p>

<div className="glass rounded-2xl p-5 mb-8 border border-cyan-neon/20">
  <div className="flex items-start gap-3">
    <span className="text-2xl shrink-0">🧠</span>
    <div>
      <div className="font-display font-bold mb-2">Comment ça marche ?</div>
      <p className="text-white/60 text-sm leading-relaxed mb-3">
        Chaque leçon terminée est automatiquement programmée pour révision. Plus tu la réussis, plus l'intervalle s'allonge — 1 jour, puis 6, puis 15, puis 1 mois. Si tu rates, elle revient dès le lendemain.
      </p>
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="glass rounded-lg p-2">
          <div className="text-lime-neon font-bold mb-1">≥ 80%</div>
          <div className="text-white/40">Revient dans 6+ jours</div>
        </div>
        <div className="glass rounded-lg p-2">
          <div className="text-orange-400 font-bold mb-1">60–80%</div>
          <div className="text-white/40">Revient dans 3 jours</div>
        </div>
        <div className="glass rounded-lg p-2">
          <div className="text-red-400 font-bold mb-1">{'< 60%'}</div>
          <div className="text-white/40">Revient demain</div>
        </div>
      </div>
    </div>
  </div>
</div>

      {reviews.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="font-display text-2xl font-bold mb-3">Tout est à jour !</h2>
          <p className="text-white/50 mb-6">
            Aucune révision en attente pour l'instant. Continue d'apprendre de nouvelles leçons !
          </p>
          <Link href="/dashboard/chapters" className="btn-primary inline-block">
            Voir les chapitres
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="glass rounded-xl px-4 py-3 flex items-center gap-3 border border-orange-400/30 bg-orange-400/5 mb-6">
            <span className="text-2xl">🔁</span>
            <div>
              <div className="font-bold">{reviews.length} leçon{reviews.length > 1 ? 's' : ''} à réviser</div>
              <div className="text-sm text-white/50">Réviser maintenant pour renforcer ta mémoire</div>
            </div>
          </div>

          {reviews.map((review: any) => (
            <Link
              key={review.id}
              href={`/learn/${review.lessonId}`}
              className="glass rounded-xl p-5 flex items-center gap-4 hover:bg-white/5 transition-all border border-white/10 hover:border-white/20 hover:-translate-y-0.5 group"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: `${review.lesson?.chapter?.color ?? '#00D4FF'}20`, border: `1px solid ${review.lesson?.chapter?.color ?? '#00D4FF'}40` }}
              >
                {review.lesson?.chapter?.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold truncate">{review.lesson?.title}</div>
                <div className="text-sm text-white/40">{review.lesson?.chapter?.title}</div>
                <div className="text-xs text-orange-400/70 mt-1">
                  À réviser — {new Date(review.dueAt).toLocaleDateString('fr-FR')}
                </div>
              </div>
              <span className="text-white/30 group-hover:text-cyan-neon transition-colors">→</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
