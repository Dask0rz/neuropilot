// src/app/admin/utilisateurs/page.tsx
'use client'
import { useEffect, useState } from 'react'

export default function AdminUtilisateursPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/users').then(r => r.json()).then(data => {
      setUsers(data)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-black mb-1">Utilisateurs</h1>
        <p className="text-white/40 text-sm">{users.length} comptes inscrits</p>
      </div>

      {loading ? (
        <div className="text-white/40 text-center py-20">Chargement...</div>
      ) : (
        <div className="space-y-2">
          {users.map(user => (
            <div key={user.id}
              className="glass-card p-4 border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-neon/20 flex items-center justify-center text-lg">
                  {user.profile?.avatar ?? '🤖'}
                </div>
                <div>
                  <div className="font-medium text-white">{user.name ?? 'Sans nom'}</div>
                  <div className="text-xs text-white/40">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div>
                  <div className="text-sm font-bold text-cyan-neon">{user.profile?.xp ?? 0} XP</div>
                  <div className="text-xs text-white/30">Niveau {user.profile?.level ?? 1}</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{user.profile?.totalLessonsCompleted ?? 0}</div>
                  <div className="text-xs text-white/30">leçons</div>
                </div>
                <div className={`text-xs px-3 py-1 rounded-full border ${
                  user.role === 'admin'
                    ? 'border-orange-400/40 bg-orange-400/10 text-orange-400'
                    : 'border-white/10 text-white/30'
                }`}>
                  {user.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
