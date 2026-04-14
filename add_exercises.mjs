import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const lessons = await p.lesson.findMany({where:{slug:{in:['c1-l3','c1-l4','c1-l5']}}})
const bySlug = Object.fromEntries(lessons.map(l => [l.slug, l.id]))

const data = {
  'c1-l3': [
    { q: "En quelle année Alan Turing a-t-il proposé le célèbre \"test de Turing\" ?", exp: "En 1950, Alan Turing publie \"Computing Machinery and Intelligence\" et propose son test pour évaluer si une machine peut imiter l'intelligence humaine. C'est l'acte fondateur de l'IA.", opts: [["1936", false],["1950", true],["1969", false],["1984", false]] },
    { q: "Qu'est-ce que le \"hiver de l'IA\" ?", exp: "Les hivers de l'IA (1974 et 1987) sont des périodes où les financements s'effondrent car les promesses n'étaient pas tenues. Ils ont ralenti la recherche pendant des années.", opts: [["Une technologie de refroidissement des serveurs", false],["Une période de ralentissement et de désintérêt pour l'IA", true],["Un algorithme d'apprentissage par le froid", false],["Le nom d'un célèbre robot", false]] },
    { q: "Qu'est-ce qui a déclenché la révolution de l'IA moderne à partir de 2012 ?", exp: "En 2012, AlexNet gagne ImageNet avec un réseau de neurones profond, réduisant l'erreur de 26% à 15%. C'est le début de l'ère deep learning, rendu possible par les GPU et les grandes bases de données.", opts: [["L'invention d'internet", false],["La victoire d'un réseau de neurones profond à la compétition ImageNet", true],["Le lancement de l'iPhone", false],["La création de Google", false]] },
    { q: "Quel événement a marqué la victoire de l'IA aux échecs en 1997 ?", exp: "Deep Blue d'IBM bat le champion du monde Garry Kasparov en 1997. C'est un moment symbolique fort, même si Deep Blue utilisait de la force brute et non du vrai apprentissage.", opts: [["AlphaGo bat Lee Sedol", false],["Deep Blue bat Kasparov", true],["Watson gagne à Jeopardy", false],["GPT-4 bat un grand maître", false]] },
    { q: "ChatGPT a été lancé publiquement en :", exp: "ChatGPT est lancé par OpenAI en novembre 2022 et atteint 1 million d'utilisateurs en 5 jours — un record absolu. Il a déclenché une course mondiale à l'IA générative.", opts: [["2020", false],["2021", false],["2022", true],["2023", false]] },
  ],
  'c1-l4': [
    { q: "Une IA \"étroite\" (narrow AI) c'est quoi ?", exp: "La quasi-totalité des IA actuelles sont \"étroites\" : elles excellent dans une seule tâche. GPT est excellent en texte mais ne peut pas conduire une voiture. C'est différent de l'intelligence humaine généraliste.", opts: [["Une IA qui ne prend pas beaucoup de place", false],["Une IA spécialisée dans une seule tâche", true],["Une IA moins puissante qu'un humain", false],["Une IA qui fonctionne sur mobile", false]] },
    { q: "L'AGI (Intelligence Artificielle Générale) existe-t-elle aujourd'hui ?", exp: "Non, l'AGI n'existe pas encore. C'est un objectif de recherche : une IA capable d'apprendre et de raisonner sur n'importe quel sujet comme un humain. Certains pensent qu'on s'en approche, d'autres que c'est encore loin.", opts: [["Oui, c'est ChatGPT", false],["Oui, c'est Gemini Ultra", false],["Non, c'est encore un objectif de recherche", true],["Oui, elle existe mais est secrète", false]] },
    { q: "L'IA symbolique raisonne à partir de :", exp: "L'IA symbolique (années 60-80) utilise des règles logiques écrites par des humains : \"SI condition ALORS action\". Elle est explicable mais fragile. Le machine learning moderne a largement pris le dessus.", opts: [["Données et statistiques", false],["Règles logiques définies par des humains", true],["Images et vidéos", false],["Réseaux de neurones biologiques", false]] },
    { q: "Quelle est la principale différence entre IA discriminative et IA générative ?", exp: "L'IA discriminative classe ou prédit (spam/pas spam, chat/chien). L'IA générative crée du nouveau contenu (texte, image, musique). ChatGPT et DALL-E sont génératives.", opts: [["La discriminative est plus ancienne", false],["La discriminative classe, la générative crée du contenu", true],["La générative est plus précise", false],["Il n'y a pas de différence", false]] },
    { q: "Le \"machine learning\" est :", exp: "Le machine learning est un sous-ensemble de l'IA. L'IA est le concept général, le ML est une façon de l'implémenter via l'apprentissage par les données. Le deep learning est lui-même un sous-ensemble du ML.", opts: [["Synonyme d'intelligence artificielle", false],["Un sous-ensemble de l'IA basé sur l'apprentissage par les données", true],["Un langage de programmation", false],["Un type de robot", false]] },
  ],
  'c1-l5': [
    { q: "Qu'est-ce qu'un \"modèle\" en IA ?", exp: "Un modèle est le résultat de l'entraînement : c'est une fonction mathématique qui prend des données en entrée et produit une prédiction en sortie. GPT-4 est un modèle, comme un réseau de neurones entraîné à reconnaître des chats.", opts: [["Un robot physique", false],["Une fonction mathématique entraînée pour faire des prédictions", true],["Un dataset de données", false],["Un ordinateur spécialisé", false]] },
    { q: "Dans le cycle d'apprentissage d'une IA, que se passe-t-il pendant l'\"entraînement\" ?", exp: "Pendant l'entraînement, l'IA voit des milliers d'exemples, fait des prédictions, compare avec la bonne réponse, et ajuste ses paramètres pour réduire l'erreur. Ce processus se répète des millions de fois.", opts: [["L'IA lit des livres comme un humain", false],["L'IA ajuste ses paramètres pour minimiser les erreurs sur des exemples", true],["L'IA se connecte à internet", false],["L'IA copie le cerveau d'un expert", false]] },
    { q: "Qu'est-ce qu'une \"feature\" (caractéristique) en machine learning ?", exp: "Une feature est une variable d'entrée utilisée par le modèle. Pour prédire le prix d'une maison : surface, nombre de pièces, quartier sont des features. Choisir les bonnes features est crucial.", opts: [["Un bug dans le code", false],["Une variable d'entrée utilisée par le modèle pour apprendre", true],["Le résultat d'une prédiction", false],["La vitesse de calcul du modèle", false]] },
    { q: "Pourquoi dit-on que les données sont le \"carburant\" de l'IA ?", exp: "Sans données, pas d'apprentissage. Plus les données sont nombreuses, variées et de qualité, plus le modèle sera précis. C'est pour ça que les GAFA collectent tant de données — elles entraînent leurs IA.", opts: [["Parce que les IA consomment beaucoup d'électricité", false],["Parce que sans données de qualité, l'IA ne peut pas apprendre efficacement", true],["Parce que les données sont vendues comme du pétrole", false],["Parce que les données refroidissent les serveurs", false]] },
    { q: "Qu'est-ce que l'\"inférence\" en IA ?", exp: "L'inférence c'est quand on utilise un modèle déjà entraîné pour faire une prédiction sur de nouvelles données. Quand tu envoies un message à ChatGPT et qu'il répond, c'est de l'inférence.", opts: [["La phase d'entraînement du modèle", false],["L'utilisation d'un modèle entraîné pour faire des prédictions", true],["La collecte de nouvelles données", false],["La suppression d'un modèle obsolète", false]] },
  ]
}

for(const [slug, exercises] of Object.entries(data)) {
  const lessonId = bySlug[slug]
  if(!lessonId) continue
  for(let i=0; i<exercises.length; i++) {
    const ex = exercises[i]
    const created = await p.exercise.create({
      data: { lessonId, type: 'qcm', question: ex.q, explanation: ex.exp, order: i+1, xpValue: 5 }
    })
    for(let j=0; j<ex.opts.length; j++) {
      await p.answerOption.create({
        data: { exerciseId: created.id, text: ex.opts[j][0], isCorrect: ex.opts[j][1], order: j }
      })
    }
  }
}
console.log('Questions ajoutées !')
await p.$disconnect()
