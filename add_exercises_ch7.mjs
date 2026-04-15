import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const lessons = await p.lesson.findMany({
  where: { slug: { in: ['c7-l1', 'c7-l2', 'c7-l3', 'c7-l4', 'c7-l5'] } }
})
const bySlug = Object.fromEntries(lessons.map(l => [l.slug, l.id]))

const data = {
  'c7-l1': [
    {
      type: 'relier',
      q: "Associe chaque source de biais à son exemple concret :",
      exp: "Données d'entraînement = reconnaissance faciale moins précise sur peaux foncées. Biais de sélection = données surtout US/Europe. Biais de label = stéréotypes des annotateurs. Feedback loop = algorithme de récidive qui amplifie les discriminations.",
      opts: [
        ["Données d'entraînement || Reconnaissance faciale moins précise sur peaux foncées", true],
        ["Biais de sélection || Données principalement issues d'une seule culture", true],
        ["Biais de label || Stéréotypes inconscients des humains qui annotent", true],
        ["Feedback loop || Biais initial amplifié par les décisions successives", true],
      ]
    },
    {
      type: 'completer',
      q: "L'IA apprend depuis des données créées par des humains — si ces données reflètent des inégalités historiques, l'IA les apprend et les ___.",
      exp: "L'IA amplifie les biais présents dans ses données d'entraînement. Elle ne corrige pas les inégalités — elle les reproduit à grande échelle et de façon automatisée, ce qui peut avoir des conséquences bien plus larges.",
      opts: [["amplifie", true], ["corrige", false], ["ignore", false], ["supprime", false]]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre les étapes pour réduire les biais dans un système IA :",
      exp: "Pour réduire les biais : diversifier les données d'entraînement → constituer des équipes diverses → auditer les résultats sur différents groupes → documenter et communiquer les limites connues.",
      opts: [
        ["Diversifier les données pour représenter tous les groupes", true, 1],
        ["Constituer des équipes de développement diverses", true, 2],
        ["Auditer les performances sur différents groupes", true, 3],
        ["Documenter et communiquer les limites connues", true, 4],
      ]
    },
  ],

  'c7-l2': [
    {
      type: 'relier',
      q: "Associe chaque type de contenu à son niveau de risque d'hallucination :",
      exp: "Chiffres précis = risque élevé (inventés facilement). Citations bibliographiques = risque élevé (auteurs/titres fictifs). Événements récents = risque élevé (après date de coupure). Concepts généraux = risque faible.",
      opts: [
        ["Statistiques et chiffres précis || Risque élevé — souvent inventés", true],
        ["Citations bibliographiques || Risque élevé — auteurs et titres fictifs possibles", true],
        ["Événements après la date de coupure || Risque élevé — le modèle ne sait pas", true],
        ["Concepts généraux bien documentés || Risque faible", true],
      ]
    },
    {
      type: 'completer',
      q: "Les LLMs hallucinent car ils génèrent le texte statistiquement le plus ___, pas nécessairement le plus vrai.",
      exp: "Les LLMs n'ont pas de mécanisme de vérification des faits. Ils génèrent ce qui semble plausible d'après les patterns de leur entraînement. Quand ils ne savent pas, ils inventent quelque chose qui ressemble à une réponse correcte.",
      opts: [["probable", true], ["court", false], ["récent", false], ["simple", false]]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre les étapes pour vérifier une information donnée par un LLM :",
      exp: "Pour vérifier : identifier si l'info est critique → demander les sources au LLM → chercher dans une source primaire → recouper avec au moins une autre source fiable → utiliser l'info vérifiée.",
      opts: [
        ["Identifier si l'information est critique pour la décision", true, 1],
        ["Demander au LLM de citer ses sources", true, 2],
        ["Chercher l'information dans une source primaire fiable", true, 3],
        ["Recouper avec au moins une autre source indépendante", true, 4],
      ]
    },
  ],

  'c7-l3': [
    {
      type: 'relier',
      q: "Associe chaque type de donnée à la règle qui s'applique :",
      exp: "Données clients = jamais dans un LLM public. Code source propriétaire = jamais (risque d'entraînement). Informations anonymisées = utilisables avec prudence. Données publiques = généralement ok.",
      opts: [
        ["Données clients personnelles || Ne jamais envoyer à un LLM public", true],
        ["Code source propriétaire || Ne jamais partager, risque d'exposition", true],
        ["Données anonymisées || Utilisables avec prudence après suppression des identifiants", true],
        ["Informations publiques générales || Généralement sans risque", true],
      ]
    },
    {
      type: 'completer',
      q: "Pour protéger les données sensibles, on peut les ___ en remplaçant noms et identifiants par des placeholders avant de soumettre à un LLM.",
      exp: "L'anonymisation consiste à remplacer les données identifiables (noms, emails, numéros) par des placeholders génériques comme CLIENT_A ou PHONE_1. L'IA peut analyser la structure sans accéder aux données réelles.",
      opts: [["anonymiser", true], ["chiffrer", false], ["compresser", false], ["dupliquer", false]]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre les protections à mettre en place pour un usage professionnel sécurisé des LLMs :",
      exp: "Pour un usage pro sécurisé : choisir une version entreprise → anonymiser les données sensibles → former les équipes aux bonnes pratiques → définir une politique d'usage claire → auditer régulièrement.",
      opts: [
        ["Choisir une version entreprise avec garanties de confidentialité", true, 1],
        ["Anonymiser toutes les données sensibles avant soumission", true, 2],
        ["Former les équipes à ce qu'on ne doit pas partager", true, 3],
        ["Définir une politique d'usage claire dans l'entreprise", true, 4],
      ]
    },
  ],

  'c7-l4': [
    {
      type: 'relier',
      q: "Associe chaque catégorie de métier à son niveau d'exposition à l'automatisation IA :",
      exp: "Forte exposition : saisie de données, service client niveau 1, traduction standard. Faible exposition : soins aux personnes, métiers manuels complexes, leadership stratégique, relations humaines.",
      opts: [
        ["Saisie et traitement de données || Forte exposition à l'automatisation", true],
        ["Soins médicaux et aide à domicile || Faible exposition, présence humaine essentielle", true],
        ["Service client niveau 1 || Forte exposition, déjà largement automatisé", true],
        ["Leadership et management stratégique || Faible exposition, jugement humain clé", true],
      ]
    },
    {
      type: 'completer',
      q: "La règle des 3 R dit que les tâches ___, Routinières et Recodifiables sont les plus menacées par l'IA.",
      exp: "Les tâches Répétitives, Routinières et Recodifiables sont les plus automatisables. À l'inverse, les tâches qui demandent jugement, empathie, créativité et relations humaines complexes sont les plus résistantes.",
      opts: [["Répétitives", true], ["Relationnelles", false], ["Rémunérées", false], ["Raisonnées", false]]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre les étapes pour se préparer à la transformation IA de son métier :",
      exp: "Se préparer : identifier les tâches de son poste exposées à l'IA → maîtriser les outils IA de son secteur → renforcer les compétences humaines uniques → se positionner comme orchestrateur humain-IA.",
      opts: [
        ["Identifier les tâches de son poste exposées à l'automatisation", true, 1],
        ["Maîtriser les outils IA spécifiques à son secteur", true, 2],
        ["Renforcer les compétences humaines uniques (jugement, empathie, créativité)", true, 3],
        ["Se positionner comme orchestrateur humain-IA", true, 4],
      ]
    },
  ],

  'c7-l5': [
    {
      type: 'relier',
      q: "Associe chaque niveau de risque de l'AI Act à son exemple :",
      exp: "Risque inacceptable = scoring social (interdit). Risque élevé = IA de recrutement (très encadré). Risque limité = chatbots (doivent se déclarer). Risque minimal = filtres spam (peu de contraintes).",
      opts: [
        ["Risque inacceptable || Scoring social gouvernemental — interdit", true],
        ["Risque élevé || IA de recrutement — obligations strictes", true],
        ["Risque limité || Chatbots — doivent se déclarer comme IA", true],
        ["Risque minimal || Filtres anti-spam — peu de contraintes", true],
      ]
    },
    {
      type: 'completer',
      q: "L'IA responsable repose sur 5 piliers : transparence, équité, robustesse, vie privée, et ___ humaine.",
      exp: "La responsabilité humaine est le 5e pilier : il doit toujours exister un humain responsable des décisions prises par ou avec l'aide de l'IA. On ne peut pas déléguer la responsabilité éthique à une machine.",
      opts: [["responsabilité", true], ["supervision", false], ["validation", false], ["créativité", false]]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre les 5 principes fondamentaux de l'IA responsable, du plus technique au plus organisationnel :",
      exp: "Les 5 principes : transparence algorithmique (expliquer les décisions) → équité (performances pour tous) → robustesse (résister aux attaques) → vie privée by design → responsabilité humaine.",
      opts: [
        ["Transparence algorithmique — expliquer pourquoi l'IA prend ses décisions", true, 1],
        ["Équité — performances équivalentes pour tous les groupes", true, 2],
        ["Robustesse — résister aux manipulations et attaques", true, 3],
        ["Vie privée by design — protection des données dès la conception", true, 4],
        ["Responsabilité humaine — un humain toujours responsable", true, 5],
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

console.log('\n🎉 Exercices variés ajoutés pour le chapitre 7 !')
await p.$disconnect()
