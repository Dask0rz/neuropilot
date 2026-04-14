import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const contents = {
  'c7-l1': `# Les Biais de l'IA

*En 2018, Amazon abandonne un outil de recrutement IA qu'il développait depuis 4 ans. Raison : l'outil pénalisait systématiquement les CV de femmes.*

*Il avait été entraîné sur 10 ans de recrutements historiques — une période où les postes tech étaient massivement occupés par des hommes. L'IA avait appris cette discrimination sans que personne ne s'en rende compte.*

## Qu'est-ce qu'un biais en IA ?

Un biais c'est quand un système d'IA produit des résultats **systématiquement favorables ou défavorables** pour certains groupes de personnes.

Ce n'est pas un bug au sens technique. C'est une conséquence directe des données d'entraînement et des choix de conception.

> 💡 **Principe clé :** L'IA apprend depuis des données créées par des humains. Si ces données reflètent des inégalités historiques, des stéréotypes ou des angles morts — l'IA les apprend et les amplifie.

## Les sources de biais

### 1. Les données d'entraînement
C'est la source principale. Si les données sont biaisées, le modèle sera biaisé.

Exemples réels :
- Les modèles de reconnaissance faciale performent moins bien sur les personnes à peau foncée — les datasets d'entraînement étaient majoritairement composés de visages blancs
- Les modèles de traduction reproduisent des stéréotypes de genre ("nurse" traduit au féminin, "engineer" au masculin)

### 2. Le biais de sélection
Les données collectées ne représentent pas tous les groupes équitablement. Si tes données viennent principalement des États-Unis et d'Europe, ton modèle sera moins performant pour d'autres cultures.

### 3. Le biais de label
Les humains qui étiquettent les données de training introduisent leurs propres biais inconscients.

### 4. Le biais de feedback loop
L'IA prend des décisions → ces décisions influencent les données futures → qui renforcent le biais initial. Un cercle vicieux.

> 🔥 **Exemple de feedback loop :** Un algorithme de récidive criminelle prédit plus de risques pour certaines ethnies → ces personnes sont condamnées plus sévèrement → ce qui confirme les prédictions → qui renforcent le biais.

## Les conséquences réelles

Les biais en IA ne sont pas théoriques. Ils ont des impacts concrets :
- Refus de prêts bancaires selon l'origine
- Algorithmes médicaux moins précis pour certains groupes
- Publicités ciblées discriminatoires
- Systèmes de surveillance déséquilibrés

## Comment réduire les biais

**Diversifier les données :** S'assurer que les données représentent équitablement tous les groupes concernés.

**Équipes diverses :** Des équipes homogènes ont des angles morts homogènes. La diversité dans les équipes IA réduit les biais non détectés.

**Audits réguliers :** Tester les modèles sur différents groupes et mesurer les disparités de performance.

**Transparence :** Documenter les limites connues des modèles et les communiquer aux utilisateurs.

> ⚡ **À retenir :** Les biais viennent principalement des données d'entraînement qui reflètent les inégalités humaines. Ils ont des conséquences réelles. Les réduire demande diversité des données, des équipes, et des audits continus.`,

  'c7-l2': `# Hallucinations et Erreurs

*Un avocat américain utilise ChatGPT pour préparer ses arguments. Il cite plusieurs précédents juridiques fournis par l'IA. Problème : ces précédents n'ont jamais existé. L'IA les avait inventés avec une assurance totale.*

*L'avocat est sanctionné. Le juge est stupéfait. ChatGPT, lui, ne sait pas qu'il a tort.*

## Qu'est-ce qu'une hallucination ?

Une hallucination c'est quand un LLM **génère des informations fausses avec une apparence de confiance**.

Il ne dit pas "je ne sais pas". Il invente une réponse plausible — des citations qui n'existent pas, des faits incorrects, des références fictives — et la présente comme si c'était vrai.

> 💡 **Pourquoi ce mot "hallucination" ?** Comme une hallucination humaine, l'IA "voit" quelque chose qui n'existe pas. La différence : elle ne sait pas que c'est faux.

## Pourquoi les LLMs hallucinent-ils ?

Les LLMs génèrent le texte **statistiquement le plus probable**, pas nécessairement le plus vrai.

Ils n'ont pas de mécanisme de vérification des faits intégré. Ils ne distinguent pas "ce que je sais avec certitude" de "ce qui semble plausible d'après les patterns de mon entraînement".

Quand ils ne savent pas, ils ne disent pas "je ne sais pas" — ils génèrent quelque chose qui ressemble à une réponse correcte.

> 🔥 **Les domaines les plus risqués :**
> - Chiffres et statistiques précises
> - Citations et références bibliographiques
> - Événements récents (après la date de coupure)
> - Informations très spécifiques ou rares
> - Noms propres et détails biographiques

## Comment se protéger

### Règle 1 — Vérifier les informations importantes
Toute information critique (chiffre, date, nom, citation) doit être vérifiée dans une source primaire avant utilisation.

### Règle 2 — Demander des sources
"Cite tes sources pour chaque affirmation." Le modèle sera plus prudent et tu pourras vérifier.

### Règle 3 — Détecter les signaux d'alarme
- Réponses très précises sur des sujets obscurs
- Citations avec auteurs, titres et années très précis
- Chiffres avec beaucoup de décimales
- Descriptions détaillées d'événements récents

### Règle 4 — Utiliser le RAG pour les faits critiques
Pour les applications professionnelles, connecter le LLM à une base de données vérifiée réduit drastiquement les hallucinations.

## Une hallucination utile ?

Parfois, les "hallucinations" sont en fait de la créativité — générer quelque chose qui n'existe pas encore peut être utile pour la fiction, le brainstorming ou l'exploration d'idées.

Le problème c'est quand le modèle ne distingue pas entre "je crée" et "j'informe".

> ⚡ **À retenir :** Les LLMs inventent des faits avec confiance. Pour toute information importante, vérifier dans une source primaire est obligatoire. Le RAG et les demandes de sources aident à réduire le risque.`,

  'c7-l3': `# Vie Privée et Données

*En 2023, Samsung interdit à ses employés d'utiliser ChatGPT après qu'un ingénieur a copié-collé du code source propriétaire dans l'interface. Ce code s'est retrouvé dans les données d'entraînement d'OpenAI.*

*Une seconde d'inattention. Des millions de lignes de code propriétaire exposées.*

## Ce que font vraiment les outils IA avec tes données

### ChatGPT (version gratuite)
Par défaut, OpenAI peut utiliser tes conversations pour améliorer ses modèles. Tu peux désactiver cette option dans les paramètres (Paramètres → Contrôles des données).

### ChatGPT Team/Enterprise
Les données ne sont pas utilisées pour l'entraînement. Meilleure option pour un usage professionnel.

### Claude (Anthropic)
Politique similaire — les conversations peuvent être utilisées pour améliorer les modèles, sauf en version enterprise.

> 💡 **Règle pratique :** Traite l'interface gratuite d'un LLM comme une conversation publique. Ne partage rien que tu ne mettrais pas sur LinkedIn.

## Les données à ne JAMAIS partager avec un LLM public

- Données clients personnelles (noms, emails, téléphones)
- Informations médicales identifiables
- Données financières confidentielles
- Code source propriétaire
- Secrets commerciaux ou stratégiques
- Mots de passe ou clés API
- Informations sous NDA

## Le RGPD et l'IA en Europe

Le **Règlement Général sur la Protection des Données** (RGPD) s'applique à tous les outils IA utilisés sur des données de citoyens européens.

Les obligations clés :
- **Licéité :** Tu dois avoir une base légale pour traiter les données avec l'IA
- **Transparence :** Informer les personnes concernées
- **Minimisation :** N'utiliser que les données nécessaires
- **Droit à l'oubli :** Permettre la suppression des données

> 🔥 **L'AI Act européen** (2024) va plus loin : il classe les systèmes IA par niveau de risque et impose des obligations strictes pour les IA à haut risque (recrutement, crédit, justice, etc.).

## Protéger sa vie privée en pratique

**Anonymisation :** Remplace les noms, emails, numéros par des placeholders avant de soumettre à un LLM. "Jean Dupont, 06 12 34 56 78" devient "CLIENT_A, PHONE_1".

**Versions entreprise :** Pour un usage professionnel régulier, les versions payantes offrent de meilleures garanties.

**Solutions locales :** Des modèles comme Llama peuvent tourner localement — aucune donnée ne quitte ton ordinateur.

**Formation des équipes :** La plupart des fuites de données IA viennent d'employés qui ne savent pas ce qu'ils ne doivent pas partager.

## Le droit à l'oubli — une réalité complexe

Tu peux demander à OpenAI ou Anthropic de supprimer tes données. Mais si tes données ont déjà été utilisées pour l'entraînement, elles sont "intégrées" dans les poids du modèle — pas stockées comme un fichier qu'on peut effacer.

> ⚡ **À retenir :** Les LLMs publics ne sont pas des coffres-forts. Anonymise avant de soumettre, utilise les versions entreprise pour les données sensibles, et forme tes équipes aux bonnes pratiques.`,

  'c7-l4': `# Impact sur l'Emploi

*En 1900, 40% des Américains travaillaient dans l'agriculture. Aujourd'hui, c'est 2% — et ils produisent plus de nourriture que jamais. Les 38% restants ne sont pas au chômage : ils font des métiers qui n'existaient pas en 1900.*

*L'IA va provoquer une transformation similaire. La question n'est pas "est-ce que ça va changer ?" mais "comment se préparer ?"*

## Ce que les études disent vraiment

Le rapport McKinsey 2023 estime que 30% des heures de travail actuelles pourraient être automatisées d'ici 2030.

Le rapport du Forum Économique Mondial prédit 85 millions d'emplois déplacés... et 97 millions de nouveaux rôles créés.

> 💡 **Le bilan net serait positif — mais avec une redistribution massive.** Les emplois détruits et créés ne concernent pas les mêmes personnes ni les mêmes régions. C'est là que réside le défi.

## Les emplois les plus exposés

### Forte exposition
- Saisie et traitement de données
- Service client et support niveau 1
- Traduction et transcription standard
- Analyse de documents répétitive
- Comptabilité et paie basiques
- Certaines tâches de création de contenu standard

### Faible exposition
- Soins aux personnes (médecins, infirmiers, aide à domicile)
- Métiers manuels complexes (plombier, électricien, artisan)
- Leadership et management stratégique
- Créativité originale et innovation
- Relations humaines complexes (thérapeutes, négociateurs)
- Enseignement adaptatif

> 🔥 **La règle des 3 R :** Les tâches **Répétitives**, **Routinières** et **Recodifiables** sont les plus menacées. Les tâches qui demandent jugement, empathie et créativité sont les plus résistantes.

## L'augmentation plutôt que le remplacement

La réalité la plus probable n'est pas "l'IA remplace les humains" mais **"les humains augmentés par l'IA remplacent les humains sans IA"**.

Études récentes :
- Les développeurs avec GitHub Copilot sont 55% plus productifs
- Les consultants McKinsey avec accès à GPT-4 produisent un travail 40% meilleur
- Les radiologues avec assistance IA détectent 11% plus de cancers

> 💡 **Nouveau paradigme :** Ce n'est pas "est-ce que l'IA peut faire mon travail ?" mais "comment l'IA peut-elle me rendre meilleur dans mon travail ?"

## Comment se préparer

### Développer des compétences hybrides
Maîtriser les outils IA de ton secteur + renforcer les compétences humaines uniques = profil très recherché.

### Miser sur l'adaptabilité
La demi-vie des compétences techniques est de 2-3 ans. La capacité à apprendre continuellement est plus précieuse que n'importe quelle compétence spécifique.

### Se positionner comme "orchestrateur"
Savoir coordonner humains et IA, déléguer à l'IA ce qu'elle fait mieux, garder le jugement sur ce qui compte.

> ⚡ **À retenir :** L'IA va transformer le travail, pas le supprimer. Les tâches répétitives sont les plus exposées. L'humain augmenté par l'IA surpasse l'humain seul ET l'IA seule. Se former maintenant, c'est prendre 3 ans d'avance.`,

  'c7-l5': `# IA Responsable

*En 2016, Microsoft lance Tay, un chatbot Twitter censé apprendre des conversations avec les humains. En moins de 24 heures, la communauté internet l'a transformé en machine à propos haineux. Microsoft a dû le couper.*

*Leçon : déployer une IA sans garde-fous éthiques, c'est jouer avec le feu.*

## Qu'est-ce que l'IA responsable ?

L'IA responsable c'est développer et déployer des systèmes d'IA qui sont :

- **Transparents :** On peut comprendre comment et pourquoi l'IA prend ses décisions
- **Équitables :** L'IA ne discrimine pas et produit des résultats justes pour tous
- **Sûrs :** L'IA ne cause pas de dommages physiques, psychologiques ou sociaux
- **Respectueux de la vie privée :** Les données sont protégées et utilisées éthiquement
- **Responsables :** Il existe des mécanismes de contrôle et de correction

> 💡 **Ce n'est pas de la philosophie abstraite.** Des entreprises comme Google, Microsoft et Anthropic ont des équipes entières dédiées à l'IA responsable. C'est un impératif business autant qu'éthique.

## Les 5 principes fondamentaux

### 1. La transparence algorithmique
Pouvoir expliquer pourquoi une IA a pris une décision. Crucial quand l'IA prend des décisions qui affectent des vies — crédit, recrutement, justice, médecine.

### 2. L'équité (Fairness)
S'assurer que l'IA performe équitablement pour tous les groupes. Tester systématiquement les disparités.

### 3. La robustesse et la sécurité
L'IA doit fonctionner de façon fiable et résister aux tentatives de manipulation (prompt injection, adversarial attacks).

### 4. La vie privée by design
Intégrer la protection des données dès la conception, pas comme une réflexion après coup.

### 5. La responsabilité humaine
Il doit toujours exister un humain responsable des décisions prises par ou avec l'aide de l'IA.

## L'AI Act européen — la première loi mondiale sur l'IA

Adopté en 2024, l'AI Act classe les systèmes IA en 4 niveaux de risque :

**Risque inacceptable (interdit) :** Scoring social gouvernemental, manipulation subliminale, reconnaissance faciale en temps réel dans les espaces publics (avec exceptions).

**Risque élevé (très encadré) :** IA dans le recrutement, le crédit, la justice, l'éducation, les infrastructures critiques. Obligations strictes de transparence et d'audit.

**Risque limité :** Chatbots (doivent se déclarer comme IA), deepfakes (doivent être étiquetés).

**Risque minimal :** Filtres spam, recommandations. Peu de contraintes.

> 🔥 **L'Europe mène la danse.** Comme pour le RGPD, l'AI Act va probablement influencer les réglementations mondiales. Comprendre ce cadre, c'est comprendre l'avenir de l'IA dans le monde.

## Les deepfakes — un défi éthique majeur

Les deepfakes (vidéos/images/audio falsifiés par l'IA) posent des problèmes sérieux :
- Désinformation et manipulation politique
- Pornographie non consentie
- Fraude et usurpation d'identité
- Atteinte à la réputation

La technologie pour créer des deepfakes réalistes est accessible à tous. La détection reste un défi.

> ⚡ **À retenir :** L'IA responsable c'est transparence + équité + sécurité + vie privée + responsabilité humaine. L'AI Act européen est le premier cadre légal mondial. La technologie avance plus vite que les lois — notre vigilance individuelle est indispensable.`,
}

for(const [slug, content] of Object.entries(contents)) {
  await p.lesson.update({ where: { slug }, data: { content } })
  console.log(`✅ ${slug} mis à jour`)
}

console.log('Contenu chapitre 7 ajouté !')
await p.$disconnect()
