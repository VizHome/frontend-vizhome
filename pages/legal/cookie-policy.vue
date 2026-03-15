<template>
  <div class="py-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <h1 class="text-3xl font-bold mb-8 text-center">Politique de Cookies</h1>

      <div class="prose prose-sm dark:prose-invert max-w-none">
        <div class="text-center mb-8">
          <p class="text-lg">VizHome - Politique de Cookies</p>
          <p class="text-muted-foreground">Date d'effet : 19/11/2024</p>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Introduction</h2>
        <p>
          Cette politique explique comment VizHome utilise des cookies pour
          améliorer l'expérience utilisateur et analyser les performances du
          site.
        </p>
        <p>
          <strong>Qu'est-ce qu'un cookie ?</strong> Un cookie est un petit
          fichier stocké sur votre appareil lorsque vous visitez notre site. Il
          permet de mémoriser des informations sur votre navigation et
          préférences.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Types de Cookies Utilisés</h2>
        <div class="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cookies Essentiels</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Nécessaires au bon fonctionnement du site.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies Analytiques</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Nous aident à comprendre comment les utilisateurs interagissent
                avec le site.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies Fonctionnels</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Améliorent l'expérience utilisateur en mémorisant vos
                préférences.
              </p>
            </CardContent>
          </Card>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Gestion des Cookies</h2>
        <p>
          Vous pouvez modifier vos préférences de cookies à tout moment via les
          paramètres de votre navigateur ou via notre bannière de gestion des
          cookies.
        </p>

        <Alert class="mt-4">
          <AlertTitle>Gérer vos préférences</AlertTitle>
          <AlertDescription>
            <Button variant="outline" class="mt-2"
              >Modifier les préférences de cookies</Button
            >
          </AlertDescription>
        </Alert>

        <h2 class="text-xl font-bold mt-8 mb-4">Durée de Conservation</h2>
        <p>
          Les cookies sont conservés pour une durée limitée en fonction de leur
          type et finalité.
        </p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type de Cookie</TableHead>
              <TableHead>Durée de conservation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Cookies Essentiels</TableCell>
              <TableCell>13 mois</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cookies Analytiques</TableCell>
              <TableCell>12 mois</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cookies Fonctionnels</TableCell>
              <TableCell>12 mois</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h2 class="text-xl font-bold mt-8 mb-4">
          Modifications de la Politique
        </h2>
        <p>
          Nous nous réservons le droit de mettre à jour cette politique en cas
          de changements réglementaires ou techniques. Nos utilisateurs seront
          informés de toute modification de la politique.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Contact</h2>
        <p>
          Pour toute question concernant notre utilisation des cookies,
          contactez-nous à
          <a
            href="mailto:privacy@vizhome.com"
            class="text-primary hover:underline"
            >privacy@vizhome.com</a
          >.
        </p>
      </div>

      <div class="mt-12 flex justify-center">
        <Button variant="outline" as-child>
          <NuxtLink to="/legal/privacy">
            Consulter notre Politique de Confidentialité
          </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'sidebar' })
</script>
