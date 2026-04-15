export const dynamic = "force-dynamic"
// src/app/api/lessons/[lessonId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: params.lessonId },
      include: {
        exercises: {
          include: { options: { orderBy: { order: 'asc' } } },
          orderBy: { order: 'asc' },
        },
        chapter: true,
      },
    })

    if (!lesson) return NextResponse.json({ error: 'Leçon introuvable' }, { status: 404 })

    const session = await getServerSession(authOptions)
    let userProgress = null
    if (session?.user?.id) {
      userProgress = await prisma.progress.findUnique({
        where: { userId_lessonId: { userId: session.user.id, lessonId: params.lessonId } },
      })
    }

    return NextResponse.json({ ...lesson, userProgress })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
