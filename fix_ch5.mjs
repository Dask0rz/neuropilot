import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const lessons = await p.lesson.findMany({where:{slug:{in:['c5-l2','c5-l3','c5-l4','c5-l5']}}})
for(const l of lessons) {
  const exos = await p.exercise.findMany({where:{lessonId:l.id}})
  for(const e of exos) await p.answerOption.deleteMany({where:{exerciseId:e.id}})
  await p.exercise.deleteMany({where:{lessonId:l.id}})
}
const bySlug = Object.fromEntries(lessons.map(l => [l.slug, l.id]))

const data = {
  'c5-l2': [
    { q: "Quelle est la première règle d'un bon prompt ?", exp: "La précision est reine. Un prompt vague donne une réponse générique. Plus tu es spécifique sur le contexte, le format attendu et l'objectif, meilleure sera la réponse.", opts: [["Être le plus court possible", false],["Être précis sur le contexte, l'objectif et le format attendu", true],["Utiliser des mots techniques", false],["Poser plusieurs questions à la fois", false]] },
    { q: "Que signifie 'assigner un rôle' dans un prompt ?", exp: "Dire à l'IA 'Tu es expert en...' ou 'Agis comme un...' améliore la qualité des réponses. L'IA adapte son vocabulaire, son niveau de détail et son angle d'approche selon le rôle assigné.", opts: [["Donner un nom à l'IA", false],["Dire à l'IA quel expert elle doit incarner pour répondre", true],["Lui demander de jouer un jeu de rôle", false],["Choisir la langue de la réponse", false]] },
    { q: "Pourquoi préciser le format de sortie dans un prompt ?", exp: "Sans indication de format, l'IA choisit elle-même. En précisant 'réponds en 3 points', 'sous forme de tableau', 'en moins de 100 mots', tu obtiens exactement ce dont tu as besoin.", opts: [["Pour que l'IA travaille plus vite", false],["Pour obtenir une réponse structurée exactement comme tu en as besoin", true],["Pour économiser des tokens", false],["C'est obligatoire sinon l'IA refuse", false]] },
    { q: "Quel prompt donnera le meilleur résumé d'un article ?", exp: "Le meilleur prompt précise le public cible, le format souhaité et la longueur. L'IA sait alors exactement ce qu'on attend d'elle.", opts: [["'Résume cet article'", false],["'Tu es journaliste. Résume cet article en 5 points clés pour un non-expert, en langage simple'", true],["'Fais un résumé s'il te plaît'", false],["'Article → Résumé'", false]] },
    { q: "Vrai ou Faux : On peut demander à l'IA de reformuler sa réponse si elle ne convient pas.", exp: "Vrai ! C'est une des grandes forces des LLMs. Tu peux dire 'plus court', 'plus formel', 'donne un exemple concret', 'explique autrement'. Le dialogue itératif est très puissant.", opts: [["Vrai", true],["Faux", false]] },
  ],
  'c5-l3': [
    { q: "Qu'est-ce que le 'Chain of Thought' prompting ?", exp: "Le Chain of Thought consiste à demander à l'IA de raisonner étape par étape avant de donner sa réponse. En ajoutant 'Réfléchis étape par étape', on obtient des réponses plus précises sur des problèmes complexes.", opts: [["Enchaîner plusieurs IA différentes", false],["Demander à l'IA de raisonner étape par étape avant de conclure", true],["Créer une chaîne de prompts automatiques", false],["Connecter l'IA à internet", false]] },
    { q: "Pourquoi le Chain of Thought améliore-t-il les résultats ?", exp: "En décomposant le raisonnement, l'IA évite les raccourcis et les erreurs. Elle 'montre son travail', ce qui permet aussi de détecter où elle se trompe et de corriger.", opts: [["L'IA devient plus rapide", false],["Le raisonnement explicite réduit les erreurs et permet de vérifier la logique", true],["L'IA utilise moins de tokens", false],["La réponse est automatiquement correcte", false]] },
    { q: "Pour quel type de problème le Chain of Thought est-il le plus utile ?", exp: "Le CoT est particulièrement efficace pour les problèmes qui nécessitent plusieurs étapes de raisonnement : maths, logique, analyse complexe, prise de décision. Pour des questions simples, c'est moins nécessaire.", opts: [["Générer des images", false],["Résoudre des problèmes complexes nécessitant plusieurs étapes", true],["Traduire un texte court", false],["Lister des synonymes", false]] },
    { q: "Vrai ou Faux : Ajouter 'Réfléchis étape par étape' suffit pour activer le Chain of Thought.", exp: "Vrai ! Cette simple phrase magique améliore significativement les performances sur les tâches complexes. Des recherches ont montré que cette instruction augmente la précision de 20-40% sur des problèmes de raisonnement.", opts: [["Vrai", true],["Faux", false]] },
    { q: "Comment vérifier le raisonnement d'une IA avec le CoT ?", exp: "Puisque l'IA montre ses étapes, tu peux relire chaque étape et identifier où elle a fait une erreur. Tu peux aussi lui dire 'À l'étape 3, je pense que tu te trompes car...' pour corriger.", opts: [["C'est impossible à vérifier", false],["En relisant chaque étape du raisonnement et en identifiant les erreurs éventuelles", true],["En lui posant la question une deuxième fois", false],["En comparant avec une autre IA", false]] },
  ],
  'c5-l4': [
    { q: "Qu'est-ce que le 'few-shot prompting' ?", exp: "Le few-shot prompting consiste à donner 1 à 5 exemples du résultat attendu dans le prompt. L'IA comprend le pattern et reproduit le même format ou style sur de nouveaux cas.", opts: [["Utiliser l'IA le moins possible", false],["Donner quelques exemples du résultat attendu dans le prompt", true],["Poser plusieurs questions courtes", false],["Limiter la longueur de la réponse", false]] },
    { q: "Quel est l'avantage du few-shot par rapport au zero-shot ?", exp: "Le zero-shot demande sans exemple, le few-shot donne des exemples. Les exemples montrent exactement le format, le ton et le niveau de détail attendus — plus efficace que de tout décrire en mots.", opts: [["Le few-shot est plus rapide", false],["Les exemples montrent précisément le format et le style attendus", true],["Le few-shot utilise moins de tokens", false],["Il n'y a pas de différence", false]] },
    { q: "Combien d'exemples faut-il donner en few-shot prompting ?", exp: "1 à 3 exemples suffisent généralement. Au-delà de 5, on consomme beaucoup de tokens sans gain significatif. L'essentiel est que les exemples soient représentatifs et variés.", opts: [["10 à 20 exemples minimum", false],["1 à 3 exemples suffisent généralement", true],["Un seul exemple est toujours suffisant", false],["Au moins 50 exemples", false]] },
    { q: "Vrai ou Faux : Le few-shot prompting peut apprendre de nouvelles capacités à un LLM.", exp: "Faux ! Le few-shot guide le LLM vers le bon format mais ne lui apprend rien de nouveau. Les capacités du modèle sont fixées lors de l'entraînement. Pour vraiment apprendre, il faut du fine-tuning.", opts: [["Vrai", false],["Faux", true]] },
    { q: "Dans quel cas utiliser le few-shot prompting ?", exp: "Le few-shot est idéal quand tu veux un format très précis et reproductible : générer des fiches produits, classer des données, extraire des informations structurées. Quand décrire le format en mots est difficile.", opts: [["Pour toutes les questions simples", false],["Quand tu veux un format précis difficile à décrire en mots", true],["Uniquement pour les questions de maths", false],["Quand l'IA refuse de répondre", false]] },
  ],
  'c5-l5': [
    { q: "Pour rédiger un email professionnel avec l'IA, le meilleur prompt est :", exp: "Un bon prompt précise le rôle, le contexte, le destinataire, le ton et l'objectif. Plus les contraintes sont claires, plus l'email sera directement utilisable sans retouches.", opts: [["'Écris un email'", false],["'Tu es expert en communication. Écris un email à un client mécontent pour proposer un remboursement, ton professionnel et empathique, 3 paragraphes max'", true],["'Email professionnel s'il te plaît'", false],["'Aide-moi à écrire quelque chose'", false]] },
    { q: "Pour analyser un document avec l'IA, quelle approche est la meilleure ?", exp: "Donner le document + des instructions précises sur ce qu'on cherche. 'Extrais les 5 points clés', 'Identifie les risques', 'Résume en 3 phrases pour un dirigeant' — sois spécifique sur l'angle d'analyse.", opts: [["Copier-coller le document sans instruction", false],["Donner le document avec des instructions précises sur l'angle d'analyse voulu", true],["Demander 'Que penses-tu de ce document ?'", false],["Résumer le document soi-même avant de demander", false]] },
    { q: "Comment utiliser l'IA pour brainstormer des idées ?", exp: "Donner le contexte + les contraintes + demander un nombre précis d'idées diverses. 'Génère 10 idées de noms pour une app de fitness, cible 25-35 ans, ton moderne et motivant'.", opts: [["'Donne-moi des idées'", false],["Préciser le contexte, les contraintes et demander un nombre précis d'idées variées", true],["Lui demander de copier des idées existantes", false],["Poser la question plusieurs fois de suite", false]] },
    { q: "Vrai ou Faux : On peut utiliser l'IA pour améliorer un texte qu'on a déjà écrit.", exp: "Vrai ! C'est l'un des usages les plus puissants. 'Améliore ce texte en le rendant plus percutant', 'Reformule en style plus formel', 'Raccourcis de 30%' — l'IA est un excellent éditeur.", opts: [["Vrai", true],["Faux", false]] },
    { q: "Quel est le meilleur prompt pour préparer une réunion avec l'IA ?", exp: "Un bon prompt de préparation de réunion inclut le contexte, les participants, l'objectif et ce qu'on veut produire. L'IA peut générer un ordre du jour, anticiper les questions difficiles, préparer des arguments.", opts: [["'Aide-moi pour ma réunion de demain'", false],["'Je réunis mon équipe pour décider du budget 2025. Génère un ordre du jour en 5 points et 3 questions difficiles que je pourrais recevoir'", true],["'Réunion demain, que faire ?'", false],["'Prépare ma réunion'", false]] },
  ],
}

for(const [slug, exercises] of Object.entries(data)) {
  const lessonId = bySlug[slug]
  if(!lessonId) { console.log('Introuvable:', slug); continue }
  const shuffled = exercises.map(ex => ({ ...ex, opts: [...ex.opts].sort(() => Math.random() - 0.5) }))
  for(let i=0; i<shuffled.length; i++) {
    const ex = shuffled[i]
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
console.log('Chapitre 5 ajouté !')
await p.$disconnect()
