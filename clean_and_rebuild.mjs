import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

console.log('Nettoyage de tous les exercices...')
await p.answerOption.deleteMany({})
await p.exercise.deleteMany({})
console.log('Exercices supprimés !')

await p.$disconnect()
