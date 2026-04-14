// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatXP(xp: number): string {
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}k`
  return xp.toString()
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}

export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return "Aujourd'hui"
  if (diffDays === 1) return "Hier"
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`
  return `Il y a ${Math.floor(diffDays / 30)} mois`
}

export function getDaysSince(date: Date | null | undefined): boolean {
  if (!date) return false
  const now = new Date()
  const last = new Date(date)
  const diffMs = now.getTime() - last.getTime()
  return diffMs < 24 * 60 * 60 * 1000
}

export function isStreakActive(lastActivity: Date | null | undefined): boolean {
  if (!lastActivity) return false
  const now = new Date()
  const last = new Date(lastActivity)
  const diffMs = now.getTime() - last.getTime()
  return diffMs < 48 * 60 * 60 * 1000 // active si activité dans les 48h
}
