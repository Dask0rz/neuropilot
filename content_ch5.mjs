import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const contents = {
  'c5-l1': `# Qu'est-ce qu'un Prompt ?

*En 2023, des entreprises ont commencé à recruter des "Prompt Engineers" avec des salaires de 200 000$ par an. Pour écrire des instructions à une IA.*

*Ce n'est pas de l'arnaque. C'est la réalité d'une nouvelle compétence qui vaut de l'or.*

## Le prompt — ton interface avec l'IA

Un **prompt** c'est simplement l'instruction que tu donnes à une IA. C'est tout ce que tu tapes dans la zone de texte de ChatGPT ou Claude.

Mais "simplement" est trompeur. La façon dont tu formules cette instruction détermine à 80% la qualité de la réponse.

> 💡 **Analogie :** Demander à un LLM c'est comme déléguer à un stagiaire ultra-compétent mais très littéral. Si tu dis "fais-moi un résumé", il fait un résumé — mais de quelle longueur ? Pour quel public ? Sous quelle forme ? Il ne devinera pas. Tu dois le dire.

## La même question, des résultats radicalement différents

**Prompt basique :** "Explique le machine learning"
→ Réponse générique de 500 mots que tu trouveras sur Wikipedia.

**Prompt avancé :** "Tu es un prof qui explique à des lycéens. Explique le machine learning en 3 paragraphes avec une analogie du quotidien. Termine par 3 questions de réflexion."
→ Réponse parfaitement adaptée, actionnable, prête à utiliser.

*C'est la même IA. C'est le prompt qui fait toute la différence.*

## Pourquoi les LLMs sont si sensibles au prompt ?

Les LLMs génèrent le texte statistiquement le plus probable après ton prompt. Ton prompt est le contexte qui oriente toute la génération.

Un prompt vague → contexte flou → réponse générique
Un prompt précis → contexte riche → réponse ciblée

> 🔥 **Le principe de base :** L'IA ne lit pas dans tes pensées. Elle répond exactement à ce que tu demandes, pas à ce que tu voulais dire. La précision est ta responsabilité.

## Les 4 éléments d'un prompt efficace

### 1. Le rôle
"Tu es expert en..." ou "Agis comme un..."
Oriente le ton, le vocabulaire, l'angle d'approche.

### 2. Le contexte
Les informations de fond nécessaires pour comprendre la demande.

### 3. La tâche
Ce que tu veux exactement — précis, sans ambiguïté.

### 4. Le format
Comment tu veux la réponse — longueur, structure, style.

> ⚡ **À retenir :** Un prompt c'est une instruction à une IA. Sa qualité détermine la qualité de la réponse. Rôle + Contexte + Tâche + Format = prompt efficace.`,

  'c5-l2': `# Techniques de Base

*La différence entre quelqu'un qui utilise l'IA à 20% de ses capacités et quelqu'un qui l'utilise à 80%, c'est souvent juste la connaissance de quelques techniques simples.*

## Technique 1 — Assigner un rôle

Dire à l'IA qui elle est change radicalement ses réponses.

**Sans rôle :** "Aide-moi à négocier mon salaire"
**Avec rôle :** "Tu es coach en négociation avec 20 ans d'expérience en RH. Aide-moi à négocier une augmentation de 15%."

Le rôle active les connaissances du LLM dans ce domaine spécifique et ajuste le registre.

> 💡 **Rôles utiles selon les contextes :**
> - Rédaction : "Tu es rédacteur senior pour un magazine économique"
> - Code : "Tu es développeur senior spécialisé Python"
> - Analyse : "Tu es consultant McKinsey en stratégie"
> - Pédagogie : "Tu es professeur qui explique à des débutants complets"

## Technique 2 — Donner du contexte

Plus le contexte est riche, meilleure est la réponse.

**Mauvais :** "Rédige un email de relance"
**Bon :** "Je suis commercial B2B. J'ai envoyé une proposition à Marie, DRH d'une PME de 50 personnes, il y a 10 jours. Pas de réponse. Rédige une relance professionnelle, ton chaleureux, 3 phrases max."

> 🔥 **Règle d'or :** Donne à l'IA toutes les informations qu'un humain compétent aurait besoin pour faire ce travail. Pas plus, pas moins.

## Technique 3 — Préciser le format de sortie

Sans instruction de format, l'IA choisit elle-même. Sois explicite :
- "Réponds en bullet points"
- "Maximum 100 mots"
- "Format tableau avec colonnes X, Y, Z"
- "Niveau de langage : accessible à un non-spécialiste"

## Technique 4 — Itérer et affiner

Après une première réponse :
- "Rends ça plus concis"
- "Ajoute des exemples concrets"
- "Reformule en style plus formel"
- "Le point 2 n'est pas clair, développe"

> 💡 **L'IA comme partenaire de travail :** Ce n'est pas une machine à réponse unique. C'est un dialogue. Les meilleurs résultats viennent de 3 à 5 échanges d'affinement.

## Technique 5 — Demander une vérification

"Vérifie ta réponse pour t'assurer qu'elle répond bien à ma demande initiale."

Cette simple instruction pousse le modèle à relire et corriger ses propres erreurs.

> ⚡ **À retenir :** Rôle + Contexte + Format + Itération. Ces quatre techniques simples multiplient par 3 la qualité de tes réponses.`,

  'c5-l3': `# Chain of Thought

*Un chercheur de Google a fait une découverte surprenante en 2022 : ajouter trois mots à la fin d'un prompt augmentait la précision de 40% sur des problèmes de raisonnement.*

*Ces trois mots : "Réfléchissons étape par étape".*

## Le problème du raisonnement direct

Les LLMs ont tendance à "sauter aux conclusions" — générer directement une réponse sans montrer leur raisonnement.

Pour des questions simples, ça marche. Pour des problèmes complexes, ça échoue souvent.

## Qu'est-ce que le Chain of Thought ?

Le **Chain of Thought** (CoT) consiste à demander à l'IA de raisonner **étape par étape** avant de donner sa réponse finale.

On force le modèle à "montrer son travail" — comme à l'école en maths.

> 💡 **Pourquoi ça marche ?** En générant le raisonnement intermédiaire, le modèle crée un contexte qui oriente mieux la génération de la conclusion. Chaque étape devient une base pour la suivante.

## Comment l'activer

**Méthode 1 — Instruction directe**
"Réfléchis étape par étape avant de répondre."
"Pense à voix haute, puis donne ta conclusion."

**Méthode 2 — Zero-shot CoT**
Ajouter simplement à la fin : "Réfléchissons étape par étape."

**Méthode 3 — Few-shot CoT**
Montrer des exemples de raisonnement complet avant de poser ta question.

> 🔥 **Cas d'usage parfaits pour le CoT :**
> - Problèmes mathématiques et logiques
> - Analyse de situations complexes
> - Prise de décision avec plusieurs critères
> - Débogage de code
> - Raisonnement juridique ou médical

## Vérifier le raisonnement

L'immense avantage du CoT : tu peux **lire le raisonnement** et identifier où l'IA se trompe.

Si la conclusion est fausse mais le raisonnement jusqu'à l'étape 4 est correct, tu peux dire :
"À l'étape 4, tu as fait une erreur car... Recommence à partir de là."

> ⚡ **À retenir :** "Réfléchis étape par étape" est l'une des instructions les plus puissantes du prompt engineering. Elle transforme un LLM en raisonneur explicite et vérifiable.`,

  'c5-l4': `# Few-Shot Prompting

*Un directeur artistique veut que son IA génère des descriptions de produits dans un style très précis — celui de sa marque, développé sur 10 ans.*

*Il pourrait passer des heures à décrire ce style en mots. Ou il pourrait juste montrer 3 exemples.*

*C'est le few-shot prompting.*

## Zero-shot vs Few-shot

**Zero-shot :** Tu poses la question sans exemple.
"Classe cette review client comme positive, négative ou neutre."
Fonctionne pour des tâches communes. Limité pour des tâches spécifiques.

**Few-shot (1 à 5 exemples) :** Tu montres des exemples du résultat attendu avant ta demande.

> 💡 **Principe :** "Voici comment je veux que tu fasses les choses. Maintenant applique ça à mon cas."

## Structure d'un prompt few-shot

Voici des exemples de [tâche] :

Entrée : [exemple 1 input]
Sortie : [exemple 1 output]

Entrée : [exemple 2 input]
Sortie : [exemple 2 output]

Maintenant, applique le même format :
Entrée : [ton vrai cas]
Sortie :

> 🔥 **Exemple concret — ton de marque :**
> "Voici des exemples de descriptions produits dans notre style :
> Produit : Montre classique → Description : Le temps passe. Certaines pièces restent.
> Produit : Carnet cuir → Description : Pour les idées qui méritent mieux qu'un écran.
> Maintenant, génère une description pour : Agenda 2025."

## Quand utiliser le few-shot ?

**Idéal pour :**
- Formats très spécifiques difficiles à décrire en mots
- Ton de marque ou style éditorial particulier
- Extraction d'informations structurées
- Classification dans des catégories personnalisées

**Pas nécessaire pour :**
- Questions générales de connaissance
- Tâches communes bien comprises par les LLMs

## Ce que le few-shot ne fait PAS

Le few-shot guide le modèle vers le bon format — il ne lui apprend pas de nouvelles connaissances. Les capacités sont fixées pendant l'entraînement. Pour de vraies nouvelles connaissances, il faut du fine-tuning.

> ⚡ **À retenir :** Le few-shot c'est "montre plutôt qu'explique". 2-3 exemples bien choisis valent souvent mieux que 3 paragraphes de description.`,

  'c5-l5': `# Prompts pour le Travail

*Assez de théorie. Voici les prompts qui vont changer ta façon de travailler dès aujourd'hui.*

## Template 1 — L'Email Professionnel

Tu es expert en communication professionnelle.
Contexte : [qui tu es, ton entreprise, la situation]
Destinataire : [nom, fonction, relation]
Objectif : [ce que tu veux obtenir]
Ton souhaité : [formel / chaleureux / direct]
Contrainte : [max X mots, inclure tel élément]
Rédige l'email avec objet, corps et signature.

## Template 2 — La Réunion Efficace

Tu es facilitateur de réunion senior.
Réunion : [sujet et objectif]
Participants : [qui sera là]
Durée : [X minutes]
Résultat attendu : [décision / information / brainstorm]
Génère : 1) Un ordre du jour en 5 points chronométrés 2) Les 3 questions difficiles que je pourrais recevoir 3) Les points de blocage potentiels à anticiper.

## Template 3 — L'Analyse de Document

Tu es consultant senior spécialisé en [domaine].
[Colle le document ici]
Analyse ce document et fournis : 1) Résumé exécutif en 3 phrases 2) Les 5 points clés 3) Les risques ou points d'attention 4) Ta recommandation en une phrase.
Public cible : [décideur / équipe technique / client]

> 💡 **Pour les contrats :** Ajoute "Identifie les clauses potentiellement problématiques et explique pourquoi en langage simple."

## Template 4 — Le Brainstorming Structuré

Tu es expert en [domaine] et créativité appliquée.
Défi : [description précise du problème]
Contraintes : [budget, délai, ressources]
Cible : [qui est concerné]
Génère 10 idées variées, de la plus conventionnelle à la plus créative. Pour chaque idée : titre, description en 2 phrases, avantage principal, risque principal.

## Template 5 — La Veille et Synthèse

Tu es analyste spécialisé en [secteur].
[Colle les articles à analyser]
Synthétise pour un dirigeant occupé : 1) Les 3 tendances majeures 2) Ce que ça change concrètement pour [ton secteur] 3) Les actions à envisager dans les 30 prochains jours.
Format : bullet points, langage direct, zéro jargon.

> 🔥 **Le méta-prompt — quand tu ne sais pas comment prompter :**
> "Je veux accomplir [objectif]. Génère le prompt idéal que je devrais t'envoyer pour obtenir le meilleur résultat. Puis exécute ce prompt."

> ⚡ **À retenir :** Ces templates sont des points de départ. Adapte-les, itère, sauvegarde ceux qui marchent. Ta bibliothèque de prompts est ton actif le plus précieux.`,
}

for(const [slug, content] of Object.entries(contents)) {
  await p.lesson.update({ where: { slug }, data: { content } })
  console.log(`✅ ${slug} mis à jour`)
}

console.log('Contenu chapitre 5 ajouté !')
await p.$disconnect()
