export const dynamic = "force-dynamic"
// src/app/api/dashboard/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { isChapterUnlocked } from '@/lib/game'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const userId = session.user.id

    const [profile, streak, badges, sessions, reviewItems, chapters] = await Promise.all([
      prisma.profile.findUnique({ where: { userId } }),
      prisma.dailyStreak.findUnique({ where: { userId } }),
      prisma.userBadge.findMany({
        where: { userId },
        include: { badge: true },
        orderBy: { earnedAt: 'desc' },
      }),
      prisma.sessionHistory.findMany({
        where: { userId },
        orderBy: { completedAt: 'desc' },
        take: 10,
      }),
      prisma.reviewQueue.findMany({
        where: { userId, dueAt: { lte: new Date() } },
        select: { lessonId: true },
      }),
      prisma.chapter.findMany({
        orderBy: { order: 'asc' },
        include: {
          _count: { select: { lessons: true } },
          lessons: { select: { id: true } },
        },
      }),
    ])

    const progress = await prisma.progress.findMany({
      where: { userId, completed: true },
      select: { lessonId: true },
    })
    const completedIds = new Set(progress.map(p => p.lessonId))

    const userXP = profile?.xp ?? 0

    // Today's XP
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todaySessions = sessions.filter(s => new Date(s.completedAt) >= today)
    const todayXP = todaySessions.reduce((sum, s) => sum + s.xpEarned, 0)

    const chaptersProgress = chapters.map(ch => ({
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterEmoji: ch.emoji,
      totalLessons: ch._count.lessons,
      completedLessons: ch.lessons.filter(l => completedIds.has(l.id)).length,
      percentage: ch._count.lessons > 0
        ? Math.round((ch.lessons.filter(l => completedIds.has(l.id)).length / ch._count.lessons) * 100)
        : 0,
      isLocked: !isChapterUnlocked(ch.order, userXP),
    }))

    return NextResponse.json({
      profile,
      streak,
      badges: badges.map(ub => ({ ...ub.badge, earnedAt: ub.earnedAt })),
      chaptersProgress,
      todayXP,
      reviewCount: reviewItems.length,
      recentSessions: sessions.slice(0, 5),
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
