export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { applyAutoRecharge, HEART_RECHARGE_MS } from '@/lib/hearts'

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const result = await applyAutoRecharge(session.user.id)
  if (!result) return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 })

  return NextResponse.json(result)
}

// PATCH : perte de cœurs (quit mid-quiz)
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const { heartsLost = 0 } = await req.json()
  if (heartsLost <= 0) return NextResponse.json({ success: true })

  const freshProfile = await applyAutoRecharge(session.user.id)
  if (!freshProfile) return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 })

  const newHearts = Math.max(0, freshProfile.hearts - heartsLost)
  const needsTimer = newHearts < freshProfile.maxHearts && !freshProfile.nextHeartAt
  await prisma.profile.update({
    where: { userId: session.user.id },
    data: {
      hearts: newHearts,
      nextHeartAt: needsTimer ? new Date(Date.now() + HEART_RECHARGE_MS) : freshProfile.nextHeartAt,
    },
  })

  return NextResponse.json({ hearts: newHearts, maxHearts: freshProfile.maxHearts })
}

// POST : recharge complète des cœurs
export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const profile = await prisma.profile.findUnique({ where: { userId: session.user.id } })
  if (!profile) return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 })

  await prisma.profile.update({
    where: { userId: session.user.id },
    data: { hearts: profile.maxHearts, nextHeartAt: null },
  })

  return NextResponse.json({ hearts: profile.maxHearts, maxHearts: profile.maxHearts, nextHeartAt: null })
}
