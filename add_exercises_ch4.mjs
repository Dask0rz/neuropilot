import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const lessons = await p.lesson.findMany({
  where: { slug: { in: ['c4-l1', 'c4-l2', 'c4-l3', 'c4-l4', 'c4-l5'] } }
})
const bySlug = Object.fromEntries(lessons.map(l => [l.slug, l.id]))

const data = {
  'c4-l1': [
    {
      type: 'ordre',
      q: "Remets dans l'ordre les 2 phases d'entraînement d'un LLM :",
      exp: "Un LLM est d'abord pré-entraîné sur des milliards de textes (prédire le mot suivant), puis affiné avec des retours humains via le RLHF pour être plus utile et sûr.",
      opts: [
        ["Pré-entraînement sur des centaines de milliards de mots (prédire le mot suivant)", true, 1],
        ["Fine-tuning avec retours humains (RLHF) pour être utile et sûr", true, 2],
      ]
    },
    {
      type: 'completer',
      q: "Pendant le pré-entraînement, un LLM apprend en prédisant le ___ suivant dans des milliards de textes.",
      exp: "La tâche de prédire le mot (ou token) suivant semble simple, mais pour la réussir, le modèle doit comprendre la langue, les faits, la logique. C'est de là qu'émergent toutes ses capacités.",
      opts: [["mot", true], ["paragraphe", false], ["concept", false], ["chapitre", false]]
    },
    {
      type: 'relier',
      q: "Associe chaque terme LLM à sa signification :",
      exp: "Large = milliards de paramètres. Language = spécialisé en texte. Model = fonction mathématique entraînée. RLHF = affinage avec retours humains.",
      opts: [
        ["Large || Des milliards de paramètres entraînés", true],
        ["Language || Spécialisé dans la compréhension du texte", true],
        ["Model || Fonction mathématique issue de l'entraînement", true],
        ["RLHF || Affinage par retours humains pour l'utilité et la sécurité", true],
      ]
    },
  ],

  'c4-l2': [
    {
      type: 'ordre',
      q: "Remets dans l'ordre l'évolution de la famille GPT :",
      exp: "GPT-1 (2018, 117M paramètres) → GPT-2 (2019, 1,5Md, jugé trop dangereux) → GPT-3 (2020, 175Md, premier choc grand public) → GPT-4 (2023, multimodal, ChatGPT).",
      opts: [
        ["GPT-1 — 117 millions de paramètres", true, 1],
        ["GPT-2 — jugé trop dangereux à publier pendant 9 mois", true, 2],
        ["GPT-3 — premier choc grand public", true, 3],
        ["GPT-4 — multimodal, derrière ChatGPT", true, 4],
      ]
    },
    {
      type: 'relier',
      q: "Associe chaque modèle à sa caractéristique principale :",
      exp: "Claude = grande fenêtre de contexte + sécurité. GPT-4 = très polyvalent. Gemini = nativement multimodal. Llama = open source téléchargeable localement.",
      opts: [
        ["Claude || Grande fenêtre de contexte et approche sécurité", true],
        ["GPT-4 || Très polyvalent, derrière ChatGPT", true],
        ["Gemini || Nativement multimodal, intégré à Google", true],
        ["Llama || Open source, utilisable localement", true],
      ]
    },
    {
      type: 'completer',
      q: "ChatGPT est l'___ (le produit), tandis que GPT-4 est le modèle sous-jacent — comme Chrome est le navigateur et V8 le moteur.",
      exp: "ChatGPT est l'interface utilisateur développée par OpenAI. GPT-4 est le modèle de langage qui tourne derrière. Confondre les deux est une erreur fréquente.",
      opts: [["interface", true], ["algorithme", false], ["dataset", false], ["serveur", false]]
    },
  ],

  'c4-l3': [
    {
      type: 'ordre',
      q: "Remets dans l'ordre le processus de génération d'une image par diffusion :",
      exp: "La génération par diffusion : partir d'une image de bruit aléatoire → le réseau enlève le bruit progressivement guidé par le prompt → après plusieurs dizaines d'étapes, une image cohérente émerge.",
      opts: [
        ["Partir d'une image de bruit aléatoire pur", true, 1],
        ["Appliquer le prompt textuel pour guider le débruitage", true, 2],
        ["Enlever le bruit progressivement à chaque étape", true, 3],
        ["Obtenir une image cohérente après plusieurs dizaines d'étapes", true, 4],
      ]
    },
    {
      type: 'relier',
      q: "Associe chaque outil de génération d'images à sa caractéristique :",
      exp: "Midjourney = qualité artistique via Discord. DALL-E = intégré à ChatGPT, suit bien les instructions. Stable Diffusion = open source, tourne localement.",
      opts: [
        ["Midjourney || Qualité artistique, accessible via Discord", true],
        ["DALL-E || Intégré à ChatGPT, suit précisément les instructions", true],
        ["Stable Diffusion || Open source, utilisable localement", true],
      ]
    },
    {
      type: 'completer',
      q: "Les IA de génération d'images ont longtemps eu du mal avec les ___ humaines car elles sont complexes et très variables dans les données d'entraînement.",
      exp: "Les mains sont notablement difficiles pour les IA génératives : trop de doigts, formes incorrectes... Car l'IA reproduit des patterns statistiques sans comprendre l'anatomie. Les modèles récents s'améliorent sur ce point.",
      opts: [["mains", true], ["visages", false], ["yeux", false], ["cheveux", false]]
    },
  ],

  'c4-l4': [
    {
      type: 'relier',
      q: "Associe chaque modèle à sa fenêtre de contexte approximative :",
      exp: "GPT-3.5 ≈ 16 000 tokens (~12 000 mots). GPT-4 ≈ 128 000 tokens (~96 000 mots). Claude 3 ≈ 200 000 tokens (~150 000 mots, soit environ 500 pages).",
      opts: [
        ["GPT-3.5 || ~16 000 tokens", true],
        ["GPT-4 || ~128 000 tokens", true],
        ["Claude 3 || ~200 000 tokens", true],
      ]
    },
    {
      type: 'completer',
      q: "Un token correspond approximativement à ___ mot(s) en anglais, soit un peu moins en français.",
      exp: "La règle approximative : 1 token ≈ 0,75 mot en anglais. En français, les mots sont souvent plus longs donc il y a encore moins de mots par token. Les API LLM facturent à la consommation de tokens.",
      opts: [["0,75", true], ["1", false], ["2", false], ["0,5", false]]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre ce qui se passe quand tu envoies un message à un LLM :",
      exp: "Le texte est découpé en tokens → les tokens sont convertis en nombres → ils passent dans le réseau → le modèle prédit le token suivant → répété jusqu'à la fin de la réponse.",
      opts: [
        ["Ton texte est découpé en tokens", true, 1],
        ["Les tokens sont convertis en vecteurs numériques", true, 2],
        ["Le réseau traite ces vecteurs couche par couche", true, 3],
        ["Le modèle prédit le token le plus probable", true, 4],
        ["Le processus se répète jusqu'à la fin de la réponse", true, 5],
      ]
    },
  ],

  'c4-l5': [
    {
      type: 'relier',
      q: "Associe chaque approche à sa définition :",
      exp: "Fine-tuning = ré-entraîner le modèle sur des données spécifiques. RAG = injecter des documents externes dans le prompt. Les deux combinés = approche pro complète.",
      opts: [
        ["Fine-tuning || Ré-entraîner le modèle sur des données spécifiques", true],
        ["RAG || Injecter des documents pertinents dans le prompt au moment de la réponse", true],
        ["Pré-entraînement || Entraînement initial sur des milliards de textes généraux", true],
        ["Fine-tuning + RAG || Combinaison pour les applications professionnelles sérieuses", true],
      ]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre le fonctionnement du RAG (Retrieval Augmented Generation) :",
      exp: "RAG : l'utilisateur pose une question → le système cherche les documents pertinents → les documents sont injectés dans le prompt → le LLM génère une réponse basée sur ces documents.",
      opts: [
        ["L'utilisateur pose une question", true, 1],
        ["Le système cherche les documents pertinents dans la base", true, 2],
        ["Les documents sont injectés dans le prompt du LLM", true, 3],
        ["Le LLM génère une réponse basée sur ces documents", true, 4],
      ]
    },
    {
      type: 'completer',
      q: "Le fine-tuning permet de spécialiser un modèle existant à moindre coût, sans avoir à l'entraîner ___ scratch.",
      exp: "Entraîner GPT-4 from scratch coûterait des dizaines de millions de dollars. Le fine-tuning part des capacités déjà acquises et les adapte — pour quelques centaines à quelques milliers de dollars seulement.",
      opts: [["from", true], ["de", false], ["à", false], ["en", false]]
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

console.log('\n🎉 Exercices variés ajoutés pour le chapitre 4 !')
await p.$disconnect()
