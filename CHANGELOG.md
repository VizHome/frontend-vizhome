# Changelog

## [0.3.0](https://github.com/VizHome/frontend-vizhome/compare/v0.2.0...v0.3.0) (2026-06-09)


### ✨ Features

* add Bash commands for workflow results and update npm version ([030aebb](https://github.com/VizHome/frontend-vizhome/commit/030aebbd331cb5621ea60785d210404df8d368f5))
* ajouter des commandes Bash pour afficher les résultats des exécutions de workflows ([6e48533](https://github.com/VizHome/frontend-vizhome/commit/6e48533c7b9afd0459223e0467a0d6139c56025a))
* ajouter des commandes Bash pour la gestion des dépendances et l'intégration continue ([ec6bc49](https://github.com/VizHome/frontend-vizhome/commit/ec6bc495a27ad80623a925b78569496225f3271f))
* ajouter une commande Bash pour exécuter un script Node.js et corriger la syntaxe de la commande Python ([c1b7b48](https://github.com/VizHome/frontend-vizhome/commit/c1b7b4855ea4c54827891fea39780a16ad365133))
* enhance user experience with refactor, fixes, and Bash commands ([818006d](https://github.com/VizHome/frontend-vizhome/commit/818006d76e3468aef52d3d0e5c3b73ce429eba53))


### 🐛 Bug fixes

* corriger les commentaires pour la conformité des noms d'hôte en minuscules dans le workflow de publication Docker ([1746409](https://github.com/VizHome/frontend-vizhome/commit/1746409ed1e5c41d31d995d29e19416b9d2e40fb))
* **types:** resolve typecheck errors in useSSE and nuxt.config.analyze ([901358f](https://github.com/VizHome/frontend-vizhome/commit/901358fe8ec7662726a1929128354106c14ce5c7))
* **vitest:** exclude tests/e2e/** from unit test scan ([e72da96](https://github.com/VizHome/frontend-vizhome/commit/e72da9618c3cee96d14e4b7f9b74bede199c657c))


### ♻️ Refactoring

* remove Sentry integration and update observability documentation ([692fc8f](https://github.com/VizHome/frontend-vizhome/commit/692fc8fede32f0bfa1615e10befdeb2bded5c1ae))

## [0.2.0](https://github.com/VizHome/frontend-vizhome/compare/v0.1.0...v0.2.0) (2026-06-07)


### ✨ Features

* **accessibility:** ajouter des préférences d'accessibilité et des styles associés ([cf55f26](https://github.com/VizHome/frontend-vizhome/commit/cf55f26a32d44498ac89a25b134beac5797ed66c))
* **account:** ajouter un layout pour les pages personnelles de l'utilisateur connecté ([8512f08](https://github.com/VizHome/frontend-vizhome/commit/8512f08249d44695d76ea8f0691448806bd01d70))
* add 2FA setup and verification composable ([59b02da](https://github.com/VizHome/frontend-vizhome/commit/59b02dad96c40b3fe78fe05c5d6a020e78a92a2d))
* add admin audit log, billing, CSV export, forum moderation, and timeline features ([4ca6e58](https://github.com/VizHome/frontend-vizhome/commit/4ca6e58368d4fd80649702e6f2fc8e766cde8633))
* add AI rendering panel and functionality for sketch-based image generation ([daf5de1](https://github.com/VizHome/frontend-vizhome/commit/daf5de10115c5c430db9d935e969b8262e00d8fc))
* add AppSidebar component and integrate into sidebar layout ([0908cc7](https://github.com/VizHome/frontend-vizhome/commit/0908cc7c7745a4c206820f5a879a9200a863f6b1))
* add bundle analysis configuration and script ([4611442](https://github.com/VizHome/frontend-vizhome/commit/46114425fcbb9447ccca466e1839e06ad4462e2b))
* add centralized image catalog and sitemap for VizHome ([6dfc67a](https://github.com/VizHome/frontend-vizhome/commit/6dfc67ae6ee66a3c19299cbe49c90efff361b4c4))
* add Docker support and improve authentication flow ([51415a7](https://github.com/VizHome/frontend-vizhome/commit/51415a709fa03413481be8c9cd9890517dd5bb26))
* add keyboard and toaster components, implement ambient audio and scene elements ([a6cf778](https://github.com/VizHome/frontend-vizhome/commit/a6cf77806f02e9b03c7b7dc24bcf66dbf2a422ac))
* add RangeCalendar navigation buttons and resizable components ([970bdde](https://github.com/VizHome/frontend-vizhome/commit/970bdde9636a131d62e272d601e015e504af2502))
* add scene serializer for Three.js state management ([59b02da](https://github.com/VizHome/frontend-vizhome/commit/59b02dad96c40b3fe78fe05c5d6a020e78a92a2d))
* add screenshot capture functionality and user preferences management ([00409f2](https://github.com/VizHome/frontend-vizhome/commit/00409f2b811e24fcbd5c87ec5f905f495f40bc72))
* add support ticket management system with admin and user interfaces ([163c4a7](https://github.com/VizHome/frontend-vizhome/commit/163c4a75f84aa05aff80e48973b30cb883a398b2))
* add Vitest for unit testing and coverage reporting ([a5226e1](https://github.com/VizHome/frontend-vizhome/commit/a5226e15c54922705d3d7516325ada8331a1a1a9))
* add VSCode extensions configuration for improved development experience ([34944a3](https://github.com/VizHome/frontend-vizhome/commit/34944a3113a9396537a9d70aab7ad4bd20ef2156))
* **admin:** add admin panel with user and render management ([38ea25f](https://github.com/VizHome/frontend-vizhome/commit/38ea25ffbe10fc801cdfc37950624a9de39ea958))
* ajout d'un nouveau membre de l'équipe avec détails et liens sociaux ([5bcd64a](https://github.com/VizHome/frontend-vizhome/commit/5bcd64ad757b60f28f86cf853e7c564c3cee043a))
* ajout d'une section pour importer et gérer des modèles 3D dans la sidebar ([4da2d52](https://github.com/VizHome/frontend-vizhome/commit/4da2d52907c1188a6116643ec7a1a09ef0d94028))
* ajout de la configuration TypeScript, des tests et des optimisations de performance; mise à jour des fichiers de configuration ([20cc3d2](https://github.com/VizHome/frontend-vizhome/commit/20cc3d2203706bfcc1f434b78e42a24ff550d7d7))
* ajout de la page de réinitialisation du mot de passe et mise à jour des liens vers NuxtLink; ajustement des types pour le système de particules ([6048537](https://github.com/VizHome/frontend-vizhome/commit/6048537ffd3d6233c7c87e9a4e241471c0955220))
* ajout de la page de test pour l'API U-Net Transform avec sélection et transformation d'image ([2cbc6df](https://github.com/VizHome/frontend-vizhome/commit/2cbc6dfbf301625f4b3794343e4538e71e50e56f))
* ajouter des commandes Bash pour interagir avec l'API et gérer les projets ([e8c95f3](https://github.com/VizHome/frontend-vizhome/commit/e8c95f33d20c38590c584b44bb713e130d75f751))
* ajouter des commandes cURL pour l'API et améliorer la gestion des erreurs dans useAiRender ([eb638bc](https://github.com/VizHome/frontend-vizhome/commit/eb638bc233d32e00b02bb5744703adda9413f4ae))
* ajouter des commandes pour vérifier et formater le code avec ruff ([66ce17e](https://github.com/VizHome/frontend-vizhome/commit/66ce17e4d9c474d12b25665f6d112ca9e8c0f96c))
* ajouter des dégradés dynamiques pour l'arrière-plan selon le mode jour/nuit et les saisons ([c04ca10](https://github.com/VizHome/frontend-vizhome/commit/c04ca10f4b4097dbb6fd630ed7d6793a9dd4ff57))
* ajouter des fonctionnalités de modération et d'administration, y compris le journal d'audit, la facturation et l'export CSV ([2d4ca2f](https://github.com/VizHome/frontend-vizhome/commit/2d4ca2fabb1b90149ec72181cbde9f9076f1e6cf))
* ajouter des workflows CodeQL, Dependency Review et OSSAR pour l'analyse de sécurité du code ([43d4753](https://github.com/VizHome/frontend-vizhome/commit/43d4753789ee3c04a201dc29878e772e1e01cd90))
* ajouter la configuration de l'URL du site docs dans le composant index ([bed50cd](https://github.com/VizHome/frontend-vizhome/commit/bed50cd1f7ef0b870a23ae8513c44822a0d87ffd))
* ajouter les composants AppNavbar et AppFooter, et supprimer les métadonnées de mise en page des pages ([9832ce6](https://github.com/VizHome/frontend-vizhome/commit/9832ce6d7b6a7a79bbbd81d021803b2596765010))
* ajouter un champ de pseudo public en lecture seule dans le profil utilisateur ([7d8267a](https://github.com/VizHome/frontend-vizhome/commit/7d8267ac767061d690e7f77263fcbe422426ca81))
* ajouter un logger pour remplacer les console.log et améliorer la gestion des erreurs ([bbe101b](https://github.com/VizHome/frontend-vizhome/commit/bbe101befbef0f306ae722d762baceff9ffad902))
* ajouter une étape pour calculer le propriétaire en minuscules dans les workflows de pré-release et de release ([74d9188](https://github.com/VizHome/frontend-vizhome/commit/74d91881934d7a9ad6797790800656a49275d5d1))
* amélioration de la sidebar avec des contrôles personnalisés et une scrollbar améliorée ([6bc88b6](https://github.com/VizHome/frontend-vizhome/commit/6bc88b65863a67f811bb46c94f8fa46430cdff46))
* améliorer la gestion des types et nettoyer le code dans plusieurs composants ([544d8e8](https://github.com/VizHome/frontend-vizhome/commit/544d8e86f50689a25893ab8879c1847f39b168e3))
* **auth:** ajouter le support du flux d'autorisation Google OAuth et gérer les erreurs de connexion ([8f6ec60](https://github.com/VizHome/frontend-vizhome/commit/8f6ec606196fbc29672b813acc34a9003585be19))
* **auth:** améliorer la gestion des notifications pour Google Sign-In et ajouter des messages d'erreur utilisateur ([e4029fc](https://github.com/VizHome/frontend-vizhome/commit/e4029fc6732d2dd599149d98316bf765d4906b75))
* **billing:** ajouter la page de gestion des abonnements et des factures ([c253143](https://github.com/VizHome/frontend-vizhome/commit/c25314384c7e8f534f40e567ed491b4f5d9f23a3))
* **billing:** ajouter un bandeau d'erreur pour les échecs de chargement des données ([53c079c](https://github.com/VizHome/frontend-vizhome/commit/53c079cbbff0a245a905a2b6cd8bbdce1439b8da))
* **ci:** ajouter l'installation des dépendances npm dans l'étape de test ([f509f1d](https://github.com/VizHome/frontend-vizhome/commit/f509f1d91d8243b22561cf61a2fadbc74d7a6937))
* **ci:** ajouter l'installation des dépendances npm dans les étapes de lint, typecheck et build ([c16844b](https://github.com/VizHome/frontend-vizhome/commit/c16844b12242b4d6fec3b38061932eb3fab558af))
* create projects index page with project listing and management features ([59b02da](https://github.com/VizHome/frontend-vizhome/commit/59b02dad96c40b3fe78fe05c5d6a020e78a92a2d))
* create projects management composable with CRUD operations and scene handling ([59b02da](https://github.com/VizHome/frontend-vizhome/commit/59b02dad96c40b3fe78fe05c5d6a020e78a92a2d))
* **docs:** add comprehensive documentation for project structure, architecture, development, deployment, and contribution guidelines ([7e3ac77](https://github.com/VizHome/frontend-vizhome/commit/7e3ac77423270706e9e785b5d67c4443c6da953a))
* **docs:** mettre à jour le README pour corriger des informations et améliorer l'onboarding ([9811ee6](https://github.com/VizHome/frontend-vizhome/commit/9811ee67802d4721f348c419eebfe48c3d7fa614))
* enhance user navigation and dialogs with new profile, stats, and subscription components ([7c8aad3](https://github.com/VizHome/frontend-vizhome/commit/7c8aad3d077318ff3e67ce6098c16b2835ae44f3))
* enhance user subscription management and billing features ([c59b3f5](https://github.com/VizHome/frontend-vizhome/commit/c59b3f5bc841078fbb727fbe160ff98032aafc80))
* implement AI rendering feature with prompt generation and 2D/3D output options ([fa11c53](https://github.com/VizHome/frontend-vizhome/commit/fa11c53c53636f18c068d8b3405558ac5eb8b358))
* implement billing management composable for subscription and invoices ([59b02da](https://github.com/VizHome/frontend-vizhome/commit/59b02dad96c40b3fe78fe05c5d6a020e78a92a2d))
* implement community forum layout and functionality ([5398a3f](https://github.com/VizHome/frontend-vizhome/commit/5398a3fb7a7c7d30e257bd186af10761e303e7e6))
* implement GitHub OAuth callback page for user authentication ([59b02da](https://github.com/VizHome/frontend-vizhome/commit/59b02dad96c40b3fe78fe05c5d6a020e78a92a2d))
* integrate Three.js for 3D rendering with enhanced controls and effects ([f0c7c01](https://github.com/VizHome/frontend-vizhome/commit/f0c7c017a9c2daadb527a78cb2e527cb6c5cfd9b))
* **layout:** remplacer le layout `account` par `app` pour toutes les pages utilisateur et ajuster la structure des pages de galerie et de projets ([f18d9b1](https://github.com/VizHome/frontend-vizhome/commit/f18d9b1f3686b40cf7b4c4525b5d70c759a82228))
* mettre à jour .gitignore pour inclure settings.local.json ([367e784](https://github.com/VizHome/frontend-vizhome/commit/367e7841065d0c93762dedf9a1c8a14fff57005a))
* mettre à jour la configuration Docker et améliorer la documentation de déploiement ([09a994d](https://github.com/VizHome/frontend-vizhome/commit/09a994de601dd9e634e14a3f1964ff5af5ffb31b))
* mettre à jour les dépendances et ajouter un fichier .dockerignore ([554d2a2](https://github.com/VizHome/frontend-vizhome/commit/554d2a233c0d70f1375c83249c0d971f2c3648f7))
* mettre à jour les liens de politique de confidentialité et de conditions d'utilisation dans plusieurs fichiers ([6db348f](https://github.com/VizHome/frontend-vizhome/commit/6db348fb07c1a3be696ebd70ceb0ffed28e015f9))
* mettre à jour les liens sociaux dans le pied de page et supprimer les icônes inutilisées ([2a39fbc](https://github.com/VizHome/frontend-vizhome/commit/2a39fbc74809e108925d45ae5995f9a02cb9bdde))
* **navigation:** 4 modes de navigation 3D avec inertie et visite guidée ([c5ff121](https://github.com/VizHome/frontend-vizhome/commit/c5ff121d1b99b3781009d3f866394e1b826171ab))
* **PromptPanel:** ajouter un bouton pour afficher l'historique des prompts récents ([ed1a22b](https://github.com/VizHome/frontend-vizhome/commit/ed1a22b9933f717cb1f9041f0df03ed36f9a8b58))
* **PromptPanel:** améliorer l'affichage de l'historique avec des onglets et une option pour tout effacer ([c4f34f1](https://github.com/VizHome/frontend-vizhome/commit/c4f34f1667eeef8cbc24246e434d53e154a62e64))
* **readme:** ajouter le logo de VizHome et réorganiser la section des fonctionnalités ([f2d1b96](https://github.com/VizHome/frontend-vizhome/commit/f2d1b965015aafb9e6e0ae30eb7764d2c3401a55))
* refactor imports and clean up unused components in AppNavbar, ThreeControls, useAiRender, and about pages ([26ff0e4](https://github.com/VizHome/frontend-vizhome/commit/26ff0e4ea4e56a9419111991f71dcda8d8d063c4))
* refactor RenderSidebar integration and streamline event handling in index.vue ([977fd67](https://github.com/VizHome/frontend-vizhome/commit/977fd677262eb69141251ae2c574101cbed91c33))
* Refactor sidebar and controls in render page, integrate collapsible components ([d939a22](https://github.com/VizHome/frontend-vizhome/commit/d939a227f66c5b97e64f95475b9bb43a9b713145))
* refactor sidebar to use shadcn-vue components with improved structure and interactivity ([3113194](https://github.com/VizHome/frontend-vizhome/commit/311319405b47df15b348975c6714cb2551257d61))
* remove Unity SDK documentation and update index and render pages ([bb6b44e](https://github.com/VizHome/frontend-vizhome/commit/bb6b44e5e35bd275c720eb147f0ee4ddf4818ade))
* rename project to frontend-vizhome and update dependencies ([ada3f4c](https://github.com/VizHome/frontend-vizhome/commit/ada3f4c3db3381943165c3abdbc301c643e2c9c2))
* **render:** ajouter le composant ToolButton avec support pour les étiquettes et les raccourcis ([fc70878](https://github.com/VizHome/frontend-vizhome/commit/fc70878f01fa14b757e49c9e4215d35d73113d1b))
* **render:** améliorer l'importation de modèles 3D avec mise à l'échelle et centrage de la caméra ([96d7274](https://github.com/VizHome/frontend-vizhome/commit/96d72747cfacd37c4c7144635e5c4efe799a834b))
* **render:** améliorer l'interface utilisateur avec des styles et des éléments visuels mis à jour, et ajouter une fonction pour ajuster la caméra aux modèles importés ([513c564](https://github.com/VizHome/frontend-vizhome/commit/513c5645a141e99051bf1aaf9d830eddcec07509))
* **render:** améliorer l'outil pipette avec un curseur croisé et échantillonnage de couleur ([758ad3f](https://github.com/VizHome/frontend-vizhome/commit/758ad3f92f9c13ec8b64585d439d9890550c5d0f))
* **render:** améliorer l'outil pipette avec un curseur dynamique et un tooltip ([ecb3462](https://github.com/VizHome/frontend-vizhome/commit/ecb34626fe551cd1f29c30da941e1f31597737ca))
* **render:** améliorer la gestion du mode de rendu avec persistance dans localStorage ([33189d4](https://github.com/VizHome/frontend-vizhome/commit/33189d479702c5cf800216871496ac3085dd1c00))
* **render:** enhance 3D mode handling and model loading ([4b706a4](https://github.com/VizHome/frontend-vizhome/commit/4b706a467d5c3737f3f2d7a42a583f49b1aac247))
* **render:** UX refactor — overlays contextuels + sidebar épurée ([d89c83c](https://github.com/VizHome/frontend-vizhome/commit/d89c83cd42d5ad971add0eb2ff3f103614260996))
* **scheduled-tasks:** supprimer le fichier de verrouillage des tâches planifiées ([6d25100](https://github.com/VizHome/frontend-vizhome/commit/6d25100863c1dca4c5b3ba2b78bd504081d3de6d))
* **ServiceNav:** implement horizontal navigation component ([4b706a4](https://github.com/VizHome/frontend-vizhome/commit/4b706a467d5c3737f3f2d7a42a583f49b1aac247))
* **subscription:** améliorer l'interface de changement de plan avec des options cliquables et des confirmations ([03c43be](https://github.com/VizHome/frontend-vizhome/commit/03c43becc1715c682347d9f3e7886de7c7437630))
* **support:** ajouter un layout pour les pages de support et ajuster les composants UserNav ([2717205](https://github.com/VizHome/frontend-vizhome/commit/271720524d983356febbc07c0cae25231547a04a))
* supprimer la clé de projet dans la configuration SonarQube ([e0824df](https://github.com/VizHome/frontend-vizhome/commit/e0824df73558b35df5a104083febf91ce993855c))
* **tests:** add comprehensive unit tests for composables ([ef07a26](https://github.com/VizHome/frontend-vizhome/commit/ef07a266ef0a8b02d01d06aade13be84d6d61f5f))
* **thumbnail:** ajouter la capture et l'upload de miniatures pour les projets sauvegardés ([d893e22](https://github.com/VizHome/frontend-vizhome/commit/d893e22b2866580961558c5f3d0d4419dda67c37))
* **transform:** ajouter des contrôles de transformation pour déplacer, faire pivoter et mettre à l'échelle les modèles 3D ([9269b49](https://github.com/VizHome/frontend-vizhome/commit/9269b4957862f191e17045cab8a1b4097d1a1447))
* **ui:** ajouter un onboarding pour guider les utilisateurs à travers les modes de création ([89dc28d](https://github.com/VizHome/frontend-vizhome/commit/89dc28dcd17e78ae9da1178006f51ffa44c0f1b7))
* update landing page and features for improved user experience ([ba9a11f](https://github.com/VizHome/frontend-vizhome/commit/ba9a11f97254af6dfc750ed430674708794e2199))


### 🐛 Bug fixes

* sync isFirstPerson state via lock/unlock events + pause/resume animation loop ([bded822](https://github.com/VizHome/frontend-vizhome/commit/bded8221635ca0fc74f06dc1bd23f44760131d78))
* **three:** corriger la suppression de modèle qui reste visible ([6ab047d](https://github.com/VizHome/frontend-vizhome/commit/6ab047d4226e465d626e6c88bf3c26849d5fa222))
* **three:** corriger le triangle bleu, la modale OBJ et l'ouverture du panel ([ac42fcd](https://github.com/VizHome/frontend-vizhome/commit/ac42fcdf02586234957690aec968228f587da6d1))
* **three:** corriger les bugs d'import de fichiers 3D et textures ([4b48c74](https://github.com/VizHome/frontend-vizhome/commit/4b48c7418c46a2cc9faea20e493a3139170ec6cb))
* **ui:** supprimer les tailles de bouton inutiles dans les dialogues de facturation et de paramètres ([b1f1d4a](https://github.com/VizHome/frontend-vizhome/commit/b1f1d4a8d99a17d4e9b2d4e0a4a6c74b4f49a3f5))
* update robots.txt to allow all user agents ([5f416d8](https://github.com/VizHome/frontend-vizhome/commit/5f416d8d89bb3b5867b47324c4cd000bbeee1260))
* **UserNav:** corriger la classe du badge de plan pour une meilleure visibilité ([f75c384](https://github.com/VizHome/frontend-vizhome/commit/f75c384aa83f47163e3ba11c76a7c818205de361))
* **useThreeModels:** gérer le nettoyage des éléments d'entrée de fichier en cas d'annulation ([c4f34f1](https://github.com/VizHome/frontend-vizhome/commit/c4f34f1667eeef8cbc24246e434d53e154a62e64))


### ♻️ Refactoring

* **AppSidebar:** simplifier les classes de lien et améliorer la gestion des états actifs ([ba1a3bf](https://github.com/VizHome/frontend-vizhome/commit/ba1a3bff4315060fadb351f2c7bdb539a0a1fe0a))
* consolidate user dialogs into SettingsDialog ([4c4c9e4](https://github.com/VizHome/frontend-vizhome/commit/4c4c9e4cf5b12a033118a1d87ad847be020800d3))
* **UserNav:** supprimer le composant HistoryDialog obsolète ([c4f34f1](https://github.com/VizHome/frontend-vizhome/commit/c4f34f1667eeef8cbc24246e434d53e154a62e64))
