import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const lessons = await p.lesson.findMany({where:{slug:{in:['c3-l1','c3-l2','c3-l3','c3-l4','c3-l5']}}})
for(const l of lessons) {
  const exos = await p.exercise.findMany({where:{lessonId:l.id}})
  for(const e of exos) await p.answerOption.deleteMany({where:{exerciseId:e.id}})
  await p.exercise.deleteMany({where:{lessonId:l.id}})
}
const bySlug = Object.fromEntries(lessons.map(l => [l.slug, l.id]))

const data = {
  'c3-l1': [
    { q: "Un neurone artificiel s'inspire de :", exp: "Le neurone artificiel imite le neurone biologique : il reçoit des signaux (inputs), les pondère, les additionne et décide de s'activer ou non selon une fonction d'activation.", opts: [["Un transistor électronique", false],["Le neurone biologique du cerveau humain", true],["Un pixel d'image", false],["Une cellule solaire", false]] },
    { q: "Que fait la fonction d'activation d'un neurone ?", exp: "La fonction d'activation introduit de la non-linéarité. Sans elle, empiler des neurones ne servirait à rien — le réseau ne pourrait apprendre que des relations linéaires simples.", opts: [["Elle stocke les données d'entraînement", false],["Elle décide si le neurone doit s'activer et transmettre un signal", true],["Elle calcule la vitesse d'apprentissage", false],["Elle connecte le neurone à internet", false]] },
    { q: "Qu'est-ce qu'un \"poids\" (weight) dans un réseau de neurones ?", exp: "Les poids sont les paramètres appris pendant l'entraînement. Ils représentent l'importance de chaque connexion. Un réseau comme GPT-4 a des centaines de milliards de poids.", opts: [["La taille en mémoire du réseau", false],["Un paramètre qui représente l'importance d'une connexion entre neurones", true],["Le nombre de neurones dans une couche", false],["La vitesse de traitement du réseau", false]] },
    { q: "Vrai ou Faux : Un seul neurone artificiel peut résoudre des problèmes complexes.", exp: "Faux ! Un neurone seul ne peut résoudre que des problèmes linéaires très simples. C'est en les combinant en couches et en réseaux qu'on obtient la puissance nécessaire pour des tâches complexes.", opts: [["Vrai", false],["Faux", true]] },
    { q: "Le \"biais\" (bias) d'un neurone sert à :", exp: "Le biais est un paramètre supplémentaire qui permet au neurone de s'activer même quand toutes les entrées sont à zéro. Il donne plus de flexibilité au modèle pour apprendre.", opts: [["Introduire volontairement des erreurs", false],["Permettre au neurone de s'ajuster indépendamment des entrées", true],["Ralentir l'apprentissage", false],["Connecter deux couches différentes", false]] },
  ],
  'c3-l2': [
    { q: "Que signifie \"deep\" dans deep learning ?", exp: "\"Deep\" fait référence à la profondeur du réseau — le nombre de couches cachées. Plus il y a de couches, plus le réseau peut apprendre des représentations abstraites et complexes.", opts: [["Que l'IA est très intelligente", false],["Que le réseau a de nombreuses couches cachées entre l'entrée et la sortie", true],["Que l'algorithme est difficile à comprendre", false],["Que l'entraînement prend du temps", false]] },
    { q: "Quel est le rôle de la couche d'entrée (input layer) ?", exp: "La couche d'entrée reçoit les données brutes : pixels d'une image, mots d'un texte, valeurs numériques. Elle ne fait aucun calcul, elle transmet juste les données aux couches suivantes.", opts: [["Calculer la prédiction finale", false],["Recevoir et transmettre les données brutes au réseau", true],["Stocker les résultats d'apprentissage", false],["Compresser les données", false]] },
    { q: "Les couches cachées (hidden layers) servent à :", exp: "Les couches cachées extraient des caractéristiques de plus en plus abstraites. La première couche détecte des bords, la suivante des formes, puis des objets... C'est la hiérarchie des représentations.", opts: [["Cacher les données sensibles", false],["Extraire des caractéristiques de plus en plus abstraites des données", true],["Accélérer les calculs", false],["Connecter le réseau à internet", false]] },
    { q: "Vrai ou Faux : Plus un réseau a de couches, mieux il apprend toujours.", exp: "Faux ! Au-delà d'une certaine profondeur, les gradients disparaissent (vanishing gradient problem) et l'entraînement devient difficile. Des techniques comme les connexions résiduelles (ResNet) ont résolu ce problème.", opts: [["Vrai", false],["Faux", true]] },
    { q: "Qu'est-ce que le \"dropout\" dans un réseau de neurones ?", exp: "Le dropout désactive aléatoirement des neurones pendant l'entraînement. Cela force le réseau à ne pas trop dépendre de certains neurones et réduit l'overfitting. C'est comme entraîner plusieurs réseaux en parallèle.", opts: [["Arrêter l'entraînement prématurément", false],["Désactiver aléatoirement des neurones pour éviter l'overfitting", true],["Supprimer les neurones inutiles définitivement", false],["Réduire la taille du réseau", false]] },
  ],
  'c3-l3': [
    { q: "Qu'est-ce que la rétropropagation (backpropagation) ?", exp: "La rétropropagation calcule comment chaque poids a contribué à l'erreur finale, en propageant le signal d'erreur de la sortie vers l'entrée. C'est l'algorithme fondamental qui permet aux réseaux d'apprendre.", opts: [["Un algorithme pour copier des données en sens inverse", false],["L'algorithme qui propage l'erreur de la sortie vers l'entrée pour ajuster les poids", true],["Une technique pour lire des données à l'envers", false],["Un moyen de sauvegarder un modèle", false]] },
    { q: "La descente de gradient sert à :", exp: "La descente de gradient ajuste les poids dans la direction qui réduit l'erreur. C'est comme descendre une montagne en cherchant toujours le chemin le plus pentu vers le bas — le bas étant le minimum de l'erreur.", opts: [["Augmenter la vitesse d'inférence", false],["Minimiser l'erreur en ajustant progressivement les poids", true],["Générer de nouvelles données d'entraînement", false],["Compresser le modèle", false]] },
    { q: "Qu'est-ce que le \"taux d'apprentissage\" (learning rate) ?", exp: "Le learning rate contrôle la taille des pas lors de la descente de gradient. Trop grand : le modèle oscille et ne converge pas. Trop petit : l'entraînement est très lent. C'est un hyperparamètre crucial.", opts: [["Le nombre d'exemples vus par seconde", false],["La taille des ajustements des poids à chaque étape d'entraînement", true],["La vitesse du processeur pendant l'entraînement", false],["Le pourcentage de données utilisées", false]] },
    { q: "Vrai ou Faux : L'entraînement d'un réseau de neurones profond ne nécessite qu'un seul passage sur les données.", exp: "Faux ! Il faut de nombreuses époques (epochs) — plusieurs passages complets sur toutes les données d'entraînement. Chaque passage affine les poids. GPT-4 a été entraîné sur des milliards de tokens pendant des mois.", opts: [["Vrai", false],["Faux", true]] },
    { q: "Qu'est-ce qu'une \"epoch\" en deep learning ?", exp: "Une epoch est un passage complet sur l'ensemble des données d'entraînement. Après chaque epoch, on ajuste les poids. On entraîne généralement pendant plusieurs dizaines ou centaines d'epochs.", opts: [["Une erreur dans le modèle", false],["Un passage complet sur toutes les données d'entraînement", true],["Une couche du réseau", false],["Un type de fonction d'activation", false]] },
  ],
  'c3-l4': [
    { q: "CNN signifie :", exp: "CNN = Convolutional Neural Network (réseau de neurones convolutif). Spécialement conçu pour les images, il détecte automatiquement des caractéristiques visuelles comme les bords, textures et formes.", opts: [["Creative Neural Network", false],["Convolutional Neural Network", true],["Connected Neuron Node", false],["Clustered Network Node", false]] },
    { q: "Qu'est-ce qu'une convolution dans un CNN ?", exp: "Une convolution applique un filtre (petit masque) sur l'image pour détecter des patterns locaux. Un filtre peut détecter des bords horizontaux, un autre des coins, etc. C'est l'équivalent de 'regarder' l'image par petites fenêtres.", opts: [["Une compression de l'image", false],["L'application d'un filtre pour détecter des patterns locaux dans l'image", true],["La conversion de couleurs en niveaux de gris", false],["Le redimensionnement de l'image", false]] },
    { q: "À quoi sert le \"pooling\" dans un CNN ?", exp: "Le pooling réduit la taille des feature maps (cartes de caractéristiques) en gardant les informations les plus importantes. Cela réduit la complexité computationnelle et rend le réseau plus robuste aux petites variations.", opts: [["Augmenter la résolution de l'image", false],["Réduire la taille des données tout en conservant les informations importantes", true],["Ajouter plus de couleurs à l'image", false],["Connecter deux réseaux ensemble", false]] },
    { q: "Les CNN sont principalement utilisés pour :", exp: "Les CNN excellent dans les tâches visuelles : reconnaissance d'images, détection d'objets, segmentation. Face ID, Google Photos, les voitures autonomes utilisent tous des CNN.", opts: [["Traduire des textes", false],["Traiter et analyser des images et vidéos", true],["Générer de la musique", false],["Analyser des données financières", false]] },
    { q: "Vrai ou Faux : Un CNN doit être reprogrammé manuellement pour chaque type d'image à reconnaître.", exp: "Faux ! Le CNN apprend automatiquement les filtres pertinents pendant l'entraînement. On n'a pas besoin de programmer 'cherche des oreilles de chat' — il découvre ces features tout seul.", opts: [["Vrai", false],["Faux", true]] },
  ],
  'c3-l5': [
    { q: "RNN signifie :", exp: "RNN = Recurrent Neural Network (réseau de neurones récurrent). Contrairement aux CNN, les RNN ont une mémoire : la sortie d'une étape est réutilisée comme entrée à l'étape suivante.", opts: [["Random Neural Network", false],["Recurrent Neural Network", true],["Recursive Node Network", false],["Ranked Neural Node", false]] },
    { q: "Pourquoi les RNN sont-ils adaptés aux séquences ?", exp: "Les RNN traitent les données une par une en ordre, en maintenant un état caché qui résume ce qui a été vu. Parfait pour du texte, de la parole ou des séries temporelles où l'ordre compte.", opts: [["Ils sont plus rapides que les CNN", false],["Ils maintiennent une mémoire de ce qui a été traité précédemment", true],["Ils utilisent moins de mémoire RAM", false],["Ils fonctionnent mieux sur GPU", false]] },
    { q: "Quel problème majeur affecte les RNN classiques ?", exp: "Le vanishing gradient : lors de la rétropropagation à travers de longues séquences, le gradient diminue exponentiellement. Le réseau 'oublie' les informations lointaines. C'est pour résoudre ça qu'ont été créés les LSTM.", opts: [["Ils sont trop rapides", false],["Le vanishing gradient : ils oublient les informations lointaines dans la séquence", true],["Ils consomment trop d'électricité", false],["Ils ne peuvent traiter que des images", false]] },
    { q: "LSTM signifie et résout :", exp: "LSTM = Long Short-Term Memory. Il ajoute des 'portes' (gates) qui contrôlent ce que le réseau mémorise ou oublie. Cela permet de garder des informations sur de longues séquences.", opts: [["Large Scale Training Model — accélère l'entraînement", false],["Long Short-Term Memory — résout le problème de mémoire à long terme des RNN", true],["Linear Sequence Training Method — simplifie les calculs", false],["Layered Sequential Text Model — gère le texte", false]] },
    { q: "Vrai ou Faux : Les Transformers ont largement remplacé les RNN/LSTM pour le traitement du langage.", exp: "Vrai ! Depuis 2017 et le papier 'Attention is All You Need', les Transformers dominent le NLP. GPT, BERT, Claude sont tous basés sur l'architecture Transformer, pas sur les RNN.", opts: [["Vrai", true],["Faux", false]] },
  ],
}

for(const [slug, exercises] of Object.entries(data)) {
  const lessonId = bySlug[slug]
  if(!lessonId) { console.log('Introuvable:', slug); continue }
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
console.log('Chapitre 3 ajouté !')
await p.$disconnect()
