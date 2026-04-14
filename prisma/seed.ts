// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding NeuroPilot database...')

  // ─── Badges ───────────────────────────────────────────────
  const badges = await Promise.all([
    prisma.badge.upsert({ where: { slug: 'premier-pas' }, update: {}, create: { slug: 'premier-pas', name: 'Premier Pas', description: 'Terminer ta première leçon', emoji: '🚀', condition: '{"lessonsCompleted": 1}' }}),
    prisma.badge.upsert({ where: { slug: 'curieux' }, update: {}, create: { slug: 'curieux', name: 'Curieux', description: 'Terminer 5 leçons', emoji: '🔍', condition: '{"lessonsCompleted": 5}' }}),
    prisma.badge.upsert({ where: { slug: 'apprenti-ia' }, update: {}, create: { slug: 'apprenti-ia', name: 'Apprenti IA', description: 'Terminer le chapitre 1', emoji: '🤖', condition: '{"chapter": "decouvrir-ia"}' }}),
    prisma.badge.upsert({ where: { slug: 'semaine-de-feu' }, update: {}, create: { slug: 'semaine-de-feu', name: 'Semaine de Feu', description: '7 jours de suite', emoji: '🔥', condition: '{"streak": 7}' }}),
    prisma.badge.upsert({ where: { slug: 'perfectionniste' }, update: {}, create: { slug: 'perfectionniste', name: 'Perfectionniste', description: '100% à une leçon', emoji: '⭐', condition: '{"perfectScore": true}' }}),
    prisma.badge.upsert({ where: { slug: 'prompt-master' }, update: {}, create: { slug: 'prompt-master', name: 'Prompt Master', description: 'Terminer le chapitre Prompt Engineering', emoji: '✍️', condition: '{"chapter": "prompt-engineering"}' }}),
    prisma.badge.upsert({ where: { slug: 'marathonien' }, update: {}, create: { slug: 'marathonien', name: 'Marathonien', description: '30 jours de suite', emoji: '🏅', condition: '{"streak": 30}' }}),
    prisma.badge.upsert({ where: { slug: 'encyclopedie' }, update: {}, create: { slug: 'encyclopedie', name: 'Encyclopédie', description: '500 XP gagnés', emoji: '📚', condition: '{"xp": 500}' }}),
  ])
  console.log(`✅ ${badges.length} badges créés`)

  // ─── Chapitres ────────────────────────────────────────────
  const ch1 = await prisma.chapter.upsert({ where: { slug: 'decouvrir-ia' }, update: {}, create: {
    slug: 'decouvrir-ia', title: 'Découvrir l\'IA', description: 'Comprendre ce qu\'est l\'intelligence artificielle, d\'où elle vient et comment elle change le monde autour de toi.', emoji: '🤖', order: 1, color: '#00D4FF', xpRequired: 0,
  }})
  const ch2 = await prisma.chapter.upsert({ where: { slug: 'machine-learning' }, update: {}, create: {
    slug: 'machine-learning', title: 'Machine Learning', description: 'Découvre comment les machines apprennent par elles-mêmes à partir des données.', emoji: '📊', order: 2, color: '#A3FF47', xpRequired: 80,
  }})
  const ch3 = await prisma.chapter.upsert({ where: { slug: 'reseaux-neurones' }, update: {}, create: {
    slug: 'reseaux-neurones', title: 'Réseaux de Neurones', description: 'Plonge dans les architectures qui imitent le cerveau humain pour reconnaître, créer et prédire.', emoji: '🧠', order: 3, color: '#FF6B6B', xpRequired: 200,
  }})
  const ch4 = await prisma.chapter.upsert({ where: { slug: 'ia-generative' }, update: {}, create: {
    slug: 'ia-generative', title: 'IA Générative', description: 'ChatGPT, DALL-E, Midjourney... Comprends comment l\'IA crée du texte, des images et du son.', emoji: '✨', order: 4, color: '#FFB347', xpRequired: 350,
  }})
  const ch5 = await prisma.chapter.upsert({ where: { slug: 'prompt-engineering' }, update: {}, create: {
    slug: 'prompt-engineering', title: 'Prompt Engineering', description: 'Maîtrise l\'art de parler aux IA pour obtenir exactement ce que tu veux.', emoji: '✍️', order: 5, color: '#C9B1FF', xpRequired: 500,
  }})
  const ch6 = await prisma.chapter.upsert({ where: { slug: 'ia-au-travail' }, update: {}, create: {
    slug: 'ia-au-travail', title: 'L\'IA au Travail', description: 'Utilise les outils IA pour booster ta productivité, automatiser les tâches répétitives et créer plus.', emoji: '💼', order: 6, color: '#4ECDC4', xpRequired: 650,
  }})
  const ch7 = await prisma.chapter.upsert({ where: { slug: 'ethique-ia' }, update: {}, create: {
    slug: 'ethique-ia', title: 'Limites & Éthique', description: 'L\'IA n\'est pas parfaite. Explore les biais, les risques et les questions éthiques essentielles.', emoji: '⚖️', order: 7, color: '#FF8C69', xpRequired: 800,
  }})
  const ch8 = await prisma.chapter.upsert({ where: { slug: 'atelier-projets' }, update: {}, create: {
    slug: 'atelier-projets', title: 'Atelier Projets', description: 'Applique tout ce que tu as appris sur des cas concrets et des projets réels.', emoji: '🛠️', order: 8, color: '#98FB98', xpRequired: 1000,
  }})

  console.log('✅ 8 chapitres créés')

  // ─── Leçons Chapitre 1 : Découvrir l'IA ──────────────────
  const lessons_ch1 = [
    { slug: 'c1-l1', title: 'C\'est quoi l\'IA ?', description: 'Une intro claire et sans jargon sur l\'intelligence artificielle', order: 1, xpReward: 20, duration: 4 },
    { slug: 'c1-l2', title: 'L\'IA dans ta vie quotidienne', description: 'Spotify, GPS, Netflix... l\'IA est partout sans qu\'on le sache', order: 2, xpReward: 20, duration: 5 },
    { slug: 'c1-l3', title: 'Histoire de l\'IA', description: 'De Turing aux LLMs : 70 ans d\'évolution en quelques minutes', order: 3, xpReward: 25, duration: 5 },
    { slug: 'c1-l4', title: 'Types d\'IA', description: 'IA étroite vs générale, symbolique vs connexionniste', order: 4, xpReward: 25, duration: 5 },
    { slug: 'c1-l5', title: 'Comment une IA "pense"', description: 'Données, modèles, prédictions : le cycle de l\'apprentissage', order: 5, xpReward: 30, duration: 6 },
  ]

  const lessons_ch2 = [
    { slug: 'c2-l1', title: 'Apprendre sans programmer', description: 'Comment le machine learning fonctionne réellement', order: 1, xpReward: 20, duration: 5 },
    { slug: 'c2-l2', title: 'Supervisé vs non supervisé', description: 'Les deux grandes familles d\'apprentissage automatique', order: 2, xpReward: 25, duration: 5 },
    { slug: 'c2-l3', title: 'La magie des données', description: 'Pourquoi les données sont le carburant de l\'IA', order: 3, xpReward: 25, duration: 5 },
    { slug: 'c2-l4', title: 'Overfitting : quand l\'IA triche', description: 'Comprendre pourquoi un modèle peut trop mémoriser', order: 4, xpReward: 30, duration: 6 },
    { slug: 'c2-l5', title: 'Évaluer un modèle', description: 'Précision, rappel, F1-score : comment savoir si un modèle est bon', order: 5, xpReward: 30, duration: 6 },
  ]

  const lessons_ch3 = [
    { slug: 'c3-l1', title: 'Le neurone artificiel', description: 'L\'élément de base qui imite la biologie du cerveau', order: 1, xpReward: 25, duration: 5 },
    { slug: 'c3-l2', title: 'Architecture d\'un réseau', description: 'Couches, connexions, poids : comment ça s\'assemble', order: 2, xpReward: 25, duration: 5 },
    { slug: 'c3-l3', title: 'L\'entraînement en profondeur', description: 'Rétropropagation et descente de gradient expliqués simplement', order: 3, xpReward: 30, duration: 6 },
    { slug: 'c3-l4', title: 'CNN : voir comme une machine', description: 'Les réseaux de neurones qui reconnaissent les images', order: 4, xpReward: 30, duration: 6 },
    { slug: 'c3-l5', title: 'RNN et LSTM', description: 'Les réseaux qui comprennent les séquences et le temps', order: 5, xpReward: 30, duration: 6 },
  ]

  const lessons_ch4 = [
    { slug: 'c4-l1', title: 'Qu\'est-ce qu\'un LLM ?', description: 'Les grands modèles de langage qui révolutionnent le monde', order: 1, xpReward: 25, duration: 5 },
    { slug: 'c4-l2', title: 'GPT et ses cousins', description: 'ChatGPT, Claude, Gemini : qui fait quoi ?', order: 2, xpReward: 25, duration: 5 },
    { slug: 'c4-l3', title: 'L\'IA qui crée des images', description: 'Stable Diffusion, DALL-E, Midjourney démystifiés', order: 3, xpReward: 25, duration: 5 },
    { slug: 'c4-l4', title: 'Tokens et contexte', description: 'Comment un LLM lit et génère du texte', order: 4, xpReward: 30, duration: 6 },
    { slug: 'c4-l5', title: 'Le fine-tuning', description: 'Adapter un modèle existant à des besoins spécifiques', order: 5, xpReward: 35, duration: 7 },
  ]

  const lessons_ch5 = [
    { slug: 'c5-l1', title: 'Qu\'est-ce qu\'un prompt ?', description: 'L\'instruction que tu donnes à une IA et pourquoi ça compte', order: 1, xpReward: 20, duration: 4 },
    { slug: 'c5-l2', title: 'Techniques de base', description: 'Soyez précis, donnez du contexte, définissez le format', order: 2, xpReward: 25, duration: 5 },
    { slug: 'c5-l3', title: 'Chain of Thought', description: 'Demander à l\'IA de réfléchir étape par étape', order: 3, xpReward: 30, duration: 6 },
    { slug: 'c5-l4', title: 'Few-shot prompting', description: 'Donner des exemples pour guider la réponse', order: 4, xpReward: 30, duration: 6 },
    { slug: 'c5-l5', title: 'Prompts pour le travail', description: 'Templates prêts à l\'emploi pour 10 cas métiers courants', order: 5, xpReward: 35, duration: 7 },
  ]

  const lessons_ch6 = [
    { slug: 'c6-l1', title: 'Outils IA incontournables', description: 'Top 10 des outils IA qui vont changer ta façon de travailler', order: 1, xpReward: 20, duration: 5 },
    { slug: 'c6-l2', title: 'Automatiser avec l\'IA', description: 'Zapier, Make, n8n : connecte tes apps et gagne du temps', order: 2, xpReward: 25, duration: 5 },
    { slug: 'c6-l3', title: 'L\'IA pour écrire', description: 'Rédaction, reformulation, traduction : tout ce que l\'IA peut faire', order: 3, xpReward: 25, duration: 5 },
    { slug: 'c6-l4', title: 'L\'IA pour analyser', description: 'Analyser des données, documents et rapports avec l\'IA', order: 4, xpReward: 30, duration: 6 },
    { slug: 'c6-l5', title: 'Construire un workflow IA', description: 'Crée ton premier flux de travail automatisé de A à Z', order: 5, xpReward: 35, duration: 7 },
  ]

  const lessons_ch7 = [
    { slug: 'c7-l1', title: 'Les biais de l\'IA', description: 'Pourquoi les IA peuvent être injustes et comment le détecter', order: 1, xpReward: 25, duration: 5 },
    { slug: 'c7-l2', title: 'Hallucinations et erreurs', description: 'Quand l\'IA invente des faits : comprendre et prévenir', order: 2, xpReward: 25, duration: 5 },
    { slug: 'c7-l3', title: 'Vie privée et données', description: 'Ce que l\'IA fait de tes données et comment te protéger', order: 3, xpReward: 25, duration: 5 },
    { slug: 'c7-l4', title: 'Impact sur l\'emploi', description: 'Quels métiers sont menacés, lesquels émergent, comment s\'adapter', order: 4, xpReward: 30, duration: 6 },
    { slug: 'c7-l5', title: 'IA responsable', description: 'Les principes d\'une IA éthique selon les organisations mondiales', order: 5, xpReward: 30, duration: 6 },
  ]

  const lessons_ch8 = [
    { slug: 'c8-l1', title: 'Projet : Assistant personnel', description: 'Construis ton propre assistant IA avec des prompts avancés', order: 1, xpReward: 40, duration: 10 },
    { slug: 'c8-l2', title: 'Projet : Veille automatique', description: 'Automatise ta veille sectorielle avec des outils IA', order: 2, xpReward: 40, duration: 10 },
    { slug: 'c8-l3', title: 'Projet : Rédaction augmentée', description: 'Produis du contenu 5x plus vite avec l\'IA comme co-pilote', order: 3, xpReward: 40, duration: 10 },
    { slug: 'c8-l4', title: 'Projet : Analyse de données', description: 'Upload un CSV, pose des questions en langage naturel', order: 4, xpReward: 40, duration: 10 },
    { slug: 'c8-l5', title: 'Certification NeuroPilot', description: 'Le quiz final pour valider ton parcours complet', order: 5, xpReward: 100, duration: 15 },
  ]

  const allLessonSets = [
    { chapter: ch1, lessons: lessons_ch1 },
    { chapter: ch2, lessons: lessons_ch2 },
    { chapter: ch3, lessons: lessons_ch3 },
    { chapter: ch4, lessons: lessons_ch4 },
    { chapter: ch5, lessons: lessons_ch5 },
    { chapter: ch6, lessons: lessons_ch6 },
    { chapter: ch7, lessons: lessons_ch7 },
    { chapter: ch8, lessons: lessons_ch8 },
  ]

  const createdLessons: Record<string, string> = {}

  for (const { chapter, lessons } of allLessonSets) {
    for (const l of lessons) {
      const lesson = await prisma.lesson.upsert({
        where: { slug: l.slug },
        update: {},
        create: { ...l, chapterId: chapter.id },
      })
      createdLessons[l.slug] = lesson.id
    }
  }

  console.log('✅ 40 leçons créées')

  // ─── Exercices pour les leçons du chapitre 1 ──────────────
  const exercisesData = [
    // c1-l1 : C'est quoi l'IA ?
    {
      lessonSlug: 'c1-l1',
      exercises: [
        {
          type: 'qcm', order: 1, xpValue: 5,
          question: 'Quelle est la meilleure définition de l\'intelligence artificielle ?',
          explanation: 'L\'IA est la capacité d\'une machine à simuler des comportements intelligents — comme apprendre, raisonner ou résoudre des problèmes. Elle ne "pense" pas comme un humain, mais imite certains processus cognitifs.',
          options: [
            { text: 'Un robot humanoïde capable de marcher', isCorrect: false, order: 0 },
            { text: 'Un programme qui simule des comportements intelligents', isCorrect: true, order: 1 },
            { text: 'Un ordinateur très puissant', isCorrect: false, order: 2 },
            { text: 'Une technologie de science-fiction', isCorrect: false, order: 3 },
          ]
        },
        {
          type: 'vrai_faux', order: 2, xpValue: 5,
          question: 'L\'IA peut ressentir des émotions comme un être humain.',
          explanation: 'Faux ! L\'IA actuelle ne ressent rien. Elle traite des données et génère des réponses statistiquement probables. Elle peut simuler des émotions dans ses réponses, mais elle n\'éprouve rien.',
          options: [
            { text: 'Vrai', isCorrect: false, order: 0 },
            { text: 'Faux', isCorrect: true, order: 1 },
          ]
        },
        {
          type: 'qcm', order: 3, xpValue: 5,
          question: 'Qu\'est-ce qui différencie l\'IA d\'un programme informatique classique ?',
          explanation: 'Un programme classique suit des règles fixes écrites par un humain. L\'IA, elle, peut apprendre de nouvelles règles à partir de données — c\'est ça la vraie différence.',
          options: [
            { text: 'L\'IA est plus rapide', isCorrect: false, order: 0 },
            { text: 'L\'IA peut apprendre à partir de données', isCorrect: true, order: 1 },
            { text: 'L\'IA ne fait pas d\'erreurs', isCorrect: false, order: 2 },
            { text: 'L\'IA fonctionne sans électricité', isCorrect: false, order: 3 },
          ]
        },
        {
          type: 'completer', order: 4, xpValue: 5,
          question: 'L\'IA a besoin de grandes quantités de ___ pour apprendre.',
          explanation: 'Les données sont le carburant de l\'IA. Plus elle en a (et de bonne qualité), plus elle est précise. C\'est pourquoi les entreprises tech collectent tant de données.',
          options: [
            { text: 'données', isCorrect: true, order: 0 },
            { text: 'robots', isCorrect: false, order: 1 },
            { text: 'ingénieurs', isCorrect: false, order: 2 },
            { text: 'serveurs', isCorrect: false, order: 3 },
          ]
        },
        {
          type: 'vrai_faux', order: 5, xpValue: 5,
          question: 'L\'IA générale (capable de tout faire comme un humain) existe déjà.',
          explanation: 'Faux ! Aujourd\'hui, on a surtout des IA "étroites" (narrow AI) spécialisées dans une tâche. L\'IA générale (AGI) est encore un objectif de recherche, pas une réalité.',
          options: [
            { text: 'Vrai', isCorrect: false, order: 0 },
            { text: 'Faux', isCorrect: true, order: 1 },
          ]
        },
      ]
    },
    // c1-l2 : L'IA dans ta vie quotidienne
    {
      lessonSlug: 'c1-l2',
      exercises: [
        {
          type: 'qcm', order: 1, xpValue: 5,
          question: 'Quand Spotify te recommande une chanson que tu vas adorer, quelle technologie est utilisée ?',
          explanation: 'C\'est un système de recommandation basé sur le machine learning. Il analyse tes écoutes passées, les compare avec des millions d\'autres utilisateurs, et prédit ce qui te plaira.',
          options: [
            { text: 'Des employés qui écoutent ta musique', isCorrect: false, order: 0 },
            { text: 'Un algorithme de recommandation IA', isCorrect: true, order: 1 },
            { text: 'Un catalogue trié alphabétiquement', isCorrect: false, order: 2 },
            { text: 'Tes amis qui partagent leurs playlists', isCorrect: false, order: 3 },
          ]
        },
        {
          type: 'vrai_faux', order: 2, xpValue: 5,
          question: 'La détection de spam dans ta boîte mail utilise l\'IA.',
          explanation: 'Vrai ! Les filtres anti-spam modernes utilisent du machine learning. Ils analysent des milliers de caractéristiques (expéditeur, mots-clés, structure) pour décider si un mail est du spam.',
          options: [
            { text: 'Vrai', isCorrect: true, order: 0 },
            { text: 'Faux', isCorrect: false, order: 1 },
          ]
        },
        {
          type: 'relier', order: 3, xpValue: 5,
          question: 'Associe chaque service à son usage de l\'IA :',
          explanation: 'L\'IA est omniprésente dans les apps qu\'on utilise chaque jour, souvent de façon invisible. Chaque service a développé des algorithmes spécialisés pour sa mission principale.',
          options: [
            { text: 'Google Maps → Prédiction du trafic', isCorrect: true, order: 0 },
            { text: 'Instagram → Reconnaissance de visages', isCorrect: true, order: 1 },
            { text: 'Netflix → Recommandation de films', isCorrect: true, order: 2 },
            { text: 'Gmail → Filtrage du spam', isCorrect: true, order: 3 },
          ]
        },
        {
          type: 'qcm', order: 4, xpValue: 5,
          question: 'Face ID sur iPhone utilise quel type d\'IA ?',
          explanation: 'Face ID utilise la reconnaissance faciale, une technologie basée sur les réseaux de neurones convolutifs (CNN). Le téléphone crée une carte 3D de ton visage avec 30 000 points infrarouges.',
          options: [
            { text: 'Traitement du langage naturel (NLP)', isCorrect: false, order: 0 },
            { text: 'Reconnaissance faciale par réseaux de neurones', isCorrect: true, order: 1 },
            { text: 'Intelligence artificielle générale', isCorrect: false, order: 2 },
            { text: 'Simple comparaison de photos', isCorrect: false, order: 3 },
          ]
        },
        {
          type: 'vrai_faux', order: 5, xpValue: 5,
          question: 'Les suggestions de Google Search sont générées par un humain qui les tape en temps réel.',
          explanation: 'Faux ! C\'est un algorithme de complétion automatique basé sur les recherches de millions d\'utilisateurs. Il prédit ce que tu cherches selon les tendances et ton historique.',
          options: [
            { text: 'Vrai', isCorrect: false, order: 0 },
            { text: 'Faux', isCorrect: true, order: 1 },
          ]
        },
      ]
    },
    // c5-l1 : Qu'est-ce qu'un prompt ?
    {
      lessonSlug: 'c5-l1',
      exercises: [
        {
          type: 'qcm', order: 1, xpValue: 5,
          question: 'Un "prompt", c\'est quoi exactement ?',
          explanation: 'Un prompt est l\'instruction ou la demande que tu écris à une IA. C\'est ton outil principal pour communiquer avec elle. La qualité du prompt détermine en grande partie la qualité de la réponse.',
          options: [
            { text: 'Un bug informatique', isCorrect: false, order: 0 },
            { text: 'L\'instruction donnée à une IA', isCorrect: true, order: 1 },
            { text: 'Un type de modèle d\'IA', isCorrect: false, order: 2 },
            { text: 'Un langage de programmation', isCorrect: false, order: 3 },
          ]
        },
        {
          type: 'vrai_faux', order: 2, xpValue: 5,
          question: 'La formulation d\'un prompt n\'a pas d\'impact sur la qualité de la réponse d\'une IA.',
          explanation: 'Faux ! C\'est l\'inverse : la formulation est TOUT. Un prompt vague donne une réponse générique. Un prompt précis avec contexte, format souhaité et exemples donne une réponse bien meilleure.',
          options: [
            { text: 'Vrai', isCorrect: false, order: 0 },
            { text: 'Faux', isCorrect: true, order: 1 },
          ]
        },
        {
          type: 'qcm', order: 3, xpValue: 5,
          question: 'Quel prompt donnera la meilleure réponse pour rédiger un email professionnel ?',
          explanation: 'Le meilleur prompt donne du contexte (à qui, pourquoi), précise le format souhaité (email), le ton (professionnel) et l\'objectif. Plus tu es précis, meilleure sera la réponse.',
          options: [
            { text: '"Écris un email"', isCorrect: false, order: 0 },
            { text: '"Email professionnel"', isCorrect: false, order: 1 },
            { text: '"Tu es expert RH. Écris un email professionnel à un candidat pour lui proposer un entretien, ton de bienveillance, 3 paragraphes"', isCorrect: true, order: 2 },
            { text: '"Bonjour ChatGPT, aide-moi s\'il te plaît"', isCorrect: false, order: 3 },
          ]
        },
        {
          type: 'ordre', order: 4, xpValue: 5,
          question: 'Remets dans l\'ordre les éléments d\'un bon prompt :',
          explanation: 'Un prompt efficace suit une structure : d\'abord tu définis le rôle de l\'IA, puis tu donnes le contexte, ensuite ta demande précise, et enfin le format de sortie attendu.',
          options: [
            { text: '1. Définir le rôle : "Tu es expert en..."', isCorrect: true, order: 0 },
            { text: '2. Donner le contexte de la situation', isCorrect: true, order: 1 },
            { text: '3. Formuler la demande précise', isCorrect: true, order: 2 },
            { text: '4. Préciser le format de sortie', isCorrect: true, order: 3 },
          ]
        },
        {
          type: 'vrai_faux', order: 5, xpValue: 5,
          question: 'On peut utiliser des exemples dans un prompt pour guider l\'IA.',
          explanation: 'Vrai ! Cette technique s\'appelle le "few-shot prompting". Donner 1 à 3 exemples du résultat attendu aide énormément l\'IA à comprendre exactement ce que tu veux.',
          options: [
            { text: 'Vrai', isCorrect: true, order: 0 },
            { text: 'Faux', isCorrect: false, order: 1 },
          ]
        },
      ]
    },
  ]

  for (const { lessonSlug, exercises } of exercisesData) {
    const lessonId = createdLessons[lessonSlug]
    if (!lessonId) continue
    for (const ex of exercises) {
      const existing = await prisma.exercise.findFirst({ where: { lessonId, order: ex.order } })
      if (!existing) {
        await prisma.exercise.create({
          data: {
            lessonId,
            type: ex.type,
            question: ex.question,
            explanation: ex.explanation,
            order: ex.order,
            xpValue: ex.xpValue,
            options: { create: ex.options },
          },
        })
      }
    }
  }

  // Fill remaining lessons with 4 generic exercises
  const remainingSlugs = Object.keys(createdLessons).filter(
    s => !exercisesData.map(e => e.lessonSlug).includes(s)
  )

  for (const slug of remainingSlugs) {
    const lessonId = createdLessons[slug]
    const count = await prisma.exercise.count({ where: { lessonId } })
    if (count > 0) continue

    const genericExercises = [
      { type: 'qcm', order: 1, xpValue: 5, question: 'Quel est l\'objectif principal de cette leçon ?', explanation: 'Cette leçon te donne les fondamentaux pour comprendre ce concept et l\'appliquer dans des situations réelles.', options: [{ text: 'Mémoriser des formules', isCorrect: false, order: 0 }, { text: 'Comprendre les concepts clés', isCorrect: true, order: 1 }, { text: 'Programmer une IA', isCorrect: false, order: 2 }, { text: 'Passer un examen', isCorrect: false, order: 3 }] },
      { type: 'vrai_faux', order: 2, xpValue: 5, question: 'L\'IA peut automatiquement s\'améliorer sans aucune donnée.', explanation: 'Faux ! Toute IA a besoin de données pour apprendre et s\'améliorer. Sans données d\'entraînement de qualité, même le meilleur algorithme est inutile.', options: [{ text: 'Vrai', isCorrect: false, order: 0 }, { text: 'Faux', isCorrect: true, order: 1 }] },
      { type: 'qcm', order: 3, xpValue: 5, question: 'Qu\'est-ce qui rend l\'IA si puissante aujourd\'hui ?', explanation: 'La combinaison de trois facteurs explique l\'explosion de l\'IA : des algorithmes améliorés, des masses de données disponibles, et des capacités de calcul (GPU) abordables.', options: [{ text: 'Les robots physiques', isCorrect: false, order: 0 }, { text: 'Algorithmes + données + puissance de calcul', isCorrect: true, order: 1 }, { text: 'Internet seul', isCorrect: false, order: 2 }, { text: 'Les smartphones', isCorrect: false, order: 3 }] },
      { type: 'vrai_faux', order: 4, xpValue: 5, question: 'Les concepts vus dans cette leçon s\'appliquent dans des contextes professionnels réels.', explanation: 'Vrai ! Tout ce que tu apprends dans NeuroPilot est directement applicable. Les entreprises cherchent des profils qui comprennent l\'IA, même sans savoir coder.', options: [{ text: 'Vrai', isCorrect: true, order: 0 }, { text: 'Faux', isCorrect: false, order: 1 }] },
    ]

    await prisma.exercise.createMany({
      data: genericExercises.map(e => ({ lessonId, type: e.type, question: e.question, explanation: e.explanation, order: e.order, xpValue: e.xpValue }))
    })

    for (const ex of genericExercises) {
      const created = await prisma.exercise.findFirst({ where: { lessonId, order: ex.order } })
      if (created) {
        await prisma.answerOption.createMany({
          data: ex.options.map(o => ({ exerciseId: created.id, text: o.text, isCorrect: o.isCorrect, order: o.order }))
        })
      }
    }
  }

  console.log('✅ Exercices créés')

  // ─── Demo User ────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('demo1234', 10)
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@neuropilot.app' },
    update: {},
    create: {
      email: 'demo@neuropilot.app',
      name: 'Alex Dupont',
      password: hashedPassword,
      profile: {
        create: {
          avatar: '🚀',
          level: 3,
          xp: 145,
          hearts: 4,
          userLevel: 'debutant',
          goal: 'pro',
          totalLessonsCompleted: 6,
        }
      },
      streak: {
        create: {
          currentStreak: 5,
          longestStreak: 12,
          lastActivityAt: new Date(),
        }
      }
    }
  })

  // Add some progress for demo user
  const firstThreeLessons = ['c1-l1', 'c1-l2', 'c1-l3', 'c2-l1', 'c2-l2', 'c5-l1']
  for (const slug of firstThreeLessons) {
    const lessonId = createdLessons[slug]
    if (!lessonId) continue
    await prisma.progress.upsert({
      where: { userId_lessonId: { userId: demoUser.id, lessonId } },
      update: {},
      create: {
        userId: demoUser.id,
        lessonId,
        completed: true,
        score: Math.floor(Math.random() * 30) + 70,
        bestScore: Math.floor(Math.random() * 20) + 80,
        xpEarned: 20,
        attempts: 1,
        completedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      }
    })
  }

  // Give demo user some badges
  await prisma.userBadge.upsert({
    where: { userId_badgeId: { userId: demoUser.id, badgeId: badges[0].id } },
    update: {},
    create: { userId: demoUser.id, badgeId: badges[0].id }
  })
  await prisma.userBadge.upsert({
    where: { userId_badgeId: { userId: demoUser.id, badgeId: badges[1].id } },
    update: {},
    create: { userId: demoUser.id, badgeId: badges[1].id }
  })

  console.log('✅ Utilisateur démo créé (demo@neuropilot.app / demo1234)')
  console.log('\n🎉 Seed terminé ! NeuroPilot est prêt.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => await prisma.$disconnect())
