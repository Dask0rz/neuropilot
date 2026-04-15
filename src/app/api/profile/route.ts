export const dynamic = "force-dynamic"
// src/app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    })

    return NextResponse.json(profile)
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const body = await req.json()
    const allowed = ['avatar', 'userLevel', 'goal']
    const data: Record<string, any> = {}
    for (const key of allowed) {
      if (body[key] !== undefined) data[key] = body[key]
    }

    const profile = await prisma.profile.update({
      where: { userId: session.user.id },
      data,
    })

    return NextResponse.json(profile)
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
