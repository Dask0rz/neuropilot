// src/app/api/admin/stats/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

async function checkAdmin() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return false
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  return user?.role === 'admin'
}

export async function GET() {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const [users, chapters, lessons, exercises] = await Promise.all([
    prisma.user.count(),
    prisma.chapter.count(),
    prisma.lesson.count(),
    prisma.exercise.count(),
  ])
  return NextResponse.json({ users, chapters, lessons, exercises })
}
