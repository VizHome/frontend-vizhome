<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">SDK JavaScript</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Intégrez VizHome dans vos projets web avec notre SDK JavaScript officiel
      </p>
    </div>

    <!-- Introduction -->
    <Card>
      <CardContent class="pt-6">
        <p>
          Le SDK JavaScript VizHome permet d'intégrer facilement nos services de visualisation 3D dans vos applications
          web.
          Il offre un accès complet à l'API avec une syntaxe simplifiée et des types TypeScript.
        </p>
      </CardContent>
    </Card>

    <!-- Installation -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Installation</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">Installez le SDK via npm ou yarn :</p>

          <Tabs defaultValue="npm" className="mb-6">
            <TabsList>
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="yarn">Yarn</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
            </TabsList>
            <TabsContent value="npm">
              <div className="relative">
                <pre className="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                  <code>npm install @vizhome/sdk</code>
                </pre>
                <Button size="sm" variant="ghost" className="absolute top-3 right-3 h-6 w-6 p-0">
                  <ClipboardIcon className="h-3 w-3" />
                  <span className="sr-only">Copier</span>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="yarn">
              <div className="relative">
                <pre className="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                  <code>yarn add @vizhome/sdk</code>
                </pre>
                <Button size="sm" variant="ghost" className="absolute top-3 right-3 h-6 w-6 p-0">
                  <ClipboardIcon className="h-3 w-3" />
                  <span className="sr-only">Copier</span>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="pnpm">
              <div className="relative">
                <pre className="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                  <code>pnpm add @vizhome/sdk</code>
                </pre>
                <Button size="sm" variant="ghost" className="absolute top-3 right-3 h-6 w-6 p-0">
                  <ClipboardIcon className="h-3 w-3" />
                  <span className="sr-only">Copier</span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <p class="mb-4">Si vous préférez utiliser une CDN :</p>
          <div class="relative mb-6">
            <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
              <code>&lt;script src="https://cdn.vizhome.fr/sdk/v1/vizhome.min.js"&gt;&lt;/script&gt;</code>
            </pre>
            <Button size="sm" variant="ghost" class="absolute top-3 right-3 h-6 w-6 p-0">
              <ClipboardIcon class="h-3 w-3" />
              <span className="sr-only">Copier</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Utilisation basique -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Utilisation basique</h2>
      <Card>
        <CardContent class="pt-6">
          <div class="mb-6">
            <h3 class="text-lg font-medium mb-2">Initialisation</h3>
            <div class="relative">
              <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                <code>
        
                  

import { VizHome } from '@vizhome/sdk';

// Initialiser le client avec votre clé API
const vizhome = new VizHome({ 
  apiKey: 'votre_cle_api', 
  region: 'eu-west-1'  // Optionnel, par défaut 'eu-west-1'
});
                </code>
              </pre>
              <Button size="sm" variant="ghost" class="absolute top-3 right-3 h-6 w-6 p-0">
                <ClipboardIcon class="h-3 w-3" />
                <span className="sr-only">Copier</span>
              </Button>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="text-lg font-medium mb-2">Récupérer un projet</h3>
            <div class="relative">
              <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                <code>
// Récupérer un projet par son ID
const projectId = '1234567890abcdef';
const project = await vizhome.projects.get(projectId);

console.log(project.name);
console.log(project.createdAt);
console.log(project.thumbnailUrl);
                </code>
              </pre>
              <Button size="sm" variant="ghost" class="absolute top-3 right-3 h-6 w-6 p-0">
                <ClipboardIcon class="h-3 w-3" />
                <span className="sr-only">Copier</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-2">Lister les projets</h3>
            <div class="relative">
              <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                <code>
// Récupérer la liste des projets (paginée)
const { projects, pagination } = await vizhome.projects.list({
  limit: 10,
  offset: 0,
  sortBy: 'createdAt',
  sortOrder: 'desc'
});

// Afficher les projets
projects.forEach(project => {
  console.log(`${project.id}: ${project.name}`);
});

// Accéder aux infos de pagination
console.log(`Total: ${pagination.total}`);
console.log(`Pages: ${pagination.totalPages}`);
                </code>
              </pre>
              <Button size="sm" variant="ghost" class="absolute top-3 right-3 h-6 w-6 p-0">
                <ClipboardIcon class="h-3 w-3" />
                <span className="sr-only">Copier</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Intégrations -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Intégration du viewer 3D</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Intégrez facilement le viewer 3D de VizHome dans votre page web pour afficher vos projets :
          </p>

          <div class="relative mb-6">
            <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
              <code>
// HTML
// &lt;div id="vizhome-viewer" style="width: 100%; height: 500px;"&gt;&lt;/div&gt;

