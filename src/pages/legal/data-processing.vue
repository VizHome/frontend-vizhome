<template>
  <div class="py-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <h1 class="text-3xl font-bold mb-8 text-center">Traitement des Données</h1>

      <div class="prose prose-sm dark:prose-invert max-w-none">
        <div class="text-center mb-8">
          <p class="text-lg">VizHome - Traitement des Données</p>
          <p class="text-muted-foreground">Date d'effet : 19/11/2024</p>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Objet</h2>
        <p>
          Ce document définit les engagements de VizHome en matière de traitement des données personnelles conformément
          aux réglementations applicables, y compris le Règlement Général sur la Protection des Données (RGPD).
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Rôles et Responsabilités</h2>
        <p>
          VizHome agit en tant que responsable du traitement ou sous-traitant selon les services fournis. Nous nous
          engageons à traiter les données personnelles uniquement aux fins définies par l'utilisateur.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Données Traitées</h2>
        <p>
          Les données collectées et traitées incluent, sans s'y limiter :
        </p>
        <div class="space-y-2 ml-6 mb-6">
          <div class="flex items-start gap-2">
            <div class="mt-1.5">
              <Circle class="h-1.5 w-1.5 fill-primary text-primary" />
            </div>
            <p>Données d'identification (nom, prénom, adresse email, mot de passe, numéro de téléphone)</p>
          </div>
          <div class="flex items-start gap-2">
            <div class="mt-1.5">
              <Circle class="h-1.5 w-1.5 fill-primary text-primary" />
            </div>
            <p>Contenus soumis par l'utilisateur dans notre application (images, projets, rendus, pièces jointes)</p>
          </div>
          <div class="flex items-start gap-2">
            <div class="mt-1.5">
              <Circle class="h-1.5 w-1.5 fill-primary text-primary" />
            </div>
            <p>Données d'utilisation de nos services</p>
          </div>
          <div class="flex items-start gap-2">
            <div class="mt-1.5">
              <Circle class="h-1.5 w-1.5 fill-primary text-primary" />
            </div>
            <p>Données de connexion (adresse IP, type de navigateur, appareil utilisé)</p>
          </div>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Mesures de Sécurité</h2>
        <p>
          Nous mettons en place des mesures techniques et organisationnelles pour protéger les données contre tout accès
          non autorisé, perte ou altération.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Droits des Utilisateurs</h2>
        <p>
          Vous disposez des droits suivants concernant vos données :
        </p>

        <Card class="mb-6">
          <CardContent class="pt-6 space-y-3">
            <div class="flex items-start gap-3">
              <ShieldIcon class="h-5 w-5 text-primary mt-0.5" />
              <p>Accès et rectification.</p>
            </div>
            <div class="flex items-start gap-3">
              <TrashIcon class="h-5 w-5 text-primary mt-0.5" />
              <p>Suppression et opposition.</p>
            </div>
            <div class="flex items-start gap-3">
              <DownloadIcon class="h-5 w-5 text-primary mt-0.5" />
              <p>Portabilité des données.</p>
            </div>
          </CardContent>
          <CardFooter>
            <p class="text-sm text-muted-foreground">
              Pour exercer vos droits, contactez-nous à <a href="mailto:privacy@vizhome.com"
                class="text-primary hover:underline">privacy@vizhome.com</a>.
            </p>
          </CardFooter>
        </Card>

        <h2 class="text-xl font-bold mt-8 mb-4">Propriété des rendus générés</h2>
        <p>
          Dans le cadre de VizHome, lors de l'inscription, l'utilisateur se verra proposer un formulaire lui permettant
          de choisir entre deux options :
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <CheckSquareIcon class="h-5 w-5 text-primary" />
                Opt-in
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                En cochant cette case, l'utilisateur autorise VizHome à devenir propriétaire des futurs rendus que
                l'utilisateur va générer. Cela signifie que VizHome pourra les utiliser à des fins promotionnelles et
                d'amélioration de ses services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <XSquareIcon class="h-5 w-5 text-destructive" />
                Opt-out
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Si l'utilisateur ne coche pas cette case, il reste l'unique propriétaire des futurs rendus. VizHome ne
                pourra seulement stocker les rendus en tant qu'archive, et n'aura aucun droit d'accès, de modification
                et de suppression.
              </p>
            </CardContent>
          </Card>
        </div>

        <Alert>
          <InfoIcon class="h-4 w-4" />
          <AlertTitle>Information importante</AlertTitle>
          <AlertDescription>
            Ce choix peut être modifiable à tout moment à partir du compte utilisateur de chaque client.
          </AlertDescription>
        </Alert>

        <h2 class="text-xl font-bold mt-8 mb-4">Partage et Sous-Traitance</h2>
        <p>
          Nous ne partageons pas les données personnelles de nos clients, sauf pour des obligations légales. Nous nous
          autorisons le droit d'utiliser les rendus générés par les utilisateurs, dans le seul cas où l'utilisateur
          donne la propriété à VizHome (cas Opt-in). Les données bancaires et de facturations sont confiées à un
          prestataire externe spécialisé dans ce domaine.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Conservation des Données</h2>
        <p>
          Les données sont conservées pour la durée nécessaire à la fourniture du service et aux obligations légales.
        </p>

        <Table class="my-4">
          <TableHeader>
            <TableRow>
              <TableHead>Type de données</TableHead>
              <TableHead>Durée de conservation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Données de compte utilisateur</TableCell>
              <TableCell>3 ans après la dernière activité sur la plateforme</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Données soumises dans l'application (images, projets, pièces jointes)</TableCell>
              <TableCell>12 mois après la suppression du compte ou la dernière utilisation</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Données générées dans l'application (rendus)</TableCell>
              <TableCell>12 mois après la suppression du compte, ou 3 ans après la dernière utilisation</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Données d'utilisation de nos services</TableCell>
              <TableCell>13 mois</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Données de connexion</TableCell>
              <TableCell>12 mois</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Données des demandes de support</TableCell>
              <TableCell>2 ans après la clôture du ticket</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h2 class="text-xl font-bold mt-8 mb-4">Modifications de l'Annexe</h2>
        <p>
          Nous nous réservons le droit de modifier cette annexe en informant les utilisateurs des changements
          significatifs.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Contact</h2>
        <p>
          Pour toute question relative au traitement des données, contactez-nous à <a href="mailto:privacy@vizhome.com"
            class="text-primary hover:underline">privacy@vizhome.com</a>.
        </p>
      </div>

      <div class="mt-12 flex justify-center gap-4">
        <Button variant="outline" as-child>
          <NuxtLink to="/legal/privacy">
            Politique de Confidentialité
          </NuxtLink>
        </Button>
        <Button variant="outline" as-child>
          <NuxtLink to="/legal/cookie-policy">
            Politique de Cookies
          </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Circle, ShieldIcon, TrashIcon, DownloadIcon, CheckSquareIcon, XSquareIcon, InfoIcon } from 'lucide-vue-next'
</script>

<style scoped></style>