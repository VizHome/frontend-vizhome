# VizHome - Frontend

<div align="center">
  <img src="./src/public/images/logo/LogoBlack.png" alt="VizHome Logo" width="200" height="200">
  
  <h3>Plateforme de visualisation 3D architecturale propulsée par l'IA</h3>
  
  <p>
    <a href="https://app.vizhome.fr">🌐 Application Live</a> •
    <a href="https://docs.vizhome.fr">📖 Documentation</a> •
    <a href="https://discord.gg/vizhome">💬 Discord</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white" alt="Vue.js">
    <img src="https://img.shields.io/badge/Nuxt.js-3.x-00DC82?style=flat-square&logo=nuxt.js&logoColor=white" alt="Nuxt.js">
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  </p>
</div>

---

## 🚀 À propos

VizHome est une solution SaaS innovante qui transforme vos photos d'intérieur en modèles 3D photoréalistes grâce à l'intelligence artificielle. Notre plateforme permet aux architectes, designers d'intérieur et professionnels de l'immobilier de créer des visualisations 3D exceptionnelles en quelques clics.

### ✨ Fonctionnalités principales

- 🤖 **Génération 3D automatique** - IA avancée pour reconstruction 3D à partir de photos
- 🎨 **Éditeur 3D intégré** - Personnalisation complète des matériaux et objets
- 📱 **Applications mobiles** - iOS et Android avec support AR
- 🔄 **Collaboration en temps réel** - Travail d'équipe et partage client
- 🌐 **Vues 360° et VR** - Expériences immersives
- 📊 **API et SDK complets** - Intégration avec vos outils existants

## 🛠️ Technologies

- **Frontend**: Vue.js 3, Nuxt.js 3, TypeScript
- **Styling**: Tailwind CSS, Radix Vue (composants UI)
- **3D**: Three.js, WebGL
- **État**: Pinia
- **Authentification**: JWT, OAuth 2.0
- **Outils**: Vite, ESLint, Prettier

## 📦 Installation

### Prérequis

- Node.js 18+
- npm/yarn/pnpm
- Git

### Installation locale

```bash
# Cloner le repository
git clone https://github.com/vizhome/frontend-vizhome.git
cd frontend-vizhome

# Installer les dépendances
npm install
# ou
yarn install
# ou
pnpm install

# Copier et configurer les variables d'environnement
cp .env.example .env.local

# Démarrer le serveur de développement
npm run dev
```

### Variables d'environnement

```bash
# .env.local
NUXT_PUBLIC_API_URL=https://api.vizhome.fr/v1
NUXT_PUBLIC_APP_URL=https://app.vizhome.fr
NUXT_PUBLIC_CDN_URL=https://cdn.vizhome.fr
NUXT_API_SECRET=your_api_secret
NUXT_JWT_SECRET=your_jwt_secret
```

## 🚀 Utilisation

### Développement

```bash
# Démarrer en mode développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser la build de production
npm run preview

# Linter et formatter
npm run lint
npm run lint:fix
```

### Déploiement

```bash
# Build et génération statique
npm run generate

# Build pour serveur
npm run build

# Démarrer en production
npm run start
```

## 📁 Structure du projet

```
frontend-vizhome/
├── .nuxt/                    # Fichiers générés par Nuxt
├── assets/                   # Assets non traités (SCSS, images)
├── components/               # Composants Vue réutilisables
│   ├── ui/                  # Composants UI de base
│   ├── layout/              # Composants de mise en page
│   └── features/            # Composants spécifiques aux fonctionnalités
├── composables/             # Composables Vue
├── layouts/                 # Layouts de pages
│   ├── default.vue         # Layout par défaut
│   └── docs.vue            # Layout pour la documentation
├── middleware/              # Middleware Nuxt
├── pages/                   # Pages et routing auto-généré
│   ├── index.vue           # Page d'accueil
│   ├── docs/               # Documentation
│   ├── features/           # Pages fonctionnalités
│   ├── legal/              # Pages légales
│   └── testimonials.vue    # Témoignages
├── plugins/                 # Plugins Nuxt
├── public/                  # Fichiers statiques
├── server/                  # API routes côté serveur
├── stores/                  # Stores Pinia
├── types/                   # Définitions TypeScript
├── utils/                   # Utilitaires et helpers
├── nuxt.config.ts          # Configuration Nuxt
├── tailwind.config.js      # Configuration Tailwind
└── package.json            # Dépendances et scripts
```

