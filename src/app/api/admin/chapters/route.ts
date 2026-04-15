// src/app/api/admin/chapters/route.ts
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

export async function GET() {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const chapters = await prisma.chapter.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { lessons: true } } },
  })
  return NextResponse.json(chapters)
}

export async function POST(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { slug, title, description, emoji, order, color, xpRequired, isLocked } = body
  if (!slug || !title || !description || !emoji) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
  }
  const chapter = await prisma.chapter.create({
    data: { slug, title, description, emoji, order: order ?? 1, color: color ?? '#00D4FF', xpRequired: xpRequired ?? 0, isLocked: isLocked ?? false },
  })
  return NextResponse.json(chapter)
}
