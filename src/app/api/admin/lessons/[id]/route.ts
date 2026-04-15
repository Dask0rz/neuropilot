// src/app/api/admin/lessons/[id]/route.ts
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

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const lesson = await prisma.lesson.findUnique({
    where: { id: params.id },
    include: { chapter: true },
  })
  if (!lesson) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(lesson)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { chapterId, slug, title, description, order, xpReward, duration, content } = body
  const lesson = await prisma.lesson.update({
    where: { id: params.id },
    data: { chapterId, slug, title, description, order, xpReward, duration, content: content || null },
  })
  return NextResponse.json(lesson)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await prisma.lesson.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
