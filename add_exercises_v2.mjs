import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const lessons = await p.lesson.findMany({
  where: { slug: { in: ['c1-l1', 'c1-l2', 'c1-l3', 'c1-l4', 'c1-l5'] } }
})
const bySlug = Object.fromEntries(lessons.map(l => [l.slug, l.id]))

// Format des exercices selon le type :
// - qcm       : opts = [["texte", isCorrect], ...]
// - completer : question contient ___ , opts = [["mot", isCorrect], ...]
// - ordre     : opts = [["étape", true, order], ...] (tous isCorrect=true, order = position correcte)
// - relier    : opts = [["gauche || droite", true], ...] (paires séparées par " || ")

const data = {
  'c1-l1': [
    // COMPLETER
    {
      type: 'completer',
      q: "L'intelligence artificielle est la capacité d'une machine à simuler des comportements ___, comme apprendre, reconnaître ou décider.",
      exp: "L'IA simule des comportements intelligents. Ce n'est pas de la magie — c'est un programme qui apprend à partir de données.",
      opts: [["intelligents", true], ["humains", false], ["aléatoires", false], ["biologiques", false]]
    },
    // RELIER
    {
      type: 'relier',
      q: "Associe chaque exemple à la bonne catégorie d'IA :",
      exp: "Siri et Google Maps sont des assistants/navigation, Netflix fait de la recommandation, et Face ID de la reconnaissance. Tous sont des exemples d'IA étroite dans le quotidien.",
      opts: [
        ["Siri || Assistant vocal", true],
        ["Netflix || Recommandation de contenu", true],
        ["Face ID || Reconnaissance faciale", true],
        ["Google Maps || Navigation intelligente", true],
      ]
    },
    // QCM
    {
      type: 'qcm',
      q: "Quelle est la différence fondamentale entre un programme classique et une IA ?",
      exp: "Un programme classique suit des règles fixes écrites par un humain. L'IA apprend ses propres règles à partir d'exemples — c'est ce qui la rend si puissante et flexible.",
      opts: [
        ["Un programme classique est plus rapide", false],
        ["L'IA apprend ses règles à partir de données, le programme suit des règles fixes", true],
        ["L'IA utilise plus de mémoire", false],
        ["Il n'y a pas de différence fondamentale", false],
      ]
    },
  ],

  'c1-l2': [
    // ORDRE — les étapes de personnalisation Netflix
    {
      type: 'ordre',
      q: "Remets dans l'ordre le fonctionnement de la recommandation Netflix :",
      exp: "Netflix collecte tes données de visionnage, les analyse avec son IA, génère un profil de goûts, puis te propose du contenu personnalisé. Ce cycle s'améliore à chaque interaction.",
      opts: [
        ["Tu regardes des films et séries", true, 1],
        ["Netflix collecte tes données de visionnage", true, 2],
        ["L'IA analyse tes habitudes et préférences", true, 3],
        ["Netflix te recommande du contenu personnalisé", true, 4],
      ]
    },
    // RELIER
    {
      type: 'relier',
      q: "Associe chaque service à son usage de l'IA :",
      exp: "Chaque service digital majeur utilise l'IA différemment : Gmail filtre les spams, Waze prédit le trafic, la banque détecte les fraudes, et Spotify recommande de la musique.",
      opts: [
        ["Gmail || Filtrage des spams", true],
        ["Waze || Prédiction du trafic", true],
        ["Ta banque || Détection de fraudes", true],
        ["Spotify || Recommandation musicale", true],
      ]
    },
    // COMPLETER
    {
      type: 'completer',
      q: "Face ID crée une carte ___ de ton visage avec 30 000 points infrarouges pour te reconnaître.",
      exp: "Face ID d'Apple utilise une caméra infrarouge pour créer une carte 3D du visage avec 30 000 points. Le taux d'erreur est de 1 sur 1 000 000.",
      opts: [["3D", true], ["2D", false], ["numérique", false], ["virtuelle", false]]
    },
  ],

  'c1-l3': [
    // ORDRE — chronologie de l'IA
    {
      type: 'ordre',
      q: "Remets ces événements majeurs de l'IA dans l'ordre chronologique :",
      exp: "Test de Turing (1950) → naissance du terme IA (1956) → Deep Blue bat Kasparov (1997) → révolution Deep Learning avec AlexNet (2012) → lancement de ChatGPT (2022).",
      opts: [
        ["Alan Turing propose le test de Turing", true, 1],
        ["Le terme \"Intelligence Artificielle\" est inventé à Dartmouth", true, 2],
        ["Deep Blue bat Kasparov aux échecs", true, 3],
        ["AlexNet révolutionne la reconnaissance d'images", true, 4],
        ["ChatGPT atteint 1 million d'utilisateurs en 5 jours", true, 5],
      ]
    },
    // RELIER
    {
      type: 'relier',
      q: "Associe chaque date à l'événement correspondant :",
      exp: "1950 : Test de Turing. 1997 : Deep Blue bat Kasparov. 2017 : Architecture Transformer. 2022 : Lancement de ChatGPT.",
      opts: [
        ["1950 || Test de Turing", true],
        ["1997 || Deep Blue bat Kasparov", true],
        ["2017 || Architecture Transformer", true],
        ["2022 || Lancement de ChatGPT", true],
      ]
    },
    // COMPLETER
    {
      type: 'completer',
      q: "L'architecture ___, inventée par Google en 2017, est la base de tous les grands modèles de langage comme GPT et Claude.",
      exp: "\"Attention is All You Need\" (2017) introduit l'architecture Transformer. GPT, Claude, Gemini sont tous basés sur cette invention. C'est l'un des papiers les plus importants de l'histoire de l'IA.",
      opts: [["Transformer", true], ["Neuronale", false], ["LSTM", false], ["CNN", false]]
    },
  ],

  'c1-l4': [
    // RELIER — types d'IA
    {
      type: 'relier',
      q: "Associe chaque IA à son type :",
      exp: "ChatGPT génère du texte (générative), Gmail détecte les spams (discriminative), AlphaGo joue au Go (étroite), et l'AGI est encore un objectif de recherche (n'existe pas encore).",
      opts: [
        ["ChatGPT || IA Générative", true],
        ["Filtre anti-spam Gmail || IA Discriminative", true],
        ["AlphaGo || IA Étroite", true],
        ["AGI || N'existe pas encore", true],
      ]
    },
    // ORDRE — du plus spécifique au plus général
    {
      type: 'ordre',
      q: "Classe ces concepts du plus spécifique au plus général :",
      exp: "Le Deep Learning est un sous-ensemble du Machine Learning, qui est lui-même un sous-ensemble de l'IA. L'IA est le concept le plus large des trois.",
      opts: [
        ["Deep Learning", true, 1],
        ["Machine Learning", true, 2],
        ["Intelligence Artificielle", true, 3],
      ]
    },
    // COMPLETER
    {
      type: 'completer',
      q: "L'IA ___ crée du contenu (texte, images, musique) tandis que l'IA discriminative classifie et prédit.",
      exp: "L'IA générative crée du nouveau contenu. C'est la révolution actuelle avec ChatGPT, DALL-E, Midjourney, Suno... L'IA discriminative, elle, classe des données existantes.",
      opts: [["générative", true], ["symbolique", false], ["étroite", false], ["connexionniste", false]]
    },
  ],

  'c1-l5': [
    // ORDRE — cycle d'apprentissage
    {
      type: 'ordre',
      q: "Remets dans l'ordre les étapes du cycle d'apprentissage d'une IA :",
      exp: "Le cycle complet : collecter des données → construire le modèle → entraîner sur les données → évaluer sur de nouvelles données → utiliser en production (inférence).",
      opts: [
        ["Collecter des données de qualité", true, 1],
        ["Construire l'architecture du modèle", true, 2],
        ["Entraîner le modèle sur les données", true, 3],
        ["Évaluer sur des données jamais vues", true, 4],
        ["Utiliser le modèle en production (inférence)", true, 5],
      ]
    },
    // RELIER
    {
      type: 'relier',
      q: "Associe chaque terme à sa définition :",
      exp: "Feature = variable d'entrée. Entraînement = apprentissage par l'erreur. Inférence = utilisation du modèle. Overfitting = mémorisation sans apprentissage réel.",
      opts: [
        ["Feature || Variable d'entrée du modèle", true],
        ["Entraînement || Ajustement des paramètres par l'erreur", true],
        ["Inférence || Utilisation du modèle sur de nouvelles données", true],
        ["Overfitting || Mémorisation sans vraie généralisation", true],
      ]
    },
    // COMPLETER
    {
      type: 'completer',
      q: "Le principe GIGO signifie \"Garbage In, Garbage ___\" : des données de mauvaise qualité produisent un modèle de mauvaise qualité.",
      exp: "GIGO = Garbage In, Garbage Out. C'est le principe fondamental du ML : la qualité du modèle dépend directement de la qualité des données d'entraînement.",
      opts: [["Out", true], ["Away", false], ["Down", false], ["Lost", false]]
    },
  ],
}

// Insertion en base
for (const [slug, exercises] of Object.entries(data)) {
  const lessonId = bySlug[slug]
  if (!lessonId) { console.log(`⚠️  Leçon introuvable : ${slug}`); continue }

  // Récupère le dernier order existant pour ne pas écraser
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
        xpValue: ex.type === 'qcm' ? 5 : 8, // bonus XP pour exercices interactifs
      }
    })

    for (let j = 0; j < ex.opts.length; j++) {
      const opt = ex.opts[j]
      await p.answerOption.create({
        data: {
          exerciseId: created.id,
          text: opt[0],
          isCorrect: opt[1],
          order: ex.type === 'ordre' ? opt[2] : j, // pour "ordre", on utilise la position correcte
        }
      })
    }
    console.log(`  ✅ ${ex.type} ajouté à ${slug}`)
  }
  console.log(`📚 ${slug} — ${exercises.length} exercices ajoutés`)
}

console.log('\n🎉 Exercices variés ajoutés pour le chapitre 1 !')
await p.$disconnect()
