// src/types/index.ts

export interface UserProfile {
  id: string
  userId: string
  avatar: string
  level: number
  xp: number
  hearts: number
  maxHearts: number
  userLevel: 'debutant' | 'intermediaire' | 'avance'
  goal: 'culture' | 'pro' | 'expert'
  totalLessonsCompleted: number
}

export interface Chapter {
  id: string
  slug: string
  title: string
  description: string
  emoji: string
  order: number
  color: string
  isLocked: boolean
  xpRequired: number
  lessons?: Lesson[]
  _count?: { lessons: number }
  completedLessons?: number
  progress?: number
}

export interface Lesson {
  id: string
  chapterId: string
  slug: string
  title: string
  description: string
  order: number
  xpReward: number
  duration: number
  exercises?: Exercise[]
  completed?: boolean
  score?: number
}

export interface Exercise {
  id: string
  lessonId: string
  type: ExerciseType
  question: string
  explanation: string
  order: number
  xpValue: number
  options: AnswerOption[]
}

export type ExerciseType = 'qcm' | 'vrai_faux' | 'relier' | 'completer' | 'ordre' | 'cas_pratique'

export interface AnswerOption {
  id: string
  exerciseId: string
  text: string
  isCorrect: boolean
  order: number
}

export interface Progress {
  id: string
  userId: string
  lessonId: string
  completed: boolean
  score: number
  attempts: number
  bestScore: number
  xpEarned: number
  completedAt?: Date
}

export interface Badge {
  id: string
  slug: string
  name: string
  description: string
  emoji: string
  earned?: boolean
  earnedAt?: Date
}

export interface DailyStreak {
  currentStreak: number
  longestStreak: number
  lastActivityAt?: Date
}

export interface GameState {
  currentExerciseIndex: number
  answers: ExerciseAnswer[]
  hearts: number
  xpEarned: number
  completed: boolean
  startTime: number
}

export interface ExerciseAnswer {
  exerciseId: string
  selectedOptionId: string | null
  isCorrect: boolean
  answered: boolean
}

export interface DashboardData {
  profile: UserProfile
  streak: DailyStreak
  recentProgress: Progress[]
  badges: Badge[]
  chaptersProgress: ChapterProgress[]
  todayXP: number
  reviewCount: number
}

export interface ChapterProgress {
  chapterId: string
  chapterTitle: string
  chapterEmoji: string
  totalLessons: number
  completedLessons: number
  percentage: number
  isLocked: boolean
}

export interface LessonResult {
  lessonId: string
  score: number
  xpEarned: number
  correctAnswers: number
  totalExercises: number
  duration: number
  badgesUnlocked: Badge[]
  isFirstCompletion: boolean
}
