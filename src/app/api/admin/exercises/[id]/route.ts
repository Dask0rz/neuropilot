// src/app/api/admin/exercises/[id]/route.ts
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

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const exercise = await prisma.exercise.findUnique({
    where: { id: params.id },
    include: { options: { orderBy: { order: 'asc' } }, lesson: true },
  })
  if (!exercise) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(exercise)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { lessonId, type, question, explanation, order, xpValue, options } = body

  // Supprime les anciennes options et recrée
  await prisma.answerOption.deleteMany({ where: { exerciseId: params.id } })
  const exercise = await prisma.exercise.update({
    where: { id: params.id },
    data: {
      lessonId, type, question, explanation, order, xpValue,
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

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await prisma.exercise.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
