'use client'
import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'

interface BadgeInfo {
  slug: string
  name: string
  emoji: string
  description: string
  earned: boolean
  earnedAt?: string | Date | null
}

interface BadgeModalProps {
  badge: BadgeInfo | null
  onClose: () => void
}

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BadgeModal({ badge, onClose }: BadgeModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!badge) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [badge, onClose])

  if (!badge || !mounted) return null

  return createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
      onClick={onClose}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }} />
      <div
        style={{ position: 'relative', maxWidth: '20rem', width: '100%', textAlign: 'center' }}
        className="glass-card neon-border p-6"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}
          className="text-white/30 hover:text-white/70 transition-colors text-lg leading-none"
        >
          ✕
        </button>

        <div className={`text-6xl mb-3 ${!badge.earned ? 'grayscale opacity-50' : ''}`}>
          {badge.emoji}
        </div>

        <h2 className="font-display text-xl font-black mb-1">{badge.name}</h2>

        {badge.earned ? (
          <>
            <p className="text-white/60 text-sm mb-3">{badge.description}</p>
            {badge.earnedAt && (
              <div className="glass rounded-lg px-3 py-2 text-xs text-lime-neon font-medium">
                Obtenu le {formatDate(badge.earnedAt)}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-white/30 text-sm mb-3">🔒 Badge verrouillé</div>
            <div className="glass rounded-lg px-3 py-2">
              <p className="text-xs text-white/40 mb-1 uppercase tracking-wider font-medium">Condition</p>
              <p className="text-sm text-white/70">{badge.description}</p>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}
