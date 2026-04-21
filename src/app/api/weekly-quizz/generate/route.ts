export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function GET(req: Request) {
  // Vérification clé secrète pour le cron
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Calcul semaine courante (lundi → dimanche)
  const now = new Date()
  const monday = new Date(now)
  monday.setDate(now.getDate() - now.getDay() + 1)
  monday.setHours(0, 0, 0, 0)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  sunday.setHours(23, 59, 59, 999)

  // Vérifie si un quiz existe déjà cette semaine
  const existing = await prisma.weeklyQuiz.findFirst({
    where: { weekStart: { gte: monday } }
  })
  if (existing) {
    return NextResponse.json({ message: 'Quiz already exists for this week', id: existing.id })
  }

  // Génère les questions avec Claude + web search
  const message = await anthropic.messages.create({
    model:'claude-sonnet-4-5',
    max_tokens: 2000,
    tools: [{ type: "web_search_20250305", name: "web_search" }],
    messages: [{
      role: 'user',
      content: `Tu es un expert en IA. Recherche les 5 actualités les plus importantes sur l'intelligence artificielle de cette semaine (semaine du ${monday.toLocaleDateString('fr-FR')}).

Génère ensuite 10 questions QCM en français basées sur ces actualités. Réponds UNIQUEMENT avec un JSON valide (sans markdown) de ce format :
{
  "questions": [
    {
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "answer": "A",
      "explanation": "...",
      "newsSource": "titre de l'actualité source"
    }
  ]
}`
    }]
  })

  // Parse la réponse
  const textContent = message.content.find(b => b.type === 'text')
  if (!textContent || textContent.type !== 'text') {
    return NextResponse.json({ error: 'No text response from Claude' }, { status: 500 })
  }

  let data
  try {
    const raw = textContent.text
    const match = raw.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON found')
    data = JSON.parse(match[0])
  } catch {
    return NextResponse.json({ error: 'Failed to parse Claude response' }, { status: 500 })
  }

  // Sauvegarde en DB
  const quiz = await prisma.weeklyQuiz.create({
    data: {
      weekStart: monday,
      weekEnd: sunday,
      questions: {
        create: data.questions.map((q: any, i: number) => ({
          question: q.question,
          options: JSON.stringify(q.options),
          answer: q.answer,
          explanation: q.explanation,
          newsSource: q.newsSource || null,
          order: i + 1
        }))
      }
    },
    include: { questions: true }
  })

  return NextResponse.json({ success: true, quizId: quiz.id, questions: quiz.questions.length })
}

// Permet aussi l'appel manuel depuis l'admin via POST
export async function POST(req: Request) {
  return GET(req)
}
