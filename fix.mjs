import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
const lessons = await p.lesson.findMany({where:{slug:{in:['c1-l3','c1-l4','c1-l5']}}})
for(const l of lessons) {
  const exos = await p.exercise.findMany({where:{lessonId:l.id}})
  for(const e of exos) await p.answerOption.deleteMany({where:{exerciseId:e.id}})
  await p.exercise.deleteMany({where:{lessonId:l.id}})
}
console.log('Exercices supprimés !')
await p.$disconnect()
