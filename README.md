# 🧠 NeuroPilot — Pilote ton futur avec l'IA

> Application gamifiée d'apprentissage de l'intelligence artificielle, inspirée de Duolingo.

![NeuroPilot](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Prisma](https://img.shields.io/badge/Prisma-SQLite-green)

---

## 🚀 Installation rapide

### Prérequis
- **Node.js 18+** installé ([télécharger](https://nodejs.org))
- **npm** ou **pnpm**

### Étapes

```bash
# 1. Aller dans le dossier du projet
cd neuropilot

# 2. Installer les dépendances
npm install

# 3. Créer la base de données SQLite et charger le contenu pédagogique
npx prisma db push
npm run db:seed

# 4. Lancer l'app en développement
npm run dev
```

Ouvrir **[http://localhost:3000](http://localhost:3000)** dans ton navigateur.

---

## 🎮 Compte de démonstration

| Champ | Valeur |
|-------|--------|
| Email | `demo@neuropilot.app` |
| Mot de passe | `demo1234` |

Ce compte a déjà 5 jours de série, 145 XP, et 6 leçons complétées.

---

## 📦 Stack technique

| Technologie | Rôle |
|------------|------|
| **Next.js 14** (App Router) | Framework fullstack |
| **TypeScript** | Typage statique |
| **Tailwind CSS** | Styling utility-first |
| **Prisma** | ORM + migrations |
| **SQLite** | Base de données locale |
| **NextAuth.js** | Authentification JWT |
| **Zustand** | État global du jeu |
| **Syne + DM Sans** | Polices Google |

---

## 🗂️ Architecture du projet

```
neuropilot/
├── prisma/
│   ├── schema.prisma          # 11 modèles de données
│   └── seed.ts                # Contenu pédagogique initial
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── login/             # Connexion
│   │   ├── register/          # Inscription
│   │   ├── onboarding/        # Configuration initiale (3 étapes)
│   │   ├── dashboard/         # Dashboard principal + sidebar
│   │   ├── chapters/          # Carte des chapitres + détail
│   │   ├── learn/[lessonId]/  # 🎮 Écran de jeu interactif
│   │   ├── review/            # Révisions espacées (SM-2)
│   │   ├── profile/           # Profil + badges
│   │   ├── stats/             # Statistiques visuelles
│   │   └── api/               # 10 routes API REST
│   ├── lib/
│   │   ├── game.ts            # Logique XP, niveaux, SM-2
│   │   ├── auth.ts            # Config NextAuth
│   │   └── utils.ts           # Helpers
│   ├── store/
│   │   └── gameStore.ts       # État Zustand du jeu
│   └── types/                 # Types TypeScript
├── middleware.ts               # Protection des routes
└── .env                        # Variables d'environnement
```

---

## 📚 Contenu pédagogique inclus

| # | Chapitre | Leçons | XP requis |
|---|---------|--------|-----------|
| 1 | 🤖 Découvrir l'IA | 5 | 0 (débloqué) |
| 2 | 📊 Machine Learning | 5 | 80 XP |
| 3 | 🧠 Réseaux de neurones | 5 | 200 XP |
| 4 | ✨ IA Générative | 5 | 350 XP |
| 5 | ✍️ Prompt Engineering | 5 | 500 XP |
| 6 | 💼 L'IA au travail | 5 | 650 XP |
| 7 | ⚖️ Limites & Éthique | 5 | 800 XP |
| 8 | 🛠️ Atelier Projets | 5 | 1000 XP |

---

## 🎯 Fonctionnalités MVP

- ✅ Authentification (inscription / connexion / session)
- ✅ Onboarding 3 étapes (avatar, niveau, objectif)
- ✅ Dashboard avec XP, streak, progression
- ✅ Carte des chapitres avec déblocage progressif
- ✅ Exercices interactifs (QCM, vrai/faux, complétion, ordre)
- ✅ Système de cœurs (5 vies par leçon)
- ✅ Feedback immédiat + explication après chaque réponse
- ✅ Calcul XP avec bonus streak, score parfait
- ✅ Répétition espacée (algorithme SM-2)
- ✅ 8 badges avec déblocage automatique
- ✅ Statistiques et graphique XP hebdomadaire
- ✅ Design dark glassmorphism, responsive mobile/desktop

---

## ⚙️ Variables d'environnement (.env)

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 🔧 Commandes utiles

```bash
npm run dev          # Lancer en développement
npm run build        # Build de production
npm run db:seed      # Réinitialiser les données
npx prisma studio    # Interface visuelle de la DB
npx prisma db push   # Appliquer les changements de schema
```

---

## 🔮 Roadmap V2

- [ ] Génération d'exercices dynamiques via Claude API
- [ ] Classement entre utilisateurs (leaderboard)
- [ ] Notifications / rappels de streak
- [ ] Mode sombre / clair
- [ ] Export des statistiques en PDF
- [ ] API admin pour ajouter du contenu sans toucher au code
- [ ] Partage de badges sur les réseaux sociaux
- [ ] Mode certification avec quiz final

---

## 📝 Licence

MIT — Libre d'utilisation, de modification et de distribution.

---

*NeuroPilot — Pilote ton futur avec l'IA 🚀*
