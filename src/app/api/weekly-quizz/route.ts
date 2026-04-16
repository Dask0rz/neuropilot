export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const monday = new Date(now)
  monday.setDate(now.getDate() - now.getDay() + 1)
  monday.setHours(0, 0, 0, 0)

  const quiz = await prisma.weeklyQuiz.findFirst({
    where: { weekStart: { gte: monday } },
    include: {
      questions: { orderBy: { order: 'asc' } },
      scores: { where: { userId: session.user.id } }
    }
  })

  if (!quiz) return NextResponse.json({ quiz: null })

  const userScore = quiz.scores[0]
  const questions = quiz.questions.map(q => ({
    id: q.id,
    question: q.question,
    options: JSON.parse(q.options),
    newsSource: q.newsSource,
    order: q.order,
    answer: userScore ? q.answer : null,
    explanation: userScore ? q.explanation : null,
  }))

  return NextResponse.json({
    quiz: {
      id: quiz.id,
      weekStart: quiz.weekStart,
      weekEnd: quiz.weekEnd,
      questions,
      userScore: userScore?.score || null,
      completed: !!userScore,
    }
  })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { quizId, answers } = await req.json()

  const quiz = await prisma.weeklyQuiz.findUnique({
    where: { id: quizId },
    include: { questions: true }
  })

  if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })

  const existing = await prisma.weeklyScore.findFirst({
    where: { quizId, userId: session.user.id }
  })
  if (existing) return NextResponse.json({ error: 'Already submitted' }, { status: 400 })

  let score = 0
  for (const question of quiz.questions) {
    if (answers[question.id] === question.answer) score++
  }

  await prisma.weeklyScore.create({
    data: { quizId, userId: session.user.id, score }
  })

  return NextResponse.json({
    success: true,
    score,
    total: quiz.questions.length,
    details: quiz.questions.map(q => ({
      id: q.id,
      correct: answers[q.id] === q.answer,
      answer: q.answer,
      explanation: q.explanation,
    }))
  })
}