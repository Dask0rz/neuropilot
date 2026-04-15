export const dynamic = "force-dynamic"
// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Cet email est deja utilise' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { email, name, password: hashed },
    })

    try {
      await resend.emails.send({
        from: 'NeuroPilot <onboarding@resend.dev>',
        to: email,
        subject: 'Bienvenue sur NeuroPilot !',
        html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="margin:0;padding:0;background-color:#0A0F1E;font-family:Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0F1E;padding:40px 20px;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;"><tr><td align="center" style="padding:40px 0 30px;"><div style="font-size:48px;margin-bottom:12px;">🧠</div><h1 style="color:#00D4FF;font-size:32px;font-weight:900;margin:0;">NeuroPilot</h1><p style="color:rgba(255,255,255,0.4);font-size:14px;margin:8px 0 0;">Pilote ton futur avec l'IA</p></td></tr><tr><td style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:40px;"><h2 style="color:#ffffff;font-size:24px;font-weight:800;margin:0 0 16px;">Bienvenue ${name} !</h2><p style="color:rgba(255,255,255,0.7);font-size:16px;line-height:1.6;margin:0 0 24px;">Tu viens de rejoindre NeuroPilot. Tu es maintenant pret a maitriser l'intelligence artificielle, une lecon a la fois.</p><table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px;"><tr><td width="33%" align="center" style="background:rgba(255,255,255,0.05);border-radius:12px;padding:16px;border:1px solid rgba(255,255,255,0.08);"><div style="font-size:28px;font-weight:900;color:#00D4FF;">8</div><div style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px;">Chapitres</div></td><td width="4%"></td><td width="30%" align="center" style="background:rgba(255,255,255,0.05);border-radius:12px;padding:16px;border:1px solid rgba(255,255,255,0.08);"><div style="font-size:28px;font-weight:900;color:#A3FF47;">40+</div><div style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px;">Lecons</div></td><td width="4%"></td><td width="29%" align="center" style="background:rgba(255,255,255,0.05);border-radius:12px;padding:16px;border:1px solid rgba(255,255,255,0.08);"><div style="font-size:28px;font-weight:900;color:#FFB347;">200+</div><div style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px;">Exercices</div></td></tr></table><div style="text-align:center;margin-top:32px;"><a href="https://neuropilot-zeta.vercel.app/dashboard" style="display:inline-block;background:#00D4FF;color:#0A0F1E;font-weight:900;font-size:16px;padding:16px 40px;border-radius:12px;text-decoration:none;">Commencer maintenant</a></div></td></tr><tr><td align="center" style="padding:20px 0;"><p style="color:rgba(255,255,255,0.2);font-size:12px;margin:0;">NeuroPilot - Pilote ton futur avec l'IA</p></td></tr></table></td></tr></table></body></html>`,
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
    }

    return NextResponse.json({ success: true, userId: user.id })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
