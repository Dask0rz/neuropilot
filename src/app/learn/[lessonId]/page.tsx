// src/app/learn/[lessonId]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useGameStore } from '@/store/gameStore'
import { Exercise, AnswerOption } from '@/types'
import { calculateScore, getScoreLabel } from '@/lib/game'
import { playCorrect, playWrong, playLevelUpSound } from '@/lib/sound'
import Link from 'next/link'
import BadgeUnlockedPopup from '@/components/BadgeUnlockedPopup'
import {
  DndContext, closestCenter, PointerSensor, TouchSensor,
  useSensor, useSensors, DragEndEvent, DragStartEvent, DragOverlay,
} from '@dnd-kit/core'
import {
  SortableContext, verticalListSortingStrategy,
  useSortable, arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type LessonPhase = 'loading' | 'course' | 'quiz' | 'result' | 'no_hearts'

export default function LearnPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const [lesson, setLesson] = useState<any>(null)
  const [phase, setPhase] = useState<LessonPhase>('loading')
  const [submitting, setSubmitting] = useState(false)
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([])
  const [initialHearts, setInitialHearts] = useState(5)
  const [nextHeartAt, setNextHeartAt] = useState<string | null>(null)

  const {
    currentExerciseIndex, exercises, hearts, xpEarned, completed,
    showExplanation, lastAnswerCorrect, initGame, answerExercise, nextExercise, resetGame,
  } = useGameStore()

  useEffect(() => {
    Promise.all([
      fetch(`/api/lessons/${lessonId}`).then(r => r.json()),
      fetch('/api/hearts').then(r => r.json()),
    ]).then(([lessonData, heartsData]) => {
      setLesson(lessonData)
      const h = heartsData.hearts ?? 5
      setInitialHearts(h)
      setNextHeartAt(heartsData.nextHeartAt ?? null)

      if (h === 0) {
        setPhase('no_hearts')
        return
      }

      const sorted = [...(lessonData.exercises ?? [])].sort((a: any, b: any) => {
        const complex = ['ordre', 'relier', 'completer']
        const aComplex = complex.includes(a.type) ? 1 : 0
        const bComplex = complex.includes(b.type) ? 1 : 0
        return aComplex - bComplex
      })
      initGame(sorted, h)
      setPhase(lessonData.content ? 'course' : 'quiz')
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
    const heartsLost = Math.max(0, initialHearts - state.hearts)
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId, score, correctAnswers: correct, totalExercises: exercises.length, duration, xpBase: lesson?.xpReward ?? 20, heartsLost }),
    })
    const data = await res.json()
    if (data.badgesUnlocked?.length > 0) setUnlockedBadges(data.badgesUnlocked)
    setSubmitting(false)
  }

  if (phase === 'no_hearts') {
    return <NoHeartsScreen nextHeartAt={nextHeartAt} onRecharge={() => {
      fetch('/api/hearts', { method: 'POST' }).then(() => window.location.reload())
    }} />
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
    return (
      <>
        <LessonResultScreen lesson={lesson} exercises={exercises} hearts={hearts} xpEarned={xpEarned} />
        {unlockedBadges.length > 0 && (
          <BadgeUnlockedPopup slugs={unlockedBadges} onDone={() => setUnlockedBadges([])} />
        )}
      </>
    )
  }

  const currentExercise = exercises[currentExerciseIndex]
  if (!currentExercise) return null
  const progress = (currentExerciseIndex / exercises.length) * 100

  return (
    <div className="min-h-screen bg-navy-900 bg-grid flex flex-col">
      <div className="flex items-center gap-4 px-6 py-4 glass border-b border-white/5 pt-[max(1rem,env(safe-area-inset-top))]">
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

function NoHeartsScreen({ nextHeartAt, onRecharge }: { nextHeartAt: string | null, onRecharge: () => void }) {
  const [countdown, setCountdown] = useState('')
  const [recharging, setRecharging] = useState(false)

  useEffect(() => {
    if (!nextHeartAt) return
    const target = new Date(nextHeartAt).getTime()
    const update = () => {
      const diff = target - Date.now()
      if (diff <= 0) { setCountdown('00:00:00'); return }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setCountdown(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [nextHeartAt])

  return (
    <div className="min-h-screen bg-navy-900 bg-grid flex flex-col items-center justify-center p-6">
      <div className="max-w-sm w-full text-center">
        <div className="text-8xl mb-6">💔</div>
        <h1 className="font-display text-3xl font-black mb-2">Plus de vies !</h1>
        <p className="text-white/50 mb-8">Recharge tes cœurs pour continuer à apprendre.</p>

        <div className="glass-card p-6 mb-6 neon-border">
          <div className="flex justify-center gap-2 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-2xl opacity-20">❤️</span>
            ))}
          </div>
          {nextHeartAt && (
            <div className="text-center">
              <div className="text-xs text-white/40 mb-1">Prochain cœur dans</div>
              <div className="font-mono text-2xl font-bold text-cyan-neon">{countdown}</div>
            </div>
          )}
        </div>

        <button
          onClick={async () => { setRecharging(true); onRecharge() }}
          disabled={recharging}
          className="btn-primary w-full py-4 text-lg mb-4 disabled:opacity-50"
        >
          {recharging ? 'Rechargement...' : '❤️ Recharger maintenant (gratuit)'}
        </button>

        <Link href="/dashboard" className="btn-secondary py-3 text-sm inline-block w-full">
          Retour à l'accueil
        </Link>
      </div>
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

// ─── Routeur d'exercice ───────────────────────────────────────────────────────

function ExerciseCard({ exercise, showExplanation, lastAnswerCorrect, onAnswer }: {
  exercise: Exercise
  showExplanation: boolean
  lastAnswerCorrect: boolean | null
  onAnswer: (id: string, optId: string, correct: boolean, xp: number) => void
}) {
  const typeLabel: Record<string, string> = {
    qcm: '📝 QCM',
    vrai_faux: '⚡ Vrai ou Faux',
    relier: '🔗 Association',
    completer: '✏️ Compléter',
    ordre: '📋 Remettre en ordre',
    cas_pratique: '💼 Cas pratique',
  }

  const header = (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xs font-mono text-white/30 bg-white/5 px-3 py-1 rounded-full">
        {typeLabel[exercise.type] ?? 'Exercice'}
      </span>
      <span className="xp-badge">+{exercise.xpValue} XP</span>
    </div>
  )

  if (exercise.type === 'relier') {
    return <RelierExercise exercise={exercise} showExplanation={showExplanation} onAnswer={onAnswer} header={header} />
  }
  if (exercise.type === 'ordre') {
    return <OrdreExercise exercise={exercise} showExplanation={showExplanation} onAnswer={onAnswer} header={header} />
  }
  if (exercise.type === 'completer') {
    return <CompleterExercise exercise={exercise} showExplanation={showExplanation} onAnswer={onAnswer} header={header} />
  }

  return <QcmExercise exercise={exercise} showExplanation={showExplanation} lastAnswerCorrect={lastAnswerCorrect} onAnswer={onAnswer} header={header} />
}

// ─── QCM / Vrai-Faux / Cas pratique ──────────────────────────────────────────

function QcmExercise({ exercise, showExplanation, lastAnswerCorrect, onAnswer, header }: {
  exercise: Exercise
  showExplanation: boolean
  lastAnswerCorrect: boolean | null
  onAnswer: (id: string, optId: string, correct: boolean, xp: number) => void
  header: React.ReactNode
}) {
  const [selected, setSelected] = useState<string | null>(null)
const [shuffled, setShuffled] = useState<AnswerOption[]>([])
useEffect(() => {
  setSelected(null)
  setShuffled([...exercise.options].sort(() => Math.random() - 0.5))
}, [exercise.id])

  function handleSelect(optionId: string, isCorrect: boolean) {
    if (showExplanation) return
    setSelected(optionId)
    if (isCorrect) playCorrect()
    else playWrong()
    onAnswer(exercise.id, optionId, isCorrect, exercise.xpValue)
  }

  return (
    <div className="w-full animate-slide-up">
      {header}
      <h2 className="font-display text-xl md:text-2xl font-bold mb-6 leading-tight">{exercise.question}</h2>
      <div className="space-y-3">
        {shuffled.map(option => {
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
                   showExplanation && isSelected && !isCorrectOption ? '✗' :
                   String.fromCharCode(65 + shuffled.indexOf(option))}
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

// ─── Exercice RELIER ──────────────────────────────────────────────────────────
// Format attendu dans la DB : option.text = "Terme gauche || Terme droite"

function RelierExercise({ exercise, showExplanation, onAnswer, header }: {
  exercise: Exercise
  showExplanation: boolean
  onAnswer: (id: string, optId: string, correct: boolean, xp: number) => void
  header: React.ReactNode
}) {
  const pairs = exercise.options
    .filter(o => o.isCorrect && o.text.includes(' || '))
    .map(o => {
      const [left, right] = o.text.split(' || ')
      return { id: o.id, left: left.trim(), right: right.trim() }
    })

  const [rightItems] = useState(() => [...pairs].sort(() => Math.random() - 0.5).map(p => p.right))
  const [selections, setSelections] = useState<Record<string, string>>({})
  const [activeLeft, setActiveLeft] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setSelections({})
    setActiveLeft(null)
    setSubmitted(false)
  }, [exercise.id])

  function handleLeftClick(leftText: string) {
    if (submitted) return
    setActiveLeft(prev => prev === leftText ? null : leftText)
  }

  function handleRightClick(rightText: string) {
    if (submitted || !activeLeft) return
    setSelections(prev => ({ ...prev, [activeLeft]: rightText }))
    setActiveLeft(null)
  }

  function handleSubmit() {
    if (submitted) return
    const allCorrect = pairs.every(p => selections[p.left] === p.right)
    setSubmitted(true)
    if (allCorrect) playCorrect()
    else playWrong()
    onAnswer(exercise.id, exercise.options.find(o => o.isCorrect)?.id ?? '', allCorrect, exercise.xpValue)
  }

  const allPaired = pairs.every(p => selections[p.left])

  return (
    <div className="w-full animate-slide-up">
      {header}
      <h2 className="font-display text-xl font-bold mb-2 leading-tight">{exercise.question}</h2>
      <p className="text-white/40 text-sm mb-6">Clique sur un élément à gauche puis son association à droite</p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="space-y-2">
          {pairs.map(p => (
            <button key={p.left} onClick={() => handleLeftClick(p.left)} disabled={submitted}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                submitted
                  ? selections[p.left] === p.right
                    ? 'border-lime-neon/50 bg-lime-neon/10 text-lime-neon'
                    : 'border-red-400/50 bg-red-400/10 text-red-400'
                  : activeLeft === p.left
                    ? 'border-cyan-neon bg-cyan-neon/10 text-cyan-neon scale-105'
                    : selections[p.left]
                      ? 'border-white/30 bg-white/5 text-white/60'
                      : 'border-white/20 bg-white/5 text-white hover:border-white/40'
              }`}>
              {p.left}
              {selections[p.left] && !submitted && (
                <span className="block text-xs text-cyan-neon/60 mt-1">→ {selections[p.left]}</span>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {rightItems.map(right => {
            const isUsed = Object.values(selections).includes(right)
            const matchedLeft = Object.entries(selections).find(([, v]) => v === right)?.[0]
            const isCorrectPair = submitted && matchedLeft !== undefined && pairs.find(p => p.left === matchedLeft)?.right === right

            return (
              <button key={right} onClick={() => handleRightClick(right)}
                disabled={submitted || (isUsed && activeLeft === null)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  submitted
                    ? isCorrectPair
                      ? 'border-lime-neon/50 bg-lime-neon/10 text-lime-neon'
                      : isUsed
                        ? 'border-red-400/50 bg-red-400/10 text-red-400'
                        : 'border-white/10 text-white/30'
                    : isUsed
                      ? 'border-white/10 bg-white/5 text-white/30'
                      : activeLeft
                        ? 'border-cyan-neon/50 bg-cyan-neon/5 text-white hover:border-cyan-neon hover:bg-cyan-neon/10'
                        : 'border-white/20 bg-white/5 text-white hover:border-white/40'
                }`}>
                {right}
              </button>
            )
          })}
        </div>
      </div>

      {!submitted && (
        <button onClick={handleSubmit} disabled={!allPaired}
          className={`w-full py-3 font-display font-bold rounded-xl transition-all active:scale-95 ${
            allPaired ? 'bg-cyan-neon text-navy-900 hover:bg-white' : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}>
          Vérifier
        </button>
      )}
    </div>
  )
}

// ─── Exercice ORDRE (drag & drop) ────────────────────────────────────────────

function OrdreExercise({ exercise, showExplanation, onAnswer, header }: {
  exercise: Exercise
  showExplanation: boolean
  onAnswer: (id: string, optId: string, correct: boolean, xp: number) => void
  header: React.ReactNode
}) {
  const correctOrder = [...exercise.options]
    .filter(o => o.isCorrect)
    .sort((a, b) => a.order - b.order)

  const [items, setItems] = useState<AnswerOption[]>(
    () => [...exercise.options].sort(() => Math.random() - 0.5)
  )
  const [submitted, setSubmitted] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    setItems([...exercise.options].sort(() => Math.random() - 0.5))
    setSubmitted(false)
    setActiveId(null)
  }, [exercise.id])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor,   { activationConstraint: { delay: 100, tolerance: 5 } })
  )

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)
    if (!over || active.id === over.id) return
    setItems(prev => {
      const oldIndex = prev.findIndex(i => i.id === active.id)
      const newIndex = prev.findIndex(i => i.id === over.id)
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  function handleSubmit() {
    if (submitted) return
    const isCorrect = items.every((item, i) => item.id === correctOrder[i]?.id)
    setSubmitted(true)
    if (isCorrect) playCorrect()
    else playWrong()
    onAnswer(exercise.id, exercise.options.find(o => o.isCorrect)?.id ?? '', isCorrect, exercise.xpValue)
  }

  const activeItem = items.find(i => i.id === activeId)

  return (
    <div className="w-full animate-slide-up">
      {header}
      <h2 className="font-display text-xl font-bold mb-2 leading-tight">{exercise.question}</h2>
      <p className="text-white/40 text-sm mb-6">Glisse les éléments pour les remettre dans le bon ordre</p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2 mb-6">
            {items.map((item, i) => (
              <SortableItem
                key={item.id}
                item={item}
                index={i}
                submitted={submitted}
                isCorrect={submitted && item.id === correctOrder[i]?.id}
              />
            ))}
          </div>
        </SortableContext>

        {/* Ghost visible pendant le drag */}
        <DragOverlay>
          {activeItem ? (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-cyan-neon bg-navy-900 text-white text-sm font-medium shadow-xl shadow-cyan-neon/20 opacity-95">
              <span className="text-cyan-neon">⠿</span>
              <span className="flex-1">{activeItem.text}</span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="w-full py-3 font-display font-bold rounded-xl bg-cyan-neon text-navy-900 hover:bg-white transition-all active:scale-95"
        >
          Vérifier l'ordre
        </button>
      )}

      {submitted && (
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xs text-white/40 mb-2">Ordre correct :</p>
          <ol className="space-y-1">
            {correctOrder.map((item, i) => (
              <li key={item.id} className="text-sm text-lime-neon flex gap-2">
                <span className="text-white/30">{i + 1}.</span> {item.text}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

// ─── Item sortable individuel ─────────────────────────────────────────────────

function SortableItem({ item, index, submitted, isCorrect }: {
  item: AnswerOption
  index: number
  submitted: boolean
  isCorrect: boolean
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled: submitted })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-colors touch-none select-none ${
        submitted
          ? isCorrect
            ? 'border-lime-neon/50 bg-lime-neon/10 text-lime-neon cursor-default'
            : 'border-red-400/50 bg-red-400/10 text-red-400 cursor-default'
          : isDragging
            ? 'border-cyan-neon/30 bg-white/3 cursor-grabbing'
            : 'border-white/20 bg-white/5 text-white cursor-grab'
      }`}
    >
      {/* Icône purement décorative, plus de listeners ici */}
      {!submitted && (
        <span className="text-white/20 text-lg leading-none" aria-hidden="true">
          ⠿
        </span>
      )}
      <span className="text-white/30 font-mono text-xs w-5">{index + 1}.</span>
      <span className="flex-1">{item.text}</span>
      {submitted && (
        <span>{isCorrect ? '✓' : '✗'}</span>
      )}
    </div>
  )
}

// ─── Exercice COMPLETER ───────────────────────────────────────────────────────
// La question contient "___ " à la place du mot manquant

function CompleterExercise({ exercise, showExplanation, onAnswer, header }: {
  exercise: Exercise
  showExplanation: boolean
  onAnswer: (id: string, optId: string, correct: boolean, xp: number) => void
  header: React.ReactNode
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [shuffled] = useState(() => [...exercise.options].sort(() => Math.random() - 0.5))

  useEffect(() => {
    setSelected(null)
    setSubmitted(false)
  }, [exercise.id])

  const parts = exercise.question.split('___')

  function handleSelect(option: AnswerOption) {
    if (submitted) return
    setSelected(option.id)
    setSubmitted(true)
    if (option.isCorrect) playCorrect()
    else playWrong()
    onAnswer(exercise.id, option.id, option.isCorrect, exercise.xpValue)
  }

  const selectedOption = shuffled.find(o => o.id === selected)

  return (
    <div className="w-full animate-slide-up">
      {header}

      <div className="mb-8 p-5 rounded-2xl bg-white/5 border border-white/10">
        <p className="text-lg md:text-xl font-medium leading-relaxed text-white">
          {parts[0]}
          <span className={`inline-block mx-1 px-3 py-1 rounded-lg border-2 border-dashed font-bold transition-all ${
            !selected
              ? 'border-white/30 text-white/30 min-w-[80px] text-center'
              : selectedOption?.isCorrect
                ? 'border-lime-neon bg-lime-neon/20 text-lime-neon'
                : 'border-red-400 bg-red-400/20 text-red-400'
          }`}>
            {selected ? selectedOption?.text : '   ?   '}
          </span>
          {parts[1] ?? ''}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {shuffled.map(option => (
          <button key={option.id} onClick={() => handleSelect(option)} disabled={submitted}
            className={`px-5 py-2.5 rounded-xl border font-medium text-sm transition-all active:scale-95 ${
              submitted && option.id === selected
                ? option.isCorrect
                  ? 'border-lime-neon bg-lime-neon/20 text-lime-neon'
                  : 'border-red-400 bg-red-400/20 text-red-400'
                : submitted && option.isCorrect
                  ? 'border-lime-neon/50 bg-lime-neon/10 text-lime-neon'
                  : submitted
                    ? 'border-white/10 text-white/30'
                    : 'border-white/30 bg-white/5 text-white hover:border-cyan-neon hover:bg-cyan-neon/10 hover:text-cyan-neon'
            }`}>
            {option.text}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Écran résultat ───────────────────────────────────────────────────────────

function LessonResultScreen({ lesson, exercises, hearts, xpEarned }: any) {
  const correct = useGameStore.getState().answers.filter((a: any) => a.isCorrect).length
  const score = calculateScore(correct, exercises.length)
  const { label, color, emoji } = getScoreLabel(score)
  const [showContent, setShowContent] = useState(false)
  const [confetti, setConfetti] = useState<Array<{id: number, x: number, color: string, delay: number, duration: number}>>([])

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100)
    if (score === 100) playLevelUpSound()
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
        <div key={c.id} className="fixed top-0 w-2 h-3 rounded-sm pointer-events-none z-50"
          style={{ left: `${c.x}%`, backgroundColor: c.color, animation: `confetti-fall ${c.duration}s ease-in ${c.delay}s forwards` }} />
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
            <div className="h-full rounded-full transition-all duration-1000 delay-500"
              style={{ width: showContent ? `${score}%` : '0%', background: `linear-gradient(90deg, ${color}, ${score === 100 ? '#A3FF47' : color})` }} />
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
