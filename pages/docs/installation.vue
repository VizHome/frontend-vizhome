<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Installation</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Guide d'installation complet pour VizHome
      </p>
    </div>

    <!-- Prérequis -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Prérequis</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Avant d'installer VizHome, assurez-vous que votre système répond aux
            conditions suivantes :
          </p>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="min-w-[20px] mt-1">
                <CheckIcon class="h-4 w-4 text-primary" />
              </div>
              <div>
                <strong>Navigateur</strong> : Chrome (v88+), Firefox (v85+),
                Safari (v14+) ou Edge (v88+)
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="min-w-[20px] mt-1">
                <CheckIcon class="h-4 w-4 text-primary" />
              </div>
              <div>
                <strong>Connection Internet</strong> : Minimum 10 Mbps, 25+ Mbps
                recommandé pour l'upload d'images
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="min-w-[20px] mt-1">
                <CheckIcon class="h-4 w-4 text-primary" />
              </div>
              <div>
                <strong>Matériel</strong> : Carte graphique compatible WebGL 2.0
                recommandée pour de meilleures performances
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="min-w-[20px] mt-1">
                <CheckIcon class="h-4 w-4 text-primary" />
              </div>
              <div>
                <strong>Stockage</strong> : Minimum 1 Go d'espace libre pour
                l'application et les rendus de base
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Option 1: Web App -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Option 1: Application Web</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            VizHome est principalement disponible en tant qu'application web.
            Aucune installation n'est requise, il vous suffit de créer un
            compte.
          </p>
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">Étapes d'inscription</h3>
              <ol class="space-y-4">
                <li class="flex items-start gap-4">
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    1
                  </div>
                  <div class="space-y-1 pt-1">
                    <p>
                      Rendez-vous sur
                      <a
                        href="https://app.vizhome.fr/register"
                        class="text-primary hover:underline"
                        >https://app.vizhome.fr/register</a
                      >
                    </p>
                  </div>
                </li>
                <li class="flex items-start gap-4">
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    2
                  </div>
                  <div class="space-y-1 pt-1">
                    <p>
                      Remplissez le formulaire d'inscription avec votre adresse
                      email et créez un mot de passe
                    </p>
                  </div>
                </li>
                <li class="flex items-start gap-4">
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    3
                  </div>
                  <div class="space-y-1 pt-1">
                    <p>
                      Vérifiez votre adresse email en cliquant sur le lien reçu
                    </p>
                  </div>
                </li>
                <li class="flex items-start gap-4">
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    4
                  </div>
                  <div class="space-y-1 pt-1">
                    <p>
                      Connectez-vous à votre compte et commencez à utiliser
                      VizHome
                    </p>
                  </div>
                </li>
              </ol>
            </div>
            <Alert>
              <InfoIcon class="h-4 w-4" />
              <AlertTitle>Conseil</AlertTitle>
              <AlertDescription>
                Vous pouvez vous inscrire gratuitement avec le plan Freemium qui
                vous permet de créer jusqu'à 3 projets. Parfait pour tester la
                plateforme.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Option 2: Apps Mobiles -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Option 2: Applications Mobiles</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            VizHome est également disponible sous forme d'applications mobiles
            pour iOS et Android.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="border rounded-lg p-6">
              <div class="flex items-center gap-4 mb-4">
                <div class="bg-primary/10 p-3 rounded-full">
                  <SmartphoneIcon class="h-6 w-6 text-primary" />
                </div>
                <h3 class="text-xl font-bold">iOS</h3>
              </div>
              <div class="space-y-4">
                <p>Disponible pour iPhone et iPad avec iOS 14 ou supérieur.</p>
                <Button class="w-full gap-2">
                  <AppleIcon class="h-4 w-4" />
                  Télécharger sur l'App Store
                </Button>
                <div class="text-xs text-muted-foreground">
                  Taille de l'application: ~80 MB
                </div>
              </div>
            </div>
            <div class="border rounded-lg p-6">
              <div class="flex items-center gap-4 mb-4">
                <div class="bg-primary/10 p-3 rounded-full">
                  <SmartphoneIcon class="h-6 w-6 text-primary" />
                </div>
                <h3 class="text-xl font-bold">Android</h3>
              </div>
              <div class="space-y-4">
                <p>Compatible avec Android 8.0 (Oreo) ou supérieur.</p>
                <Button class="w-full gap-2">
                  <StoreIcon class="h-4 w-4" />
                  Télécharger sur Google Play
                </Button>
                <div class="text-xs text-muted-foreground">
                  Taille de l'application: ~75 MB
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">
              Fonctionnalités des applications mobiles
            </h3>
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <div class="min-w-[20px] mt-1">
                  <Circle class="h-2 w-2 fill-primary text-primary" />
                </div>
                <p>Prise de photos optimisées avec guide en temps réel</p>
              </li>
              <li class="flex items-start gap-2">
                <div class="min-w-[20px] mt-1">
                  <Circle class="h-2 w-2 fill-primary text-primary" />
                </div>
                <p>Visualisation de vos projets en 3D et réalité augmentée</p>
              </li>
              <li class="flex items-start gap-2">
                <div class="min-w-[20px] mt-1">
                  <Circle class="h-2 w-2 fill-primary text-primary" />
                </div>
                <p>Partage facilité avec vos clients via liens ou QR codes</p>
              </li>
              <li class="flex items-start gap-2">
                <div class="min-w-[20px] mt-1">
                  <Circle class="h-2 w-2 fill-primary text-primary" />
                </div>
                <p>Accès à tous vos projets synchronisés avec votre compte</p>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Option 3: API et SDK -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Option 3: API et SDK</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Pour les développeurs qui souhaitent intégrer VizHome à leurs
            propres applications, nous proposons une API REST et des SDK pour
            différents langages de programmation.
          </p>

          <div class="space-y-4 mb-6">
            <div>
              <h3 class="text-lg font-medium mb-2">API REST</h3>
              <p class="mb-2">
                Notre API REST est accessible via HTTPS et utilise JSON pour les
                formats de requête et de réponse.
              </p>
              <div class="bg-muted rounded p-3 text-sm font-mono">
                Base URL: https://api.vizhome.fr/v1
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">
                SDK (Kits de développement)
              </h3>
              <p class="mb-2">
                Nous fournissons des SDK officiels pour les langages suivants :
              </p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="border rounded p-4">
                  <h4 class="font-medium mb-1">JavaScript</h4>
                  <div class="bg-muted rounded p-2 text-xs font-mono mb-2">
                    npm install @vizhome/sdk
                  </div>
                  <NuxtLink
                    to="/docs/api"
                    class="text-sm text-primary hover:underline"
                  >
                    Documentation JavaScript
                  </NuxtLink>
                </div>
                <div class="border rounded p-4">
                  <h4 class="font-medium mb-1">Python</h4>
                  <div class="bg-muted rounded p-2 text-xs font-mono mb-2">
                    pip install vizhome-python
                  </div>
                  <NuxtLink
                    to="/docs/api"
                    class="text-sm text-primary hover:underline"
                  >
                    Documentation Python
                  </NuxtLink>
                </div>
                <div class="border rounded p-4">
                  <h4 class="font-medium mb-1">PHP</h4>
                  <div class="bg-muted rounded p-2 text-xs font-mono mb-2">
                    composer require vizhome/vizhome-php
                  </div>
                  <NuxtLink
                    to="/docs/api"
                    class="text-sm text-primary hover:underline"
                  >
                    Documentation PHP
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <Alert variant="warning">
            <AlertCircleIcon class="h-4 w-4" />
            <AlertTitle>Note importante</AlertTitle>
            <AlertDescription>
              L'utilisation de l'API nécessite une clé d'API valide obtenue en
              souscrivant à un plan Pro ou Entreprise. Consultez notre
              <NuxtLink to="/pricing" class="text-primary hover:underline"
                >page de tarification</NuxtLink
              >
              pour plus d'informations.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>

    <!-- Navigation -->
    <div class="flex items-center justify-between">
      <Button variant="outline" class="gap-1" as-child>
        <NuxtLink to="/docs">
          <ArrowLeftIcon class="h-4 w-4" />
          Démarrage rapide
        </NuxtLink>
      </Button>
      <Button variant="outline" class="gap-1" as-child>
        <NuxtLink to="/docs/architecture">
          Architecture
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
  SmartphoneIcon,
  AppleIcon,
  StoreIcon,
  AlertCircleIcon,
} from 'lucide-vue-next'

// Définir le layout docs pour cette page
definePageMeta({
  layout: 'docs',
})
</script>
