import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const lessons = await p.lesson.findMany({
  where: { slug: { in: ['c3-l1', 'c3-l2', 'c3-l3', 'c3-l4', 'c3-l5'] } }
})
const bySlug = Object.fromEntries(lessons.map(l => [l.slug, l.id]))

const data = {
  'c3-l1': [
    {
      type: 'relier',
      q: "Associe chaque composant du neurone artificiel à son rôle :",
      exp: "Les entrées sont les données reçues, les poids encodent l'importance de chaque entrée, la fonction d'activation introduit la non-linéarité, et le biais ajoute de la flexibilité.",
      opts: [
        ["Entrées (inputs) || Les données reçues par le neurone", true],
        ["Poids (weights) || L'importance relative de chaque entrée", true],
        ["Fonction d'activation || Introduit la non-linéarité", true],
        ["Biais (bias) || Permet l'activation même avec des entrées nulles", true],
      ]
    },
    {
      type: 'completer',
      q: "Les ___ sont les paramètres que le réseau de neurones apprend pendant l'entraînement — ils encodent la connaissance du modèle.",
      exp: "Les poids (weights) sont l'essence de l'intelligence d'un réseau de neurones. Un réseau avec des milliards de poids bien calibrés peut accomplir des tâches extraordinaires.",
      opts: [["poids", true], ["biais", false], ["couches", false], ["neurones", false]]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre les étapes du calcul d'un neurone artificiel :",
      exp: "Un neurone reçoit ses entrées → les multiplie par leurs poids → additionne les résultats → ajoute le biais → applique la fonction d'activation → produit une sortie.",
      opts: [
        ["Recevoir les valeurs d'entrée", true, 1],
        ["Multiplier chaque entrée par son poids", true, 2],
        ["Additionner toutes les valeurs pondérées", true, 3],
        ["Appliquer la fonction d'activation", true, 4],
        ["Produire la valeur de sortie", true, 5],
      ]
    },
  ],

  'c3-l2': [
    {
      type: 'ordre',
      q: "Remets dans l'ordre les couches d'un réseau de neurones, de l'entrée à la sortie :",
      exp: "Un réseau de neurones est organisé en couches : couche d'entrée (reçoit les données brutes) → couches cachées (extraient les patterns) → couche de sortie (produit la prédiction).",
      opts: [
        ["Couche d'entrée — reçoit les données brutes", true, 1],
        ["Premières couches cachées — détectent bords et textures", true, 2],
        ["Couches cachées profondes — détectent formes et parties", true, 3],
        ["Couche de sortie — produit la prédiction finale", true, 4],
      ]
    },
    {
      type: 'completer',
      q: "Le terme \"deep\" dans Deep Learning fait référence à la ___ du réseau — le nombre de couches cachées empilées.",
      exp: "\"Deep\" = profond. Plus le réseau a de couches cachées, plus il peut apprendre des représentations abstraites et complexes. C'est cette profondeur qui rend le deep learning si puissant.",
      opts: [["profondeur", true], ["largeur", false], ["complexité", false], ["taille", false]]
    },
    {
      type: 'relier',
      q: "Associe chaque concept à sa fonction dans un réseau :",
      exp: "GPU = calcul parallèle rapide. Dropout = robustesse contre l'overfitting. Couche cachée = extraction de features. Fully connected = chaque neurone connecté à tous les suivants.",
      opts: [
        ["GPU || Accélère les calculs matriciels en parallèle", true],
        ["Dropout || Désactive des neurones aléatoirement pour éviter l'overfitting", true],
        ["Couche cachée || Extrait des caractéristiques de plus en plus abstraites", true],
        ["Fully connected || Chaque neurone connecté à tous les neurones suivants", true],
      ]
    },
  ],

  'c3-l3': [
    {
      type: 'ordre',
      q: "Remets dans l'ordre les 3 étapes d'un cycle d'entraînement d'un réseau de neurones :",
      exp: "Un cycle d'entraînement : forward pass (données → prédiction) → calcul de l'erreur (loss) → backward pass (rétropropagation pour ajuster les poids).",
      opts: [
        ["Forward pass : les données traversent le réseau pour produire une prédiction", true, 1],
        ["Calcul de l'erreur : comparer la prédiction à la vraie réponse", true, 2],
        ["Backward pass : propager l'erreur en sens inverse pour ajuster les poids", true, 3],
      ]
    },
    {
      type: 'relier',
      q: "Associe chaque terme d'entraînement à sa définition :",
      exp: "Loss function = mesure l'erreur. Learning rate = taille des pas. Epoch = un passage complet sur les données. Descente de gradient = méthode pour minimiser l'erreur.",
      opts: [
        ["Loss function || Mesure l'erreur du modèle à minimiser", true],
        ["Learning rate || Contrôle la taille des ajustements à chaque étape", true],
        ["Epoch || Un passage complet sur toutes les données d'entraînement", true],
        ["Descente de gradient || Ajuste les poids dans la direction qui réduit l'erreur", true],
      ]
    },
    {
      type: 'completer',
      q: "Un learning rate trop ___ fait osciller le modèle sans converger, tandis qu'un trop petit ralentit énormément l'entraînement.",
      exp: "Le learning rate contrôle la taille des pas. Trop grand = on saute par-dessus le minimum. Trop petit = on avance à pas de tortue. Les optimiseurs modernes comme Adam l'ajustent automatiquement.",
      opts: [["grand", true], ["petit", false], ["variable", false], ["négatif", false]]
    },
  ],

  'c3-l4': [
    {
      type: 'ordre',
      q: "Remets dans l'ordre ce qu'apprend un CNN couche par couche sur une image :",
      exp: "Les CNN apprennent en hiérarchie : d'abord les détails bas niveau (bords, contrastes), puis les formes, puis les parties d'objets, puis les objets complets.",
      opts: [
        ["Bords, contrastes et couleurs basiques", true, 1],
        ["Formes géométriques simples (cercles, angles)", true, 2],
        ["Parties d'objets (yeux, oreilles, roues)", true, 3],
        ["Objets complets et concepts abstraits", true, 4],
      ]
    },
    {
      type: 'completer',
      q: "Dans un CNN, les ___ glissent sur l'image pour détecter des patterns spécifiques comme les bords ou les textures.",
      exp: "Les filtres (ou kernels) sont de petites matrices 3x3 ou 5x5 qui glissent sur l'image. Chaque filtre se spécialise dans la détection d'un pattern. Ils sont appris automatiquement pendant l'entraînement.",
      opts: [["filtres", true], ["neurones", false], ["pixels", false], ["couches", false]]
    },
    {
      type: 'relier',
      q: "Associe chaque application à son usage des CNN :",
      exp: "Face ID reconnaît les visages, Google Photos organise par contenu, la radiologie IA détecte des anomalies médicales, et les voitures autonomes identifient les obstacles.",
      opts: [
        ["Face ID || Reconnaissance faciale 3D", true],
        ["Google Photos || Organisation automatique par contenu visuel", true],
        ["Radiologie IA || Détection d'anomalies sur des scanners", true],
        ["Voiture autonome || Identification des piétons et obstacles", true],
      ]
    },
  ],

  'c3-l5': [
    {
      type: 'relier',
      q: "Associe chaque porte du LSTM à son rôle :",
      exp: "Le LSTM a 3 portes : oubli (quelle ancienne info jeter), entrée (quelle nouvelle info garder), sortie (quelle info utiliser maintenant). Ce mécanisme permet une mémoire longue durée.",
      opts: [
        ["Porte d'oubli || Décide quelle information ancienne effacer", true],
        ["Porte d'entrée || Décide quelle nouvelle information mémoriser", true],
        ["Porte de sortie || Décide quelle partie utiliser pour la sortie", true],
      ]
    },
    {
      type: 'completer',
      q: "Le problème du ___ dans les RNN classiques fait que les informations lointaines sont progressivement oubliées pendant l'entraînement.",
      exp: "Le vanishing gradient : lors de la rétropropagation sur de longues séquences, le gradient diminue exponentiellement. Les premières étapes reçoivent un signal quasi-nul. Les LSTM ont été conçus pour résoudre ce problème.",
      opts: [["vanishing gradient", true], ["overfitting", false], ["dropout", false], ["underfitting", false]]
    },
    {
      type: 'ordre',
      q: "Remets dans l'ordre l'évolution des architectures pour traiter les séquences :",
      exp: "L'évolution : RNN (mémoire séquentielle simple, 1980s) → LSTM (mémoire longue durée avec portes, 1997) → Transformer (attention directe entre tous les tokens, 2017) → GPT/Claude (2020s).",
      opts: [
        ["RNN — mémoire séquentielle simple", true, 1],
        ["LSTM — mémoire longue durée avec portes", true, 2],
        ["Transformer — attention directe entre tous les tokens", true, 3],
        ["GPT / Claude — grands modèles de langage basés sur Transformer", true, 4],
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

console.log('\n🎉 Exercices variés ajoutés pour le chapitre 3 !')
await p.$disconnect()
