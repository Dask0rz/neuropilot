import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const contents = {
  'c4-l1': `# Qu'est-ce qu'un LLM ?

*En novembre 2022, OpenAI lance ChatGPT. En 5 jours, 1 million d'utilisateurs. En 2 mois, 100 millions. Jamais dans l'histoire de la tech une technologie n'avait été adoptée aussi vite.*

*Derrière cette révolution : les Large Language Models.*

## LLM — Large Language Model

**Large :** Des milliards, parfois des centaines de milliards de paramètres.

**Language :** Spécialisé dans le texte — comprendre et générer du langage naturel.

**Model :** Une fonction mathématique entraînée sur des données.

> 💡 **GPT-4 aurait environ 1 800 milliards de paramètres.** Pour comparaison, le cerveau humain a environ 100 000 milliards de synapses. On s'approche, dans les ordres de grandeur.

## Comment un LLM est-il entraîné ?

### Phase 1 — Pré-entraînement
Le modèle lit des centaines de milliards de mots : internet, livres, articles, code, Wikipedia...

Sa tâche : **prédire le mot suivant.** Simple en apparence, extraordinaire en pratique. Pour bien prédire le mot suivant dans "La capitale de la France est ___", il faut comprendre la géographie. Dans "2 + 2 = ___", il faut comprendre les maths.

En apprenant à prédire, le modèle apprend implicitement le langage, les faits, le raisonnement.

### Phase 2 — Fine-tuning et RLHF
Le modèle pré-entraîné sait prédire des mots mais pas forcément être utile ou sûr. On l'affine avec des retours humains (RLHF — Reinforcement Learning from Human Feedback) pour qu'il soit plus utile, précis et moins dangereux.

> 🔥 **L'émergence :** Au-delà d'une certaine taille, les LLMs développent des capacités que personne n'avait prévues — raisonnement logique, résolution de problèmes, code, traduction. Ces capacités "émergent" de la taille. C'est l'un des phénomènes les plus fascinants et les moins compris de l'IA actuelle.

## Ce que les LLMs font vraiment

Ils ne "comprennent" pas au sens humain. Ils sont extraordinairement bons pour trouver les patterns statistiques dans le langage.

Quand tu poses une question, le LLM génère la réponse la plus statistiquement cohérente avec tout ce qu'il a appris.

> ⚡ **À retenir :** Un LLM apprend en prédisant le mot suivant sur des milliards de textes. Cette tâche simple force une compréhension profonde du langage, des faits et du raisonnement.`,

  'c4-l2': `# GPT et ses Cousins

*Il était une fois une technologie si puissante que les chercheurs qui l'avaient créée ont hésité à la publier. Cette technologie, c'est GPT-2. En 2019, OpenAI craignait qu'elle ne soit utilisée pour générer de la désinformation à grande échelle.*

*Aujourd'hui, on utilise GPT-4 pour écrire des emails.*

## La famille GPT (OpenAI)

**GPT** = Generative Pre-trained Transformer

- **GPT-1 (2018) :** 117 millions de paramètres. Prometteur mais limité.
- **GPT-2 (2019) :** 1,5 milliard. Trop dangereux à publier selon OpenAI... pendant 9 mois.
- **GPT-3 (2020) :** 175 milliards. Le premier choc grand public.
- **GPT-4 (2023) :** Architecture inconnue. Multimodal (texte + images). ChatGPT.

> 💡 **ChatGPT ce n'est pas GPT-4.** ChatGPT est une interface (le produit). GPT-4 est le modèle sous-jacent. C'est comme la différence entre Google Chrome (interface) et le moteur V8 (technologie).

## Claude (Anthropic)

Créé par Anthropic, fondée en 2021 par d'anciens membres d'OpenAI — dont Dario et Daniela Amodei.

La mission d'Anthropic : développer une IA **sûre et bénéfique**. Claude est conçu avec une attention particulière à la sécurité et à l'honnêteté.

> 🔥 **Ce qui différencie Claude :** Une grande fenêtre de contexte (peut lire de très longs documents), une attention particulière à ne pas halluciner, et une approche de sécurité appelée "Constitutional AI".

## Gemini (Google DeepMind)

Google avait les meilleurs chercheurs en IA depuis des années. L'arrivée de ChatGPT les a forcés à accélérer.

Gemini est nativement multimodal — conçu dès le début pour comprendre texte, images, audio et vidéo simultanément. Intégré à tous les produits Google.

## Les autres acteurs

- **Llama (Meta) :** Open source — téléchargeable et utilisable localement
- **Mistral (France) :** Start-up française, modèles efficaces et open source
- **Grok (xAI) :** Le LLM d'Elon Musk, intégré à X (Twitter)

> ⚡ **À retenir :** Chaque LLM a ses forces. Claude excelle en analyse de longs documents. GPT-4 est très polyvalent. Gemini est intégré à l'écosystème Google. Utiliser le bon outil selon la tâche est une compétence clé.`,

  'c4-l3': `# L'IA qui Crée des Images

*En 2022, un artiste nommé Jason Allen soumet une œuvre générée par Midjourney à un concours d'art. Il gagne le premier prix. Le monde de l'art s'embrase.*

*La question n'était plus "est-ce de l'art ?" mais "qu'est-ce que ça change pour tout le monde ?"*

## Comment fonctionne la génération d'images ?

### Le processus de diffusion

Les modèles modernes (Stable Diffusion, DALL-E, Midjourney) utilisent un processus appelé **diffusion**.

**Phase d'entraînement :**
1. On prend des millions d'images réelles
2. On leur ajoute progressivement du bruit aléatoire jusqu'à obtenir du bruit pur
3. Le réseau apprend à **inverser** ce processus — à enlever le bruit

**Phase de génération :**
1. On part d'une image de bruit aléatoire pur
2. Le réseau enlève progressivement le bruit, guidé par le prompt
3. Après des dizaines d'étapes, une image cohérente émerge

> 💡 **C'est comme regarder une photo se développer** dans un bain chimique — mais en sens inverse, et guidé par tes mots.

## Le rôle du prompt

Le prompt est l'instruction textuelle qui guide la génération. C'est l'interface entre ton imagination et l'IA.

Un prompt efficace pour la génération d'images inclut :
- **Le sujet :** "un chat roux"
- **Le style :** "peinture à l'huile, impressionniste"
- **L'ambiance :** "lumière dorée de coucher de soleil"
- **La qualité :** "4K, détaillé, professionnel"

> 🔥 **Les limites révélatrices :** Les IA de génération d'images ont longtemps eu du mal avec les mains (trop ou trop peu de doigts) et le texte dans les images. Pourquoi ? Parce qu'elles ne "comprennent" pas — elles reproduisent des patterns statistiques. Les mains sont complexes et variables, le texte demande une compréhension symbolique.

## Les 3 grands acteurs

### Midjourney
Réputé pour la qualité artistique et esthétique. Accessible via Discord. Payant.

### DALL-E (OpenAI)
Intégré à ChatGPT. Très bon pour suivre des instructions précises. Meilleur pour les compositions complexes.

### Stable Diffusion
Open source — peut tourner localement sur ton ordinateur. Communauté immense, milliers de modèles spécialisés.

## Les enjeux

- **Droits d'auteur :** Les modèles ont été entraînés sur des images d'artistes sans leur consentement
- **Deepfakes :** Création de fausses images réalistes de personnes réelles
- **Impact sur les métiers :** Illustrateurs, photographes stock, designers

> ⚡ **À retenir :** La génération d'images fonctionne par diffusion — partir du bruit et le débruiter guidé par le prompt. L'IA ne comprend pas ce qu'elle crée, elle reproduit des patterns. Les enjeux éthiques sont réels.`,

  'c4-l4': `# Tokens et Contexte

*Quand tu envoies un message à ChatGPT, ce n'est pas du texte brut qu'il reçoit. C'est une séquence de nombres — les tokens.*

*Comprendre les tokens, c'est comprendre comment les LLMs pensent vraiment.*

## Qu'est-ce qu'un token ?

Un token est l'unité de base du traitement d'un LLM. Ce n'est pas exactement un mot.

**Règle approximative :** 1 token ≈ 0,75 mot en anglais (un peu moins en français)

Exemples :
- "Bonjour" → 1 token
- "intelligence" → 1 token
- "artificielle" → 2 tokens (artifi + cielle)
- "ChatGPT" → 2 tokens
- " Paris" → 1 token (avec l'espace)

> 💡 **Pourquoi des tokens et pas des mots ?** Les tokens permettent de gérer les mots inconnus, les langues rares, le code et les caractères spéciaux. "décomposabilité" peut être découpé en sous-unités connues.

## La fenêtre de contexte

La fenêtre de contexte est la quantité maximale de tokens que le LLM peut "voir" en même temps.

C'est la **mémoire de travail** du modèle.

| Modèle | Contexte approximatif |
|--------|----------------------|
| GPT-3.5 | 16 000 tokens (~12 000 mots) |
| GPT-4 | 128 000 tokens (~96 000 mots) |
| Claude 3 | 200 000 tokens (~150 000 mots) |

> 🔥 **200 000 tokens, c'est environ 500 pages de livre.** Claude peut lire et analyser un roman entier en une seule conversation.

## Ce qui se passe quand le contexte est plein

Au-delà de la limite, le modèle "oublie" les premières parties de la conversation. Il ne peut pas voir ce qui est en dehors de sa fenêtre.

C'est pourquoi dans de très longues conversations, un LLM peut sembler "oublier" ce qui a été dit au début.

## Le coût des tokens

Les API LLM facturent généralement au token — à l'entrée (input) et à la sortie (output).

Plus ton prompt est long, plus ça coûte. Optimiser ses prompts, c'est aussi optimiser ses coûts.

## La date de coupure (Knowledge Cutoff)

Les LLMs sont entraînés sur des données jusqu'à une certaine date. Après cette date, ils ne savent rien.

> ⚡ **Conséquence pratique :** Si tu demandes à ChatGPT des infos sur un événement récent, il ne sait peut-être pas. Toujours vérifier les dates importantes avec des sources à jour.`,

  'c4-l5': `# Le Fine-Tuning

*Imagine un médecin généraliste brillant. Il sait tout sur la médecine en général. Mais pour des chirurgies cardiaques complexes, tu préfères un spécialiste.*

*C'est exactement la logique du fine-tuning.*

## C'est quoi le fine-tuning ?

Le fine-tuning consiste à **ré-entraîner un modèle pré-entraîné** sur un dataset spécifique pour l'adapter à une tâche particulière.

Le modèle de base a déjà appris le langage, le raisonnement, les connaissances générales. Le fine-tuning lui enseigne un domaine ou un style spécifique.

> 💡 **L'analogie parfaite :** Un LLM généraliste c'est un diplômé brillant. Le fine-tuning c'est son stage de spécialisation. Il garde toutes ses compétences générales et acquiert une expertise précise.

## Pourquoi fine-tuner ?

### Spécialisation domaine
- Un LLM médical qui maîtrise la terminologie clinique
- Un LLM juridique formé sur des milliers de contrats
- Un LLM financier entraîné sur des rapports annuels

### Style et ton
- Un assistant qui répond toujours dans le style de ta marque
- Un modèle qui génère du code dans les conventions de ton équipe

### Performance sur tâche spécifique
- Classification de documents dans tes catégories métier
- Extraction d'informations structurées de tes formulaires

> 🔥 **L'énorme avantage :** Entraîner GPT-4 from scratch coûterait des dizaines de millions de dollars. Le fine-tuner coûte quelques centaines à quelques milliers de dollars. On part des épaules d'un géant.

## Le RAG — une alternative au fine-tuning

**RAG = Retrieval Augmented Generation**

Plutôt que de modifier le modèle, on lui donne accès à une base de données externe au moment de la réponse.

### Comment ça marche
1. L'utilisateur pose une question
2. Le système cherche les documents pertinents dans ta base
3. Ces documents sont injectés dans le prompt
4. Le LLM génère une réponse basée sur ces documents

> 💡 **Fine-tuning vs RAG :**
> - Fine-tuning : la connaissance est dans le modèle (comme la mémoire à long terme)
> - RAG : la connaissance est dans une base externe (comme chercher dans ses notes)
> - RAG est plus flexible (mise à jour facile) mais plus complexe
> - Fine-tuning est plus rapide à l'inférence mais figé

## Quand choisir quoi ?

**Fine-tuning :** Pour apprendre un style, un format, un comportement spécifique.

**RAG :** Pour accéder à des connaissances spécifiques, mises à jour fréquemment (documentation, base de connaissances).

**Les deux combinés :** Pour les applications professionnelles sérieuses.

> ⚡ **À retenir :** Le fine-tuning spécialise un modèle généraliste à moindre coût. Le RAG connecte un LLM à des données externes fraîches. Les deux sont complémentaires.`,
}

for(const [slug, content] of Object.entries(contents)) {
  await p.lesson.update({ where: { slug }, data: { content } })
  console.log(`✅ ${slug} mis à jour`)
}

console.log('Contenu chapitre 4 ajouté !')
await p.$disconnect()
