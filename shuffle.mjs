import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const exercises = await p.exercise.findMany({ include: { options: true } })

for(const ex of exercises) {
  const shuffled = [...ex.options].sort(() => Math.random() - 0.5)
  for(let i=0; i<shuffled.length; i++) {
    await p.answerOption.update({
      where: { id: shuffled[i].id },
      data: { order: i }
    })
  }
}

console.log(`${exercises.length} exercices mélangés !`)
await p.$disconnect()
