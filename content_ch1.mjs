import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const contents = {
  'c1-l1': `# C'est quoi l'IA ?

Il y a ce matin, tu as demandé à Siri la météo. Netflix t'a suggéré une série parfaite. Gmail a filtré 12 spams. Et ton téléphone t'a reconnu au déverrouillage.

*Tu as interagi avec l'IA au moins 4 fois avant même de prendre ton café.*

## Mais c'est quoi exactement ?

L'**intelligence artificielle** c'est la capacité d'une machine à simuler des comportements intelligents — comme apprendre, reconnaître, décider ou créer.

Ce n'est pas de la magie. Ce n'est pas un robot humanoïde. C'est un **programme qui apprend à partir de données** pour accomplir des tâches précises.

> 💡 La différence clé avec un programme classique : un programme classique suit des règles fixes écrites par un humain. L'IA, elle, **apprend ses propres règles** à partir d'exemples.

## Une analogie simple

Imagine que tu veuilles apprendre à reconnaître un chat.

**Méthode classique :** quelqu'un t'écrit des règles — "a 4 pattes, des moustaches, des oreilles pointues..."

**Méthode IA :** on te montre 10 000 photos de chats et 10 000 photos d'autres animaux. Tu finis par reconnaître un chat sans qu'on t'explique pourquoi.

C'est exactement comme ça que fonctionne une IA de reconnaissance d'images.

## Ce que l'IA peut faire aujourd'hui

- Comprendre et générer du langage (ChatGPT, Claude)
- Reconnaître des visages, objets, maladies sur des images
- Recommander du contenu (Spotify, Netflix, YouTube)
- Conduire des voitures de façon autonome
- Créer des images, de la musique, du code

> 🔥 L'IA actuelle ne "pense" pas comme un humain. Elle ne ressent rien. Elle est très forte pour trouver des patterns dans des données — et c'est déjà révolutionnaire.

## À retenir

- L'IA simule des comportements intelligents à partir de données
- Elle apprend ses règles toute seule, contrairement aux programmes classiques
- L'IA "étroite" (spécialisée) est partout — l'IA "générale" n'existe pas encore`,

  'c1-l2': `# L'IA dans ta vie quotidienne

*Ce matin, avant même d'arriver au bureau, tu as probablement utilisé l'IA une dizaine de fois sans le savoir.*

Réveil avec Spotify qui lance ta playlist préférée. GPS qui prédit les embouteillages. Gmail qui trie tes emails. FaceID qui te reconnaît. Instagram qui sélectionne tes posts.

**L'IA est devenue invisible — et c'est ça qui la rend si puissante.**

## Les 6 endroits où l'IA travaille pour toi

### 🎵 Recommandations (Spotify, Netflix, YouTube)
Ces plateformes analysent chaque seconde de ta consommation pour prédire ce qui va te plaire. Spotify connaît ton humeur mieux que certains amis.

### 📧 Filtrage (Gmail, Outlook)
Ton filtre anti-spam analyse des milliers de caractéristiques en quelques millisecondes pour décider si un email est suspect.

### 📍 Navigation (Google Maps, Waze)
Le temps de trajet n'est pas calculé — il est *prédit* par une IA qui analyse des millions de trajets en temps réel.

### 👤 Reconnaissance (Face ID, Google Photos)
Face ID crée une carte 3D de ton visage avec 30 000 points infrarouges. Taux d'erreur : 1 sur 1 000 000.

### 🛒 Commerce (Amazon, publicités)
"Les clients qui ont acheté X ont aussi acheté Y" — c'est un algorithme de recommandation qui génère 35% du chiffre d'affaires d'Amazon.

### 🔒 Sécurité (banques, fraudes)
Ta banque analyse chaque transaction en temps réel. Si tu paies à Paris et qu'une transaction apparaît à Tokyo 10 minutes après, l'IA bloque automatiquement.

> 💡 Les suggestions de recherche Google ne sont pas tapées par un humain. Un algorithme prédit ce que tu cherches en analysant des milliards de requêtes passées.

> ⚡ **Chiffre à retenir :** En 2024, une personne interagit en moyenne avec des systèmes IA plus de 30 fois par jour.

## À retenir

- L'IA est omniprésente mais souvent invisible
- Chaque service digital majeur utilise l'IA pour personnaliser ton expérience
- Ces systèmes s'améliorent en continu grâce à tes interactions`,

  'c1-l3': `# Histoire de l'IA

*L'IA n'est pas née avec ChatGPT. Cette histoire a commencé il y a 70 ans, dans l'esprit d'un mathématicien britannique.*

## 1950 — La question fondatrice

Alan Turing pose la question qui va tout changer : **"Les machines peuvent-elles penser ?"**

Il propose le "Test de Turing" : si une machine peut convaincre un humain qu'elle est humaine dans une conversation écrite, on peut considérer qu'elle pense.

> 💡 Turing était aussi le génie qui a décrypté Enigma pendant la Seconde Guerre Mondiale, sauvant potentiellement des millions de vies. L'IA doit beaucoup à cet homme.

## 1956 — La naissance officielle

Le terme "Intelligence Artificielle" est inventé lors d'une conférence à Dartmouth. Les chercheurs sont optimistes : *"On résoudra l'IA en 10 ans."*

Ils avaient un peu sous-estimé le problème.

## Les hivers de l'IA (1974 et 1987)

Les promesses ne sont pas tenues. Les financements s'effondrent. La recherche ralentit.

Ces périodes s'appellent les **"hivers de l'IA"** — des années de désillusion qui ont pourtant forcé les chercheurs à repenser leurs approches.

> 🔥 **Le paradoxe :** Les hivers de l'IA ont été essentiels. Ils ont éliminé les mauvaises pistes et concentré la recherche sur ce qui fonctionnait vraiment.

## 1997 — Deep Blue bat Kasparov

IBM's Deep Blue bat le champion du monde d'échecs Garry Kasparov. Moment historique — même si Deep Blue utilisait de la force brute, pas de l'apprentissage.

## 2012 — La révolution du Deep Learning

AlexNet, un réseau de neurones profond, écrase la concurrence à la compétition ImageNet de reconnaissance d'images. L'erreur passe de 26% à 15% en un an.

**C'est le Big Bang du deep learning moderne.** Rendu possible par trois facteurs réunis pour la première fois : de meilleurs algorithmes, des masses de données (internet), et des GPU abordables.

## 2017 — L'architecture Transformer

Google publie "Attention is All You Need" — le papier qui invente l'architecture Transformer. GPT, Claude, Gemini sont tous basés sur cette invention.

## 2022 — ChatGPT change tout

1 million d'utilisateurs en 5 jours. 100 millions en 2 mois. Record absolu dans l'histoire de la tech.

> ⚡ **À retenir :** L'IA a mis 70 ans à mûrir. Mais les 5 dernières années ont apporté plus de progrès que les 65 précédentes réunies.`,

  'c1-l4': `# Types d'IA

*Quand on dit "IA", on peut parler de choses très différentes. Faisons le point sur les grandes familles.*

## IA Étroite vs IA Générale

### L'IA Étroite (Narrow AI) — celle qui existe
C'est **toute l'IA actuelle**. Elle excelle dans une tâche précise et une seule.

- ChatGPT : excellent en texte, incapable de conduire une voiture
- AlphaGo : imbattable au Go, incapable de jouer aux échecs
- Face ID : reconnaît ton visage, ne comprend pas ce qu'il voit

> 💡 Une IA étroite peut surpasser n'importe quel humain dans son domaine tout en étant totalement incompétente hors de celui-ci.

### L'IA Générale (AGI) — celle qui n'existe pas encore
Une IA capable d'apprendre et de raisonner sur **n'importe quel sujet**, comme un humain.

C'est l'objectif ultime de la recherche. Certains pensent qu'on s'en approche, d'autres que c'est encore loin. Personne ne sait vraiment.

> 🔥 OpenAI, Anthropic et DeepMind ont tous déclaré que la création d'une AGI sûre est leur mission principale. C'est dire à quel point l'enjeu est pris au sérieux.

## IA Symbolique vs IA Connexionniste

### L'approche symbolique (années 60-80)
On écrit des règles logiques : *"SI fièvre ET toux ALORS grippe possible"*

**Avantage :** explicable, logique
**Limite :** impossible de tout prévoir — la vie réelle est trop complexe

### L'approche connexionniste — le deep learning
On montre des millions d'exemples et on laisse le réseau apprendre tout seul.

**Avantage :** très performant sur des données complexes
**Limite :** difficile d'expliquer pourquoi le modèle prend telle décision ("boîte noire")

## IA Discriminative vs IA Générative

### Discriminative — elle classe et prédit
- "Est-ce un spam ?" → Oui/Non
- "C'est un chat ou un chien ?"
- "Ce client va-t-il partir ?"

### Générative — elle crée
- ChatGPT qui écrit du texte
- DALL-E qui génère des images
- Suno qui compose de la musique

> ⚡ **La révolution actuelle c'est l'IA générative.** Pendant des décennies, l'IA ne faisait que classifier. Maintenant elle crée — et ça change tout.`,

  'c1-l5': `# Comment une IA "pense"

*L'IA ne pense pas vraiment. Mais elle fait quelque chose d'extraordinairement utile : elle trouve des patterns dans des données. Voici comment.*

## Le cycle de l'apprentissage

### 1. Les données — le carburant
Tout commence par des données. Des millions, parfois des milliards d'exemples.

Pour reconnaître des chats : des millions de photos étiquetées "chat" ou "pas chat"
Pour ChatGPT : des centaines de milliards de mots d'internet, livres, articles

> 🔥 **Le principe GIGO :** Garbage In, Garbage Out. Des données de mauvaise qualité produisent un modèle de mauvaise qualité, peu importe l'algorithme. Les données c'est tout.

### 2. Le modèle — la machine à apprendre
Un modèle est une **fonction mathématique** avec des millions (ou milliards) de paramètres ajustables.

Au début, ces paramètres sont aléatoires. Le modèle ne sait rien.

### 3. L'entraînement — apprendre par l'erreur
Le modèle voit un exemple, fait une prédiction, compare avec la bonne réponse, et ajuste ses paramètres pour réduire l'erreur.

Ce processus se répète des millions de fois. C'est la **descente de gradient** — le modèle descend progressivement vers le minimum d'erreur.

> 💡 C'est comme apprendre à jouer aux fléchettes : tu lances, tu rates, tu corriges ta position, tu relances. Après 10 000 lancers, tu vises juste automatiquement.

### 4. L'évaluation — tester sur du nouveau
On teste le modèle sur des données qu'il n'a **jamais vues** pendant l'entraînement. C'est le vrai test.

Un modèle qui performe bien sur les données d'entraînement mais mal sur les nouvelles données a juste *mémorisé* — il n'a pas appris.

### 5. L'inférence — utiliser le modèle
Quand tu envoies un message à ChatGPT, le modèle est déjà entraîné. Il utilise ses paramètres appris pour générer la réponse la plus probable.

C'est ça l'**inférence** : utiliser un modèle entraîné sur de nouvelles données.

## Les features — ce que le modèle "voit"

Une **feature** (caractéristique) est une variable d'entrée. Pour prédire le prix d'une maison :
- Surface en m²
- Nombre de pièces
- Quartier
- Année de construction

Choisir les bonnes features est un art. Les mauvaises features = mauvais modèle.

> ⚡ **Le truc fascinant :** Pour les images et le texte, les réseaux de neurones apprennent leurs propres features tout seuls. Personne ne leur dit quoi chercher — ils découvrent.

## À retenir

- Données → Modèle → Entraînement → Évaluation → Inférence
- L'entraînement c'est apprendre par l'erreur, des millions de fois
- L'inférence c'est utiliser le modèle appris sur de nouvelles données`,
}

for(const [slug, content] of Object.entries(contents)) {
  await p.lesson.update({ where: { slug }, data: { content } })
  console.log(`✅ ${slug} mis à jour`)
}

console.log('Contenu chapitre 1 ajouté !')
await p.$disconnect()
