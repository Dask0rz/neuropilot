import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const contents = {
  'c3-l1': `# Le Neurone Artificiel

*En 1943, deux chercheurs — Warren McCulloch et Walter Pitts — ont eu une idée folle : et si on pouvait imiter le cerveau humain avec des mathématiques ?*

*80 ans plus tard, cette idée est devenue la technologie la plus puissante jamais créée.*

## Le neurone biologique — l'inspiration

Ton cerveau contient environ 86 milliards de neurones. Chaque neurone :
- Reçoit des signaux de ses voisins (dendrites)
- Les additionne
- S'active si la somme dépasse un certain seuil
- Envoie un signal à ses voisins (axone)

C'est tout. Une opération simple. Mais 86 milliards de fois, en parallèle, ça donne la conscience humaine.

## Le neurone artificiel — la version mathématique

Un neurone artificiel fait exactement la même chose, mais avec des nombres.

### Les entrées (inputs)
Des valeurs numériques. Pour reconnaître une image : chaque pixel est une entrée.

### Les poids (weights)
Chaque entrée a un poids — son importance relative. Un poids élevé = cette entrée compte beaucoup. Un poids proche de zéro = cette entrée est ignorée.

> 💡 **C'est là que réside l'intelligence.** Les poids sont les paramètres que le modèle apprend pendant l'entraînement. Un réseau de neurones avec des milliards de poids bien calibrés peut faire des choses extraordinaires.

### La somme pondérée
Le neurone multiplie chaque entrée par son poids, puis additionne tout.

### La fonction d'activation
Si on s'arrêtait là, on n'aurait qu'une simple fonction linéaire. La fonction d'activation introduit de la **non-linéarité** — ce qui permet au réseau d'apprendre des patterns complexes.

Les plus courantes :
- **ReLU :** Si positif, garde la valeur. Si négatif, retourne 0. Simple et très efficace.
- **Sigmoid :** Transforme n'importe quelle valeur en nombre entre 0 et 1. Utile pour les probabilités.

### Le biais (bias)
Un paramètre supplémentaire qui permet au neurone de s'activer même quand toutes les entrées sont à zéro. Donne plus de flexibilité.

> 🔥 **Un seul neurone est limité.** Il ne peut résoudre que des problèmes linéaires simples. La magie commence quand on en connecte des milliers en couches.

## À retenir

- Un neurone artificiel imite le neurone biologique : entrées → somme pondérée → activation → sortie
- Les poids sont ce que le réseau apprend — ils encodent la connaissance
- La fonction d'activation introduit la non-linéarité indispensable pour les problèmes complexes`,

  'c3-l2': `# Architecture d'un Réseau

*Un neurone seul, c'est comme un pixel seul. Incompréhensible. Mais des millions de pixels ensemble forment une image. Des millions de neurones ensemble forment une intelligence.*

## De un neurone à un réseau

Un réseau de neurones organise les neurones en **couches** (layers), connectées les unes aux autres.

### La couche d'entrée (Input Layer)
Reçoit les données brutes.
- Pour une image 28x28 pixels : 784 neurones d'entrée
- Pour un texte : chaque token (mot) est une entrée
- Elle ne fait aucun calcul — elle transmet juste

### Les couches cachées (Hidden Layers)
C'est là que la magie opère. Chaque couche extrait des caractéristiques de plus en plus abstraites.

Pour la reconnaissance d'images :
- **Couche 1 :** détecte des bords et des contrastes
- **Couche 2 :** détecte des formes (cercles, angles)
- **Couche 3 :** détecte des parties (yeux, oreilles, roues)
- **Couche 4 :** reconnaît des objets entiers (chat, voiture)

> 💡 **C'est ça le "deep" dans deep learning** — la profondeur du réseau. Plus de couches = capacité à apprendre des représentations plus abstraites.

### La couche de sortie (Output Layer)
Produit la prédiction finale.
- Classification binaire : 1 neurone (chat/pas chat)
- Classification multiple : N neurones (un par catégorie)
- Régression : 1 neurone (valeur numérique)

## Fully Connected vs autres architectures

Dans un réseau **fully connected** (dense), chaque neurone est connecté à tous les neurones de la couche suivante.

Un réseau avec 1000 neurones par couche et 10 couches a des **millions de connexions**. C'est pourquoi l'entraînement nécessite beaucoup de puissance de calcul.

> 🔥 **Pourquoi les GPU ?** Les GPU (cartes graphiques) sont conçus pour faire des millions de calculs en parallèle — parfait pour les opérations matricielles des réseaux de neurones. Un GPU peut être 100x plus rapide qu'un CPU pour l'entraînement.

## Le Dropout — apprendre à être robuste

Pendant l'entraînement, on désactive aléatoirement une portion des neurones (typiquement 20-50%) à chaque itération.

**Pourquoi ?** Cela force le réseau à ne pas trop dépendre de certains neurones spécifiques. Il apprend des représentations plus robustes et généralisables.

C'est comme s'entraîner à faire du vélo avec un œil fermé — tu développes des compétences plus solides.

> ⚡ **À retenir :** L'architecture (nombre de couches, nombre de neurones, type de connexions) est un choix de design crucial. Ni trop simple (underfitting), ni trop complexe (overfitting).`,

  'c3-l3': `# L'Entraînement en Profondeur

*Comment un réseau de neurones apprend-il à reconnaître un chat ? Comment ajuste-t-il ses millions de poids pour être de plus en plus précis ?*

*La réponse tient en deux concepts : la rétropropagation et la descente de gradient.*

## La descente de gradient — l'intuition

Imagine que tu es perdu dans une montagne dans le brouillard, et tu veux rejoindre la vallée (le point le plus bas).

Ta stratégie : à chaque pas, tu regardes dans quelle direction le sol descend le plus, et tu fais un pas dans cette direction.

C'est exactement la **descente de gradient** : à chaque étape, on ajuste les poids dans la direction qui réduit l'erreur.

> 💡 **La fonction de perte (loss function)** mesure l'erreur du modèle. L'objectif de l'entraînement : minimiser cette fonction. La vallée = l'erreur minimale.

## La rétropropagation — comment calculer les ajustements

Ok, on veut descendre vers la vallée. Mais comment savoir quelle direction prendre quand on a des millions de poids ?

La **rétropropagation** (backpropagation) calcule, pour chaque poids, comment il a contribué à l'erreur finale.

### Le processus en 3 étapes

**1. Forward pass (propagation avant)**
Les données traversent le réseau de l'entrée vers la sortie. On obtient une prédiction.

**2. Calcul de l'erreur**
On compare la prédiction à la vraie réponse. On calcule l'erreur (loss).

**3. Backward pass (rétropropagation)**
On propage l'erreur en sens inverse, de la sortie vers l'entrée. Chaque poids reçoit un signal indiquant s'il doit augmenter ou diminuer, et de combien.

> 🔥 **L'analogie du prof :** C'est comme un examen avec correction détaillée. Après chaque erreur, le prof explique précisément quelle partie du raisonnement était fausse. Le cerveau ajuste.

## Le taux d'apprentissage (Learning Rate)

Le taux d'apprentissage contrôle la **taille des pas** lors de la descente.

- **Trop grand :** On saute par-dessus la vallée et on oscille sans jamais converger
- **Trop petit :** On avance très lentement, l'entraînement prend une éternité
- **Juste bien :** On converge efficacement vers le minimum

> 💡 Trouver le bon learning rate est un art. Des techniques modernes (Adam, learning rate scheduling) l'ajustent automatiquement pendant l'entraînement.

## Les Epochs — combien de fois revoir les données ?

Une **epoch** = un passage complet sur toutes les données d'entraînement.

En général, on entraîne pendant des dizaines à des centaines d'epochs. GPT-4 a été entraîné sur des billions de tokens pendant des mois.

> ⚡ **À retenir :** Forward pass → Calcul erreur → Backward pass → Ajustement des poids. Ce cycle répété des millions de fois, c'est tout l'entraînement d'un réseau de neurones.`,

  'c3-l4': `# CNN : Voir Comme une Machine

*En 2012, un réseau de neurones appelé AlexNet a réduit l'erreur de reconnaissance d'images de 26% à 15% en un an. C'était le début d'une révolution.*

*La technologie derrière ? Les Convolutional Neural Networks — CNN.*

## Le problème des images

Une image 224x224 pixels en couleur, c'est 224 × 224 × 3 = **150 528 valeurs**.

Si on utilise un réseau fully connected, la première couche seule aurait des millions de paramètres. Ingérable. Et surtout inutile — beaucoup de ces connexions ne serviraient à rien.

Les CNN ont une approche bien plus intelligente.

## L'opération de convolution

Au lieu de connecter chaque pixel à tous les neurones, un CNN utilise de petits **filtres** (3x3 ou 5x5 pixels) qui **glissent** sur l'image.

Chaque filtre est spécialisé dans la détection d'un pattern particulier :
- Un filtre détecte les bords horizontaux
- Un autre les bords verticaux
- Un autre les coins
- Un autre les textures...

> 💡 **La beauté des CNN :** Ces filtres ne sont pas programmés manuellement. Ils sont **appris automatiquement** pendant l'entraînement. Le réseau découvre tout seul quels patterns sont utiles.

## L'architecture typique d'un CNN

### Couches de convolution
Appliquent les filtres sur l'image et produisent des "feature maps" — des cartes indiquant où chaque pattern est présent.

### Couches de pooling
Réduisent la taille des feature maps en gardant l'information importante. Rend le réseau plus robuste aux petites variations (l'objet peut être légèrement décalé, tourné, agrandi).

### Couches fully connected (à la fin)
Prennent toutes les features extraites et font la classification finale.

> 🔥 **Hiérarchie des features :**
> - **Couches du début :** bords, couleurs, textures basiques
> - **Couches du milieu :** formes, parties d'objets
> - **Couches de la fin :** objets complets, concepts abstraits

## Applications concrètes des CNN

- **Face ID** sur iPhone : reconnaît ton visage en 3D
- **Google Photos** : organise tes photos par personnes, lieux, objets
- **Radiologie IA** : détecte des cancers sur des scanners
- **Voitures autonomes** : identifient piétons, panneaux, obstacles
- **Instagram filters** : appliquent des effets en temps réel

> ⚡ **À retenir :** Les CNN apprennent à voir en hiérarchie — des bords simples aux objets complexes. Leurs filtres sont appris automatiquement. Ils sont la base de toute IA visuelle moderne.`,

  'c3-l5': `# RNN et LSTM

*Certains problèmes ne peuvent pas être résolus avec une image fixe. Ils nécessitent de comprendre le temps, les séquences, le contexte.*

*"Je vais" → le prochain mot dépend de tout ce qui précède.*
*"La banque de la rivière" vs "La banque du crédit" → le sens de "banque" dépend du contexte.*

*Pour ça, on a besoin d'une mémoire.*

## Les Réseaux Récurrents (RNN)

Contrairement aux CNN qui traitent une image entière, les RNN traitent les données **une étape à la fois**, en maintenant un **état caché** qui résume ce qui a été vu.

### Comment ça fonctionne

À chaque étape t, le RNN reçoit :
- L'entrée actuelle (le mot actuel)
- L'état caché précédent (la "mémoire" des étapes précédentes)

Il produit :
- Une sortie
- Un nouvel état caché (mise à jour de la mémoire)

> 💡 **Analogie :** Lire un livre. À chaque mot, tu mets à jour ta compréhension de l'histoire. Tu ne lis pas chaque mot isolément — tu te souviens du contexte.

## Le problème du Vanishing Gradient

Les RNN classiques ont un défaut majeur : sur de longues séquences, ils **oublient** les informations lointaines.

Pourquoi ? Lors de la rétropropagation sur de longues séquences, le gradient diminue exponentiellement. Les premières étapes reçoivent un signal d'apprentissage quasi-nul.

C'est le **vanishing gradient problem** — l'une des grandes limitations des RNN classiques.

> 🔥 **Exemple concret :** "Le chat que j'ai acheté il y a trois ans quand j'habitais à Paris et que ma sœur m'avait offert pour mon anniversaire **miaule**."
> Un RNN classique aurait du mal à associer "chat" avec "miaule" après si longtemps.

## LSTM — Long Short-Term Memory

Les LSTM résolvent ce problème avec un mécanisme de **portes** (gates) qui contrôlent ce que le réseau mémorise ou oublie.

### Les 3 portes d'un LSTM

**Porte d'oubli (Forget Gate)**
"Quelle information de la mémoire précédente dois-je oublier ?"

**Porte d'entrée (Input Gate)**
"Quelle nouvelle information dois-je mémoriser ?"

**Porte de sortie (Output Gate)**
"Quelle partie de la mémoire dois-je utiliser pour la sortie ?"

Ce mécanisme permet aux LSTM de maintenir des informations sur des **centaines d'étapes** — là où les RNN classiques échouaient.

## La révolution Transformer

En 2017, Google publie "Attention is All You Need". L'architecture **Transformer** remplace les RNN par un mécanisme d'**attention** — chaque token peut directement "regarder" tous les autres tokens.

Résultat : meilleure performance, parallélisable (beaucoup plus rapide à entraîner).

GPT, Claude, BERT, Gemini — tous sont des Transformers, pas des RNN.

> ⚡ **À retenir :** RNN = mémoire séquentielle. LSTM = mémoire longue durée avec portes. Transformer = attention directe entre tous les éléments. Les Transformers ont largement remplacé les RNN pour le langage.`,
}

for(const [slug, content] of Object.entries(contents)) {
  await p.lesson.update({ where: { slug }, data: { content } })
  console.log(`✅ ${slug} mis à jour`)
}

console.log('Contenu chapitre 3 ajouté !')
await p.$disconnect()
