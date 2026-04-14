// src/store/gameStore.ts
import { create } from 'zustand'
import { Exercise, ExerciseAnswer } from '@/types'

interface GameStore {
  // State
  currentExerciseIndex: number
  answers: ExerciseAnswer[]
  hearts: number
  xpEarned: number
  completed: boolean
  startTime: number
  showExplanation: boolean
  lastAnswerCorrect: boolean | null
  exercises: Exercise[]

  // Actions
  initGame: (exercises: Exercise[], hearts: number) => void
  answerExercise: (exerciseId: string, optionId: string, isCorrect: boolean, xpValue: number) => void
  nextExercise: () => void
  resetGame: () => void
  setShowExplanation: (show: boolean) => void
}

export const useGameStore = create<GameStore>((set, get) => ({
  currentExerciseIndex: 0,
  answers: [],
  hearts: 5,
  xpEarned: 0,
  completed: false,
  startTime: Date.now(),
  showExplanation: false,
  lastAnswerCorrect: null,
  exercises: [],

  initGame: (exercises, hearts) => set({
    exercises,
    hearts,
    currentExerciseIndex: 0,
    answers: [],
    xpEarned: 0,
    completed: false,
    startTime: Date.now(),
    showExplanation: false,
    lastAnswerCorrect: null,
  }),

  answerExercise: (exerciseId, optionId, isCorrect, xpValue) => {
    const state = get()
    const newAnswers = [...state.answers, {
      exerciseId,
      selectedOptionId: optionId,
      isCorrect,
      answered: true,
    }]
    const newHearts = isCorrect ? state.hearts : Math.max(0, state.hearts - 1)
    const newXP = isCorrect ? state.xpEarned + xpValue : state.xpEarned

    set({
      answers: newAnswers,
      hearts: newHearts,
      xpEarned: newXP,
      showExplanation: true,
      lastAnswerCorrect: isCorrect,
    })
  },

  nextExercise: () => {
    const state = get()
    const nextIndex = state.currentExerciseIndex + 1
    const isCompleted = nextIndex >= state.exercises.length || state.hearts <= 0

    set({
      currentExerciseIndex: nextIndex,
      showExplanation: false,
      lastAnswerCorrect: null,
      completed: isCompleted,
    })
  },

  resetGame: () => set({
    currentExerciseIndex: 0,
    answers: [],
    hearts: 5,
    xpEarned: 0,
    completed: false,
    startTime: Date.now(),
    showExplanation: false,
    lastAnswerCorrect: null,
    exercises: [],
  }),

  setShowExplanation: (show) => set({ showExplanation: show }),
}))
