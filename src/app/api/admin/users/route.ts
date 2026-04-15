// src/app/api/admin/users/route.ts
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
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, name: true, email: true, role: true, createdAt: true,
      profile: { select: { xp: true, level: true, totalLessonsCompleted: true, avatar: true } },
    },
  })
  return NextResponse.json(users)
}
