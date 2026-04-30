'use client'
import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'

const BADGE_INFO: Record<string, { name: string; emoji: string; description: string }> = {
  'premier-pas':      { name: 'Premier Pas',    emoji: '🚀', description: 'Tu as terminé ta première leçon !' },
  'curieux':          { name: 'Curieux',         emoji: '🔍', description: '5 leçons complétées, tu es sur la bonne voie !' },
  'apprenti-ia':      { name: 'Apprenti IA',     emoji: '🤖', description: 'Chapitre 1 terminé — tu comprends les bases de l\'IA !' },
  'semaine-de-feu':   { name: 'Semaine de Feu',  emoji: '🔥', description: '7 jours de suite, rien ne t\'arrête !' },
  'perfectionniste':  { name: 'Perfectionniste', emoji: '⭐', description: 'Score parfait sur une leçon, bravo !' },
  'prompt-master':    { name: 'Prompt Master',   emoji: '✍️', description: 'Tu maîtrises l\'art du prompt !' },
  'marathonien':      { name: 'Marathonien',     emoji: '🏅', description: '30 jours d\'affilée, quelle régularité !' },
  'encyclopedie':     { name: 'Encyclopédie',    emoji: '📚', description: '500 XP gagnés — tu es une mine de savoir !' },
}

interface Props {
  slugs: string[]
  onDone: () => void
}

export default function BadgeUnlockedPopup({ slugs, onDone }: Props) {
  const [index, setIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => { setMounted(true) }, [])

  const badge = slugs[index] ? BADGE_INFO[slugs[index]] : null

  function next() {
    if (index + 1 < slugs.length) {
      setIndex(i => i + 1)
      setAnimKey(k => k + 1)
    } else {
      onDone()
    }
  }

  // Auto-dismiss after 5s
  useEffect(() => {
    if (!badge) return
    const t = setTimeout(next, 5000)
    return () => clearTimeout(t)
  }, [index, badge])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onDone() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onDone])

  if (!mounted || !badge) return null

  return createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
      onClick={next}
    >
      {/* Backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,15,30,0.85)', backdropFilter: 'blur(6px)' }} />

      {/* Card */}
      <div
        key={animKey}
        className="badge-popup-card glass-card neon-border relative text-center"
        style={{ maxWidth: '22rem', width: '100%', padding: '2.5rem 2rem 2rem', cursor: 'default' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Label */}
        <div
          className="font-mono text-xs font-bold uppercase tracking-widest mb-5"
          style={{ color: 'var(--lime-neon)', letterSpacing: '0.18em' }}
        >
          🏆 Badge débloqué !
        </div>

        {/* Emoji + ring effect */}
        <div className="relative inline-flex items-center justify-center mb-5">
          <div
            className="badge-popup-ring absolute rounded-full"
            style={{ width: '5rem', height: '5rem', border: '2px solid rgba(163,255,71,0.5)' }}
          />
          <div className="badge-popup-emoji text-7xl select-none">
            {badge.emoji}
          </div>
        </div>

        {/* Name */}
        <h2 className="font-display text-2xl font-black mb-2">{badge.name}</h2>

        {/* Description */}
        <p className="text-sm mb-7" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {badge.description}
        </p>

        {/* Button */}
        <button
          onClick={next}
          className="btn-primary w-full py-3 text-sm font-bold"
        >
          {index + 1 < slugs.length ? `Suivant (${index + 2}/${slugs.length})` : 'Super, merci !'}
        </button>

        {/* Progress dots for multiple badges */}
        {slugs.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-4">
            {slugs.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === index ? '1.5rem' : '0.4rem',
                  height: '0.4rem',
                  background: i === index ? 'var(--lime-neon)' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
