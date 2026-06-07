<template>
  <div class="py-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <h1 class="text-3xl font-bold mb-8 text-center">
        Conditions Spécifiques des Services
      </h1>

      <div class="prose prose-sm dark:prose-invert max-w-none">
        <div class="text-center mb-8">
          <p class="text-lg">VizHome - Conditions Spécifiques des Services</p>
          <p class="text-muted-foreground">Date d'effet : 19/11/2024</p>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Objet</h2>
        <p>
          Ces conditions complètent les Conditions Générales d'Utilisation et
          s'appliquent aux services spécifiques fournis par VizHome.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Accès aux Services</h2>
        <Alert class="mb-6">
          <AlertTitle>Information importante</AlertTitle>
          <AlertDescription>
            L'accès aux services VizHome nécessite une inscription et le
            paiement de frais spécifiques selon le type d'abonnement souscrit.
          </AlertDescription>
        </Alert>

        <h2 class="text-xl font-bold mt-8 mb-4">Fonctionnalités Spécifiques</h2>
        <p>Les utilisateurs peuvent :</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader class="pb-2">
              <div
                class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
              >
                <ImageIcon class="h-5 w-5 text-primary" />
              </div>
              <CardTitle class="text-base">Traitement d'images</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Télécharger et traiter des images architecturales via notre
                moteur de rendu IA
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-2">
              <div
                class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
              >
                <PaintbrushIcon class="h-5 w-5 text-primary" />
              </div>
              <CardTitle class="text-base">Textures et éléments</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Appliquer des textures et intégrer des éléments contextuels
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-2">
              <div
                class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
              >
                <StarIcon class="h-5 w-5 text-primary" />
              </div>
              <CardTitle class="text-base">Fonctionnalités avancées</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Accéder à des fonctionnalités avancées selon leur abonnement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-2">
              <div
                class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
              >
                <UploadIcon class="h-5 w-5 text-primary" />
              </div>
              <CardTitle class="text-base">Téléversement</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Téléverser leur propre image afin de créer une image
                architecturale en fonction de l'environnement fourni
              </p>
            </CardContent>
          </Card>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Engagements et Limitations</h2>

        <div class="space-y-4 mb-6">
          <Card>
            <CardContent class="pt-6">
              <div class="flex items-start gap-3">
                <div class="min-w-[24px]">
                  <CheckIcon class="h-5 w-5 text-primary" />
                </div>
                <p>
                  VizHome garantit un accès aux services selon les conditions
                  définies dans l'abonnement choisi.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent class="pt-6">
              <div class="flex items-start gap-3">
                <div class="min-w-[24px]">
                  <XIcon class="h-5 w-5 text-destructive" />
                </div>
                <p>
                  Nous ne garantissons pas une disponibilité continue et
                  ininterrompue du service.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent class="pt-6">
              <div class="flex items-start gap-3">
                <div class="min-w-[24px]">
                  <AlertCircleIcon class="h-5 w-5 text-amber-500" />
                </div>
                <p>
                  Les utilisateurs doivent s'assurer d'avoir les droits
                  nécessaires sur les contenus qu'ils soumettent.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Tarification et Paiement</h2>

        <Table class="mb-6">
          <TableHeader>
            <TableRow>
              <TableHead class="w-[200px]">Élément</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell class="font-medium">Tarifs</TableCell>
              <TableCell
                >Les services payants sont facturés selon les tarifs affichés
                sur notre site.</TableCell
              >
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">Remboursements</TableCell>
              <TableCell
                >Les paiements sont non remboursables sauf disposition contraire
                précisée.</TableCell
              >
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">Violations</TableCell>
              <TableCell
                >Toute violation des conditions peut entraîner la suspension ou
                la résiliation du service sans remboursement.</TableCell
              >
            </TableRow>
          </TableBody>
        </Table>

        <h2 class="text-xl font-bold mt-8 mb-4">Support et Assistance</h2>
        <div class="bg-card border rounded-lg p-6 mb-6">
          <div class="flex items-center justify-center gap-3 mb-3">
            <HeadphonesIcon class="h-5 w-5 text-primary" />
            <h3 class="font-medium">Assistance technique</h3>
          </div>
          <p class="text-center">
            Notre équipe est disponible pour toute assistance technique via<br />
            <a
              href="mailto:support@vizhome.com"
              class="text-primary hover:underline"
              >support@vizhome.com</a
            >
          </p>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Modifications des Services</h2>
        <p>
          VizHome se réserve le droit de modifier ou d'interrompre certaines
          fonctionnalités sans préavis.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Contact</h2>
        <p>
          Pour toute question sur ces conditions spécifiques, contactez-nous à
          <a
            href="mailto:support@vizhome.com"
            class="text-primary hover:underline"
            >support@vizhome.com</a
          >.
        </p>
      </div>

      <div class="mt-12 flex flex-wrap justify-center gap-4">
        <Button variant="outline" as-child>
          <NuxtLink to="/legal/terms-of-use"> Conditions Générales </NuxtLink>
        </Button>
        <Button variant="outline" as-child>
          <NuxtLink to="/legal/privacy-policy">
            Politique de Confidentialité
          </NuxtLink>
        </Button>
        <Button variant="outline" as-child>
          <NuxtLink to="/pricing"> Nos Tarifs </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ImageIcon,
  PaintbrushIcon,
  StarIcon,
  UploadIcon,
  CheckIcon,
  XIcon,
  AlertCircleIcon,
  HeadphonesIcon,
} from 'lucide-vue-next'

useSeo({
  title: 'Conditions spécifiques des services',
  description:
    'Modalités d\'accès aux services VizHome : abonnements, traitement d\'images, génération IA, limites d\'usage et responsabilités spécifiques par offre.',
})

</script>