## 🎯 Pages principales

### Frontend public

- `/` - Page d'accueil avec présentation
- `/features` - Fonctionnalités détaillées
- `/pricing` - Plans et tarification
- `/testimonials` - Témoignages clients
- `/faq` - Questions fréquentes

### Documentation

- `/docs` - Documentation complète
- `/docs/api` - Référence API
- `/docs/sdk/*` - SDKs (JavaScript, Python, Unity)
- `/docs/interface` - Guide d'interface

### Légal

- `/legal/privacy-policy` - Politique de confidentialité
- `/legal/terms-of-service` - Conditions d'utilisation
- `/legal/data-processing` - Traitement des données

## 🧩 Composants principaux

### Components UI (`components/ui/`)

Bibliothèque de composants basée sur Radix Vue :

- `Button`, `Card`, `Dialog`, `Input`
- `Tabs`, `Accordion`, `Command`
- `Table`, `Alert`, `Badge`

### Layout Components (`components/layout/`)

- `Header` - Navigation principale
- `Footer` - Pied de page
- `Sidebar` - Barre latérale docs

### Feature Components (`components/features/`)

- Composants spécifiques aux fonctionnalités VizHome

## 🔗 API et intégrations

### API Routes

L'application utilise l'API VizHome pour :

- Authentification utilisateur
- Gestion des projets
- Génération de modèles 3D
- Rendus et exports
- Gestion des matériaux

### SDK disponibles

- **JavaScript/TypeScript** - Pour intégrations web
- **Python** - Pour scripts et automatisation
- **Unity** - Pour applications temps réel

## 🧪 Tests

```bash
# Lancer les tests unitaires
npm run test

# Tests e2e avec Playwright
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📚 Documentation

- 📖 [Documentation complète](https://docs.vizhome.fr)
- 🔧 [API Reference](https://docs.vizhome.fr/api)
- 💻 [SDK JavaScript](https://docs.vizhome.fr/sdk/javascript)
- 🐍 [SDK Python](https://docs.vizhome.fr/sdk/python)
- 🎮 [SDK Unity](https://docs.vizhome.fr/sdk/unity)

## 🤝 Contribution

### Guidelines

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

### Standards de code

- Utiliser TypeScript pour tous les nouveaux fichiers
- Suivre les conventions ESLint configurées
- Ajouter des tests pour les nouvelles fonctionnalités
- Documenter les composants complexes

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🆘 Support

- 💬 [Discord Community](https://discord.gg/vizhome)
- 📧 Email: support@vizhome.fr
- 🐛 [GitHub Issues](https://github.com/vizhome/frontend-vizhome/issues)
- 📖 [Documentation](https://docs.vizhome.fr)

## 🙏 Remerciements

- [Vue.js](https://vuejs.org/) - Framework frontend
- [Nuxt.js](https://nuxt.com/) - Meta-framework Vue
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Radix Vue](https://www.radix-vue.com/) - Composants UI
- [Three.js](https://threejs.org/) - Rendu 3D WebGL

---

<div align="center">
  <p>Fait avec ❤️ par l'équipe VizHome</p>
  <p>
    <a href="https://vizhome.fr">Site web</a> •
    <a href="https://twitter.com/vizhome">Twitter</a> •
    <a href="https://linkedin.com/company/vizhome">LinkedIn</a>
  </p>
</div>
