import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const lessons = await p.lesson.findMany({
  where: { slug: { in: ['c5-l1', 'c5-l2', 'c5-l3', 'c5-l4', 'c5-l5'] } }
})
const bySlug = Object.fromEntries(lessons.map(l => [l.slug, l.id]))

const data = {
  'c5-l1': [
    {
      type: 'relier',
      q: "Associe chaque élément d'un prompt efficace à son rôle :",
      exp: "Rôle = oriente le ton et l'angle. Contexte = informations de fond nécessaires. Tâche = ce qu'on veut exactement. Format = comment on veut la réponse.",
      opts: [
        ["Rôle || Oriente le ton, le vocabulaire et l'angle d'approche", true],
        ["Contexte || Fournit les informations de fond nécessaires", true],
        ["Tâche || Décrit précisément ce qu'on veut obtenir", true],
        ["Format || Spécifie la longueur, la structure et le style", true],
      ]
    },
    {
      type: 'completer',
      q: "Un prompt vague génère un contexte ___ qui oriente mal la réponse, tandis qu'un prompt précis produit une réponse ciblée.",
      exp: "Les LLMs génèrent le texte statistiquement le plus probable après le prompt. Plus le contexte est riche et précis, plus la réponse sera adaptée à ta demande réelle.",
      opts: [["flou", true], ["riche", false], ["court", false], ["complexe", false]]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre les 4 éléments d'un prompt efficace :",
      exp: "Un prompt efficace commence par définir le rôle, puis donner le contexte, préciser la tâche, et enfin indiquer le format souhaité pour la réponse.",
      opts: [
        ["Rôle — définir qui est l'IA pour cette tâche", true, 1],
        ["Contexte — fournir les informations de fond", true, 2],
        ["Tâche — décrire précisément ce qu'on veut", true, 3],
        ["Format — spécifier comment on veut la réponse", true, 4],
      ]
    },
  ],

  'c5-l2': [
    {
      type: 'ordre',
      q: "Remets dans l'ordre les 5 techniques de base du prompting :",
      exp: "Les 5 techniques de base : assigner un rôle → donner du contexte → préciser le format → itérer et affiner → demander une vérification.",
      opts: [
        ["Assigner un rôle à l'IA", true, 1],
        ["Donner un contexte riche et précis", true, 2],
        ["Préciser le format de sortie attendu", true, 3],
        ["Itérer et affiner après la première réponse", true, 4],
        ["Demander une vérification de la réponse", true, 5],
      ]
    },
    {
      type: 'completer',
      q: "Les meilleurs résultats avec un LLM viennent d'un ___ de 3 à 5 échanges d'affinement plutôt que d'une seule instruction.",
      exp: "Un LLM est un partenaire de travail, pas une machine à réponse unique. Itérer — 'rends ça plus concis', 'ajoute des exemples' — multiplie la qualité du résultat final.",
      opts: [["dialogue", true], ["monologue", false], ["prompt", false], ["template", false]]
    },
    {
      type: 'relier',
      q: "Associe chaque contexte professionnel au bon rôle à assigner :",
      exp: "Chaque domaine a son rôle optimal : rédaction = rédacteur senior, code = développeur senior Python, analyse = consultant McKinsey, pédagogie = professeur pour débutants.",
      opts: [
        ["Rédiger un article || Rédacteur senior pour magazine économique", true],
        ["Déboguer du code Python || Développeur senior spécialisé Python", true],
        ["Analyser une stratégie || Consultant McKinsey en stratégie", true],
        ["Expliquer un concept || Professeur pour débutants complets", true],
      ]
    },
  ],

  'c5-l3': [
    {
      type: 'completer',
      q: "La technique du Chain of Thought consiste à demander à l'IA de raisonner ___ avant de donner sa réponse finale.",
      exp: "Le Chain of Thought force le modèle à montrer son raisonnement intermédiaire. En générant les étapes, le modèle crée un contexte qui améliore la conclusion finale — comme montrer son travail en maths.",
      opts: [["étape par étape", true], ["rapidement", false], ["en silence", false], ["par analogie", false]]
    },
    {
      type: 'relier',
      q: "Associe chaque méthode Chain of Thought à sa description :",
      exp: "Zero-shot CoT = juste ajouter 'réfléchis étape par étape'. Few-shot CoT = montrer des exemples de raisonnement complet. Instruction directe = 'pense à voix haute puis conclus'.",
      opts: [
        ["Zero-shot CoT || Ajouter 'Réfléchissons étape par étape' à la fin", true],
        ["Few-shot CoT || Montrer des exemples de raisonnement complet avant la question", true],
        ["Instruction directe || 'Pense à voix haute, puis donne ta conclusion'", true],
      ]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre les étapes pour corriger une erreur détectée dans un raisonnement CoT :",
      exp: "Avec le CoT, on peut déboguer le raisonnement : lire les étapes → identifier où l'erreur apparaît → signaler l'étape incorrecte → demander de reprendre à partir de là.",
      opts: [
        ["Lire le raisonnement étape par étape", true, 1],
        ["Identifier l'étape où l'erreur apparaît", true, 2],
        ["Signaler précisément l'erreur à l'IA", true, 3],
        ["Demander de reprendre le raisonnement à partir de cette étape", true, 4],
      ]
    },
  ],

  'c5-l4': [
    {
      type: 'completer',
      q: "Le few-shot prompting consiste à montrer des ___ du résultat attendu plutôt que de décrire la tâche en mots.",
      exp: "Le few-shot = 'montre plutôt qu'explique'. 2-3 exemples bien choisis communiquent le format, le ton et le style attendus bien mieux que des paragraphes de description.",
      opts: [["exemples", true], ["règles", false], ["erreurs", false], ["templates", false]]
    },
    {
      type: 'relier',
      q: "Associe chaque approche à sa description :",
      exp: "Zero-shot = question directe sans exemple. One-shot = un seul exemple fourni. Few-shot = 2 à 5 exemples. Fine-tuning = ré-entraîner le modèle (pas du prompting).",
      opts: [
        ["Zero-shot || Poser la question sans aucun exemple", true],
        ["Few-shot || Fournir 2 à 5 exemples avant la vraie demande", true],
        ["Fine-tuning || Modifier les poids du modèle avec de nouvelles données", true],
      ]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre la structure d'un prompt few-shot :",
      exp: "Un prompt few-shot bien structuré : présenter la tâche → montrer l'exemple 1 (input + output) → montrer l'exemple 2 → poser le vrai cas en demandant la sortie.",
      opts: [
        ["Présenter le type de tâche à effectuer", true, 1],
        ["Montrer l'exemple 1 avec son entrée et sa sortie", true, 2],
        ["Montrer l'exemple 2 avec son entrée et sa sortie", true, 3],
        ["Poser le vrai cas et demander la sortie", true, 4],
      ]
    },
  ],

  'c5-l5': [
    {
      type: 'relier',
      q: "Associe chaque template au bon usage professionnel :",
      exp: "Email pro = communication avec destinataire précis. Réunion = agenda + questions difficiles. Analyse doc = résumé + risques + recommandation. Brainstorm = 10 idées variées avec avantages/risques.",
      opts: [
        ["Template Email || Rédiger une communication avec objectif et ton précis", true],
        ["Template Réunion || Générer agenda, questions difficiles et points de blocage", true],
        ["Template Analyse || Résumé exécutif, points clés, risques, recommandation", true],
        ["Template Brainstorm || 10 idées de la plus conventionnelle à la plus créative", true],
      ]
    },
    {
      type: 'completer',
      q: "Le méta-prompt consiste à demander à l'IA de ___ le prompt idéal pour ton objectif, puis de l'exécuter immédiatement.",
      exp: "Le méta-prompt : 'Je veux accomplir X. Génère le prompt idéal que je devrais t'envoyer, puis exécute-le.' Utile quand on ne sait pas comment formuler sa demande.",
      opts: [["générer", true], ["corriger", false], ["raccourcir", false], ["traduire", false]]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre les éléments du Template Analyse de Document :",
      exp: "Pour analyser un document efficacement : définir le rôle expert → coller le document → demander résumé exécutif → points clés → risques → recommandation → préciser le public cible.",
      opts: [
        ["Définir le rôle expert dans le domaine concerné", true, 1],
        ["Coller le document à analyser", true, 2],
        ["Demander un résumé exécutif en 3 phrases", true, 3],
        ["Demander les 5 points clés et les risques", true, 4],
        ["Préciser le public cible de l'analyse", true, 5],
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

console.log('\n🎉 Exercices variés ajoutés pour le chapitre 5 !')
await p.$disconnect()