// JavaScript
const container = document.getElementById('vizhome-viewer');
const viewer = await vizhome.viewer.create(container, {
  projectId: '1234567890abcdef',
  mode: 'interactive',      // 'interactive' ou 'presentation'
  controls: true,           // Afficher les contrôles de navigation
  autoRotate: false,        // Rotation automatique de la caméra
  annotations: true,        // Afficher les annotations
  backgroundColor: '#f5f5f5'  // Couleur d'arrière-plan
});

// Écouter les événements
viewer.on('loaded', () => {
  console.log('Le modèle est chargé');
});

viewer.on('click', (event) => {
  console.log('Clic sur:', event.position, event.object);
});
              </code>
            </pre>
            <Button size="sm" variant="ghost" class="absolute top-3 right-3 h-6 w-6 p-0">
              <ClipboardIcon class="h-3 w-3" />
              <span className="sr-only">Copier</span>
            </Button>
          </div>

          <div class="mb-6">
            <h3 class="text-lg font-medium mb-2">Exemples de personnalisation</h3>

            <Tabs defaultValue="camera" className="mb-6">
              <TabsList>
                <TabsTrigger value="camera">Contrôle de caméra</TabsTrigger>
                <TabsTrigger value="materials">Matériaux</TabsTrigger>
                <TabsTrigger value="lighting">Éclairage</TabsTrigger>
              </TabsList>

              <TabsContent value="camera">
                <div class="relative">
                  <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                    <code>
// Contrôler la caméra
viewer.camera.setPosition({
  x: 5,
  y: 2,
  z: 10
});

// Créer une animation de caméra
const cameraAnimation = viewer.camera.createAnimation([
  { position: { x: 0, y: 1, z: 5 }, target: { x: 0, y: 0, z: 0 }, duration: 1000 },
  { position: { x: 5, y: 2, z: 3 }, target: { x: 0, y: 0, z: 0 }, duration: 2000 }
]);

// Démarrer l'animation
cameraAnimation.play();
                    </code>
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="materials">
                <div class="relative">
                  <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                    <code>
// Modifier les matériaux
const walls = viewer.scene.getObjectsByName('walls');
walls.forEach(wall => {
  wall.material.color = { r: 0.9, g: 0.9, b: 0.9 };
  wall.material.roughness = 0.7;
  wall.material.metalness = 0;
});

// Remplacer un matériau
const floor = viewer.scene.getObjectById('floor-1');
if (floor) {
  viewer.materials.applyMaterial(floor, 'wood-parquet');
}
                    </code>
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="lighting">
                <div class="relative">
                  <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                    <code>
// Modifier l'éclairage
viewer.lighting.setEnvironment('sunset');

// Ajouter une lumière ponctuelle
const light = viewer.lighting.addPointLight({
  position: { x: 2, y: 3, z: 1 },
  color: '#ffffff',
  intensity: 0.8,
  distance: 10,
  castShadow: true
});

// Animer la lumière
light.animate({
  intensity: [0.5, 1.0, 0.5],
  duration: 2000,
  loop: true
});
                    </code>
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <Alert class="mt-6">
            <InfoIcon class="h-4 w-4" />
            <AlertTitle>Compatibilité navigateur</AlertTitle>
            <AlertDescription>
              Le viewer 3D VizHome est compatible avec tous les navigateurs modernes qui supportent WebGL 2.0, y compris
              Chrome, Firefox, Safari et Edge dans leurs versions récentes. Pour une expérience optimale, nous
              recommandons d'utiliser un appareil avec une carte graphique dédiée.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>

    <!-- Fonctionnalités avancées -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Fonctionnalités avancées</h2>
      <Card>
        <CardContent class="pt-6">
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">Upload de photos</h3>
              <div class="relative">
                <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                  <code>
// Créer un nouveau projet
const project = await vizhome.projects.create({
  name: "Ma Maison",
  description: "Reconstruction 3D de ma maison"
});

// Uploader des photos (depuis un input file)
const fileInput = document.getElementById('photo-upload');
const files = fileInput.files;

const uploadSession = await vizhome.uploads.createSession({
  projectId: project.id,
  fileCount: files.length
});

// Uploader chaque fichier
for (let i = 0; i < files.length; i++) {
  await vizhome.uploads.uploadFile({
    sessionId: uploadSession.id,
    file: files[i],
    index: i,
    onProgress: (progress) => {
      console.log(`Fichier ${i+1}/${files.length}: ${progress.percentage}%`);
    }
  });
}

// Démarrer le traitement
const processingJob = await vizhome.processing.start({
  projectId: project.id,
  uploadSessionId: uploadSession.id,
  settings: {
    quality: 'high',
    textureResolution: 2048
  }
});

