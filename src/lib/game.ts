// src/lib/game.ts
import { LessonResult, Badge } from '@/types'

// XP thresholds per level
export const XP_PER_LEVEL = [
  0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3250
]

export function getLevelFromXP(xp: number): number {
  for (let i = XP_PER_LEVEL.length - 1; i >= 0; i--) {
    if (xp >= XP_PER_LEVEL[i]) return i + 1
  }
  return 1
}

export function getXPForNextLevel(currentLevel: number): number {
  return XP_PER_LEVEL[currentLevel] ?? XP_PER_LEVEL[XP_PER_LEVEL.length - 1]
}

export function getXPProgressPercent(xp: number, level: number): number {
  const currentLevelXP = XP_PER_LEVEL[level - 1] ?? 0
  const nextLevelXP = XP_PER_LEVEL[level] ?? currentLevelXP + 500
  const progress = xp - currentLevelXP
  const total = nextLevelXP - currentLevelXP
  return Math.min(100, Math.round((progress / total) * 100))
}

export function calculateXPEarned(
  baseXP: number,
  score: number,
  streak: number,
  isFirstCompletion: boolean
): number {
  let xp = baseXP
  // Score bonus
  if (score >= 100) xp = Math.round(xp * 1.5)
  else if (score >= 80) xp = Math.round(xp * 1.2)
  // Streak bonus
  if (streak >= 7) xp = Math.round(xp * 1.3)
  else if (streak >= 3) xp = Math.round(xp * 1.1)
  // First completion bonus
  if (isFirstCompletion) xp = Math.round(xp * 1.25)
  return xp
}

export function calculateScore(correct: number, total: number): number {
  if (total === 0) return 0
  return Math.round((correct / total) * 100)
}

// SM-2 Spaced Repetition Algorithm
export function calculateNextReview(
  easeFactor: number,
  repetitions: number,
  score: number
): { interval: number; newEaseFactor: number; newRepetitions: number } {
  const quality = score >= 80 ? 4 : score >= 60 ? 3 : score >= 40 ? 2 : 1

  let interval: number
  let newRepetitions = repetitions
  let newEaseFactor = easeFactor

  if (quality < 3) {
    newRepetitions = 0
    interval = 1
  } else {
    if (repetitions === 0) interval = 1
    else if (repetitions === 1) interval = 6
    else interval = Math.round(repetitions * easeFactor)
    newRepetitions = repetitions + 1
  }

  newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  if (newEaseFactor < 1.3) newEaseFactor = 1.3

  return { interval, newEaseFactor, newRepetitions }
}

export function getScoreLabel(score: number): { label: string; color: string; emoji: string } {
  if (score === 100) return { label: 'Parfait !', color: '#A3FF47', emoji: '🏆' }
  if (score >= 80) return { label: 'Excellent !', color: '#00D4FF', emoji: '⭐' }
  if (score >= 60) return { label: 'Bien joué !', color: '#FFB347', emoji: '👍' }
  if (score >= 40) return { label: 'Continue !', color: '#FF8C69', emoji: '💪' }
  return { label: 'Réessaie !', color: '#FF6B6B', emoji: '🔄' }
}

export function getMotivationalMessage(streak: number, score: number): string {
  if (score === 100 && streak >= 7) return `🔥 ${streak} jours d'affilée et un score parfait ! Tu déchires !`
  if (score === 100) return '🎯 Score parfait ! Tu maîtrises ce sujet.'
  if (streak >= 7) return `🔥 ${streak} jours consécutifs ! Tu es en feu !`
  if (streak >= 3) return `💪 ${streak} jours d'affilée ! Garde le rythme !`
  if (score >= 80) return '⭐ Très bien ! Tu assimiles vite.'
  return '🌱 Chaque erreur est une leçon. Continue !'
}

export const CHAPTER_UNLOCK_XP: Record<number, number> = {
  1: 0,
  2: 80,
  3: 200,
  4: 350,
  5: 500,
  6: 650,
  7: 800,
  8: 1000,
}

export function isChapterUnlocked(chapterOrder: number, userXP: number): boolean {
  const required = CHAPTER_UNLOCK_XP[chapterOrder] ?? 9999
  return userXP >= required
}
