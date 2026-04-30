export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { applyAutoRecharge } from '@/lib/hearts'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const result = await applyAutoRecharge(session.user.id)
  if (!result) return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 })

  return NextResponse.json(result)
}

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
