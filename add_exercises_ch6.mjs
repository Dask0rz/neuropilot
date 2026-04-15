import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const lessons = await p.lesson.findMany({
  where: { slug: { in: ['c6-l1', 'c6-l2', 'c6-l3', 'c6-l4', 'c6-l5'] } }
})
const bySlug = Object.fromEntries(lessons.map(l => [l.slug, l.id]))

const data = {
  'c6-l1': [
    {
      type: 'relier',
      q: "Associe chaque outil à sa catégorie :",
      exp: "ChatGPT/Claude = assistants conversationnels. Perplexity = recherche avec citations. GitHub Copilot = code. Otter.ai = transcription de réunions. Midjourney = génération d'images.",
      opts: [
        ["ChatGPT / Claude || Assistant conversationnel polyvalent", true],
        ["Perplexity AI || Recherche avec citations en temps réel", true],
        ["GitHub Copilot || Complétion de code en temps réel", true],
        ["Otter.ai || Transcription et résumé de réunions", true],
      ]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre les 3 questions à se poser avant d'adopter un outil IA :",
      exp: "Avant d'adopter un outil : d'abord vérifier quel problème il résout, ensuite combien de temps il faut pour l'apprendre (ROI positif dans la semaine), enfin si on l'utilisera au moins 3 fois par semaine.",
      opts: [
        ["Quel problème précis cet outil résout-il ?", true, 1],
        ["Combien de temps faut-il pour apprendre à l'utiliser ?", true, 2],
        ["Est-ce que je l'utiliserai au moins 3 fois par semaine ?", true, 3],
      ]
    },
    {
      type: 'completer',
      q: "Le piège à éviter est de vouloir utiliser ___ les outils en même temps — il vaut mieux en maîtriser 1 ou 2 vraiment bien.",
      exp: "La tentation est d'adopter tous les outils dès leur sortie. Mais maîtriser vraiment un outil prend du temps. Mieux vaut aller en profondeur sur 1-2 outils que de survoler une dizaine.",
      opts: [["tous", true], ["aucun", false], ["plusieurs", false], ["certains", false]]
    },
  ],

  'c6-l2': [
    {
      type: 'relier',
      q: "Associe chaque outil d'automatisation à sa caractéristique :",
      exp: "Zapier = le plus simple, 6000+ apps, idéal pour débuter. Make = plus puissant, interface canvas, moins cher pour gros volumes. n8n = open source, self-hosted, contrôle total.",
      opts: [
        ["Zapier || Le plus simple, +6000 apps, idéal pour débuter", true],
        ["Make || Interface canvas, idéal pour workflows complexes", true],
        ["n8n || Open source, self-hosted, contrôle total", true],
      ]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre les étapes pour créer son premier workflow d'automatisation :",
      exp: "Pour créer un workflow : identifier la tâche la plus répétitive → la décomposer en étapes → vérifier si les apps sont dans Zapier → créer un premier Zap simple → tester et affiner.",
      opts: [
        ["Identifier la tâche répétitive qui coûte le plus de temps", true, 1],
        ["Décomposer en trigger et actions distinctes", true, 2],
        ["Vérifier que les apps concernées sont disponibles", true, 3],
        ["Créer un premier workflow simple", true, 4],
        ["Tester, affiner et complexifier progressivement", true, 5],
      ]
    },
    {
      type: 'completer',
      q: "Dans un workflow d'automatisation, le ___ est l'événement qui déclenche toute la chaîne d'actions.",
      exp: "Le trigger (déclencheur) est l'événement de départ : un email reçu, un formulaire soumis, un fichier ajouté, ou une heure programmée. Sans trigger, rien ne se passe.",
      opts: [["trigger", true], ["webhook", false], ["prompt", false], ["token", false]]
    },
  ],

  'c6-l3': [
    {
      type: 'ordre',
      q: "Remets dans l'ordre le workflow de rédaction augmentée idéal :",
      exp: "Le workflow optimal : brief rapide (5 min) → IA génère un premier jet (30 sec) → relecture et identification des points à améliorer → demandes d'affinement précises → lecture finale et personnalisation.",
      opts: [
        ["Brief rapide : contexte, objectif, audience, format", true, 1],
        ["IA génère un premier jet en 30 secondes", true, 2],
        ["Lecture et identification de ce qui cloche", true, 3],
        ["Demandes d'affinement précises à l'IA", true, 4],
        ["Lecture finale et personnalisation humaine", true, 5],
      ]
    },
    {
      type: 'relier',
      q: "Associe chaque usage de l'IA en rédaction à son exemple :",
      exp: "Premier jet = structurer ses idées rapidement. Reformulation = rendre plus percutant. Adaptation canal = même contenu en plusieurs formats. Traduction = adapter culturellement.",
      opts: [
        ["Premier jet || Structurer et développer ses idées en 2 minutes", true],
        ["Reformulation || Rendre un paragraphe plus percutant ou accessible", true],
        ["Adaptation canal || Décliner le même contenu pour LinkedIn, X, newsletter", true],
        ["Traduction || Adapter culturellement pour une audience étrangère", true],
      ]
    },
    {
      type: 'completer',
      q: "L'IA peut ___ des faits, des chiffres ou des citations. Il faut toujours vérifier les données importantes avant de publier.",
      exp: "Les hallucinations sont le risque principal de la rédaction avec l'IA. Un LLM peut inventer des statistiques, des citations ou des faits qui semblent plausibles mais sont faux. La vérification humaine est indispensable.",
      opts: [["halluciner", true], ["simplifier", false], ["compresser", false], ["traduire", false]]
    },
  ],

  'c6-l4': [
    {
      type: 'ordre',
      q: "Remets dans l'ordre les étapes pour analyser un document avec l'IA :",
      exp: "Pour analyser efficacement : uploader le document → donner le contexte (qui tu es, pourquoi tu analyses) → poser des questions précises → vérifier les données critiques dans le document original.",
      opts: [
        ["Uploader le document dans l'outil IA", true, 1],
        ["Donner le contexte : ton rôle et l'objectif de l'analyse", true, 2],
        ["Poser des questions précises sur le contenu", true, 3],
        ["Vérifier les chiffres et données critiques", true, 4],
      ]
    },
    {
      type: 'relier',
      q: "Associe chaque type d'analyse à son exemple concret :",
      exp: "Résumé = 5 points clés pour un dirigeant. Risques = clauses problématiques dans un contrat. Comparaison = deux offres sur prix/délai/garanties. Sentiment = thèmes récurrents dans 500 avis clients.",
      opts: [
        ["Résumé exécutif || 5 points clés pour un dirigeant non-expert", true],
        ["Analyse de risques || Identifier les clauses problématiques d'un contrat", true],
        ["Comparaison || Deux offres sur les critères prix, délai, garanties", true],
        ["Analyse de sentiment || Thèmes positifs et négatifs dans des avis clients", true],
      ]
    },
    {
      type: 'completer',
      q: "Il ne faut jamais envoyer de données ___ personnelles ou financières sensibles à un LLM public — utilise les versions entreprise.",
      exp: "La confidentialité est le risque principal de l'analyse IA. Les données clients, médicales ou financières sensibles ne doivent jamais transiter par des LLMs publics. Les versions entreprise (ChatGPT Enterprise, Claude for Work) offrent des garanties de confidentialité.",
      opts: [["clients", true], ["générales", false], ["publiques", false], ["historiques", false]]
    },
  ],

  'c6-l5': [
    {
      type: 'relier',
      q: "Associe chaque type de workflow à son exemple :",
      exp: "Contenu = idée → IA structure → publication multi-canal. Analyse = document → IA extrait → humain décide. Veille = sources RSS → IA filtre → newsletter. Commercial = lead → IA qualifie → email personnalisé.",
      opts: [
        ["Workflow contenu || Idée → IA structure → déclinaison multi-canal", true],
        ["Workflow analyse || Document entrant → IA extrait → humain décide", true],
        ["Workflow veille || Sources RSS → IA filtre → résumé hebdomadaire", true],
        ["Workflow commercial || Lead entrant → IA qualifie → email personnalisé", true],
      ]
    },
    {
      type: 'completer',
      q: "Le principe \"Human in the ___\" signifie qu'un humain doit valider toute action importante ou irréversible dans un workflow automatisé.",
      exp: "Human in the Loop = garder un humain dans la boucle pour valider les décisions importantes. L'IA prépare et propose, l'humain décide et valide avant toute action irréversible comme envoyer un email ou publier du contenu.",
      opts: [["Loop", true], ["Chain", false], ["Process", false], ["System", false]]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre la méthode en 5 étapes pour construire un workflow IA :",
      exp: "Méthode : identifier le processus le plus coûteux en temps → décomposer en micro-étapes → identifier les étapes automatisables → choisir les outils adaptés → tester avec un volume faible et affiner.",
      opts: [
        ["Identifier le processus répétitif le plus coûteux en temps", true, 1],
        ["Décomposer en micro-étapes détaillées", true, 2],
        ["Identifier quelles étapes peuvent être automatisées", true, 3],
        ["Choisir les outils adaptés (Zapier, Claude, Notion...)", true, 4],
        ["Tester avec un faible volume, affiner les prompts", true, 5],
      ]
    },
  ],
}

