// src/app/admin/page.tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(setStats)
  }, [])

  const cards = [
    { label: 'Utilisateurs', value: stats?.users ?? '...', icon: '👥', href: '/admin/utilisateurs', color: 'cyan' },
    { label: 'Chapitres', value: stats?.chapters ?? '...', icon: '📚', href: '/admin/chapitres', color: 'lime' },
    { label: 'Leçons', value: stats?.lessons ?? '...', icon: '📝', href: '/admin/lecons', color: 'orange' },
    { label: 'Exercices', value: stats?.exercises ?? '...', icon: '🎯', href: '/admin/exercices', color: 'purple' },
  ]

  return (
    <div>
      <h1 className="font-display text-2xl font-black mb-2">Vue d'ensemble</h1>
      <p className="text-white/40 text-sm mb-8">Bienvenue dans le panel d'administration Yukino.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {cards.map(card => (
          <Link key={card.label} href={card.href}
            className="glass-card p-5 border border-white/10 hover:border-white/20 transition-all group">
            <div className="text-3xl mb-3">{card.icon}</div>
            <div className="font-display text-3xl font-black text-white mb-1">{card.value}</div>
            <div className="text-xs text-white/40">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/chapitres/new"
          className="glass-card p-5 border border-lime-neon/20 bg-lime-neon/5 hover:bg-lime-neon/10 transition-all">
          <div className="text-2xl mb-2">➕</div>
          <div className="font-bold text-lime-neon mb-1">Nouveau chapitre</div>
          <div className="text-xs text-white/40">Créer un nouveau chapitre de cours</div>
        </Link>
        <Link href="/admin/lecons/new"
          className="glass-card p-5 border border-cyan-neon/20 bg-cyan-neon/5 hover:bg-cyan-neon/10 transition-all">
          <div className="text-2xl mb-2">📄</div>
          <div className="font-bold text-cyan-neon mb-1">Nouvelle leçon</div>
          <div className="text-xs text-white/40">Ajouter une leçon à un chapitre</div>
        </Link>
        <Link href="/admin/exercices/new"
          className="glass-card p-5 border border-orange-400/20 bg-orange-400/5 hover:bg-orange-400/10 transition-all">
          <div className="text-2xl mb-2">🎯</div>
          <div className="font-bold text-orange-400 mb-1">Nouvel exercice</div>
          <div className="text-xs text-white/40">Ajouter un exercice à une leçon</div>
        </Link>
      </div>
    </div>
  )
}
