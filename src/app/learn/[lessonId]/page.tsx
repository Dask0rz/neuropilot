// src/app/learn/[lessonId]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useGameStore } from '@/store/gameStore'
import { Exercise } from '@/types'
import { calculateScore, getScoreLabel } from '@/lib/game'
import Link from 'next/link'

type LessonPhase = 'loading' | 'course' | 'quiz' | 'result'

export default function LearnPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const [lesson, setLesson] = useState<any>(null)
  const [phase, setPhase] = useState<LessonPhase>('loading')
  const [submitting, setSubmitting] = useState(false)

  const {
    currentExerciseIndex, exercises, hearts, xpEarned, completed,
    showExplanation, lastAnswerCorrect, initGame, answerExercise, nextExercise, resetGame,
  } = useGameStore()

  useEffect(() => {
    fetch(`/api/lessons/${lessonId}`)
      .then(r => r.json())
      .then(data => {
        setLesson(data)
        initGame(data.exercises ?? [], 5)
        setPhase(data.content ? 'course' : 'quiz')
      })
    return () => resetGame()
  }, [lessonId])

  async function handleComplete() {
    if (submitting) return
    setSubmitting(true)
    const state = useGameStore.getState()
    const correct = state.answers.filter(a => a.isCorrect).length
    const score = calculateScore(correct, exercises.length)
    const duration = Math.round((Date.now() - state.startTime) / 1000)
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId, score, correctAnswers: correct, totalExercises: exercises.length, duration, xpBase: lesson?.xpReward ?? 20 }),
    })
    setSubmitting(false)
  }

  if (phase === 'loading') return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center">
      <div className="text-5xl animate-bounce">🧠</div>
    </div>
  )

  if (phase === 'course' && lesson?.content) {
    return (
      <div className="min-h-screen bg-navy-900 bg-grid">
        <div className="sticky top-0 z-10 glass border-b border-white/5 px-6 py-4 flex items-center gap-4">
          <Link href={`/dashboard/chapters/${lesson?.chapter?.id}`} onClick={resetGame} className="text-white/40 hover:text-white transition-colors">X</Link>
          <div className="flex-1">
            <div className="text-xs text-white/30 font-mono uppercase tracking-widest">{lesson?.chapter?.title} - Lecon {lesson?.order}</div>
            <div className="font-display font-bold truncate">{lesson?.title}</div>
          </div>
          <span className="xp-badge">+{lesson?.xpReward} XP</span>
        </div>
        <div className="max-w-2xl mx-auto px-6 py-10">
          <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: renderContent(lesson.content) }} />
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-center text-white/40 text-sm mb-4">Tu as lu le cours ? Place au quiz !</p>
            <button onClick={() => { setPhase('quiz'); window.scrollTo(0, 0) }} className="btn-primary w-full py-4 text-lg">
              Commencer le quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (completed && phase !== 'result') {
    setPhase('result')
    handleComplete()
  }

  if (phase === 'result') {
    return <LessonResultScreen lesson={lesson} exercises={exercises} hearts={hearts} xpEarned={xpEarned} />
  }

  const currentExercise = exercises[currentExerciseIndex]
  if (!currentExercise) return null
  const progress = (currentExerciseIndex / exercises.length) * 100

  return (
    <div className="min-h-screen bg-navy-900 bg-grid flex flex-col">
      <div className="flex items-center gap-4 px-6 py-4 glass border-b border-white/5">
        <Link href={`/dashboard/chapters/${lesson?.chapter?.id}`} onClick={resetGame} className="text-white/40 hover:text-white transition-colors">X</Link>
        <div className="flex-1">
          <div className="progress-bar">
            <div className="progress-fill transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`heart ${i < hearts ? '' : 'empty'}`}>❤️</span>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start px-6 py-8 max-w-2xl mx-auto w-full">
        <div className="w-full mb-3">
          <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
            Question {currentExerciseIndex + 1} / {exercises.length}
          </span>
        </div>
        <ExerciseCard exercise={currentExercise} showExplanation={showExplanation} lastAnswerCorrect={lastAnswerCorrect} onAnswer={answerExercise} />
      </div>

      {showExplanation && (
        <div className={`p-6 border-t ${lastAnswerCorrect ? 'border-lime-neon/20 bg-lime-neon/5' : 'border-red-500/20 bg-red-500/5'}`}>
          <div className="max-w-2xl mx-auto">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">{lastAnswerCorrect ? '✅' : '❌'}</span>
              <div>
                <div className={`font-display font-bold mb-1 ${lastAnswerCorrect ? 'text-lime-neon' : 'text-red-400'}`}>
                  {lastAnswerCorrect ? 'Correct !' : 'Pas tout a fait...'}
                </div>
                <div className="text-sm text-white/60 leading-relaxed">{currentExercise.explanation}</div>
              </div>
            </div>
            <button onClick={nextExercise} className={`w-full py-3 font-display font-bold rounded-xl transition-all active:scale-95 ${lastAnswerCorrect ? 'bg-lime-neon text-navy-900 hover:bg-white' : 'bg-red-500/30 text-white border border-red-500/50 hover:bg-red-500/40'}`}>
              Continuer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function renderContent(content: string): string {
  return content
    .replace(/^### (.*)/gm, '<h3 class="font-display text-xl font-black mt-8 mb-3 text-white">$1</h3>')
    .replace(/^## (.*)/gm, '<h2 class="font-display text-2xl font-black mt-10 mb-4 text-gradient">$1</h2>')
    .replace(/^# (.*)/gm, '<h1 class="font-display text-3xl font-black mb-6 text-white">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-cyan-neon not-italic font-medium">$1</em>')
    .replace(/^> 💡 (.*)/gm, '<div class="my-6 glass rounded-2xl p-5 border border-cyan-neon/20"><div class="flex gap-3"><span class="text-2xl shrink-0">💡</span><p class="text-white/80 leading-relaxed m-0">$1</p></div></div>')
    .replace(/^> 🔥 (.*)/gm, '<div class="my-6 glass rounded-2xl p-5 border border-orange-400/30 bg-orange-400/5"><div class="flex gap-3"><span class="text-2xl shrink-0">🔥</span><p class="text-white/80 leading-relaxed m-0">$1</p></div></div>')
    .replace(/^> ⚡ (.*)/gm, '<div class="my-6 glass rounded-2xl p-5 border border-lime-neon/20 bg-lime-neon/5"><div class="flex gap-3"><span class="text-2xl shrink-0">⚡</span><p class="text-white/80 leading-relaxed m-0">$1</p></div></div>')
    .replace(/^> (.*)/gm, '<blockquote class="my-4 pl-4 border-l-2 border-cyan-neon/40 text-white/60 italic">$1</blockquote>')
    .replace(/^- (.*)/gm, '<li class="ml-4 text-white/80 leading-relaxed list-none flex gap-2"><span class="text-cyan-neon mt-1">▸</span><span>$1</span></li>')
    .replace(/\n\n/g, '</p><p class="text-white/70 leading-relaxed my-4">')
}

function ExerciseCard({ exercise, showExplanation, lastAnswerCorrect, onAnswer }: {
  exercise: Exercise
  showExplanation: boolean
  lastAnswerCorrect: boolean | null
  onAnswer: (id: string, optId: string, correct: boolean, xp: number) => void
}) {
  const [selected, setSelected] = useState<string | null>(null)
  useEffect(() => { setSelected(null) }, [exercise.id])

  function handleSelect(optionId: string, isCorrect: boolean) {
    if (showExplanation) return
    setSelected(optionId)
    onAnswer(exercise.id, optionId, isCorrect, exercise.xpValue)
  }

  const typeLabel: Record<string, string> = {
    qcm: '📝 QCM', vrai_faux: '⚡ Vrai ou Faux', relier: '🔗 Association',
    completer: '✏️ Completer', ordre: '📋 Remettre en ordre', cas_pratique: '💼 Cas pratique',
  }

  return (
    <div className="w-full animate-slide-up">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-mono text-white/30 bg-white/5 px-3 py-1 rounded-full">{typeLabel[exercise.type] ?? 'Exercice'}</span>
        <span className="xp-badge">+{exercise.xpValue} XP</span>
      </div>
      <h2 className="font-display text-xl md:text-2xl font-bold mb-6 leading-tight">{exercise.question}</h2>
      <div className="space-y-3">
        {exercise.options.map(option => {
          const isSelected = selected === option.id
          const isCorrectOption = option.isCorrect
          let className = 'exercise-option'
          if (showExplanation) {
            if (isCorrectOption) className += ' correct'
            else if (isSelected && !isCorrectOption) className += ' wrong'
          } else if (isSelected) className += ' selected'

          return (
            <button key={option.id} onClick={() => handleSelect(option.id, option.isCorrect)}
              className={`${className} w-full text-left ${showExplanation ? 'cursor-default' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center text-xs font-bold transition-colors ${
                  showExplanation && isCorrectOption ? 'border-lime-neon bg-lime-neon text-navy-900' :
                  showExplanation && isSelected && !isCorrectOption ? 'border-red-400 bg-red-400/20' :
                  isSelected ? 'border-cyan-neon bg-cyan-neon/20' : 'border-white/20'
                }`}>
                  {showExplanation && isCorrectOption ? '✓' :
                   showExplanation && isSelected && !isCorrectOption ? 'X' :
                   String.fromCharCode(65 + exercise.options.indexOf(option))}
                </div>
                <span className="leading-snug">{option.text}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function LessonResultScreen({ lesson, exercises, hearts, xpEarned }: any) {
  const correct = useGameStore.getState().answers.filter((a: any) => a.isCorrect).length
  const score = calculateScore(correct, exercises.length)
  const { label, color, emoji } = getScoreLabel(score)
  const [showContent, setShowContent] = useState(false)
  const [confetti, setConfetti] = useState<Array<{id: number, x: number, color: string, delay: number, duration: number}>>([])

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100)
    if (score >= 60) {
      const pieces = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ['#00D4FF', '#A3FF47', '#FFB347', '#FF6B6B', '#C9B1FF', '#ffffff'][Math.floor(Math.random() * 6)],
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
      }))
      setConfetti(pieces)
    }
  }, [])

  return (
    <div className="min-h-screen bg-navy-900 bg-grid flex flex-col items-center justify-center p-6 overflow-hidden">
      {confetti.map(c => (
        <div
          key={c.id}
          className="fixed top-0 w-2 h-3 rounded-sm pointer-events-none z-50"
          style={{
            left: `${c.x}%`,
            backgroundColor: c.color,
            animation: `confetti-fall ${c.duration}s ease-in ${c.delay}s forwards`,
          }}
        />
      ))}

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
          style={{ background: `${color}15` }} />
      </div>

      <div className={`relative max-w-md w-full text-center transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-8xl mb-4 animate-bounce-in">{emoji}</div>
        <h1 className="font-display text-4xl font-black mb-2" style={{ color }}>{label}</h1>
        <p className="text-white/40 mb-1 text-sm">{lesson?.chapter?.title}</p>
        <p className="text-white/60 mb-8 font-medium">{lesson?.title}</p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="glass-card p-4 border border-white/10 overflow-hidden">
            <div className="font-display text-2xl font-black mb-1 leading-none" style={{ color }}>{score}%</div>
            <div className="text-xs text-white/40 mt-1">Score</div>
            <div className="text-xs text-white/30 mt-1">{correct}/{exercises.length}</div>
          </div>
          <div className="glass-card p-4 border border-lime-neon/20 bg-lime-neon/5 overflow-hidden">
            <div className="font-display text-2xl font-black text-lime-neon mb-1 leading-none">+{xpEarned}</div>
            <div className="text-xs text-white/40 mt-1">XP gagnes</div>
            <div className="text-xs text-lime-neon/50 mt-1">Ajoutes</div>
          </div>
          <div className="glass-card p-4 border border-white/10 overflow-hidden">
            <div className="font-display text-2xl font-black text-red-400 mb-1 leading-none">{hearts}</div>
            <div className="text-xs text-white/40 mt-1">Vies restantes</div>
          </div>
        </div>

        <div className="glass-card p-4 mb-6 text-left">
          <div className="flex justify-between text-xs text-white/40 mb-2">
            <span>Performance</span>
            <span style={{ color }}>{score >= 80 ? 'Excellent' : score >= 60 ? 'Bien' : 'Continue'}</span>
          </div>
          <div className="progress-bar h-3">
            <div
              className="h-full rounded-full transition-all duration-1000 delay-500"
              style={{
                width: showContent ? `${score}%` : '0%',
                background: `linear-gradient(90deg, ${color}, ${score === 100 ? '#A3FF47' : color})`,
              }}
            />
          </div>
        </div>

        {score === 100 && (
          <div className="glass-card p-4 mb-6 border border-lime-neon/30 bg-lime-neon/5 animate-fade-in">
            <p className="text-lime-neon font-bold text-sm">Score parfait ! Continue comme ca !</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link href={`/dashboard/chapters/${lesson?.chapter?.id}`} className="btn-primary py-4 text-lg inline-block">
            Continuer le parcours
          </Link>
          <Link href="/dashboard" className="btn-secondary py-3 text-sm inline-block">
            Retour au dashboard
          </Link>
          <button onClick={() => window.location.reload()} className="text-white/30 hover:text-white/60 transition-colors text-sm py-2">
            Recommencer la lecon
          </button>
        </div>
      </div>
    </div>
  )
}
