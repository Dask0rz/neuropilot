export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    // Toujours répondre OK pour ne pas révéler si l'email existe
    if (!user) {
      return NextResponse.json({ success: true })
    }

    // Supprimer les anciens tokens pour cet utilisateur
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } })

    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60) // 1 heure

    await prisma.passwordResetToken.create({
      data: { userId: user.id, token, expiresAt },
    })

    const resetUrl = `https://yukino.fr/reset-password?token=${token}`
    const name = user.name || 'toi'

    await resend.emails.send({
      from: 'Yukino <bonjour@yukino.fr>',
      to: email,
      subject: 'Réinitialisation de ton mot de passe',
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="margin:0;padding:0;background-color:#0A0F1E;font-family:Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0F1E;padding:40px 20px;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;"><tr><td align="center" style="padding:40px 0 30px;"><div style="font-size:48px;margin-bottom:12px;">🧠</div><h1 style="color:#00D4FF;font-size:32px;font-weight:900;margin:0;">Yukino</h1><p style="color:rgba(255,255,255,0.4);font-size:14px;margin:8px 0 0;">Pilote ton futur avec l'IA</p></td></tr><tr><td style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:40px;"><h2 style="color:#ffffff;font-size:24px;font-weight:800;margin:0 0 16px;">Réinitialisation de mot de passe</h2><p style="color:rgba(255,255,255,0.7);font-size:16px;line-height:1.6;margin:0 0 24px;">Salut ${name},<br><br>Tu as demandé à réinitialiser ton mot de passe. Clique sur le bouton ci-dessous pour en choisir un nouveau. Ce lien est valable <strong style="color:#00D4FF;">1 heure</strong>.</p><div style="text-align:center;margin:32px 0;"><a href="${resetUrl}" style="display:inline-block;background:#00D4FF;color:#0A0F1E;font-weight:900;font-size:16px;padding:16px 40px;border-radius:12px;text-decoration:none;">Réinitialiser mon mot de passe</a></div><p style="color:rgba(255,255,255,0.4);font-size:13px;margin:24px 0 0;">Si tu n'es pas à l'origine de cette demande, ignore cet email. Ton mot de passe ne sera pas modifié.</p></td></tr><tr><td align="center" style="padding:20px 0;"><p style="color:rgba(255,255,255,0.2);font-size:12px;margin:0;">Yukino - Pilote ton futur avec l'IA</p></td></tr></table></td></tr></table></body></html>`,
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
