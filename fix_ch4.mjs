import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const lessons = await p.lesson.findMany({where:{slug:{in:['c4-l1','c4-l2','c4-l3','c4-l4','c4-l5']}}})
for(const l of lessons) {
  const exos = await p.exercise.findMany({where:{lessonId:l.id}})
  for(const e of exos) await p.answerOption.deleteMany({where:{exerciseId:e.id}})
  await p.exercise.deleteMany({where:{lessonId:l.id}})
}
const bySlug = Object.fromEntries(lessons.map(l => [l.slug, l.id]))

const data = {
  'c4-l1': [
    { q: "LLM signifie :", exp: "LLM = Large Language Model. Ce sont des modèles entraînés sur d'énormes quantités de texte pour comprendre et générer du langage naturel. GPT-4, Claude, Gemini sont des LLMs.", opts: [["Light Learning Machine", false],["Large Language Model", true],["Linear Logic Module", false],["Layered Learning Method", false]] },
    { q: "Sur quoi sont entraînés les LLMs ?", exp: "Les LLMs sont entraînés sur des milliards de pages de texte : internet, livres, articles, code... Ils apprennent les patterns du langage en prédisant le mot suivant dans une phrase.", opts: [["Des bases de données structurées uniquement", false],["Des milliards de textes issus d'internet, livres et articles", true],["Des conversations humaines enregistrées", false],["Des encyclopédies uniquement", false]] },
    { q: "Comment un LLM génère-t-il du texte ?", exp: "Un LLM prédit le token (mot ou partie de mot) le plus probable à chaque étape. Il génère le texte un token à la fois, en tenant compte de tout ce qui précède dans la conversation.", opts: [["Il copie des phrases depuis sa base de données", false],["Il prédit le token suivant le plus probable, un à la fois", true],["Il traduit le texte depuis un autre langage", false],["Il assemble des phrases pré-écrites", false]] },
    { q: "Vrai ou Faux : Un LLM comprend vraiment le sens des mots comme un humain.", exp: "Faux ! Un LLM manipule des patterns statistiques dans les données textuelles. Il n'a pas de compréhension sémantique profonde ni de conscience. Il est très convaincant mais fondamentalement différent de la compréhension humaine.", opts: [["Vrai", false],["Faux", true]] },
    { q: "Qu'est-ce qui différencie un LLM d'un moteur de recherche ?", exp: "Un moteur de recherche trouve des documents existants. Un LLM génère du nouveau texte en synthétisant ses connaissances. Le LLM peut raisonner, résumer, créer — pas seulement indexer.", opts: [["Le LLM est plus rapide", false],["Le LLM génère du nouveau contenu, le moteur de recherche trouve des documents existants", true],["Le LLM nécessite internet", false],["Il n'y a pas de différence", false]] },
  ],
  'c4-l2': [
    { q: "GPT signifie :", exp: "GPT = Generative Pre-trained Transformer. Generative car il génère du texte, Pre-trained car entraîné sur de grandes données avant d'être affiné, Transformer car basé sur cette architecture révolutionnaire.", opts: [["General Purpose Technology", false],["Generative Pre-trained Transformer", true],["Global Processing Tool", false],["Graphical Processing Terminal", false]] },
    { q: "Quelle entreprise a créé Claude ?", exp: "Claude est créé par Anthropic, fondée en 2021 par d'anciens membres d'OpenAI dont Dario et Daniela Amodei. Anthropic se concentre sur la sécurité de l'IA.", opts: [["OpenAI", false],["Google", false],["Anthropic", true],["Meta", false]] },
    { q: "Qu'est-ce qui différencie principalement les différents LLMs (GPT, Claude, Gemini) ?", exp: "Les LLMs diffèrent par leurs données d'entraînement, leur architecture, leurs valeurs de sécurité, et leur façon d'être affinés (RLHF). Chacun a des forces différentes selon les tâches.", opts: [["Uniquement leur vitesse", false],["Leurs données d'entraînement, architecture, méthodes d'alignement et valeurs", true],["Leur couleur d'interface", false],["Le pays où ils ont été créés", false]] },
    { q: "Qu'est-ce que le RLHF utilisé pour entraîner ChatGPT ?", exp: "RLHF = Reinforcement Learning from Human Feedback. Des humains évaluent les réponses du modèle, et ces retours servent à l'entraîner à produire des réponses plus utiles et plus sûres.", opts: [["Un type de réseau de neurones", false],["Une méthode qui utilise les retours humains pour améliorer les réponses", true],["Un algorithme de compression de texte", false],["Un système de traduction automatique", false]] },
    { q: "Vrai ou Faux : On peut utiliser plusieurs LLMs différents pour différentes tâches.", exp: "Vrai ! Claude excelle en analyse et raisonnement long, GPT-4 est très polyvalent, Gemini est intégré à Google. Utiliser le bon outil selon la tâche est une compétence importante.", opts: [["Vrai", true],["Faux", false]] },
  ],
  'c4-l3': [
    { q: "Comment fonctionne Stable Diffusion pour générer des images ?", exp: "Stable Diffusion part d'une image de bruit aléatoire et la 'débruite' progressivement en suivant les instructions du prompt. Ce processus de diffusion inverse permet de créer des images cohérentes.", opts: [["Il assemble des photos existantes", false],["Il part du bruit et le débruite progressivement selon le prompt", true],["Il dessine pixel par pixel comme un humain", false],["Il copie le style d'artistes existants directement", false]] },
    { q: "Qu'est-ce que DALL-E ?", exp: "DALL-E est le modèle de génération d'images d'OpenAI. Son nom est un mélange de WALL-E (robot Pixar) et Salvador Dalí (artiste surréaliste). Il génère des images à partir de descriptions textuelles.", opts: [["Un robot humanoïde d'OpenAI", false],["Le modèle de génération d'images d'OpenAI", true],["Un éditeur de photos automatique", false],["Un système de reconnaissance d'images", false]] },
    { q: "Vrai ou Faux : Les IA de génération d'images comprennent vraiment ce qu'elles dessinent.", exp: "Faux ! Elles apprennent des associations statistiques entre descriptions et images. C'est pour ça qu'elles peuvent faire des erreurs absurdes (mains à 6 doigts, texte illisible) — elles ne 'voient' pas comme nous.", opts: [["Vrai", false],["Faux", true]] },
    { q: "Qu'est-ce que le 'prompt' dans la génération d'images ?", exp: "Le prompt est la description textuelle que tu donnes à l'IA pour générer une image. La qualité et la précision du prompt influencent énormément le résultat — c'est tout l'art du prompt engineering.", opts: [["Le nom du fichier image généré", false],["La description textuelle qui guide la génération de l'image", true],["La résolution de l'image", false],["Le style artistique prédéfini", false]] },
    { q: "Midjourney, DALL-E et Stable Diffusion sont tous des :", exp: "Ce sont tous des modèles de génération d'images par IA, mais avec des approches légèrement différentes. Midjourney est réputé pour son esthétique artistique, DALL-E pour sa précision aux instructions.", opts: [["Moteurs de recherche d'images", false],["Modèles de génération d'images par IA", true],["Éditeurs de photos automatiques", false],["Systèmes de reconnaissance faciale", false]] },
  ],
  'c4-l4': [
    { q: "Qu'est-ce qu'un 'token' pour un LLM ?", exp: "Un token est l'unité de base du traitement. Ce n'est pas exactement un mot — 'bonjour' = 1 token, 'intelligence artificielle' = 3 tokens environ. Les LLMs lisent et génèrent des tokens, pas des caractères.", opts: [["Un mot complet dans le texte", false],["Une unité de texte (mot ou partie de mot) traitée par le LLM", true],["Un pixel dans une image", false],["Une ligne de code", false]] },
    { q: "Qu'est-ce que la 'fenêtre de contexte' d'un LLM ?", exp: "La fenêtre de contexte est la quantité maximale de texte (en tokens) que le LLM peut 'voir' en même temps. Au-delà de cette limite, il oublie les informations les plus anciennes.", opts: [["La taille de l'écran pour afficher le texte", false],["La quantité maximale de texte que le modèle peut traiter en même temps", true],["Le nombre de langues que le modèle comprend", false],["La vitesse de génération du texte", false]] },
    { q: "Pourquoi les LLMs ont-ils une date limite de connaissances ?", exp: "Les LLMs sont entraînés sur des données jusqu'à une certaine date (cutoff). Après cette date, ils n'ont aucune connaissance des événements. C'est pour ça qu'ils peuvent donner des infos obsolètes.", opts: [["Pour des raisons de droits d'auteur", false],["Parce que l'entraînement s'arrête à une date donnée — ils ne voient pas les nouveautés", true],["Pour économiser de l'énergie", false],["Parce qu'internet est trop grand", false]] },
    { q: "Vrai ou Faux : Un LLM avec plus de paramètres est toujours meilleur.", exp: "Faux ! La qualité des données d'entraînement et les techniques d'alignement comptent autant que la taille. Des modèles plus petits bien entraînés peuvent surpasser des géants mal alignés.", opts: [["Vrai", false],["Faux", true]] },
    { q: "Que signifie 'hallucination' pour un LLM ?", exp: "Une hallucination c'est quand le LLM génère des informations fausses avec une apparence de confiance. Il invente des faits, citations ou références qui n'existent pas. C'est un problème majeur à surveiller.", opts: [["Quand le modèle génère des images", false],["Quand le modèle invente des informations fausses avec confiance", true],["Quand le modèle refuse de répondre", false],["Quand le modèle répète la même phrase", false]] },
  ],
  'c4-l5': [
    { q: "Qu'est-ce que le fine-tuning d'un LLM ?", exp: "Le fine-tuning consiste à ré-entraîner un modèle pré-entraîné sur un dataset spécifique pour l'adapter à une tâche particulière. Ex : fine-tuner GPT sur des données médicales pour créer un assistant médical.", opts: [["Supprimer les bugs d'un modèle", false],["Adapter un modèle pré-entraîné à une tâche spécifique avec de nouvelles données", true],["Accélérer les inférences du modèle", false],["Réduire la taille du modèle", false]] },
    { q: "Quel est l'avantage du fine-tuning par rapport à l'entraînement from scratch ?", exp: "Le fine-tuning est beaucoup moins coûteux : le modèle de base a déjà appris le langage, on lui enseigne juste le domaine spécifique. Entraîner GPT-4 from scratch coûte des millions de dollars.", opts: [["Le modèle fine-tuné est toujours plus grand", false],["C'est beaucoup moins coûteux car on part d'un modèle déjà capable", true],["Le fine-tuning ne nécessite aucune donnée", false],["Le résultat est identique à GPT-4", false]] },
    { q: "Qu'est-ce que le RAG (Retrieval Augmented Generation) ?", exp: "Le RAG combine un LLM avec une base de données externe. Avant de répondre, il cherche les informations pertinentes dans la base, puis génère une réponse basée sur ces données fraîches. Solution aux hallucinations et au cutoff.", opts: [["Un type de réseau de neurones récurrent", false],["Une technique qui connecte le LLM à une base de données pour des réponses à jour", true],["Un algorithme de compression de texte", false],["Un système de génération d'images", false]] },
    { q: "Vrai ou Faux : Le fine-tuning modifie les poids du modèle de base.", exp: "Vrai ! C'est ce qui distingue le fine-tuning du prompting. Le fine-tuning change réellement les paramètres du modèle via de nouvelles étapes d'entraînement. Le prompting ne fait que guider le modèle existant.", opts: [["Vrai", true],["Faux", false]] },
    { q: "Pour créer un chatbot spécialisé sur la documentation de ton entreprise, la meilleure approche est :", exp: "Le RAG est idéal ici : connecter le LLM à ta documentation interne. Le fine-tuning est possible mais plus coûteux et la doc change souvent. Le RAG permet des mises à jour faciles et des réponses sourcées.", opts: [["Entraîner un LLM from scratch", false],["Utiliser le RAG pour connecter le LLM à ta documentation", true],["Utiliser ChatGPT sans modification", false],["Créer un simple moteur de recherche", false]] },
  ],
}

for(const [slug, exercises] of Object.entries(data)) {
  const lessonId = bySlug[slug]
  if(!lessonId) { console.log('Introuvable:', slug); continue }
  const shuffledExercises = exercises.map(ex => ({
    ...ex,
    opts: [...ex.opts].sort(() => Math.random() - 0.5)
  }))
  for(let i=0; i<shuffledExercises.length; i++) {
    const ex = shuffledExercises[i]
    const created = await p.exercise.create({
      data: { lessonId, type: ex.opts.length === 2 ? 'vrai_faux' : 'qcm', question: ex.q, explanation: ex.exp, order: i+1, xpValue: 5 }
    })
    for(let j=0; j<ex.opts.length; j++) {
      await p.answerOption.create({
        data: { exerciseId: created.id, text: ex.opts[j][0], isCorrect: ex.opts[j][1], order: j }
      })
    }
  }
}
console.log('Chapitre 4 ajouté !')
await p.$disconnect()
