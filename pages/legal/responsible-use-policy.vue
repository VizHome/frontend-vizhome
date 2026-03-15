<template>
  <div class="py-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <h1 class="text-3xl font-bold mb-8 text-center">
        Charte d'Utilisation Responsable
      </h1>

      <div class="prose prose-sm dark:prose-invert max-w-none">
        <div class="text-center mb-8">
          <p class="text-lg">VizHome - Charte d'Utilisation Responsable</p>
          <p class="text-muted-foreground">Date d'effet : 19/11/2024</p>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Introduction</h2>
        <p>
          VizHome s'engage à offrir un environnement sûr et éthique pour ses
          utilisateurs. Cette charte définit les règles d'utilisation de notre
          plateforme et de nos services.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Règles Générales</h2>
        <p>Les utilisateurs de VizHome doivent :</p>

        <Card class="mb-6">
          <CardContent class="pt-6">
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="min-w-[24px]">
                  <ShieldIcon class="h-5 w-5 text-primary" />
                </div>
                <p>Respecter les lois en vigueur.</p>
              </li>
              <li class="flex items-start gap-3">
                <div class="min-w-[24px]">
                  <UserIcon class="h-5 w-5 text-primary" />
                </div>
                <p>Utiliser les services de manière responsable et éthique.</p>
              </li>
              <li class="flex items-start gap-3">
                <div class="min-w-[24px]">
                  <BanIcon class="h-5 w-5 text-primary" />
                </div>
                <p>
                  Ne pas partager ou publier de contenu offensant, illégal ou
                  nuisible.
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>

        <h2 class="text-xl font-bold mt-8 mb-4">Contenus Interdits</h2>
        <p>Il est strictement interdit de :</p>

        <Alert variant="destructive" class="mb-6">
          <AlertDescription>
            <ul class="space-y-4 mt-2">
              <li class="flex items-start gap-3">
                <div class="min-w-[24px]">
                  <ImageIcon class="h-5 w-5" />
                </div>
                <p>
                  Générer ou manipuler des images à des fins trompeuses ou
                  illégales.
                </p>
              </li>
              <li class="flex items-start gap-3">
                <div class="min-w-[24px]">
                  <HeartOffIcon class="h-5 w-5" />
                </div>
                <p>
                  Utiliser VizHome pour promouvoir la haine, la discrimination
                  ou la violence.
                </p>
              </li>
              <li class="flex items-start gap-3">
                <div class="min-w-[24px]">
                  <BugIcon class="h-5 w-5" />
                </div>
                <p>
                  Téléverser des fichiers contenant des virus ou logiciels
                  malveillants.
                </p>
              </li>
            </ul>
          </AlertDescription>
        </Alert>

        <h2 class="text-xl font-bold mt-8 mb-4">
          Protection des Données et Confidentialité
        </h2>
        <p>
          Les utilisateurs doivent respecter les données personnelles d'autrui
          et ne pas collecter ou diffuser des informations sensibles sans
          consentement.
        </p>

        <Card class="bg-muted/40 mb-6">
          <CardContent class="pt-6">
            <div class="flex items-start gap-3">
              <div class="min-w-[24px]">
                <LockIcon class="h-5 w-5 text-primary" />
              </div>
              <p class="text-sm">
                Le respect de la vie privée est une valeur fondamentale chez
                VizHome. Nous attendons de nos utilisateurs qu'ils appliquent
                les mêmes standards élevés dans leur utilisation de notre
                plateforme.
              </p>
            </div>
          </CardContent>
        </Card>

        <h2 class="text-xl font-bold mt-8 mb-4">Sanctions et Signalement</h2>
        <p>Toute violation de cette charte peut entraîner :</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-base flex items-center gap-2">
                <AlertTriangleIcon class="h-5 w-5 text-amber-500" />
                Avertissement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm">
                Avertissements ou suspension temporaire du compte.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-base flex items-center gap-2">
                <UserXIcon class="h-5 w-5 text-destructive" />
                Suspension
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm">
                Suppression définitive du compte en cas d'infraction grave.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-base flex items-center gap-2">
                <BadgeAlertIcon class="h-5 w-5 text-destructive" />
                Signalement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm">
                Signalement aux autorités compétentes si nécessaire.
              </p>
            </CardContent>
          </Card>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Modifications de la Charte</h2>
        <p>
          VizHome se réserve le droit de modifier cette charte afin de garantir
          un usage conforme à l'évolution des technologies et réglementations.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Contact</h2>
        <p>
          Pour toute question ou signalement, contactez-nous à
          <a
            href="mailto:support@vizhome.com"
            class="text-primary hover:underline"
            >support@vizhome.com</a
          >.
        </p>
      </div>

      <div class="mt-12 flex justify-center gap-4">
        <Button variant="outline" as-child>
          <NuxtLink to="/legal/terms"> Conditions d'utilisation </NuxtLink>
        </Button>
        <Button variant="outline" as-child>
          <NuxtLink to="/legal/privacy">
            Politique de Confidentialité
          </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ShieldIcon,
  UserIcon,
  BanIcon,
  ImageIcon,
  HeartOffIcon,
  BugIcon,
  LockIcon,
  AlertTriangleIcon,
  UserXIcon,
  BadgeAlertIcon,
} from 'lucide-vue-next'

definePageMeta({ layout: 'sidebar' })
</script>
