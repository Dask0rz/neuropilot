import { PrismaClient } from '@prisma/client'
import { Resend } from 'resend'

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

async function main() {
  const users = await prisma.user.findMany({
    select: { email: true, name: true }
  })
  console.log(`${users.length} utilisateurs trouvés`)

  for (const user of users) {
    const name = user.name || 'toi'
    try {
      await resend.emails.send({
        from: 'Yukino <bonjour@yukino.fr>',
        to: user.email,
        subject: 'Bienvenue sur Yukino !',
        html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="margin:0;padding:0;background-color:#0A0F1E;font-family:Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0F1E;padding:40px 20px;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;"><tr><td align="center" style="padding:40px 0 30px;"><div style="font-size:48px;margin-bottom:12px;">🧠</div><h1 style="color:#00D4FF;font-size:32px;font-weight:900;margin:0;">Yukino</h1><p style="color:rgba(255,255,255,0.4);font-size:14px;margin:8px 0 0;">Pilote ton futur avec l'IA</p></td></tr><tr><td style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:40px;"><h2 style="color:#ffffff;font-size:24px;font-weight:800;margin:0 0 16px;">Bienvenue ${name} !</h2><p style="color:rgba(255,255,255,0.7);font-size:16px;line-height:1.6;margin:0 0 24px;">Tu viens de rejoindre Yukino. Tu es maintenant prêt à maîtriser l'intelligence artificielle, une leçon à la fois.</p><table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px;"><tr><td width="33%" align="center" style="background:rgba(255,255,255,0.05);border-radius:12px;padding:16px;border:1px solid rgba(255,255,255,0.08);"><div style="font-size:28px;font-weight:900;color:#00D4FF;">8</div><div style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px;">Chapitres</div></td><td width="4%"></td><td width="30%" align="center" style="background:rgba(255,255,255,0.05);border-radius:12px;padding:16px;border:1px solid rgba(255,255,255,0.08);"><div style="font-size:28px;font-weight:900;color:#A3FF47;">40+</div><div style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px;">Leçons</div></td><td width="4%"></td><td width="29%" align="center" style="background:rgba(255,255,255,0.05);border-radius:12px;padding:16px;border:1px solid rgba(255,255,255,0.08);"><div style="font-size:28px;font-weight:900;color:#FFB347;">200+</div><div style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px;">Exercices</div></td></tr></table><div style="text-align:center;margin-top:32px;"><a href="https://yukino.fr/dashboard" style="display:inline-block;background:#00D4FF;color:#0A0F1E;font-weight:900;font-size:16px;padding:16px 40px;border-radius:12px;text-decoration:none;">Commencer maintenant</a></div></td></tr><tr><td align="center" style="padding:20px 0;"><p style="color:rgba(255,255,255,0.2);font-size:12px;margin:0;">Yukino - Pilote ton futur avec l'IA</p></td></tr></table></td></tr></table></body></html>`,
      })
      console.log(`✅ Email envoyé à ${user.email}`)
      await new Promise(r => setTimeout(r, 500))
    } catch (err) {
      console.error(`❌ Erreur pour ${user.email}:`, err)
    }
  }

  await prisma.$disconnect()
  console.log('Terminé !')
}

main()