// Écouter les mises à jour de progression
vizhome.processing.onProgressUpdate(processingJob.id, (progress) => {
  console.log(`Étape: ${progress.stage}, Progression: ${progress.percentage}%`);
  
  if (progress.stage === 'completed') {
    console.log('Modèle 3D prêt !');
  }
});
                  </code>
                </pre>
                <Button size="sm" variant="ghost" class="absolute top-3 right-3 h-6 w-6 p-0">
                  <ClipboardIcon class="h-3 w-3" />
                  <span className="sr-only">Copier</span>
                </Button>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Collaboration et partage</h3>
              <div class="relative">
                <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                  <code>
// Partager un projet avec un autre utilisateur
await vizhome.projects.share({
  projectId: project.id,
  email: 'collaborateur@exemple.com',
  permission: 'editor'  // 'viewer', 'editor', ou 'admin'
});

// Créer un lien de partage public
const shareLink = await vizhome.projects.createShareLink({
  projectId: project.id,
  expiresIn: '7d',       // Expire après 7 jours
  allowDownload: false,  // Ne pas autoriser le téléchargement
  password: 'secret123'  // Optionnel: protéger par mot de passe
});

console.log(`Lien de partage: ${shareLink.url}`);

// Révoquer un lien de partage
await vizhome.projects.revokeShareLink(shareLink.id);
                  </code>
                </pre>
                <Button size="sm" variant="ghost" class="absolute top-3 right-3 h-6 w-6 p-0">
                  <ClipboardIcon class="h-3 w-3" />
                  <span className="sr-only">Copier</span>
                </Button>
              </div>
            </div>

            <div />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Authentification et sécurité -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Authentification et sécurité</h2>
      <Card>
        <CardContent class="pt-6">
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">Gestion des clés API</h3>
              <p class="mb-4">
                Pour une sécurité optimale, nous vous recommandons de ne jamais exposer votre clé API côté client. Voici
                comment mettre en place une authentification sécurisée :
              </p>
              <div class="relative">
                <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                  <code>
