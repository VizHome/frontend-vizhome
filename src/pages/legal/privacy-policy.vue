<template>
  <div class="py-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <h1 class="text-3xl font-bold mb-8 text-center">Politique de Confidentialité</h1>

      <div class="prose prose-sm dark:prose-invert max-w-none">
        <div class="text-center mb-8">
          <p class="text-lg">VizHome - Politique de Confidentialité</p>
          <p class="text-muted-foreground">Date d'effet : 19/11/2024</p>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Introduction</h2>
        <p>
          Chez VizHome, nous nous engageons à protéger votre vie privée. Cette politique de confidentialité explique
          comment nous collectons, utilisons et protégeons vos informations personnelles.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Utilisation des Informations</h2>
        <p>Nous utilisons vos informations pour :</p>

        <Card class="mb-6">
          <CardContent class="pt-6">
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="min-w-[24px]">
                  <ServerIcon class="h-5 w-5 text-primary" />
                </div>
                <p>Fournir, maintenir et améliorer nos services</p>
              </li>
              <li class="flex items-start gap-3">
                <div class="min-w-[24px]">
                  <MailIcon class="h-5 w-5 text-primary" />
                </div>
                <p>Vous contacter en cas de besoin</p>
              </li>
              <li class="flex items-start gap-3">
                <div class="min-w-[24px]">
                  <ShieldIcon class="h-5 w-5 text-primary" />
                </div>
                <p>Assurer la sécurité et prévenir la fraude</p>
              </li>
              <li class="flex items-start gap-3">
                <div class="min-w-[24px]">
                  <ScaleIcon class="h-5 w-5 text-primary" />
                </div>
                <p>Respecter nos obligations légales</p>
              </li>
            </ul>
          </CardContent>
        </Card>

        <h2 class="text-xl font-bold mt-8 mb-4">Partage des Données</h2>
        <Alert class="mb-6">
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Nous ne vendons ni ne louons vos données. Cependant, nous pouvons partager certaines informations uniquement
            avec des autorités légales si requis par la loi.
          </AlertDescription>
        </Alert>

        <h2 class="text-xl font-bold mt-8 mb-4">Protection des Données</h2>
        <div class="bg-muted/40 rounded-lg p-6 mb-6">
          <div class="flex items-start gap-4">
            <div class="bg-primary/10 p-3 rounded-full">
              <LockIcon class="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 class="font-medium mb-2">Mesures de sécurité</h3>
              <p>
                Nous mettons en place des mesures de sécurité pour protéger vos informations contre tout accès non
                autorisé, altération ou destruction.
              </p>
            </div>
          </div>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Vos Droits</h2>
        <p>Vous disposez des droits suivants concernant vos données :</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-base flex items-center gap-2">
                <FileSearchIcon class="h-5 w-5 text-primary" />
                Accès et rectification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Vous pouvez demander l'accès à vos données et leur correction.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-base flex items-center gap-2">
                <TrashIcon class="h-5 w-5 text-primary" />
                Suppression et opposition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Vous pouvez demander l'effacement de vos données ou vous opposer à leur traitement.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-base flex items-center gap-2">
                <DownloadIcon class="h-5 w-5 text-primary" />
                Portabilité des données
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Vous pouvez demander le transfert de vos données.
              </p>
            </CardContent>
          </Card>
        </div>

        <p class="text-center mb-6">
          Pour exercer vos droits, contactez-nous à <a href="mailto:privacy@vizhome.com"
            class="text-primary hover:underline">privacy@vizhome.com</a>.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Modifications de la Politique</h2>
        <p>
          Nous pouvons mettre à jour cette politique. Tout changement sera publié sur notre site et notifié si
          nécessaire.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Contact</h2>
        <div class="bg-card border rounded-lg p-6">
          <div class="flex items-center justify-center gap-3 mb-4">
            <MailIcon class="h-5 w-5 text-primary" />
            <h3 class="font-medium">Nous contacter</h3>
          </div>
          <p class="text-center">
            Pour toute question concernant cette politique, contactez-nous à<br>
            <a href="mailto:privacy@vizhome.com" class="text-primary hover:underline">privacy@vizhome.com</a>
          </p>
        </div>
      </div>

      <div class="mt-12 flex flex-wrap justify-center gap-4">
        <Button variant="outline" as-child>
          <NuxtLink to="/legal/terms">
            Conditions d'utilisation
          </NuxtLink>
        </Button>
        <Button variant="outline" as-child>
          <NuxtLink to="/legal/cookie-policy">
            Politique de Cookies
          </NuxtLink>
        </Button>
        <Button variant="outline" as-child>
          <NuxtLink to="/legal/data-processing">
            Traitement des Données
          </NuxtLink>
        </Button>
        <Button variant="outline" as-child>
          <NuxtLink to="/legal/responsible-use-policy">
            Charte d'Utilisation
          </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ServerIcon, MailIcon, ShieldIcon, ScaleIcon, LockIcon, FileSearchIcon, TrashIcon, DownloadIcon } from 'lucide-vue-next'
</script>

<style scoped></style>