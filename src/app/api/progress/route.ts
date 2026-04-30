export const dynamic = "force-dynamic"
// src/app/api/progress/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { calculateXPEarned, calculateNextReview, getLevelFromXP } from '@/lib/game'
import { applyAutoRecharge, HEART_RECHARGE_MS } from '@/lib/hearts'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const { lessonId, score, correctAnswers, totalExercises, duration, xpBase, heartsLost = 0 } = await req.json()
    const userId = session.user.id

    const [profile, streak] = await Promise.all([
      prisma.profile.findUnique({ where: { userId } }),
      prisma.dailyStreak.findUnique({ where: { userId } }),
    ])

    if (!profile) return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 })

    const currentStreak = streak?.currentStreak ?? 0
    const existingProgress = await prisma.progress.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
    })
    const isFirstCompletion = !existingProgress?.completed

    // Calculate XP
    const xpEarned = calculateXPEarned(xpBase, score, currentStreak, isFirstCompletion)

    // Update or create progress
    await prisma.progress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: {
        score,
        attempts: { increment: 1 },
        bestScore: Math.max(existingProgress?.bestScore ?? 0, score),
        xpEarned: { increment: xpEarned },
        completed: existingProgress?.completed || score >= 50,
        completedAt: score >= 50 && !existingProgress?.completedAt ? new Date() : existingProgress?.completedAt,
      },
      create: {
        userId, lessonId, score,
        attempts: 1,
        bestScore: score,
        xpEarned,
        completed: score >= 50,
        completedAt: score >= 50 ? new Date() : null,
      },
    })

    // Update XP and level
    const newXP = profile.xp + xpEarned
    const newLevel = getLevelFromXP(newXP)
    const totalLessonsCompleted = isFirstCompletion && score >= 50
      ? profile.totalLessonsCompleted + 1
      : profile.totalLessonsCompleted

    await prisma.profile.update({
      where: { userId },
      data: { xp: newXP, level: newLevel, totalLessonsCompleted },
    })

    // Update streak
    const now = new Date()
    const lastActivity = streak?.lastActivityAt
    const isToday = lastActivity && new Date(lastActivity).toDateString() === now.toDateString()
    const isYesterday = lastActivity && (() => {
      const yesterday = new Date(now)
      yesterday.setDate(yesterday.getDate() - 1)
      return new Date(lastActivity).toDateString() === yesterday.toDateString()
    })()

    const newStreak = isToday ? currentStreak : isYesterday ? currentStreak + 1 : 1
    await prisma.dailyStreak.upsert({
      where: { userId },
      update: {
        currentStreak: newStreak,
        longestStreak: Math.max(streak?.longestStreak ?? 0, newStreak),
        lastActivityAt: now,
      },
      create: { userId, currentStreak: 1, longestStreak: 1, lastActivityAt: now },
    })

    // Session history
    await prisma.sessionHistory.create({
      data: { userId, lessonId, xpEarned, score, duration },
    })

    // Update review queue (spaced repetition)
    const existingReview = await prisma.reviewQueue.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
    })
    const { interval, newEaseFactor, newRepetitions } = calculateNextReview(
      existingReview?.easeFactor ?? 2.5,
      existingReview?.repetitions ?? 0,
      score,
    )
    const dueAt = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000)

    await prisma.reviewQueue.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: { dueAt, interval, easeFactor: newEaseFactor, repetitions: newRepetitions },
      create: { userId, lessonId, dueAt, interval, easeFactor: newEaseFactor, repetitions: newRepetitions },
    })

    // Check badges
    const badgesUnlocked: string[] = []
    const allBadges = await prisma.badge.findMany()
    const userBadgeIds = (await prisma.userBadge.findMany({ where: { userId }, select: { badgeId: true } })).map(b => b.badgeId)

    // Fetch current lesson's chapter for chapter-based badge checks
    const currentLesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { chapter: { include: { lessons: { select: { id: true } } } } },
    })

    for (const badge of allBadges) {
      if (userBadgeIds.includes(badge.id)) continue
      const condition = JSON.parse(badge.condition)
      let earned = false

      if (condition.lessonsCompleted && totalLessonsCompleted >= condition.lessonsCompleted) earned = true
      if (condition.streak && newStreak >= condition.streak) earned = true
      if (condition.perfectScore && score === 100) earned = true
      if (condition.xp && newXP >= condition.xp) earned = true

      if (condition.chapter && currentLesson?.chapter && currentLesson.chapter.slug === condition.chapter) {
        const chapterLessonIds = currentLesson.chapter.lessons.map(l => l.id)
        const completedInChapter = await prisma.progress.count({
          where: { userId, lessonId: { in: chapterLessonIds }, completed: true },
        })
        if (completedInChapter >= chapterLessonIds.length) earned = true
      }

      if (earned) {
        await prisma.userBadge.create({ data: { userId, badgeId: badge.id } })
        badgesUnlocked.push(badge.slug)
      }
    }

    // Persist heart loss
    if (heartsLost > 0) {
      const freshProfile = await applyAutoRecharge(userId)
      if (freshProfile) {
        const newHearts = Math.max(0, freshProfile.hearts - heartsLost)
        const needsTimer = newHearts < freshProfile.maxHearts && !freshProfile.nextHeartAt
        await prisma.profile.update({
          where: { userId },
          data: {
            hearts: newHearts,
            nextHeartAt: needsTimer ? new Date(Date.now() + HEART_RECHARGE_MS) : freshProfile.nextHeartAt,
          },
        })
      }
    }

    return NextResponse.json({
      success: true,
      xpEarned,
      newXP,
      newLevel,
      newStreak,
      isFirstCompletion,
      badgesUnlocked,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