// Côté serveur (Node.js)
app.get('/api/vizhome/token', async (req, res) => {
  try {
    // Vérifier l'authentification de l'utilisateur
    if (!req.user) {
      return res.status(401).json({ error: 'Non autorisé' });
    }
    
    // Générer un token temporaire pour l'utilisateur authentifié
    const token = await generateVizHomeToken(req.user.id);
    
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Côté client
async function initVizHome() {
  // Récupérer un token depuis votre backend
  const response = await fetch('/api/vizhome/token');
  const { token } = await response.json();
  
  // Initialiser VizHome avec le token temporaire
  const vizhome = new VizHome({
    token: token
  });
  
  return vizhome;
}
                  </code>
                </pre>
                <Button size="sm" variant="ghost" class="absolute top-3 right-3 h-6 w-6 p-0">
                  <ClipboardIcon class="h-3 w-3" />
                  <span className="sr-only">Copier</span>
                </Button>
              </div>
            </div>

            <div class="mt-4">
              <h3 class="text-lg font-medium mb-2">Domaines autorisés</h3>
              <p>Configurez les domaines autorisés dans votre tableau de bord VizHome pour restreindre l'utilisation de
                votre clé API à des domaines spécifiques.</p>

              <Alert class="mt-4">
                <AlertCircleIcon class="h-4 w-4" />
                <AlertTitle>Bonnes pratiques de sécurité</AlertTitle>
                <AlertDescription>
                  <ul class="list-disc pl-6 mt-2 space-y-1">
                    <li>Utilisez des clés API différentes pour la production et le développement</li>
                    <li>Créez des clés API avec des permissions minimales nécessaires</li>
                    <li>Rotation régulière des clés API</li>
                    <li>Surveillez l'utilisation de vos API pour détecter toute activité suspecte</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Gestion des erreurs -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Gestion des erreurs</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">Le SDK JavaScript VizHome utilise un système cohérent de gestion des erreurs pour faciliter le
            débogage et la gestion des problèmes potentiels :</p>

          <div class="relative mb-6">
            <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
              <code>
try {
  const project = await vizhome.projects.get("projet_inexistant");
} catch (error) {
  if (error.code === 'NOT_FOUND') {
    console.error('Le projet demandé n\'existe pas');
  } else if (error.code === 'UNAUTHORIZED') {
    console.error('Clé API invalide ou expirée');
  } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
    console.error('Quota d\'API dépassé, réessayez plus tard');
    // Attendre avant de réessayer
    setTimeout(retry, error.retryAfter * 1000);
  } else {
    console.error(`Erreur: ${error.message}`);
    console.error('Détails:', error.details);
  }
}
              </code>
            </pre>
            <Button size="sm" variant="ghost" class="absolute top-3 right-3 h-6 w-6 p-0">
              <ClipboardIcon class="h-3 w-3" />
              <span class="sr-only">Copier</span>
            </Button>
          </div>

          <div class="mb-4">
            <h3 class="text-lg font-medium mb-2">Codes d'erreur courants</h3>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-border">
                <thead>
                  <tr>
                    <th class="px-4 py-2 text-left font-medium text-muted-foreground">Code</th>
                    <th class="px-4 py-2 text-left font-medium text-muted-foreground">Description</th>
                    <th class="px-4 py-2 text-left font-medium text-muted-foreground">Solution</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr>
                    <td class="px-4 py-2 font-mono text-sm">UNAUTHORIZED</td>
                    <td class="px-4 py-2">Clé API invalide ou expirée</td>
                    <td class="px-4 py-2">Vérifiez votre clé API ou générez-en une nouvelle</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-2 font-mono text-sm">FORBIDDEN</td>
                    <td class="px-4 py-2">Permissions insuffisantes</td>
                    <td class="px-4 py-2">Vérifiez les permissions de votre clé API</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-2 font-mono text-sm">NOT_FOUND</td>
                    <td class="px-4 py-2">Ressource introuvable</td>
                    <td class="px-4 py-2">Vérifiez l'ID de la ressource demandée</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-2 font-mono text-sm">RATE_LIMIT_EXCEEDED</td>
                    <td class="px-4 py-2">Trop de requêtes</td>
                    <td class="px-4 py-2">Implémentez un backoff exponentiel</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-2 font-mono text-sm">VALIDATION_ERROR</td>
                    <td class="px-4 py-2">Données invalides</td>
                    <td class="px-4 py-2">Vérifiez les paramètres de votre requête</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <Alert>
            <InfoIcon class="h-4 w-4" />
            <AlertTitle>Débogage</AlertTitle>
            <AlertDescription>
              Activez le mode de débogage pour obtenir des informations détaillées sur les requêtes et les réponses :
              <div class="mt-2">
                <code
                  class="text-xs px-1 py-0.5 rounded bg-muted">const vizhome = new VizHome({ apiKey: 'votre_cle_api', debug: true });</code>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>

    <!-- Ressources et Support -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Ressources et Support</h2>
      <Card>
        <CardContent class="pt-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-medium mb-2">Documentation complémentaire</h3>
              <ul class="space-y-2">
                <li>
                  <a href="#" class="text-primary hover:underline flex items-center">
                    <FileTextIcon class="h-4 w-4 mr-2" />
                    Référence complète de l'API
                  </a>
                </li>
                <li>
                  <a href="#" class="text-primary hover:underline flex items-center">
                    <CodeIcon class="h-4 w-4 mr-2" />
                    Exemples de code
                  </a>
                </li>
                <li>
                  <a href="#" class="text-primary hover:underline flex items-center">
                    <BookOpenIcon class="h-4 w-4 mr-2" />
                    Guide d'intégration avancée
                  </a>
                </li>
                <li>
                  <a href="#" class="text-primary hover:underline flex items-center">
                    <PlayCircleIcon class="h-4 w-4 mr-2" />
                    Tutoriels vidéo
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Support</h3>
              <ul class="space-y-2">
                <li>
                  <a href="#" class="text-primary hover:underline flex items-center">
                    <MessageSquareIcon class="h-4 w-4 mr-2" />
                    Forum communautaire
                  </a>
                </li>
                <li>
                  <a href="#" class="text-primary hover:underline flex items-center">
                    <GithubIcon class="h-4 w-4 mr-2" />
                    GitHub Issues
                  </a>
                </li>
                <li>
                  <a href="#" class="text-primary hover:underline flex items-center">
                    <MailIcon class="h-4 w-4 mr-2" />
                    Contact support technique
                  </a>
                </li>
                <li>
                  <a href="#" class="text-primary hover:underline flex items-center">
                    <CalendarCheckIcon class="h-4 w-4 mr-2" />
                    Planifier une consultation
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Alert variant="default" class="mt-6">
            <InfoIcon class="h-4 w-4" />
            <AlertTitle>Restez informé</AlertTitle>
            <AlertDescription>
              <p class="mb-2">Abonnez-vous à notre newsletter pour recevoir les dernières mises à jour du SDK et des
                conseils d'intégration :</p>
              <div class="flex mt-2">
                <Input placeholder="votre@email.com" class="mr-2" />
                <Button>S'abonner</Button>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { AlertCircleIcon, BookOpenIcon, CalendarCheckIcon, ClipboardIcon, CodeIcon, FileTextIcon, GithubIcon, InfoIcon, MailIcon, MessageSquareIcon, PlayCircleIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'

// Définir le layout docs pour cette page
definePageMeta({
  layout: 'docs',
})
</script>