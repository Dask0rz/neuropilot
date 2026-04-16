export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Semaine courante
  const now = new Date()
  const monday = new Date(now)
  monday.setDate(now.getDate() - now.getDay() + 1)
  monday.setHours(0, 0, 0, 0)

  // Quiz de la semaine
  const quiz = await prisma.weeklyQuiz.findFirst({
    where: { weekStart: { gte: monday } }
  })

  if (!quiz) {
    return NextResponse.json({ leaderboard: [], quizExists: false })
  }

  // Scores de la semaine triés
  const scores = await prisma.weeklyScore.findMany({
    where: { quizId: quiz.id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profile: { select: { avatar: true, level: true } }
        }
      }
    },
    orderBy: [
      { score: 'desc' },
      { completedAt: 'asc' } // égalité → premier arrivé
    ]
  })

  const leaderboard = scores.map((s, i) => ({
    rank: i + 1,
    userId: s.user.id,
    name: s.user.name || s.user.email,
    avatar: s.user.profile?.avatar || '🧠',
    level: s.user.profile?.level || 1,
    score: s.score,
    completedAt: s.completedAt,
    isCurrentUser: s.user.id === session.user.id
  }))

  return NextResponse.json({ leaderboard, quizExists: true })
}