export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import webpush from 'web-push'

webpush.setVapidDetails(
  process.env.VAPID_EMAIL!,
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Utilisateurs avec un streak actif qui n'ont pas joué aujourd'hui
  const streaks = await prisma.dailyStreak.findMany({
    where: {
      currentStreak: { gt: 0 },
      lastActivityAt: { lt: today },
    },
    include: {
      user: { include: { pushSubscriptions: true } },
    },
  })

  let sent = 0
  for (const streak of streaks) {
    for (const sub of streak.user.pushSubscriptions) {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          JSON.stringify({
            title: `🔥 Ta streak de ${streak.currentStreak} jours est en danger !`,
            body: 'Fais une leçon maintenant pour ne pas la perdre.',
            url: '/dashboard',
          })
        )
        sent++
      } catch {
        // Subscription expirée → on la supprime
        await prisma.pushSubscription.delete({ where: { endpoint: sub.endpoint } })
      }
    }
  }

  return NextResponse.json({ sent })
}