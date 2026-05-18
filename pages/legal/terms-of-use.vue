<template>
  <div class="py-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <h1 class="text-3xl font-bold mb-8 text-center">
        Conditions d'utilisation
      </h1>

      <div class="prose prose-sm dark:prose-invert max-w-none">
        <div class="text-center mb-8">
          <p class="text-lg">VizHome - Conditions d'utilisation</p>
          <p class="text-muted-foreground">Date d'effet : 19/11/2024</p>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Acceptation des Conditions</h2>
        <Alert class="mb-6">
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            En accédant ou en utilisant VizHome, vous acceptez d'être lié par
            ces Conditions d'utilisation. Si vous n'êtes pas d'accord, veuillez
            ne pas utiliser nos services.
          </AlertDescription>
        </Alert>

        <h2 class="text-xl font-bold mt-8 mb-4">Description des Services</h2>
        <Card class="mb-6">
          <CardContent class="pt-6">
            <div class="flex items-start gap-4">
              <div class="bg-primary/10 p-3 rounded-full">
                <Cpu class="h-6 w-6 text-primary" />
              </div>
              <div>
                <p>
                  VizHome fournit un moteur de rendu basé sur l'IA conçu pour
                  les architectes et les graphistes. Notre application permet
                  aux utilisateurs d'intégrer des images architecturales dans
                  des environnements naturels, d'appliquer des textures et
                  d'ajouter des éléments contextuels.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 class="text-xl font-bold mt-8 mb-4">
          Responsabilités de l'Utilisateur
        </h2>
        <p>
          Vous acceptez d'utiliser VizHome en conformité avec toutes les lois
          applicables. Vous ne devez pas :
        </p>

        <div class="space-y-3 mb-6 mt-4">
          <div class="bg-destructive/10 rounded-lg p-4 flex items-start gap-3">
            <div class="min-w-[24px]">
              <AlertOctagonIcon class="h-5 w-5 text-destructive" />
            </div>
            <p>
              Utiliser la plateforme à des fins illégales, frauduleuses ou non
              autorisées.
            </p>
          </div>

          <div class="bg-destructive/10 rounded-lg p-4 flex items-start gap-3">
            <div class="min-w-[24px]">
              <Code class="h-5 w-5 text-destructive" />
            </div>
            <p>
              Tenter d'inverser l'ingénierie, de copier ou de détourner notre
              technologie.
            </p>
          </div>

          <div class="bg-destructive/10 rounded-lg p-4 flex items-start gap-3">
            <div class="min-w-[24px]">
              <FileWarningIcon class="h-5 w-5 text-destructive" />
            </div>
            <p>Télécharger et téléverser du contenu nuisible ou inapproprié.</p>
          </div>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Propriété Intellectuelle</h2>
        <div class="bg-muted/30 rounded-lg p-6 mb-6">
          <div class="flex items-start gap-3">
            <div class="min-w-[24px]">
              <CopyrightIcon class="h-5 w-5 text-primary" />
            </div>
            <p>
              Tout le contenu, les logiciels et la technologie fournis par
              VizHome restent notre propriété exclusive. Vous ne pouvez pas
              reproduire, distribuer ou modifier nos services sans autorisation
              écrite.
            </p>
          </div>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">
          Limitation de Responsabilité
        </h2>
        <Card class="mb-6 border-amber-200 dark:border-amber-800">
          <CardContent class="pt-6">
            <div class="flex items-start gap-3">
              <div class="min-w-[24px]">
                <ShieldOffIcon class="h-5 w-5 text-amber-500" />
              </div>
              <p>
                VizHome est fourni "tel quel" sans garanties. Nous ne sommes pas
                responsables des dommages résultant de l'utilisation de nos
                services.
              </p>
            </div>
          </CardContent>
        </Card>

        <h2 class="text-xl font-bold mt-8 mb-4">Résiliation</h2>
        <p>
          Nous pouvons suspendre ou résilier votre accès à VizHome si vous
          violez ces conditions ou si vous vous engagez dans des activités
          interdites.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">
          Modifications des Conditions
        </h2>
        <div class="bg-muted/30 rounded-lg p-6 mb-6">
          <div class="flex items-start gap-3">
            <div class="min-w-[24px]">
              <FileEditIcon class="h-5 w-5 text-primary" />
            </div>
            <p>
              Nous nous réservons le droit de mettre à jour ces Conditions
              d'utilisation à tout moment, tout en prévenant nos clients. La
              poursuite de l'utilisation de VizHome après des modifications
              signifie l'acceptation des conditions mises à jour.
            </p>
          </div>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Contact</h2>
        <Card class="bg-card border shadow-sm mb-6">
          <CardHeader>
            <CardTitle class="flex items-center justify-center gap-2">
              <MessageSquareIcon class="h-5 w-5 text-primary" />
              Nous contacter
            </CardTitle>
          </CardHeader>
          <CardContent class="text-center">
            <p class="mb-4">
              Pour toute question concernant ces Conditions d'utilisation,
              contactez-nous à :
            </p>
            <Button variant="outline" as-child>
              <a href="mailto:support@vizhome.com">support@vizhome.com</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div class="mt-12 flex flex-wrap justify-center gap-4">
        <Button variant="outline" as-child>
          <NuxtLink to="/legal/privacy-policy">
            Politique de Confidentialité
          </NuxtLink>
        </Button>
        <Button variant="outline" as-child>
          <NuxtLink to="/legal/specific-service-terms">
            Conditions Spécifiques
          </NuxtLink>
        </Button>
        <Button variant="outline" as-child>
          <NuxtLink to="/legal/refund-cancellation-policy">
            Remboursement & Annulation
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
import {
  Cpu,
  AlertOctagonIcon,
  Code,
  FileWarningIcon,
  CopyrightIcon,
  ShieldOffIcon,
  FileEditIcon,
  MessageSquareIcon,
} from 'lucide-vue-next'

</script>
