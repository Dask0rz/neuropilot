// src/app/api/stats/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const userId = session.user.id

    const [sessions, progress, profile] = await Promise.all([
      prisma.sessionHistory.findMany({
        where: { userId },
        orderBy: { completedAt: 'desc' },
        take: 30,
      }),
      prisma.progress.findMany({
        where: { userId },
        include: {
          lesson: {
            include: { chapter: { select: { title: true, emoji: true, color: true } } },
          },
        },
      }),
      prisma.profile.findUnique({ where: { userId } }),
    ])

    // Weekly XP (last 7 days)
    const now = new Date()
    const weeklyXP = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(now)
      day.setDate(day.getDate() - (6 - i))
      day.setHours(0, 0, 0, 0)
      const next = new Date(day)
      next.setDate(next.getDate() + 1)
      const dayXP = sessions
        .filter(s => {
          const d = new Date(s.completedAt)
          return d >= day && d < next
        })
        .reduce((sum, s) => sum + s.xpEarned, 0)
      return {
        day: day.toLocaleDateString('fr-FR', { weekday: 'short' }),
        xp: dayXP,
      }
    })

    // Per-chapter score
    const chapterScores: Record<string, { title: string; emoji: string; color: string; scores: number[] }> = {}
    for (const p of progress) {
      const ch = p.lesson.chapter
      if (!chapterScores[ch.title]) {
        chapterScores[ch.title] = { title: ch.title, emoji: ch.emoji, color: ch.color, scores: [] }
      }
      if (p.bestScore > 0) chapterScores[ch.title].scores.push(p.bestScore)
    }

    const chapterAverages = Object.values(chapterScores).map(ch => ({
      title: ch.title,
      emoji: ch.emoji,
      color: ch.color,
      average: ch.scores.length > 0
        ? Math.round(ch.scores.reduce((a, b) => a + b, 0) / ch.scores.length)
        : 0,
      lessons: ch.scores.length,
    }))

    // Mastered vs to review
    const mastered = progress.filter(p => p.bestScore >= 80 && p.completed).length
    const toReview = progress.filter(p => p.completed && p.bestScore < 80).length

    return NextResponse.json({
      weeklyXP,
      chapterAverages,
      mastered,
      toReview,
      totalSessions: sessions.length,
      totalXP: profile?.xp ?? 0,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
