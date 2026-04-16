'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Question {
  id: string
  question: string
  options: string[]
  newsSource: string | null
  order: number
  answer: string | null
  explanation: string | null
}

interface Quiz {
  id: string
  weekStart: string
  weekEnd: string
  questions: Question[]
  userScore: number | null
  completed: boolean
}

export default function WeeklyQuizPage() {
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [currentQ, setCurrentQ] = useState(0)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/weekly-quizz')
      .then(r => r.json())
      .then(data => {
        setQuiz(data.quiz)
        if (data.quiz?.completed) setSubmitted(true)
        setLoading(false)
      })
  }, [])

  const handleAnswer = (questionId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }))
  }

  const handleSubmit = async () => {
    if (!quiz) return
    const res = await fetch('/api/weekly-quizz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId: quiz.id, answers })
    })
    const data = await res.json()
    setResult(data)
    setSubmitted(true)
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-white/40 text-lg">Chargement du quiz...</div>
    </div>
  )

  if (!quiz) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="text-6xl">🎮</div>
      <h1 className="text-2xl font-bold text-white">Pas de quiz cette semaine</h1>
      <p className="text-white/40">Le quiz hebdo est généré chaque lundi. Reviens lundi !</p>
    </div>
  )

  const question = quiz.questions[currentQ]
  const totalAnswered = Object.keys(answers).length
  const allAnswered = totalAnswered === quiz.questions.length

  if (submitted && result) return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🏆</div>
        <h1 className="text-3xl font-black text-white mb-2">{result.score}/{result.total}</h1>
        <p className="text-white/60">{result.score >= 8 ? '🔥 Excellent !' : result.score >= 5 ? '👍 Bien joué !' : '💪 Continue !'}</p>
      </div>
      <div className="space-y-4">
        {result.details?.map((d: any, i: number) => {
          const q = quiz.questions[i]
          return (
            <div key={d.id} className={`p-4 rounded-xl border ${d.correct ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
              <p className="text-white font-semibold mb-1">{q.question}</p>
              <p className="text-sm text-white/60 mb-1">✅ {d.answer}</p>
              <p className="text-xs text-white/40">{d.explanation}</p>
            </div>
          )
        })}
      </div>
      <button onClick={() => router.push('/dashboard')} className="mt-8 w-full py-3 bg-cyan-500 text-black font-bold rounded-xl">
        Retour au dashboard
      </button>
    </div>
  )

  if (submitted && !result) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="text-6xl">✅</div>
      <h1 className="text-2xl font-bold text-white">Quiz déjà complété !</h1>
      <p className="text-white/40">Score : {quiz.userScore}/10</p>
      <button onClick={() => router.push('/dashboard')} className="py-3 px-6 bg-cyan-500 text-black font-bold rounded-xl">
        Retour au dashboard
      </button>
    </div>
  )

  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-black text-white">⚡ Quiz Hebdo</h1>
          <span className="text-white/40 text-sm">{currentQ + 1}/{quiz.questions.length}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div className="bg-cyan-400 h-2 rounded-full transition-all" style={{ width: `${((currentQ + 1) / quiz.questions.length) * 100}%` }} />
        </div>
      </div>
      <div className="mb-6">
        {question.newsSource && <p className="text-xs text-cyan-400/60 mb-2">📰 {question.newsSource}</p>}
        <h2 className="text-lg font-bold text-white mb-4">{question.question}</h2>
        <div className="space-y-3">
          {question.options.map((option, i) => (
            <button key={i} onClick={() => handleAnswer(question.id, option)}
              className={`w-full p-4 rounded-xl text-left transition-all border ${answers[question.id] === option ? 'border-cyan-400 bg-cyan-400/20 text-white' : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'}`}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        {currentQ > 0 && (
          <button onClick={() => setCurrentQ(q => q - 1)} className="flex-1 py-3 border border-white/20 text-white rounded-xl">← Précédent</button>
        )}
        {currentQ < quiz.questions.length - 1 ? (
          <button onClick={() => setCurrentQ(q => q + 1)} disabled={!answers[question.id]} className="flex-1 py-3 bg-cyan-500 text-black font-bold rounded-xl disabled:opacity-40">Suivant →</button>
        ) : (
          <button onClick={handleSubmit} disabled={!allAnswered} className="flex-1 py-3 bg-green-500 text-black font-bold rounded-xl disabled:opacity-40">
            Soumettre ({totalAnswered}/{quiz.questions.length})
          </button>
        )}
      </div>
    </div>
  )
}