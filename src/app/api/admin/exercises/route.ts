// src/app/api/admin/exercises/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

async function checkAdmin() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return false
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  return user?.role === 'admin'
}

export async function GET(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const lessonId = req.nextUrl.searchParams.get('lessonId')
  const exercises = await prisma.exercise.findMany({
    where: lessonId ? { lessonId } : undefined,
    orderBy: [{ lesson: { order: 'asc' } }, { order: 'asc' }],
    include: {
      lesson: { select: { title: true } },
      options: { orderBy: { order: 'asc' } },
    },
  })
  return NextResponse.json(exercises)
}

export async function POST(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { lessonId, type, question, explanation, order, xpValue, options } = body
  if (!lessonId || !question || !explanation) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
  }
  const exercise = await prisma.exercise.create({
    data: {
      lessonId, type: type ?? 'qcm', question, explanation,
      order: order ?? 1, xpValue: xpValue ?? 5,
      options: {
        create: (options ?? []).map((o: any) => ({
          text: o.text, isCorrect: o.isCorrect, order: o.order ?? 0,
        })),
      },
    },
    include: { options: true },
  })
  return NextResponse.json(exercise)
}
