import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const contents = {
  'c2-l1': `# Apprendre sans programmer

Imagine que tu veuilles enseigner à un enfant à reconnaître des chiens.

Tu pourrais lui écrire des règles : "4 pattes, poils, queue qui remue, aboie..." Mais que se passe-t-il avec un chien sans queue ? Ou un chaton à 4 pattes ?

*Les règles ne suffisent jamais. La vraie vie est trop complexe.*

**La solution du machine learning : montrer des exemples, pas des règles.**

## Ce qu'est vraiment le Machine Learning

Le Machine Learning c'est la capacité d'un programme à **apprendre automatiquement à partir de données**, sans qu'on lui écrive les règles explicitement.

On ne programme plus le "comment faire". On montre le "quoi faire" avec des milliers d'exemples, et l'algorithme trouve tout seul la logique.

> 💡 **Analogie parfaite :** Apprendre à conduire. Personne ne t'a donné un manuel de 10 000 règles. Tu as observé, pratiqué, reçu du feedback, et ton cerveau a construit ses propres règles. C'est exactement ce que fait le ML.

## Le cycle du ML en 4 étapes

### 1. Les données
Tu rassembles des milliers d'exemples. Pour un filtre spam : des milliers d'emails étiquetés "spam" ou "pas spam".

### 2. L'algorithme
Tu choisis un algorithme — une méthode mathématique pour trouver des patterns dans les données.

### 3. L'entraînement
L'algorithme analyse les données, trouve les patterns, ajuste ses paramètres. Il "apprend".

### 4. La prédiction
Sur un nouvel email jamais vu, le modèle prédit : spam ou pas spam ?

> 🔥 **La révolution :** Avant le ML, un ingénieur devait manuellement coder chaque règle anti-spam. Aujourd'hui, on montre des exemples et la machine trouve les règles elle-même — souvent de bien meilleures règles que ce qu'un humain aurait écrit.

## Pourquoi c'est puissant

- **Scalable :** le même algorithme peut apprendre à reconnaître des visages, détecter des fraudes, traduire des langues
- **Adaptatif :** le modèle s'améliore avec plus de données
- **Découvreur :** il trouve des patterns qu'aucun humain n'aurait pensé à coder

> ⚡ **Chiffre clé :** Netflix économise 1 milliard de dollars par an grâce à son algorithme de recommandation ML — moins de désabonnements car les gens trouvent toujours quelque chose à regarder.

## À retenir

- Le ML apprend des règles depuis des données, sans qu'on les programme
- Données + Algorithme + Entraînement = Modèle capable de prédire
- C'est la base de presque toute l'IA moderne`,

  'c2-l2': `# Supervisé vs Non Supervisé

*Tu veux trier 10 000 photos. Deux approches possibles.*

**Approche A :** Tu étiquettes 1 000 photos toi-même ("vacances", "travail", "famille"), puis tu demandes à l'IA de classer les 9 000 restantes selon tes catégories.

**Approche B :** Tu demandes à l'IA de regrouper les photos similaires elle-même, sans lui dire quelles catégories chercher.

*Ce sont les deux grandes familles du machine learning.*

## L'apprentissage Supervisé

Tu fournis des données **avec les réponses** (les labels). L'IA apprend à associer les entrées aux bonnes réponses.

### Exemples concrets
- **Classification :** Email → Spam ou Pas spam ?
- **Régression :** Caractéristiques d'une maison → Prix ?
- **Reconnaissance :** Photo → Chat ou Chien ?

> 💡 "Supervisé" parce qu'un humain a supervisé la création des labels. Quelqu'un a dû étiqueter des milliers d'exemples avant l'entraînement. C'est coûteux en temps mais très précis.

## L'apprentissage Non Supervisé

Tu fournis des données **sans réponses**. L'IA trouve elle-même la structure cachée dans les données.

### La technique principale : le Clustering
Regrouper automatiquement les données similaires.

### Exemples concrets
- **Segmentation clients :** L'IA groupe tes clients en profils similaires sans qu'on lui dise combien de groupes chercher
- **Détection d'anomalies :** Trouver les transactions bancaires qui ne ressemblent à aucun pattern normal
- **Compression :** Trouver les patterns répétitifs pour compresser une image

> 🔥 **Le cas d'usage génial :** Google News regroupe automatiquement les articles sur le même sujet sans qu'on lui dise quels sujets existent. C'est du clustering non supervisé en action.

## L'apprentissage par Renforcement

Une troisième famille, différente des deux autres.

Un **agent** explore un environnement, prend des actions, reçoit des **récompenses** ou des **punitions**, et apprend à maximiser les récompenses.

- AlphaGo a appris à jouer au Go en jouant des millions de parties contre lui-même
- Les robots apprennent à marcher en essayant, tombant, et réessayant
- Les algorithmes de trading optimisent les décisions d'achat/vente

> ⚡ **À retenir :** Supervisé = avec réponses connues. Non supervisé = sans réponses, l'IA découvre. Par renforcement = apprendre par essai-erreur avec récompenses.`,

  'c2-l3': `# La Magie des Données

*En 2006, Netflix lance un concours : 1 million de dollars pour quiconque améliorerait son algorithme de recommandation de 10%. Des milliers d'équipes participent pendant 3 ans.*

*La leçon la plus importante du concours ? Ce n'était pas l'algorithme qui comptait le plus. C'était la **qualité des données**.*

## Pourquoi les données sont le carburant de l'IA

Sans données, pas d'apprentissage. Mais toutes les données ne se valent pas.

> 🔥 **Le principe GIGO :** Garbage In, Garbage Out. Des données de mauvaise qualité produisent un modèle de mauvaise qualité, peu importe la sophistication de l'algorithme.

## Les 4 qualités d'une bonne donnée

### 1. La pertinence
Les données doivent être liées au problème. Pour prédire si un email est spam, la longueur du sujet est pertinente. La météo du jour ne l'est pas.

### 2. La quantité
Plus de données = meilleure généralisation. GPT-4 a été entraîné sur l'équivalent de millions de livres.

### 3. La diversité
Des données représentatives de toutes les situations. Un modèle entraîné uniquement sur des visages blancs reconnaîtra mal les autres ethnies.

### 4. La qualité
Des données propres, sans erreurs, sans valeurs manquantes, sans doublons.

> 💡 **Le data cleaning** (nettoyage des données) représente 60 à 80% du travail d'un data scientist. Pas glamour, mais absolument critique.

## Le problème du dataset déséquilibré

Imagine un modèle pour détecter les fraudes bancaires.

- 99% des transactions sont normales
- 1% sont frauduleuses

Un modèle naïf qui prédit toujours "normal" aurait **99% de précision**... et raterait 100% des fraudes. Inutile !

C'est le piège du dataset déséquilibré. La solution : rééquilibrer les données ou utiliser des métriques adaptées.

## La Data Augmentation — créer des données artificiellement

Quand on manque de données, on peut en créer !

- **Images :** rotation, zoom, miroir, changement de luminosité
- **Texte :** reformulation, traduction aller-retour
- **Audio :** changement de vitesse, ajout de bruit

> ⚡ **Exemple réel :** Pour entraîner les IA médicales à détecter des maladies rares, les chercheurs augmentent artificiellement les quelques cas disponibles pour créer des milliers d'exemples d'entraînement.

## À retenir

- La qualité des données prime sur la quantité
- GIGO : mauvaises données = mauvais modèle
- Le data cleaning est la tâche la plus importante et la plus sous-estimée`,

  'c2-l4': `# Overfitting : Quand l'IA Triche

*Imagine un étudiant qui prépare un examen en mémorisant par cœur toutes les réponses des annales, sans comprendre les concepts.*

*Il obtiendra 100% sur les annales. Mais face à une question légèrement différente ? Échec total.*

**C'est exactement ce qu'est l'overfitting en machine learning.**

## Qu'est-ce que l'Overfitting ?

L'overfitting (surapprentissage) c'est quand un modèle **mémorise les données d'entraînement** au lieu d'en apprendre les patterns généraux.

Il performe parfaitement sur les données qu'il a vues, mais échoue sur de nouvelles données.

> 💡 **Signe d'alerte :** Précision de 99% sur les données d'entraînement, 60% sur les données de test. Écart énorme = overfitting probable.

## Pourquoi ça arrive ?

- **Modèle trop complexe** pour la quantité de données disponible
- **Trop d'entraînement** — le modèle a eu le temps de mémoriser chaque exemple
- **Pas assez de données** — le modèle n'a pas assez d'exemples pour généraliser

## Comment le détecter ?

On divise toujours les données en deux ensembles :

- **Train set (80%)** : pour entraîner le modèle
- **Test set (20%)** : données cachées pour évaluer le vrai niveau

Si la performance est excellente sur le train set mais mauvaise sur le test set → overfitting.

> 🔥 **Règle d'or :** Le modèle ne doit jamais voir les données de test pendant l'entraînement. C'est comme interdire à l'étudiant de voir les vraies questions d'exam avant le jour J.

## L'Underfitting — le problème inverse

L'underfitting c'est quand le modèle est **trop simple** — il ne capture pas les patterns même dans les données d'entraînement.

Performance médiocre sur train ET sur test → underfitting.

Le défi : trouver le juste milieu entre trop simple (underfitting) et trop complexe (overfitting).

## Les solutions contre l'Overfitting

### La Régularisation
Pénaliser mathématiquement la complexité excessive du modèle. Forcer la simplicité.

### Le Dropout
Dans les réseaux de neurones, désactiver aléatoirement des neurones pendant l'entraînement. Empêche le modèle de trop dépendre de certains chemins.

### Plus de données
Souvent la meilleure solution. Un modèle complexe a besoin de beaucoup de données pour généraliser.

### L'Early Stopping
Arrêter l'entraînement au bon moment, avant que le modèle commence à mémoriser.

> ⚡ **À retenir :** Un bon modèle généralise — il performe bien sur des données jamais vues. Mémoriser c'est tricher, pas apprendre.`,

  'c2-l5': `# Évaluer un Modèle

*Tu viens d'entraîner ton premier modèle. Il affiche 95% de précision. Est-ce bon ?*

*Ça dépend entièrement du contexte. Et c'est pour ça qu'on a besoin de plusieurs métriques.*

## La Précision (Accuracy) — simple mais trompeuse

La précision mesure le pourcentage de prédictions correctes.

**95% de précision** = le modèle se trompe 5% du temps.

> 🔥 **Le piège :** Sur un dataset de détection de cancer rare (1% de cas positifs), un modèle qui dit toujours "pas de cancer" a 99% de précision... et est totalement inutile. La précision seule ne suffit pas.

## La Matrice de Confusion — comprendre ses erreurs

Plutôt qu'un seul chiffre, on veut comprendre **comment** le modèle se trompe.

|  | Prédit Positif | Prédit Négatif |
|--|--|--|
| **Réel Positif** | Vrai Positif ✅ | Faux Négatif ❌ |
| **Réel Négatif** | Faux Positif ❌ | Vrai Négatif ✅ |

### Pour la détection de cancer :
- **Faux Négatif** (dire "pas cancer" quand c'est cancer) = catastrophique
- **Faux Positif** (dire "cancer" quand c'est sain) = stressant mais moins grave

Selon le contexte, on préfère minimiser l'un ou l'autre type d'erreur.

> 💡 **Précision vs Rappel :** La précision mesure "quand tu dis positif, est-ce vrai ?". Le rappel mesure "parmi tous les vrais positifs, combien as-tu trouvé ?". Un bon médecin IA préfère un rappel élevé — ne rater aucun cancer.

## Le F1-Score — le meilleur des deux mondes

Le F1-Score combine précision et rappel en une seule métrique équilibrée.

Idéal quand les deux types d'erreurs sont importants et que les classes sont déséquilibrées.

## La Validation Croisée (Cross-Validation)

Plutôt que de tester une seule fois, on divise les données en K parties et on entraîne K fois, en utilisant chaque partie comme test à tour de rôle.

**Résultat :** une estimation beaucoup plus fiable de la vraie performance du modèle.

> ⚡ **Règle pratique :** Pour un projet médical ou financier, utilise toujours la cross-validation. Pour un projet rapide, un simple train/test split suffit.

## À retenir

- L'accuracy seule est souvent trompeuse — regarde la matrice de confusion
- Précision et rappel mesurent des choses différentes — choisis selon le contexte
- La cross-validation donne l'estimation la plus fiable de la performance réelle`,
}

for(const [slug, content] of Object.entries(contents)) {
  await p.lesson.update({ where: { slug }, data: { content } })
  console.log(`✅ ${slug} mis à jour`)
}

console.log('Contenu chapitre 2 ajouté !')
await p.$disconnect()
