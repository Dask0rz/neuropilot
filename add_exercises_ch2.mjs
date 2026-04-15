import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const lessons = await p.lesson.findMany({
  where: { slug: { in: ['c2-l1', 'c2-l2', 'c2-l3', 'c2-l4', 'c2-l5'] } }
})
const bySlug = Object.fromEntries(lessons.map(l => [l.slug, l.id]))

const data = {
  'c2-l1': [
    {
      type: 'completer',
      q: "Le Machine Learning c'est la capacité d'un programme à apprendre automatiquement à partir de ___, sans qu'on lui écrive les règles explicitement.",
      exp: "Le ML apprend depuis des données, pas depuis des règles programmées à la main. C'est ce qui le distingue fondamentalement de la programmation classique.",
      opts: [["données", true], ["règles", false], ["algorithmes", false], ["humains", false]]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre les 4 étapes du cycle du Machine Learning :",
      exp: "Le cycle ML : collecter des données → choisir un algorithme → entraîner le modèle → faire des prédictions sur de nouvelles données.",
      opts: [
        ["Rassembler des données étiquetées", true, 1],
        ["Choisir un algorithme adapté", true, 2],
        ["Entraîner le modèle sur les données", true, 3],
        ["Faire des prédictions sur de nouvelles données", true, 4],
      ]
    },
    {
      type: 'relier',
      q: "Associe chaque avantage du ML à son explication :",
      exp: "Le ML est scalable (même algo, tâches différentes), adaptatif (s'améliore avec plus de données), et découvreur (trouve des patterns invisibles à l'humain).",
      opts: [
        ["Scalable || Le même algorithme s'adapte à des tâches très différentes", true],
        ["Adaptatif || Le modèle s'améliore avec plus de données", true],
        ["Découvreur || Il trouve des patterns qu'aucun humain n'aurait codés", true],
      ]
    },
  ],

  'c2-l2': [
    {
      type: 'relier',
      q: "Associe chaque type d'apprentissage à son exemple :",
      exp: "Supervisé = labels fournis (spam/pas spam). Non supervisé = pas de labels, l'IA découvre (segmentation clients). Par renforcement = essai-erreur avec récompenses (AlphaGo).",
      opts: [
        ["Supervisé || Classifier des emails en spam ou pas spam", true],
        ["Non supervisé || Regrouper des clients en profils similaires", true],
        ["Par renforcement || Apprendre à jouer au Go par essai-erreur", true],
      ]
    },
    {
      type: 'completer',
      q: "Dans l'apprentissage ___, on fournit des données avec les réponses correctes pour que l'IA apprenne à les reproduire.",
      exp: "L'apprentissage supervisé utilise des données étiquetées — un humain a supervisé la création des labels. C'est coûteux en temps mais très précis.",
      opts: [["supervisé", true], ["non supervisé", false], ["par renforcement", false], ["profond", false]]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre comment AlphaGo a appris à jouer au Go :",
      exp: "AlphaGo a appris par renforcement : jouer une partie → observer le résultat → recevoir une récompense ou punition → ajuster sa stratégie → répéter des millions de fois.",
      opts: [
        ["Jouer une partie contre lui-même", true, 1],
        ["Observer si la partie est gagnée ou perdue", true, 2],
        ["Recevoir une récompense ou une punition", true, 3],
        ["Ajuster sa stratégie pour maximiser les gains", true, 4],
      ]
    },
  ],

  'c2-l3': [
    {
      type: 'relier',
      q: "Associe chaque qualité d'une bonne donnée à sa définition :",
      exp: "Pertinence = liée au problème. Quantité = assez d'exemples. Diversité = représentative de tous les cas. Qualité = propre, sans erreurs ni doublons.",
      opts: [
        ["Pertinence || Les données sont liées au problème à résoudre", true],
        ["Diversité || Les données représentent toutes les situations possibles", true],
        ["Qualité || Les données sont propres, sans erreurs ni doublons", true],
        ["Quantité || Assez d'exemples pour que le modèle généralise", true],
      ]
    },
    {
      type: 'completer',
      q: "Le principe ___ signifie que des données de mauvaise qualité produisent inévitablement un modèle de mauvaise qualité.",
      exp: "GIGO = Garbage In, Garbage Out. C'est le principe fondamental : la qualité du modèle dépend directement de la qualité des données. Aucun algorithme ne peut compenser des données pourries.",
      opts: [["GIGO", true], ["FIFO", false], ["LIFO", false], ["MIMO", false]]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre les étapes du nettoyage de données (data cleaning) :",
      exp: "Le data cleaning suit un ordre logique : identifier les problèmes → supprimer les doublons → gérer les valeurs manquantes → corriger les erreurs → vérifier la cohérence.",
      opts: [
        ["Identifier les problèmes dans le dataset", true, 1],
        ["Supprimer les doublons", true, 2],
        ["Gérer les valeurs manquantes", true, 3],
        ["Corriger les erreurs et incohérences", true, 4],
      ]
    },
  ],

  'c2-l4': [
    {
      type: 'completer',
      q: "L'overfitting c'est quand un modèle ___ les données d'entraînement au lieu d'en apprendre les patterns généraux.",
      exp: "L'overfitting = mémorisation. Le modèle apprend par cœur les exemples d'entraînement sans comprendre les patterns sous-jacents. Il échoue sur de nouvelles données.",
      opts: [["mémorise", true], ["ignore", false], ["transforme", false], ["compresse", false]]
    },
    {
      type: 'relier',
      q: "Associe chaque problème à sa solution :",
      exp: "Overfitting → régularisation ou dropout. Underfitting → modèle plus complexe. Pas assez de données → data augmentation. Entraînement trop long → early stopping.",
      opts: [
        ["Overfitting || Régularisation ou Dropout", true],
        ["Underfitting || Utiliser un modèle plus complexe", true],
        ["Pas assez de données || Data Augmentation", true],
        ["Entraînement trop long || Early Stopping", true],
      ]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre la détection de l'overfitting :",
      exp: "Pour détecter l'overfitting : diviser les données → entraîner sur le train set → évaluer sur le test set → comparer les performances. Un grand écart = overfitting.",
      opts: [
        ["Diviser les données en train set (80%) et test set (20%)", true, 1],
        ["Entraîner le modèle uniquement sur le train set", true, 2],
        ["Évaluer les performances sur le test set caché", true, 3],
        ["Comparer : grand écart train/test = overfitting", true, 4],
      ]
    },
  ],

  'c2-l5': [
    {
      type: 'relier',
      q: "Associe chaque métrique à ce qu'elle mesure :",
      exp: "Accuracy = % de prédictions correctes. Précision = quand tu dis positif, est-ce vrai ? Rappel = parmi les vrais positifs, combien as-tu trouvé ? F1-Score = équilibre précision/rappel.",
      opts: [
        ["Accuracy || Pourcentage global de prédictions correctes", true],
        ["Précision || Quand on prédit positif, est-ce vraiment positif ?", true],
        ["Rappel || Parmi tous les vrais positifs, combien détectés ?", true],
        ["F1-Score || Équilibre entre précision et rappel", true],
      ]
    },
    {
      type: 'completer',
      q: "Un modèle de détection de cancer qui dit toujours \"pas cancer\" aurait 99% d'___, mais raterait 100% des vrais cas.",
      exp: "C'est le piège de l'accuracy sur des datasets déséquilibrés. 99% d'accuracy semble excellent mais le modèle est inutile car il ne détecte aucun vrai cas de cancer.",
      opts: [["accuracy", true], ["précision", false], ["rappel", false], ["F1-score", false]]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre les étapes de la validation croisée (cross-validation) :",
      exp: "La cross-validation divise les données en K parties, entraîne K fois (chaque partie joue le rôle du test une fois), puis moyenne les résultats pour une estimation fiable.",
      opts: [
        ["Diviser les données en K parties égales", true, 1],
        ["Entraîner sur K-1 parties, tester sur la partie restante", true, 2],
        ["Répéter K fois en changeant la partie de test", true, 3],
        ["Calculer la moyenne des K scores obtenus", true, 4],
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

console.log('\n🎉 Exercices variés ajoutés pour le chapitre 2 !')
await p.$disconnect()
