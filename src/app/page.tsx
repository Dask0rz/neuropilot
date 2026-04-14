// src/app/page.tsx
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function LandingPage() {
  const session = await getServerSession(authOptions)
  if (session) redirect('/dashboard')

  return (
    <main className="min-h-screen bg-navy-900 bg-grid overflow-hidden">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-neon/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-lime-neon/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-neon/5 rounded-full blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <span className="font-display font-bold text-xl text-gradient">NeuroPilot</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-white/70 hover:text-white transition-colors text-sm font-medium px-4 py-2">
            Connexion
          </Link>
          <Link href="/register" className="btn-primary text-sm py-2 px-5">
            Commencer gratuitement
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 text-center pt-20 pb-24 px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 neon-border text-sm">
          <span className="text-lime-neon font-mono">✦ NOUVEAU</span>
          <span className="text-white/60">Apprends l'IA comme un jeu vidéo</span>
        </div>

        <h1 className="font-display text-6xl md:text-7xl font-black mb-6 leading-none tracking-tight">
          Pilote ton futur<br />
          <span className="text-gradient">avec l'IA</span>
        </h1>

        <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed font-body">
          L'intelligence artificielle n'est plus réservée aux experts.
          NeuroPilot te guide pas à pas, 10 minutes par jour,
          avec des leçons courtes, des quiz addictifs et une vraie progression.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/register" className="btn-primary text-lg py-4 px-8 inline-flex items-center gap-2">
            <span>🚀</span> Démarrer maintenant — c'est gratuit
          </Link>
          <Link href="/login" className="btn-secondary text-lg py-4 px-8 inline-flex items-center gap-2">
            <span>👤</span> Déjà inscrit ?
          </Link>
        </div>

        {/* Demo login hint */}
        <div className="inline-flex items-center gap-2 text-sm text-white/40">
          <span>🎮</span>
          <span>Compte démo : <code className="font-mono text-cyan-neon/70">demo@neuropilot.app</code> / <code className="font-mono text-cyan-neon/70">demo1234</code></span>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: '8', label: 'Chapitres', emoji: '📚' },
            { value: '40+', label: 'Leçons', emoji: '⚡' },
            { value: '200+', label: 'Exercices', emoji: '🎯' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-6 text-center neon-border">
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="font-display text-3xl font-black text-gradient">{stat.value}</div>
              <div className="text-white/50 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 mb-24">
        <h2 className="font-display text-4xl font-black text-center mb-12">
          Tout ce qui rend l'apprentissage <span className="text-gradient">addictif</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { emoji: '🎮', title: 'Gamifié', desc: 'XP, niveaux, badges et défis quotidiens pour rester motivé' },
            { emoji: '⚡', title: 'Leçons express', desc: '10 minutes par jour suffisent pour progresser sérieusement' },
            { emoji: '🧠', title: 'Répétition espacée', desc: 'Les notions difficiles reviennent automatiquement au bon moment' },
            { emoji: '🔥', title: 'Série quotidienne', desc: 'Construis une habitude solide avec ton streak de jours consécutifs' },
            { emoji: '❤️', title: 'Système de vies', desc: 'Les erreurs coûtent des cœurs, ça te force à vraiment apprendre' },
            { emoji: '📊', title: 'Progression visuelle', desc: 'Vois clairement ton évolution semaine après semaine' },
          ].map((f) => (
            <div key={f.title} className="glass-card p-6 hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl mb-4">{f.emoji}</div>
              <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum preview */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 mb-24">
        <h2 className="font-display text-4xl font-black text-center mb-4">
          Un parcours <span className="text-gradient">complet</span>
        </h2>
        <p className="text-center text-white/50 mb-12">De zéro à expert en IA, étape par étape</p>
        <div className="space-y-3">
          {[
            { emoji: '🤖', title: 'Découvrir l\'IA', desc: 'Les bases pour comprendre ce qu\'est vraiment l\'IA', color: '#00D4FF' },
            { emoji: '📊', title: 'Machine Learning', desc: 'Comment les machines apprennent par elles-mêmes', color: '#A3FF47' },
            { emoji: '🧠', title: 'Réseaux de neurones', desc: 'Les architectures qui imitent le cerveau', color: '#FF6B6B' },
            { emoji: '✨', title: 'IA Générative', desc: 'ChatGPT, DALL-E et les LLMs expliqués', color: '#FFB347' },
            { emoji: '✍️', title: 'Prompt Engineering', desc: 'L\'art de bien parler aux IA', color: '#C9B1FF' },
            { emoji: '💼', title: 'L\'IA au travail', desc: 'Outils et automatisation pour booster ta productivité', color: '#4ECDC4' },
            { emoji: '⚖️', title: 'Limites & Éthique', desc: 'Biais, risques et responsabilité de l\'IA', color: '#FF8C69' },
            { emoji: '🛠️', title: 'Atelier Projets', desc: 'Applique tout sur des cas concrets', color: '#98FB98' },
          ].map((ch, i) => (
            <div key={ch.title} className="glass rounded-xl px-5 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono font-bold text-navy-900" style={{ background: ch.color }}>
                {i + 1}
              </div>
              <span className="text-2xl">{ch.emoji}</span>
              <div>
                <div className="font-display font-bold">{ch.title}</div>
                <div className="text-white/40 text-sm">{ch.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 text-center px-6 py-24">
        <div className="glass-card neon-border max-w-2xl mx-auto p-12">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="font-display text-4xl font-black mb-4">
            Prêt à <span className="text-gradient">décoller</span> ?
          </h2>
          <p className="text-white/50 mb-8">
            Rejoins les apprenants qui maîtrisent l'IA une leçon à la fois.
          </p>
          <Link href="/register" className="btn-primary text-lg py-4 px-10 inline-block">
            Créer mon compte gratuitement →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-white/30 text-sm border-t border-white/5">
        <p>NeuroPilot — <span className="text-gradient">Pilote ton futur avec l'IA</span></p>
      </footer>
    </main>
  )
}
