'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  avatar: string
  level: number
  score: number
  completedAt: string
  isCurrentUser: boolean
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [quizExists, setQuizExists] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(r => r.json())
      .then(data => {
        setLeaderboard(data.leaderboard || [])
        setQuizExists(data.quizExists)
        setLoading(false)
      })
  }, [])

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'text-yellow-400'
    if (rank === 2) return 'text-gray-300'
    if (rank === 3) return 'text-orange-400'
    return 'text-white/40'
  }

  const getRankEmoji = (rank: number) => {
    if (rank === 1) return '👑'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-cyan-400 text-lg animate-pulse">Chargement du leaderboard...</div>
    </div>
  )

  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-5xl mb-2">🕹️</div>
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          LEADERBOARD
        </h1>
        <p className="text-white/40 text-sm mt-1">Quiz hebdo — semaine en cours</p>
      </div>

      {!quizExists ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">⏳</div>
          <p className="text-white/60 text-lg">Pas encore de quiz cette semaine</p>
          <p className="text-white/30 text-sm mt-2">Reviens lundi !</p>
        </div>
      ) : leaderboard.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🎯</div>
          <p className="text-white/60 text-lg">Sois le premier à jouer !</p>
          <button onClick={() => router.push('/dashboard/weekly-quiz')} className="mt-4 px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl">
            Jouer maintenant
          </button>
        </div>
      ) : (
        <>
          {leaderboard.length >= 3 && (
            <div className="flex items-end justify-center gap-4 mb-8">
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-1">{leaderboard[1].avatar}</div>
                <div className="text-gray-300 font-bold text-sm">{leaderboard[1].name?.split(' ')[0]}</div>
                <div className="text-gray-300 font-black">{leaderboard[1].score}/10</div>
                <div className="w-16 h-16 bg-gray-500/30 border border-gray-400/30 rounded-t-lg flex items-end justify-center pb-1">
                  <span className="text-gray-300 font-black text-xl">2</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-1">{leaderboard[0].avatar}</div>
                <div className="text-yellow-400 font-bold text-sm">{leaderboard[0].name?.split(' ')[0]}</div>
                <div className="text-yellow-400 font-black">{leaderboard[0].score}/10</div>
                <div className="w-16 h-24 bg-yellow-500/30 border border-yellow-400/30 rounded-t-lg flex items-end justify-center pb-1">
                  <span className="text-yellow-400 font-black text-2xl">1</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-1">{leaderboard[2].avatar}</div>
                <div className="text-orange-400 font-bold text-sm">{leaderboard[2].name?.split(' ')[0]}</div>
                <div className="text-orange-400 font-black">{leaderboard[2].score}/10</div>
                <div className="w-16 h-12 bg-orange-500/30 border border-orange-400/30 rounded-t-lg flex items-end justify-center pb-1">
                  <span className="text-orange-400 font-black text-xl">3</span>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-2">
            {leaderboard.map((entry) => (
              <div key={entry.userId} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${entry.isCurrentUser ? 'border-cyan-400/50 bg-cyan-400/10' : 'border-white/5 bg-white/5'}`}>
                <span className={`font-black text-lg w-8 text-center ${getRankStyle(entry.rank)}`}>{getRankEmoji(entry.rank)}</span>
                <span className="text-2xl">{entry.avatar}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{entry.name}</span>
                    {entry.isCurrentUser && <span className="text-xs bg-cyan-400/20 text-cyan-400 px-2 py-0.5 rounded-full">Toi</span>}
                  </div>
                  <div className="text-white/30 text-xs">Niveau {entry.level}</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-white text-lg">{entry.score}<span className="text-white/30 text-sm">/10</span></div>
                  <div className="text-white/30 text-xs">{new Date(entry.completedAt).toLocaleDateString('fr-FR')}</div>
                </div>
              </div>
            ))}
          </div>
          {!leaderboard.some(e => e.isCurrentUser) && (
            <button onClick={() => router.push('/dashboard/weekly-quiz')} className="mt-6 w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-black rounded-xl text-lg">
              🎮 Participer au quiz !
            </button>
          )}
        </>
      )}
    </div>
  )
}