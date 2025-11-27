<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Architecture</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Vue d'ensemble de l'architecture technique de VizHome
      </p>
    </div>

    <!-- Introduction -->
    <Card>
      <CardContent class="pt-6">
        <p>
          VizHome est une plateforme cloud de visualisation 3D architecturale
          propulsée par l'IA. Cette page présente l'architecture technique de
          notre solution pour vous aider à comprendre comment elle fonctionne et
          comment l'intégrer avec vos systèmes existants.
        </p>
      </CardContent>
    </Card>

    <!-- Vue d'ensemble -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Vue d'ensemble</h2>
      <Card>
        <CardContent class="pt-6">
          <div class="mb-6 overflow-x-auto">
            <img
              src="/images/generate/image_generate.png"
              alt="Architecture VizHome"
              class="w-full max-w-4xl mx-auto"
            />
          </div>

          <p class="mb-4">
            L'architecture de VizHome est composée de plusieurs couches
            interconnectées :
          </p>

          <div class="space-y-4">
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Frontend</h3>
              <p class="text-sm text-muted-foreground">
                Applications web responsive et applications mobiles natives
                iOS/Android avec interface utilisateur intuitive.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Backend API</h3>
              <p class="text-sm text-muted-foreground">
                API REST sécurisée facilitant la communication entre les clients
                et les services.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Moteur IA</h3>
              <p class="text-sm text-muted-foreground">
                Ensemble de modèles de deep learning optimisés pour la
                reconstruction 3D, segmentation et génération de textures.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Pipeline de rendu</h3>
              <p class="text-sm text-muted-foreground">
                Moteurs de rendu pour la génération d'images photoréalistes à
                partir des modèles 3D.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Infrastructure cloud</h3>
              <p class="text-sm text-muted-foreground">
                Serveurs scalables, stockage distribué et CDN pour une
                performance globale optimale.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Frontend -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Frontend</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            L'interface utilisateur de VizHome a été conçue pour offrir une
            expérience fluide et intuitive sur tous les appareils.
          </p>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">Application Web</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium mb-2">Technologies</h4>
                  <ul class="space-y-2">
                    <li class="flex items-start gap-2">
                      <div class="min-w-[20px] mt-1">
                        <Circle class="h-2 w-2 fill-primary text-primary" />
                      </div>
                      <p>
                        <strong>Framework</strong> : Vue.js 3 avec Nuxt.js pour
                        le rendu côté serveur
                      </p>
                    </li>
                    <li class="flex items-start gap-2">
                      <div class="min-w-[20px] mt-1">
                        <Circle class="h-2 w-2 fill-primary text-primary" />
                      </div>
                      <p>
                        <strong>3D</strong> : Three.js pour la visualisation 3D
                        interactive
                      </p>
                    </li>
                    <li class="flex items-start gap-2">
                      <div class="min-w-[20px] mt-1">
                        <Circle class="h-2 w-2 fill-primary text-primary" />
                      </div>
                      <p>
                        <strong>UI</strong> : Tailwind CSS et bibliothèque de
                        composants personnalisés
                      </p>
                    </li>
                    <li class="flex items-start gap-2">
                      <div class="min-w-[20px] mt-1">
                        <Circle class="h-2 w-2 fill-primary text-primary" />
                      </div>
                      <p>
                        <strong>État</strong> : Pinia pour la gestion globale de
                        l'état
                      </p>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium mb-2">Caractéristiques</h4>
                  <ul class="space-y-2">
                    <li class="flex items-start gap-2">
                      <div class="min-w-[20px] mt-1">
                        <Circle class="h-2 w-2 fill-primary text-primary" />
                      </div>
                      <p>
                        <strong>PWA</strong> : Fonctionne comme application
                        installable sur desktop
                      </p>
                    </li>
                    <li class="flex items-start gap-2">
                      <div class="min-w-[20px] mt-1">
                        <Circle class="h-2 w-2 fill-primary text-primary" />
                      </div>
                      <p>
                        <strong>Responsive</strong> : Optimisée pour tous les
                        appareils et tailles d'écran
                      </p>
                    </li>
                    <li class="flex items-start gap-2">
                      <div class="min-w-[20px] mt-1">
                        <Circle class="h-2 w-2 fill-primary text-primary" />
                      </div>
                      <p>
                        <strong>Éditeur 3D</strong> : Interface glisser-déposer
                        pour la personnalisation
                      </p>
                    </li>
                    <li class="flex items-start gap-2">
                      <div class="min-w-[20px] mt-1">
                        <Circle class="h-2 w-2 fill-primary text-primary" />
                      </div>
                      <p>
                        <strong>Mode hors-ligne</strong> : Accès limité aux
                        projets téléchargés
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Applications Mobiles</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium mb-2">iOS</h4>
                  <ul class="space-y-2">
                    <li class="flex items-start gap-2">
                      <div class="min-w-[20px] mt-1">
                        <Circle class="h-2 w-2 fill-primary text-primary" />
                      </div>
                      <p><strong>Framework</strong> : Swift UI & UIKit</p>
                    </li>
                    <li class="flex items-start gap-2">
                      <div class="min-w-[20px] mt-1">
                        <Circle class="h-2 w-2 fill-primary text-primary" />
                      </div>
                      <p><strong>3D & AR</strong> : SceneKit et ARKit</p>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium mb-2">Android</h4>
                  <ul class="space-y-2">
                    <li class="flex items-start gap-2">
                      <div class="min-w-[20px] mt-1">
                        <Circle class="h-2 w-2 fill-primary text-primary" />
                      </div>
                      <p>
                        <strong>Framework</strong> : Kotlin & Jetpack Compose
                      </p>
                    </li>
                    <li class="flex items-start gap-2">
                      <div class="min-w-[20px] mt-1">
                        <Circle class="h-2 w-2 fill-primary text-primary" />
                      </div>
                      <p><strong>3D & AR</strong> : Sceneform et ARCore</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Backend API -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Backend API</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Notre API backend est conçue comme une architecture orientée
            microservices qui facilite l'évolutivité et la maintenance.
          </p>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">Technologies</h3>
              <ul class="space-y-2">
                <li class="flex items-start gap-3">
                  <div class="min-w-[20px] mt-1">
                    <CheckIcon class="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <strong>Serveur</strong> : Node.js avec Express.js et
                    TypeScript
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="min-w-[20px] mt-1">
                    <CheckIcon class="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <strong>Base de données</strong> : MongoDB pour les données
                    utilisateur et PostgreSQL pour les relations
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="min-w-[20px] mt-1">
                    <CheckIcon class="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <strong>Stockage</strong> : Amazon S3 pour les assets et
                    fichiers utilisateur
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="min-w-[20px] mt-1">
                    <CheckIcon class="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <strong>Authentication</strong> : JWT, OAuth 2.0 et support
                    des identités fédérées
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="min-w-[20px] mt-1">
                    <CheckIcon class="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <strong>Communication</strong> : RabbitMQ pour la messagerie
                    asynchrone entre services
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Microservices</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="border rounded p-4">
                  <h4 class="font-medium mb-1">Service d'authentification</h4>
                  <p class="text-sm text-muted-foreground">
                    Gestion des utilisateurs, authentification et autorisations
                  </p>
                </div>
                <div class="border rounded p-4">
                  <h4 class="font-medium mb-1">Service de projets</h4>
                  <p class="text-sm text-muted-foreground">
                    Gestion du cycle de vie des projets et partage
                  </p>
                </div>
                <div class="border rounded p-4">
                  <h4 class="font-medium mb-1">Service d'assets</h4>
                  <p class="text-sm text-muted-foreground">
                    Gestion des modèles 3D, textures et matériaux
                  </p>
                </div>
                <div class="border rounded p-4">
                  <h4 class="font-medium mb-1">Service de rendu</h4>
                  <p class="text-sm text-muted-foreground">
                    Génération de rendus 3D et gestion de la file d'attente
                  </p>
                </div>
                <div class="border rounded p-4">
                  <h4 class="font-medium mb-1">Service IA</h4>
                  <p class="text-sm text-muted-foreground">
                    Orchestration des modèles d'IA et traitement des images
                  </p>
                </div>
                <div class="border rounded p-4">
                  <h4 class="font-medium mb-1">Service de facturation</h4>
                  <p class="text-sm text-muted-foreground">
                    Gestion des abonnements, paiements et quotas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Moteur IA -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Moteur IA</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Le cœur technologique de VizHome repose sur nos modèles
            d'intelligence artificielle spécialisés dans la vision par
            ordinateur et la génération 3D.
          </p>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">
                Pipeline de traitement IA
              </h3>
              <div class="mb-6 overflow-x-auto">
                <div
                  class="flex flex-nowrap gap-2 items-center justify-between mb-4"
                >
                  <div
                    class="min-w-[160px] border rounded-lg p-3 text-center bg-background"
                  >
                    <p class="font-medium">Upload photos</p>
                  </div>
                  <ArrowRightIcon class="h-5 w-5 text-muted-foreground" />
                  <div
                    class="min-w-[160px] border rounded-lg p-3 text-center bg-background"
                  >
                    <p class="font-medium">Analyse & segmentation</p>
                  </div>
                  <ArrowRightIcon class="h-5 w-5 text-muted-foreground" />
                  <div
                    class="min-w-[160px] border rounded-lg p-3 text-center bg-background"
                  >
                    <p class="font-medium">Reconstruction 3D</p>
                  </div>
                  <ArrowRightIcon class="h-5 w-5 text-muted-foreground" />
                  <div
                    class="min-w-[160px] border rounded-lg p-3 text-center bg-background"
                  >
                    <p class="font-medium">Texturing & matériaux</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="text-lg font-medium mb-2">Technologies IA</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 class="font-medium mb-2">Computer Vision</h4>
                    <ul class="space-y-2">
                      <li class="flex items-start gap-2">
                        <div class="min-w-[20px] mt-1">
                          <Circle class="h-2 w-2 fill-primary text-primary" />
                        </div>
                        <p>
                          <strong>Segmentation</strong> : Réseaux U-Net pour
                          identifier les surfaces et objets
                        </p>
                      </li>
                      <li class="flex items-start gap-2">
                        <div class="min-w-[20px] mt-1">
                          <Circle class="h-2 w-2 fill-primary text-primary" />
                        </div>
                        <p>
                          <strong>Structure from Motion</strong> :
                          Reconstruction 3D à partir de plusieurs vues
                        </p>
                      </li>
                      <li class="flex items-start gap-2">
                        <div class="min-w-[20px] mt-1">
                          <Circle class="h-2 w-2 fill-primary text-primary" />
                        </div>
                        <p>
                          <strong>Transfert de style</strong> : Adaptation des
                          matériaux sur nouvelles surfaces
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-medium mb-2">Frameworks</h4>
                    <ul class="space-y-2">
                      <li class="flex items-start gap-2">
                        <div class="min-w-[20px] mt-1">
                          <Circle class="h-2 w-2 fill-primary text-primary" />
                        </div>
                        <p>
                          <strong>PyTorch</strong> : Principal framework pour
                          nos modèles de deep learning
                        </p>
                      </li>
                      <li class="flex items-start gap-2">
                        <div class="min-w-[20px] mt-1">
                          <Circle class="h-2 w-2 fill-primary text-primary" />
                        </div>
                        <p>
                          <strong>TensorFlow</strong> : Utilisé pour certains
                          modèles déployés en production
                        </p>
                      </li>
                      <li class="flex items-start gap-2">
                        <div class="min-w-[20px] mt-1">
                          <Circle class="h-2 w-2 fill-primary text-primary" />
                        </div>
                        <p>
                          <strong>ONNX Runtime</strong> : Pour optimiser
                          l'inférence sur différents appareils
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Alert class="mt-6">
            <InfoIcon class="h-4 w-4" />
            <AlertTitle>Intégration accélérée</AlertTitle>
            <AlertDescription>
              Nos modèles sont optimisés pour l'inférence GPU sur notre
              infrastructure cloud, permettant de générer des modèles 3D
              complexes en quelques secondes à partir de photos standard.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>

    <!-- Infrastructure -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Infrastructure Cloud</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            VizHome fonctionne sur une infrastructure cloud moderne conçue pour
            une haute disponibilité, une évolutivité à la demande et une
            sécurité robuste.
          </p>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">
                Caractéristiques principales
              </h3>
              <ul class="space-y-2">
                <li class="flex items-start gap-3">
                  <div class="min-w-[20px] mt-1">
                    <ServerIcon class="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <strong>Multi-cloud</strong> : Déployée sur AWS, GCP et
                    Azure pour une redondance maximale
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="min-w-[20px] mt-1">
                    <GlobeIcon class="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <strong>Réseau global</strong> : Points de présence CDN dans
                    40+ régions pour un accès rapide
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="min-w-[20px] mt-1">
                    <ShieldIcon class="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <strong>Sécurité</strong> : Chiffrement de bout en bout,
                    conformité GDPR et certifications ISO 27001
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="min-w-[20px] mt-1">
                    <RefreshCcwIcon class="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <strong>SLA</strong> : Disponibilité garantie de 99.9% avec
                    surveillance 24/7
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="min-w-[20px] mt-1">
                    <ScaleIcon class="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <strong>Scaling</strong> : Auto-scaling horizontal et
                    vertical pour gérer les pics de demande
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">
                Architecture de déploiement
              </h3>
              <p class="mb-4">
                Nos composants sont déployés dans des conteneurs Docker
                orchestrés par Kubernetes :
              </p>
              <div class="bg-muted rounded p-4 text-sm font-mono">
                <p>├── Cluster Frontend (Stateless)</p>
                <p>│ ├── Web App Servers</p>
                <p>│ └── API Gateway</p>
                <p>├── Cluster Backend (Stateful)</p>
                <p>│ ├── Microservices</p>
                <p>│ └── Message Queue</p>
                <p>├── Cluster IA</p>
                <p>│ ├── GPU Workers</p>
                <p>│ └── Model Serving</p>
                <p>└── Databases & Storage</p>
                <p>├── MongoDB</p>
                <p>├── PostgreSQL</p>
                <p>└── Object Storage</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Intégrations et SDK -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Intégrations et SDK</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            VizHome peut être facilement intégré à vos systèmes existants via
            notre API et nos SDK. Nous supportons également des intégrations
            directes avec des outils populaires d'architecture et de design.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="border rounded p-4">
              <h4 class="font-medium mb-1">AutoCAD / Revit</h4>
              <p class="text-sm text-muted-foreground">
                Plugin pour importer/exporter des modèles entre VizHome et
                Autodesk
              </p>
            </div>
            <div class="border rounded p-4">
              <h4 class="font-medium mb-1">SketchUp</h4>
              <p class="text-sm text-muted-foreground">
                Extension pour une synchronisation directe avec VizHome
              </p>
            </div>
            <div class="border rounded p-4">
              <h4 class="font-medium mb-1">Unity / Unreal</h4>
              <p class="text-sm text-muted-foreground">
                SDK pour intégrer les assets VizHome dans des expériences en
                temps réel
              </p>
            </div>
            <div class="border rounded p-4">
              <h4 class="font-medium mb-1">Shopify / WooCommerce</h4>
              <p class="text-sm text-muted-foreground">
                Visualisation 3D et AR pour les produits e-commerce
              </p>
            </div>
            <div class="border rounded p-4">
              <h4 class="font-medium mb-1">Zapier / Integromat</h4>
              <p class="text-sm text-muted-foreground">
                Automatisations sans code avec d'autres services web
              </p>
            </div>
            <div class="border rounded p-4">
              <h4 class="font-medium mb-1">WordPress</h4>
              <p class="text-sm text-muted-foreground">
                Plugin pour intégrer des visualisations 3D dans votre site
              </p>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-2">Webhooks</h3>
            <p class="mb-4">
              Utilisez nos webhooks pour recevoir des notifications en temps
              réel lorsque des événements importants se produisent :
            </p>
            <div class="bg-muted rounded p-3 text-sm font-mono mb-4">
              <p>POST https://app.vizhome.fr/webhooks</p>
              <p>{</p>
              <p>"url": "https://votre-site.com/callback",</p>
              <p>
                "events": ["render.completed", "project.shared",
                "model.uploaded"]
              </p>
              <p>}</p>
            </div>
            <p>
              Consultez notre
              <NuxtLink to="/docs/api" class="text-primary hover:underline"
                >documentation API</NuxtLink
              >
              pour plus de détails sur les intégrations disponibles.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Navigation -->
    <div class="flex items-center justify-between">
      <Button variant="outline" class="gap-1" as-child>
        <NuxtLink to="/docs/installation">
          <ArrowLeftIcon class="h-4 w-4" />
          Installation
        </NuxtLink>
      </Button>
      <Button variant="outline" class="gap-1" as-child>
        <NuxtLink to="/docs/api">
          API Reference
          <ArrowRightIcon class="h-4 w-4" />
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  Circle,
  CheckIcon,
  InfoIcon,
  ServerIcon,
  GlobeIcon,
  ShieldIcon,
  RefreshCcwIcon,
  ScaleIcon,
} from 'lucide-vue-next'

// Définir le layout docs pour cette page
definePageMeta({
  layout: 'docs',
})
</script>
