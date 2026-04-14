import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const lessons = await p.lesson.findMany({where:{slug:{in:['c6-l1','c6-l2','c6-l3','c6-l4','c6-l5']}}})
for(const l of lessons) {
  const exos = await p.exercise.findMany({where:{lessonId:l.id}})
  for(const e of exos) await p.answerOption.deleteMany({where:{exerciseId:e.id}})
  await p.exercise.deleteMany({where:{lessonId:l.id}})
}
const bySlug = Object.fromEntries(lessons.map(l => [l.slug, l.id]))

const data = {
  'c6-l1': [
    { q: "Quel outil IA est le plus utilisé pour la rédaction de contenu professionnel ?", exp: "ChatGPT et Claude dominent la rédaction pro. Ils peuvent rédiger emails, rapports, présentations, posts LinkedIn en quelques secondes. La clé est de toujours relire et personnaliser.", opts: [["Photoshop", false],["ChatGPT ou Claude", true],["Excel", false],["Google Translate", false]] },
    { q: "Notion AI sert principalement à :", exp: "Notion AI est intégré directement dans Notion pour améliorer, résumer et générer du contenu dans tes pages. Très pratique pour la prise de notes, les wikis d'équipe et la gestion de projet.", opts: [["Créer des présentations PowerPoint", false],["Améliorer et générer du contenu directement dans tes notes Notion", true],["Analyser des données financières", false],["Gérer ses emails", false]] },
    { q: "GitHub Copilot est un outil IA qui aide à :", exp: "GitHub Copilot est un assistant de code IA. Il suggère du code en temps réel, complète des fonctions, génère des tests. Les développeurs rapportent une productivité augmentée de 55%.", opts: [["Gérer des projets GitHub", false],["Écrire et compléter du code automatiquement", true],["Déployer des applications", false],["Analyser la sécurité du code", false]] },
    { q: "Vrai ou Faux : Les outils IA peuvent remplacer complètement un professionnel humain.", exp: "Faux ! Les outils IA augmentent la productivité humaine mais ne remplacent pas le jugement, la créativité profonde, les relations humaines et la responsabilité professionnelle. Ils sont des assistants, pas des remplaçants.", opts: [["Vrai", false],["Faux", true]] },
    { q: "Perplexity AI se distingue de ChatGPT car il :", exp: "Perplexity est un moteur de recherche IA : il cherche sur internet en temps réel et cite ses sources. Idéal pour la recherche d'informations récentes, contrairement à ChatGPT qui a une date de coupure.", opts: [["Génère uniquement des images", false],["Recherche sur internet en temps réel et cite ses sources", true],["Est spécialisé en programmation", false],["Traduit des documents", false]] },
  ],
  'c6-l2': [
    { q: "Zapier est un outil d'automatisation qui permet de :", exp: "Zapier connecte plus de 6000 applications sans code. Tu crées des 'Zaps' : quand quelque chose se passe dans une app (trigger), une action se déclenche dans une autre. Ex : nouveau email → créer une tâche Trello.", opts: [["Créer des sites web automatiquement", false],["Connecter des applications entre elles pour automatiser des workflows", true],["Générer du contenu avec l'IA", false],["Analyser des données en temps réel", false]] },
    { q: "Qu'est-ce qu'un 'trigger' dans un workflow d'automatisation ?", exp: "Le trigger est l'événement déclencheur. Ex : 'réception d'un email', 'nouveau formulaire soumis', 'nouveau fichier dans Google Drive'. C'est ce qui lance automatiquement la suite des actions.", opts: [["L'action finale du workflow", false],["L'événement déclencheur qui lance le workflow", true],["Un bug dans l'automatisation", false],["Le nom de l'outil d'automatisation", false]] },
    { q: "Make (ex-Integromat) se différencie de Zapier par :", exp: "Make est plus visuel et plus puissant pour les workflows complexes. Il permet des logiques avancées (conditions, boucles, transformations de données) avec une interface de type canvas.", opts: [["Il est gratuit uniquement", false],["Une interface visuelle plus puissante pour les workflows complexes", true],["Il fonctionne sans internet", false],["Il ne supporte que les apps Google", false]] },
    { q: "Vrai ou Faux : Créer des automatisations avec Zapier nécessite de savoir programmer.", exp: "Faux ! Zapier est fait pour les non-développeurs. Son interface no-code permet de créer des automatisations en quelques clics. C'est l'un des outils les plus accessibles pour gagner du temps.", opts: [["Vrai", false],["Faux", true]] },
    { q: "Quelle automatisation ferait gagner le plus de temps à un commercial ?", exp: "Automatiser la saisie CRM élimine une tâche répétitive et source d'erreurs. Les commerciaux passent en moyenne 20% de leur temps en saisie administrative — l'automatiser libère du temps pour vendre.", opts: [["Automatiser l'envoi d'emails génériques en masse", false],["Enregistrer automatiquement les nouveaux leads dans le CRM depuis les formulaires web", true],["Générer automatiquement des rapports hebdomadaires", false],["Planifier automatiquement toutes les réunions", false]] },
  ],
  'c6-l3': [
    { q: "Pour quelle tâche d'écriture l'IA est-elle la plus efficace ?", exp: "La reformulation et l'amélioration de textes existants est un des meilleurs usages de l'IA. Elle peut rendre un texte plus clair, plus percutant, plus formel ou plus accessible en quelques secondes.", opts: [["Écrire un roman original de A à Z", false],["Reformuler, améliorer et adapter des textes existants", true],["Remplacer un journaliste d'investigation", false],["Écrire des discours politiques complets", false]] },
    { q: "Quand utiliser l'IA pour rédiger des emails ?", exp: "L'IA excelle pour les emails répétitifs et professionnels : relances, confirmations, réponses types. Pour les emails très personnels ou sensibles, l'humain reste meilleur. L'IA comme base, l'humain pour finaliser.", opts: [["Uniquement pour les emails internes", false],["Pour les emails répétitifs et professionnels, en relisant et personnalisant", true],["Jamais, les emails doivent être 100% humains", false],["Uniquement pour les emails en anglais", false]] },
    { q: "Vrai ou Faux : On peut demander à l'IA d'adapter un texte pour différentes audiences.", exp: "Vrai ! C'est très puissant. Un même contenu peut être adapté : version expert, version débutant, version jeune public, version LinkedIn, version Twitter. L'IA fait ces adaptations en quelques secondes.", opts: [["Vrai", true],["Faux", false]] },
    { q: "Quel est le risque principal d'utiliser l'IA pour rédiger des contenus professionnels ?", exp: "Le risque principal est de publier sans relire. L'IA peut halluciner des faits, utiliser un ton inadapté ou manquer de nuances. La règle d'or : l'IA rédige, l'humain vérifie et valide.", opts: [["L'IA écrit trop lentement", false],["Publier sans relire du contenu inexact ou inadapté", true],["L'IA refuse parfois d'écrire", false],["Le style est toujours trop formel", false]] },
    { q: "Pour créer du contenu pour les réseaux sociaux, l'IA peut :", exp: "L'IA peut générer plusieurs variantes d'un post, adapter le ton selon la plateforme (LinkedIn vs Instagram vs Twitter), suggérer des hashtags et créer un calendrier de contenu. Un gain de temps énorme.", opts: [["Uniquement traduire des posts existants", false],["Générer des variantes, adapter le ton par plateforme et suggérer des hashtags", true],["Poster automatiquement sur tous les réseaux", false],["Analyser les performances des posts", false]] },
  ],
  'c6-l4': [
    { q: "Comment utiliser l'IA pour analyser un fichier Excel ?", exp: "Des outils comme ChatGPT Advanced Data Analysis ou Claude peuvent lire un CSV/Excel et répondre à des questions en langage naturel : 'Quel est le produit le plus vendu ?', 'Montre une tendance sur 6 mois'.", opts: [["Importer le fichier dans l'IA est impossible", false],["Uploader le fichier et poser des questions en langage naturel", true],["Demander à l'IA de recréer le fichier de zéro", false],["Uniquement pour les fichiers de moins de 10 lignes", false]] },
    { q: "Vrai ou Faux : L'IA peut analyser et résumer des documents PDF longs.", exp: "Vrai ! Claude et ChatGPT peuvent lire des PDFs de centaines de pages et en extraire les points clés, répondre à des questions spécifiques, identifier des contradictions. Un gain de temps énorme pour les contrats et rapports.", opts: [["Vrai", true],["Faux", false]] },
    { q: "Pour analyser les retours clients avec l'IA, la meilleure approche est :", exp: "L'analyse de sentiment et la catégorisation automatique des retours clients est parfaite pour l'IA. Elle peut traiter des centaines d'avis en quelques secondes et identifier les thèmes récurrents.", opts: [["Demander à l'IA d'inventer des retours positifs", false],["Coller les avis clients et demander d'identifier les thèmes et sentiments dominants", true],["Uniquement pour les avis en anglais", false],["L'IA ne peut pas analyser du texte subjectif", false]] },
    { q: "Quel prompt utiliser pour analyser un rapport financier ?", exp: "Un prompt précis sur l'angle d'analyse et le public cible donne les meilleurs résultats. Le dirigeant a besoin d'une synthèse décisionnelle, pas d'une description exhaustive des chiffres.", opts: [["'Analyse ce rapport'", false],["'Tu es analyste financier. Lis ce rapport et donne les 3 points d'attention critiques pour un dirigeant non-financier'", true],["'Quels sont les chiffres ?'", false],["'Résume tout en détail'", false]] },
    { q: "L'IA peut aider à la veille concurrentielle en :", exp: "L'IA peut synthétiser des informations de multiples sources, comparer des offres concurrentes, identifier des tendances de marché. Combinée à Perplexity pour la recherche temps réel, c'est un outil de veille puissant.", opts: [["Accédant illégalement aux données privées des concurrents", false],["Synthétisant des informations publiques et comparant des offres et tendances", true],["Prédisant avec certitude les stratégies futures des concurrents", false],["Copiant le contenu des sites concurrents", false]] },
  ],
  'c6-l5': [
    { q: "Qu'est-ce qu'un workflow IA ?", exp: "Un workflow IA est une séquence d'étapes automatisées où l'IA intervient à une ou plusieurs étapes. Ex : réception email → IA résume → IA catégorise → IA rédige réponse → humain valide → envoi.", opts: [["Un logiciel de gestion de projet", false],["Une séquence d'étapes automatisées intégrant des actions IA", true],["Un type de réseau de neurones", false],["Un outil de visualisation de données", false]] },
    { q: "Quel est le principe du 'human in the loop' ?", exp: "Human in the loop signifie garder un humain dans la boucle pour valider les décisions importantes de l'IA. Essentiel pour les actions irréversibles, les communications importantes, les décisions à enjeux.", opts: [["Remplacer tous les humains par l'IA", false],["Garder un humain pour valider les actions importantes de l'IA", true],["Former les humains à programmer l'IA", false],["Utiliser l'IA uniquement en présence d'un humain", false]] },
    { q: "Pour quel type de tâche l'automatisation IA est-elle la plus rentable ?", exp: "Les tâches répétitives, à volume élevé et à faible valeur ajoutée sont idéales : saisie de données, triage d'emails, génération de rapports standardisés, réponses aux FAQ. L'humain se concentre sur la valeur ajoutée.", opts: [["Les décisions stratégiques complexes", false],["Les tâches répétitives, à volume élevé et faible valeur ajoutée", true],["Les relations clients sensibles", false],["La création de produits innovants", false]] },
    { q: "Vrai ou Faux : On peut créer un workflow IA sans aucune compétence technique.", exp: "Vrai ! Des outils no-code comme Zapier, Make, et des plateformes comme n8n permettent de créer des workflows sophistiqués sans programmer. La logique métier est plus importante que le code.", opts: [["Vrai", true],["Faux", false]] },
    { q: "Quelle est la première étape pour construire un workflow IA efficace ?", exp: "Identifier et documenter le processus actuel est crucial avant d'automatiser. Automatiser un mauvais processus le rend juste mauvais plus vite. Il faut d'abord comprendre, puis optimiser, puis automatiser.", opts: [["Choisir l'outil d'automatisation", false],["Identifier et documenter précisément le processus actuel à automatiser", true],["Acheter un abonnement premium", false],["Former toute l'équipe en même temps", false]] },
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
console.log('Chapitre 6 ajouté !')
await p.$disconnect()
