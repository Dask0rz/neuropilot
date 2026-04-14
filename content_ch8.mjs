import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const contents = {
  'c8-l1': `# Projet : Assistant Personnel

*Imaginons deux collègues. Même poste, même expérience, même entreprise.*

*Le premier utilise l'IA comme une calculatrice — il lui pose des questions simples et accepte les réponses telles quelles.*

*Le second a construit un assistant IA personnalisé qui connaît son contexte, son style, ses projets. Il délègue des tâches entières.*

*En 6 mois, le second a pris une longueur d'avance spectaculaire.*

*Ce chapitre, c'est le guide pour devenir le second.*

## Qu'est-ce qu'un assistant IA personnel ?

Ce n'est pas juste "utiliser ChatGPT". C'est construire une **relation de travail** avec une IA qui comprend ton contexte, tes préférences et tes objectifs.

La différence entre un outil et un assistant, c'est la **personnalisation**.

## Les 3 niveaux d'un assistant personnel

### Niveau 1 — L'assistant de base
Tu lui expliques ton contexte à chaque conversation.
"Je suis directeur marketing dans une startup B2B SaaS, voici mon problème..."

Efficace mais répétitif.

### Niveau 2 — L'assistant avec mémoire de session
Tu construis un "prompt de contexte" que tu colles au début de chaque conversation importante.

Exemple de prompt de contexte personnel :
"Tu es mon assistant personnel. Contexte : Je m'appelle [prénom], je suis [poste] chez [entreprise], spécialisée dans [domaine]. Mon style de communication est [direct/chaleureux/formel]. Mes priorités actuelles sont [liste]. Mes contraintes : [budget, délai, équipe]. Quand tu rédiges pour moi, utilise toujours [ton spécifique]."

### Niveau 3 — L'assistant agentique
L'IA peut agir — envoyer des emails, mettre à jour un CRM, chercher des informations, créer des tâches. Outils comme Zapier, Make, ou des plateformes comme n8n avec des LLMs.

> 💡 **Par où commencer ?** Niveau 2. Crée ton prompt de contexte personnel aujourd'hui. 15 minutes d'investissement, des mois de gains.

## Construire ton prompt de contexte

Un bon prompt de contexte couvre :

**Qui tu es :** Ton rôle, ton secteur, ton entreprise
**Ton style :** Comment tu communiques, ton ton préféré
**Tes objectifs :** Ce que tu essaies d'accomplir en ce moment
**Tes contraintes :** Ce que l'IA doit toujours garder en tête
**Tes préférences de format :** Comment tu veux les réponses

> 🔥 **Exercice pratique :** Ouvre Claude ou ChatGPT maintenant. Écris ton prompt de contexte en 10 lignes. Sauvegarde-le dans un fichier Notes. Utilise-le systématiquement.

## Les tâches à déléguer en priorité

Commence par les tâches qui cumulent : répétitives + chronophages + faible valeur ajoutée.

Top 5 des délégations à fort impact :
1. Premier jet de tous tes emails importants
2. Résumés de documents longs
3. Préparation d'ordres du jour
4. Recherches et synthèses d'information
5. Reformulation et amélioration de textes

> ⚡ **À retenir :** Un assistant IA personnel se construit progressivement. Commence par un prompt de contexte solide. Délègue d'abord les tâches répétitives. Augmente progressivement la sophistication.`,

  'c8-l2': `# Projet : Veille Automatique

*Un fondateur de startup passait 2 heures chaque matin à lire les newsletters, surveiller ses concurrents, et suivre les tendances de son secteur.*

*Après avoir mis en place une veille automatisée avec l'IA, il reçoit chaque mardi à 8h un digest de 2 pages avec tout ce qui compte. Les 2 heures quotidiennes sont devenues 15 minutes de lecture.*

*Voici comment reproduire ça.*

## Pourquoi automatiser sa veille ?

La surcharge informationnelle est réelle. Des centaines d'articles, newsletters, tweets, posts LinkedIn arrivent chaque jour. Tout lire est impossible. Ne rien lire, c'est se déconnecter.

La veille automatisée IA résout ce problème : **elle filtre, résume et priorise** pour toi.

## Architecture d'un système de veille IA

### Les sources (inputs)
- Flux RSS de blogs et médias spécialisés
- Newsletters (transférées vers un dossier dédié)
- Google Alerts sur tes mots-clés
- Mentions de ta marque et tes concurrents sur les réseaux
- Podcasts (avec transcription automatique)

### Le traitement IA (cerveau)
Pour chaque contenu entrant, l'IA évalue :
- Est-ce pertinent pour mon secteur / mes intérêts ?
- Quel est le niveau d'importance (1-3) ?
- Résumé en 2-3 phrases

### La sortie (output)
- Digest hebdomadaire structuré
- Alertes immédiates pour les nouvelles critiques
- Base de connaissances enrichie

> 💡 **L'outil clé : Perplexity AI** pour la recherche en temps réel. Zapier ou Make pour l'automatisation. Claude ou GPT-4 pour l'analyse et la synthèse.

## Construire ta veille en 3 étapes

### Étape 1 — Définir tes besoins (30 min)
- Quels sujets dois-je absolument suivre ?
- Quels concurrents surveiller ?
- Quels signaux faibles m'intéressent ?
- Quelle fréquence : quotidien, hebdomadaire ?

### Étape 2 — Configurer les sources (1h)
- Identifie 10-15 sources de qualité dans ton domaine
- Configure Google Alerts pour tes mots-clés importants
- Crée un dossier email dédié pour les newsletters

### Étape 3 — Automatiser avec Zapier + IA (2-3h)
- Zapier surveille tes sources (nouveau article RSS = trigger)
- Envoie chaque article à Claude avec le prompt d'évaluation
- Les articles pertinents sont stockés dans Notion ou Airtable
- Chaque vendredi, Claude génère le digest de la semaine
- Zapier envoie le digest par email le lundi matin

> 🔥 **Le prompt d'évaluation :**
> "Tu es analyste spécialisé en [ton secteur]. Évalue cet article :
> 1. Pertinence pour [ton métier] : oui/non + raison en 1 phrase
> 2. Si oui, importance : haute / moyenne / faible
> 3. Résumé en 2 phrases
> 4. Action recommandée si applicable"

## Le prompt du digest hebdomadaire

"Tu es mon analyste personnel. Voici les articles que j'ai collectés cette semaine dans mon secteur [secteur].

Génère un digest structuré :
1. Top 3 des actualités les plus importantes et pourquoi
2. Les tendances émergentes à surveiller
3. Ce que font mes concurrents (si mentionné)
4. Une opportunité ou menace à ne pas manquer
5. Les 3 ressources à lire en priorité

Format : concis, actionnable, langage direct. Pas plus d'une page."

> ⚡ **À retenir :** Une veille automatisée te fait gagner des heures par semaine tout en restant mieux informé. L'investissement initial (2-3h de setup) est rentabilisé dès la première semaine.`,

  'c8-l3': `# Projet : Rédaction Augmentée

*Une consultante en stratégie devait livrer 3 livrables par semaine : une note de synthèse, un deck de recommandations, et un compte-rendu de réunion.*

*Avant l'IA : 12-15 heures de travail.
Après l'IA : 4-5 heures. Même qualité, souvent meilleure.*

*Son secret ? Pas de la paresse. Un workflow rigoureux.*

## Le mythe à déconstruire

"Utiliser l'IA pour écrire, c'est tricher."

Non. Utiliser Word pour écrire, c'est "tricher" par rapport à la machine à écrire. Utiliser la machine à écrire, c'est "tricher" par rapport à la plume.

Les outils évoluent. La valeur ajoutée de l'humain évolue avec eux.

> 💡 **La vraie question :** Où est ta valeur ajoutée unique ? Dans la frappe de mots ou dans la réflexion stratégique, le jugement et la relation client ? L'IA te libère pour ce qui compte vraiment.

## Le workflow de rédaction augmentée en 5 étapes

### Étape 1 — Le brief (5 min, 100% humain)
Définir clairement :
- Quel est l'objectif de ce document ?
- Qui va le lire et quel est leur niveau ?
- Quel résultat veux-tu obtenir après lecture ?
- Quelles informations clés dois-je absolument inclure ?
- Quel ton et format ?

> 🔥 **Le brief est la partie la plus importante.** Un mauvais brief donne un mauvais résultat même avec la meilleure IA. Garbage in, garbage out.

### Étape 2 — La génération du premier jet (2 min, IA)
Envoie ton brief à l'IA avec le prompt adapté. Laisse-la générer sans interrompre.

### Étape 3 — L'évaluation critique (10 min, humain)
Lis le premier jet. Identifie :
- Ce qui est bon et à garder
- Ce qui manque ou est inexact
- Ce qui ne correspond pas à ton style ou contexte
- Les hallucinations potentielles à vérifier

Ne corrige pas encore — note seulement.

### Étape 4 — L'itération (5-10 min, humain + IA)
Envoie tes feedbacks précis à l'IA :
"Le paragraphe 2 est trop générique. Ajoute un exemple concret sur [sujet spécifique]."
"La conclusion est faible. Reformule avec un appel à l'action plus direct."
"Le ton est trop formel pour notre audience. Allège."

### Étape 5 — La finalisation (10 min, humain)
Révision finale, personnalisation avec tes anecdotes et ton vécu, vérification des faits, ajustements de style.

> 💡 **Ce que l'IA ne peut pas faire :** Tes expériences personnelles, tes insights uniques, ta relation avec le lecteur, ta signature stylistique. C'est ce que tu ajoutes à l'étape 5.

## Types de documents et prompts associés

### Note de synthèse
"Tu es consultant senior. Synthétise les informations suivantes [data] en une note de 500 mots pour un comité de direction. Structure : situation actuelle, enjeux clés, recommandation, prochaines étapes."

### Email de proposition commerciale
"Tu es expert en vente B2B. Rédige une proposition par email à [profil client] pour [offre]. Ton : professionnel mais chaleureux. Objectif : obtenir un rendez-vous. Max 200 mots."

### Compte-rendu de réunion
"Voici mes notes de réunion [notes brutes]. Structure-les en compte-rendu formel : participants, objectifs, décisions prises, actions et responsables, prochaine réunion."

> ⚡ **À retenir :** La rédaction augmentée multiplie ta productivité par 3 à 5. La clé : un brief précis, une évaluation critique, une itération ciblée. Ta valeur ajoutée reste irremplaçable — l'IA s'occupe de la structure et du volume.`,

  'c8-l4': `# Projet : Analyse de Données

*Une responsable marketing reçoit chaque mois un export Excel de 5 000 lignes de données clients. Pendant 2 ans, elle passait une journée entière à le décortiquer.*

*Depuis qu'elle utilise ChatGPT Advanced Data Analysis, elle pose ses questions en français et obtient graphiques et insights en 20 minutes.*

*"C'est comme avoir un data scientist disponible 24h/24."*

## L'analyse de données par l'IA — ce qui a changé

Avant : analyser des données nécessitait de savoir utiliser Excel avancé, SQL, ou Python.

Maintenant : tu uploads tes données et tu poses tes questions en langage naturel.

> 💡 **Les outils clés :**
> - ChatGPT avec Advanced Data Analysis (Code Interpreter)
> - Claude avec upload de fichiers
> - Ces deux outils peuvent lire CSV, Excel, et répondre en générant du code Python qu'ils exécutent eux-mêmes

## Projet pratique — Analyser ses données clients

### Étape 1 — Préparer les données
Avant d'uploader :
- Anonymise les données personnelles (remplace noms/emails par des IDs)
- Vérifie que le fichier est propre (pas de lignes vides, headers clairs)
- Identifie les questions auxquelles tu veux répondre

### Étape 2 — Uploader et contextualiser
"Voici un export de mes données de ventes sur 12 mois. Je suis responsable marketing d'une boutique e-commerce. Les colonnes sont : date, produit, catégorie, montant, région, canal d'acquisition."

### Étape 3 — Poser tes questions analytiques

**Questions de performance :**
- "Quels sont les 10 produits les plus vendus et leur évolution sur les 3 derniers mois ?"
- "Quel canal d'acquisition génère le meilleur revenu par client ?"
- "Y a-t-il des anomalies ou pics inhabituels dans ces données ?"

**Questions de tendance :**
- "Quelle est la tendance générale des ventes sur l'année ?"
- "Y a-t-il une saisonnalité marquée ?"
- "Quelles régions sont en croissance vs en déclin ?"

**Questions de segmentation :**
- "Segmente mes clients en groupes selon leur comportement d'achat"
- "Quel est le profil du client qui génère le plus de valeur ?"

### Étape 4 — Demander des visualisations
"Génère un graphique en barres montrant les ventes mensuelles par catégorie de produit"
"Crée une heatmap des ventes par région et par mois"

> 🔥 **Le prompt d'analyse complète :**
> "Tu es data analyst senior. Analyse ces données et fournis :
> 1. Un résumé exécutif en 5 points (2-3 phrases chacun)
> 2. Les 3 insights les plus importants que je ne vois peut-être pas
> 3. Les 2-3 anomalies ou points d'attention
> 4. 3 recommandations actionnables basées sur les données
> 5. Les limites de cette analyse (ce que les données ne permettent pas de conclure)"

## Précautions essentielles

**Vérifier les calculs :** L'IA peut faire des erreurs sur des calculs complexes. Spot-check les chiffres importants.

**Corrélation ≠ causalité :** L'IA peut identifier des corrélations. L'interprétation causale reste humaine.

**Confidentialité :** Ne jamais uploader des données clients identifiables sur des plateformes publiques.

> ⚡ **À retenir :** L'analyse de données par l'IA démocratise la data science. Prépare bien tes données, contextualise, pose des questions précises, vérifie les résultats importants. La valeur reste dans l'interprétation — pas dans les calculs.`,

  'c8-l5': `# Certification NeuroPilot

*Tu es arrivé jusqu'ici. Ce n'est pas anodin.*

*Beaucoup commencent des formations sur l'IA. Peu les terminent. Toi, tu l'as fait.*

*Ce dernier module n'est pas juste un quiz. C'est une invitation à réfléchir à ce que tu vas faire de tout ça.*

## Ce que tu sais maintenant

Tu as parcouru un sacré chemin depuis la leçon 1.

**Les fondations :** Tu comprends ce qu'est vraiment l'IA, comment elle apprend, pourquoi elle peut se tromper. Tu ne te laisses plus impressionner par le marketing autour de l'IA — tu vois ce qu'il y a derrière.

**La technique :** Tu sais ce que sont les réseaux de neurones, les LLMs, les tokens, le fine-tuning, le RAG. Pas pour programmer — pour comprendre les possibilités et les limites.

**Le pratique :** Tu maîtrises le prompt engineering, les outils IA professionnels, l'automatisation, l'analyse de données. Tu peux passer à l'action immédiatement.

**Le critique :** Tu comprends les biais, les hallucinations, les enjeux de vie privée, l'impact sur l'emploi. Tu utiliseras l'IA avec discernement.

> 💡 **La compétence méta que tu as développée :** Apprendre sur l'IA avec l'IA. Cette capacité d'auto-formation accélérée est peut-être la plus précieuse de toutes.

## Les 3 niveaux d'utilisateur IA

### Niveau 1 — Le consommateur
Il utilise ChatGPT occasionnellement pour des tâches simples. Il accepte les réponses sans esprit critique. Il ne comprend pas vraiment ce qui se passe.

### Niveau 2 — Le praticien
Il a des workflows établis. Il sait prompter efficacement. Il connaît les limites des outils. Il intègre l'IA dans son quotidien professionnel.

### Niveau 3 — L'orchestrateur
Il conçoit des systèmes où humains et IA travaillent ensemble. Il voit les opportunités d'automatisation que les autres ne voient pas. Il forme et inspire ses équipes.

> 🔥 **Où en es-tu ?** Ce parcours t'a amené du niveau 1 vers le niveau 2. Le niveau 3 se construit avec la pratique — en expérimentant, en échouant, en affinant.

## Ce qui va changer dans les 24 prochains mois

L'IA évolue à une vitesse sans précédent. Ce que tu as appris reste valable — les fondamentaux ne changent pas — mais les capacités s'étendent.

À surveiller :
- Les agents IA autonomes (l'IA qui agit, pas juste qui répond)
- La multimodalité (texte, image, audio, vidéo dans un seul modèle)
- L'IA embarquée (dans ton téléphone, ton ordinateur, tes appareils)
- La personnalisation extrême (des LLMs formés spécifiquement pour toi)

## Ta feuille de route post-certification

**Cette semaine :** Identifie la tâche qui te coûte le plus de temps. Crée un workflow IA pour l'accélérer.

**Ce mois :** Maîtrise un nouvel outil IA dans ton domaine. Partage ce que tu apprends avec un collègue.

**Ce trimestre :** Automatise un processus complet. Construis ta bibliothèque de prompts personnels.

**Cette année :** Deviens la personne référente sur l'IA dans ton équipe ou ton organisation.

> 💡 **Le secret des meilleurs utilisateurs d'IA :** Ils traitent l'IA comme un partenaire, pas comme un outil. Ils lui donnent du contexte, itèrent, apprennent de leurs erreurs avec elle. La relation s'améliore avec la pratique.

## Le mot de la fin

L'intelligence artificielle n'est pas une menace pour ceux qui la comprennent. C'est le plus puissant multiplicateur de compétences jamais créé.

Tu as maintenant les bases pour piloter ton futur avec l'IA — pas pour subir la transformation, mais pour la conduire.

La question n'est plus "est-ce que l'IA va changer mon métier ?"

La question est : **"Qu'est-ce que je vais créer avec elle ?"**

> ⚡ **Félicitations. Tu es certifié NeuroPilot. Le vrai apprentissage commence maintenant.**`,
}

for(const [slug, content] of Object.entries(contents)) {
  await p.lesson.update({ where: { slug }, data: { content } })
  console.log(`✅ ${slug} mis à jour`)
}

console.log('Contenu chapitre 8 ajouté ! 🎉 Parcours complet !')
await p.$disconnect()
