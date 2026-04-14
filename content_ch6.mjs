import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const contents = {
  'c6-l1': `# Outils IA Incontournables

*En 2024, un sondage auprès de 1 000 professionnels a révélé que ceux qui utilisent des outils IA au quotidien gagnent en moyenne 2h30 par jour. Sur un an, c'est plus de 600 heures — soit 75 journées de travail.*

*La question n'est plus "faut-il utiliser l'IA ?" mais "quels outils choisir ?"*

## La carte des outils IA en 2024

### Catégorie 1 — Assistants conversationnels
Les couteaux suisses de l'IA.

**ChatGPT (OpenAI)** — Le plus connu, très polyvalent. GPT-4 avec analyse d'images et de fichiers.
**Claude (Anthropic)** — Excellent pour les longs documents, très précis, moins d'hallucinations.
**Gemini (Google)** — Intégré à Google Workspace, parfait si tu vis dans l'écosystème Google.

> 💡 **Comment choisir ?** Teste les trois sur ta tâche principale. Chacun a des forces différentes selon le type de travail.

### Catégorie 2 — Recherche et veille
**Perplexity AI** — Moteur de recherche IA avec citations en temps réel. Remplace souvent Google pour la recherche approfondie.

### Catégorie 3 — Rédaction et contenu
**Notion AI** — Intégré directement dans Notion. Résume, améliore, génère dans tes pages.
**Grammarly** — Correction et amélioration du style en temps réel dans tous tes outils.

### Catégorie 4 — Code et développement
**GitHub Copilot** — Complète ton code en temps réel. +55% de productivité selon les études GitHub.
**Cursor** — Un éditeur de code entièrement repensé autour de l'IA.

### Catégorie 5 — Images et visuels
**Midjourney** — Qualité artistique exceptionnelle.
**DALL-E 3** — Intégré à ChatGPT, très précis sur les instructions.
**Canva AI** — Génération et édition d'images directement dans Canva.

### Catégorie 6 — Réunions et audio
**Otter.ai / Fireflies** — Transcription et résumé automatique de réunions.
**ElevenLabs** — Synthèse vocale ultra-réaliste.

> 🔥 **Le piège à éviter :** Vouloir utiliser tous les outils en même temps. Commence par 1 ou 2, maîtrise-les vraiment, puis étends progressivement.

## La règle des 3 questions avant d'adopter un outil

1. **Quel problème ça résout ?** Si tu ne peux pas répondre en une phrase, passe.
2. **Combien de temps ça prend à apprendre ?** Le ROI doit être positif dans la semaine.
3. **Est-ce que je l'utiliserai au moins 3 fois par semaine ?** Sinon, inutile de l'intégrer.

> ⚡ **À retenir :** Les meilleurs outils IA sont ceux que tu utilises vraiment, pas ceux qui ont les meilleures démos. Commence petit, va profond.`,

  'c6-l2': `# Automatiser avec l'IA

*Sarah est assistante de direction. Chaque lundi matin, elle passait 2 heures à compiler les rapports de la semaine, envoyer les comptes-rendus de réunion, et mettre à jour le tableau de bord.

Aujourd'hui, ce workflow tourne automatiquement. Sarah utilise ces 2 heures pour des projets à valeur ajoutée.*

*Son secret : Zapier + quelques prompts bien construits.*

## Qu'est-ce que l'automatisation IA ?

L'automatisation IA combine deux choses :
- **Les outils no-code** (Zapier, Make, n8n) qui connectent des applications entre elles
- **L'IA** qui traite, analyse et génère du contenu à chaque étape

Résultat : des workflows qui tournent seuls, 24h/24, sans intervention humaine.

## Les concepts clés

### Le Trigger (déclencheur)
L'événement qui lance le workflow.
- "Un nouvel email arrive dans ma boîte"
- "Un formulaire est soumis"
- "Un nouveau fichier apparaît dans Google Drive"
- "Il est 9h00 le lundi matin"

### L'Action
Ce qui se passe en réponse au trigger.
- "Envoyer une notification Slack"
- "Créer une tâche dans Notion"
- "Envoyer un email de réponse"
- "Générer un résumé avec l'IA"

### Le workflow complet
Trigger → Action 1 → Action 2 → Action 3...

> 💡 **Exemple concret :** Nouveau lead sur ton site (trigger) → IA analyse le message et qualifie le lead (action 1) → Crée une fiche dans ton CRM (action 2) → Envoie un email de bienvenue personnalisé (action 3) → Notifie le commercial concerné sur Slack (action 4).

## Les 3 grands outils d'automatisation

### Zapier
Le plus simple, le plus connu. Plus de 6 000 applications connectées. Interface très intuitive. Parfait pour débuter.

### Make (ex-Integromat)
Plus puissant et visuel. Interface canvas. Idéal pour les workflows complexes avec conditions et boucles. Moins cher que Zapier pour les gros volumes.

### n8n
Open source, peut tourner localement. Gratuit en self-hosted. Pour les plus techniques qui veulent le contrôle total.

> 🔥 **Le workflow qui change tout pour les commerciaux :** Email entrant d'un prospect → IA extrait nom, entreprise, besoin → Recherche automatique sur LinkedIn → Crée fiche CRM enrichie → Suggère une réponse personnalisée. Ce qui prenait 20 minutes se fait en 30 secondes.

## Par où commencer ?

1. Identifie ta tâche la plus répétitive de la semaine
2. Décompose-la en étapes : trigger → actions
3. Vérifie si les apps concernées sont dans Zapier
4. Crée ton premier "Zap" — commence simple
5. Teste, affine, complexifie progressivement

> ⚡ **À retenir :** L'automatisation IA c'est Trigger + Actions + IA. Commence par ton workflow le plus répétitif. Zapier pour débuter, Make pour aller plus loin.`,

  'c6-l3': `# L'IA pour Écrire

*Le journaliste qui écrit 10 articles par semaine. La community manager qui gère 5 réseaux sociaux. Le consultant qui rédige 3 rapports par mois.*

*Tous ont un point commun : ils écrivent énormément. Et tous peuvent diviser leur temps de rédaction par 3 avec l'IA.*

## La rédaction augmentée — le bon état d'esprit

L'erreur classique : demander à l'IA d'écrire à ta place, publier sans relire.
Le bon usage : **collaboration humain-IA** où chacun fait ce qu'il fait de mieux.

- **L'humain apporte :** les idées, le contexte, le jugement, l'authenticité, la vérification
- **L'IA apporte :** la structure, la rapidité, les variations, la correction, le volume

> 💡 **La règle d'or :** L'IA rédige le premier jet. L'humain affine, vérifie et personnalise. Ne jamais publier sans relire.

## Les 5 usages les plus puissants

### 1. La génération de premier jet
Tu as les idées, l'IA les structure et les développe. Tu pars d'une page blanche vers un brouillon solide en 2 minutes.

### 2. La reformulation et l'amélioration
"Reformule ce paragraphe pour le rendre plus percutant."
"Rends ce texte plus accessible à un non-expert."
"Raccourcis de 30% sans perdre l'essentiel."

### 3. L'adaptation au canal
Un même contenu, décliné automatiquement :
- Version LinkedIn (professionnel, 300 mots)
- Version Twitter/X (percutant, 280 caractères)
- Version newsletter (chaleureux, 500 mots)
- Version présentation (bullet points)

### 4. La correction et l'amélioration stylistique
Au-delà de l'orthographe : fluidité, cohérence, élimination des répétitions, niveau de langue.

### 5. La traduction et la localisation
Pas juste traduire — adapter culturellement. "Traduis ce texte en anglais américain pour une audience business de la côte Est."

> 🔥 **Le workflow rédaction idéal :**
> 1. Brief rapide (5 min) : contexte, objectif, audience, format
> 2. IA génère un premier jet (30 secondes)
> 3. Tu lis, identifies ce qui cloche (5 min)
> 4. "Modifie le paragraphe 2 en ajoutant un exemple concret sur X"
> 5. Lecture finale et personnalisation (5 min)
> Total : 15-20 minutes au lieu de 1-2 heures.

## Les risques à connaître

**Hallucinations :** L'IA peut inventer des chiffres, des citations, des faits. Toujours vérifier les données importantes.

**Généricité :** Sans guidance précise, le texte IA peut sembler impersonnel. Ajoute des anecdotes personnelles, des exemples de ton vécu.

**Détection IA :** Les détecteurs ont un fort taux d'erreur. Un texte bien personnalisé est indétectable. Mais la question éthique reste : doit-on le mentionner ?

> ⚡ **À retenir :** L'IA multiplie ta productivité rédactionnelle par 3 à 5. Brief précis + premier jet IA + révision humaine = le workflow gagnant.`,

  'c6-l4': `# L'IA pour Analyser

*Un directeur financier reçoit un rapport de 80 pages. Avant, il passait 3 heures à le lire pour en extraire les 5 points qui l'intéressaient vraiment.*

*Aujourd'hui, il uploade le PDF, pose 3 questions précises, et a sa synthèse en 2 minutes. Les 3 heures restantes, il réfléchit à la stratégie.*

## L'analyse de documents avec l'IA

Les LLMs modernes peuvent lire et analyser des documents entiers — contrats, rapports, études, emails, données.

### Ce qu'ils font bien
- Résumer un document long en points clés
- Répondre à des questions spécifiques sur le contenu
- Identifier des patterns, contradictions, anomalies
- Comparer plusieurs documents
- Extraire des informations structurées

### Comment procéder
1. Upload le document (PDF, Word, texte)
2. Donne le contexte : "Je suis DRH, ce document est un contrat prestataire"
3. Pose des questions précises : "Quelles sont les clauses de résiliation ?"

> 💡 **Prompts d'analyse puissants :**
> - "Résume en 5 points clés pour un dirigeant non-expert"
> - "Identifie les risques potentiels dans ce document"
> - "Compare ces deux offres sur les critères prix, délai, garanties"
> - "Extrais toutes les dates importantes et crée un calendrier"

## L'analyse de données avec l'IA

### CSV et Excel
ChatGPT Advanced Data Analysis et Claude peuvent lire tes fichiers de données et répondre en langage naturel.

"Quel est le produit le plus vendu par région ?"
"Y a-t-il des anomalies dans ces chiffres ?"
"Montre l'évolution des ventes sur 12 mois"

> 🔥 **La révolution pour les non-data-scientists :** Tu n'as plus besoin de savoir faire des formules Excel complexes ou du Python. Tu poses la question en français et l'IA fait l'analyse.

### L'analyse de sentiment
Coller 500 avis clients et demander :
"Analyse ces avis. Quels sont les 5 thèmes positifs les plus récurrents ? Les 5 points négatifs ? Quelle est la tendance générale ?"

En 30 secondes, tu as une analyse qu'il aurait fallu des heures à produire manuellement.

## Précautions importantes

**Confidentialité :** N'envoie jamais de données clients personnelles, données médicales ou financières sensibles à un LLM public. Utilise les versions entreprise ou des solutions locales.

**Vérification :** L'IA peut se tromper sur les calculs complexes. Toujours vérifier les chiffres importants.

**Contexte manquant :** L'IA analyse ce qu'on lui donne. Elle ne connaît pas ton contexte business. Ajoute toujours ce contexte dans ton prompt.

> ⚡ **À retenir :** L'IA transforme l'analyse documentaire et data. Upload + question précise + contexte = synthèse en secondes. Toujours vérifier les données critiques et protéger les informations sensibles.`,

  'c6-l5': `# Construire un Workflow IA

*Voici la vérité sur la productivité IA : ce ne sont pas les outils individuels qui font la différence. C'est la façon dont tu les combines en workflows cohérents.*

*Un bon workflow IA peut transformer une journée de travail.*

## Qu'est-ce qu'un workflow IA ?

Un workflow IA est une **séquence d'étapes** où l'IA intervient à un ou plusieurs moments pour automatiser, accélérer ou améliorer le travail.

Ce n'est pas juste "utiliser ChatGPT". C'est une chaîne organisée : entrée → traitement → sortie.

## Les 4 types de workflows IA

### Type 1 — Workflow de contenu
Idée → IA structure → humain affine → IA formate pour chaque canal → publication

### Type 2 — Workflow d'analyse
Document entrant → IA extrait les infos clés → IA classe et priorise → humain décide → IA rédige la réponse

### Type 3 — Workflow de veille
Sources RSS + réseaux → agrégation automatique → IA filtre le pertinent → IA résume → newsletter interne

### Type 4 — Workflow commercial
Lead entrant → IA qualifie et enrichit → IA personnalise l'approche → humain valide → IA rédige l'email → envoi

> 💡 **Le principe "Human in the Loop" :** Pour toute action importante ou irréversible (envoyer un email, publier du contenu, prendre une décision), garde un humain dans la boucle pour valider. L'IA prépare, l'humain décide.

## Construire ton premier workflow — méthode en 5 étapes

### Étape 1 — Identifier le processus
Quelle tâche répétitive te coûte le plus de temps ? Commence là.

### Étape 2 — Décomposer
Liste chaque micro-étape. "Traiter les emails de support" devient :
- Lire l'email (2 min)
- Comprendre le problème (3 min)
- Chercher la réponse (10 min)
- Rédiger la réponse (5 min)
- Envoyer (1 min)

### Étape 3 — Identifier les étapes automatisables
Lecture + compréhension + rédaction → IA
Validation + envoi → humain

### Étape 4 — Choisir les outils
- Zapier pour les connexions entre apps
- Claude/ChatGPT pour le traitement intelligent
- Notion/Airtable pour stocker les résultats

### Étape 5 — Tester et affiner
Lance avec un volume faible. Vérifie chaque sortie. Affine les prompts. Augmente le volume progressivement.

> 🔥 **L'erreur classique :** Automatiser un mauvais processus. Avant d'automatiser, optimise le processus manuellement. Un processus cassé automatisé reste cassé — juste plus vite.

## Exemple complet — Workflow de veille IA

**Objectif :** Recevoir chaque mardi matin un résumé des news importantes de ton secteur.

1. Zapier surveille 10 sources RSS de ton secteur (trigger : nouveau article)
2. Chaque article est envoyé à Claude avec le prompt : "En 2 phrases, dis si cet article est pertinent pour [ton métier] et pourquoi"
3. Les articles jugés pertinents sont stockés dans Notion
4. Chaque lundi soir, Claude reçoit tous les articles de la semaine et génère un résumé structuré
5. Zapier envoie ce résumé par email le mardi à 8h

**Temps de setup :** 2-3 heures
**Temps gagné chaque semaine :** 3-4 heures

> ⚡ **À retenir :** Un workflow IA c'est identifier → décomposer → automatiser les étapes répétitives → garder l'humain pour les décisions importantes. Commence par ton problème le plus douloureux.`,
}

for(const [slug, content] of Object.entries(contents)) {
  await p.lesson.update({ where: { slug }, data: { content } })
  console.log(`✅ ${slug} mis à jour`)
}

console.log('Contenu chapitre 6 ajouté !')
await p.$disconnect()
