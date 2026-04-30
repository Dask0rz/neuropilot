export const dynamic = "force-dynamic"
// src/app/api/badges/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const userId = session.user.id
    const [profile, streak, allBadges, userBadgeIds] = await Promise.all([
      prisma.profile.findUnique({ where: { userId } }),
      prisma.dailyStreak.findUnique({ where: { userId } }),
      prisma.badge.findMany(),
      prisma.userBadge.findMany({ where: { userId }, select: { badgeId: true } }).then(r => r.map(b => b.badgeId)),
    ])

    if (!profile) return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 })

    const totalLessonsCompleted = profile.totalLessonsCompleted
    const currentStreak = streak?.currentStreak ?? 0
    const currentXP = profile.xp

    // Fetch all chapters with their lessons for chapter-based checks
    const chapters = await prisma.chapter.findMany({
      include: { lessons: { select: { id: true } } },
    })

    // Fetch all completed lesson IDs for this user
    const completedLessonIds = new Set(
      (await prisma.progress.findMany({ where: { userId, completed: true }, select: { lessonId: true } })).map(p => p.lessonId)
    )

    const badgesUnlocked: string[] = []
    const debug: Record<string, unknown>[] = []

    for (const badge of allBadges) {
      if (userBadgeIds.includes(badge.id)) {
        debug.push({ slug: badge.slug, status: 'already_earned' })
        continue
      }
      const condition = JSON.parse(badge.condition)
      let earned = false
      const info: Record<string, unknown> = { slug: badge.slug, condition }

      if (condition.lessonsCompleted) {
        info.lessonsCompleted = { required: condition.lessonsCompleted, actual: totalLessonsCompleted }
        if (totalLessonsCompleted >= condition.lessonsCompleted) earned = true
      }
      if (condition.streak) {
        info.streak = { required: condition.streak, actual: currentStreak }
        if (currentStreak >= condition.streak) earned = true
      }
      if (condition.xp) {
        info.xp = { required: condition.xp, actual: currentXP }
        if (currentXP >= condition.xp) earned = true
      }
      if (condition.chapter) {
        const chapter = chapters.find(c => c.slug === condition.chapter)
        if (chapter) {
          const lessonIds = chapter.lessons.map(l => l.id)
          const completedCount = lessonIds.filter(id => completedLessonIds.has(id)).length
          info.chapter = { slug: condition.chapter, total: lessonIds.length, completed: completedCount }
          if (completedCount >= lessonIds.length && lessonIds.length > 0) earned = true
        } else {
          info.chapter = { slug: condition.chapter, error: 'chapter not found in db' }
        }
      }

      info.earned = earned
      debug.push(info)

      if (earned) {
        await prisma.userBadge.create({ data: { userId, badgeId: badge.id } })
        badgesUnlocked.push(badge.slug)
      }
    }

    return NextResponse.json({ badgesUnlocked, debug })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const [allBadges, userBadges] = await Promise.all([
      prisma.badge.findMany(),
      prisma.userBadge.findMany({
        where: { userId: session.user.id },
        include: { badge: true },
      }),
    ])

    const earnedSlugs = new Set(userBadges.map(ub => ub.badge.slug))
    const result = allBadges.map(b => ({
      ...b,
      earned: earnedSlugs.has(b.slug),
      earnedAt: userBadges.find(ub => ub.badge.slug === b.slug)?.earnedAt ?? null,
    }))

    return NextResponse.json(result)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
