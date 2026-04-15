// src/lib/sound.ts

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return audioCtx
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume: number = 0.3
) {
  const ctx = getAudioContext()
  if (!ctx) return

  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)

  gainNode.gain.setValueAtTime(volume, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

  oscillator.start(ctx.currentTime)
  oscillator.stop(ctx.currentTime + duration)
}

export function playCorrectSound() {
  // Ding ascendant joyeux : do → mi → sol
  playTone(523, 0.12, 'sine', 0.3)
  setTimeout(() => playTone(659, 0.12, 'sine', 0.3), 100)
  setTimeout(() => playTone(784, 0.2, 'sine', 0.3), 200)
}

export function playWrongSound() {
  // Buzz descendant : deux notes graves
  playTone(300, 0.15, 'square', 0.2)
  setTimeout(() => playTone(200, 0.25, 'square', 0.2), 130)
}

export function playLevelUpSound() {
  // Fanfare courte pour score parfait
  playTone(523, 0.1, 'sine', 0.3)
  setTimeout(() => playTone(659, 0.1, 'sine', 0.3), 100)
  setTimeout(() => playTone(784, 0.1, 'sine', 0.3), 200)
  setTimeout(() => playTone(1047, 0.3, 'sine', 0.35), 300)
}

export function vibrateCorrect() {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(40)
  }
}

export function vibrateWrong() {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate([80, 40, 80])
  }
}

export function playCorrect() {
  playCorrectSound()
  vibrateCorrect()
}

export function playWrong() {
  playWrongSound()
  vibrateWrong()
}
