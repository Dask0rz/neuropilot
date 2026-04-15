import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
const user = await p.user.findUnique({ where: { email: 'demo@neuropilot.app' } })
if (user) {
  await p.progress.deleteMany({ where: { userId: user.id } })
  await p.sessionHistory.deleteMany({ where: { userId: user.id } })
  await p.reviewQueue.deleteMany({ where: { userId: user.id } })
  await p.profile.update({ where: { userId: user.id }, data: { xp: 0, level: 1, totalLessonsCompleted: 0 } })
  console.log('Progression réinitialisée !')
}
await p.$disconnect()