for (const [slug, exercises] of Object.entries(data)) {
  const lessonId = bySlug[slug]
  if (!lessonId) { console.log(`⚠️  Leçon introuvable : ${slug}`); continue }

  const existing = await p.exercise.findMany({ where: { lessonId }, orderBy: { order: 'desc' }, take: 1 })
  let startOrder = existing.length > 0 ? existing[0].order + 1 : 1

  for (let i = 0; i < exercises.length; i++) {
    const ex = exercises[i]
    const created = await p.exercise.create({
      data: {
        lessonId,
        type: ex.type,
        question: ex.q,
        explanation: ex.exp,
        order: startOrder + i,
        xpValue: ex.type === 'qcm' ? 5 : 8,
      }
    })
    for (let j = 0; j < ex.opts.length; j++) {
      const opt = ex.opts[j]
      await p.answerOption.create({
        data: {
          exerciseId: created.id,
          text: opt[0],
          isCorrect: opt[1],
          order: ex.type === 'ordre' ? opt[2] : j,
        }
      })
    }
    console.log(`  ✅ ${ex.type} ajouté à ${slug}`)
  }
  console.log(`📚 ${slug} — ${exercises.length} exercices ajoutés`)
}

console.log('\n🎉 Exercices variés ajoutés pour le chapitre 6 !')
await p.$disconnect()
