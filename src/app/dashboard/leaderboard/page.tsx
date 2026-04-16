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
        <div className="text-center p