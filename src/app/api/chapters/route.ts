// src/app/api/chapters/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { isChapterUnlocked } from '@/lib/game'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    const chapters = await prisma.chapter.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: { select: { lessons: true } },
        lessons: {
          select: { id: true, order: true, title: true, xpReward: true, duration: true },
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!session?.user?.id) {
      return NextResponse.json(chapters.map(ch => ({ ...ch, completedLessons: 0, progress: 0, isLocked: ch.order > 1 })))
    }

    const profile = await prisma.profile.findUnique({ where: { userId: session.user.id } })
    const userXP = profile?.xp ?? 0

    const progress = await prisma.progress.findMany({
      where: { userId: session.user.id, completed: true },
      select: { lessonId: true },
    })
    const completedIds = new Set(progress.map(p => p.lessonId))

    const chaptersWithProgress = chapters.map(ch => {
      const completedLessons = ch.lessons.filter(l => completedIds.has(l.id)).length
      const total = ch._count.lessons
      return {
        ...ch,
        completedLessons,
        progress: total > 0 ? Math.round((completedLessons / total) * 100) : 0,
        isLocked: !isChapterUnlocked(ch.order, userXP),
      }
    })

    return NextResponse.json(chaptersWithProgress)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
