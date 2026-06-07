<template>
  <div class="py-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <h1 class="text-3xl font-bold mb-8 text-center">
        Charte de la Communauté VizHome
      </h1>

      <div class="prose prose-sm dark:prose-invert max-w-none">
        <div class="text-center mb-8">
          <p class="text-lg">L'esprit du forum VizHome</p>
          <p class="text-muted-foreground">Dernière mise à jour : {{ lastUpdate }}</p>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Pourquoi cette charte ?</h2>
        <p>
          Le forum VizHome est un lieu d'échange entre utilisateurs et avec
          l'équipe. Cette charte pose le cadre pour que chacun s'y sente
          bienvenu, que les discussions restent constructives, et que les
          contributions profitent à toute la communauté.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Nos valeurs</h2>

        <Card class="mb-6">
          <CardContent class="pt-6">
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="min-w-[24px]">
                  <HeartIcon class="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p class="font-semibold">Bienveillance</p>
                  <p class="text-sm text-muted-foreground">
                    On accueille les débutants, on prend le temps d'expliquer,
                    on ne juge pas les questions.
                  </p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="min-w-[24px]">
                  <LightbulbIcon class="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p class="font-semibold">Curiosité</p>
                  <p class="text-sm text-muted-foreground">
                    On partage les usages créatifs, les astuces, les ratés.
                    Tout retour aide le produit à s'améliorer.
                  </p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="min-w-[24px]">
                  <UsersIcon class="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p class="font-semibold">Entraide</p>
                  <p class="text-sm text-muted-foreground">
                    Si tu peux aider quelqu'un, fais le. Si on t'a aidé,
                    pense à marquer la réponse comme solution.
                  </p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="min-w-[24px]">
                  <SparklesIcon class="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p class="font-semibold">Qualité</p>
                  <p class="text-sm text-muted-foreground">
                    On prend 30 secondes pour bien titrer son sujet, choisir
                    la bonne catégorie, et ajouter des captures d'écran si
                    pertinent.
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <h2 class="text-xl font-bold mt-8 mb-4">Comment bien participer</h2>

        <h3 class="text-lg font-semibold mt-6 mb-2">Avant de poster</h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>Utilise la recherche pour vérifier que le sujet n'existe pas déjà.</li>
          <li>Consulte la FAQ et la documentation produit.</li>
          <li>Choisis la catégorie la plus pertinente.</li>
        </ul>

        <h3 class="text-lg font-semibold mt-6 mb-2">Rédige un bon sujet</h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>Un titre clair et descriptif.</li>
          <li>Le contexte : ce que tu essaies de faire, ce que tu as déjà tenté.</li>
          <li>Les captures d'écran ou liens vers tes rendus.</li>
          <li>La version de ton navigateur et de l'OS pour les bugs.</li>
        </ul>

        <h3 class="text-lg font-semibold mt-6 mb-2">Réponds avec soin</h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>Cite le passage auquel tu réponds si nécessaire.</li>
          <li>Argumente plutôt que d'affirmer.</li>
          <li>Reconnais quand tu ne sais pas.</li>
        </ul>

        <h2 class="text-xl font-bold mt-8 mb-4">Modération</h2>
        <p>
          L'équipe VizHome modère le forum. Les sujets hors charte peuvent
          être édités, déplacés, fermés ou supprimés. Les comptes qui
          violent la charte de façon répétée peuvent être bannis du forum.
          Les décisions sont prises au cas par cas avec un souci de
          proportionnalité.
        </p>

        <p>
          Pour le détail des comportements interdits, consulte également le
          <NuxtLink to="/legal/code-of-conduct" class="text-primary hover:underline">
            Code de conduite
          </NuxtLink>.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Contact</h2>
        <p>
          Pour signaler un sujet problématique, utilise le bouton de
          signalement sur le sujet concerné. Pour toute autre question
          relative au forum, contacte nous via
          <NuxtLink to="/contact" class="text-primary hover:underline">
            le formulaire de contact
          </NuxtLink>.
        </p>

        <div class="mt-12 flex flex-wrap justify-center gap-4">
          <Button variant="outline" as-child>
            <NuxtLink to="/legal/code-of-conduct">Code de conduite</NuxtLink>
          </Button>
          <Button variant="outline" as-child>
            <NuxtLink to="/legal/terms-of-use">Conditions d'utilisation</NuxtLink>
          </Button>
          <Button variant="outline" as-child>
            <NuxtLink to="/forum">Retour au forum</NuxtLink>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  HeartIcon,
  LightbulbIcon,
  SparklesIcon,
  UsersIcon,
} from 'lucide-vue-next'

const lastUpdate = '06/06/2026'

useHead({
  title: 'Charte de la communauté',
  meta: [
    {
      name: 'description',
      content:
        "Les valeurs et les bonnes pratiques du forum VizHome : bienveillance, entraide, qualité.",
    },
  ],
})
</script>
