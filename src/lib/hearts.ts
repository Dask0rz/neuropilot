import { prisma } from './prisma'

export const HEART_RECHARGE_MS = 3 * 60 * 60 * 1000 // 3 heures

export async function applyAutoRecharge(userId: string) {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    select: { hearts: true, maxHearts: true, nextHeartAt: true },
  })
  if (!profile) return null

  if (profile.hearts >= profile.maxHearts || !profile.nextHeartAt) {
    return { hearts: profile.hearts, maxHearts: profile.maxHearts, nextHeartAt: null as Date | null }
  }

  const now = new Date()
  let hearts = profile.hearts
  let nextHeartAt: Date | null = profile.nextHeartAt

  while (hearts < profile.maxHearts && nextHeartAt && nextHeartAt <= now) {
    hearts++
    nextHeartAt = hearts < profile.maxHearts
      ? new Date(nextHeartAt.getTime() + HEART_RECHARGE_MS)
      : null
  }

  if (hearts !== profile.hearts) {
    await prisma.profile.update({
      where: { userId },
      data: { hearts, nextHeartAt },
    })
  }

  return { hearts, maxHearts: profile.maxHearts, nextHeartAt }
}
