import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const lessons = await p.lesson.findMany({
  where: { slug: { in: ['c8-l1', 'c8-l2', 'c8-l3', 'c8-l4', 'c8-l5'] } }
})
const bySlug = Object.fromEntries(lessons.map(l => [l.slug, l.id]))

const data = {
  'c8-l1': [
    {
      type: 'relier',
      q: "Associe chaque niveau d'assistant IA à sa description :",
      exp: "Niveau 1 = contexte expliqué à chaque conversation. Niveau 2 = prompt de contexte réutilisable collé en début de session. Niveau 3 = IA agentique qui peut agir (envoyer emails, mettre à jour CRM).",
      opts: [
        ["Niveau 1 — Assistant de base || Contexte réexpliqué à chaque conversation", true],
        ["Niveau 2 — Mémoire de session || Prompt de contexte réutilisable en début de session", true],
        ["Niveau 3 — Assistant agentique || L'IA peut agir : emails, CRM, tâches automatisées", true],
      ]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre les éléments à inclure dans un prompt de contexte personnel :",
      exp: "Un bon prompt de contexte couvre : qui tu es (rôle/secteur) → ton style de communication → tes objectifs actuels → tes contraintes → tes préférences de format de réponse.",
      opts: [
        ["Qui tu es : rôle, secteur, entreprise", true, 1],
        ["Ton style : ton de communication préféré", true, 2],
        ["Tes objectifs : ce que tu cherches à accomplir", true, 3],
        ["Tes contraintes : ce que l'IA doit garder en tête", true, 4],
        ["Tes préférences de format pour les réponses", true, 5],
      ]
    },
    {
      type: 'completer',
      q: "Pour construire un assistant IA personnel efficace, commence par déléguer les tâches qui sont à la fois ___, chronophages et à faible valeur ajoutée.",
      exp: "Le meilleur retour sur investissement vient des tâches répétitives + chronophages + faible valeur ajoutée : premiers jets d'emails, résumés de documents, ordres du jour, recherches. Ces tâches libèrent du temps pour ce qui compte vraiment.",
      opts: [["répétitives", true], ["créatives", false], ["stratégiques", false], ["complexes", false]]
    },
  ],

  'c8-l2': [
    {
      type: 'ordre',
      q: "Remets dans l'ordre les 3 étapes pour construire un système de veille automatisée :",
      exp: "Pour construire sa veille : définir ses besoins (sujets, concurrents, fréquence) → configurer les sources (RSS, Google Alerts, newsletters) → automatiser avec Zapier + IA pour filtrer et synthétiser.",
      opts: [
        ["Définir ses besoins : sujets, concurrents, fréquence souhaitée", true, 1],
        ["Configurer 10-15 sources de qualité dans son domaine", true, 2],
        ["Automatiser avec Zapier + IA pour filtrer et synthétiser", true, 3],
      ]
    },
    {
      type: 'relier',
      q: "Associe chaque composant du système de veille à son rôle :",
      exp: "Sources RSS = entrée des contenus. Google Alerts = surveillance de mots-clés. Zapier = déclencheur et connecteur. Claude/GPT-4 = analyse et synthèse. Notion = stockage des résultats.",
      opts: [
        ["Sources RSS || Flux d'entrée des articles et contenus", true],
        ["Google Alerts || Surveillance automatique de mots-clés", true],
        ["Zapier / Make || Déclencheur et connecteur entre les outils", true],
        ["Claude / GPT-4 || Analyse, évaluation et synthèse des contenus", true],
      ]
    },
    {
      type: 'completer',
      q: "Le digest hebdomadaire doit être ___, actionnable, en langage direct et tenir en une page maximum pour être vraiment utile.",
      exp: "Un digest efficace est concis (pas plus d'une page), actionnable (dit quoi faire), en langage direct (pas de jargon), et structuré (top actualités, tendances, opportunités/menaces, ressources prioritaires).",
      opts: [["concis", true], ["exhaustif", false], ["détaillé", false], ["long", false]]
    },
  ],

  'c8-l3': [
    {
      type: 'ordre',
      q: "Remets dans l'ordre les 5 étapes du workflow de rédaction augmentée :",
      exp: "Workflow optimal : brief précis (humain, 5 min) → génération du premier jet (IA, 2 min) → évaluation critique (humain, 10 min) → itération ciblée (humain + IA, 5-10 min) → finalisation et personnalisation (humain, 10 min).",
      opts: [
        ["Brief précis : objectif, audience, ton, format", true, 1],
        ["IA génère le premier jet", true, 2],
        ["Évaluation critique : ce qui est bon, ce qui manque", true, 3],
        ["Itération avec feedbacks précis à l'IA", true, 4],
        ["Finalisation : personnalisation et vérification humaine", true, 5],
      ]
    },
    {
      type: 'relier',
      q: "Associe chaque type de document à son prompt adapté :",
      exp: "Note de synthèse = consultant senior, 500 mots, structure SRAP. Email commercial = expert vente B2B, 200 mots max, obtenir un RDV. Compte-rendu = structurer notes brutes en format formel avec actions.",
      opts: [
        ["Note de synthèse || Consultant senior, 500 mots, situation/enjeux/recommandation", true],
        ["Email commercial || Expert vente B2B, 200 mots, objectif : obtenir un rendez-vous", true],
        ["Compte-rendu || Structurer notes brutes : décisions, actions, responsables", true],
      ]
    },
    {
      type: 'completer',
      q: "L'étape la plus importante du workflow de rédaction augmentée est le ___, car un input imprécis produit toujours un output de mauvaise qualité.",
      exp: "Le brief est l'étape fondatrice. Définir clairement l'objectif, l'audience, le résultat attendu et les contraintes avant de demander quoi que ce soit à l'IA. Garbage in, garbage out — s'applique plus que jamais ici.",
      opts: [["brief", true], ["premier jet", false], ["prompt", false], ["résumé", false]]
    },
  ],

  'c8-l4': [
    {
      type: 'ordre',
      q: "Remets dans l'ordre les étapes pour analyser un fichier de données avec l'IA :",
      exp: "Pour analyser des données : préparer et anonymiser le fichier → uploader et contextualiser (qui tu es, quelles sont les colonnes) → poser des questions analytiques précises → demander des visualisations → vérifier les résultats importants.",
      opts: [
        ["Préparer et anonymiser les données sensibles", true, 1],
        ["Uploader le fichier et contextualiser son contenu", true, 2],
        ["Poser des questions analytiques précises", true, 3],
        ["Demander des visualisations adaptées", true, 4],
        ["Vérifier et valider les résultats importants", true, 5],
      ]
    },
    {
      type: 'relier',
      q: "Associe chaque type de question analytique à son objectif :",
      exp: "Questions de performance = top produits, meilleur canal. Questions de tendance = évolution, saisonnalité. Questions de segmentation = profils clients, groupes comportementaux. Anomalies = pics inhabituels, points d'attention.",
      opts: [
        ["Questions de performance || Top produits, meilleur canal d'acquisition", true],
        ["Questions de tendance || Évolution sur l'année, saisonnalité", true],
        ["Questions de segmentation || Groupes de clients par comportement", true],
        ["Détection d'anomalies || Pics inhabituels, valeurs aberrantes", true],
      ]
    },
    {
      type: 'completer',
      q: "L'IA peut identifier des ___ dans les données, mais l'interprétation causale — pourquoi cela se produit — reste une responsabilité humaine.",
      exp: "Corrélation ≠ causalité. L'IA est excellente pour trouver des corrélations dans les données. Mais expliquer pourquoi deux variables sont liées, et si l'une cause l'autre, demande du contexte business que seul l'humain possède.",
      opts: [["corrélations", true], ["causalités", false], ["solutions", false], ["erreurs", false]]
    },
  ],

  'c8-l5': [
    {
      type: 'relier',
      q: "Associe chaque niveau d'utilisateur IA à sa description :",
      exp: "Consommateur = usage occasionnel, pas d'esprit critique. Praticien = workflows établis, prompting efficace, limites connues. Orchestrateur = conçoit des systèmes humain-IA, voit les opportunités, forme les équipes.",
      opts: [
        ["Consommateur || Usage occasionnel, accepte les réponses sans esprit critique", true],
        ["Praticien || Workflows établis, prompting efficace, connaît les limites", true],
        ["Orchestrateur || Conçoit des systèmes humain-IA, forme et inspire ses équipes", true],
      ]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre la feuille de route post-certification NeuroPilot :",
      exp: "Feuille de route : cette semaine (créer un workflow pour sa tâche la plus chronophage) → ce mois (maîtriser un nouvel outil, partager) → ce trimestre (automatiser un processus complet) → cette année (devenir référent IA dans son équipe).",
      opts: [
        ["Cette semaine : créer un workflow IA pour sa tâche la plus chronophage", true, 1],
        ["Ce mois : maîtriser un nouvel outil et partager avec un collègue", true, 2],
        ["Ce trimestre : automatiser un processus complet", true, 3],
        ["Cette année : devenir la personne référente IA dans son équipe", true, 4],
      ]
    },
    {
      type: 'completer',
      q: "Les meilleurs utilisateurs d'IA traitent l'IA comme un ___, pas comme un outil — ils lui donnent du contexte, itèrent et apprennent de leurs erreurs avec elle.",
      exp: "Traiter l'IA comme un partenaire change tout : on lui donne plus de contexte, on dialogue, on itère. La relation s'améliore avec la pratique, exactement comme avec un collaborateur humain.",
      opts: [["partenaire", true], ["serveur", false], ["moteur", false], ["assistant", false]]
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

console.log('\n🎉 Exercices variés ajoutés pour le chapitre 8 — parcours complet !')
await p.$disconnect()
