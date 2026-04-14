import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const lessons = await p.lesson.findMany({where:{slug:{in:['c2-l1','c2-l2','c2-l3','c2-l4','c2-l5']}}})
for(const l of lessons) {
  const exos = await p.exercise.findMany({where:{lessonId:l.id}})
  for(const e of exos) await p.answerOption.deleteMany({where:{exerciseId:e.id}})
  await p.exercise.deleteMany({where:{lessonId:l.id}})
}
const bySlug = Object.fromEntries(lessons.map(l => [l.slug, l.id]))

const data = {
  'c2-l1': [
    { q: "Quelle est la définition du machine learning ?", exp: "Le ML permet aux machines d'apprendre à partir de données sans être explicitement programmées. Au lieu d'écrire des règles, on montre des exemples et la machine trouve les patterns.", opts: [["Programmer des robots", false],["Apprendre à partir de données sans règles explicites", true],["Créer des bases de données", false],["Simuler un cerveau humain", false]] },
    { q: "Dans le ML traditionnel, qu'est-ce qu'on fournit au modèle ?", exp: "On fournit des données d'entrée (features) et les réponses attendues (labels). Le modèle apprend la relation entre les deux pour prédire les réponses sur de nouvelles données.", opts: [["Des instructions précises étape par étape", false],["Des données d'exemple avec les réponses attendues", true],["Des règles logiques if/else", false],["Des images uniquement", false]] },
    { q: "Quel est un exemple concret de machine learning dans la vie quotidienne ?", exp: "Le filtre anti-spam est un exemple classique de ML. Il analyse des milliers d'emails étiquetés spam/non-spam et apprend à reconnaître les patterns caractéristiques du spam.", opts: [["Un calculateur de trajet GPS fixe", false],["Un filtre anti-spam qui apprend à reconnaître les indésirables", true],["Un moteur de recherche alphabétique", false],["Un correcteur orthographique basé sur un dictionnaire", false]] },
    { q: "Vrai ou Faux : Le machine learning nécessite toujours qu'un humain programme les règles.", exp: "Faux ! C'est justement l'opposé. Le ML apprend les règles automatiquement à partir des données. C'est ce qui le rend puissant — on n'a pas besoin de prévoir tous les cas manuellement.", opts: [["Vrai", false],["Faux", true]] },
    { q: "Quel élément est INDISPENSABLE pour entraîner un modèle de ML ?", exp: "Sans données, pas de ML. La quantité et la qualité des données déterminent directement la performance du modèle. C'est pourquoi les entreprises tech investissent massivement dans la collecte de données.", opts: [["Un superordinateur", false],["Des données d'entraînement", true],["Un réseau internet rapide", false],["Un ingénieur IA senior", false]] },
  ],
  'c2-l2': [
    { q: "Dans l'apprentissage supervisé, les données d'entraînement sont :", exp: "En supervisé, chaque exemple est étiqueté : photo de chat → 'chat', email spam → 'spam'. Le modèle apprend à associer les entrées aux bonnes étiquettes.", opts: [["Sans étiquettes ni réponses", false],["Étiquetées avec les réponses correctes", true],["Générées automatiquement", false],["Uniquement des images", false]] },
    { q: "Quel est un exemple d'apprentissage non supervisé ?", exp: "Le clustering regroupe des données similaires sans étiquettes prédéfinies. Ex : segmenter des clients en groupes par comportement d'achat, sans savoir à l'avance combien de groupes il y aura.", opts: [["Détecter si un email est spam", false],["Regrouper des clients similaires automatiquement (clustering)", true],["Reconnaître des visages sur des photos", false],["Prédire le prix d'une maison", false]] },
    { q: "L'apprentissage par renforcement ressemble à :", exp: "L'apprentissage par renforcement fonctionne comme dresser un animal : l'agent essaie des actions, reçoit des récompenses ou punitions, et apprend à maximiser les récompenses. C'est ainsi qu'AlphaGo a appris à jouer au Go.", opts: [["Lire un manuel d'instructions", false],["Dresser un animal avec récompenses et punitions", true],["Copier les réponses d'un expert", false],["Mémoriser une encyclopédie", false]] },
    { q: "Vrai ou Faux : L'apprentissage non supervisé nécessite des données étiquetées.", exp: "Faux ! C'est exactement l'opposé. Le non supervisé travaille sans étiquettes — la machine trouve elle-même la structure dans les données. C'est utile quand étiqueter est trop coûteux.", opts: [["Vrai", false],["Faux", true]] },
    { q: "Pour entraîner un modèle à reconnaître des photos de chats, on utilise :", exp: "La reconnaissance d'images avec des étiquettes (chat/pas chat) est de l'apprentissage supervisé. On a besoin de milliers de photos déjà classifiées pour entraîner le modèle.", opts: [["Apprentissage non supervisé", false],["Apprentissage supervisé", true],["Apprentissage par renforcement", false],["Aucun apprentissage nécessaire", false]] },
  ],
  'c2-l3': [
    { q: "Pourquoi la qualité des données est-elle plus importante que la quantité ?", exp: "Des données biaisées ou incorrectes produisent un modèle biaisé, peu importe leur nombre. Le principe GIGO (Garbage In, Garbage Out) s'applique : de mauvaises données donnent de mauvais modèles.", opts: [["Parce que les serveurs ont une capacité limitée", false],["Des données biaisées produisent des modèles biaisés même en grande quantité", true],["Parce que trop de données ralentit l'IA", false],["La quantité est toujours plus importante", false]] },
    { q: "Qu'est-ce que le \"data cleaning\" (nettoyage des données) ?", exp: "Le data cleaning consiste à corriger ou supprimer les données incorrectes, manquantes ou dupliquées. Les data scientists passent souvent 60-80% de leur temps sur cette étape cruciale.", opts: [["Supprimer toutes les données pour repartir à zéro", false],["Corriger les données incorrectes, manquantes ou dupliquées", true],["Chiffrer les données pour les protéger", false],["Compresser les données pour gagner de l'espace", false]] },
    { q: "Qu'est-ce qu'un dataset déséquilibré ?", exp: "Un dataset déséquilibré a beaucoup plus d'exemples d'une classe que d'une autre. Ex : 99% de transactions normales et 1% de fraudes. Le modèle peut prédire 'normal' à chaque fois et avoir 99% de précision... mais rater toutes les fraudes !", opts: [["Un dataset avec des données de mauvaise qualité", false],["Un dataset où certaines classes sont beaucoup plus représentées que d'autres", true],["Un dataset trop petit", false],["Un dataset sans étiquettes", false]] },
    { q: "Vrai ou Faux : Plus on a de données, meilleur sera toujours le modèle.", exp: "Faux ! Au-delà d'un certain volume, ajouter des données apporte peu. Ce qui compte vraiment c'est la diversité et la représentativité des données, pas juste la quantité.", opts: [["Vrai", false],["Faux", true]] },
    { q: "Qu'est-ce que la \"data augmentation\" ?", exp: "La data augmentation consiste à créer artificiellement de nouvelles données à partir des existantes. Ex : rotation, zoom, miroir sur des images. Très utile quand on manque de données d'entraînement.", opts: [["Acheter plus de données sur internet", false],["Créer artificiellement de nouvelles données à partir des existantes", true],["Augmenter la taille des données en les dupliquant simplement", false],["Ajouter plus de colonnes à un tableau", false]] },
  ],
  'c2-l4': [
    { q: "Qu'est-ce que l'overfitting (surapprentissage) ?", exp: "L'overfitting, c'est quand le modèle mémorise les données d'entraînement au lieu d'apprendre les patterns généraux. Il performe très bien sur les données connues mais échoue sur les nouvelles données.", opts: [["Quand le modèle apprend trop lentement", false],["Quand le modèle mémorise les données au lieu d'apprendre les patterns généraux", true],["Quand les données sont trop volumineuses", false],["Quand le modèle utilise trop de mémoire RAM", false]] },
    { q: "Comment détecte-t-on l'overfitting ?", exp: "On divise les données en train/test. Si la précision est excellente sur les données d'entraînement (99%) mais mauvaise sur les données de test (60%), c'est un signe clair d'overfitting.", opts: [["Le modèle prend trop de temps à s'entraîner", false],["Performance excellente sur train mais mauvaise sur les données de test", true],["Le modèle consomme beaucoup d'électricité", false],["Les prédictions sont toujours les mêmes", false]] },
    { q: "Qu'est-ce que l'underfitting (sous-apprentissage) ?", exp: "L'underfitting c'est l'inverse : le modèle est trop simple et ne capture pas les patterns dans les données. Il performe mal sur les données d'entraînement ET de test. Souvent dû à un modèle trop basique.", opts: [["Quand on n'a pas assez de données", false],["Quand le modèle est trop simple et performe mal même sur les données d'entraînement", true],["Quand l'entraînement est interrompu trop tôt", false],["Quand le modèle refuse d'apprendre", false]] },
    { q: "Quelle technique aide à éviter l'overfitting ?", exp: "La cross-validation divise les données en plusieurs parties et entraîne/teste sur différentes combinaisons. Cela donne une meilleure estimation de la performance réelle et détecte l'overfitting.", opts: [["Utiliser plus de données d'entraînement uniquement", false],["La cross-validation et la régularisation", true],["Entraîner le modèle plus longtemps", false],["Utiliser un ordinateur plus puissant", false]] },
    { q: "Vrai ou Faux : Un modèle qui a 99% de précision sur les données d'entraînement est forcément excellent.", exp: "Faux ! C'est souvent un signe d'overfitting. Ce qui compte c'est la performance sur des données que le modèle n'a jamais vues. Un bon modèle généralise bien au-delà de ses données d'entraînement.", opts: [["Vrai", false],["Faux", true]] },
  ],
  'c2-l5': [
    { q: "Qu'est-ce que la précision (accuracy) d'un modèle ?", exp: "La précision (accuracy) mesure le pourcentage de prédictions correctes. Ex : 95% signifie que le modèle se trompe sur 5% des cas. Simple à comprendre mais trompeuse sur des datasets déséquilibrés.", opts: [["La vitesse d'exécution du modèle", false],["Le pourcentage de prédictions correctes", true],["La taille du modèle en mémoire", false],["Le nombre de données d'entraînement", false]] },
    { q: "Pourquoi l'accuracy seule peut être trompeuse ?", exp: "Sur un dataset avec 99% de cas normaux, un modèle qui prédit toujours 'normal' a 99% d'accuracy... mais ne détecte aucune fraude. C'est pourquoi on utilise d'autres métriques comme le rappel et la précision.", opts: [["Elle est difficile à calculer", false],["Sur des données déséquilibrées, elle peut masquer de mauvaises performances", true],["Elle change selon l'ordinateur utilisé", false],["Elle n'est valable que pour les images", false]] },
    { q: "Qu'est-ce que la \"matrice de confusion\" ?", exp: "La matrice de confusion montre les vrais positifs, faux positifs, vrais négatifs et faux négatifs. Elle permet de comprendre exactement où le modèle se trompe et dans quel sens.", opts: [["Un algorithme pour améliorer les modèles", false],["Un tableau qui détaille les types d'erreurs et de succès du modèle", true],["Une visualisation des données d'entraînement", false],["Un test de vitesse du modèle", false]] },
    { q: "Le F1-score est utile quand :", exp: "Le F1-score combine précision et rappel en une seule métrique. Il est particulièrement utile quand les classes sont déséquilibrées, comme en détection de maladies rares ou de fraudes.", opts: [["Le dataset est parfaitement équilibré", false],["Les classes sont déséquilibrées et les deux types d'erreurs importent", true],["On veut maximiser la vitesse d'inférence", false],["Le modèle est trop complexe", false]] },
    { q: "Qu'est-ce que la validation croisée (cross-validation) ?", exp: "La cross-validation divise les données en K parties, entraîne K fois en utilisant chaque partie comme test à tour de rôle. Cela donne une estimation plus fiable de la performance réelle du modèle.", opts: [["Faire valider le modèle par plusieurs experts humains", false],["Entraîner et tester sur plusieurs découpes différentes des données", true],["Comparer deux modèles différents", false],["Valider que les données sont correctes", false]] },
  ],
}

for(const [slug, exercises] of Object.entries(data)) {
  const lessonId = bySlug[slug]
  if(!lessonId) { console.log('Leçon introuvable:', slug); continue }
  for(let i=0; i<exercises.length; i++) {
    const ex = exercises[i]
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
console.log('Chapitre 2 ajouté !')
await p.$disconnect()
