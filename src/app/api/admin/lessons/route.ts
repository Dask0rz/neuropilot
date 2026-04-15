export const dynamic = "force-dynamic"
// src/app/api/admin/lessons/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function checkAdmin() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return false
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  return user?.role === 'admin'
}

export async function GET(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const simple = req.nextUrl.searchParams.get('simple')
  const lessons = await prisma.lesson.findMany({
    orderBy: [{ chapter: { order: 'asc' } }, { order: 'asc' }],
    include: simple
      ? { chapter: { select: { emoji: true, title: true } } }
      : { chapter: { select: { emoji: true, title: true } }, _count: { select: { exercises: true } } },
  })
  return NextResponse.json(lessons)
}

export async function POST(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { chapterId, slug, title, description, order, xpReward, duration, content } = body
  if (!chapterId || !slug || !title || !description) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
  }
  const lesson = await prisma.lesson.create({
    data: { chapterId, slug, title, description, order: order ?? 1, xpReward: xpReward ?? 20, duration: duration ?? 5, content: content || null },
  })
  return NextResponse.json(lesson)
}
