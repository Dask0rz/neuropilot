export const dynamic = "force-dynamic"
// src/app/api/review/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const reviews = await prisma.reviewQueue.findMany({
      where: {
        userId: session.user.id,
        dueAt: { lte: new Date() },
      },
      include: {
        lesson: {
          include: {
            chapter: { select: { title: true, emoji: true, color: true } },
            exercises: {
              include: { options: { orderBy: { order: 'asc' } } },
              orderBy: { order: 'asc' },
              take: 3,
            },
          },
        },
      },
      orderBy: { dueAt: 'asc' },
      take: 20,
    })

    return NextResponse.json(reviews)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
